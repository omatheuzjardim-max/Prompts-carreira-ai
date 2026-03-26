import { useEffect, useRef, useState } from "react";
import "../listaviral.css";

const FAQS = [
  { q: "Isso não é plágio copiar um vídeo da gringa?", a: "Não. Você está <strong>modelando um formato</strong>, não copiando o conteúdo literalmente. Todo formato de vídeo que existe no Instagram foi inspirado em outro — isso é modelagem, a mesma estratégia que grandes criadores usam há anos." },
  { q: "E se alguém já tiver trazido o mesmo vídeo pro Brasil?", a: "<strong>Pode trazer mesmo assim.</strong> O segundo e o terceiro também viralizam. O público brasileiro é gigante — o que atingiu 200 pessoas em outro canal pode atingir 200 mil no seu." },
  { q: "Meu perfil é pequeno. Funciona pra mim?", a: "Principalmente pra você. <strong>O algoritmo distribui pelo conteúdo, não pelo número de seguidores.</strong> Essa é exatamente a vantagem de quem ainda está crescendo." },
  { q: "Preciso de câmera cara ou saber editar muito?", a: "Não. Os formatos foram escolhidos pela facilidade de replicação. <strong>Celular, luz natural e o CapCut já resolvem.</strong>" },
  { q: "Por quanto tempo terei acesso?", a: "<strong>Para sempre.</strong> Pagamento único, acesso vitalício. Você recebe o PDF imediatamente após o pagamento e fica com ele para sempre — incluindo atualizações futuras sem custo adicional." },
];

function pad(n: number) { return String(n).padStart(2, "0"); }

