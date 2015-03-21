'use strict';

angular.module('nepcoApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('article', {
                url: '/article/:id',
                templateUrl: 'app/article/article.html',
                controller: 'ArticleCtrl'
            });
    });