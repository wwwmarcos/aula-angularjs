
angular
  .module('app')
  .controller('IndexController', IndexController)

  function IndexController($scope) {
    $scope.hoje = 'dia de maldade'
  }