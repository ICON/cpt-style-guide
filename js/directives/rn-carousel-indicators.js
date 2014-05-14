'use strict';

/**
 * Carousel Indicators Template Directive
 *
 * @class rnCarouselIndicators
 * @namespace directives
 */
app.directive('rnCarouselIndicators', [function($rootScope) {
  return {
    restrict: 'A',
    replace: true,
    scope: {
      items: '=',
      index: '='
    },
    link: function(scope, element, attrs) {

        scope.testClick = function(item, parent){
          parent.$parent.carouselCollection.goToIndex(item.position , true);
        };

    },
    template: '<div class="rn-carousel-indicator">' +
                '<span class="carousel-pagination" ng-click="testClick(item,$parent)" ng-repeat="item in items" ng-class="{active: $index==$parent.index}"></span>' +
              '</div>'
  };
}]);
