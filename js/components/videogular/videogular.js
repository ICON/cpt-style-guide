"use strict";
var videogular = angular.module("com.2fdevs.videogular", ["ngSanitize"]);

videogular.run(function(VG_UTILS) {
		// Native fullscreen polyfill
		var fullScreenAPI;
		var APIs = {
			w3: {
				enabled: "fullscreenEnabled",
				element: "fullscreenElement",
				request: "requestFullscreen",
				exit:    "exitFullscreen",
				onloadedmetadata: "loadedmetadata",
				onchange: "fullscreenchange",
				onerror:  "fullscreenerror"
			},
			newWebkit: {
				enabled: "webkitFullscreenEnabled",
				element: "webkitFullscreenElement",
				request: "webkitRequestFullscreen",
				exit:    "webkitExitFullscreen",
				onloadedmetadata: "loadedmetadata",
				onchange: "webkitfullscreenchange",
				onerror:  "webkitfullscreenerror"
			},
			oldWebkit: {
				enabled: "webkitIsFullScreen",
				element: "webkitCurrentFullScreenElement",
				request: "webkitRequestFullScreen",
				exit:    "webkitCancelFullScreen",
				onloadedmetadata: "loadedmetadata",
				onchange: "webkitfullscreenchange",
				onerror:  "webkitfullscreenerror"
			},
			moz: {
				enabled: "mozFullScreen",
				element: "mozFullScreenElement",
				request: "mozRequestFullScreen",
				exit:    "mozCancelFullScreen",
				onloadedmetadata: "loadedmetadata",
				onchange: "mozfullscreenchange",
				onerror:  "mozfullscreenerror"
			},
			ios: {
				enabled: "webkitFullscreenEnabled",
				element: "webkitFullscreenElement",
				request: "webkitEnterFullscreen",
				exit: undefined,
				onexit: "webkitendfullscreen",
				onloadedmetadata: "loadedmetadata",
				onchange: "webkitfullscreenchange",
				onerror:  "webkitfullscreenerror"
			}
		};

		for (var browser in APIs) {
			if (APIs[browser].enabled in document) {
				fullScreenAPI = APIs[browser];
				fullScreenAPI.isFullScreen = function () {
					return (document[this.element] != null);
				};

				break;
			}
		}

		// Override APIs on iOS
		if (VG_UTILS.isiOSDevice()) {
			fullScreenAPI = APIs.ios;
			fullScreenAPI.isFullScreen = function () {
				return (document[this.element] != null);
			};
		}

		window.fullScreenAPI = fullScreenAPI;
	}
);

videogular.service("VG_UTILS", function() {
		this.fixEventOffset = function($event) {
			/**
			 * There's no offsetX in Firefox, so we fix that.
			 * Solution provided by Iaz Brannigan's answer in this thread:
			 * http://stackoverflow.com/questions/11334452/event-offsetx-in-firefox
			 * @param $event
			 * @returns {*}
			 */
			if (navigator.userAgent.match(/Firefox/i)) {
				$event.offsetX = $event.layerX - $event.currentTarget.offsetLeft;
				$event.offsetY = $event.layerY;
			}

			return $event;
		};

		// Very simple mobile detection, not 100% reliable
		this.isMobileDevice = function() {
			return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf("IEMobile") !== -1);
		};

		this.isiOSDevice = function() {
			return (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i));
		};
	}
);

videogular.constant("VG_STATES",
	{
		PLAY: "play",
		PAUSE: "pause",
		STOP: "stop"
	}
);

videogular.constant("VG_THEMES",
	{
		PLAY: "&#xe020;",
		PAUSE: "&#xe021;",
		VOLUME_LEVEL_3: "&#xe022;",
		VOLUME_LEVEL_2: "&#xe023;",
		VOLUME_LEVEL_1: "&#xe024;",
		VOLUME_LEVEL_0: "&#xe025;",
		VOLUME_MUTE: "&#xe026;",
		ENTER_FULLSCREEN: "&#xe027;",
		EXIT_FULLSCREEN: "&#xe028;"
	}
);

