'use strict';


/**
 * Document Element Directive
 *
 * Loads the correct partial template based on element type for each element in the document
 * 
 * @class element
 * @namespace directives
 */
app.directive('element', function ($rootScope, $compile, $templateCache) {
    return {
      template: '<span></span>',
      replace: true,
      restrict: 'E',
      scope: {
        element: '=',
        elementType: '@'
      },
      link: function postLink(scope, element, attrs) {
        var template;

        scope.$watch('elementType',function (elementType) {
          if(elementType) {
            switch( elementType ) {
              case 'audio_player':
                template = $templateCache.get( 'partials/document/element/audio_player.html' );
                break;
              case 'body_head':
                template = $templateCache.get( 'partials/document/element/body_head.html' );
                break;
              case 'body_normal':
                template = $templateCache.get( 'partials/document/element/body_normal.html' );
                break;
              case 'control_item':
                template = $templateCache.get( 'partials/document/element/control_item.html' );
                break;
              case 'external_link':
                template = $templateCache.get( 'partials/document/element/external_link.html' );
                break;
              case 'gif':
                template = $templateCache.get( 'partials/document/element/gif.html' );
                break;
              case 'image':
                template = $templateCache.get( 'partials/document/element/image.html' );
                break;
              case 'modal_alpha_base':
                template = $templateCache.get( 'partials/document/element/modal_alpha_base.html' );
                break;
              case 'modal_carousel':
                //scope.carouselIndex = 0;
                template = $templateCache.get( 'partials/document/element/modal_carousel.html' );
                break;
              case 'modal_gif':
                template = $templateCache.get( 'partials/document/element/modal_gif.html' );
                break;
              case 'modal_image':
                template = $templateCache.get( 'partials/document/element/modal_image.html' );
                break;
              case 'modal_video':
                template = $templateCache.get( 'partials/document/element/modal_video.html' );
                break;
              case 'ordered_list':
                template = $templateCache.get( 'partials/document/element/ordered_list.html' );
                break;
              case 'table':
                template = $templateCache.get( 'partials/document/element/table.html' );
                break;
              case 'unordered_list':
                template = $templateCache.get( 'partials/document/element/unordered_list.html' );
                break;
              case 'video':
                template = $templateCache.get( 'partials/document/element/video.html' );
                break;
            }

            element.replaceWith( $compile(template)(scope) );
          }
        });

        if( scope.element.type =='modal_video' || scope.element.type =='video') {
          element.find('video').bind('play', function (){
            if($rootScope.AudioTrack){
              $rootScope.AudioTrack.volume(0.1);
            }
          });
          element.find('video').bind('pause', function (){
            if($rootScope.AudioTrack){
              $rootScope.AudioTrack.volume(0.5);
            }
          });
        } else if ( scope.element.type === 'image' || scope.element.type === 'modal_image' ) {

          // backwards compatability check
          if (scope.element.assets) {
            
            // create a hash array based on image type
            scope.element.assetsUrl = [];
            for (var i = scope.element.assets.length - 1; i >= 0; i--) {
              scope.element.assetsUrl[scope.element.assets[i].version] = scope.element.assets[i].url;
            }

            // if thumbnail available, use that as the default asset image
            if (scope.element.assetsUrl['thumbnail'] !== undefined) {
              scope.element.asset = scope.element.assetsUrl['thumbnail']
            }
          }
        }

        /**
         * Loads object into global modal scope which shows or hides modal window and contents
         *
         * @method expandModal
         * @param  {object} element modal element
         * @return {undefined}
         */
        scope.expandModal = function ( element ) {
            console.log('expandModal ', element);
            $rootScope.modalElement = element;
        };


      } // end of link function
    };
  });