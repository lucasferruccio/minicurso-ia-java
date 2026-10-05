import Secao from './Secao'
import { curso, etapasEstudo, requisitos } from '../data/curso'

export default function ComoEstudar() {
  return (
    <Secao
      id="como-estudar"
      numero={1}
      titulo="Como estudar"
      lead={`O minicurso foi feito para você estudar sozinho, no seu ritmo. Reserve ${curso.tempoEstimado} e siga esta sequência.`}
    >
      <ol className="etapas">
        {etapasEstudo.map((e) => (
          <li key={e.titulo} className="etapas__item">
            <h3>{e.titulo}</h3>
            <p>{e.texto}</p>
          </li>
        ))}
      </ol>

      <div className="grade-2">
        <div className="cartao">
          <h3>O que você precisa</h3>
          <p>{requisitos.minimos}</p>
          <p>{requisitos.pratica}</p>
        </div>
        <div className="cartao">
          <h3>Dúvidas</h3>
          <p>{requisitos.duvidas}</p>
          <p>
            Dica: ative as legendas pelo botão <strong>CC</strong> do player do vídeo.
          </p>
        </div>
      </div>
    </Secao>
  )
}
