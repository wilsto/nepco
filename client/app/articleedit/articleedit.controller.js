'use strict';

angular.module('nepcoApp')
    .controller('ArticleeditCtrl', function($scope, $http, $stateParams, $location, $modal, $log, photoServices) {

        $scope.article = {};
        $scope.article.materials = [];
        $scope.article.presence = [];

        $scope.uploadPhotos = function() {

            cloudinary.openUploadWidget({
                    cloud_name: 'imguploadstorage',
                    upload_preset: 'kippme',
                    folder: $scope.article.brand,
                    tags: $scope.article.EAN13,
                },
                function(error, result) {
                    
                    $scope.loadPhotos();
                });

        };

        $scope.load = function() {
            if ($stateParams.id) {

                $scope.article.departement = undefined;
                $http.get('/api/articles/' + $stateParams.id).success(function(article) {
                    $scope.article = article[0];
                    $scope.loadPhotos();
                });
            } else {
                $scope.article = {
                    name: ''
                };

            }
        };
        $scope.load();

        $scope.loadPhotos = function() {
            if ($scope.article.EAN13 && $scope.article.EAN13.length > 0) {
                var url = $.cloudinary.url($scope.article.EAN13, {
                    format: 'json',
                    type: 'list'
                });

                $scope.photos = [];
                $http.get(url + "?" + Math.ceil(new Date().getTime() / 1000)).success(function(photos) {
                    $scope.photos = photos.resources;
                    
                    if ($scope.photos.length > 0) {
                        $scope.article.photoLink = 'http://res.cloudinary.com/imguploadstorage/image/upload/c_fit,h_150,q_80/v1/' + $scope.photos[0].public_id + '.' + $scope.photos[0].format;
                    }
                });
            } else {
                $scope.photos = [];
            }
        }

        $scope.$watch('article.EAN13', function() {
            $scope.loadPhotos();
        });

        $scope.save = function() {
            if (typeof $scope.article._id === 'undefined') {
                $http.post('/api/articles', $scope.article).success(function(data) {
                    $location.path('/article/' + data.EAN13);
                });
            } else {
                $http.put('/api/articles/' + $scope.article._id, $scope.article).success(function(data) {
                    $location.path('/article/' + data.EAN13);
                });
            }
        };

        $scope.cancel = function() {
            if (typeof $scope.article._id === 'undefined') {
                $location.path('/articles');
            } else {
                $location.path('/article/' + $scope.article.EAN13);
            }
        };

        $scope.refresh = function(query, listName) {
            $http.get('/api/lists/' + listName).then(
                function(response) {
                    $scope[listName.substring(0, 1).toLowerCase() + listName.substring(1) + 's'] = (response.data[0]) ? response.data[0].list : [];
                }, function() {

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