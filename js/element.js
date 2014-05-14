'use strict';

app.controller('elementCtrl', function($scope, $rootScope) {

  $rootScope.modalElement = null;

  $scope.expandModal = function ( element ) {
    $rootScope.modalElement = element;
    console.log('ROOT MODAL ELEMENT: ', element);
  };

  $scope.mockPhotoModalElement = {
    asset: "http://placekitten.com/800/600",
    assets: [],
    assetsUrl: [],
    elements: [],
    identifier: "",
    position: 0,
    type: "modal_image"
  }

  $scope.mockVideoModalElement = {
    asset: "",
    assets: [
      {
        type: "mp4",
        url: "video/poey.mp4",
      },
      {
        type: "webm",
        url: "video/poey.webm"
      }
    ],
    elements: [],
    identifier: "",
    position: 0,
    poster: "",
    type: "modal_video"
  }

  $scope.mockCarouselModalElement = {
    asset: "http://placekitten.com/810/600",
    assets: [],
    assetsUrl: [],
    elements: [
      {
        asset: "http://placekitten.com/801/600",
        assets: [],
        elements: [],
        identifier: "",
        position: 0,
        type: "modal_alpha_layer"

      },
      {
        asset: "http://placekitten.com/802/600",
        assets: [],
        elements: [],
        identifier: "",
        position: 1,
        type: "modal_alpha_layer"

      },
      {
        asset: "http://placekitten.com/803/600",
        assets: [],
        elements: [],
        identifier: "",
        position: 2,
        type: "modal_alpha_layer"

      }
    ],
    identifier: "",
    position: 0,
    type: "modal_alpha_base"
  };

  $scope.mockModalContent = {
    elements: [
      {
        content: "Modal Content",
        identifier: '',
        type: "body_head"
      },
      {
        content: "Kitty ipsum dolor sit amet, iaculis stuck in a tree dolor lick scratched, puking judging you faucibus suscipit suspendisse. Attack bat justo meow egestas quis, sleep on your face tail flick zzz climb the curtains. Attack dolor accumsan dolor give me fish, non biting attack your ankles iaculis in viverra. Ac shed everywhere chuf rip the couch leap, eat the grass knock over the lamp stretching sollicitudin meow biting. Neque tail flick sleep on your keyboard sagittis purr egestas, meow eat vestibulum orci turpis vehicula meow. Vestibulum sniff fluffy fur libero I don't like that food dolor, et in viverra kittens suspendisse nam. Rutrum enim elit orci turpis vestibulum knock over the lamp, scratched nullam pellentesque quis faucibus puking.",
        identifier: "",
        type: "body_normal"
      },
      {
        content: "",
        asset: "http://placekitten.com/600/400",
        elements: [],
        identifier: "",
        position: 0,
        type: "image"
      }
    ],
    identifier: "",
    position: 0,
    type: "modal_content"
  };

});