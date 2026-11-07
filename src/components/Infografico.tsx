import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import Secao from './Secao'
import {
  abertura,
  capitulos,
  conclusao,
  type Capitulo,
  type CapituloBarras,
  type CapituloComparacao,
  type CapituloModos,
  type CapituloPontos,
  type Hotspot as DadosHotspot,
} from '../data/pesquisas'
import './infografico.css'

/* ---------- Utilidades ---------- */

/** Adiciona a classe `inf-visivel` quando o elemento entra na tela (revelação ao rolar). */
function useRevelar<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      el.classList.add('inf-visivel')
      return
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add('inf-visivel')
          obs.disconnect()
        }
      },
      { threshold: 0.12 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

function Revelar({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRevelar<HTMLDivElement>()
  return (
    <div ref={ref} className={`inf-revelar ${className}`}>
      {children}
    </div>
  )
}

/** Ponto "+" clicável que abre uma explicação logo abaixo. */
function Hotspot({ dados }: { dados: DadosHotspot }) {
  const [aberto, setAberto] = useState(false)
  const id = useId()
  return (
    <div className="inf-hotspot">
      <button
        type="button"
        className={`inf-hotspot__botao${aberto ? ' inf-hotspot__botao--aberto' : ''}`}
        aria-expanded={aberto}
        aria-controls={id}
        onClick={() => setAberto(!aberto)}
      >
        <span className="inf-hotspot__mais" aria-hidden="true">
          +
        </span>
        {dados.titulo}
      </button>
      <div id={id} className="inf-hotspot__texto" hidden={!aberto}>
        {dados.texto}
      </div>
    </div>
  )
}

/* ---------- Visualizações ---------- */

const ESCALA_MAX = 130
const ESCALA_MIN = -45
const AMPLITUDE = ESCALA_MAX - ESCALA_MIN
const zeroPct = (-ESCALA_MIN / AMPLITUDE) * 100

function formatarPct(v: number): string {
  if (v === 0) return '≈ 0%'
  return `${v > 0 ? '+' : '−'}${Math.abs(v)}%`
}

function VisualBarras({ cap }: { cap: CapituloBarras }) {
  const [semIA, setSemIA] = useState(false)
  const descricao = cap.grupos
    .map((g) => `${g.nome}: ${formatarPct(g.pratica)} na prática com IA e ${formatarPct(g.prova)} na prova sem IA`)
    .join('; ')

  return (
    <div className="inf-visual">
      <p className="inf-visual__titulo">
        {semIA ? 'Na prova, sem IA' : 'Na prática, com IA'}
        <span> · comparado com quem não usou IA</span>
      </p>
      <div className="inf-barras" role="img" aria-label={`Gráfico. ${descricao}.`}>
        {cap.grupos.map((g) => {
          const v = semIA ? g.prova : g.pratica
          const largura = (Math.abs(v) / AMPLITUDE) * 100
          return (
            <div key={g.nome} className="inf-barras__linha">
              <p className="inf-barras__nome">{g.nome}</p>
              <div className="inf-barras__trilho">
                <span className="inf-barras__zero" style={{ left: `${zeroPct}%` }} />
                <span
                  className={`inf-barras__barra ${v < 0 ? 'inf-barras__barra--neg' : ''}`}
                  style={{
                    left: v < 0 ? `${zeroPct - largura}%` : `${zeroPct}%`,
                    width: `${Math.max(largura, 0.6)}%`,
                  }}
                />
                <span
                  className={`inf-barras__valor ${v < 0 ? 'inf-barras__valor--neg' : ''}`}
                  style={
                    v < 0
                      ? { right: `${100 - (zeroPct - largura)}%` }
                      : { left: `${zeroPct + largura}%` }
                  }
                >
                  {formatarPct(v)}
                </span>
              </div>
            </div>
          )
        })}
      </div>
      <button type="button" className="botao botao--primario inf-visual__acao" aria-pressed={semIA} onClick={() => setSemIA(!semIA)}>
        {semIA ? '← Voltar para a prática' : 'Agora tire a IA →'}
      </button>
      <p className="sr-only" aria-live="polite">
        {semIA ? 'Mostrando a prova sem IA.' : 'Mostrando a prática com IA.'}
      </p>
      <div className="inf-hotspots">
        {cap.grupos.map((g) => (
          <Hotspot key={g.nome} dados={g.hotspot} />
        ))}
      </div>
    </div>
  )
}

function VisualComparacao({ cap }: { cap: CapituloComparacao }) {
  return (
    <div className="inf-visual">
      <p className="inf-visual__titulo">
        Acertos no teste sem IA<span> · média de cada grupo</span>
      </p>
      <div
        className="inf-colunas"
        role="img"
        aria-label={`Gráfico. ${cap.barras.map((b) => `${b.nome}: ${b.valor}%`).join('; ')}.`}
      >
        {cap.barras.map((b) => (
          <div key={b.nome} className="inf-colunas__item">
            <div className="inf-colunas__area">
              <span className={`inf-colunas__barra ${b.destaque ? 'inf-colunas__barra--destaque' : ''}`} style={{ height: `${b.valor}%` }}>
                <span className="inf-colunas__valor">{b.valor}%</span>
              </span>
            </div>
            <p className="inf-colunas__nome">{b.nome}</p>
          </div>
        ))}
      </div>
      <p className="inf-visual__titulo inf-visual__titulo--sub">Dentro do grupo com IA, o jeito de usar mudou tudo</p>
      <ul className="inf-padroes">
        {cap.padroes.map((p) => (
          <li key={p.nome} className={`inf-padroes__item ${p.bom ? 'inf-padroes__item--bom' : 'inf-padroes__item--ruim'}`}>
            <span className="inf-padroes__icone" aria-hidden="true">
              {p.bom ? '✓' : '✗'}
            </span>
            <div>
              <strong>{p.nome}</strong>
              <span className="inf-padroes__resultado">{p.resultado}</span>
              <p>{p.exemplos}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="inf-hotspots">
        <Hotspot dados={cap.hotspot} />
      </div>
    </div>
  )
}

function VisualModos({ cap }: { cap: CapituloModos }) {
  const [atual, setAtual] = useState(0)
  const idPainel = useId()
  const modo = cap.modos[atual]
  return (
    <div className="inf-visual">
      <p className="inf-visual__titulo">
        Quatro jeitos de usar a IA<span> · clique para ver o resultado</span>
      </p>
      <div className="inf-modos" role="group" aria-label="Jeitos de usar a IA">
        {cap.modos.map((m, i) => (
          <button
            key={m.nome}
            type="button"
            className={`inf-modos__botao inf-modos__botao--${m.tom}${i === atual ? ' inf-modos__botao--atual' : ''}`}
            aria-pressed={i === atual}
            aria-controls={idPainel}
            onClick={() => setAtual(i)}
          >
            <span className="inf-modos__traducao">{m.traducao}</span>
            <span className="inf-modos__nome" lang="en">
              {m.nome}
            </span>
          </button>
        ))}
      </div>
      <div id={idPainel} className={`inf-modos__painel inf-modos__painel--${modo.tom}`} aria-live="polite">
        <p className="inf-modos__descricao">{modo.descricao}</p>
        <p>
          <strong>Resultado: </strong>
          {modo.resultado}
        </p>
      </div>
    </div>
  )
}

function VisualPontos({ cap }: { cap: CapituloPontos }) {
  const [vista, setVista] = useState(0)
  const v = cap.vistas[vista]
  return (
    <div className="inf-visual">
      <div className="inf-alternar" role="group" aria-label="Escolha o que destacar">
        {cap.vistas.map((x, i) => (
          <button key={x.rotulo} type="button" className="inf-alternar__botao" aria-pressed={i === vista} onClick={() => setVista(i)}>
            {x.rotulo}
          </button>
        ))}
      </div>
      <div className={`inf-pontos inf-pontos--vista${vista}`} role="img" aria-label={`${v.legenda}. Cada círculo representa um estudante.`}>
        {Array.from({ length: cap.total }, (_, i) => (
          <span key={i} className={`inf-pontos__ponto${i < v.marcados ? ' inf-pontos__ponto--marcado' : ''}`} />
        ))}
      </div>
      <p className="inf-pontos__legenda" aria-hidden="true">
        {v.legenda}
      </p>
      <p className="inf-visual__nota">Cada círculo é um estudante. A posição dos círculos é ilustrativa.</p>
      <div className="inf-hotspots">
        <Hotspot dados={cap.hotspot} />
      </div>
    </div>
  )
}

function Visual({ cap }: { cap: Capitulo }) {
  switch (cap.tipo) {
    case 'barras':
      return <VisualBarras cap={cap} />
    case 'comparacao':
      return <VisualComparacao cap={cap} />
    case 'modos':
      return <VisualModos cap={cap} />
    case 'pontos':
      return <VisualPontos cap={cap} />
  }
}

/* ---------- Capítulo ---------- */

function CapituloInfo({ cap, indice }: { cap: Capitulo; indice: number }) {
  const [aprofundar, setAprofundar] = useState(false)
  const idAp = useId()
  return (
    <article id={`pesquisa-${cap.id}`} className={`inf-capitulo inf-capitulo--${cap.id}`} aria-labelledby={`pesquisa-${cap.id}-titulo`}>
      <span className="inf-capitulo__fundo" aria-hidden="true" data-numero={String(indice + 1).padStart(2, '0')} />
      <Revelar className="inf-capitulo__texto">
        <p className="inf-capitulo__rotulo">
          Estudo {indice + 1} · {cap.rotulo}
        </p>
        <p className="inf-capitulo__destaque" aria-hidden="true">
          {cap.destaque}
        </p>
        <p className="inf-capitulo__destaque-legenda">
          <span className="sr-only">{cap.destaque} </span>
          {cap.destaqueLegenda}
        </p>
        <h3 id={`pesquisa-${cap.id}-titulo`} className="inf-capitulo__titulo">
          {cap.titulo}
        </h3>
        <p>{cap.contexto}</p>
        <p>
          <strong>O que encontraram: </strong>
          {cap.achado}
        </p>
        <div className="inf-conexao">
          <p className="inf-conexao__rotulo">Ligação com o minicurso</p>
          <p>{cap.conexao}</p>
        </div>
        <button
          type="button"
          className="link-botao"
          aria-expanded={aprofundar}
          aria-controls={idAp}
          onClick={() => setAprofundar(!aprofundar)}
        >
          {aprofundar ? 'Fechar detalhes do estudo −' : 'Como o estudo foi feito e seus limites +'}
        </button>
        <div id={idAp} className="inf-aprofundar" hidden={!aprofundar}>
          <p>
            <strong>Método: </strong>
            {cap.metodo}
          </p>
          <p>
            <strong>Limites: </strong>
            {cap.limites}
          </p>
          <p>
            <a href={cap.fonte.url} target="_blank" rel="noreferrer">
              Ler o estudo: {cap.fonte.rotulo} ↗<span className="sr-only"> (abre em nova aba)</span>
            </a>
          </p>
        </div>
      </Revelar>
      <Revelar className="inf-capitulo__visual inf-revelar--atraso">
        <Visual cap={cap} />
        <p className="inf-fonte">Fonte: {cap.fonte.rotulo}</p>
      </Revelar>
    </article>
  )
}

/* ---------- Componente principal ---------- */

export default function Infografico() {
  const [atual, setAtual] = useState(-1)
  const historiaRef = useRef<HTMLDivElement>(null)
  const [progresso, setProgresso] = useState(0)

  useEffect(() => {
    const secoes = capitulos
      .map((c) => document.getElementById(`pesquisa-${c.id}`))
      .filter((e): e is HTMLElement => e !== null)
    if (!('IntersectionObserver' in window)) return
    const obs = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((en) => {
          if (en.isIntersecting) setAtual(secoes.indexOf(en.target as HTMLElement))
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    secoes.forEach((s) => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const atualizar = () => {
      const el = historiaRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const total = r.height - window.innerHeight * 0.5
      const p = total > 0 ? Math.min(1, Math.max(0, (window.innerHeight * 0.5 - r.top) / total)) : 0
      setProgresso(Math.round(p * 100))
    }
    atualizar()
    window.addEventListener('scroll', atualizar, { passive: true })
    window.addEventListener('resize', atualizar)
    return () => {
      window.removeEventListener('scroll', atualizar)
      window.removeEventListener('resize', atualizar)
    }
  }, [])

  function irPara(id: string) {
    const alvo = document.getElementById(`pesquisa-${id}`)
    if (!alvo) return
    const reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    alvo.scrollIntoView({ behavior: reduzir ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <Secao
      id="pesquisas"
      numero={5}
      titulo="Infográfico: o que as pesquisas dizem"
      lead="O vídeo e o eBook mostram como usar o assistente. Aqui você vê por quê: quatro estudos sobre o que acontece com quem aprende a programar usando IA. Role a página, clique nos botões e abra os pontos +."
    >
      <div className="inf" ref={historiaRef}>
        <nav className="inf-nav" aria-label="Estudos do infográfico">
          <ol className="inf-nav__lista">
            {capitulos.map((c, i) => (
              <li key={c.id}>
                <button
                  type="button"
                  className={`inf-nav__botao${i === atual ? ' inf-nav__botao--atual' : ''}${i < atual ? ' inf-nav__botao--feito' : ''}`}
                  aria-current={i === atual ? 'step' : undefined}
                  onClick={() => irPara(c.id)}
                >
                  <span className="inf-nav__num" aria-hidden="true">
                    {i + 1}
                  </span>
                  <span className="inf-nav__rotulo">{c.rotulo}</span>
                  <span className="sr-only">: ir para o estudo {i + 1}</span>
                </button>
              </li>
            ))}
          </ol>
          <div className="inf-nav__progresso" aria-hidden="true">
            <span style={{ width: `${progresso}%` }} />
          </div>
        </nav>

        <Revelar className="inf-abertura">
          <p className="inf-abertura__pergunta">{abertura.pergunta}</p>
          <ul className="inf-abertura__numeros">
            {abertura.numeros.map((n) => (
              <li key={n.legenda}>
                <span className="inf-abertura__valor">{n.valor}</span>
                <span className="inf-abertura__legenda">{n.legenda}</span>
              </li>
            ))}
          </ul>
          <p className="inf-abertura__resposta">{abertura.resposta}</p>
          <p className="inf-abertura__rolar" aria-hidden="true">
            Role para ver as evidências ↓
          </p>
        </Revelar>

        {capitulos.map((c, i) => (
          <CapituloInfo key={c.id} cap={c} indice={i} />
        ))}

        <Revelar className="inf-conclusao">
          <h3 className="inf-capitulo__titulo">{conclusao.titulo}</h3>
          <ol className="inf-conclusao__lista">
            {conclusao.itens.map((item) => {
              const i = capitulos.findIndex((c) => c.id === item.capitulo)
              return (
                <li key={item.capitulo}>
                  <span className="inf-conclusao__num" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div>
                    <p>{item.texto}</p>
                    <button type="button" className="link-botao" onClick={() => irPara(item.capitulo)}>
                      Rever o estudo {i + 1}: {capitulos[i].rotulo}
                    </button>
                  </div>
                </li>
              )
            })}
          </ol>
          <p className="aviso">{conclusao.cuidado}</p>
          <div className="hero__acoes">
            <a className="botao botao--primario" href="#avaliacao">
              Fazer a avaliação
            </a>
            <a className="botao botao--secundario" href="#materiais">
              Ver os padrões de prompt
            </a>
          </div>
        </Revelar>
      </div>
    </Secao>
  )
}
