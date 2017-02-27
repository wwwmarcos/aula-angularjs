(function() {
  'use strict'

  angular
    .module('pessoa')
    .factory('PessoaService', PessoaService)

  PessoaService.$inject = ['$http']
  function PessoaService($http) {

    var END_POINT = 'https://escola-de-ti.herokuapp.com/person'
    
    var factory = {
      save: save,
      edit: edit,
      findOne: findOne,
      getAll: getAll
    }
    return factory


    function save(pessoa){
      return $http({
        method: 'POST',
        url: END_POINT + '/create',
        data: pessoa
      })
    }

    function edit(){
      return $http({
        method: 'PUT',
        url: END_POINT + '/edit',
        data: pessoa
      })
    }

    function findOne(){
      return $http({
        method: 'GET',
        url: END_POINT + '/get',
        data: pessoa
      })
    }

    function getAll(){
      return $http({
        method: 'GET',
        url: END_POINT + '/list',
        data: pessoa
      })
    }

  }
})()