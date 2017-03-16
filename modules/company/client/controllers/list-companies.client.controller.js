/**
 * Created by sheetal on 3/15/17.
 */
(function () {
  'use strict';

  angular
    .module('company')
    .controller('CompaniesListController', CompaniesListController);

  CompaniesListController.$inject = ['CompanyService'];

  function CompaniesListController(CompanyService) {
    var vm = this;

    vm.companies = CompanyService.query();
  }
}());
