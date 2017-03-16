/**
 * Created by sheetal on 3/15/17.
 */

(function () {
  'use strict';

  angular
    .module('company')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Company',
      state: 'companies',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'companies', {
      title: 'List Companies',
      state: 'companies.list',
      roles: ['*']
    });
  }
}());
