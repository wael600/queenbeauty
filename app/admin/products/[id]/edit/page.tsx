import db from '@/src/db';
import { notFound } from 'next/navigation';
import { PageHeader } from '../../../_components/PageHeader';
import { ProductForm } from '../../_component/ProductForm';

export default async function EditProductPage({ params }) {
  const { id } = await params;
  const product = await db.product.findUnique({ where: { id } });
  if (!product) return notFound();
  return (
    <div className='admin-wrap'>
      <PageHeader>Edit Product</PageHeader>
      <ProductForm product={product} />
    </div>
  );
}