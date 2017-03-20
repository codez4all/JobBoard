(function () {
  'use strict';

  // Companies controller
  angular
    .module('companies')
    .controller('CompaniesController', CompaniesController);

  CompaniesController.$inject = ['$scope', '$state', 'CompaniesService', '$window', 'Authentication', 'companyResolve', 'Notification', '$http', '$resource'];

  function CompaniesController ($scope, $state, CompaniesService, $window, Authentication, company, Notification, $http, $resource) {
    var vm = this;

    vm.authentication = Authentication;
    vm.company = company;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.showOpenPositions = showOpenPositions;
    vm.jobFlag = false;


    function showOpenPositions(companyId){

      console.log("Here"+companyId);
      //var jobs = $resource('/api/companies/jobs/:companyId',{companyId:'@companyId'});

      $http.post("/api/companies/"+companyId, {"companyId":companyId})
      .then(function(res){
        console.log("Here after then"+res.data.jobs);
        vm.jobs = res.data.jobs;
        vm.jobFlag = true;
      });

    }

    // Remove existing Company
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.company.$remove($state.go('companies.list'));
      }
    }

    // Save Company
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.companyForm');
        return false;
      }

      CompaniesService.companyCreate(vm.company)
        .then(successCallback)
        .catch(errorCallback);

      /*

      // TODO: move create/update logic to service
      if (vm.company._id) {
        vm.company.$update(successCallback, errorCallback);
      } else {
        vm.company.$save(successCallback, errorCallback);
      } */


    }

    function successCallback(res) {

      /*
      $scope.$state.go('companies.view', {
       companyId: res._id
       });
       */

      $state.go('companies.list');
    }

    function errorCallback(res) {

      Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Error', delay: 6000 });

      vm.error = res.data.message;
    }
  }
}());
