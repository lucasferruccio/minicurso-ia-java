import Secao from './Secao'
import CodeBlock from './CodeBlock'
import { claudeMd, desafio, modeloPrompt, padroes, pedidoErro, prompts, recursosClaudeCode, regras } from '../data/materiais'

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

      <h3 className="subtitulo">Modelo de prompt para estudar</h3>
      <p className="texto-apoio">Copie e preencha os colchetes.</p>
      <CodeBlock codigo={modeloPrompt} rotulo="Modelo de prompt" linguagem="text" />

      <h3 className="subtitulo">Oito padrões de prompt para aprender</h3>
      <div className="tabela-rolagem">
        <table className="tabela">
          <caption className="sr-only">Padrões de prompt e frases para usar</caption>
          <thead>
            <tr>
              <th scope="col">Padrão</th>
              <th scope="col">Frase para usar</th>
            </tr>
          </thead>
          <tbody>
            {padroes.map((p, i) => (
              <tr key={p.nome}>
                <th scope="row">
                  {i + 1}. {p.nome}
                </th>
                <td className="tabela__texto">"{p.frase}"</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grade-2">
        <div className="cartao">
          <h3>Como pedir ajuda com um erro</h3>
          <ol className="lista">
            {pedidoErro.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ol>
        </div>
        <div className="cartao">
          <h3>Recursos do Claude Code para estudar</h3>
          <ul className="lista">
            {recursosClaudeCode.map((r) => (
              <li key={r.nome}>
                <strong>{r.nome}:</strong> {r.uso}
              </li>
            ))}
          </ul>
        </div>
      </div>

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

      <div className="cartao cartao--destaque">
        <h3>{desafio.titulo}</h3>
        <p>{desafio.texto}</p>
        <p className="texto-apoio">{desafio.dica}</p>
      </div>
    </Secao>
  )
}
