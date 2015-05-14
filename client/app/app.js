'use strict';

angular.module('nepcoApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'btford.socket-io',
    'ui.router',
    'ui.bootstrap',
    'ui.select',
    'pickAColor',
    'ui.bootstrap.datetimepicker',
    'highcharts-ng',
    'ui-rangeSlider',
    'angularFileUpload',
    'cloudinary'
])
    .config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
        $urlRouterProvider
            .otherwise('/');

        $locationProvider.html5Mode(true);
        $httpProvider.interceptors.push('authInterceptor');
    })

.factory('authInterceptor', function($rootScope, $q, $cookieStore, $location) {
    return {
        // Add authorization token to headers
        request: function(config) {
            config.headers = config.headers || {};
            if ($cookieStore.get('token')) {
                config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
            }
            return config;
        },

        // Intercept 401s and redirect you to login
        responseError: function(response) {
            if (response.status === 401) {
                // remove any stale tokens
                $cookieStore.remove('token');
                return $q.reject(response);
            } else {
                return $q.reject(response);
            }
        }
    };
})

.run(function($rootScope, $location, Auth) {
    $rootScope.menu = [{
        'title': 'Accueil',
        'link': '/',
    }, {
        'title': 'Nos Missions',
        'link': '/about'
    }, {
        'title': 'Les Articles',
        'link': '/articles'
    }, {
        'title': 'Nos Partenaires',
        'link': '/partenaires'
    }, {
        'title': 'Blog',
        'link': '/blog'
    }];

    $rootScope.isLoggedIn = Auth.isLoggedIn;
    $rootScope.isAdmin = Auth.isAdmin;
    $rootScope.getCurrentUser = Auth.getCurrentUser;

    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function(event, next) {
        Auth.isLoggedInAsync(function(loggedIn) {
            if (next.authenticate && !loggedIn) {
                $location.path('/login');
            }
        });
    });
})


.controller('slideCtrl', function($scope, $rootScope, $http, Auth, $location) {

    $scope.currentUser = Auth.getCurrentUser();


    $scope.logout = function() {
        Auth.logout();
        $location.path('/');
    };
});