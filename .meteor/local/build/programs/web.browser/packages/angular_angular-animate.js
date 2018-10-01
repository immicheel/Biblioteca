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
// packages/angular_angular-animate/angular-animate.js                                                                 //
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
/* jshint ignore:start */                                                                                              // 8
var noop        = angular.noop;                                                                                        // 9
var copy        = angular.copy;                                                                                        // 10
var extend      = angular.extend;                                                                                      // 11
var jqLite      = angular.element;                                                                                     // 12
var forEach     = angular.forEach;                                                                                     // 13
var isArray     = angular.isArray;                                                                                     // 14
var isString    = angular.isString;                                                                                    // 15
var isObject    = angular.isObject;                                                                                    // 16
var isUndefined = angular.isUndefined;                                                                                 // 17
var isDefined   = angular.isDefined;                                                                                   // 18
var isFunction  = angular.isFunction;                                                                                  // 19
var isElement   = angular.isElement;                                                                                   // 20
                                                                                                                       // 21
var ELEMENT_NODE = 1;                                                                                                  // 22
var COMMENT_NODE = 8;                                                                                                  // 23
                                                                                                                       // 24
var ADD_CLASS_SUFFIX = '-add';                                                                                         // 25
var REMOVE_CLASS_SUFFIX = '-remove';                                                                                   // 26
var EVENT_CLASS_PREFIX = 'ng-';                                                                                        // 27
var ACTIVE_CLASS_SUFFIX = '-active';                                                                                   // 28
var PREPARE_CLASS_SUFFIX = '-prepare';                                                                                 // 29
                                                                                                                       // 30
var NG_ANIMATE_CLASSNAME = 'ng-animate';                                                                               // 31
var NG_ANIMATE_CHILDREN_DATA = '$$ngAnimateChildren';                                                                  // 32
                                                                                                                       // 33
// Detect proper transitionend/animationend event names.                                                               // 34
var CSS_PREFIX = '', TRANSITION_PROP, TRANSITIONEND_EVENT, ANIMATION_PROP, ANIMATIONEND_EVENT;                         // 35
                                                                                                                       // 36
// If unprefixed events are not supported but webkit-prefixed are, use the latter.                                     // 37
// Otherwise, just use W3C names, browsers not supporting them at all will just ignore them.                           // 38
// Note: Chrome implements `window.onwebkitanimationend` and doesn't implement `window.onanimationend`                 // 39
// but at the same time dispatches the `animationend` event and not `webkitAnimationEnd`.                              // 40
// Register both events in case `window.onanimationend` is not supported because of that,                              // 41
// do the same for `transitionend` as Safari is likely to exhibit similar behavior.                                    // 42
// Also, the only modern browser that uses vendor prefixes for transitions/keyframes is webkit                         // 43
// therefore there is no reason to test anymore for other vendor prefixes:                                             // 44
// http://caniuse.com/#search=transition                                                                               // 45
if (isUndefined(window.ontransitionend) && isDefined(window.onwebkittransitionend)) {                                  // 46
  CSS_PREFIX = '-webkit-';                                                                                             // 47
  TRANSITION_PROP = 'WebkitTransition';                                                                                // 48
  TRANSITIONEND_EVENT = 'webkitTransitionEnd transitionend';                                                           // 49
} else {                                                                                                               // 50
  TRANSITION_PROP = 'transition';                                                                                      // 51
  TRANSITIONEND_EVENT = 'transitionend';                                                                               // 52
}                                                                                                                      // 53
                                                                                                                       // 54
if (isUndefined(window.onanimationend) && isDefined(window.onwebkitanimationend)) {                                    // 55
  CSS_PREFIX = '-webkit-';                                                                                             // 56
  ANIMATION_PROP = 'WebkitAnimation';                                                                                  // 57
  ANIMATIONEND_EVENT = 'webkitAnimationEnd animationend';                                                              // 58
} else {                                                                                                               // 59
  ANIMATION_PROP = 'animation';                                                                                        // 60
  ANIMATIONEND_EVENT = 'animationend';                                                                                 // 61
}                                                                                                                      // 62
                                                                                                                       // 63
var DURATION_KEY = 'Duration';                                                                                         // 64
var PROPERTY_KEY = 'Property';                                                                                         // 65
var DELAY_KEY = 'Delay';                                                                                               // 66
var TIMING_KEY = 'TimingFunction';                                                                                     // 67
var ANIMATION_ITERATION_COUNT_KEY = 'IterationCount';                                                                  // 68
var ANIMATION_PLAYSTATE_KEY = 'PlayState';                                                                             // 69
var SAFE_FAST_FORWARD_DURATION_VALUE = 9999;                                                                           // 70
                                                                                                                       // 71
var ANIMATION_DELAY_PROP = ANIMATION_PROP + DELAY_KEY;                                                                 // 72
var ANIMATION_DURATION_PROP = ANIMATION_PROP + DURATION_KEY;                                                           // 73
var TRANSITION_DELAY_PROP = TRANSITION_PROP + DELAY_KEY;                                                               // 74
var TRANSITION_DURATION_PROP = TRANSITION_PROP + DURATION_KEY;                                                         // 75
                                                                                                                       // 76
var isPromiseLike = function(p) {                                                                                      // 77
  return p && p.then ? true : false;                                                                                   // 78
};                                                                                                                     // 79
                                                                                                                       // 80
var ngMinErr = angular.$$minErr('ng');                                                                                 // 81
function assertArg(arg, name, reason) {                                                                                // 82
  if (!arg) {                                                                                                          // 83
    throw ngMinErr('areq', "Argument '{0}' is {1}", (name || '?'), (reason || "required"));                            // 84
  }                                                                                                                    // 85
  return arg;                                                                                                          // 86
}                                                                                                                      // 87
                                                                                                                       // 88
function mergeClasses(a,b) {                                                                                           // 89
  if (!a && !b) return '';                                                                                             // 90
  if (!a) return b;                                                                                                    // 91
  if (!b) return a;                                                                                                    // 92
  if (isArray(a)) a = a.join(' ');                                                                                     // 93
  if (isArray(b)) b = b.join(' ');                                                                                     // 94
  return a + ' ' + b;                                                                                                  // 95
}                                                                                                                      // 96
                                                                                                                       // 97
function packageStyles(options) {                                                                                      // 98
  var styles = {};                                                                                                     // 99
  if (options && (options.to || options.from)) {                                                                       // 100
    styles.to = options.to;                                                                                            // 101
    styles.from = options.from;                                                                                        // 102
  }                                                                                                                    // 103
  return styles;                                                                                                       // 104
}                                                                                                                      // 105
                                                                                                                       // 106
function pendClasses(classes, fix, isPrefix) {                                                                         // 107
  var className = '';                                                                                                  // 108
  classes = isArray(classes)                                                                                           // 109
      ? classes                                                                                                        // 110
      : classes && isString(classes) && classes.length                                                                 // 111
          ? classes.split(/\s+/)                                                                                       // 112
          : [];                                                                                                        // 113
  forEach(classes, function(klass, i) {                                                                                // 114
    if (klass && klass.length > 0) {                                                                                   // 115
      className += (i > 0) ? ' ' : '';                                                                                 // 116
      className += isPrefix ? fix + klass                                                                              // 117
                            : klass + fix;                                                                             // 118
    }                                                                                                                  // 119
  });                                                                                                                  // 120
  return className;                                                                                                    // 121
}                                                                                                                      // 122
                                                                                                                       // 123
function removeFromArray(arr, val) {                                                                                   // 124
  var index = arr.indexOf(val);                                                                                        // 125
  if (val >= 0) {                                                                                                      // 126
    arr.splice(index, 1);                                                                                              // 127
  }                                                                                                                    // 128
}                                                                                                                      // 129
                                                                                                                       // 130
function stripCommentsFromElement(element) {                                                                           // 131
  if (element instanceof jqLite) {                                                                                     // 132
    switch (element.length) {                                                                                          // 133
      case 0:                                                                                                          // 134
        return [];                                                                                                     // 135
        break;                                                                                                         // 136
                                                                                                                       // 137
      case 1:                                                                                                          // 138
        // there is no point of stripping anything if the element                                                      // 139
        // is the only element within the jqLite wrapper.                                                              // 140
        // (it's important that we retain the element instance.)                                                       // 141
        if (element[0].nodeType === ELEMENT_NODE) {                                                                    // 142
          return element;                                                                                              // 143
        }                                                                                                              // 144
        break;                                                                                                         // 145
                                                                                                                       // 146
      default:                                                                                                         // 147
        return jqLite(extractElementNode(element));                                                                    // 148
        break;                                                                                                         // 149
    }                                                                                                                  // 150
  }                                                                                                                    // 151
                                                                                                                       // 152
  if (element.nodeType === ELEMENT_NODE) {                                                                             // 153
    return jqLite(element);                                                                                            // 154
  }                                                                                                                    // 155
}                                                                                                                      // 156
                                                                                                                       // 157
function extractElementNode(element) {                                                                                 // 158
  if (!element[0]) return element;                                                                                     // 159
  for (var i = 0; i < element.length; i++) {                                                                           // 160
    var elm = element[i];                                                                                              // 161
    if (elm.nodeType == ELEMENT_NODE) {                                                                                // 162
      return elm;                                                                                                      // 163
    }                                                                                                                  // 164
  }                                                                                                                    // 165
}                                                                                                                      // 166
                                                                                                                       // 167
function $$addClass($$jqLite, element, className) {                                                                    // 168
  forEach(element, function(elm) {                                                                                     // 169
    $$jqLite.addClass(elm, className);                                                                                 // 170
  });                                                                                                                  // 171
}                                                                                                                      // 172
                                                                                                                       // 173
function $$removeClass($$jqLite, element, className) {                                                                 // 174
  forEach(element, function(elm) {                                                                                     // 175
    $$jqLite.removeClass(elm, className);                                                                              // 176
  });                                                                                                                  // 177
}                                                                                                                      // 178
                                                                                                                       // 179
function applyAnimationClassesFactory($$jqLite) {                                                                      // 180
  return function(element, options) {                                                                                  // 181
    if (options.addClass) {                                                                                            // 182
      $$addClass($$jqLite, element, options.addClass);                                                                 // 183
      options.addClass = null;                                                                                         // 184
    }                                                                                                                  // 185
    if (options.removeClass) {                                                                                         // 186
      $$removeClass($$jqLite, element, options.removeClass);                                                           // 187
      options.removeClass = null;                                                                                      // 188
    }                                                                                                                  // 189
  }                                                                                                                    // 190
}                                                                                                                      // 191
                                                                                                                       // 192
function prepareAnimationOptions(options) {                                                                            // 193
  options = options || {};                                                                                             // 194
  if (!options.$$prepared) {                                                                                           // 195
    var domOperation = options.domOperation || noop;                                                                   // 196
    options.domOperation = function() {                                                                                // 197
      options.$$domOperationFired = true;                                                                              // 198
      domOperation();                                                                                                  // 199
      domOperation = noop;                                                                                             // 200
    };                                                                                                                 // 201
    options.$$prepared = true;                                                                                         // 202
  }                                                                                                                    // 203
  return options;                                                                                                      // 204
}                                                                                                                      // 205
                                                                                                                       // 206
function applyAnimationStyles(element, options) {                                                                      // 207
  applyAnimationFromStyles(element, options);                                                                          // 208
  applyAnimationToStyles(element, options);                                                                            // 209
}                                                                                                                      // 210
                                                                                                                       // 211
function applyAnimationFromStyles(element, options) {                                                                  // 212
  if (options.from) {                                                                                                  // 213
    element.css(options.from);                                                                                         // 214
    options.from = null;                                                                                               // 215
  }                                                                                                                    // 216
}                                                                                                                      // 217
                                                                                                                       // 218
function applyAnimationToStyles(element, options) {                                                                    // 219
  if (options.to) {                                                                                                    // 220
    element.css(options.to);                                                                                           // 221
    options.to = null;                                                                                                 // 222
  }                                                                                                                    // 223
}                                                                                                                      // 224
                                                                                                                       // 225
function mergeAnimationDetails(element, oldAnimation, newAnimation) {                                                  // 226
  var target = oldAnimation.options || {};                                                                             // 227
  var newOptions = newAnimation.options || {};                                                                         // 228
                                                                                                                       // 229
  var toAdd = (target.addClass || '') + ' ' + (newOptions.addClass || '');                                             // 230
  var toRemove = (target.removeClass || '') + ' ' + (newOptions.removeClass || '');                                    // 231
  var classes = resolveElementClasses(element.attr('class'), toAdd, toRemove);                                         // 232
                                                                                                                       // 233
  if (newOptions.preparationClasses) {                                                                                 // 234
    target.preparationClasses = concatWithSpace(newOptions.preparationClasses, target.preparationClasses);             // 235
    delete newOptions.preparationClasses;                                                                              // 236
  }                                                                                                                    // 237
                                                                                                                       // 238
  // noop is basically when there is no callback; otherwise something has been set                                     // 239
  var realDomOperation = target.domOperation !== noop ? target.domOperation : null;                                    // 240
                                                                                                                       // 241
  extend(target, newOptions);                                                                                          // 242
                                                                                                                       // 243
  // TODO(matsko or sreeramu): proper fix is to maintain all animation callback in array and call at last,but now only leave has the callback so no issue with this.
  if (realDomOperation) {                                                                                              // 245
    target.domOperation = realDomOperation;                                                                            // 246
  }                                                                                                                    // 247
                                                                                                                       // 248
  if (classes.addClass) {                                                                                              // 249
    target.addClass = classes.addClass;                                                                                // 250
  } else {                                                                                                             // 251
    target.addClass = null;                                                                                            // 252
  }                                                                                                                    // 253
                                                                                                                       // 254
  if (classes.removeClass) {                                                                                           // 255
    target.removeClass = classes.removeClass;                                                                          // 256
  } else {                                                                                                             // 257
    target.removeClass = null;                                                                                         // 258
  }                                                                                                                    // 259
                                                                                                                       // 260
  oldAnimation.addClass = target.addClass;                                                                             // 261
  oldAnimation.removeClass = target.removeClass;                                                                       // 262
                                                                                                                       // 263
  return target;                                                                                                       // 264
}                                                                                                                      // 265
                                                                                                                       // 266
function resolveElementClasses(existing, toAdd, toRemove) {                                                            // 267
  var ADD_CLASS = 1;                                                                                                   // 268
  var REMOVE_CLASS = -1;                                                                                               // 269
                                                                                                                       // 270
  var flags = {};                                                                                                      // 271
  existing = splitClassesToLookup(existing);                                                                           // 272
                                                                                                                       // 273
  toAdd = splitClassesToLookup(toAdd);                                                                                 // 274
  forEach(toAdd, function(value, key) {                                                                                // 275
    flags[key] = ADD_CLASS;                                                                                            // 276
  });                                                                                                                  // 277
                                                                                                                       // 278
  toRemove = splitClassesToLookup(toRemove);                                                                           // 279
  forEach(toRemove, function(value, key) {                                                                             // 280
    flags[key] = flags[key] === ADD_CLASS ? null : REMOVE_CLASS;                                                       // 281
  });                                                                                                                  // 282
                                                                                                                       // 283
  var classes = {                                                                                                      // 284
    addClass: '',                                                                                                      // 285
    removeClass: ''                                                                                                    // 286
  };                                                                                                                   // 287
                                                                                                                       // 288
  forEach(flags, function(val, klass) {                                                                                // 289
    var prop, allow;                                                                                                   // 290
    if (val === ADD_CLASS) {                                                                                           // 291
      prop = 'addClass';                                                                                               // 292
      allow = !existing[klass];                                                                                        // 293
    } else if (val === REMOVE_CLASS) {                                                                                 // 294
      prop = 'removeClass';                                                                                            // 295
      allow = existing[klass];                                                                                         // 296
    }                                                                                                                  // 297
    if (allow) {                                                                                                       // 298
      if (classes[prop].length) {                                                                                      // 299
        classes[prop] += ' ';                                                                                          // 300
      }                                                                                                                // 301
      classes[prop] += klass;                                                                                          // 302
    }                                                                                                                  // 303
  });                                                                                                                  // 304
                                                                                                                       // 305
  function splitClassesToLookup(classes) {                                                                             // 306
    if (isString(classes)) {                                                                                           // 307
      classes = classes.split(' ');                                                                                    // 308
    }                                                                                                                  // 309
                                                                                                                       // 310
    var obj = {};                                                                                                      // 311
    forEach(classes, function(klass) {                                                                                 // 312
      // sometimes the split leaves empty string values                                                                // 313
      // incase extra spaces were applied to the options                                                               // 314
      if (klass.length) {                                                                                              // 315
        obj[klass] = true;                                                                                             // 316
      }                                                                                                                // 317
    });                                                                                                                // 318
    return obj;                                                                                                        // 319
  }                                                                                                                    // 320
                                                                                                                       // 321
  return classes;                                                                                                      // 322
}                                                                                                                      // 323
                                                                                                                       // 324
function getDomNode(element) {                                                                                         // 325
  return (element instanceof angular.element) ? element[0] : element;                                                  // 326
}                                                                                                                      // 327
                                                                                                                       // 328
function applyGeneratedPreparationClasses(element, event, options) {                                                   // 329
  var classes = '';                                                                                                    // 330
  if (event) {                                                                                                         // 331
    classes = pendClasses(event, EVENT_CLASS_PREFIX, true);                                                            // 332
  }                                                                                                                    // 333
  if (options.addClass) {                                                                                              // 334
    classes = concatWithSpace(classes, pendClasses(options.addClass, ADD_CLASS_SUFFIX));                               // 335
  }                                                                                                                    // 336
  if (options.removeClass) {                                                                                           // 337
    classes = concatWithSpace(classes, pendClasses(options.removeClass, REMOVE_CLASS_SUFFIX));                         // 338
  }                                                                                                                    // 339
  if (classes.length) {                                                                                                // 340
    options.preparationClasses = classes;                                                                              // 341
    element.addClass(classes);                                                                                         // 342
  }                                                                                                                    // 343
}                                                                                                                      // 344
                                                                                                                       // 345
function clearGeneratedClasses(element, options) {                                                                     // 346
  if (options.preparationClasses) {                                                                                    // 347
    element.removeClass(options.preparationClasses);                                                                   // 348
    options.preparationClasses = null;                                                                                 // 349
  }                                                                                                                    // 350
  if (options.activeClasses) {                                                                                         // 351
    element.removeClass(options.activeClasses);                                                                        // 352
    options.activeClasses = null;                                                                                      // 353
  }                                                                                                                    // 354
}                                                                                                                      // 355
                                                                                                                       // 356
function blockTransitions(node, duration) {                                                                            // 357
  // we use a negative delay value since it performs blocking                                                          // 358
  // yet it doesn't kill any existing transitions running on the                                                       // 359
  // same element which makes this safe for class-based animations                                                     // 360
  var value = duration ? '-' + duration + 's' : '';                                                                    // 361
  applyInlineStyle(node, [TRANSITION_DELAY_PROP, value]);                                                              // 362
  return [TRANSITION_DELAY_PROP, value];                                                                               // 363
}                                                                                                                      // 364
                                                                                                                       // 365
function blockKeyframeAnimations(node, applyBlock) {                                                                   // 366
  var value = applyBlock ? 'paused' : '';                                                                              // 367
  var key = ANIMATION_PROP + ANIMATION_PLAYSTATE_KEY;                                                                  // 368
  applyInlineStyle(node, [key, value]);                                                                                // 369
  return [key, value];                                                                                                 // 370
}                                                                                                                      // 371
                                                                                                                       // 372
function applyInlineStyle(node, styleTuple) {                                                                          // 373
  var prop = styleTuple[0];                                                                                            // 374
  var value = styleTuple[1];                                                                                           // 375
  node.style[prop] = value;                                                                                            // 376
}                                                                                                                      // 377
                                                                                                                       // 378
function concatWithSpace(a,b) {                                                                                        // 379
  if (!a) return b;                                                                                                    // 380
  if (!b) return a;                                                                                                    // 381
  return a + ' ' + b;                                                                                                  // 382
}                                                                                                                      // 383
                                                                                                                       // 384
var $$rAFSchedulerFactory = ['$$rAF', function($$rAF) {                                                                // 385
  var queue, cancelFn;                                                                                                 // 386
                                                                                                                       // 387
  function scheduler(tasks) {                                                                                          // 388
    // we make a copy since RAFScheduler mutates the state                                                             // 389
    // of the passed in array variable and this would be difficult                                                     // 390
    // to track down on the outside code                                                                               // 391
    queue = queue.concat(tasks);                                                                                       // 392
    nextTick();                                                                                                        // 393
  }                                                                                                                    // 394
                                                                                                                       // 395
  queue = scheduler.queue = [];                                                                                        // 396
                                                                                                                       // 397
  /* waitUntilQuiet does two things:                                                                                   // 398
   * 1. It will run the FINAL `fn` value only when an uncanceled RAF has passed through                                // 399
   * 2. It will delay the next wave of tasks from running until the quiet `fn` has run.                                // 400
   *                                                                                                                   // 401
   * The motivation here is that animation code can request more time from the scheduler                               // 402
   * before the next wave runs. This allows for certain DOM properties such as classes to                              // 403
   * be resolved in time for the next animation to run.                                                                // 404
   */                                                                                                                  // 405
  scheduler.waitUntilQuiet = function(fn) {                                                                            // 406
    if (cancelFn) cancelFn();                                                                                          // 407
                                                                                                                       // 408
    cancelFn = $$rAF(function() {                                                                                      // 409
      cancelFn = null;                                                                                                 // 410
      fn();                                                                                                            // 411
      nextTick();                                                                                                      // 412
    });                                                                                                                // 413
  };                                                                                                                   // 414
                                                                                                                       // 415
  return scheduler;                                                                                                    // 416
                                                                                                                       // 417
  function nextTick() {                                                                                                // 418
    if (!queue.length) return;                                                                                         // 419
                                                                                                                       // 420
    var items = queue.shift();                                                                                         // 421
    for (var i = 0; i < items.length; i++) {                                                                           // 422
      items[i]();                                                                                                      // 423
    }                                                                                                                  // 424
                                                                                                                       // 425
    if (!cancelFn) {                                                                                                   // 426
      $$rAF(function() {                                                                                               // 427
        if (!cancelFn) nextTick();                                                                                     // 428
      });                                                                                                              // 429
    }                                                                                                                  // 430
  }                                                                                                                    // 431
}];                                                                                                                    // 432
                                                                                                                       // 433
/**                                                                                                                    // 434
 * @ngdoc directive                                                                                                    // 435
 * @name ngAnimateChildren                                                                                             // 436
 * @restrict AE                                                                                                        // 437
 * @element ANY                                                                                                        // 438
 *                                                                                                                     // 439
 * @description                                                                                                        // 440
 *                                                                                                                     // 441
 * ngAnimateChildren allows you to specify that children of this element should animate even if any                    // 442
 * of the children's parents are currently animating. By default, when an element has an active `enter`, `leave`, or `move`
 * (structural) animation, child elements that also have an active structural animation are not animated.              // 444
 *                                                                                                                     // 445
 * Note that even if `ngAnimteChildren` is set, no child animations will run when the parent element is removed from the DOM (`leave` animation).
 *                                                                                                                     // 447
 *                                                                                                                     // 448
 * @param {string} ngAnimateChildren If the value is empty, `true` or `on`,                                            // 449
 *     then child animations are allowed. If the value is `false`, child animations are not allowed.                   // 450
 *                                                                                                                     // 451
 * @example                                                                                                            // 452
 * <example module="ngAnimateChildren" name="ngAnimateChildren" deps="angular-animate.js" animations="true">           // 453
     <file name="index.html">                                                                                          // 454
       <div ng-controller="mainController as main">                                                                    // 455
         <label>Show container? <input type="checkbox" ng-model="main.enterElement" /></label>                         // 456
         <label>Animate children? <input type="checkbox" ng-model="main.animateChildren" /></label>                    // 457
         <hr>                                                                                                          // 458
         <div ng-animate-children="{{main.animateChildren}}">                                                          // 459
           <div ng-if="main.enterElement" class="container">                                                           // 460
             List of items:                                                                                            // 461
             <div ng-repeat="item in [0, 1, 2, 3]" class="item">Item {{item}}</div>                                    // 462
           </div>                                                                                                      // 463
         </div>                                                                                                        // 464
       </div>                                                                                                          // 465
     </file>                                                                                                           // 466
     <file name="animations.css">                                                                                      // 467
                                                                                                                       // 468
      .container.ng-enter,                                                                                             // 469
      .container.ng-leave {                                                                                            // 470
        transition: all ease 1.5s;                                                                                     // 471
      }                                                                                                                // 472
                                                                                                                       // 473
      .container.ng-enter,                                                                                             // 474
      .container.ng-leave-active {                                                                                     // 475
        opacity: 0;                                                                                                    // 476
      }                                                                                                                // 477
                                                                                                                       // 478
      .container.ng-leave,                                                                                             // 479
      .container.ng-enter-active {                                                                                     // 480
        opacity: 1;                                                                                                    // 481
      }                                                                                                                // 482
                                                                                                                       // 483
      .item {                                                                                                          // 484
        background: firebrick;                                                                                         // 485
        color: #FFF;                                                                                                   // 486
        margin-bottom: 10px;                                                                                           // 487
      }                                                                                                                // 488
                                                                                                                       // 489
      .item.ng-enter,                                                                                                  // 490
      .item.ng-leave {                                                                                                 // 491
        transition: transform 1.5s ease;                                                                               // 492
      }                                                                                                                // 493
                                                                                                                       // 494
      .item.ng-enter {                                                                                                 // 495
        transform: translateX(50px);                                                                                   // 496
      }                                                                                                                // 497
                                                                                                                       // 498
      .item.ng-enter-active {                                                                                          // 499
        transform: translateX(0);                                                                                      // 500
      }                                                                                                                // 501
    </file>                                                                                                            // 502
    <file name="script.js">                                                                                            // 503
      angular.module('ngAnimateChildren', ['ngAnimate'])                                                               // 504
        .controller('mainController', function() {                                                                     // 505
          this.animateChildren = false;                                                                                // 506
          this.enterElement = false;                                                                                   // 507
        });                                                                                                            // 508
    </file>                                                                                                            // 509
  </example>                                                                                                           // 510
 */                                                                                                                    // 511
var $$AnimateChildrenDirective = ['$interpolate', function($interpolate) {                                             // 512
  return {                                                                                                             // 513
    link: function(scope, element, attrs) {                                                                            // 514
      var val = attrs.ngAnimateChildren;                                                                               // 515
      if (angular.isString(val) && val.length === 0) { //empty attribute                                               // 516
        element.data(NG_ANIMATE_CHILDREN_DATA, true);                                                                  // 517
      } else {                                                                                                         // 518
        // Interpolate and set the value, so that it is available to                                                   // 519
        // animations that run right after compilation                                                                 // 520
        setData($interpolate(val)(scope));                                                                             // 521
        attrs.$observe('ngAnimateChildren', setData);                                                                  // 522
      }                                                                                                                // 523
                                                                                                                       // 524
      function setData(value) {                                                                                        // 525
        value = value === 'on' || value === 'true';                                                                    // 526
        element.data(NG_ANIMATE_CHILDREN_DATA, value);                                                                 // 527
      }                                                                                                                // 528
    }                                                                                                                  // 529
  };                                                                                                                   // 530
}];                                                                                                                    // 531
                                                                                                                       // 532
var ANIMATE_TIMER_KEY = '$$animateCss';                                                                                // 533
                                                                                                                       // 534
