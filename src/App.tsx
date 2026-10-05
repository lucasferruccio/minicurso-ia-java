import { useCallback, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import ComoEstudar from './components/ComoEstudar'
import Sobre from './components/Sobre'
import Videoaula from './components/Videoaula'
import Quiz from './components/Quiz'
import Materiais from './components/Materiais'
import Referencias from './components/Referencias'
import Footer from './components/Footer'

export interface PedidoVideo {
  segundos: number
  /** Muda a cada pedido, para recarregar o player mesmo no mesmo minuto. */
  chave: number
}

export default function App() {
  const [pedido, setPedido] = useState<PedidoVideo | null>(null)

  const irParaMomento = useCallback((segundos?: number) => {
    if (segundos !== undefined) setPedido({ segundos, chave: Date.now() })
    const alvo = document.getElementById('videoaula-titulo')
    if (alvo) {
      const reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      alvo.scrollIntoView({ behavior: reduzir ? 'auto' : 'smooth', block: 'start' })
      alvo.focus({ preventScroll: true })
    }
  }, [])

  return (
    <>
      <a className="pular" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo" tabIndex={-1}>
        <Hero />
        <ComoEstudar />
        <Sobre />
        <Videoaula pedido={pedido} />
        <Quiz irParaMomento={irParaMomento} />
        <Materiais />
        <Referencias />
      </main>
      <Footer />
    </>
  )
}
