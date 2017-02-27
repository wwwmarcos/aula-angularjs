# Parte 4: SPA

### Single Page Applications

Uma Single Page Application (aplicação de página unica) consiste em uma aplicação com navegação baseada em AJAX.
O usuário acessa a página principal, geralmente o index, e a partir dai navega para as outras views fazendo requisições, sem a necessidade de regarregar a página base.

Onde entra angular nisso? Simples, uma das grandes vantagens do angular é facilitar a construção desse tipo de aplicação.

*Router*: angular possui dois `modulos` bem conhecidos para gerenciamento de rotas (routers), sendo eles [ngRoute](https://docs.angularjs.org/api/ngRoute) e [uiRouter](https://github.com/angular-ui/ui-router). No nosso exemplo usaremo o `ui-router`.

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
Instale também o ui-router, o modulo que nós ajudará na construção do nosso SPA:

> $ bower install angular-ui-router --save

### NPM 
> $ npm init

Se você seguiu as opções do `npm` até o final, um arquivo com nome `package.json` foi criado, e ele deve se parecer com isso:

```json
{
  "name": "parte05",
  "description": "### Single Page Applications",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "license": "MIT"
}
```
