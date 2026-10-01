// Questões da avaliação interativa.
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
    momento: 285,
    trecho: 'Configurando o assistente como tutor',
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
          'Isso. Ana volta a ser a autora do código: o assistente aponta e orienta, e ela corrige. É a regra "nunca aceitar código que você não sabe explicar" na prática.',
      },
      {
        texto: '"Reescreva de novo, agora com um comentário em cada linha."',
        feedback:
          'Comentários ajudam a ler, mas a solução continua sendo do assistente. Ana não pratica encontrar e corrigir o próprio erro.',
      },
      {
        texto: '"Obrigada! Vou usar essa versão, já que ela funciona."',
        feedback:
          'Funcionar não é o mesmo que entender. Se a regra mudar ou surgir outro erro, Ana não vai saber o que fazer.',
      },
    ],
  },
  {
    id: 2,
    tipo: 'escolha',
    objetivo: 'O1',
    momento: 210,
    trecho: 'Dois jeitos de pedir',
    enunciado:
      'Todos os pedidos abaixo pedem explicação por etapas. Qual deles descreve o problema de forma COMPLETA, sem deixar o assistente adivinhar a regra?',
    opcoes: [
      {
        texto: '"Sou iniciante. Quero um programa de média em Java. Explique por etapas."',
        feedback:
          'Faltam quase todas as informações: quantas notas, qual o intervalo e qual a regra de aprovação. O assistente vai inventar o que não foi dito.',
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
          'Quase lá, mas "acima de 7" exclui o 7. Se a regra real é "7 ou mais", essa palavra gera exatamente o erro da abertura do vídeo: media > 7.',
      },
      {
        texto:
          '"Sou iniciante. Quero um programa que lê 3 notas de 0 a 10 (podem ter casas decimais), calcula a média e mostra Aprovado se a média for maior ou igual a 7, senão Reprovado. Explique por etapas."',
        correta: true,
        feedback:
          'Correto. O pedido diz as entradas (3 notas de 0 a 10, com decimais), o processamento (média) e a regra exata da saída (maior ou igual a 7).',
      },
    ],
  },
  {
    id: 3,
    tipo: 'escolha',
    objetivo: 'O1',
    momento: 360,
    trecho: 'Entender o problema',
    enunciado:
      'Enunciado: "Ler a hora de entrada e a hora de saída de um carro no estacionamento e mostrar o valor a pagar: R$ 5 pela primeira hora e R$ 3 por hora adicional." Qual análise está correta?',
    opcoes: [
      {
        texto:
          'Entradas: hora de entrada e hora de saída. Processamento: calcular o tempo e depois o valor (5 + 3 × horas adicionais). Saída: valor a pagar.',
        correta: true,
        feedback:
          'Exato. O tempo não é digitado: é um valor intermediário, calculado a partir das entradas. Os preços são regras fixas do problema, não entradas.',
      },
      {
        texto:
          'Entradas: hora de entrada, hora de saída e tempo. Processamento: 5 + 3 × tempo. Saída: valor a pagar.',
        feedback:
          'Dois problemas: o tempo é calculado, não digitado, e a fórmula cobra R$ 3 por todas as horas, inclusive a primeira, que custa R$ 5.',
      },
      {
        texto: 'Entradas: hora de entrada e hora de saída. Processamento: 3 × tempo. Saída: tempo e valor a pagar.',
        feedback:
          'A fórmula ignora a primeira hora de R$ 5, e o enunciado pede só o valor como saída. O tempo é um passo intermediário.',
      },
      {
        texto: 'Entradas: preço por hora. Processamento: ler a entrada e a saída. Saída: valor a pagar.',
        feedback:
          'Os preços já estão no enunciado, então não são digitados. E ler um valor é entrada, não processamento.',
      },
    ],
  },
  {
    id: 4,
    tipo: 'ordem',
    objetivo: 'O2',
    momento: 450,
    trecho: 'Plano em etapas',
    enunciado:
      'O programa deve ler 3 notas válidas (de 0 a 10), calcular a média e mostrar Aprovado (≥ 7), Recuperação (de 5 até menos de 7) ou Reprovado. Coloque as etapas na ordem certa.',
    itens: [
      'Ler uma nota',
      'Repetir a leitura enquanto a nota estiver fora de 0 a 10',
      'Calcular a média das três notas',
      'Testar se a média é maior ou igual a 7',
      'Se não for, testar se a média é maior ou igual a 5',
    ],
    feedbackCerto:
      'Ordem correta. A validação vem logo depois da leitura, para nenhuma nota inválida entrar na média. E o teste do 7 vem antes do teste do 5: se fosse ao contrário, uma média 8 cairia em Recuperação.',
    feedbackErrado:
      'Ainda não. Duas pistas: a nota precisa ser validada antes de entrar na média, e o teste com o limite maior (7) precisa vir antes do teste com o limite menor (5).',
  },
  {
    id: 5,
    tipo: 'escolha',
    objetivo: 'O2',
    momento: 510,
    trecho: 'Construir etapa por etapa',
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
          'Voltar a um pedaço pequeno que funciona (só a leitura), rodar, e acrescentar uma parte por vez, testando a cada passo.',
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
    momento: 750,
    trecho: 'Explicar de volta',
    enunciado: 'Antes de rodar, explique: o que este trecho mostra?',
    codigo: `int a = 7;
int b = 2;
double r = a / b;
System.out.println(r);`,
    opcoes: [
      {
        texto: '3.5, porque r é double.',
        feedback:
          'É a resposta mais comum, mas a divisão acontece antes da atribuição. a / b é uma divisão entre dois int, que descarta a parte decimal.',
      },
      {
        texto: '3.0, porque a / b é uma divisão inteira (dá 3) e só depois vira double.',
        correta: true,
        feedback:
          'Correto. Java calcula 7 / 2 com inteiros, o que dá 3, e só então guarda em r como 3.0. Para obter 3.5, ao menos um dos valores precisa ser double, como em (double) a / b.',
      },
      {
        texto: '3, porque a e b são int.',
        feedback: 'A divisão dá 3, mas r é double, então o println mostra 3.0, com a casa decimal.',
      },
      {
        texto: 'Dá erro de compilação, porque não se pode guardar um int em um double.',
        feedback: 'Pode sim: Java converte int para double automaticamente. O código compila e roda.',
      },
    ],
  },
  {
    id: 7,
    tipo: 'escolha',
    objetivo: 'O3',
    momento: 825,
    trecho: 'De volta ao erro da abertura',
    enunciado:
      'Este trecho deveria ler 3 notas e calcular a média. Ele compila e roda. Lendo linha por linha, qual é o problema?',
    codigo: `double soma = 0;
for (int i = 1; i < 3; i++) {
    soma = soma + entrada.nextDouble();
}
double media = soma / 3;`,
    opcoes: [
      {
        texto: 'Não há problema: o laço lê as notas 1, 2 e 3.',
        feedback:
          'Siga o laço: i começa em 1 e para quando deixa de ser menor que 3. Ele roda com i = 1 e i = 2, ou seja, duas vezes.',
      },
      {
        texto: 'soma deveria ser int, porque o contador i é int.',
        feedback: 'As notas têm casas decimais, então soma precisa ser double. O tipo de i não interfere.',
      },
      {
        texto: 'A média deveria ser soma / i.',
        feedback:
          'Depois do laço, i nem existe mais (ele só vale dentro do for). E o problema real está em quantas vezes o laço roda.',
      },
      {
        texto: 'O laço roda só 2 vezes: lê duas notas e divide por 3. Deveria ser i <= 3.',
        correta: true,
        feedback:
          'Isso. Com i < 3 e início em 1, só duas notas são lidas, e a média sai menor do que deveria. Como na abertura, o código roda, mas a lógica está errada. Só aparece quando alguém explica o laço volta por volta.',
      },
    ],
  },
  {
    id: 8,
    tipo: 'escolha',
    objetivo: 'O4',
    momento: 930,
    trecho: 'Casos de teste',
    enunciado:
      'Regra: Aprovado com média ≥ 7, Recuperação de 5 até menos de 7, Reprovado abaixo de 5. O código usa if (media >= 7) ... else if (media > 5) ... else .... Qual PAR de testes revela o erro?',
    opcoes: [
      {
        texto: 'Médias 6 e 8',
        feedback: 'Com 6 e 8 o código acerta (Recuperação e Aprovado). Valores no meio das faixas não pegam erros de limite.',
      },
      {
        texto: 'Médias 5 e 7',
        correta: true,
        feedback:
          'Correto. Testar os limites da regra revela o erro: com média 5 o código mostra Reprovado, mas a regra diz Recuperação, porque media > 5 exclui o 5.',
      },
      {
        texto: 'Médias 0 e 10',
        feedback: 'Extremos são bons testes, mas aqui o código acerta os dois. O erro está no limite de 5.',
      },
      {
        texto: 'Médias 6.5 e 6.9',
        feedback: 'As duas estão dentro da faixa de Recuperação, longe do limite com erro. O código acerta ambas.',
      },
    ],
  },
  {
    id: 9,
    tipo: 'escolha',
    objetivo: 'O4',
    momento: 1020,
    trecho: 'Modificação 1: recuperação',
    enunciado:
      'Um colega fez a modificação da recuperação, mas inverteu a ordem dos testes. Preveja: o que este trecho mostra?',
    codigo: `double media = 8.0;
if (media >= 5) {
    System.out.println("Recuperação");
} else if (media >= 7) {
    System.out.println("Aprovado");
} else {
    System.out.println("Reprovado");
}`,
    opcoes: [
      {
        texto: 'Aprovado',
        feedback:
          'Seria o certo pela regra, mas o código testa media >= 5 primeiro. Como 8 ≥ 5, ele entra no primeiro bloco e nem chega ao teste do 7.',
      },
      {
        texto: 'Recuperação e Aprovado',
        feedback: 'Numa cadeia if / else if / else, só o primeiro bloco verdadeiro é executado.',
      },
      {
        texto: 'Recuperação',
        correta: true,
        feedback:
          'Isso, e esse é o erro. O primeiro teste verdadeiro vence: 8 ≥ 5 já mostra Recuperação. Por isso o teste com o limite maior (7) precisa vir primeiro. Com essa ordem, nenhum aluno seria aprovado.',
      },
      {
        texto: 'Reprovado',
        feedback: 'O else só roda se todos os testes anteriores forem falsos, mas 8 ≥ 5 é verdadeiro.',
      },
    ],
  },
  {
    id: 10,
    tipo: 'escolha',
    objetivo: 'O4',
    momento: 1170,
    trecho: 'Modificação 2: validar as notas',
    enunciado:
      'O programa precisa continuar pedindo a nota se a pessoa digitar um valor fora de 0 a 10 OU um texto, como "abc". Qual versão resolve os DOIS casos?',
    opcoes: [
      {
        texto: 'Um while que testa o intervalo:',
        codigo: `double nota = entrada.nextDouble();
while (nota < 0 || nota > 10) {
    System.out.print("Digite de novo: ");
    nota = entrada.nextDouble();
}`,
        feedback:
          'Resolve o intervalo, mas não o texto: com "abc", o nextDouble() lança InputMismatchException antes mesmo de chegar ao while.',
      },
      {
        texto: 'Um try/catch que troca o erro por zero:',
        codigo: `double nota;
try {
    nota = entrada.nextDouble();
} catch (Exception e) {
    nota = 0;
}`,
        feedback:
          'O programa não quebra, mas registra 0 sem avisar: o aluno que digitou errado fica com nota zero. E nada impede uma nota 15.',
      },
      {
        texto: 'Um laço que confere se é número antes de ler:',
        codigo: `double nota;
while (true) {
    System.out.print("Nota: ");
    if (entrada.hasNextDouble()) {
        nota = entrada.nextDouble();
        if (nota >= 0 && nota <= 10) break;
        System.out.println("Fora de 0 a 10.");
    } else {
        System.out.println("Digite um número.");
        entrada.next(); // descarta o texto
    }
}`,
        correta: true,
        feedback:
          'Correto. hasNextDouble() confere se o que foi digitado é número antes de ler; entrada.next() descarta o texto inválido; e o teste do intervalo repete a pergunta até a nota ser válida. É a mesma ideia do método lerNota do vídeo.',
      },
      {
        texto: 'Um if que confere se é número:',
        codigo: `double nota = 0;
if (entrada.hasNextDouble()) {
    nota = entrada.nextDouble();
} else {
    System.out.println("Digite um número.");
}`,
        feedback:
          'Pergunta só uma vez e não descarta o texto: o "abc" continua na entrada e a próxima leitura falha de novo. Também não testa o intervalo de 0 a 10.',
      },
    ],
  },
]