/**                                                                                                                    // 535
 * @ngdoc service                                                                                                      // 536
 * @name $animateCss                                                                                                   // 537
 * @kind object                                                                                                        // 538
 *                                                                                                                     // 539
 * @description                                                                                                        // 540
 * The `$animateCss` service is a useful utility to trigger customized CSS-based transitions/keyframes                 // 541
 * from a JavaScript-based animation or directly from a directive. The purpose of `$animateCss` is NOT                 // 542
 * to side-step how `$animate` and ngAnimate work, but the goal is to allow pre-existing animations or                 // 543
 * directives to create more complex animations that can be purely driven using CSS code.                              // 544
 *                                                                                                                     // 545
 * Note that only browsers that support CSS transitions and/or keyframe animations are capable of                      // 546
 * rendering animations triggered via `$animateCss` (bad news for IE9 and lower).                                      // 547
 *                                                                                                                     // 548
 * ## Usage                                                                                                            // 549
 * Once again, `$animateCss` is designed to be used inside of a registered JavaScript animation that                   // 550
 * is powered by ngAnimate. It is possible to use `$animateCss` directly inside of a directive, however,               // 551
 * any automatic control over cancelling animations and/or preventing animations from being run on                     // 552
 * child elements will not be handled by Angular. For this to work as expected, please use `$animate` to               // 553
 * trigger the animation and then setup a JavaScript animation that injects `$animateCss` to trigger                   // 554
 * the CSS animation.                                                                                                  // 555
 *                                                                                                                     // 556
 * The example below shows how we can create a folding animation on an element using `ng-if`:                          // 557
 *                                                                                                                     // 558
 * ```html                                                                                                             // 559
 * <!-- notice the `fold-animation` CSS class -->                                                                      // 560
 * <div ng-if="onOff" class="fold-animation">                                                                          // 561
 *   This element will go BOOM                                                                                         // 562
 * </div>                                                                                                              // 563
 * <button ng-click="onOff=true">Fold In</button>                                                                      // 564
 * ```                                                                                                                 // 565
 *                                                                                                                     // 566
 * Now we create the **JavaScript animation** that will trigger the CSS transition:                                    // 567
 *                                                                                                                     // 568
 * ```js                                                                                                               // 569
 * ngModule.animation('.fold-animation', ['$animateCss', function($animateCss) {                                       // 570
 *   return {                                                                                                          // 571
 *     enter: function(element, doneFn) {                                                                              // 572
 *       var height = element[0].offsetHeight;                                                                         // 573
 *       return $animateCss(element, {                                                                                 // 574
 *         from: { height:'0px' },                                                                                     // 575
 *         to: { height:height + 'px' },                                                                               // 576
 *         duration: 1 // one second                                                                                   // 577
 *       });                                                                                                           // 578
 *     }                                                                                                               // 579
 *   }                                                                                                                 // 580
 * }]);                                                                                                                // 581
 * ```                                                                                                                 // 582
 *                                                                                                                     // 583
 * ## More Advanced Uses                                                                                               // 584
 *                                                                                                                     // 585
 * `$animateCss` is the underlying code that ngAnimate uses to power **CSS-based animations** behind the scenes. Therefore CSS hooks
 * like `.ng-EVENT`, `.ng-EVENT-active`, `.ng-EVENT-stagger` are all features that can be triggered using `$animateCss` via JavaScript code.
 *                                                                                                                     // 588
 * This also means that just about any combination of adding classes, removing classes, setting styles, dynamically setting a keyframe animation,
 * applying a hardcoded duration or delay value, changing the animation easing or applying a stagger animation are all options that work with
 * `$animateCss`. The service itself is smart enough to figure out the combination of options and examine the element styling properties in order
 * to provide a working animation that will run in CSS.                                                                // 592
 *                                                                                                                     // 593
 * The example below showcases a more advanced version of the `.fold-animation` from the example above:                // 594
 *                                                                                                                     // 595
 * ```js                                                                                                               // 596
 * ngModule.animation('.fold-animation', ['$animateCss', function($animateCss) {                                       // 597
 *   return {                                                                                                          // 598
 *     enter: function(element, doneFn) {                                                                              // 599
 *       var height = element[0].offsetHeight;                                                                         // 600
 *       return $animateCss(element, {                                                                                 // 601
 *         addClass: 'red large-text pulse-twice',                                                                     // 602
 *         easing: 'ease-out',                                                                                         // 603
 *         from: { height:'0px' },                                                                                     // 604
 *         to: { height:height + 'px' },                                                                               // 605
 *         duration: 1 // one second                                                                                   // 606
 *       });                                                                                                           // 607
 *     }                                                                                                               // 608
 *   }                                                                                                                 // 609
 * }]);                                                                                                                // 610
 * ```                                                                                                                 // 611
 *                                                                                                                     // 612
 * Since we're adding/removing CSS classes then the CSS transition will also pick those up:                            // 613
 *                                                                                                                     // 614
 * ```css                                                                                                              // 615
 * /&#42; since a hardcoded duration value of 1 was provided in the JavaScript animation code,                         // 616
 * the CSS classes below will be transitioned despite them being defined as regular CSS classes &#42;/                 // 617
 * .red { background:red; }                                                                                            // 618
 * .large-text { font-size:20px; }                                                                                     // 619
 *                                                                                                                     // 620
 * /&#42; we can also use a keyframe animation and $animateCss will make it work alongside the transition &#42;/       // 621
 * .pulse-twice {                                                                                                      // 622
 *   animation: 0.5s pulse linear 2;                                                                                   // 623
 *   -webkit-animation: 0.5s pulse linear 2;                                                                           // 624
 * }                                                                                                                   // 625
 *                                                                                                                     // 626
 * @keyframes pulse {                                                                                                  // 627
 *   from { transform: scale(0.5); }                                                                                   // 628
 *   to { transform: scale(1.5); }                                                                                     // 629
 * }                                                                                                                   // 630
 *                                                                                                                     // 631
 * @-webkit-keyframes pulse {                                                                                          // 632
 *   from { -webkit-transform: scale(0.5); }                                                                           // 633
 *   to { -webkit-transform: scale(1.5); }                                                                             // 634
 * }                                                                                                                   // 635
 * ```                                                                                                                 // 636
 *                                                                                                                     // 637
 * Given this complex combination of CSS classes, styles and options, `$animateCss` will figure everything out and make the animation happen.
 *                                                                                                                     // 639
 * ## How the Options are handled                                                                                      // 640
 *                                                                                                                     // 641
 * `$animateCss` is very versatile and intelligent when it comes to figuring out what configurations to apply to the element to ensure the animation
 * works with the options provided. Say for example we were adding a class that contained a keyframe value and we wanted to also animate some inline
 * styles using the `from` and `to` properties.                                                                        // 644
 *                                                                                                                     // 645
 * ```js                                                                                                               // 646
 * var animator = $animateCss(element, {                                                                               // 647
 *   from: { background:'red' },                                                                                       // 648
 *   to: { background:'blue' }                                                                                         // 649
 * });                                                                                                                 // 650
 * animator.start();                                                                                                   // 651
 * ```                                                                                                                 // 652
 *                                                                                                                     // 653
 * ```css                                                                                                              // 654
 * .rotating-animation {                                                                                               // 655
 *   animation:0.5s rotate linear;                                                                                     // 656
 *   -webkit-animation:0.5s rotate linear;                                                                             // 657
 * }                                                                                                                   // 658
 *                                                                                                                     // 659
 * @keyframes rotate {                                                                                                 // 660
 *   from { transform: rotate(0deg); }                                                                                 // 661
 *   to { transform: rotate(360deg); }                                                                                 // 662
 * }                                                                                                                   // 663
 *                                                                                                                     // 664
 * @-webkit-keyframes rotate {                                                                                         // 665
 *   from { -webkit-transform: rotate(0deg); }                                                                         // 666
 *   to { -webkit-transform: rotate(360deg); }                                                                         // 667
 * }                                                                                                                   // 668
 * ```                                                                                                                 // 669
 *                                                                                                                     // 670
 * The missing pieces here are that we do not have a transition set (within the CSS code nor within the `$animateCss` options) and the duration of the animation is
 * going to be detected from what the keyframe styles on the CSS class are. In this event, `$animateCss` will automatically create an inline transition
 * style matching the duration detected from the keyframe style (which is present in the CSS class that is being added) and then prepare both the transition
 * and keyframe animations to run in parallel on the element. Then when the animation is underway the provided `from` and `to` CSS styles will be applied
 * and spread across the transition and keyframe animation.                                                            // 675
 *                                                                                                                     // 676
 * ## What is returned                                                                                                 // 677
 *                                                                                                                     // 678
 * `$animateCss` works in two stages: a preparation phase and an animation phase. Therefore when `$animateCss` is first called it will NOT actually
 * start the animation. All that is going on here is that the element is being prepared for the animation (which means that the generated CSS classes are
 * added and removed on the element). Once `$animateCss` is called it will return an object with the following properties:
 *                                                                                                                     // 682
 * ```js                                                                                                               // 683
 * var animator = $animateCss(element, { ... });                                                                       // 684
 * ```                                                                                                                 // 685
 *                                                                                                                     // 686
 * Now what do the contents of our `animator` variable look like:                                                      // 687
 *                                                                                                                     // 688
 * ```js                                                                                                               // 689
 * {                                                                                                                   // 690
 *   // starts the animation                                                                                           // 691
 *   start: Function,                                                                                                  // 692
 *                                                                                                                     // 693
 *   // ends (aborts) the animation                                                                                    // 694
 *   end: Function                                                                                                     // 695
 * }                                                                                                                   // 696
 * ```                                                                                                                 // 697
 *                                                                                                                     // 698
 * To actually start the animation we need to run `animation.start()` which will then return a promise that we can hook into to detect when the animation ends.
 * If we choose not to run the animation then we MUST run `animation.end()` to perform a cleanup on the element (since some CSS classes and styles may have been
 * applied to the element during the preparation phase). Note that all other properties such as duration, delay, transitions and keyframes are just properties
 * and that changing them will not reconfigure the parameters of the animation.                                        // 702
 *                                                                                                                     // 703
 * ### runner.done() vs runner.then()                                                                                  // 704
 * It is documented that `animation.start()` will return a promise object and this is true, however, there is also an additional method available on the
 * runner called `.done(callbackFn)`. The done method works the same as `.finally(callbackFn)`, however, it does **not trigger a digest to occur**.
 * Therefore, for performance reasons, it's always best to use `runner.done(callback)` instead of `runner.then()`, `runner.catch()` or `runner.finally()`
 * unless you really need a digest to kick off afterwards.                                                             // 708
 *                                                                                                                     // 709
 * Keep in mind that, to make this easier, ngAnimate has tweaked the JS animations API to recognize when a runner instance is returned from $animateCss
 * (so there is no need to call `runner.done(doneFn)` inside of your JavaScript animation code).                       // 711
 * Check the {@link ngAnimate.$animateCss#usage animation code above} to see how this works.                           // 712
 *                                                                                                                     // 713
 * @param {DOMElement} element the element that will be animated                                                       // 714
 * @param {object} options the animation-related options that will be applied during the animation                     // 715
 *                                                                                                                     // 716
 * * `event` - The DOM event (e.g. enter, leave, move). When used, a generated CSS class of `ng-EVENT` and `ng-EVENT-active` will be applied
 * to the element during the animation. Multiple events can be provided when spaces are used as a separator. (Note that this will not perform any DOM operation.)
 * * `structural` - Indicates that the `ng-` prefix will be added to the event class. Setting to `false` or omitting will turn `ng-EVENT` and
 * `ng-EVENT-active` in `EVENT` and `EVENT-active`. Unused if `event` is omitted.                                      // 720
 * * `easing` - The CSS easing value that will be applied to the transition or keyframe animation (or both).           // 721
 * * `transitionStyle` - The raw CSS transition style that will be used (e.g. `1s linear all`).                        // 722
 * * `keyframeStyle` - The raw CSS keyframe animation style that will be used (e.g. `1s my_animation linear`).         // 723
 * * `from` - The starting CSS styles (a key/value object) that will be applied at the start of the animation.         // 724
 * * `to` - The ending CSS styles (a key/value object) that will be applied across the animation via a CSS transition.
 * * `addClass` - A space separated list of CSS classes that will be added to the element and spread across the animation.
 * * `removeClass` - A space separated list of CSS classes that will be removed from the element and spread across the animation.
 * * `duration` - A number value representing the total duration of the transition and/or keyframe (note that a value of 1 is 1000ms). If a value of `0`
 * is provided then the animation will be skipped entirely.                                                            // 729
 * * `delay` - A number value representing the total delay of the transition and/or keyframe (note that a value of 1 is 1000ms). If a value of `true` is
 * used then whatever delay value is detected from the CSS classes will be mirrored on the elements styles (e.g. by setting delay true then the style value
 * of the element will be `transition-delay: DETECTED_VALUE`). Using `true` is useful when you want the CSS classes and inline styles to all share the same
 * CSS delay value.                                                                                                    // 733
 * * `stagger` - A numeric time value representing the delay between successively animated elements                    // 734
 * ({@link ngAnimate#css-staggering-animations Click here to learn how CSS-based staggering works in ngAnimate.})      // 735
 * * `staggerIndex` - The numeric index representing the stagger item (e.g. a value of 5 is equal to the sixth item in the stagger; therefore when a
 *   `stagger` option value of `0.1` is used then there will be a stagger delay of `600ms`)                            // 737
 * * `applyClassesEarly` - Whether or not the classes being added or removed will be used when detecting the animation. This is set by `$animate` when enter/leave/move animations are fired to ensure that the CSS classes are resolved in time. (Note that this will prevent any transitions from occurring on the classes being added and removed.)
 * * `cleanupStyles` - Whether or not the provided `from` and `to` styles will be removed once                         // 739
 *    the animation is closed. This is useful for when the styles are used purely for the sake of                      // 740
 *    the animation and do not have a lasting visual effect on the element (e.g. a collapse and open animation).       // 741
 *    By default this value is set to `false`.                                                                         // 742
 *                                                                                                                     // 743
 * @return {object} an object with start and end methods and details about the animation.                              // 744
 *                                                                                                                     // 745
 * * `start` - The method to start the animation. This will return a `Promise` when called.                            // 746
 * * `end` - This method will cancel the animation and remove all applied CSS classes and styles.                      // 747
 */                                                                                                                    // 748
var ONE_SECOND = 1000;                                                                                                 // 749
var BASE_TEN = 10;                                                                                                     // 750
                                                                                                                       // 751
var ELAPSED_TIME_MAX_DECIMAL_PLACES = 3;                                                                               // 752
var CLOSING_TIME_BUFFER = 1.5;                                                                                         // 753
                                                                                                                       // 754
var DETECT_CSS_PROPERTIES = {                                                                                          // 755
  transitionDuration:      TRANSITION_DURATION_PROP,                                                                   // 756
  transitionDelay:         TRANSITION_DELAY_PROP,                                                                      // 757
  transitionProperty:      TRANSITION_PROP + PROPERTY_KEY,                                                             // 758
  animationDuration:       ANIMATION_DURATION_PROP,                                                                    // 759
  animationDelay:          ANIMATION_DELAY_PROP,                                                                       // 760
  animationIterationCount: ANIMATION_PROP + ANIMATION_ITERATION_COUNT_KEY                                              // 761
};                                                                                                                     // 762
                                                                                                                       // 763
var DETECT_STAGGER_CSS_PROPERTIES = {                                                                                  // 764
  transitionDuration:      TRANSITION_DURATION_PROP,                                                                   // 765
  transitionDelay:         TRANSITION_DELAY_PROP,                                                                      // 766
  animationDuration:       ANIMATION_DURATION_PROP,                                                                    // 767
  animationDelay:          ANIMATION_DELAY_PROP                                                                        // 768
};                                                                                                                     // 769
                                                                                                                       // 770
function getCssKeyframeDurationStyle(duration) {                                                                       // 771
  return [ANIMATION_DURATION_PROP, duration + 's'];                                                                    // 772
}                                                                                                                      // 773
                                                                                                                       // 774
function getCssDelayStyle(delay, isKeyframeAnimation) {                                                                // 775
  var prop = isKeyframeAnimation ? ANIMATION_DELAY_PROP : TRANSITION_DELAY_PROP;                                       // 776
  return [prop, delay + 's'];                                                                                          // 777
}                                                                                                                      // 778
                                                                                                                       // 779
function computeCssStyles($window, element, properties) {                                                              // 780
  var styles = Object.create(null);                                                                                    // 781
  var detectedStyles = $window.getComputedStyle(element) || {};                                                        // 782
  forEach(properties, function(formalStyleName, actualStyleName) {                                                     // 783
    var val = detectedStyles[formalStyleName];                                                                         // 784
    if (val) {                                                                                                         // 785
      var c = val.charAt(0);                                                                                           // 786
                                                                                                                       // 787
      // only numerical-based values have a negative sign or digit as the first value                                  // 788
      if (c === '-' || c === '+' || c >= 0) {                                                                          // 789
        val = parseMaxTime(val);                                                                                       // 790
      }                                                                                                                // 791
                                                                                                                       // 792
      // by setting this to null in the event that the delay is not set or is set directly as 0                        // 793
      // then we can still allow for negative values to be used later on and not mistake this                          // 794
      // value for being greater than any other negative value.                                                        // 795
      if (val === 0) {                                                                                                 // 796
        val = null;                                                                                                    // 797
      }                                                                                                                // 798
      styles[actualStyleName] = val;                                                                                   // 799
    }                                                                                                                  // 800
  });                                                                                                                  // 801
                                                                                                                       // 802
  return styles;                                                                                                       // 803
}                                                                                                                      // 804
                                                                                                                       // 805
function parseMaxTime(str) {                                                                                           // 806
  var maxValue = 0;                                                                                                    // 807
  var values = str.split(/\s*,\s*/);                                                                                   // 808
  forEach(values, function(value) {                                                                                    // 809
    // it's always safe to consider only second values and omit `ms` values since                                      // 810
    // getComputedStyle will always handle the conversion for us                                                       // 811
    if (value.charAt(value.length - 1) == 's') {                                                                       // 812
      value = value.substring(0, value.length - 1);                                                                    // 813
    }                                                                                                                  // 814
    value = parseFloat(value) || 0;                                                                                    // 815
    maxValue = maxValue ? Math.max(value, maxValue) : value;                                                           // 816
  });                                                                                                                  // 817
  return maxValue;                                                                                                     // 818
}                                                                                                                      // 819
                                                                                                                       // 820
function truthyTimingValue(val) {                                                                                      // 821
  return val === 0 || val != null;                                                                                     // 822
}                                                                                                                      // 823
                                                                                                                       // 824
function getCssTransitionDurationStyle(duration, applyOnlyDuration) {                                                  // 825
  var style = TRANSITION_PROP;                                                                                         // 826
  var value = duration + 's';                                                                                          // 827
  if (applyOnlyDuration) {                                                                                             // 828
    style += DURATION_KEY;                                                                                             // 829
  } else {                                                                                                             // 830
    value += ' linear all';                                                                                            // 831
  }                                                                                                                    // 832
  return [style, value];                                                                                               // 833
}                                                                                                                      // 834
                                                                                                                       // 835
function createLocalCacheLookup() {                                                                                    // 836
  var cache = Object.create(null);                                                                                     // 837
  return {                                                                                                             // 838
    flush: function() {                                                                                                // 839
      cache = Object.create(null);                                                                                     // 840
    },                                                                                                                 // 841
                                                                                                                       // 842
    count: function(key) {                                                                                             // 843
      var entry = cache[key];                                                                                          // 844
      return entry ? entry.total : 0;                                                                                  // 845
    },                                                                                                                 // 846
                                                                                                                       // 847
    get: function(key) {                                                                                               // 848
      var entry = cache[key];                                                                                          // 849
      return entry && entry.value;                                                                                     // 850
    },                                                                                                                 // 851
                                                                                                                       // 852
    put: function(key, value) {                                                                                        // 853
      if (!cache[key]) {                                                                                               // 854
        cache[key] = { total: 1, value: value };                                                                       // 855
      } else {                                                                                                         // 856
        cache[key].total++;                                                                                            // 857
      }                                                                                                                // 858
    }                                                                                                                  // 859
  };                                                                                                                   // 860
}                                                                                                                      // 861
                                                                                                                       // 862
// we do not reassign an already present style value since                                                             // 863
// if we detect the style property value again we may be                                                               // 864
// detecting styles that were added via the `from` styles.                                                             // 865
// We make use of `isDefined` here since an empty string                                                               // 866
// or null value (which is what getPropertyValue will return                                                           // 867
// for a non-existing style) will still be marked as a valid                                                           // 868
// value for the style (a falsy value implies that the style                                                           // 869
// is to be removed at the end of the animation). If we had a simple                                                   // 870
// "OR" statement then it would not be enough to catch that.                                                           // 871
function registerRestorableStyles(backup, node, properties) {                                                          // 872
  forEach(properties, function(prop) {                                                                                 // 873
    backup[prop] = isDefined(backup[prop])                                                                             // 874
        ? backup[prop]                                                                                                 // 875
        : node.style.getPropertyValue(prop);                                                                           // 876
  });                                                                                                                  // 877
}                                                                                                                      // 878
                                                                                                                       // 879
