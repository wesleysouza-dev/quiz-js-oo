# Quiz de Cibersegurança em Javascript Orientado a objetos

Quiz em Javascript utilizando um pouco de orientação de objetos. Projeto faz parte do PDI (Plano de Desenvolvimento Individual) na Redbelt Security.

### Demo

Caso queira ver uma demonstração online, acesse esse link: [wesleysouza.dev/projetos/redbelt/quiz-js-oo](https://wesleysouza.dev/projetos/redbelt/quiz-js-oo){:target="\_blank"}

### Pré requisitos

**Node js**

Rodar os comandos:

`npm install`

`npm start`

Por padrão ele rodará na porta 3000. Caso queira trocar, alterar arquivo package.json, chave script.

Se tudo der certo você terá algo como: http://127.0.0.1:3000/

### Funcionamento do Quiz

O quiz possui um conjunto de 5 perguntas de múltipla escolha com 4 opções cada. O usuário deve selecionar uma das opções e clicar no botão "Prosseguir" para avançar para a próxima pergunta. Ao final das perguntas, o usuário é apresentado com o resultado do quiz, incluindo o número de acertos e erros.

### Como usar o Quiz

Para utilizar o quiz, basta acessar a página index.html no seu navegador.

### Como o Quiz foi implementado

O projeto foi desenvolvido utilizando HTML, CSS e JavaScript. A parte do quiz em si foi implementada utilizando o paradigma de Orientação a Objetos do JavaScript.

### Classes

As classes utilizadas no projeto são:

- **Players:** classe responsável por controlar as informações de cada jogador, como nome e email. Inclui um método que reseta o Quiz;

- **Awnsers:** classe responsável por controlar as respostas feitas por cada jogador. Através dessa classe também temos acesso a pergunta atual, total de perguntas entre outras funcionalidades. É salvo as respostas em LocalStorage, porém apenas para fins de estudo. Na prática, até então, não é consumido nada do LocalStorage;

- **Statistics:** classe responsável por gerenciar o resultado do quiz de cada jogador. Com ela é possível recuperar as respostas de cada jogador, podendo comparar com as respostas corretas. Uma melhoria é fazer essa comparação dentro da classe e não fora. Outras funcionalidades que a classe permite é recuperar as perguntas, quantidade de jogadores, ranking do melhor jogador (último melhor), entre outras. São salvos alguns dados no LocalStorage mas apenas para fins de estudo, não é utilizado de fato pela aplicação.

### Arquivos principais projeto

- **index.html:** arquivo principal do projeto, responsável por exibir o quiz no navegador.

- **js/Class:** diretório que contém as classes em Javascript

- **js/functions.js:** arquivo com toda a lógica do funcionamento do quiz, controle das ações feitas pelos jogadores (botão avançar, resetar, etc). É onde são instanciadas as classes para o funcionamento desejado do Quiz. Nele também estão declaradas funções de apoio, que em um futuro próximo serão isoladas em outro arquivo.
