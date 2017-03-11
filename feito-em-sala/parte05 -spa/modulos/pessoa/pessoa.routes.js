
angular
  .module('pessoa')
  .config(config)

  function config($stateProvider){
    $stateProvider
      .state('pessoa-create', {
        url: '/pessoas/create',
        controller: 'PessoaCreateController',
        templateUrl: 'modulos/pessoa/pessoa-create.html'
      })
      .state('pessoa-list', {
        url: '/pessoas/list',
        controller: 'PessoaListController',
        templateUrl: 'modulos/pessoa/pessoa-list.html'
      })
  }