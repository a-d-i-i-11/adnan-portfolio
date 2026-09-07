'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const chapters = [
  ['01', 'THE PERSON', '#person'],
  ['02', 'THE THINKING', '#the-thinking'],
  ['03', 'THE JOURNEY', '#the-journey'],
  ['04', 'THE BUILDS', '#the-builds'],
  ['05', 'THE ECOSYSTEM', '#the-ecosystem'],
  ['06', 'THE CAPABILITIES', '#the-capabilities'],
  ['07', 'THE HORIZON', '#the-horizon'],
  ['08', 'CONTACT', '#contact'],
];

const journey = [
  { n: '01', place: 'Paradise Hotel', role: 'Senior Front Office Advisor', note: 'Ground truth: people, pressure, timing and service — learning what a business feels like from the inside.', tags: ['Hospitality', 'People', 'Operations'] },
  { n: '02', place: 'Upstox', role: 'Customer Support Advisor — Demat & Investment Services', note: 'Technology from the customer side: onboarding, clarity, issue resolution and trust.', tags: ['Technology', 'CX', 'Communication'] },
  { n: '03', place: 'Petpooja', role: 'Senior Customer Experience Executive', note: 'Real-world digital operations: POS, inventory, software problems and structured feedback.', tags: ['SaaS', 'Support', 'Systems'] },
  { n: '04', place: 'Dilli Darbar', role: 'Front Office & Marketing Management', note: 'Customer experience and marketing begin to behave like one connected system.', tags: ['Marketing', 'CX', 'Loyalty'] },
  { n: '05', place: 'Anuska Resto & Lodging', role: 'General Manager', note: 'A full-spectrum management chapter: people, operations, automation, reputation and growth.', tags: ['Management', 'Automation', 'Growth'] },
  { n: '06', place: 'HIRENIX', role: 'Founder', note: 'Building a recruitment and marketing ecosystem around international opportunity and business visibility.', tags: ['Founder', 'Recruitment', 'International'] },
  { n: '07', place: 'StructGuard Eng LLP', role: 'International Marketing, Business Relations & Consulting', note: 'Running the international marketing and relationship layer — connecting the business to markets beyond its home base.', tags: ['International', 'Business Relations', 'Consulting'] },
];

const principles = [
  { n: '01', title: 'Solve before selling', text: 'Understand the actual problem first. Then build the thing worth paying for.' },
  { n: '02', title: 'Document everything for scale', text: 'A result that only exists in one person’s head is not a system.' },
  { n: '03', title: 'Zero-budget launch habit', text: 'Start with what exists. Test reality before spending to manufacture attention.' },
  { n: '04', title: 'Daily idea refinement', text: 'Keep thinking until the useful version of an idea becomes clearer than the exciting version.' },
];

