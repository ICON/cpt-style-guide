'use strict';

/**
 * Browser Detection Service
 *
 * @class BrowserDetectService
 * @namespace services
 */

app.factory('BrowserDetectService',
    function () {

    /**
     * Detected OS & browser properties
     * 
     * @property BrowserDetectService
     * @type {Object}
     */
    var BrowserDetectService = {
        init: function () {
            this.browser = this.searchString(this.dataBrowser) || 'An unknown browser';
            this.version = this.searchVersion(navigator.userAgent) ||
                this.searchVersion(navigator.appVersion) ||'an unknown version]';
            this.OS = this.searchString(this.dataOS) || 'an unknown OS';
            var navigator_language = (navigator.userLanguage || navigator.language)
            this.language = navigator_language.substr(0,2) + '_'  + navigator_language.substr(3,2).toUpperCase();//this.language.substr(0,3) + this.language.substr(3,2).toUpperCase();
            this.isRetina = this.retinaEnabled();
            this.viewportSize = {w:this.getViewPortSize('Width'),h:this.getViewPortSize('Height')};
        },

        /**
         * Returns width or height of viewport
         *
         * @method getViewPortSize
         * @param  {string} Name Width or Height
         * @return {array}      
         */
        getViewPortSize: function(Name){
            var size;
            var name = Name.toLowerCase();
            var document = window.document;
            var documentElement = document.documentElement;
            if (window["inner" + Name] === undefined) {
                // IE6 & IE7 don't have window.innerWidth or innerHeight
                size = documentElement["client" + Name];
            }
            else if (window["inner" + Name] != documentElement["client" + Name]) {
                // WebKit doesn't include scrollbars while calculating viewport size so we have to get fancy

                // Insert markup to test if a media query will match document.doumentElement["client" + Name]
                var bodyElement = document.createElement("body");
                bodyElement.id = "vpw-test-b";
                bodyElement.style.cssText = "overflow:scroll";
                var divElement = document.createElement("div");
                divElement.id = "vpw-test-d";
                divElement.style.cssText = "position:absolute;top:-1000px";
                // Getting specific on the CSS selector so it won't get overridden easily
                divElement.innerHTML = "<style>@media(" + name + ":" + documentElement["client" + Name] + "px){body#vpw-test-b div#vpw-test-d{" + name + ":7px!important}}</style>";
                bodyElement.appendChild(divElement);
                documentElement.insertBefore(bodyElement, document.head);

                if (divElement["offset" + Name] == 7) {
                    // Media query matches document.documentElement["client" + Name]
                    size = documentElement["client" + Name];
                }
                else {
                    // Media query didn't match, use window["inner" + Name]
                    size = window["inner" + Name];
                }
                // Cleanup
                documentElement.removeChild(bodyElement);
            }
            else {
                // Default to use window["inner" + Name]
                size = window["inner" + Name];
            }
            return size;
        },

        /**
         * Returns true if retina is enabled
         *
         * @method retinaEnabled
         * @return {boolean}
         */
        retinaEnabled: function(){
            var retinaDisplay = (window.retina || window.devicePixelRatio > 1);
            return retinaDisplay;
        },

        /**
         * Searches for os within array
         *
         * @method searchString
         * @param  {object} data detection data
         * @return {string} OS
         */
        searchString: function (data) {
            for (var i=0;i<data.length;i++) {
                var dataString = data[i].string;
                var dataProp = data[i].prop;
                this.versionSearchString = data[i].versionSearch || data[i].identity;
                if (dataString) {
                    if (dataString.indexOf(data[i].subString) !== -1) {
                        return data[i].identity;
                    }
                }
                else if (dataProp) {
                    return data[i].identity;
                }
            }
        },

        /**
         * Searches version number
         *
         * @method searchVersion
         * @param  {string} dataString 
         * @return {string}            version number
         */
        searchVersion: function (dataString) {
            var index = dataString.indexOf(this.versionSearchString);
            if (index === -1) { return; }
            return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
        },

        /**
         * Browser Dictionary
         *
         * @property dataBrowser
         * @type {Array}
         */
        dataBrowser: [
            {
                string: navigator.userAgent,
                subString: "Chrome",
                identity: "Chrome"
            },
            {   string: navigator.userAgent,
                subString: "OmniWeb",
                versionSearch: "OmniWeb/",
                identity: "OmniWeb"
            },
            {
                string: navigator.vendor,
                subString: "Apple",
                identity: "Safari",
                versionSearch: "Version"
            },
            {
                prop: window.opera,
                identity: "Opera",
                versionSearch: "Version"
            },
            {
                string: navigator.vendor,
                subString: "iCab",
                identity: "iCab"
            },
            {
                string: navigator.vendor,
                subString: "KDE",
                identity: "Konqueror"
            },
            {
                string: navigator.userAgent,
                subString: "Firefox",
                identity: "Firefox"
            },
            {
                string: navigator.vendor,
                subString: "Camino",
                identity: "Camino"
            },
            {       // for newer Netscapes (6+)
                string: navigator.userAgent,
                subString: "Netscape",
                identity: "Netscape"
            },
            {
                string: navigator.userAgent,
                subString: "MSIE",
                identity: "Explorer",
                versionSearch: "MSIE"
            },
            {
                string: navigator.userAgent,
                subString: "Gecko",
                identity: "Mozilla",
                versionSearch: "rv"
            },
            {       // for older Netscapes (4-)
                string: navigator.userAgent,
                subString: "Mozilla",
                identity: "Netscape",
                versionSearch: "Mozilla"
            }
        ],

        /**
         * OS Dictionary
         *
         * @property dataOS
         * @type {Array}
         */
        dataOS : [
            {
                string: navigator.platform,
                subString: "Win",
                identity: "Windows"
            },
            {
                string: navigator.platform,
                subString: "Mac",
                identity: "Mac"
            },
            {
                string: navigator.userAgent,
                subString: "iPhone",
                identity: "iPhone/iPod"
            },
            {
                string: navigator.platform,
                subString: "Linux",
                identity: "Linux"
            },
            {
                string: navigator.userAgent,
                subString: "Mozilla/5.0 (PlayStation 4",
                identity: "ps4"
            },
            {
                string: navigator.userAgent,
                subString: "Mozilla/5.0 (PlayStation Vita",
                identity: "vita"
            }
        ]

    };
    BrowserDetectService.init();
    return BrowserDetectService;
});