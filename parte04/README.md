# Parte 4: Directivas

# Menu
 -  https://github.com/marcosflorencio/escola-de-ti-angular/README.md
 -  [01 - Hello Word](https://github.com/marcosflorencio/escola-de-ti-angular/tree/master/parte01/README.md)
 -  [02 - Forms](https://github.com/marcosflorencio/escola-de-ti-angular/tree/master/parte02/README.md)
 -  [03 - Services](https://github.com/marcosflorencio/escola-de-ti-angular/tree/master/parte03/README.md)
 -  04 - Diretivas
 -  [05 - SPA](https://github.com/marcosflorencio/escola-de-ti-angular/blob/master/parte05/README.md)

Como já dito antes directivas são extensões da linguagem html que permitem a implementação de novos comportamentos de forma declarativa, manilupando o DOM.
É possivel utilziar as directivas de forma que se reparoveite código, criando componentes para serem reutilizados no sitema todo.
Iremos agora criar uma diretava de `input` para podermos criar inputs, com validações com mais facilidade.

Nossa directiva tera o objetivo de simplificar esse códito todo:

```js
  <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
    <div class="form-group" data-ng-class="{ 'has-error' : formUsuario.nome.$invalid && !formUsuario.nome.$pristine }">
      <label>Nome</label>
      <input type="text" name="nome" class="form-control" data-ng-model="usuario.nome" required>
      <p data-ng-if="formUsuario.nome.$invalid && !formUsuario.nome.$pristine" class="help-block">
        Seu nome é obrigatório.
      </p>
    </div>
  </div>
```

### Mas antes, como funciona uma directiva?

```js
 (function() {
    'use strict'

    angular
      .module('app')
      .directive('myDirective', myDirective)

      function myDirective(){
        var directive = {
          restrict: 'E',
          scope: {
            nome: '@'
          },
           templateUrl: './input-directive/input-directive.template.html',
           link: link
        }
        return directive

        function link(scope, element, attrs){

        }
      }
})()
```

Sintaxe de declaração: `.directive('nomeDadirectiva', funcaoQueRepresentaEla)`
A função que representa a directiva deve retornar um objeto com as configurações da directiva.

Principais Configurações:

### restrict: 
Define o tipo da directiva, entre eles temos:
  - E: elemento `ex: <my-directive></my-directive>`
  - A: atributo `ex: <div my-directive/>` 
  - C: classe `ex: <div class="my-directive"/>`
  - M: comentário `ex: <!-- directive:my-directive -->`

### scope: 
Resumindo: nos ajuda a manter um ecapsulamento, isolando a directiva dos outros scopos da aplicação
Podemos definir propriedades no scope para passarmos via atributo, ex:

```js
  (function() {
    'use strict'

    angular
      .module('app')
      .directive('myDirective', myDirective)

      function myDirective(){
        var directive = {
          restrict: 'E',
          scope: {
            nome: '@'
          },
          template: 'Ola, {{nome}}',
        }
        return directive
      }
})()
```
Com isso definido, podemos chamar a directiva, declarando ela em um view qualquer:

```html
  <my-directive nome="Goku"></my-directive>
```

Com isso teremos exibido na tela, a mensagem: *Ola, goku*

Temos alguns tipos de atributos no nosso scope, cada tipo se comporta de uma maneira, os principais são:
  - `@`: usamos quando o valor a ser passado não vai ser alterado, um valor estatico 
  - `=`: usamos quando queremos criar uma coneção entre a directiva, e a view que está chamando ela, geralmente passando uma variavel
  - `&` : usamos quando queremos passar um metodo para nossa directiva

Durante a construção da nossa directiva de input veremos eles em funcionamento.

### template
Define o template que iremos utilizar. ex: `template: 'Ola, {{nome}}',`

### templateUrl
Define a a localização do template ex: `templateUrl: './input-directive/input-directive.template.html',`

### link
Função para manipulação do dom

### controller
Define o `controller` do template da directiva

## Iniciando nosso componente:

Criaremos então um arquivo js, e um html com o template que desejamos

*input.directive.js*
```js
(function() {
  'use strict'

   angular
    .module('app')
    .directive('inputText', inputText)

    function inputText(){
      var directive = {
        restrict: 'E',
        scope: {

        },
        templateUrl: './input-directive/input-directive.template.html',
        link: link
      }
      return directive

      function link(scope, element, attrs){

      }
    }
})()
```

*input.directive.template.html*
```html
  <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
    <div class="form-group" data-ng-class="{ 'has-error' : formUsuario.nome.$invalid && !formUsuario.nome.$pristine }">
      <label>Nome</label>
      <input type="text" name="nome" class="form-control" data-ng-model="usuario.nome" required>
      <p data-ng-if="formUsuario.nome.$invalid && !formUsuario.nome.$pristine" class="help-block">
        Seu nome é obrigatório.
      </p>
    </div>
  </div>

```

Iremos adicionar no nosso scopo, as infomações que iremos precisar:

```js
(function() {
  'use strict'

   angular
    .module('app')
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
        templateUrl: './input-directive/input-directive.template.html',
        link: link
      }
      return directive

      function link(scope, element, attrs){

      }
    }
})()
```
 
Adicionaremos ao nosso template, a tag `ng-form` para que possamos usar as validações de formulario, dentro do nosso componente.
Porque não um form real? Não é possivel usar um form padrão do html dentro do outro, por isso necessitamos do ng-form no componente para que possamos usalo dentro de um form real futuramente.

*input.directive.template.html*
```html
  <ng-form name="inputTextForm">
    <div class="form-group" data-ng-class="{ 'has-error' : inputTextForm.nome.$invalid && !inputTextForm.nome.$pristine }">
      <label>Nome</label>
      <input type="text" name="nome" class="form-control" data-ng-model="usuario.nome" required>
      <p data-ng-if="inputTextForm.nome.$invalid && !inputTextForm.nome.$pristine" class="help-block">
        Seu nome é obrigatório.
      </p>
    </div>
  </ng-form>
```

Feito isso, iremos alterar os atributos que agora estão fixos no nosso template, iremos usar as variaveis do nosso `scope` (name, model, isRequired e label)

*input.directive.template.html*
```html
  <ng-form name="inputTextForm">
    <div class="form-group" data-ng-class="{ 'has-error' : inputTextForm[name].$invalid && !inputTextForm[name].$pristine }">
      <label>{{label}}</label>
      <input type="text" name="{{name}}" class="form-control" data-ng-model="model" data-ng-required="isRequired">
      <p data-ng-if="inputTextForm[name].$invalid && !inputTextForm[name].$pristine" class="help-block">
        Campo obrigatório.
      </p>
    </div>
  </ng-form>
```
Usaremos também a diretiva do angular `ng-required` para controlarmos dinamicamente se o campo é required ou não.

Utilizando a diretiva em uma view, já é possivel ver o resultado:
```html
<input-text name="nome" model="pessoa.nome" label="Nome" is-required="true"></input-text>
```
Um input conforme definimos no template utilizando os atributos que informamos é criado.

Vantagens:
 - Fácil reaproveitamento
 - Fácil manutenção
 - Infinitas possibilidades


*Caso tenha dúvidas consulte os arquivos no repositorio*

# live-demo
Live-demo disponível em:
[https://marcosflorencio.js.org/escola-de-ti-angular/parte04/index.html](https://marcosflorencio.js.org/escola-de-ti-angular/parte04/index.html)