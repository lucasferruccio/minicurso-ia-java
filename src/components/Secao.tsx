import type { ReactNode } from 'react'

interface Props {
  id: string
  numero?: number
  titulo: string
  lead?: string
  fundo?: 'claro' | 'papel'
  children: ReactNode
}

/** Seção numerada da sequência de estudo. */
export default function Secao({ id, numero, titulo, lead, fundo = 'claro', children }: Props) {
  return (
    <section id={id} className={`secao secao--${fundo}`} aria-labelledby={`${id}-titulo`}>
      <div className="container">
        <header className="secao__cabecalho">
          {numero !== undefined && (
            <p className="secao__numero" aria-hidden="true">
              {numero}
            </p>
          )}
          <h2 id={`${id}-titulo`} tabIndex={-1}>
            {numero !== undefined && <span className="sr-only">Etapa {numero}: </span>}
            {titulo}
          </h2>
          {lead && <p className="secao__lead">{lead}</p>}
        </header>
        {children}
      </div>
    </section>
  )
}
