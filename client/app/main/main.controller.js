'use strict';

angular.module('nepcoApp')
    .controller('MainCtrl', function($scope, $http) {

        $http.get('/api/articles/').success(function(articles) {
            $scope.articles = articles;
            $('#slide').camera({
                height: 'auto',
                time: 5000,
                navigation: false,
                navigationHover: false,
                hover: false,
                playPause: false
            });
        });



    }).directive("owlCarousel", function() {
        return {
            restrict: 'E',
            transclude: false,
            link: function(scope) {
                scope.initCarousel = function(element) {
                    // provide any default options you want
                    var defaultOptions = {};
                    var customOptions = scope.$eval($(element).attr('data-options'));
                    // combine the two options objects
                    for (var key in customOptions) {
                        defaultOptions[key] = customOptions[key];
                    }
                    // init carousel
                    $(element).owlCarousel(defaultOptions);
                };
            }
        };
    })
    .directive('owlCarouselItem', [

        function() {
            return {
                restrict: 'A',
                transclude: false,
                link: function(scope, element) {
                    // wait for the last item in the ng-repeat then call init
                    if (scope.$last) {
                        scope.initCarousel(element.parent());
                    }
                }
            };
        }
    ]);