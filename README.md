# Aprender a programar com assistentes de código

Site do minicurso EaD em que o participante aprende a **escrever prompts e usar o Claude Code como tutor**: pedir bem, avançar por etapas, entender o código e conferir o que a IA entrega. O foco é o uso do assistente; o Java serve só de exemplo.

- **Autor:** Lucas Paiva
- **Disciplina:** Educação a Distância · Projeto da 1ª VA
- **Trilha:** Docência Digital na Era da IA: Ensino e Aprendizagem na EaD
- **Modelo de design instrucional:** ADDIE
- **Tecnologias:** React 19 + TypeScript + Vite, publicado na Vercel

## O que o site tem

Uma página única, na ordem de estudo:

1. **Como estudar:** sequência sugerida, tempo estimado (cerca de 1h30), requisitos e onde tirar dúvidas.
2. **Público e objetivos:** público-alvo, conhecimentos prévios e os 4 objetivos de aprendizagem.
3. **Videoaula:** vídeo do YouTube incorporado e a lista das partes do vídeo.
4. **Avaliação interativa:** 10 questões com feedback imediato e explicativo, indicação da parte do vídeo para rever e resultado por objetivo.
5. **Materiais de apoio:** as três regras, o modelo de prompt, os oito padrões, como pedir ajuda com um erro, recursos do Claude Code, os prompts do vídeo, o `CLAUDE.md` de tutor e o desafio.
6. **Referências.**

### Objetivos de aprendizagem

| | Ao final, o participante será capaz de… | Questões |
| --- | --- | --- |
| O1 | Escrever prompts que pedem explicação, e não resposta pronta | 1, 2, 3 |
| O2 | Conduzir a conversa com o assistente por etapas | 4, 5 |
| O3 | Usar o assistente para entender e explicar o código | 6, 7 |
| O4 | Conferir o que a IA entrega, com testes e casos de limite | 8, 9, 10 |

## Rodar no computador

Requer [Node.js](https://nodejs.org) 20 ou mais recente.

```bash
npm install        # instala as dependências (só na primeira vez)
npm run dev        # abre em http://localhost:5173
```

Outros comandos:

```bash
npm run build      # gera a versão de produção em dist/
npm run preview    # testa a versão de produção localmente
npm run lint       # verifica o código
```

## Publicar na Vercel (GitHub + Vercel)

**1. Enviar para o GitHub.** Crie um repositório vazio em [github.com/new](https://github.com/new) e rode, dentro desta pasta:

```bash
git init
git add .
git commit -m "Site do minicurso"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/minicurso-ia-java.git
git push -u origin main
```

**2. Importar na Vercel.** Em [vercel.com](https://vercel.com), entre com o GitHub, clique em **Add New → Project** e escolha o repositório. A Vercel detecta o Vite sozinha (build `npm run build`, saída `dist`). Clique em **Deploy**.

**3. Atualizar.** Cada `git push` na branch `main` publica uma nova versão automaticamente, no mesmo link:

```bash
git add .
git commit -m "Descreva a mudança"
git push
```

Não é preciso `vercel.json`: o site usa só âncoras (`#videoaula`, `#avaliacao`…), sem rotas.

## Onde editar o conteúdo

Todo o conteúdo fica em `src/data/`. Não é preciso mexer nos componentes.

| O quê | Arquivo | Campo |
| --- | --- | --- |
| ID do vídeo do YouTube | `src/data/curso.ts` | `VIDEO_ID` (atual: `Lz87pGk1OE4`) |
| Partes do vídeo | `src/data/curso.ts` | `capitulos` |
| Parte do vídeo de cada questão | `src/data/questoes.ts` | `trecho` |
| Materiais e referências | `src/data/materiais.ts` | — |

No YouTube, deixe o vídeo **público ou não listado**, com **"Permitir incorporação"** ativado e as legendas revisadas enviadas como CC.

## Checklist antes da entrega (05/10/2026)

- [x] `VIDEO_ID` preenchido
- [ ] Site aberto pelo link da Vercel no computador, no celular e em aba anônima
- [ ] Vídeo toca no site, com legendas
- [ ] Avaliação respondida do início ao fim
- [ ] Todos os links das referências abrem
- [ ] Link da Vercel enviado na planilha da disciplina

## Estrutura do projeto

```
minicurso-ia-java/
├── index.html             página base (título, fontes, descrição)
├── public/favicon.svg     ícone da aba
└── src/
    ├── App.tsx            monta a página e controla o "pular para o minuto" do vídeo
    ├── main.tsx           ponto de entrada do React
    ├── styles.css         visual "Caderno": cores, tipografia e layout responsivo
    ├── components/        Header, Hero, ComoEstudar, Sobre, Videoaula, Quiz,
    │                      Materiais, Referencias, Footer, Secao, CodeBlock
    └── data/              curso.ts, questoes.ts, materiais.ts, transcricao.ts
```

## Acessibilidade

- Link "Pular para o conteúdo", navegação completa por teclado e foco visível.
- Contraste adequado: verificado com axe-core, sem violações WCAG 2 AA.
- Feedback do quiz anunciado para leitores de tela; a questão de ordenar usa botões, sem arrastar.
- Layout responsivo para celular e respeito à opção "reduzir movimento" do sistema.
- Vídeo com legendas (botão CC do YouTube).
