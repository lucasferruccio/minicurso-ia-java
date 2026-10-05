// Questões da avaliação interativa.
// Foco: usar o assistente de código (Claude Code) para APRENDER, não Java em si.
// Cada questão está ligada a um objetivo (O1–O4) e a um momento do vídeo (em segundos).
// Depois da edição do vídeo, ajuste o campo `momento` para os tempos reais.

export interface Opcao {
  texto: string
  /** Código opcional mostrado na alternativa. */
  codigo?: string
  correta?: boolean
  /** Explicação mostrada quando o participante escolhe esta alternativa. */
  feedback: string
}

interface Base {
  id: number
  objetivo: 'O1' | 'O2' | 'O3' | 'O4'
  enunciado: string
  codigo?: string
  /** Momento do vídeo (segundos) para rever o assunto. */
  momento: number
  /** Nome do trecho do vídeo. */
  trecho: string
}

export interface QuestaoEscolha extends Base {
  tipo: 'escolha'
  opcoes: Opcao[]
}

export interface QuestaoOrdem extends Base {
  tipo: 'ordem'
  /** Itens na ordem CORRETA. O site embaralha antes de mostrar. */
  itens: string[]
  feedbackCerto: string
  feedbackErrado: string
}

export type Questao = QuestaoEscolha | QuestaoOrdem

