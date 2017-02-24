# Parte 4: Directivas

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

Configurações:

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





