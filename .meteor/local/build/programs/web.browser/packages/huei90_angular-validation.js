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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/huei90_angular-validation/dist/angular-validation.js                                                     //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
(function() {                                                                                                        // 1
    angular.module('validation', ['validation.provider', 'validation.directive']);                                   // 2
}).call(this);                                                                                                       // 3
                                                                                                                     // 4
(function() {                                                                                                        // 5
    angular.module('validation.provider', [])                                                                        // 6
        .provider('$validation', function() {                                                                        // 7
                                                                                                                     // 8
                                                                                                                     // 9
            var $injector,                                                                                           // 10
                $scope,                                                                                              // 11
                $http,                                                                                               // 12
                $q,                                                                                                  // 13
                $timeout,                                                                                            // 14
                _this = this;                                                                                        // 15
                                                                                                                     // 16
                                                                                                                     // 17
            /**                                                                                                      // 18
             * Setup the provider                                                                                    // 19
             * @param injector                                                                                       // 20
             */                                                                                                      // 21
            var setup = function(injector) {                                                                         // 22
                $injector = injector;                                                                                // 23
                $scope = $injector.get('$rootScope');                                                                // 24
                $http = $injector.get('$http');                                                                      // 25
                $q = $injector.get('$q');                                                                            // 26
                $timeout = $injector.get('$timeout');                                                                // 27
            };                                                                                                       // 28
                                                                                                                     // 29
                                                                                                                     // 30
            /**                                                                                                      // 31
             * Define validation type RegExp                                                                         // 32
             * @type {{}}                                                                                            // 33
             */                                                                                                      // 34
            var expression = {};                                                                                     // 35
                                                                                                                     // 36
                                                                                                                     // 37
            /**                                                                                                      // 38
             * default error, success message                                                                        // 39
             * @type {{}}                                                                                            // 40
             */                                                                                                      // 41
            var defaultMsg = {};                                                                                     // 42
                                                                                                                     // 43
                                                                                                                     // 44
            /**                                                                                                      // 45
             * Allow user to set a custom Expression, do remember set the default message using setDefaultMsg        // 46
             * @param obj                                                                                            // 47
             * @returns {*}                                                                                          // 48
             */                                                                                                      // 49
            this.setExpression = function(obj) {                                                                     // 50
                angular.extend(expression, obj);                                                                     // 51
                return _this;                                                                                        // 52
            };                                                                                                       // 53
                                                                                                                     // 54
                                                                                                                     // 55
            /**                                                                                                      // 56
             * Get the Expression                                                                                    // 57
             * @param exprs                                                                                          // 58
             * @returns {*}                                                                                          // 59
             */                                                                                                      // 60
            this.getExpression = function(exprs) {                                                                   // 61
                return expression[exprs];                                                                            // 62
            };                                                                                                       // 63
                                                                                                                     // 64
                                                                                                                     // 65
            /**                                                                                                      // 66
             * Allow user to set default message                                                                     // 67
             * @param obj                                                                                            // 68
             * @returns {*}                                                                                          // 69
             */                                                                                                      // 70
            this.setDefaultMsg = function(obj) {                                                                     // 71
                angular.extend(defaultMsg, obj);                                                                     // 72
                return _this;                                                                                        // 73
            };                                                                                                       // 74
                                                                                                                     // 75
                                                                                                                     // 76
            /**                                                                                                      // 77
             * Get the Default Message                                                                               // 78
             * @param msg                                                                                            // 79
             * @returns {*}                                                                                          // 80
             */                                                                                                      // 81
            this.getDefaultMsg = function(msg) {                                                                     // 82
                return defaultMsg[msg];                                                                              // 83
            };                                                                                                       // 84
                                                                                                                     // 85
                                                                                                                     // 86
            /**                                                                                                      // 87
             * Override the errorHTML function                                                                       // 88
             * @param func                                                                                           // 89
             * @returns {*}                                                                                          // 90
             */                                                                                                      // 91
            this.setErrorHTML = function(func) {                                                                     // 92
                if (func.constructor !== Function) {                                                                 // 93
                    return;                                                                                          // 94
                }                                                                                                    // 95
                                                                                                                     // 96
                _this.getErrorHTML = func;                                                                           // 97
                                                                                                                     // 98
                return _this;                                                                                        // 99
            };                                                                                                       // 100
                                                                                                                     // 101
                                                                                                                     // 102
            /**                                                                                                      // 103
             * Invalid message HTML, here's the default                                                              // 104
             * @param message                                                                                        // 105
             * @returns {string}                                                                                     // 106
             */                                                                                                      // 107
            this.getErrorHTML = function(message) {                                                                  // 108
                return '<p class="validation-invalid">' + message + '</p>';                                          // 109
            };                                                                                                       // 110
                                                                                                                     // 111
                                                                                                                     // 112
            /**                                                                                                      // 113
             * Override the successHTML function                                                                     // 114
             * @param func                                                                                           // 115
             * @returns {*}                                                                                          // 116
             */                                                                                                      // 117
            this.setSuccessHTML = function(func) {                                                                   // 118
                if (func.constructor !== Function) {                                                                 // 119
                    return;                                                                                          // 120
                }                                                                                                    // 121
                                                                                                                     // 122
                _this.getSuccessHTML = func;                                                                         // 123
                                                                                                                     // 124
                return _this;                                                                                        // 125
            };                                                                                                       // 126
                                                                                                                     // 127
                                                                                                                     // 128
            /**                                                                                                      // 129
             * Valid message HTML, here's the default                                                                // 130
             * @param message                                                                                        // 131
             * @returns {string}                                                                                     // 132
             */                                                                                                      // 133
            this.getSuccessHTML = function(message) {                                                                // 134
                return '<p class="validation-valid">' + message + '</p>';                                            // 135
            };                                                                                                       // 136
                                                                                                                     // 137
                                                                                                                     // 138
            /**                                                                                                      // 139
             * Whether show the validation success message                                                           // 140
             * You can easily change this to false in your config                                                    // 141
             * example: $validationProvider.showSuccessMessage = false;                                              // 142
             * @type {boolean}                                                                                       // 143
             */                                                                                                      // 144
            this.showSuccessMessage = true;                                                                          // 145
                                                                                                                     // 146
                                                                                                                     // 147
            /**                                                                                                      // 148
             * Whether show the validation error message                                                             // 149
             * You can easily change this to false in your config                                                    // 150
             * example: $validationProvider.showErrorMessage = false;                                                // 151
             * @type {boolean}                                                                                       // 152
             */                                                                                                      // 153
            this.showErrorMessage = true;                                                                            // 154
                                                                                                                     // 155
            /**                                                                                                      // 156
             * Check form valid, return true                                                                         // 157
             * checkValid(Form): Check the specific form(Form) valid from angular `$valid`                           // 158
             * @param form                                                                                           // 159
             * @returns {boolean}                                                                                    // 160
             */                                                                                                      // 161
            this.checkValid = function(form) {                                                                       // 162
                if (form.$valid === undefined) {                                                                     // 163
                    return false;                                                                                    // 164
                }                                                                                                    // 165
                return (form && form.$valid === true);                                                               // 166
            };                                                                                                       // 167
                                                                                                                     // 168
                                                                                                                     // 169
            /**                                                                                                      // 170
             * Validate the form when click submit, when `validMethod = submit`                                      // 171
             * @param form                                                                                           // 172
             * @returns {promise|*}                                                                                  // 173
             */                                                                                                      // 174
            this.validate = function(form) {                                                                         // 175
                                                                                                                     // 176
                var deferred = $q.defer(),                                                                           // 177
                    idx = 0;                                                                                         // 178
                                                                                                                     // 179
                if (form === undefined) {                                                                            // 180
                    console.error('This is not a regular Form name scope');                                          // 181
                    deferred.reject('This is not a regular Form name scope');                                        // 182
                    return deferred.promise;                                                                         // 183
                }                                                                                                    // 184
                                                                                                                     // 185
                if (form.validationId) { // single                                                                   // 186
                    $scope.$broadcast(form.$name + 'submit-' + form.validationId, idx++);                            // 187
                } else if (form.constructor === Array) { // multiple                                                 // 188
                    for (var k in form) {                                                                            // 189
                        $scope.$broadcast(form[k].$name + 'submit-' + form[k].validationId, idx++);                  // 190
                    }                                                                                                // 191
                } else {                                                                                             // 192
                    for (var i in form) { // whole scope                                                             // 193
                        if (i[0] !== '$' && form[i].hasOwnProperty('$dirty')) {                                      // 194
                            $scope.$broadcast(i + 'submit-' + form[i].validationId, idx++);                          // 195
                        }                                                                                            // 196
                    }                                                                                                // 197
                }                                                                                                    // 198
                                                                                                                     // 199
                deferred.promise.success = function(fn) {                                                            // 200
                    deferred.promise.then(function(value) {                                                          // 201
                        fn(value);                                                                                   // 202
                    });                                                                                              // 203
                    return deferred.promise;                                                                         // 204
                };                                                                                                   // 205
                                                                                                                     // 206
                deferred.promise.error = function(fn) {                                                              // 207
                    deferred.promise.then(null, function(value) {                                                    // 208
                        fn(value);                                                                                   // 209
                    });                                                                                              // 210
                    return deferred.promise;                                                                         // 211
                };                                                                                                   // 212
                                                                                                                     // 213
                $timeout(function() {                                                                                // 214
                    if (_this.checkValid(form)) {                                                                    // 215
                        deferred.resolve('success');                                                                 // 216
                    } else {                                                                                         // 217
                        deferred.reject('error');                                                                    // 218
                    }                                                                                                // 219
                });                                                                                                  // 220
                                                                                                                     // 221
                return deferred.promise;                                                                             // 222
            };                                                                                                       // 223
                                                                                                                     // 224
            /**                                                                                                      // 225
             * Do this function if validation valid                                                                  // 226
             * @param element                                                                                        // 227
             */                                                                                                      // 228
            this.validCallback = null;                                                                               // 229
                                                                                                                     // 230
            /**                                                                                                      // 231
             * Do this function if validation invalid                                                                // 232
             * @param element                                                                                        // 233
             */                                                                                                      // 234
            this.invalidCallback = null;                                                                             // 235
                                                                                                                     // 236
            /**                                                                                                      // 237
             * reset the specific form                                                                               // 238
             * @param form                                                                                           // 239
             */                                                                                                      // 240
            this.reset = function(form) {                                                                            // 241
                if (form === undefined) {                                                                            // 242
                    console.error('This is not a regular Form name scope');                                          // 243
                    return;                                                                                          // 244
                }                                                                                                    // 245
                                                                                                                     // 246
                if (form.validationId) {                                                                             // 247
                    $scope.$broadcast(form.$name + 'reset-' + form.validationId);                                    // 248
                } else if (form.constructor === Array) {                                                             // 249
                    for (var k in form) {                                                                            // 250
                        $scope.$broadcast(form[k].$name + 'reset-' + form[k].validationId);                          // 251
                    }                                                                                                // 252
                } else {                                                                                             // 253
                    for (var i in form) {                                                                            // 254
                        if (i[0] !== '$' && form[i].hasOwnProperty('$dirty')) {                                      // 255
                            $scope.$broadcast(i + 'reset-' + form[i].validationId);                                  // 256
                        }                                                                                            // 257
                    }                                                                                                // 258
                }                                                                                                    // 259
            };                                                                                                       // 260
                                                                                                                     // 261
                                                                                                                     // 262
            /**                                                                                                      // 263
             * $get                                                                                                  // 264
             * @returns {{setErrorHTML: *, getErrorHTML: Function, setSuccessHTML: *, getSuccessHTML: Function, setExpression: *, getExpression: Function, setDefaultMsg: *, getDefaultMsg: Function, checkValid: Function, validate: Function, reset: Function}}
             */                                                                                                      // 266
            this.$get = ['$injector',                                                                                // 267
                function($injector) {                                                                                // 268
                    setup($injector);                                                                                // 269
                    return {                                                                                         // 270
                        setErrorHTML: this.setErrorHTML,                                                             // 271
                        getErrorHTML: this.getErrorHTML,                                                             // 272
                        setSuccessHTML: this.setSuccessHTML,                                                         // 273
                        getSuccessHTML: this.getSuccessHTML,                                                         // 274
                        setExpression: this.setExpression,                                                           // 275
                        getExpression: this.getExpression,                                                           // 276
                        setDefaultMsg: this.setDefaultMsg,                                                           // 277
                        getDefaultMsg: this.getDefaultMsg,                                                           // 278
                        showSuccessMessage: this.showSuccessMessage,                                                 // 279
                        showErrorMessage: this.showErrorMessage,                                                     // 280
                        checkValid: this.checkValid,                                                                 // 281
                        validate: this.validate,                                                                     // 282
                        validCallback: this.validCallback,                                                           // 283
                        invalidCallback: this.invalidCallback,                                                       // 284
                        reset: this.reset                                                                            // 285
                    };                                                                                               // 286
                }                                                                                                    // 287
            ];                                                                                                       // 288
                                                                                                                     // 289
        });                                                                                                          // 290
}).call(this);                                                                                                       // 291
                                                                                                                     // 292
