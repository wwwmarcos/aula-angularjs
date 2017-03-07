# Parte 5: Single Page Applications

# Menu
 -  [Inicio](../)
 -  [01 - Hello Word](../parte01/)
 -  [02 - Forms](../parte02/)
 -  [03 - Services](../parte03/)
 -  [04 - Diretivas](../parte04/)
 -  05 - SPA

### 5.1 - Introdução
Uma Single Page Application (aplicação de página unica) consiste em uma aplicação com navegação baseada em AJAX.
O usuário acessa a página principal, geralmente o index, e a partir dai navega para as outras views fazendo requisições, sem a necessidade de regarregar a página base.

Onde entra angular nisso? Simples, uma das grandes vantagens do angular é facilitar a construção desse tipo de aplicação.

*Router*: angular possui dois `modulos` bem conhecidos para gerenciamento de rotas (routers), sendo eles [ngRoute](https://docs.angularjs.org/api/ngRoute) e [uiRouter](https://github.com/angular-ui/ui-router). No nosso exemplo usaremo o `ui-router`.


### 5.2 - NPM & Bower
Para iniciar nosso exemplo, utilizaremos o `npm`juntamente com o `bower`. 

O que é `npm`?  Node Package Manager, é gerenciador de dependências do node.
Instalaremos então primeiramente o `bower`, que é basicamente um modulo no `npm`. 
`bower`? Um modulo node para gerenciamento de dependências (wtf? sim), utilizado em projetos front-end.

Porque a gente vai usar esse bruxaria toda? Simples: Simplifica, você não precisa ficar indo atraz de `CDN` ou baixar os arquivos.   

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
{
 "dependencies": {
    "angular": "1.5.6",
    "angular-ui-router": "^0.4.2",
    "bootstrap": "^3.3.7"
  }
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

### 5.7.4 - Fazendo uma requisição http para criar uma nova pessoa na api

Na função `save` do nosso service iremos utilizar o service `$http` do angular para realizar uma comunição `http` com a API que está funcionando em `https://escola-de-ti.herokuapp.com/person`.

```js
function save(pessoa) {
  return $http({
    method: 'POST',
    url: HOST + '/create',
    data: pessoa
  })
}
```
Iremos esperar como parametro a pessoa que será salva, então chamaremos o service `$http` passando um objeto com sua configuração.

```js
{
  method: 'POST',
  url: HOST + '/create',
  data: pessoa
}
```

- method: tipo do metodo `http` que será utilizado
- url: url a ser utilizada (url da api)
- data: objeto que enviaremos com a requisição

Esse metodo `$http({}` irá retonar uma `promisse`

*"Promise é um objeto usado para processamento assíncrono. Um Promise (de "promessa") representa um valor que pode estar disponível agora, no futuro ou nunca."*

Veremos com mais clareza no proximo passo. Iremos injetar o service `PessoaService` no nosso controller de cadastro, e então chamaremos o metodo `save` do `PessoaService` em nosso controller.

```js
(function() {
  'use strict'

  angular
    .module('pessoa')
    .controller('PessoaCreateController', PessoaCreateController)

  PessoaCreateController.$inject = ['$scope', 'PessoaService']
  function PessoaCreateController($scope, PessoaService) {
    
    $scope.save = save

    function save(pessoa) {
      PessoaService
        .save(pessoa)
        .then(function(response) {
          alert('Nova pessoa cadastrada')
          console.log('ual', response)
        })
        .catch(function(error) {
          alert('Erro')
          console.log('errrrou', error)
        })
    }
    
  }
})()
```

Quando invocamos o metodo `PessoaService.save(pessoa)` ele nos devolve uma `promisse`. Podemos então atribuit um `callback` para quando a `promisse` for resolvida:
```js
.then(function(response){

})
```

Esse `callback` recebe como parametro a resolução da promisse. Temos podemos atribuir outro `callback` para quando a `promisse` falhar, `catch` que é similar ao anterior porem recebe como parametro o erro ocorrido.
```js
.then(function(response){
  alert('Nova pessoa cadastrada')
  console.log('ual', response)
})
.catch(function(error) {
  alert('Erro')
  console.log('errrrou', error)
})
```

Se tudo correr bem até aqui já podemos cadastrar pessoas na nossa `API`.

### 5.8 - Iniciando uma listagem

Nesse passo iremos criar uma listagem. O primeiro passo será alterar nosso metodo `getAll` no `PessoaService`.

```js
function getAll() {
  return $http({
    method: 'GET',
    url: HOST + '/list',
  })
}
```
Uma requisição do tipo `GET` para recuperar todas nossas pessoas.
Iremos então abrir nosso `pessoa-routes.js` e adicionar mais um `state`.

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
      .state('pessoa-list', {
        url: '/pessoa/list',
        controller: 'PessoaListController',
        templateUrl: './src/modules/pessoa/pessoa-list.html',
        resolve: {
          pessoaListResolve: pessoaListResolve
        }
      })
  }

  pessoaListResolve.inject = ['PessoaService'];
  function pessoaListResolve(PessoaService) {
    return PessoaService.getAll()
  }
```

Wtf, [resolve](https://github.com/angular-ui/ui-router/wiki#resolve)?  Isso mesmo, resolves são executados antes da nossa `view` ser exibida. Iremos usar `resolves` para fornecer dados a um `controller`, caso o voce mande a função do `resolve` retornar uma `promisse`ele irá aguardar ela ser resolvida antes de exibir a view, e então irá nos dar o valor da resposta.

Feito isso iremos criar o arquivo `pessoa-list.controller.js`, nosso controller responsável pela listagem.

```js
(function() {
  'use strict'

  angular
    .module('pessoa')
    .controller('PessoaListController', PessoaListController)

  PessoaListController.inject = ['$scope', 'pessoaListResolve', 'PessoaService']
  function PessoaListController($scope, pessoaListResolve, PessoaService) {
    $scope.pessoas = pessoaListResolve.data

  }
})()

```
**Não se esqueça de importar o arquivo no index**

Você pode reparar que temos o nosso `pessoaListResolve` injetado no controller, isso mesmo, dessa forma iremos utilizar esse resolve.
Podemos então criar o arquivo `pessoa-list.html` para mostrar nossa lista de pessoas em uma tabela.

```html
<div class="container">
  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
    <div class="table-responsive">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Sobrenome</th>
          </tr>
        </thead>
        <tbody>
          <tr data-ng-repeat="pessoa in pessoas">
            <td>{{pessoa.name}}</td>
            <td>{{pessoa.secondName}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
```
 Feito isso, acessando a url `/pessoa/list'` já podemos ver uma lista com as pessoas caadastradas em nossa `API`.

### 5.8.1 - Removendo um dado na listagem

 Iremos aproveitar nossa listagem para adicionar a opção remover na nossa tabela. Um botão com um `ng-click` chamando uma função, passando como argumento a pessoa que será removida.

 ```html
<div class="container">
  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
    <div class="table-responsive">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Sobrenome</th>
          </tr>
        </thead>
        <tbody>
          <tr data-ng-repeat="pessoa in pessoas">
            <td>{{pessoa.name}}</td>
            <td>{{pessoa.secondName}}</td>
            <td>
              <button type="button" class="btn btn-danger" data-ng-click="remove(pessoa)">Remover</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
```
Até ai tudo bem, criaremos no `controller` da listagem essa função.

```js
(function() {
  'use strict'

  angular
    .module('pessoa')
    .controller('PessoaListController', PessoaListController)

  PessoaListController.inject = ['$scope', 'pessoaListResolve',  'PessoaService']
  function PessoaListController($scope, pessoaListResolve, PessoaService) {
    $scope.pessoas = pessoaListResolve.data
    $scope.remove = remove

    function remove(pessoa) {
    }

  }

})()
```
Como você deve ter imaginado, iremos precisar daquele metodo `remove` do nosso `PessoaService`, hora de terminar implementar ele.

```js
function remove(pessoa) {
  return $http({
    method: 'DELETE',
    url: HOST + '/remove/' + pessoa._id,
  })
}
```

Tudo certo, nosso metodo remove ira esperar como parametro uma pessoa, e ira removela com base em seu atributo `_id`.
Feito isso já podemos utilizalo em nosso controller, como fizemos com os outros.

```js
(function() {
  'use strict'

  angular
    .module('pessoa')
    .controller('PessoaListController', PessoaListController)

  PessoaListController.inject = ['$scope', 'pessoaListResolve', 'PessoaService']
  function PessoaListController($scope, pessoaListResolve, PessoaService) {
    $scope.pessoas = pessoaListResolve.data
    $scope.remove = remove

    function remove(pessoa) {
      PessoaService.remove(pessoa)
      .then(function(response){
        console.log(response)
        alert('Pessoa removida')
      })
      .catch(function(error){
        console.log('error {}', error)
      })
    }
  }
})()
```
### 5.8.2 - Enviando o usuario para a tela de editar a partir da tela de listagem

 Ainda não temos uma tela de editar, porem já deixaremos o esquema no jeito.

 Primeiro passo, adicionar um botão de editar na nossa listagem.

 ```html
<div class="container">
  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
    <div class="table-responsive">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Sobrenome</th>
          </tr>
        </thead>
        <tbody>
          <tr data-ng-repeat="pessoa in pessoas">
            <td>{{pessoa.name}}</td>
            <td>{{pessoa.secondName}}</td>
            <td>
              <button type="button" class="btn btn-default" data-ng-click="goToEdit(pessoa)">Editar</button>
              <button type="button" class="btn btn-danger" data-ng-click="remove(pessoa)">Remover</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
```

Segundo passo, criar essa função nomeada `goToEdit`. Detalhe, iremos utilizar o service `$state` do nosso modulo `ui.router`, chamando seu metodo `go`.
A sintaxe é simples:
`$state.go('state-name', parametros)`

```js
(function() {
  'use strict'

  angular
    .module('pessoa')
    .controller('PessoaListController', PessoaListController)

  PessoaListController.inject = ['$scope', 'pessoaListResolve', '$state', 'PessoaService']
  function PessoaListController($scope, pessoaListResolve, $state, PessoaService) {
    $scope.pessoas = pessoaListResolve.data
    $scope.goToEdit = goToEdit
    $scope.remove = remove

    function goToEdit(pessoa){
      $state.go('pessoa-edit', { id: pessoa._id })
    }

    function remove(pessoa) {
      PessoaService.remove(pessoa)
      .then(function(response){
        console.log(response)
        alert('Pessoa removida')
      })
      .catch(function(error){
        console.log('error {}', error)
      })
    }

  }

})()
```
Resumindo, estamos dizendo ao service `$state` que queremos ir para a pagina de edição, enviando como pametro o `id` da nossa pessoa. Isso ficara mais claro no nosso próximo passo :)

### 5.9 - Editando um usuário
Para podemos editar iremos primeiramente precisar do implementar nosso metodo `findOne` do `PessoaService` para podermos recuperar uma pessoa com base em seu `_id`.

```js
function findOne(id) {
  return $http({
    method: 'GET',
    url: HOST + '/get/' + id,
  })
}
```
Um `HTTP GET`

Vamos então novamente ao nosso arquivo `pessoa.routes.js` configurar as rotas da nossa edição, adicionando mais um `state`.

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
      .state('pessoa-list', {
        url: '/pessoa/list',
        controller: 'PessoaListController',
        templateUrl: './src/modules/pessoa/pessoa-list.html',
        resolve: {
          pessoaListResolve: pessoaListResolve
        }
      })
      .state('pessoa-edit', {
        url: '/pessoa/:id/edit',
        controller: 'PessoaEditController',
        templateUrl: './src/modules/pessoa/pessoa-create.html',
        resolve: {
          pessoaFindOneResolve: pessoaFindOneResolve
        }
      })
  }

  pessoaFindOneResolve.$inject = ['PessoaService', '$stateParams']
  function pessoaFindOneResolve(PessoaService, $stateParams) {
    return PessoaService.findOne($stateParams.id)
  }

  pessoaListResolve.inject = ['PessoaService'];
  function pessoaListResolve(PessoaService) {
    return PessoaService.getAll()
  }
})()
```
Temos um resolve um pouco diferente dessa vez.
```js
pessoaFindOneResolve.$inject = ['PessoaService', '$stateParams']
function pessoaFindOneResolve(PessoaService, $stateParams) {
  return PessoaService.findOne($stateParams.id)
}
```

Como mostrado no [passo anterior](#582---enviando-o-usuario-para-a-tela-de-editar-a-partir-da-tela-de-listagem), iremos receber aqui na rota de editar um parametro com nome `id` para podermos recuperar o nosso registro de pessoa.
No nosso resolve usamos o service `$stateParams` para recuperar o valor passado com o `state`.  
Detalhe: Informe na url o seu parametro. Ex:`/pessoa/:id/edit`


Nesse exemplo como nossa view de `cadastro` é basicamente a mesma de `edição` usaremos a mesma. (`templateUrl: './src/modules/pessoa/pessoa-create.html`)

