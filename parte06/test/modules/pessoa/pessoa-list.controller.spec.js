     'use strict'

     describe('PessoaListControllerTest', function() {
       var ctrl
       var $scope = {}
       var PessoaService
       var $state
       var pessoaMock
       var pessoaListResolve

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

         pessoaListResolve = {
           data: [{
             _id: '1',
             name: 'Joao',
             secondName: 'Paulo'
           }, {
             _id: '2',
             name: 'Joao',
             secondName: 'Paulo'
           }]
         }

         ctrl = $controller('PessoaListController', {
           $scope: $scope,
           PessoaService: PessoaService,
           $state: $state,
           pessoaListResolve: pessoaListResolve
         })
       }))

       function removeMockResponse() {
         var deferred
         inject(function($q) {
           deferred = $q.defer()
           deferred.resolve({
             data: pessoaMock
           })
         })
         return deferred.promise
       }

       it('chamar $state ao chamar função de remover', function() {
         spyOn(PessoaService, 'remove').and.callFake(removeMockResponse)
         spyOn($state, 'reload')
         $scope.remove(pessoaMock)
         $scope.$digest()
         expect($state.reload).toHaveBeenCalled()
       })

       it('chamar o $state.go ao enviar o chamar função goToEdit', function() {
         spyOn($state, 'go')
         $scope.goToEdit(pessoaMock)
         $scope.$digest()
         expect($state.go).toHaveBeenCalledWith('pessoa-edit', { id: pessoaMock._id })
       })
     })