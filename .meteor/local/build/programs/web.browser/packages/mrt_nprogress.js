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
var $ = Package.jquery.$;
var jQuery = Package.jquery.jQuery;

/* Package-scope variables */
var NProgress;

(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// packages/mrt_nprogress/packages/mrt_nprogress.js                                                           //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
(function () {                                                                                                // 1
                                                                                                              // 2
/////////////////////////////////////////////////////////////////////////////////////////////////////////     // 3
//                                                                                                     //     // 4
// packages/mrt:nprogress/lib/nprogress/nprogress.js                                                   //     // 5
//                                                                                                     //     // 6
/////////////////////////////////////////////////////////////////////////////////////////////////////////     // 7
                                                                                                       //     // 8
/* NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress                         // 1   // 9
 * @license MIT */                                                                                     // 2   // 10
                                                                                                       // 3   // 11
;(function(root, factory) {                                                                            // 4   // 12
                                                                                                       // 5   // 13
  if (typeof define === 'function' && define.amd) {                                                    // 6   // 14
    define(factory);                                                                                   // 7   // 15
  } else if (typeof exports === 'object') {                                                            // 8   // 16
    module.exports = factory();                                                                        // 9   // 17
  } else {                                                                                             // 10  // 18
    root.NProgress = factory();                                                                        // 11  // 19
  }                                                                                                    // 12  // 20
                                                                                                       // 13  // 21
})(this, function() {                                                                                  // 14  // 22
  var NProgress = {};                                                                                  // 15  // 23
                                                                                                       // 16  // 24
  NProgress.version = '0.2.0';                                                                         // 17  // 25
                                                                                                       // 18  // 26
  var Settings = NProgress.settings = {                                                                // 19  // 27
    minimum: 0.08,                                                                                     // 20  // 28
    easing: 'ease',                                                                                    // 21  // 29
    positionUsing: '',                                                                                 // 22  // 30
    speed: 200,                                                                                        // 23  // 31
    trickle: true,                                                                                     // 24  // 32
    trickleRate: 0.02,                                                                                 // 25  // 33
    trickleSpeed: 800,                                                                                 // 26  // 34
    showSpinner: true,                                                                                 // 27  // 35
    barSelector: '[role="bar"]',                                                                       // 28  // 36
    spinnerSelector: '[role="spinner"]',                                                               // 29  // 37
    parent: 'body',                                                                                    // 30  // 38
    template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
  };                                                                                                   // 32  // 40
                                                                                                       // 33  // 41
  /**                                                                                                  // 34  // 42
   * Updates configuration.                                                                            // 35  // 43
   *                                                                                                   // 36  // 44
   *     NProgress.configure({                                                                         // 37  // 45
   *       minimum: 0.1                                                                                // 38  // 46
   *     });                                                                                           // 39  // 47
   */                                                                                                  // 40  // 48
  NProgress.configure = function(options) {                                                            // 41  // 49
    var key, value;                                                                                    // 42  // 50
    for (key in options) {                                                                             // 43  // 51
      value = options[key];                                                                            // 44  // 52
      if (value !== undefined && options.hasOwnProperty(key)) Settings[key] = value;                   // 45  // 53
    }                                                                                                  // 46  // 54
                                                                                                       // 47  // 55
    return this;                                                                                       // 48  // 56
  };                                                                                                   // 49  // 57
                                                                                                       // 50  // 58
  /**                                                                                                  // 51  // 59
   * Last number.                                                                                      // 52  // 60
   */                                                                                                  // 53  // 61
                                                                                                       // 54  // 62
  NProgress.status = null;                                                                             // 55  // 63
                                                                                                       // 56  // 64
  /**                                                                                                  // 57  // 65
   * Sets the progress bar status, where `n` is a number from `0.0` to `1.0`.                          // 58  // 66
   *                                                                                                   // 59  // 67
   *     NProgress.set(0.4);                                                                           // 60  // 68
   *     NProgress.set(1.0);                                                                           // 61  // 69
   */                                                                                                  // 62  // 70
                                                                                                       // 63  // 71
  NProgress.set = function(n) {                                                                        // 64  // 72
    var started = NProgress.isStarted();                                                               // 65  // 73
                                                                                                       // 66  // 74
    n = clamp(n, Settings.minimum, 1);                                                                 // 67  // 75
    NProgress.status = (n === 1 ? null : n);                                                           // 68  // 76
                                                                                                       // 69  // 77
    var progress = NProgress.render(!started),                                                         // 70  // 78
        bar      = progress.querySelector(Settings.barSelector),                                       // 71  // 79
        speed    = Settings.speed,                                                                     // 72  // 80
        ease     = Settings.easing;                                                                    // 73  // 81
                                                                                                       // 74  // 82
    progress.offsetWidth; /* Repaint */                                                                // 75  // 83
                                                                                                       // 76  // 84
    queue(function(next) {                                                                             // 77  // 85
      // Set positionUsing if it hasn't already been set                                               // 78  // 86
      if (Settings.positionUsing === '') Settings.positionUsing = NProgress.getPositioningCSS();       // 79  // 87
                                                                                                       // 80  // 88
      // Add transition                                                                                // 81  // 89
      css(bar, barPositionCSS(n, speed, ease));                                                        // 82  // 90
                                                                                                       // 83  // 91
      if (n === 1) {                                                                                   // 84  // 92
        // Fade out                                                                                    // 85  // 93
        css(progress, {                                                                                // 86  // 94
          transition: 'none',                                                                          // 87  // 95
          opacity: 1                                                                                   // 88  // 96
        });                                                                                            // 89  // 97
        progress.offsetWidth; /* Repaint */                                                            // 90  // 98
                                                                                                       // 91  // 99
        setTimeout(function() {                                                                        // 92  // 100
          css(progress, {                                                                              // 93  // 101
            transition: 'all ' + speed + 'ms linear',                                                  // 94  // 102
            opacity: 0                                                                                 // 95  // 103
          });                                                                                          // 96  // 104
          setTimeout(function() {                                                                      // 97  // 105
            NProgress.remove();                                                                        // 98  // 106
            next();                                                                                    // 99  // 107
          }, speed);                                                                                   // 100
        }, speed);                                                                                     // 101
      } else {                                                                                         // 102
        setTimeout(next, speed);                                                                       // 103
      }                                                                                                // 104
    });                                                                                                // 105
                                                                                                       // 106
    return this;                                                                                       // 107
  };                                                                                                   // 108
                                                                                                       // 109
  NProgress.isStarted = function() {                                                                   // 110
    return typeof NProgress.status === 'number';                                                       // 111
  };                                                                                                   // 112
                                                                                                       // 113
  /**                                                                                                  // 114
   * Shows the progress bar.                                                                           // 115
   * This is the same as setting the status to 0%, except that it doesn't go backwards.                // 116
   *                                                                                                   // 117
   *     NProgress.start();                                                                            // 118
   *                                                                                                   // 119
   */                                                                                                  // 120
  NProgress.start = function() {                                                                       // 121
    if (!NProgress.status) NProgress.set(0);                                                           // 122
                                                                                                       // 123
    var work = function() {                                                                            // 124
      setTimeout(function() {                                                                          // 125
        if (!NProgress.status) return;                                                                 // 126
        NProgress.trickle();                                                                           // 127
        work();                                                                                        // 128
      }, Settings.trickleSpeed);                                                                       // 129
    };                                                                                                 // 130
                                                                                                       // 131
    if (Settings.trickle) work();                                                                      // 132
                                                                                                       // 133
    return this;                                                                                       // 134
  };                                                                                                   // 135
                                                                                                       // 136
  /**                                                                                                  // 137
   * Hides the progress bar.                                                                           // 138
   * This is the *sort of* the same as setting the status to 100%, with the                            // 139
   * difference being `done()` makes some placebo effect of some realistic motion.                     // 140
   *                                                                                                   // 141
   *     NProgress.done();                                                                             // 142
   *                                                                                                   // 143
   * If `true` is passed, it will show the progress bar even if its hidden.                            // 144
   *                                                                                                   // 145
   *     NProgress.done(true);                                                                         // 146
   */                                                                                                  // 147
                                                                                                       // 148
  NProgress.done = function(force) {                                                                   // 149
    if (!force && !NProgress.status) return this;                                                      // 150
                                                                                                       // 151
    return NProgress.inc(0.3 + 0.5 * Math.random()).set(1);                                            // 152
  };                                                                                                   // 153
                                                                                                       // 154
  /**                                                                                                  // 155
   * Increments by a random amount.                                                                    // 156
   */                                                                                                  // 157
                                                                                                       // 158
  NProgress.inc = function(amount) {                                                                   // 159
    var n = NProgress.status;                                                                          // 160
                                                                                                       // 161
    if (!n) {                                                                                          // 162
      return NProgress.start();                                                                        // 163
    } else {                                                                                           // 164
      if (typeof amount !== 'number') {                                                                // 165
        amount = (1 - n) * clamp(Math.random() * n, 0.1, 0.95);                                        // 166
      }                                                                                                // 167
                                                                                                       // 168
      n = clamp(n + amount, 0, 0.994);                                                                 // 169
      return NProgress.set(n);                                                                         // 170
    }                                                                                                  // 171
  };                                                                                                   // 172
                                                                                                       // 173
  NProgress.trickle = function() {                                                                     // 174
    return NProgress.inc(Math.random() * Settings.trickleRate);                                        // 175
  };                                                                                                   // 176
                                                                                                       // 177
  /**                                                                                                  // 178
   * Waits for all supplied jQuery promises and                                                        // 179
   * increases the progress as the promises resolve.                                                   // 180
   *                                                                                                   // 181
   * @param $promise jQUery Promise                                                                    // 182
   */                                                                                                  // 183
  (function() {                                                                                        // 184
    var initial = 0, current = 0;                                                                      // 185
                                                                                                       // 186
    NProgress.promise = function($promise) {                                                           // 187
      if (!$promise || $promise.state() === "resolved") {                                              // 188
        return this;                                                                                   // 189
      }                                                                                                // 190
                                                                                                       // 191
      if (current === 0) {                                                                             // 192
        NProgress.start();                                                                             // 193
      }                                                                                                // 194
                                                                                                       // 195
      initial++;                                                                                       // 196
      current++;                                                                                       // 197
                                                                                                       // 198
      $promise.always(function() {                                                                     // 199
        current--;                                                                                     // 200
        if (current === 0) {                                                                           // 201
            initial = 0;                                                                               // 202
            NProgress.done();                                                                          // 203
        } else {                                                                                       // 204
            NProgress.set((initial - current) / initial);                                              // 205
        }                                                                                              // 206
      });                                                                                              // 207
                                                                                                       // 208
      return this;                                                                                     // 209
    };                                                                                                 // 210
                                                                                                       // 211
  })();                                                                                                // 212
                                                                                                       // 213
  /**                                                                                                  // 214
   * (Internal) renders the progress bar markup based on the `template`                                // 215
   * setting.                                                                                          // 216
   */                                                                                                  // 217
                                                                                                       // 218
  NProgress.render = function(fromStart) {                                                             // 219
    if (NProgress.isRendered()) return document.getElementById('nprogress');                           // 220
                                                                                                       // 221
    addClass(document.documentElement, 'nprogress-busy');                                              // 222
                                                                                                       // 223
    var progress = document.createElement('div');                                                      // 224
    progress.id = 'nprogress';                                                                         // 225
    progress.innerHTML = Settings.template;                                                            // 226
                                                                                                       // 227
    var bar      = progress.querySelector(Settings.barSelector),                                       // 228
        perc     = fromStart ? '-100' : toBarPerc(NProgress.status || 0),                              // 229
        parent   = document.querySelector(Settings.parent),                                            // 230
        spinner;                                                                                       // 231
                                                                                                       // 232
    css(bar, {                                                                                         // 233
      transition: 'all 0 linear',                                                                      // 234
      transform: 'translate3d(' + perc + '%,0,0)'                                                      // 235
    });                                                                                                // 236
                                                                                                       // 237
    if (!Settings.showSpinner) {                                                                       // 238
      spinner = progress.querySelector(Settings.spinnerSelector);                                      // 239
      spinner && removeElement(spinner);                                                               // 240
    }                                                                                                  // 241
                                                                                                       // 242
    if (parent != document.body) {                                                                     // 243
      addClass(parent, 'nprogress-custom-parent');                                                     // 244
    }                                                                                                  // 245
                                                                                                       // 246
    parent.appendChild(progress);                                                                      // 247
    return progress;                                                                                   // 248
  };                                                                                                   // 249
                                                                                                       // 250
  /**                                                                                                  // 251
   * Removes the element. Opposite of render().                                                        // 252
   */                                                                                                  // 253
                                                                                                       // 254
  NProgress.remove = function() {                                                                      // 255
    removeClass(document.documentElement, 'nprogress-busy');                                           // 256
    removeClass(document.querySelector(Settings.parent), 'nprogress-custom-parent');                   // 257
    var progress = document.getElementById('nprogress');                                               // 258
    progress && removeElement(progress);                                                               // 259
  };                                                                                                   // 260
                                                                                                       // 261
  /**                                                                                                  // 262
   * Checks if the progress bar is rendered.                                                           // 263
   */                                                                                                  // 264
                                                                                                       // 265
  NProgress.isRendered = function() {                                                                  // 266
    return !!document.getElementById('nprogress');                                                     // 267
  };                                                                                                   // 268
                                                                                                       // 269
  /**                                                                                                  // 270
   * Determine which positioning CSS rule to use.                                                      // 271
   */                                                                                                  // 272
                                                                                                       // 273
  NProgress.getPositioningCSS = function() {                                                           // 274
    // Sniff on document.body.style                                                                    // 275
    var bodyStyle = document.body.style;                                                               // 276
                                                                                                       // 277
    // Sniff prefixes                                                                                  // 278
    var vendorPrefix = ('WebkitTransform' in bodyStyle) ? 'Webkit' :                                   // 279
                       ('MozTransform' in bodyStyle) ? 'Moz' :                                         // 280
                       ('msTransform' in bodyStyle) ? 'ms' :                                           // 281
                       ('OTransform' in bodyStyle) ? 'O' : '';                                         // 282
                                                                                                       // 283
    if (vendorPrefix + 'Perspective' in bodyStyle) {                                                   // 284
      // Modern browsers with 3D support, e.g. Webkit, IE10                                            // 285
      return 'translate3d';                                                                            // 286
    } else if (vendorPrefix + 'Transform' in bodyStyle) {                                              // 287
      // Browsers without 3D support, e.g. IE9                                                         // 288
      return 'translate';                                                                              // 289
    } else {                                                                                           // 290
      // Browsers without translate() support, e.g. IE7-8                                              // 291
      return 'margin';                                                                                 // 292
    }                                                                                                  // 293
  };                                                                                                   // 294
                                                                                                       // 295
  /**                                                                                                  // 296
   * Helpers                                                                                           // 297
   */                                                                                                  // 298
                                                                                                       // 299
  function clamp(n, min, max) {                                                                        // 300
    if (n < min) return min;                                                                           // 301
    if (n > max) return max;                                                                           // 302
    return n;                                                                                          // 303
  }                                                                                                    // 304
                                                                                                       // 305
  /**                                                                                                  // 306
   * (Internal) converts a percentage (`0..1`) to a bar translateX                                     // 307
   * percentage (`-100%..0%`).                                                                         // 308
   */                                                                                                  // 309
                                                                                                       // 310
  function toBarPerc(n) {                                                                              // 311
    return (-1 + n) * 100;                                                                             // 312
  }                                                                                                    // 313
                                                                                                       // 314
                                                                                                       // 315
  /**                                                                                                  // 316
   * (Internal) returns the correct CSS for changing the bar's                                         // 317
   * position given an n percentage, and speed and ease from Settings                                  // 318
   */                                                                                                  // 319
                                                                                                       // 320
  function barPositionCSS(n, speed, ease) {                                                            // 321
    var barCSS;                                                                                        // 322
                                                                                                       // 323
    if (Settings.positionUsing === 'translate3d') {                                                    // 324
      barCSS = { transform: 'translate3d('+toBarPerc(n)+'%,0,0)' };                                    // 325
    } else if (Settings.positionUsing === 'translate') {                                               // 326
      barCSS = { transform: 'translate('+toBarPerc(n)+'%,0)' };                                        // 327
    } else {                                                                                           // 328
      barCSS = { 'margin-left': toBarPerc(n)+'%' };                                                    // 329
    }                                                                                                  // 330
                                                                                                       // 331
    barCSS.transition = 'all '+speed+'ms '+ease;                                                       // 332
                                                                                                       // 333
    return barCSS;                                                                                     // 334
  }                                                                                                    // 335
                                                                                                       // 336
  /**                                                                                                  // 337
   * (Internal) Queues a function to be executed.                                                      // 338
   */                                                                                                  // 339
                                                                                                       // 340
  var queue = (function() {                                                                            // 341
    var pending = [];                                                                                  // 342
                                                                                                       // 343
    function next() {                                                                                  // 344
      var fn = pending.shift();                                                                        // 345
      if (fn) {                                                                                        // 346
        fn(next);                                                                                      // 347
      }                                                                                                // 348
    }                                                                                                  // 349
                                                                                                       // 350
    return function(fn) {                                                                              // 351
      pending.push(fn);                                                                                // 352
      if (pending.length == 1) next();                                                                 // 353
    };                                                                                                 // 354
  })();                                                                                                // 355
                                                                                                       // 356
  /**                                                                                                  // 357
   * (Internal) Applies css properties to an element, similar to the jQuery                            // 358
   * css method.                                                                                       // 359
   *                                                                                                   // 360
   * While this helper does assist with vendor prefixed property names, it                             // 361
   * does not perform any manipulation of values prior to setting styles.                              // 362
   */                                                                                                  // 363
                                                                                                       // 364
  var css = (function() {                                                                              // 365
    var cssPrefixes = [ 'Webkit', 'O', 'Moz', 'ms' ],                                                  // 366
        cssProps    = {};                                                                              // 367
                                                                                                       // 368
    function camelCase(string) {                                                                       // 369
      return string.replace(/^-ms-/, 'ms-').replace(/-([\da-z])/gi, function(match, letter) {          // 370
        return letter.toUpperCase();                                                                   // 371
      });                                                                                              // 372
    }                                                                                                  // 373
                                                                                                       // 374
    function getVendorProp(name) {                                                                     // 375
      var style = document.body.style;                                                                 // 376
      if (name in style) return name;                                                                  // 377
                                                                                                       // 378
      var i = cssPrefixes.length,                                                                      // 379
          capName = name.charAt(0).toUpperCase() + name.slice(1),                                      // 380
          vendorName;                                                                                  // 381
      while (i--) {                                                                                    // 382
        vendorName = cssPrefixes[i] + capName;                                                         // 383
        if (vendorName in style) return vendorName;                                                    // 384
      }                                                                                                // 385
                                                                                                       // 386
      return name;                                                                                     // 387
    }                                                                                                  // 388
                                                                                                       // 389
    function getStyleProp(name) {                                                                      // 390
      name = camelCase(name);                                                                          // 391
      return cssProps[name] || (cssProps[name] = getVendorProp(name));                                 // 392
    }                                                                                                  // 393
                                                                                                       // 394
    function applyCss(element, prop, value) {                                                          // 395
      prop = getStyleProp(prop);                                                                       // 396
      element.style[prop] = value;                                                                     // 397
    }                                                                                                  // 398
                                                                                                       // 399
    return function(element, properties) {                                                             // 400
      var args = arguments,                                                                            // 401
          prop,                                                                                        // 402
          value;                                                                                       // 403
                                                                                                       // 404
      if (args.length == 2) {                                                                          // 405
        for (prop in properties) {                                                                     // 406
          value = properties[prop];                                                                    // 407
          if (value !== undefined && properties.hasOwnProperty(prop)) applyCss(element, prop, value);  // 408
        }                                                                                              // 409
      } else {                                                                                         // 410
        applyCss(element, args[1], args[2]);                                                           // 411
      }                                                                                                // 412
    }                                                                                                  // 413
  })();                                                                                                // 414
                                                                                                       // 415
  /**                                                                                                  // 416
   * (Internal) Determines if an element or space separated list of class names contains a class name. // 417
   */                                                                                                  // 418
                                                                                                       // 419
  function hasClass(element, name) {                                                                   // 420
    var list = typeof element == 'string' ? element : classList(element);                              // 421
    return list.indexOf(' ' + name + ' ') >= 0;                                                        // 422
  }                                                                                                    // 423
                                                                                                       // 424
  /**                                                                                                  // 425
   * (Internal) Adds a class to an element.                                                            // 426
   */                                                                                                  // 427
                                                                                                       // 428
  function addClass(element, name) {                                                                   // 429
    var oldList = classList(element),                                                                  // 430
        newList = oldList + name;                                                                      // 431
                                                                                                       // 432
    if (hasClass(oldList, name)) return;                                                               // 433
                                                                                                       // 434
    // Trim the opening space.                                                                         // 435
    element.className = newList.substring(1);                                                          // 436
  }                                                                                                    // 437
                                                                                                       // 438
  /**                                                                                                  // 439
   * (Internal) Removes a class from an element.                                                       // 440
   */                                                                                                  // 441
                                                                                                       // 442
  function removeClass(element, name) {                                                                // 443
    var oldList = classList(element),                                                                  // 444
        newList;                                                                                       // 445
                                                                                                       // 446
    if (!hasClass(element, name)) return;                                                              // 447
                                                                                                       // 448
    // Replace the class name.                                                                         // 449
    newList = oldList.replace(' ' + name + ' ', ' ');                                                  // 450
                                                                                                       // 451
    // Trim the opening and closing spaces.                                                            // 452
    element.className = newList.substring(1, newList.length - 1);                                      // 453
  }                                                                                                    // 454
                                                                                                       // 455
  /**                                                                                                  // 456
   * (Internal) Gets a space separated list of the class names on the element.                         // 457
   * The list is wrapped with a single space on each end to facilitate finding                         // 458
   * matches within the list.                                                                          // 459
   */                                                                                                  // 460
                                                                                                       // 461
  function classList(element) {                                                                        // 462
    return (' ' + (element.className || '') + ' ').replace(/\s+/gi, ' ');                              // 463
  }                                                                                                    // 464
                                                                                                       // 465
  /**                                                                                                  // 466
   * (Internal) Removes an element from the DOM.                                                       // 467
   */                                                                                                  // 468
                                                                                                       // 469
  function removeElement(element) {                                                                    // 470
    element && element.parentNode && element.parentNode.removeChild(element);                          // 471
  }                                                                                                    // 472
                                                                                                       // 473
  return NProgress;                                                                                    // 474
});                                                                                                    // 475
                                                                                                       // 476
                                                                                                       // 477
/////////////////////////////////////////////////////////////////////////////////////////////////////////     // 486
                                                                                                              // 487
}).call(this);                                                                                                // 488
                                                                                                              // 489
                                                                                                              // 490
                                                                                                              // 491
                                                                                                              // 492
                                                                                                              // 493
                                                                                                              // 494
(function () {                                                                                                // 495
                                                                                                              // 496
/////////////////////////////////////////////////////////////////////////////////////////////////////////     // 497
//                                                                                                     //     // 498
// packages/mrt:nprogress/lib/main.js                                                                  //     // 499
//                                                                                                     //     // 500
/////////////////////////////////////////////////////////////////////////////////////////////////////////     // 501
                                                                                                       //     // 502
if (typeof Package !== "undefined") NProgress = this.NProgress;                                        // 1   // 503
                                                                                                       // 2   // 504
/////////////////////////////////////////////////////////////////////////////////////////////////////////     // 505
                                                                                                              // 506
}).call(this);                                                                                                // 507
                                                                                                              // 508
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['mrt:nprogress'] = {}, {
  NProgress: NProgress
});

})();
