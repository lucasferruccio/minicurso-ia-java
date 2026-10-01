// Dados gerais do minicurso. Edite aqui para atualizar o site inteiro.

export const curso = {
  titulo: 'Aprender a programar com assistentes de código',
  subtitulo:
    'Use o Claude Code como tutor para entender problemas, construir soluções em Java por etapas e explicar o código.',
  autor: 'Lucas Paiva Ferruccio',
  disciplina: 'Educação a Distância · Projeto da 1ª VA',
  trilha: 'Docência Digital na Era da IA: Ensino e Aprendizagem na EaD',
  ano: 2026,
  tempoEstimado: 'cerca de 1h30',
}

/**
 * ID do vídeo no YouTube: é o trecho depois de "v=" no link.
 * Ex.: https://www.youtube.com/watch?v=dQw4w9WgXcQ  →  'dQw4w9WgXcQ'
 * Enquanto estiver vazio, o site mostra um aviso no lugar do vídeo.
 */
export const VIDEO_ID = ''

/** Duração real do vídeo, para exibir no site (ex.: '25 min'). */
export const DURACAO_VIDEO = '25 min'

export interface Capitulo {
  /** Momento do vídeo em segundos. */
  segundos: number
  titulo: string
  objetivo?: string
}

// Tempos do roteiro. Depois da edição, troque pelos tempos reais do vídeo.
export const capitulos: Capitulo[] = [
  { segundos: 0, titulo: 'Abertura: o erro da IA' },
  { segundos: 150, titulo: 'O assistente como tutor, não como resposta pronta', objetivo: 'O1' },
  { segundos: 360, titulo: 'Entender o problema e pedir ajuda por etapas', objetivo: 'O1 e O2' },
  { segundos: 690, titulo: 'Ler e explicar o código', objetivo: 'O3' },
  { segundos: 930, titulo: 'Testar e modificar', objetivo: 'O4' },
  { segundos: 1320, titulo: 'Desafio final e recapitulação' },
]

export interface Objetivo {
  id: string
  texto: string
}

export const objetivos: Objetivo[] = [
  { id: 'O1', texto: 'Descrever um problema ao assistente de código, pedindo explicação em vez de resposta pronta.' },
  { id: 'O2', texto: 'Construir a solução em Java por etapas, com a ajuda do assistente.' },
  { id: 'O3', texto: 'Explicar com as próprias palavras o que o código faz.' },
  { id: 'O4', texto: 'Modificar o código e verificar o resultado com casos de teste.' },
]

export const publicoAlvo = [
  'Estudantes de cursos técnicos e de graduação em computação e áreas afins.',
  'Autodidatas que estão aprendendo a programar.',
  'Docentes de programação que querem orientar o uso de IA pelos alunos.',
]

export const conhecimentosPrevios = [
  'Lógica de programação básica: variáveis, condicionais e laços.',
  'Noção de Java: saber o que é uma classe com o método main e como rodar um programa.',
]

export const etapasEstudo = [
  { titulo: 'Leia os objetivos', texto: 'Saiba o que você vai conseguir fazer ao final.' },
  { titulo: 'Assista à videoaula', texto: 'Pause nas pausas ativas e tente responder antes de continuar.' },
  { titulo: 'Pratique', texto: 'Refaça as modificações no IntelliJ e tente o desafio final.' },
  { titulo: 'Faça a avaliação', texto: 'Cada resposta traz uma explicação e o minuto do vídeo para rever.' },
  { titulo: 'Consulte os materiais', texto: 'Código de apoio, prompts usados e referências.' },
]

export const requisitos = {
  minimos: 'Computador ou celular com internet para assistir ao vídeo e fazer a avaliação.',
  pratica:
    'Para praticar junto: IntelliJ IDEA (a versão gratuita serve) e um assistente de código. O Claude Code pode exigir plano pago; você pode só assistir ou usar outro assistente equivalente.',
  duvidas: 'Deixe sua dúvida nos comentários do vídeo no YouTube.',
}

export function formatarTempo(segundos: number): string {
  const m = Math.floor(segundos / 60)
  const s = segundos % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}