var $AnimateCssProvider = ['$animateProvider', function($animateProvider) {                                            // 880
  var gcsLookup = createLocalCacheLookup();                                                                            // 881
  var gcsStaggerLookup = createLocalCacheLookup();                                                                     // 882
                                                                                                                       // 883
  this.$get = ['$window', '$$jqLite', '$$AnimateRunner', '$timeout',                                                   // 884
               '$$forceReflow', '$sniffer', '$$rAFScheduler', '$$animateQueue',                                        // 885
       function($window,   $$jqLite,   $$AnimateRunner,   $timeout,                                                    // 886
                $$forceReflow,   $sniffer,   $$rAFScheduler, $$animateQueue) {                                         // 887
                                                                                                                       // 888
    var applyAnimationClasses = applyAnimationClassesFactory($$jqLite);                                                // 889
                                                                                                                       // 890
    var parentCounter = 0;                                                                                             // 891
    function gcsHashFn(node, extraClasses) {                                                                           // 892
      var KEY = "$$ngAnimateParentKey";                                                                                // 893
      var parentNode = node.parentNode;                                                                                // 894
      var parentID = parentNode[KEY] || (parentNode[KEY] = ++parentCounter);                                           // 895
      return parentID + '-' + node.getAttribute('class') + '-' + extraClasses;                                         // 896
    }                                                                                                                  // 897
                                                                                                                       // 898
    function computeCachedCssStyles(node, className, cacheKey, properties) {                                           // 899
      var timings = gcsLookup.get(cacheKey);                                                                           // 900
                                                                                                                       // 901
      if (!timings) {                                                                                                  // 902
        timings = computeCssStyles($window, node, properties);                                                         // 903
        if (timings.animationIterationCount === 'infinite') {                                                          // 904
          timings.animationIterationCount = 1;                                                                         // 905
        }                                                                                                              // 906
      }                                                                                                                // 907
                                                                                                                       // 908
      // we keep putting this in multiple times even though the value and the cacheKey are the same                    // 909
      // because we're keeping an internal tally of how many duplicate animations are detected.                        // 910
      gcsLookup.put(cacheKey, timings);                                                                                // 911
      return timings;                                                                                                  // 912
    }                                                                                                                  // 913
                                                                                                                       // 914
    function computeCachedCssStaggerStyles(node, className, cacheKey, properties) {                                    // 915
      var stagger;                                                                                                     // 916
                                                                                                                       // 917
      // if we have one or more existing matches of matching elements                                                  // 918
      // containing the same parent + CSS styles (which is how cacheKey works)                                         // 919
      // then staggering is possible                                                                                   // 920
      if (gcsLookup.count(cacheKey) > 0) {                                                                             // 921
        stagger = gcsStaggerLookup.get(cacheKey);                                                                      // 922
                                                                                                                       // 923
        if (!stagger) {                                                                                                // 924
          var staggerClassName = pendClasses(className, '-stagger');                                                   // 925
                                                                                                                       // 926
          $$jqLite.addClass(node, staggerClassName);                                                                   // 927
                                                                                                                       // 928
          stagger = computeCssStyles($window, node, properties);                                                       // 929
                                                                                                                       // 930
          // force the conversion of a null value to zero incase not set                                               // 931
          stagger.animationDuration = Math.max(stagger.animationDuration, 0);                                          // 932
          stagger.transitionDuration = Math.max(stagger.transitionDuration, 0);                                        // 933
                                                                                                                       // 934
          $$jqLite.removeClass(node, staggerClassName);                                                                // 935
                                                                                                                       // 936
          gcsStaggerLookup.put(cacheKey, stagger);                                                                     // 937
        }                                                                                                              // 938
      }                                                                                                                // 939
                                                                                                                       // 940
      return stagger || {};                                                                                            // 941
    }                                                                                                                  // 942
                                                                                                                       // 943
    var cancelLastRAFRequest;                                                                                          // 944
    var rafWaitQueue = [];                                                                                             // 945
    function waitUntilQuiet(callback) {                                                                                // 946
      rafWaitQueue.push(callback);                                                                                     // 947
      $$rAFScheduler.waitUntilQuiet(function() {                                                                       // 948
        gcsLookup.flush();                                                                                             // 949
        gcsStaggerLookup.flush();                                                                                      // 950
                                                                                                                       // 951
        // DO NOT REMOVE THIS LINE OR REFACTOR OUT THE `pageWidth` variable.                                           // 952
        // PLEASE EXAMINE THE `$$forceReflow` service to understand why.                                               // 953
        var pageWidth = $$forceReflow();                                                                               // 954
                                                                                                                       // 955
        // we use a for loop to ensure that if the queue is changed                                                    // 956
        // during this looping then it will consider new requests                                                      // 957
        for (var i = 0; i < rafWaitQueue.length; i++) {                                                                // 958
          rafWaitQueue[i](pageWidth);                                                                                  // 959
        }                                                                                                              // 960
        rafWaitQueue.length = 0;                                                                                       // 961
      });                                                                                                              // 962
    }                                                                                                                  // 963
                                                                                                                       // 964
    function computeTimings(node, className, cacheKey) {                                                               // 965
      var timings = computeCachedCssStyles(node, className, cacheKey, DETECT_CSS_PROPERTIES);                          // 966
      var aD = timings.animationDelay;                                                                                 // 967
      var tD = timings.transitionDelay;                                                                                // 968
      timings.maxDelay = aD && tD                                                                                      // 969
          ? Math.max(aD, tD)                                                                                           // 970
          : (aD || tD);                                                                                                // 971
      timings.maxDuration = Math.max(                                                                                  // 972
          timings.animationDuration * timings.animationIterationCount,                                                 // 973
          timings.transitionDuration);                                                                                 // 974
                                                                                                                       // 975
      return timings;                                                                                                  // 976
    }                                                                                                                  // 977
                                                                                                                       // 978
    return function init(element, initialOptions) {                                                                    // 979
      // all of the animation functions should create                                                                  // 980
      // a copy of the options data, however, if a                                                                     // 981
      // parent service has already created a copy then                                                                // 982
      // we should stick to using that                                                                                 // 983
      var options = initialOptions || {};                                                                              // 984
      if (!options.$$prepared) {                                                                                       // 985
        options = prepareAnimationOptions(copy(options));                                                              // 986
      }                                                                                                                // 987
                                                                                                                       // 988
      var restoreStyles = {};                                                                                          // 989
      var node = getDomNode(element);                                                                                  // 990
      if (!node                                                                                                        // 991
          || !node.parentNode                                                                                          // 992
          || !$$animateQueue.enabled()) {                                                                              // 993
        return closeAndReturnNoopAnimator();                                                                           // 994
      }                                                                                                                // 995
                                                                                                                       // 996
      var temporaryStyles = [];                                                                                        // 997
      var classes = element.attr('class');                                                                             // 998
      var styles = packageStyles(options);                                                                             // 999
      var animationClosed;                                                                                             // 1000
      var animationPaused;                                                                                             // 1001
      var animationCompleted;                                                                                          // 1002
      var runner;                                                                                                      // 1003
      var runnerHost;                                                                                                  // 1004
      var maxDelay;                                                                                                    // 1005
      var maxDelayTime;                                                                                                // 1006
      var maxDuration;                                                                                                 // 1007
      var maxDurationTime;                                                                                             // 1008
      var startTime;                                                                                                   // 1009
      var events = [];                                                                                                 // 1010
                                                                                                                       // 1011
      if (options.duration === 0 || (!$sniffer.animations && !$sniffer.transitions)) {                                 // 1012
        return closeAndReturnNoopAnimator();                                                                           // 1013
      }                                                                                                                // 1014
                                                                                                                       // 1015
      var method = options.event && isArray(options.event)                                                             // 1016
            ? options.event.join(' ')                                                                                  // 1017
            : options.event;                                                                                           // 1018
                                                                                                                       // 1019
      var isStructural = method && options.structural;                                                                 // 1020
      var structuralClassName = '';                                                                                    // 1021
      var addRemoveClassName = '';                                                                                     // 1022
                                                                                                                       // 1023
      if (isStructural) {                                                                                              // 1024
        structuralClassName = pendClasses(method, EVENT_CLASS_PREFIX, true);                                           // 1025
      } else if (method) {                                                                                             // 1026
        structuralClassName = method;                                                                                  // 1027
      }                                                                                                                // 1028
                                                                                                                       // 1029
      if (options.addClass) {                                                                                          // 1030
        addRemoveClassName += pendClasses(options.addClass, ADD_CLASS_SUFFIX);                                         // 1031
      }                                                                                                                // 1032
                                                                                                                       // 1033
      if (options.removeClass) {                                                                                       // 1034
        if (addRemoveClassName.length) {                                                                               // 1035
          addRemoveClassName += ' ';                                                                                   // 1036
        }                                                                                                              // 1037
        addRemoveClassName += pendClasses(options.removeClass, REMOVE_CLASS_SUFFIX);                                   // 1038
      }                                                                                                                // 1039
                                                                                                                       // 1040
      // there may be a situation where a structural animation is combined together                                    // 1041
      // with CSS classes that need to resolve before the animation is computed.                                       // 1042
      // However this means that there is no explicit CSS code to block the animation                                  // 1043
      // from happening (by setting 0s none in the class name). If this is the case                                    // 1044
      // we need to apply the classes before the first rAF so we know to continue if                                   // 1045
      // there actually is a detected transition or keyframe animation                                                 // 1046
      if (options.applyClassesEarly && addRemoveClassName.length) {                                                    // 1047
        applyAnimationClasses(element, options);                                                                       // 1048
      }                                                                                                                // 1049
                                                                                                                       // 1050
      var preparationClasses = [structuralClassName, addRemoveClassName].join(' ').trim();                             // 1051
      var fullClassName = classes + ' ' + preparationClasses;                                                          // 1052
      var activeClasses = pendClasses(preparationClasses, ACTIVE_CLASS_SUFFIX);                                        // 1053
      var hasToStyles = styles.to && Object.keys(styles.to).length > 0;                                                // 1054
      var containsKeyframeAnimation = (options.keyframeStyle || '').length > 0;                                        // 1055
                                                                                                                       // 1056
      // there is no way we can trigger an animation if no styles and                                                  // 1057
      // no classes are being applied which would then trigger a transition,                                           // 1058
      // unless there a is raw keyframe value that is applied to the element.                                          // 1059
      if (!containsKeyframeAnimation                                                                                   // 1060
           && !hasToStyles                                                                                             // 1061
           && !preparationClasses) {                                                                                   // 1062
        return closeAndReturnNoopAnimator();                                                                           // 1063
      }                                                                                                                // 1064
                                                                                                                       // 1065
      var cacheKey, stagger;                                                                                           // 1066
      if (options.stagger > 0) {                                                                                       // 1067
        var staggerVal = parseFloat(options.stagger);                                                                  // 1068
        stagger = {                                                                                                    // 1069
          transitionDelay: staggerVal,                                                                                 // 1070
          animationDelay: staggerVal,                                                                                  // 1071
          transitionDuration: 0,                                                                                       // 1072
          animationDuration: 0                                                                                         // 1073
        };                                                                                                             // 1074
      } else {                                                                                                         // 1075
        cacheKey = gcsHashFn(node, fullClassName);                                                                     // 1076
        stagger = computeCachedCssStaggerStyles(node, preparationClasses, cacheKey, DETECT_STAGGER_CSS_PROPERTIES);    // 1077
      }                                                                                                                // 1078
                                                                                                                       // 1079
      if (!options.$$skipPreparationClasses) {                                                                         // 1080
        $$jqLite.addClass(element, preparationClasses);                                                                // 1081
      }                                                                                                                // 1082
                                                                                                                       // 1083
      var applyOnlyDuration;                                                                                           // 1084
                                                                                                                       // 1085
      if (options.transitionStyle) {                                                                                   // 1086
        var transitionStyle = [TRANSITION_PROP, options.transitionStyle];                                              // 1087
        applyInlineStyle(node, transitionStyle);                                                                       // 1088
        temporaryStyles.push(transitionStyle);                                                                         // 1089
      }                                                                                                                // 1090
                                                                                                                       // 1091
      if (options.duration >= 0) {                                                                                     // 1092
        applyOnlyDuration = node.style[TRANSITION_PROP].length > 0;                                                    // 1093
        var durationStyle = getCssTransitionDurationStyle(options.duration, applyOnlyDuration);                        // 1094
                                                                                                                       // 1095
        // we set the duration so that it will be picked up by getComputedStyle later                                  // 1096
        applyInlineStyle(node, durationStyle);                                                                         // 1097
        temporaryStyles.push(durationStyle);                                                                           // 1098
      }                                                                                                                // 1099
                                                                                                                       // 1100
      if (options.keyframeStyle) {                                                                                     // 1101
        var keyframeStyle = [ANIMATION_PROP, options.keyframeStyle];                                                   // 1102
        applyInlineStyle(node, keyframeStyle);                                                                         // 1103
        temporaryStyles.push(keyframeStyle);                                                                           // 1104
      }                                                                                                                // 1105
                                                                                                                       // 1106
      var itemIndex = stagger                                                                                          // 1107
          ? options.staggerIndex >= 0                                                                                  // 1108
              ? options.staggerIndex                                                                                   // 1109
              : gcsLookup.count(cacheKey)                                                                              // 1110
          : 0;                                                                                                         // 1111
                                                                                                                       // 1112
      var isFirst = itemIndex === 0;                                                                                   // 1113
                                                                                                                       // 1114
      // this is a pre-emptive way of forcing the setup classes to be added and applied INSTANTLY                      // 1115
      // without causing any combination of transitions to kick in. By adding a negative delay value                   // 1116
      // it forces the setup class' transition to end immediately. We later then remove the negative                   // 1117
      // transition delay to allow for the transition to naturally do it's thing. The beauty here is                   // 1118
      // that if there is no transition defined then nothing will happen and this will also allow                      // 1119
      // other transitions to be stacked on top of each other without any chopping them out.                           // 1120
      if (isFirst && !options.skipBlocking) {                                                                          // 1121
        blockTransitions(node, SAFE_FAST_FORWARD_DURATION_VALUE);                                                      // 1122
      }                                                                                                                // 1123
                                                                                                                       // 1124
      var timings = computeTimings(node, fullClassName, cacheKey);                                                     // 1125
      var relativeDelay = timings.maxDelay;                                                                            // 1126
      maxDelay = Math.max(relativeDelay, 0);                                                                           // 1127
      maxDuration = timings.maxDuration;                                                                               // 1128
                                                                                                                       // 1129
      var flags = {};                                                                                                  // 1130
      flags.hasTransitions          = timings.transitionDuration > 0;                                                  // 1131
      flags.hasAnimations           = timings.animationDuration > 0;                                                   // 1132
      flags.hasTransitionAll        = flags.hasTransitions && timings.transitionProperty == 'all';                     // 1133
      flags.applyTransitionDuration = hasToStyles && (                                                                 // 1134
                                        (flags.hasTransitions && !flags.hasTransitionAll)                              // 1135
                                         || (flags.hasAnimations && !flags.hasTransitions));                           // 1136
      flags.applyAnimationDuration  = options.duration && flags.hasAnimations;                                         // 1137
      flags.applyTransitionDelay    = truthyTimingValue(options.delay) && (flags.applyTransitionDuration || flags.hasTransitions);
      flags.applyAnimationDelay     = truthyTimingValue(options.delay) && flags.hasAnimations;                         // 1139
      flags.recalculateTimingStyles = addRemoveClassName.length > 0;                                                   // 1140
                                                                                                                       // 1141
      if (flags.applyTransitionDuration || flags.applyAnimationDuration) {                                             // 1142
        maxDuration = options.duration ? parseFloat(options.duration) : maxDuration;                                   // 1143
                                                                                                                       // 1144
        if (flags.applyTransitionDuration) {                                                                           // 1145
          flags.hasTransitions = true;                                                                                 // 1146
          timings.transitionDuration = maxDuration;                                                                    // 1147
          applyOnlyDuration = node.style[TRANSITION_PROP + PROPERTY_KEY].length > 0;                                   // 1148
          temporaryStyles.push(getCssTransitionDurationStyle(maxDuration, applyOnlyDuration));                         // 1149
        }                                                                                                              // 1150
                                                                                                                       // 1151
        if (flags.applyAnimationDuration) {                                                                            // 1152
          flags.hasAnimations = true;                                                                                  // 1153
          timings.animationDuration = maxDuration;                                                                     // 1154
          temporaryStyles.push(getCssKeyframeDurationStyle(maxDuration));                                              // 1155
        }                                                                                                              // 1156
      }                                                                                                                // 1157
                                                                                                                       // 1158
      if (maxDuration === 0 && !flags.recalculateTimingStyles) {                                                       // 1159
        return closeAndReturnNoopAnimator();                                                                           // 1160
      }                                                                                                                // 1161
                                                                                                                       // 1162
      if (options.delay != null) {                                                                                     // 1163
        var delayStyle;                                                                                                // 1164
        if (typeof options.delay !== "boolean") {                                                                      // 1165
          delayStyle = parseFloat(options.delay);                                                                      // 1166
          // number in options.delay means we have to recalculate the delay for the closing timeout                    // 1167
          maxDelay = Math.max(delayStyle, 0);                                                                          // 1168
        }                                                                                                              // 1169
                                                                                                                       // 1170
        if (flags.applyTransitionDelay) {                                                                              // 1171
          temporaryStyles.push(getCssDelayStyle(delayStyle));                                                          // 1172
        }                                                                                                              // 1173
                                                                                                                       // 1174
        if (flags.applyAnimationDelay) {                                                                               // 1175
          temporaryStyles.push(getCssDelayStyle(delayStyle, true));                                                    // 1176
        }                                                                                                              // 1177
      }                                                                                                                // 1178
                                                                                                                       // 1179
      // we need to recalculate the delay value since we used a pre-emptive negative                                   // 1180
      // delay value and the delay value is required for the final event checking. This                                // 1181
      // property will ensure that this will happen after the RAF phase has passed.                                    // 1182
      if (options.duration == null && timings.transitionDuration > 0) {                                                // 1183
        flags.recalculateTimingStyles = flags.recalculateTimingStyles || isFirst;                                      // 1184
      }                                                                                                                // 1185
                                                                                                                       // 1186
      maxDelayTime = maxDelay * ONE_SECOND;                                                                            // 1187
      maxDurationTime = maxDuration * ONE_SECOND;                                                                      // 1188
      if (!options.skipBlocking) {                                                                                     // 1189
        flags.blockTransition = timings.transitionDuration > 0;                                                        // 1190
        flags.blockKeyframeAnimation = timings.animationDuration > 0 &&                                                // 1191
                                       stagger.animationDelay > 0 &&                                                   // 1192
                                       stagger.animationDuration === 0;                                                // 1193
      }                                                                                                                // 1194
                                                                                                                       // 1195
      if (options.from) {                                                                                              // 1196
        if (options.cleanupStyles) {                                                                                   // 1197
          registerRestorableStyles(restoreStyles, node, Object.keys(options.from));                                    // 1198
        }                                                                                                              // 1199
        applyAnimationFromStyles(element, options);                                                                    // 1200
      }                                                                                                                // 1201
                                                                                                                       // 1202
      if (flags.blockTransition || flags.blockKeyframeAnimation) {                                                     // 1203
        applyBlocking(maxDuration);                                                                                    // 1204
      } else if (!options.skipBlocking) {                                                                              // 1205
        blockTransitions(node, false);                                                                                 // 1206
      }                                                                                                                // 1207
                                                                                                                       // 1208
      // TODO(matsko): for 1.5 change this code to have an animator object for better debugging                        // 1209
      return {                                                                                                         // 1210
        $$willAnimate: true,                                                                                           // 1211
        end: endFn,                                                                                                    // 1212
        start: function() {                                                                                            // 1213
          if (animationClosed) return;                                                                                 // 1214
                                                                                                                       // 1215
          runnerHost = {                                                                                               // 1216
            end: endFn,                                                                                                // 1217
            cancel: cancelFn,                                                                                          // 1218
            resume: null, //this will be set during the start() phase                                                  // 1219
            pause: null                                                                                                // 1220
          };                                                                                                           // 1221
                                                                                                                       // 1222
          runner = new $$AnimateRunner(runnerHost);                                                                    // 1223
                                                                                                                       // 1224
          waitUntilQuiet(start);                                                                                       // 1225
                                                                                                                       // 1226
          // we don't have access to pause/resume the animation                                                        // 1227
          // since it hasn't run yet. AnimateRunner will therefore                                                     // 1228
          // set noop functions for resume and pause and they will                                                     // 1229
          // later be overridden once the animation is triggered                                                       // 1230
          return runner;                                                                                               // 1231
        }                                                                                                              // 1232
      };                                                                                                               // 1233
                                                                                                                       // 1234
      function endFn() {                                                                                               // 1235
        close();                                                                                                       // 1236
      }                                                                                                                // 1237
                                                                                                                       // 1238
      function cancelFn() {                                                                                            // 1239
        close(true);                                                                                                   // 1240
      }                                                                                                                // 1241
                                                                                                                       // 1242
      function close(rejected) { // jshint ignore:line                                                                 // 1243
        // if the promise has been called already then we shouldn't close                                              // 1244
        // the animation again                                                                                         // 1245
        if (animationClosed || (animationCompleted && animationPaused)) return;                                        // 1246
        animationClosed = true;                                                                                        // 1247
        animationPaused = false;                                                                                       // 1248
                                                                                                                       // 1249
        if (!options.$$skipPreparationClasses) {                                                                       // 1250
          $$jqLite.removeClass(element, preparationClasses);                                                           // 1251
        }                                                                                                              // 1252
        $$jqLite.removeClass(element, activeClasses);                                                                  // 1253
                                                                                                                       // 1254
        blockKeyframeAnimations(node, false);                                                                          // 1255
        blockTransitions(node, false);                                                                                 // 1256
                                                                                                                       // 1257
        forEach(temporaryStyles, function(entry) {                                                                     // 1258
          // There is only one way to remove inline style properties entirely from elements.                           // 1259
          // By using `removeProperty` this works, but we need to convert camel-cased CSS                              // 1260
          // styles down to hyphenated values.                                                                         // 1261
          node.style[entry[0]] = '';                                                                                   // 1262
        });                                                                                                            // 1263
                                                                                                                       // 1264
        applyAnimationClasses(element, options);                                                                       // 1265
        applyAnimationStyles(element, options);                                                                        // 1266
                                                                                                                       // 1267
        if (Object.keys(restoreStyles).length) {                                                                       // 1268
          forEach(restoreStyles, function(value, prop) {                                                               // 1269
            value ? node.style.setProperty(prop, value)                                                                // 1270
                  : node.style.removeProperty(prop);                                                                   // 1271
          });                                                                                                          // 1272
        }                                                                                                              // 1273
                                                                                                                       // 1274
        // the reason why we have this option is to allow a synchronous closing callback                               // 1275
        // that is fired as SOON as the animation ends (when the CSS is removed) or if                                 // 1276
        // the animation never takes off at all. A good example is a leave animation since                             // 1277
        // the element must be removed just after the animation is over or else the element                            // 1278
        // will appear on screen for one animation frame causing an overbearing flicker.                               // 1279
        if (options.onDone) {                                                                                          // 1280
          options.onDone();                                                                                            // 1281
        }                                                                                                              // 1282
                                                                                                                       // 1283
        if (events && events.length) {                                                                                 // 1284
          // Remove the transitionend / animationend listener(s)                                                       // 1285
          element.off(events.join(' '), onAnimationProgress);                                                          // 1286
        }                                                                                                              // 1287
                                                                                                                       // 1288
        //Cancel the fallback closing timeout and remove the timer data                                                // 1289
        var animationTimerData = element.data(ANIMATE_TIMER_KEY);                                                      // 1290
        if (animationTimerData) {                                                                                      // 1291
          $timeout.cancel(animationTimerData[0].timer);                                                                // 1292
          element.removeData(ANIMATE_TIMER_KEY);                                                                       // 1293
        }                                                                                                              // 1294
                                                                                                                       // 1295
        // if the preparation function fails then the promise is not setup                                             // 1296
        if (runner) {                                                                                                  // 1297
          runner.complete(!rejected);                                                                                  // 1298
        }                                                                                                              // 1299
      }                                                                                                                // 1300
                                                                                                                       // 1301
      function applyBlocking(duration) {                                                                               // 1302
        if (flags.blockTransition) {                                                                                   // 1303
          blockTransitions(node, duration);                                                                            // 1304
        }                                                                                                              // 1305
                                                                                                                       // 1306
        if (flags.blockKeyframeAnimation) {                                                                            // 1307
          blockKeyframeAnimations(node, !!duration);                                                                   // 1308
        }                                                                                                              // 1309
      }                                                                                                                // 1310
                                                                                                                       // 1311
      function closeAndReturnNoopAnimator() {                                                                          // 1312
        runner = new $$AnimateRunner({                                                                                 // 1313
          end: endFn,                                                                                                  // 1314
          cancel: cancelFn                                                                                             // 1315
        });                                                                                                            // 1316
                                                                                                                       // 1317
        // should flush the cache animation                                                                            // 1318
        waitUntilQuiet(noop);                                                                                          // 1319
        close();                                                                                                       // 1320
                                                                                                                       // 1321
        return {                                                                                                       // 1322
          $$willAnimate: false,                                                                                        // 1323
          start: function() {                                                                                          // 1324
            return runner;                                                                                             // 1325
          },                                                                                                           // 1326
          end: endFn                                                                                                   // 1327
        };                                                                                                             // 1328
      }                                                                                                                // 1329
                                                                                                                       // 1330
      function onAnimationProgress(event) {                                                                            // 1331
        event.stopPropagation();                                                                                       // 1332
        var ev = event.originalEvent || event;                                                                         // 1333
                                                                                                                       // 1334
        // we now always use `Date.now()` due to the recent changes with                                               // 1335
        // event.timeStamp in Firefox, Webkit and Chrome (see #13494 for more info)                                    // 1336
        var timeStamp = ev.$manualTimeStamp || Date.now();                                                             // 1337
                                                                                                                       // 1338
        /* Firefox (or possibly just Gecko) likes to not round values up                                               // 1339
         * when a ms measurement is used for the animation */                                                          // 1340
        var elapsedTime = parseFloat(ev.elapsedTime.toFixed(ELAPSED_TIME_MAX_DECIMAL_PLACES));                         // 1341
                                                                                                                       // 1342
        /* $manualTimeStamp is a mocked timeStamp value which is set                                                   // 1343
         * within browserTrigger(). This is only here so that tests can                                                // 1344
         * mock animations properly. Real events fallback to event.timeStamp,                                          // 1345
         * or, if they don't, then a timeStamp is automatically created for them.                                      // 1346
         * We're checking to see if the timeStamp surpasses the expected delay,                                        // 1347
         * but we're using elapsedTime instead of the timeStamp on the 2nd                                             // 1348
         * pre-condition since animationPauseds sometimes close off early */                                           // 1349
        if (Math.max(timeStamp - startTime, 0) >= maxDelayTime && elapsedTime >= maxDuration) {                        // 1350
          // we set this flag to ensure that if the transition is paused then, when resumed,                           // 1351
          // the animation will automatically close itself since transitions cannot be paused.                         // 1352
          animationCompleted = true;                                                                                   // 1353
          close();                                                                                                     // 1354
        }                                                                                                              // 1355
      }                                                                                                                // 1356
                                                                                                                       // 1357
      function start() {                                                                                               // 1358
        if (animationClosed) return;                                                                                   // 1359
        if (!node.parentNode) {                                                                                        // 1360
          close();                                                                                                     // 1361
          return;                                                                                                      // 1362
        }                                                                                                              // 1363
                                                                                                                       // 1364
        // even though we only pause keyframe animations here the pause flag                                           // 1365
        // will still happen when transitions are used. Only the transition will                                       // 1366
        // not be paused since that is not possible. If the animation ends when                                        // 1367
        // paused then it will not complete until unpaused or cancelled.                                               // 1368
        var playPause = function(playAnimation) {                                                                      // 1369
          if (!animationCompleted) {                                                                                   // 1370
            animationPaused = !playAnimation;                                                                          // 1371
            if (timings.animationDuration) {                                                                           // 1372
              var value = blockKeyframeAnimations(node, animationPaused);                                              // 1373
              animationPaused                                                                                          // 1374
                  ? temporaryStyles.push(value)                                                                        // 1375
                  : removeFromArray(temporaryStyles, value);                                                           // 1376
            }                                                                                                          // 1377
          } else if (animationPaused && playAnimation) {                                                               // 1378
            animationPaused = false;                                                                                   // 1379
            close();                                                                                                   // 1380
          }                                                                                                            // 1381
        };                                                                                                             // 1382
                                                                                                                       // 1383
        // checking the stagger duration prevents an accidentally cascade of the CSS delay style                       // 1384
        // being inherited from the parent. If the transition duration is zero then we can safely                      // 1385
        // rely that the delay value is an intentional stagger delay style.                                            // 1386
        var maxStagger = itemIndex > 0                                                                                 // 1387
                         && ((timings.transitionDuration && stagger.transitionDuration === 0) ||                       // 1388
                            (timings.animationDuration && stagger.animationDuration === 0))                            // 1389
                         && Math.max(stagger.animationDelay, stagger.transitionDelay);                                 // 1390
        if (maxStagger) {                                                                                              // 1391
          $timeout(triggerAnimationStart,                                                                              // 1392
                   Math.floor(maxStagger * itemIndex * ONE_SECOND),                                                    // 1393
                   false);                                                                                             // 1394
        } else {                                                                                                       // 1395
          triggerAnimationStart();                                                                                     // 1396
        }                                                                                                              // 1397
                                                                                                                       // 1398
        // this will decorate the existing promise runner with pause/resume methods                                    // 1399
        runnerHost.resume = function() {                                                                               // 1400
          playPause(true);                                                                                             // 1401
        };                                                                                                             // 1402
                                                                                                                       // 1403
        runnerHost.pause = function() {                                                                                // 1404
          playPause(false);                                                                                            // 1405
        };                                                                                                             // 1406
                                                                                                                       // 1407
        function triggerAnimationStart() {                                                                             // 1408
          // just incase a stagger animation kicks in when the animation                                               // 1409
          // itself was cancelled entirely                                                                             // 1410
          if (animationClosed) return;                                                                                 // 1411
                                                                                                                       // 1412
          applyBlocking(false);                                                                                        // 1413
                                                                                                                       // 1414
          forEach(temporaryStyles, function(entry) {                                                                   // 1415
            var key = entry[0];                                                                                        // 1416
            var value = entry[1];                                                                                      // 1417
            node.style[key] = value;                                                                                   // 1418
          });                                                                                                          // 1419
                                                                                                                       // 1420
          applyAnimationClasses(element, options);                                                                     // 1421
          $$jqLite.addClass(element, activeClasses);                                                                   // 1422
                                                                                                                       // 1423
          if (flags.recalculateTimingStyles) {                                                                         // 1424
            fullClassName = node.className + ' ' + preparationClasses;                                                 // 1425
            cacheKey = gcsHashFn(node, fullClassName);                                                                 // 1426
                                                                                                                       // 1427
            timings = computeTimings(node, fullClassName, cacheKey);                                                   // 1428
            relativeDelay = timings.maxDelay;                                                                          // 1429
            maxDelay = Math.max(relativeDelay, 0);                                                                     // 1430
            maxDuration = timings.maxDuration;                                                                         // 1431
                                                                                                                       // 1432
            if (maxDuration === 0) {                                                                                   // 1433
              close();                                                                                                 // 1434
              return;                                                                                                  // 1435
            }                                                                                                          // 1436
                                                                                                                       // 1437
            flags.hasTransitions = timings.transitionDuration > 0;                                                     // 1438
            flags.hasAnimations = timings.animationDuration > 0;                                                       // 1439
          }                                                                                                            // 1440
                                                                                                                       // 1441
          if (flags.applyAnimationDelay) {                                                                             // 1442
            relativeDelay = typeof options.delay !== "boolean" && truthyTimingValue(options.delay)                     // 1443
                  ? parseFloat(options.delay)                                                                          // 1444
                  : relativeDelay;                                                                                     // 1445
                                                                                                                       // 1446
            maxDelay = Math.max(relativeDelay, 0);                                                                     // 1447
            timings.animationDelay = relativeDelay;                                                                    // 1448
            delayStyle = getCssDelayStyle(relativeDelay, true);                                                        // 1449
            temporaryStyles.push(delayStyle);                                                                          // 1450
            node.style[delayStyle[0]] = delayStyle[1];                                                                 // 1451
          }                                                                                                            // 1452
                                                                                                                       // 1453
          maxDelayTime = maxDelay * ONE_SECOND;                                                                        // 1454
          maxDurationTime = maxDuration * ONE_SECOND;                                                                  // 1455
                                                                                                                       // 1456
          if (options.easing) {                                                                                        // 1457
            var easeProp, easeVal = options.easing;                                                                    // 1458
            if (flags.hasTransitions) {                                                                                // 1459
              easeProp = TRANSITION_PROP + TIMING_KEY;                                                                 // 1460
              temporaryStyles.push([easeProp, easeVal]);                                                               // 1461
              node.style[easeProp] = easeVal;                                                                          // 1462
            }                                                                                                          // 1463
            if (flags.hasAnimations) {                                                                                 // 1464
              easeProp = ANIMATION_PROP + TIMING_KEY;                                                                  // 1465
              temporaryStyles.push([easeProp, easeVal]);                                                               // 1466
              node.style[easeProp] = easeVal;                                                                          // 1467
            }                                                                                                          // 1468
          }                                                                                                            // 1469
                                                                                                                       // 1470
          if (timings.transitionDuration) {                                                                            // 1471
            events.push(TRANSITIONEND_EVENT);                                                                          // 1472
          }                                                                                                            // 1473
                                                                                                                       // 1474
          if (timings.animationDuration) {                                                                             // 1475
            events.push(ANIMATIONEND_EVENT);                                                                           // 1476
          }                                                                                                            // 1477
                                                                                                                       // 1478
          startTime = Date.now();                                                                                      // 1479
          var timerTime = maxDelayTime + CLOSING_TIME_BUFFER * maxDurationTime;                                        // 1480
          var endTime = startTime + timerTime;                                                                         // 1481
                                                                                                                       // 1482
          var animationsData = element.data(ANIMATE_TIMER_KEY) || [];                                                  // 1483
          var setupFallbackTimer = true;                                                                               // 1484
          if (animationsData.length) {                                                                                 // 1485
            var currentTimerData = animationsData[0];                                                                  // 1486
            setupFallbackTimer = endTime > currentTimerData.expectedEndTime;                                           // 1487
            if (setupFallbackTimer) {                                                                                  // 1488
              $timeout.cancel(currentTimerData.timer);                                                                 // 1489
            } else {                                                                                                   // 1490
              animationsData.push(close);                                                                              // 1491
            }                                                                                                          // 1492
          }                                                                                                            // 1493
                                                                                                                       // 1494
          if (setupFallbackTimer) {                                                                                    // 1495
            var timer = $timeout(onAnimationExpired, timerTime, false);                                                // 1496
            animationsData[0] = {                                                                                      // 1497
              timer: timer,                                                                                            // 1498
              expectedEndTime: endTime                                                                                 // 1499
            };                                                                                                         // 1500
            animationsData.push(close);                                                                                // 1501
            element.data(ANIMATE_TIMER_KEY, animationsData);                                                           // 1502
          }                                                                                                            // 1503
                                                                                                                       // 1504
          if (events.length) {                                                                                         // 1505
            element.on(events.join(' '), onAnimationProgress);                                                         // 1506
          }                                                                                                            // 1507
                                                                                                                       // 1508
          if (options.to) {                                                                                            // 1509
            if (options.cleanupStyles) {                                                                               // 1510
              registerRestorableStyles(restoreStyles, node, Object.keys(options.to));                                  // 1511
            }                                                                                                          // 1512
            applyAnimationToStyles(element, options);                                                                  // 1513
          }                                                                                                            // 1514
        }                                                                                                              // 1515
                                                                                                                       // 1516
        function onAnimationExpired() {                                                                                // 1517
          var animationsData = element.data(ANIMATE_TIMER_KEY);                                                        // 1518
                                                                                                                       // 1519
          // this will be false in the event that the element was                                                      // 1520
          // removed from the DOM (via a leave animation or something                                                  // 1521
          // similar)                                                                                                  // 1522
          if (animationsData) {                                                                                        // 1523
            for (var i = 1; i < animationsData.length; i++) {                                                          // 1524
              animationsData[i]();                                                                                     // 1525
            }                                                                                                          // 1526
            element.removeData(ANIMATE_TIMER_KEY);                                                                     // 1527
          }                                                                                                            // 1528
        }                                                                                                              // 1529
      }                                                                                                                // 1530
    };                                                                                                                 // 1531
  }];                                                                                                                  // 1532
}];                                                                                                                    // 1533
                                                                                                                       // 1534
