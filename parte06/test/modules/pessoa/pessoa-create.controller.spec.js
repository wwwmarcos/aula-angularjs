     'use strict'
   
    describe('PessoaCreateControllerTest', function() {
      var ctrl
      var $scope = {}
      var PessoaService
      var $state
      var pessoaMock

      beforeEach(module('app'))
      beforeEach(module('ui.router'))
      beforeEach(module('pessoa'))

      beforeEach(inject(function($controller, _PessoaService_, _$state_, $rootScope) {
        PessoaService = _PessoaService_
        $state = _$state_
        $scope = $rootScope.$new()

        pessoaMock = {
          name: 'Joao',
          secondName: 'Paulo'
        }

        ctrl = $controller('PessoaCreateController', {
          $scope: $scope,
          PessoaService: PessoaService,
          $state: $state
        })
      }))

      function saveResponseMock() {
        var deferred
        inject(function($q) {
          deferred = $q.defer()
          deferred.resolve({
            data: pessoaMock
          })
        })
        return deferred.promise
      }
      
      it('funcao save definida', function() {
        expect($scope.save).toBeDefined()
      })

      it('funcao save chamando service de pessoa', function() {
        spyOn(PessoaService, 'save').and.callFake(saveResponseMock)
        $scope.save(pessoaMock)
        expect(PessoaService.save).toHaveBeenCalled()
      })

      it('reload da pagina apos salvar', function() {
        spyOn(PessoaService, 'save').and.callFake(saveResponseMock)
        spyOn($state, 'reload')
        $scope.save(pessoaMock)
        $scope.$digest()
        expect($state.reload).toHaveBeenCalled()
      })

    })
