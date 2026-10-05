import { useEffect, useRef, useState, type RefObject } from 'react'
import Secao from './Secao'
import CodeBlock from './CodeBlock'
import { questoes, type Questao, type QuestaoEscolha } from '../data/questoes'
import { objetivos } from '../data/curso'

interface Props {
  irParaMomento: (segundos?: number) => void
}

/** Embaralha de forma fixa, garantindo que não comece na ordem certa. */
function embaralhar(itens: string[]): string[] {
  const n = itens.length
  const indices = itens.map((_, i) => i).sort((a, b) => ((a * 3 + 1) % n) - ((b * 3 + 1) % n))
  const resultado = indices.map((i) => itens[i])
  const igual = resultado.every((item, i) => item === itens[i])
  return igual ? [...itens].reverse() : resultado
}

function ordemInicial(q: Questao): string[] {
  return q.tipo === 'ordem' ? embaralhar(q.itens) : []
}

export default function Quiz({ irParaMomento }: Props) {
  const [indice, setIndice] = useState(0)
  const [selecao, setSelecao] = useState<number | null>(null)
  const [ordem, setOrdem] = useState<string[]>(() => ordemInicial(questoes[0]))
  const [verificado, setVerificado] = useState(false)
  const [resultados, setResultados] = useState<Record<number, boolean>>({})
  const [concluido, setConcluido] = useState(false)
  const [anuncio, setAnuncio] = useState('')

  const feedbackRef = useRef<HTMLDivElement>(null)
  const enunciadoRef = useRef<HTMLHeadingElement>(null)
  const resultadoRef = useRef<HTMLHeadingElement>(null)
  const primeiraRenderizacao = useRef(true)

  const q = questoes[indice]
  const total = questoes.length

  useEffect(() => {
    if (verificado) feedbackRef.current?.focus()
  }, [verificado])

  useEffect(() => {
    if (primeiraRenderizacao.current) {
      primeiraRenderizacao.current = false
      return
    }
    if (concluido) resultadoRef.current?.focus()
    else enunciadoRef.current?.focus()
  }, [indice, concluido])

  function acertou(): boolean {
    if (q.tipo === 'escolha') return selecao !== null && q.opcoes[selecao].correta === true
    return ordem.every((item, i) => item === q.itens[i])
  }

  function verificar() {
    setResultados((r) => ({ ...r, [q.id]: acertou() }))
    setVerificado(true)
  }

  function proxima() {
    if (indice + 1 >= total) {
      setConcluido(true)
      return
    }
    const seguinte = questoes[indice + 1]
    setIndice(indice + 1)
    setSelecao(null)
    setOrdem(ordemInicial(seguinte))
    setVerificado(false)
    setAnuncio('')
  }

  function recomecar() {
    setIndice(0)
    setSelecao(null)
    setOrdem(ordemInicial(questoes[0]))
    setVerificado(false)
    setResultados({})
    setConcluido(false)
    setAnuncio('')
  }

  function mover(posicao: number, direcao: -1 | 1) {
    const destino = posicao + direcao
    if (destino < 0 || destino >= ordem.length) return
    const nova = [...ordem]
    ;[nova[posicao], nova[destino]] = [nova[destino], nova[posicao]]
    setOrdem(nova)
    setAnuncio(`"${nova[destino]}" agora está na posição ${destino + 1} de ${nova.length}.`)
  }

  const podeVerificar = q.tipo === 'escolha' ? selecao !== null : true

  return (
    <Secao
      id="avaliacao"
      numero={4}
      titulo="Avaliação interativa"
      lead={`${total} questões ligadas aos objetivos. Cada resposta mostra na hora por que está certa ou errada e indica a parte do vídeo para rever.`}
      fundo="papel"
    >
      <div className="quiz">
        {concluido ? (
          <Resultado
            resultados={resultados}
            recomecar={recomecar}
            irParaMomento={irParaMomento}
            tituloRef={resultadoRef}
          />
        ) : (
          <>
            <div className="quiz__progresso">
              <p>
                Questão {indice + 1} de {total}
                <span className="quiz__obj"> · Objetivo {q.objetivo}</span>
              </p>
              <div
                className="barra"
                role="progressbar"
                aria-label="Progresso na avaliação"
                aria-valuemin={0}
                aria-valuemax={total}
                aria-valuenow={indice + (verificado ? 1 : 0)}
              >
                <div className="barra__preenchido" style={{ width: `${((indice + (verificado ? 1 : 0)) / total) * 100}%` }} />
              </div>
            </div>

            <h3 className="quiz__enunciado" ref={enunciadoRef} tabIndex={-1}>
              {q.enunciado}
            </h3>
            {q.codigo && <CodeBlock codigo={q.codigo} rotulo="Trecho em Java" copiavel={false} />}

            {q.tipo === 'escolha' ? (
              <fieldset className="opcoes" disabled={verificado}>
                <legend className="sr-only">Alternativas da questão {indice + 1}</legend>
                {q.opcoes.map((o, i) => {
                  const estado = verificado
                    ? o.correta
                      ? 'certa'
                      : i === selecao
                        ? 'errada'
                        : ''
                    : ''
                  return (
                    <label key={i} className={`opcao ${i === selecao ? 'opcao--marcada' : ''} ${estado ? `opcao--${estado}` : ''}`}>
                      <input
                        type="radio"
                        name={`questao-${q.id}`}
                        checked={i === selecao}
                        onChange={() => setSelecao(i)}
                      />
                      <span className="opcao__conteudo">
                        <span>{o.texto}</span>
                        {o.codigo && (
                          <pre className="opcao__codigo">
                            <code>{o.codigo}</code>
                          </pre>
                        )}
                        {estado === 'certa' && <span className="opcao__selo">Resposta correta</span>}
                        {estado === 'errada' && <span className="opcao__selo">Sua resposta</span>}
                      </span>
                    </label>
                  )
                })}
              </fieldset>
            ) : (
              <div className="ordem">
                <p className="texto-apoio">Use os botões para subir ou descer cada etapa.</p>
                <ol className="ordem__lista">
                  {ordem.map((item, i) => (
                    <li key={item} className="ordem__item">
                      <span className="ordem__pos" aria-hidden="true">
                        {i + 1}
                      </span>
                      <span className="ordem__texto">{item}</span>
                      <span className="ordem__botoes">
                        <button
                          type="button"
                          onClick={() => mover(i, -1)}
                          disabled={verificado || i === 0}
                          aria-label={`Mover "${item}" para cima`}
                        >
                          ↑
                        </button>
                        <button
                          type="button"
                          onClick={() => mover(i, 1)}
                          disabled={verificado || i === ordem.length - 1}
                          aria-label={`Mover "${item}" para baixo`}
                        >
                          ↓
                        </button>
                      </span>
                    </li>
                  ))}
                </ol>
                <p className="sr-only" aria-live="polite">
                  {anuncio}
                </p>
              </div>
            )}

            {verificado ? (
              <Feedback questao={q} selecao={selecao} correto={resultados[q.id]} irParaMomento={irParaMomento} refDiv={feedbackRef} />
            ) : null}

            <div className="quiz__acoes">
              {!verificado ? (
                <button type="button" className="botao botao--primario" onClick={verificar} disabled={!podeVerificar}>
                  Verificar resposta
                </button>
              ) : (
                <button type="button" className="botao botao--primario" onClick={proxima}>
                  {indice + 1 >= total ? 'Ver meu resultado' : 'Próxima questão'}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </Secao>
  )
}

interface FeedbackProps {
  questao: Questao
  selecao: number | null
  correto: boolean
  irParaMomento: (s?: number) => void
  refDiv: RefObject<HTMLDivElement | null>
}

function Feedback({ questao, selecao, correto, irParaMomento, refDiv }: FeedbackProps) {
  let explicacao: string
  let correta: string | null = null

  if (questao.tipo === 'escolha') {
    const escolhida = selecao !== null ? questao.opcoes[selecao] : null
    explicacao = escolhida?.feedback ?? ''
    if (!correto) {
      const certa = (questao as QuestaoEscolha).opcoes.find((o) => o.correta)
      if (certa) correta = `${certa.texto} ${certa.feedback}`
    }
  } else {
    explicacao = correto ? questao.feedbackCerto : questao.feedbackErrado
    if (!correto) correta = `Ordem correta: ${questao.itens.map((t, i) => `${i + 1}. ${t}`).join('  ')}`
  }

  return (
    <div
      ref={refDiv}
      tabIndex={-1}
      className={`feedback ${correto ? 'feedback--certo' : 'feedback--errado'}`}
      role="status"
      aria-live="polite"
    >
      <p className="feedback__titulo">{correto ? 'Correto!' : 'Ainda não.'}</p>
      <p>{explicacao}</p>
      {correta && (
        <p className="feedback__correta">
          <strong>Resposta correta:</strong> {correta}
        </p>
      )}
      <button type="button" className="link-botao" onClick={() => irParaMomento()}>
        ▶ Reveja no vídeo a parte: {questao.trecho}
      </button>
    </div>
  )
}

interface ResultadoProps {
  resultados: Record<number, boolean>
  recomecar: () => void
  irParaMomento: (s?: number) => void
  tituloRef: RefObject<HTMLHeadingElement | null>
}

function Resultado({ resultados, recomecar, irParaMomento, tituloRef }: ResultadoProps) {
  const acertos = questoes.filter((q) => resultados[q.id]).length
  const total = questoes.length
  const erradas = questoes.filter((q) => !resultados[q.id])

  const mensagem =
    acertos === total
      ? 'Excelente! Você domina as ideias do minicurso. Que tal tentar o desafio final nos materiais?'
      : acertos >= 7
        ? 'Muito bom! Reveja os trechos abaixo para fechar as lacunas.'
        : 'Vale rever os trechos indicados abaixo e refazer a avaliação. Errar aqui faz parte do aprendizado.'

  return (
    <div className="resultado">
      <h3 ref={tituloRef} tabIndex={-1}>
        Você acertou {acertos} de {total}
      </h3>
      <p>{mensagem}</p>

      <table className="tabela">
        <caption className="sr-only">Acertos por objetivo de aprendizagem</caption>
        <thead>
          <tr>
            <th scope="col">Objetivo</th>
            <th scope="col">Acertos</th>
          </tr>
        </thead>
        <tbody>
          {objetivos.map((o) => {
            const doObjetivo = questoes.filter((q) => q.objetivo === o.id)
            const certos = doObjetivo.filter((q) => resultados[q.id]).length
            return (
              <tr key={o.id}>
                <th scope="row">
                  <span className="objetivos__id">{o.id}</span> {o.texto}
                </th>
                <td>
                  {certos} de {doObjetivo.length}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {erradas.length > 0 && (
        <>
          <h4 className="subtitulo">Para rever</h4>
          <ul className="rever">
            {erradas.map((q) => (
              <li key={q.id}>
                <span>
                  Questão {q.id} · {q.trecho}
                </span>
                <button type="button" className="link-botao" onClick={() => irParaMomento()}>
                  ▶ Ir para o vídeo
                </button>
              </li>
            ))}
          </ul>
        </>
      )}

      <div className="quiz__acoes">
        <button type="button" className="botao botao--secundario" onClick={recomecar}>
          Refazer a avaliação
        </button>
        <a className="botao botao--primario" href="#materiais">
          Ir para os materiais
        </a>
      </div>
    </div>
  )
}