var $$AnimateCssDriverProvider = ['$$animationProvider', function($$animationProvider) {                               // 1535
  $$animationProvider.drivers.push('$$animateCssDriver');                                                              // 1536
                                                                                                                       // 1537
  var NG_ANIMATE_SHIM_CLASS_NAME = 'ng-animate-shim';                                                                  // 1538
  var NG_ANIMATE_ANCHOR_CLASS_NAME = 'ng-anchor';                                                                      // 1539
                                                                                                                       // 1540
  var NG_OUT_ANCHOR_CLASS_NAME = 'ng-anchor-out';                                                                      // 1541
  var NG_IN_ANCHOR_CLASS_NAME = 'ng-anchor-in';                                                                        // 1542
                                                                                                                       // 1543
  function isDocumentFragment(node) {                                                                                  // 1544
    return node.parentNode && node.parentNode.nodeType === 11;                                                         // 1545
  }                                                                                                                    // 1546
                                                                                                                       // 1547
  this.$get = ['$animateCss', '$rootScope', '$$AnimateRunner', '$rootElement', '$sniffer', '$$jqLite', '$document',    // 1548
       function($animateCss,   $rootScope,   $$AnimateRunner,   $rootElement,   $sniffer,   $$jqLite,   $document) {   // 1549
                                                                                                                       // 1550
    // only browsers that support these properties can render animations                                               // 1551
    if (!$sniffer.animations && !$sniffer.transitions) return noop;                                                    // 1552
                                                                                                                       // 1553
    var bodyNode = $document[0].body;                                                                                  // 1554
    var rootNode = getDomNode($rootElement);                                                                           // 1555
                                                                                                                       // 1556
    var rootBodyElement = jqLite(                                                                                      // 1557
      // this is to avoid using something that exists outside of the body                                              // 1558
      // we also special case the doc fragment case because our unit test code                                         // 1559
      // appends the $rootElement to the body after the app has been bootstrapped                                      // 1560
      isDocumentFragment(rootNode) || bodyNode.contains(rootNode) ? rootNode : bodyNode                                // 1561
    );                                                                                                                 // 1562
                                                                                                                       // 1563
    var applyAnimationClasses = applyAnimationClassesFactory($$jqLite);                                                // 1564
                                                                                                                       // 1565
    return function initDriverFn(animationDetails) {                                                                   // 1566
      return animationDetails.from && animationDetails.to                                                              // 1567
          ? prepareFromToAnchorAnimation(animationDetails.from,                                                        // 1568
                                         animationDetails.to,                                                          // 1569
                                         animationDetails.classes,                                                     // 1570
                                         animationDetails.anchors)                                                     // 1571
          : prepareRegularAnimation(animationDetails);                                                                 // 1572
    };                                                                                                                 // 1573
                                                                                                                       // 1574
    function filterCssClasses(classes) {                                                                               // 1575
      //remove all the `ng-` stuff                                                                                     // 1576
      return classes.replace(/\bng-\S+\b/g, '');                                                                       // 1577
    }                                                                                                                  // 1578
                                                                                                                       // 1579
    function getUniqueValues(a, b) {                                                                                   // 1580
      if (isString(a)) a = a.split(' ');                                                                               // 1581
      if (isString(b)) b = b.split(' ');                                                                               // 1582
      return a.filter(function(val) {                                                                                  // 1583
        return b.indexOf(val) === -1;                                                                                  // 1584
      }).join(' ');                                                                                                    // 1585
    }                                                                                                                  // 1586
                                                                                                                       // 1587
    function prepareAnchoredAnimation(classes, outAnchor, inAnchor) {                                                  // 1588
      var clone = jqLite(getDomNode(outAnchor).cloneNode(true));                                                       // 1589
      var startingClasses = filterCssClasses(getClassVal(clone));                                                      // 1590
                                                                                                                       // 1591
      outAnchor.addClass(NG_ANIMATE_SHIM_CLASS_NAME);                                                                  // 1592
      inAnchor.addClass(NG_ANIMATE_SHIM_CLASS_NAME);                                                                   // 1593
                                                                                                                       // 1594
      clone.addClass(NG_ANIMATE_ANCHOR_CLASS_NAME);                                                                    // 1595
                                                                                                                       // 1596
      rootBodyElement.append(clone);                                                                                   // 1597
                                                                                                                       // 1598
      var animatorIn, animatorOut = prepareOutAnimation();                                                             // 1599
                                                                                                                       // 1600
      // the user may not end up using the `out` animation and                                                         // 1601
      // only making use of the `in` animation or vice-versa.                                                          // 1602
      // In either case we should allow this and not assume the                                                        // 1603
      // animation is over unless both animations are not used.                                                        // 1604
      if (!animatorOut) {                                                                                              // 1605
        animatorIn = prepareInAnimation();                                                                             // 1606
        if (!animatorIn) {                                                                                             // 1607
          return end();                                                                                                // 1608
        }                                                                                                              // 1609
      }                                                                                                                // 1610
                                                                                                                       // 1611
      var startingAnimator = animatorOut || animatorIn;                                                                // 1612
                                                                                                                       // 1613
      return {                                                                                                         // 1614
        start: function() {                                                                                            // 1615
          var runner;                                                                                                  // 1616
                                                                                                                       // 1617
          var currentAnimation = startingAnimator.start();                                                             // 1618
          currentAnimation.done(function() {                                                                           // 1619
            currentAnimation = null;                                                                                   // 1620
            if (!animatorIn) {                                                                                         // 1621
              animatorIn = prepareInAnimation();                                                                       // 1622
              if (animatorIn) {                                                                                        // 1623
                currentAnimation = animatorIn.start();                                                                 // 1624
                currentAnimation.done(function() {                                                                     // 1625
                  currentAnimation = null;                                                                             // 1626
                  end();                                                                                               // 1627
                  runner.complete();                                                                                   // 1628
                });                                                                                                    // 1629
                return currentAnimation;                                                                               // 1630
              }                                                                                                        // 1631
            }                                                                                                          // 1632
            // in the event that there is no `in` animation                                                            // 1633
            end();                                                                                                     // 1634
            runner.complete();                                                                                         // 1635
          });                                                                                                          // 1636
                                                                                                                       // 1637
          runner = new $$AnimateRunner({                                                                               // 1638
            end: endFn,                                                                                                // 1639
            cancel: endFn                                                                                              // 1640
          });                                                                                                          // 1641
                                                                                                                       // 1642
          return runner;                                                                                               // 1643
                                                                                                                       // 1644
          function endFn() {                                                                                           // 1645
            if (currentAnimation) {                                                                                    // 1646
              currentAnimation.end();                                                                                  // 1647
            }                                                                                                          // 1648
          }                                                                                                            // 1649
        }                                                                                                              // 1650
      };                                                                                                               // 1651
                                                                                                                       // 1652
      function calculateAnchorStyles(anchor) {                                                                         // 1653
        var styles = {};                                                                                               // 1654
                                                                                                                       // 1655
        var coords = getDomNode(anchor).getBoundingClientRect();                                                       // 1656
                                                                                                                       // 1657
        // we iterate directly since safari messes up and doesn't return                                               // 1658
        // all the keys for the coords object when iterated                                                            // 1659
        forEach(['width','height','top','left'], function(key) {                                                       // 1660
          var value = coords[key];                                                                                     // 1661
          switch (key) {                                                                                               // 1662
            case 'top':                                                                                                // 1663
              value += bodyNode.scrollTop;                                                                             // 1664
              break;                                                                                                   // 1665
            case 'left':                                                                                               // 1666
              value += bodyNode.scrollLeft;                                                                            // 1667
              break;                                                                                                   // 1668
          }                                                                                                            // 1669
          styles[key] = Math.floor(value) + 'px';                                                                      // 1670
        });                                                                                                            // 1671
        return styles;                                                                                                 // 1672
      }                                                                                                                // 1673
                                                                                                                       // 1674
      function prepareOutAnimation() {                                                                                 // 1675
        var animator = $animateCss(clone, {                                                                            // 1676
          addClass: NG_OUT_ANCHOR_CLASS_NAME,                                                                          // 1677
          delay: true,                                                                                                 // 1678
          from: calculateAnchorStyles(outAnchor)                                                                       // 1679
        });                                                                                                            // 1680
                                                                                                                       // 1681
        // read the comment within `prepareRegularAnimation` to understand                                             // 1682
        // why this check is necessary                                                                                 // 1683
        return animator.$$willAnimate ? animator : null;                                                               // 1684
      }                                                                                                                // 1685
                                                                                                                       // 1686
      function getClassVal(element) {                                                                                  // 1687
        return element.attr('class') || '';                                                                            // 1688
      }                                                                                                                // 1689
                                                                                                                       // 1690
      function prepareInAnimation() {                                                                                  // 1691
        var endingClasses = filterCssClasses(getClassVal(inAnchor));                                                   // 1692
        var toAdd = getUniqueValues(endingClasses, startingClasses);                                                   // 1693
        var toRemove = getUniqueValues(startingClasses, endingClasses);                                                // 1694
                                                                                                                       // 1695
        var animator = $animateCss(clone, {                                                                            // 1696
          to: calculateAnchorStyles(inAnchor),                                                                         // 1697
          addClass: NG_IN_ANCHOR_CLASS_NAME + ' ' + toAdd,                                                             // 1698
          removeClass: NG_OUT_ANCHOR_CLASS_NAME + ' ' + toRemove,                                                      // 1699
          delay: true                                                                                                  // 1700
        });                                                                                                            // 1701
                                                                                                                       // 1702
        // read the comment within `prepareRegularAnimation` to understand                                             // 1703
        // why this check is necessary                                                                                 // 1704
        return animator.$$willAnimate ? animator : null;                                                               // 1705
      }                                                                                                                // 1706
                                                                                                                       // 1707
      function end() {                                                                                                 // 1708
        clone.remove();                                                                                                // 1709
        outAnchor.removeClass(NG_ANIMATE_SHIM_CLASS_NAME);                                                             // 1710
        inAnchor.removeClass(NG_ANIMATE_SHIM_CLASS_NAME);                                                              // 1711
      }                                                                                                                // 1712
    }                                                                                                                  // 1713
                                                                                                                       // 1714
    function prepareFromToAnchorAnimation(from, to, classes, anchors) {                                                // 1715
      var fromAnimation = prepareRegularAnimation(from, noop);                                                         // 1716
      var toAnimation = prepareRegularAnimation(to, noop);                                                             // 1717
                                                                                                                       // 1718
      var anchorAnimations = [];                                                                                       // 1719
      forEach(anchors, function(anchor) {                                                                              // 1720
        var outElement = anchor['out'];                                                                                // 1721
        var inElement = anchor['in'];                                                                                  // 1722
        var animator = prepareAnchoredAnimation(classes, outElement, inElement);                                       // 1723
        if (animator) {                                                                                                // 1724
          anchorAnimations.push(animator);                                                                             // 1725
        }                                                                                                              // 1726
      });                                                                                                              // 1727
                                                                                                                       // 1728
      // no point in doing anything when there are no elements to animate                                              // 1729
      if (!fromAnimation && !toAnimation && anchorAnimations.length === 0) return;                                     // 1730
                                                                                                                       // 1731
      return {                                                                                                         // 1732
        start: function() {                                                                                            // 1733
          var animationRunners = [];                                                                                   // 1734
                                                                                                                       // 1735
          if (fromAnimation) {                                                                                         // 1736
            animationRunners.push(fromAnimation.start());                                                              // 1737
          }                                                                                                            // 1738
                                                                                                                       // 1739
          if (toAnimation) {                                                                                           // 1740
            animationRunners.push(toAnimation.start());                                                                // 1741
          }                                                                                                            // 1742
                                                                                                                       // 1743
          forEach(anchorAnimations, function(animation) {                                                              // 1744
            animationRunners.push(animation.start());                                                                  // 1745
          });                                                                                                          // 1746
                                                                                                                       // 1747
          var runner = new $$AnimateRunner({                                                                           // 1748
            end: endFn,                                                                                                // 1749
            cancel: endFn // CSS-driven animations cannot be cancelled, only ended                                     // 1750
          });                                                                                                          // 1751
                                                                                                                       // 1752
          $$AnimateRunner.all(animationRunners, function(status) {                                                     // 1753
            runner.complete(status);                                                                                   // 1754
          });                                                                                                          // 1755
                                                                                                                       // 1756
          return runner;                                                                                               // 1757
                                                                                                                       // 1758
          function endFn() {                                                                                           // 1759
            forEach(animationRunners, function(runner) {                                                               // 1760
              runner.end();                                                                                            // 1761
            });                                                                                                        // 1762
          }                                                                                                            // 1763
        }                                                                                                              // 1764
      };                                                                                                               // 1765
    }                                                                                                                  // 1766
                                                                                                                       // 1767
    function prepareRegularAnimation(animationDetails) {                                                               // 1768
      var element = animationDetails.element;                                                                          // 1769
      var options = animationDetails.options || {};                                                                    // 1770
                                                                                                                       // 1771
      if (animationDetails.structural) {                                                                               // 1772
        options.event = animationDetails.event;                                                                        // 1773
        options.structural = true;                                                                                     // 1774
        options.applyClassesEarly = true;                                                                              // 1775
                                                                                                                       // 1776
        // we special case the leave animation since we want to ensure that                                            // 1777
        // the element is removed as soon as the animation is over. Otherwise                                          // 1778
        // a flicker might appear or the element may not be removed at all                                             // 1779
        if (animationDetails.event === 'leave') {                                                                      // 1780
          options.onDone = options.domOperation;                                                                       // 1781
        }                                                                                                              // 1782
      }                                                                                                                // 1783
                                                                                                                       // 1784
      // We assign the preparationClasses as the actual animation event since                                          // 1785
      // the internals of $animateCss will just suffix the event token values                                          // 1786
      // with `-active` to trigger the animation.                                                                      // 1787
      if (options.preparationClasses) {                                                                                // 1788
        options.event = concatWithSpace(options.event, options.preparationClasses);                                    // 1789
      }                                                                                                                // 1790
                                                                                                                       // 1791
      var animator = $animateCss(element, options);                                                                    // 1792
                                                                                                                       // 1793
      // the driver lookup code inside of $$animation attempts to spawn a                                              // 1794
      // driver one by one until a driver returns a.$$willAnimate animator object.                                     // 1795
      // $animateCss will always return an object, however, it will pass in                                            // 1796
      // a flag as a hint as to whether an animation was detected or not                                               // 1797
      return animator.$$willAnimate ? animator : null;                                                                 // 1798
    }                                                                                                                  // 1799
  }];                                                                                                                  // 1800
}];                                                                                                                    // 1801
                                                                                                                       // 1802
// TODO(matsko): use caching here to speed things up for detection                                                     // 1803
// TODO(matsko): add documentation                                                                                     // 1804
//  by the time...                                                                                                     // 1805
                                                                                                                       // 1806
var $$AnimateJsProvider = ['$animateProvider', function($animateProvider) {                                            // 1807
  this.$get = ['$injector', '$$AnimateRunner', '$$jqLite',                                                             // 1808
       function($injector,   $$AnimateRunner,   $$jqLite) {                                                            // 1809
                                                                                                                       // 1810
    var applyAnimationClasses = applyAnimationClassesFactory($$jqLite);                                                // 1811
         // $animateJs(element, 'enter');                                                                              // 1812
    return function(element, event, classes, options) {                                                                // 1813
      var animationClosed = false;                                                                                     // 1814
                                                                                                                       // 1815
      // the `classes` argument is optional and if it is not used                                                      // 1816
      // then the classes will be resolved from the element's className                                                // 1817
      // property as well as options.addClass/options.removeClass.                                                     // 1818
      if (arguments.length === 3 && isObject(classes)) {                                                               // 1819
        options = classes;                                                                                             // 1820
        classes = null;                                                                                                // 1821
      }                                                                                                                // 1822
                                                                                                                       // 1823
      options = prepareAnimationOptions(options);                                                                      // 1824
      if (!classes) {                                                                                                  // 1825
        classes = element.attr('class') || '';                                                                         // 1826
        if (options.addClass) {                                                                                        // 1827
          classes += ' ' + options.addClass;                                                                           // 1828
        }                                                                                                              // 1829
        if (options.removeClass) {                                                                                     // 1830
          classes += ' ' + options.removeClass;                                                                        // 1831
        }                                                                                                              // 1832
      }                                                                                                                // 1833
                                                                                                                       // 1834
      var classesToAdd = options.addClass;                                                                             // 1835
      var classesToRemove = options.removeClass;                                                                       // 1836
                                                                                                                       // 1837
      // the lookupAnimations function returns a series of animation objects that are                                  // 1838
      // matched up with one or more of the CSS classes. These animation objects are                                   // 1839
      // defined via the module.animation factory function. If nothing is detected then                                // 1840
      // we don't return anything which then makes $animation query the next driver.                                   // 1841
      var animations = lookupAnimations(classes);                                                                      // 1842
      var before, after;                                                                                               // 1843
      if (animations.length) {                                                                                         // 1844
        var afterFn, beforeFn;                                                                                         // 1845
        if (event == 'leave') {                                                                                        // 1846
          beforeFn = 'leave';                                                                                          // 1847
          afterFn = 'afterLeave'; // TODO(matsko): get rid of this                                                     // 1848
        } else {                                                                                                       // 1849
          beforeFn = 'before' + event.charAt(0).toUpperCase() + event.substr(1);                                       // 1850
          afterFn = event;                                                                                             // 1851
        }                                                                                                              // 1852
                                                                                                                       // 1853
        if (event !== 'enter' && event !== 'move') {                                                                   // 1854
          before = packageAnimations(element, event, options, animations, beforeFn);                                   // 1855
        }                                                                                                              // 1856
        after  = packageAnimations(element, event, options, animations, afterFn);                                      // 1857
      }                                                                                                                // 1858
                                                                                                                       // 1859
      // no matching animations                                                                                        // 1860
      if (!before && !after) return;                                                                                   // 1861
                                                                                                                       // 1862
      function applyOptions() {                                                                                        // 1863
        options.domOperation();                                                                                        // 1864
        applyAnimationClasses(element, options);                                                                       // 1865
      }                                                                                                                // 1866
                                                                                                                       // 1867
      function close() {                                                                                               // 1868
        animationClosed = true;                                                                                        // 1869
        applyOptions();                                                                                                // 1870
        applyAnimationStyles(element, options);                                                                        // 1871
      }                                                                                                                // 1872
                                                                                                                       // 1873
      var runner;                                                                                                      // 1874
                                                                                                                       // 1875
      return {                                                                                                         // 1876
        $$willAnimate: true,                                                                                           // 1877
        end: function() {                                                                                              // 1878
          if (runner) {                                                                                                // 1879
            runner.end();                                                                                              // 1880
          } else {                                                                                                     // 1881
            close();                                                                                                   // 1882
            runner = new $$AnimateRunner();                                                                            // 1883
            runner.complete(true);                                                                                     // 1884
          }                                                                                                            // 1885
          return runner;                                                                                               // 1886
        },                                                                                                             // 1887
        start: function() {                                                                                            // 1888
          if (runner) {                                                                                                // 1889
            return runner;                                                                                             // 1890
          }                                                                                                            // 1891
                                                                                                                       // 1892
          runner = new $$AnimateRunner();                                                                              // 1893
          var closeActiveAnimations;                                                                                   // 1894
          var chain = [];                                                                                              // 1895
                                                                                                                       // 1896
          if (before) {                                                                                                // 1897
            chain.push(function(fn) {                                                                                  // 1898
              closeActiveAnimations = before(fn);                                                                      // 1899
            });                                                                                                        // 1900
          }                                                                                                            // 1901
                                                                                                                       // 1902
          if (chain.length) {                                                                                          // 1903
            chain.push(function(fn) {                                                                                  // 1904
              applyOptions();                                                                                          // 1905
              fn(true);                                                                                                // 1906
            });                                                                                                        // 1907
          } else {                                                                                                     // 1908
            applyOptions();                                                                                            // 1909
          }                                                                                                            // 1910
                                                                                                                       // 1911
          if (after) {                                                                                                 // 1912
            chain.push(function(fn) {                                                                                  // 1913
              closeActiveAnimations = after(fn);                                                                       // 1914
            });                                                                                                        // 1915
          }                                                                                                            // 1916
                                                                                                                       // 1917
          runner.setHost({                                                                                             // 1918
            end: function() {                                                                                          // 1919
              endAnimations();                                                                                         // 1920
            },                                                                                                         // 1921
            cancel: function() {                                                                                       // 1922
              endAnimations(true);                                                                                     // 1923
            }                                                                                                          // 1924
          });                                                                                                          // 1925
                                                                                                                       // 1926
          $$AnimateRunner.chain(chain, onComplete);                                                                    // 1927
          return runner;                                                                                               // 1928
                                                                                                                       // 1929
          function onComplete(success) {                                                                               // 1930
            close(success);                                                                                            // 1931
            runner.complete(success);                                                                                  // 1932
          }                                                                                                            // 1933
                                                                                                                       // 1934
          function endAnimations(cancelled) {                                                                          // 1935
            if (!animationClosed) {                                                                                    // 1936
              (closeActiveAnimations || noop)(cancelled);                                                              // 1937
              onComplete(cancelled);                                                                                   // 1938
            }                                                                                                          // 1939
          }                                                                                                            // 1940
        }                                                                                                              // 1941
      };                                                                                                               // 1942
                                                                                                                       // 1943
      function executeAnimationFn(fn, element, event, options, onDone) {                                               // 1944
        var args;                                                                                                      // 1945
        switch (event) {                                                                                               // 1946
          case 'animate':                                                                                              // 1947
            args = [element, options.from, options.to, onDone];                                                        // 1948
            break;                                                                                                     // 1949
                                                                                                                       // 1950
          case 'setClass':                                                                                             // 1951
            args = [element, classesToAdd, classesToRemove, onDone];                                                   // 1952
            break;                                                                                                     // 1953
                                                                                                                       // 1954
          case 'addClass':                                                                                             // 1955
            args = [element, classesToAdd, onDone];                                                                    // 1956
            break;                                                                                                     // 1957
                                                                                                                       // 1958
          case 'removeClass':                                                                                          // 1959
            args = [element, classesToRemove, onDone];                                                                 // 1960
            break;                                                                                                     // 1961
                                                                                                                       // 1962
          default:                                                                                                     // 1963
            args = [element, onDone];                                                                                  // 1964
            break;                                                                                                     // 1965
        }                                                                                                              // 1966
                                                                                                                       // 1967
        args.push(options);                                                                                            // 1968
                                                                                                                       // 1969
        var value = fn.apply(fn, args);                                                                                // 1970
        if (value) {                                                                                                   // 1971
          if (isFunction(value.start)) {                                                                               // 1972
            value = value.start();                                                                                     // 1973
          }                                                                                                            // 1974
                                                                                                                       // 1975
          if (value instanceof $$AnimateRunner) {                                                                      // 1976
            value.done(onDone);                                                                                        // 1977
          } else if (isFunction(value)) {                                                                              // 1978
            // optional onEnd / onCancel callback                                                                      // 1979
            return value;                                                                                              // 1980
          }                                                                                                            // 1981
        }                                                                                                              // 1982
                                                                                                                       // 1983
        return noop;                                                                                                   // 1984
      }                                                                                                                // 1985
                                                                                                                       // 1986
      function groupEventedAnimations(element, event, options, animations, fnName) {                                   // 1987
        var operations = [];                                                                                           // 1988
        forEach(animations, function(ani) {                                                                            // 1989
          var animation = ani[fnName];                                                                                 // 1990
          if (!animation) return;                                                                                      // 1991
                                                                                                                       // 1992
          // note that all of these animations will run in parallel                                                    // 1993
          operations.push(function() {                                                                                 // 1994
            var runner;                                                                                                // 1995
            var endProgressCb;                                                                                         // 1996
                                                                                                                       // 1997
            var resolved = false;                                                                                      // 1998
            var onAnimationComplete = function(rejected) {                                                             // 1999
              if (!resolved) {                                                                                         // 2000
                resolved = true;                                                                                       // 2001
                (endProgressCb || noop)(rejected);                                                                     // 2002
                runner.complete(!rejected);                                                                            // 2003
              }                                                                                                        // 2004
            };                                                                                                         // 2005
                                                                                                                       // 2006
            runner = new $$AnimateRunner({                                                                             // 2007
              end: function() {                                                                                        // 2008
                onAnimationComplete();                                                                                 // 2009
              },                                                                                                       // 2010
              cancel: function() {                                                                                     // 2011
                onAnimationComplete(true);                                                                             // 2012
              }                                                                                                        // 2013
            });                                                                                                        // 2014
                                                                                                                       // 2015
            endProgressCb = executeAnimationFn(animation, element, event, options, function(result) {                  // 2016
              var cancelled = result === false;                                                                        // 2017
              onAnimationComplete(cancelled);                                                                          // 2018
            });                                                                                                        // 2019
                                                                                                                       // 2020
            return runner;                                                                                             // 2021
          });                                                                                                          // 2022
        });                                                                                                            // 2023
                                                                                                                       // 2024
        return operations;                                                                                             // 2025
      }                                                                                                                // 2026
                                                                                                                       // 2027
      function packageAnimations(element, event, options, animations, fnName) {                                        // 2028
        var operations = groupEventedAnimations(element, event, options, animations, fnName);                          // 2029
        if (operations.length === 0) {                                                                                 // 2030
          var a,b;                                                                                                     // 2031
          if (fnName === 'beforeSetClass') {                                                                           // 2032
            a = groupEventedAnimations(element, 'removeClass', options, animations, 'beforeRemoveClass');              // 2033
            b = groupEventedAnimations(element, 'addClass', options, animations, 'beforeAddClass');                    // 2034
          } else if (fnName === 'setClass') {                                                                          // 2035
            a = groupEventedAnimations(element, 'removeClass', options, animations, 'removeClass');                    // 2036
            b = groupEventedAnimations(element, 'addClass', options, animations, 'addClass');                          // 2037
          }                                                                                                            // 2038
                                                                                                                       // 2039
          if (a) {                                                                                                     // 2040
            operations = operations.concat(a);                                                                         // 2041
          }                                                                                                            // 2042
          if (b) {                                                                                                     // 2043
            operations = operations.concat(b);                                                                         // 2044
          }                                                                                                            // 2045
        }                                                                                                              // 2046
                                                                                                                       // 2047
        if (operations.length === 0) return;                                                                           // 2048
                                                                                                                       // 2049
        // TODO(matsko): add documentation                                                                             // 2050
        return function startAnimation(callback) {                                                                     // 2051
          var runners = [];                                                                                            // 2052
          if (operations.length) {                                                                                     // 2053
            forEach(operations, function(animateFn) {                                                                  // 2054
              runners.push(animateFn());                                                                               // 2055
            });                                                                                                        // 2056
          }                                                                                                            // 2057
                                                                                                                       // 2058
          runners.length ? $$AnimateRunner.all(runners, callback) : callback();                                        // 2059
                                                                                                                       // 2060
          return function endFn(reject) {                                                                              // 2061
            forEach(runners, function(runner) {                                                                        // 2062
              reject ? runner.cancel() : runner.end();                                                                 // 2063
            });                                                                                                        // 2064
          };                                                                                                           // 2065
        };                                                                                                             // 2066
      }                                                                                                                // 2067
    };                                                                                                                 // 2068
                                                                                                                       // 2069
    function lookupAnimations(classes) {                                                                               // 2070
      classes = isArray(classes) ? classes : classes.split(' ');                                                       // 2071
      var matches = [], flagMap = {};                                                                                  // 2072
      for (var i=0; i < classes.length; i++) {                                                                         // 2073
        var klass = classes[i],                                                                                        // 2074
            animationFactory = $animateProvider.$$registeredAnimations[klass];                                         // 2075
        if (animationFactory && !flagMap[klass]) {                                                                     // 2076
          matches.push($injector.get(animationFactory));                                                               // 2077
          flagMap[klass] = true;                                                                                       // 2078
        }                                                                                                              // 2079
      }                                                                                                                // 2080
      return matches;                                                                                                  // 2081
    }                                                                                                                  // 2082
  }];                                                                                                                  // 2083
}];                                                                                                                    // 2084
                                                                                                                       // 2085
