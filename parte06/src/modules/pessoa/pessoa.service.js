(function() {
  'use strict'

  angular
    .module('pessoa')
    .factory('PessoaService', PessoaService)

  PessoaService.$inject = ['$http']

  function PessoaService($http) {

    var HOST = 'https://escola-de-ti.herokuapp.com/person'

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
        url: HOST + '/create',
        data: pessoa
      })
    }

    function edit(pessoa) {
      return $http({
        method: 'PUT',
        url: HOST + '/edit',
        data: pessoa
      })
    }

    function findOne(id) {
      return $http({
        method: 'GET',
        url: HOST + '/get/' + id,
      })
    }

    function getAll() {
      return $http({
        method: 'GET',
        url: HOST + '/list',
      })
    }

    function remove(pessoa) {
      return $http({
        method: 'DELETE',
        url: HOST + '/remove/' + pessoa._id,
      })
    }

  }
})()