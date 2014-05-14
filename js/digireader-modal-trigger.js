/**
 * Modal Trigger Template Directive
 *
 * @class digireaderModalTrigger
 */
app.directive('digireaderModalTrigger', function ($rootScope,Analytics) {
    return {
      template: '<div tabindex="50" ng-transclude class="tool-tip"><span class="ux-icon icon-info icon-small"></span></div>',
      transclude: true,
      scope: {
        target: '@'
      },
      restrict: 'E',
      link: function postLink(scope, element, attrs) {

        /**
         * On element click open modal
         *
         * @event click
         * @return {[type]} [description]
         */
        element.bind('click',function(){
          var elements = $rootScope.appDocument.chapter.page.elements;
          element = elements.filter( function( element ) { return element.content == scope.target; } )[0];
          if( element ) {
            scope.loadModal( element );
            Analytics.trackEvent('modal_spawned', 'element',element);
          }
        });

        /**
         * Add element to modal rootScope
         * 
         * @method loadModal
         * @param  {object} element current element
         * @return {undefined}
         */
        scope.loadModal = function( element ){
          $rootScope.$apply(function(){
            $rootScope.modalElement = element;
          })
        };
      }
    };
  });
