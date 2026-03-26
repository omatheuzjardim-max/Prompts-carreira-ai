import { useEffect } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import "./index.css";
import ClaudeExtension from "./pages/ClaudeExtension";
import ListaViral from "./pages/ListaViral";

function Home() {
  useEffect(() => {
    const canvas = document.getElementById("particles") as HTMLCanvasElement;
    const ctx = canvas?.getContext("2d");
    let animId: number;
    if (canvas && ctx) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const particles: { x: number; y: number; vx: number; vy: number; r: number; a: number }[] = [];
      for (let i = 0; i < 72; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: 0.6 + Math.random() * 1.6,
          a: 0.12 + Math.random() * 0.38,
        });
      }
      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const p of particles) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(61,255,146,${p.a})`;
          ctx.fill();
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0) p.x = canvas.width;
          if (p.x > canvas.width) p.x = 0;
          if (p.y < 0) p.y = canvas.height;
          if (p.y > canvas.height) p.y = 0;
        }
        animId = requestAnimationFrame(draw);
      };
      draw();
      const onResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      window.addEventListener("resize", onResize);
      return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener("resize", onResize);
      };
    }
  }, []);

  useEffect(() => {
    const av = document.getElementById("av") as HTMLElement;
    if (av) {
      av.style.backgroundImage = `url('https://luvadeaplicativo.com/Mockupsemfundo.png'),linear-gradient(140deg,#3dff92,#3dff92)`;
    }
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("visible");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const spawnWordSpark = (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;
      const r = el.getBoundingClientRect();
      const s = document.createElement("span");
      s.className = "spark spark-top";
      const x = r.left + Math.random() * r.width;
      const y = r.top + Math.random() * r.height;
      const dx = (Math.random() - 0.5) * 40;
      const dy = -(10 + Math.random() * 35);
      const size = 1.2 + Math.random() * 2.5;
      const color = Math.random() > 0.5 ? "#3dff92" : "#ffffff";
      s.style.cssText = `left:${x}px;top:${y}px;width:${size}px;height:${size}px;background:${color};box-shadow:0 0 6px ${color},0 0 12px ${color};--dx:${dx}px;--dy:${dy}px;`;
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 520);
    };
    const wordInterval = setInterval(() => {
      spawnWordSpark("word-ia");
      if (Math.random() > 0.5) spawnWordSpark("word-auto");
    }, 520);

    const spawnMockupSpark = () => {
      const box = document.getElementById("mockupBox");
      if (!box) return;
      const r = box.getBoundingClientRect();
      const s = document.createElement("span");
      s.className = "spark";
      const x = r.left + Math.random() * r.width;
      const y = r.top + r.height * (0.28 + Math.random() * 0.45);
      const dx = (Math.random() - 0.5) * 90;
      const dy = -(35 + Math.random() * 95);
      const size = 1.4 + Math.random() * 4.4;
      const dur = 640 + Math.random() * 680;
      s.style.cssText = `left:${x}px;top:${y}px;width:${size}px;height:${size}px;background:#3dff92;box-shadow:0 0 10px rgba(61,255,146,.85),0 0 20px rgba(61,255,146,.55);--dx:${dx}px;--dy:${dy}px;animation-duration:${dur}ms;`;
      document.body.appendChild(s);
      setTimeout(() => s.remove(), dur);
    };
    const mockupInterval = setInterval(spawnMockupSpark, 170);

    return () => {
      clearInterval(wordInterval);
      clearInterval(mockupInterval);
    };
  }, []);

  useEffect(() => {
    const fx = document.getElementById("viewsFx");
    if (!fx) return;
    const nums = ["50K views", "13K views", "48.7K", "12.9K", "views", "50K", "13K"];
    const spawn = () => {
      const el = document.createElement("span");
      el.className = "view-num";
      el.textContent = nums[Math.floor(Math.random() * nums.length)];
      const x = 10 + Math.random() * 80;
      const drift = (Math.random() - 0.5) * 60;
      const dur = 3200 + Math.random() * 2400;
      el.style.cssText = `left:${x}%;bottom:0;--drift:${drift}px;animation-duration:${dur}ms;`;
      fx.appendChild(el);
      setTimeout(() => el.remove(), dur);
    };
    spawn();
    const interval = setInterval(spawn, 900);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="grid-bg" />
      <canvas id="particles" />
      <div className="particles-dim" />
      <div className="views-fx" id="viewsFx" aria-hidden="true" />

      <main>
        <section id="hero">
          <div className="inner">
            <span className="tag reveal">sobre mim</span>
            <div className="avatar-wrap reveal">
              <div className="avatar-ring" />
              <div className="avatar" id="av" />
            </div>
            <div className="handle reveal">
              <span>@luvadeaplicativo</span>
              <svg width="17" height="17" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                <circle cx="20" cy="20" r="18" fill="#1D9BF0"/>
                <path d="M28 14.5L17.5 25 12 19.5" stroke="white" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="name reveal">Ramon Siqueira</div>

            <h1 className="title reveal">
              criador de{" "}
              <span className="r spark-word" id="word-ia">ia</span>
              <br />
              e{" "}
              <span className="r spark-word" id="word-auto">automação</span>
            </h1>
            <p className="body reveal">
              Criador focado em{" "}
              <strong>IA, automação e estratégia de conteúdo</strong>.{" "}
              Meu trabalho é transformar formato validado em resultado prático.
            </p>

            <div className="stats reveal">
              <div className="stat">
                <strong>4 mil</strong>
                <span>seguidores</span>
              </div>
              <div className="stat">
                <strong>1 ano e 6m+</strong>
                <span>vivendo de internet</span>
              </div>
            </div>

            <a className="scroll-cta reveal" href="#products">
              <span>meus projetos</span>
              <div className="chevrons">
                <svg viewBox="0 0 36 22" fill="none">
                  <polyline points="2,3 18,19 34,3" stroke="#3dff92" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <svg viewBox="0 0 36 22" fill="none">
                  <polyline points="2,3 18,19 34,3" stroke="#3dff92" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" opacity=".82"/>
                </svg>
                <svg viewBox="0 0 36 22" fill="none">
                  <polyline points="2,3 18,19 34,3" stroke="#3dff92" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" opacity=".64"/>
                </svg>
              </div>
            </a>
          </div>
        </section>

        <section id="products">
          <div className="inner">
            <span className="tag reveal">produto principal</span>
            <h2 className="title reveal">
              se viralizou<br />
              na <span className="r">gringa</span><br />
              viraliza<br />
              no <span>brasil</span><span style={{color:"var(--white)"}}>•</span>
            </h2>

            <div className="product-showcase reveal">
              <div className="mockup-wrap" id="mockupBox">
                <div className="mockup-aura" />
                <img
                  src="https://luvadeaplicativo.com/Mockupsemfundo.png"
                  className="mockup-media"
                  alt="Mockup Lista Viral"
                />
              </div>
            </div>

            <a className="cta reveal" href="/listaviral/">
              entrar no listaviral
            </a>
          </div>
        </section>

        <section id="other-projects">
          <div className="inner">
            <span className="tag reveal">outros projetos</span>
            <h2 className="title reveal">
              ferramentas e<br />
              <span className="r">guias</span>
            </h2>
            <div className="cards">
              <div className="card reveal">
                <h3>Extensão do Claude</h3>
                <p>Guia rápido para instalar e usar IA no navegador com execução prática.</p>
                <a className="project-btn" href="/claudeextension/">abrir extensão</a>
              </div>
              <div className="card reveal">
                <h3>Controle o Claude pelo Celular</h3>
                <p>Acesse seu setup de IA do celular, mantendo contexto e continuidade.</p>
                <a className="project-btn" href="https://luvadeaplicativo.com/guiapage/" target="_blank" rel="noopener noreferrer">abrir guia</a>
              </div>
            </div>
          </div>
        </section>

        <section id="redes">
          <div className="inner">
            <span className="tag reveal">redes</span>
            <h2 className="title reveal">
              me acompanhe no<br />
              <span className="r">instagram</span> e <span className="r">youtube</span>
            </h2>
            <div className="media-grid">
              <a
                className="media-card reveal"
                href="https://instagram.com/luvadeaplicativo"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h3>Instagram</h3>
                <p>Reels, bastidores e conteúdo prático de IA, automação e crescimento.</p>
                <span className="media-btn">abrir perfil</span>
              </a>
              <a
                className="media-card reveal"
                href="https://youtube.com/@luvadeaplicativo"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h3>YouTube</h3>
                <p>Vídeos completos com execução real e estratégia aplicada no dia a dia.</p>
                <span className="media-btn">ver canal</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <p>© 2025 Luva de Aplicativo · Ramon Siqueira</p>
      </footer>
    </>
  );
}

export default function App() {
  return (
    <WouterRouter>
      <Switch>
        <Route path="/claudeextension/" component={ClaudeExtension} />
        <Route path="/claudeextension" component={ClaudeExtension} />
        <Route path="/listaviral/" component={ListaViral} />
        <Route path="/listaviral" component={ListaViral} />
        <Route component={Home} />
      </Switch>
    </WouterRouter>
  );
}
