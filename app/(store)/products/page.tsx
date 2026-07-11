'use client';
import Image from 'next/image';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Product {
  id: string; name: string;
  description?: string; imagePath: string;
  images?: string[];
}

function getImg(imagePath: string) {
  let img = imagePath || '';
  if (img && !img.startsWith('http')) img = '/' + img.replace(/^public\//, '').replace(/^\//, '');
  return img;
}

function ProductModal({ products, index, onClose, onPrev, onNext }: {
  products: Product[]; index: number;
  onClose: () => void; onPrev: () => void; onNext: () => void;
}) {
  const product = products[index];
  const [imgIndex, setImgIndex] = useState(0);
  useEffect(() => { setImgIndex(0); }, [index]);
  const img = getImg(product.imagePath);
  const allImages = (product.images && product.images.length > 0) ? product.images : (img ? [img] : []);
  const prevImg = (e: React.MouseEvent) => { e.stopPropagation(); setImgIndex(i => (i - 1 + allImages.length) % allImages.length); };
  const nextImg = (e: React.MouseEvent) => { e.stopPropagation(); setImgIndex(i => (i + 1) % allImages.length); };
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div onClick={e => e.stopPropagation()} style={{ background: '#141414', borderRadius: '16px', width: '100%', maxWidth: '760px', maxHeight: '90vh', overflowY: 'auto', border: '1px solid rgba(201,149,108,0.2)', boxShadow: '0 20px 60px rgba(0,0,0,0.7)', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(201,149,108,0.1)', border: '1px solid rgba(201,149,108,0.2)', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', zIndex: 10 }}><X size={18} /></button>
        <div style={{ position: 'absolute', top: '50%', left: '-20px', transform: 'translateY(-50%)', zIndex: 10 }}>
          <button onClick={e => { e.stopPropagation(); onPrev(); }} disabled={index === 0} style={{ width: '40px', height: '40px', borderRadius: '50%', background: index === 0 ? 'rgba(201,149,108,0.1)' : 'rgba(201,149,108,0.25)', border: '1px solid rgba(201,149,108,0.3)', cursor: index === 0 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: index === 0 ? 'rgba(201,149,108,0.3)' : 'var(--primary)' }}><ChevronLeft size={20} /></button>
        </div>
        <div style={{ position: 'absolute', top: '50%', right: '-20px', transform: 'translateY(-50%)', zIndex: 10 }}>
          <button onClick={e => { e.stopPropagation(); onNext(); }} disabled={index === products.length - 1} style={{ width: '40px', height: '40px', borderRadius: '50%', background: index === products.length - 1 ? 'rgba(201,149,108,0.1)' : 'rgba(201,149,108,0.25)', border: '1px solid rgba(201,149,108,0.3)', cursor: index === products.length - 1 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: index === products.length - 1 ? 'rgba(201,149,108,0.3)' : 'var(--primary)' }}><ChevronRight size={20} /></button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          <div style={{ position: 'relative', height: '420px', background: 'var(--muted)', borderRadius: '16px 0 0 0', overflow: 'hidden' }}>
            {allImages.length > 0 && <Image src={allImages[imgIndex]} fill alt={product.name} style={{ objectFit: 'contain', padding: '8px' }} />}
            {allImages.length > 1 && (
              <>
                <button onClick={prevImg} style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(20,20,20,0.8)', border: '1px solid rgba(201,149,108,0.4)', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', zIndex: 5 }}><ChevronLeft size={16} /></button>
                <button onClick={nextImg} style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(20,20,20,0.8)', border: '1px solid rgba(201,149,108,0.4)', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', zIndex: 5 }}><ChevronRight size={16} /></button>
                <div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '5px', zIndex: 5 }}>
                  {allImages.map((_, i) => (<div key={i} onClick={e => { e.stopPropagation(); setImgIndex(i); }} style={{ width: '7px', height: '7px', borderRadius: '50%', background: i === imgIndex ? 'var(--primary)' : 'rgba(201,149,108,0.3)', cursor: 'pointer' }} />))}
                </div>
                <div style={{ position: 'absolute', bottom: '10px', right: '12px', background: 'rgba(0,0,0,0.6)', color: '#fff', fontSize: '0.75rem', padding: '2px 8px', borderRadius: '20px', zIndex: 5 }}>{imgIndex + 1}/{allImages.length}</div>
              </>
            )}
          </div>
          <div style={{ padding: '2rem 2rem 2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', letterSpacing: '0.1em' }}>{index + 1} / {products.length}</div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.6rem', fontWeight: 400, color: 'var(--foreground)', lineHeight: 1.2 }}>{product.name}</h2>
            <div style={{ width: '3rem', height: '1px', background: 'linear-gradient(90deg, var(--primary), transparent)' }} />
            {product.description && (
              <div>
                <p style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Description</p>
                <p style={{ color: 'var(--foreground)', fontSize: '0.95rem', lineHeight: 1.7 }}>{product.description}</p>
              </div>
            )}
            <div style={{ marginTop: 'auto', padding: '1rem', background: 'rgba(201,149,108,0.05)', borderRadius: '8px', border: '1px solid rgba(201,149,108,0.1)' }}>
              <p style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)', textAlign: 'center', lineHeight: 1.6 }}>Pour commander, contactez-nous via WhatsApp ou Instagram</p>
            </div>
          </div>
        </div>
        {allImages.length > 1 && (
          <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border)', display: 'flex', gap: '8px', overflowX: 'auto' }}>
            {allImages.map((src, i) => (
              <div key={i} onClick={e => { e.stopPropagation(); setImgIndex(i); }} style={{ position: 'relative', width: '56px', height: '56px', borderRadius: '6px', overflow: 'hidden', flexShrink: 0, border: i === imgIndex ? '2px solid var(--primary)' : '1px solid rgba(201,149,108,0.2)', cursor: 'pointer' }}>
                <Image src={src} fill alt={product.name + ' ' + i} style={{ objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ProductCard({ product, onClick }: { product: Product; onClick: () => void }) {
  const img = getImg(product.imagePath);
  return (
    <div className='qb-product-card' onClick={onClick} style={{ cursor: 'pointer' }}>
      <div className='qb-product-card__image'>
        {img ? <Image src={img} fill alt={product.name} className='object-cover' sizes='(max-width:768px) 100vw, 25vw' /> : null}
      </div>
      <div className='qb-product-card__body'>
        <h4>{product.name}</h4>
        {product.description && <p>{product.description}</p>}
      </div>
    </div>
  );
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  useEffect(() => {
    fetch('/api/products').then(r => r.json()).then(d => { setProducts(d); setLoading(false); });
  }, []);
  const filtered = products.filter(p =>
    search === '' ||
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.description?.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <main style={{ paddingTop: '6rem' }}>
      <div className='qb-section'>
        <div className='qb-section__head'>
          <h2>Our Collections</h2>
          {search && <p>Results for: <strong style={{ color: 'var(--primary)' }}>{search}</strong></p>}
        </div>
        {loading ? (
          <p style={{ textAlign: 'center', color: 'var(--muted-foreground)' }}>Loading...</p>
        ) : filtered.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--muted-foreground)' }}>No products found.</p>
        ) : (
          <div className='qb-grid'>
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} onClick={() => setSelectedIndex(i)} />
            ))}
          </div>
        )}
      </div>
      {selectedIndex !== null && (
        <ProductModal
          products={filtered}
          index={selectedIndex}
          onClose={() => setSelectedIndex(null)}
          onPrev={() => setSelectedIndex(i => (i !== null && i > 0) ? i - 1 : i)}
          onNext={() => setSelectedIndex(i => (i !== null && i < filtered.length - 1) ? i + 1 : i)}
        />
      )}
    </main>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<p style={{ textAlign: 'center', paddingTop: '8rem', color: 'var(--muted-foreground)' }}>Loading...</p>}>
      <ProductsContent />
    </Suspense>
  );
}