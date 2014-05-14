'use strict';


/**
 * Modal Window Directive
 *
 * Depending on modal type will load the appropriate template partial into the modal element.
 *
 * @class digireaderModal
 * @namespace directives
 */
app.directive('digireaderModal', function ($rootScope, $templateCache, $compile, $timeout) {
        return {
            template: $templateCache.get('modal/modal.html'),
            restrict: 'E',
            link: function postLink(scope, element, attrs) {
                var template = $templateCache.get( 'modal/modal_image.html' );

                scope.$watch('modalElement',function (newElement, oldElement) {
                    console.log('ELEMENT CHANGED ', newElement, oldElement);
                    if(newElement) {
                        switch( newElement.type) {
                            case 'modal_alpha_base':
                                template = $templateCache.get( 'modal/modal_alpha_base.html' );
                                break;
                            case 'modal_carousel':
                                console.log('modal_carousel : instantiated');
                                scope.carouselIndex = 0;
                                template = $templateCache.get( 'modal/modal_carousel.html' );
                                break;
                            case 'modal_gif':
                                template = $templateCache.get( 'modal/modal_gif.html' );
                                break;
                            case 'modal_image':
                                template = $templateCache.get( 'modal/modal_image.html' );
                                break;
                            case 'modal_video':
                                template = $templateCache.get( 'modal/modal_video.html' );
                                break;
                            case 'modal_content':
                                template = $templateCache.get( 'modal/modal_content.html' );
                                break;
                        }

                        console.log('CURRENT TEMPLATE ', template);
                        element.find('modal-element').replaceWith( $compile(template)(scope) );

                        $timeout(function(){
                            if(element.find('video').length>0){
                                element.find('video').eq(0)[0].play();
                            }

                        });



                    } else {
                        if( oldElement ) {
                            angular.element(element.children().children().children().children()[1]).replaceWith( angular.element('<modal-element/>') );
                        }
                    }
                });

                /**
                 * Close modal and if video remove video element src
                 * 
                 * @method closeBox
                 * @return {undefined}
                 */
                scope.closeBox = function() {
                    if(element.find('video').length>0){
                        element.find('video').eq(0)[0].pause();
                        scope.videoMp4 ='';
                        scope.videoWebM ='';
                        scope.$broadcast('$destroy');
                    }
                    $rootScope.modalElement = undefined;
                };

                /**
                 * Go to next item in carousel list
                 *
                 * @method carouselNext
                 * @return {undefined}
                 */
                scope.carouselNext = function(){
                    console.log('carouselNext ');
                    if(scope.index < scope.element.elements.length - 1)
                    {
                        scope.index = scope.index + 1;
                    }
                };

                /**
                 * Go to previous item in carousel list
                 * 
                 * @method 
                 * @return {undefined}
                 */
                scope.carouselPrevious = function(){
                    console.log('carouselPrevious ');
                    if(scope.index > 0)
                    {
                        scope.index = scope.index - 1;
                    }
                };

                /**
                 * Get source of video for that video type
                 * 
                 * @method getVideoSrc
                 * @param  {Array} inArray video sources
                 * @param  {String} inType  video type
                 * @return {undefined}
                 */
                var getVideoSrc = function(inArray,inType){
                    var src;
                    var n = inArray.length;
                    for(var i=0; i < n; i++){
                        if(inArray[i].type === inType){
                            src =  inArray[i].url;
                        }
                    }
                    return src;
                }

                /**
                 * Update video src for different video types
                 * 
                 * @event $watch modalElement
                 * @return {undefined}
                 */
                $rootScope.$watch('modalElement', function(newValue){
                    scope.element = newValue;
                    if(scope.element)
                    {
                        switch(scope.element.type){
                            case 'modal_video':
                                scope.videoMp4 = getVideoSrc(scope.element.assets,'mp4');
                                scope.videoWebM = getVideoSrc(scope.element.assets,'webm');
                                break;
                        }
                    }

              });
            }
        };
    });
