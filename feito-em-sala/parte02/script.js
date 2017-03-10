
	angular
		.module('app', [])
		.controller('IndexController', IndexController)

		function IndexController($scope){
			$scope.doce = {};
			$scope.doces = [];

			$scope.salvarDoce = function(){
				var copiaDoObjeto = angular.copy($scope.doce);
				$scope.doces.push(copiaDoObjeto);
				$scope.doce = {};
			}

			$scope.removerItem = function(doce){
				console.log('doce que vai ser removido', doce)
				var index = $scope.doces.indexOf(doce);
				$scope.doces.splice(index, 1);
			}
		}