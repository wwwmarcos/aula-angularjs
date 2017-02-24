(function() {
  'use strict'

  angular
    .module('app', [])
    .controller('IndexController', IndexController)

  IndexController.$inject = ['$scope', 'PessoaService']
  function IndexController($scope, PessoaService) {
    init();

    function init(){
      $scope.pessoas = PessoaService.getPessoas()
    }

  }

})()