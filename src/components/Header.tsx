const links = [
  { href: '#como-estudar', rotulo: 'Como estudar' },
  { href: '#sobre', rotulo: 'Objetivos' },
  { href: '#videoaula', rotulo: 'Videoaula' },
  { href: '#avaliacao', rotulo: 'Avaliação' },
  { href: '#materiais', rotulo: 'Materiais' },
  { href: '#referencias', rotulo: 'Referências' },
]

export default function Header() {
  return (
    <header className="topo">
      <div className="container topo__linha">
        <a className="topo__marca" href="#inicio">
          Aprender com IA
        </a>
        <nav aria-label="Seções do minicurso">
          <ul className="topo__menu">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.rotulo}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
