import { curso } from '../data/curso'

export default function Footer() {
  return (
    <footer className="rodape">
      <div className="container rodape__linha">
        <p>
          <strong>{curso.titulo}</strong>
          <br />
          {curso.autor} · {curso.disciplina} · {curso.ano}
        </p>
        <p>
          Trilha: {curso.trilha}
          <br />
          <a href="#inicio">Voltar ao topo</a>
        </p>
      </div>
    </footer>
  )
}
