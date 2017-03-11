
  angular
    .module('app')
    .factory('DoceService', DoceService)

    function DoceService(){
      
      function getDoces(){
        var listaDeDoces = [
          {
            nome: 'Alface',
            cor: 'Verde'
          },
          {
            nome: 'Bala',
            cor: 'Vermelha'
          },
          {
            nome: 'Caramelo',
            cor: 'Marrom'
          }
        ] 
        return listaDeDoces
      }

      var factory = {
        getDoces: getDoces
      }
      
      return factory;

    }