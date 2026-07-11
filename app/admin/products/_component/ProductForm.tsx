'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { addProduct, updateProduct } from '../_action/product';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import Image from 'next/image';

export function ProductForm({ product }) {
  const [previewImages, setPreviewImages] = useState([]);
  const action = product ? updateProduct.bind(null, product.id) : addProduct;
  const [state, formAction] = useActionState(action, { errors: {} });
  const errors = state?.errors || {};

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files || []);
    const previews = files.map(f => URL.createObjectURL(f));
    setPreviewImages(previews);
  };

  const existingImages = product?.images || (product?.imagePath ? [product.imagePath] : []);

  return (
    <form action={formAction} className='space-y-8'>
      <div className='space-y-2'>
        <label htmlFor='name'>Name</label>
        <Input id='name' name='name' type='text' required defaultValue={product?.name || ''} />
        {errors.name && <div className='text-destructive'>{errors.name}</div>}
      </div>
      <div className='space-y-2'>
        <Label htmlFor='description'>Description</Label>
        <Textarea id='description' name='description' required={product == null} defaultValue={product?.description || ''} />
        {errors.description && <div className='text-destructive'>{errors.description}</div>}
      </div>
      <div className='space-y-2'>
        <label htmlFor='image'>Main Image <span style={{ color: 'red' }}>*</span></label>
        <Input id='image' name='image' type='file' accept='image/*' required={product == null} />
        {errors.image && <div className='text-destructive'>{errors.image}</div>}
      </div>
      <div className='space-y-2'>
        <label htmlFor='images'>Additional Images (optional — select multiple)</label>
        <Input id='images' name='images' type='file' accept='image/*' multiple onChange={handleImagesChange} />
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
          {previewImages.map((src, i) => (
            <div key={i} style={{ position: 'relative', width: '80px', height: '80px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #ddd' }}>
              <Image src={src} fill alt={'preview ' + i} style={{ objectFit: 'cover' }} />
            </div>
          ))}
        </div>
        {existingImages.length > 0 && (
          <div>
            <p className='text-sm text-muted-foreground mt-2'>Current images:</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
              {existingImages.map((src, i) => (
                <div key={i} style={{ position: 'relative', width: '80px', height: '80px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #ddd' }}>
                  <Image src={src.startsWith('http') ? src : '/' + src.replace(/^public\//, '')} fill alt={'img ' + i} style={{ objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return <Button type='submit' disabled={pending}>{pending ? 'Saving...' : 'Save'}</Button>;
}
