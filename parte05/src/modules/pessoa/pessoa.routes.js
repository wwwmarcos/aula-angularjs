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