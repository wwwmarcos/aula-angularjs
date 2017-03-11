
angular
  .module('pessoa')
  .controller('PessoaCreateController', PessoaCreateController)

  function PessoaCreateController($scope, PessoaService) {

    $scope.save = function(pessoa){
      PessoaService
      .save(pessoa)
      .then(function(response){
        console.log(response)
      })
      .catch(function(error){
        console.log('error', error)
      })
    }

  }