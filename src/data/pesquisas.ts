// Dados do infográfico "O que as pesquisas dizem".
// Cada número foi conferido na fonte original (link em `fonte`).
// Conteúdo complementar: não repete o vídeo nem os Materiais, mas mostra
// as evidências por trás das regras ensinadas no minicurso.

export interface Hotspot {
  titulo: string
  texto: string
}

export interface Fonte {
  rotulo: string
  url: string
}

interface CapituloBase {
  id: string
  rotulo: string
  /** Número de destaque, em letras grandes. */
  destaque: string
  destaqueLegenda: string
  titulo: string
  contexto: string
  achado: string
  conexao: string
  limites: string
  metodo: string
  fonte: Fonte
}

export interface CapituloBarras extends CapituloBase {
  tipo: 'barras'
  /** Barras mostradas antes e depois de "tirar a IA". */
  grupos: { nome: string; pratica: number; prova: number; hotspot: Hotspot }[]
}

export interface CapituloComparacao extends CapituloBase {
  tipo: 'comparacao'
  barras: { nome: string; valor: number; destaque?: boolean }[]
  padroes: { nome: string; resultado: string; bom: boolean; exemplos: string }[]
  hotspot: Hotspot
}

export interface CapituloModos extends CapituloBase {
  tipo: 'modos'
  modos: { nome: string; traducao: string; descricao: string; resultado: string; tom: 'bom' | 'ruim' | 'neutro' }[]
}

export interface CapituloPontos extends CapituloBase {
  tipo: 'pontos'
  total: number
  vistas: { rotulo: string; marcados: number; legenda: string }[]
  hotspot: Hotspot
}

export type Capitulo = CapituloBarras | CapituloComparacao | CapituloModos | CapituloPontos

export const abertura = {
  pergunta: 'A IA ajuda ou atrapalha quem está aprendendo a programar?',
  numeros: [
    { valor: '4', legenda: 'estudos de 2023 a 2026' },
    { valor: '+1.000', legenda: 'participantes, de adolescentes a desenvolvedores' },
    { valor: '1', legenda: 'conclusão em comum' },
  ],
  resposta: 'Depende menos de usar ou não usar a IA e mais de como você usa.',
}