function formatViews(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1).replace(".", ",")}M views`;
  if (n >= 1000) return `${Math.round(n / 1000)}K views`;
  return `${Math.round(n)} views`;
}

export default function ListaViral() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [timer, setTimer] = useState({ h: 23, m: 59, s: 59 });
  const [lcUsNum, setLcUsNum] = useState("0");
  const [lcBrNum, setLcBrNum] = useState("0");
  const rootRef = useRef<HTMLDivElement>(null);

  // ── COUNTDOWN ──
  useEffect(() => {
    const iv = setInterval(() => {
      setTimer(prev => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 0; m = 0; s = 0; clearInterval(iv); }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(iv);
  }, []);

  // ── RED PARTICLES WITH CONNECTIONS ──
  useEffect(() => {
    const c = document.getElementById("lv-particles") as HTMLCanvasElement;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    let W = 0, H = 0;
    interface Pt { x: number; y: number; vx: number; vy: number; r: number; pulse: number; }
    let pts: Pt[] = [];
    let animId: number;
    const isMobile = window.matchMedia("(max-width:900px)").matches;
    const low = isMobile;

    function resize() {
      W = c.width = innerWidth;
      H = c.height = innerHeight;
      init();
    }
    function init() {
      pts = [];
      const n = Math.floor(W * H / (low ? 22000 : 7000));
      for (let i = 0; i < n; i++) pts.push({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - .5) * (low ? .16 : .25),
        vy: (Math.random() - .5) * (low ? .16 : .25),
        r: Math.random() * (low ? 1.2 : 1.8) + (low ? .4 : .5),
        pulse: Math.random() * Math.PI * 2
      });
    }
    let last = 0;
    function draw(ts: number) {
      if (low && ts - last < 33) { animId = requestAnimationFrame(draw); return; }
      last = ts;
      ctx.clearRect(0, 0, W, H);
      if (!low) {
        for (let i = 0; i < pts.length; i++) {
          for (let j = i + 1; j < pts.length; j++) {
            const a = pts[i], b = pts[j];
            const d = Math.hypot(a.x - b.x, a.y - b.y);
            if (d < 140) {
              const alpha = .32 * (1 - d / 140);
              ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
              ctx.strokeStyle = `rgba(61,255,146,${alpha})`; ctx.lineWidth = .8; ctx.stroke();
            }
          }
        }
      }
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.pulse += .02;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        const glow = .5 + .5 * Math.sin(p.pulse);
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5);
        g.addColorStop(0, `rgba(61,255,146,${.5 * glow})`);
        g.addColorStop(1, "rgba(61,255,146,0)");
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.fill();
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(61,255,146,${.7 + .3 * glow})`; ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    }
    window.addEventListener("resize", resize);
    resize(); animId = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  // ── HERO VIEWS FLOAT ──
  useEffect(() => {
    const layer = document.getElementById("hero-views-fx");
    const hero = document.getElementById("lv-hero");
    if (!layer || !hero) return;
    const targets = [12000, 38000, 51000, 87000, 120000, 200000, 300000, 1300000, 2100000];
    const isMobile = window.matchMedia("(max-width:900px)").matches;
    const low = isMobile;

    function spawn() {
      if (document.hidden) return;
      const rect = hero.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const el = document.createElement("span");
      el.className = "view-num";
      const end = targets[Math.floor(Math.random() * targets.length)];
      const start = Math.max(1200, Math.floor(end * (0.22 + Math.random() * 0.28)));
      el.textContent = formatViews(start);
      el.style.left = `${6 + Math.random() * 88}%`;
      el.style.top = `${6 + Math.random() * 70}%`;
      el.style.setProperty("--drift", `${(Math.random() - .5) * 90}px`);
      el.style.setProperty("--s", `${0.86 + Math.random() * 0.5}`);
      const dur = (low ? 1700 : 2200) + Math.random() * (low ? 1300 : 1700);
      el.style.animationDuration = `${dur}ms`;
      layer.appendChild(el);
      const t0 = performance.now();
      const t = setInterval(() => {
        const p = Math.min(1, (performance.now() - t0) / dur);
        const e = 1 - Math.pow(1 - p, 3);
        el.textContent = formatViews(start + (end - start) * e);
        if (p >= 1) clearInterval(t);
      }, low ? 120 : 70);
      setTimeout(() => { clearInterval(t); el.remove(); }, dur);
    }
    const iv = setInterval(() => { spawn(); if (!low && Math.random() > .55) spawn(); }, low ? 950 : 420);
    return () => clearInterval(iv);
  }, []);

  // ── GRINGA STARS ──
  useEffect(() => {
    const word = document.getElementById("lv-gringa-word");
    if (!word) return;
    const CHARS = ["✦", "✧", "⋆", "·", "✴", "✵", "*"];
    const isMobile = window.matchMedia("(max-width:900px)").matches;
    function spawnStar() {
      if (document.hidden) return;
      const rect = word.getBoundingClientRect();
      if (rect.width === 0 || rect.bottom < 0 || rect.top > window.innerHeight) return;
      const s = document.createElement("span");
      s.className = "gringa-star";
      s.textContent = CHARS[Math.floor(Math.random() * CHARS.length)];
      const x = rect.left + Math.random() * rect.width;
      const y = rect.top + Math.random() * rect.height;
      const dx = (Math.random() - .5) * 90;
      const dy = -(35 + Math.random() * 85);
      const size = 13 + Math.random() * 22;
      const dur = 900 + Math.random() * 700;
      s.style.cssText = `left:${x}px;top:${y}px;font-size:${size}px;--dx:${dx}px;--dy:${dy}px;animation-duration:${dur}ms;`;
      document.body.appendChild(s);
      setTimeout(() => s.remove(), dur);
    }
    const iv = setInterval(spawnStar, isMobile ? 260 : 180);
    return () => clearInterval(iv);
  }, []);

  // ── SHOCK WORD SPARKS ──
  useEffect(() => {
    const word = document.getElementById("lv-shock-word");
    if (!word) return;
    const COLORS = ["#3dff92", "#3dff92", "#ffffff", "#3dff92", "#3dff92"];
    const isMobile = window.matchMedia("(max-width:900px)").matches;
    function spawnSparks() {
      if (document.hidden) return;
      const rect = word.getBoundingClientRect();
      if (rect.width === 0 || rect.bottom < 0 || rect.top > window.innerHeight) return;
      const count = 2 + Math.floor(Math.random() * 2);
      for (let i = 0; i < count; i++) {
        const s = document.createElement("span");
        s.className = "word-spark";
        const x = rect.left + Math.random() * rect.width;
        const y = rect.top + Math.random() * rect.height;
        const angle = Math.random() * Math.PI * 2;
        const dist = 18 + Math.random() * 42;
        const size = 1.5 + Math.random() * 3;
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        s.style.cssText = `left:${x}px;top:${y}px;width:${size}px;height:${size}px;background:${color};box-shadow:0 0 6px ${color},0 0 12px ${color};--dx:${Math.cos(angle) * dist}px;--dy:${Math.sin(angle) * dist}px;`;
        document.body.appendChild(s);
        setTimeout(() => s.remove(), 520);
      }
    }
    const iv = setInterval(spawnSparks, isMobile ? 420 : 280);
    return () => clearInterval(iv);
  }, []);

  // ── REVEAL ON SCROLL ──
  useEffect(() => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
      });
    }, { threshold: .13 });
    document.querySelectorAll(".lv-root .reveal").forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  // ── PROOF PHONE ANIMATIONS ──
  useEffect(() => {
    function animateProof(id: string) {
      const wrap = document.getElementById(id);
      if (!wrap) return;
      const io = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        wrap.classList.add("animated");
        wrap.querySelectorAll(".views[data-target]").forEach(el => {
          const elem = el as HTMLElement;
          if (elem.dataset.done === "1") return;
          elem.dataset.done = "1";
          const target = Number(elem.dataset.target || 0);
          const kind = elem.dataset.kind || "k";
          const prefix = elem.dataset.prefix || "";
          const suffix = elem.dataset.suffix || "";
          const start = Math.max(0, Math.round(target * 0.18));
          const dur = 1700 + Math.random() * 850;
          const fmt = (v: number) => {
            if (kind === "mi") return `${(v / 1000000).toFixed(1).replace(".", ",")}MI`;
            if (kind === "k") return `${Math.round(v / 1000)}K`;
            return String(Math.round(v));
          };
          const t0 = performance.now();
          const tick = (now: number) => {
            const p = Math.min(1, (now - t0) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            elem.textContent = prefix + fmt(start + (target - start) * eased) + suffix;
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      }, { threshold: .4 });
      io.observe(wrap);
    }
    animateProof("lv-proof1");
    animateProof("lv-proof2");
  }, []);

  // ── LOGIC COMPARE COUNTER ANIMATION ──
  useEffect(() => {
    const wrap = document.getElementById("lv-logic-compare");
    if (!wrap) return;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      function countUp(setter: (v: string) => void, target: number, suffix: string) {
        const dur = 1800;
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          const cur = Math.round(target * eased);
          setter(`${Math.round(cur / 1000)}K${suffix}`);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
      countUp(setLcUsNum, 460000, "");
      setTimeout(() => countUp(setLcBrNum, 110000, ""), 400);
    }, { threshold: .3 });
    io.observe(wrap);
  }, []);

  return (
    <div className="lv-root" ref={rootRef}>
      <div className="lv-grid" />
      <canvas id="lv-particles" />
      <div className="lv-particles-dim" />

      {/* ── HERO ── */}
      <section id="lv-hero">
        <div className="hero-views-fx" id="hero-views-fx" aria-hidden="true" />

        <span className="hero-kicker">
          <span>+ 300 prompts</span>
        </span>

        <h1 className="hero-title">
          <span className="hero-line">PARE DE</span>
          <span className="hero-line">IMPROVISAR COM</span>
          <span className="hero-line"><span className="r" id="lv-gringa-word">IA NO TRABALHO</span></span>
        </h1>

        <p className="hero-urgency">
          <span className="urgency-inner">
            300 prompts prontos para escrever melhor, responder com clareza, organizar demandas, gerar ideias e produzir mais no dia a dia. Use ChatGPT, Claude e outras IAs de forma mais <span className="r" id="lv-shock-word">prática</span>, rápida e inteligente — sem depender de tentativa e erro toda vez que abrir a tela.<span className="urgency-cursor">_</span>
          </span>
        </p>

        <a href="#lv-price-anchor" className="btn reveal visible" style={{ marginTop: "40px", width: "auto" }}>
          Quero acessar os 300 prompts
        </a>


      </section>

      {/* ── PROOF 1 ── */}
      <div id="lv-proof1wrap" className="proof-block">
        <div className="tag reveal" style={{ display: "block", textAlign: "center", margin: "0 auto 16px" }}>prova 01</div>
        <p className="proof-label reveal">Gringa → Brasil &nbsp;·&nbsp; <span>mesmo vídeo</span></p>

        <div className="phones-wrap" id="lv-proof1">
          <div className="phone-card gringa reveal left">
            <img src="https://luvadeaplicativo.com/listaviral/proof-gringa.png" alt="@nicholas.puru" />
            <div className="phone-info">
              <div className="handle">@nicholas.puru</div>
              <div className="views" data-target="1300000" data-kind="mi">1,3MI</div>
              <div className="sub">Original — EUA 🇺🇸</div>
            </div>
          </div>
          <div className="arrow-mid">
            <svg className="arrow-svg" width="56" height="36" viewBox="0 0 56 36">
              <path className="arrow-path" d="M4,18 Q28,18 48,18" />
              <polygon className="arrow-head" points="54,18 45,13 45,23" />
            </svg>
          </div>
          <div className="phone-card brasil">
            <img src="https://luvadeaplicativo.com/listaviral/proof-brasil.png" alt="@mat.jardim" />
            <div className="phone-info">
              <div className="handle">@mat.jardim</div>
              <div className="views sparkle-red" data-target="200000" data-kind="k" data-suffix="/24h">200K/24h</div>
              <div className="sub">Modelado — BR 🇧🇷</div>
            </div>
          </div>
        </div>

        <div className="proof-explain">
          <div className="big reveal">Copiei o formato. Traduzi as falas.<br /><span className="r sparkle-red">300K em 1 semana.</span></div>
        </div>
      </div>

      <div className="lv-divider" />

      {/* ── PROOF 2 ── */}
      <div className="proof-block">
        <div className="tag reveal" style={{ display: "block", textAlign: "center", margin: "0 auto 16px" }}>prova 02</div>
        <p className="proof-label reveal">Segundo exemplo · <span>mesmo método</span></p>

        <div className="phones-wrap" id="lv-proof2">
          <div className="phone-card gringa reveal left">
            <img src="https://luvadeaplicativo.com/listaviral/proof-gringa2.png" alt="@liamjohnston.ai" />
            <div className="phone-info">
              <div className="handle">@liamjohnston.ai</div>
              <div className="views" data-target="200000" data-kind="k" data-prefix="~">~200K</div>
              <div className="sub">Original — EUA 🇺🇸</div>
            </div>
          </div>
          <div className="arrow-mid">
            <svg className="arrow-svg" width="56" height="36" viewBox="0 0 56 36">
              <path className="arrow-path" d="M4,18 Q28,18 48,18" />
              <polygon className="arrow-head" points="54,18 45,13 45,23" />
            </svg>
          </div>
          <div className="phone-card brasil">
            <img src="https://luvadeaplicativo.com/listaviral/proof-brasil2.png" alt="@mat.jardim 51k" />
            <div className="phone-info">
              <div className="handle">@mat.jardim</div>
              <div className="views sparkle-red" data-target="51000" data-kind="k">51K</div>
              <div className="sub">Modelado — BR 🇧🇷</div>
            </div>
          </div>
        </div>

        <div className="proof-explain">
          <div className="big reveal">As falas. Os trejeitos. Os vídeos.<br />Eu só <span className="r">traduzi.</span></div>
        </div>
      </div>

      <div className="lv-divider" />

      {/* ── WHY / LOGIC ── */}
      <div className="lv-section lv-section-dark">
        <div className="inner" style={{ textAlign: "center" }}>
          <div className="tag reveal" style={{ display: "inline-flex" }}>a lógica</div>
          <h2 className="section-title reveal">Não é <span className="r">coincidência.</span></h2>
          <p className="section-body reveal" style={{ margin: "0 auto" }}>
            Quando um vídeo viraliza nos EUA, ele ativou algo no <strong>psicológico humano</strong> —
            curiosidade, emoção, identificação. Isso não muda porque a pessoa mora em outro país.
          </p>

          <div className="logic-compare reveal" id="lv-logic-compare">
            <div className="lc-col">
              <div className="lc-region gringa lc-title">Gringa</div>
              <article className="lc-card us">
                <div className="lc-media">
                  <div className="lc-media-clip">
                    <img src="https://luvadeaplicativo.com/listaviral/proof-gringa.png" alt="Vídeo original da gringa" />
                    <svg className="lc-line" viewBox="0 0 100 160" preserveAspectRatio="none" aria-hidden="true">
                      <polyline points="0,154 0,154" />
                    </svg>
                    <div className="lc-overlay"><div className="lc-num">{lcUsNum}</div></div>
                  </div>
                </div>
              </article>
            </div>
            <div className="lc-col">
              <div className="lc-region brasil lc-title">Brasil</div>
              <article className="lc-card br">
                <div className="lc-media">
                  <div className="lc-media-clip">
                    <img src="https://luvadeaplicativo.com/listaviral/proof-brasil.png" alt="Vídeo modelado no Brasil" />
                    <svg className="lc-line" viewBox="0 0 100 160" preserveAspectRatio="none" aria-hidden="true">
                      <polyline points="0,154 0,154" />
                    </svg>
                    <div className="lc-overlay"><div className="lc-num">{lcBrNum}</div></div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>

      <div className="lv-divider" />

      {/* ── PIZZA + PRICE ── */}
      <section className="price-section" id="lv-price-anchor">
        <div className="inner" style={{ textAlign: "center" }}>
          <div className="pizza-big reveal" style={{ marginBottom: "24px" }}>
            Menos<br />que um<br />
            <span className="r">
              <span className="rolezinho-r-wrap">r<span className="rolezinho-party">🎉</span></span>
              olezinh
              <span className="rolezinho-o-wrap">o<span className="rolezinho-drink">🍹</span></span>
            </span>
          </div>

          <div className="price-box reveal scale">
            <div className="countdown-wrap">
              <span className="countdown-label">⏱ Esta oferta expira em</span>
              <div className="countdown-timer">
                <div className="cdown-unit">
                  <span className="cdown-num">{pad(timer.h)}</span>
                  <span className="cdown-lbl">horas</span>
                </div>
                <span className="cdown-sep">:</span>
                <div className="cdown-unit">
                  <span className="cdown-num">{pad(timer.m)}</span>
                  <span className="cdown-lbl">min</span>
                </div>
                <span className="cdown-sep">:</span>
                <div className="cdown-unit">
                  <span className="cdown-num">{pad(timer.s)}</span>
                  <span className="cdown-lbl">seg</span>
                </div>
              </div>
            </div>

            <div className="price-old">De R$97</div>
            <div className="price-big"><sup>R$</sup>47</div>
            <div className="price-note">🍕 Pagamento único · Menos que uma pizza · Acesso vitalício</div>

            <div className="offer-mockup-wrap reveal">
              <div className="offer-mockup-glow" />
              <img src="/mockup.png" alt="Mockup Prompts Carreira AI" className="offer-mockup" />
            </div>

            <ul className="price-includes">
              <li>Vídeos virais validados com links diretos</li>
              <li>5 nichos: IA, Motivacional, Vendas, Fitness, Avulsos</li>
              <li>Como identificar o que observar em cada vídeo</li>
              <li>Lista de tags segmentadas por nicho</li>
              <li>Método completo para minerar novos virais</li>
              <li>Acesso vitalício — sem mensalidade, sem renovação</li>
            </ul>

            <a href="https://pay.kiwify.com.br/lAyn7Pa" className="btn" target="_blank" rel="noopener noreferrer">
              Quero viralizar AGORA
            </a>
            <p className="btn-note">🔒 Pagamento seguro · Acesso imediato · Cartão, Pix ou Boleto</p>
          </div>
        </div>
      </section>

      <div className="lv-divider" />

      {/* ── METHOD ── */}
      <section className="lv-section lv-section-dark">
        <div className="inner">
          <div className="tag reveal">além disso</div>
          <h2 className="section-title reveal">
            Vou te ensinar a<br /><span className="r">minerar virais</span><br />você mesmo.
          </h2>
          <p className="section-body reveal">
            Você não vai precisar ficar esperando uma lista nova toda semana.
            Dentro do material está o <strong>método completo</strong> que eu uso pra encontrar
            novos virais na gringa antes de todo mundo — filtro de Reels, como identificar o vídeo
            que "fugiu da regra", as tags certas por nicho.
          </p>
          <div className="law-card reveal" style={{ maxWidth: "100%", margin: "32px 0 0" }}>
            <span className="law-card-label">// a real razão do preço</span>
            <p>
              Se eu fosse mesquinho, te venderia só a lista e cobraria todo mês por atualizações.
              Mas prefiro te ensinar a pescar. <em>Você aprende o método — e nunca mais fica sem conteúdo viral.</em>
            </p>
          </div>
        </div>
      </section>

      <div className="lv-divider" />

      {/* ── FAQ ── */}
      <section className="lv-section">
        <div className="inner">
          <div className="tag reveal">dúvidas</div>
          <h2 className="section-title reveal">Ficou alguma <span className="r">pergunta?</span></h2>
          <div className="faq-list">
            {FAQS.map((faq, i) => (
              <div className={`faq-details${openFaq === i ? " open" : ""}`} key={i}>
                <button
                  className="faq-summary"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {faq.q}
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-answer" dangerouslySetInnerHTML={{ __html: faq.a }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="lv-divider" />

      {/* ── CREATOR ── */}
      <section className="lv-section lv-section-dark">
        <div className="inner">
          <div className="tag reveal">quem sou eu</div>
          <h2 className="section-title reveal">Aprenda com quem <span className="r">já fez acontecer.</span></h2>
          <div className="creator-card reveal">
            <div className="creator-photo-wrap">
              <div className="creator-ring" />
              <img
                className="creator-photo"
                src="/profile.png"
                alt="Matheus Jardim"
                onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
            </div>
            <div>
              <div className="creator-handle">@mat.jardim</div>
              <div className="creator-name">Matheus Jardim</div>
              <p className="creator-bio">
                Peguei um vídeo da gringa, copiei o formato, traduzi as falas
                e bati <strong>200K de views em 24h</strong>. Esse material é o
                atalho que eu queria ter tido no começo. Cada vídeo aqui já foi
                testado pelo mercado americano — <strong>você só precisa modelar.</strong>
                Acompanhe meu perfil e veja que eu continuo usando esse método até hoje.
              </p>
              <div className="creator-stats">
                <div className="cstat"><strong>200K</strong><span>views em 24h</span></div>
                <div className="cstat"><strong>300K</strong><span>em 1 semana</span></div>
                <div className="cstat"><strong>R$0</strong><span>de custo</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="lv-divider" />

      {/* ── FINAL ── */}
      <section className="final-section">
        <div className="inner">
          <h2 className="final-title reveal">
            Enquanto você pensa, <span className="r">alguém já está</span> postando o mesmo viral.
          </h2>
          <p className="final-sub reveal">
            Esse não é um exagero. É como o método funciona — quem chega primeiro no Brasil
            leva a maior fatia de views. A lista está aqui. O próximo passo é seu.
          </p>
          <a href="https://pay.kiwify.com.br/lAyn7Pa" className="btn reveal" target="_blank" rel="noopener noreferrer">
            Quero viralizar AGORA
          </a>
          <p className="btn-note reveal" style={{ marginTop: "14px" }}>
            R$47 pagamento único · Acesso imediato · Garantia incluída
          </p>
          <br />
          <a href="https://pay.kiwify.com.br/lAyn7Pa" className="btn reveal" target="_blank" rel="noopener noreferrer">
            Quero viralizar AGORA
          </a>
        </div>
      </section>

      <footer className="lv-footer">
        ✴·✴✧<br />
        © 2025 Matheus Jardim
      </footer>
    </div>
  );
}
