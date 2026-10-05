// Materiais de apoio e referências.

export const regras = [
  { titulo: 'Entender antes de codar', texto: 'Descubra as entradas, o processamento e a saída antes de pedir código.' },
  { titulo: 'Avançar por etapas', texto: 'Uma parte por vez, conferindo a cada passo.' },
  { titulo: 'Nunca aceitar código que você não sabe explicar', texto: 'Explique de volta, preveja o resultado e teste os limites.' },
]

export const modeloPrompt = `Sou [seu nível] em [linguagem] e quero aprender, não só a resposta.
Problema: [entradas, regra exata e saída esperada].
O que já tenho: [código ou mensagem de erro, se houver].
Agora quero só: [uma tarefa pequena].
Explique antes de mostrar código e me pergunte o que não estiver claro.`

export const padroes = [
  { nome: 'Entrevista', frase: 'Antes de escrever código, me faça perguntas sobre o problema.' },
  { nome: 'Plano sem código', frase: 'Divida a solução em etapas. Só liste as etapas, sem código.' },
  { nome: 'Uma etapa por vez', frase: 'Me mostre só a etapa 1 e explique cada linha nova.' },
  { nome: 'Dica, não solução', frase: 'Não corrija. Me diga onde está o problema e me dê uma dica.' },
  { nome: 'Explicar de volta', frase: 'Vou explicar o código com minhas palavras. Corrija o que eu errar, sem reescrever.' },
  { nome: 'Prever antes de rodar', frase: 'Com estas entradas, eu acho que sai [resultado]. Estou certo? Por quê?' },
  { nome: 'Casos de limite', frase: 'Quais testes eu devo fazer? Inclua os casos de limite e explique cada um.' },
  { nome: 'Perguntar o desconhecido', frase: 'O que é esse [recurso]? Dá para fazer com o que eu já sei?' },
]

export const pedidoErro = [
  'A mensagem de erro, copiada inteira',
  'O que você fez (ex.: "digitei 7.5 na nota 1")',
  'O que você esperava que acontecesse',
  'O que você quer (ex.: "me explique o erro, sem corrigir")',
]

export const recursosClaudeCode = [
  { nome: 'Shift+Tab (modo plano)', uso: 'Ele lê e planeja, mas não altera nenhum arquivo.' },
  { nome: '/output-style learning', uso: 'Explica as escolhas e deixa partes do código para você escrever, marcadas com TODO(human).' },
  { nome: '@arquivo', uso: 'Aponta o arquivo certo, em vez de descrever onde ele está.' },
  { nome: 'Esc e Esc Esc', uso: 'Para no meio e volta a um ponto anterior da conversa.' },
  { nome: '/clear', uso: 'Começa do zero quando a conversa ficou confusa.' },
]

export const prompts = [
  {
    titulo: 'Entender o problema',
    texto:
      'Sou iniciante em Java e quero aprender, não só receber a resposta. Quero criar um programa que lê 3 notas de um aluno, calcula a média e diz se ele foi aprovado (média maior ou igual a 7). Antes de escrever código, me explique quais são as entradas, o processamento e a saída, e me pergunte o que não estiver claro.',
  },
  {
    titulo: 'Plano em etapas',
    texto: 'Agora divida a solução em etapas pequenas. Só liste as etapas, sem código ainda.',
  },
  {
    titulo: 'Uma etapa por vez',
    texto: 'Me mostre só a etapa 1 e explique cada linha nova.',
  },
  {
    titulo: 'Explicar de volta',
    texto:
      'Vou explicar com minhas palavras o que o programa faz. Corrija o que eu errar e não reescreva o código: [sua explicação].',
  },
  {
    titulo: 'Casos de teste',
    texto:
      'Quais casos de teste eu deveria usar para verificar esse programa? Inclua os casos de limite e explique por que cada um é importante.',
  },
  {
    titulo: 'Modificar com intenção',
    texto:
      'Quero mudar a regra: [nova regra]. Antes de mostrar o código, me diga quais linhas precisam mudar e por quê.',
  },
]

