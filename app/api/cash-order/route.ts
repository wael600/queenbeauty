import db from '@/src/db';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const DELIVERY_FEE_CENTS = 700;
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, name, phone, place } = body;
    if (!items || items.length === 0) {
      return new NextResponse('Missing items', { status: 400 });
    }
    const fakeEmail = phone
      ? phone.replace(/\s/g, '') + '@cash.local'
      : 'anonymous-' + Date.now() + '@cash.local';
    let user = await db.user.findUnique({ where: { email: fakeEmail } });
    if (!user) {
      user = await db.user.create({ data: { email: fakeEmail } });
    }
    let deliveryApplied = false;
    let orderSummary = '';
    let totalCents = 0;
    for (const item of items) {
      const { productId, quantity = 1 } = item;
      const product = await db.product.findUnique({ where: { id: productId } });
      if (!product) continue;
      const lineCents = product.priceInCents * quantity;
      totalCents += lineCents;
      orderSummary += '<li>' + product.name + ' x' + quantity + ' — ' + (lineCents / 100).toFixed(3) + ' TND</li>';
      for (let i = 0; i < quantity; i++) {
        await db.order.create({
          data: {
            userId: user.id,
            productId,
            pricePaidInCents: product.priceInCents,
            deliveryFeeInCents: !deliveryApplied ? DELIVERY_FEE_CENTS : 0,
            customerName: name || null,
            customerPhone: phone || null,
            customerAddress: place || null,
          },
        });
        deliveryApplied = true;
      }
    }
    const totalWithDelivery = (totalCents + DELIVERY_FEE_CENTS) / 100;
    try {
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: process.env.ADMIN_EMAIL,
        subject: 'Nouvelle commande BinaaMarket',
        html: '<div style="font-family:sans-serif;max-width:500px">'
          + '<h2 style="color:#0D1F3C">Nouvelle commande recue</h2>'
          + '<p><strong>Client:</strong> ' + (name || 'Anonyme') + '</p>'
          + '<p><strong>Telephone:</strong> ' + (phone || 'Non fourni') + '</p>'
          + '<p><strong>Adresse:</strong> ' + (place || 'Non fournie') + '</p>'
          + '<h3>Produits:</h3><ul>' + orderSummary + '</ul>'
          + '<p><strong>Livraison:</strong> 7.000 TND</p>'
          + '<p style="font-size:1.1rem"><strong>Total a payer a la livraison: ' + totalWithDelivery.toFixed(3) + ' TND</strong></p>'
          + '</div>',
      });
    } catch (emailError) {
      console.error('Email failed:', emailError);
    }
    return new NextResponse('Success', { status: 200 });
  } catch (error) {
    console.error('Cash order error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}