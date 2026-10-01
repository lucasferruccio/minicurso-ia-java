// Materiais de apoio e referências.

export const regras = [
  { titulo: 'Entender antes de codar', texto: 'Descubra as entradas, o processamento e a saída antes de pedir código.' },
  { titulo: 'Avançar por etapas', texto: 'Uma parte por vez, rodando o programa a cada passo.' },
  { titulo: 'Nunca aceitar código que você não sabe explicar', texto: 'Explique de volta, preveja o resultado e teste os limites.' },
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

export const codigoFinal = `import java.util.Scanner;

public class CalculadoraMedia {
    public static void main(String[] args) {
        Scanner entrada = new Scanner(System.in);

        double nota1 = lerNota(entrada, "Nota 1: ");
        double nota2 = lerNota(entrada, "Nota 2: ");
        double nota3 = lerNota(entrada, "Nota 3: ");

        double media = (nota1 + nota2 + nota3) / 3;
        System.out.printf("Média: %.1f%n", media);

        if (media >= 7) {
            System.out.println("Aprovado");
        } else if (media >= 5) {
            System.out.println("Recuperação");
        } else {
            System.out.println("Reprovado");
        }

        entrada.close();
    }

    static double lerNota(Scanner entrada, String mensagem) {
        while (true) {
            System.out.print(mensagem);
            if (entrada.hasNextDouble()) {
                double nota = entrada.nextDouble();
                if (nota >= 0 && nota <= 10) {
                    return nota;
                }
                System.out.println("A nota deve estar entre 0 e 10.");
            } else {
                System.out.println("Digite um número.");
                entrada.next(); // descarta o texto inválido
            }
        }
    }
}`

export const desafio = {
  titulo: 'Desafio final: uma turma inteira',
  texto:
    'Adapte o programa para vários alunos. Ele deve ler o nome e as 3 notas de cada aluno e, no fim, mostrar a situação de cada um e quantos foram aprovados.',
  dica: 'Use o assistente como tutor: peça as etapas, escreva você mesmo, preveja a saída e teste os limites. Se for usar uma lista, peça para ele explicar o ArrayList antes.',
}

export const dicaScanner =
  'No Windows em português, o Scanner espera vírgula nas notas (7,5). Digitar 7.5 gera um erro InputMismatchException.'

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
        texto: 'JETBRAINS. IntelliJ IDEA. Acesso em: 30 set. 2026.',
        url: 'https://www.jetbrains.com/idea/',
      },
    ],
  },
]
