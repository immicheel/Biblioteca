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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/angular_angular-cookies/angular-cookies.js                                                         //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
/**                                                                                                            // 1
 * @license AngularJS v1.5.3                                                                                   // 2
 * (c) 2010-2016 Google, Inc. http://angularjs.org                                                             // 3
 * License: MIT                                                                                                // 4
 */                                                                                                            // 5
(function(window, angular, undefined) {'use strict';                                                           // 6
                                                                                                               // 7
/**                                                                                                            // 8
 * @ngdoc module                                                                                               // 9
 * @name ngCookies                                                                                             // 10
 * @description                                                                                                // 11
 *                                                                                                             // 12
 * # ngCookies                                                                                                 // 13
 *                                                                                                             // 14
 * The `ngCookies` module provides a convenient wrapper for reading and writing browser cookies.               // 15
 *                                                                                                             // 16
 *                                                                                                             // 17
 * <div doc-module-components="ngCookies"></div>                                                               // 18
 *                                                                                                             // 19
 * See {@link ngCookies.$cookies `$cookies`} for usage.                                                        // 20
 */                                                                                                            // 21
                                                                                                               // 22
                                                                                                               // 23
angular.module('ngCookies', ['ng']).                                                                           // 24
  /**                                                                                                          // 25
   * @ngdoc provider                                                                                           // 26
   * @name $cookiesProvider                                                                                    // 27
   * @description                                                                                              // 28
   * Use `$cookiesProvider` to change the default behavior of the {@link ngCookies.$cookies $cookies} service.
   * */                                                                                                        // 30
   provider('$cookies', [function $CookiesProvider() {                                                         // 31
    /**                                                                                                        // 32
     * @ngdoc property                                                                                         // 33
     * @name $cookiesProvider#defaults                                                                         // 34
     * @description                                                                                            // 35
     *                                                                                                         // 36
     * Object containing default options to pass when setting cookies.                                         // 37
     *                                                                                                         // 38
     * The object may have following properties:                                                               // 39
     *                                                                                                         // 40
     * - **path** - `{string}` - The cookie will be available only for this path and its                       // 41
     *   sub-paths. By default, this is the URL that appears in your `<base>` tag.                             // 42
     * - **domain** - `{string}` - The cookie will be available only for this domain and                       // 43
     *   its sub-domains. For security reasons the user agent will not accept the cookie                       // 44
     *   if the current domain is not a sub-domain of this domain or equal to it.                              // 45
     * - **expires** - `{string|Date}` - String of the form "Wdy, DD Mon YYYY HH:MM:SS GMT"                    // 46
     *   or a Date object indicating the exact date/time this cookie will expire.                              // 47
     * - **secure** - `{boolean}` - If `true`, then the cookie will only be available through a                // 48
     *   secured connection.                                                                                   // 49
     *                                                                                                         // 50
     * Note: By default, the address that appears in your `<base>` tag will be used as the path.               // 51
     * This is important so that cookies will be visible for all routes when html5mode is enabled.             // 52
     *                                                                                                         // 53
     **/                                                                                                       // 54
    var defaults = this.defaults = {};                                                                         // 55
                                                                                                               // 56
    function calcOptions(options) {                                                                            // 57
      return options ? angular.extend({}, defaults, options) : defaults;                                       // 58
    }                                                                                                          // 59
                                                                                                               // 60
    /**                                                                                                        // 61
     * @ngdoc service                                                                                          // 62
     * @name $cookies                                                                                          // 63
     *                                                                                                         // 64
     * @description                                                                                            // 65
     * Provides read/write access to browser's cookies.                                                        // 66
     *                                                                                                         // 67
     * <div class="alert alert-info">                                                                          // 68
     * Up until Angular 1.3, `$cookies` exposed properties that represented the                                // 69
     * current browser cookie values. In version 1.4, this behavior has changed, and                           // 70
     * `$cookies` now provides a standard api of getters, setters etc.                                         // 71
     * </div>                                                                                                  // 72
     *                                                                                                         // 73
     * Requires the {@link ngCookies `ngCookies`} module to be installed.                                      // 74
     *                                                                                                         // 75
     * @example                                                                                                // 76
     *                                                                                                         // 77
     * ```js                                                                                                   // 78
     * angular.module('cookiesExample', ['ngCookies'])                                                         // 79
     *   .controller('ExampleController', ['$cookies', function($cookies) {                                    // 80
     *     // Retrieving a cookie                                                                              // 81
     *     var favoriteCookie = $cookies.get('myFavorite');                                                    // 82
     *     // Setting a cookie                                                                                 // 83
     *     $cookies.put('myFavorite', 'oatmeal');                                                              // 84
     *   }]);                                                                                                  // 85
     * ```                                                                                                     // 86
     */                                                                                                        // 87
    this.$get = ['$$cookieReader', '$$cookieWriter', function($$cookieReader, $$cookieWriter) {                // 88
      return {                                                                                                 // 89
        /**                                                                                                    // 90
         * @ngdoc method                                                                                       // 91
         * @name $cookies#get                                                                                  // 92
         *                                                                                                     // 93
         * @description                                                                                        // 94
         * Returns the value of given cookie key                                                               // 95
         *                                                                                                     // 96
         * @param {string} key Id to use for lookup.                                                           // 97
         * @returns {string} Raw cookie value.                                                                 // 98
         */                                                                                                    // 99
        get: function(key) {                                                                                   // 100
          return $$cookieReader()[key];                                                                        // 101
        },                                                                                                     // 102
                                                                                                               // 103
        /**                                                                                                    // 104
         * @ngdoc method                                                                                       // 105
         * @name $cookies#getObject                                                                            // 106
         *                                                                                                     // 107
         * @description                                                                                        // 108
         * Returns the deserialized value of given cookie key                                                  // 109
         *                                                                                                     // 110
         * @param {string} key Id to use for lookup.                                                           // 111
         * @returns {Object} Deserialized cookie value.                                                        // 112
         */                                                                                                    // 113
        getObject: function(key) {                                                                             // 114
          var value = this.get(key);                                                                           // 115
          return value ? angular.fromJson(value) : value;                                                      // 116
        },                                                                                                     // 117
                                                                                                               // 118
        /**                                                                                                    // 119
         * @ngdoc method                                                                                       // 120
         * @name $cookies#getAll                                                                               // 121
         *                                                                                                     // 122
         * @description                                                                                        // 123
         * Returns a key value object with all the cookies                                                     // 124
         *                                                                                                     // 125
         * @returns {Object} All cookies                                                                       // 126
         */                                                                                                    // 127
        getAll: function() {                                                                                   // 128
          return $$cookieReader();                                                                             // 129
        },                                                                                                     // 130
                                                                                                               // 131
        /**                                                                                                    // 132
         * @ngdoc method                                                                                       // 133
         * @name $cookies#put                                                                                  // 134
         *                                                                                                     // 135
         * @description                                                                                        // 136
         * Sets a value for given cookie key                                                                   // 137
         *                                                                                                     // 138
         * @param {string} key Id for the `value`.                                                             // 139
         * @param {string} value Raw value to be stored.                                                       // 140
         * @param {Object=} options Options object.                                                            // 141
         *    See {@link ngCookies.$cookiesProvider#defaults $cookiesProvider.defaults}                        // 142
         */                                                                                                    // 143
        put: function(key, value, options) {                                                                   // 144
          $$cookieWriter(key, value, calcOptions(options));                                                    // 145
        },                                                                                                     // 146
                                                                                                               // 147
        /**                                                                                                    // 148
         * @ngdoc method                                                                                       // 149
         * @name $cookies#putObject                                                                            // 150
         *                                                                                                     // 151
         * @description                                                                                        // 152
         * Serializes and sets a value for given cookie key                                                    // 153
         *                                                                                                     // 154
         * @param {string} key Id for the `value`.                                                             // 155
         * @param {Object} value Value to be stored.                                                           // 156
         * @param {Object=} options Options object.                                                            // 157
         *    See {@link ngCookies.$cookiesProvider#defaults $cookiesProvider.defaults}                        // 158
         */                                                                                                    // 159
        putObject: function(key, value, options) {                                                             // 160
          this.put(key, angular.toJson(value), options);                                                       // 161
        },                                                                                                     // 162
                                                                                                               // 163
        /**                                                                                                    // 164
         * @ngdoc method                                                                                       // 165
         * @name $cookies#remove                                                                               // 166
         *                                                                                                     // 167
         * @description                                                                                        // 168
         * Remove given cookie                                                                                 // 169
         *                                                                                                     // 170
         * @param {string} key Id of the key-value pair to delete.                                             // 171
         * @param {Object=} options Options object.                                                            // 172
         *    See {@link ngCookies.$cookiesProvider#defaults $cookiesProvider.defaults}                        // 173
         */                                                                                                    // 174
        remove: function(key, options) {                                                                       // 175
          $$cookieWriter(key, undefined, calcOptions(options));                                                // 176
        }                                                                                                      // 177
      };                                                                                                       // 178
    }];                                                                                                        // 179
  }]);                                                                                                         // 180
                                                                                                               // 181
angular.module('ngCookies').                                                                                   // 182
/**                                                                                                            // 183
 * @ngdoc service                                                                                              // 184
 * @name $cookieStore                                                                                          // 185
 * @deprecated                                                                                                 // 186
 * @requires $cookies                                                                                          // 187
 *                                                                                                             // 188
 * @description                                                                                                // 189
 * Provides a key-value (string-object) storage, that is backed by session cookies.                            // 190
 * Objects put or retrieved from this storage are automatically serialized or                                  // 191
 * deserialized by angular's toJson/fromJson.                                                                  // 192
 *                                                                                                             // 193
 * Requires the {@link ngCookies `ngCookies`} module to be installed.                                          // 194
 *                                                                                                             // 195
 * <div class="alert alert-danger">                                                                            // 196
 * **Note:** The $cookieStore service is **deprecated**.                                                       // 197
 * Please use the {@link ngCookies.$cookies `$cookies`} service instead.                                       // 198
 * </div>                                                                                                      // 199
 *                                                                                                             // 200
 * @example                                                                                                    // 201
 *                                                                                                             // 202
 * ```js                                                                                                       // 203
 * angular.module('cookieStoreExample', ['ngCookies'])                                                         // 204
 *   .controller('ExampleController', ['$cookieStore', function($cookieStore) {                                // 205
 *     // Put cookie                                                                                           // 206
 *     $cookieStore.put('myFavorite','oatmeal');                                                               // 207
 *     // Get cookie                                                                                           // 208
 *     var favoriteCookie = $cookieStore.get('myFavorite');                                                    // 209
 *     // Removing a cookie                                                                                    // 210
 *     $cookieStore.remove('myFavorite');                                                                      // 211
 *   }]);                                                                                                      // 212
 * ```                                                                                                         // 213
 */                                                                                                            // 214
 factory('$cookieStore', ['$cookies', function($cookies) {                                                     // 215
                                                                                                               // 216
    return {                                                                                                   // 217
      /**                                                                                                      // 218
       * @ngdoc method                                                                                         // 219
       * @name $cookieStore#get                                                                                // 220
       *                                                                                                       // 221
       * @description                                                                                          // 222
       * Returns the value of given cookie key                                                                 // 223
       *                                                                                                       // 224
       * @param {string} key Id to use for lookup.                                                             // 225
       * @returns {Object} Deserialized cookie value, undefined if the cookie does not exist.                  // 226
       */                                                                                                      // 227
      get: function(key) {                                                                                     // 228
        return $cookies.getObject(key);                                                                        // 229
      },                                                                                                       // 230
                                                                                                               // 231
      /**                                                                                                      // 232
       * @ngdoc method                                                                                         // 233
       * @name $cookieStore#put                                                                                // 234
       *                                                                                                       // 235
       * @description                                                                                          // 236
       * Sets a value for given cookie key                                                                     // 237
       *                                                                                                       // 238
       * @param {string} key Id for the `value`.                                                               // 239
       * @param {Object} value Value to be stored.                                                             // 240
       */                                                                                                      // 241
      put: function(key, value) {                                                                              // 242
        $cookies.putObject(key, value);                                                                        // 243
      },                                                                                                       // 244
                                                                                                               // 245
      /**                                                                                                      // 246
       * @ngdoc method                                                                                         // 247
       * @name $cookieStore#remove                                                                             // 248
       *                                                                                                       // 249
       * @description                                                                                          // 250
       * Remove given cookie                                                                                   // 251
       *                                                                                                       // 252
       * @param {string} key Id of the key-value pair to delete.                                               // 253
       */                                                                                                      // 254
      remove: function(key) {                                                                                  // 255
        $cookies.remove(key);                                                                                  // 256
      }                                                                                                        // 257
    };                                                                                                         // 258
                                                                                                               // 259
  }]);                                                                                                         // 260
                                                                                                               // 261
/**                                                                                                            // 262
 * @name $$cookieWriter                                                                                        // 263
 * @requires $document                                                                                         // 264
 *                                                                                                             // 265
 * @description                                                                                                // 266
 * This is a private service for writing cookies                                                               // 267
 *                                                                                                             // 268
 * @param {string} name Cookie name                                                                            // 269
 * @param {string=} value Cookie value (if undefined, cookie will be deleted)                                  // 270
 * @param {Object=} options Object with options that need to be stored for the cookie.                         // 271
 */                                                                                                            // 272
function $$CookieWriter($document, $log, $browser) {                                                           // 273
  var cookiePath = $browser.baseHref();                                                                        // 274
  var rawDocument = $document[0];                                                                              // 275
                                                                                                               // 276
  function buildCookieString(name, value, options) {                                                           // 277
    var path, expires;                                                                                         // 278
    options = options || {};                                                                                   // 279
    expires = options.expires;                                                                                 // 280
    path = angular.isDefined(options.path) ? options.path : cookiePath;                                        // 281
    if (angular.isUndefined(value)) {                                                                          // 282
      expires = 'Thu, 01 Jan 1970 00:00:00 GMT';                                                               // 283
      value = '';                                                                                              // 284
    }                                                                                                          // 285
    if (angular.isString(expires)) {                                                                           // 286
      expires = new Date(expires);                                                                             // 287
    }                                                                                                          // 288
                                                                                                               // 289
    var str = encodeURIComponent(name) + '=' + encodeURIComponent(value);                                      // 290
    str += path ? ';path=' + path : '';                                                                        // 291
    str += options.domain ? ';domain=' + options.domain : '';                                                  // 292
    str += expires ? ';expires=' + expires.toUTCString() : '';                                                 // 293
    str += options.secure ? ';secure' : '';                                                                    // 294
                                                                                                               // 295
    // per http://www.ietf.org/rfc/rfc2109.txt browser must allow at minimum:                                  // 296
    // - 300 cookies                                                                                           // 297
    // - 20 cookies per unique domain                                                                          // 298
    // - 4096 bytes per cookie                                                                                 // 299
    var cookieLength = str.length + 1;                                                                         // 300
    if (cookieLength > 4096) {                                                                                 // 301
      $log.warn("Cookie '" + name +                                                                            // 302
        "' possibly not set or overflowed because it was too large (" +                                        // 303
        cookieLength + " > 4096 bytes)!");                                                                     // 304
    }                                                                                                          // 305
                                                                                                               // 306
    return str;                                                                                                // 307
  }                                                                                                            // 308
                                                                                                               // 309
  return function(name, value, options) {                                                                      // 310
    rawDocument.cookie = buildCookieString(name, value, options);                                              // 311
  };                                                                                                           // 312
}                                                                                                              // 313
                                                                                                               // 314
$$CookieWriter.$inject = ['$document', '$log', '$browser'];                                                    // 315
                                                                                                               // 316
angular.module('ngCookies').provider('$$cookieWriter', function $$CookieWriterProvider() {                     // 317
  this.$get = $$CookieWriter;                                                                                  // 318
});                                                                                                            // 319
                                                                                                               // 320
                                                                                                               // 321
})(window, window.angular);                                                                                    // 322
                                                                                                               // 323
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['angular:angular-cookies'] = {};

})();
