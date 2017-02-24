# Parte 2: Forms

Para treinarmos um pouco mais oque foi visto até agora, faremos a validação de um ```<form>``` com angular, e usando o [boostrap](http://getbootstrap.com/) para a estilização dos exemplos.  
Para iniciamos uma estrutura básica como usamos até agora, a única diferença é o import do boostrap.

```html
<html lang="pt-br" data-ng-app="app"> 
<!-- exemplo02.html 02 -->
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>ui-router-example</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
  </head>
  <body data-ng-controller="IndexController"> 

  </body>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.5/angular.min.js"></script>
  <script>
    angular
    .module('app', [])
    .controller('IndexController', IndexController);
    
    IndexController.$inject = ['$scope']; 
    function IndexController($scope){

    };
  </script>
</html>
```
Em seguida dentro da tag `body` iniciaremos um `form` (simulando um cadastro de usúario), nesse momento é importante nos atentarmos ao nome declarado no form porque será importante nas próximas validações. 

```
<form name="formUsuario" data-ng-submit="salvarUsuario()" novalidate>
</form>
```
O atributo ```novalidate``` define que as validações padrões do HTML5 serão ignoradas.  
A diretiva de atributo ```ng-submit``` [(documentação oficial)](https://docs.angularjs.org/api/ng/directive/ngSubmit) espera uma função, essa função é executada quando acontece um ```submit``` dentro do form.   
Nesse momento podemos criar essa função no controller também.
```
IndexController.$inject = ['$scope']; 
function IndexController($scope){
  $scope.salvarUsuario = salvarUsuario;

  function salvarUsuario(){
  };
};
```  
Voltando ao `form`  
Agora criaremos um input comum usando o atributo `required` para indicarmos que aquele campo é requerido nesse formulário.  
Abaixo do input, abriremos uma tag `p` com a diretiva `ng-if` [(documentação oficial)](https://docs.angularjs.org/api/ng/directive/ngIf), essa diretiva espera um valor **boolean** e recria/remove o elemento com base no valor recebido. Dentro dessa tag colocaremos as mensagens de validação. Nesse momento usaremos as propriedades de **form** que o angular nos fornece para construirmos nossa expressão. 

```
<label>Nome</label>
<input type="text" name="nome" class="form-control" data-ng-model="usuario.nome" required>
 <p data-ng-if="formUsuario.nome.$invalid && !formUsuario.nome.$pristine" class="help-block">
  Seu nome é obrigatório.
</p>
```
Mais sobre as propriedades:
>**$valid**	diz se um item do formulario é válido considerando *suas validações*.

>**$invalid** diz se um item está inválido considerando suas validações.

>**$pristine** verdadeiro se o form/input ainda não foi usado.

>**$dirty**	verdadeiro se o form/input foi usado.

No estado atual do nosso input exibimos a frase quando o campo "nome" está invalido, ou seja vazio **&&** quando o campo já foi "tocado".  
Para estilizar ainda nosso input usaremos a diretiva ```ng-class``` [(documentação oficial)](https://docs.angularjs.org/api/ng/directive/ngClass) que nos permite adicionar classes dinamicamente em um elemento.   
```
<div class="form-group" data-ng-class="{ 'has-error' : formUsuario.nome.$invalid && !formUsuario.nome.$pristine }">
  <label>Nome</label>
  <input type="text" name="nome" class="form-control" data-ng-model="usuario.nome" required>
  <p data-ng-if="formUsuario.nome.$invalid && !formUsuario.nome.$pristine" class="help-block">
    Seu nome é obrigatório.
  </p>
</div>
```
_Sintaxe da diretiva ng-class -> { 'nome-da-classe' : expressãoBooleana }_

Até que já temos um input, vamos fazer o mesmo processo, porem para um campo 'nome do usuário':
```
<form name="formUsuario" data-ng-submit="salvarUsuario()" novalidate> 
  <div class="form-group" data-ng-class="{ 'has-error' : formUsuario.nome.$invalid && !formUsuario.nome.$pristine }">
    <label>Nome</label>
    <input type="text" name="nome" class="form-control" data-ng-model="usuario.nome" required>
    <p data-ng-if="formUsuario.nome.$invalid && !formUsuario.nome.$pristine" class="help-block">
      Seu nome é obrigatório.
    </p>
  </div>

  <div class="form-group" data-ng-class="{ 'has-error' : formUsuario.usuario.$invalid && !formUsuario.usuario.$pristine }">
    <label>Nome de usuario</label>
    <input type="text" name="usuario" class="form-control" data-ng-model="usuario.nomeUsuario" required>
    <p data-ng-if="formUsuario.usuario.$invalid && !formUsuario.usuario.$pristine" class="help-block">
      Nome de usuario é obrigatório.
    </p>
  </div>
</form>
```
Feito isso precisaremos de um botão do tipo submit, esse botão não deve estar sempre habilitado, então usando a diretiva ```ng-disabled```.[(documentção oficial)](https://docs.angularjs.org/api/ng/directive/ngDisabled) iremos desabilitar o botão, com base na propriedade $valid do formulário, ou seja, o botão só será liberado quando o formulário estiver válido. A diretiva ```ng-disabled``` espera um valor boolean, e desabilita o elemento com base no valor recebido.
```
<input type="submit" class="btn btn-success" data-ng-disabled="formUsuario.$invalid" value="salvar">
```

**Versão final do código:** 
```
<html lang="pt-br" data-ng-app="app"> 
<!-- exemplo02.html 02 -->
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>ui-router-example</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">

  </head>
  <body data-ng-controller="IndexController"> 
    <div class="container">
      <h1>Cadastro de usúario</h1>
      <!-- atributo novalidate faz o formulario ignorar as validações padrões do HTML  -->
      <form name="formUsuario" data-ng-submit="salvarUsuario()" novalidate> 
       
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
          <div class="form-group" data-ng-class="{ 'has-error' : formUsuario.nome.$invalid && !formUsuario.nome.$pristine }">
            <label>Nome</label>
            <input type="text" name="nome" class="form-control" data-ng-model="usuario.nome" required>
            <p data-ng-if="formUsuario.nome.$invalid && !formUsuario.nome.$pristine" class="help-block">
              Seu nome é obrigatório.
            </p>
          </div>
        </div>
       
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
          <div class="form-group" data-ng-class="{ 'has-error' : formUsuario.usuario.$invalid && !formUsuario.usuario.$pristine }">
            <label>Nome de usuario</label>
            <input type="text" name="usuario" class="form-control" data-ng-model="usuario.nomeUsuario" required>
            <p data-ng-if="formUsuario.usuario.$invalid && !formUsuario.usuario.$pristine" class="help-block">
              Nome de usuario é obrigatório.
            </p>
          </div>
        </div>
       
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-right">
          <input type="submit" class="btn btn-success" data-ng-disabled="formUsuario.$invalid" value="salvar">
        </div>
        
      </form>
    </div>
  </body>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.5/angular.min.js"></script>
  <script>
    angular
    .module('app', [])
    .controller('IndexController', IndexController);
    
    IndexController.$inject = ['$scope']; 
    function IndexController($scope){
      $scope.salvarUsuario = salvarUsuario;

      function salvarUsuario(){
        alert('Usuário: ' + $scope.usuario.nome + ' |  ' + $scope.usuario.nomeUsuario + ' salvo!');
      };
    };
  </script>
</html>
```