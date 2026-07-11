import db from '@/src/db';
import { NextResponse } from 'next/server';
export async function GET() {
  const products = await db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      description: true,
      priceInCents: true,
      discountPriceInCents: true,
      imagePath: true,
      images: true,
      category: true,
    }
  });
  return NextResponse.json(products);
}