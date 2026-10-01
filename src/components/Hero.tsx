import { curso, DURACAO_VIDEO } from '../data/curso'

const passos = ['Objetivos', 'Videoaula', 'Avaliação', 'Materiais']

export default function Hero() {
  return (
    <section id="inicio" className="hero" aria-labelledby="titulo-curso">
      <div className="container">
        <p className="sobretitulo">Minicurso EaD · Java + Claude Code</p>
        <h1 id="titulo-curso">{curso.titulo}</h1>
        <p className="hero__subtitulo">{curso.subtitulo}</p>

        <dl className="hero__meta">
          <div>
            <dt>Autor</dt>
            <dd>{curso.autor}</dd>
          </div>
          <div>
            <dt>Tempo de estudo</dt>
            <dd>{curso.tempoEstimado}</dd>
          </div>
          <div>
            <dt>Videoaula</dt>
            <dd>{DURACAO_VIDEO}</dd>
          </div>
          <div>
            <dt>Trilha</dt>
            <dd>{curso.trilha}</dd>
          </div>
        </dl>

        <ol className="hero__trilha" aria-label="Sequência de estudo">
          {passos.map((p, i) => (
            <li key={p}>
              <span className="hero__trilha-num" aria-hidden="true">
                {i + 1}
              </span>
              {p}
            </li>
          ))}
        </ol>

        <div className="hero__acoes">
          <a className="botao botao--primario" href="#como-estudar">
            Começar o minicurso
          </a>
          <a className="botao botao--secundario" href="#videoaula">
            Ir direto para o vídeo
          </a>
        </div>
      </div>
    </section>
  )
}