var $$AnimateJsDriverProvider = ['$$animationProvider', function($$animationProvider) {                                // 2086
  $$animationProvider.drivers.push('$$animateJsDriver');                                                               // 2087
  this.$get = ['$$animateJs', '$$AnimateRunner', function($$animateJs, $$AnimateRunner) {                              // 2088
    return function initDriverFn(animationDetails) {                                                                   // 2089
      if (animationDetails.from && animationDetails.to) {                                                              // 2090
        var fromAnimation = prepareAnimation(animationDetails.from);                                                   // 2091
        var toAnimation = prepareAnimation(animationDetails.to);                                                       // 2092
        if (!fromAnimation && !toAnimation) return;                                                                    // 2093
                                                                                                                       // 2094
        return {                                                                                                       // 2095
          start: function() {                                                                                          // 2096
            var animationRunners = [];                                                                                 // 2097
                                                                                                                       // 2098
            if (fromAnimation) {                                                                                       // 2099
              animationRunners.push(fromAnimation.start());                                                            // 2100
            }                                                                                                          // 2101
                                                                                                                       // 2102
            if (toAnimation) {                                                                                         // 2103
              animationRunners.push(toAnimation.start());                                                              // 2104
            }                                                                                                          // 2105
                                                                                                                       // 2106
            $$AnimateRunner.all(animationRunners, done);                                                               // 2107
                                                                                                                       // 2108
            var runner = new $$AnimateRunner({                                                                         // 2109
              end: endFnFactory(),                                                                                     // 2110
              cancel: endFnFactory()                                                                                   // 2111
            });                                                                                                        // 2112
                                                                                                                       // 2113
            return runner;                                                                                             // 2114
                                                                                                                       // 2115
            function endFnFactory() {                                                                                  // 2116
              return function() {                                                                                      // 2117
                forEach(animationRunners, function(runner) {                                                           // 2118
                  // at this point we cannot cancel animations for groups just yet. 1.5+                               // 2119
                  runner.end();                                                                                        // 2120
                });                                                                                                    // 2121
              };                                                                                                       // 2122
            }                                                                                                          // 2123
                                                                                                                       // 2124
            function done(status) {                                                                                    // 2125
              runner.complete(status);                                                                                 // 2126
            }                                                                                                          // 2127
          }                                                                                                            // 2128
        };                                                                                                             // 2129
      } else {                                                                                                         // 2130
        return prepareAnimation(animationDetails);                                                                     // 2131
      }                                                                                                                // 2132
    };                                                                                                                 // 2133
                                                                                                                       // 2134
    function prepareAnimation(animationDetails) {                                                                      // 2135
      // TODO(matsko): make sure to check for grouped animations and delegate down to normal animations                // 2136
      var element = animationDetails.element;                                                                          // 2137
      var event = animationDetails.event;                                                                              // 2138
      var options = animationDetails.options;                                                                          // 2139
      var classes = animationDetails.classes;                                                                          // 2140
      return $$animateJs(element, event, classes, options);                                                            // 2141
    }                                                                                                                  // 2142
  }];                                                                                                                  // 2143
}];                                                                                                                    // 2144
                                                                                                                       // 2145
var NG_ANIMATE_ATTR_NAME = 'data-ng-animate';                                                                          // 2146
var NG_ANIMATE_PIN_DATA = '$ngAnimatePin';                                                                             // 2147
var $$AnimateQueueProvider = ['$animateProvider', function($animateProvider) {                                         // 2148
  var PRE_DIGEST_STATE = 1;                                                                                            // 2149
  var RUNNING_STATE = 2;                                                                                               // 2150
  var ONE_SPACE = ' ';                                                                                                 // 2151
                                                                                                                       // 2152
  var rules = this.rules = {                                                                                           // 2153
    skip: [],                                                                                                          // 2154
    cancel: [],                                                                                                        // 2155
    join: []                                                                                                           // 2156
  };                                                                                                                   // 2157
                                                                                                                       // 2158
  function makeTruthyCssClassMap(classString) {                                                                        // 2159
    if (!classString) {                                                                                                // 2160
      return null;                                                                                                     // 2161
    }                                                                                                                  // 2162
                                                                                                                       // 2163
    var keys = classString.split(ONE_SPACE);                                                                           // 2164
    var map = Object.create(null);                                                                                     // 2165
                                                                                                                       // 2166
    forEach(keys, function(key) {                                                                                      // 2167
      map[key] = true;                                                                                                 // 2168
    });                                                                                                                // 2169
    return map;                                                                                                        // 2170
  }                                                                                                                    // 2171
                                                                                                                       // 2172
  function hasMatchingClasses(newClassString, currentClassString) {                                                    // 2173
    if (newClassString && currentClassString) {                                                                        // 2174
      var currentClassMap = makeTruthyCssClassMap(currentClassString);                                                 // 2175
      return newClassString.split(ONE_SPACE).some(function(className) {                                                // 2176
        return currentClassMap[className];                                                                             // 2177
      });                                                                                                              // 2178
    }                                                                                                                  // 2179
  }                                                                                                                    // 2180
                                                                                                                       // 2181
  function isAllowed(ruleType, element, currentAnimation, previousAnimation) {                                         // 2182
    return rules[ruleType].some(function(fn) {                                                                         // 2183
      return fn(element, currentAnimation, previousAnimation);                                                         // 2184
    });                                                                                                                // 2185
  }                                                                                                                    // 2186
                                                                                                                       // 2187
  function hasAnimationClasses(animation, and) {                                                                       // 2188
    var a = (animation.addClass || '').length > 0;                                                                     // 2189
    var b = (animation.removeClass || '').length > 0;                                                                  // 2190
    return and ? a && b : a || b;                                                                                      // 2191
  }                                                                                                                    // 2192
                                                                                                                       // 2193
  rules.join.push(function(element, newAnimation, currentAnimation) {                                                  // 2194
    // if the new animation is class-based then we can just tack that on                                               // 2195
    return !newAnimation.structural && hasAnimationClasses(newAnimation);                                              // 2196
  });                                                                                                                  // 2197
                                                                                                                       // 2198
  rules.skip.push(function(element, newAnimation, currentAnimation) {                                                  // 2199
    // there is no need to animate anything if no classes are being added and                                          // 2200
    // there is no structural animation that will be triggered                                                         // 2201
    return !newAnimation.structural && !hasAnimationClasses(newAnimation);                                             // 2202
  });                                                                                                                  // 2203
                                                                                                                       // 2204
  rules.skip.push(function(element, newAnimation, currentAnimation) {                                                  // 2205
    // why should we trigger a new structural animation if the element will                                            // 2206
    // be removed from the DOM anyway?                                                                                 // 2207
    return currentAnimation.event == 'leave' && newAnimation.structural;                                               // 2208
  });                                                                                                                  // 2209
                                                                                                                       // 2210
  rules.skip.push(function(element, newAnimation, currentAnimation) {                                                  // 2211
    // if there is an ongoing current animation then don't even bother running the class-based animation               // 2212
    return currentAnimation.structural && currentAnimation.state === RUNNING_STATE && !newAnimation.structural;        // 2213
  });                                                                                                                  // 2214
                                                                                                                       // 2215
  rules.cancel.push(function(element, newAnimation, currentAnimation) {                                                // 2216
    // there can never be two structural animations running at the same time                                           // 2217
    return currentAnimation.structural && newAnimation.structural;                                                     // 2218
  });                                                                                                                  // 2219
                                                                                                                       // 2220
  rules.cancel.push(function(element, newAnimation, currentAnimation) {                                                // 2221
    // if the previous animation is already running, but the new animation will                                        // 2222
    // be triggered, but the new animation is structural                                                               // 2223
    return currentAnimation.state === RUNNING_STATE && newAnimation.structural;                                        // 2224
  });                                                                                                                  // 2225
                                                                                                                       // 2226
  rules.cancel.push(function(element, newAnimation, currentAnimation) {                                                // 2227
    // cancel the animation if classes added / removed in both animation cancel each other out,                        // 2228
    // but only if the current animation isn't structural                                                              // 2229
                                                                                                                       // 2230
    if (currentAnimation.structural) return false;                                                                     // 2231
                                                                                                                       // 2232
    var nA = newAnimation.addClass;                                                                                    // 2233
    var nR = newAnimation.removeClass;                                                                                 // 2234
    var cA = currentAnimation.addClass;                                                                                // 2235
    var cR = currentAnimation.removeClass;                                                                             // 2236
                                                                                                                       // 2237
    // early detection to save the global CPU shortage :)                                                              // 2238
    if ((isUndefined(nA) && isUndefined(nR)) || (isUndefined(cA) && isUndefined(cR))) {                                // 2239
      return false;                                                                                                    // 2240
    }                                                                                                                  // 2241
                                                                                                                       // 2242
    return hasMatchingClasses(nA, cR) || hasMatchingClasses(nR, cA);                                                   // 2243
  });                                                                                                                  // 2244
                                                                                                                       // 2245
  this.$get = ['$$rAF', '$rootScope', '$rootElement', '$document', '$$HashMap',                                        // 2246
               '$$animation', '$$AnimateRunner', '$templateRequest', '$$jqLite', '$$forceReflow',                      // 2247
       function($$rAF,   $rootScope,   $rootElement,   $document,   $$HashMap,                                         // 2248
                $$animation,   $$AnimateRunner,   $templateRequest,   $$jqLite,   $$forceReflow) {                     // 2249
                                                                                                                       // 2250
    var activeAnimationsLookup = new $$HashMap();                                                                      // 2251
    var disabledElementsLookup = new $$HashMap();                                                                      // 2252
    var animationsEnabled = null;                                                                                      // 2253
                                                                                                                       // 2254
    function postDigestTaskFactory() {                                                                                 // 2255
      var postDigestCalled = false;                                                                                    // 2256
      return function(fn) {                                                                                            // 2257
        // we only issue a call to postDigest before                                                                   // 2258
        // it has first passed. This prevents any callbacks                                                            // 2259
        // from not firing once the animation has completed                                                            // 2260
        // since it will be out of the digest cycle.                                                                   // 2261
        if (postDigestCalled) {                                                                                        // 2262
          fn();                                                                                                        // 2263
        } else {                                                                                                       // 2264
          $rootScope.$$postDigest(function() {                                                                         // 2265
            postDigestCalled = true;                                                                                   // 2266
            fn();                                                                                                      // 2267
          });                                                                                                          // 2268
        }                                                                                                              // 2269
      };                                                                                                               // 2270
    }                                                                                                                  // 2271
                                                                                                                       // 2272
    // Wait until all directive and route-related templates are downloaded and                                         // 2273
    // compiled. The $templateRequest.totalPendingRequests variable keeps track of                                     // 2274
    // all of the remote templates being currently downloaded. If there are no                                         // 2275
    // templates currently downloading then the watcher will still fire anyway.                                        // 2276
    var deregisterWatch = $rootScope.$watch(                                                                           // 2277
      function() { return $templateRequest.totalPendingRequests === 0; },                                              // 2278
      function(isEmpty) {                                                                                              // 2279
        if (!isEmpty) return;                                                                                          // 2280
        deregisterWatch();                                                                                             // 2281
                                                                                                                       // 2282
        // Now that all templates have been downloaded, $animate will wait until                                       // 2283
        // the post digest queue is empty before enabling animations. By having two                                    // 2284
        // calls to $postDigest calls we can ensure that the flag is enabled at the                                    // 2285
        // very end of the post digest queue. Since all of the animations in $animate                                  // 2286
        // use $postDigest, it's important that the code below executes at the end.                                    // 2287
        // This basically means that the page is fully downloaded and compiled before                                  // 2288
        // any animations are triggered.                                                                               // 2289
        $rootScope.$$postDigest(function() {                                                                           // 2290
          $rootScope.$$postDigest(function() {                                                                         // 2291
            // we check for null directly in the event that the application already called                             // 2292
            // .enabled() with whatever arguments that it provided it with                                             // 2293
            if (animationsEnabled === null) {                                                                          // 2294
              animationsEnabled = true;                                                                                // 2295
            }                                                                                                          // 2296
          });                                                                                                          // 2297
        });                                                                                                            // 2298
      }                                                                                                                // 2299
    );                                                                                                                 // 2300
                                                                                                                       // 2301
    var callbackRegistry = {};                                                                                         // 2302
                                                                                                                       // 2303
    // remember that the classNameFilter is set during the provider/config                                             // 2304
    // stage therefore we can optimize here and setup a helper function                                                // 2305
    var classNameFilter = $animateProvider.classNameFilter();                                                          // 2306
    var isAnimatableClassName = !classNameFilter                                                                       // 2307
              ? function() { return true; }                                                                            // 2308
              : function(className) {                                                                                  // 2309
                return classNameFilter.test(className);                                                                // 2310
              };                                                                                                       // 2311
                                                                                                                       // 2312
    var applyAnimationClasses = applyAnimationClassesFactory($$jqLite);                                                // 2313
                                                                                                                       // 2314
    function normalizeAnimationDetails(element, animation) {                                                           // 2315
      return mergeAnimationDetails(element, animation, {});                                                            // 2316
    }                                                                                                                  // 2317
                                                                                                                       // 2318
    // IE9-11 has no method "contains" in SVG element and in Node.prototype. Bug #10259.                               // 2319
    var contains = Node.prototype.contains || function(arg) {                                                          // 2320
      // jshint bitwise: false                                                                                         // 2321
      return this === arg || !!(this.compareDocumentPosition(arg) & 16);                                               // 2322
      // jshint bitwise: true                                                                                          // 2323
    };                                                                                                                 // 2324
                                                                                                                       // 2325
    function findCallbacks(parent, element, event) {                                                                   // 2326
      var targetNode = getDomNode(element);                                                                            // 2327
      var targetParentNode = getDomNode(parent);                                                                       // 2328
                                                                                                                       // 2329
      var matches = [];                                                                                                // 2330
      var entries = callbackRegistry[event];                                                                           // 2331
      if (entries) {                                                                                                   // 2332
        forEach(entries, function(entry) {                                                                             // 2333
          if (contains.call(entry.node, targetNode)) {                                                                 // 2334
            matches.push(entry.callback);                                                                              // 2335
          } else if (event === 'leave' && contains.call(entry.node, targetParentNode)) {                               // 2336
            matches.push(entry.callback);                                                                              // 2337
          }                                                                                                            // 2338
        });                                                                                                            // 2339
      }                                                                                                                // 2340
                                                                                                                       // 2341
      return matches;                                                                                                  // 2342
    }                                                                                                                  // 2343
                                                                                                                       // 2344
    var $animate = {                                                                                                   // 2345
      on: function(event, container, callback) {                                                                       // 2346
        var node = extractElementNode(container);                                                                      // 2347
        callbackRegistry[event] = callbackRegistry[event] || [];                                                       // 2348
        callbackRegistry[event].push({                                                                                 // 2349
          node: node,                                                                                                  // 2350
          callback: callback                                                                                           // 2351
        });                                                                                                            // 2352
                                                                                                                       // 2353
        // Remove the callback when the element is removed from the DOM                                                // 2354
        jqLite(container).on('$destroy', function() {                                                                  // 2355
          $animate.off(event, container, callback);                                                                    // 2356
        });                                                                                                            // 2357
      },                                                                                                               // 2358
                                                                                                                       // 2359
      off: function(event, container, callback) {                                                                      // 2360
        var entries = callbackRegistry[event];                                                                         // 2361
        if (!entries) return;                                                                                          // 2362
                                                                                                                       // 2363
        callbackRegistry[event] = arguments.length === 1                                                               // 2364
            ? null                                                                                                     // 2365
            : filterFromRegistry(entries, container, callback);                                                        // 2366
                                                                                                                       // 2367
        function filterFromRegistry(list, matchContainer, matchCallback) {                                             // 2368
          var containerNode = extractElementNode(matchContainer);                                                      // 2369
          return list.filter(function(entry) {                                                                         // 2370
            var isMatch = entry.node === containerNode &&                                                              // 2371
                            (!matchCallback || entry.callback === matchCallback);                                      // 2372
            return !isMatch;                                                                                           // 2373
          });                                                                                                          // 2374
        }                                                                                                              // 2375
      },                                                                                                               // 2376
                                                                                                                       // 2377
      pin: function(element, parentElement) {                                                                          // 2378
        assertArg(isElement(element), 'element', 'not an element');                                                    // 2379
        assertArg(isElement(parentElement), 'parentElement', 'not an element');                                        // 2380
        element.data(NG_ANIMATE_PIN_DATA, parentElement);                                                              // 2381
      },                                                                                                               // 2382
                                                                                                                       // 2383
      push: function(element, event, options, domOperation) {                                                          // 2384
        options = options || {};                                                                                       // 2385
        options.domOperation = domOperation;                                                                           // 2386
        return queueAnimation(element, event, options);                                                                // 2387
      },                                                                                                               // 2388
                                                                                                                       // 2389
      // this method has four signatures:                                                                              // 2390
      //  () - global getter                                                                                           // 2391
      //  (bool) - global setter                                                                                       // 2392
      //  (element) - element getter                                                                                   // 2393
      //  (element, bool) - element setter<F37>                                                                        // 2394
      enabled: function(element, bool) {                                                                               // 2395
        var argCount = arguments.length;                                                                               // 2396
                                                                                                                       // 2397
        if (argCount === 0) {                                                                                          // 2398
          // () - Global getter                                                                                        // 2399
          bool = !!animationsEnabled;                                                                                  // 2400
        } else {                                                                                                       // 2401
          var hasElement = isElement(element);                                                                         // 2402
                                                                                                                       // 2403
          if (!hasElement) {                                                                                           // 2404
            // (bool) - Global setter                                                                                  // 2405
            bool = animationsEnabled = !!element;                                                                      // 2406
          } else {                                                                                                     // 2407
            var node = getDomNode(element);                                                                            // 2408
            var recordExists = disabledElementsLookup.get(node);                                                       // 2409
                                                                                                                       // 2410
            if (argCount === 1) {                                                                                      // 2411
              // (element) - Element getter                                                                            // 2412
              bool = !recordExists;                                                                                    // 2413
            } else {                                                                                                   // 2414
              // (element, bool) - Element setter                                                                      // 2415
              disabledElementsLookup.put(node, !bool);                                                                 // 2416
            }                                                                                                          // 2417
          }                                                                                                            // 2418
        }                                                                                                              // 2419
                                                                                                                       // 2420
        return bool;                                                                                                   // 2421
      }                                                                                                                // 2422
    };                                                                                                                 // 2423
                                                                                                                       // 2424
    return $animate;                                                                                                   // 2425
                                                                                                                       // 2426
    function queueAnimation(element, event, initialOptions) {                                                          // 2427
      // we always make a copy of the options since                                                                    // 2428
      // there should never be any side effects on                                                                     // 2429
      // the input data when running `$animateCss`.                                                                    // 2430
      var options = copy(initialOptions);                                                                              // 2431
                                                                                                                       // 2432
      var node, parent;                                                                                                // 2433
      element = stripCommentsFromElement(element);                                                                     // 2434
      if (element) {                                                                                                   // 2435
        node = getDomNode(element);                                                                                    // 2436
        parent = element.parent();                                                                                     // 2437
      }                                                                                                                // 2438
                                                                                                                       // 2439
      options = prepareAnimationOptions(options);                                                                      // 2440
                                                                                                                       // 2441
      // we create a fake runner with a working promise.                                                               // 2442
      // These methods will become available after the digest has passed                                               // 2443
      var runner = new $$AnimateRunner();                                                                              // 2444
                                                                                                                       // 2445
      // this is used to trigger callbacks in postDigest mode                                                          // 2446
      var runInNextPostDigestOrNow = postDigestTaskFactory();                                                          // 2447
                                                                                                                       // 2448
      if (isArray(options.addClass)) {                                                                                 // 2449
        options.addClass = options.addClass.join(' ');                                                                 // 2450
      }                                                                                                                // 2451
                                                                                                                       // 2452
      if (options.addClass && !isString(options.addClass)) {                                                           // 2453
        options.addClass = null;                                                                                       // 2454
      }                                                                                                                // 2455
                                                                                                                       // 2456
      if (isArray(options.removeClass)) {                                                                              // 2457
        options.removeClass = options.removeClass.join(' ');                                                           // 2458
      }                                                                                                                // 2459
                                                                                                                       // 2460
      if (options.removeClass && !isString(options.removeClass)) {                                                     // 2461
        options.removeClass = null;                                                                                    // 2462
      }                                                                                                                // 2463
                                                                                                                       // 2464
      if (options.from && !isObject(options.from)) {                                                                   // 2465
        options.from = null;                                                                                           // 2466
      }                                                                                                                // 2467
                                                                                                                       // 2468
      if (options.to && !isObject(options.to)) {                                                                       // 2469
        options.to = null;                                                                                             // 2470
      }                                                                                                                // 2471
                                                                                                                       // 2472
      // there are situations where a directive issues an animation for                                                // 2473
      // a jqLite wrapper that contains only comment nodes... If this                                                  // 2474
      // happens then there is no way we can perform an animation                                                      // 2475
      if (!node) {                                                                                                     // 2476
        close();                                                                                                       // 2477
        return runner;                                                                                                 // 2478
      }                                                                                                                // 2479
                                                                                                                       // 2480
      var className = [node.className, options.addClass, options.removeClass].join(' ');                               // 2481
      if (!isAnimatableClassName(className)) {                                                                         // 2482
        close();                                                                                                       // 2483
        return runner;                                                                                                 // 2484
      }                                                                                                                // 2485
                                                                                                                       // 2486
      var isStructural = ['enter', 'move', 'leave'].indexOf(event) >= 0;                                               // 2487
                                                                                                                       // 2488
      // this is a hard disable of all animations for the application or on                                            // 2489
      // the element itself, therefore  there is no need to continue further                                           // 2490
      // past this point if not enabled                                                                                // 2491
      // Animations are also disabled if the document is currently hidden (page is not visible                         // 2492
      // to the user), because browsers slow down or do not flush calls to requestAnimationFrame                       // 2493
      var skipAnimations = !animationsEnabled || $document[0].hidden || disabledElementsLookup.get(node);              // 2494
      var existingAnimation = (!skipAnimations && activeAnimationsLookup.get(node)) || {};                             // 2495
      var hasExistingAnimation = !!existingAnimation.state;                                                            // 2496
                                                                                                                       // 2497
      // there is no point in traversing the same collection of parent ancestors if a followup                         // 2498
      // animation will be run on the same element that already did all that checking work                             // 2499
      if (!skipAnimations && (!hasExistingAnimation || existingAnimation.state != PRE_DIGEST_STATE)) {                 // 2500
        skipAnimations = !areAnimationsAllowed(element, parent, event);                                                // 2501
      }                                                                                                                // 2502
                                                                                                                       // 2503
      if (skipAnimations) {                                                                                            // 2504
        close();                                                                                                       // 2505
        return runner;                                                                                                 // 2506
      }                                                                                                                // 2507
                                                                                                                       // 2508
      if (isStructural) {                                                                                              // 2509
        closeChildAnimations(element);                                                                                 // 2510
      }                                                                                                                // 2511
                                                                                                                       // 2512
      var newAnimation = {                                                                                             // 2513
        structural: isStructural,                                                                                      // 2514
        element: element,                                                                                              // 2515
        event: event,                                                                                                  // 2516
        addClass: options.addClass,                                                                                    // 2517
        removeClass: options.removeClass,                                                                              // 2518
        close: close,                                                                                                  // 2519
        options: options,                                                                                              // 2520
        runner: runner                                                                                                 // 2521
      };                                                                                                               // 2522
                                                                                                                       // 2523
      if (hasExistingAnimation) {                                                                                      // 2524
        var skipAnimationFlag = isAllowed('skip', element, newAnimation, existingAnimation);                           // 2525
        if (skipAnimationFlag) {                                                                                       // 2526
          if (existingAnimation.state === RUNNING_STATE) {                                                             // 2527
            close();                                                                                                   // 2528
            return runner;                                                                                             // 2529
          } else {                                                                                                     // 2530
            mergeAnimationDetails(element, existingAnimation, newAnimation);                                           // 2531
            return existingAnimation.runner;                                                                           // 2532
          }                                                                                                            // 2533
        }                                                                                                              // 2534
        var cancelAnimationFlag = isAllowed('cancel', element, newAnimation, existingAnimation);                       // 2535
        if (cancelAnimationFlag) {                                                                                     // 2536
          if (existingAnimation.state === RUNNING_STATE) {                                                             // 2537
            // this will end the animation right away and it is safe                                                   // 2538
            // to do so since the animation is already running and the                                                 // 2539
            // runner callback code will run in async                                                                  // 2540
            existingAnimation.runner.end();                                                                            // 2541
          } else if (existingAnimation.structural) {                                                                   // 2542
            // this means that the animation is queued into a digest, but                                              // 2543
            // hasn't started yet. Therefore it is safe to run the close                                               // 2544
            // method which will call the runner methods in async.                                                     // 2545
            existingAnimation.close();                                                                                 // 2546
          } else {                                                                                                     // 2547
            // this will merge the new animation options into existing animation options                               // 2548
            mergeAnimationDetails(element, existingAnimation, newAnimation);                                           // 2549
                                                                                                                       // 2550
            return existingAnimation.runner;                                                                           // 2551
          }                                                                                                            // 2552
        } else {                                                                                                       // 2553
          // a joined animation means that this animation will take over the existing one                              // 2554
          // so an example would involve a leave animation taking over an enter. Then when                             // 2555
          // the postDigest kicks in the enter will be ignored.                                                        // 2556
          var joinAnimationFlag = isAllowed('join', element, newAnimation, existingAnimation);                         // 2557
          if (joinAnimationFlag) {                                                                                     // 2558
            if (existingAnimation.state === RUNNING_STATE) {                                                           // 2559
              normalizeAnimationDetails(element, newAnimation);                                                        // 2560
            } else {                                                                                                   // 2561
              applyGeneratedPreparationClasses(element, isStructural ? event : null, options);                         // 2562
                                                                                                                       // 2563
              event = newAnimation.event = existingAnimation.event;                                                    // 2564
              options = mergeAnimationDetails(element, existingAnimation, newAnimation);                               // 2565
                                                                                                                       // 2566
              //we return the same runner since only the option values of this animation will                          // 2567
              //be fed into the `existingAnimation`.                                                                   // 2568
              return existingAnimation.runner;                                                                         // 2569
            }                                                                                                          // 2570
          }                                                                                                            // 2571
        }                                                                                                              // 2572
      } else {                                                                                                         // 2573
        // normalization in this case means that it removes redundant CSS classes that                                 // 2574
        // already exist (addClass) or do not exist (removeClass) on the element                                       // 2575
        normalizeAnimationDetails(element, newAnimation);                                                              // 2576
      }                                                                                                                // 2577
                                                                                                                       // 2578
      // when the options are merged and cleaned up we may end up not having to do                                     // 2579
      // an animation at all, therefore we should check this before issuing a post                                     // 2580
      // digest callback. Structural animations will always run no matter what.                                        // 2581
      var isValidAnimation = newAnimation.structural;                                                                  // 2582
      if (!isValidAnimation) {                                                                                         // 2583
        // animate (from/to) can be quickly checked first, otherwise we check if any classes are present               // 2584
        isValidAnimation = (newAnimation.event === 'animate' && Object.keys(newAnimation.options.to || {}).length > 0)
                            || hasAnimationClasses(newAnimation);                                                      // 2586
      }                                                                                                                // 2587
                                                                                                                       // 2588
      if (!isValidAnimation) {                                                                                         // 2589
        close();                                                                                                       // 2590
        clearElementAnimationState(element);                                                                           // 2591
        return runner;                                                                                                 // 2592
      }                                                                                                                // 2593
                                                                                                                       // 2594
      // the counter keeps track of cancelled animations                                                               // 2595
      var counter = (existingAnimation.counter || 0) + 1;                                                              // 2596
      newAnimation.counter = counter;                                                                                  // 2597
                                                                                                                       // 2598
      markElementAnimationState(element, PRE_DIGEST_STATE, newAnimation);                                              // 2599
                                                                                                                       // 2600
      $rootScope.$$postDigest(function() {                                                                             // 2601
        var animationDetails = activeAnimationsLookup.get(node);                                                       // 2602
        var animationCancelled = !animationDetails;                                                                    // 2603
        animationDetails = animationDetails || {};                                                                     // 2604
                                                                                                                       // 2605
        // if addClass/removeClass is called before something like enter then the                                      // 2606
        // registered parent element may not be present. The code below will ensure                                    // 2607
        // that a final value for parent element is obtained                                                           // 2608
        var parentElement = element.parent() || [];                                                                    // 2609
                                                                                                                       // 2610
        // animate/structural/class-based animations all have requirements. Otherwise there                            // 2611
        // is no point in performing an animation. The parent node must also be set.                                   // 2612
        var isValidAnimation = parentElement.length > 0                                                                // 2613
                                && (animationDetails.event === 'animate'                                               // 2614
                                    || animationDetails.structural                                                     // 2615
                                    || hasAnimationClasses(animationDetails));                                         // 2616
                                                                                                                       // 2617
        // this means that the previous animation was cancelled                                                        // 2618
        // even if the follow-up animation is the same event                                                           // 2619
        if (animationCancelled || animationDetails.counter !== counter || !isValidAnimation) {                         // 2620
          // if another animation did not take over then we need                                                       // 2621
          // to make sure that the domOperation and options are                                                        // 2622
          // handled accordingly                                                                                       // 2623
          if (animationCancelled) {                                                                                    // 2624
            applyAnimationClasses(element, options);                                                                   // 2625
            applyAnimationStyles(element, options);                                                                    // 2626
          }                                                                                                            // 2627
                                                                                                                       // 2628
          // if the event changed from something like enter to leave then we do                                        // 2629
          // it, otherwise if it's the same then the end result will be the same too                                   // 2630
          if (animationCancelled || (isStructural && animationDetails.event !== event)) {                              // 2631
            options.domOperation();                                                                                    // 2632
            runner.end();                                                                                              // 2633
          }                                                                                                            // 2634
                                                                                                                       // 2635
          // in the event that the element animation was not cancelled or a follow-up animation                        // 2636
          // isn't allowed to animate from here then we need to clear the state of the element                         // 2637
          // so that any future animations won't read the expired animation data.                                      // 2638
          if (!isValidAnimation) {                                                                                     // 2639
            clearElementAnimationState(element);                                                                       // 2640
          }                                                                                                            // 2641
                                                                                                                       // 2642
          return;                                                                                                      // 2643
        }                                                                                                              // 2644
                                                                                                                       // 2645
        // this combined multiple class to addClass / removeClass into a setClass event                                // 2646
        // so long as a structural event did not take over the animation                                               // 2647
        event = !animationDetails.structural && hasAnimationClasses(animationDetails, true)                            // 2648
            ? 'setClass'                                                                                               // 2649
            : animationDetails.event;                                                                                  // 2650
                                                                                                                       // 2651
        markElementAnimationState(element, RUNNING_STATE);                                                             // 2652
        var realRunner = $$animation(element, event, animationDetails.options);                                        // 2653
                                                                                                                       // 2654
        realRunner.done(function(status) {                                                                             // 2655
          close(!status);                                                                                              // 2656
          var animationDetails = activeAnimationsLookup.get(node);                                                     // 2657
          if (animationDetails && animationDetails.counter === counter) {                                              // 2658
            clearElementAnimationState(getDomNode(element));                                                           // 2659
          }                                                                                                            // 2660
          notifyProgress(runner, event, 'close', {});                                                                  // 2661
        });                                                                                                            // 2662
                                                                                                                       // 2663
        // this will update the runner's flow-control events based on                                                  // 2664
        // the `realRunner` object.                                                                                    // 2665
        runner.setHost(realRunner);                                                                                    // 2666
        notifyProgress(runner, event, 'start', {});                                                                    // 2667
      });                                                                                                              // 2668
                                                                                                                       // 2669
      return runner;                                                                                                   // 2670
                                                                                                                       // 2671
      function notifyProgress(runner, event, phase, data) {                                                            // 2672
        runInNextPostDigestOrNow(function() {                                                                          // 2673
          var callbacks = findCallbacks(parent, element, event);                                                       // 2674
          if (callbacks.length) {                                                                                      // 2675
            // do not optimize this call here to RAF because                                                           // 2676
            // we don't know how heavy the callback code here will                                                     // 2677
            // be and if this code is buffered then this can                                                           // 2678
            // lead to a performance regression.                                                                       // 2679
            $$rAF(function() {                                                                                         // 2680
              forEach(callbacks, function(callback) {                                                                  // 2681
                callback(element, phase, data);                                                                        // 2682
              });                                                                                                      // 2683
            });                                                                                                        // 2684
          }                                                                                                            // 2685
        });                                                                                                            // 2686
        runner.progress(event, phase, data);                                                                           // 2687
      }                                                                                                                // 2688
                                                                                                                       // 2689
      function close(reject) { // jshint ignore:line                                                                   // 2690
        clearGeneratedClasses(element, options);                                                                       // 2691
        applyAnimationClasses(element, options);                                                                       // 2692
        applyAnimationStyles(element, options);                                                                        // 2693
        options.domOperation();                                                                                        // 2694
        runner.complete(!reject);                                                                                      // 2695
      }                                                                                                                // 2696
    }                                                                                                                  // 2697
                                                                                                                       // 2698
    function closeChildAnimations(element) {                                                                           // 2699
      var node = getDomNode(element);                                                                                  // 2700
      var children = node.querySelectorAll('[' + NG_ANIMATE_ATTR_NAME + ']');                                          // 2701
      forEach(children, function(child) {                                                                              // 2702
        var state = parseInt(child.getAttribute(NG_ANIMATE_ATTR_NAME));                                                // 2703
        var animationDetails = activeAnimationsLookup.get(child);                                                      // 2704
        if (animationDetails) {                                                                                        // 2705
          switch (state) {                                                                                             // 2706
            case RUNNING_STATE:                                                                                        // 2707
              animationDetails.runner.end();                                                                           // 2708
              /* falls through */                                                                                      // 2709
            case PRE_DIGEST_STATE:                                                                                     // 2710
              activeAnimationsLookup.remove(child);                                                                    // 2711
              break;                                                                                                   // 2712
          }                                                                                                            // 2713
        }                                                                                                              // 2714
      });                                                                                                              // 2715
    }                                                                                                                  // 2716
                                                                                                                       // 2717
    function clearElementAnimationState(element) {                                                                     // 2718
      var node = getDomNode(element);                                                                                  // 2719
      node.removeAttribute(NG_ANIMATE_ATTR_NAME);                                                                      // 2720
      activeAnimationsLookup.remove(node);                                                                             // 2721
    }                                                                                                                  // 2722
                                                                                                                       // 2723
    function isMatchingElement(nodeOrElmA, nodeOrElmB) {                                                               // 2724
      return getDomNode(nodeOrElmA) === getDomNode(nodeOrElmB);                                                        // 2725
    }                                                                                                                  // 2726
                                                                                                                       // 2727
    /**                                                                                                                // 2728
     * This fn returns false if any of the following is true:                                                          // 2729
     * a) animations on any parent element are disabled, and animations on the element aren't explicitly allowed       // 2730
     * b) a parent element has an ongoing structural animation, and animateChildren is false                           // 2731
     * c) the element is not a child of the body                                                                       // 2732
     * d) the element is not a child of the $rootElement                                                               // 2733
     */                                                                                                                // 2734
    function areAnimationsAllowed(element, parentElement, event) {                                                     // 2735
      var bodyElement = jqLite($document[0].body);                                                                     // 2736
      var bodyElementDetected = isMatchingElement(element, bodyElement) || element[0].nodeName === 'HTML';             // 2737
      var rootElementDetected = isMatchingElement(element, $rootElement);                                              // 2738
      var parentAnimationDetected = false;                                                                             // 2739
      var animateChildren;                                                                                             // 2740
      var elementDisabled = disabledElementsLookup.get(getDomNode(element));                                           // 2741
                                                                                                                       // 2742
      var parentHost = jqLite.data(element[0], NG_ANIMATE_PIN_DATA);                                                   // 2743
      if (parentHost) {                                                                                                // 2744
        parentElement = parentHost;                                                                                    // 2745
      }                                                                                                                // 2746
                                                                                                                       // 2747
      parentElement = getDomNode(parentElement);                                                                       // 2748
                                                                                                                       // 2749
      while (parentElement) {                                                                                          // 2750
        if (!rootElementDetected) {                                                                                    // 2751
          // angular doesn't want to attempt to animate elements outside of the application                            // 2752
          // therefore we need to ensure that the rootElement is an ancestor of the current element                    // 2753
          rootElementDetected = isMatchingElement(parentElement, $rootElement);                                        // 2754
        }                                                                                                              // 2755
                                                                                                                       // 2756
        if (parentElement.nodeType !== ELEMENT_NODE) {                                                                 // 2757
          // no point in inspecting the #document element                                                              // 2758
          break;                                                                                                       // 2759
        }                                                                                                              // 2760
                                                                                                                       // 2761
        var details = activeAnimationsLookup.get(parentElement) || {};                                                 // 2762
        // either an enter, leave or move animation will commence                                                      // 2763
        // therefore we can't allow any animations to take place                                                       // 2764
        // but if a parent animation is class-based then that's ok                                                     // 2765
        if (!parentAnimationDetected) {                                                                                // 2766
          var parentElementDisabled = disabledElementsLookup.get(parentElement);                                       // 2767
                                                                                                                       // 2768
          if (parentElementDisabled === true && elementDisabled !== false) {                                           // 2769
            // disable animations if the user hasn't explicitly enabled animations on the                              // 2770
            // current element                                                                                         // 2771
            elementDisabled = true;                                                                                    // 2772
            // element is disabled via parent element, no need to check anything else                                  // 2773
            break;                                                                                                     // 2774
          } else if (parentElementDisabled === false) {                                                                // 2775
            elementDisabled = false;                                                                                   // 2776
          }                                                                                                            // 2777
          parentAnimationDetected = details.structural;                                                                // 2778
        }                                                                                                              // 2779
                                                                                                                       // 2780
        if (isUndefined(animateChildren) || animateChildren === true) {                                                // 2781
          var value = jqLite.data(parentElement, NG_ANIMATE_CHILDREN_DATA);                                            // 2782
          if (isDefined(value)) {                                                                                      // 2783
            animateChildren = value;                                                                                   // 2784
          }                                                                                                            // 2785
        }                                                                                                              // 2786
                                                                                                                       // 2787
        // there is no need to continue traversing at this point                                                       // 2788
        if (parentAnimationDetected && animateChildren === false) break;                                               // 2789
                                                                                                                       // 2790
        if (!bodyElementDetected) {                                                                                    // 2791
          // we also need to ensure that the element is or will be a part of the body element                          // 2792
          // otherwise it is pointless to even issue an animation to be rendered                                       // 2793
          bodyElementDetected = isMatchingElement(parentElement, bodyElement);                                         // 2794
        }                                                                                                              // 2795
                                                                                                                       // 2796
        if (bodyElementDetected && rootElementDetected) {                                                              // 2797
          // If both body and root have been found, any other checks are pointless,                                    // 2798
          // as no animation data should live outside the application                                                  // 2799
          break;                                                                                                       // 2800
        }                                                                                                              // 2801
                                                                                                                       // 2802
        if (!rootElementDetected) {                                                                                    // 2803
          // If no rootElement is detected, check if the parentElement is pinned to another element                    // 2804
          parentHost = jqLite.data(parentElement, NG_ANIMATE_PIN_DATA);                                                // 2805
          if (parentHost) {                                                                                            // 2806
            // The pin target element becomes the next parent element                                                  // 2807
            parentElement = getDomNode(parentHost);                                                                    // 2808
            continue;                                                                                                  // 2809
          }                                                                                                            // 2810
        }                                                                                                              // 2811
                                                                                                                       // 2812
        parentElement = parentElement.parentNode;                                                                      // 2813
      }                                                                                                                // 2814
                                                                                                                       // 2815
      var allowAnimation = (!parentAnimationDetected || animateChildren) && elementDisabled !== true;                  // 2816
      return allowAnimation && rootElementDetected && bodyElementDetected;                                             // 2817
    }                                                                                                                  // 2818
                                                                                                                       // 2819
    function markElementAnimationState(element, state, details) {                                                      // 2820
      details = details || {};                                                                                         // 2821
      details.state = state;                                                                                           // 2822
                                                                                                                       // 2823
      var node = getDomNode(element);                                                                                  // 2824
      node.setAttribute(NG_ANIMATE_ATTR_NAME, state);                                                                  // 2825
                                                                                                                       // 2826
      var oldValue = activeAnimationsLookup.get(node);                                                                 // 2827
      var newValue = oldValue                                                                                          // 2828
          ? extend(oldValue, details)                                                                                  // 2829
          : details;                                                                                                   // 2830
      activeAnimationsLookup.put(node, newValue);                                                                      // 2831
    }                                                                                                                  // 2832
  }];                                                                                                                  // 2833
}];                                                                                                                    // 2834
                                                                                                                       // 2835
