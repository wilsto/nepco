'use strict';

angular.module('nepcoApp')
    .controller('ArticleCtrl', function($scope, $http, $stateParams, $location) {

        $scope.load = function() {
            if ($stateParams.id) {
                $http.get('/api/articles/' + $stateParams.id).success(function(article) {
                    console.log('article', article);
                    $scope.article = article[0];

                    $scope.chartPolar = {
                        options: {
                            chart: {
                                polar: true,
                                type: 'area'
                            }
                        },

                        title: {
                            text: 'Profil Performance',
                            align: 'left'
                        },

                        xAxis: {
                            categories: ['Vrillage', 'Solidité des teintures au lavage', 'Solidité des teintures à la sueur', 'Solidité des teintures au jaunissement phénolique',
                                'Facilité de repassage'
                            ],
                            tickmarkPlacement: 'on',
                            lineWidth: 1
                        },

                        yAxis: {
                            gridLineInterpolation: 'polygon',
                            lineWidth: 1,
                            tickInterval: 1,
                            min: 0,
                            max: 5
                        },

                        tooltip: {
                            shared: true,
                            pointFormat: '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>'
                        },

                        legend: {
                            align: 'right',
                            verticalAlign: 'top',
                            layout: 'vertical'
                        },

                        series: [{
                            name: 'NepCode Rank',
                            data: [parseInt($scope.article.test1Rank), parseInt($scope.article.test2Rank), parseInt($scope.article.test3Rank), parseInt($scope.article.test4Rank), parseInt($scope.article.test5Rank)],
                            pointPlacement: 'on'
                        }]

                    };


                    setTimeout(function() {
                        $("#ean").EAN13(article[0].EAN13);
                    }, 0);
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