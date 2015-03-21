'use strict';

angular.module('nepcoApp')
    .controller('ArticlesCtrl', function($scope, $http) {
        $http.get('/api/articles/').success(function(articles) {
            $scope.articles = articles;
        });
    });