var $$AnimationProvider = ['$animateProvider', function($animateProvider) {                                            // 2836
  var NG_ANIMATE_REF_ATTR = 'ng-animate-ref';                                                                          // 2837
                                                                                                                       // 2838
  var drivers = this.drivers = [];                                                                                     // 2839
                                                                                                                       // 2840
  var RUNNER_STORAGE_KEY = '$$animationRunner';                                                                        // 2841
                                                                                                                       // 2842
  function setRunner(element, runner) {                                                                                // 2843
    element.data(RUNNER_STORAGE_KEY, runner);                                                                          // 2844
  }                                                                                                                    // 2845
                                                                                                                       // 2846
  function removeRunner(element) {                                                                                     // 2847
    element.removeData(RUNNER_STORAGE_KEY);                                                                            // 2848
  }                                                                                                                    // 2849
                                                                                                                       // 2850
  function getRunner(element) {                                                                                        // 2851
    return element.data(RUNNER_STORAGE_KEY);                                                                           // 2852
  }                                                                                                                    // 2853
                                                                                                                       // 2854
  this.$get = ['$$jqLite', '$rootScope', '$injector', '$$AnimateRunner', '$$HashMap', '$$rAFScheduler',                // 2855
       function($$jqLite,   $rootScope,   $injector,   $$AnimateRunner,   $$HashMap,   $$rAFScheduler) {               // 2856
                                                                                                                       // 2857
    var animationQueue = [];                                                                                           // 2858
    var applyAnimationClasses = applyAnimationClassesFactory($$jqLite);                                                // 2859
                                                                                                                       // 2860
    function sortAnimations(animations) {                                                                              // 2861
      var tree = { children: [] };                                                                                     // 2862
      var i, lookup = new $$HashMap();                                                                                 // 2863
                                                                                                                       // 2864
      // this is done first beforehand so that the hashmap                                                             // 2865
      // is filled with a list of the elements that will be animated                                                   // 2866
      for (i = 0; i < animations.length; i++) {                                                                        // 2867
        var animation = animations[i];                                                                                 // 2868
        lookup.put(animation.domNode, animations[i] = {                                                                // 2869
          domNode: animation.domNode,                                                                                  // 2870
          fn: animation.fn,                                                                                            // 2871
          children: []                                                                                                 // 2872
        });                                                                                                            // 2873
      }                                                                                                                // 2874
                                                                                                                       // 2875
      for (i = 0; i < animations.length; i++) {                                                                        // 2876
        processNode(animations[i]);                                                                                    // 2877
      }                                                                                                                // 2878
                                                                                                                       // 2879
      return flatten(tree);                                                                                            // 2880
                                                                                                                       // 2881
      function processNode(entry) {                                                                                    // 2882
        if (entry.processed) return entry;                                                                             // 2883
        entry.processed = true;                                                                                        // 2884
                                                                                                                       // 2885
        var elementNode = entry.domNode;                                                                               // 2886
        var parentNode = elementNode.parentNode;                                                                       // 2887
        lookup.put(elementNode, entry);                                                                                // 2888
                                                                                                                       // 2889
        var parentEntry;                                                                                               // 2890
        while (parentNode) {                                                                                           // 2891
          parentEntry = lookup.get(parentNode);                                                                        // 2892
          if (parentEntry) {                                                                                           // 2893
            if (!parentEntry.processed) {                                                                              // 2894
              parentEntry = processNode(parentEntry);                                                                  // 2895
            }                                                                                                          // 2896
            break;                                                                                                     // 2897
          }                                                                                                            // 2898
          parentNode = parentNode.parentNode;                                                                          // 2899
        }                                                                                                              // 2900
                                                                                                                       // 2901
        (parentEntry || tree).children.push(entry);                                                                    // 2902
        return entry;                                                                                                  // 2903
      }                                                                                                                // 2904
                                                                                                                       // 2905
      function flatten(tree) {                                                                                         // 2906
        var result = [];                                                                                               // 2907
        var queue = [];                                                                                                // 2908
        var i;                                                                                                         // 2909
                                                                                                                       // 2910
        for (i = 0; i < tree.children.length; i++) {                                                                   // 2911
          queue.push(tree.children[i]);                                                                                // 2912
        }                                                                                                              // 2913
                                                                                                                       // 2914
        var remainingLevelEntries = queue.length;                                                                      // 2915
        var nextLevelEntries = 0;                                                                                      // 2916
        var row = [];                                                                                                  // 2917
                                                                                                                       // 2918
        for (i = 0; i < queue.length; i++) {                                                                           // 2919
          var entry = queue[i];                                                                                        // 2920
          if (remainingLevelEntries <= 0) {                                                                            // 2921
            remainingLevelEntries = nextLevelEntries;                                                                  // 2922
            nextLevelEntries = 0;                                                                                      // 2923
            result.push(row);                                                                                          // 2924
            row = [];                                                                                                  // 2925
          }                                                                                                            // 2926
          row.push(entry.fn);                                                                                          // 2927
          entry.children.forEach(function(childEntry) {                                                                // 2928
            nextLevelEntries++;                                                                                        // 2929
            queue.push(childEntry);                                                                                    // 2930
          });                                                                                                          // 2931
          remainingLevelEntries--;                                                                                     // 2932
        }                                                                                                              // 2933
                                                                                                                       // 2934
        if (row.length) {                                                                                              // 2935
          result.push(row);                                                                                            // 2936
        }                                                                                                              // 2937
                                                                                                                       // 2938
        return result;                                                                                                 // 2939
      }                                                                                                                // 2940
    }                                                                                                                  // 2941
                                                                                                                       // 2942
    // TODO(matsko): document the signature in a better way                                                            // 2943
    return function(element, event, options) {                                                                         // 2944
      options = prepareAnimationOptions(options);                                                                      // 2945
      var isStructural = ['enter', 'move', 'leave'].indexOf(event) >= 0;                                               // 2946
                                                                                                                       // 2947
      // there is no animation at the current moment, however                                                          // 2948
      // these runner methods will get later updated with the                                                          // 2949
      // methods leading into the driver's end/cancel methods                                                          // 2950
      // for now they just stop the animation from starting                                                            // 2951
      var runner = new $$AnimateRunner({                                                                               // 2952
        end: function() { close(); },                                                                                  // 2953
        cancel: function() { close(true); }                                                                            // 2954
      });                                                                                                              // 2955
                                                                                                                       // 2956
      if (!drivers.length) {                                                                                           // 2957
        close();                                                                                                       // 2958
        return runner;                                                                                                 // 2959
      }                                                                                                                // 2960
                                                                                                                       // 2961
      setRunner(element, runner);                                                                                      // 2962
                                                                                                                       // 2963
      var classes = mergeClasses(element.attr('class'), mergeClasses(options.addClass, options.removeClass));          // 2964
      var tempClasses = options.tempClasses;                                                                           // 2965
      if (tempClasses) {                                                                                               // 2966
        classes += ' ' + tempClasses;                                                                                  // 2967
        options.tempClasses = null;                                                                                    // 2968
      }                                                                                                                // 2969
                                                                                                                       // 2970
      var prepareClassName;                                                                                            // 2971
      if (isStructural) {                                                                                              // 2972
        prepareClassName = 'ng-' + event + PREPARE_CLASS_SUFFIX;                                                       // 2973
        $$jqLite.addClass(element, prepareClassName);                                                                  // 2974
      }                                                                                                                // 2975
                                                                                                                       // 2976
      animationQueue.push({                                                                                            // 2977
        // this data is used by the postDigest code and passed into                                                    // 2978
        // the driver step function                                                                                    // 2979
        element: element,                                                                                              // 2980
        classes: classes,                                                                                              // 2981
        event: event,                                                                                                  // 2982
        structural: isStructural,                                                                                      // 2983
        options: options,                                                                                              // 2984
        beforeStart: beforeStart,                                                                                      // 2985
        close: close                                                                                                   // 2986
      });                                                                                                              // 2987
                                                                                                                       // 2988
      element.on('$destroy', handleDestroyedElement);                                                                  // 2989
                                                                                                                       // 2990
      // we only want there to be one function called within the post digest                                           // 2991
      // block. This way we can group animations for all the animations that                                           // 2992
      // were apart of the same postDigest flush call.                                                                 // 2993
      if (animationQueue.length > 1) return runner;                                                                    // 2994
                                                                                                                       // 2995
      $rootScope.$$postDigest(function() {                                                                             // 2996
        var animations = [];                                                                                           // 2997
        forEach(animationQueue, function(entry) {                                                                      // 2998
          // the element was destroyed early on which removed the runner                                               // 2999
          // form its storage. This means we can't animate this element                                                // 3000
          // at all and it already has been closed due to destruction.                                                 // 3001
          if (getRunner(entry.element)) {                                                                              // 3002
            animations.push(entry);                                                                                    // 3003
          } else {                                                                                                     // 3004
            entry.close();                                                                                             // 3005
          }                                                                                                            // 3006
        });                                                                                                            // 3007
                                                                                                                       // 3008
        // now any future animations will be in another postDigest                                                     // 3009
        animationQueue.length = 0;                                                                                     // 3010
                                                                                                                       // 3011
        var groupedAnimations = groupAnimations(animations);                                                           // 3012
        var toBeSortedAnimations = [];                                                                                 // 3013
                                                                                                                       // 3014
        forEach(groupedAnimations, function(animationEntry) {                                                          // 3015
          toBeSortedAnimations.push({                                                                                  // 3016
            domNode: getDomNode(animationEntry.from ? animationEntry.from.element : animationEntry.element),           // 3017
            fn: function triggerAnimationStart() {                                                                     // 3018
              // it's important that we apply the `ng-animate` CSS class and the                                       // 3019
              // temporary classes before we do any driver invoking since these                                        // 3020
              // CSS classes may be required for proper CSS detection.                                                 // 3021
              animationEntry.beforeStart();                                                                            // 3022
                                                                                                                       // 3023
              var startAnimationFn, closeFn = animationEntry.close;                                                    // 3024
                                                                                                                       // 3025
              // in the event that the element was removed before the digest runs or                                   // 3026
              // during the RAF sequencing then we should not trigger the animation.                                   // 3027
              var targetElement = animationEntry.anchors                                                               // 3028
                  ? (animationEntry.from.element || animationEntry.to.element)                                         // 3029
                  : animationEntry.element;                                                                            // 3030
                                                                                                                       // 3031
              if (getRunner(targetElement)) {                                                                          // 3032
                var operation = invokeFirstDriver(animationEntry);                                                     // 3033
                if (operation) {                                                                                       // 3034
                  startAnimationFn = operation.start;                                                                  // 3035
                }                                                                                                      // 3036
              }                                                                                                        // 3037
                                                                                                                       // 3038
              if (!startAnimationFn) {                                                                                 // 3039
                closeFn();                                                                                             // 3040
              } else {                                                                                                 // 3041
                var animationRunner = startAnimationFn();                                                              // 3042
                animationRunner.done(function(status) {                                                                // 3043
                  closeFn(!status);                                                                                    // 3044
                });                                                                                                    // 3045
                updateAnimationRunners(animationEntry, animationRunner);                                               // 3046
              }                                                                                                        // 3047
            }                                                                                                          // 3048
          });                                                                                                          // 3049
        });                                                                                                            // 3050
                                                                                                                       // 3051
        // we need to sort each of the animations in order of parent to child                                          // 3052
        // relationships. This ensures that the child classes are applied at the                                       // 3053
        // right time.                                                                                                 // 3054
        $$rAFScheduler(sortAnimations(toBeSortedAnimations));                                                          // 3055
      });                                                                                                              // 3056
                                                                                                                       // 3057
      return runner;                                                                                                   // 3058
                                                                                                                       // 3059
      // TODO(matsko): change to reference nodes                                                                       // 3060
      function getAnchorNodes(node) {                                                                                  // 3061
        var SELECTOR = '[' + NG_ANIMATE_REF_ATTR + ']';                                                                // 3062
        var items = node.hasAttribute(NG_ANIMATE_REF_ATTR)                                                             // 3063
              ? [node]                                                                                                 // 3064
              : node.querySelectorAll(SELECTOR);                                                                       // 3065
        var anchors = [];                                                                                              // 3066
        forEach(items, function(node) {                                                                                // 3067
          var attr = node.getAttribute(NG_ANIMATE_REF_ATTR);                                                           // 3068
          if (attr && attr.length) {                                                                                   // 3069
            anchors.push(node);                                                                                        // 3070
          }                                                                                                            // 3071
        });                                                                                                            // 3072
        return anchors;                                                                                                // 3073
      }                                                                                                                // 3074
                                                                                                                       // 3075
      function groupAnimations(animations) {                                                                           // 3076
        var preparedAnimations = [];                                                                                   // 3077
        var refLookup = {};                                                                                            // 3078
        forEach(animations, function(animation, index) {                                                               // 3079
          var element = animation.element;                                                                             // 3080
          var node = getDomNode(element);                                                                              // 3081
          var event = animation.event;                                                                                 // 3082
          var enterOrMove = ['enter', 'move'].indexOf(event) >= 0;                                                     // 3083
          var anchorNodes = animation.structural ? getAnchorNodes(node) : [];                                          // 3084
                                                                                                                       // 3085
          if (anchorNodes.length) {                                                                                    // 3086
            var direction = enterOrMove ? 'to' : 'from';                                                               // 3087
                                                                                                                       // 3088
            forEach(anchorNodes, function(anchor) {                                                                    // 3089
              var key = anchor.getAttribute(NG_ANIMATE_REF_ATTR);                                                      // 3090
              refLookup[key] = refLookup[key] || {};                                                                   // 3091
              refLookup[key][direction] = {                                                                            // 3092
                animationID: index,                                                                                    // 3093
                element: jqLite(anchor)                                                                                // 3094
              };                                                                                                       // 3095
            });                                                                                                        // 3096
          } else {                                                                                                     // 3097
            preparedAnimations.push(animation);                                                                        // 3098
          }                                                                                                            // 3099
        });                                                                                                            // 3100
                                                                                                                       // 3101
        var usedIndicesLookup = {};                                                                                    // 3102
        var anchorGroups = {};                                                                                         // 3103
        forEach(refLookup, function(operations, key) {                                                                 // 3104
          var from = operations.from;                                                                                  // 3105
          var to = operations.to;                                                                                      // 3106
                                                                                                                       // 3107
          if (!from || !to) {                                                                                          // 3108
            // only one of these is set therefore we can't have an                                                     // 3109
            // anchor animation since all three pieces are required                                                    // 3110
            var index = from ? from.animationID : to.animationID;                                                      // 3111
            var indexKey = index.toString();                                                                           // 3112
            if (!usedIndicesLookup[indexKey]) {                                                                        // 3113
              usedIndicesLookup[indexKey] = true;                                                                      // 3114
              preparedAnimations.push(animations[index]);                                                              // 3115
            }                                                                                                          // 3116
            return;                                                                                                    // 3117
          }                                                                                                            // 3118
                                                                                                                       // 3119
          var fromAnimation = animations[from.animationID];                                                            // 3120
          var toAnimation = animations[to.animationID];                                                                // 3121
          var lookupKey = from.animationID.toString();                                                                 // 3122
          if (!anchorGroups[lookupKey]) {                                                                              // 3123
            var group = anchorGroups[lookupKey] = {                                                                    // 3124
              structural: true,                                                                                        // 3125
              beforeStart: function() {                                                                                // 3126
                fromAnimation.beforeStart();                                                                           // 3127
                toAnimation.beforeStart();                                                                             // 3128
              },                                                                                                       // 3129
              close: function() {                                                                                      // 3130
                fromAnimation.close();                                                                                 // 3131
                toAnimation.close();                                                                                   // 3132
              },                                                                                                       // 3133
              classes: cssClassesIntersection(fromAnimation.classes, toAnimation.classes),                             // 3134
              from: fromAnimation,                                                                                     // 3135
              to: toAnimation,                                                                                         // 3136
              anchors: [] // TODO(matsko): change to reference nodes                                                   // 3137
            };                                                                                                         // 3138
                                                                                                                       // 3139
            // the anchor animations require that the from and to elements both have at least                          // 3140
            // one shared CSS class which effectively marries the two elements together to use                         // 3141
            // the same animation driver and to properly sequence the anchor animation.                                // 3142
            if (group.classes.length) {                                                                                // 3143
              preparedAnimations.push(group);                                                                          // 3144
            } else {                                                                                                   // 3145
              preparedAnimations.push(fromAnimation);                                                                  // 3146
              preparedAnimations.push(toAnimation);                                                                    // 3147
            }                                                                                                          // 3148
          }                                                                                                            // 3149
                                                                                                                       // 3150
          anchorGroups[lookupKey].anchors.push({                                                                       // 3151
            'out': from.element, 'in': to.element                                                                      // 3152
          });                                                                                                          // 3153
        });                                                                                                            // 3154
                                                                                                                       // 3155
        return preparedAnimations;                                                                                     // 3156
      }                                                                                                                // 3157
                                                                                                                       // 3158
      function cssClassesIntersection(a,b) {                                                                           // 3159
        a = a.split(' ');                                                                                              // 3160
        b = b.split(' ');                                                                                              // 3161
        var matches = [];                                                                                              // 3162
                                                                                                                       // 3163
        for (var i = 0; i < a.length; i++) {                                                                           // 3164
          var aa = a[i];                                                                                               // 3165
          if (aa.substring(0,3) === 'ng-') continue;                                                                   // 3166
                                                                                                                       // 3167
          for (var j = 0; j < b.length; j++) {                                                                         // 3168
            if (aa === b[j]) {                                                                                         // 3169
              matches.push(aa);                                                                                        // 3170
              break;                                                                                                   // 3171
            }                                                                                                          // 3172
          }                                                                                                            // 3173
        }                                                                                                              // 3174
                                                                                                                       // 3175
        return matches.join(' ');                                                                                      // 3176
      }                                                                                                                // 3177
                                                                                                                       // 3178
      function invokeFirstDriver(animationDetails) {                                                                   // 3179
        // we loop in reverse order since the more general drivers (like CSS and JS)                                   // 3180
        // may attempt more elements, but custom drivers are more particular                                           // 3181
        for (var i = drivers.length - 1; i >= 0; i--) {                                                                // 3182
          var driverName = drivers[i];                                                                                 // 3183
          if (!$injector.has(driverName)) continue; // TODO(matsko): remove this check                                 // 3184
                                                                                                                       // 3185
          var factory = $injector.get(driverName);                                                                     // 3186
          var driver = factory(animationDetails);                                                                      // 3187
          if (driver) {                                                                                                // 3188
            return driver;                                                                                             // 3189
          }                                                                                                            // 3190
        }                                                                                                              // 3191
      }                                                                                                                // 3192
                                                                                                                       // 3193
      function beforeStart() {                                                                                         // 3194
        element.addClass(NG_ANIMATE_CLASSNAME);                                                                        // 3195
        if (tempClasses) {                                                                                             // 3196
          $$jqLite.addClass(element, tempClasses);                                                                     // 3197
        }                                                                                                              // 3198
        if (prepareClassName) {                                                                                        // 3199
          $$jqLite.removeClass(element, prepareClassName);                                                             // 3200
          prepareClassName = null;                                                                                     // 3201
        }                                                                                                              // 3202
      }                                                                                                                // 3203
                                                                                                                       // 3204
      function updateAnimationRunners(animation, newRunner) {                                                          // 3205
        if (animation.from && animation.to) {                                                                          // 3206
          update(animation.from.element);                                                                              // 3207
          update(animation.to.element);                                                                                // 3208
        } else {                                                                                                       // 3209
          update(animation.element);                                                                                   // 3210
        }                                                                                                              // 3211
                                                                                                                       // 3212
        function update(element) {                                                                                     // 3213
          getRunner(element).setHost(newRunner);                                                                       // 3214
        }                                                                                                              // 3215
      }                                                                                                                // 3216
                                                                                                                       // 3217
      function handleDestroyedElement() {                                                                              // 3218
        var runner = getRunner(element);                                                                               // 3219
        if (runner && (event !== 'leave' || !options.$$domOperationFired)) {                                           // 3220
          runner.end();                                                                                                // 3221
        }                                                                                                              // 3222
      }                                                                                                                // 3223
                                                                                                                       // 3224
      function close(rejected) { // jshint ignore:line                                                                 // 3225
        element.off('$destroy', handleDestroyedElement);                                                               // 3226
        removeRunner(element);                                                                                         // 3227
                                                                                                                       // 3228
        applyAnimationClasses(element, options);                                                                       // 3229
        applyAnimationStyles(element, options);                                                                        // 3230
        options.domOperation();                                                                                        // 3231
                                                                                                                       // 3232
        if (tempClasses) {                                                                                             // 3233
          $$jqLite.removeClass(element, tempClasses);                                                                  // 3234
        }                                                                                                              // 3235
                                                                                                                       // 3236
        element.removeClass(NG_ANIMATE_CLASSNAME);                                                                     // 3237
        runner.complete(!rejected);                                                                                    // 3238
      }                                                                                                                // 3239
    };                                                                                                                 // 3240
  }];                                                                                                                  // 3241
}];                                                                                                                    // 3242
                                                                                                                       // 3243
