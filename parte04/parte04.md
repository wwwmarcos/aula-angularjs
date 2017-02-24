# Parte 4: Diretivas

Como já dito antes diretivas são extensões da linguagem html que permitem a implementação de novos comportamentos de forma declarativa, manilupando o DOM.
É possivel utilziar as diretivas de forma que se reparoveite código, criando componentes para serem reutilizados no sitema todo.
Iremos agora criar uma diretava de `input` para podermos criar inputs, com validações com mais facilidade.

Nossa diretiva tera o objetivo de simplificar esse códito todo:

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

O primeiro passo é iniciar o arquivo em que criaremos nossa diretiva. Essa é a estrutura básica de uma diretiva:

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

Sintaxe de declaração: `.directive('nomeDaDiretiva', funcaoQueRepresentaEla)`
A função que representa a diretiva deve retornar um objeto com as configurações da diretiva.

Configurações:

- restrict: define o tipo da diretiva, entre eles temos:
  - E: elemento `ex: <my-directive></my-directive>`
  - A: atributo `ex: <div my-directive/>` 
  - C: classe `ex: <div class="my-directive"/>`
  - M: comentário `ex: <!-- directive:my-directive -->`

- scope: resumindo: nos ajuda a manter um ecapsulamento, isolando a diretiva dos outros scopos da aplicação
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
Com isso definido, podemos chamar a diretiva, declarando ela em um view qualquer:

```html
  <my-directive nome="Goku"></my-directive>
```

Com isso teremos exibido na tela, a mensagem: *Ola, goku*

  Temos alguns tipos de atributos no nosso scope, cada tipo se comporta de uma maneira, os principais são:
   - `@`: usamos quando o valor a ser passado não vai ser alterado, um valor estatico 
   - `=`: usamos quando queremos criar uma coneção entre a diretiva, e a view que está chamando ela, geralmente passando uma variavel
   - `&` : usamos quando queremos passar um metodo para nossa diretiva

Durante a construção da nossa diretiva de input veremos eles em funcionamento.







