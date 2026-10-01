import { useState } from 'react'

interface Props {
  codigo: string
  rotulo: string
  linguagem?: string
  copiavel?: boolean
}

export default function CodeBlock({ codigo, rotulo, linguagem = 'java', copiavel = true }: Props) {
  const [status, setStatus] = useState('')

  async function copiar() {
    try {
      await navigator.clipboard.writeText(codigo)
      setStatus('Copiado!')
    } catch {
      setStatus('Não foi possível copiar. Selecione o texto e copie manualmente.')
    }
    window.setTimeout(() => setStatus(''), 2500)
  }

  return (
    <figure className="codigo">
      <figcaption className="codigo__barra">
        <span>{rotulo}</span>
        {copiavel && (
          <button type="button" className="codigo__copiar" onClick={copiar}>
            Copiar<span className="sr-only"> {rotulo}</span>
          </button>
        )}
      </figcaption>
      <pre tabIndex={0} aria-label={rotulo}>
        <code className={`language-${linguagem}`}>{codigo}</code>
      </pre>
      <p className="codigo__status" aria-live="polite">
        {status}
      </p>
    </figure>
  )
}
