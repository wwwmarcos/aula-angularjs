(function() {
  'use strict'

  angular
    .module('pessoa')
    .controller('PessoaEditController', PessoaEditController)

  PessoaEditController.inject = ['$scope', 'pessoaFindOneResolve', 'PessoaService', '$state']
  function PessoaEditController($scope, pessoaFindOneResolve, PessoaService, $state) {
    $scope.pessoa = pessoaFindOneResolve.data
    $scope.save = save

    function save(pessoa) {
      PessoaService.edit(pessoa)
      .then(function(response){
        alert('Pessoad edita')
        $state.go('pessoa-list')
      })
      .catch(function(error){
        console.log('error {}', error)
      })
    }

  }

})()