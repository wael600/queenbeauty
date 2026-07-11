import db from '@/src/db';
import Link from 'next/link';
import { PageHeader } from '../_components/PageHeader';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/formatters';
import Image from 'next/image';
import { deleteProduct, toggleProductAvailability } from './_action/product';

export default async function AdminProductsPage() {
  const products = await db.product.findMany({ orderBy: { createdAt: 'desc' } });
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <PageHeader>Products</PageHeader>
        <Link href='/admin/products/new'><Button>Add Product</Button></Link>
      </div>
      {products.length === 0 ? (
        <p style={{ color: 'var(--muted-foreground)' }}>No products yet. Add your first product.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {products.map(product => (
            <div key={product.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '0.6rem', padding: '1rem' }}>
              <div style={{ position: 'relative', width: '60px', height: '60px', borderRadius: '0.4rem', overflow: 'hidden', background: 'var(--muted)', flexShrink: 0 }}>
                {product.imagePath && <Image src={product.imagePath} fill alt={product.name} style={{ objectFit: 'cover' }} />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '600', color: 'var(--foreground)', marginBottom: '2px' }}>{product.name}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--primary)' }}>{formatPrice(product.priceInCents / 100)}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', marginTop: '2px' }}>{product.isAvailableForPurchase ? 'Active' : 'Inactive'}</div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                <Link href={'/admin/products/' + product.id + '/edit'}><Button variant='outline' size='sm'>Edit</Button></Link>
                <form action={toggleProductAvailability.bind(null, product.id, !product.isAvailableForPurchase)}>
                  <Button variant='outline' size='sm' type='submit'>{product.isAvailableForPurchase ? 'Deactivate' : 'Activate'}</Button>
                </form>
                <form action={deleteProduct.bind(null, product.id)}>
                  <Button variant='destructive' size='sm' type='submit'>Delete</Button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}