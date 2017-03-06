# Parte 5: SPA

### Single Page Applications

### 5.1 - Introdução
Uma Single Page Application (aplicação de página unica) consiste em uma aplicação com navegação baseada em AJAX.
O usuário acessa a página principal, geralmente o index, e a partir dai navega para as outras views fazendo requisições, sem a necessidade de regarregar a página base.

Onde entra angular nisso? Simples, uma das grandes vantagens do angular é facilitar a construção desse tipo de aplicação.

*Router*: angular possui dois `modulos` bem conhecidos para gerenciamento de rotas (routers), sendo eles [ngRoute](https://docs.angularjs.org/api/ngRoute) e [uiRouter](https://github.com/angular-ui/ui-router). No nosso exemplo usaremo o `ui-router`.

Para iniciar nosso exemplo, utilizaremos o `npm`juntamente com o `bower`. 

O que é `npm`?  Node Package Manager, é gerenciador de dependências do node.
Instalaremos então primeiramente o `bower`, que é basicamente um modulo no `npm`. 
`bower`? Um modulo node para gerenciamento de dependências (wtf? sim), utilizado em projetos front-end.

Porque a gente vai usar esse bruxaria toda? Simples: Simplifica, você não precisa ficar indo atraz de `CDN` ou baixar os arquivos.   

### 5.2 - NPM & Bower
Para verificar se você contem o `npm`, use:
> $ npm -v

Instalando o `bower` globalmente:
> $ npm install bower -g

Com o `bower` instalado, use o comando `bower init` para criar um `bower` file.
> $ bower init

Pronto, agora você possui um arquivo com nome `bower.json`, esse arquivo o bower utilizara para controlar suas dependências.

Usando angular via bower:
    > $ bower install angular --save

Pronto, agora o bower irá instalar o angular, e salvar como uma dependência no nosso arquivo bower.json
Instale também o ui-router, o modulo que nós ajudará na construção do nosso SPA e o bootstrap.

    > $ bower install angular-ui-router --save
    > $ bower install bootstrap --save

Feito isso temos três dependências no bower, que usaremos para construir nossa aplicação.

```json
 "dependencies": {
    "angular": "1.5.6",
    "angular-ui-router": "^0.4.2",
    "bootstrap": "^3.3.7"
  }
  ```

### 5.3 - Criando modulo principal
Muito bem, vamos de fato iniciar nosso SPA criando nosso `index.html` conforme vimos nos exemplos anteriores, com uma pequena diferença agora, importaremos as dependência que instalamos com o bower. Dessa vez não será necessário declarar o `controller` no index.

```html
<html lang="pt-br" data-ng-app="app"> <!-- declaração do modulo -->
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Parte 05 - SPA</title>
    <link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.min.css">
  </head>
  <body>
  </body>
  <script src="bower_components/angular/angular.min.js"></script>
  <script src="bower_components/angular-ui-router/release/angular-ui-router.min.js"></script>
</html>
```
 Após isso, inicie uma para com nome `src`na raiz do seu projeto, e dentro dela crie um arquivo com o nome `app.js`, nesse arquivo iremos declarar nosso modulo principal, o modulo com nome `app`.
 Aproveite e já declare no seu modulo `app` que o modulo `ui.router` será uma dependência.

 ```js
 (function() {
  'use strict'

   angular
    .module('app', [
      'ui.router'
    ])
})()
```

Nesse momento nosso modulo app está dependente do modulo `ui.router`. 
Importe o arquivo `app.js` no index. 

```html
<script src="src/app.js"></script>
```

### 5.5 - Criando modulo components e importando nossa diretiva do exemplo04
Separaremos nosso SPA por modulos, então dentro da pasta ``src` cria outra com o nome `modules`. Esta pasta irá conter os modulos da nossa aplicação.
Nesse exemplo de SPA iremos utilizar o exemplo de diretiva que criamos no exemplo 04, então dentro da pasta `modules` cria uma pasta com o nome de `components`, esta pasta irá conter os componentes reutilizaveis da nossa aplicação, como por exemplo nossa diretiva de input (exemplo 04).
Criar então dentro da pasta `components` o arquivo `components.module.js`, nesse arquivo iremos declarar o modulo com nome `components`.

```js
(function() {
  'use strict'

   angular
    .module('components', [])
})()
```

Não se esqueça de importar no index.

```html
  <script src="src/modules/components/components.module.js"></script>
```

 **Após importar o arquivo no index, informe ao modulo principal `app` (app.js) que ele agora também depende do modulo `components`.**

```js
 (function() {
  'use strict'

   angular
    .module('app', [
      'ui.router',
      'components'
    ])
})()
```

Logo após isso, crie uma pasta com nome `input-directive` e marotamente jogue os arquivos do `exemplo04` lá `¯\_(ツ)_/¯`. Feito isso faremos algumas alterações no nosso arquivo `.js` da diretiva.

1. Mudar o modulo que a diretiva se registra.
2. Mudar o caminho do template

O arquivo fica assim.
```js
(function() {
  'use strict'

   angular
    .module('components')
    .directive('inputText', inputText)

    function inputText(){
      var directive = {
        restrict: 'E',
        scope: {
          name: '@',
          model: '=',
          isRequired: '=',
          label: '@'
        },
        templateUrl: './src/modules/components/input-directive/input-directive.template.html',
        link: link
      }
      return directive

      function link(scope, element, attrs){

      }
    }
})()
```

E em seguida, também importe esse arquivo no index.
```html
  <script src="src/modules/components/input-directive/input.directive.js"></script>
```

### 5.6 - Verificando arquivos importados até agora
Até agora, os imports de javascript que temos no index são:

```html
  <script src="bower_components/angular/angular.min.js"></script>
  <script src="bower_components/angular-ui-router/release/angular-ui-router.min.js"></script>
  
  <script src="src/modules/components/components.module.js"></script>
  <script src="src/modules/components/input-directive/input.directive.js"></script>
```

Não se esqueça de verificar se fez tudo certo abrindo o projeto no navegador e observando erros no console.


### 5.7 - Iniciando modulo pessoa
Vamos criar agora nosso segundo modulo, esse modulo se chamara `pessoa`. Crie então dentro da pasta `modules` uma pasta com nome `pessoa`, e em seguida o arquivo do modulo `pessoa.module.js`, como fizemos antes.

```js
(function() {
  'use strict'

   angular
    .module('pessoa', [])
    
})()
```
Não se esqueça de importar o arquivo no index também.

```html
  <script src="src/modules/pessoa/pessoa.module.js"></script>
```

**Após importar o arquivo no index, informe ao modulo principal `app` (app.js) que ele agora também depende do modulo `pessoa`.**

```js
 (function() {
  'use strict'

   angular
    .module('app', [
      'ui.router',
      'components',
      'pessoa'
    ])
})()

```

### 5.7.1 - Configurando rotas
Criaremos agora dentro da nossa pasta (modulo) `pessoa` o arquivo `pessoa.routes.js`. Esse arquivo irá conter as configurações necessárias para nosso router funcionar, nele declaremos nossas rotas.

Esse arquivo é bem simples, primeiramente declaramos que ele faz parte do modulo de `pessoa`.
 Após isso criaremos uma configuração para esse modulo com a sintaxe que vemos no exemplo a baixo. Aproveite e injete na sua função de configuração o `provider` `$stateProvider`, esse provider faz parte do módulo `ui.router` que importarmos anteriormente.
```js
(function() {
  'use strict'

  angular
    .module('pessoa')
    .config(config)

  config.$inject = ['$stateProvider']
  function config($stateProvider) {
  }
})()
```

Vamos iniciar então a configuração dos `states` / `urls` da nossa aplicação. Juntando o nosso controller e provider

```js
(function() {
  'use strict'

  angular
    .module('pessoa')
    .config(config)

  config.$inject = ['$stateProvider']
  function config($stateProvider) {
    $stateProvider
      .state('pessoa-create', {
        url: '/pessoa/create',
        controller: 'PessoaCreateController',
        templateUrl: './src/modules/pessoa/pessoa-create.html'
      })
  }
})()
```
**Não se esqueça de importar o arquivo no index**

### 5.7.2 - Criando primeira view e controller 
Feito isso, criaremos nosso primeiro `controller` dentro do modulo de `pessoa`, o controller responsável por criar pessoas na aplicação `pessoa-create.controller.js`. E também importe no index.
```js
(function() {
  'use strict'

  angular
    .module('pessoa')
    .controller('PessoaCreateController', PessoaCreateController)

  PessoaCreateController.$inject = ['$scope']
  function PessoaCreateController($scope) {
  }

})()
```

Após isso iremos iniciar nosso arquivo de view, com dois campos, nome e sobrenome. `pessoa-create.html`

```html
<div class="container">
  <form name="pessoaForm" data-ng-submit="save(pessoa)" novalidate>
    <input-text label="Nome" name="nome" model="pessoa.name" is-required="true"></input-text>
    <input-text label="Sobrenome" name="sobrenome" model="pessoa.secondName" is-required="true"></input-text>
    <button type="submit" class="btn btn-success" data-ng-disabled="pessoaForm.$invalid">Salvar</button>
  </form>
</div>
``` 

Já vimos essa bruxaria dos forms no exemplo02.

Execute a aplicação em algum servidor de sua preferencia, e acesse a url http://localhost:suaporta/#/pessoa/list. Eu estou utilizando o [lite-server](https://github.com/johnpapa/lite-server)
Declaramos no nosso `pessoa-create.html` que ao submit executaremos a função `save`, vamos então criar essa função no controller.

```js
(function() {
  'use strict'

  angular
    .module('pessoa')
    .controller('PessoaCreateController', PessoaCreateController)

  PessoaCreateController.$inject = ['$scope']
  function PessoaCreateController($scope) {
    
    $scope.save = save

    function save(pessoa){
      console.log('pessoa', pessoa)
    }
    
  }
})()
```

### 5.7.3 - Criando service do modulo de pessoa

Conforme vimos no exemplo03, agora iremos criar um service, crie então um arquivo com nome `pessoa.service.js`dentro do modulo de pessoa, com algumas funções que iremos utilizar no nosso crud. Injetaremos no service outro service com o nome `$http`.
Esse service faz parte do angular, nos ajuda com `requisições HTTP`.

```js
(function() {
  'use strict'

  angular
    .module('pessoa')
    .factory('PessoaService', PessoaService)

  PessoaService.$inject = ['$http']

  function PessoaService($http) {

    var HOST = 'https://escola-de-ti.herokuapp.com/person'

    var factory = {
      save: save,
      edit: edit,
      findOne: findOne,
      getAll: getAll,
      remove: remove
    }
    return factory


    function save(pessoa) {
    }

    function edit(pessoa) {
    }

    function findOne(id) {
    }

    function getAll() {
    }

    function remove(pessoa){
    }

  }
})()
```
**Não se esqueça de importar o arquivo no index**





