videogular.constant("VG_EVENTS",
	{
		ON_PLAY: "onVgPlay",
		ON_PAUSE: "onVgPause",
		ON_PLAY_PAUSE: "onVgPlayPause",
		ON_START_PLAYING: "onVgStartPlaying",
		ON_COMPLETE: "onVgComplete",
		ON_SET_STATE: "onVgSetState",
		ON_SET_VOLUME: "onVgSetVolume",
		ON_TOGGLE_FULLSCREEN: "onVgToggleFullscreen",
		ON_ENTER_FULLSCREEN: "onVgEnterFullscreen",
		ON_EXIT_FULLSCREEN: "onVgExitFullscreen",
		ON_BUFFERING: "onVgBuffering",
		ON_UPDATE_TIME: "onVgUpdateTime",
		ON_SEEK_TIME: "onVgSeekTime",
		ON_UPDATE_SIZE: "onVgUpdateSize",
		ON_UPDATE_THEME: "onVgUpdateTheme",
		ON_PLAYER_READY: "onVgPlayerReady",
		ON_LOAD_POSTER: "onVgLoadPoster"
	}
);

videogular.directive("videogular", function(VG_STATES, VG_EVENTS, VG_UTILS, BrowserDetectService) {
		return {
			restrict: "AE",
			link: {
				pre: function (scope, elem, attrs) {
					function getVideoSize(w, h) {
						var percentageWidth;
						var percentageHeight;
						var result = {};
						result.width = w;
						result.height = h;

						switch (currentStretch) {
							case "fit":
								percentageWidth = w * 100 / videoElement[0].videoWidth;
								result.height = videoElement[0].videoHeight * percentageWidth / 100;
								break;

							case "fill":
								percentageHeight = h * 100 / videoElement[0].videoHeight;
								result.width = videoElement[0].videoWidth * percentageHeight / 100;
								break;

							case "none":
								result.width = videoElement[0].videoWidth;
								result.height = videoElement[0].videoHeight;
								break;
						}

						return result;
					}

					function updateSize()
					{
						var videoSize;
						var playerWidth = currentWidth;
						var playerHeight = currentHeight;
						var videoTop;
						var videoLeft;

						if (window.fullScreenAPI && window.fullScreenAPI.isFullScreen()) {
							videoSize = getVideoSize(window.screen.width, window.screen.height);

							elementScope.css("width", parseInt(window.screen.width, 10) + "px");
							elementScope.css("max-width", parseInt(videoSize.width, 10) + "px");
							elementScope.css("height", parseInt(window.screen.height, 10) + "px");


							playerWidth = window.screen.width;
							playerHeight = window.screen.height;
						}
						else {
							videoSize = getVideoSize(currentWidth, currentHeight);

							elementScope.css("width", parseInt(currentWidth, 10) + "px");
							elementScope.css("max-width", parseInt(videoSize.width, 10) + "px");
							elementScope.css("height", parseInt(currentHeight, 10) + "px");

						}

						if (videoSize.width == 0) videoSize.width = currentWidth;
						if (videoSize.height == 0) videoSize.height = currentHeight;

						videoLeft = (playerWidth - videoSize.width) / 2;
						videoTop = (playerHeight - videoSize.height) / 2;

						videoElement.attr("width", parseInt(videoSize.width, 10));
						videoElement.attr("height", parseInt(videoSize.height, 10));
						videoElement.attr("height", parseInt(videoSize.height, 10));
						var videlElementHeight = parseInt(videoSize.height, 10);
						if(videlElementHeight > 0  && BrowserDetectService.browser === "Safari") {
							
							videoElement.css("height", videlElementHeight + "px");
						}
						videoElement.css("width", parseInt(videoSize.width, 10) + "px");
						videoElement.css("top", videoTop + "px");
						videoElement.css("left", videoLeft + "px");

						scope.$emit(VG_EVENTS.ON_UPDATE_SIZE, [playerWidth, playerHeight]);
					}

					function onSeekTime(target, params)
					{
						videoElement[0].currentTime = params[0];
					}

					function onUpdateTime(event)
					{
						scope.$emit(VG_EVENTS.ON_UPDATE_TIME, [event.target.currentTime, event.target.duration]);
						scope.$apply();
					}

					function onToggleFullscreen($event) {
						if (window.fullScreenAPI.isFullScreen()) {
							if (!VG_UTILS.isMobileDevice()) {
								document[window.fullScreenAPI.exit]();
							}
						}
						else {
							// On mobile devices we should make fullscreen only the video object
							if (VG_UTILS.isMobileDevice()) {
								// On iOS we should check if user pressed before fullscreen button
								// and also if metadata is loaded
								if (VG_UTILS.isiOSDevice()) {
									if (isMetaDataLoaded) {
										enterElementInFullScreen(videoElement[0]);
									}
									else {
										isFullScreenPressed = true;
										onPlay(null);
									}
								}
								else {
									enterElementInFullScreen(videoElement[0]);
								}
							}
							else {
								enterElementInFullScreen(elementScope[0]);
							}
						}
					}

					function enterElementInFullScreen(element) {
						element[window.fullScreenAPI.request]();
					}

					function onSetVolume(target, params) {
						videoElement[0].volume = params[0];
						localStorage["vgVolume"] = params[0];
						scope.$apply();
					}

					function onPlayPause(event) {
                        console.log('onPlayPause ', videoElement[0].paused);
						if (videoElement[0].paused) {
							videoElement[0].play();
							scope.$emit(VG_EVENTS.ON_PLAY);
						}
						else {
							videoElement[0].pause();
							scope.$emit(VG_EVENTS.ON_PAUSE);
						}
					}

					function onPlay(event) {

						videoElement[0].play();
						setState(VG_STATES.PLAY);
					}

					function onPause(event) {
						videoElement[0].pause();
						setState(VG_STATES.PAUSE);
					}

					function onStartBuffering(event){
                        console.log('onStartBuffering ');
						scope.$emit(VG_EVENTS.ON_BUFFERING);
						scope.$apply();
					}

					function onComplete(event){

                        if( scope.loop ) {
                            onPlay(event);
                        } else {
                            setState(VG_STATES.STOP);
                            scope.$emit(VG_EVENTS.ON_COMPLETE);
                        }
						scope.$apply();
					}

					function onStartPlaying(event){
						// Chrome fix: Chrome needs to update the video tag size or it will show a white screen
						event.target.width++;
						event.target.width--;

						if (currentWidth <= 0 || currentHeight <= 0) {
							onResizeBrowser();
						}
                        setState(VG_STATES.PLAY);
						scope.$emit(VG_EVENTS.ON_START_PLAYING, [event.target.duration]);

						scope.$apply();
					}

					function setState(newState) {
						state = newState;
						scope.$emit(VG_EVENTS.ON_SET_STATE, [state]);
						scope.$apply();
					}

					function onUpdateSize(w, h) {
						currentWidth = w;
						currentHeight = h;
						updateSize();
					}

					function onUpdateStretchMode(value) {
						currentStretch = value;
						updateSize();
					}

					function onElementReady() {
						videoElement[0].addEventListener(window.fullScreenAPI.onloadedmetadata, onLoadedMetaData);

						if (isMetaDataLoaded) {
							scope.isPlayerReady = true;
							scope.$emit(VG_EVENTS.ON_PLAYER_READY);
							updateSize();
						}
					}

					function onFullScreenChange(event) {
						if (window.fullScreenAPI.isFullScreen()) {
							scope.$emit(VG_EVENTS.ON_ENTER_FULLSCREEN);
						}
						else {
							scope.$emit(VG_EVENTS.ON_EXIT_FULLSCREEN);
						}

						updateSize();
						scope.$apply();
					}

					function onLoadedMetaData() {
						if (isResponsive) {
							var percentWidth = elementScope[0].parentNode.clientWidth * 100 / videoElement[0].videoWidth;
							var videoHeight = videoElement[0].videoHeight * percentWidth / 100;
							currentWidth = elementScope[0].parentNode.clientWidth;
							currentHeight = videoHeight;
						}

						isMetaDataLoaded = true;

						if (isFullScreenPressed) {
							enterElementInFullScreen(videoElement[0]);
							isFullScreenPressed = false;
						}

						onElementReady();
					}

					function onResizeBrowser() {
						var percentWidth = elementScope[0].parentNode.clientWidth * 100 / videoElement[0].videoWidth;
						var videoHeight = videoElement[0].videoHeight * percentWidth / 100;
						currentWidth = elementScope[0].parentNode.clientWidth;
						currentHeight = videoHeight;

						updateSize();
					}
                    function onDestroy(){

                        /*
                        angular.element(videoElement[0]).unbind('waiting');
                        angular.element(videoElement[0]).unbind('playing');
                        angular.element(videoElement[0]).unbind('timeupdate');
                         */
                        videoElement[0].removeEventListener("waiting", onStartBuffering, false);
                        videoElement[0].removeEventListener("ended", onComplete, false);
                        videoElement[0].removeEventListener("playing", onStartPlaying, false);
                        videoElement[0].removeEventListener("timeupdate", onUpdateTime, false);
                        angular.element(videoElement[0]).remove();

                    }
					scope.onChangeWidth = function (value) {
						onUpdateSize(value, currentHeight);
					};

					scope.onChangeHeight = function (value) {
						onUpdateSize(currentWidth, value);
					};

					scope.onChangeStretchMode = function (value) {
						onUpdateStretchMode(value);
					};


					var elementScope = angular.element(elem);
					var videoElement = elementScope.find("video");
					var currentWidth = 0;
					var currentHeight = 0;
					var currentStretch = "fit";
					var state = VG_STATES.STOP;
					var isFullScreenPressed = false;
					var isMetaDataLoaded = false;
					var isResponsive = false;

					if (attrs.vgWidth == undefined || attrs.vgHeight == undefined) {
						isResponsive = true;
						window.onresize = onResizeBrowser;
					}
					else {
						currentWidth = attrs.vgWidth;
						currentHeight = attrs.vgHeight;
					}

					scope.videoElement = videoElement;
					scope.videogularElement = elementScope;
					scope.isPlayerReady = false;

					elementScope[0].style.width = currentWidth;
					elementScope[0].style.height = currentHeight;

					videoElement[0].addEventListener("waiting", onStartBuffering, false);
					videoElement[0].addEventListener("ended", onComplete, false);
					videoElement[0].addEventListener("playing", onStartPlaying, false);
					videoElement[0].addEventListener("timeupdate", onUpdateTime, false);

					if (window.fullScreenAPI) {
						document.addEventListener(window.fullScreenAPI.onchange, onFullScreenChange);
					}

					elementScope.ready(onElementReady);

					scope.$on(VG_EVENTS.ON_PLAY, onPlay);
					scope.$on(VG_EVENTS.ON_PAUSE, onPause);
					scope.$on(VG_EVENTS.ON_PLAY_PAUSE, onPlayPause);
					scope.$on(VG_EVENTS.ON_TOGGLE_FULLSCREEN, onToggleFullscreen);
					scope.$on(VG_EVENTS.ON_SET_VOLUME, onSetVolume);
					scope.$on(VG_EVENTS.ON_SEEK_TIME, onSeekTime);
                    scope.$on('$destroy', onDestroy);
				}
			}
		}
	}
);

