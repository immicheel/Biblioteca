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
var lodash = Package['stevezhu:lodash'].lodash;
var _ = Package['stevezhu:lodash']._;

(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/dvelopment_angular-datepicker/dist/angular-datepicker.js                                                 //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
'use strict';                                                                                                        // 1
(function(angular){                                                                                                  // 2
/* global _ */                                                                                                       // 3
var Module = angular.module('datePicker', []);                                                                       // 4
                                                                                                                     // 5
Module.constant('datePickerConfig', {                                                                                // 6
  template: 'templates/datepicker.html',                                                                             // 7
  view: 'month',                                                                                                     // 8
  views: ['year', 'month', 'date', 'hours', 'minutes'],                                                              // 9
  step: 5                                                                                                            // 10
});                                                                                                                  // 11
                                                                                                                     // 12
Module.filter('time', function () {                                                                                  // 13
  function format(date) {                                                                                            // 14
    return ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);                            // 15
  }                                                                                                                  // 16
                                                                                                                     // 17
  return function (date) {                                                                                           // 18
    if (!(date instanceof Date)) {                                                                                   // 19
      date = new Date(date);                                                                                         // 20
      if (isNaN(date.getTime())) {                                                                                   // 21
        return undefined;                                                                                            // 22
      }                                                                                                              // 23
    }                                                                                                                // 24
    return format(date);                                                                                             // 25
  };                                                                                                                 // 26
});                                                                                                                  // 27
                                                                                                                     // 28
Module.directive('datePicker', ['datePickerConfig', 'datePickerUtils', function datePickerDirective(datePickerConfig, datePickerUtils) {
                                                                                                                     // 30
  //noinspection JSUnusedLocalSymbols                                                                                // 31
  return {                                                                                                           // 32
    // this is a bug ?                                                                                               // 33
    require: '?ngModel',                                                                                             // 34
    template: '<div ng-include="template"></div>',                                                                   // 35
    scope: {                                                                                                         // 36
      model: '=datePicker',                                                                                          // 37
      after: '=?',                                                                                                   // 38
      before: '=?'                                                                                                   // 39
    },                                                                                                               // 40
    link: function (scope, element, attrs, ngModel) {                                                                // 41
                                                                                                                     // 42
      var arrowClick = false;                                                                                        // 43
                                                                                                                     // 44
      scope.date = new Date(scope.model || new Date());                                                              // 45
      scope.views = datePickerConfig.views.concat();                                                                 // 46
      scope.view = attrs.view || datePickerConfig.view;                                                              // 47
      scope.now = new Date();                                                                                        // 48
      scope.template = attrs.template || datePickerConfig.template;                                                  // 49
      scope.watchDirectChanges = attrs.watchDirectChanges !== undefined;                                             // 50
      scope.callbackOnSetDate = attrs.onSetDate ? _.get(scope.$parent, attrs.onSetDate) : undefined;                 // 51
                                                                                                                     // 52
      var step = parseInt(attrs.step || datePickerConfig.step, 10);                                                  // 53
      var partial = !!attrs.partial;                                                                                 // 54
                                                                                                                     // 55
      //if ngModel, we can add min and max validators                                                                // 56
      if (ngModel) {                                                                                                 // 57
        if (angular.isDefined(attrs.minDate)) {                                                                      // 58
          var minVal;                                                                                                // 59
          ngModel.$validators.min = function (value) {                                                               // 60
            return !datePickerUtils.isValidDate(value) || angular.isUndefined(minVal) || value >= minVal;            // 61
          };                                                                                                         // 62
          attrs.$observe('minDate', function (val) {                                                                 // 63
            minVal = new Date(val);                                                                                  // 64
            ngModel.$validate();                                                                                     // 65
          });                                                                                                        // 66
        }                                                                                                            // 67
                                                                                                                     // 68
        if (angular.isDefined(attrs.maxDate)) {                                                                      // 69
          var maxVal;                                                                                                // 70
          ngModel.$validators.max = function (value) {                                                               // 71
            return !datePickerUtils.isValidDate(value) || angular.isUndefined(maxVal) || value <= maxVal;            // 72
          };                                                                                                         // 73
          attrs.$observe('maxDate', function (val) {                                                                 // 74
            maxVal = new Date(val);                                                                                  // 75
            ngModel.$validate();                                                                                     // 76
          });                                                                                                        // 77
        }                                                                                                            // 78
      }                                                                                                              // 79
      //end min, max date validator                                                                                  // 80
                                                                                                                     // 81
      /** @namespace attrs.minView, attrs.maxView */                                                                 // 82
      scope.views = scope.views.slice(                                                                               // 83
        scope.views.indexOf(attrs.maxView || 'year'),                                                                // 84
        scope.views.indexOf(attrs.minView || 'minutes') + 1                                                          // 85
      );                                                                                                             // 86
                                                                                                                     // 87
      if (scope.views.length === 1 || scope.views.indexOf(scope.view) === -1) {                                      // 88
        scope.view = scope.views[0];                                                                                 // 89
      }                                                                                                              // 90
                                                                                                                     // 91
      scope.setView = function (nextView) {                                                                          // 92
        if (scope.views.indexOf(nextView) !== -1) {                                                                  // 93
          scope.view = nextView;                                                                                     // 94
        }                                                                                                            // 95
      };                                                                                                             // 96
                                                                                                                     // 97
      scope.setDate = function (date) {                                                                              // 98
        if (attrs.disabled) {                                                                                        // 99
          return;                                                                                                    // 100
        }                                                                                                            // 101
        scope.date = date;                                                                                           // 102
        // change next view                                                                                          // 103
        var nextView = scope.views[scope.views.indexOf(scope.view) + 1];                                             // 104
        if ((!nextView || partial) || scope.model) {                                                                 // 105
                                                                                                                     // 106
          scope.model = new Date(scope.model || date);                                                               // 107
          //if ngModel , setViewValue and trigger ng-change, etc...                                                  // 108
          if (ngModel) {                                                                                             // 109
            ngModel.$setViewValue(scope.date);                                                                       // 110
          }                                                                                                          // 111
                                                                                                                     // 112
          var view = partial ? 'minutes' : scope.view;                                                               // 113
          //noinspection FallThroughInSwitchStatementJS                                                              // 114
          switch (view) {                                                                                            // 115
            case 'minutes':                                                                                          // 116
              scope.model.setMinutes(date.getMinutes());                                                             // 117
            /*falls through*/                                                                                        // 118
            case 'hours':                                                                                            // 119
              scope.model.setHours(date.getHours());                                                                 // 120
            /*falls through*/                                                                                        // 121
            case 'date':                                                                                             // 122
              scope.model.setFullYear(date.getFullYear());                                                           // 123
              scope.model.setMonth(date.getMonth());                                                                 // 124
              scope.model.setDate(date.getDate());                                                                   // 125
              break;                                                                                                 // 126
            /*break cause it can switch the date to incorrect date e.g. set 31 for September */                      // 127
            case 'month':                                                                                            // 128
              scope.model.setMonth(date.getMonth());                                                                 // 129
            /*falls through*/                                                                                        // 130
            case 'year':                                                                                             // 131
              scope.model.setFullYear(date.getFullYear());                                                           // 132
          }                                                                                                          // 133
                                                                                                                     // 134
          if (!nextView && scope.model) {                                                                            // 135
            scope.$emit('setMaxDate', attrs.datePicker, scope.model, scope.view);                                    // 136
                                                                                                                     // 137
            if (scope.callbackOnSetDate) {                                                                           // 138
              scope.callbackOnSetDate();                                                                             // 139
            }                                                                                                        // 140
                                                                                                                     // 141
          }                                                                                                          // 142
                                                                                                                     // 143
          scope.$emit('setDate', scope.model, scope.view);                                                           // 144
        }                                                                                                            // 145
                                                                                                                     // 146
        if (nextView) {                                                                                              // 147
          scope.setView(nextView);                                                                                   // 148
        }                                                                                                            // 149
                                                                                                                     // 150
        if (!nextView && attrs.autoClose === 'true') {                                                               // 151
          element.addClass('hidden');                                                                                // 152
          scope.$emit('hidePicker');                                                                                 // 153
        }                                                                                                            // 154
      };                                                                                                             // 155
                                                                                                                     // 156
      function update() {                                                                                            // 157
        var view = scope.view;                                                                                       // 158
                                                                                                                     // 159
        if (scope.model && !arrowClick) {                                                                            // 160
          scope.date = new Date(scope.model);                                                                        // 161
          arrowClick = false;                                                                                        // 162
        }                                                                                                            // 163
        var date = scope.date;                                                                                       // 164
                                                                                                                     // 165
        switch (view) {                                                                                              // 166
          case 'year':                                                                                               // 167
            scope.years = datePickerUtils.getVisibleYears(date);                                                     // 168
            break;                                                                                                   // 169
          case 'month':                                                                                              // 170
            scope.months = datePickerUtils.getVisibleMonths(date);                                                   // 171
            break;                                                                                                   // 172
          case 'date':                                                                                               // 173
            scope.weekdays = scope.weekdays || datePickerUtils.getDaysOfWeek();                                      // 174
            scope.weeks = datePickerUtils.getVisibleWeeks(date);                                                     // 175
            break;                                                                                                   // 176
          case 'hours':                                                                                              // 177
            scope.hours = datePickerUtils.getVisibleHours(date);                                                     // 178
            break;                                                                                                   // 179
          case 'minutes':                                                                                            // 180
            scope.minutes = datePickerUtils.getVisibleMinutes(date, step);                                           // 181
            break;                                                                                                   // 182
        }                                                                                                            // 183
      }                                                                                                              // 184
                                                                                                                     // 185
      function watch() {                                                                                             // 186
        if (scope.view !== 'date') {                                                                                 // 187
          return scope.view;                                                                                         // 188
        }                                                                                                            // 189
        return scope.date ? scope.date.getMonth() : null;                                                            // 190
      }                                                                                                              // 191
                                                                                                                     // 192
                                                                                                                     // 193
      scope.$watch(watch, update);                                                                                   // 194
                                                                                                                     // 195
      if (scope.watchDirectChanges) {                                                                                // 196
        scope.$watch('model', function () {                                                                          // 197
          arrowClick = false;                                                                                        // 198
          update();                                                                                                  // 199
        });                                                                                                          // 200
      }                                                                                                              // 201
                                                                                                                     // 202
      scope.next = function (delta) {                                                                                // 203
        var date = scope.date;                                                                                       // 204
        delta = delta || 1;                                                                                          // 205
        switch (scope.view) {                                                                                        // 206
          case 'year':                                                                                               // 207
          /*falls through*/                                                                                          // 208
          case 'month':                                                                                              // 209
            date.setFullYear(date.getFullYear() + delta);                                                            // 210
            break;                                                                                                   // 211
          case 'date':                                                                                               // 212
            /* Reverting from ISSUE #113                                                                             // 213
             var dt = new Date(date);                                                                                // 214
             date.setMonth(date.getMonth() + delta);                                                                 // 215
             if (date.getDate() < dt.getDate()) {                                                                    // 216
             date.setDate(0);                                                                                        // 217
             }                                                                                                       // 218
             */                                                                                                      // 219
            date.setMonth(date.getMonth() + delta);                                                                  // 220
            break;                                                                                                   // 221
          case 'hours':                                                                                              // 222
          /*falls through*/                                                                                          // 223
          case 'minutes':                                                                                            // 224
            date.setHours(date.getHours() + delta);                                                                  // 225
            break;                                                                                                   // 226
        }                                                                                                            // 227
        arrowClick = true;                                                                                           // 228
        update();                                                                                                    // 229
      };                                                                                                             // 230
                                                                                                                     // 231
      scope.prev = function (delta) {                                                                                // 232
        return scope.next(-delta || -1);                                                                             // 233
      };                                                                                                             // 234
                                                                                                                     // 235
      scope.isAfter = function (date) {                                                                              // 236
        return scope.after && datePickerUtils.isAfter(date, scope.after);                                            // 237
      };                                                                                                             // 238
                                                                                                                     // 239
      scope.isBefore = function (date) {                                                                             // 240
        return scope.before && datePickerUtils.isBefore(date, scope.before);                                         // 241
      };                                                                                                             // 242
                                                                                                                     // 243
      scope.isSameMonth = function (date) {                                                                          // 244
        return datePickerUtils.isSameMonth(scope.model, date);                                                       // 245
      };                                                                                                             // 246
                                                                                                                     // 247
      scope.isSameYear = function (date) {                                                                           // 248
        return datePickerUtils.isSameYear(scope.model, date);                                                        // 249
      };                                                                                                             // 250
                                                                                                                     // 251
      scope.isSameDay = function (date) {                                                                            // 252
        return datePickerUtils.isSameDay(scope.model, date);                                                         // 253
      };                                                                                                             // 254
                                                                                                                     // 255
      scope.isSameHour = function (date) {                                                                           // 256
        return datePickerUtils.isSameHour(scope.model, date);                                                        // 257
      };                                                                                                             // 258
                                                                                                                     // 259
      scope.isSameMinutes = function (date) {                                                                        // 260
        return datePickerUtils.isSameMinutes(scope.model, date);                                                     // 261
      };                                                                                                             // 262
                                                                                                                     // 263
      scope.isNow = function (date) {                                                                                // 264
        var is = true;                                                                                               // 265
        var now = scope.now;                                                                                         // 266
        //noinspection FallThroughInSwitchStatementJS                                                                // 267
        switch (scope.view) {                                                                                        // 268
          case 'minutes':                                                                                            // 269
            is &= ~~(date.getMinutes() / step) === ~~(now.getMinutes() / step);                                      // 270
          /*falls through*/                                                                                          // 271
          case 'hours':                                                                                              // 272
            is &= date.getHours() === now.getHours();                                                                // 273
          /*falls through*/                                                                                          // 274
          case 'date':                                                                                               // 275
            is &= date.getDate() === now.getDate();                                                                  // 276
          /*falls through*/                                                                                          // 277
          case 'month':                                                                                              // 278
            is &= date.getMonth() === now.getMonth();                                                                // 279
          /*falls through*/                                                                                          // 280
          case 'year':                                                                                               // 281
            is &= date.getFullYear() === now.getFullYear();                                                          // 282
        }                                                                                                            // 283
        return is;                                                                                                   // 284
      };                                                                                                             // 285
    }                                                                                                                // 286
  };                                                                                                                 // 287
}]);                                                                                                                 // 288
                                                                                                                     // 289
angular.module('datePicker').factory('datePickerUtils', function(){                                                  // 290
  var createNewDate = function(year, month, day, hour, minute) {                                                     // 291
    // without any arguments, the default date will be 1899-12-31T00:00:00.000Z                                      // 292
    return new Date(year | 0, month | 0, day | 0, hour | 0, minute | 0);                                             // 293
  };                                                                                                                 // 294
  return {                                                                                                           // 295
    getVisibleMinutes : function(date, step) {                                                                       // 296
      date = new Date(date || new Date());                                                                           // 297
      var year = date.getFullYear();                                                                                 // 298
      var month = date.getMonth();                                                                                   // 299
      var day = date.getDate();                                                                                      // 300
      var hour = date.getHours();                                                                                    // 301
      var minutes = [];                                                                                              // 302
      var minute, pushedDate;                                                                                        // 303
      for (minute = 0 ; minute < 60 ; minute += step) {                                                              // 304
        pushedDate = createNewDate(year, month, day, hour, minute);                                                  // 305
        minutes.push(pushedDate);                                                                                    // 306
      }                                                                                                              // 307
      return minutes;                                                                                                // 308
    },                                                                                                               // 309
    getVisibleWeeks : function(date) {                                                                               // 310
      date = new Date(date || new Date());                                                                           // 311
      var startMonth = date.getMonth();                                                                              // 312
      var startYear = date.getYear();                                                                                // 313
      // set date to start of the week                                                                               // 314
      date.setDate(1);                                                                                               // 315
                                                                                                                     // 316
      if (date.getDay() === 0) {                                                                                     // 317
        // day is sunday, let's get back to the previous week                                                        // 318
        date.setDate(-5);                                                                                            // 319
      } else {                                                                                                       // 320
        // day is not sunday, let's get back to the start of the week                                                // 321
        date.setDate(date.getDate() - (date.getDay() - 1));                                                          // 322
      }                                                                                                              // 323
      if (date.getDate() === 1) {                                                                                    // 324
        // day is monday, let's get back to the previous week                                                        // 325
        date.setDate(-6);                                                                                            // 326
      }                                                                                                              // 327
                                                                                                                     // 328
      var weeks = [];                                                                                                // 329
      var week;                                                                                                      // 330
      while (weeks.length < 6) {                                                                                     // 331
        if (date.getYear() === startYear && date.getMonth() > startMonth) {                                          // 332
          break;                                                                                                     // 333
        }                                                                                                            // 334
        week = this.getDaysOfWeek(date);                                                                             // 335
        weeks.push(week);                                                                                            // 336
        date.setDate(date.getDate() + 7);                                                                            // 337
      }                                                                                                              // 338
      return weeks;                                                                                                  // 339
    },                                                                                                               // 340
    getVisibleYears : function(date) {                                                                               // 341
      date = new Date(date || new Date());                                                                           // 342
      date.setFullYear(date.getFullYear() - (date.getFullYear() % 10));                                              // 343
      var year = date.getFullYear();                                                                                 // 344
      var years = [];                                                                                                // 345
      var pushedDate;                                                                                                // 346
      for (var i = 0; i < 12; i++) {                                                                                 // 347
        pushedDate = createNewDate(year);                                                                            // 348
        years.push(pushedDate);                                                                                      // 349
        year++;                                                                                                      // 350
      }                                                                                                              // 351
      return years;                                                                                                  // 352
    },                                                                                                               // 353
    getDaysOfWeek : function(date) {                                                                                 // 354
      date = new Date(date || new Date());                                                                           // 355
      date.setDate(date.getDate() - (date.getDay() - 1));                                                            // 356
      var year = date.getFullYear();                                                                                 // 357
      var month = date.getMonth();                                                                                   // 358
      var day = date.getDate();                                                                                      // 359
      var days = [];                                                                                                 // 360
      var pushedDate;                                                                                                // 361
      for (var i = 0; i < 7; i++) {                                                                                  // 362
        pushedDate = createNewDate(year, month, day);                                                                // 363
        days.push(pushedDate);                                                                                       // 364
        day++;                                                                                                       // 365
      }                                                                                                              // 366
      return days;                                                                                                   // 367
    },                                                                                                               // 368
    getVisibleMonths : function(date) {                                                                              // 369
      date = new Date(date || new Date());                                                                           // 370
      var year = date.getFullYear();                                                                                 // 371
      var months = [];                                                                                               // 372
      var pushedDate;                                                                                                // 373
      for (var month = 0; month < 12; month++) {                                                                     // 374
        pushedDate = createNewDate(year, month, 1);                                                                  // 375
        months.push(pushedDate);                                                                                     // 376
      }                                                                                                              // 377
      return months;                                                                                                 // 378
    },                                                                                                               // 379
    getVisibleHours : function(date) {                                                                               // 380
      date = new Date(date || new Date());                                                                           // 381
      var year = date.getFullYear();                                                                                 // 382
      var month = date.getMonth();                                                                                   // 383
      var day = date.getDate();                                                                                      // 384
      var hours = [];                                                                                                // 385
      var hour, pushedDate;                                                                                          // 386
      for (hour = 0 ; hour < 24 ; hour++) {                                                                          // 387
        pushedDate = createNewDate(year, month, day, hour);                                                          // 388
        hours.push(pushedDate);                                                                                      // 389
      }                                                                                                              // 390
      return hours;                                                                                                  // 391
    },                                                                                                               // 392
    isAfter : function(model, date) {                                                                                // 393
      model = (model !== undefined) ? new Date(model) : model;                                                       // 394
      date = new Date(date);                                                                                         // 395
      return model && model.getTime() >= date.getTime();                                                             // 396
    },                                                                                                               // 397
    isBefore : function(model, date) {                                                                               // 398
      model = (model !== undefined) ? new Date(model) : model;                                                       // 399
      date = new Date(date);                                                                                         // 400
      return model.getTime() <= date.getTime();                                                                      // 401
    },                                                                                                               // 402
    isSameYear :   function(model, date) {                                                                           // 403
      model = (model !== undefined) ? new Date(model) : model;                                                       // 404
      date = new Date(date);                                                                                         // 405
      return model && model.getFullYear() === date.getFullYear();                                                    // 406
    },                                                                                                               // 407
    isSameMonth : function(model, date) {                                                                            // 408
      model = (model !== undefined) ? new Date(model) : model;                                                       // 409
      date = new Date(date);                                                                                         // 410
      return this.isSameYear(model, date) && model.getMonth() === date.getMonth();                                   // 411
    },                                                                                                               // 412
    isSameDay : function(model, date) {                                                                              // 413
      model = (model !== undefined) ? new Date(model) : model;                                                       // 414
      date = new Date(date);                                                                                         // 415
      return this.isSameMonth(model, date) && model.getDate() === date.getDate();                                    // 416
    },                                                                                                               // 417
    isSameHour : function(model, date) {                                                                             // 418
      model = (model !== undefined) ? new Date(model) : model;                                                       // 419
      date = new Date(date);                                                                                         // 420
      return this.isSameDay(model, date) && model.getHours() === date.getHours();                                    // 421
    },                                                                                                               // 422
    isSameMinutes : function(model, date) {                                                                          // 423
      model = (model !== undefined) ? new Date(model) : model;                                                       // 424
      date = new Date(date);                                                                                         // 425
      return this.isSameHour(model, date) && model.getMinutes() === date.getMinutes();                               // 426
    },                                                                                                               // 427
    isValidDate : function(value) {                                                                                  // 428
      // Invalid Date: getTime() returns NaN                                                                         // 429
      return value && !(value.getTime && value.getTime() !== value.getTime());                                       // 430
    }                                                                                                                // 431
    /*                                                                                                               // 432
    toMomentFormat : function(angularFormat) {                                                                       // 433
        function replaceAll(find, replace, string) {                                                                 // 434
          return string.replace(new RegExp(find, 'g'), replace);                                                     // 435
        }                                                                                                            // 436
                                                                                                                     // 437
        var momentFormat = angularFormat;                                                                            // 438
        momentFormat = replaceAll('y', 'Y', momentFormat);                                                           // 439
        momentFormat = replaceAll('d', 'D', momentFormat);                                                           // 440
        momentFormat = replaceAll('E', 'd', momentFormat);                                                           // 441
        momentFormat = replaceAll('sss', 'SSS', momentFormat);                                                       // 442
        momentFormat = replaceAll('w', 'W', momentFormat);                                                           // 443
        return momentFormat;                                                                                         // 444
      }                                                                                                              // 445
      */                                                                                                             // 446
  };                                                                                                                 // 447
});                                                                                                                  // 448
                                                                                                                     // 449
var Module = angular.module('datePicker');                                                                           // 450
                                                                                                                     // 451
Module.directive('dateRange', function () {                                                                          // 452
  return {                                                                                                           // 453
    templateUrl: 'templates/daterange.html',                                                                         // 454
    scope: {                                                                                                         // 455
      start: '=',                                                                                                    // 456
      end: '='                                                                                                       // 457
    },                                                                                                               // 458
    link: function (scope, element, attrs) {                                                                         // 459
                                                                                                                     // 460
      /*                                                                                                             // 461
       * If no date is set on scope, set current date from user system                                               // 462
       */                                                                                                            // 463
      scope.start = new Date(scope.start || new Date());                                                             // 464
      scope.end = new Date(scope.end || new Date());                                                                 // 465
                                                                                                                     // 466
      attrs.$observe('disabled', function(isDisabled){                                                               // 467
          scope.disableDatePickers = !!isDisabled;                                                                   // 468
        });                                                                                                          // 469
      scope.$watch('start.getTime()', function (value) {                                                             // 470
        if (value && scope.end && value > scope.end.getTime()) {                                                     // 471
          scope.end = new Date(value);                                                                               // 472
        }                                                                                                            // 473
      });                                                                                                            // 474
      scope.$watch('end.getTime()', function (value) {                                                               // 475
        if (value && scope.start && value < scope.start.getTime()) {                                                 // 476
          scope.start = new Date(value);                                                                             // 477
        }                                                                                                            // 478
      });                                                                                                            // 479
    }                                                                                                                // 480
  };                                                                                                                 // 481
});                                                                                                                  // 482
                                                                                                                     // 483
var PRISTINE_CLASS = 'ng-pristine',                                                                                  // 484
    DIRTY_CLASS = 'ng-dirty';                                                                                        // 485
                                                                                                                     // 486
var Module = angular.module('datePicker');                                                                           // 487
                                                                                                                     // 488
Module.constant('dateTimeConfig', {                                                                                  // 489
  template: function (attrs) {                                                                                       // 490
    return '' +                                                                                                      // 491
        '<div ' +                                                                                                    // 492
        'date-picker="' + attrs.ngModel + '" ' +                                                                     // 493
        (attrs.view ? 'view="' + attrs.view + '" ' : '') +                                                           // 494
        (attrs.maxView ? 'max-view="' + attrs.maxView + '" ' : '') +                                                 // 495
        (attrs.autoClose ? 'auto-close="' + attrs.autoClose + '" ' : '') +                                           // 496
        (attrs.template ? 'template="' + attrs.template + '" ' : '') +                                               // 497
        (attrs.minView ? 'min-view="' + attrs.minView + '" ' : '') +                                                 // 498
        (attrs.partial ? 'partial="' + attrs.partial + '" ' : '') +                                                  // 499
        (attrs.step ? 'step="' + attrs.step + '" ' : '') +                                                           // 500
        'class="date-picker-date-time"></div>';                                                                      // 501
  },                                                                                                                 // 502
  format: 'yyyy-MM-dd HH:mm',                                                                                        // 503
  views: ['date', 'year', 'month', 'hours', 'minutes'],                                                              // 504
  autoClose: false,                                                                                                  // 505
  position: 'relative'                                                                                               // 506
});                                                                                                                  // 507
                                                                                                                     // 508
Module.directive('dateTimeAppend', function () {                                                                     // 509
  return {                                                                                                           // 510
    link: function (scope, element) {                                                                                // 511
      element.bind('click', function () {                                                                            // 512
        element.find('input')[0].focus();                                                                            // 513
      });                                                                                                            // 514
    }                                                                                                                // 515
  };                                                                                                                 // 516
});                                                                                                                  // 517
                                                                                                                     // 518
Module.directive('dateTime', ['$compile', '$document', '$filter', 'dateTimeConfig', '$parse', 'datePickerUtils',     // 519
                function ($compile, $document, $filter, dateTimeConfig, $parse, datePickerUtils) {                   // 520
  var body = $document.find('body');                                                                                 // 521
  var dateFilter = $filter('date');                                                                                  // 522
                                                                                                                     // 523
  return {                                                                                                           // 524
    require: 'ngModel',                                                                                              // 525
    scope:true,                                                                                                      // 526
    link: function (scope, element, attrs, ngModel) {                                                                // 527
      var format = attrs.format || dateTimeConfig.format;                                                            // 528
      var parentForm = element.inheritedData('$formController');                                                     // 529
      var views = $parse(attrs.views)(scope) || dateTimeConfig.views.concat();                                       // 530
      var view = attrs.view || views[0];                                                                             // 531
      var index = views.indexOf(view);                                                                               // 532
      var dismiss = attrs.autoClose ? $parse(attrs.autoClose)(scope) : dateTimeConfig.autoClose;                     // 533
      var picker = null;                                                                                             // 534
      var position = attrs.position || dateTimeConfig.position;                                                      // 535
      var container = null;                                                                                          // 536
                                                                                                                     // 537
      if (index === -1) {                                                                                            // 538
        views.splice(index, 1);                                                                                      // 539
      }                                                                                                              // 540
                                                                                                                     // 541
      views.unshift(view);                                                                                           // 542
                                                                                                                     // 543
                                                                                                                     // 544
      function formatter(value) {                                                                                    // 545
        return dateFilter(value, format);                                                                            // 546
      }                                                                                                              // 547
                                                                                                                     // 548
      /*                                                                                                             // 549
      function parser(viewValue) {                                                                                   // 550
        if(viewValue.length === format.length) {                                                                     // 551
          var date = moment(viewValue, datePickerUtils.toMomentFormat(format));                                      // 552
          if(date.isValid()) {                                                                                       // 553
            clear();                                                                                                 // 554
            return date.toDate();                                                                                    // 555
          }                                                                                                          // 556
          return viewValue;                                                                                          // 557
        }                                                                                                            // 558
        return undefined;                                                                                            // 559
      }                                                                                                              // 560
      */                                                                                                             // 561
      function parser(viewValue) {                                                                                   // 562
        if(viewValue.length === format.length) {                                                                     // 563
          return viewValue;                                                                                          // 564
        }                                                                                                            // 565
        return undefined;                                                                                            // 566
      }                                                                                                              // 567
                                                                                                                     // 568
      ngModel.$formatters.push(formatter);                                                                           // 569
      ngModel.$parsers.unshift(parser);                                                                              // 570
                                                                                                                     // 571
                                                                                                                     // 572
      //min. max date validators                                                                                     // 573
      if (angular.isDefined(attrs.minDate)) {                                                                        // 574
        var minVal;                                                                                                  // 575
        ngModel.$validators.min = function (value) {                                                                 // 576
            return !datePickerUtils.isValidDate(value) || angular.isUndefined(minVal) || value >= minVal;            // 577
          };                                                                                                         // 578
        attrs.$observe('minDate', function (val) {                                                                   // 579
            minVal = new Date(val);                                                                                  // 580
            ngModel.$validate();                                                                                     // 581
          });                                                                                                        // 582
      }                                                                                                              // 583
                                                                                                                     // 584
      if (angular.isDefined(attrs.maxDate)) {                                                                        // 585
        var maxVal;                                                                                                  // 586
        ngModel.$validators.max = function (value) {                                                                 // 587
            return !datePickerUtils.isValidDate(value) || angular.isUndefined(maxVal) || value <= maxVal;            // 588
          };                                                                                                         // 589
        attrs.$observe('maxDate', function (val) {                                                                   // 590
            maxVal = new Date(val);                                                                                  // 591
            ngModel.$validate();                                                                                     // 592
          });                                                                                                        // 593
      }                                                                                                              // 594
      //end min, max date validator                                                                                  // 595
                                                                                                                     // 596
      var template = dateTimeConfig.template(attrs);                                                                 // 597
                                                                                                                     // 598
      function updateInput(event) {                                                                                  // 599
        event.stopPropagation();                                                                                     // 600
        if (ngModel.$pristine) {                                                                                     // 601
          ngModel.$dirty = true;                                                                                     // 602
          ngModel.$pristine = false;                                                                                 // 603
          element.removeClass(PRISTINE_CLASS).addClass(DIRTY_CLASS);                                                 // 604
          if (parentForm) {                                                                                          // 605
            parentForm.$setDirty();                                                                                  // 606
          }                                                                                                          // 607
          ngModel.$render();                                                                                         // 608
        }                                                                                                            // 609
      }                                                                                                              // 610
                                                                                                                     // 611
      function clear() {                                                                                             // 612
        if (picker) {                                                                                                // 613
          picker.remove();                                                                                           // 614
          picker = null;                                                                                             // 615
        }                                                                                                            // 616
        if (container) {                                                                                             // 617
          container.remove();                                                                                        // 618
          container = null;                                                                                          // 619
        }                                                                                                            // 620
      }                                                                                                              // 621
                                                                                                                     // 622
      function showPicker() {                                                                                        // 623
        if (picker) {                                                                                                // 624
          return;                                                                                                    // 625
        }                                                                                                            // 626
        // create picker element                                                                                     // 627
        picker = $compile(template)(scope);                                                                          // 628
        scope.$digest();                                                                                             // 629
                                                                                                                     // 630
        scope.$on('setDate', function (event, date, view) {                                                          // 631
          updateInput(event);                                                                                        // 632
          if (dismiss && views[views.length - 1] === view) {                                                         // 633
            clear();                                                                                                 // 634
          }                                                                                                          // 635
        });                                                                                                          // 636
                                                                                                                     // 637
        scope.$on('hidePicker', function () {                                                                        // 638
          element.triggerHandler('blur');                                                                            // 639
        });                                                                                                          // 640
                                                                                                                     // 641
        scope.$on('$destroy', clear);                                                                                // 642
                                                                                                                     // 643
        // move picker below input element                                                                           // 644
                                                                                                                     // 645
        if (position === 'absolute') {                                                                               // 646
          var pos = angular.extend(element.offset(), { height: element[0].offsetHeight });                           // 647
          picker.css({ top: pos.top + pos.height, left: pos.left, display: 'block', position: position});            // 648
          body.append(picker);                                                                                       // 649
        } else {                                                                                                     // 650
          // relative                                                                                                // 651
          container = angular.element('<div date-picker-wrapper></div>');                                            // 652
          element[0].parentElement.insertBefore(container[0], element[0]);                                           // 653
          container.append(picker);                                                                                  // 654
//          this approach doesn't work                                                                               // 655
//          element.before(picker);                                                                                  // 656
          picker.css({top: element[0].offsetHeight + 'px', display: 'block'});                                       // 657
        }                                                                                                            // 658
                                                                                                                     // 659
        picker.bind('mousedown', function (evt) {                                                                    // 660
          evt.preventDefault();                                                                                      // 661
        });                                                                                                          // 662
      }                                                                                                              // 663
                                                                                                                     // 664
      element.bind('focus', showPicker);                                                                             // 665
      element.bind('blur', clear);                                                                                   // 666
    }                                                                                                                // 667
  };                                                                                                                 // 668
}]);                                                                                                                 // 669
                                                                                                                     // 670
angular.module('datePicker').run(['$templateCache', function($templateCache) {                                       // 671
$templateCache.put('templates/datepicker.html',                                                                      // 672
    "<div ng-switch=\"view\">\r" +                                                                                   // 673
    "\n" +                                                                                                           // 674
    "  <div ng-switch-when=\"date\">\r" +                                                                            // 675
    "\n" +                                                                                                           // 676
    "    <table>\r" +                                                                                                // 677
    "\n" +                                                                                                           // 678
    "      <thead>\r" +                                                                                              // 679
    "\n" +                                                                                                           // 680
    "      <tr>\r" +                                                                                                 // 681
    "\n" +                                                                                                           // 682
    "        <th ng-click=\"prev()\">&lsaquo;</th>\r" +                                                              // 683
    "\n" +                                                                                                           // 684
    "        <th colspan=\"5\" class=\"switch\" ng-click=\"setView('month')\" ng-bind=\"date|date:'yyyy MMMM'\"></th>\r" +
    "\n" +                                                                                                           // 686
    "        <th ng-click=\"next()\">&rsaquo;</i></th>\r" +                                                          // 687
    "\n" +                                                                                                           // 688
    "      </tr>\r" +                                                                                                // 689
    "\n" +                                                                                                           // 690
    "      <tr>\r" +                                                                                                 // 691
    "\n" +                                                                                                           // 692
    "        <th ng-repeat=\"day in weekdays\" style=\"overflow: hidden\" ng-bind=\"day|date:'EEE'\"></th>\r" +      // 693
    "\n" +                                                                                                           // 694
    "      </tr>\r" +                                                                                                // 695
    "\n" +                                                                                                           // 696
    "      </thead>\r" +                                                                                             // 697
    "\n" +                                                                                                           // 698
    "      <tbody>\r" +                                                                                              // 699
    "\n" +                                                                                                           // 700
    "      <tr ng-repeat=\"week in weeks\">\r" +                                                                     // 701
    "\n" +                                                                                                           // 702
    "        <td ng-repeat=\"day in week\">\r" +                                                                     // 703
    "\n" +                                                                                                           // 704
    "          <span\r" +                                                                                            // 705
    "\n" +                                                                                                           // 706
    "            ng-class=\"{'now':isNow(day),'active':isSameDay(day),'disabled':(day.getMonth()!=date.getMonth()),'after':isAfter(day),'before':isBefore(day)}\"\r" +
    "\n" +                                                                                                           // 708
    "            ng-click=\"setDate(day)\" ng-bind=\"day.getDate()\"></span>\r" +                                    // 709
    "\n" +                                                                                                           // 710
    "        </td>\r" +                                                                                              // 711
    "\n" +                                                                                                           // 712
    "      </tr>\r" +                                                                                                // 713
    "\n" +                                                                                                           // 714
    "      </tbody>\r" +                                                                                             // 715
    "\n" +                                                                                                           // 716
    "    </table>\r" +                                                                                               // 717
    "\n" +                                                                                                           // 718
    "  </div>\r" +                                                                                                   // 719
    "\n" +                                                                                                           // 720
    "  <div ng-switch-when=\"year\">\r" +                                                                            // 721
    "\n" +                                                                                                           // 722
    "    <table>\r" +                                                                                                // 723
    "\n" +                                                                                                           // 724
    "      <thead>\r" +                                                                                              // 725
    "\n" +                                                                                                           // 726
    "      <tr>\r" +                                                                                                 // 727
    "\n" +                                                                                                           // 728
    "        <th ng-click=\"prev(10)\">&lsaquo;</th>\r" +                                                            // 729
    "\n" +                                                                                                           // 730
    "        <th colspan=\"5\" class=\"switch\"ng-bind=\"years[0].getFullYear()+' - '+years[years.length-1].getFullYear()\"></th>\r" +
    "\n" +                                                                                                           // 732
    "        <th ng-click=\"next(10)\">&rsaquo;</i></th>\r" +                                                        // 733
    "\n" +                                                                                                           // 734
    "      </tr>\r" +                                                                                                // 735
    "\n" +                                                                                                           // 736
    "      </thead>\r" +                                                                                             // 737
    "\n" +                                                                                                           // 738
    "      <tbody>\r" +                                                                                              // 739
    "\n" +                                                                                                           // 740
    "      <tr>\r" +                                                                                                 // 741
    "\n" +                                                                                                           // 742
    "        <td colspan=\"7\">\r" +                                                                                 // 743
    "\n" +                                                                                                           // 744
    "          <span ng-class=\"{'active':isSameYear(year),'now':isNow(year)}\"\r" +                                 // 745
    "\n" +                                                                                                           // 746
    "                ng-repeat=\"year in years\"\r" +                                                                // 747
    "\n" +                                                                                                           // 748
    "                ng-click=\"setDate(year)\" ng-bind=\"year.getFullYear()\"></span>\r" +                          // 749
    "\n" +                                                                                                           // 750
    "        </td>\r" +                                                                                              // 751
    "\n" +                                                                                                           // 752
    "      </tr>\r" +                                                                                                // 753
    "\n" +                                                                                                           // 754
    "      </tbody>\r" +                                                                                             // 755
    "\n" +                                                                                                           // 756
    "    </table>\r" +                                                                                               // 757
    "\n" +                                                                                                           // 758
    "  </div>\r" +                                                                                                   // 759
    "\n" +                                                                                                           // 760
    "  <div ng-switch-when=\"month\">\r" +                                                                           // 761
    "\n" +                                                                                                           // 762
    "    <table>\r" +                                                                                                // 763
    "\n" +                                                                                                           // 764
    "      <thead>\r" +                                                                                              // 765
    "\n" +                                                                                                           // 766
    "      <tr>\r" +                                                                                                 // 767
    "\n" +                                                                                                           // 768
    "        <th ng-click=\"prev()\">&lsaquo;</th>\r" +                                                              // 769
    "\n" +                                                                                                           // 770
    "        <th colspan=\"5\" class=\"switch\" ng-click=\"setView('year')\" ng-bind=\"date|date:'yyyy'\"></th>\r" +
    "\n" +                                                                                                           // 772
    "        <th ng-click=\"next()\">&rsaquo;</i></th>\r" +                                                          // 773
    "\n" +                                                                                                           // 774
    "      </tr>\r" +                                                                                                // 775
    "\n" +                                                                                                           // 776
    "      </thead>\r" +                                                                                             // 777
    "\n" +                                                                                                           // 778
    "      <tbody>\r" +                                                                                              // 779
    "\n" +                                                                                                           // 780
    "      <tr>\r" +                                                                                                 // 781
    "\n" +                                                                                                           // 782
    "        <td colspan=\"7\">\r" +                                                                                 // 783
    "\n" +                                                                                                           // 784
    "          <span ng-repeat=\"month in months\"\r" +                                                              // 785
    "\n" +                                                                                                           // 786
    "                ng-class=\"{'active':isSameMonth(month),'after':isAfter(month),'before':isBefore(month),'now':isNow(month)}\"\r" +
    "\n" +                                                                                                           // 788
    "                ng-click=\"setDate(month)\"\r" +                                                                // 789
    "\n" +                                                                                                           // 790
    "                ng-bind=\"month|date:'MMM'\"></span>\r" +                                                       // 791
    "\n" +                                                                                                           // 792
    "        </td>\r" +                                                                                              // 793
    "\n" +                                                                                                           // 794
    "      </tr>\r" +                                                                                                // 795
    "\n" +                                                                                                           // 796
    "      </tbody>\r" +                                                                                             // 797
    "\n" +                                                                                                           // 798
    "    </table>\r" +                                                                                               // 799
    "\n" +                                                                                                           // 800
    "  </div>\r" +                                                                                                   // 801
    "\n" +                                                                                                           // 802
    "  <div ng-switch-when=\"hours\">\r" +                                                                           // 803
    "\n" +                                                                                                           // 804
    "    <table>\r" +                                                                                                // 805
    "\n" +                                                                                                           // 806
    "      <thead>\r" +                                                                                              // 807
    "\n" +                                                                                                           // 808
    "      <tr>\r" +                                                                                                 // 809
    "\n" +                                                                                                           // 810
    "        <th ng-click=\"prev(24)\">&lsaquo;</th>\r" +                                                            // 811
    "\n" +                                                                                                           // 812
    "        <th colspan=\"5\" class=\"switch\" ng-click=\"setView('date')\" ng-bind=\"date|date:'dd MMMM yyyy'\"></th>\r" +
    "\n" +                                                                                                           // 814
    "        <th ng-click=\"next(24)\">&rsaquo;</i></th>\r" +                                                        // 815
    "\n" +                                                                                                           // 816
    "      </tr>\r" +                                                                                                // 817
    "\n" +                                                                                                           // 818
    "      </thead>\r" +                                                                                             // 819
    "\n" +                                                                                                           // 820
    "      <tbody>\r" +                                                                                              // 821
    "\n" +                                                                                                           // 822
    "      <tr>\r" +                                                                                                 // 823
    "\n" +                                                                                                           // 824
    "        <td colspan=\"7\">\r" +                                                                                 // 825
    "\n" +                                                                                                           // 826
    "          <span ng-repeat=\"hour in hours\"\r" +                                                                // 827
    "\n" +                                                                                                           // 828
    "                ng-class=\"{'now':isNow(hour),'active':isSameHour(hour)}\"\r" +                                 // 829
    "\n" +                                                                                                           // 830
    "                ng-click=\"setDate(hour)\" ng-bind=\"hour|time\"></span>\r" +                                   // 831
    "\n" +                                                                                                           // 832
    "        </td>\r" +                                                                                              // 833
    "\n" +                                                                                                           // 834
    "      </tr>\r" +                                                                                                // 835
    "\n" +                                                                                                           // 836
    "      </tbody>\r" +                                                                                             // 837
    "\n" +                                                                                                           // 838
    "    </table>\r" +                                                                                               // 839
    "\n" +                                                                                                           // 840
    "  </div>\r" +                                                                                                   // 841
    "\n" +                                                                                                           // 842
    "  <div ng-switch-when=\"minutes\">\r" +                                                                         // 843
    "\n" +                                                                                                           // 844
    "    <table>\r" +                                                                                                // 845
    "\n" +                                                                                                           // 846
    "      <thead>\r" +                                                                                              // 847
    "\n" +                                                                                                           // 848
    "      <tr>\r" +                                                                                                 // 849
    "\n" +                                                                                                           // 850
    "        <th ng-click=\"prev()\">&lsaquo;</th>\r" +                                                              // 851
    "\n" +                                                                                                           // 852
    "        <th colspan=\"5\" class=\"switch\" ng-click=\"setView('hours')\" ng-bind=\"date|date:'dd MMMM yyyy'\"></th>\r" +
    "\n" +                                                                                                           // 854
    "        <th ng-click=\"next()\">&rsaquo;</i></th>\r" +                                                          // 855
    "\n" +                                                                                                           // 856
    "      </tr>\r" +                                                                                                // 857
    "\n" +                                                                                                           // 858
    "      </thead>\r" +                                                                                             // 859
    "\n" +                                                                                                           // 860
    "      <tbody>\r" +                                                                                              // 861
    "\n" +                                                                                                           // 862
    "      <tr>\r" +                                                                                                 // 863
    "\n" +                                                                                                           // 864
    "        <td colspan=\"7\">\r" +                                                                                 // 865
    "\n" +                                                                                                           // 866
    "          <span ng-repeat=\"minute in minutes\"\r" +                                                            // 867
    "\n" +                                                                                                           // 868
    "                ng-class=\"{active:isSameMinutes(minute),'now':isNow(minute)}\"\r" +                            // 869
    "\n" +                                                                                                           // 870
    "                ng-click=\"setDate(minute)\"\r" +                                                               // 871
    "\n" +                                                                                                           // 872
    "                ng-bind=\"minute|time\"></span>\r" +                                                            // 873
    "\n" +                                                                                                           // 874
    "        </td>\r" +                                                                                              // 875
    "\n" +                                                                                                           // 876
    "      </tr>\r" +                                                                                                // 877
    "\n" +                                                                                                           // 878
    "      </tbody>\r" +                                                                                             // 879
    "\n" +                                                                                                           // 880
    "    </table>\r" +                                                                                               // 881
    "\n" +                                                                                                           // 882
    "  </div>\r" +                                                                                                   // 883
    "\n" +                                                                                                           // 884
    "</div>\r" +                                                                                                     // 885
    "\n"                                                                                                             // 886
  );                                                                                                                 // 887
                                                                                                                     // 888
                                                                                                                     // 889
  $templateCache.put('templates/daterange.html',                                                                     // 890
    "<div>\r" +                                                                                                      // 891
    "\n" +                                                                                                           // 892
    "    <table>\r" +                                                                                                // 893
    "\n" +                                                                                                           // 894
    "        <tr>\r" +                                                                                               // 895
    "\n" +                                                                                                           // 896
    "            <td valign=\"top\">\r" +                                                                            // 897
    "\n" +                                                                                                           // 898
    "                <div date-picker=\"start\" ng-disabled=\"disableDatePickers\"  class=\"date-picker\" date after=\"start\" before=\"end\" min-view=\"date\" max-view=\"date\"></div>\r" +
    "\n" +                                                                                                           // 900
    "            </td>\r" +                                                                                          // 901
    "\n" +                                                                                                           // 902
    "            <td valign=\"top\">\r" +                                                                            // 903
    "\n" +                                                                                                           // 904
    "                <div date-picker=\"end\" ng-disabled=\"disableDatePickers\"  class=\"date-picker\" date after=\"start\" before=\"end\"  min-view=\"date\" max-view=\"date\"></div>\r" +
    "\n" +                                                                                                           // 906
    "            </td>\r" +                                                                                          // 907
    "\n" +                                                                                                           // 908
    "        </tr>\r" +                                                                                              // 909
    "\n" +                                                                                                           // 910
    "    </table>\r" +                                                                                               // 911
    "\n" +                                                                                                           // 912
    "</div>\r" +                                                                                                     // 913
    "\n"                                                                                                             // 914
  );                                                                                                                 // 915
                                                                                                                     // 916
}]);                                                                                                                 // 917
})(angular);                                                                                                         // 918
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['dvelopment:angular-datepicker'] = {};

})();
