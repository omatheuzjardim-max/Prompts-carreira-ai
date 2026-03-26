import { useEffect, useRef, useState } from "react";
import "../claude.css";

export default function ClaudeExtension() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [shake, setShake] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const av = document.getElementById("ce-av") as HTMLElement;
    if (av) {
      av.style.backgroundImage = `url('/profile.png'),linear-gradient(135deg,#3DFF92,#3DFF92)`;
    }
  }, []);

  const go = async () => {
    const val = email.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    if (!valid) {
      setShake(true);
      setTimeout(() => setShake(false), 400);
      inputRef.current?.focus();
      return;
    }
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("email", val);
      await fetch("https://luvadeaplicativo.com/claudeextension/salvar_email.php", { method: "POST", body: fd });
    } catch (_) {}
    setSubmitted(true);
    setLoading(false);
  };

  const handleFocus = () => {
    document.body.style.paddingBottom = "320px";
    const scroll = () => {
      if (!inputRef.current) return;
      const rect = inputRef.current.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const targetY = scrollTop + rect.top - 80;
      window.scrollTo({ top: targetY, behavior: "smooth" });
    };
    setTimeout(scroll, 350);
    setTimeout(scroll, 650);
  };

  const handleBlur = () => {
    document.body.style.paddingBottom = "40px";
  };

  return (
    <div className="ce-root">
      <div className="ce-page">

        {/* Perfil */}
        <div className="ce-profile">
          <div className="ce-avatar" id="ce-av" />
          <div className="ce-handle-row">
            <span className="ce-handle-text">@mat.jardim</span>
            <span className="ce-badge">
              <svg width="16" height="16" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="18" fill="#1D9BF0"/>
                <path d="M28 14.5L17.5 25 12 19.5" stroke="white" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </div>

        </div>

        {/* Divisor */}
        <div className="ce-divider" />

        {/* Headline */}
        <div className="ce-headline">
          <h1 className="ce-big">
            1 passo da<br /><span className="ce-hl">extensão</span><br />do Claude AI
          </h1>
          <p className="ce-post">
            Digite seu e-mail e descubra <strong>agora mesmo.</strong>
          </p>
        </div>

        {/* Form */}
        {!submitted && (
          <div className="ce-form" id="formBlock">
            <input
              ref={inputRef}
              type="email"
              placeholder="Seu melhor e-mail"
              autoComplete="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === "Enter" && go()}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className={shake ? "ce-shake" : ""}
              style={shake ? { borderColor: "rgba(61,255,146,0.6)" } : {}}
            />
            <button className="ce-btn" onClick={go} disabled={loading}>
              {loading ? "Um segundo…" : "Quero saber →"}
            </button>
            <p className="ce-privacy">🔒 Sem spam. Seus dados estão seguros.</p>
          </div>
        )}

        {/* Tutorial (após submit) */}
        {submitted && (
          <div className="ce-tutorial ce-visible" id="tutorialBlock">
            <p className="ce-tut-title">🎉 Acesso liberado!</p>
            <p className="ce-tut-sub">Siga os passos abaixo e ative sua máquina agora mesmo.</p>

            <div className="ce-step">
              <div className="ce-step-num">01</div>
              <div className="ce-step-body">
                <p className="ce-step-label">Instale a máquina de lucros</p>
                <p className="ce-step-desc">Clique no link e integre a IA ao seu navegador agora mesmo.</p>
                <a
                  className="ce-ext-link"
                  href="https://chromewebstore.google.com/publisher/anthropic/u308d63ea0533efcf7ba778ad42da7390"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  🔗 Instale a extensão oficial aqui
                </a>
              </div>
            </div>

            <div className="ce-step">
              <div className="ce-step-num">02</div>
              <div className="ce-step-body">
                <p className="ce-step-label">Ative o seu poder</p>
                <p className="ce-step-desc">Fixe a extensão e prepare-se para automatizar seu faturamento.</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
