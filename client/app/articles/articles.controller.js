'use strict';

angular.module('nepcoApp')
    .controller('ArticlesCtrl', function($scope, $http) {
        $scope.searchText = '';

        // set available range
        $scope.minPerf = 0;
        $scope.maxPerf = 5;
        $scope.userMinPerf = $scope.minPerf;
        $scope.userMaxPerf = $scope.maxPerf;

        // set available range
        $scope.minPrice = 0;
        $scope.maxPrice = 999;
        $scope.userMinPrice = $scope.minPrice;
        $scope.userMaxPrice = $scope.maxPrice;

        $scope.getRandom = function() {
            return Math.floor((Math.random() * 5) + 1);
        }

        $http.get('/api/articles/').success(function(articles) {
            $scope.allarticles = articles;
            _.each($scope.allarticles, function(article) {
                article.perf = $scope.getRandom();
            })
            $scope.articles = $scope.allarticles;
            $scope.filterArticles();
        });

        $http.get('/api/lists').then(
            function(data) {
                $scope.brands = _.filter(data.data, function(list) {
                    return list.name === 'brand';
                })[0].list;
            }, function() {
                console.log('ERROR!!! NO LIST');
            }
        );

        $scope.$watch('searchText', function() {
            $scope.filterArticles();
        });

        $scope.$watch('userMinPrice', function() {
            $scope.filterArticles();
        });
        $scope.$watch('userMaxPrice', function() {
            $scope.filterArticles();
        });
        $scope.$watch('userMinPerf', function() {
            $scope.filterArticles();
        });
        $scope.$watch('userMaxPerf', function() {
            $scope.filterArticles();
        });
        $scope.filterArticles = function() {
            $scope.articles = _.filter($scope.allarticles, function(article) {
                var blnSearchText = ($scope.searchText.length === 0) ? true : article.name.toLowerCase().indexOf($scope.searchText.toLowerCase()) >= 0;
                var price = (article.price === undefined) ? 0 : article.price.replace(',', '.');
                var blnSearchPrice = (parseFloat($scope.userMinPrice) <= parseFloat(price) && parseFloat($scope.userMaxPrice) >= parseFloat(price));
                var blnSearchPerf = (parseFloat($scope.userMinPerf) <= parseFloat(article.perf) && parseFloat($scope.userMaxPerf) >= parseFloat(article.perf));

                return blnSearchText && blnSearchPrice && blnSearchPerf;
            });
        };
    });