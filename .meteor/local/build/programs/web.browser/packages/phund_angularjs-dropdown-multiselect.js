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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// packages/phund_angularjs-dropdown-multiselect/src/angularjs-dropdown-multiselect.js                           //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
'use strict';                                                                                                    // 1
                                                                                                                 // 2
var directiveModule = angular.module('angularjs-dropdown-multiselect', []);                                      // 3
                                                                                                                 // 4
directiveModule.directive('ngDropdownMultiselect', ['$filter', '$document', '$compile', '$parse',                // 5
    function ($filter, $document, $compile, $parse) {                                                            // 6
                                                                                                                 // 7
        return {                                                                                                 // 8
            restrict: 'AE',                                                                                      // 9
            scope: {                                                                                             // 10
                selectedModel: '=',                                                                              // 11
                options: '=',                                                                                    // 12
                extraSettings: '=',                                                                              // 13
                events: '=',                                                                                     // 14
                searchFilter: '=?',                                                                              // 15
                translationTexts: '=',                                                                           // 16
                groupBy: '@'                                                                                     // 17
            },                                                                                                   // 18
            template: function (element, attrs) {                                                                // 19
                var checkboxes = attrs.checkboxes ? true : false;                                                // 20
                var groups = attrs.groupBy ? true : false;                                                       // 21
                                                                                                                 // 22
                var template = '<div class="multiselect-parent btn-group dropdown-multiselect">';                // 23
                template += '<button type="button" class="dropdown-toggle" ng-class="settings.buttonClasses" ng-click="toggleDropdown()">{{getButtonText()}}&nbsp;<span class="caret"></span></button>';
                template += '<ul class="dropdown-menu dropdown-menu-form" ng-style="{display: open ? \'block\' : \'none\', height : settings.scrollable ? settings.scrollableHeight : \'auto\' }" style="overflow: scroll" >';
                template += '<li ng-hide="!settings.showCheckAll || settings.selectionLimit > 0"><a data-ng-click="selectAll()"><span class="glyphicon glyphicon-ok"></span>  {{texts.checkAll}}</a>';
                template += '<li ng-show="settings.showUncheckAll"><a data-ng-click="deselectAll();"><span class="glyphicon glyphicon-remove"></span>   {{texts.uncheckAll}}</a></li>';
                template += '<li ng-hide="(!settings.showCheckAll || settings.selectionLimit > 0) && !settings.showUncheckAll" class="divider"></li>';
                template += '<li ng-show="settings.enableSearch"><div class="dropdown-header"><input type="text" class="form-control" style="width: 100%;" ng-model="searchFilter" placeholder="{{texts.searchPlaceholder}}" /></li>';
                template += '<li ng-show="settings.enableSearch" class="divider"></li>';                         // 30
                                                                                                                 // 31
                if (groups) {                                                                                    // 32
                    template += '<li ng-repeat-start="option in orderedItems | filter: searchFilter" ng-show="getPropertyForObject(option, settings.groupBy) !== getPropertyForObject(orderedItems[$index - 1], settings.groupBy)" role="presentation" class="dropdown-header">{{ getGroupTitle(getPropertyForObject(option, settings.groupBy)) }}</li>';
                    template += '<li ng-repeat-end role="presentation">';                                        // 34
                } else {                                                                                         // 35
                    template += '<li role="presentation" ng-repeat="option in options | filter: searchFilter">';
                }                                                                                                // 37
                                                                                                                 // 38
                template += '<a role="menuitem" tabindex="-1" ng-click="setSelectedItem(getPropertyForObject(option,settings.idProp))">';
                                                                                                                 // 40
                if (checkboxes) {                                                                                // 41
                    template += '<div class="checkbox"><label><input class="checkboxInput" type="checkbox" ng-click="checkboxClick($event, getPropertyForObject(option,settings.idProp))" ng-checked="isChecked(getPropertyForObject(option,settings.idProp))" /> {{getPropertyForObject(option, settings.displayProp)}}</label></div></a>';
                } else {                                                                                         // 43
                    template += '<span data-ng-class="{\'glyphicon glyphicon-ok\': isChecked(getPropertyForObject(option,settings.idProp))}"></span> {{getPropertyForObject(option, settings.displayProp)}}</a>';
                }                                                                                                // 45
                                                                                                                 // 46
                template += '</li>';                                                                             // 47
                                                                                                                 // 48
                template += '<li class="divider" ng-show="settings.selectionLimit > 1"></li>';                   // 49
                template += '<li role="presentation" ng-show="settings.selectionLimit > 1"><a role="menuitem">{{selectedModel.length}} {{texts.selectionOf}} {{settings.selectionLimit}} {{texts.selectionCount}}</a></li>';
                                                                                                                 // 51
                template += '</ul>';                                                                             // 52
                template += '</div>';                                                                            // 53
                                                                                                                 // 54
                element.html(template);                                                                          // 55
            },                                                                                                   // 56
            link: function ($scope, $element, $attrs) {                                                          // 57
                var $dropdownTrigger = $element.children()[0];                                                   // 58
                                                                                                                 // 59
                $scope.toggleDropdown = function () {                                                            // 60
                    $scope.open = !$scope.open;                                                                  // 61
                };                                                                                               // 62
                                                                                                                 // 63
                $scope.checkboxClick = function ($event, id) {                                                   // 64
                    $scope.setSelectedItem(id);                                                                  // 65
                    $event.stopImmediatePropagation();                                                           // 66
                };                                                                                               // 67
                                                                                                                 // 68
                $scope.externalEvents = {                                                                        // 69
                    onItemSelect: angular.noop,                                                                  // 70
                    onItemDeselect: angular.noop,                                                                // 71
                    onSelectAll: angular.noop,                                                                   // 72
                    onDeselectAll: angular.noop,                                                                 // 73
                    onInitDone: angular.noop,                                                                    // 74
                    onMaxSelectionReached: angular.noop                                                          // 75
                };                                                                                               // 76
                                                                                                                 // 77
                $scope.settings = {                                                                              // 78
                    dynamicTitle: true,                                                                          // 79
                    scrollable: false,                                                                           // 80
                    scrollableHeight: '300px',                                                                   // 81
                    closeOnBlur: true,                                                                           // 82
                    displayProp: 'label',                                                                        // 83
                    idProp: 'id',                                                                                // 84
                    externalIdProp: 'id',                                                                        // 85
                    enableSearch: false,                                                                         // 86
                    selectionLimit: 0,                                                                           // 87
                    showCheckAll: true,                                                                          // 88
                    showUncheckAll: true,                                                                        // 89
                    closeOnSelect: false,                                                                        // 90
                    buttonClasses: 'btn btn-default',                                                            // 91
                    closeOnDeselect: false,                                                                      // 92
                    groupBy: $attrs.groupBy || undefined,                                                        // 93
                    groupByTextProvider: null,                                                                   // 94
                    smartButtonMaxItems: 0,                                                                      // 95
                    smartButtonTextConverter: angular.noop                                                       // 96
                };                                                                                               // 97
                                                                                                                 // 98
                $scope.texts = {                                                                                 // 99
                    checkAll: 'Check All',                                                                       // 100
                    uncheckAll: 'Uncheck All',                                                                   // 101
                    selectionCount: 'checked',                                                                   // 102
                    selectionOf: '/',                                                                            // 103
                    searchPlaceholder: 'Search...',                                                              // 104
                    buttonDefaultText: 'Select',                                                                 // 105
                    dynamicButtonTextSuffix: 'checked'                                                           // 106
                };                                                                                               // 107
                                                                                                                 // 108
                $scope.searchFilter = $scope.searchFilter || '';                                                 // 109
                                                                                                                 // 110
                if (angular.isDefined($scope.settings.groupBy)) {                                                // 111
                    $scope.$watch('options', function (newValue) {                                               // 112
                        if (angular.isDefined(newValue)) {                                                       // 113
                            $scope.orderedItems = $filter('orderBy')(newValue, $scope.settings.groupBy);         // 114
                        }                                                                                        // 115
                    });                                                                                          // 116
                }                                                                                                // 117
                                                                                                                 // 118
                angular.extend($scope.settings, $scope.extraSettings || []);                                     // 119
                angular.extend($scope.externalEvents, $scope.events || []);                                      // 120
                angular.extend($scope.texts, $scope.translationTexts);                                           // 121
                                                                                                                 // 122
                $scope.singleSelection = $scope.settings.selectionLimit === 1;                                   // 123
                                                                                                                 // 124
                function getFindObj(id) {                                                                        // 125
                    var findObj = {};                                                                            // 126
                                                                                                                 // 127
                    if ($scope.settings.externalIdProp === '') {                                                 // 128
                        findObj[$scope.settings.idProp] = id;                                                    // 129
                    } else {                                                                                     // 130
                        findObj[$scope.settings.externalIdProp] = id;                                            // 131
                    }                                                                                            // 132
                                                                                                                 // 133
                    return findObj;                                                                              // 134
                }                                                                                                // 135
                                                                                                                 // 136
                function clearObject(object) {                                                                   // 137
                    for (var prop in object) {                                                                   // 138
                        delete object[prop];                                                                     // 139
                    }                                                                                            // 140
                }                                                                                                // 141
                                                                                                                 // 142
                if ($scope.singleSelection) {                                                                    // 143
                    if (angular.isArray($scope.selectedModel) && $scope.selectedModel.length === 0) {            // 144
                        clearObject($scope.selectedModel);                                                       // 145
                    }                                                                                            // 146
                }                                                                                                // 147
                                                                                                                 // 148
                if ($scope.settings.closeOnBlur) {                                                               // 149
                    $document.on('click', function (e) {                                                         // 150
                        var target = e.target.parentElement;                                                     // 151
                        var parentFound = false;                                                                 // 152
                                                                                                                 // 153
                        while (angular.isDefined(target) && target !== null && !parentFound) {                   // 154
                            if (_.contains(target.className.split(' '), 'multiselect-parent') && !parentFound) {
                                if(target === $dropdownTrigger) {                                                // 156
                                    parentFound = true;                                                          // 157
                                }                                                                                // 158
                            }                                                                                    // 159
                            target = target.parentElement;                                                       // 160
                        }                                                                                        // 161
                                                                                                                 // 162
                        if (!parentFound) {                                                                      // 163
                            $scope.$apply(function () {                                                          // 164
                                $scope.open = false;                                                             // 165
                            });                                                                                  // 166
                        }                                                                                        // 167
                    });                                                                                          // 168
                }                                                                                                // 169
                                                                                                                 // 170
                $scope.getGroupTitle = function (groupValue) {                                                   // 171
                    if ($scope.settings.groupByTextProvider !== null) {                                          // 172
                        return $scope.settings.groupByTextProvider(groupValue);                                  // 173
                    }                                                                                            // 174
                                                                                                                 // 175
                    return groupValue;                                                                           // 176
                };                                                                                               // 177
                                                                                                                 // 178
                $scope.getButtonText = function () {                                                             // 179
                    if ($scope.settings.dynamicTitle && ($scope.selectedModel.length > 0 || (angular.isObject($scope.selectedModel) && _.keys($scope.selectedModel).length > 0))) {
                        if ($scope.settings.smartButtonMaxItems > 0) {                                           // 181
                            var itemsText = [];                                                                  // 182
                                                                                                                 // 183
                            angular.forEach($scope.options, function (optionItem) {                              // 184
                                if ($scope.isChecked($scope.getPropertyForObject(optionItem, $scope.settings.idProp))) {
                                    var displayText = $scope.getPropertyForObject(optionItem, $scope.settings.displayProp);
                                    var converterResponse = $scope.settings.smartButtonTextConverter(displayText, optionItem);
                                                                                                                 // 188
                                    itemsText.push(converterResponse ? converterResponse : displayText);         // 189
                                }                                                                                // 190
                            });                                                                                  // 191
                                                                                                                 // 192
                            if ($scope.selectedModel.length > $scope.settings.smartButtonMaxItems) {             // 193
                                itemsText = itemsText.slice(0, $scope.settings.smartButtonMaxItems);             // 194
                                itemsText.push('...');                                                           // 195
                            }                                                                                    // 196
                                                                                                                 // 197
                            return itemsText.join(', ');                                                         // 198
                        } else {                                                                                 // 199
                            var totalSelected;                                                                   // 200
                                                                                                                 // 201
                            if ($scope.singleSelection) {                                                        // 202
                                totalSelected = ($scope.selectedModel !== null && angular.isDefined($scope.selectedModel[$scope.settings.idProp])) ? 1 : 0;
                            } else {                                                                             // 204
                                totalSelected = angular.isDefined($scope.selectedModel) ? $scope.selectedModel.length : 0;
                            }                                                                                    // 206
                                                                                                                 // 207
                            if (totalSelected === 0) {                                                           // 208
                                return $scope.texts.buttonDefaultText;                                           // 209
                            } else {                                                                             // 210
                                return totalSelected + ' ' + $scope.texts.dynamicButtonTextSuffix;               // 211
                            }                                                                                    // 212
                        }                                                                                        // 213
                    } else {                                                                                     // 214
                        return $scope.texts.buttonDefaultText;                                                   // 215
                    }                                                                                            // 216
                };                                                                                               // 217
                                                                                                                 // 218
                $scope.getPropertyForObject = function (object, property) {                                      // 219
                    if (angular.isDefined(object) && object.hasOwnProperty(property)) {                          // 220
                        return object[property];                                                                 // 221
                    }                                                                                            // 222
                                                                                                                 // 223
                    return '';                                                                                   // 224
                };                                                                                               // 225
                                                                                                                 // 226
                $scope.selectAll = function () {                                                                 // 227
                    $scope.deselectAll(false);                                                                   // 228
                    $scope.externalEvents.onSelectAll();                                                         // 229
                                                                                                                 // 230
                    angular.forEach($scope.options, function (value) {                                           // 231
                        $scope.setSelectedItem(value[$scope.settings.idProp], true);                             // 232
                    });                                                                                          // 233
                };                                                                                               // 234
                                                                                                                 // 235
                $scope.deselectAll = function (sendEvent) {                                                      // 236
                    sendEvent = sendEvent || true;                                                               // 237
                                                                                                                 // 238
                    if (sendEvent) {                                                                             // 239
                        $scope.externalEvents.onDeselectAll();                                                   // 240
                    }                                                                                            // 241
                                                                                                                 // 242
                    if ($scope.singleSelection) {                                                                // 243
                        clearObject($scope.selectedModel);                                                       // 244
                    } else {                                                                                     // 245
                        $scope.selectedModel.splice(0, $scope.selectedModel.length);                             // 246
                    }                                                                                            // 247
                };                                                                                               // 248
                                                                                                                 // 249
                $scope.setSelectedItem = function (id, dontRemove) {                                             // 250
                    var findObj = getFindObj(id);                                                                // 251
                    var finalObj = null;                                                                         // 252
                                                                                                                 // 253
                    if ($scope.settings.externalIdProp === '') {                                                 // 254
                        finalObj = _.find($scope.options, findObj);                                              // 255
                    } else {                                                                                     // 256
                        finalObj = findObj;                                                                      // 257
                    }                                                                                            // 258
                                                                                                                 // 259
                    if ($scope.singleSelection) {                                                                // 260
                        clearObject($scope.selectedModel);                                                       // 261
                        angular.extend($scope.selectedModel, finalObj);                                          // 262
                        $scope.externalEvents.onItemSelect(finalObj);                                            // 263
                        if ($scope.settings.closeOnSelect) $scope.open = false;                                  // 264
                                                                                                                 // 265
                        return;                                                                                  // 266
                    }                                                                                            // 267
                                                                                                                 // 268
                    dontRemove = dontRemove || false;                                                            // 269
                                                                                                                 // 270
                    var exists = _.findIndex($scope.selectedModel, findObj) !== -1;                              // 271
                                                                                                                 // 272
                    if (!dontRemove && exists) {                                                                 // 273
                        $scope.selectedModel.splice(_.findIndex($scope.selectedModel, findObj), 1);              // 274
                        $scope.externalEvents.onItemDeselect(findObj);                                           // 275
                    } else if (!exists && ($scope.settings.selectionLimit === 0 || $scope.selectedModel.length < $scope.settings.selectionLimit)) {
                        $scope.selectedModel.push(finalObj);                                                     // 277
                        $scope.externalEvents.onItemSelect(finalObj);                                            // 278
                    }                                                                                            // 279
                    if ($scope.settings.closeOnSelect) $scope.open = false;                                      // 280
                };                                                                                               // 281
                                                                                                                 // 282
                $scope.isChecked = function (id) {                                                               // 283
                    if ($scope.singleSelection) {                                                                // 284
                        return $scope.selectedModel !== null && angular.isDefined($scope.selectedModel[$scope.settings.idProp]) && $scope.selectedModel[$scope.settings.idProp] === getFindObj(id)[$scope.settings.idProp];
                    }                                                                                            // 286
                                                                                                                 // 287
                    return _.findIndex($scope.selectedModel, getFindObj(id)) !== -1;                             // 288
                };                                                                                               // 289
                                                                                                                 // 290
                $scope.externalEvents.onInitDone();                                                              // 291
            }                                                                                                    // 292
        };                                                                                                       // 293
}]);                                                                                                             // 294
                                                                                                                 // 295
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['phund:angularjs-dropdown-multiselect'] = {};

})();
