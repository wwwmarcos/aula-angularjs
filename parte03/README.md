# Parte 3: Services

# Menu
 -  https://github.com/marcosflorencio/escola-de-ti-angular/README.md
 -  [01 - Hello Word](https://github.com/marcosflorencio/escola-de-ti-angular/tree/master/parte01/README.md)
 -  [02 - Forms](https://github.com/marcosflorencio/escola-de-ti-angular/tree/master/parte02/README.md)
 -  03 - Services
 -  [04 - Diretivas](https://github.com/marcosflorencio/escola-de-ti-angular/tree/master/parte04/README.md)
 -  [05 - SPA](https://github.com/marcosflorencio/escola-de-ti-angular/blob/master/parte05/README.md)

O angular possui services , objetos singletons que ajudam a compartilhar e organizar códigos na aplicação. 
Usados geralmente para comunicação/requisições com o servidor (parte back-end), sendo eles:

 - Services
 - Factories
 - Providers

Exemplo de factory (um dos tipos de service do angular):

*pessoa.service.js*
```js
angular
.module('moduleName', [])
.factory('PessoaService', PessoaService);

function PessoaService() {
  var factory = {
   getPessoas : getPessoas
  };
  return factory;

  function getPessoas(){
    return [{nome:'Maria', idade:30}, {nome:'Jose', idade:29}]
  };

};
```

Tendo nosso service de Pessoa podemos injetar ele em qualquer controller ou até mesmo outros services da aplicação, reaproveitando então as funções dentro dele.

*index.controller.js*
```js
(function() {
  'use strict'

  angular
    .module('app', [])
    .controller('IndexController', IndexController)

  IndexController.$inject = ['$scope', 'PessoaService']
  function IndexController($scope, PessoaService) {
    init();

    function init(){
      $scope.pessoas = PessoaService.getPessoas()
    }

  }
})()
```
Para visualizar os dados, criaremos um index.html como havimos criado antes.

*index.html*
```html
<html lang="pt-br" data-ng-app="app"> 
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Parte 3 - Services</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
  </head>
  <body data-ng-controller="IndexController"> 
    
    <table class="table table-hover">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Idade</th>
        </tr>
      </thead>
      <tbody>
        <tr ng-repeat="pessoa in pessoas">
          <td>{{pessoa.nome}}</td>
          <td>{{pessoa.idade}}</td>
        </tr>
      </tbody>
    </table>

  </body>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>
  <script src="index.controller.js"></script>
  <script src="pessoa.service.js"></script>
</html>
```

Nesse exemplo vemos a utilização da diretiva de atributo do angular chamada `ng-repeat`, diretiva essa basicamente repete o elemento em que ela se encontra, utilziando como base um array.
No exemplo é possível observar que a diretiva repete o elemento `tr` da tabela.

Sintaxe:
`ng-repeat="pessoa in pessoas"` sendo pessoas o array que contem os valores.

# live-demo
Live-demo disponível em:
[https://marcosflorencio.js.org/escola-de-ti-angular/parte03/index.html](https://marcosflorencio.js.org/escola-de-ti-angular/parte03/index.html)