videogular.directive("vgWidth", function() {
		return {
			restrict: "A",
			link: function (scope, elem, attrs) {
				function updateSize(value) {
					scope.onChangeWidth(value);
				}

				if (attrs.vgWidth) {
					// Watch for a model
					if (isNaN(parseInt(attrs.vgWidth))) {
						scope.$watch(attrs.vgWidth, function(value) {
							updateSize(value);
						});
					}
					else {
						updateSize(attrs.vgWidth);
					}
				}

			}
		}
	}
);

videogular.directive("vgHeight", function() {
		return {
			restrict: "A",
			link: function (scope, elem, attrs) {
				function updateSize(value) {
					scope.onChangeHeight(value);
				}

				if (attrs.vgHeight) {
					// Watch for a model
					if (isNaN(parseInt(attrs.vgHeight))) {
						scope.$watch(attrs.vgHeight, function(value) {
							updateSize(value);
						});
					}
					else {
						updateSize(attrs.vgHeight);
					}
				}

			}
		}
	}
);

videogular.directive("vgTheme", function(VG_EVENTS) {
		return {
			restrict: "A",
			link: function (scope, elem, attrs) {
				function updateTheme(value) {
					if (currentTheme) {
						// Remove previous theme
						var links = document.getElementsByTagName("link");
						for (var i=0, l=links.length; i<l; i++) {
							if (links[i].outerHTML.indexOf(currentTheme) >= 0) {
								links[i].parentNode.removeChild(links[i]);
							}
						}
					}

					var headElem = angular.element(document).find("head");
					headElem.append("<link rel='stylesheet' href='" + value + "'>");

					currentTheme = value;

					scope.$emit(VG_EVENTS.ON_UPDATE_THEME);
				}

				var currentTheme;

				if (attrs.vgTheme) {
					// Watch for a model
					if (attrs.vgTheme.indexOf(".css") < 0) {
						scope.$watch(attrs.vgTheme, function(value) {
							updateTheme(value);
						});
					}
					// Inject theme
					else {
						updateTheme(attrs.vgTheme);
					}
				}

			}
		}
	}
);

