// Dados gerais do minicurso. Edite aqui para atualizar o site inteiro.

export const curso = {
  titulo: 'Aprender a programar com assistentes de código',
  subtitulo:
    'Como escrever prompts e usar o Claude Code como tutor: pedir bem, avançar por etapas e conferir o que a IA entrega.',
  autor: 'Lucas Paiva',
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
  { segundos: 150, titulo: 'Sobre o minicurso e objetivos' },
  { segundos: 270, titulo: 'Como um assistente de código funciona', objetivo: 'O1 e O4' },
  { segundos: 480, titulo: 'Anatomia de um bom prompt', objetivo: 'O1' },
  { segundos: 750, titulo: 'Oito padrões de prompt para aprender', objetivo: 'O2 e O3' },
  { segundos: 1080, titulo: 'Configurando o Claude Code para estudar', objetivo: 'O1' },
  { segundos: 1260, titulo: 'Demonstração: o mesmo problema, dois prompts', objetivo: 'Todos' },
  { segundos: 1440, titulo: 'Armadilhas e as três regras' },
]

export interface Objetivo {
  id: string
  texto: string
}

export const objetivos: Objetivo[] = [
  { id: 'O1', texto: 'Escrever prompts que pedem explicação, e não resposta pronta.' },
  { id: 'O2', texto: 'Conduzir a conversa com o assistente por etapas.' },
  { id: 'O3', texto: 'Usar o assistente para entender e explicar o código.' },
  { id: 'O4', texto: 'Conferir o que a IA entrega, com testes e casos de limite.' },
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