Simples, né? Hora de criar o controller então.
Como no nosso template `pessoa-create.html`, no submit do form iremos chamar a função `save`. Vamos criar essa função também.
Injetaremos o resolve `pessoaFindOneResolve` e jogaremos seu valor no model `pessoa`, assim magicamente os campos se iniciarão preenchidos.

```js
(function() {
  'use strict'

  angular
    .module('pessoa')
    .controller('PessoaEditController', PessoaEditController)

  PessoaEditController.inject = ['$scope', 'pessoaFindOneResolve', 'PessoaService', '$state']
  function PessoaEditController($scope, pessoaFindOneResolve, PessoaService, $state) {
    $scope.pessoa = pessoaFindOneResolve.data
    $scope.save = save

    function save(pessoa) {

    }
  }
})()
```

Hora de implementar a ultima função do nosso `PessoaService`, o `edit`.

```js
function edit(pessoa) {
  return $http({
    method: 'PUT',
    url: HOST + '/edit',
    data: pessoa
  })
}
```

Um HTTP PUT enviando nossa pessoa editada para a API. Feito isso é só dar aquele capricho no nosso controller. Faça como quiser, eu farei assim:

```js
(function() {
  'use strict'

  angular
    .module('pessoa')
    .controller('PessoaEditController', PessoaEditController)

  PessoaEditController.inject = ['$scope', 'pessoaFindOneResolve', 'PessoaService', '$state']
  function PessoaEditController($scope, pessoaFindOneResolve, PessoaService, $state) {
    $scope.pessoa = pessoaFindOneResolve.data
    $scope.save = save

    function save(pessoa) {
      PessoaService.edit(pessoa)
      .then(function(response){
        alert('Pessoad edita')
        $state.go('pessoa-list')
      })
      .catch(function(error){
        console.log('error {}', error)
      })
    }

  }

})()
```

