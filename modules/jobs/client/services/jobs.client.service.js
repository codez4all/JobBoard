// Jobs service used to communicate Jobs REST endpoints
(function () {
  'use strict';

  angular
    .module('jobs')
    .factory('JobsService', JobsService);

  JobsService.$inject = ['$resource', 'Notification'];

  function JobsService($resource, Notification) {
    var Jobs = $resource('/api/jobs/:jobId', {
      jobId: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
      create: {
        method: 'POST',
        url: '/api/jobs'
      }
    });

    angular.extend(Jobs, {
      jobCreate: function(jobFormData){
        Notification.error({ message: jobFormData.name, title: '<i class="glyphicon glyphicon-remove"></i> In Service!', delay: 6000 });

        return this.create(jobFormData).$promise;
      }
    });

    return Jobs;
  }
}());
