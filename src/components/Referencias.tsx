import Secao from './Secao'
import { referencias } from '../data/materiais'

export default function Referencias() {
  return (
    <Secao id="referencias" numero={6} titulo="Referências" fundo="papel">
      {referencias.map((g) => (
        <div key={g.grupo} className="referencias__grupo">
          <h3>{g.grupo}</h3>
          <ul className="referencias">
            {g.itens.map((r) => (
              <li key={r.texto}>
                {r.texto}{' '}
                {r.url && (
                  <a href={r.url} target="_blank" rel="noreferrer">
                    Disponível em: {r.url.replace(/^https?:\/\//, '')}
                    <span className="sr-only"> (abre em nova aba)</span>
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </Secao>
  )
}
