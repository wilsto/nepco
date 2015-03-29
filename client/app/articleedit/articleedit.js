'use strict';

angular.module('nepcoApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('articleedit', {
                url: '/articleedit/:id',
                templateUrl: 'app/articleedit/articleedit.html',
                controller: 'ArticleeditCtrl'
            });
    });