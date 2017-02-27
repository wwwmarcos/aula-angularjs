(function() {
  'use strict'

  angular
    .module('pessoa')
    .config(config)
    .controller('PessoaCreateController', PessoaCreateController)

  config.$inject = ['$stateProvider']

  function config($stateProvider) {
    $stateProvider
      .state('pessoa-create', {
        url: '/pessoa/create',
        controller: 'PessoaCreateController',
        templateUrl: './src/modules/pessoa/pessoa-create.html'
      })
  }

  PessoaCreateController.$inject = ['$scope', 'PessoaService']

  function PessoaCreateController($scope, PessoaService) {

    $scope.save = save

    function save(pessoa) {
      PessoaService
        .save(pessoa)
        .then(function(reponse){
          console.log('sucesso', response)
        })
        .catch(function(error){
          console.log('errrrou', error)
        })
    }
  }

})()