/**                                                                                                                    // 3244
 * @ngdoc directive                                                                                                    // 3245
 * @name ngAnimateSwap                                                                                                 // 3246
 * @restrict A                                                                                                         // 3247
 * @scope                                                                                                              // 3248
 *                                                                                                                     // 3249
 * @description                                                                                                        // 3250
 *                                                                                                                     // 3251
 * ngAnimateSwap is a animation-oriented directive that allows for the container to                                    // 3252
 * be removed and entered in whenever the associated expression changes. A                                             // 3253
 * common usecase for this directive is a rotating banner or slider component which                                    // 3254
 * contains one image being present at a time. When the active image changes                                           // 3255
 * then the old image will perform a `leave` animation and the new element                                             // 3256
 * will be inserted via an `enter` animation.                                                                          // 3257
 *                                                                                                                     // 3258
 * @animations                                                                                                         // 3259
 * | Animation                        | Occurs                               |                                         // 3260
 * |----------------------------------|--------------------------------------|                                         // 3261
 * | {@link ng.$animate#enter enter}  | when the new element is inserted to the DOM  |                                 // 3262
 * | {@link ng.$animate#leave leave}  | when the old element is removed from the DOM |                                 // 3263
 *                                                                                                                     // 3264
 * @example                                                                                                            // 3265
 * <example name="ngAnimateSwap-directive" module="ngAnimateSwapExample"                                               // 3266
 *          deps="angular-animate.js"                                                                                  // 3267
 *          animations="true" fixBase="true">                                                                          // 3268
 *   <file name="index.html">                                                                                          // 3269
 *     <div class="container" ng-controller="AppCtrl">                                                                 // 3270
 *       <div ng-animate-swap="number" class="cell swap-animation" ng-class="colorClass(number)">                      // 3271
 *         {{ number }}                                                                                                // 3272
 *       </div>                                                                                                        // 3273
 *     </div>                                                                                                          // 3274
 *   </file>                                                                                                           // 3275
 *   <file name="script.js">                                                                                           // 3276
 *     angular.module('ngAnimateSwapExample', ['ngAnimate'])                                                           // 3277
 *       .controller('AppCtrl', ['$scope', '$interval', function($scope, $interval) {                                  // 3278
 *         $scope.number = 0;                                                                                          // 3279
 *         $interval(function() {                                                                                      // 3280
 *           $scope.number++;                                                                                          // 3281
 *         }, 1000);                                                                                                   // 3282
 *                                                                                                                     // 3283
 *         var colors = ['red','blue','green','yellow','orange'];                                                      // 3284
 *         $scope.colorClass = function(number) {                                                                      // 3285
 *           return colors[number % colors.length];                                                                    // 3286
 *         };                                                                                                          // 3287
 *       }]);                                                                                                          // 3288
 *   </file>                                                                                                           // 3289
 *  <file name="animations.css">                                                                                       // 3290
 *  .container {                                                                                                       // 3291
 *    height:250px;                                                                                                    // 3292
 *    width:250px;                                                                                                     // 3293
 *    position:relative;                                                                                               // 3294
 *    overflow:hidden;                                                                                                 // 3295
 *    border:2px solid black;                                                                                          // 3296
 *  }                                                                                                                  // 3297
 *  .container .cell {                                                                                                 // 3298
 *    font-size:150px;                                                                                                 // 3299
 *    text-align:center;                                                                                               // 3300
 *    line-height:250px;                                                                                               // 3301
 *    position:absolute;                                                                                               // 3302
 *    top:0;                                                                                                           // 3303
 *    left:0;                                                                                                          // 3304
 *    right:0;                                                                                                         // 3305
 *    border-bottom:2px solid black;                                                                                   // 3306
 *  }                                                                                                                  // 3307
 *  .swap-animation.ng-enter, .swap-animation.ng-leave {                                                               // 3308
 *    transition:0.5s linear all;                                                                                      // 3309
 *  }                                                                                                                  // 3310
 *  .swap-animation.ng-enter {                                                                                         // 3311
 *    top:-250px;                                                                                                      // 3312
 *  }                                                                                                                  // 3313
 *  .swap-animation.ng-enter-active {                                                                                  // 3314
 *    top:0px;                                                                                                         // 3315
 *  }                                                                                                                  // 3316
 *  .swap-animation.ng-leave {                                                                                         // 3317
 *    top:0px;                                                                                                         // 3318
 *  }                                                                                                                  // 3319
 *  .swap-animation.ng-leave-active {                                                                                  // 3320
 *    top:250px;                                                                                                       // 3321
 *  }                                                                                                                  // 3322
 *  .red { background:red; }                                                                                           // 3323
 *  .green { background:green; }                                                                                       // 3324
 *  .blue { background:blue; }                                                                                         // 3325
 *  .yellow { background:yellow; }                                                                                     // 3326
 *  .orange { background:orange; }                                                                                     // 3327
 *  </file>                                                                                                            // 3328
 * </example>                                                                                                          // 3329
 */                                                                                                                    // 3330
var ngAnimateSwapDirective = ['$animate', '$rootScope', function($animate, $rootScope) {                               // 3331
  return {                                                                                                             // 3332
    restrict: 'A',                                                                                                     // 3333
    transclude: 'element',                                                                                             // 3334
    terminal: true,                                                                                                    // 3335
    priority: 600, // we use 600 here to ensure that the directive is caught before others                             // 3336
    link: function(scope, $element, attrs, ctrl, $transclude) {                                                        // 3337
      var previousElement, previousScope;                                                                              // 3338
      scope.$watchCollection(attrs.ngAnimateSwap || attrs['for'], function(value) {                                    // 3339
        if (previousElement) {                                                                                         // 3340
          $animate.leave(previousElement);                                                                             // 3341
        }                                                                                                              // 3342
        if (previousScope) {                                                                                           // 3343
          previousScope.$destroy();                                                                                    // 3344
          previousScope = null;                                                                                        // 3345
        }                                                                                                              // 3346
        if (value || value === 0) {                                                                                    // 3347
          previousScope = scope.$new();                                                                                // 3348
          $transclude(previousScope, function(element) {                                                               // 3349
            previousElement = element;                                                                                 // 3350
            $animate.enter(element, null, $element);                                                                   // 3351
          });                                                                                                          // 3352
        }                                                                                                              // 3353
      });                                                                                                              // 3354
    }                                                                                                                  // 3355
  };                                                                                                                   // 3356
}];                                                                                                                    // 3357
                                                                                                                       // 3358
/* global angularAnimateModule: true,                                                                                  // 3359
                                                                                                                       // 3360
   ngAnimateSwapDirective,                                                                                             // 3361
   $$AnimateAsyncRunFactory,                                                                                           // 3362
   $$rAFSchedulerFactory,                                                                                              // 3363
   $$AnimateChildrenDirective,                                                                                         // 3364
   $$AnimateQueueProvider,                                                                                             // 3365
   $$AnimationProvider,                                                                                                // 3366
   $AnimateCssProvider,                                                                                                // 3367
   $$AnimateCssDriverProvider,                                                                                         // 3368
   $$AnimateJsProvider,                                                                                                // 3369
   $$AnimateJsDriverProvider,                                                                                          // 3370
*/                                                                                                                     // 3371
                                                                                                                       // 3372
