export default function AboutPage() {
  return (
    <main style={{ paddingTop: '7rem' }}>
      <section className='qb-about'>
        <div className='qb-about__inner'>
          <div className='qb-about__text'>
            <h2>Notre Histoire</h2>
            <p style={{ marginBottom: '1rem' }}>
              Queen Beauty est une boutique en ligne dediee aux femmes qui cherchent le meilleur de la beaute et du soin.
              Nous selectionnons avec soin des produits de qualite premium pour sublimer votre beaute naturelle.
            </p>
            <p style={{ marginBottom: '1rem' }}>
              Notre mission est de vous offrir une experience de shopping unique, avec des produits authentiques
              livres directement a votre porte en Tunisie.
            </p>
            <p>
              Chaque produit est choisi avec passion et expertise pour vous garantir qualite et satisfaction.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ background: 'var(--card)', border: '1px solid rgba(201,149,108,0.2)', borderRadius: '0.8rem', padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontFamily: 'Playfair Display, serif', color: 'var(--primary)', fontWeight: '700' }}>100%</div>
              <div style={{ color: 'var(--muted-foreground)', fontSize: '0.9rem', marginTop: '0.3rem' }}>Produits authentiques</div>
            </div>
            <div style={{ background: 'var(--card)', border: '1px solid rgba(201,149,108,0.2)', borderRadius: '0.8rem', padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontFamily: 'Playfair Display, serif', color: 'var(--primary)', fontWeight: '700' }}>90%</div>
              <div style={{ color: 'var(--muted-foreground)', fontSize: '0.9rem', marginTop: '0.3rem' }}>Ingredients naturels</div>
            </div>
            <div style={{ background: 'var(--card)', border: '1px solid rgba(201,149,108,0.2)', borderRadius: '0.8rem', padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontFamily: 'Playfair Display, serif', color: 'var(--primary)', fontWeight: '700' }}>89%</div>
              <div style={{ color: 'var(--muted-foreground)', fontSize: '0.9rem', marginTop: '0.3rem' }}>Satisfaction client</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}