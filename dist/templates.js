angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("collection.html","<md-button class=\"md-primary md-raised\" flex flex-md=\"100\" ng-click=\"newEntry($event)\">New</md-button>\r\n<h2>{{collection}} <span class=\"count\" nf-if=\"data\">({{data.length}})</span></h2>\r\n\r\n<div ng-repeat=\"d in data\" class=\"pre-json\">\r\n	<md-button class=\"md-warn md-raised\" ng-click=\"showConfirm($event, d._id)\" flex flex-md=\"100\">Delete</md-button>\r\n	<h3 ng-if=\"d._id\">{{d._id}}</h3>\r\n	<pre class=\"json-container selectable\">{{d | json}}</pre>\r\n</div>");
$templateCache.put("database.html","<md-sidenav layout=\"column\" class=\"md-sidenav-left md-whiteframe-z2\" md-component-id=\"left\" md-is-locked-open=\"$mdMedia(\'gt-md\')\">\r\n      \r\n  <ul class=\"main-menu\">\r\n    <li><h2 class=\"menu-heading md-subhead\">Collections</h2></li>\r\n    <li ng-class=\"{active:collection===col.name}\" ng-repeat=\"col in collections\"><a href=\"\" ng-click=\"go(\'database.collection\', {collection: col.name})\">{{col.name}}</a></li>\r\n  </ul>\r\n\r\n</md-sidenav>\r\n\r\n<div layout=\"column\" flex>\r\n    <md-content layout=\"column\" flex class=\"md-padding\">\r\n    	<div ui-view></div>\r\n    </md-content>\r\n</div>");
$templateCache.put("dialogNewEntry.html","<md-dialog aria-label=\"Create a new entry\" class=\"new-entry-dialog\">\r\n	<form>\r\n		<md-toolbar>\r\n			<div class=\"md-toolbar-tools\">\r\n			  <h2>New entry</h2>\r\n			  <span flex></span>\r\n			  <md-button class=\"md-icon-button\" ng-click=\"cancel()\">\r\n			    <md-icon md-svg-src=\"img/icons/ic_close_24px.svg\" aria-label=\"Close dialog\"></md-icon>\r\n			  </md-button>\r\n			</div>\r\n		</md-toolbar>\r\n		<md-dialog-content>\r\n			<textarea></textarea>\r\n		</md-dialog-content>\r\n		<div class=\"md-actions\" layout=\"row\">\r\n			<md-button ng-click=\"cancel()\" class=\"md-warn\">\r\n				Cancel\r\n			</md-button>\r\n			<md-button ng-click=\"save()\" class=\"md-primary\">\r\n				Save\r\n			</md-button>\r\n		</div>\r\n	</form>\r\n</md-dialog>");}]);