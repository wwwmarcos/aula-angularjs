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
      getAll: getAll,
      remove: remove
    }
    return factory


    function save(pessoa) {
      return $http({
        method: 'POST',
        url: END_POINT + '/create',
        data: pessoa
      })
    }

    function edit(pessoa) {
      return $http({
        method: 'PUT',
        url: END_POINT + '/edit',
        data: pessoa
      })
    }

    function findOne(id) {
      return $http({
        method: 'GET',
        url: END_POINT + '/get/' + id,
      })
    }

    function getAll() {
      return $http({
        method: 'GET',
        url: END_POINT + '/list',
      })
    }

    function remove(pessoa){
      return $http({
        method: 'DELETE',
        url: END_POINT + '/remove',
        data: pessoa
      })
    }

  }
})()