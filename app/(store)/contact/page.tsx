import { Phone, Mail, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <main style={{ paddingTop: '7rem' }}>
      <section className='qb-contact'>
        <h2>Contactez-nous</h2>
        <p>Notre equipe est disponible pour repondre a toutes vos questions.</p>
        <div className='qb-contact__phones'>
          <a href='tel:+21692315488' className='qb-contact__phone'>
            <Phone size={18} />
            +216 92 315 488
          </a>
          <a href='tel:+21693674641' className='qb-contact__phone'>
            <Phone size={18} />
            +216 93 674 641
          </a>
        </div>
        <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
          <a href='mailto:mohamedmbarek2962@gmail.com' className='qb-contact__phone'>
            <Mail size={18} />
            mohamedmbarek2962@gmail.com
          </a>
          <a href='https://instagram.com/queenbeauty' target='_blank' rel='noopener noreferrer' className='qb-contact__phone'>
            📸 @queenbeauty
          </a>
          <a href='https://maps.google.com/?q=7MRV%2BPV5+Route+ceinture+sousse+El+Jem+Tunisia' target='_blank' rel='noopener noreferrer' className='qb-contact__phone'>
            <MapPin size={18} />
            7MRV+PV5, Route ceinture sousse, El Jem
          </a>
        </div>
        <div style={{ marginTop: '2.5rem', width: '100%', maxWidth: '640px', margin: '2.5rem auto 0', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(201,149,108,0.2)' }}>
          <iframe src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3313.0!2d10.7!3d35.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN01SVitQVjU!5e0!3m2!1sen!2stn!4v1680000000000!5m2!1sen!2stn&q=7MRV%2BPV5+El+Jem+Tunisia' width='100%' height='300' style={{ border: 0, display: 'block' }} allowFullScreen loading='lazy' referrerPolicy='no-referrer-when-downgrade' />
        </div>
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <a href='https://maps.google.com/?q=7MRV%2BPV5+Route+ceinture+sousse+El+Jem+Tunisia' target='_blank' rel='noopener noreferrer' className='qb-btn qb-btn--gold' style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
            <MapPin size={16} />
            Obtenir l'itineraire
          </a>
        </div>
      </section>
    </main>
  );
}
