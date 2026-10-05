import Secao from './Secao'
import { capitulos, curso, VIDEO_ID } from '../data/curso'
import type { PedidoVideo } from '../App'

interface Props {
  pedido: PedidoVideo | null
}

function urlDoVideo(pedido: PedidoVideo | null): string {
  const params = new URLSearchParams({
    rel: '0',
    hl: 'pt-BR',
    cc_lang_pref: 'pt',
    cc_load_policy: '1',
  })
  if (pedido) {
    params.set('start', String(pedido.segundos))
    params.set('autoplay', '1')
  }
  return `https://www.youtube-nocookie.com/embed/${VIDEO_ID}?${params.toString()}`
}

export default function Videoaula({ pedido }: Props) {
  return (
    <Secao
      id="videoaula"
      numero={3}
      titulo="Videoaula"
      lead="Como um assistente de código funciona, como escrever bons prompts e como usar o Claude Code para aprender, com uma demonstração no IntelliJ IDEA."
    >
      <div className="video">
        {VIDEO_ID ? (
          <iframe
            key={pedido?.chave ?? 'inicial'}
            src={urlDoVideo(pedido)}
            title={`Videoaula: ${curso.titulo}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <div className="video__aviso" role="note">
            <p>
              <strong>Vídeo em produção.</strong> Ele aparece aqui assim que for publicado no
              YouTube.
            </p>
          </div>
        )}
      </div>

      <p className="texto-apoio">
        Não abriu?{' '}
        <a href={`https://youtu.be/${VIDEO_ID}`} target="_blank" rel="noreferrer">
          Assista direto no YouTube<span className="sr-only"> (abre em nova aba)</span>
        </a>
        .
      </p>

      <div className="cartao">
        <h3 id="capitulos-titulo">O que você vai ver</h3>
        <ol className="lista">
          {capitulos.map((c) => (
            <li key={c.titulo}>
              {c.titulo}
              {c.objetivo && <span className="capitulos__obj"> · {c.objetivo}</span>}
            </li>
          ))}
        </ol>
      </div>
    </Secao>
  )
}
