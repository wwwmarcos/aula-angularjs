(function() {
  'use strict'

   angular
    .module('app', [
      'ui.router',
      'pessoa',
      'components'
    ])
    .config(config)

    config.$inject = ['$urlRouterProvider']
    function config($urlRouterProvider){
      $urlRouterProvider.otherwise('/pessoa/list')
    }

})()