export const claudeMd = `# Instruções para o assistente

Sou iniciante em Java e estou aprendendo.
- Explique antes de escrever código.
- Mostre uma etapa por vez.
- Me peça para prever o resultado antes de rodar.
- Quando eu explicar o código, corrija minha explicação sem reescrever o código.`

export const desafio = {
  titulo: 'Desafio final: uma turma inteira',
  texto:
    'Adapte o programa para vários alunos. Ele deve ler o nome e as 3 notas de cada aluno e, no fim, mostrar a situação de cada um e quantos foram aprovados.',
  dica: 'Use o assistente como tutor: peça as etapas, escreva você mesmo, preveja a saída e teste os limites. Se for usar uma lista, peça para ele explicar o ArrayList antes.',
}

export interface Referencia {
  texto: string
  url?: string
}

export const referencias: { grupo: string; itens: Referencia[] }[] = [
  {
    grupo: 'Design instrucional e educação digital',
    itens: [
      {
        texto:
          'GOMES, Alex Sandro; PIMENTEL, Edson Pinheiro. Ambientes Virtuais de Aprendizagem para uma Educação mediada por tecnologias digitais. In: PIMENTEL, Mariano; SAMPAIO, Fábio F.; SANTOS, Edméa (Org.). Informática na Educação: ambientes de aprendizagem, objetos de aprendizagem e empreendedorismo. Porto Alegre: Sociedade Brasileira de Computação, 2021. (Série Informática na Educação CEIE-SBC, v. 5).',
        url: 'https://ieducacao.ceie-br.org/ava',
      },
      {
        texto:
          'MELLO, Cleyson de Moraes; ALMEIDA NETO, José Rogério Moura de; COSTA, Márcio Martins da. Design instrucional na Educação Digital. Revista Interdisciplinar do Direito – Faculdade de Direito de Valença, v. 22, n. 1, e20242204, 2024.',
        url: 'https://doi.org/10.24859/RID.2024v22n1.1507',
      },
    ],
  },
  {
    grupo: 'IA generativa no ensino de programação',
    itens: [
      {
        texto:
          'DENNY, Paul et al. Computing Education in the Era of Generative AI. Communications of the ACM, v. 67, n. 2, p. 56–67, 2024.',
        url: 'https://doi.org/10.1145/3624720',
      },
      {
        texto:
          'KAZEMITABAAR, Majeed et al. Studying the effect of AI Code Generators on Supporting Novice Learners in Introductory Programming. In: CHI Conference on Human Factors in Computing Systems (CHI ’23). Hamburg: ACM, 2023.',
        url: 'https://doi.org/10.1145/3544548.3580919',
      },
      {
        texto:
          'PRATHER, James et al. The Robots Are Here: Navigating the Generative AI Revolution in Computing Education. In: ITiCSE Working Group Reports (ITiCSE-WGR ’23). ACM, 2023.',
        url: 'https://doi.org/10.1145/3623762.3633499',
      },
      {
        texto:
          'PRATHER, James et al. The Widening Gap: The Benefits and Harms of Generative AI for Novice Programmers. In: ACM Conference on International Computing Education Research (ICER ’24). ACM, 2024.',
        url: 'https://doi.org/10.1145/3632620.3671116',
      },
    ],
  },
  {
    grupo: 'Ferramentas',
    itens: [
      {
        texto: 'ANTHROPIC. Claude Code: documentação oficial. Acesso em: 30 set. 2026.',
        url: 'https://code.claude.com/docs/en/overview',
      },
      {
        texto: 'ANTHROPIC. Best practices for Claude Code. Acesso em: 5 out. 2026.',
        url: 'https://code.claude.com/docs/en/best-practices',
      },
      {
        texto: 'ANTHROPIC. Output styles (Claude Code). Acesso em: 5 out. 2026.',
        url: 'https://code.claude.com/docs/en/output-styles',
      },
      {
        texto: 'JETBRAINS. IntelliJ IDEA. Acesso em: 30 set. 2026.',
        url: 'https://www.jetbrains.com/idea/',
      },
    ],
  },
]
