/**
 * Injects document content elements into html
 * 
 * @class digireaderDynamicHtml
 */
app
    .directive('digireaderDynamicHtml', function ($rootScope, $compile) {
        return {
            restrict: 'A',
            link: function postLink(scope, element, attrs) {
                scope.$watch(attrs.digireaderDynamicHtml, function(html) {
                    if( html ) {
                        // TODO: when embedded directive is fixed, remove replacement
                       var customHtml= '<span>' + html + '</span>';
                        element.html(customHtml);

                        $compile(element.contents())(scope);
                    }
                });
            }
        };
    });