// Companies service used to communicate Companies REST endpoints
(function () {
  'use strict';

  angular
    .module('companies')
    .factory('CompaniesService', CompaniesService);

  CompaniesService.$inject = ['$resource', 'Notification'];

  function CompaniesService($resource, Notification) {
    var Companies = $resource('/api/companies/:companyId', {
      companyId: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
      create: {
        method: 'POST',
        url: '/api/companies'
      }
    });

    angular.extend(Companies, {
      companyCreate: function(companyFormData){
        return this.create(companyFormData).$promise;
      }
    });

    return Companies;

    /*return $resource('api/companies/:companyId', {
      companyId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });*/
  }
}());
