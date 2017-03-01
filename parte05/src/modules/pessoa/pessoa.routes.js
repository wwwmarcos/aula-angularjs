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