export const questoes: Questao[] = [
  {
    id: 1,
    tipo: 'escolha',
    objetivo: 'O1',
    momento: 855,
    trecho: 'Padrão 4: dica, não solução',
    enunciado:
      'Ana colou seu código com erro e pediu: "o que está errado?". O assistente respondeu com uma versão nova, toda reescrita, que funciona. Qual deve ser o próximo pedido de Ana para continuar APRENDENDO?',
    opcoes: [
      {
        texto: '"Explique essa versão nova linha por linha."',
        feedback:
          'É melhor do que copiar, mas Ana vai entender a solução do assistente, não o erro no raciocínio dela. O erro original continua sem ser descoberto.',
      },
      {
        texto:
          '"Não reescreva. Me diga em que parte está o problema e me dê uma dica para eu mesma corrigir."',
        correta: true,
        feedback:
          'Isso. Ana volta a ser a autora do código: o assistente aponta e orienta, e ela corrige. É o assistente agindo como tutor, não como resposta pronta.',
      },
      {
        texto: '"Reescreva de novo, agora com um comentário em cada linha."',
        feedback:
          'Comentários ajudam a ler, mas a solução continua sendo do assistente. Ana não pratica encontrar e corrigir o próprio erro.',
      },
      {
        texto: '"Obrigada! Vou usar essa versão, já que ela funciona."',
        feedback:
          'Funcionar não é o mesmo que entender. Se a regra mudar ou surgir outro erro, Ana vai depender do assistente de novo.',
      },
    ],
  },
  {
    id: 2,
    tipo: 'escolha',
    objetivo: 'O1',
    momento: 570,
    trecho: 'O mesmo pedido, antes e depois',
    enunciado:
      'Todos os pedidos abaixo pedem explicação por etapas. Qual deles descreve o problema de forma COMPLETA, sem deixar o assistente adivinhar a regra?',
    opcoes: [
      {
        texto: '"Sou iniciante. Quero um programa de média em Java. Explique por etapas."',
        feedback:
          'Faltam quase todas as informações: quantas notas, qual o intervalo e qual a regra de aprovação. O assistente vai inventar o que não foi dito, e você nem vai perceber.',
      },
      {
        texto: '"Sou iniciante. Quero um programa que lê notas e diz se o aluno passou. Explique por etapas."',
        feedback:
          'Não diz quantas notas são nem qual média aprova. "Passou" pode significar regras diferentes em cada escola.',
      },
      {
        texto:
          '"Sou iniciante. Quero um programa que lê 3 notas e mostra Aprovado se a média for acima de 7. Explique por etapas."',
        feedback:
          'Quase lá, mas "acima de 7" exclui o 7. Se a regra real é "7 ou mais", o assistente vai seguir o que você escreveu e gerar exatamente o erro da abertura do vídeo.',
      },
      {
        texto:
          '"Sou iniciante. Quero um programa que lê 3 notas de 0 a 10, calcula a média e mostra Aprovado se a média for maior ou igual a 7, senão Reprovado. Antes do código, me pergunte o que não estiver claro."',
        correta: true,
        feedback:
          'Correto. O pedido diz as entradas, o processamento e a regra exata, e ainda convida o assistente a perguntar antes de codar. O assistente faz o que você pede, não o que você quis dizer.',
      },
    ],
  },
  {
    id: 3,
    tipo: 'escolha',
    objetivo: 'O1',
    momento: 1080,
    trecho: 'CLAUDE.md',
    enunciado:
      'Você vai criar o arquivo CLAUDE.md do projeto para estudar. Qual instrução deixa o Claude Code no papel certo de TUTOR para um iniciante?',
    opcoes: [
      {
        texto: '"Explique cada linha com todos os detalhes técnicos, como para um especialista."',
        feedback:
          'Explicar é bom, mas no nível errado. Um iniciante se perde em detalhes de especialista. A instrução precisa dizer quem você é.',
      },
      {
        texto: '"Nunca me mostre código. Explique tudo só em texto."',
        feedback:
          'Proibir código vai longe demais: ver exemplos faz parte de aprender. A ideia é dosar o código, uma etapa por vez, não esconder tudo.',
      },
      {
        texto:
          '"Sou iniciante em Java. Explique antes de escrever código, mostre uma etapa por vez e me peça para prever o resultado antes de rodar."',
        correta: true,
        feedback:
          'Correto. A instrução diz o seu nível e pede três atitudes de tutor: explicar antes, avançar por etapas e fazer você prever o resultado.',
      },
      {
        texto: '"Seja direto e responda só com o código, para eu ganhar tempo."',
        feedback:
          'Ganha tempo agora e perde depois: sem explicação, você não sabe corrigir o código quando ele estiver errado.',
      },
    ],
  },
  {
    id: 4,
    tipo: 'ordem',
    objetivo: 'O2',
    momento: 750,
    trecho: 'Padrões 1 a 3: entrevista, plano e etapas',
    enunciado:
      'Você vai resolver um problema novo com o Claude Code. Coloque na ordem certa os passos da conversa com o assistente.',
    itens: [
      'Descrever o problema e pedir que o assistente faça perguntas antes de escrever código',
      'Pedir um plano com as etapas da solução, ainda sem código',
      'Pedir só a primeira etapa, com explicação das linhas novas',
      'Prever o resultado e rodar o programa para conferir',
      'Só então pedir a próxima etapa',
    ],
    feedbackCerto:
      'Ordem correta. Primeiro entender o problema, depois planejar, e então construir uma etapa por vez, sempre prevendo e conferindo antes de avançar.',
    feedbackErrado:
      'Ainda não. Pense assim: entender o problema vem antes de planejar, planejar vem antes de qualquer código, e cada etapa precisa ser conferida antes de pedir a próxima.',
  },
  {
    id: 5,
    tipo: 'escolha',
    objetivo: 'O2',
    momento: 810,
    trecho: 'Padrão 3: uma etapa por vez',
    enunciado:
      'Você pediu tudo de uma vez e o assistente gerou 40 linhas com leitura, validação, cálculo e um menu. Ao rodar, o programa dá erro. Qual é a melhor estratégia para APRENDER e resolver?',
    opcoes: [
      {
        texto: 'Colar a mensagem de erro no assistente e pedir correções até funcionar.',
        feedback:
          'Pode até funcionar, mas você não sabe o que mudou nem por quê. Se aparecer outro erro, você depende do assistente de novo.',
      },
      {
        texto: 'Ler as 40 linhas com atenção, procurando o erro, antes de rodar de novo.',
        feedback:
          'Ler ajuda, mas com quatro partes misturadas é difícil saber onde procurar. Separar em etapas reduz o lugar do erro.',
      },
      {
        texto:
          'Voltar a um pedaço pequeno que funciona (só a leitura), rodar, e pedir ao assistente uma parte por vez, testando a cada passo.',
        correta: true,
        feedback:
          'Isso. Cada parte nova é testada sozinha. Quando algo quebrar, o erro está na última coisa que entrou, e você entende cada pedaço que constrói.',
      },
      {
        texto: 'Trocar de assistente, porque este gerou código com erro.',
        feedback:
          'Qualquer assistente pode errar. O que resolve é o método: construir por etapas e testar cada uma.',
      },
    ],
  },
  {
    id: 6,
    tipo: 'escolha',
    objetivo: 'O3',
    momento: 990,
    trecho: 'Padrão 8: perguntar o desconhecido',
    enunciado:
      'Na resposta do assistente aparece um recurso que você ainda não aprendeu (por exemplo, ArrayList). O código funciona. O que fazer?',
    opcoes: [
      {
        texto: 'Aceitar, já que funciona. Você aprende esse recurso mais tarde.',
        feedback:
          'Essa é a armadilha da "ilusão de competência": o programa roda, mas tem uma parte que você não sabe explicar nem modificar.',
      },
      {
        texto:
          'Pedir que o assistente explique o que é esse recurso e por que foi usado, e se existe um jeito de resolver com o que você já sabe.',
        correta: true,
        feedback:
          'Correto. Você transforma a novidade em aprendizado e ainda compara com o que já conhece. A regra é: nunca aceitar código que você não sabe explicar.',
      },
      {
        texto: 'Pedir que o assistente remova o recurso, sem explicação.',
        feedback:
          'Evita a novidade, mas perde a chance de aprender. Melhor entender primeiro e depois decidir se vale usar.',
      },
      {
        texto: 'Copiar o código e pesquisar o recurso depois, se der erro.',
        feedback:
          'Deixar para depois costuma virar nunca. E quando der erro, você vai ter de entender o recurso com pressa.',
      },
    ],
  },
  {
    id: 7,
    tipo: 'escolha',
    objetivo: 'O3',
    momento: 900,
    trecho: 'Padrão 5: explicar de volta',
    enunciado:
      'O assistente explicou o código e você acha que entendeu. Qual é a melhor forma de CONFERIR se entendeu mesmo?',
    opcoes: [
      {
        texto: 'Perguntar ao assistente: "Entendi certo?"',
        feedback:
          'A pergunta não mostra o que você entendeu, então o assistente tende a só concordar. Ele precisa ver a sua explicação para corrigir.',
      },
      {
        texto: 'Pedir uma explicação ainda mais detalhada.',
        feedback:
          'Mais explicação é mais leitura, não prova de entendimento. O teste é você conseguir explicar sozinho.',
      },
      {
        texto: 'Reler a explicação do assistente com calma.',
        feedback:
          'Reler dá a sensação de que entendeu, porque o texto fica familiar. Mas reconhecer não é o mesmo que saber explicar.',
      },
      {
        texto:
          'Explicar com suas palavras o que o código faz e pedir ao assistente que corrija sua explicação, sem reescrever o código.',
        correta: true,
        feedback:
          'Isso. Explicar de volta revela as lacunas, e o assistente corrige exatamente o que você entendeu errado. Foi essa técnica que encontrou o erro da abertura.',
      },
    ],
  },
  {
    id: 8,
    tipo: 'escolha',
    objetivo: 'O4',
    momento: 420,
    trecho: 'Ele pode errar com toda a confiança',
    enunciado:
      'Você pediu uma correção e o Claude Code respondeu: "Corrigi o problema e testei, está funcionando." O que você faz?',
    opcoes: [
      {
        texto:
          'Ler o que mudou, prever o resultado e rodar você mesmo, incluindo os casos de limite da regra (como média exatamente 7).',
        correta: true,
        feedback:
          'Correto. O assistente pode ter testado só casos fáceis, e o erro da abertura passava em quase todos. Quem confere o resultado é você.',
      },
      {
        texto: 'Confiar e seguir em frente, já que o assistente testou.',
        feedback:
          'O código do começo do vídeo também "funcionava": compilava e rodava. O erro só aparecia com a média 7,0.',
      },
      {
        texto: 'Perguntar: "Tem certeza de que está certo?"',
        feedback:
          'O assistente tende a confirmar a própria resposta. Perguntar de novo não substitui ver o resultado com os seus testes.',
      },
      {
        texto: 'Pedir que o assistente rode os mesmos testes mais uma vez.',
        feedback: 'Repetir os mesmos testes repete o mesmo ponto cego. Faltam os casos de limite, escolhidos por você.',
      },
    ],
  },
  {
    id: 9,
    tipo: 'escolha',
    objetivo: 'O4',
    momento: 960,
    trecho: 'Padrão 7: casos de limite',
    enunciado:
      'Você pediu casos de teste e o assistente sugeriu as médias 6, 8 e 9. A regra é: Aprovado com média ≥ 7. Qual deve ser seu próximo pedido?',
    opcoes: [
      {
        texto: '"Ótimo, três testes bastam."',
        feedback:
          'Nenhum desses testes está no limite da regra. Um código com media > 7 passaria nos três, e o erro ficaria escondido.',
      },
      {
        texto:
          '"Inclua os casos de limite da regra, como média exatamente 7, e explique o que cada teste verifica."',
        correta: true,
        feedback:
          'Isso. Você direciona o assistente para os testes que pegam erros de verdade e ainda aprende por que cada um importa.',
      },
      {
        texto: '"Gere mais 20 testes com médias aleatórias."',
        feedback:
          'Quantidade não garante qualidade: médias aleatórias dificilmente caem exatamente em 7,0, onde o erro aparece.',
      },
      {
        texto: '"Me garanta que o código está correto."',
        feedback:
          'O assistente não pode garantir isso por você. O caminho é escolher bons testes e conferir os resultados.',
      },
    ],
  },
  {
    id: 10,
    tipo: 'escolha',
    objetivo: 'O4',
    momento: 570,
    trecho: 'O mesmo pedido, antes e depois',
    enunciado:
      'Você quer acrescentar a regra de recuperação ao programa. Qual pedido ao assistente mais ajuda você a modificar o código ENTENDENDO a mudança?',
    opcoes: [
      {
        texto: '"Adicione recuperação."',
        feedback:
          'Curto demais: o assistente vai escolher os limites da recuperação por conta própria, e talvez não sejam os da sua escola.',
      },
      {
        texto:
          '"Mude a regra: ≥ 7 aprovado, de 5 até menos de 7 recuperação, abaixo de 5 reprovado. Faça a mudança e me mostre só o código final."',
        feedback:
          'A regra está completa, mas "só o código final" pula o entendimento. Você recebe a mudança pronta sem saber o que mudou nem por quê.',
      },
      {
        texto:
          '"Mude a regra: ≥ 7 aprovado, de 5 até menos de 7 recuperação, abaixo de 5 reprovado. Antes de mostrar o código, me diga quais linhas precisam mudar e por quê."',
        correta: true,
        feedback:
          'Correto. A regra está clara e você entende a mudança antes de vê-la. Depois, é prever o resultado e testar os limites 5 e 7.',
      },
      {
        texto: '"Reescreva o programa inteiro com recuperação."',
        feedback:
          'Reescrever tudo esconde o que realmente mudou e pode trocar partes que já funcionavam. Peça só a mudança necessária.',
      },
    ],
  },
]
