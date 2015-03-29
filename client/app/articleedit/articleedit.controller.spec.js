'use strict';

describe('Controller: ArticleeditCtrl', function () {

  // load the controller's module
  beforeEach(module('nepcoApp'));

  var ArticleeditCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ArticleeditCtrl = $controller('ArticleeditCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
