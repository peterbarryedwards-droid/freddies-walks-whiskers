import { useState, useEffect } from 'react'

// Brand colours pulled from the logo
const C = {
  teal:      '#2A8C9E',
  tealDark:  '#1E6B7A',
  tealLight: '#EAF5F8',
  orange:    '#F04E12',
  cream:     '#FDFAF6',
  white:     '#FFFFFF',
  text:      '#1A2E35',
  muted:     '#5A7078',
  border:    '#DFF0F4',
}

const font = {
  body:    "'Nunito', sans-serif",
  display: "'Lora', serif",
}

/* ── tiny helpers ─────────────────────────────────────────── */
function Paw({ size = 20, color = C.orange, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill={color} style={{ flexShrink: 0, ...style }} aria-hidden>
      <ellipse cx="50" cy="75" rx="22" ry="17" />
      <ellipse cx="26" cy="55" rx="10" ry="13" />
      <ellipse cx="74" cy="55" rx="10" ry="13" />
      <ellipse cx="36" cy="38" rx="9" ry="11" />
      <ellipse cx="64" cy="38" rx="9" ry="11" />
    </svg>
  )
}

const globalCSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: ${font.body}; background: ${C.cream}; color: ${C.text}; -webkit-font-smoothing: antialiased; }
  a { color: inherit; text-decoration: none; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  .fu1 { animation: fadeUp 0.65s ease 0.1s both; }
  .fu2 { animation: fadeUp 0.65s ease 0.25s both; }
  .fu3 { animation: fadeUp 0.65s ease 0.4s both; }
  .fi  { animation: fadeIn 0.5s ease both; }

  .btn {
    display: inline-flex; align-items: center; gap: 0.45rem;
    padding: 0.8rem 1.6rem; border-radius: 50px;
    font-family: ${font.body}; font-weight: 800; font-size: 0.95rem;
    cursor: pointer; border: none; transition: transform 0.15s, box-shadow 0.15s;
    text-decoration: none; white-space: nowrap;
  }
  .btn:hover { transform: translateY(-2px); box-shadow: 0 6px 18px rgba(0,0,0,0.13); }
  .btn-primary { background: ${C.orange}; color: #fff; }
  .btn-outline  { background: transparent; color: ${C.teal}; border: 2px solid ${C.teal}; }
  .btn-teal     { background: ${C.teal}; color: #fff; }

  .card {
    background: #fff; border-radius: 16px; padding: 1.6rem;
    box-shadow: 0 2px 16px rgba(42,140,158,0.07);
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .card:hover { transform: translateY(-3px); box-shadow: 0 6px 24px rgba(42,140,158,0.13); }

  details summary { cursor: pointer; list-style: none; }
  details summary::-webkit-details-marker { display: none; }
`

/* ── Nav ──────────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '0.85rem 1.5rem',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: scrolled ? 'rgba(253,250,246,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(10px)' : 'none',
      boxShadow: scrolled ? '0 2px 12px rgba(0,0,0,0.06)' : 'none',
      transition: 'all 0.3s',
    }}>
      <img src="/logo-icon.png" alt="Freddie's Walks and Whiskers" style={{ height: 40, width: 'auto' }} />
      <a href="#contact" className="btn btn-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.88rem' }}>
        Get in touch
      </a>
    </nav>
  )
}

/* ── Hero ─────────────────────────────────────────────────── */
function Hero() {
  return (
    <section style={{
      minHeight: '100svh',
      background: `linear-gradient(155deg, ${C.tealLight} 0%, ${C.white} 50%, #FEF3EC 100%)`,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      textAlign: 'center', padding: '7rem 1.5rem 4rem',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* background paws */}
      {[
        { t:'10%', l:'4%',  s:40, r:-18, o:0.06 },
        { t:'72%', l:'3%',  s:28, r:12,  o:0.05 },
        { t:'15%', r:'4%',  s:44, rot:22, o:0.06 },
        { t:'68%', r:'5%',  s:32, rot:-8, o:0.05 },
      ].map((p, i) => (
        <div key={i} style={{
          position:'absolute', top:p.t, left:p.l, right:p.r,
          transform:`rotate(${p.r ?? p.rot}deg)`, opacity:p.o, pointerEvents:'none',
        }}>
          <Paw size={p.s} color={C.teal} />
        </div>
      ))}

      <div className="fi" style={{ marginBottom: '1.8rem' }}>
        <img src="/logo.png" alt="Freddie's Walks and Whiskers"
          style={{ width: 'min(300px, 78vw)', height: 'auto', margin: '0 auto' }} />
      </div>

      <h1 className="fu1" style={{
        fontFamily: font.display,
        fontSize: 'clamp(2rem, 6vw, 3rem)',
        fontWeight: 600, lineHeight: 1.2,
        marginBottom: '1rem', maxWidth: 520,
      }}>
        Your pet, in safe hands
      </h1>

      <div className="fu2" style={{
        fontSize: 'clamp(1rem, 2.8vw, 1.15rem)',
        color: C.muted, fontWeight: 600, lineHeight: 1.6,
        maxWidth: 460, marginBottom: '2rem',
        textAlign: 'center',
      }}>
        <p>Qualified, reliable dog walking and pet care across Winchester.</p>
        <p style={{ marginTop: '0.5rem' }}>A free meet and greet before every first booking.</p>
      </div>

      <div className="fu3" style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <a href="#contact" className="btn btn-primary">
          <Paw size={16} color="#fff" /> Book a meet and greet
        </a>
        <a href="#services" className="btn btn-outline">See services</a>
      </div>
    </section>
  )
}

/* ── Trust bar ────────────────────────────────────────────── */
function TrustBar() {
  const items = [
    'Free meet and greet',
    'Fully insured',
    'Level 2 Animal Management',
    'Winchester based',
  ]
  return (
    <div style={{ background: C.teal, padding: '0.9rem 1rem', overflowX: 'auto' }}>
      <div style={{
        display: 'flex', gap: '1.8rem', justifyContent: 'center',
        flexWrap: 'wrap', maxWidth: 860, margin: '0 auto',
      }}>
        {items.map((item, i) => (
          <span key={i} style={{
            color: '#fff', fontWeight: 700, fontSize: '0.88rem',
            display: 'flex', alignItems: 'center', gap: '0.4rem', whiteSpace: 'nowrap',
          }}>
            <Paw size={13} color="rgba(255,255,255,0.7)" /> {item}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ── Services ─────────────────────────────────────────────── */
function Services() {
  const services = [
    {
      emoji: '🦮',
      title: 'Dog Walking',
      accent: C.teal,
      pricing: [
        { label: '30 minutes', price: '£15' },
        { label: '60 minutes', price: '£20' },
      ],
      body: 'Every walk is tailored to your dog, whether that is a steady amble or a run through the Water Meadows or up St Catherine\'s Hill. You will get a photo and a message when I drop them back.',
      includes: [
        'Free meet and greet before the first booking',
        'Photo update after every walk',
        'Small groups only',
      ],
      note: 'Additional dog? Get in touch for pricing.',
    },
    {
      emoji: '🏠',
      title: 'Drop-in Visits',
      accent: C.orange,
      pricing: [
        { label: 'Dogs', price: '£13' },
        { label: 'Cats', price: '£12' },
      ],
      body: 'A 30-minute visit while you are out. Feeding, fresh water, and some time with your pet so they are not sitting alone all day.',
      includes: [
        'Dogs, cats, and small pets',
        'Message after every visit',
        'Free meet and greet before the first booking',
      ],
    },
    {
      emoji: '🌙',
      title: 'House Sitting',
      accent: C.tealDark,
      pricing: [
        { label: 'Dogs', price: 'from £40/night' },
        { label: 'Cats', price: 'from £25/night' },
      ],
      body: 'I stay at yours so your pet keeps their routine and stays comfortable at home while you are away.',
      includes: [
        'Full overnight care',
        'Feeding and exercise included',
        'Regular updates throughout',
      ],
      note: 'Enquire for availability and exact pricing.',
    },
  ]

  return (
    <section id="services" style={{ padding: '5rem 1.5rem', background: C.cream }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <p style={{ color: C.orange, fontWeight: 800, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>What I offer</p>
          <h2 style={{ fontFamily: font.display, fontSize: 'clamp(1.7rem, 4vw, 2.3rem)', fontWeight: 600, marginBottom: '0.5rem' }}>
            Services and pricing
          </h2>
          <p style={{ color: C.muted, fontWeight: 600, fontSize: '0.95rem' }}>
            Prices shown are for one-off bookings. If you are looking for regular walks or visits, get in touch and we can work something out.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.2rem' }}>
          {services.map((s, i) => (
            <div key={i} className="card" style={{ borderTop: `4px solid ${s.accent}` }}>
              <div style={{ fontSize: '2.2rem', marginBottom: '0.8rem' }}>{s.emoji}</div>
              <h3 style={{ fontWeight: 800, fontSize: '1.15rem', marginBottom: '0.8rem' }}>{s.title}</h3>

              {/* pricing pills */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                {s.pricing.map((p, j) => (
                  <span key={j} style={{
                    background: C.tealLight, borderRadius: 50,
                    padding: '0.3rem 0.85rem', fontSize: '0.85rem', fontWeight: 700,
                    color: C.tealDark, border: `1px solid ${C.border}`,
                  }}>
                    {p.label} &mdash; {p.price}
                  </span>
                ))}
              </div>

              <p style={{ color: C.muted, fontSize: '0.93rem', lineHeight: 1.65, fontWeight: 600, marginBottom: '1rem' }}>{s.body}</p>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {s.includes.map((item, j) => (
                  <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.88rem', fontWeight: 700 }}>
                    <Paw size={13} color={s.accent} style={{ marginTop: 3 }} /> {item}
                  </li>
                ))}
              </ul>

              {s.note && (
                <p style={{ marginTop: '0.9rem', fontSize: '0.82rem', color: C.muted, fontWeight: 600, fontStyle: 'italic' }}>{s.note}</p>
              )}
            </div>
          ))}
        </div>

        {/* Rover callout */}
        <div style={{
          marginTop: '2.5rem', background: C.white, borderRadius: 16,
          padding: '1.5rem 1.8rem', border: `1px solid ${C.border}`,
        }}>
          <p style={{ fontWeight: 800, fontSize: '0.95rem', marginBottom: '0.5rem' }}>Book however suits you</p>
          <p style={{ color: C.muted, fontWeight: 600, fontSize: '0.9rem', lineHeight: 1.65, marginBottom: '1rem' }}>
            You will find me on Rover if you prefer to use an app. But booking directly through this site works just as well. I hold my own dedicated pet care insurance which covers every booking regardless of how you find me. Rover's Guarantee is a useful safety net but it is not a regulated insurance policy and has some limitations worth knowing about. Either way, your pet is covered. Booking direct also means no platform fees on either side.
          </p>
          <a href="https://www.rover.com/members/frederick-e-reliable-local-energetic/" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ fontSize: '0.85rem', padding: '0.55rem 1.2rem' }}>
            View my Rover profile
          </a>
        </div>
      </div>
    </section>
  )
}

/* ── About ────────────────────────────────────────────────── */
function About() {
  const credentials = [
    'Level 2 Diploma in Animal Care and Management',
    'Pets Corner — ran weekly puppy socialisation sessions',
    'ScenterBarks Dog Day Care — hands on care',
    'Difford Kennels — hands on care',
    'Volunteer, Second Chance Animal Rescue, Southampton',
    'Pet sitting and walking since 2022',
  ]

  return (
    <section id="about" style={{
      padding: '5rem 1.5rem',
      background: `linear-gradient(145deg, ${C.teal} 0%, ${C.tealDark} 100%)`,
    }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

          <div style={{ color: '#fff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: '1.2rem', flexWrap: 'wrap' }}>
              <img src="/freddie.jpg" alt="Freddie Edwards"
                style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.3)', flexShrink: 0 }} />
              <div>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>About Freddie</p>
                <h2 style={{ fontFamily: font.display, fontSize: 'clamp(1.7rem, 4vw, 2.3rem)', fontWeight: 600, lineHeight: 1.2 }}>
                  Not just a dog walker
                </h2>
              </div>
            </div>
            <p style={{ fontSize: '1.02rem', lineHeight: 1.75, fontWeight: 600, opacity: 0.92, marginBottom: '1rem' }}>
              I have been working with animals in Winchester since I was 15. That includes running the weekly puppy socialisation sessions at Pets Corner, hands-on care at ScenterBarks Dog Day Care and Difford Kennels, and I currently volunteer at Second Chance Animal Rescue in Southampton.
            </p>
            <p style={{ fontSize: '1.02rem', lineHeight: 1.75, fontWeight: 600, opacity: 0.92, marginBottom: '1rem' }}>
              I hold a Level 2 Diploma in Animal Care and Management from Sparsholt College, so when I am with your pet I understand their behaviour, welfare needs, and how to handle them safely in different situations.
            </p>
            <p style={{ fontSize: '1.02rem', lineHeight: 1.75, fontWeight: 600, opacity: 0.92 }}>
              Reliability matters to me. I have held jobs continuously since I was 15, received commendations at college for attendance and effort, and I will never let you down. You will get a photo and a message after every walk or visit.
            </p>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.1)', borderRadius: 16,
            padding: '1.4rem', border: '1px solid rgba(255,255,255,0.15)',
          }}>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem' }}>Experience and credentials</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {credentials.map((c, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: '#fff', fontWeight: 600, fontSize: '0.9rem', opacity: 0.92 }}>
                  <Paw size={13} color="rgba(255,255,255,0.6)" style={{ marginTop: 3 }} /> {c}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  )
}

/* ── Reviews ──────────────────────────────────────────────── */
function Reviews() {
  const reviews = [
    {
      name: 'Laura B.',
      date: 'Feb 2026',
      text: 'Freddie has looked after our dog for a number of years. He\'s extremely reliable, conscientious and always punctual. He looks after her with calm confidence, care and kindness and they have developed a close bond. He regularly takes her for walks and is comfortable walking her off lead. He has also looked after her for longer periods of time, always balancing being playful with being consistent and firm. I would highly recommend Freddie.',
    },
    {
      name: 'Karen S.',
      date: 'Feb 2026',
      text: 'Freddie has walked and cared for my dog on several occasions and I couldn\'t be happier. He is always prompt, polite, and genuinely loves dogs, something that really shows in the way he interacts with them. I\'ve always felt completely reassured leaving my dog in his care.',
    },
    {
      name: 'Fiona K.',
      date: 'Feb 2026',
      text: 'Freddie is a reliable and friendly dog walker who does a fantastic job and clearly loves dogs. My dog is always excited to see him and I am completely confident leaving her in his care. Highly recommend.',
    },
    {
      name: 'Kate G.',
      date: 'Mar 2026',
      text: 'Freddie was brilliant with Tanga, so easy to communicate with and super reliable and thoughtful. He sent lots of lovely pictures and looked after her brilliantly. We will definitely be asking Freddie again.',
    },
    {
      name: 'Laura E.',
      date: 'Mar 2026',
      text: 'We booked Freddie at short notice and we\'ll definitely be booking him again. He is polite and friendly and the dogs took to him immediately. He took them for a good walk and sent us photos through the day. We came home to happy dogs and the house was just as we left it.',
    },
  ]

  return (
    <section id="reviews" style={{ padding: '5rem 1.5rem', background: C.white }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <p style={{ color: C.orange, fontWeight: 800, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>What owners say</p>
          <h2 style={{ fontFamily: font.display, fontSize: 'clamp(1.7rem, 4vw, 2.3rem)', fontWeight: 600 }}>
            Reviews
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '1.2rem' }}>
          {reviews.map((r, i) => (
            <div key={i} className="card" style={{
              borderLeft: `4px solid ${i === 0 ? C.orange : C.teal}`,
              display: 'flex', flexDirection: 'column', gap: '0.8rem',
            }}>
              <div style={{ display: 'flex', gap: '0.2rem' }}>
                {[...Array(5)].map((_, j) => (
                  <span key={j} style={{ color: '#F5A623', fontSize: '0.9rem' }}>★</span>
                ))}
              </div>
              <p style={{ color: C.text, fontSize: '0.92rem', lineHeight: 1.7, fontWeight: 600, fontStyle: 'italic', flex: 1 }}>
                "{r.text}"
              </p>
              <div>
                <p style={{ fontWeight: 800, fontSize: '0.88rem' }}>{r.name}</p>
                <p style={{ fontSize: '0.8rem', color: C.muted, fontWeight: 600 }}>{r.date} via Rover</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── FAQ ──────────────────────────────────────────────────── */
function FAQ() {
  const faqs = [
    { q: 'Do you do a meet and greet before the first booking?', a: 'Yes, always and at no charge. It is a chance for your pet to get comfortable with me before we start.' },
    { q: 'Are you insured?', a: 'Yes, I hold my own dedicated pet care insurance covering all bookings, whether made directly or through a platform.' },
    { q: 'Do I have to book through Rover?', a: 'No, you can book directly through this site. Get in touch and we will sort everything from there.' },
    { q: 'What areas do you cover?', a: 'Winchester and nearby. Not sure if I can reach you? Just ask.' },
    { q: 'Can you walk my dog off lead?', a: 'That depends on your dog. We will talk it through at the meet and greet.' },
    { q: 'Do you walk more than one dog at a time?', a: 'Small groups only, so every dog gets proper attention.' },
    { q: 'Do you care for cats?', a: 'Yes, drop-in visits and house sitting. I will keep things calm and consistent so they are comfortable while you are away.' },
    { q: 'What about regular bookings?', a: 'The prices on this site are for one-off bookings. If you are looking for regular walks or visits, get in touch and we can work something out.' },
  ]

  const [open, setOpen] = useState(null)

  return (
    <section id="faq" style={{ padding: '5rem 1.5rem', background: C.cream }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <p style={{ color: C.orange, fontWeight: 800, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Common questions</p>
          <h2 style={{ fontFamily: font.display, fontSize: 'clamp(1.7rem, 4vw, 2.3rem)', fontWeight: 600 }}>FAQ</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{
              background: C.white, borderRadius: 14,
              border: `1.5px solid ${open === i ? C.teal : C.border}`,
              overflow: 'hidden', transition: 'border-color 0.2s',
            }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: '100%', padding: '1.1rem 1.3rem',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontFamily: font.body, fontWeight: 800, fontSize: '0.95rem',
                  color: C.text, textAlign: 'left', gap: '1rem',
                }}
              >
                {faq.q}
                <span style={{
                  width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                  background: open === i ? C.teal : C.tealLight,
                  color: open === i ? '#fff' : C.teal,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1rem', fontWeight: 800, transition: 'all 0.2s',
                }}>
                  {open === i ? '−' : '+'}
                </span>
              </button>
              {open === i && (
                <div style={{ padding: '0 1.3rem 1.1rem', color: C.muted, fontWeight: 600, fontSize: '0.92rem', lineHeight: 1.65 }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Contact ──────────────────────────────────────────────── */
function Contact() {
  const [form, setForm] = useState({ name: '', petName: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = async e => {
    e.preventDefault()
    const res = await fetch('https://formspree.io/f/mlgonvro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) setSent(true)
  }

  const input = {
    width: '100%', padding: '0.8rem 1rem',
    border: `2px solid ${C.border}`, borderRadius: 10,
    fontFamily: font.body, fontSize: '0.95rem', fontWeight: 600,
    color: C.text, background: C.white, outline: 'none',
    transition: 'border-color 0.2s',
  }

  return (
    <section id="contact" style={{ padding: '5rem 1.5rem', background: C.white }}>
      <div style={{ maxWidth: 560, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <p style={{ color: C.orange, fontWeight: 800, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Say hello</p>
          <h2 style={{ fontFamily: font.display, fontSize: 'clamp(1.7rem, 4vw, 2.3rem)', fontWeight: 600, marginBottom: '0.6rem' }}>
            Get in touch
          </h2>
          <p style={{ color: C.muted, fontWeight: 600, fontSize: '0.95rem', lineHeight: 1.6 }}>
            Fill in the form below and Freddie will get back to you, usually the same day. Prefer a quicker reply? Drop a WhatsApp or text to{' '}
            <a href="https://wa.me/447761724155" style={{ color: C.teal, fontWeight: 800 }}>07761 724155</a>.
          </p>
        </div>

        {sent ? (
          <div className="card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.8rem' }}>🐾</div>
            <h3 style={{ fontWeight: 800, fontSize: '1.3rem', marginBottom: '0.5rem', color: C.teal }}>Message sent</h3>
            <p style={{ color: C.muted, fontWeight: 600 }}>Thanks for getting in touch. Freddie will be back to you soon.</p>
          </div>
        ) : (
          <div className="card">
            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 800, fontSize: '0.85rem', marginBottom: '0.35rem' }}>Your name</label>
                  <input style={input} name="name" value={form.name} onChange={handle} placeholder="Jane Smith" required
                    onFocus={e => e.target.style.borderColor = C.teal}
                    onBlur={e => e.target.style.borderColor = C.border} />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 800, fontSize: '0.85rem', marginBottom: '0.35rem' }}>Pet's name</label>
                  <input style={input} name="petName" value={form.petName} onChange={handle} placeholder="Buddy"
                    onFocus={e => e.target.style.borderColor = C.teal}
                    onBlur={e => e.target.style.borderColor = C.border} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 800, fontSize: '0.85rem', marginBottom: '0.35rem' }}>Email</label>
                <input style={input} type="email" name="email" value={form.email} onChange={handle} placeholder="jane@example.com" required
                  onFocus={e => e.target.style.borderColor = C.teal}
                  onBlur={e => e.target.style.borderColor = C.border} />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 800, fontSize: '0.85rem', marginBottom: '0.35rem' }}>Message</label>
                <textarea style={{ ...input, minHeight: 100, resize: 'vertical' }} name="message" value={form.message} onChange={handle}
                  placeholder="Tell me a bit about your pet and what you are looking for..."
                  onFocus={e => e.target.style.borderColor = C.teal}
                  onBlur={e => e.target.style.borderColor = C.border} />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.95rem' }}>
                <Paw size={16} color="#fff" /> Send message
              </button>
            </form>

            <div style={{ marginTop: '1.2rem', textAlign: 'center' }}>
              <p style={{ color: C.muted, fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.6rem' }}>Or message directly</p>
              <a href="https://wa.me/447761724155" className="btn btn-teal" style={{ fontSize: '0.88rem', padding: '0.65rem 1.3rem' }}>
                💬 WhatsApp / Text
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

/* ── Footer ───────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ background: C.text, padding: '2.5rem 1.5rem', textAlign: 'center' }}>
      <img src="/logo-icon.png" alt="" style={{ height: 42, margin: '0 auto 1rem', opacity: 0.85 }} />
      <p style={{ color: '#fff', fontWeight: 800, marginBottom: '0.3rem' }}>Freddie's Walks and Whiskers</p>
      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', marginBottom: '1.3rem' }}>Winchester</p>
      <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {[['#services','Services'],['#about','About'],['#reviews','Reviews'],['#faq','FAQ'],['#contact','Contact']].map(([href, label]) => (
          <a key={href} href={href} style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 700, fontSize: '0.85rem', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = '#fff'}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.5)'}>
            {label}
          </a>
        ))}
      </div>
      <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.78rem' }}>
        &copy; {new Date().getFullYear()} Freddie's Walks and Whiskers. All rights reserved.
      </p>
    </footer>
  )
}

/* ── App ──────────────────────────────────────────────────── */
export default function App() {
  return (
    <>
      <style>{globalCSS}</style>
      <Nav />
      <main>
        <Hero />
        <TrustBar />
        <Services />
        <About />
        <Reviews />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