export const capitulos: Capitulo[] = [
  {
    id: 'tutor',
    tipo: 'barras',
    rotulo: 'Muleta ou tutor',
    destaque: '−17%',
    destaqueLegenda: 'na prova, para quem praticou com o ChatGPT comum',
    titulo: 'Quando a IA sai de cena, quem só copiava vai pior',
    contexto:
      'Quase mil estudantes de ensino médio praticaram matemática em três grupos: sem IA, com uma interface comum do GPT-4 ("GPT Base") e com um "GPT Tutor", configurado para dar dicas em vez da resposta pronta. Depois, todos fizeram uma prova sem nenhuma ajuda.',
    achado:
      'Com a IA, os dois grupos foram muito melhores na prática. Sem ela, quem usou o GPT Base teve nota 17% menor do que quem nunca usou IA. O GPT Tutor praticamente eliminou esse prejuízo.',
    conexao:
      'O "GPT Tutor" é a mesma ideia do arquivo CLAUDE.md de tutor e do estilo Learning do Claude Code: a ferramenta é igual, o que muda é a instrução.',
    limites:
      'Uma escola na Turquia, uma matéria (matemática) e poucas sessões. Não é um estudo de programação, mas o mecanismo, usar a IA como muleta, é o mesmo.',
    metodo:
      'Experimento de campo controlado em uma escola, com sessões de prática seguidas de prova sem consulta. Os percentuais comparam cada grupo com o grupo sem IA.',
    grupos: [
      {
        nome: 'GPT Base (resposta pronta)',
        pratica: 48,
        prova: -17,
        hotspot: {
          titulo: 'Por que caiu?',
          texto:
            'Os autores observaram que, sem proteções, os estudantes usavam o GPT-4 como muleta: pediam a resposta e seguiam em frente. Quando a muleta saiu, faltou o que eles não tinham aprendido.',
        },
      },
      {
        nome: 'GPT Tutor (dicas)',
        pratica: 127,
        prova: 0,
        hotspot: {
          titulo: 'O que o tutor fazia diferente',
          texto:
            'Ele foi instruído a orientar passo a passo e dar dicas, sem entregar a solução. Os estudantes melhoraram ainda mais na prática e, na prova, ficaram no mesmo nível de quem não usou IA.',
        },
      },
    ],
    fonte: {
      rotulo: 'Bastani et al., PNAS, 2025',
      url: 'https://doi.org/10.1073/pnas.2422633122',
    },
  },
  {
    id: 'depuracao',
    tipo: 'comparacao',
    rotulo: 'Entender o código',
    destaque: '50% × 67%',
    destaqueLegenda: 'acertos no teste de quem aprendeu com IA × sem IA',
    titulo: 'Terminar a tarefa não é o mesmo que aprender',
    contexto:
      'Pesquisadores da Anthropic sortearam 52 desenvolvedores para aprender uma biblioteca nova de Python (Trio), com ou sem um assistente de IA. Logo depois, todos fizeram um teste sem IA sobre o que tinham acabado de usar.',
    achado:
      'Quem usou IA acertou em média 50% do teste; quem programou sozinho, 67%. A maior diferença apareceu nas questões de depuração: perceber quando o código está errado e por quê.',
    conexao:
      'Depurar é justamente o que você precisa para conferir a IA. Por isso o minicurso insiste em explicar o código de volta e prever o resultado antes de rodar.',
    limites:
      'Amostra pequena (52 pessoas), uma tarefa curta e um teste logo em seguida, sem medir o que ficou depois de semanas. Os grupos de padrões de uso são ainda menores.',
    metodo:
      'Ensaio controlado e randomizado: aquecimento, tarefa de 35 minutos com a biblioteca Trio e teste de 25 minutos sem IA para todos.',
    barras: [
      { nome: 'Aprendeu com IA', valor: 50, destaque: true },
      { nome: 'Aprendeu sem IA', valor: 67 },
    ],
    padroes: [
      {
        nome: 'Delegar tudo',
        bom: false,
        resultado: 'média abaixo de 40%',
        exemplos: 'Pedir para a IA gerar o código ou consertar os erros e seguir sem entender.',
      },
      {
        nome: 'Usar a IA para entender',
        bom: true,
        resultado: 'média de 65% ou mais',
        exemplos: 'Pedir explicações, fazer perguntas conceituais e resolver os erros por conta própria.',
      },
    ],
    hotspot: {
      titulo: 'Usar IA não condena ninguém',
      texto:
        'Dentro do grupo com IA, quem fazia perguntas de acompanhamento e pedia explicações teve notas altas. O que derrubou a média foi a dependência, não a ferramenta.',
    },
    fonte: {
      rotulo: 'Anthropic, 2026',
      url: 'https://www.anthropic.com/research/AI-assistance-coding-skills',
    },
  },
  {
    id: 'modos',
    tipo: 'modos',
    rotulo: 'Jeitos de pedir',
    destaque: '1,8×',
    destaqueLegenda: 'notas maiores ao escrever código com IA, sem perder na hora de modificar',
    titulo: 'Um pedido só, a solução inteira: o pior caminho',
    contexto:
      '69 iniciantes de 10 a 17 anos aprenderam Python em 45 tarefas; metade tinha um gerador de código com IA (Codex). Num segundo estudo, os pesquisadores analisaram como os 33 estudantes com IA a usaram.',
    achado:
      'Com IA, os estudantes concluíram mais tarefas e tiveram notas 1,8 vez maiores, sem piorar ao modificar código à mão. Mas o jeito de usar fez diferença: clique em cada um para ver.',
    conexao:
      'É o padrão "Uma etapa por vez" do minicurso, com um passo além: escrever parte do código você mesmo.',
    limites:
      'Participantes jovens, linguagem Python e uma ferramenta de 2023. As diferenças entre os jeitos de usar são tendências, não uma relação de causa comprovada.',
    metodo:
      'Estudo controlado em 10 sessões, com pós-teste imediato e outro uma semana depois. A análise dos modos de uso examinou os registros de uso da ferramenta.',
    modos: [
      {
        nome: 'AI Single Prompt',
        traducao: 'Um pedido, solução inteira',
        descricao: 'Pedia de uma vez o programa completo.',
        resultado:
          'Melhores notas ao escrever com a IA, mas as piores na tarefa seguinte de modificar o código, e tendência negativa no pós-teste.',
        tom: 'ruim',
      },
      {
        nome: 'AI Step-by-Step',
        traducao: 'Por partes, a IA escreve',
        descricao: 'Dividia o problema em partes e pedia cada parte à IA.',
        resultado: 'Já exige pensar na divisão do problema, que é o primeiro passo do que o minicurso ensina.',
        tom: 'neutro',
      },
      {
        nome: 'Hybrid',
        traducao: 'Híbrido',
        descricao: 'Escrevia parte do código e pedia à IA só o que faltava.',
        resultado: 'Tendência positiva e consistente com as notas do pós-teste.',
        tom: 'bom',
      },
      {
        nome: 'Manual',
        traducao: 'Sem IA',
        descricao: 'Escrevia tudo sozinho, mesmo tendo a IA disponível.',
        resultado: 'Mostra autorregulação: escolher não usar a IA também é uma decisão de quem está aprendendo.',
        tom: 'neutro',
      },
    ],
    fonte: {
      rotulo: 'Kazemitabaar et al., CHI 2023 e Koli Calling 2023',
      url: 'https://doi.org/10.1145/3631802.3631806',
    },
  },
  {
    id: 'ilusao',
    tipo: 'pontos',
    rotulo: 'Ilusão de competência',
    destaque: '20 de 21',
    destaqueLegenda: 'estudantes concluíram o exercício com IA',
    titulo: 'Concluir não prova que você entendeu',
    contexto:
      'Pesquisadores observaram 21 estudantes iniciantes resolvendo um problema de programação com ferramentas de IA, com rastreamento ocular e entrevistas.',
    achado:
      'Quase todos concluíram. Mas 10 deles tiveram dificuldades metacognitivas: não perceberam que estavam perdidos, seguiram sugestões erradas ou acharam que tinham ido melhor do que foram.',
    conexao:
      'É por isso que o minicurso pede para você prever o resultado e explicar o código com suas palavras: são formas de testar se você entendeu de verdade.',
    limites:
      'Estudo qualitativo com 21 pessoas em laboratório. Mostra como as dificuldades acontecem, não com que frequência acontecem em toda a população.',
    metodo:
      'Sessões individuais com observação, entrevista e rastreamento ocular, repetindo um estudo de 2018 feito antes da IA generativa.',
    total: 21,
    vistas: [
      { rotulo: 'Concluíram o exercício', marcados: 20, legenda: '20 de 21 concluíram' },
      { rotulo: 'Tiveram dificuldades', marcados: 10, legenda: '10 de 21 tiveram dificuldades metacognitivas' },
    ],
    hotspot: {
      titulo: 'A brecha que aumenta',
      texto:
        'Quem já ia bem usou a IA para escrever o que já pretendia e ignorou sugestões erradas. Quem tinha dificuldade foi atrapalhado e saiu com ilusão de competência. Por isso os autores falam em uma brecha que se amplia.',
    },
    fonte: {
      rotulo: 'Prather et al., ICER 2024',
      url: 'https://doi.org/10.1145/3632620.3671116',
    },
  },
]

export const conclusao = {
  titulo: 'O que fazer com isso',
  itens: [
    { capitulo: 'tutor', texto: 'Configure o assistente como tutor antes de começar (CLAUDE.md ou estilo Learning).' },
    { capitulo: 'depuracao', texto: 'Depois de cada resposta, pergunte o porquê. Tente resolver o erro antes de pedir a correção.' },
    { capitulo: 'modos', texto: 'Nunca peça a solução inteira de uma vez. Escreva uma parte, peça ajuda com o resto.' },
    { capitulo: 'ilusao', texto: 'Preveja o resultado e explique o código com suas palavras para saber se entendeu.' },
  ],
  cuidado:
    'Leia com cuidado: são estudos recentes, com públicos e duração diferentes. Nenhum deles sozinho prova tudo, mas todos apontam na mesma direção.',
}
