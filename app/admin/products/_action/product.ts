'use server';
import db from '@/src/db';
import { z } from 'zod';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import crypto from 'crypto';

async function uploadToCloudinary(file) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const timestamp = Math.round(Date.now() / 1000);
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const signatureString = 'folder=queen-beauty&timestamp=' + timestamp + apiSecret;
  const signature = crypto.createHash('sha256').update(signatureString).digest('hex');
  const formData = new FormData();
  const blob = new Blob([buffer], { type: file.type });
  formData.append('file', blob, file.name);
  formData.append('timestamp', timestamp.toString());
  formData.append('api_key', apiKey);
  formData.append('signature', signature);
  formData.append('folder', 'queen-beauty');
  const res = await fetch('https://api.cloudinary.com/v1_1/' + cloudName + '/auto/upload', { method: 'POST', body: formData });
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  return data.secure_url;
}

const fileSchema = z.instanceof(File, { message: 'File is required' });
const imageSchema = fileSchema.refine(file => file.size === 0 || file.type.startsWith('image/'));

const addSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  image: imageSchema.refine(file => file.size > 0, 'required'),
});

const editSchema = addSchema.extend({
  image: imageSchema.optional(),
});

export async function addProduct(prevState, formData) {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!result.success) return { errors: result.error.flatten().fieldErrors };
  const data = result.data;
  const imagePath = await uploadToCloudinary(data.image);
  const extraFiles = formData.getAll('images');
  const extraImages = [];
  for (const file of extraFiles) {
    if (file instanceof File && file.size > 0) {
      const url = await uploadToCloudinary(file);
      extraImages.push(url);
    }
  }
  const allImages = [imagePath, ...extraImages];
  await db.product.create({
    data: {
      isAvailableForPurchase: true,
      name: data.name,
      description: data.description,
      imagePath,
      images: allImages,
      filePath: '',
    }
  });
  revalidatePath('/admin/products');
  redirect('/admin/products');
}

export async function toggleProductAvailability(id, isAvailableForPurchase) {
  await db.product.update({ where: { id }, data: { isAvailableForPurchase } });
  revalidatePath('/admin/products');
  redirect('/admin/products');
}

export async function deleteProduct(id) {
  const product = await db.product.delete({ where: { id } });
  if (!product) throw new Error('Product not found');
  revalidatePath('/admin/products');
  redirect('/admin/products');
}

export async function updateProduct(id, prevState, formData) {
  const result = editSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!result.success) return { errors: result.error.flatten().fieldErrors };
  const data = result.data;
  const product = await db.product.findUnique({ where: { id } });
  if (!product) throw new Error('Product not found');
  let imagePath = product.imagePath;
  if (data.image && data.image.size > 0) imagePath = await uploadToCloudinary(data.image);
  const extraFiles = formData.getAll('images');
  const extraImages = [];
  for (const file of extraFiles) {
    if (file instanceof File && file.size > 0) {
      const url = await uploadToCloudinary(file);
      extraImages.push(url);
    }
  }
  const allImages = extraImages.length > 0 ? [imagePath, ...extraImages] : product.images.length > 0 ? product.images : [imagePath];
  await db.product.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description,
      imagePath,
      images: allImages,
      filePath: product.filePath,
    }
  });
  revalidatePath('/admin/products');
  redirect('/admin/products');
}
