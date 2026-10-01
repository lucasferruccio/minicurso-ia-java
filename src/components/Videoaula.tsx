import Secao from './Secao'
import { capitulos, curso, DURACAO_VIDEO, formatarTempo, VIDEO_ID } from '../data/curso'
import { transcricao } from '../data/transcricao'
import type { PedidoVideo } from '../App'

interface Props {
  pedido: PedidoVideo | null
  irParaMomento: (segundos: number) => void
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

export default function Videoaula({ pedido, irParaMomento }: Props) {
  return (
    <Secao
      id="videoaula"
      numero={3}
      titulo="Videoaula"
      lead={`${DURACAO_VIDEO} de explicação e demonstração no IntelliJ IDEA com o Claude Code. Pause nas pausas ativas e tente responder antes de continuar.`}
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

      <div className="grade-video">
        <nav className="cartao" aria-labelledby="capitulos-titulo">
          <h3 id="capitulos-titulo">Capítulos</h3>
          <ol className="capitulos">
            {capitulos.map((c) => (
              <li key={c.segundos}>
                <button type="button" className="capitulos__botao" onClick={() => irParaMomento(c.segundos)}>
                  <span className="capitulos__tempo">{formatarTempo(c.segundos)}</span>
                  <span>
                    {c.titulo}
                    {c.objetivo && <span className="capitulos__obj"> · {c.objetivo}</span>}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </nav>

        <div className="cartao">
          <h3>Transcrição</h3>
          {transcricao.length > 0 ? (
            <details className="transcricao">
              <summary>Mostrar a transcrição completa</summary>
              <div className="transcricao__texto">
                {transcricao.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </details>
          ) : (
            <p className="texto-apoio">A transcrição revisada será publicada junto com o vídeo.</p>
          )}
        </div>
      </div>
    </Secao>
  )
}
