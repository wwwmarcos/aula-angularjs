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

Iremos continuar trabalhando em cima do exemplo 03:
