(function () {
  'use strict';

  // Companies controller
  angular
    .module('companies')
    .controller('CompaniesController', CompaniesController);

  CompaniesController.$inject = ['$scope', '$state', 'CompaniesService', '$window', 'Authentication', 'companyResolve', 'Notification'];

  function CompaniesController ($scope, $state, CompaniesService, $window, Authentication, company, Notification) {
    var vm = this;

    vm.authentication = Authentication;
    vm.company = company;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

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

      Notification.error({ message: 'OK calling service', title: '<i class="glyphicon glyphicon-remove"></i> In Controller!', delay: 6000 });

      CompaniesService.companyCreate(vm.company)
        .then(successCallback)
        .catch(errorCallback);


      /*

      // TODO: move create/update logic to service
      if (vm.company._id) {
        vm.company.$update(successCallback, errorCallback);
      } else {
        vm.company.$save(successCallback, errorCallback);
      }*/


    }

    function successCallback(res) {
      $state.go('companies.view', {
        companyId: res._id
      });
    }

    function errorCallback(res) {
      vm.error = res.data.message;
    }
  }
}());
