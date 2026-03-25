import { useEffect, useRef, useState } from "react";
import "../listaviral.css";

const TICK_TEXT = [
  "SE VIRALIZOU NA GRINGA",
  "VIRALIZA NO BRASIL",
  "SE VIRALIZOU NA GRINGA",
  "VIRALIZA NO BRASIL",
  "SE VIRALIZOU NA GRINGA",
  "VIRALIZA NO BRASIL",
  "SE VIRALIZOU NA GRINGA",
  "VIRALIZA NO BRASIL",
];

const FAQS = [
  {
    q: "Isso não é plágio copiar um vídeo da gringa?",
    a: "Não. Você está <strong>modelando um formato</strong>, não copiando o conteúdo literalmente. Todo formato de vídeo que existe no Instagram foi inspirado em outro — isso é modelagem, a mesma estratégia que grandes criadores usam há anos.",
  },
  {
    q: "E se alguém já tiver trazido o mesmo vídeo pro Brasil?",
    a: "<strong>Pode trazer mesmo assim.</strong> O segundo e o terceiro também viralizam. O público brasileiro é gigante — o que atingiu 200 pessoas em outro canal pode atingir 200 mil no seu.",
  },
  {
    q: "Meu perfil é pequeno. Funciona pra mim?",
    a: "Principalmente pra você. <strong>O algoritmo distribui pelo conteúdo, não pelo número de seguidores.</strong> Essa é exatamente a vantagem de quem ainda está crescendo.",
  },
  {
    q: "Preciso de câmera cara ou saber editar muito?",
    a: "Não. Os formatos foram escolhidos pela facilidade de replicação. <strong>Celular, luz natural e o CapCut já resolvem.</strong>",
  },
  {
    q: "Por quanto tempo terei acesso?",
    a: "<strong>Para sempre.</strong> Pagamento único, acesso vitalício. Você recebe o PDF imediatamente após o pagamento e fica com ele para sempre — incluindo atualizações futuras sem custo adicional.",
  },
];

