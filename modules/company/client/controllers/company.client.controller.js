/**
 * Created by sheetal on 3/15/17.
 */
(function () {
  'use strict';

  angular
    .module('company')
    .controller('CompanyController', CompanyController);

  CompanyController.$inject = ['$scope', 'companyResolve', 'Authentication'];

  function CompanyController($scope, company, Authentication) {
    var vm = this;

    vm.company = company;
    vm.authentication = Authentication;

  }
}());