videogular.directive("vgAutoplay", function(VG_EVENTS) {
		return {
			restrict: "A",
			link: function (scope, elem, attrs) {
				function onPlayerReady() {
					if (autoplay) {
						scope.$emit(VG_EVENTS.ON_PLAY);
					}
				}

				function onPlay() {
					if (onPlayerReadyListener) onPlayerReadyListener();
					if (onPlayListener) onPlayListener();
				}

				var autoplay = (attrs.vgAutoplay === "true" || attrs.vgAutoplay === true);
				var onPlayerReadyListener;
				var onPlayListener;

				// It doesn't make any sense to add a watcher here
				if (autoplay) {
					if (!scope.isPlayerReady) {
						if (onPlayerReadyListener) onPlayerReadyListener();
						onPlayerReadyListener = scope.$on(VG_EVENTS.ON_PLAYER_READY, onPlayerReady);
						onPlayListener = scope.$on(VG_EVENTS.ON_PLAY, onPlay);
					}
					else {
						onPlayerReady();
					}
				}
			}
		}
	}
);

// Image poster in HTML5 video element
videogular.directive("vgPoster", function () {
		return {
			restrict: "A",
			link: function (scope, elem, attrs) {
				function updatePoster(value) {
					scope.videoElement.attr("poster", value);
				}

				if (attrs.vgPoster.indexOf(".jpg") > 0 ||
						attrs.vgPoster.indexOf(".jpeg") > 0 ||
						attrs.vgPoster.indexOf(".png") > 0 ||
						attrs.vgPoster.indexOf(".gif") > 0 ||
						attrs.vgPoster.indexOf("/") > 0) {
					updatePoster(attrs.vgPoster);
				}
				else {
					scope.$watch(attrs.vgPoster, function(value) {
						updatePoster(value);
					});
				}
			}
		}
	}
);

videogular.directive("vgVideoStretch", function() {
		return {
			restrict: "A",
			link: function(scope, elem, attrs) {
				function updateStretch(value) {
					scope.onChangeStretchMode(value);
				}

				if (attrs.vgVideoStretch === "none" ||
					attrs.vgVideoStretch === "fit" ||
					attrs.vgVideoStretch === "fill") {
					updateStretch(attrs.vgVideoStretch);
				}
				else {
					scope.$watch(attrs.vgVideoStretch, function(value) {
						updateStretch(value);
					});
				}
			}
		}
	}
);
videogular.directive("vgLoop", function(VG_EVENTS) {
        return {
            restrict: "A",
            link: function (scope, elem, attrs) {
                scope.loop = (attrs.vgLoop === "true" || attrs.vgLoop === true);
            }
        }
    }
);