#Bonus - Menu

Vamos criar um simples menu no nosso `index.html` para facilitar a navegação.

```html
<nav class="navbar navbar-default" role="navigation">
  <div class="collapse navbar-collapse navbar-ex1-collapse">
    <ul class="nav navbar-nav">
      <li><a ui-sref="pessoa-create">Criar</a></li>
      <li><a ui-sref="pessoa-list">Listar</a></li>
    </ul>
  </div>
</nav>
```
Em vez de links usaremos a diretiva `ui-sref` que vem no modulo `ui.router` :)
Sintaxe: `ui-sref="state-name"`

`index.html` final:

```html
<html lang="pt-br" data-ng-app="app">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Parte 05 - SPA</title>
    <link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.min.css">
  </head>
  <body>
    
    <nav class="navbar navbar-default" role="navigation">
      <div class="collapse navbar-collapse navbar-ex1-collapse">
        <ul class="nav navbar-nav">
          <li><a ui-sref="pessoa-create">Criar</a></li>
          <li><a ui-sref="pessoa-list">Listar</a></li>
        </ul>
      </div>
    </nav>

    <ui-view></ui-view>
  </body>
  <script src="bower_components/angular/angular.min.js"></script>
  <script src="bower_components/angular-ui-router/release/angular-ui-router.min.js"></script>
  
  <script src="src/modules/components/components.module.js"></script>
  <script src="src/modules/components/input-directive/input.directive.js"></script>
  <script src="src/modules/pessoa/pessoa.module.js"></script>
  <script src="src/modules/pessoa/pessoa-create.controller.js"></script>
  <script src="src/modules/pessoa/pessoa-list.controller.js"></script>
  <script src="src/modules/pessoa/pessoa-edit.controller.js"></script>
  <script src="src/modules/pessoa/pessoa.service.js"></script>
  <script src="src/modules/pessoa/pessoa.routes.js"></script>
  <script src="src/app.js"></script>
</html>
```

# live-demo
Live-demo disponível em:
[https://marcosflorencio.js.org/escola-de-ti-angular/parte05/index.html](https://marcosflorencio.js.org/escola-de-ti-angular/parte05/index.html)




