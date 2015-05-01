'use strict';

angular.module('nepcoApp')
    .controller('NavbarCtrl', function($scope, $location, Auth) {
        $scope.menu = [{
            'title': 'Accueil',
            'link': '/',
        }, {
            'title': 'Mission',
            'link': '/mission'
        }, {
            'title': 'Articles',
            'link': '/articles'
        }, {
            'title': 'Partenaires',
            'link': '/partenaires'
        }, {
            'title': 'Blog',
            'link': '/blog'
        }];

        $scope.isCollapsed = true;
        $scope.isLoggedIn = Auth.isLoggedIn;
        $scope.isAdmin = Auth.isAdmin;
        $scope.getCurrentUser = Auth.getCurrentUser;

        $scope.logout = function() {
            Auth.logout();
            $location.path('/login');
        };

        $scope.isActive = function(route) {
            return route === $location.path();
        };
    });