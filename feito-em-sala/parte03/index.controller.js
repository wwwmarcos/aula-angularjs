
angular
  .module('app')
  .controller('IndexController', IndexController)

  function IndexController($scope, DoceService) {
    $scope.hoje = 'dia de maldade'
     $scope.doces = DoceService.getDoces()

  }