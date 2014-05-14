app.run(['$templateCache', function($templateCache) {

  console.log('Loading: template.js');

  $templateCache.put('partials/document/element/modal_alpha_base.html',
    "<div tabindex=51 class=\"image-with-border modal-alpha-base modal-trigger {{element.identifier}}\" ng-click=expandModal(element)><img ng-src={{element.asset}} ng-show=element.asset> <span class=\"ux-button square ux-icon modal-controls expand icon-expand {{element.identifier}}\"></span></div>"
  );


  $templateCache.put('partials/document/element/modal_carousel.html',
    "<div tabindex=51 class=\"image-with-border modal-trigger {{element.identifier}}\" ng-click=expandModal(element)><div class=modal-image-container><img ng-src={{element.elements[0].asset}} ng-show=element.elements[0].asset> <span class=\"ux-button square ux-icon modal-controls expand icon-expand {{element.identifier}}\"></span></div></div>"
  );


  $templateCache.put('partials/document/element/modal_gif.html',
    "<div tabindex=51 class=\"image-with-border modal-trigger {{element.identifier}}\" ng-click=expandModal(element)><img ng-src={{element.poster}} ng-show=element.poster> <span class=\"ux-button ux-icon modal-controls expand icon-expand {{element.identifier}}\"></span></div>"
  );


  $templateCache.put('partials/document/element/modal_image.html',
    "<div tabindex=51 class=\"image-with-border {{element.identifier}}\"><div class=\"modal-image-container modal-trigger\" ng-click=expandModal(element)><img ng-src=\"{{ element.asset }}\" ng-show=element.asset ng-src-responsive=\"[ \n" +
    "\t\t\t[ 'mobile', element.assetsUrl['mobile'] ],\n" +
    "\t\t\t[ 'retina_mobile', element.assetsUrl['retina_mobile'] ],\n" +
    "\t\t\t[ 'tablet', element.assetsUrl['tablet'] ],\n" +
    "\t\t\t[ 'landscape_tablet', element.assetsUrl['landscape_tablet'] ],\n" +
    "\t\t\t[ 'desktop', element.assetsUrl['desktop'] ],\n" +
    "\t\t\t[ 'retina_tablet', element.assetsUrl['retina_tablet'] ]\n" +
    "        ]\"> <span class=\"ux-button square ux-icon modal-controls expand icon-expand {{element.identifier}}\"></span></div></div>"
  );


  $templateCache.put('partials/document/element/modal_video.html',
    "<div tabindex=51 class=\"image-with-border modal-trigger {{element.identifier}}\" ng-click=expandModal(element)><div class=modal-image-container><img width=600 height=400 ng-src={{element.poster}} ng-src-responsive=\"[ [ '(min-width: 960px)', element.poster ], [ '(min-width: 1700px)', element.poster ] ]\" ng-show=element.poster> <span class=\"ux-button circle ux-icon modal-controls video icon-downArrow {{element.identifier}}\"></span></div></div>"
  );



  $templateCache.put('modal/modal.html',
    "<div class=modal-container ng-show=modalElement close-keypress-event=\"\"><div class=detail-wrapper><div class=detailbox><div class=detail-header ng-click=closeBox()><span tabindex=0 class=\"closeicon icon-close\" ng-click=closeBox()></span></div><modal-element></modal-element></div></div><div class=hide-modal ng-click=closeBox()></div></div>"
  );


  $templateCache.put('modal/modal_alpha_base.html',
    "<div class=modal-content><ul rn-carousel=\"\" rn-carousel-index=\"\" rn-carousel-watch=\"\" rn-carousel-buffered=\"\" rn-carousel-indicator=true><li ng-repeat=\"base in element.elements\"><img class=rn-carousel-image src={{base.asset}}></li><img class=rn-carousel-image src={{base.asset}}></ul></div>"
  );


  $templateCache.put('modal/modal_carousel.html',
    "<div class=modal-content><ul rn-carousel=\"\" rn-carousel-index=index rn-carousel-buffered=\"\" rn-carousel-indicator=true><li class=rn-carousel-image-container ng-repeat=\"carousel in element.elements\"><img class=rn-carousel-image ng-src={{carousel.asset}}> <a tabindex=1 class=\"ux-button square ux-icon carousel-left icon-leftArrow\" ng-click=carouselPrevious()></a> <a tabindex=2 class=\"ux-button square ux-icon carousel-right icon-rightArrow\" ng-click=carouselNext()></a></li></ul></div>"
  );


  $templateCache.put('modal/modal_content.html',
    "<div class=modal-content><element ng-repeat=\"element in element.elements\" element=element element-type={{element.type}}></div>"
  );


  $templateCache.put('modal/modal_gif.html',
    "<span class=modal-content><img ng-src={{element.asset}}></span>"
  );


  $templateCache.put('modal/modal_image.html',
    "<div class=modal-content><img ng-src=\"{{ element.asset }}\" ng-show=element.asset class={{element.identifier}} ng-src-responsive=\"[ \n" +
    "\t\t\t[ 'mobile', element.assetsUrl['mobile'] ],\n" +
    "\t\t\t[ 'retina_mobile', element.assetsUrl['desktop'] ],\n" +
    "\t\t\t[ 'tablet', element.assetsUrl['retina_mobile'] ],\n" +
    "\t\t\t[ 'landscape_tablet', element.assetsUrl['landscape_tablet'] ],\n" +
    "\t\t\t[ 'desktop', element.assetsUrl['original'] ],\n" +
    "\t\t\t[ 'retina_tablet', element.assetsUrl['original'] ]\n" +
    "        ]\"></div>"
  );

  $templateCache.put('modal/modal_video.html',
    "<div class=modal-content><div videogular=\"\" vg-loop=true vg-video-stretch=none><video class=videoPlayer preload=metadata><source ng-src={{videoMp4}} type=video/mp4><source ng-src={{videoWebM}} type=video/webm></video><div vg-buffering=\"\"></div><div vg-overlayplay=\"\"></div><div vg-controls=\"\" vg-autohide=false style=\"height: 50px\"><div vg-playpausebutton=\"\"></div><div class=vg-time-container><div vg-timedisplay=\"\">{{ currentTime }}</div><div vg-timedisplay=\"\">{{ totalTime }}</div></div><div vg-volume=\"\"><div vg-mutebutton=\"\"></div></div></div></div></div>"
  );


  $templateCache.put('partials/document/element/audio_player.html',
    "<span class=\"audio_player {{element.identifier}}\"></span>"
  );


  $templateCache.put('partials/document/element/body_head.html',
    "<h3 class=\"bhead {{element.identifier}}\" digireader-dynamic-html=element.content></h3>"
  );


  $templateCache.put('partials/document/element/body_normal.html',
    "<p class=\"body-normal {{element.identifier}}\" digireader-dynamic-html=element.content></p>"
  );


  $templateCache.put('partials/document/element/control_item.html',
    "<div class=body-control-container><dl class=body-control><dt class=\"body-control-title {{element.elements[0].identifier}}\" digireader-dynamic-html=element.content></dt><dd class=\"body-control-action {{element.elements[0].identifier}}\" digireader-dynamic-html=element.elements[0].content></dd></dl></div>"
  );


  $templateCache.put('partials/document/element/external_link.html',
    "<a class=\"body-hyperlink {{element.identifier}}\" ng-href=element.url>{{element.content}}</a>"
  );

  $templateCache.put('partials/document/element/gif.html',
    "<div class=\"inline-gif-container {{element.identifier}}\"><img ng-src={{element.asset}} ng-show=element.asset></div>"
  );


  $templateCache.put('partials/document/element/image.html',
    "<span class=body-image><img ng-src=\"{{ element.asset }}\" ng-show=element.asset class={{element.identifier}} ng-src-responsive=\"[ \n" +
    "\t\t\t[ 'mobile', element.assetsUrl['mobile'] ],\n" +
    "\t\t\t[ 'retina_mobile', element.assetsUrl['retina_mobile'] ],\n" +
    "\t\t\t[ 'tablet', element.assetsUrl['tablet'] ],\n" +
    "\t\t\t[ 'landscape_tablet', element.assetsUrl['landscape_tablet'] ],\n" +
    "\t\t\t[ 'desktop', element.assetsUrl['desktop'] ],\n" +
    "\t\t\t[ 'retina_tablet', element.assetsUrl['retina_tablet'] ]\n" +
    "        ]\"></span>"
  );



}]);
