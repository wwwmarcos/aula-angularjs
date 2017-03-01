(function() {
  'use strict'

  angular
    .module('pessoa')
    .controller('PessoaListController', PessoaListController)

  PessoaListController.inject = ['$scope', 'pessoaListResolve', '$state', 'PessoaService']
  function PessoaListController($scope, pessoaListResolve, $state, PessoaService) {
    $scope.pessoas = pessoaListResolve.data
    $scope.goToEdit = goToEdit
    $scope.remove = remove

    function goToEdit(pessoa){
      $state.go('pessoa-edit', { id: pessoa._id })
    }

    function remove(pessoa) {
      PessoaService.remove(pessoa)
      .then(function(response){
        console.log(response)
        alert('Pessoa removida')
      })
      .catch(function(error){
        console.log('error {}', error)
      })
    }

  }

})()