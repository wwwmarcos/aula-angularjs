
angular
  .module('pessoa')
  .controller('PessoaListController', PessoaListController)

  function PessoaListController($scope, PessoaService){
    init()

    function init(){
      PessoaService
        .getPessoas()
        .then(function(reponse){
          $scope.pessoas = reponse.data;
        })
        .catch(function(error){
          alert(error);
        })
    }

  }
  