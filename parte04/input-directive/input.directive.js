(function() {
  'use strict'

   angular
    .module('app')
    .directive('inputText', inputText)

    function inputText(){
      var directive = {
        restrict: 'E',
        scope: {

        },
        templateUrl: './input-directive/input-directive.template.html',
        link: link
      }
      return directive

      function link(scope, element, attrs){

      }
    }
})()