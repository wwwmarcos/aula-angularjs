(function() {
  'use strict'

  angular
    .module('pessoa')
    .factory('PessoaService', PessoaService)

  PessoaService.$inject = ['$http']
  function PessoaService($http) {
    var factory = {
      save: save,
      edit: edit,
      findOne: findOne,
      getAll: getAll
    }
    return factory

    var END_POINT = '';

    function save(pessoa){
      return $http({
        method: 'POST',
        url: END_POINT + '/pessoa',
        data: pessoa
      })
    }

    function edit(){

    }

    function findOne(){

    }

    function getAll(){

    }
  }
})()