/**
 * Created by sheetal on 3/15/17.
 */
(function () {
  'use strict';

  angular
    .module('comapny.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('comapany', {
        abstract: true,
        url: '/company',
        template: '<ui-view/>'
      })
      .state('company.list', {
        url: '',
        templateUrl: '/modules/jobboard/company/client/views/list-companies.client.view.html',
        controller: 'ComapnyListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Companies List'
        }
      })
      .state('company.view', {
        url: '/:companyId',
        templateUrl: '/modules/jobboard/company/client/views/view-company.client.view.html',
        controller: 'CompanyController',
        controllerAs: 'vm',
        resolve: {
          companyResolve: getCompany
        },
        data: {
          pageTitle: 'Company {{ companyResolve.title }}'
        }
      });
  }

  getCompany.$inject = ['$stateParams', 'ArticlesService'];

  function getArticle($stateParams, ArticlesService) {
    return ArticlesService.get({
      articleId: $stateParams.articleId
    }).$promise;
  }
}());
