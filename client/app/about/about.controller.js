'use strict';

angular.module('nepcoApp')
    .controller('AboutCtrl', function($scope) {
        $scope.message = 'Hello';

        $("#slide-team").owlCarousel({
            items: 1,
            autoPlay: false,
            navigation: true,
            autoHeight: true,
            slideSpeed: 400,
            singleItem: true,
            pagination: false
        });

        $('.carousel').carousel();

    });