/**                                                                                                                    // 3373
 * @ngdoc module                                                                                                       // 3374
 * @name ngAnimate                                                                                                     // 3375
 * @description                                                                                                        // 3376
 *                                                                                                                     // 3377
 * The `ngAnimate` module provides support for CSS-based animations (keyframes and transitions) as well as JavaScript-based animations via
 * callback hooks. Animations are not enabled by default, however, by including `ngAnimate` the animation hooks are enabled for an Angular app.
 *                                                                                                                     // 3380
 * <div doc-module-components="ngAnimate"></div>                                                                       // 3381
 *                                                                                                                     // 3382
 * # Usage                                                                                                             // 3383
 * Simply put, there are two ways to make use of animations when ngAnimate is used: by using **CSS** and **JavaScript**. The former works purely based
 * using CSS (by using matching CSS selectors/styles) and the latter triggers animations that are registered via `module.animation()`. For
 * both CSS and JS animations the sole requirement is to have a matching `CSS class` that exists both in the registered animation and within
 * the HTML element that the animation will be triggered on.                                                           // 3387
 *                                                                                                                     // 3388
 * ## Directive Support                                                                                                // 3389
 * The following directives are "animation aware":                                                                     // 3390
 *                                                                                                                     // 3391
 * | Directive                                                                                                | Supported Animations                                                     |
 * |----------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------|
 * | {@link ng.directive:ngRepeat#animations ngRepeat}                                                        | enter, leave and move                                                    |
 * | {@link ngRoute.directive:ngView#animations ngView}                                                       | enter and leave                                                          |
 * | {@link ng.directive:ngInclude#animations ngInclude}                                                      | enter and leave                                                          |
 * | {@link ng.directive:ngSwitch#animations ngSwitch}                                                        | enter and leave                                                          |
 * | {@link ng.directive:ngIf#animations ngIf}                                                                | enter and leave                                                          |
 * | {@link ng.directive:ngClass#animations ngClass}                                                          | add and remove (the CSS class(es) present)                               |
 * | {@link ng.directive:ngShow#animations ngShow} & {@link ng.directive:ngHide#animations ngHide}            | add and remove (the ng-hide class value)                                 |
 * | {@link ng.directive:form#animation-hooks form} & {@link ng.directive:ngModel#animation-hooks ngModel}    | add and remove (dirty, pristine, valid, invalid & all other validations) |
 * | {@link module:ngMessages#animations ngMessages}                                                          | add and remove (ng-active & ng-inactive)                                 |
 * | {@link module:ngMessages#animations ngMessage}                                                           | enter and leave                                                          |
 *                                                                                                                     // 3404
 * (More information can be found by visiting each the documentation associated with each directive.)                  // 3405
 *                                                                                                                     // 3406
 * ## CSS-based Animations                                                                                             // 3407
 *                                                                                                                     // 3408
 * CSS-based animations with ngAnimate are unique since they require no JavaScript code at all. By using a CSS class that we reference between our HTML
 * and CSS code we can create an animation that will be picked up by Angular when an the underlying directive performs an operation.
 *                                                                                                                     // 3411
 * The example below shows how an `enter` animation can be made possible on an element using `ng-if`:                  // 3412
 *                                                                                                                     // 3413
 * ```html                                                                                                             // 3414
 * <div ng-if="bool" class="fade">                                                                                     // 3415
 *    Fade me in out                                                                                                   // 3416
 * </div>                                                                                                              // 3417
 * <button ng-click="bool=true">Fade In!</button>                                                                      // 3418
 * <button ng-click="bool=false">Fade Out!</button>                                                                    // 3419
 * ```                                                                                                                 // 3420
 *                                                                                                                     // 3421
 * Notice the CSS class **fade**? We can now create the CSS transition code that references this class:                // 3422
 *                                                                                                                     // 3423
 * ```css                                                                                                              // 3424
 * /&#42; The starting CSS styles for the enter animation &#42;/                                                       // 3425
 * .fade.ng-enter {                                                                                                    // 3426
 *   transition:0.5s linear all;                                                                                       // 3427
 *   opacity:0;                                                                                                        // 3428
 * }                                                                                                                   // 3429
 *                                                                                                                     // 3430
 * /&#42; The finishing CSS styles for the enter animation &#42;/                                                      // 3431
 * .fade.ng-enter.ng-enter-active {                                                                                    // 3432
 *   opacity:1;                                                                                                        // 3433
 * }                                                                                                                   // 3434
 * ```                                                                                                                 // 3435
 *                                                                                                                     // 3436
 * The key thing to remember here is that, depending on the animation event (which each of the directives above trigger depending on what's going on) two
 * generated CSS classes will be applied to the element; in the example above we have `.ng-enter` and `.ng-enter-active`. For CSS transitions, the transition
 * code **must** be defined within the starting CSS class (in this case `.ng-enter`). The destination class is what the transition will animate towards.
 *                                                                                                                     // 3440
 * If for example we wanted to create animations for `leave` and `move` (ngRepeat triggers move) then we can do so using the same CSS naming conventions:
 *                                                                                                                     // 3442
 * ```css                                                                                                              // 3443
 * /&#42; now the element will fade out before it is removed from the DOM &#42;/                                       // 3444
 * .fade.ng-leave {                                                                                                    // 3445
 *   transition:0.5s linear all;                                                                                       // 3446
 *   opacity:1;                                                                                                        // 3447
 * }                                                                                                                   // 3448
 * .fade.ng-leave.ng-leave-active {                                                                                    // 3449
 *   opacity:0;                                                                                                        // 3450
 * }                                                                                                                   // 3451
 * ```                                                                                                                 // 3452
 *                                                                                                                     // 3453
 * We can also make use of **CSS Keyframes** by referencing the keyframe animation within the starting CSS class:      // 3454
 *                                                                                                                     // 3455
 * ```css                                                                                                              // 3456
 * /&#42; there is no need to define anything inside of the destination                                                // 3457
 * CSS class since the keyframe will take charge of the animation &#42;/                                               // 3458
 * .fade.ng-leave {                                                                                                    // 3459
 *   animation: my_fade_animation 0.5s linear;                                                                         // 3460
 *   -webkit-animation: my_fade_animation 0.5s linear;                                                                 // 3461
 * }                                                                                                                   // 3462
 *                                                                                                                     // 3463
 * @keyframes my_fade_animation {                                                                                      // 3464
 *   from { opacity:1; }                                                                                               // 3465
 *   to { opacity:0; }                                                                                                 // 3466
 * }                                                                                                                   // 3467
 *                                                                                                                     // 3468
 * @-webkit-keyframes my_fade_animation {                                                                              // 3469
 *   from { opacity:1; }                                                                                               // 3470
 *   to { opacity:0; }                                                                                                 // 3471
 * }                                                                                                                   // 3472
 * ```                                                                                                                 // 3473
 *                                                                                                                     // 3474
 * Feel free also mix transitions and keyframes together as well as any other CSS classes on the same element.         // 3475
 *                                                                                                                     // 3476
 * ### CSS Class-based Animations                                                                                      // 3477
 *                                                                                                                     // 3478
 * Class-based animations (animations that are triggered via `ngClass`, `ngShow`, `ngHide` and some other directives) have a slightly different
 * naming convention. Class-based animations are basic enough that a standard transition or keyframe can be referenced on the class being added
 * and removed.                                                                                                        // 3481
 *                                                                                                                     // 3482
 * For example if we wanted to do a CSS animation for `ngHide` then we place an animation on the `.ng-hide` CSS class:
 *                                                                                                                     // 3484
 * ```html                                                                                                             // 3485
 * <div ng-show="bool" class="fade">                                                                                   // 3486
 *   Show and hide me                                                                                                  // 3487
 * </div>                                                                                                              // 3488
 * <button ng-click="bool=true">Toggle</button>                                                                        // 3489
 *                                                                                                                     // 3490
 * <style>                                                                                                             // 3491
 * .fade.ng-hide {                                                                                                     // 3492
 *   transition:0.5s linear all;                                                                                       // 3493
 *   opacity:0;                                                                                                        // 3494
 * }                                                                                                                   // 3495
 * </style>                                                                                                            // 3496
 * ```                                                                                                                 // 3497
 *                                                                                                                     // 3498
 * All that is going on here with ngShow/ngHide behind the scenes is the `.ng-hide` class is added/removed (when the hidden state is valid). Since
 * ngShow and ngHide are animation aware then we can match up a transition and ngAnimate handles the rest.             // 3500
 *                                                                                                                     // 3501
 * In addition the addition and removal of the CSS class, ngAnimate also provides two helper methods that we can use to further decorate the animation
 * with CSS styles.                                                                                                    // 3503
 *                                                                                                                     // 3504
 * ```html                                                                                                             // 3505
 * <div ng-class="{on:onOff}" class="highlight">                                                                       // 3506
 *   Highlight this box                                                                                                // 3507
 * </div>                                                                                                              // 3508
 * <button ng-click="onOff=!onOff">Toggle</button>                                                                     // 3509
 *                                                                                                                     // 3510
 * <style>                                                                                                             // 3511
 * .highlight {                                                                                                        // 3512
 *   transition:0.5s linear all;                                                                                       // 3513
 * }                                                                                                                   // 3514
 * .highlight.on-add {                                                                                                 // 3515
 *   background:white;                                                                                                 // 3516
 * }                                                                                                                   // 3517
 * .highlight.on {                                                                                                     // 3518
 *   background:yellow;                                                                                                // 3519
 * }                                                                                                                   // 3520
 * .highlight.on-remove {                                                                                              // 3521
 *   background:black;                                                                                                 // 3522
 * }                                                                                                                   // 3523
 * </style>                                                                                                            // 3524
 * ```                                                                                                                 // 3525
 *                                                                                                                     // 3526
 * We can also make use of CSS keyframes by placing them within the CSS classes.                                       // 3527
 *                                                                                                                     // 3528
 *                                                                                                                     // 3529
 * ### CSS Staggering Animations                                                                                       // 3530
 * A Staggering animation is a collection of animations that are issued with a slight delay in between each successive operation resulting in a
 * curtain-like effect. The ngAnimate module (versions >=1.2) supports staggering animations and the stagger effect can be
 * performed by creating a **ng-EVENT-stagger** CSS class and attaching that class to the base CSS class used for      // 3533
 * the animation. The style property expected within the stagger class can either be a **transition-delay** or an      // 3534
 * **animation-delay** property (or both if your animation contains both transitions and keyframe animations).         // 3535
 *                                                                                                                     // 3536
 * ```css                                                                                                              // 3537
 * .my-animation.ng-enter {                                                                                            // 3538
 *   /&#42; standard transition code &#42;/                                                                            // 3539
 *   transition: 1s linear all;                                                                                        // 3540
 *   opacity:0;                                                                                                        // 3541
 * }                                                                                                                   // 3542
 * .my-animation.ng-enter-stagger {                                                                                    // 3543
 *   /&#42; this will have a 100ms delay between each successive leave animation &#42;/                                // 3544
 *   transition-delay: 0.1s;                                                                                           // 3545
 *                                                                                                                     // 3546
 *   /&#42; As of 1.4.4, this must always be set: it signals ngAnimate                                                 // 3547
 *     to not accidentally inherit a delay property from another CSS class &#42;/                                      // 3548
 *   transition-duration: 0s;                                                                                          // 3549
 * }                                                                                                                   // 3550
 * .my-animation.ng-enter.ng-enter-active {                                                                            // 3551
 *   /&#42; standard transition styles &#42;/                                                                          // 3552
 *   opacity:1;                                                                                                        // 3553
 * }                                                                                                                   // 3554
 * ```                                                                                                                 // 3555
 *                                                                                                                     // 3556
 * Staggering animations work by default in ngRepeat (so long as the CSS class is defined). Outside of ngRepeat, to use staggering animations
 * on your own, they can be triggered by firing multiple calls to the same event on $animate. However, the restrictions surrounding this
 * are that each of the elements must have the same CSS className value as well as the same parent element. A stagger operation
 * will also be reset if one or more animation frames have passed since the multiple calls to `$animate` were fired.   // 3560
 *                                                                                                                     // 3561
 * The following code will issue the **ng-leave-stagger** event on the element provided:                               // 3562
 *                                                                                                                     // 3563
 * ```js                                                                                                               // 3564
 * var kids = parent.children();                                                                                       // 3565
 *                                                                                                                     // 3566
 * $animate.leave(kids[0]); //stagger index=0                                                                          // 3567
 * $animate.leave(kids[1]); //stagger index=1                                                                          // 3568
 * $animate.leave(kids[2]); //stagger index=2                                                                          // 3569
 * $animate.leave(kids[3]); //stagger index=3                                                                          // 3570
 * $animate.leave(kids[4]); //stagger index=4                                                                          // 3571
 *                                                                                                                     // 3572
 * window.requestAnimationFrame(function() {                                                                           // 3573
 *   //stagger has reset itself                                                                                        // 3574
 *   $animate.leave(kids[5]); //stagger index=0                                                                        // 3575
 *   $animate.leave(kids[6]); //stagger index=1                                                                        // 3576
 *                                                                                                                     // 3577
 *   $scope.$digest();                                                                                                 // 3578
 * });                                                                                                                 // 3579
 * ```                                                                                                                 // 3580
 *                                                                                                                     // 3581
 * Stagger animations are currently only supported within CSS-defined animations.                                      // 3582
 *                                                                                                                     // 3583
 * ### The `ng-animate` CSS class                                                                                      // 3584
 *                                                                                                                     // 3585
 * When ngAnimate is animating an element it will apply the `ng-animate` CSS class to the element for the duration of the animation.
 * This is a temporary CSS class and it will be removed once the animation is over (for both JavaScript and CSS-based animations).
 *                                                                                                                     // 3588
 * Therefore, animations can be applied to an element using this temporary class directly via CSS.                     // 3589
 *                                                                                                                     // 3590
 * ```css                                                                                                              // 3591
 * .zipper.ng-animate {                                                                                                // 3592
 *   transition:0.5s linear all;                                                                                       // 3593
 * }                                                                                                                   // 3594
 * .zipper.ng-enter {                                                                                                  // 3595
 *   opacity:0;                                                                                                        // 3596
 * }                                                                                                                   // 3597
 * .zipper.ng-enter.ng-enter-active {                                                                                  // 3598
 *   opacity:1;                                                                                                        // 3599
 * }                                                                                                                   // 3600
 * .zipper.ng-leave {                                                                                                  // 3601
 *   opacity:1;                                                                                                        // 3602
 * }                                                                                                                   // 3603
 * .zipper.ng-leave.ng-leave-active {                                                                                  // 3604
 *   opacity:0;                                                                                                        // 3605
 * }                                                                                                                   // 3606
 * ```                                                                                                                 // 3607
 *                                                                                                                     // 3608
 * (Note that the `ng-animate` CSS class is reserved and it cannot be applied on an element directly since ngAnimate will always remove
 * the CSS class once an animation has completed.)                                                                     // 3610
 *                                                                                                                     // 3611
 *                                                                                                                     // 3612
 * ### The `ng-[event]-prepare` class                                                                                  // 3613
 *                                                                                                                     // 3614
 * This is a special class that can be used to prevent unwanted flickering / flash of content before                   // 3615
 * the actual animation starts. The class is added as soon as an animation is initialized, but removed                 // 3616
 * before the actual animation starts (after waiting for a $digest).                                                   // 3617
 * It is also only added for *structural* animations (`enter`, `move`, and `leave`).                                   // 3618
 *                                                                                                                     // 3619
 * In practice, flickering can appear when nesting elements with structural animations such as `ngIf`                  // 3620
 * into elements that have class-based animations such as `ngClass`.                                                   // 3621
 *                                                                                                                     // 3622
 * ```html                                                                                                             // 3623
 * <div ng-class="{red: myProp}">                                                                                      // 3624
 *   <div ng-class="{blue: myProp}">                                                                                   // 3625
 *     <div class="message" ng-if="myProp"></div>                                                                      // 3626
 *   </div>                                                                                                            // 3627
 * </div>                                                                                                              // 3628
 * ```                                                                                                                 // 3629
 *                                                                                                                     // 3630
 * It is possible that during the `enter` animation, the `.message` div will be briefly visible before it starts animating.
 * In that case, you can add styles to the CSS that make sure the element stays hidden before the animation starts:    // 3632
 *                                                                                                                     // 3633
 * ```css                                                                                                              // 3634
 * .message.ng-enter-prepare {                                                                                         // 3635
 *   opacity: 0;                                                                                                       // 3636
 * }                                                                                                                   // 3637
 *                                                                                                                     // 3638
 * ```                                                                                                                 // 3639
 *                                                                                                                     // 3640
 * ## JavaScript-based Animations                                                                                      // 3641
 *                                                                                                                     // 3642
 * ngAnimate also allows for animations to be consumed by JavaScript code. The approach is similar to CSS-based animations (where there is a shared
 * CSS class that is referenced in our HTML code) but in addition we need to register the JavaScript animation on the module. By making use of the
 * `module.animation()` module function we can register the animation.                                                 // 3645
 *                                                                                                                     // 3646
 * Let's see an example of a enter/leave animation using `ngRepeat`:                                                   // 3647
 *                                                                                                                     // 3648
 * ```html                                                                                                             // 3649
 * <div ng-repeat="item in items" class="slide">                                                                       // 3650
 *   {{ item }}                                                                                                        // 3651
 * </div>                                                                                                              // 3652
 * ```                                                                                                                 // 3653
 *                                                                                                                     // 3654
 * See the **slide** CSS class? Let's use that class to define an animation that we'll structure in our module code by using `module.animation`:
 *                                                                                                                     // 3656
 * ```js                                                                                                               // 3657
 * myModule.animation('.slide', [function() {                                                                          // 3658
 *   return {                                                                                                          // 3659
 *     // make note that other events (like addClass/removeClass)                                                      // 3660
 *     // have different function input parameters                                                                     // 3661
 *     enter: function(element, doneFn) {                                                                              // 3662
 *       jQuery(element).fadeIn(1000, doneFn);                                                                         // 3663
 *                                                                                                                     // 3664
 *       // remember to call doneFn so that angular                                                                    // 3665
 *       // knows that the animation has concluded                                                                     // 3666
 *     },                                                                                                              // 3667
 *                                                                                                                     // 3668
 *     move: function(element, doneFn) {                                                                               // 3669
 *       jQuery(element).fadeIn(1000, doneFn);                                                                         // 3670
 *     },                                                                                                              // 3671
 *                                                                                                                     // 3672
 *     leave: function(element, doneFn) {                                                                              // 3673
 *       jQuery(element).fadeOut(1000, doneFn);                                                                        // 3674
 *     }                                                                                                               // 3675
 *   }                                                                                                                 // 3676
 * }]);                                                                                                                // 3677
 * ```                                                                                                                 // 3678
 *                                                                                                                     // 3679
 * The nice thing about JS-based animations is that we can inject other services and make use of advanced animation libraries such as
 * greensock.js and velocity.js.                                                                                       // 3681
 *                                                                                                                     // 3682
 * If our animation code class-based (meaning that something like `ngClass`, `ngHide` and `ngShow` triggers it) then we can still define
 * our animations inside of the same registered animation, however, the function input arguments are a bit different:  // 3684
 *                                                                                                                     // 3685
 * ```html                                                                                                             // 3686
 * <div ng-class="color" class="colorful">                                                                             // 3687
 *   this box is moody                                                                                                 // 3688
 * </div>                                                                                                              // 3689
 * <button ng-click="color='red'">Change to red</button>                                                               // 3690
 * <button ng-click="color='blue'">Change to blue</button>                                                             // 3691
 * <button ng-click="color='green'">Change to green</button>                                                           // 3692
 * ```                                                                                                                 // 3693
 *                                                                                                                     // 3694
 * ```js                                                                                                               // 3695
 * myModule.animation('.colorful', [function() {                                                                       // 3696
 *   return {                                                                                                          // 3697
 *     addClass: function(element, className, doneFn) {                                                                // 3698
 *       // do some cool animation and call the doneFn                                                                 // 3699
 *     },                                                                                                              // 3700
 *     removeClass: function(element, className, doneFn) {                                                             // 3701
 *       // do some cool animation and call the doneFn                                                                 // 3702
 *     },                                                                                                              // 3703
 *     setClass: function(element, addedClass, removedClass, doneFn) {                                                 // 3704
 *       // do some cool animation and call the doneFn                                                                 // 3705
 *     }                                                                                                               // 3706
 *   }                                                                                                                 // 3707
 * }]);                                                                                                                // 3708
 * ```                                                                                                                 // 3709
 *                                                                                                                     // 3710
 * ## CSS + JS Animations Together                                                                                     // 3711
 *                                                                                                                     // 3712
 * AngularJS 1.4 and higher has taken steps to make the amalgamation of CSS and JS animations more flexible. However, unlike earlier versions of Angular,
 * defining CSS and JS animations to work off of the same CSS class will not work anymore. Therefore the example below will only result in **JS animations taking
 * charge of the animation**:                                                                                          // 3715
 *                                                                                                                     // 3716
 * ```html                                                                                                             // 3717
 * <div ng-if="bool" class="slide">                                                                                    // 3718
 *   Slide in and out                                                                                                  // 3719
 * </div>                                                                                                              // 3720
 * ```                                                                                                                 // 3721
 *                                                                                                                     // 3722
 * ```js                                                                                                               // 3723
 * myModule.animation('.slide', [function() {                                                                          // 3724
 *   return {                                                                                                          // 3725
 *     enter: function(element, doneFn) {                                                                              // 3726
 *       jQuery(element).slideIn(1000, doneFn);                                                                        // 3727
 *     }                                                                                                               // 3728
 *   }                                                                                                                 // 3729
 * }]);                                                                                                                // 3730
 * ```                                                                                                                 // 3731
 *                                                                                                                     // 3732
 * ```css                                                                                                              // 3733
 * .slide.ng-enter {                                                                                                   // 3734
 *   transition:0.5s linear all;                                                                                       // 3735
 *   transform:translateY(-100px);                                                                                     // 3736
 * }                                                                                                                   // 3737
 * .slide.ng-enter.ng-enter-active {                                                                                   // 3738
 *   transform:translateY(0);                                                                                          // 3739
 * }                                                                                                                   // 3740
 * ```                                                                                                                 // 3741
 *                                                                                                                     // 3742
 * Does this mean that CSS and JS animations cannot be used together? Do JS-based animations always have higher priority? We can make up for the
 * lack of CSS animations by using the `$animateCss` service to trigger our own tweaked-out, CSS-based animations directly from
 * our own JS-based animation code:                                                                                    // 3745
 *                                                                                                                     // 3746
 * ```js                                                                                                               // 3747
 * myModule.animation('.slide', ['$animateCss', function($animateCss) {                                                // 3748
 *   return {                                                                                                          // 3749
 *     enter: function(element) {                                                                                      // 3750
*        // this will trigger `.slide.ng-enter` and `.slide.ng-enter-active`.                                          // 3751
 *       return $animateCss(element, {                                                                                 // 3752
 *         event: 'enter',                                                                                             // 3753
 *         structural: true                                                                                            // 3754
 *       });                                                                                                           // 3755
 *     }                                                                                                               // 3756
 *   }                                                                                                                 // 3757
 * }]);                                                                                                                // 3758
 * ```                                                                                                                 // 3759
 *                                                                                                                     // 3760
 * The nice thing here is that we can save bandwidth by sticking to our CSS-based animation code and we don't need to rely on a 3rd-party animation framework.
 *                                                                                                                     // 3762
 * The `$animateCss` service is very powerful since we can feed in all kinds of extra properties that will be evaluated and fed into a CSS transition or
 * keyframe animation. For example if we wanted to animate the height of an element while adding and removing classes then we can do so by providing that
 * data into `$animateCss` directly:                                                                                   // 3765
 *                                                                                                                     // 3766
 * ```js                                                                                                               // 3767
 * myModule.animation('.slide', ['$animateCss', function($animateCss) {                                                // 3768
 *   return {                                                                                                          // 3769
 *     enter: function(element) {                                                                                      // 3770
 *       return $animateCss(element, {                                                                                 // 3771
 *         event: 'enter',                                                                                             // 3772
 *         structural: true,                                                                                           // 3773
 *         addClass: 'maroon-setting',                                                                                 // 3774
 *         from: { height:0 },                                                                                         // 3775
 *         to: { height: 200 }                                                                                         // 3776
 *       });                                                                                                           // 3777
 *     }                                                                                                               // 3778
 *   }                                                                                                                 // 3779
 * }]);                                                                                                                // 3780
 * ```                                                                                                                 // 3781
 *                                                                                                                     // 3782
 * Now we can fill in the rest via our transition CSS code:                                                            // 3783
 *                                                                                                                     // 3784
 * ```css                                                                                                              // 3785
 * /&#42; the transition tells ngAnimate to make the animation happen &#42;/                                           // 3786
 * .slide.ng-enter { transition:0.5s linear all; }                                                                     // 3787
 *                                                                                                                     // 3788
 * /&#42; this extra CSS class will be absorbed into the transition                                                    // 3789
 * since the $animateCss code is adding the class &#42;/                                                               // 3790
 * .maroon-setting { background:red; }                                                                                 // 3791
 * ```                                                                                                                 // 3792
 *                                                                                                                     // 3793
 * And `$animateCss` will figure out the rest. Just make sure to have the `done()` callback fire the `doneFn` function to signal when the animation is over.
 *                                                                                                                     // 3795
 * To learn more about what's possible be sure to visit the {@link ngAnimate.$animateCss $animateCss service}.         // 3796
 *                                                                                                                     // 3797
 * ## Animation Anchoring (via `ng-animate-ref`)                                                                       // 3798
 *                                                                                                                     // 3799
 * ngAnimate in AngularJS 1.4 comes packed with the ability to cross-animate elements between                          // 3800
 * structural areas of an application (like views) by pairing up elements using an attribute                           // 3801
 * called `ng-animate-ref`.                                                                                            // 3802
 *                                                                                                                     // 3803
 * Let's say for example we have two views that are managed by `ng-view` and we want to show                           // 3804
 * that there is a relationship between two components situated in within these views. By using the                    // 3805
 * `ng-animate-ref` attribute we can identify that the two components are paired together and we                       // 3806
 * can then attach an animation, which is triggered when the view changes.                                             // 3807
 *                                                                                                                     // 3808
 * Say for example we have the following template code:                                                                // 3809
 *                                                                                                                     // 3810
 * ```html                                                                                                             // 3811
 * <!-- index.html -->                                                                                                 // 3812
 * <div ng-view class="view-animation">                                                                                // 3813
 * </div>                                                                                                              // 3814
 *                                                                                                                     // 3815
 * <!-- home.html -->                                                                                                  // 3816
 * <a href="#/banner-page">                                                                                            // 3817
 *   <img src="./banner.jpg" class="banner" ng-animate-ref="banner">                                                   // 3818
 * </a>                                                                                                                // 3819
 *                                                                                                                     // 3820
 * <!-- banner-page.html -->                                                                                           // 3821
 * <img src="./banner.jpg" class="banner" ng-animate-ref="banner">                                                     // 3822
 * ```                                                                                                                 // 3823
 *                                                                                                                     // 3824
 * Now, when the view changes (once the link is clicked), ngAnimate will examine the                                   // 3825
 * HTML contents to see if there is a match reference between any components in the view                               // 3826
 * that is leaving and the view that is entering. It will scan both the view which is being                            // 3827
 * removed (leave) and inserted (enter) to see if there are any paired DOM elements that                               // 3828
 * contain a matching ref value.                                                                                       // 3829
 *                                                                                                                     // 3830
 * The two images match since they share the same ref value. ngAnimate will now create a                               // 3831
 * transport element (which is a clone of the first image element) and it will then attempt                            // 3832
 * to animate to the position of the second image element in the next view. For the animation to                       // 3833
 * work a special CSS class called `ng-anchor` will be added to the transported element.                               // 3834
 *                                                                                                                     // 3835
 * We can now attach a transition onto the `.banner.ng-anchor` CSS class and then                                      // 3836
 * ngAnimate will handle the entire transition for us as well as the addition and removal of                           // 3837
 * any changes of CSS classes between the elements:                                                                    // 3838
 *                                                                                                                     // 3839
 * ```css                                                                                                              // 3840
 * .banner.ng-anchor {                                                                                                 // 3841
 *   /&#42; this animation will last for 1 second since there are                                                      // 3842
 *          two phases to the animation (an `in` and an `out` phase) &#42;/                                            // 3843
 *   transition:0.5s linear all;                                                                                       // 3844
 * }                                                                                                                   // 3845
 * ```                                                                                                                 // 3846
 *                                                                                                                     // 3847
 * We also **must** include animations for the views that are being entered and removed                                // 3848
 * (otherwise anchoring wouldn't be possible since the new view would be inserted right away).                         // 3849
 *                                                                                                                     // 3850
 * ```css                                                                                                              // 3851
 * .view-animation.ng-enter, .view-animation.ng-leave {                                                                // 3852
 *   transition:0.5s linear all;                                                                                       // 3853
 *   position:fixed;                                                                                                   // 3854
 *   left:0;                                                                                                           // 3855
 *   top:0;                                                                                                            // 3856
 *   width:100%;                                                                                                       // 3857
 * }                                                                                                                   // 3858
 * .view-animation.ng-enter {                                                                                          // 3859
 *   transform:translateX(100%);                                                                                       // 3860
 * }                                                                                                                   // 3861
 * .view-animation.ng-leave,                                                                                           // 3862
 * .view-animation.ng-enter.ng-enter-active {                                                                          // 3863
 *   transform:translateX(0%);                                                                                         // 3864
 * }                                                                                                                   // 3865
 * .view-animation.ng-leave.ng-leave-active {                                                                          // 3866
 *   transform:translateX(-100%);                                                                                      // 3867
 * }                                                                                                                   // 3868
 * ```                                                                                                                 // 3869
 *                                                                                                                     // 3870
 * Now we can jump back to the anchor animation. When the animation happens, there are two stages that occur:          // 3871
 * an `out` and an `in` stage. The `out` stage happens first and that is when the element is animated away             // 3872
 * from its origin. Once that animation is over then the `in` stage occurs which animates the                          // 3873
 * element to its destination. The reason why there are two animations is to give enough time                          // 3874
 * for the enter animation on the new element to be ready.                                                             // 3875
 *                                                                                                                     // 3876
 * The example above sets up a transition for both the in and out phases, but we can also target the out or            // 3877
 * in phases directly via `ng-anchor-out` and `ng-anchor-in`.                                                          // 3878
 *                                                                                                                     // 3879
 * ```css                                                                                                              // 3880
 * .banner.ng-anchor-out {                                                                                             // 3881
 *   transition: 0.5s linear all;                                                                                      // 3882
 *                                                                                                                     // 3883
 *   /&#42; the scale will be applied during the out animation,                                                        // 3884
 *          but will be animated away when the in animation runs &#42;/                                                // 3885
 *   transform: scale(1.2);                                                                                            // 3886
 * }                                                                                                                   // 3887
 *                                                                                                                     // 3888
 * .banner.ng-anchor-in {                                                                                              // 3889
 *   transition: 1s linear all;                                                                                        // 3890
 * }                                                                                                                   // 3891
 * ```                                                                                                                 // 3892
 *                                                                                                                     // 3893
 *                                                                                                                     // 3894
 *                                                                                                                     // 3895
 *                                                                                                                     // 3896
 * ### Anchoring Demo                                                                                                  // 3897
 *                                                                                                                     // 3898
  <example module="anchoringExample"                                                                                   // 3899
           name="anchoringExample"                                                                                     // 3900
           id="anchoringExample"                                                                                       // 3901
           deps="angular-animate.js;angular-route.js"                                                                  // 3902
           animations="true">                                                                                          // 3903
    <file name="index.html">                                                                                           // 3904
      <a href="#/">Home</a>                                                                                            // 3905
      <hr />                                                                                                           // 3906
      <div class="view-container">                                                                                     // 3907
        <div ng-view class="view"></div>                                                                               // 3908
      </div>                                                                                                           // 3909
    </file>                                                                                                            // 3910
    <file name="script.js">                                                                                            // 3911
      angular.module('anchoringExample', ['ngAnimate', 'ngRoute'])                                                     // 3912
        .config(['$routeProvider', function($routeProvider) {                                                          // 3913
          $routeProvider.when('/', {                                                                                   // 3914
            templateUrl: 'home.html',                                                                                  // 3915
            controller: 'HomeController as home'                                                                       // 3916
          });                                                                                                          // 3917
          $routeProvider.when('/profile/:id', {                                                                        // 3918
            templateUrl: 'profile.html',                                                                               // 3919
            controller: 'ProfileController as profile'                                                                 // 3920
          });                                                                                                          // 3921
        }])                                                                                                            // 3922
        .run(['$rootScope', function($rootScope) {                                                                     // 3923
          $rootScope.records = [                                                                                       // 3924
            { id:1, title: "Miss Beulah Roob" },                                                                       // 3925
            { id:2, title: "Trent Morissette" },                                                                       // 3926
            { id:3, title: "Miss Ava Pouros" },                                                                        // 3927
            { id:4, title: "Rod Pouros" },                                                                             // 3928
            { id:5, title: "Abdul Rice" },                                                                             // 3929
            { id:6, title: "Laurie Rutherford Sr." },                                                                  // 3930
            { id:7, title: "Nakia McLaughlin" },                                                                       // 3931
            { id:8, title: "Jordon Blanda DVM" },                                                                      // 3932
            { id:9, title: "Rhoda Hand" },                                                                             // 3933
            { id:10, title: "Alexandrea Sauer" }                                                                       // 3934
          ];                                                                                                           // 3935
        }])                                                                                                            // 3936
        .controller('HomeController', [function() {                                                                    // 3937
          //empty                                                                                                      // 3938
        }])                                                                                                            // 3939
        .controller('ProfileController', ['$rootScope', '$routeParams', function($rootScope, $routeParams) {           // 3940
          var index = parseInt($routeParams.id, 10);                                                                   // 3941
          var record = $rootScope.records[index - 1];                                                                  // 3942
                                                                                                                       // 3943
          this.title = record.title;                                                                                   // 3944
          this.id = record.id;                                                                                         // 3945
        }]);                                                                                                           // 3946
    </file>                                                                                                            // 3947
    <file name="home.html">                                                                                            // 3948
      <h2>Welcome to the home page</h1>                                                                                // 3949
      <p>Please click on an element</p>                                                                                // 3950
      <a class="record"                                                                                                // 3951
         ng-href="#/profile/{{ record.id }}"                                                                           // 3952
         ng-animate-ref="{{ record.id }}"                                                                              // 3953
         ng-repeat="record in records">                                                                                // 3954
        {{ record.title }}                                                                                             // 3955
      </a>                                                                                                             // 3956
    </file>                                                                                                            // 3957
    <file name="profile.html">                                                                                         // 3958
      <div class="profile record" ng-animate-ref="{{ profile.id }}">                                                   // 3959
        {{ profile.title }}                                                                                            // 3960
      </div>                                                                                                           // 3961
    </file>                                                                                                            // 3962
    <file name="animations.css">                                                                                       // 3963
      .record {                                                                                                        // 3964
        display:block;                                                                                                 // 3965
        font-size:20px;                                                                                                // 3966
      }                                                                                                                // 3967
      .profile {                                                                                                       // 3968
        background:black;                                                                                              // 3969
        color:white;                                                                                                   // 3970
        font-size:100px;                                                                                               // 3971
      }                                                                                                                // 3972
      .view-container {                                                                                                // 3973
        position:relative;                                                                                             // 3974
      }                                                                                                                // 3975
      .view-container > .view.ng-animate {                                                                             // 3976
        position:absolute;                                                                                             // 3977
        top:0;                                                                                                         // 3978
        left:0;                                                                                                        // 3979
        width:100%;                                                                                                    // 3980
        min-height:500px;                                                                                              // 3981
      }                                                                                                                // 3982
      .view.ng-enter, .view.ng-leave,                                                                                  // 3983
      .record.ng-anchor {                                                                                              // 3984
        transition:0.5s linear all;                                                                                    // 3985
      }                                                                                                                // 3986
      .view.ng-enter {                                                                                                 // 3987
        transform:translateX(100%);                                                                                    // 3988
      }                                                                                                                // 3989
      .view.ng-enter.ng-enter-active, .view.ng-leave {                                                                 // 3990
        transform:translateX(0%);                                                                                      // 3991
      }                                                                                                                // 3992
      .view.ng-leave.ng-leave-active {                                                                                 // 3993
        transform:translateX(-100%);                                                                                   // 3994
      }                                                                                                                // 3995
      .record.ng-anchor-out {                                                                                          // 3996
        background:red;                                                                                                // 3997
      }                                                                                                                // 3998
    </file>                                                                                                            // 3999
  </example>                                                                                                           // 4000
 *                                                                                                                     // 4001
 * ### How is the element transported?                                                                                 // 4002
 *                                                                                                                     // 4003
 * When an anchor animation occurs, ngAnimate will clone the starting element and position it exactly where the starting
 * element is located on screen via absolute positioning. The cloned element will be placed inside of the root element
 * of the application (where ng-app was defined) and all of the CSS classes of the starting element will be applied. The
 * element will then animate into the `out` and `in` animations and will eventually reach the coordinates and match    // 4007
 * the dimensions of the destination element. During the entire animation a CSS class of `.ng-animate-shim` will be applied
 * to both the starting and destination elements in order to hide them from being visible (the CSS styling for the class
 * is: `visibility:hidden`). Once the anchor reaches its destination then it will be removed and the destination element
 * will become visible since the shim class will be removed.                                                           // 4011
 *                                                                                                                     // 4012
 * ### How is the morphing handled?                                                                                    // 4013
 *                                                                                                                     // 4014
 * CSS Anchoring relies on transitions and keyframes and the internal code is intelligent enough to figure out         // 4015
 * what CSS classes differ between the starting element and the destination element. These different CSS classes       // 4016
 * will be added/removed on the anchor element and a transition will be applied (the transition that is provided       // 4017
 * in the anchor class). Long story short, ngAnimate will figure out what classes to add and remove which will         // 4018
 * make the transition of the element as smooth and automatic as possible. Be sure to use simple CSS classes that      // 4019
 * do not rely on DOM nesting structure so that the anchor element appears the same as the starting element (since     // 4020
 * the cloned element is placed inside of root element which is likely close to the body element).                     // 4021
 *                                                                                                                     // 4022
 * Note that if the root element is on the `<html>` element then the cloned node will be placed inside of body.        // 4023
 *                                                                                                                     // 4024
 *                                                                                                                     // 4025
 * ## Using $animate in your directive code                                                                            // 4026
 *                                                                                                                     // 4027
 * So far we've explored how to feed in animations into an Angular application, but how do we trigger animations within our own directives in our application?
 * By injecting the `$animate` service into our directive code, we can trigger structural and class-based hooks which can then be consumed by animations. Let's
 * imagine we have a greeting box that shows and hides itself when the data changes                                    // 4030
 *                                                                                                                     // 4031
 * ```html                                                                                                             // 4032
 * <greeting-box active="onOrOff">Hi there</greeting-box>                                                              // 4033
 * ```                                                                                                                 // 4034
 *                                                                                                                     // 4035
 * ```js                                                                                                               // 4036
 * ngModule.directive('greetingBox', ['$animate', function($animate) {                                                 // 4037
 *   return function(scope, element, attrs) {                                                                          // 4038
 *     attrs.$observe('active', function(value) {                                                                      // 4039
 *       value ? $animate.addClass(element, 'on') : $animate.removeClass(element, 'on');                               // 4040
 *     });                                                                                                             // 4041
 *   });                                                                                                               // 4042
 * }]);                                                                                                                // 4043
 * ```                                                                                                                 // 4044
 *                                                                                                                     // 4045
 * Now the `on` CSS class is added and removed on the greeting box component. Now if we add a CSS class on top of the greeting box element
 * in our HTML code then we can trigger a CSS or JS animation to happen.                                               // 4047
 *                                                                                                                     // 4048
 * ```css                                                                                                              // 4049
 * /&#42; normally we would create a CSS class to reference on the element &#42;/                                      // 4050
 * greeting-box.on { transition:0.5s linear all; background:green; color:white; }                                      // 4051
 * ```                                                                                                                 // 4052
 *                                                                                                                     // 4053
 * The `$animate` service contains a variety of other methods like `enter`, `leave`, `animate` and `setClass`. To learn more about what's
 * possible be sure to visit the {@link ng.$animate $animate service API page}.                                        // 4055
 *                                                                                                                     // 4056
 *                                                                                                                     // 4057
 * ## Callbacks and Promises                                                                                           // 4058
 *                                                                                                                     // 4059
 * When `$animate` is called it returns a promise that can be used to capture when the animation has ended. Therefore if we were to trigger
 * an animation (within our directive code) then we can continue performing directive and scope related activities after the animation has
 * ended by chaining onto the returned promise that animation method returns.                                          // 4062
 *                                                                                                                     // 4063
 * ```js                                                                                                               // 4064
 * // somewhere within the depths of the directive                                                                     // 4065
 * $animate.enter(element, parent).then(function() {                                                                   // 4066
 *   //the animation has completed                                                                                     // 4067
 * });                                                                                                                 // 4068
 * ```                                                                                                                 // 4069
 *                                                                                                                     // 4070
 * (Note that earlier versions of Angular prior to v1.4 required the promise code to be wrapped using `$scope.$apply(...)`. This is not the case
 * anymore.)                                                                                                           // 4072
 *                                                                                                                     // 4073
 * In addition to the animation promise, we can also make use of animation-related callbacks within our directives and controller code by registering
 * an event listener using the `$animate` service. Let's say for example that an animation was triggered on our view   // 4075
 * routing controller to hook into that:                                                                               // 4076
 *                                                                                                                     // 4077
 * ```js                                                                                                               // 4078
 * ngModule.controller('HomePageController', ['$animate', function($animate) {                                         // 4079
 *   $animate.on('enter', ngViewElement, function(element) {                                                           // 4080
 *     // the animation for this route has completed                                                                   // 4081
 *   }]);                                                                                                              // 4082
 * }])                                                                                                                 // 4083
 * ```                                                                                                                 // 4084
 *                                                                                                                     // 4085
 * (Note that you will need to trigger a digest within the callback to get angular to notice any scope-related changes.)
 */                                                                                                                    // 4087
                                                                                                                       // 4088
/**                                                                                                                    // 4089
 * @ngdoc service                                                                                                      // 4090
 * @name $animate                                                                                                      // 4091
 * @kind object                                                                                                        // 4092
 *                                                                                                                     // 4093
 * @description                                                                                                        // 4094
 * The ngAnimate `$animate` service documentation is the same for the core `$animate` service.                         // 4095
 *                                                                                                                     // 4096
 * Click here {@link ng.$animate to learn more about animations with `$animate`}.                                      // 4097
 */                                                                                                                    // 4098
angular.module('ngAnimate', [])                                                                                        // 4099
  .directive('ngAnimateSwap', ngAnimateSwapDirective)                                                                  // 4100
                                                                                                                       // 4101
  .directive('ngAnimateChildren', $$AnimateChildrenDirective)                                                          // 4102
  .factory('$$rAFScheduler', $$rAFSchedulerFactory)                                                                    // 4103
                                                                                                                       // 4104
  .provider('$$animateQueue', $$AnimateQueueProvider)                                                                  // 4105
  .provider('$$animation', $$AnimationProvider)                                                                        // 4106
                                                                                                                       // 4107
  .provider('$animateCss', $AnimateCssProvider)                                                                        // 4108
  .provider('$$animateCssDriver', $$AnimateCssDriverProvider)                                                          // 4109
                                                                                                                       // 4110
  .provider('$$animateJs', $$AnimateJsProvider)                                                                        // 4111
  .provider('$$animateJsDriver', $$AnimateJsDriverProvider);                                                           // 4112
                                                                                                                       // 4113
                                                                                                                       // 4114
})(window, window.angular);                                                                                            // 4115
                                                                                                                       // 4116
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['angular:angular-animate'] = {};

})();
