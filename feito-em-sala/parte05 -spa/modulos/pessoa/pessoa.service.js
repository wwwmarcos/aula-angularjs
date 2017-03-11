angular
  .module('pessoa')
  .factory('PessoaService', PessoaService)

  function PessoaService($http) {
    
    var HOST = 'https://escola-de-ti.herokuapp.com/person';

    function save(pessoa) {
      console.log('pessoa {}', pessoa)
     return $http({
        method: 'POST',
        url: HOST + '/create',
        data: pessoa
      })
    }
    
    function getPessoas(){
      return $http({
        method: 'GET',
        url: HOST + '/list'
      })
    }

    var factory = {
      save: save,
      getPessoas: getPessoas
    }
    return factory
    
  }