(function() {
  'use strict'

  angular
    .module('pessoa')
    .controller('PessoaCreateController', PessoaCreateController)

  PessoaCreateController.$inject = ['$scope', 'PessoaService', '$state']

  function PessoaCreateController($scope, PessoaService, $state) {

    $scope.save = save

    function save(pessoa) {
      PessoaService
        .save(pessoa)
        .then(function(response) {
          alert('Nova pessoa cadastrada')
          console.log('sucesso', response)
          $state.reload()
        })
        .catch(function(error) {
          alert('Erro')
          console.log('errrrou', error)
        })
    }
  }

})()