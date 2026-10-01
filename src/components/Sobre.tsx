import Secao from './Secao'
import { conhecimentosPrevios, objetivos, publicoAlvo } from '../data/curso'

export default function Sobre() {
  return (
    <Secao
      id="sobre"
      numero={2}
      titulo="Para quem é e o que você vai aprender"
      lead="Iniciantes já usam IA para programar, mas muitos copiam o código sem entender. Aqui você aprende a usar o assistente como tutor."
      fundo="papel"
    >
      <div className="grade-2">
        <div className="cartao">
          <h3>Público-alvo</h3>
          <ul className="lista">
            {publicoAlvo.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
        <div className="cartao">
          <h3>Conhecimentos prévios</h3>
          <ul className="lista">
            {conhecimentosPrevios.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </div>

      <h3 className="subtitulo">Objetivos de aprendizagem</h3>
      <p className="texto-apoio">Ao final, você será capaz de:</p>
      <ul className="objetivos">
        {objetivos.map((o) => (
          <li key={o.id} className="objetivos__item">
            <span className="objetivos__id">{o.id}</span>
            <span>{o.texto}</span>
          </li>
        ))}
      </ul>
    </Secao>
  )
}
