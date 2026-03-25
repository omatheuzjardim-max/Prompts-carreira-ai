import "./index.css";

function ArrowIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M17 7H7M17 7v10"/>
    </svg>
  );
}

export default function App() {
  return (
    <div>
      {/* HERO */}
      <div className="container">
        <div className="hero">
          {/* Stats bar */}
          <div className="views-bar">
            <div className="views-bar__item">
              <span>50K</span> views
            </div>
            <div className="views-bar__item">
              <span>13K</span> views
            </div>
          </div>

          <div className="hero__label">sobre mim</div>

          <div className="hero__profile">
            <div className="hero__avatar">
              <img
                src="https://luvadeaplicativo.com/Mockupsemfundo.png"
                alt="Ramon Siqueira"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
            <div>
              <div className="hero__handle">@luvadeaplicativo</div>
              <div className="hero__name">Ramon Siqueira</div>
            </div>
          </div>

          <h1 className="hero__title">
            criador de ia<br />e automação
          </h1>

          <p className="hero__desc">
            Criador focado em <strong>IA, automação e estratégia de conteúdo</strong>.
            <br />
            Meu trabalho é transformar formato validado em resultado prático.
          </p>

          <div className="hero__stats">
            <div className="hero__stat">
              <div className="hero__stat-number">4 mil</div>
              <div className="hero__stat-label">seguidores</div>
            </div>
            <div className="hero__stat">
              <div className="hero__stat-number">1 ano e 6m+</div>
              <div className="hero__stat-label">vivendo de internet</div>
            </div>
          </div>

          <a href="#products" className="hero__cta">
            meus projetos <ArrowIcon />
          </a>
        </div>
      </div>

      <hr className="section-divider" />

      {/* TICKER */}
      <div className="ticker-wrap">
        <div className="ticker-track">
          {[...Array(8)].map((_, i) => (
            <span key={i} className="ticker-item">IA</span>
          ))}
          {[...Array(8)].map((_, i) => (
            <span key={`b${i}`} className="ticker-item">automação</span>
          ))}
          {[...Array(8)].map((_, i) => (
            <span key={`c${i}`} className="ticker-item">conteúdo</span>
          ))}
          {[...Array(8)].map((_, i) => (
            <span key={`d${i}`} className="ticker-item">IA</span>
          ))}
          {[...Array(8)].map((_, i) => (
            <span key={`e${i}`} className="ticker-item">automação</span>
          ))}
          {[...Array(8)].map((_, i) => (
            <span key={`f${i}`} className="ticker-item">conteúdo</span>
          ))}
        </div>
      </div>

      <hr className="section-divider" />

      {/* PRODUTO PRINCIPAL */}
      <div className="container" id="products">
        <div className="section">
          <div className="section__label">produto principal</div>
          <h2 className="section__heading">
            se viralizou<br />
            na gringa<br />
            viraliza<br />
            no brasil•
          </h2>

          <div className="product-main">
            <div className="product-main__image-wrapper">
              <img
                src="https://luvadeaplicativo.com/Mockupsemfundo.png"
                alt="Mockup Lista Viral"
                className="product-main__image"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.opacity = "0.3";
                }}
              />
            </div>
            <div className="product-main__body">
              <div className="product-main__tag">produto principal</div>
              <div className="product-main__title">Lista Viral</div>
              <div className="product-main__desc">
                Acesse o melhor do que viraliza na gringa antes de todo mundo.
              </div>
              <a
                href="https://luvadeaplicativo.com/listaviral"
                className="product-main__btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                entrar no listaviral <ArrowIcon />
              </a>
            </div>
          </div>
        </div>
      </div>

      <hr className="section-divider" />

      {/* OUTROS PROJETOS */}
      <div className="container">
        <div className="section">
          <div className="section__label">outros projetos</div>
          <h2 className="section__heading">
            ferramentas e<br />
            guias
          </h2>

          <div className="tools-grid">
            <a
              className="tool-card"
              href="https://luvadeaplicativo.com/claudeextension/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="tool-card__icon">🧩</div>
              <div className="tool-card__title">Extensão do Claude</div>
              <div className="tool-card__desc">
                Guia rápido para instalar e usar IA no navegador com execução prática.
              </div>
              <div className="tool-card__link">
                abrir extensão <ExternalIcon />
              </div>
            </a>

            <a
              className="tool-card"
              href="https://luvadeaplicativo.com/guiapage/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="tool-card__icon">📱</div>
              <div className="tool-card__title">Controle o Claude pelo Celular</div>
              <div className="tool-card__desc">
                Acesse seu setup de IA do celular, mantendo contexto e continuidade.
              </div>
              <div className="tool-card__link">
                abrir guia <ExternalIcon />
              </div>
            </a>
          </div>
        </div>
      </div>

      <hr className="section-divider" />

      {/* REDES SOCIAIS */}
      <div className="container">
        <div className="section">
          <div className="section__label">redes</div>
          <h2 className="section__heading">
            me acompanhe no<br />
            instagram e youtube
          </h2>

          <div className="social-grid">
            <a
              className="social-card"
              href="https://instagram.com/luvadeaplicativo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="social-card__platform">Instagram</div>
              <div className="social-card__desc">
                Reels, bastidores e conteúdo prático de IA, automação e crescimento.
              </div>
              <div className="social-card__action">
                abrir perfil <ExternalIcon />
              </div>
            </a>

            <a
              className="social-card"
              href="https://youtube.com/@luvadeaplicativo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="social-card__platform">YouTube</div>
              <div className="social-card__desc">
                Vídeos completos com execução real e estratégia aplicada no dia a dia.
              </div>
              <div className="social-card__action">
                ver canal <ExternalIcon />
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="container">
        <div className="footer">
          <p className="footer__text">
            © 2025 Luva de Aplicativo · Ramon Siqueira
          </p>
        </div>
      </div>
    </div>
  );
}
