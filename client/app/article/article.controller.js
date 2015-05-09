'use strict';

angular.module('nepcoApp')
    .controller('ArticleCtrl', function($scope, $http, $stateParams, $location) {

        $scope.article = {};
        $scope.article.name = '';
        $scope.article.materials = [];
        $scope.article.presence = [];
        $scope.materialss = [];
        $scope.presences = [];

        $scope.load = function() {
            if ($stateParams.id) {
                $http.get('/api/articles/' + $stateParams.id).success(function(article) {
                    $scope.article = article[0];
                    $scope.chartPolar = {
                        options: {
                            chart: {
                                polar: true,
                                type: 'area'
                            },

                            navigation: {
                                buttonOptions: {
                                    enabled: false
                                }
                            }
                        },
                        size: {
                            height: 480
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

                        credits: {
                            enabled: false
                        },
                        series: [{
                            name: 'NepCode Rank',
                            data: [parseInt($scope.article.test1Rank), parseInt($scope.article.test2Rank), parseInt($scope.article.test3Rank), parseInt($scope.article.test4Rank), parseInt($scope.article.test5Rank)],
                            pointPlacement: 'on'
                        }]

                    };


                    $scope.chartBar = {

                        options: {
                            //This is the Main Highcharts chart config. Any Highchart options are valid here.
                            //will be overriden by values specified below.
                            chart: {
                                type: 'bar'
                            },
                            tooltip: {
                                style: {
                                    padding: 10,
                                    fontWeight: 'bold'
                                }
                            },
                            //Title configuration (optional)
                            title: {
                                text: 'Taille',
                                align: 'left'
                            },
                            plotOptions: {
                                bar: {
                                    dataLabels: {
                                        enabled: true
                                    }
                                }
                            },
                            subtitle: {
                                text: 'Les Kippmeyers ayant cet article trouvent qu’il taille :',
                                align: 'left'
                            },
                            legend: {
                                layout: 'vertical',
                                align: 'right',
                                verticalAlign: 'top',
                                x: -40,
                                y: 100,
                                floating: true,
                                borderWidth: 1,
                                backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                                shadow: true
                            },

                            navigation: {
                                buttonOptions: {
                                    enabled: false
                                }
                            }
                        },
                        credits: {
                            enabled: false
                        },
                        //The below properties are watched separately for changes.

                        //Series object (optional) - a list of series using normal highcharts series options.
                        series: [{
                            data: [0, 0, 5, 25, 10]
                        }],
                        //Boolean to control showng loading status on chart (optional)
                        //Could be a string if you want to show specific loading text.
                        loading: false,
                        //Configuration for the xAxis (optional). Currently only one x axis can be dynamically controlled.
                        //properties currentMin and currentMax provied 2-way binding to the chart's maximimum and minimum
                        xAxis: {
                            categories: ['Très petit', 'Petit', 'Normalement', 'Grand', 'Très grand']
                        }
                    };


                    $('.social-likes').socialLikes();
                });
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