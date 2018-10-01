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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/angular_angular-sanitize/angular-sanitize.js                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/**                                                                                                                    // 1
 * @license AngularJS v1.5.3                                                                                           // 2
 * (c) 2010-2016 Google, Inc. http://angularjs.org                                                                     // 3
 * License: MIT                                                                                                        // 4
 */                                                                                                                    // 5
(function(window, angular, undefined) {'use strict';                                                                   // 6
                                                                                                                       // 7
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *                                           // 8
 *     Any commits to this file should be reviewed with security in mind.  *                                           // 9
 *   Changes to this file can potentially create security vulnerabilities. *                                           // 10
 *          An approval from 2 Core members with history of modifying      *                                           // 11
 *                         this file is required.                          *                                           // 12
 *                                                                         *                                           // 13
 *  Does the change somehow allow for arbitrary javascript to be executed? *                                           // 14
 *    Or allows for someone to change the prototype of built-in objects?   *                                           // 15
 *     Or gives undesired access to variables likes document or window?    *                                           // 16
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */                                          // 17
                                                                                                                       // 18
var $sanitizeMinErr = angular.$$minErr('$sanitize');                                                                   // 19
                                                                                                                       // 20
/**                                                                                                                    // 21
 * @ngdoc module                                                                                                       // 22
 * @name ngSanitize                                                                                                    // 23
 * @description                                                                                                        // 24
 *                                                                                                                     // 25
 * # ngSanitize                                                                                                        // 26
 *                                                                                                                     // 27
 * The `ngSanitize` module provides functionality to sanitize HTML.                                                    // 28
 *                                                                                                                     // 29
 *                                                                                                                     // 30
 * <div doc-module-components="ngSanitize"></div>                                                                      // 31
 *                                                                                                                     // 32
 * See {@link ngSanitize.$sanitize `$sanitize`} for usage.                                                             // 33
 */                                                                                                                    // 34
                                                                                                                       // 35
/**                                                                                                                    // 36
 * @ngdoc service                                                                                                      // 37
 * @name $sanitize                                                                                                     // 38
 * @kind function                                                                                                      // 39
 *                                                                                                                     // 40
 * @description                                                                                                        // 41
 *   Sanitizes an html string by stripping all potentially dangerous tokens.                                           // 42
 *                                                                                                                     // 43
 *   The input is sanitized by parsing the HTML into tokens. All safe tokens (from a whitelist) are                    // 44
 *   then serialized back to properly escaped html string. This means that no unsafe input can make                    // 45
 *   it into the returned string.                                                                                      // 46
 *                                                                                                                     // 47
 *   The whitelist for URL sanitization of attribute values is configured using the functions                          // 48
 *   `aHrefSanitizationWhitelist` and `imgSrcSanitizationWhitelist` of {@link ng.$compileProvider                      // 49
 *   `$compileProvider`}.                                                                                              // 50
 *                                                                                                                     // 51
 *   The input may also contain SVG markup if this is enabled via {@link $sanitizeProvider}.                           // 52
 *                                                                                                                     // 53
 * @param {string} html HTML input.                                                                                    // 54
 * @returns {string} Sanitized HTML.                                                                                   // 55
 *                                                                                                                     // 56
 * @example                                                                                                            // 57
   <example module="sanitizeExample" deps="angular-sanitize.js">                                                       // 58
   <file name="index.html">                                                                                            // 59
     <script>                                                                                                          // 60
         angular.module('sanitizeExample', ['ngSanitize'])                                                             // 61
           .controller('ExampleController', ['$scope', '$sce', function($scope, $sce) {                                // 62
             $scope.snippet =                                                                                          // 63
               '<p style="color:blue">an html\n' +                                                                     // 64
               '<em onmouseover="this.textContent=\'PWN3D!\'">click here</em>\n' +                                     // 65
               'snippet</p>';                                                                                          // 66
             $scope.deliberatelyTrustDangerousSnippet = function() {                                                   // 67
               return $sce.trustAsHtml($scope.snippet);                                                                // 68
             };                                                                                                        // 69
           }]);                                                                                                        // 70
     </script>                                                                                                         // 71
     <div ng-controller="ExampleController">                                                                           // 72
        Snippet: <textarea ng-model="snippet" cols="60" rows="3"></textarea>                                           // 73
       <table>                                                                                                         // 74
         <tr>                                                                                                          // 75
           <td>Directive</td>                                                                                          // 76
           <td>How</td>                                                                                                // 77
           <td>Source</td>                                                                                             // 78
           <td>Rendered</td>                                                                                           // 79
         </tr>                                                                                                         // 80
         <tr id="bind-html-with-sanitize">                                                                             // 81
           <td>ng-bind-html</td>                                                                                       // 82
           <td>Automatically uses $sanitize</td>                                                                       // 83
           <td><pre>&lt;div ng-bind-html="snippet"&gt;<br/>&lt;/div&gt;</pre></td>                                     // 84
           <td><div ng-bind-html="snippet"></div></td>                                                                 // 85
         </tr>                                                                                                         // 86
         <tr id="bind-html-with-trust">                                                                                // 87
           <td>ng-bind-html</td>                                                                                       // 88
           <td>Bypass $sanitize by explicitly trusting the dangerous value</td>                                        // 89
           <td>                                                                                                        // 90
           <pre>&lt;div ng-bind-html="deliberatelyTrustDangerousSnippet()"&gt;                                         // 91
&lt;/div&gt;</pre>                                                                                                     // 92
           </td>                                                                                                       // 93
           <td><div ng-bind-html="deliberatelyTrustDangerousSnippet()"></div></td>                                     // 94
         </tr>                                                                                                         // 95
         <tr id="bind-default">                                                                                        // 96
           <td>ng-bind</td>                                                                                            // 97
           <td>Automatically escapes</td>                                                                              // 98
           <td><pre>&lt;div ng-bind="snippet"&gt;<br/>&lt;/div&gt;</pre></td>                                          // 99
           <td><div ng-bind="snippet"></div></td>                                                                      // 100
         </tr>                                                                                                         // 101
       </table>                                                                                                        // 102
       </div>                                                                                                          // 103
   </file>                                                                                                             // 104
   <file name="protractor.js" type="protractor">                                                                       // 105
     it('should sanitize the html snippet by default', function() {                                                    // 106
       expect(element(by.css('#bind-html-with-sanitize div')).getInnerHtml()).                                         // 107
         toBe('<p>an html\n<em>click here</em>\nsnippet</p>');                                                         // 108
     });                                                                                                               // 109
                                                                                                                       // 110
     it('should inline raw snippet if bound to a trusted value', function() {                                          // 111
       expect(element(by.css('#bind-html-with-trust div')).getInnerHtml()).                                            // 112
         toBe("<p style=\"color:blue\">an html\n" +                                                                    // 113
              "<em onmouseover=\"this.textContent='PWN3D!'\">click here</em>\n" +                                      // 114
              "snippet</p>");                                                                                          // 115
     });                                                                                                               // 116
                                                                                                                       // 117
     it('should escape snippet without any filter', function() {                                                       // 118
       expect(element(by.css('#bind-default div')).getInnerHtml()).                                                    // 119
         toBe("&lt;p style=\"color:blue\"&gt;an html\n" +                                                              // 120
              "&lt;em onmouseover=\"this.textContent='PWN3D!'\"&gt;click here&lt;/em&gt;\n" +                          // 121
              "snippet&lt;/p&gt;");                                                                                    // 122
     });                                                                                                               // 123
                                                                                                                       // 124
     it('should update', function() {                                                                                  // 125
       element(by.model('snippet')).clear();                                                                           // 126
       element(by.model('snippet')).sendKeys('new <b onclick="alert(1)">text</b>');                                    // 127
       expect(element(by.css('#bind-html-with-sanitize div')).getInnerHtml()).                                         // 128
         toBe('new <b>text</b>');                                                                                      // 129
       expect(element(by.css('#bind-html-with-trust div')).getInnerHtml()).toBe(                                       // 130
         'new <b onclick="alert(1)">text</b>');                                                                        // 131
       expect(element(by.css('#bind-default div')).getInnerHtml()).toBe(                                               // 132
         "new &lt;b onclick=\"alert(1)\"&gt;text&lt;/b&gt;");                                                          // 133
     });                                                                                                               // 134
   </file>                                                                                                             // 135
   </example>                                                                                                          // 136
 */                                                                                                                    // 137
                                                                                                                       // 138
                                                                                                                       // 139
/**                                                                                                                    // 140
 * @ngdoc provider                                                                                                     // 141
 * @name $sanitizeProvider                                                                                             // 142
 *                                                                                                                     // 143
 * @description                                                                                                        // 144
 * Creates and configures {@link $sanitize} instance.                                                                  // 145
 */                                                                                                                    // 146
function $SanitizeProvider() {                                                                                         // 147
  var svgEnabled = false;                                                                                              // 148
                                                                                                                       // 149
  this.$get = ['$$sanitizeUri', function($$sanitizeUri) {                                                              // 150
    if (svgEnabled) {                                                                                                  // 151
      angular.extend(validElements, svgElements);                                                                      // 152
    }                                                                                                                  // 153
    return function(html) {                                                                                            // 154
      var buf = [];                                                                                                    // 155
      htmlParser(html, htmlSanitizeWriter(buf, function(uri, isImage) {                                                // 156
        return !/^unsafe:/.test($$sanitizeUri(uri, isImage));                                                          // 157
      }));                                                                                                             // 158
      return buf.join('');                                                                                             // 159
    };                                                                                                                 // 160
  }];                                                                                                                  // 161
                                                                                                                       // 162
                                                                                                                       // 163
  /**                                                                                                                  // 164
   * @ngdoc method                                                                                                     // 165
   * @name $sanitizeProvider#enableSvg                                                                                 // 166
   * @kind function                                                                                                    // 167
   *                                                                                                                   // 168
   * @description                                                                                                      // 169
   * Enables a subset of svg to be supported by the sanitizer.                                                         // 170
   *                                                                                                                   // 171
   * <div class="alert alert-warning">                                                                                 // 172
   *   <p>By enabling this setting without taking other precautions, you might expose your                             // 173
   *   application to click-hijacking attacks. In these attacks, sanitized svg elements could be positioned            // 174
   *   outside of the containing element and be rendered over other elements on the page (e.g. a login                 // 175
   *   link). Such behavior can then result in phishing incidents.</p>                                                 // 176
   *                                                                                                                   // 177
   *   <p>To protect against these, explicitly setup `overflow: hidden` css rule for all potential svg                 // 178
   *   tags within the sanitized content:</p>                                                                          // 179
   *                                                                                                                   // 180
   *   <br>                                                                                                            // 181
   *                                                                                                                   // 182
   *   <pre><code>                                                                                                     // 183
   *   .rootOfTheIncludedContent svg {                                                                                 // 184
   *     overflow: hidden !important;                                                                                  // 185
   *   }                                                                                                               // 186
   *   </code></pre>                                                                                                   // 187
   * </div>                                                                                                            // 188
   *                                                                                                                   // 189
   * @param {boolean=} regexp New regexp to whitelist urls with.                                                       // 190
   * @returns {boolean|ng.$sanitizeProvider} Returns the currently configured value if called                          // 191
   *    without an argument or self for chaining otherwise.                                                            // 192
   */                                                                                                                  // 193
  this.enableSvg = function(enableSvg) {                                                                               // 194
    if (angular.isDefined(enableSvg)) {                                                                                // 195
      svgEnabled = enableSvg;                                                                                          // 196
      return this;                                                                                                     // 197
    } else {                                                                                                           // 198
      return svgEnabled;                                                                                               // 199
    }                                                                                                                  // 200
  };                                                                                                                   // 201
}                                                                                                                      // 202
                                                                                                                       // 203
function sanitizeText(chars) {                                                                                         // 204
  var buf = [];                                                                                                        // 205
  var writer = htmlSanitizeWriter(buf, angular.noop);                                                                  // 206
  writer.chars(chars);                                                                                                 // 207
  return buf.join('');                                                                                                 // 208
}                                                                                                                      // 209
                                                                                                                       // 210
                                                                                                                       // 211
// Regular Expressions for parsing tags and attributes                                                                 // 212
var SURROGATE_PAIR_REGEXP = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,                                                         // 213
  // Match everything outside of normal chars and " (quote character)                                                  // 214
  NON_ALPHANUMERIC_REGEXP = /([^\#-~ |!])/g;                                                                           // 215
                                                                                                                       // 216
                                                                                                                       // 217
// Good source of info about elements and attributes                                                                   // 218
// http://dev.w3.org/html5/spec/Overview.html#semantics                                                                // 219
// http://simon.html5.org/html-elements                                                                                // 220
                                                                                                                       // 221
// Safe Void Elements - HTML5                                                                                          // 222
// http://dev.w3.org/html5/spec/Overview.html#void-elements                                                            // 223
var voidElements = toMap("area,br,col,hr,img,wbr");                                                                    // 224
                                                                                                                       // 225
// Elements that you can, intentionally, leave open (and which close themselves)                                       // 226
// http://dev.w3.org/html5/spec/Overview.html#optional-tags                                                            // 227
var optionalEndTagBlockElements = toMap("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),                             // 228
    optionalEndTagInlineElements = toMap("rp,rt"),                                                                     // 229
    optionalEndTagElements = angular.extend({},                                                                        // 230
                                            optionalEndTagInlineElements,                                              // 231
                                            optionalEndTagBlockElements);                                              // 232
                                                                                                                       // 233
// Safe Block Elements - HTML5                                                                                         // 234
var blockElements = angular.extend({}, optionalEndTagBlockElements, toMap("address,article," +                         // 235
        "aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5," +                    // 236
        "h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,section,table,ul"));                                              // 237
                                                                                                                       // 238
// Inline Elements - HTML5                                                                                             // 239
var inlineElements = angular.extend({}, optionalEndTagInlineElements, toMap("a,abbr,acronym,b," +                      // 240
        "bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s," +                      // 241
        "samp,small,span,strike,strong,sub,sup,time,tt,u,var"));                                                       // 242
                                                                                                                       // 243
// SVG Elements                                                                                                        // 244
// https://wiki.whatwg.org/wiki/Sanitization_rules#svg_Elements                                                        // 245
// Note: the elements animate,animateColor,animateMotion,animateTransform,set are intentionally omitted.               // 246
// They can potentially allow for arbitrary javascript to be executed. See #11290                                      // 247
var svgElements = toMap("circle,defs,desc,ellipse,font-face,font-face-name,font-face-src,g,glyph," +                   // 248
        "hkern,image,linearGradient,line,marker,metadata,missing-glyph,mpath,path,polygon,polyline," +                 // 249
        "radialGradient,rect,stop,svg,switch,text,title,tspan");                                                       // 250
                                                                                                                       // 251
// Blocked Elements (will be stripped)                                                                                 // 252
var blockedElements = toMap("script,style");                                                                           // 253
                                                                                                                       // 254
var validElements = angular.extend({},                                                                                 // 255
                                   voidElements,                                                                       // 256
                                   blockElements,                                                                      // 257
                                   inlineElements,                                                                     // 258
                                   optionalEndTagElements);                                                            // 259
                                                                                                                       // 260
//Attributes that have href and hence need to be sanitized                                                             // 261
var uriAttrs = toMap("background,cite,href,longdesc,src,xlink:href");                                                  // 262
                                                                                                                       // 263
var htmlAttrs = toMap('abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,' +                      // 264
    'color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,' +                                     // 265
    'ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,' +                                                  // 266
    'scope,scrolling,shape,size,span,start,summary,tabindex,target,title,type,' +                                      // 267
    'valign,value,vspace,width');                                                                                      // 268
                                                                                                                       // 269
// SVG attributes (without "id" and "name" attributes)                                                                 // 270
// https://wiki.whatwg.org/wiki/Sanitization_rules#svg_Attributes                                                      // 271
var svgAttrs = toMap('accent-height,accumulate,additive,alphabetic,arabic-form,ascent,' +                              // 272
    'baseProfile,bbox,begin,by,calcMode,cap-height,class,color,color-rendering,content,' +                             // 273
    'cx,cy,d,dx,dy,descent,display,dur,end,fill,fill-rule,font-family,font-size,font-stretch,' +                       // 274
    'font-style,font-variant,font-weight,from,fx,fy,g1,g2,glyph-name,gradientUnits,hanging,' +                         // 275
    'height,horiz-adv-x,horiz-origin-x,ideographic,k,keyPoints,keySplines,keyTimes,lang,' +                            // 276
    'marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mathematical,' +                          // 277
    'max,min,offset,opacity,orient,origin,overline-position,overline-thickness,panose-1,' +                            // 278
    'path,pathLength,points,preserveAspectRatio,r,refX,refY,repeatCount,repeatDur,' +                                  // 279
    'requiredExtensions,requiredFeatures,restart,rotate,rx,ry,slope,stemh,stemv,stop-color,' +                         // 280
    'stop-opacity,strikethrough-position,strikethrough-thickness,stroke,stroke-dasharray,' +                           // 281
    'stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,' +                             // 282
    'stroke-width,systemLanguage,target,text-anchor,to,transform,type,u1,u2,underline-position,' +                     // 283
    'underline-thickness,unicode,unicode-range,units-per-em,values,version,viewBox,visibility,' +                      // 284
    'width,widths,x,x-height,x1,x2,xlink:actuate,xlink:arcrole,xlink:role,xlink:show,xlink:title,' +                   // 285
    'xlink:type,xml:base,xml:lang,xml:space,xmlns,xmlns:xlink,y,y1,y2,zoomAndPan', true);                              // 286
                                                                                                                       // 287
var validAttrs = angular.extend({},                                                                                    // 288
                                uriAttrs,                                                                              // 289
                                svgAttrs,                                                                              // 290
                                htmlAttrs);                                                                            // 291
                                                                                                                       // 292
function toMap(str, lowercaseKeys) {                                                                                   // 293
  var obj = {}, items = str.split(','), i;                                                                             // 294
  for (i = 0; i < items.length; i++) {                                                                                 // 295
    obj[lowercaseKeys ? angular.lowercase(items[i]) : items[i]] = true;                                                // 296
  }                                                                                                                    // 297
  return obj;                                                                                                          // 298
}                                                                                                                      // 299
                                                                                                                       // 300
var inertBodyElement;                                                                                                  // 301
(function(window) {                                                                                                    // 302
  var doc;                                                                                                             // 303
  if (window.document && window.document.implementation) {                                                             // 304
    doc = window.document.implementation.createHTMLDocument("inert");                                                  // 305
  } else {                                                                                                             // 306
    throw $sanitizeMinErr('noinert', "Can't create an inert html document");                                           // 307
  }                                                                                                                    // 308
  var docElement = doc.documentElement || doc.getDocumentElement();                                                    // 309
  var bodyElements = docElement.getElementsByTagName('body');                                                          // 310
                                                                                                                       // 311
  // usually there should be only one body element in the document, but IE doesn't have any, so we need to create one  // 312
  if (bodyElements.length === 1) {                                                                                     // 313
    inertBodyElement = bodyElements[0];                                                                                // 314
  } else {                                                                                                             // 315
    var html = doc.createElement('html');                                                                              // 316
    inertBodyElement = doc.createElement('body');                                                                      // 317
    html.appendChild(inertBodyElement);                                                                                // 318
    doc.appendChild(html);                                                                                             // 319
  }                                                                                                                    // 320
})(window);                                                                                                            // 321
                                                                                                                       // 322
/**                                                                                                                    // 323
 * @example                                                                                                            // 324
 * htmlParser(htmlString, {                                                                                            // 325
 *     start: function(tag, attrs) {},                                                                                 // 326
 *     end: function(tag) {},                                                                                          // 327
 *     chars: function(text) {},                                                                                       // 328
 *     comment: function(text) {}                                                                                      // 329
 * });                                                                                                                 // 330
 *                                                                                                                     // 331
 * @param {string} html string                                                                                         // 332
 * @param {object} handler                                                                                             // 333
 */                                                                                                                    // 334
function htmlParser(html, handler) {                                                                                   // 335
  if (html === null || html === undefined) {                                                                           // 336
    html = '';                                                                                                         // 337
  } else if (typeof html !== 'string') {                                                                               // 338
    html = '' + html;                                                                                                  // 339
  }                                                                                                                    // 340
  inertBodyElement.innerHTML = html;                                                                                   // 341
                                                                                                                       // 342
  //mXSS protection                                                                                                    // 343
  var mXSSAttempts = 5;                                                                                                // 344
  do {                                                                                                                 // 345
    if (mXSSAttempts === 0) {                                                                                          // 346
      throw $sanitizeMinErr('uinput', "Failed to sanitize html because the input is unstable");                        // 347
    }                                                                                                                  // 348
    mXSSAttempts--;                                                                                                    // 349
                                                                                                                       // 350
    // strip custom-namespaced attributes on IE<=11                                                                    // 351
    if (document.documentMode <= 11) {                                                                                 // 352
      stripCustomNsAttrs(inertBodyElement);                                                                            // 353
    }                                                                                                                  // 354
    html = inertBodyElement.innerHTML; //trigger mXSS                                                                  // 355
    inertBodyElement.innerHTML = html;                                                                                 // 356
  } while (html !== inertBodyElement.innerHTML);                                                                       // 357
                                                                                                                       // 358
  var node = inertBodyElement.firstChild;                                                                              // 359
  while (node) {                                                                                                       // 360
    switch (node.nodeType) {                                                                                           // 361
      case 1: // ELEMENT_NODE                                                                                          // 362
        handler.start(node.nodeName.toLowerCase(), attrToMap(node.attributes));                                        // 363
        break;                                                                                                         // 364
      case 3: // TEXT NODE                                                                                             // 365
        handler.chars(node.textContent);                                                                               // 366
        break;                                                                                                         // 367
    }                                                                                                                  // 368
                                                                                                                       // 369
    var nextNode;                                                                                                      // 370
    if (!(nextNode = node.firstChild)) {                                                                               // 371
      if (node.nodeType == 1) {                                                                                        // 372
        handler.end(node.nodeName.toLowerCase());                                                                      // 373
      }                                                                                                                // 374
      nextNode = node.nextSibling;                                                                                     // 375
      if (!nextNode) {                                                                                                 // 376
        while (nextNode == null) {                                                                                     // 377
          node = node.parentNode;                                                                                      // 378
          if (node === inertBodyElement) break;                                                                        // 379
          nextNode = node.nextSibling;                                                                                 // 380
          if (node.nodeType == 1) {                                                                                    // 381
            handler.end(node.nodeName.toLowerCase());                                                                  // 382
          }                                                                                                            // 383
        }                                                                                                              // 384
      }                                                                                                                // 385
    }                                                                                                                  // 386
    node = nextNode;                                                                                                   // 387
  }                                                                                                                    // 388
                                                                                                                       // 389
  while (node = inertBodyElement.firstChild) {                                                                         // 390
    inertBodyElement.removeChild(node);                                                                                // 391
  }                                                                                                                    // 392
}                                                                                                                      // 393
                                                                                                                       // 394
function attrToMap(attrs) {                                                                                            // 395
  var map = {};                                                                                                        // 396
  for (var i = 0, ii = attrs.length; i < ii; i++) {                                                                    // 397
    var attr = attrs[i];                                                                                               // 398
    map[attr.name] = attr.value;                                                                                       // 399
  }                                                                                                                    // 400
  return map;                                                                                                          // 401
}                                                                                                                      // 402
                                                                                                                       // 403
                                                                                                                       // 404
/**                                                                                                                    // 405
 * Escapes all potentially dangerous characters, so that the                                                           // 406
 * resulting string can be safely inserted into attribute or                                                           // 407
 * element text.                                                                                                       // 408
 * @param value                                                                                                        // 409
 * @returns {string} escaped text                                                                                      // 410
 */                                                                                                                    // 411
function encodeEntities(value) {                                                                                       // 412
  return value.                                                                                                        // 413
    replace(/&/g, '&amp;').                                                                                            // 414
    replace(SURROGATE_PAIR_REGEXP, function(value) {                                                                   // 415
      var hi = value.charCodeAt(0);                                                                                    // 416
      var low = value.charCodeAt(1);                                                                                   // 417
      return '&#' + (((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000) + ';';                                        // 418
    }).                                                                                                                // 419
    replace(NON_ALPHANUMERIC_REGEXP, function(value) {                                                                 // 420
      return '&#' + value.charCodeAt(0) + ';';                                                                         // 421
    }).                                                                                                                // 422
    replace(/</g, '&lt;').                                                                                             // 423
    replace(/>/g, '&gt;');                                                                                             // 424
}                                                                                                                      // 425
                                                                                                                       // 426
/**                                                                                                                    // 427
 * create an HTML/XML writer which writes to buffer                                                                    // 428
 * @param {Array} buf use buf.join('') to get out sanitized html string                                                // 429
 * @returns {object} in the form of {                                                                                  // 430
 *     start: function(tag, attrs) {},                                                                                 // 431
 *     end: function(tag) {},                                                                                          // 432
 *     chars: function(text) {},                                                                                       // 433
 *     comment: function(text) {}                                                                                      // 434
 * }                                                                                                                   // 435
 */                                                                                                                    // 436
function htmlSanitizeWriter(buf, uriValidator) {                                                                       // 437
  var ignoreCurrentElement = false;                                                                                    // 438
  var out = angular.bind(buf, buf.push);                                                                               // 439
  return {                                                                                                             // 440
    start: function(tag, attrs) {                                                                                      // 441
      tag = angular.lowercase(tag);                                                                                    // 442
      if (!ignoreCurrentElement && blockedElements[tag]) {                                                             // 443
        ignoreCurrentElement = tag;                                                                                    // 444
      }                                                                                                                // 445
      if (!ignoreCurrentElement && validElements[tag] === true) {                                                      // 446
        out('<');                                                                                                      // 447
        out(tag);                                                                                                      // 448
        angular.forEach(attrs, function(value, key) {                                                                  // 449
          var lkey=angular.lowercase(key);                                                                             // 450
          var isImage = (tag === 'img' && lkey === 'src') || (lkey === 'background');                                  // 451
          if (validAttrs[lkey] === true &&                                                                             // 452
            (uriAttrs[lkey] !== true || uriValidator(value, isImage))) {                                               // 453
            out(' ');                                                                                                  // 454
            out(key);                                                                                                  // 455
            out('="');                                                                                                 // 456
            out(encodeEntities(value));                                                                                // 457
            out('"');                                                                                                  // 458
          }                                                                                                            // 459
        });                                                                                                            // 460
        out('>');                                                                                                      // 461
      }                                                                                                                // 462
    },                                                                                                                 // 463
    end: function(tag) {                                                                                               // 464
      tag = angular.lowercase(tag);                                                                                    // 465
      if (!ignoreCurrentElement && validElements[tag] === true && voidElements[tag] !== true) {                        // 466
        out('</');                                                                                                     // 467
        out(tag);                                                                                                      // 468
        out('>');                                                                                                      // 469
      }                                                                                                                // 470
      if (tag == ignoreCurrentElement) {                                                                               // 471
        ignoreCurrentElement = false;                                                                                  // 472
      }                                                                                                                // 473
    },                                                                                                                 // 474
    chars: function(chars) {                                                                                           // 475
      if (!ignoreCurrentElement) {                                                                                     // 476
        out(encodeEntities(chars));                                                                                    // 477
      }                                                                                                                // 478
    }                                                                                                                  // 479
  };                                                                                                                   // 480
}                                                                                                                      // 481
                                                                                                                       // 482
                                                                                                                       // 483
/**                                                                                                                    // 484
 * When IE9-11 comes across an unknown namespaced attribute e.g. 'xlink:foo' it adds 'xmlns:ns1' attribute to declare  // 485
 * ns1 namespace and prefixes the attribute with 'ns1' (e.g. 'ns1:xlink:foo'). This is undesirable since we don't want
 * to allow any of these custom attributes. This method strips them all.                                               // 487
 *                                                                                                                     // 488
 * @param node Root element to process                                                                                 // 489
 */                                                                                                                    // 490
function stripCustomNsAttrs(node) {                                                                                    // 491
  if (node.nodeType === Node.ELEMENT_NODE) {                                                                           // 492
    var attrs = node.attributes;                                                                                       // 493
    for (var i = 0, l = attrs.length; i < l; i++) {                                                                    // 494
      var attrNode = attrs[i];                                                                                         // 495
      var attrName = attrNode.name.toLowerCase();                                                                      // 496
      if (attrName === 'xmlns:ns1' || attrName.indexOf('ns1:') === 0) {                                                // 497
        node.removeAttributeNode(attrNode);                                                                            // 498
        i--;                                                                                                           // 499
        l--;                                                                                                           // 500
      }                                                                                                                // 501
    }                                                                                                                  // 502
  }                                                                                                                    // 503
                                                                                                                       // 504
  var nextNode = node.firstChild;                                                                                      // 505
  if (nextNode) {                                                                                                      // 506
    stripCustomNsAttrs(nextNode);                                                                                      // 507
  }                                                                                                                    // 508
                                                                                                                       // 509
  nextNode = node.nextSibling;                                                                                         // 510
  if (nextNode) {                                                                                                      // 511
    stripCustomNsAttrs(nextNode);                                                                                      // 512
  }                                                                                                                    // 513
}                                                                                                                      // 514
                                                                                                                       // 515
                                                                                                                       // 516
                                                                                                                       // 517
// define ngSanitize module and register $sanitize service                                                             // 518
angular.module('ngSanitize', []).provider('$sanitize', $SanitizeProvider);                                             // 519
                                                                                                                       // 520
/* global sanitizeText: false */                                                                                       // 521
                                                                                                                       // 522
/**                                                                                                                    // 523
 * @ngdoc filter                                                                                                       // 524
 * @name linky                                                                                                         // 525
 * @kind function                                                                                                      // 526
 *                                                                                                                     // 527
 * @description                                                                                                        // 528
 * Finds links in text input and turns them into html links. Supports `http/https/ftp/mailto` and                      // 529
 * plain email address links.                                                                                          // 530
 *                                                                                                                     // 531
 * Requires the {@link ngSanitize `ngSanitize`} module to be installed.                                                // 532
 *                                                                                                                     // 533
 * @param {string} text Input text.                                                                                    // 534
 * @param {string} target Window (`_blank|_self|_parent|_top`) or named frame to open links in.                        // 535
 * @param {object|function(url)} [attributes] Add custom attributes to the link element.                               // 536
 *                                                                                                                     // 537
 *    Can be one of:                                                                                                   // 538
 *                                                                                                                     // 539
 *    - `object`: A map of attributes                                                                                  // 540
 *    - `function`: Takes the url as a parameter and returns a map of attributes                                       // 541
 *                                                                                                                     // 542
 *    If the map of attributes contains a value for `target`, it overrides the value of                                // 543
 *    the target parameter.                                                                                            // 544
 *                                                                                                                     // 545
 *                                                                                                                     // 546
 * @returns {string} Html-linkified and {@link $sanitize sanitized} text.                                              // 547
 *                                                                                                                     // 548
 * @usage                                                                                                              // 549
   <span ng-bind-html="linky_expression | linky"></span>                                                               // 550
 *                                                                                                                     // 551
 * @example                                                                                                            // 552
   <example module="linkyExample" deps="angular-sanitize.js">                                                          // 553
     <file name="index.html">                                                                                          // 554
       <div ng-controller="ExampleController">                                                                         // 555
       Snippet: <textarea ng-model="snippet" cols="60" rows="3"></textarea>                                            // 556
       <table>                                                                                                         // 557
         <tr>                                                                                                          // 558
           <th>Filter</th>                                                                                             // 559
           <th>Source</th>                                                                                             // 560
           <th>Rendered</th>                                                                                           // 561
         </tr>                                                                                                         // 562
         <tr id="linky-filter">                                                                                        // 563
           <td>linky filter</td>                                                                                       // 564
           <td>                                                                                                        // 565
             <pre>&lt;div ng-bind-html="snippet | linky"&gt;<br>&lt;/div&gt;</pre>                                     // 566
           </td>                                                                                                       // 567
           <td>                                                                                                        // 568
             <div ng-bind-html="snippet | linky"></div>                                                                // 569
           </td>                                                                                                       // 570
         </tr>                                                                                                         // 571
         <tr id="linky-target">                                                                                        // 572
          <td>linky target</td>                                                                                        // 573
          <td>                                                                                                         // 574
            <pre>&lt;div ng-bind-html="snippetWithSingleURL | linky:'_blank'"&gt;<br>&lt;/div&gt;</pre>                // 575
          </td>                                                                                                        // 576
          <td>                                                                                                         // 577
            <div ng-bind-html="snippetWithSingleURL | linky:'_blank'"></div>                                           // 578
          </td>                                                                                                        // 579
         </tr>                                                                                                         // 580
         <tr id="linky-custom-attributes">                                                                             // 581
          <td>linky custom attributes</td>                                                                             // 582
          <td>                                                                                                         // 583
            <pre>&lt;div ng-bind-html="snippetWithSingleURL | linky:'_self':{rel: 'nofollow'}"&gt;<br>&lt;/div&gt;</pre>
          </td>                                                                                                        // 585
          <td>                                                                                                         // 586
            <div ng-bind-html="snippetWithSingleURL | linky:'_self':{rel: 'nofollow'}"></div>                          // 587
          </td>                                                                                                        // 588
         </tr>                                                                                                         // 589
         <tr id="escaped-html">                                                                                        // 590
           <td>no filter</td>                                                                                          // 591
           <td><pre>&lt;div ng-bind="snippet"&gt;<br>&lt;/div&gt;</pre></td>                                           // 592
           <td><div ng-bind="snippet"></div></td>                                                                      // 593
         </tr>                                                                                                         // 594
       </table>                                                                                                        // 595
     </file>                                                                                                           // 596
     <file name="script.js">                                                                                           // 597
       angular.module('linkyExample', ['ngSanitize'])                                                                  // 598
         .controller('ExampleController', ['$scope', function($scope) {                                                // 599
           $scope.snippet =                                                                                            // 600
             'Pretty text with some links:\n'+                                                                         // 601
             'http://angularjs.org/,\n'+                                                                               // 602
             'mailto:us@somewhere.org,\n'+                                                                             // 603
             'another@somewhere.org,\n'+                                                                               // 604
             'and one more: ftp://127.0.0.1/.';                                                                        // 605
           $scope.snippetWithSingleURL = 'http://angularjs.org/';                                                      // 606
         }]);                                                                                                          // 607
     </file>                                                                                                           // 608
     <file name="protractor.js" type="protractor">                                                                     // 609
       it('should linkify the snippet with urls', function() {                                                         // 610
         expect(element(by.id('linky-filter')).element(by.binding('snippet | linky')).getText()).                      // 611
             toBe('Pretty text with some links: http://angularjs.org/, us@somewhere.org, ' +                           // 612
                  'another@somewhere.org, and one more: ftp://127.0.0.1/.');                                           // 613
         expect(element.all(by.css('#linky-filter a')).count()).toEqual(4);                                            // 614
       });                                                                                                             // 615
                                                                                                                       // 616
       it('should not linkify snippet without the linky filter', function() {                                          // 617
         expect(element(by.id('escaped-html')).element(by.binding('snippet')).getText()).                              // 618
             toBe('Pretty text with some links: http://angularjs.org/, mailto:us@somewhere.org, ' +                    // 619
                  'another@somewhere.org, and one more: ftp://127.0.0.1/.');                                           // 620
         expect(element.all(by.css('#escaped-html a')).count()).toEqual(0);                                            // 621
       });                                                                                                             // 622
                                                                                                                       // 623
       it('should update', function() {                                                                                // 624
         element(by.model('snippet')).clear();                                                                         // 625
         element(by.model('snippet')).sendKeys('new http://link.');                                                    // 626
         expect(element(by.id('linky-filter')).element(by.binding('snippet | linky')).getText()).                      // 627
             toBe('new http://link.');                                                                                 // 628
         expect(element.all(by.css('#linky-filter a')).count()).toEqual(1);                                            // 629
         expect(element(by.id('escaped-html')).element(by.binding('snippet')).getText())                               // 630
             .toBe('new http://link.');                                                                                // 631
       });                                                                                                             // 632
                                                                                                                       // 633
       it('should work with the target property', function() {                                                         // 634
        expect(element(by.id('linky-target')).                                                                         // 635
            element(by.binding("snippetWithSingleURL | linky:'_blank'")).getText()).                                   // 636
            toBe('http://angularjs.org/');                                                                             // 637
        expect(element(by.css('#linky-target a')).getAttribute('target')).toEqual('_blank');                           // 638
       });                                                                                                             // 639
                                                                                                                       // 640
       it('should optionally add custom attributes', function() {                                                      // 641
        expect(element(by.id('linky-custom-attributes')).                                                              // 642
            element(by.binding("snippetWithSingleURL | linky:'_self':{rel: 'nofollow'}")).getText()).                  // 643
            toBe('http://angularjs.org/');                                                                             // 644
        expect(element(by.css('#linky-custom-attributes a')).getAttribute('rel')).toEqual('nofollow');                 // 645
       });                                                                                                             // 646
     </file>                                                                                                           // 647
   </example>                                                                                                          // 648
 */                                                                                                                    // 649
angular.module('ngSanitize').filter('linky', ['$sanitize', function($sanitize) {                                       // 650
  var LINKY_URL_REGEXP =                                                                                               // 651
        /((ftp|https?):\/\/|(www\.)|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>"\u201d\u2019]/i,                     // 652
      MAILTO_REGEXP = /^mailto:/i;                                                                                     // 653
                                                                                                                       // 654
  var linkyMinErr = angular.$$minErr('linky');                                                                         // 655
  var isString = angular.isString;                                                                                     // 656
                                                                                                                       // 657
  return function(text, target, attributes) {                                                                          // 658
    if (text == null || text === '') return text;                                                                      // 659
    if (!isString(text)) throw linkyMinErr('notstring', 'Expected string but received: {0}', text);                    // 660
                                                                                                                       // 661
    var match;                                                                                                         // 662
    var raw = text;                                                                                                    // 663
    var html = [];                                                                                                     // 664
    var url;                                                                                                           // 665
    var i;                                                                                                             // 666
    while ((match = raw.match(LINKY_URL_REGEXP))) {                                                                    // 667
      // We can not end in these as they are sometimes found at the end of the sentence                                // 668
      url = match[0];                                                                                                  // 669
      // if we did not match ftp/http/www/mailto then assume mailto                                                    // 670
      if (!match[2] && !match[4]) {                                                                                    // 671
        url = (match[3] ? 'http://' : 'mailto:') + url;                                                                // 672
      }                                                                                                                // 673
      i = match.index;                                                                                                 // 674
      addText(raw.substr(0, i));                                                                                       // 675
      addLink(url, match[0].replace(MAILTO_REGEXP, ''));                                                               // 676
      raw = raw.substring(i + match[0].length);                                                                        // 677
    }                                                                                                                  // 678
    addText(raw);                                                                                                      // 679
    return $sanitize(html.join(''));                                                                                   // 680
                                                                                                                       // 681
    function addText(text) {                                                                                           // 682
      if (!text) {                                                                                                     // 683
        return;                                                                                                        // 684
      }                                                                                                                // 685
      html.push(sanitizeText(text));                                                                                   // 686
    }                                                                                                                  // 687
                                                                                                                       // 688
    function addLink(url, text) {                                                                                      // 689
      var key;                                                                                                         // 690
      html.push('<a ');                                                                                                // 691
      if (angular.isFunction(attributes)) {                                                                            // 692
        attributes = attributes(url);                                                                                  // 693
      }                                                                                                                // 694
      if (angular.isObject(attributes)) {                                                                              // 695
        for (key in attributes) {                                                                                      // 696
          html.push(key + '="' + attributes[key] + '" ');                                                              // 697
        }                                                                                                              // 698
      } else {                                                                                                         // 699
        attributes = {};                                                                                               // 700
      }                                                                                                                // 701
      if (angular.isDefined(target) && !('target' in attributes)) {                                                    // 702
        html.push('target="',                                                                                          // 703
                  target,                                                                                              // 704
                  '" ');                                                                                               // 705
      }                                                                                                                // 706
      html.push('href="',                                                                                              // 707
                url.replace(/"/g, '&quot;'),                                                                           // 708
                '">');                                                                                                 // 709
      addText(text);                                                                                                   // 710
      html.push('</a>');                                                                                               // 711
    }                                                                                                                  // 712
  };                                                                                                                   // 713
}]);                                                                                                                   // 714
                                                                                                                       // 715
                                                                                                                       // 716
})(window, window.angular);                                                                                            // 717
                                                                                                                       // 718
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['angular:angular-sanitize'] = {};

})();
