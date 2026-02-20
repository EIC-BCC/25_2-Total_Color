# Total Color

**Título do TCC:** Total Color: uma aplicação web para coloração total em grafos <!-- substitua pelo título do TCC -->

**Aluno:** Renan Carvalho Pinheiro da Silva <!-- substitua pelos nomes dos alunos -->

**Semestre de Defesa:** 2025.2 <!-- ano-semestre, exemplo: 2025-2 -->

[PDF do TCC](/public/documentation/tcc.pdf)


# TL;DR

<!-- Resumo super conciso para quem não quer ler o README e começar a executar o código -->
O *Total Color* é uma aplicação *web* para a visualização da coloração total em classes de grafos específicas.

A aplicação possui dois objetivos principais: 

1. Permitir a visualização da coloração total em determinadas classes de grafos; e 
2. Promover a aprendizagem ativa por meio da interação e experimentação do usuário.

Classes implementadas: caminhos, ciclos e completos

[Link para utilização da aplicação](https://total-color.vercel.app/)

Caso queira rodar localmente, clone o repositório e execute os seguintes comandos na pasta raíz do projeto:

- ```npm i```
- ```npm run dev```


# Descrição Geral
<!-- Resumo do TCC -->
A visualização de grafos desempenha um papel importante no ensino e na compreensão de conceitos da Teoria dos Grafos, especialmente em problemas de coloração, que apresentam elevada complexidade teórica e computacional. Entre esses problemas, destaca-se a coloração total de grafos, que consiste na atribuição de cores a vértices e arestas de modo que elementos adjacentes ou incidentes recebam cores distintas. Apesar de sua relevância teórica e de sua relação com a Conjectura da Coloração Total, observa-se a escassez de ferramentas educacionais interativas voltadas especificamente para esse tema.

Neste contexto, este trabalho apresenta o Total Color, uma aplicação web desenvolvida com finalidade acadêmica, cujo objetivo é permitir a visualização da coloração total em classes específicas de grafos, bem como promover a aprendizagem ativa por meio da interação e experimentação do usuário. A aplicação contempla as classes dos grafos caminho, ciclo e completos, incorporando resultados teóricos conhecidos sobre seus respectivos números cromáticos totais. Além disso, o sistema oferece funcionalidades para geração automática de grafos dessas classes e um modo livre para construção e manipulação manual de grafos.

Como contribuição, o Total Color integra conceitos teóricos da coloração total a uma interface visual interativa, auxiliando no processo de ensino-aprendizagem e servindo como ferramenta de apoio para estudantes e pesquisadores da área de Teoria dos Grafos.

**Palavras-chave:** Teoria dos Grafos; Coloração Total; Visualização de Grafos; Aplicações Web; Aprendizagem Interativa.


# Funcionalidades
<!-- Descreva as principais funcionalidades do seu código. Exemplo: -->

O Total Color é dividido em dois modos principais de utilização: classes e livre.

* Modo Classes
   * Escolha de grafos pertencentes às classes de grafos abordadas no trabalho (caminhos, ciclos e completos) e geração automática do grafo a partir de parâmetros definidos pelo usuário, como ordem do grafo e layout, com valores padrão previamente configurados.
   * Visualização gráfica do grafo gerado e interação direta com seus vértices e arestas.
   * Visualização da coloração total de forma progressiva pelo algoritmo de coloração da classe selecionada.
   * Realização da coloração total de forma manual.
   * Verificação automática da validade da coloração total atribuída.
   * Exibição dinâmica de informações teóricas da classe selecionada, como número cromático total e referências bibliográficas.
   * Atualização em tempo real dos rótulos e da contagem de cores conforme a coloração é modificada.
   * Exportação do grafo gerado no formato `.g6`.

* Modo Livre
   * Criação de grafos arbitrários do zero, com inserção manual de vértices e arestas.
   * Importação de grafos a partir de arquivos `.txt` contendo matrizes de adjacência ou matrizes acompanhadas de coloração.
   * Importação de grafos no formato `.g6` (graph6).
   * Visualização e manipulação interativa do grafo carregado ou criado.
   * Atribuição manual de cores aos vértices e arestas.
   * Validação contínua da coloração total durante as interações.
   * Uso de atalhos de teclado para interação rápida.


# Arquitetura
<!-- Descreva nessa seção a arquitetura do seu código. Sugestão: use mermaid para inclusão de diagramas que ajudem a entender seu código (https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/creating-… -->

O *Total Color* é estruturado em quatro partes principais: *app*, *components*, *contexts* e *lib*. O diretório *app* é responsável pela inicialização da aplicação. Em *components* encontra-se a estrutura dos principais módulos da interface, organizada em três subcomponentes: *appbar*, *graph-generator* e *graph-viewer*.

O componente *appbar* concentra a lógica do *menu*, bem como os algoritmos responsáveis pela exportação do grafo, tanto no formato *.txt* com uma coloração quanto no formato *.g6*. O componente *graph-generator* implementa a lógica da interface para a obtenção das informações necessárias à geração de grafos pertencentes a uma classe específica ou de grafos genéricos. Por fim, o componente *graph-viewer* reúne toda a lógica de visualização e interação do usuário com o grafo, incluindo a atribuição de cores, a validação da coloração total, a criação de vértices e arestas e a apresentação passo a passo da coloração total para classes de grafos.

No diretório *contexts* concentram-se as informações relacionadas ao grafo e à sua visualização, as quais são disponibilizadas para todos os componentes da interface. Dessa forma, os componentes podem acessar e utilizar dados como a matriz de adjacência, a coloração total quando disponível, informações de *layout*, a opção de *menu* selecionada pelo usuário, entre outros estados compartilhados da aplicação.

No diretório *lib* encontra-se o núcleo da aplicação, onde estão implementadas as classes que representam os grafos utilizados em todo o sistema, incluindo sua matriz de adjacência e, quando disponível, a coloração total. Além disso, esse diretório reúne os algoritmos responsáveis pela geração das matrizes de adjacência das classes de grafos consideradas (caminhos, ciclos e grafos completos), bem como os algoritmos associados à coloração dessas estruturas.

A figura a seguir apresenta o diagrama de classes do núcleo da aplicação. A interface *Graph* serve como base tanto para a classe abstrata *GraphClass*, responsável pelo comportamento de uma classe de grafos, quanto para a classe *FreeGraph*, responsável pelo comportamento de grafos genéricos. Essa interface define os atributos *matrix*, que representa a matriz de adjacência do grafo, e *totalColoring*, que corresponde a um mapeamento no qual as chaves são os elementos do grafo e os valores indicam as cores atribuídas a cada elemento.

![Diagrama de classes do núcleo da aplicação](/public/documentation/diagrama-classe.png)


# Dependências
<!-- Apresente a lista de dependências do seu código. Quando necessário, incluia links. Exemplo: -->
* [Node JS](https://nodejs.org/)


# Execução
<!-- Descreva como instalar/executar seu código. Exemplo: -->
[Link para utilização da aplicação](https://total-color.vercel.app/)

Caso queira rodar localmente, clone o repositório e execute os seguintes comandos na pasta raíz do projeto:

- ```npm i```
- ```npm run dev```