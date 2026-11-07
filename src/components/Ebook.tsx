import Secao from './Secao'
import { capitulosEbook, curso, EBOOK_EMBED_URL, EBOOK_URL } from '../data/curso'

export default function Ebook() {
  return (
    <Secao
      id="ebook"
      numero={4}
      titulo="eBook"
      lead="Depois do vídeo, aprofunde no seu ritmo. O eBook é interativo: folheie as páginas, clique nos destaques e volte a ele sempre que precisar."
      fundo="papel"
    >
      {EBOOK_EMBED_URL ? (
        <div className="ebook">
          <iframe
            src={EBOOK_EMBED_URL}
            title={`eBook: ${curso.titulo}`}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      ) : (
        !EBOOK_URL && (
          <div className="cartao ebook__aviso" role="note">
            <p>
              <strong>eBook em publicação.</strong> O link aparece aqui assim que ele for publicado.
            </p>
          </div>
        )
      )}

      {EBOOK_URL && (
        <p className="hero__acoes">
          <a className="botao botao--primario" href={EBOOK_URL} target="_blank" rel="noreferrer">
            Abrir o eBook em tela cheia
            <span className="sr-only"> (abre em nova aba)</span>
          </a>
        </p>
      )}

      {capitulosEbook.length > 0 && (
        <div className="cartao">
          <h3>O que você vai encontrar</h3>
          <ol className="lista">
            {capitulosEbook.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ol>
        </div>
      )}
    </Secao>
  )
}
