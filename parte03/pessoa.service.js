angular
.module('app')
.factory('PessoaService', PessoaService);

function PessoaService() {
  var factory = {
   getPessoas : getPessoas
  };
  return factory;

  function getPessoas(){
    return [{nome:'Maria', idade:30}, {nome:'Jose', idade:29}]
  };

};