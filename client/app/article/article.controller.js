'use strict';

angular.module('nepcoApp')
    .controller('ArticleCtrl', function($scope, $http, $stateParams, $location) {

        $scope.load = function() {
            if ($stateParams.id) {
                $http.get('/api/articles/' + $stateParams.id).success(function(article) {
                    console.log('article', article);
                    $scope.article = article[0];
                });
            } else {
                $scope.article = {
                    name: ''
                };

            }
        };
        $scope.load();

        $scope.save = function() {
            if (typeof $scope.article._id === 'undefined') {
                $http.post('/api/articles', $scope.article).success(function(data) {
                    var logInfo = 'Article "' + $scope.article.name + '" was created';
                    $.growl({
                        icon: 'fa fa-info-circle',
                        message: logInfo
                    });
                    $location.path('/article/' + data._id);
                });
            } else {
                $http.put('/api/articles/' + $scope.article._id, $scope.article).success(function() {
                    var logInfo = 'Article "' + $scope.article.name + '" was updated';
                    $.growl({
                        icon: 'fa fa-info-circle',
                        message: logInfo
                    });
                });
            }

        };
    });