const capabilities = [
  'Business strategy', 'International marketing', 'Brand development', 'Digital transformation',
  'Customer experience', 'Operations', 'Business development', 'AI automation', 'Web development', 'Growth strategy',
];

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeChapter, setActiveChapter] = useState('home');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? window.scrollY / max : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const els = chapters.map(([, , href]) => document.querySelector(href));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveChapter(entry.target.id);
        });
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    );
    els.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let frame = 0;
    let raf = 0;
    let mouseX = 0.5;
    let mouseY = 0.5;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const move = (e: MouseEvent) => {
      mouseX = e.clientX / Math.max(window.innerWidth, 1);
      mouseY = e.clientY / Math.max(window.innerHeight, 1);
    };
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', move, { passive: true });

    const draw = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      const cx = w * (0.5 + (mouseX - 0.5) * 0.04);
      const cy = h * (0.50 + (mouseY - 0.5) * 0.04);
      const t = frame * 0.0011;

      for (let ring = 0; ring < 4; ring++) {
        ctx.beginPath();
        ctx.ellipse(cx, cy, 125 + ring * 90, 42 + ring * 38, -0.16 + ring * 0.06, 0, Math.PI * 2);
        ctx.strokeStyle = ring % 2 ? 'rgba(209,164,128,.13)' : 'rgba(240,235,225,.08)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      const nodes = [
        [0.16, 0.27, 10], [0.82, 0.20, 34], [0.12, 0.74, 62], [0.86, 0.72, 88], [0.50, 0.12, 122], [0.54, 0.87, 150]
      ];
      nodes.forEach(([px, py, phase], i) => {
        const x = w * px + Math.sin(t + phase) * 15;
        const y = h * py + Math.cos(t * 0.9 + phase) * 10;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.quadraticCurveTo((cx + x) / 2, (cy + y) / 2, x, y);
        ctx.strokeStyle = i % 2 ? 'rgba(209,164,128,.18)' : 'rgba(240,235,225,.10)';
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(x, y, 2.7, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 ? '#d1a480' : '#efe8dc';
        ctx.fill();
      });

      for (let i = 0; i < 38; i++) {
        const a = i * 0.93 + t * 0.35;
        const r = 85 + (i % 9) * 34;
        const x = cx + Math.cos(a) * r;
        const y = cy + Math.sin(a * 1.17) * r * 0.52;
        ctx.globalAlpha = 0.045 + (i % 4) * 0.014;
        ctx.beginPath();
        ctx.arc(x, y, 1.1 + (i % 3) * 0.7, 0, Math.PI * 2);
        ctx.fillStyle = i % 4 === 0 ? '#d1a480' : '#ffffff';
        ctx.fill();
        ctx.globalAlpha = 1;
      }
      frame += 1;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', move);
    };
  }, []);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main>
      <div className="progress" style={{ transform: `scaleX(${scrollProgress})` }} aria-hidden="true" />

      <header className="nav">
        <button className="wordmark" onClick={() => scrollTo('#home')} aria-label="Back to top">AM<span>/</span></button>
        <div className="nav-links" aria-label="Primary navigation">
          {chapters.slice(0, 6).map(([num, label, href]) => (
            <a key={num} className={activeChapter === href.slice(1) ? 'active' : ''} href={href}>{num}</a>
          ))}
        </div>
        <a className="nav-status" href="mailto:Khanadnanofficial432@gmail.com"><span className="pulse" /> available for meaningful problems</a>
      </header>

      <aside className="chapter-rail" aria-label="Experience chapters">
        {chapters.map(([num, label, href]) => (
          <a key={num} className={activeChapter === href.slice(1) ? 'current' : ''} href={href} title={label}>
            <span>{num}</span><i />
          </a>
        ))}
      </aside>

      <section id="home" className="hero section-pad">
        <canvas ref={canvasRef} className="field" aria-hidden="true" />
        <div className="hero-grain" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow">PERSONAL BUSINESS UNIVERSE / 2026</p>
          <h1>Adnan<br /><em>Maqbool</em></h1>
          <p className="hero-role">Multi-domain business strategist</p>
          <p className="hero-line">I understand the business first. Then I build the system around it — from visibility to growth.</p>
          <div className="hero-actions">
            <a className="button button--light" href="#person">Enter the map <span>↓</span></a>
            <a className="text-link" href="https://www.linkedin.com/in/adnan-maqbool-90a56a242/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
          </div>
        </div>
        <div className="portrait-wrap">
          <div className="portrait-ring" />
          <div className="portrait-label portrait-label--top">HUMAN / SYSTEM / SCALE</div>
          <Image className="portrait" src="/adnan-portrait.png" alt="Portrait of Adnan Maqbool" width={700} height={930} priority />
          <div className="portrait-label portrait-label--bottom">PUNE · INDIA · GLOBAL</div>
        </div>
        <div className="hero-bottom">
          <span className="scroll-hint">SCROLL TO ENTER <b>↓</b></span>
          <div className="sequence"><span>IDEAS</span><i>→</i><span>SYSTEMS</span><i>→</i><span>BRANDS</span><i>→</i><span>GROWTH</span></div>
        </div>
      </section>

      <section id="person" className="section person section-pad">
        <div className="section-index">01 / THE PERSON</div>
        <div className="split-heading">
          <h2>Not a straight line.<br /><em>A compounding one.</em></h2>
          <div>
            <p>I learned business close to the ground — where customers have expectations, people have pressure, systems fail, reputation matters and every decision has a consequence.</p>
            <p>Today, that perspective shapes how I think about strategy, marketing, technology and growth.</p>
          </div>
        </div>
        <div className="statement">
          <span>THE QUESTION I KEEP RETURNING TO</span>
          <strong>How do we make this business better — for the people who run it and the people it serves?</strong>
        </div>
      </section>

      <section id="the-thinking" className="section dark-section section-pad">
        <div className="section-index">02 / THE THINKING</div>
        <div className="thinking-head"><h2>I don't collect ideas.<br /><em>I pressure-test them.</em></h2><p>Principles only matter when they change what happens next.</p></div>
        <div className="principles">
          {principles.map((p) => <article className="principle" key={p.n}><span>{p.n}</span><h3>{p.title}</h3><p>{p.text}</p></article>)}
        </div>
        <div className="micro-manifesto"><span>MY FILTER</span><strong>Useful &gt; impressive.</strong><strong>Clear &gt; loud.</strong><strong>Systems &gt; shortcuts.</strong></div>
      </section>

      <section id="the-journey" className="section journey section-pad">
        <div className="section-index">03 / THE JOURNEY</div>
        <div className="journey-intro"><h2>The path<br /><em>left traces.</em></h2><p>Different environments. Different constraints. The same instinct: understand the system, remove friction, make the experience work better.</p></div>
        <div className="timeline">
          {journey.map((j) => (
            <article className="timeline-row" key={j.n}>
              <span className="timeline-num">{j.n}</span>
              <div className="timeline-main"><h3>{j.place}</h3><b>{j.role}</b><p>{j.note}</p><div className="tags">{j.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
              <span className="timeline-dot" />
            </article>
          ))}
        </div>
      </section>

      <section id="the-builds" className="section builds dark-section section-pad">
        <div className="section-index">04 / THE BUILDS</div>
        <div className="builds-head"><h2>Make it real.<br /><em>Then make it cleaner.</em></h2><p>Websites, business profiles, social systems and marketing work — built around the business rather than the template.</p></div>
        <div className="build-grid">
          <article className="build-card build-card--large"><span>01</span><h3>Digital presence</h3><p>From blank screen to a credible, connected presence across the places customers actually look.</p><div className="fake-window"><div className="window-bar" /><div /><div /><div /><div /><div /></div></article>
          <article className="build-card"><span>02</span><h3>Clean marketing</h3><p>No noise for the sake of noise. Make the right business easier for the right people to find, understand and choose.</p><div className="signal"><i /><i /><i /><i /><i /></div></article>
          <article className="build-card"><span>03</span><h3>AI as infrastructure</h3><p>Use AI to reduce friction in marketing, operations and repetitive work — while human judgment stays in the loop.</p><div className="ai-core"><span>AI</span><i /><i /><i /></div></article>
        </div>
      </section>

      <section id="the-ecosystem" className="section ecosystem section-pad">
        <div className="section-index">05 / THE ECOSYSTEM</div>
        <div className="eco-copy"><h2>Two live chapters.<br /><em>One expanding system.</em></h2><p>HIRENIX is my venture. StructGuard is a professional collaboration where I run the international marketing, business relations and consulting layer. Different work. Connected thinking.</p></div>
        <div className="ecosystem-visual">
          <div className="eco-node eco-node--center"><span>ADNAN</span><small>CORE</small></div>
          <div className="eco-node eco-node--h">HIRENIX<div>FOUNDER / RECRUITMENT / MARKETING</div></div>
          <div className="eco-node eco-node--s">STRUCTGUARD<div>INTERNATIONAL MARKETING / RELATIONS / CONSULTING</div></div>
          <div className="orbit-line one" /><div className="orbit-line two" />
          <span className="orbit-particle p1" /><span className="orbit-particle p2" /><span className="orbit-particle p3" />
        </div>
      </section>

      <section id="the-capabilities" className="section capabilities dark-section section-pad">
        <div className="section-index">06 / THE CAPABILITIES</div>
        <div className="cap-grid"><div><h2>Connected<br /><em>capabilities.</em></h2><p className="cap-note">The point isn't to be good at ten unrelated things. It's to make them work together.</p></div><div className="cap-cloud">{capabilities.map((c, i) => <span key={c} style={{ ['--i' as string]: i } as React.CSSProperties}>{c}</span>)}</div></div>
      </section>

      <section id="the-horizon" className="section horizon section-pad">
        <div className="section-index">07 / THE HORIZON</div>
        <div className="horizon-wrap">
          <p className="eyebrow">WHAT I AM BUILDING TOWARD</p>
          <h2>Better businesses.<br /><em>A more capable world.</em></h2>
          <p className="horizon-copy">I want to use business, technology and AI to help companies become more visible, more efficient, more connected and more capable of growing across borders. Beyond companies, I want to contribute to technology that makes human civilisation itself more capable.</p>
          <div className="horizon-rail"><span>BUSINESS</span><i>→</i><span>AI</span><i>→</i><span>HUMANS</span><i>→</i><span>PROGRESS</span></div>
        </div>
      </section>

      <section id="book" className="section book section-pad">
        <div className="book-art"><Image src="/book-cover.jpg" alt="The Unfinished Map by Adnan Maqbool" fill sizes="(max-width: 900px) 65vw, 330px" /></div>
        <div className="book-copy"><div className="section-index">THE HUMAN LAYER</div><h2>Some maps are<br /><em>meant to stay unfinished.</em></h2><p><strong>The Unfinished Map</strong> is a personal book shaped by uncertainty, failure, growth and the search for direction. It belongs here because the business story is only half of the person.</p><a className="text-link" href="https://www.linkedin.com/in/adnan-maqbool-90a56a242/" target="_blank" rel="noreferrer">Read the story on LinkedIn ↗</a></div>
      </section>

      <section id="contact" className="section contact dark-section section-pad">
        <div className="section-index">08 / CONTACT</div>
        <div className="contact-inner"><p className="eyebrow">HAVE A PROBLEM WORTH SOLVING?</p><h2>Bring me the<br /><em>mess.</em></h2><p>I like the part before the answer — where the business is real, the problem is still fuzzy, and there is something worth building.</p><a className="button button--light button--big" href="mailto:Khanadnanofficial432@gmail.com">Start a conversation ↗</a></div>
        <footer><span>ADNAN MAQBOOL / MULTI-DOMAIN BUSINESS STRATEGIST</span><span>PUNE · INDIA · GLOBAL</span><span>© 2026</span></footer>
      </section>
    </main>
  );
}
