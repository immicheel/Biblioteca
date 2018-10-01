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

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/angularui_ui-select/packages/angularui_ui-select.js      //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
(function () {                                                       // 1
                                                                     // 2
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/angularui:ui-select/dist/select.js                                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/*!                                                                                                                    // 1
 * ui-select                                                                                                           // 2
 * http://github.com/angular-ui/ui-select                                                                              // 3
 * Version: 0.12.0 - 2015-05-28T07:44:11.360Z                                                                          // 4
 * License: MIT                                                                                                        // 5
 */                                                                                                                    // 6
                                                                                                                       // 7
                                                                                                                       // 8
(function () {                                                                                                         // 9
"use strict";                                                                                                          // 10
                                                                                                                       // 11
var KEY = {                                                                                                            // 12
    TAB: 9,                                                                                                            // 13
    ENTER: 13,                                                                                                         // 14
    ESC: 27,                                                                                                           // 15
    SPACE: 32,                                                                                                         // 16
    LEFT: 37,                                                                                                          // 17
    UP: 38,                                                                                                            // 18
    RIGHT: 39,                                                                                                         // 19
    DOWN: 40,                                                                                                          // 20
    SHIFT: 16,                                                                                                         // 21
    CTRL: 17,                                                                                                          // 22
    ALT: 18,                                                                                                           // 23
    PAGE_UP: 33,                                                                                                       // 24
    PAGE_DOWN: 34,                                                                                                     // 25
    HOME: 36,                                                                                                          // 26
    END: 35,                                                                                                           // 27
    BACKSPACE: 8,                                                                                                      // 28
    DELETE: 46,                                                                                                        // 29
    COMMAND: 91,                                                                                                       // 30
                                                                                                                       // 31
    MAP: { 91 : "COMMAND", 8 : "BACKSPACE" , 9 : "TAB" , 13 : "ENTER" , 16 : "SHIFT" , 17 : "CTRL" , 18 : "ALT" , 19 : "PAUSEBREAK" , 20 : "CAPSLOCK" , 27 : "ESC" , 32 : "SPACE" , 33 : "PAGE_UP", 34 : "PAGE_DOWN" , 35 : "END" , 36 : "HOME" , 37 : "LEFT" , 38 : "UP" , 39 : "RIGHT" , 40 : "DOWN" , 43 : "+" , 44 : "PRINTSCREEN" , 45 : "INSERT" , 46 : "DELETE", 48 : "0" , 49 : "1" , 50 : "2" , 51 : "3" , 52 : "4" , 53 : "5" , 54 : "6" , 55 : "7" , 56 : "8" , 57 : "9" , 59 : ";", 61 : "=" , 65 : "A" , 66 : "B" , 67 : "C" , 68 : "D" , 69 : "E" , 70 : "F" , 71 : "G" , 72 : "H" , 73 : "I" , 74 : "J" , 75 : "K" , 76 : "L", 77 : "M" , 78 : "N" , 79 : "O" , 80 : "P" , 81 : "Q" , 82 : "R" , 83 : "S" , 84 : "T" , 85 : "U" , 86 : "V" , 87 : "W" , 88 : "X" , 89 : "Y" , 90 : "Z", 96 : "0" , 97 : "1" , 98 : "2" , 99 : "3" , 100 : "4" , 101 : "5" , 102 : "6" , 103 : "7" , 104 : "8" , 105 : "9", 106 : "*" , 107 : "+" , 109 : "-" , 110 : "." , 111 : "/", 112 : "F1" , 113 : "F2" , 114 : "F3" , 115 : "F4" , 116 : "F5" , 117 : "F6" , 118 : "F7" , 119 : "F8" , 120 : "F9" , 121 : "F10" , 122 : "F11" , 123 : "F12", 144 : "NUMLOCK" , 145 : "SCROLLLOCK" , 186 : ";" , 187 : "=" , 188 : "," , 189 : "-" , 190 : "." , 191 : "/" , 192 : "`" , 219 : "[" , 220 : "\\" , 221 : "]" , 222 : "'"
    },                                                                                                                 // 33
                                                                                                                       // 34
    isControl: function (e) {                                                                                          // 35
        var k = e.which;                                                                                               // 36
        switch (k) {                                                                                                   // 37
        case KEY.COMMAND:                                                                                              // 38
        case KEY.SHIFT:                                                                                                // 39
        case KEY.CTRL:                                                                                                 // 40
        case KEY.ALT:                                                                                                  // 41
            return true;                                                                                               // 42
        }                                                                                                              // 43
                                                                                                                       // 44
        if (e.metaKey) return true;                                                                                    // 45
                                                                                                                       // 46
        return false;                                                                                                  // 47
    },                                                                                                                 // 48
    isFunctionKey: function (k) {                                                                                      // 49
        k = k.which ? k.which : k;                                                                                     // 50
        return k >= 112 && k <= 123;                                                                                   // 51
    },                                                                                                                 // 52
    isVerticalMovement: function (k){                                                                                  // 53
      return ~[KEY.UP, KEY.DOWN].indexOf(k);                                                                           // 54
    },                                                                                                                 // 55
    isHorizontalMovement: function (k){                                                                                // 56
      return ~[KEY.LEFT,KEY.RIGHT,KEY.BACKSPACE,KEY.DELETE].indexOf(k);                                                // 57
    }                                                                                                                  // 58
  };                                                                                                                   // 59
                                                                                                                       // 60
/**                                                                                                                    // 61
 * Add querySelectorAll() to jqLite.                                                                                   // 62
 *                                                                                                                     // 63
 * jqLite find() is limited to lookups by tag name.                                                                    // 64
 * TODO This will change with future versions of AngularJS, to be removed when this happens                            // 65
 *                                                                                                                     // 66
 * See jqLite.find - why not use querySelectorAll? https://github.com/angular/angular.js/issues/3586                   // 67
 * See feat(jqLite): use querySelectorAll instead of getElementsByTagName in jqLite.find https://github.com/angular/angular.js/pull/3598
 */                                                                                                                    // 69
if (angular.element.prototype.querySelectorAll === undefined) {                                                        // 70
  angular.element.prototype.querySelectorAll = function(selector) {                                                    // 71
    return angular.element(this[0].querySelectorAll(selector));                                                        // 72
  };                                                                                                                   // 73
}                                                                                                                      // 74
                                                                                                                       // 75
/**                                                                                                                    // 76
 * Add closest() to jqLite.                                                                                            // 77
 */                                                                                                                    // 78
if (angular.element.prototype.closest === undefined) {                                                                 // 79
  angular.element.prototype.closest = function( selector) {                                                            // 80
    var elem = this[0];                                                                                                // 81
    var matchesSelector = elem.matches || elem.webkitMatchesSelector || elem.mozMatchesSelector || elem.msMatchesSelector;
                                                                                                                       // 83
    while (elem) {                                                                                                     // 84
      if (matchesSelector.bind(elem)(selector)) {                                                                      // 85
        return elem;                                                                                                   // 86
      } else {                                                                                                         // 87
        elem = elem.parentElement;                                                                                     // 88
      }                                                                                                                // 89
    }                                                                                                                  // 90
    return false;                                                                                                      // 91
  };                                                                                                                   // 92
}                                                                                                                      // 93
                                                                                                                       // 94
var latestId = 0;                                                                                                      // 95
                                                                                                                       // 96
var uis = angular.module('ui.select', [])                                                                              // 97
                                                                                                                       // 98
.constant('uiSelectConfig', {                                                                                          // 99
  theme: 'bootstrap',                                                                                                  // 100
  searchEnabled: true,                                                                                                 // 101
  sortable: false,                                                                                                     // 102
  placeholder: '', // Empty by default, like HTML tag <select>                                                         // 103
  refreshDelay: 1000, // In milliseconds                                                                               // 104
  closeOnSelect: true,                                                                                                 // 105
  generateId: function() {                                                                                             // 106
    return latestId++;                                                                                                 // 107
  },                                                                                                                   // 108
  appendToBody: false                                                                                                  // 109
})                                                                                                                     // 110
                                                                                                                       // 111
// See Rename minErr and make it accessible from outside https://github.com/angular/angular.js/issues/6913             // 112
.service('uiSelectMinErr', function() {                                                                                // 113
  var minErr = angular.$$minErr('ui.select');                                                                          // 114
  return function() {                                                                                                  // 115
    var error = minErr.apply(this, arguments);                                                                         // 116
    var message = error.message.replace(new RegExp('\nhttp://errors.angularjs.org/.*'), '');                           // 117
    return new Error(message);                                                                                         // 118
  };                                                                                                                   // 119
})                                                                                                                     // 120
                                                                                                                       // 121
// Recreates old behavior of ng-transclude. Used internally.                                                           // 122
.directive('uisTranscludeAppend', function () {                                                                        // 123
  return {                                                                                                             // 124
    link: function (scope, element, attrs, ctrl, transclude) {                                                         // 125
        transclude(scope, function (clone) {                                                                           // 126
          element.append(clone);                                                                                       // 127
        });                                                                                                            // 128
      }                                                                                                                // 129
    };                                                                                                                 // 130
})                                                                                                                     // 131
                                                                                                                       // 132
/**                                                                                                                    // 133
 * Highlights text that matches $select.search.                                                                        // 134
 *                                                                                                                     // 135
 * Taken from AngularUI Bootstrap Typeahead                                                                            // 136
 * See https://github.com/angular-ui/bootstrap/blob/0.10.0/src/typeahead/typeahead.js#L340                             // 137
 */                                                                                                                    // 138
.filter('highlight', function() {                                                                                      // 139
  function escapeRegexp(queryToEscape) {                                                                               // 140
    return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');                                                    // 141
  }                                                                                                                    // 142
                                                                                                                       // 143
  return function(matchItem, query) {                                                                                  // 144
    return query && matchItem ? matchItem.replace(new RegExp(escapeRegexp(query), 'gi'), '<span class="ui-select-highlight">$&</span>') : matchItem;
  };                                                                                                                   // 146
})                                                                                                                     // 147
                                                                                                                       // 148
/**                                                                                                                    // 149
 * A read-only equivalent of jQuery's offset function: http://api.jquery.com/offset/                                   // 150
 *                                                                                                                     // 151
 * Taken from AngularUI Bootstrap Position:                                                                            // 152
 * See https://github.com/angular-ui/bootstrap/blob/master/src/position/position.js#L70                                // 153
 */                                                                                                                    // 154
.factory('uisOffset',                                                                                                  // 155
  ['$document', '$window',                                                                                             // 156
  function ($document, $window) {                                                                                      // 157
                                                                                                                       // 158
  return function(element) {                                                                                           // 159
    var boundingClientRect = element[0].getBoundingClientRect();                                                       // 160
    return {                                                                                                           // 161
      width: boundingClientRect.width || element.prop('offsetWidth'),                                                  // 162
      height: boundingClientRect.height || element.prop('offsetHeight'),                                               // 163
      top: boundingClientRect.top + ($window.pageYOffset || $document[0].documentElement.scrollTop),                   // 164
      left: boundingClientRect.left + ($window.pageXOffset || $document[0].documentElement.scrollLeft)                 // 165
    };                                                                                                                 // 166
  };                                                                                                                   // 167
}]);                                                                                                                   // 168
                                                                                                                       // 169
uis.directive('uiSelectChoices',                                                                                       // 170
  ['uiSelectConfig', 'uisRepeatParser', 'uiSelectMinErr', '$compile',                                                  // 171
  function(uiSelectConfig, RepeatParser, uiSelectMinErr, $compile) {                                                   // 172
                                                                                                                       // 173
  return {                                                                                                             // 174
    restrict: 'EA',                                                                                                    // 175
    require: '^uiSelect',                                                                                              // 176
    replace: true,                                                                                                     // 177
    transclude: true,                                                                                                  // 178
    templateUrl: function(tElement) {                                                                                  // 179
      // Gets theme attribute from parent (ui-select)                                                                  // 180
      var theme = tElement.parent().attr('theme') || uiSelectConfig.theme;                                             // 181
      return theme + '/choices.tpl.html';                                                                              // 182
    },                                                                                                                 // 183
                                                                                                                       // 184
    compile: function(tElement, tAttrs) {                                                                              // 185
                                                                                                                       // 186
      if (!tAttrs.repeat) throw uiSelectMinErr('repeat', "Expected 'repeat' expression.");                             // 187
                                                                                                                       // 188
      return function link(scope, element, attrs, $select, transcludeFn) {                                             // 189
                                                                                                                       // 190
        // var repeat = RepeatParser.parse(attrs.repeat);                                                              // 191
        var groupByExp = attrs.groupBy;                                                                                // 192
        var groupFilterExp = attrs.groupFilter;                                                                        // 193
                                                                                                                       // 194
        $select.parseRepeatAttr(attrs.repeat, groupByExp, groupFilterExp); //Result ready at $select.parserResult      // 195
                                                                                                                       // 196
        $select.disableChoiceExpression = attrs.uiDisableChoice;                                                       // 197
        $select.onHighlightCallback = attrs.onHighlight;                                                               // 198
                                                                                                                       // 199
        if(groupByExp) {                                                                                               // 200
          var groups = element.querySelectorAll('.ui-select-choices-group');                                           // 201
          if (groups.length !== 1) throw uiSelectMinErr('rows', "Expected 1 .ui-select-choices-group but got '{0}'.", groups.length);
          groups.attr('ng-repeat', RepeatParser.getGroupNgRepeatExpression());                                         // 203
        }                                                                                                              // 204
                                                                                                                       // 205
        var choices = element.querySelectorAll('.ui-select-choices-row');                                              // 206
        if (choices.length !== 1) {                                                                                    // 207
          throw uiSelectMinErr('rows', "Expected 1 .ui-select-choices-row but got '{0}'.", choices.length);            // 208
        }                                                                                                              // 209
                                                                                                                       // 210
        choices.attr('ng-repeat', RepeatParser.getNgRepeatExpression($select.parserResult.itemName, '$select.items', $select.parserResult.trackByExp, groupByExp))
            .attr('ng-if', '$select.open') //Prevent unnecessary watches when dropdown is closed                       // 212
            .attr('ng-mouseenter', '$select.setActiveItem('+$select.parserResult.itemName +')')                        // 213
            .attr('ng-click', '$select.select(' + $select.parserResult.itemName + ',false,$event)');                   // 214
                                                                                                                       // 215
        var rowsInner = element.querySelectorAll('.ui-select-choices-row-inner');                                      // 216
        if (rowsInner.length !== 1) throw uiSelectMinErr('rows', "Expected 1 .ui-select-choices-row-inner but got '{0}'.", rowsInner.length);
        rowsInner.attr('uis-transclude-append', ''); //Adding uisTranscludeAppend directive to row element after choices element has ngRepeat
                                                                                                                       // 219
        $compile(element, transcludeFn)(scope); //Passing current transcludeFn to be able to append elements correctly from uisTranscludeAppend
                                                                                                                       // 221
        scope.$watch('$select.search', function(newValue) {                                                            // 222
          if(newValue && !$select.open && $select.multiple) $select.activate(false, true);                             // 223
          $select.activeIndex = $select.tagging.isActivated ? -1 : 0;                                                  // 224
          $select.refresh(attrs.refresh);                                                                              // 225
        });                                                                                                            // 226
                                                                                                                       // 227
        attrs.$observe('refreshDelay', function() {                                                                    // 228
          // $eval() is needed otherwise we get a string instead of a number                                           // 229
          var refreshDelay = scope.$eval(attrs.refreshDelay);                                                          // 230
          $select.refreshDelay = refreshDelay !== undefined ? refreshDelay : uiSelectConfig.refreshDelay;              // 231
        });                                                                                                            // 232
      };                                                                                                               // 233
    }                                                                                                                  // 234
  };                                                                                                                   // 235
}]);                                                                                                                   // 236
                                                                                                                       // 237
/**                                                                                                                    // 238
 * Contains ui-select "intelligence".                                                                                  // 239
 *                                                                                                                     // 240
 * The goal is to limit dependency on the DOM whenever possible and                                                    // 241
 * put as much logic in the controller (instead of the link functions) as possible so it can be easily tested.         // 242
 */                                                                                                                    // 243
uis.controller('uiSelectCtrl',                                                                                         // 244
  ['$scope', '$element', '$timeout', '$filter', 'uisRepeatParser', 'uiSelectMinErr', 'uiSelectConfig',                 // 245
  function($scope, $element, $timeout, $filter, RepeatParser, uiSelectMinErr, uiSelectConfig) {                        // 246
                                                                                                                       // 247
  var ctrl = this;                                                                                                     // 248
                                                                                                                       // 249
  var EMPTY_SEARCH = '';                                                                                               // 250
                                                                                                                       // 251
  ctrl.placeholder = uiSelectConfig.placeholder;                                                                       // 252
  ctrl.searchEnabled = uiSelectConfig.searchEnabled;                                                                   // 253
  ctrl.sortable = uiSelectConfig.sortable;                                                                             // 254
  ctrl.refreshDelay = uiSelectConfig.refreshDelay;                                                                     // 255
                                                                                                                       // 256
  ctrl.removeSelected = false; //If selected item(s) should be removed from dropdown list                              // 257
  ctrl.closeOnSelect = true; //Initialized inside uiSelect directive link function                                     // 258
  ctrl.search = EMPTY_SEARCH;                                                                                          // 259
                                                                                                                       // 260
  ctrl.activeIndex = 0; //Dropdown of choices                                                                          // 261
  ctrl.items = []; //All available choices                                                                             // 262
                                                                                                                       // 263
  ctrl.open = false;                                                                                                   // 264
  ctrl.focus = false;                                                                                                  // 265
  ctrl.disabled = false;                                                                                               // 266
  ctrl.selected = undefined;                                                                                           // 267
                                                                                                                       // 268
  ctrl.focusser = undefined; //Reference to input element used to handle focus events                                  // 269
  ctrl.resetSearchInput = true;                                                                                        // 270
  ctrl.multiple = undefined; // Initialized inside uiSelect directive link function                                    // 271
  ctrl.disableChoiceExpression = undefined; // Initialized inside uiSelectChoices directive link function              // 272
  ctrl.tagging = {isActivated: false, fct: undefined};                                                                 // 273
  ctrl.taggingTokens = {isActivated: false, tokens: undefined};                                                        // 274
  ctrl.lockChoiceExpression = undefined; // Initialized inside uiSelectMatch directive link function                   // 275
  ctrl.clickTriggeredSelect = false;                                                                                   // 276
  ctrl.$filter = $filter;                                                                                              // 277
                                                                                                                       // 278
  ctrl.searchInput = $element.querySelectorAll('input.ui-select-search');                                              // 279
  if (ctrl.searchInput.length !== 1) {                                                                                 // 280
    throw uiSelectMinErr('searchInput', "Expected 1 input.ui-select-search but got '{0}'.", ctrl.searchInput.length);  // 281
  }                                                                                                                    // 282
                                                                                                                       // 283
  ctrl.isEmpty = function() {                                                                                          // 284
    return angular.isUndefined(ctrl.selected) || ctrl.selected === null || ctrl.selected === '';                       // 285
  };                                                                                                                   // 286
                                                                                                                       // 287
  // Most of the time the user does not want to empty the search input when in typeahead mode                          // 288
  function _resetSearchInput() {                                                                                       // 289
    if (ctrl.resetSearchInput || (ctrl.resetSearchInput === undefined && uiSelectConfig.resetSearchInput)) {           // 290
      ctrl.search = EMPTY_SEARCH;                                                                                      // 291
      //reset activeIndex                                                                                              // 292
      if (ctrl.selected && ctrl.items.length && !ctrl.multiple) {                                                      // 293
        ctrl.activeIndex = ctrl.items.indexOf(ctrl.selected);                                                          // 294
      }                                                                                                                // 295
    }                                                                                                                  // 296
  }                                                                                                                    // 297
                                                                                                                       // 298
    function _groupsFilter(groups, groupNames) {                                                                       // 299
      var i, j, result = [];                                                                                           // 300
      for(i = 0; i < groupNames.length ;i++){                                                                          // 301
        for(j = 0; j < groups.length ;j++){                                                                            // 302
          if(groups[j].name == [groupNames[i]]){                                                                       // 303
            result.push(groups[j]);                                                                                    // 304
          }                                                                                                            // 305
        }                                                                                                              // 306
      }                                                                                                                // 307
      return result;                                                                                                   // 308
    }                                                                                                                  // 309
                                                                                                                       // 310
  // When the user clicks on ui-select, displays the dropdown list                                                     // 311
  ctrl.activate = function(initSearchValue, avoidReset) {                                                              // 312
    if (!ctrl.disabled  && !ctrl.open) {                                                                               // 313
      if(!avoidReset) _resetSearchInput();                                                                             // 314
                                                                                                                       // 315
      $scope.$broadcast('uis:activate');                                                                               // 316
                                                                                                                       // 317
      ctrl.open = true;                                                                                                // 318
                                                                                                                       // 319
      ctrl.activeIndex = ctrl.activeIndex >= ctrl.items.length ? 0 : ctrl.activeIndex;                                 // 320
                                                                                                                       // 321
      // ensure that the index is set to zero for tagging variants                                                     // 322
      // that where first option is auto-selected                                                                      // 323
      if ( ctrl.activeIndex === -1 && ctrl.taggingLabel !== false ) {                                                  // 324
        ctrl.activeIndex = 0;                                                                                          // 325
      }                                                                                                                // 326
                                                                                                                       // 327
      // Give it time to appear before focus                                                                           // 328
      $timeout(function() {                                                                                            // 329
        ctrl.search = initSearchValue || ctrl.search;                                                                  // 330
        ctrl.searchInput[0].focus();                                                                                   // 331
      });                                                                                                              // 332
    }                                                                                                                  // 333
  };                                                                                                                   // 334
                                                                                                                       // 335
  ctrl.findGroupByName = function(name) {                                                                              // 336
    return ctrl.groups && ctrl.groups.filter(function(group) {                                                         // 337
      return group.name === name;                                                                                      // 338
    })[0];                                                                                                             // 339
  };                                                                                                                   // 340
                                                                                                                       // 341
  ctrl.parseRepeatAttr = function(repeatAttr, groupByExp, groupFilterExp) {                                            // 342
    function updateGroups(items) {                                                                                     // 343
      var groupFn = $scope.$eval(groupByExp);                                                                          // 344
      ctrl.groups = [];                                                                                                // 345
      angular.forEach(items, function(item) {                                                                          // 346
        var groupName = angular.isFunction(groupFn) ? groupFn(item) : item[groupFn];                                   // 347
        var group = ctrl.findGroupByName(groupName);                                                                   // 348
        if(group) {                                                                                                    // 349
          group.items.push(item);                                                                                      // 350
        }                                                                                                              // 351
        else {                                                                                                         // 352
          ctrl.groups.push({name: groupName, items: [item]});                                                          // 353
        }                                                                                                              // 354
      });                                                                                                              // 355
      if(groupFilterExp){                                                                                              // 356
        var groupFilterFn = $scope.$eval(groupFilterExp);                                                              // 357
        if( angular.isFunction(groupFilterFn)){                                                                        // 358
          ctrl.groups = groupFilterFn(ctrl.groups);                                                                    // 359
        } else if(angular.isArray(groupFilterFn)){                                                                     // 360
          ctrl.groups = _groupsFilter(ctrl.groups, groupFilterFn);                                                     // 361
        }                                                                                                              // 362
      }                                                                                                                // 363
      ctrl.items = [];                                                                                                 // 364
      ctrl.groups.forEach(function(group) {                                                                            // 365
        ctrl.items = ctrl.items.concat(group.items);                                                                   // 366
      });                                                                                                              // 367
    }                                                                                                                  // 368
                                                                                                                       // 369
    function setPlainItems(items) {                                                                                    // 370
      ctrl.items = items;                                                                                              // 371
    }                                                                                                                  // 372
                                                                                                                       // 373
    ctrl.setItemsFn = groupByExp ? updateGroups : setPlainItems;                                                       // 374
                                                                                                                       // 375
    ctrl.parserResult = RepeatParser.parse(repeatAttr);                                                                // 376
                                                                                                                       // 377
    ctrl.isGrouped = !!groupByExp;                                                                                     // 378
    ctrl.itemProperty = ctrl.parserResult.itemName;                                                                    // 379
                                                                                                                       // 380
    ctrl.refreshItems = function (data){                                                                               // 381
      data = data || ctrl.parserResult.source($scope);                                                                 // 382
      var selectedItems = ctrl.selected;                                                                               // 383
      //TODO should implement for single mode removeSelected                                                           // 384
      if ((angular.isArray(selectedItems) && !selectedItems.length) || !ctrl.removeSelected) {                         // 385
        ctrl.setItemsFn(data);                                                                                         // 386
      }else{                                                                                                           // 387
        if ( data !== undefined ) {                                                                                    // 388
          var filteredItems = data.filter(function(i) {return selectedItems.indexOf(i) < 0;});                         // 389
          ctrl.setItemsFn(filteredItems);                                                                              // 390
        }                                                                                                              // 391
      }                                                                                                                // 392
    };                                                                                                                 // 393
                                                                                                                       // 394
    // See https://github.com/angular/angular.js/blob/v1.2.15/src/ng/directive/ngRepeat.js#L259                        // 395
    $scope.$watchCollection(ctrl.parserResult.source, function(items) {                                                // 396
      if (items === undefined || items === null) {                                                                     // 397
        // If the user specifies undefined or null => reset the collection                                             // 398
        // Special case: items can be undefined if the user did not initialized the collection on the scope            // 399
        // i.e $scope.addresses = [] is missing                                                                        // 400
        ctrl.items = [];                                                                                               // 401
      } else {                                                                                                         // 402
        if (!angular.isArray(items)) {                                                                                 // 403
          throw uiSelectMinErr('items', "Expected an array but got '{0}'.", items);                                    // 404
        } else {                                                                                                       // 405
          //Remove already selected items (ex: while searching)                                                        // 406
          //TODO Should add a test                                                                                     // 407
          ctrl.refreshItems(items);                                                                                    // 408
          ctrl.ngModel.$modelValue = null; //Force scope model value and ngModel value to be out of sync to re-run formatters
        }                                                                                                              // 410
      }                                                                                                                // 411
    });                                                                                                                // 412
                                                                                                                       // 413
  };                                                                                                                   // 414
                                                                                                                       // 415
  var _refreshDelayPromise;                                                                                            // 416
                                                                                                                       // 417
  /**                                                                                                                  // 418
   * Typeahead mode: lets the user refresh the collection using his own function.                                      // 419
   *                                                                                                                   // 420
   * See Expose $select.search for external / remote filtering https://github.com/angular-ui/ui-select/pull/31         // 421
   */                                                                                                                  // 422
  ctrl.refresh = function(refreshAttr) {                                                                               // 423
    if (refreshAttr !== undefined) {                                                                                   // 424
                                                                                                                       // 425
      // Debounce                                                                                                      // 426
      // See https://github.com/angular-ui/bootstrap/blob/0.10.0/src/typeahead/typeahead.js#L155                       // 427
      // FYI AngularStrap typeahead does not have debouncing: https://github.com/mgcrea/angular-strap/blob/v2.0.0-rc.4/src/typeahead/typeahead.js#L177
      if (_refreshDelayPromise) {                                                                                      // 429
        $timeout.cancel(_refreshDelayPromise);                                                                         // 430
      }                                                                                                                // 431
      _refreshDelayPromise = $timeout(function() {                                                                     // 432
        $scope.$eval(refreshAttr);                                                                                     // 433
      }, ctrl.refreshDelay);                                                                                           // 434
    }                                                                                                                  // 435
  };                                                                                                                   // 436
                                                                                                                       // 437
  ctrl.setActiveItem = function(item) {                                                                                // 438
    ctrl.activeIndex = ctrl.items.indexOf(item);                                                                       // 439
  };                                                                                                                   // 440
                                                                                                                       // 441
  ctrl.isActive = function(itemScope) {                                                                                // 442
    if ( !ctrl.open ) {                                                                                                // 443
      return false;                                                                                                    // 444
    }                                                                                                                  // 445
    var itemIndex = ctrl.items.indexOf(itemScope[ctrl.itemProperty]);                                                  // 446
    var isActive =  itemIndex === ctrl.activeIndex;                                                                    // 447
                                                                                                                       // 448
    if ( !isActive || ( itemIndex < 0 && ctrl.taggingLabel !== false ) ||( itemIndex < 0 && ctrl.taggingLabel === false) ) {
      return false;                                                                                                    // 450
    }                                                                                                                  // 451
                                                                                                                       // 452
    if (isActive && !angular.isUndefined(ctrl.onHighlightCallback)) {                                                  // 453
      itemScope.$eval(ctrl.onHighlightCallback);                                                                       // 454
    }                                                                                                                  // 455
                                                                                                                       // 456
    return isActive;                                                                                                   // 457
  };                                                                                                                   // 458
                                                                                                                       // 459
  ctrl.isDisabled = function(itemScope) {                                                                              // 460
                                                                                                                       // 461
    if (!ctrl.open) return;                                                                                            // 462
                                                                                                                       // 463
    var itemIndex = ctrl.items.indexOf(itemScope[ctrl.itemProperty]);                                                  // 464
    var isDisabled = false;                                                                                            // 465
    var item;                                                                                                          // 466
                                                                                                                       // 467
    if (itemIndex >= 0 && !angular.isUndefined(ctrl.disableChoiceExpression)) {                                        // 468
      item = ctrl.items[itemIndex];                                                                                    // 469
      isDisabled = !!(itemScope.$eval(ctrl.disableChoiceExpression)); // force the boolean value                       // 470
      item._uiSelectChoiceDisabled = isDisabled; // store this for later reference                                     // 471
    }                                                                                                                  // 472
                                                                                                                       // 473
    return isDisabled;                                                                                                 // 474
  };                                                                                                                   // 475
                                                                                                                       // 476
                                                                                                                       // 477
  // When the user selects an item with ENTER or clicks the dropdown                                                   // 478
  ctrl.select = function(item, skipFocusser, $event) {                                                                 // 479
    if (item === undefined || !item._uiSelectChoiceDisabled) {                                                         // 480
                                                                                                                       // 481
      if ( ! ctrl.items && ! ctrl.search ) return;                                                                     // 482
                                                                                                                       // 483
      if (!item || !item._uiSelectChoiceDisabled) {                                                                    // 484
        if(ctrl.tagging.isActivated) {                                                                                 // 485
          // if taggingLabel is disabled, we pull from ctrl.search val                                                 // 486
          if ( ctrl.taggingLabel === false ) {                                                                         // 487
            if ( ctrl.activeIndex < 0 ) {                                                                              // 488
              item = ctrl.tagging.fct !== undefined ? ctrl.tagging.fct(ctrl.search) : ctrl.search;                     // 489
              if (!item || angular.equals( ctrl.items[0], item ) ) {                                                   // 490
                return;                                                                                                // 491
              }                                                                                                        // 492
            } else {                                                                                                   // 493
              // keyboard nav happened first, user selected from dropdown                                              // 494
              item = ctrl.items[ctrl.activeIndex];                                                                     // 495
            }                                                                                                          // 496
          } else {                                                                                                     // 497
            // tagging always operates at index zero, taggingLabel === false pushes                                    // 498
            // the ctrl.search value without having it injected                                                        // 499
            if ( ctrl.activeIndex === 0 ) {                                                                            // 500
              // ctrl.tagging pushes items to ctrl.items, so we only have empty val                                    // 501
              // for `item` if it is a detected duplicate                                                              // 502
              if ( item === undefined ) return;                                                                        // 503
                                                                                                                       // 504
              // create new item on the fly if we don't already have one;                                              // 505
              // use tagging function if we have one                                                                   // 506
              if ( ctrl.tagging.fct !== undefined && typeof item === 'string' ) {                                      // 507
                item = ctrl.tagging.fct(ctrl.search);                                                                  // 508
                if (!item) return;                                                                                     // 509
              // if item type is 'string', apply the tagging label                                                     // 510
              } else if ( typeof item === 'string' ) {                                                                 // 511
                // trim the trailing space                                                                             // 512
                item = item.replace(ctrl.taggingLabel,'').trim();                                                      // 513
              }                                                                                                        // 514
            }                                                                                                          // 515
          }                                                                                                            // 516
          // search ctrl.selected for dupes potentially caused by tagging and return early if found                    // 517
          if ( ctrl.selected && angular.isArray(ctrl.selected) && ctrl.selected.filter( function (selection) { return angular.equals(selection, item); }).length > 0 ) {
            ctrl.close(skipFocusser);                                                                                  // 519
            return;                                                                                                    // 520
          }                                                                                                            // 521
        }                                                                                                              // 522
                                                                                                                       // 523
        $scope.$broadcast('uis:select', item);                                                                         // 524
                                                                                                                       // 525
        var locals = {};                                                                                               // 526
        locals[ctrl.parserResult.itemName] = item;                                                                     // 527
                                                                                                                       // 528
        $timeout(function(){                                                                                           // 529
          ctrl.onSelectCallback($scope, {                                                                              // 530
            $item: item,                                                                                               // 531
            $model: ctrl.parserResult.modelMapper($scope, locals)                                                      // 532
          });                                                                                                          // 533
        });                                                                                                            // 534
                                                                                                                       // 535
        if (ctrl.closeOnSelect) {                                                                                      // 536
          ctrl.close(skipFocusser);                                                                                    // 537
        }                                                                                                              // 538
        if ($event && $event.type === 'click') {                                                                       // 539
          ctrl.clickTriggeredSelect = true;                                                                            // 540
        }                                                                                                              // 541
      }                                                                                                                // 542
    }                                                                                                                  // 543
  };                                                                                                                   // 544
                                                                                                                       // 545
  // Closes the dropdown                                                                                               // 546
  ctrl.close = function(skipFocusser) {                                                                                // 547
    if (!ctrl.open) return;                                                                                            // 548
    if (ctrl.ngModel && ctrl.ngModel.$setTouched) ctrl.ngModel.$setTouched();                                          // 549
    _resetSearchInput();                                                                                               // 550
    ctrl.open = false;                                                                                                 // 551
                                                                                                                       // 552
    $scope.$broadcast('uis:close', skipFocusser);                                                                      // 553
                                                                                                                       // 554
  };                                                                                                                   // 555
                                                                                                                       // 556
  ctrl.setFocus = function(){                                                                                          // 557
    if (!ctrl.focus) ctrl.focusInput[0].focus();                                                                       // 558
  };                                                                                                                   // 559
                                                                                                                       // 560
  ctrl.clear = function($event) {                                                                                      // 561
    ctrl.select(undefined);                                                                                            // 562
    $event.stopPropagation();                                                                                          // 563
    $timeout(function() {                                                                                              // 564
      ctrl.focusser[0].focus();                                                                                        // 565
    }, 0, false);                                                                                                      // 566
  };                                                                                                                   // 567
                                                                                                                       // 568
  // Toggle dropdown                                                                                                   // 569
  ctrl.toggle = function(e) {                                                                                          // 570
    if (ctrl.open) {                                                                                                   // 571
      ctrl.close();                                                                                                    // 572
      e.preventDefault();                                                                                              // 573
      e.stopPropagation();                                                                                             // 574
    } else {                                                                                                           // 575
      ctrl.activate();                                                                                                 // 576
    }                                                                                                                  // 577
  };                                                                                                                   // 578
                                                                                                                       // 579
  ctrl.isLocked = function(itemScope, itemIndex) {                                                                     // 580
      var isLocked, item = ctrl.selected[itemIndex];                                                                   // 581
                                                                                                                       // 582
      if (item && !angular.isUndefined(ctrl.lockChoiceExpression)) {                                                   // 583
          isLocked = !!(itemScope.$eval(ctrl.lockChoiceExpression)); // force the boolean value                        // 584
          item._uiSelectChoiceLocked = isLocked; // store this for later reference                                     // 585
      }                                                                                                                // 586
                                                                                                                       // 587
      return isLocked;                                                                                                 // 588
  };                                                                                                                   // 589
                                                                                                                       // 590
  var sizeWatch = null;                                                                                                // 591
  ctrl.sizeSearchInput = function() {                                                                                  // 592
                                                                                                                       // 593
    var input = ctrl.searchInput[0],                                                                                   // 594
        container = ctrl.searchInput.parent().parent()[0],                                                             // 595
        calculateContainerWidth = function() {                                                                         // 596
          // Return the container width only if the search input is visible                                            // 597
          return container.clientWidth * !!input.offsetParent;                                                         // 598
        },                                                                                                             // 599
        updateIfVisible = function(containerWidth) {                                                                   // 600
          if (containerWidth === 0) {                                                                                  // 601
            return false;                                                                                              // 602
          }                                                                                                            // 603
          var inputWidth = containerWidth - input.offsetLeft - 10;                                                     // 604
          if (inputWidth < 50) inputWidth = containerWidth;                                                            // 605
          ctrl.searchInput.css('width', inputWidth+'px');                                                              // 606
          return true;                                                                                                 // 607
        };                                                                                                             // 608
                                                                                                                       // 609
    ctrl.searchInput.css('width', '10px');                                                                             // 610
    $timeout(function() { //Give tags time to render correctly                                                         // 611
      if (sizeWatch === null && !updateIfVisible(calculateContainerWidth())) {                                         // 612
        sizeWatch = $scope.$watch(calculateContainerWidth, function(containerWidth) {                                  // 613
          if (updateIfVisible(containerWidth)) {                                                                       // 614
            sizeWatch();                                                                                               // 615
            sizeWatch = null;                                                                                          // 616
          }                                                                                                            // 617
        });                                                                                                            // 618
      }                                                                                                                // 619
    });                                                                                                                // 620
  };                                                                                                                   // 621
                                                                                                                       // 622
  function _handleDropDownSelection(key) {                                                                             // 623
    var processed = true;                                                                                              // 624
    switch (key) {                                                                                                     // 625
      case KEY.DOWN:                                                                                                   // 626
        if (!ctrl.open && ctrl.multiple) ctrl.activate(false, true); //In case its the search input in 'multiple' mode // 627
        else if (ctrl.activeIndex < ctrl.items.length - 1) { ctrl.activeIndex++; }                                     // 628
        break;                                                                                                         // 629
      case KEY.UP:                                                                                                     // 630
        if (!ctrl.open && ctrl.multiple) ctrl.activate(false, true); //In case its the search input in 'multiple' mode // 631
        else if (ctrl.activeIndex > 0 || (ctrl.search.length === 0 && ctrl.tagging.isActivated && ctrl.activeIndex > -1)) { ctrl.activeIndex--; }
        break;                                                                                                         // 633
      case KEY.TAB:                                                                                                    // 634
        if (!ctrl.multiple || ctrl.open) ctrl.select(ctrl.items[ctrl.activeIndex], true);                              // 635
        break;                                                                                                         // 636
      case KEY.ENTER:                                                                                                  // 637
        if(ctrl.open && (ctrl.tagging.isActivated || ctrl.activeIndex >= 0)){                                          // 638
          ctrl.select(ctrl.items[ctrl.activeIndex]); // Make sure at least one dropdown item is highlighted before adding if not in tagging mode
        } else {                                                                                                       // 640
          ctrl.activate(false, true); //In case its the search input in 'multiple' mode                                // 641
        }                                                                                                              // 642
        break;                                                                                                         // 643
      case KEY.ESC:                                                                                                    // 644
        ctrl.close();                                                                                                  // 645
        break;                                                                                                         // 646
      default:                                                                                                         // 647
        processed = false;                                                                                             // 648
    }                                                                                                                  // 649
    return processed;                                                                                                  // 650
  }                                                                                                                    // 651
                                                                                                                       // 652
  // Bind to keyboard shortcuts                                                                                        // 653
  ctrl.searchInput.on('keydown', function(e) {                                                                         // 654
                                                                                                                       // 655
    var key = e.which;                                                                                                 // 656
                                                                                                                       // 657
    // if(~[KEY.ESC,KEY.TAB].indexOf(key)){                                                                            // 658
    //   //TODO: SEGURO?                                                                                               // 659
    //   ctrl.close();                                                                                                 // 660
    // }                                                                                                               // 661
                                                                                                                       // 662
    $scope.$apply(function() {                                                                                         // 663
                                                                                                                       // 664
      var tagged = false;                                                                                              // 665
                                                                                                                       // 666
      if (ctrl.items.length > 0 || ctrl.tagging.isActivated) {                                                         // 667
        _handleDropDownSelection(key);                                                                                 // 668
        if ( ctrl.taggingTokens.isActivated ) {                                                                        // 669
          for (var i = 0; i < ctrl.taggingTokens.tokens.length; i++) {                                                 // 670
            if ( ctrl.taggingTokens.tokens[i] === KEY.MAP[e.keyCode] ) {                                               // 671
              // make sure there is a new value to push via tagging                                                    // 672
              if ( ctrl.search.length > 0 ) {                                                                          // 673
                tagged = true;                                                                                         // 674
              }                                                                                                        // 675
            }                                                                                                          // 676
          }                                                                                                            // 677
          if ( tagged ) {                                                                                              // 678
            $timeout(function() {                                                                                      // 679
              ctrl.searchInput.triggerHandler('tagged');                                                               // 680
              var newItem = ctrl.search.replace(KEY.MAP[e.keyCode],'').trim();                                         // 681
              if ( ctrl.tagging.fct ) {                                                                                // 682
                newItem = ctrl.tagging.fct( newItem );                                                                 // 683
              }                                                                                                        // 684
              if (newItem) ctrl.select(newItem, true);                                                                 // 685
            });                                                                                                        // 686
          }                                                                                                            // 687
        }                                                                                                              // 688
      }                                                                                                                // 689
                                                                                                                       // 690
    });                                                                                                                // 691
                                                                                                                       // 692
    if(KEY.isVerticalMovement(key) && ctrl.items.length > 0){                                                          // 693
      _ensureHighlightVisible();                                                                                       // 694
    }                                                                                                                  // 695
                                                                                                                       // 696
    if (key === KEY.ENTER || key === KEY.ESC) {                                                                        // 697
      e.preventDefault();                                                                                              // 698
      e.stopPropagation();                                                                                             // 699
    }                                                                                                                  // 700
                                                                                                                       // 701
  });                                                                                                                  // 702
                                                                                                                       // 703
  // If tagging try to split by tokens and add items                                                                   // 704
  ctrl.searchInput.on('paste', function (e) {                                                                          // 705
    var data = e.originalEvent.clipboardData.getData('text/plain');                                                    // 706
    if (data && data.length > 0 && ctrl.taggingTokens.isActivated && ctrl.tagging.fct) {                               // 707
      var items = data.split(ctrl.taggingTokens.tokens[0]); // split by first token only                               // 708
      if (items && items.length > 0) {                                                                                 // 709
        angular.forEach(items, function (item) {                                                                       // 710
          var newItem = ctrl.tagging.fct(item);                                                                        // 711
          if (newItem) {                                                                                               // 712
            ctrl.select(newItem, true);                                                                                // 713
          }                                                                                                            // 714
        });                                                                                                            // 715
        e.preventDefault();                                                                                            // 716
        e.stopPropagation();                                                                                           // 717
      }                                                                                                                // 718
    }                                                                                                                  // 719
  });                                                                                                                  // 720
                                                                                                                       // 721
  ctrl.searchInput.on('tagged', function() {                                                                           // 722
    $timeout(function() {                                                                                              // 723
      _resetSearchInput();                                                                                             // 724
    });                                                                                                                // 725
  });                                                                                                                  // 726
                                                                                                                       // 727
  // See https://github.com/ivaynberg/select2/blob/3.4.6/select2.js#L1431                                              // 728
  function _ensureHighlightVisible() {                                                                                 // 729
    var container = $element.querySelectorAll('.ui-select-choices-content');                                           // 730
    var choices = container.querySelectorAll('.ui-select-choices-row');                                                // 731
    if (choices.length < 1) {                                                                                          // 732
      throw uiSelectMinErr('choices', "Expected multiple .ui-select-choices-row but got '{0}'.", choices.length);      // 733
    }                                                                                                                  // 734
                                                                                                                       // 735
    if (ctrl.activeIndex < 0) {                                                                                        // 736
      return;                                                                                                          // 737
    }                                                                                                                  // 738
                                                                                                                       // 739
    var highlighted = choices[ctrl.activeIndex];                                                                       // 740
    var posY = highlighted.offsetTop + highlighted.clientHeight - container[0].scrollTop;                              // 741
    var height = container[0].offsetHeight;                                                                            // 742
                                                                                                                       // 743
    if (posY > height) {                                                                                               // 744
      container[0].scrollTop += posY - height;                                                                         // 745
    } else if (posY < highlighted.clientHeight) {                                                                      // 746
      if (ctrl.isGrouped && ctrl.activeIndex === 0)                                                                    // 747
        container[0].scrollTop = 0; //To make group header visible when going all the way up                           // 748
      else                                                                                                             // 749
        container[0].scrollTop -= highlighted.clientHeight - posY;                                                     // 750
    }                                                                                                                  // 751
  }                                                                                                                    // 752
                                                                                                                       // 753
  $scope.$on('$destroy', function() {                                                                                  // 754
    ctrl.searchInput.off('keyup keydown tagged blur paste');                                                           // 755
  });                                                                                                                  // 756
                                                                                                                       // 757
}]);                                                                                                                   // 758
                                                                                                                       // 759
uis.directive('uiSelect',                                                                                              // 760
  ['$document', 'uiSelectConfig', 'uiSelectMinErr', 'uisOffset', '$compile', '$parse', '$timeout',                     // 761
  function($document, uiSelectConfig, uiSelectMinErr, uisOffset, $compile, $parse, $timeout) {                         // 762
                                                                                                                       // 763
  return {                                                                                                             // 764
    restrict: 'EA',                                                                                                    // 765
    templateUrl: function(tElement, tAttrs) {                                                                          // 766
      var theme = tAttrs.theme || uiSelectConfig.theme;                                                                // 767
      return theme + (angular.isDefined(tAttrs.multiple) ? '/select-multiple.tpl.html' : '/select.tpl.html');          // 768
    },                                                                                                                 // 769
    replace: true,                                                                                                     // 770
    transclude: true,                                                                                                  // 771
    require: ['uiSelect', '^ngModel'],                                                                                 // 772
    scope: true,                                                                                                       // 773
                                                                                                                       // 774
    controller: 'uiSelectCtrl',                                                                                        // 775
    controllerAs: '$select',                                                                                           // 776
    compile: function(tElement, tAttrs) {                                                                              // 777
                                                                                                                       // 778
      //Multiple or Single depending if multiple attribute presence                                                    // 779
      if (angular.isDefined(tAttrs.multiple))                                                                          // 780
        tElement.append("<ui-select-multiple/>").removeAttr('multiple');                                               // 781
      else                                                                                                             // 782
        tElement.append("<ui-select-single/>");                                                                        // 783
                                                                                                                       // 784
      return function(scope, element, attrs, ctrls, transcludeFn) {                                                    // 785
                                                                                                                       // 786
        var $select = ctrls[0];                                                                                        // 787
        var ngModel = ctrls[1];                                                                                        // 788
                                                                                                                       // 789
        $select.generatedId = uiSelectConfig.generateId();                                                             // 790
        $select.baseTitle = attrs.title || 'Select box';                                                               // 791
        $select.focusserTitle = $select.baseTitle + ' focus';                                                          // 792
        $select.focusserId = 'focusser-' + $select.generatedId;                                                        // 793
                                                                                                                       // 794
        $select.closeOnSelect = function() {                                                                           // 795
          if (angular.isDefined(attrs.closeOnSelect)) {                                                                // 796
            return $parse(attrs.closeOnSelect)();                                                                      // 797
          } else {                                                                                                     // 798
            return uiSelectConfig.closeOnSelect;                                                                       // 799
          }                                                                                                            // 800
        }();                                                                                                           // 801
                                                                                                                       // 802
        $select.onSelectCallback = $parse(attrs.onSelect);                                                             // 803
        $select.onRemoveCallback = $parse(attrs.onRemove);                                                             // 804
                                                                                                                       // 805
        //Set reference to ngModel from uiSelectCtrl                                                                   // 806
        $select.ngModel = ngModel;                                                                                     // 807
                                                                                                                       // 808
        $select.choiceGrouped = function(group){                                                                       // 809
          return $select.isGrouped && group && group.name;                                                             // 810
        };                                                                                                             // 811
                                                                                                                       // 812
        if(attrs.tabindex){                                                                                            // 813
          attrs.$observe('tabindex', function(value) {                                                                 // 814
            $select.focusInput.attr("tabindex", value);                                                                // 815
            element.removeAttr("tabindex");                                                                            // 816
          });                                                                                                          // 817
        }                                                                                                              // 818
                                                                                                                       // 819
        scope.$watch('searchEnabled', function() {                                                                     // 820
            var searchEnabled = scope.$eval(attrs.searchEnabled);                                                      // 821
            $select.searchEnabled = searchEnabled !== undefined ? searchEnabled : uiSelectConfig.searchEnabled;        // 822
        });                                                                                                            // 823
                                                                                                                       // 824
        scope.$watch('sortable', function() {                                                                          // 825
            var sortable = scope.$eval(attrs.sortable);                                                                // 826
            $select.sortable = sortable !== undefined ? sortable : uiSelectConfig.sortable;                            // 827
        });                                                                                                            // 828
                                                                                                                       // 829
        attrs.$observe('disabled', function() {                                                                        // 830
          // No need to use $eval() (thanks to ng-disabled) since we already get a boolean instead of a string         // 831
          $select.disabled = attrs.disabled !== undefined ? attrs.disabled : false;                                    // 832
        });                                                                                                            // 833
                                                                                                                       // 834
        attrs.$observe('resetSearchInput', function() {                                                                // 835
          // $eval() is needed otherwise we get a string instead of a boolean                                          // 836
          var resetSearchInput = scope.$eval(attrs.resetSearchInput);                                                  // 837
          $select.resetSearchInput = resetSearchInput !== undefined ? resetSearchInput : true;                         // 838
        });                                                                                                            // 839
                                                                                                                       // 840
        attrs.$observe('tagging', function() {                                                                         // 841
          if(attrs.tagging !== undefined)                                                                              // 842
          {                                                                                                            // 843
            // $eval() is needed otherwise we get a string instead of a boolean                                        // 844
            var taggingEval = scope.$eval(attrs.tagging);                                                              // 845
            $select.tagging = {isActivated: true, fct: taggingEval !== true ? taggingEval : undefined};                // 846
          }                                                                                                            // 847
          else                                                                                                         // 848
          {                                                                                                            // 849
            $select.tagging = {isActivated: false, fct: undefined};                                                    // 850
          }                                                                                                            // 851
        });                                                                                                            // 852
                                                                                                                       // 853
        attrs.$observe('taggingLabel', function() {                                                                    // 854
          if(attrs.tagging !== undefined )                                                                             // 855
          {                                                                                                            // 856
            // check eval for FALSE, in this case, we disable the labels                                               // 857
            // associated with tagging                                                                                 // 858
            if ( attrs.taggingLabel === 'false' ) {                                                                    // 859
              $select.taggingLabel = false;                                                                            // 860
            }                                                                                                          // 861
            else                                                                                                       // 862
            {                                                                                                          // 863
              $select.taggingLabel = attrs.taggingLabel !== undefined ? attrs.taggingLabel : '(new)';                  // 864
            }                                                                                                          // 865
          }                                                                                                            // 866
        });                                                                                                            // 867
                                                                                                                       // 868
        attrs.$observe('taggingTokens', function() {                                                                   // 869
          if (attrs.tagging !== undefined) {                                                                           // 870
            var tokens = attrs.taggingTokens !== undefined ? attrs.taggingTokens.split('|') : [',','ENTER'];           // 871
            $select.taggingTokens = {isActivated: true, tokens: tokens };                                              // 872
          }                                                                                                            // 873
        });                                                                                                            // 874
                                                                                                                       // 875
        //Automatically gets focus when loaded                                                                         // 876
        if (angular.isDefined(attrs.autofocus)){                                                                       // 877
          $timeout(function(){                                                                                         // 878
            $select.setFocus();                                                                                        // 879
          });                                                                                                          // 880
        }                                                                                                              // 881
                                                                                                                       // 882
        //Gets focus based on scope event name (e.g. focus-on='SomeEventName')                                         // 883
        if (angular.isDefined(attrs.focusOn)){                                                                         // 884
          scope.$on(attrs.focusOn, function() {                                                                        // 885
              $timeout(function(){                                                                                     // 886
                $select.setFocus();                                                                                    // 887
              });                                                                                                      // 888
          });                                                                                                          // 889
        }                                                                                                              // 890
                                                                                                                       // 891
        function onDocumentClick(e) {                                                                                  // 892
          if (!$select.open) return; //Skip it if dropdown is close                                                    // 893
                                                                                                                       // 894
          var contains = false;                                                                                        // 895
                                                                                                                       // 896
          if (window.jQuery) {                                                                                         // 897
            // Firefox 3.6 does not support element.contains()                                                         // 898
            // See Node.contains https://developer.mozilla.org/en-US/docs/Web/API/Node.contains                        // 899
            contains = window.jQuery.contains(element[0], e.target);                                                   // 900
          } else {                                                                                                     // 901
            contains = element[0].contains(e.target);                                                                  // 902
          }                                                                                                            // 903
                                                                                                                       // 904
          if (!contains && !$select.clickTriggeredSelect) {                                                            // 905
            //Will lose focus only with certain targets                                                                // 906
            var focusableControls = ['input','button','textarea'];                                                     // 907
            var targetScope = angular.element(e.target).scope(); //To check if target is other ui-select               // 908
            var skipFocusser = targetScope && targetScope.$select && targetScope.$select !== $select; //To check if target is other ui-select
            if (!skipFocusser) skipFocusser =  ~focusableControls.indexOf(e.target.tagName.toLowerCase()); //Check if target is input, button or textarea
            $select.close(skipFocusser);                                                                               // 911
            scope.$digest();                                                                                           // 912
          }                                                                                                            // 913
          $select.clickTriggeredSelect = false;                                                                        // 914
        }                                                                                                              // 915
                                                                                                                       // 916
        // See Click everywhere but here event http://stackoverflow.com/questions/12931369                             // 917
        $document.on('click', onDocumentClick);                                                                        // 918
                                                                                                                       // 919
        scope.$on('$destroy', function() {                                                                             // 920
          $document.off('click', onDocumentClick);                                                                     // 921
        });                                                                                                            // 922
                                                                                                                       // 923
        // Move transcluded elements to their correct position in main template                                        // 924
        transcludeFn(scope, function(clone) {                                                                          // 925
          // See Transclude in AngularJS http://blog.omkarpatil.com/2012/11/transclude-in-angularjs.html               // 926
                                                                                                                       // 927
          // One day jqLite will be replaced by jQuery and we will be able to write:                                   // 928
          // var transcludedElement = clone.filter('.my-class')                                                        // 929
          // instead of creating a hackish DOM element:                                                                // 930
          var transcluded = angular.element('<div>').append(clone);                                                    // 931
                                                                                                                       // 932
          var transcludedMatch = transcluded.querySelectorAll('.ui-select-match');                                     // 933
          transcludedMatch.removeAttr('ui-select-match'); //To avoid loop in case directive as attr                    // 934
          transcludedMatch.removeAttr('data-ui-select-match'); // Properly handle HTML5 data-attributes                // 935
          if (transcludedMatch.length !== 1) {                                                                         // 936
            throw uiSelectMinErr('transcluded', "Expected 1 .ui-select-match but got '{0}'.", transcludedMatch.length);
          }                                                                                                            // 938
          element.querySelectorAll('.ui-select-match').replaceWith(transcludedMatch);                                  // 939
                                                                                                                       // 940
          var transcludedChoices = transcluded.querySelectorAll('.ui-select-choices');                                 // 941
          transcludedChoices.removeAttr('ui-select-choices'); //To avoid loop in case directive as attr                // 942
          transcludedChoices.removeAttr('data-ui-select-choices'); // Properly handle HTML5 data-attributes            // 943
          if (transcludedChoices.length !== 1) {                                                                       // 944
            throw uiSelectMinErr('transcluded', "Expected 1 .ui-select-choices but got '{0}'.", transcludedChoices.length);
          }                                                                                                            // 946
          element.querySelectorAll('.ui-select-choices').replaceWith(transcludedChoices);                              // 947
        });                                                                                                            // 948
                                                                                                                       // 949
        // Support for appending the select field to the body when its open                                            // 950
        var appendToBody = scope.$eval(attrs.appendToBody);                                                            // 951
        if (appendToBody !== undefined ? appendToBody : uiSelectConfig.appendToBody) {                                 // 952
          scope.$watch('$select.open', function(isOpen) {                                                              // 953
            if (isOpen) {                                                                                              // 954
              positionDropdown();                                                                                      // 955
            } else {                                                                                                   // 956
              resetDropdown();                                                                                         // 957
            }                                                                                                          // 958
          });                                                                                                          // 959
                                                                                                                       // 960
          // Move the dropdown back to its original location when the scope is destroyed. Otherwise                    // 961
          // it might stick around when the user routes away or the select field is otherwise removed                  // 962
          scope.$on('$destroy', function() {                                                                           // 963
            resetDropdown();                                                                                           // 964
          });                                                                                                          // 965
        }                                                                                                              // 966
                                                                                                                       // 967
        // Hold on to a reference to the .ui-select-container element for appendToBody support                         // 968
        var placeholder = null,                                                                                        // 969
            originalWidth = '';                                                                                        // 970
                                                                                                                       // 971
        function positionDropdown() {                                                                                  // 972
          // Remember the absolute position of the element                                                             // 973
          var offset = uisOffset(element);                                                                             // 974
                                                                                                                       // 975
          // Clone the element into a placeholder element to take its original place in the DOM                        // 976
          placeholder = angular.element('<div class="ui-select-placeholder"></div>');                                  // 977
          placeholder[0].style.width = offset.width + 'px';                                                            // 978
          placeholder[0].style.height = offset.height + 'px';                                                          // 979
          element.after(placeholder);                                                                                  // 980
                                                                                                                       // 981
          // Remember the original value of the element width inline style, so it can be restored                      // 982
          // when the dropdown is closed                                                                               // 983
          originalWidth = element[0].style.width;                                                                      // 984
                                                                                                                       // 985
          // Now move the actual dropdown element to the end of the body                                               // 986
          $document.find('body').append(element);                                                                      // 987
                                                                                                                       // 988
          element[0].style.position = 'absolute';                                                                      // 989
          element[0].style.left = offset.left + 'px';                                                                  // 990
          element[0].style.top = offset.top + 'px';                                                                    // 991
          element[0].style.width = offset.width + 'px';                                                                // 992
        }                                                                                                              // 993
                                                                                                                       // 994
        function resetDropdown() {                                                                                     // 995
          if (placeholder === null) {                                                                                  // 996
            // The dropdown has not actually been display yet, so there's nothing to reset                             // 997
            return;                                                                                                    // 998
          }                                                                                                            // 999
                                                                                                                       // 1000
          // Move the dropdown element back to its original location in the DOM                                        // 1001
          placeholder.replaceWith(element);                                                                            // 1002
          placeholder = null;                                                                                          // 1003
                                                                                                                       // 1004
          element[0].style.position = '';                                                                              // 1005
          element[0].style.left = '';                                                                                  // 1006
          element[0].style.top = '';                                                                                   // 1007
          element[0].style.width = originalWidth;                                                                      // 1008
        }                                                                                                              // 1009
                                                                                                                       // 1010
        // Hold on to a reference to the .ui-select-dropdown element for direction support.                            // 1011
        var dropdown = null,                                                                                           // 1012
            directionUpClassName = 'direction-up';                                                                     // 1013
                                                                                                                       // 1014
        // Support changing the direction of the dropdown if there isn't enough space to render it.                    // 1015
        scope.$watch('$select.open', function(isOpen) {                                                                // 1016
          if (isOpen) {                                                                                                // 1017
            dropdown = angular.element(element).querySelectorAll('.ui-select-dropdown');                               // 1018
            if (dropdown === null) {                                                                                   // 1019
              return;                                                                                                  // 1020
            }                                                                                                          // 1021
                                                                                                                       // 1022
            // Hide the dropdown so there is no flicker until $timeout is done executing.                              // 1023
            dropdown[0].style.visibility = 'hidden';                                                                   // 1024
                                                                                                                       // 1025
            // Delay positioning the dropdown until all choices have been added so its height is correct.              // 1026
            $timeout(function(){                                                                                       // 1027
              var offset = uisOffset(element);                                                                         // 1028
              var offsetDropdown = uisOffset(dropdown);                                                                // 1029
                                                                                                                       // 1030
              // Determine if the direction of the dropdown needs to be changed.                                       // 1031
              if (offset.top + offset.height + offsetDropdown.height > $document[0].documentElement.scrollTop + $document[0].documentElement.clientHeight) {
                dropdown[0].style.position = 'absolute';                                                               // 1033
                dropdown[0].style.top = (offsetDropdown.height * -1) + 'px';                                           // 1034
                element.addClass(directionUpClassName);                                                                // 1035
              }                                                                                                        // 1036
                                                                                                                       // 1037
              // Display the dropdown once it has been positioned.                                                     // 1038
              dropdown[0].style.visibility = '';                                                                       // 1039
            });                                                                                                        // 1040
          } else {                                                                                                     // 1041
              if (dropdown === null) {                                                                                 // 1042
                return;                                                                                                // 1043
              }                                                                                                        // 1044
                                                                                                                       // 1045
              // Reset the position of the dropdown.                                                                   // 1046
              dropdown[0].style.position = '';                                                                         // 1047
              dropdown[0].style.top = '';                                                                              // 1048
              element.removeClass(directionUpClassName);                                                               // 1049
          }                                                                                                            // 1050
        });                                                                                                            // 1051
      };                                                                                                               // 1052
    }                                                                                                                  // 1053
  };                                                                                                                   // 1054
}]);                                                                                                                   // 1055
                                                                                                                       // 1056
uis.directive('uiSelectMatch', ['uiSelectConfig', function(uiSelectConfig) {                                           // 1057
  return {                                                                                                             // 1058
    restrict: 'EA',                                                                                                    // 1059
    require: '^uiSelect',                                                                                              // 1060
    replace: true,                                                                                                     // 1061
    transclude: true,                                                                                                  // 1062
    templateUrl: function(tElement) {                                                                                  // 1063
      // Gets theme attribute from parent (ui-select)                                                                  // 1064
      var theme = tElement.parent().attr('theme') || uiSelectConfig.theme;                                             // 1065
      var multi = tElement.parent().attr('multiple');                                                                  // 1066
      return theme + (multi ? '/match-multiple.tpl.html' : '/match.tpl.html');                                         // 1067
    },                                                                                                                 // 1068
    link: function(scope, element, attrs, $select) {                                                                   // 1069
      $select.lockChoiceExpression = attrs.uiLockChoice;                                                               // 1070
      attrs.$observe('placeholder', function(placeholder) {                                                            // 1071
        $select.placeholder = placeholder !== undefined ? placeholder : uiSelectConfig.placeholder;                    // 1072
      });                                                                                                              // 1073
                                                                                                                       // 1074
      function setAllowClear(allow) {                                                                                  // 1075
        $select.allowClear = (angular.isDefined(allow)) ? (allow === '') ? true : (allow.toLowerCase() === 'true') : false;
      }                                                                                                                // 1077
                                                                                                                       // 1078
      attrs.$observe('allowClear', setAllowClear);                                                                     // 1079
      setAllowClear(attrs.allowClear);                                                                                 // 1080
                                                                                                                       // 1081
      if($select.multiple){                                                                                            // 1082
        $select.sizeSearchInput();                                                                                     // 1083
      }                                                                                                                // 1084
                                                                                                                       // 1085
    }                                                                                                                  // 1086
  };                                                                                                                   // 1087
}]);                                                                                                                   // 1088
                                                                                                                       // 1089
uis.directive('uiSelectMultiple', ['uiSelectMinErr','$timeout', function(uiSelectMinErr, $timeout) {                   // 1090
  return {                                                                                                             // 1091
    restrict: 'EA',                                                                                                    // 1092
    require: ['^uiSelect', '^ngModel'],                                                                                // 1093
                                                                                                                       // 1094
    controller: ['$scope','$timeout', function($scope, $timeout){                                                      // 1095
                                                                                                                       // 1096
      var ctrl = this,                                                                                                 // 1097
          $select = $scope.$select,                                                                                    // 1098
          ngModel;                                                                                                     // 1099
                                                                                                                       // 1100
      //Wait for link fn to inject it                                                                                  // 1101
      $scope.$evalAsync(function(){ ngModel = $scope.ngModel; });                                                      // 1102
                                                                                                                       // 1103
      ctrl.activeMatchIndex = -1;                                                                                      // 1104
                                                                                                                       // 1105
      ctrl.updateModel = function(){                                                                                   // 1106
        ngModel.$setViewValue(Date.now()); //Set timestamp as a unique string to force changes                         // 1107
        ctrl.refreshComponent();                                                                                       // 1108
      };                                                                                                               // 1109
                                                                                                                       // 1110
      ctrl.refreshComponent = function(){                                                                              // 1111
        //Remove already selected items                                                                                // 1112
        //e.g. When user clicks on a selection, the selected array changes and                                         // 1113
        //the dropdown should remove that item                                                                         // 1114
        $select.refreshItems();                                                                                        // 1115
        $select.sizeSearchInput();                                                                                     // 1116
      };                                                                                                               // 1117
                                                                                                                       // 1118
      // Remove item from multiple select                                                                              // 1119
      ctrl.removeChoice = function(index){                                                                             // 1120
                                                                                                                       // 1121
        var removedChoice = $select.selected[index];                                                                   // 1122
                                                                                                                       // 1123
        // if the choice is locked, can't remove it                                                                    // 1124
        if(removedChoice._uiSelectChoiceLocked) return;                                                                // 1125
                                                                                                                       // 1126
        var locals = {};                                                                                               // 1127
        locals[$select.parserResult.itemName] = removedChoice;                                                         // 1128
                                                                                                                       // 1129
        $select.selected.splice(index, 1);                                                                             // 1130
        ctrl.activeMatchIndex = -1;                                                                                    // 1131
        $select.sizeSearchInput();                                                                                     // 1132
                                                                                                                       // 1133
        // Give some time for scope propagation.                                                                       // 1134
        $timeout(function(){                                                                                           // 1135
          $select.onRemoveCallback($scope, {                                                                           // 1136
            $item: removedChoice,                                                                                      // 1137
            $model: $select.parserResult.modelMapper($scope, locals)                                                   // 1138
          });                                                                                                          // 1139
        });                                                                                                            // 1140
                                                                                                                       // 1141
        ctrl.updateModel();                                                                                            // 1142
                                                                                                                       // 1143
      };                                                                                                               // 1144
                                                                                                                       // 1145
      ctrl.getPlaceholder = function(){                                                                                // 1146
        //Refactor single?                                                                                             // 1147
        if($select.selected.length) return;                                                                            // 1148
        return $select.placeholder;                                                                                    // 1149
      };                                                                                                               // 1150
                                                                                                                       // 1151
                                                                                                                       // 1152
    }],                                                                                                                // 1153
    controllerAs: '$selectMultiple',                                                                                   // 1154
                                                                                                                       // 1155
    link: function(scope, element, attrs, ctrls) {                                                                     // 1156
                                                                                                                       // 1157
      var $select = ctrls[0];                                                                                          // 1158
      var ngModel = scope.ngModel = ctrls[1];                                                                          // 1159
      var $selectMultiple = scope.$selectMultiple;                                                                     // 1160
                                                                                                                       // 1161
      //$select.selected = raw selected objects (ignoring any property binding)                                        // 1162
                                                                                                                       // 1163
      $select.multiple = true;                                                                                         // 1164
      $select.removeSelected = true;                                                                                   // 1165
                                                                                                                       // 1166
      //Input that will handle focus                                                                                   // 1167
      $select.focusInput = $select.searchInput;                                                                        // 1168
                                                                                                                       // 1169
      //From view --> model                                                                                            // 1170
      ngModel.$parsers.unshift(function () {                                                                           // 1171
        var locals = {},                                                                                               // 1172
            result,                                                                                                    // 1173
            resultMultiple = [];                                                                                       // 1174
        for (var j = $select.selected.length - 1; j >= 0; j--) {                                                       // 1175
          locals = {};                                                                                                 // 1176
          locals[$select.parserResult.itemName] = $select.selected[j];                                                 // 1177
          result = $select.parserResult.modelMapper(scope, locals);                                                    // 1178
          resultMultiple.unshift(result);                                                                              // 1179
        }                                                                                                              // 1180
        return resultMultiple;                                                                                         // 1181
      });                                                                                                              // 1182
                                                                                                                       // 1183
      // From model --> view                                                                                           // 1184
      ngModel.$formatters.unshift(function (inputValue) {                                                              // 1185
        var data = $select.parserResult.source (scope, { $select : {search:''}}), //Overwrite $search                  // 1186
            locals = {},                                                                                               // 1187
            result;                                                                                                    // 1188
        if (!data) return inputValue;                                                                                  // 1189
        var resultMultiple = [];                                                                                       // 1190
        var checkFnMultiple = function(list, value){                                                                   // 1191
          if (!list || !list.length) return;                                                                           // 1192
          for (var p = list.length - 1; p >= 0; p--) {                                                                 // 1193
            locals[$select.parserResult.itemName] = list[p];                                                           // 1194
            result = $select.parserResult.modelMapper(scope, locals);                                                  // 1195
            if($select.parserResult.trackByExp){                                                                       // 1196
                var matches = /\.(.+)/.exec($select.parserResult.trackByExp);                                          // 1197
                if(matches.length>0 && result[matches[1]] == value[matches[1]]){                                       // 1198
                    resultMultiple.unshift(list[p]);                                                                   // 1199
                    return true;                                                                                       // 1200
                }                                                                                                      // 1201
            }                                                                                                          // 1202
            if (angular.equals(result,value)){                                                                         // 1203
              resultMultiple.unshift(list[p]);                                                                         // 1204
              return true;                                                                                             // 1205
            }                                                                                                          // 1206
          }                                                                                                            // 1207
          return false;                                                                                                // 1208
        };                                                                                                             // 1209
        if (!inputValue) return resultMultiple; //If ngModel was undefined                                             // 1210
        for (var k = inputValue.length - 1; k >= 0; k--) {                                                             // 1211
          //Check model array of currently selected items                                                              // 1212
          if (!checkFnMultiple($select.selected, inputValue[k])){                                                      // 1213
            //Check model array of all items available                                                                 // 1214
            if (!checkFnMultiple(data, inputValue[k])){                                                                // 1215
              //If not found on previous lists, just add it directly to resultMultiple                                 // 1216
              resultMultiple.unshift(inputValue[k]);                                                                   // 1217
            }                                                                                                          // 1218
          }                                                                                                            // 1219
        }                                                                                                              // 1220
        return resultMultiple;                                                                                         // 1221
      });                                                                                                              // 1222
                                                                                                                       // 1223
      //Watch for external model changes                                                                               // 1224
      scope.$watchCollection(function(){ return ngModel.$modelValue; }, function(newValue, oldValue) {                 // 1225
        if (oldValue != newValue){                                                                                     // 1226
          ngModel.$modelValue = null; //Force scope model value and ngModel value to be out of sync to re-run formatters
          $selectMultiple.refreshComponent();                                                                          // 1228
        }                                                                                                              // 1229
      });                                                                                                              // 1230
                                                                                                                       // 1231
      ngModel.$render = function() {                                                                                   // 1232
        // Make sure that model value is array                                                                         // 1233
        if(!angular.isArray(ngModel.$viewValue)){                                                                      // 1234
          // Have tolerance for null or undefined values                                                               // 1235
          if(angular.isUndefined(ngModel.$viewValue) || ngModel.$viewValue === null){                                  // 1236
            $select.selected = [];                                                                                     // 1237
          } else {                                                                                                     // 1238
            throw uiSelectMinErr('multiarr', "Expected model value to be array but got '{0}'", ngModel.$viewValue);    // 1239
          }                                                                                                            // 1240
        }                                                                                                              // 1241
        $select.selected = ngModel.$viewValue;                                                                         // 1242
        scope.$evalAsync(); //To force $digest                                                                         // 1243
      };                                                                                                               // 1244
                                                                                                                       // 1245
      scope.$on('uis:select', function (event, item) {                                                                 // 1246
        $select.selected.push(item);                                                                                   // 1247
        $selectMultiple.updateModel();                                                                                 // 1248
      });                                                                                                              // 1249
                                                                                                                       // 1250
      scope.$on('uis:activate', function () {                                                                          // 1251
        $selectMultiple.activeMatchIndex = -1;                                                                         // 1252
      });                                                                                                              // 1253
                                                                                                                       // 1254
      scope.$watch('$select.disabled', function(newValue, oldValue) {                                                  // 1255
        // As the search input field may now become visible, it may be necessary to recompute its size                 // 1256
        if (oldValue && !newValue) $select.sizeSearchInput();                                                          // 1257
      });                                                                                                              // 1258
                                                                                                                       // 1259
      $select.searchInput.on('keydown', function(e) {                                                                  // 1260
        var key = e.which;                                                                                             // 1261
        scope.$apply(function() {                                                                                      // 1262
          var processed = false;                                                                                       // 1263
          // var tagged = false; //Checkme                                                                             // 1264
          if(KEY.isHorizontalMovement(key)){                                                                           // 1265
            processed = _handleMatchSelection(key);                                                                    // 1266
          }                                                                                                            // 1267
          if (processed  && key != KEY.TAB) {                                                                          // 1268
            //TODO Check si el tab selecciona aun correctamente                                                        // 1269
            //Crear test                                                                                               // 1270
            e.preventDefault();                                                                                        // 1271
            e.stopPropagation();                                                                                       // 1272
          }                                                                                                            // 1273
        });                                                                                                            // 1274
      });                                                                                                              // 1275
      function _getCaretPosition(el) {                                                                                 // 1276
        if(angular.isNumber(el.selectionStart)) return el.selectionStart;                                              // 1277
        // selectionStart is not supported in IE8 and we don't want hacky workarounds so we compromise                 // 1278
        else return el.value.length;                                                                                   // 1279
      }                                                                                                                // 1280
      // Handles selected options in "multiple" mode                                                                   // 1281
      function _handleMatchSelection(key){                                                                             // 1282
        var caretPosition = _getCaretPosition($select.searchInput[0]),                                                 // 1283
            length = $select.selected.length,                                                                          // 1284
            // none  = -1,                                                                                             // 1285
            first = 0,                                                                                                 // 1286
            last  = length-1,                                                                                          // 1287
            curr  = $selectMultiple.activeMatchIndex,                                                                  // 1288
            next  = $selectMultiple.activeMatchIndex+1,                                                                // 1289
            prev  = $selectMultiple.activeMatchIndex-1,                                                                // 1290
            newIndex = curr;                                                                                           // 1291
                                                                                                                       // 1292
        if(caretPosition > 0 || ($select.search.length && key == KEY.RIGHT)) return false;                             // 1293
                                                                                                                       // 1294
        $select.close();                                                                                               // 1295
                                                                                                                       // 1296
        function getNewActiveMatchIndex(){                                                                             // 1297
          switch(key){                                                                                                 // 1298
            case KEY.LEFT:                                                                                             // 1299
              // Select previous/first item                                                                            // 1300
              if(~$selectMultiple.activeMatchIndex) return prev;                                                       // 1301
              // Select last item                                                                                      // 1302
              else return last;                                                                                        // 1303
              break;                                                                                                   // 1304
            case KEY.RIGHT:                                                                                            // 1305
              // Open drop-down                                                                                        // 1306
              if(!~$selectMultiple.activeMatchIndex || curr === last){                                                 // 1307
                $select.activate();                                                                                    // 1308
                return false;                                                                                          // 1309
              }                                                                                                        // 1310
              // Select next/last item                                                                                 // 1311
              else return next;                                                                                        // 1312
              break;                                                                                                   // 1313
            case KEY.BACKSPACE:                                                                                        // 1314
              // Remove selected item and select previous/first                                                        // 1315
              if(~$selectMultiple.activeMatchIndex){                                                                   // 1316
                $selectMultiple.removeChoice(curr);                                                                    // 1317
                return prev;                                                                                           // 1318
              }                                                                                                        // 1319
              // Select last item                                                                                      // 1320
              else return last;                                                                                        // 1321
              break;                                                                                                   // 1322
            case KEY.DELETE:                                                                                           // 1323
              // Remove selected item and select next item                                                             // 1324
              if(~$selectMultiple.activeMatchIndex){                                                                   // 1325
                $selectMultiple.removeChoice($selectMultiple.activeMatchIndex);                                        // 1326
                return curr;                                                                                           // 1327
              }                                                                                                        // 1328
              else return false;                                                                                       // 1329
          }                                                                                                            // 1330
        }                                                                                                              // 1331
                                                                                                                       // 1332
        newIndex = getNewActiveMatchIndex();                                                                           // 1333
                                                                                                                       // 1334
        if(!$select.selected.length || newIndex === false) $selectMultiple.activeMatchIndex = -1;                      // 1335
        else $selectMultiple.activeMatchIndex = Math.min(last,Math.max(first,newIndex));                               // 1336
                                                                                                                       // 1337
        return true;                                                                                                   // 1338
      }                                                                                                                // 1339
                                                                                                                       // 1340
      $select.searchInput.on('keyup', function(e) {                                                                    // 1341
                                                                                                                       // 1342
        if ( ! KEY.isVerticalMovement(e.which) ) {                                                                     // 1343
          scope.$evalAsync( function () {                                                                              // 1344
            $select.activeIndex = $select.taggingLabel === false ? -1 : 0;                                             // 1345
          });                                                                                                          // 1346
        }                                                                                                              // 1347
        // Push a "create new" item into array if there is a search string                                             // 1348
        if ( $select.tagging.isActivated && $select.search.length > 0 ) {                                              // 1349
                                                                                                                       // 1350
          // return early with these keys                                                                              // 1351
          if (e.which === KEY.TAB || KEY.isControl(e) || KEY.isFunctionKey(e) || e.which === KEY.ESC || KEY.isVerticalMovement(e.which) ) {
            return;                                                                                                    // 1353
          }                                                                                                            // 1354
          // always reset the activeIndex to the first item when tagging                                               // 1355
          $select.activeIndex = $select.taggingLabel === false ? -1 : 0;                                               // 1356
          // taggingLabel === false bypasses all of this                                                               // 1357
          if ($select.taggingLabel === false) return;                                                                  // 1358
                                                                                                                       // 1359
          var items = angular.copy( $select.items );                                                                   // 1360
          var stashArr = angular.copy( $select.items );                                                                // 1361
          var newItem;                                                                                                 // 1362
          var item;                                                                                                    // 1363
          var hasTag = false;                                                                                          // 1364
          var dupeIndex = -1;                                                                                          // 1365
          var tagItems;                                                                                                // 1366
          var tagItem;                                                                                                 // 1367
                                                                                                                       // 1368
          // case for object tagging via transform `$select.tagging.fct` function                                      // 1369
          if ( $select.tagging.fct !== undefined) {                                                                    // 1370
            tagItems = $select.$filter('filter')(items,{'isTag': true});                                               // 1371
            if ( tagItems.length > 0 ) {                                                                               // 1372
              tagItem = tagItems[0];                                                                                   // 1373
            }                                                                                                          // 1374
            // remove the first element, if it has the `isTag` prop we generate a new one with each keyup, shaving the previous
            if ( items.length > 0 && tagItem ) {                                                                       // 1376
              hasTag = true;                                                                                           // 1377
              items = items.slice(1,items.length);                                                                     // 1378
              stashArr = stashArr.slice(1,stashArr.length);                                                            // 1379
            }                                                                                                          // 1380
            newItem = $select.tagging.fct($select.search);                                                             // 1381
            newItem.isTag = true;                                                                                      // 1382
            // verify the the tag doesn't match the value of an existing item                                          // 1383
            if ( stashArr.filter( function (origItem) { return angular.equals( origItem, $select.tagging.fct($select.search) ); } ).length > 0 ) {
              return;                                                                                                  // 1385
            }                                                                                                          // 1386
            newItem.isTag = true;                                                                                      // 1387
          // handle newItem string and stripping dupes in tagging string context                                       // 1388
          } else {                                                                                                     // 1389
            // find any tagging items already in the $select.items array and store them                                // 1390
            tagItems = $select.$filter('filter')(items,function (item) {                                               // 1391
              return item.match($select.taggingLabel);                                                                 // 1392
            });                                                                                                        // 1393
            if ( tagItems.length > 0 ) {                                                                               // 1394
              tagItem = tagItems[0];                                                                                   // 1395
            }                                                                                                          // 1396
            item = items[0];                                                                                           // 1397
            // remove existing tag item if found (should only ever be one tag item)                                    // 1398
            if ( item !== undefined && items.length > 0 && tagItem ) {                                                 // 1399
              hasTag = true;                                                                                           // 1400
              items = items.slice(1,items.length);                                                                     // 1401
              stashArr = stashArr.slice(1,stashArr.length);                                                            // 1402
            }                                                                                                          // 1403
            newItem = $select.search+' '+$select.taggingLabel;                                                         // 1404
            if ( _findApproxDupe($select.selected, $select.search) > -1 ) {                                            // 1405
              return;                                                                                                  // 1406
            }                                                                                                          // 1407
            // verify the the tag doesn't match the value of an existing item from                                     // 1408
            // the searched data set or the items already selected                                                     // 1409
            if ( _findCaseInsensitiveDupe(stashArr.concat($select.selected)) ) {                                       // 1410
              // if there is a tag from prev iteration, strip it / queue the change                                    // 1411
              // and return early                                                                                      // 1412
              if ( hasTag ) {                                                                                          // 1413
                items = stashArr;                                                                                      // 1414
                scope.$evalAsync( function () {                                                                        // 1415
                  $select.activeIndex = 0;                                                                             // 1416
                  $select.items = items;                                                                               // 1417
                });                                                                                                    // 1418
              }                                                                                                        // 1419
              return;                                                                                                  // 1420
            }                                                                                                          // 1421
            if ( _findCaseInsensitiveDupe(stashArr) ) {                                                                // 1422
              // if there is a tag from prev iteration, strip it                                                       // 1423
              if ( hasTag ) {                                                                                          // 1424
                $select.items = stashArr.slice(1,stashArr.length);                                                     // 1425
              }                                                                                                        // 1426
              return;                                                                                                  // 1427
            }                                                                                                          // 1428
          }                                                                                                            // 1429
          if ( hasTag ) dupeIndex = _findApproxDupe($select.selected, newItem);                                        // 1430
          // dupe found, shave the first item                                                                          // 1431
          if ( dupeIndex > -1 ) {                                                                                      // 1432
            items = items.slice(dupeIndex+1,items.length-1);                                                           // 1433
          } else {                                                                                                     // 1434
            items = [];                                                                                                // 1435
            items.push(newItem);                                                                                       // 1436
            items = items.concat(stashArr);                                                                            // 1437
          }                                                                                                            // 1438
          scope.$evalAsync( function () {                                                                              // 1439
            $select.activeIndex = 0;                                                                                   // 1440
            $select.items = items;                                                                                     // 1441
          });                                                                                                          // 1442
        }                                                                                                              // 1443
      });                                                                                                              // 1444
      function _findCaseInsensitiveDupe(arr) {                                                                         // 1445
        if ( arr === undefined || $select.search === undefined ) {                                                     // 1446
          return false;                                                                                                // 1447
        }                                                                                                              // 1448
        var hasDupe = arr.filter( function (origItem) {                                                                // 1449
          if ( $select.search.toUpperCase() === undefined || origItem === undefined ) {                                // 1450
            return false;                                                                                              // 1451
          }                                                                                                            // 1452
          return origItem.toUpperCase() === $select.search.toUpperCase();                                              // 1453
        }).length > 0;                                                                                                 // 1454
                                                                                                                       // 1455
        return hasDupe;                                                                                                // 1456
      }                                                                                                                // 1457
      function _findApproxDupe(haystack, needle) {                                                                     // 1458
        var dupeIndex = -1;                                                                                            // 1459
        if(angular.isArray(haystack)) {                                                                                // 1460
          var tempArr = angular.copy(haystack);                                                                        // 1461
          for (var i = 0; i <tempArr.length; i++) {                                                                    // 1462
            // handle the simple string version of tagging                                                             // 1463
            if ( $select.tagging.fct === undefined ) {                                                                 // 1464
              // search the array for the match                                                                        // 1465
              if ( tempArr[i]+' '+$select.taggingLabel === needle ) {                                                  // 1466
              dupeIndex = i;                                                                                           // 1467
              }                                                                                                        // 1468
            // handle the object tagging implementation                                                                // 1469
            } else {                                                                                                   // 1470
              var mockObj = tempArr[i];                                                                                // 1471
              mockObj.isTag = true;                                                                                    // 1472
              if ( angular.equals(mockObj, needle) ) {                                                                 // 1473
              dupeIndex = i;                                                                                           // 1474
              }                                                                                                        // 1475
            }                                                                                                          // 1476
          }                                                                                                            // 1477
        }                                                                                                              // 1478
        return dupeIndex;                                                                                              // 1479
      }                                                                                                                // 1480
                                                                                                                       // 1481
      $select.searchInput.on('blur', function() {                                                                      // 1482
        $timeout(function() {                                                                                          // 1483
          $selectMultiple.activeMatchIndex = -1;                                                                       // 1484
        });                                                                                                            // 1485
      });                                                                                                              // 1486
                                                                                                                       // 1487
    }                                                                                                                  // 1488
  };                                                                                                                   // 1489
}]);                                                                                                                   // 1490
uis.directive('uiSelectSingle', ['$timeout','$compile', function($timeout, $compile) {                                 // 1491
  return {                                                                                                             // 1492
    restrict: 'EA',                                                                                                    // 1493
    require: ['^uiSelect', '^ngModel'],                                                                                // 1494
    link: function(scope, element, attrs, ctrls) {                                                                     // 1495
                                                                                                                       // 1496
      var $select = ctrls[0];                                                                                          // 1497
      var ngModel = ctrls[1];                                                                                          // 1498
                                                                                                                       // 1499
      //From view --> model                                                                                            // 1500
      ngModel.$parsers.unshift(function (inputValue) {                                                                 // 1501
        var locals = {},                                                                                               // 1502
            result;                                                                                                    // 1503
        locals[$select.parserResult.itemName] = inputValue;                                                            // 1504
        result = $select.parserResult.modelMapper(scope, locals);                                                      // 1505
        return result;                                                                                                 // 1506
      });                                                                                                              // 1507
                                                                                                                       // 1508
      //From model --> view                                                                                            // 1509
      ngModel.$formatters.unshift(function (inputValue) {                                                              // 1510
        var data = $select.parserResult.source (scope, { $select : {search:''}}), //Overwrite $search                  // 1511
            locals = {},                                                                                               // 1512
            result;                                                                                                    // 1513
        if (data){                                                                                                     // 1514
          var checkFnSingle = function(d){                                                                             // 1515
            locals[$select.parserResult.itemName] = d;                                                                 // 1516
            result = $select.parserResult.modelMapper(scope, locals);                                                  // 1517
            return result == inputValue;                                                                               // 1518
          };                                                                                                           // 1519
          //If possible pass same object stored in $select.selected                                                    // 1520
          if ($select.selected && checkFnSingle($select.selected)) {                                                   // 1521
            return $select.selected;                                                                                   // 1522
          }                                                                                                            // 1523
          for (var i = data.length - 1; i >= 0; i--) {                                                                 // 1524
            if (checkFnSingle(data[i])) return data[i];                                                                // 1525
          }                                                                                                            // 1526
        }                                                                                                              // 1527
        return inputValue;                                                                                             // 1528
      });                                                                                                              // 1529
                                                                                                                       // 1530
      //Update viewValue if model change                                                                               // 1531
      scope.$watch('$select.selected', function(newValue) {                                                            // 1532
        if (ngModel.$viewValue !== newValue) {                                                                         // 1533
          ngModel.$setViewValue(newValue);                                                                             // 1534
        }                                                                                                              // 1535
      });                                                                                                              // 1536
                                                                                                                       // 1537
      ngModel.$render = function() {                                                                                   // 1538
        $select.selected = ngModel.$viewValue;                                                                         // 1539
      };                                                                                                               // 1540
                                                                                                                       // 1541
      scope.$on('uis:select', function (event, item) {                                                                 // 1542
        $select.selected = item;                                                                                       // 1543
      });                                                                                                              // 1544
                                                                                                                       // 1545
      scope.$on('uis:close', function (event, skipFocusser) {                                                          // 1546
        $timeout(function(){                                                                                           // 1547
          $select.focusser.prop('disabled', false);                                                                    // 1548
          if (!skipFocusser) $select.focusser[0].focus();                                                              // 1549
        },0,false);                                                                                                    // 1550
      });                                                                                                              // 1551
                                                                                                                       // 1552
      scope.$on('uis:activate', function () {                                                                          // 1553
        focusser.prop('disabled', true); //Will reactivate it on .close()                                              // 1554
      });                                                                                                              // 1555
                                                                                                                       // 1556
      //Idea from: https://github.com/ivaynberg/select2/blob/79b5bf6db918d7560bdd959109b7bcfb47edaf43/select2.js#L1954 // 1557
      var focusser = angular.element("<input ng-disabled='$select.disabled' class='ui-select-focusser ui-select-offscreen' type='text' id='{{ $select.focusserId }}' aria-label='{{ $select.focusserTitle }}' aria-haspopup='true' role='button' />");
      $compile(focusser)(scope);                                                                                       // 1559
      $select.focusser = focusser;                                                                                     // 1560
                                                                                                                       // 1561
      //Input that will handle focus                                                                                   // 1562
      $select.focusInput = focusser;                                                                                   // 1563
                                                                                                                       // 1564
      element.parent().append(focusser);                                                                               // 1565
      focusser.bind("focus", function(){                                                                               // 1566
        scope.$evalAsync(function(){                                                                                   // 1567
          $select.focus = true;                                                                                        // 1568
        });                                                                                                            // 1569
      });                                                                                                              // 1570
      focusser.bind("blur", function(){                                                                                // 1571
        scope.$evalAsync(function(){                                                                                   // 1572
          $select.focus = false;                                                                                       // 1573
        });                                                                                                            // 1574
      });                                                                                                              // 1575
      focusser.bind("keydown", function(e){                                                                            // 1576
                                                                                                                       // 1577
        if (e.which === KEY.BACKSPACE) {                                                                               // 1578
          e.preventDefault();                                                                                          // 1579
          e.stopPropagation();                                                                                         // 1580
          $select.select(undefined);                                                                                   // 1581
          scope.$apply();                                                                                              // 1582
          return;                                                                                                      // 1583
        }                                                                                                              // 1584
                                                                                                                       // 1585
        if (e.which === KEY.TAB || KEY.isControl(e) || KEY.isFunctionKey(e) || e.which === KEY.ESC) {                  // 1586
          return;                                                                                                      // 1587
        }                                                                                                              // 1588
                                                                                                                       // 1589
        if (e.which == KEY.DOWN  || e.which == KEY.UP || e.which == KEY.ENTER || e.which == KEY.SPACE){                // 1590
          e.preventDefault();                                                                                          // 1591
          e.stopPropagation();                                                                                         // 1592
          $select.activate();                                                                                          // 1593
        }                                                                                                              // 1594
                                                                                                                       // 1595
        scope.$digest();                                                                                               // 1596
      });                                                                                                              // 1597
                                                                                                                       // 1598
      focusser.bind("keyup input", function(e){                                                                        // 1599
                                                                                                                       // 1600
        if (e.which === KEY.TAB || KEY.isControl(e) || KEY.isFunctionKey(e) || e.which === KEY.ESC || e.which == KEY.ENTER || e.which === KEY.BACKSPACE) {
          return;                                                                                                      // 1602
        }                                                                                                              // 1603
                                                                                                                       // 1604
        $select.activate(focusser.val()); //User pressed some regular key, so we pass it to the search input           // 1605
        focusser.val('');                                                                                              // 1606
        scope.$digest();                                                                                               // 1607
                                                                                                                       // 1608
      });                                                                                                              // 1609
                                                                                                                       // 1610
                                                                                                                       // 1611
    }                                                                                                                  // 1612
  };                                                                                                                   // 1613
}]);                                                                                                                   // 1614
// Make multiple matches sortable                                                                                      // 1615
uis.directive('uiSelectSort', ['$timeout', 'uiSelectConfig', 'uiSelectMinErr', function($timeout, uiSelectConfig, uiSelectMinErr) {
  return {                                                                                                             // 1617
    require: '^uiSelect',                                                                                              // 1618
    link: function(scope, element, attrs, $select) {                                                                   // 1619
      if (scope[attrs.uiSelectSort] === null) {                                                                        // 1620
        throw uiSelectMinErr('sort', "Expected a list to sort");                                                       // 1621
      }                                                                                                                // 1622
                                                                                                                       // 1623
      var options = angular.extend({                                                                                   // 1624
          axis: 'horizontal'                                                                                           // 1625
        },                                                                                                             // 1626
        scope.$eval(attrs.uiSelectSortOptions));                                                                       // 1627
                                                                                                                       // 1628
      var axis = options.axis,                                                                                         // 1629
        draggingClassName = 'dragging',                                                                                // 1630
        droppingClassName = 'dropping',                                                                                // 1631
        droppingBeforeClassName = 'dropping-before',                                                                   // 1632
        droppingAfterClassName = 'dropping-after';                                                                     // 1633
                                                                                                                       // 1634
      scope.$watch(function(){                                                                                         // 1635
        return $select.sortable;                                                                                       // 1636
      }, function(n){                                                                                                  // 1637
        if (n) {                                                                                                       // 1638
          element.attr('draggable', true);                                                                             // 1639
        } else {                                                                                                       // 1640
          element.removeAttr('draggable');                                                                             // 1641
        }                                                                                                              // 1642
      });                                                                                                              // 1643
                                                                                                                       // 1644
      element.on('dragstart', function(e) {                                                                            // 1645
        element.addClass(draggingClassName);                                                                           // 1646
                                                                                                                       // 1647
        (e.dataTransfer || e.originalEvent.dataTransfer).setData('text/plain', scope.$index);                          // 1648
      });                                                                                                              // 1649
                                                                                                                       // 1650
      element.on('dragend', function() {                                                                               // 1651
        element.removeClass(draggingClassName);                                                                        // 1652
      });                                                                                                              // 1653
                                                                                                                       // 1654
      var move = function(from, to) {                                                                                  // 1655
        /*jshint validthis: true */                                                                                    // 1656
        this.splice(to, 0, this.splice(from, 1)[0]);                                                                   // 1657
      };                                                                                                               // 1658
                                                                                                                       // 1659
      var dragOverHandler = function(e) {                                                                              // 1660
        e.preventDefault();                                                                                            // 1661
                                                                                                                       // 1662
        var offset = axis === 'vertical' ? e.offsetY || e.layerY || (e.originalEvent ? e.originalEvent.offsetY : 0) : e.offsetX || e.layerX || (e.originalEvent ? e.originalEvent.offsetX : 0);
                                                                                                                       // 1664
        if (offset < (this[axis === 'vertical' ? 'offsetHeight' : 'offsetWidth'] / 2)) {                               // 1665
          element.removeClass(droppingAfterClassName);                                                                 // 1666
          element.addClass(droppingBeforeClassName);                                                                   // 1667
                                                                                                                       // 1668
        } else {                                                                                                       // 1669
          element.removeClass(droppingBeforeClassName);                                                                // 1670
          element.addClass(droppingAfterClassName);                                                                    // 1671
        }                                                                                                              // 1672
      };                                                                                                               // 1673
                                                                                                                       // 1674
      var dropTimeout;                                                                                                 // 1675
                                                                                                                       // 1676
      var dropHandler = function(e) {                                                                                  // 1677
        e.preventDefault();                                                                                            // 1678
                                                                                                                       // 1679
        var droppedItemIndex = parseInt((e.dataTransfer || e.originalEvent.dataTransfer).getData('text/plain'), 10);   // 1680
                                                                                                                       // 1681
        // prevent event firing multiple times in firefox                                                              // 1682
        $timeout.cancel(dropTimeout);                                                                                  // 1683
        dropTimeout = $timeout(function() {                                                                            // 1684
          _dropHandler(droppedItemIndex);                                                                              // 1685
        }, 20);                                                                                                        // 1686
      };                                                                                                               // 1687
                                                                                                                       // 1688
      var _dropHandler = function(droppedItemIndex) {                                                                  // 1689
        var theList = scope.$eval(attrs.uiSelectSort),                                                                 // 1690
          itemToMove = theList[droppedItemIndex],                                                                      // 1691
          newIndex = null;                                                                                             // 1692
                                                                                                                       // 1693
        if (element.hasClass(droppingBeforeClassName)) {                                                               // 1694
          if (droppedItemIndex < scope.$index) {                                                                       // 1695
            newIndex = scope.$index - 1;                                                                               // 1696
          } else {                                                                                                     // 1697
            newIndex = scope.$index;                                                                                   // 1698
          }                                                                                                            // 1699
        } else {                                                                                                       // 1700
          if (droppedItemIndex < scope.$index) {                                                                       // 1701
            newIndex = scope.$index;                                                                                   // 1702
          } else {                                                                                                     // 1703
            newIndex = scope.$index + 1;                                                                               // 1704
          }                                                                                                            // 1705
        }                                                                                                              // 1706
                                                                                                                       // 1707
        move.apply(theList, [droppedItemIndex, newIndex]);                                                             // 1708
                                                                                                                       // 1709
        scope.$apply(function() {                                                                                      // 1710
          scope.$emit('uiSelectSort:change', {                                                                         // 1711
            array: theList,                                                                                            // 1712
            item: itemToMove,                                                                                          // 1713
            from: droppedItemIndex,                                                                                    // 1714
            to: newIndex                                                                                               // 1715
          });                                                                                                          // 1716
        });                                                                                                            // 1717
                                                                                                                       // 1718
        element.removeClass(droppingClassName);                                                                        // 1719
        element.removeClass(droppingBeforeClassName);                                                                  // 1720
        element.removeClass(droppingAfterClassName);                                                                   // 1721
                                                                                                                       // 1722
        element.off('drop', dropHandler);                                                                              // 1723
      };                                                                                                               // 1724
                                                                                                                       // 1725
      element.on('dragenter', function() {                                                                             // 1726
        if (element.hasClass(draggingClassName)) {                                                                     // 1727
          return;                                                                                                      // 1728
        }                                                                                                              // 1729
                                                                                                                       // 1730
        element.addClass(droppingClassName);                                                                           // 1731
                                                                                                                       // 1732
        element.on('dragover', dragOverHandler);                                                                       // 1733
        element.on('drop', dropHandler);                                                                               // 1734
      });                                                                                                              // 1735
                                                                                                                       // 1736
      element.on('dragleave', function(e) {                                                                            // 1737
        if (e.target != element) {                                                                                     // 1738
          return;                                                                                                      // 1739
        }                                                                                                              // 1740
        element.removeClass(droppingClassName);                                                                        // 1741
        element.removeClass(droppingBeforeClassName);                                                                  // 1742
        element.removeClass(droppingAfterClassName);                                                                   // 1743
                                                                                                                       // 1744
        element.off('dragover', dragOverHandler);                                                                      // 1745
        element.off('drop', dropHandler);                                                                              // 1746
      });                                                                                                              // 1747
    }                                                                                                                  // 1748
  };                                                                                                                   // 1749
}]);                                                                                                                   // 1750
                                                                                                                       // 1751
/**                                                                                                                    // 1752
 * Parses "repeat" attribute.                                                                                          // 1753
 *                                                                                                                     // 1754
 * Taken from AngularJS ngRepeat source code                                                                           // 1755
 * See https://github.com/angular/angular.js/blob/v1.2.15/src/ng/directive/ngRepeat.js#L211                            // 1756
 *                                                                                                                     // 1757
 * Original discussion about parsing "repeat" attribute instead of fully relying on ng-repeat:                         // 1758
 * https://github.com/angular-ui/ui-select/commit/5dd63ad#commitcomment-5504697                                        // 1759
 */                                                                                                                    // 1760
                                                                                                                       // 1761
uis.service('uisRepeatParser', ['uiSelectMinErr','$parse', function(uiSelectMinErr, $parse) {                          // 1762
  var self = this;                                                                                                     // 1763
                                                                                                                       // 1764
  /**                                                                                                                  // 1765
   * Example:                                                                                                          // 1766
   * expression = "address in addresses | filter: {street: $select.search} track by $index"                            // 1767
   * itemName = "address",                                                                                             // 1768
   * source = "addresses | filter: {street: $select.search}",                                                          // 1769
   * trackByExp = "$index",                                                                                            // 1770
   */                                                                                                                  // 1771
  self.parse = function(expression) {                                                                                  // 1772
                                                                                                                       // 1773
    var match = expression.match(/^\s*(?:([\s\S]+?)\s+as\s+)?([\S]+?)\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);
                                                                                                                       // 1775
    if (!match) {                                                                                                      // 1776
      throw uiSelectMinErr('iexp', "Expected expression in form of '_item_ in _collection_[ track by _id_]' but got '{0}'.",
              expression);                                                                                             // 1778
    }                                                                                                                  // 1779
                                                                                                                       // 1780
    return {                                                                                                           // 1781
      itemName: match[2], // (lhs) Left-hand side,                                                                     // 1782
      source: $parse(match[3]),                                                                                        // 1783
      trackByExp: match[4],                                                                                            // 1784
      modelMapper: $parse(match[1] || match[2])                                                                        // 1785
    };                                                                                                                 // 1786
                                                                                                                       // 1787
  };                                                                                                                   // 1788
                                                                                                                       // 1789
  self.getGroupNgRepeatExpression = function() {                                                                       // 1790
    return '$group in $select.groups';                                                                                 // 1791
  };                                                                                                                   // 1792
                                                                                                                       // 1793
  self.getNgRepeatExpression = function(itemName, source, trackByExp, grouped) {                                       // 1794
    var expression = itemName + ' in ' + (grouped ? '$group.items' : source);                                          // 1795
    if (trackByExp) {                                                                                                  // 1796
      expression += ' track by ' + trackByExp;                                                                         // 1797
    }                                                                                                                  // 1798
    return expression;                                                                                                 // 1799
  };                                                                                                                   // 1800
}]);                                                                                                                   // 1801
                                                                                                                       // 1802
}());                                                                                                                  // 1803
angular.module("ui.select").run(["$templateCache", function($templateCache) {$templateCache.put("bootstrap/choices.tpl.html","<ul class=\"ui-select-choices ui-select-choices-content ui-select-dropdown dropdown-menu\" role=\"listbox\" ng-show=\"$select.items.length > 0\"><li class=\"ui-select-choices-group\" id=\"ui-select-choices-{{ $select.generatedId }}\"><div class=\"divider\" ng-show=\"$select.isGrouped && $index > 0\"></div><div ng-show=\"$select.isGrouped\" class=\"ui-select-choices-group-label dropdown-header\" ng-bind=\"$group.name\"></div><div id=\"ui-select-choices-row-{{ $select.generatedId }}-{{$index}}\" class=\"ui-select-choices-row\" ng-class=\"{active: $select.isActive(this), disabled: $select.isDisabled(this)}\" role=\"option\"><a href=\"javascript:void(0)\" class=\"ui-select-choices-row-inner\"></a></div></li></ul>");
$templateCache.put("bootstrap/match-multiple.tpl.html","<span class=\"ui-select-match\"><span ng-repeat=\"$item in $select.selected\"><span class=\"ui-select-match-item btn btn-default btn-xs\" tabindex=\"-1\" type=\"button\" ng-disabled=\"$select.disabled\" ng-click=\"$selectMultiple.activeMatchIndex = $index;\" ng-class=\"{\'btn-primary\':$selectMultiple.activeMatchIndex === $index, \'select-locked\':$select.isLocked(this, $index)}\" ui-select-sort=\"$select.selected\"><span class=\"close ui-select-match-close\" ng-hide=\"$select.disabled\" ng-click=\"$selectMultiple.removeChoice($index)\">&nbsp;&times;</span> <span uis-transclude-append=\"\"></span></span></span></span>");
$templateCache.put("bootstrap/match.tpl.html","<div class=\"ui-select-match\" ng-hide=\"$select.open\" ng-disabled=\"$select.disabled\" ng-class=\"{\'btn-default-focus\':$select.focus}\"><span tabindex=\"-1\" class=\"btn btn-default form-control ui-select-toggle\" aria-label=\"{{ $select.baseTitle }} activate\" ng-disabled=\"$select.disabled\" ng-click=\"$select.activate()\" style=\"outline: 0;\"><span ng-show=\"$select.isEmpty()\" class=\"ui-select-placeholder text-muted\">{{$select.placeholder}}</span> <span ng-hide=\"$select.isEmpty()\" class=\"ui-select-match-text pull-left\" ng-class=\"{\'ui-select-allow-clear\': $select.allowClear && !$select.isEmpty()}\" ng-transclude=\"\"></span> <i class=\"caret pull-right\" ng-click=\"$select.toggle($event)\"></i> <a ng-show=\"$select.allowClear && !$select.isEmpty()\" aria-label=\"{{ $select.baseTitle }} clear\" style=\"margin-right: 10px\" ng-click=\"$select.clear($event)\" class=\"btn btn-xs btn-link pull-right\"><i class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></i></a></span></div>");
$templateCache.put("bootstrap/select-multiple.tpl.html","<div class=\"ui-select-container ui-select-multiple ui-select-bootstrap dropdown form-control\" ng-class=\"{open: $select.open}\"><div><div class=\"ui-select-match\"></div><input type=\"text\" autocomplete=\"off\" autocorrect=\"off\" autocapitalize=\"off\" spellcheck=\"false\" class=\"ui-select-search input-xs\" placeholder=\"{{$selectMultiple.getPlaceholder()}}\" ng-disabled=\"$select.disabled\" ng-hide=\"$select.disabled\" ng-click=\"$select.activate()\" ng-model=\"$select.search\" role=\"combobox\" aria-label=\"{{ $select.baseTitle }}\" ondrop=\"return false;\"></div><div class=\"ui-select-choices\"></div></div>");
$templateCache.put("bootstrap/select.tpl.html","<div class=\"ui-select-container ui-select-bootstrap dropdown\" ng-class=\"{open: $select.open}\"><div class=\"ui-select-match\"></div><input type=\"text\" autocomplete=\"off\" tabindex=\"-1\" aria-expanded=\"true\" aria-label=\"{{ $select.baseTitle }}\" aria-owns=\"ui-select-choices-{{ $select.generatedId }}\" aria-activedescendant=\"ui-select-choices-row-{{ $select.generatedId }}-{{ $select.activeIndex }}\" class=\"form-control ui-select-search\" placeholder=\"{{$select.placeholder}}\" ng-model=\"$select.search\" ng-show=\"$select.searchEnabled && $select.open\"><div class=\"ui-select-choices\"></div></div>");
$templateCache.put("select2/choices.tpl.html","<ul class=\"ui-select-choices ui-select-choices-content select2-results\"><li class=\"ui-select-choices-group\" ng-class=\"{\'select2-result-with-children\': $select.choiceGrouped($group) }\"><div ng-show=\"$select.choiceGrouped($group)\" class=\"ui-select-choices-group-label select2-result-label\" ng-bind=\"$group.name\"></div><ul role=\"listbox\" id=\"ui-select-choices-{{ $select.generatedId }}\" ng-class=\"{\'select2-result-sub\': $select.choiceGrouped($group), \'select2-result-single\': !$select.choiceGrouped($group) }\"><li role=\"option\" id=\"ui-select-choices-row-{{ $select.generatedId }}-{{$index}}\" class=\"ui-select-choices-row\" ng-class=\"{\'select2-highlighted\': $select.isActive(this), \'select2-disabled\': $select.isDisabled(this)}\"><div class=\"select2-result-label ui-select-choices-row-inner\"></div></li></ul></li></ul>");
$templateCache.put("select2/match-multiple.tpl.html","<span class=\"ui-select-match\"><li class=\"ui-select-match-item select2-search-choice\" ng-repeat=\"$item in $select.selected\" ng-class=\"{\'select2-search-choice-focus\':$selectMultiple.activeMatchIndex === $index, \'select2-locked\':$select.isLocked(this, $index)}\" ui-select-sort=\"$select.selected\"><span uis-transclude-append=\"\"></span> <a href=\"javascript:;\" class=\"ui-select-match-close select2-search-choice-close\" ng-click=\"$selectMultiple.removeChoice($index)\" tabindex=\"-1\"></a></li></span>");
$templateCache.put("select2/match.tpl.html","<a class=\"select2-choice ui-select-match\" ng-class=\"{\'select2-default\': $select.isEmpty()}\" ng-click=\"$select.toggle($event)\" aria-label=\"{{ $select.baseTitle }} select\"><span ng-show=\"$select.isEmpty()\" class=\"select2-chosen\">{{$select.placeholder}}</span> <span ng-hide=\"$select.isEmpty()\" class=\"select2-chosen\" ng-transclude=\"\"></span> <abbr ng-if=\"$select.allowClear && !$select.isEmpty()\" class=\"select2-search-choice-close\" ng-click=\"$select.clear($event)\"></abbr> <span class=\"select2-arrow ui-select-toggle\"><b></b></span></a>");
$templateCache.put("select2/select-multiple.tpl.html","<div class=\"ui-select-container ui-select-multiple select2 select2-container select2-container-multi\" ng-class=\"{\'select2-container-active select2-dropdown-open open\': $select.open, \'select2-container-disabled\': $select.disabled}\"><ul class=\"select2-choices\"><span class=\"ui-select-match\"></span><li class=\"select2-search-field\"><input type=\"text\" autocomplete=\"off\" autocorrect=\"off\" autocapitalize=\"off\" spellcheck=\"false\" role=\"combobox\" aria-expanded=\"true\" aria-owns=\"ui-select-choices-{{ $select.generatedId }}\" aria-label=\"{{ $select.baseTitle }}\" aria-activedescendant=\"ui-select-choices-row-{{ $select.generatedId }}-{{ $select.activeIndex }}\" class=\"select2-input ui-select-search\" placeholder=\"{{$selectMultiple.getPlaceholder()}}\" ng-disabled=\"$select.disabled\" ng-hide=\"$select.disabled\" ng-model=\"$select.search\" ng-click=\"$select.activate()\" style=\"width: 34px;\" ondrop=\"return false;\"></li></ul><div class=\"ui-select-dropdown select2-drop select2-with-searchbox select2-drop-active\" ng-class=\"{\'select2-display-none\': !$select.open}\"><div class=\"ui-select-choices\"></div></div></div>");
$templateCache.put("select2/select.tpl.html","<div class=\"ui-select-container select2 select2-container\" ng-class=\"{\'select2-container-active select2-dropdown-open open\': $select.open, \'select2-container-disabled\': $select.disabled, \'select2-container-active\': $select.focus, \'select2-allowclear\': $select.allowClear && !$select.isEmpty()}\"><div class=\"ui-select-match\"></div><div class=\"ui-select-dropdown select2-drop select2-with-searchbox select2-drop-active\" ng-class=\"{\'select2-display-none\': !$select.open}\"><div class=\"select2-search\" ng-show=\"$select.searchEnabled\"><input type=\"text\" autocomplete=\"off\" autocorrect=\"off\" autocapitalize=\"off\" spellcheck=\"false\" role=\"combobox\" aria-expanded=\"true\" aria-owns=\"ui-select-choices-{{ $select.generatedId }}\" aria-label=\"{{ $select.baseTitle }}\" aria-activedescendant=\"ui-select-choices-row-{{ $select.generatedId }}-{{ $select.activeIndex }}\" class=\"ui-select-search select2-input\" ng-model=\"$select.search\"></div><div class=\"ui-select-choices\"></div></div></div>");
$templateCache.put("selectize/choices.tpl.html","<div ng-show=\"$select.open\" class=\"ui-select-choices ui-select-dropdown selectize-dropdown single\"><div class=\"ui-select-choices-content selectize-dropdown-content\"><div class=\"ui-select-choices-group optgroup\" role=\"listbox\"><div ng-show=\"$select.isGrouped\" class=\"ui-select-choices-group-label optgroup-header\" ng-bind=\"$group.name\"></div><div role=\"option\" class=\"ui-select-choices-row\" ng-class=\"{active: $select.isActive(this), disabled: $select.isDisabled(this)}\"><div class=\"option ui-select-choices-row-inner\" data-selectable=\"\"></div></div></div></div></div>");
$templateCache.put("selectize/match.tpl.html","<div ng-hide=\"($select.open || $select.isEmpty())\" class=\"ui-select-match\" ng-transclude=\"\"></div>");
$templateCache.put("selectize/select.tpl.html","<div class=\"ui-select-container selectize-control single\" ng-class=\"{\'open\': $select.open}\"><div class=\"selectize-input\" ng-class=\"{\'focus\': $select.open, \'disabled\': $select.disabled, \'selectize-focus\' : $select.focus}\" ng-click=\"$select.activate()\"><div class=\"ui-select-match\"></div><input type=\"text\" autocomplete=\"off\" tabindex=\"-1\" class=\"ui-select-search ui-select-toggle\" ng-click=\"$select.toggle($event)\" placeholder=\"{{$select.placeholder}}\" ng-model=\"$select.search\" ng-hide=\"!$select.searchEnabled || ($select.selected && !$select.open)\" ng-disabled=\"$select.disabled\" aria-label=\"{{ $select.baseTitle }}\"></div><div class=\"ui-select-choices\"></div></div>");}]);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 1826
}).call(this);                                                       // 1827
                                                                     // 1828
///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['angularui:ui-select'] = {};

})();