(function() {                                                                                                        // 293
    angular.module('validation.directive', ['validation.provider'])                                                  // 294
        .directive('validator', ['$injector',                                                                        // 295
            function($injector) {                                                                                    // 296
                                                                                                                     // 297
                var $validationProvider = $injector.get('$validation'),                                              // 298
                    $q = $injector.get('$q'),                                                                        // 299
                    $timeout = $injector.get('$timeout');                                                            // 300
                                                                                                                     // 301
                /**                                                                                                  // 302
                 * Do this function if validation valid                                                              // 303
                 * @param element                                                                                    // 304
                 * @param validMessage                                                                               // 305
                 * @param validation                                                                                 // 306
                 * @param callback                                                                                   // 307
                 * @param ctrl                                                                                       // 308
                 * @returns {}                                                                                       // 309
                 */                                                                                                  // 310
                var validFunc = function(element, validMessage, validation, scope, ctrl) {                           // 311
                    var messageElem,                                                                                 // 312
                        messageToShow = validMessage || $validationProvider.getDefaultMsg(validation).success;       // 313
                                                                                                                     // 314
                    if (scope.messageId)                                                                             // 315
                        messageElem = angular.element(document.querySelector('#' + scope.messageId));                // 316
                    else                                                                                             // 317
                        messageElem = element.next();                                                                // 318
                                                                                                                     // 319
                    if ($validationProvider.showSuccessMessage && messageToShow) {                                   // 320
                        messageElem.html($validationProvider.getSuccessHTML(messageToShow));                         // 321
                    }                                                                                                // 322
                                                                                                                     // 323
                    ctrl.$setValidity(ctrl.$name, true);                                                             // 324
                    if (scope.validCallback) scope.validCallback({                                                   // 325
                        message: messageToShow                                                                       // 326
                    });                                                                                              // 327
                    if ($validationProvider.validCallback) $validationProvider.validCallback(element);               // 328
                                                                                                                     // 329
                    return true;                                                                                     // 330
                };                                                                                                   // 331
                                                                                                                     // 332
                                                                                                                     // 333
                /**                                                                                                  // 334
                 * Do this function if validation invalid                                                            // 335
                 * @param element                                                                                    // 336
                 * @param validMessage                                                                               // 337
                 * @param validation                                                                                 // 338
                 * @param callback                                                                                   // 339
                 * @param ctrl                                                                                       // 340
                 * @returns {}                                                                                       // 341
                 */                                                                                                  // 342
                var invalidFunc = function(element, validMessage, validation, scope, ctrl) {                         // 343
                    var messageElem,                                                                                 // 344
                        messageToShow = validMessage || $validationProvider.getDefaultMsg(validation).error;         // 345
                                                                                                                     // 346
                    if (scope.messageId)                                                                             // 347
                        messageElem = angular.element(document.querySelector('#' + scope.messageId));                // 348
                    else                                                                                             // 349
                        messageElem = element.next();                                                                // 350
                                                                                                                     // 351
                    if ($validationProvider.showErrorMessage && messageToShow) {                                     // 352
                        messageElem.html($validationProvider.getErrorHTML(messageToShow));                           // 353
                    }                                                                                                // 354
                                                                                                                     // 355
                    ctrl.$setValidity(ctrl.$name, false);                                                            // 356
                    if (scope.invalidCallback) scope.invalidCallback({                                               // 357
                        message: messageToShow                                                                       // 358
                    });                                                                                              // 359
                    if ($validationProvider.invalidCallback) $validationProvider.invalidCallback(element);           // 360
                                                                                                                     // 361
                    return false;                                                                                    // 362
                };                                                                                                   // 363
                                                                                                                     // 364
                                                                                                                     // 365
                /**                                                                                                  // 366
                 * collect elements for focus                                                                        // 367
                 * @type {Object}                                                                                    // 368
                 ***private variable                                                                                 // 369
                 */                                                                                                  // 370
                var focusElements = {};                                                                              // 371
                                                                                                                     // 372
                                                                                                                     // 373
                /**                                                                                                  // 374
                 * Check Validation with Function or RegExp                                                          // 375
                 * @param scope                                                                                      // 376
                 * @param element                                                                                    // 377
                 * @param attrs                                                                                      // 378
                 * @param ctrl                                                                                       // 379
                 * @param validation                                                                                 // 380
                 * @param value                                                                                      // 381
                 * @returns {}                                                                                       // 382
                 */                                                                                                  // 383
                var checkValidation = function(scope, element, attrs, ctrl, validation, value) {                     // 384
                                                                                                                     // 385
                    var validators = validation.slice(0),                                                            // 386
                        validatorExpr = validators[0].trim(),                                                        // 387
                        paramIndex = validatorExpr.indexOf('='),                                                     // 388
                        validator = paramIndex === -1 ? validatorExpr : validatorExpr.substr(0, paramIndex),         // 389
                        validatorParam = paramIndex === -1 ? null : validatorExpr.substr(paramIndex + 1),            // 390
                        leftValidation = validators.slice(1),                                                        // 391
                        successMessage = validator + 'SuccessMessage',                                               // 392
                        errorMessage = validator + 'ErrorMessage',                                                   // 393
                        expression = $validationProvider.getExpression(validator),                                   // 394
                        valid = {                                                                                    // 395
                            success: function() {                                                                    // 396
                                validFunc(element, attrs[successMessage], validator, scope, ctrl);                   // 397
                                if (leftValidation.length) {                                                         // 398
                                    return checkValidation(scope, element, attrs, ctrl, leftValidation, value);      // 399
                                } else {                                                                             // 400
                                    return true;                                                                     // 401
                                }                                                                                    // 402
                            },                                                                                       // 403
                            error: function() {                                                                      // 404
                                return invalidFunc(element, attrs[errorMessage], validator, scope, ctrl);            // 405
                            }                                                                                        // 406
                        };                                                                                           // 407
                                                                                                                     // 408
                    if (expression === undefined) {                                                                  // 409
                        console.error('You are using undefined validator "%s"', validator);                          // 410
                        if (leftValidation.length) {                                                                 // 411
                            return checkValidation(scope, element, attrs, ctrl, leftValidation, value);              // 412
                        } else {                                                                                     // 413
                            return;                                                                                  // 414
                        }                                                                                            // 415
                    }                                                                                                // 416
                    // Check with Function                                                                           // 417
                    if (expression.constructor === Function) {                                                       // 418
                        return $q.all([$validationProvider.getExpression(validator)(value, scope, element, attrs, validatorParam)])
                            .then(function(data) {                                                                   // 420
                                if (data && data.length > 0 && data[0]) {                                            // 421
                                    return valid.success();                                                          // 422
                                } else {                                                                             // 423
                                    return valid.error();                                                            // 424
                                }                                                                                    // 425
                            }, function() {                                                                          // 426
                                return valid.error();                                                                // 427
                            });                                                                                      // 428
                    }                                                                                                // 429
                    // Check with RegExp                                                                             // 430
                    else if (expression.constructor === RegExp) {                                                    // 431
                        // Only apply the test if the value is neither undefined or null                             // 432
                        if (value !== undefined && value !== null)                                                   // 433
                            return $validationProvider.getExpression(validator).test(value) ? valid.success() : valid.error();
                        else                                                                                         // 435
                            return valid.error();                                                                    // 436
                    } else {                                                                                         // 437
                        return valid.error();                                                                        // 438
                    }                                                                                                // 439
                };                                                                                                   // 440
                                                                                                                     // 441
                                                                                                                     // 442
                /**                                                                                                  // 443
                 * generate unique guid                                                                              // 444
                 */                                                                                                  // 445
                var s4 = function() {                                                                                // 446
                    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);                          // 447
                };                                                                                                   // 448
                var guid = function() {                                                                              // 449
                    return (s4() + s4() + s4() + s4());                                                              // 450
                };                                                                                                   // 451
                                                                                                                     // 452
                                                                                                                     // 453
                return {                                                                                             // 454
                    restrict: 'A',                                                                                   // 455
                    require: 'ngModel',                                                                              // 456
                    scope: {                                                                                         // 457
                        model: '=ngModel',                                                                           // 458
                        initialValidity: '=initialValidity',                                                         // 459
                        validCallback: '&',                                                                          // 460
                        invalidCallback: '&',                                                                        // 461
                        messageId: '@'                                                                               // 462
                    },                                                                                               // 463
                    link: function(scope, element, attrs, ctrl) {                                                    // 464
                                                                                                                     // 465
                        /**                                                                                          // 466
                         * watch                                                                                     // 467
                         * @type {watch}                                                                             // 468
                         *                                                                                           // 469
                         * Use to collect scope.$watch method                                                        // 470
                         *                                                                                           // 471
                         * use watch() to destroy the $watch method                                                  // 472
                         */                                                                                          // 473
                        var watch = function() {};                                                                   // 474
                                                                                                                     // 475
                        /**                                                                                          // 476
                         * validator                                                                                 // 477
                         * @type {Array}                                                                             // 478
                         *                                                                                           // 479
                         * Convert user input String to Array                                                        // 480
                         */                                                                                          // 481
                        var validation = attrs.validator.split(',');                                                 // 482
                                                                                                                     // 483
                        /**                                                                                          // 484
                         * guid use                                                                                  // 485
                         */                                                                                          // 486
                        var uid = ctrl.validationId = guid();                                                        // 487
                                                                                                                     // 488
                                                                                                                     // 489
                        /**                                                                                          // 490
                         * Set initial validity to undefined if no boolean value is transmitted                      // 491
                         */                                                                                          // 492
                        var initialValidity;                                                                         // 493
                        if (typeof scope.initialValidity === 'boolean') {                                            // 494
                            initialValidity = scope.initialValidity;                                                 // 495
                        }                                                                                            // 496
                                                                                                                     // 497
                        /**                                                                                          // 498
                         * Default Valid/Invalid Message                                                             // 499
                         */                                                                                          // 500
                        if (!scope.messageId)                                                                        // 501
                            element.after('<span></span>');                                                          // 502
                                                                                                                     // 503
                        /**                                                                                          // 504
                         * Set custom initial validity                                                               // 505
                         * Usage: <input initial-validity="true" ... >                                               // 506
                         */                                                                                          // 507
                        ctrl.$setValidity(ctrl.$name, initialValidity);                                              // 508
                                                                                                                     // 509
                        /**                                                                                          // 510
                         * Reset the validation for specific form                                                    // 511
                         */                                                                                          // 512
                        scope.$on(ctrl.$name + 'reset-' + uid, function() {                                          // 513
                                                                                                                     // 514
                            /**                                                                                      // 515
                             * clear scope.$watch here                                                               // 516
                             * when reset status                                                                     // 517
                             * clear the $watch method to prevent                                                    // 518
                             * $watch again while reset the form                                                     // 519
                             */                                                                                      // 520
                            watch();                                                                                 // 521
                                                                                                                     // 522
                            $timeout(function() {                                                                    // 523
                                ctrl.$setViewValue('');                                                              // 524
                                ctrl.$setPristine();                                                                 // 525
                                ctrl.$setValidity(ctrl.$name, undefined);                                            // 526
                                ctrl.$render();                                                                      // 527
                                if (scope.messageId)                                                                 // 528
                                    angular.element(document.querySelector('#' + scope.messageId)).html('');         // 529
                                else                                                                                 // 530
                                    element.next().html('');                                                         // 531
                            });                                                                                      // 532
                                                                                                                     // 533
                        });                                                                                          // 534
                                                                                                                     // 535
                        /**                                                                                          // 536
                         * Check validator                                                                           // 537
                         */                                                                                          // 538
                                                                                                                     // 539
                        (function() {                                                                                // 540
                            /**                                                                                      // 541
                             * Click submit form, check the validity when submit                                     // 542
                             */                                                                                      // 543
                            scope.$on(ctrl.$name + 'submit-' + uid, function(event, index) {                         // 544
                                var value = ctrl.$viewValue,                                                         // 545
                                    isValid = false;                                                                 // 546
                                                                                                                     // 547
                                isValid = checkValidation(scope, element, attrs, ctrl, validation, value);           // 548
                                                                                                                     // 549
                                if (attrs.validMethod === 'submit') {                                                // 550
                                    watch(); // clear previous scope.$watch                                          // 551
                                    watch = scope.$watch('model', function(value, oldValue) {                        // 552
                                        value = ctrl.$viewValue;                                                     // 553
                                                                                                                     // 554
                                        // don't watch when init                                                     // 555
                                        if (value === oldValue) {                                                    // 556
                                            return;                                                                  // 557
                                        }                                                                            // 558
                                                                                                                     // 559
                                        // scope.$watch will translate '' to undefined                               // 560
                                        // undefined/null will pass the required submit /^.+/                        // 561
                                        // cause some error in this validation                                       // 562
                                        if (value === undefined || value === null) {                                 // 563
                                            value = '';                                                              // 564
                                        }                                                                            // 565
                                                                                                                     // 566
                                        isValid = checkValidation(scope, element, attrs, ctrl, validation, value);   // 567
                                    });                                                                              // 568
                                                                                                                     // 569
                                }                                                                                    // 570
                                                                                                                     // 571
                                var setFocus = function(isValid) {                                                   // 572
                                    if (isValid) {                                                                   // 573
                                        delete focusElements[index];                                                 // 574
                                    } else {                                                                         // 575
                                        focusElements[index] = element[0];                                           // 576
                                                                                                                     // 577
                                        $timeout(function() {                                                        // 578
                                            focusElements[Math.min.apply(null, Object.keys(focusElements))].focus();
                                        }, 0);                                                                       // 580
                                    }                                                                                // 581
                                };                                                                                   // 582
                                                                                                                     // 583
                                if (isValid.constructor === Object) isValid.then(setFocus);                          // 584
                                else setFocus(isValid);                                                              // 585
                            });                                                                                      // 586
                                                                                                                     // 587
                            /**                                                                                      // 588
                             * Validate blur method                                                                  // 589
                             */                                                                                      // 590
                            if (attrs.validMethod === 'blur') {                                                      // 591
                                element.bind('blur', function() {                                                    // 592
                                    var value = ctrl.$viewValue;                                                     // 593
                                    scope.$apply(function() {                                                        // 594
                                        checkValidation(scope, element, attrs, ctrl, validation, value);             // 595
                                    });                                                                              // 596
                                });                                                                                  // 597
                                                                                                                     // 598
                                return;                                                                              // 599
                            }                                                                                        // 600
                                                                                                                     // 601
                            /**                                                                                      // 602
                             * Validate submit & submit-only method                                                  // 603
                             */                                                                                      // 604
                            if (attrs.validMethod === 'submit' || attrs.validMethod === 'submit-only') {             // 605
                                return;                                                                              // 606
                            }                                                                                        // 607
                                                                                                                     // 608
                            /**                                                                                      // 609
                             * Validate watch method                                                                 // 610
                             * This is the default method                                                            // 611
                             */                                                                                      // 612
                            scope.$watch('model', function(value) {                                                  // 613
                                value = ctrl.$viewValue;                                                             // 614
                                /**                                                                                  // 615
                                 * dirty, pristine, viewValue control here                                           // 616
                                 */                                                                                  // 617
                                if (ctrl.$pristine && ctrl.$viewValue) {                                             // 618
                                    // has value when initial                                                        // 619
                                    ctrl.$setViewValue(ctrl.$viewValue);                                             // 620
                                } else if (ctrl.$pristine) {                                                         // 621
                                    // Don't validate form when the input is clean(pristine)                         // 622
                                    if (scope.messageId)                                                             // 623
                                        angular.element(document.querySelector('#' + scope.messageId)).html('');     // 624
                                    else                                                                             // 625
                                        element.next().html('');                                                     // 626
                                    return;                                                                          // 627
                                }                                                                                    // 628
                                checkValidation(scope, element, attrs, ctrl, validation, value);                     // 629
                            });                                                                                      // 630
                                                                                                                     // 631
                        })();                                                                                        // 632
                                                                                                                     // 633
                        $timeout(function() {                                                                        // 634
                            /**                                                                                      // 635
                             * Don't showup the validation Message                                                   // 636
                             */                                                                                      // 637
                            attrs.$observe('noValidationMessage', function(value) {                                  // 638
                                var el;                                                                              // 639
                                if (scope.messageId)                                                                 // 640
                                    el = angular.element(document.querySelector('#' + scope.messageId));             // 641
                                else                                                                                 // 642
                                    el = element.next();                                                             // 643
                                if (value == 'true' || value === true) {                                             // 644
                                    el.css('display', 'none');                                                       // 645
                                } else if (value == 'false' || value === false) {                                    // 646
                                    el.css('display', 'block');                                                      // 647
                                } else {}                                                                            // 648
                            });                                                                                      // 649
                        });                                                                                          // 650
                                                                                                                     // 651
                    }                                                                                                // 652
                };                                                                                                   // 653
            }                                                                                                        // 654
        ])                                                                                                           // 655
                                                                                                                     // 656
    .directive('validationSubmit', ['$injector',                                                                     // 657
        function($injector) {                                                                                        // 658
                                                                                                                     // 659
            var $validationProvider = $injector.get('$validation'),                                                  // 660
                $timeout = $injector.get('$timeout'),                                                                // 661
                $parse = $injector.get('$parse');                                                                    // 662
                                                                                                                     // 663
            return {                                                                                                 // 664
                priority: 1, // execute before ng-click (0)                                                          // 665
                require: '?ngClick',                                                                                 // 666
                link: function postLink(scope, element, attrs) {                                                     // 667
                    var form = $parse(attrs.validationSubmit)(scope);                                                // 668
                                                                                                                     // 669
                    $timeout(function() {                                                                            // 670
                        // Disable ng-click event propagation                                                        // 671
                        element.off('click');                                                                        // 672
                        element.on('click', function(e) {                                                            // 673
                            e.preventDefault();                                                                      // 674
                                                                                                                     // 675
                            $validationProvider.validate(form)                                                       // 676
                                .success(function() {                                                                // 677
                                    $parse(attrs.ngClick)(scope);                                                    // 678
                                });                                                                                  // 679
                        });                                                                                          // 680
                    });                                                                                              // 681
                                                                                                                     // 682
                }                                                                                                    // 683
            };                                                                                                       // 684
        }                                                                                                            // 685
    ])                                                                                                               // 686
                                                                                                                     // 687
    .directive('validationReset', ['$injector',                                                                      // 688
        function($injector) {                                                                                        // 689
                                                                                                                     // 690
            var $validationProvider = $injector.get('$validation'),                                                  // 691
                $timeout = $injector.get('$timeout'),                                                                // 692
                $parse = $injector.get('$parse');                                                                    // 693
                                                                                                                     // 694
            return {                                                                                                 // 695
                link: function postLink(scope, element, attrs) {                                                     // 696
                    var form = $parse(attrs.validationReset)(scope);                                                 // 697
                                                                                                                     // 698
                    $timeout(function() {                                                                            // 699
                        element.on('click', function(e) {                                                            // 700
                            e.preventDefault();                                                                      // 701
                            $validationProvider.reset(form);                                                         // 702
                        });                                                                                          // 703
                    });                                                                                              // 704
                                                                                                                     // 705
                }                                                                                                    // 706
            };                                                                                                       // 707
        }                                                                                                            // 708
    ]);                                                                                                              // 709
                                                                                                                     // 710
}).call(this);                                                                                                       // 711
                                                                                                                     // 712
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/huei90_angular-validation/dist/angular-validation-rule.js                                                //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
(function() {                                                                                                        // 1
    angular.module('validation.rule', ['validation'])                                                                // 2
        .config(['$validationProvider',                                                                              // 3
            function($validationProvider) {                                                                          // 4
                                                                                                                     // 5
                var expression = {                                                                                   // 6
                    required: function(value) {                                                                      // 7
                        return !!value;                                                                              // 8
                    },                                                                                               // 9
                    url: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
                    email: /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
                    number: /^\d+$/,                                                                                 // 12
                    minlength: function(value, scope, element, attrs, param) {                                       // 13
                        return value.length >= param;                                                                // 14
                    },                                                                                               // 15
                    maxlength: function(value, scope, element, attrs, param) {                                       // 16
                        return value.length <= param;                                                                // 17
                    }                                                                                                // 18
                };                                                                                                   // 19
                                                                                                                     // 20
                var defaultMsg = {                                                                                   // 21
                    required: {                                                                                      // 22
                        error: 'This should be Required!!',                                                          // 23
                        success: 'It\'s Required'                                                                    // 24
                    },                                                                                               // 25
                    url: {                                                                                           // 26
                        error: 'This should be Url',                                                                 // 27
                        success: 'It\'s Url'                                                                         // 28
                    },                                                                                               // 29
                    email: {                                                                                         // 30
                        error: 'This should be Email',                                                               // 31
                        success: 'It\'s Email'                                                                       // 32
                    },                                                                                               // 33
                    number: {                                                                                        // 34
                        error: 'This should be Number',                                                              // 35
                        success: 'It\'s Number'                                                                      // 36
                    },                                                                                               // 37
                    minlength: {                                                                                     // 38
                        error: 'This should be longer',                                                              // 39
                        success: 'Long enough!'                                                                      // 40
                    },                                                                                               // 41
                    maxlength: {                                                                                     // 42
                        error: 'This should be shorter',                                                             // 43
                        success: 'Short enough!'                                                                     // 44
                    }                                                                                                // 45
                };                                                                                                   // 46
                                                                                                                     // 47
                $validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);                             // 48
                                                                                                                     // 49
            }                                                                                                        // 50
        ]);                                                                                                          // 51
                                                                                                                     // 52
}).call(this);                                                                                                       // 53
                                                                                                                     // 54
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['huei90:angular-validation'] = {};

})();
