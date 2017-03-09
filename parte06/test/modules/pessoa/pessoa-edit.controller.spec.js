     'use strict'

     describe('PessoaEditControllerTest', function() {
       var ctrl
       var $scope = {}
       var PessoaService
       var $state
       var pessoaMock
       var pessoaListResolve
       var pessoaFindOneResolve

       beforeEach(module('app'))
       beforeEach(module('ui.router'))
       beforeEach(module('pessoa'))

       beforeEach(inject(function($controller, _PessoaService_, _$state_, $rootScope) {
         PessoaService = _PessoaService_
         $state = _$state_
         $scope = $rootScope.$new()

         pessoaMock = {
           _id: '1',
           name: 'Joao',
           secondName: 'Paulo'
         }

         pessoaFindOneResolve = {
           data: pessoaMock
         }

         ctrl = $controller('PessoaEditController', {
           $scope: $scope,
           pessoaFindOneResolve: pessoaFindOneResolve,
           PessoaService: PessoaService,
           $state: $state
         })
       }))

       function editMockResponse() {
         var deferred
         inject(function($q) {
           deferred = $q.defer()
           deferred.resolve({
             data: pessoaMock
           })
         })
         return deferred.promise
       }

       it('chamar service de pessoa ao editar', function(){
         spyOn(PessoaService, 'edit').and.callFake(editMockResponse)
         $scope.save(pessoaMock)
         $scope.$digest()
         expect(PessoaService.edit).toHaveBeenCalledWith(pessoaMock)
       })

       it('mandar para pagina de listagem apos editar', function(){
         spyOn(PessoaService, 'edit').and.callFake(editMockResponse)
         spyOn($state, 'go')
         $scope.save(pessoaMock)
         $scope.$digest()
         expect($state.go).toHaveBeenCalledWith('pessoa-list')
       })

     })