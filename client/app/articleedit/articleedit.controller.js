'use strict';

angular.module('nepcoApp')
    .controller('ArticleeditCtrl', function($scope, $http, $stateParams, $location, $modal, $log) {

        $scope.article = {};
        $scope.article.materials = [];
        $scope.article.presence = [];


        $scope.load = function() {
            if ($stateParams.id) {

                $scope.article.departement = undefined;
                $http.get('/api/articles/' + $stateParams.id).success(function(article) {
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
                console.log('$scope.article', $scope.article);
                $http.put('/api/articles/' + $scope.article._id, $scope.article).success(function() {
                    var logInfo = 'Article "' + $scope.article.name + '" was updated';
                    $.growl({
                        icon: 'fa fa-info-circle',
                        message: logInfo
                    });
                });
            }
        };

        $scope.refresh = function(query, listName) {
            $http.get('/api/lists/' + listName).then(
                function(response) {
                    $scope[listName.substring(0, 1).toLowerCase() + listName.substring(1) + 's'] = (response.data[0]) ? response.data[0].list : [];
                }, function() {
                    console.log('ERROR!!! NO LIST');
                }
            );
        };

        $scope.open = function(items, name) {

            $scope.items = angular.copy(items);
            $scope.listName = name;
            var modalInstance = $modal.open({
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                windowClass: 'center-modal',
                resolve: {
                    items: function() {
                        return $scope.items;
                    },
                    listName: function() {
                        return $scope.listName;
                    }
                }
            });

            modalInstance.result.then(function(listName) {
                $scope.refresh(undefined, listName);
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.$watch('article.color', function() {
            if ($scope.article.color) {
                var colorNameArray = ntc.name($scope.article.color);
                $scope.article.colorName = (colorNameArray[2]) ? colorNameArray[1] : colorNameArray[1] + ' (Approx.)';
            }
        });

        $scope.$watch('article.startDate', function() {
            if ($scope.article.startDate) {
                $scope.article.startDate
            }
        });

    })

// Second controller 
// Modal 
.controller('ModalInstanceCtrl', function($scope, $modalInstance, $http, items, listName) {
    $scope.items = items;
    var itemsBackup = angular.copy(items);
    $scope.listName = listName;
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.numberOfPages = function() {
        return Math.ceil($scope.items.length / $scope.pageSize);
    }

    // todo à corriger
    $('[data-toggle="confirmation"]').confirmation();

    $scope.add = function() {
        $scope.items.push($scope.newItem);
        $scope.newItem = undefined;
    };

    $scope.delete = function(index) {
        $scope.items.splice(index, 1);
    };

    $scope.ok = function() {
        $http.put('/api/lists/' + $scope.listName, $scope.items).success(function(data) {});
        $modalInstance.close(listName);
    };

    $scope.cancel = function() {
        $modalInstance.close(listName);
    };

})