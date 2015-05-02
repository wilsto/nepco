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

        $http.get('/api/articles/').success(function(articles) {
            $scope.allarticles = articles;
            $scope.articles = articles;
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

        $(document).ready(function() {
            $('#list').click(function(event) {
                event.preventDefault();
                $('#products .item').addClass('list-group-item');
            });
            $('#grid').click(function(event) {
                event.preventDefault();
                $('#products .item').removeClass('list-group-item');
                $('#products .item').addClass('grid-group-item');
            });
        });

        $scope.$watch('searchText', function() {
            $scope.filterArticles();
        });

        $scope.$watch('userMinPrice', function() {
            $scope.filterArticles();
        });
        $scope.$watch('userMaxPrice', function() {
            $scope.filterArticles();
        });

        $scope.filterArticles = function() {
            $scope.articles = _.filter($scope.allarticles, function(article) {
                var blnSearchText = ($scope.searchText.length === 0) ? true : article.name.toLowerCase().indexOf($scope.searchText.toLowerCase()) >= 0;
                var price = (article.price === undefined) ? 0 : article.price.replace(',', '.');
                var blnSearchPrice = (parseFloat($scope.userMinPrice) <= parseFloat(price) && parseFloat($scope.userMaxPrice) >= parseFloat(price));
                console.log('blnSearchPrice', blnSearchPrice);
                return blnSearchText && blnSearchPrice;
            });
        };
    });