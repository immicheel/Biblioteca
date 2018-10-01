//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;

(function(){

///////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                           //
// packages/angular-templates/templates-handler.js                                           //
//                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////
                                                                                             //
if (!window.angular) {                                                                       // 1
  try {                                                                                      // 2
    if (Package['modules-runtime']) {                                                        // 3
      var require = Package['modules-runtime'].meteorInstall();                              // 4
      require('angular');                                                                    // 5
    }                                                                                        // 6
  } catch(e) {                                                                               // 7
    throw new Error('angular package is missing');                                           // 8
  }                                                                                          // 9
}                                                                                            // 10
                                                                                             // 11
angular.module('angular-templates', []).config([                                             // 12
  '$provide',                                                                                // 13
  function ($provide) {                                                                      // 14
    var templatesFileExtension = ['html', 'tpl', 'tmpl', 'template', 'view'];                // 15
    var forwardSlash = /^\//;                                                                // 16
                                                                                             // 17
    $provide.decorator('$templateCache', ['$delegate', '$angularTemplatesSettings',          // 18
      function($delegate, $angularTemplatesSettings) {                                       // 19
        var originalGet = $delegate.get;                                                     // 20
                                                                                             // 21
        $delegate.get = function(templatePath) {                                             // 22
          var result = originalGet(templatePath);                                            // 23
                                                                                             // 24
          if (angular.isUndefined(result)) {                                                 // 25
            if (forwardSlash.test(templatePath) === false) {                                 // 26
              result = originalGet('/' + templatePath);                                      // 27
            }                                                                                // 28
          }                                                                                  // 29
                                                                                             // 30
          if (angular.isUndefined(result)) {                                                 // 31
            var fileExtension = ((templatePath.split('.') || []).pop() || '').toLowerCase();
                                                                                             // 33
            if (templatesFileExtension.indexOf(fileExtension) > -1) {                        // 34
              function getMsg(type) {                                                        // 35
                return '[angular-meteor][err][404] ' + templatePath + ' - HTML template does not exist! You can disable this ' + type + ' by following this guide http://www.angular-meteor.com/api/1.3.11/templates';
              }                                                                              // 37
                                                                                             // 38
              if ($angularTemplatesSettings.error === true) {                                // 39
                throw new Error(getMsg('error'));                                            // 40
              } else if ($angularTemplatesSettings.warning === true) {                       // 41
                console.warn(getMsg('warning'));                                             // 42
              }                                                                              // 43
            }                                                                                // 44
          }                                                                                  // 45
                                                                                             // 46
          return result;                                                                     // 47
        };                                                                                   // 48
                                                                                             // 49
        return $delegate;                                                                    // 50
    }]);                                                                                     // 51
  }                                                                                          // 52
]).constant('$angularTemplatesSettings', {                                                   // 53
  error: true,                                                                               // 54
  warning: true                                                                              // 55
});                                                                                          // 56
                                                                                             // 57
///////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['angular-templates'] = {};

})();