export default function ListaViral() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 59, s: 59 });
  const revealRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 0; m = 0; s = 0; clearInterval(interval); }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("lv-visible");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".lv-reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="lv-root">
      <div className="lv-grid" />

      {/* TICKER */}
      <div className="lv-ticker-wrap" aria-hidden="true">
        <div className="lv-ticker-track">
          {TICK_TEXT.concat(TICK_TEXT).map((t, i) => (
            <span className="lv-ticker-item" key={i}>
              {t}
              <span className="lv-ticker-dot">•</span>
            </span>
          ))}
        </div>
      </div>

      <div className="lv-page">

        {/* HERO */}
        <section className="lv-hero lv-reveal">
          <div className="lv-hero-tags">
            <span className="lv-hero-tag">Criadores de conteúdo</span>
            <span className="lv-hero-tag">Estratégia validada</span>
          </div>
          <h1 className="lv-hero-title">
            SE VIRALIZOU<br />
            NA <span className="lv-hl">GRINGA</span><br />
            VIRALIZA<br />
            NO BRASIL<span className="lv-bullet">•</span>
          </h1>
          <p className="lv-hero-sub">
            Mas você precisa ser rápido pra pegar essa oportunidade de crescer seu <strong>Instagram</strong>
          </p>
        </section>

        {/* PROOF 01 */}
        <section className="lv-section lv-reveal">
          <div className="lv-proof-label">veja a prova</div>
          <div className="lv-proof-set">
            <div className="lv-proof-set-label">prova 01 · Gringa → Brasil · mesmo vídeo</div>
            <div className="lv-proof-grid">
              <div className="lv-proof-card">
                <img
                  className="lv-proof-img"
                  src="https://luvadeaplicativo.com/listaviral/proof-gringa.png"
                  alt="@nicholas.puru original EUA"
                />
                <div className="lv-proof-badge">EUA 🇺🇸</div>
                <div className="lv-proof-meta">
                  <span className="lv-proof-handle">@nicholas.puru</span>
                  <span className="lv-proof-views">1,3MI</span>
                  <span className="lv-proof-flag">Original — EUA 🇺🇸</span>
                </div>
              </div>
              <div className="lv-proof-card lv-highlight">
                <img
                  className="lv-proof-img"
                  src="https://luvadeaplicativo.com/listaviral/proof-brasil.png"
                  alt="@luvadeaplicativo modelado BR"
                />
                <div className="lv-proof-badge">BR 🇧🇷</div>
                <div className="lv-proof-meta">
                  <span className="lv-proof-handle">@luvadeaplicativo</span>
                  <span className="lv-proof-views">200K/24h</span>
                  <span className="lv-proof-flag">Modelado — BR 🇧🇷</span>
                </div>
              </div>
            </div>
            <p className="lv-proof-caption">
              Copiei o formato. Traduzi as falas.<br />300K em 1 semana.
            </p>
          </div>

          <div className="lv-proof-set">
            <div className="lv-proof-set-label">prova 02 · Segundo exemplo · mesmo método</div>
            <div className="lv-proof-grid">
              <div className="lv-proof-card">
                <img
                  className="lv-proof-img"
                  src="https://luvadeaplicativo.com/listaviral/proof-gringa2.png"
                  alt="@liamjohnston.ai original EUA"
                />
                <div className="lv-proof-badge">EUA 🇺🇸</div>
                <div className="lv-proof-meta">
                  <span className="lv-proof-handle">@liamjohnston.ai</span>
                  <span className="lv-proof-views">~200K</span>
                  <span className="lv-proof-flag">Original — EUA 🇺🇸</span>
                </div>
              </div>
              <div className="lv-proof-card lv-highlight">
                <img
                  className="lv-proof-img"
                  src="https://luvadeaplicativo.com/listaviral/proof-brasil2.png"
                  alt="@luvadeaplicativo modelado BR"
                />
                <div className="lv-proof-badge">BR 🇧🇷</div>
                <div className="lv-proof-meta">
                  <span className="lv-proof-handle">@luvadeaplicativo</span>
                  <span className="lv-proof-views">51K</span>
                  <span className="lv-proof-flag">Modelado — BR 🇧🇷</span>
                </div>
              </div>
            </div>
            <p className="lv-proof-caption">
              As falas. Os trejeitos. Os vídeos.<br />Eu só traduzi.
            </p>
          </div>
        </section>

        {/* LOGIC */}
        <section className="lv-logic lv-reveal">
          <div className="lv-tag">a lógica</div>
          <h2 className="lv-logic-title">
            Não é coincidência.
          </h2>
          <p className="lv-logic-body">
            Quando um vídeo viraliza nos EUA, ele ativou algo no <strong>psicológico humano</strong> —
            curiosidade, emoção, identificação. Isso não muda porque a pessoa mora em outro país.
          </p>
          <div className="lv-logic-compare">
            <div className="lv-compare-card">
              <img
                className="lv-compare-img"
                src="https://luvadeaplicativo.com/listaviral/proof-gringa.png"
                alt="Vídeo original da gringa"
              />
              <div className="lv-compare-meta">
                <span className="lv-compare-label">Gringa</span>
                <span className="lv-compare-views">460K</span>
              </div>
            </div>
            <div className="lv-compare-card">
              <img
                className="lv-compare-img"
                src="https://luvadeaplicativo.com/listaviral/proof-brasil.png"
                alt="Vídeo modelado no Brasil"
              />
              <div className="lv-compare-meta">
                <span className="lv-compare-label">Brasil</span>
                <span className="lv-compare-views">110K</span>
              </div>
            </div>
          </div>
        </section>

        {/* COUNTDOWN + OFFER */}
        <section className="lv-countdown-wrap lv-reveal">
          <p className="lv-countdown-label">
            <span>⏱ Esta oferta expira em</span>
          </p>
          <div className="lv-countdown">
            <div className="lv-countdown-unit">
              <span>{pad(timeLeft.h)}</span>
              <span className="lv-countdown-sub">horas</span>
            </div>
            <span className="lv-countdown-sep">:</span>
            <div className="lv-countdown-unit">
              <span>{pad(timeLeft.m)}</span>
              <span className="lv-countdown-sub">min</span>
            </div>
            <span className="lv-countdown-sep">:</span>
            <div className="lv-countdown-unit">
              <span>{pad(timeLeft.s)}</span>
              <span className="lv-countdown-sub">seg</span>
            </div>
          </div>
        </section>

        <section className="lv-offer lv-reveal">
          <p className="lv-price-strike">De R$97</p>
          <p className="lv-price-main"><span>R$</span>47</p>
          <p className="lv-price-desc">
            🍕 Pagamento único · Menos que uma pizza · <strong>Acesso vitalício</strong>
          </p>

          <div className="lv-mockup-wrap">
            <div className="lv-mockup-aura" />
            <img
              className="lv-mockup-img"
              src="https://luvadeaplicativo.com/Mockupsemfundo.png"
              alt="Mockup Lista Viral"
            />
          </div>

          <div className="lv-features">
            {[
              "Vídeos virais validados com links diretos",
              "5 nichos: IA, Motivacional, Vendas, Fitness, Avulsos",
              "Como identificar o que observar em cada vídeo",
              "Lista de tags segmentadas por nicho",
              "Método completo para minerar novos virais",
              "Acesso vitalício — sem mensalidade, sem renovação",
            ].map((f, i) => (
              <div className="lv-feature-item" key={i}>
                <span className="lv-feature-icon" />
                {f}
              </div>
            ))}
          </div>

          <a
            className="lv-cta"
            href="https://pay.kiwify.com.br/lAyn7Pa"
            target="_blank"
            rel="noopener noreferrer"
          >
            Quero viralizar AGORA
          </a>
          <p className="lv-security">🔒 Pagamento seguro · Acesso imediato · Cartão, Pix ou Boleto</p>
        </section>

        {/* FISH / METHOD */}
        <section className="lv-fish lv-reveal">
          <div className="lv-tag">além disso</div>
          <h2 className="lv-fish-title">
            Vou te ensinar a <span className="lv-hl">minerar virais</span> você mesmo.
          </h2>
          <p className="lv-fish-body">
            Você não vai precisar ficar esperando uma lista nova toda semana.
            Dentro do material está o <strong>método completo</strong> que eu uso pra encontrar
            novos virais na gringa antes de todo mundo — filtro de Reels, como identificar o vídeo
            que "fugiu da regra", as tags certas por nicho.
          </p>
          <div className="lv-aside">
            <div className="lv-aside-label">// a real razão do preço</div>
            <p className="lv-aside-text">
              Se eu fosse mesquinho, te venderia só a lista e cobraria todo mês por atualizações.
              Mas prefiro te ensinar a pescar.{" "}
              <em>Você aprende o método — e nunca mais fica sem conteúdo viral.</em>
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="lv-faq lv-reveal">
          <div className="lv-tag">dúvidas</div>
          <h2 className="lv-faq-title">
            Ficou alguma <span className="lv-hl">pergunta?</span>
          </h2>
          {FAQS.map((faq, i) => (
            <div
              className={`lv-faq-item${openFaq === i ? " open" : ""}`}
              key={i}
            >
              <button
                className="lv-faq-q"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                aria-expanded={openFaq === i}
              >
                {faq.q}
                <span className="lv-faq-icon">+</span>
              </button>
              <div
                className="lv-faq-a"
                dangerouslySetInnerHTML={{ __html: faq.a }}
              />
            </div>
          ))}
        </section>

        {/* URGENCY MIDDLE */}
        <section className="lv-urgency lv-reveal">
          <h2 className="lv-urgency-title">
            Você vai continuar postando no escuro —
          </h2>
          <p className="lv-urgency-sub">
            esperando o algoritmo te achar <em>por acidente?</em>
          </p>
          <p className="lv-urgency-sub">Não precisava ser assim.</p>
        </section>

        {/* AUTHOR */}
        <section className="lv-author lv-reveal">
          <div className="lv-tag">quem sou eu</div>
          <h2 className="lv-author-title">
            Aprenda com quem <span className="lv-hl">já fez acontecer.</span>
          </h2>
          <div className="lv-author-card">
            <img
              className="lv-author-avatar"
              src="https://luvadeaplicativo.com/listaviral/foto%20luva.png"
              alt="Luva de Aplicativo"
            />
            <div className="lv-author-handle">
              <span>@luvadeaplicativo</span>
              <svg width="15" height="15" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                <circle cx="20" cy="20" r="18" fill="#1D9BF0"/>
                <path d="M28 14.5L17.5 25 12 19.5" stroke="white" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="lv-author-name">Ramon Siqueira</div>
            <p className="lv-author-bio">
              Peguei um vídeo da gringa, copiei o formato, traduzi as falas
              e bati <strong>200K de views em 24h</strong>. Esse material é o
              atalho que eu queria ter tido no começo. Cada vídeo aqui já foi
              testado pelo mercado americano — <strong>você só precisa modelar.</strong>
              Acompanhe meu perfil e veja que eu continuo usando esse método até hoje.
            </p>
            <div className="lv-author-stats">
              <div className="lv-author-stat">
                <strong>200K</strong>
                <span>views em 24h</span>
              </div>
              <div className="lv-author-stat">
                <strong>300K</strong>
                <span>em 1 semana</span>
              </div>
              <div className="lv-author-stat">
                <strong>R$0</strong>
                <span>de custo</span>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="lv-final lv-reveal">
          <h2 className="lv-final-title">
            Enquanto você pensa,{" "}
            <span className="lv-hl">alguém já está</span>{" "}
            postando o mesmo viral.
          </h2>
          <p className="lv-final-sub">
            Esse não é um exagero. É como o método funciona — quem chega primeiro no Brasil
            leva a maior fatia de views. <strong>A lista está aqui. O próximo passo é seu.</strong>
          </p>
          <a
            className="lv-cta"
            href="https://pay.kiwify.com.br/lAyn7Pa"
            target="_blank"
            rel="noopener noreferrer"
          >
            Quero viralizar AGORA
          </a>
          <p className="lv-final-cta-price">
            R$47 pagamento único · Acesso imediato · Garantia incluída
          </p>
        </section>

      </div>

      <footer className="lv-footer">
        <span className="lv-ornament">✴·✴✧</span>
        © 2025 Luva de Aplicativo · Ramon Siqueira
      </footer>
    </div>
  );
}
