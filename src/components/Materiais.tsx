import Secao from './Secao'
import CodeBlock from './CodeBlock'
import { claudeMd, codigoFinal, desafio, dicaScanner, prompts, regras } from '../data/materiais'

export default function Materiais() {
  return (
    <Secao
      id="materiais"
      numero={5}
      titulo="Materiais de apoio"
      lead="Tudo o que aparece no vídeo, para você consultar e praticar."
    >
      <h3 className="subtitulo">As três regras</h3>
      <ol className="regras">
        {regras.map((r) => (
          <li key={r.titulo} className="regras__item">
            <strong>{r.titulo}</strong>
            <span>{r.texto}</span>
          </li>
        ))}
      </ol>

      <h3 className="subtitulo">Prompts usados no vídeo</h3>
      <div className="prompts">
        {prompts.map((p) => (
          <CodeBlock key={p.titulo} codigo={p.texto} rotulo={p.titulo} linguagem="text" />
        ))}
      </div>

      <h3 className="subtitulo">Arquivo CLAUDE.md de tutor</h3>
      <p className="texto-apoio">
        Coloque este arquivo na raiz do projeto. O Claude Code lê as instruções no início de cada sessão.
      </p>
      <CodeBlock codigo={claudeMd} rotulo="CLAUDE.md" linguagem="markdown" />

      <h3 className="subtitulo">Código final da demonstração</h3>
      <CodeBlock codigo={codigoFinal} rotulo="CalculadoraMedia.java" />
      <p className="aviso">
        <strong>Atenção:</strong> {dicaScanner}
      </p>

      <div className="cartao cartao--destaque">
        <h3>{desafio.titulo}</h3>
        <p>{desafio.texto}</p>
        <p className="texto-apoio">{desafio.dica}</p>
      </div>
    </Secao>
  )
}
