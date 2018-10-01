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
// packages/jortizsao_isteven-angular-multiselect/packages/jortizsao //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
(function () {                                                       // 1
                                                                     // 2
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/jortizsao:isteven-angular-multiselect/isteven-multi-select.js                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/*                                                                                                                     // 1
 * Angular JS Multi Select                                                                                             // 2
 * Creates a dropdown-like button with checkboxes.                                                                     // 3
 *                                                                                                                     // 4
 * Project started on: Tue, 14 Jan 2014 - 5:18:02 PM                                                                   // 5
 * Current version: 4.0.0                                                                                              // 6
 *                                                                                                                     // 7
 * Released under the MIT License                                                                                      // 8
 * --------------------------------------------------------------------------------                                    // 9
 * The MIT License (MIT)                                                                                               // 10
 *                                                                                                                     // 11
 * Copyright (c) 2014 Ignatius Steven (https://github.com/isteven)                                                     // 12
 *                                                                                                                     // 13
 * Permission is hereby granted, free of charge, to any person obtaining a copy                                        // 14
 * of this software and associated documentation files (the "Software"), to deal                                       // 15
 * in the Software without restriction, including without limitation the rights                                        // 16
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell                                           // 17
 * copies of the Software, and to permit persons to whom the Software is                                               // 18
 * furnished to do so, subject to the following conditions:                                                            // 19
 *                                                                                                                     // 20
 * The above copyright notice and this permission notice shall be included in all                                      // 21
 * copies or substantial portions of the Software.                                                                     // 22
 *                                                                                                                     // 23
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR                                          // 24
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,                                            // 25
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE                                         // 26
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER                                              // 27
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,                                       // 28
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE                                       // 29
 * SOFTWARE.                                                                                                           // 30
 * --------------------------------------------------------------------------------                                    // 31
 */                                                                                                                    // 32
                                                                                                                       // 33
'use strict'                                                                                                           // 34
                                                                                                                       // 35
angular.module( 'isteven-multi-select', ['ng'] ).directive( 'istevenMultiSelect' , [ '$sce', '$timeout', '$templateCache', function ( $sce, $timeout, $templateCache ) {
    return {                                                                                                           // 37
        restrict:                                                                                                      // 38
            'AE',                                                                                                      // 39
                                                                                                                       // 40
        scope:                                                                                                         // 41
        {                                                                                                              // 42
            // models                                                                                                  // 43
            inputModel      : '=',                                                                                     // 44
            outputModel     : '=',                                                                                     // 45
                                                                                                                       // 46
            // settings based on attribute                                                                             // 47
            isDisabled      : '=',                                                                                     // 48
                                                                                                                       // 49
            // callbacks                                                                                               // 50
            onClear         : '&',                                                                                     // 51
            onClose         : '&',                                                                                     // 52
            onSearchChange  : '&',                                                                                     // 53
            onItemClick     : '&',                                                                                     // 54
            onOpen          : '&',                                                                                     // 55
            onReset         : '&',                                                                                     // 56
            onSelectAll     : '&',                                                                                     // 57
            onSelectNone    : '&',                                                                                     // 58
                                                                                                                       // 59
            // i18n                                                                                                    // 60
            translation     : '='                                                                                      // 61
        },                                                                                                             // 62
                                                                                                                       // 63
        /*                                                                                                             // 64
         * The rest are attributes. They don't need to be parsed / binded, so we can safely access them by value.      // 65
         * - buttonLabel, directiveId, helperElements, itemLabel, maxLabels, orientation, selectionMode, minSearchLength,
         *   tickProperty, disableProperty, groupProperty, searchProperty, maxHeight, outputProperties                 // 67
         */                                                                                                            // 68
                                                                                                                       // 69
         templateUrl:                                                                                                  // 70
            'isteven-multi-select.htm',                                                                                // 71
                                                                                                                       // 72
        link: function ( $scope, element, attrs ) {                                                                    // 73
                                                                                                                       // 74
            $scope.backUp           = [];                                                                              // 75
            $scope.varButtonLabel   = '';                                                                              // 76
            $scope.spacingProperty  = '';                                                                              // 77
            $scope.indexProperty    = '';                                                                              // 78
            $scope.orientationH     = false;                                                                           // 79
            $scope.orientationV     = true;                                                                            // 80
            $scope.filteredModel    = [];                                                                              // 81
            $scope.inputLabel       = { labelFilter: '' };                                                             // 82
            $scope.tabIndex         = 0;                                                                               // 83
            $scope.lang             = {};                                                                              // 84
            $scope.helperStatus     = {                                                                                // 85
                all     : true,                                                                                        // 86
                none    : true,                                                                                        // 87
                reset   : true,                                                                                        // 88
                filter  : true                                                                                         // 89
            };                                                                                                         // 90
                                                                                                                       // 91
            var                                                                                                        // 92
                prevTabIndex        = 0,                                                                               // 93
                helperItems         = [],                                                                              // 94
                helperItemsLength   = 0,                                                                               // 95
                checkBoxLayer       = '',                                                                              // 96
                scrolled            = false,                                                                           // 97
                selectedItems       = [],                                                                              // 98
                formElements        = [],                                                                              // 99
                vMinSearchLength    = 0,                                                                               // 100
                clickedItem         = null                                                                             // 101
                                                                                                                       // 102
            // v3.0.0                                                                                                  // 103
            // clear button clicked                                                                                    // 104
            $scope.clearClicked = function( e ) {                                                                      // 105
                $scope.inputLabel.labelFilter = '';                                                                    // 106
                $scope.updateFilter();                                                                                 // 107
                $scope.select( 'clear', e );                                                                           // 108
            }                                                                                                          // 109
                                                                                                                       // 110
            // A little hack so that AngularJS ng-repeat can loop using start and end index like a normal loop         // 111
            // http://stackoverflow.com/questions/16824853/way-to-ng-repeat-defined-number-of-times-instead-of-repeating-over-array
            $scope.numberToArray = function( num ) {                                                                   // 113
                return new Array( num );                                                                               // 114
            }                                                                                                          // 115
                                                                                                                       // 116
            // Call this function when user type on the filter field                                                   // 117
            $scope.searchChanged = function() {                                                                        // 118
                if ( $scope.inputLabel.labelFilter.length < vMinSearchLength && $scope.inputLabel.labelFilter.length > 0 ) {
                    return false;                                                                                      // 120
                }                                                                                                      // 121
                $scope.updateFilter();                                                                                 // 122
            }                                                                                                          // 123
                                                                                                                       // 124
            $scope.updateFilter = function()                                                                           // 125
            {                                                                                                          // 126
                // we check by looping from end of input-model                                                         // 127
                $scope.filteredModel = [];                                                                             // 128
                var i = 0;                                                                                             // 129
                                                                                                                       // 130
                if ( typeof $scope.inputModel === 'undefined' ) {                                                      // 131
                    return false;                                                                                      // 132
                }                                                                                                      // 133
                                                                                                                       // 134
                for( i = $scope.inputModel.length - 1; i >= 0; i-- ) {                                                 // 135
                                                                                                                       // 136
                    // if it's group end, we push it to filteredModel[];                                               // 137
                    if ( typeof $scope.inputModel[ i ][ attrs.groupProperty ] !== 'undefined' && $scope.inputModel[ i ][ attrs.groupProperty ] === false ) {
                        $scope.filteredModel.push( $scope.inputModel[ i ] );                                           // 139
                    }                                                                                                  // 140
                                                                                                                       // 141
                    // if it's data                                                                                    // 142
                    var gotData = false;                                                                               // 143
                    if ( typeof $scope.inputModel[ i ][ attrs.groupProperty ] === 'undefined' ) {                        
                                                                                                                       // 145
                        // If we set the search-key attribute, we use this loop.                                       // 146
                        if ( typeof attrs.searchProperty !== 'undefined' && attrs.searchProperty !== '' ) {            // 147
                                                                                                                       // 148
                            for (var key in $scope.inputModel[ i ]  ) {                                                // 149
                                if (                                                                                   // 150
                                    typeof $scope.inputModel[ i ][ key ] !== 'boolean'                                 // 151
                                    && String( $scope.inputModel[ i ][ key ] ).toUpperCase().indexOf( $scope.inputLabel.labelFilter.toUpperCase() ) >= 0                                     
                                    && attrs.searchProperty.indexOf( key ) > -1                                        // 153
                                ) {                                                                                    // 154
                                    gotData = true;                                                                    // 155
                                    break;                                                                             // 156
                                }                                                                                      // 157
                            }                                                                                          // 158
                        }                                                                                              // 159
                        // if there's no search-key attribute, we use this one. Much better on performance.            // 160
                        else {                                                                                         // 161
                            for ( var key in $scope.inputModel[ i ]  ) {                                               // 162
                                if (                                                                                   // 163
                                    typeof $scope.inputModel[ i ][ key ] !== 'boolean'                                 // 164
                                    && String( $scope.inputModel[ i ][ key ] ).toUpperCase().indexOf( $scope.inputLabel.labelFilter.toUpperCase() ) >= 0                                     
                                ) {                                                                                    // 166
                                    gotData = true;                                                                    // 167
                                    break;                                                                             // 168
                                }                                                                                      // 169
                            }                                                                                          // 170
                        }                                                                                              // 171
                                                                                                                       // 172
                        if ( gotData === true ) {                                                                      // 173
                            // push                                                                                    // 174
                            $scope.filteredModel.push( $scope.inputModel[ i ] );                                       // 175
                        }                                                                                              // 176
                    }                                                                                                  // 177
                                                                                                                       // 178
                    // if it's group start                                                                             // 179
                    if ( typeof $scope.inputModel[ i ][ attrs.groupProperty ] !== 'undefined' && $scope.inputModel[ i ][ attrs.groupProperty ] === true ) {
                                                                                                                       // 181
                        if ( typeof $scope.filteredModel[ $scope.filteredModel.length - 1 ][ attrs.groupProperty ] !== 'undefined' 
                                && $scope.filteredModel[ $scope.filteredModel.length - 1 ][ attrs.groupProperty ] === false ) {
                            $scope.filteredModel.pop();                                                                // 184
                        }                                                                                              // 185
                        else {                                                                                         // 186
                            $scope.filteredModel.push( $scope.inputModel[ i ] );                                       // 187
                        }                                                                                              // 188
                    }                                                                                                  // 189
                }                                                                                                      // 190
                                                                                                                       // 191
                $scope.filteredModel.reverse();                                                                        // 192
                                                                                                                       // 193
                $timeout( function() {                                                                                 // 194
                                                                                                                       // 195
                    $scope.getFormElements();                                                                          // 196
                                                                                                                       // 197
                    // Callback: on filter change                                                                      // 198
                    if ( $scope.inputLabel.labelFilter.length > vMinSearchLength ) {                                   // 199
                                                                                                                       // 200
                        var filterObj = [];                                                                            // 201
                                                                                                                       // 202
                        angular.forEach( $scope.filteredModel, function( value, key ) {                                // 203
                            if ( typeof value !== 'undefined' ) {                                                      // 204
                                if ( typeof value[ attrs.groupProperty ] === 'undefined' ) {                                                                    
                                    var tempObj = angular.copy( value );                                               // 206
                                    var index = filterObj.push( tempObj );                                             // 207
                                    delete filterObj[ index - 1 ][ $scope.indexProperty ];                             // 208
                                    delete filterObj[ index - 1 ][ $scope.spacingProperty ];                           // 209
                                }                                                                                      // 210
                            }                                                                                          // 211
                        });                                                                                            // 212
                                                                                                                       // 213
                        $scope.onSearchChange({                                                                        // 214
                            data:                                                                                      // 215
                            {                                                                                          // 216
                                keyword: $scope.inputLabel.labelFilter,                                                // 217
                                result: filterObj                                                                      // 218
                            }                                                                                          // 219
                        });                                                                                            // 220
                    }                                                                                                  // 221
                },0);                                                                                                  // 222
            };                                                                                                         // 223
                                                                                                                       // 224
            // List all the input elements. We need this for our keyboard navigation.                                  // 225
            // This function will be called everytime the filter is updated.                                           // 226
            // Depending on the size of filtered mode, might not good for performance, but oh well..                   // 227
            $scope.getFormElements = function() {                                                                      // 228
                formElements = [];                                                                                     // 229
                                                                                                                       // 230
                var                                                                                                    // 231
                    selectButtons   = [],                                                                              // 232
                    inputField      = [],                                                                              // 233
                    checkboxes      = [],                                                                              // 234
                    clearButton     = [];                                                                              // 235
                                                                                                                       // 236
                // If available, then get select all, select none, and reset buttons                                   // 237
                if ( $scope.helperStatus.all || $scope.helperStatus.none || $scope.helperStatus.reset ) {                                                       
                    selectButtons = element.children().children().next().children().children()[ 0 ].getElementsByTagName( 'button' );                    
                    // If available, then get the search box and the clear button                                      // 240
                    if ( $scope.helperStatus.filter ) {                                                                // 241
                        // Get helper - search and clear button.                                                       // 242
                        inputField =    element.children().children().next().children().children().next()[ 0 ].getElementsByTagName( 'input' );                    
                        clearButton =   element.children().children().next().children().children().next()[ 0 ].getElementsByTagName( 'button' );                        
                    }                                                                                                  // 245
                }                                                                                                      // 246
                else {                                                                                                 // 247
                    if ( $scope.helperStatus.filter ) {                                                                // 248
                        // Get helper - search and clear button.                                                       // 249
                        inputField =    element.children().children().next().children().children()[ 0 ].getElementsByTagName( 'input' );                    
                        clearButton =   element.children().children().next().children().children()[ 0 ].getElementsByTagName( 'button' );
                    }                                                                                                  // 252
                }                                                                                                      // 253
                                                                                                                       // 254
                // Get checkboxes                                                                                      // 255
                if ( !$scope.helperStatus.all && !$scope.helperStatus.none && !$scope.helperStatus.reset && !$scope.helperStatus.filter ) {
                    checkboxes = element.children().children().next()[ 0 ].getElementsByTagName( 'input' );            // 257
                }                                                                                                      // 258
                else {                                                                                                 // 259
                    checkboxes = element.children().children().next().children().next()[ 0 ].getElementsByTagName( 'input' );
                }                                                                                                      // 261
                                                                                                                       // 262
                // Push them into global array formElements[]                                                          // 263
                for ( var i = 0; i < selectButtons.length ; i++ )   { formElements.push( selectButtons[ i ] );  }      // 264
                for ( var i = 0; i < inputField.length ; i++ )      { formElements.push( inputField[ i ] );     }      // 265
                for ( var i = 0; i < clearButton.length ; i++ )     { formElements.push( clearButton[ i ] );    }      // 266
                for ( var i = 0; i < checkboxes.length ; i++ )      { formElements.push( checkboxes[ i ] );     }                                
            }                                                                                                          // 268
                                                                                                                       // 269
            // check if an item has attrs.groupProperty (be it true or false)                                          // 270
            $scope.isGroupMarker = function( item , type ) {                                                           // 271
                if ( typeof item[ attrs.groupProperty ] !== 'undefined' && item[ attrs.groupProperty ] === type ) return true; 
                return false;                                                                                          // 273
            }                                                                                                          // 274
                                                                                                                       // 275
            $scope.removeGroupEndMarker = function( item ) {                                                           // 276
                if ( typeof item[ attrs.groupProperty ] !== 'undefined' && item[ attrs.groupProperty ] === false ) return false; 
                return true;                                                                                           // 278
            }                                                                                                          // 279
                                                                                                                       // 280
            // call this function when an item is clicked                                                              // 281
            $scope.syncItems = function( item, e, ng_repeat_index ) {                                                  // 282
                                                                                                                       // 283
                e.preventDefault();                                                                                    // 284
                e.stopPropagation();                                                                                   // 285
                                                                                                                       // 286
                // if the directive is globaly disabled, do nothing                                                    // 287
                if ( typeof attrs.disableProperty !== 'undefined' && item[ attrs.disableProperty ] === true ) {                                        
                    return false;                                                                                      // 289
                }                                                                                                      // 290
                                                                                                                       // 291
                // if item is disabled, do nothing                                                                     // 292
                if ( typeof attrs.isDisabled !== 'undefined' && $scope.isDisabled === true ) {                         // 293
                    return false;                                                                                      // 294
                }                                                                                                      // 295
                                                                                                                       // 296
                // if end group marker is clicked, do nothing                                                          // 297
                if ( typeof item[ attrs.groupProperty ] !== 'undefined' && item[ attrs.groupProperty ] === false ) {   // 298
                    return false;                                                                                      // 299
                }                                                                                                      // 300
                                                                                                                       // 301
                var index = $scope.filteredModel.indexOf( item );                                                      // 302
                                                                                                                       // 303
                // if the start of group marker is clicked ( only for multiple selection! )                            // 304
                // how it works:                                                                                       // 305
                // - if, in a group, there are items which are not selected, then they all will be selected            // 306
                // - if, in a group, all items are selected, then they all will be de-selected                         // 307
                if ( typeof item[ attrs.groupProperty ] !== 'undefined' && item[ attrs.groupProperty ] === true ) {                                  
                                                                                                                       // 309
                    // this is only for multiple selection, so if selection mode is single, do nothing                 // 310
                    if ( typeof attrs.selectionMode !== 'undefined' && attrs.selectionMode.toUpperCase() === 'SINGLE' ) {
                        return false;                                                                                  // 312
                    }                                                                                                  // 313
                                                                                                                       // 314
                    var i,j,k;                                                                                         // 315
                    var startIndex = 0;                                                                                // 316
                    var endIndex = $scope.filteredModel.length - 1;                                                    // 317
                    var tempArr = [];                                                                                  // 318
                                                                                                                       // 319
                    // nest level is to mark the depth of the group.                                                   // 320
                    // when you get into a group (start group marker), nestLevel++                                     // 321
                    // when you exit a group (end group marker), nextLevel--                                           // 322
                    var nestLevel = 0;                                                                                 // 323
                                                                                                                       // 324
                    // we loop throughout the filtered model (not whole model)                                         // 325
                    for( i = index ; i < $scope.filteredModel.length ; i++) {                                          // 326
                                                                                                                       // 327
                        // this break will be executed when we're done processing each group                           // 328
                        if ( nestLevel === 0 && i > index )                                                            // 329
                        {                                                                                              // 330
                            break;                                                                                     // 331
                        }                                                                                              // 332
                                                                                                                       // 333
                        if ( typeof $scope.filteredModel[ i ][ attrs.groupProperty ] !== 'undefined' && $scope.filteredModel[ i ][ attrs.groupProperty ] === true ) {
                                                                                                                       // 335
                            // To cater multi level grouping                                                           // 336
                            if ( tempArr.length === 0 ) {                                                              // 337
                                startIndex = i + 1;                                                                    // 338
                            }                                                                                          // 339
                            nestLevel = nestLevel + 1;                                                                 // 340
                        }                                                                                              // 341
                                                                                                                       // 342
                        // if group end                                                                                // 343
                        else if ( typeof $scope.filteredModel[ i ][ attrs.groupProperty ] !== 'undefined' && $scope.filteredModel[ i ][ attrs.groupProperty ] === false ) {
                                                                                                                       // 345
                            nestLevel = nestLevel - 1;                                                                 // 346
                                                                                                                       // 347
                            // cek if all are ticked or not                                                            // 348
                            if ( tempArr.length > 0 && nestLevel === 0 ) {                                             // 349
                                                                                                                       // 350
                                var allTicked = true;                                                                  // 351
                                                                                                                       // 352
                                endIndex = i;                                                                          // 353
                                                                                                                       // 354
                                for ( j = 0; j < tempArr.length ; j++ ) {                                              // 355
                                    if ( typeof tempArr[ j ][ $scope.tickProperty ] !== 'undefined' &&  tempArr[ j ][ $scope.tickProperty ] === false ) {
                                        allTicked = false;                                                             // 357
                                        break;                                                                         // 358
                                    }                                                                                  // 359
                                }                                                                                      // 360
                                                                                                                       // 361
                                if ( allTicked === true ) {                                                            // 362
                                    for ( j = startIndex; j <= endIndex ; j++ ) {                                      // 363
                                        if ( typeof $scope.filteredModel[ j ][ attrs.groupProperty ] === 'undefined' ) {
                                            if ( typeof attrs.disableProperty === 'undefined' ) {                      // 365
                                                $scope.filteredModel[ j ][ $scope.tickProperty ] = false;              // 366
                                                // we refresh input model as well                                      // 367
                                                inputModelIndex = $scope.filteredModel[ j ][ $scope.indexProperty ];   // 368
                                                $scope.inputModel[ inputModelIndex ][ $scope.tickProperty ] = false;   // 369
                                            }                                                                          // 370
                                            else if ( $scope.filteredModel[ j ][ attrs.disableProperty ] !== true ) {  // 371
                                                $scope.filteredModel[ j ][ $scope.tickProperty ] = false;              // 372
                                                // we refresh input model as well                                      // 373
                                                inputModelIndex = $scope.filteredModel[ j ][ $scope.indexProperty ];   // 374
                                                $scope.inputModel[ inputModelIndex ][ $scope.tickProperty ] = false;   // 375
                                            }                                                                          // 376
                                        }                                                                              // 377
                                    }                                                                                  // 378
                                }                                                                                      // 379
                                                                                                                       // 380
                                else {                                                                                 // 381
                                    for ( j = startIndex; j <= endIndex ; j++ ) {                                      // 382
                                        if ( typeof $scope.filteredModel[ j ][ attrs.groupProperty ] === 'undefined' ) {
                                            if ( typeof attrs.disableProperty === 'undefined' ) {                      // 384
                                                $scope.filteredModel[ j ][ $scope.tickProperty ] = true;                                                
                                                // we refresh input model as well                                      // 386
                                                inputModelIndex = $scope.filteredModel[ j ][ $scope.indexProperty ];   // 387
                                                $scope.inputModel[ inputModelIndex ][ $scope.tickProperty ] = true;    // 388
                                                                                                                       // 389
                                            }                                                                          // 390
                                            else if ( $scope.filteredModel[ j ][ attrs.disableProperty ] !== true ) {  // 391
                                                $scope.filteredModel[ j ][ $scope.tickProperty ] = true;               // 392
                                                // we refresh input model as well                                      // 393
                                                inputModelIndex = $scope.filteredModel[ j ][ $scope.indexProperty ];   // 394
                                                $scope.inputModel[ inputModelIndex ][ $scope.tickProperty ] = true;    // 395
                                            }                                                                          // 396
                                        }                                                                              // 397
                                    }                                                                                  // 398
                                }                                                                                      // 399
                            }                                                                                          // 400
                        }                                                                                              // 401
                                                                                                                       // 402
                        // if data                                                                                     // 403
                        else {                                                                                         // 404
                            tempArr.push( $scope.filteredModel[ i ] );                                                                                    
                        }                                                                                              // 406
                    }                                                                                                  // 407
                }                                                                                                      // 408
                                                                                                                       // 409
                // if an item (not group marker) is clicked                                                            // 410
                else {                                                                                                 // 411
                                                                                                                       // 412
                    // If it's single selection mode                                                                   // 413
                    if ( typeof attrs.selectionMode !== 'undefined' && attrs.selectionMode.toUpperCase() === 'SINGLE' ) {
                                                                                                                       // 415
                        // first, set everything to false                                                              // 416
                        for( i=0 ; i < $scope.filteredModel.length ; i++) {                                            // 417
                            $scope.filteredModel[ i ][ $scope.tickProperty ] = false;                                  // 418
                        }                                                                                              // 419
                        for( i=0 ; i < $scope.inputModel.length ; i++) {                                               // 420
                            $scope.inputModel[ i ][ $scope.tickProperty ] = false;                                     // 421
                        }                                                                                              // 422
                                                                                                                       // 423
                        // then set the clicked item to true                                                           // 424
                        $scope.filteredModel[ index ][ $scope.tickProperty ] = true;                                                                 
                    }                                                                                                  // 426
                                                                                                                       // 427
                    // Multiple                                                                                        // 428
                    else {                                                                                             // 429
                        $scope.filteredModel[ index ][ $scope.tickProperty ]   = !$scope.filteredModel[ index ][ $scope.tickProperty ];
                    }                                                                                                  // 431
                                                                                                                       // 432
                    // we refresh input model as well                                                                  // 433
                    var inputModelIndex = $scope.filteredModel[ index ][ $scope.indexProperty ];                                        
                    $scope.inputModel[ inputModelIndex ][ $scope.tickProperty ] = $scope.filteredModel[ index ][ $scope.tickProperty ];                    
                }                                                                                                      // 436
                                                                                                                       // 437
                // we execute the callback function here                                                               // 438
                clickedItem = angular.copy( item );                                                                    // 439
                if ( clickedItem !== null ) {                                                                          // 440
                    $timeout( function() {                                                                             // 441
                        delete clickedItem[ $scope.indexProperty ];                                                    // 442
                        delete clickedItem[ $scope.spacingProperty ];                                                  // 443
                        $scope.onItemClick( { data: clickedItem } );                                                   // 444
                        clickedItem = null;                                                                            // 445
                    }, 0 );                                                                                            // 446
                }                                                                                                      // 447
                                                                                                                       // 448
                $scope.refreshOutputModel();                                                                           // 449
                $scope.refreshButton();                                                                                // 450
                                                                                                                       // 451
                // We update the index here                                                                            // 452
                prevTabIndex = $scope.tabIndex;                                                                        // 453
                $scope.tabIndex = ng_repeat_index + helperItemsLength;                                                 // 454
                                                                                                                       // 455
                // Set focus on the hidden checkbox                                                                    // 456
                e.target.focus();                                                                                      // 457
                                                                                                                       // 458
                // set & remove CSS style                                                                              // 459
                $scope.removeFocusStyle( prevTabIndex );                                                               // 460
                $scope.setFocusStyle( $scope.tabIndex );                                                               // 461
                                                                                                                       // 462
                if ( typeof attrs.selectionMode !== 'undefined' && attrs.selectionMode.toUpperCase() === 'SINGLE' ) {  // 463
                    // on single selection mode, we then hide the checkbox layer                                       // 464
                    $scope.toggleCheckboxes( e );                                                                      // 465
                }                                                                                                      // 466
            }                                                                                                          // 467
                                                                                                                       // 468
            // update $scope.outputModel                                                                               // 469
            $scope.refreshOutputModel = function() {                                                                   // 470
                                                                                                                       // 471
                $scope.outputModel  = [];                                                                              // 472
                var                                                                                                    // 473
                    outputProps     = [],                                                                              // 474
                    tempObj         = {};                                                                              // 475
                                                                                                                       // 476
                // v4.0.0                                                                                              // 477
                if ( typeof attrs.outputProperties !== 'undefined' ) {                                                 // 478
                    outputProps = attrs.outputProperties.split(' ');                                                   // 479
                    angular.forEach( $scope.inputModel, function( value, key ) {                                       // 480
                        if (                                                                                           // 481
                            typeof value !== 'undefined'                                                               // 482
                            && typeof value[ attrs.groupProperty ] === 'undefined'                                     // 483
                            && value[ $scope.tickProperty ] === true                                                   // 484
                        ) {                                                                                            // 485
                            tempObj         = {};                                                                      // 486
                            angular.forEach( value, function( value1, key1 ) {                                         // 487
                                if ( outputProps.indexOf( key1 ) > -1 ) {                                                                         
                                    tempObj[ key1 ] = value1;                                                          // 489
                                }                                                                                      // 490
                            });                                                                                        // 491
                            var index = $scope.outputModel.push( tempObj );                                                               
                            delete $scope.outputModel[ index - 1 ][ $scope.indexProperty ];                            // 493
                            delete $scope.outputModel[ index - 1 ][ $scope.spacingProperty ];                                      
                        }                                                                                              // 495
                    });                                                                                                // 496
                }                                                                                                      // 497
                else {                                                                                                 // 498
                    angular.forEach( $scope.inputModel, function( value, key ) {                                       // 499
                        if (                                                                                           // 500
                            typeof value !== 'undefined'                                                               // 501
                            && typeof value[ attrs.groupProperty ] === 'undefined'                                     // 502
                            && value[ $scope.tickProperty ] === true                                                   // 503
                        ) {                                                                                            // 504
                            var temp = angular.copy( value );                                                          // 505
                            var index = $scope.outputModel.push( temp );                                                               
                            delete $scope.outputModel[ index - 1 ][ $scope.indexProperty ];                            // 507
                            delete $scope.outputModel[ index - 1 ][ $scope.spacingProperty ];                                      
                        }                                                                                              // 509
                    });                                                                                                // 510
                }                                                                                                      // 511
            }                                                                                                          // 512
                                                                                                                       // 513
            // refresh button label                                                                                    // 514
            $scope.refreshButton = function() {                                                                        // 515
                                                                                                                       // 516
                $scope.varButtonLabel   = '';                                                                          // 517
                var ctr                 = 0;                                                                           // 518
                                                                                                                       // 519
                // refresh button label...                                                                             // 520
                if ( $scope.outputModel.length === 0 ) {                                                               // 521
                    // https://github.com/isteven/angular-multi-select/pull/19                                         // 522
                    $scope.varButtonLabel = $scope.lang.nothingSelected;                                               // 523
                }                                                                                                      // 524
                else {                                                                                                 // 525
                    var tempMaxLabels = $scope.outputModel.length;                                                     // 526
                    if ( typeof attrs.maxLabels !== 'undefined' && attrs.maxLabels !== '' ) {                          // 527
                        tempMaxLabels = attrs.maxLabels;                                                               // 528
                    }                                                                                                  // 529
                                                                                                                       // 530
                    // if max amount of labels displayed..                                                             // 531
                    if ( $scope.outputModel.length > tempMaxLabels ) {                                                 // 532
                        $scope.more = true;                                                                            // 533
                    }                                                                                                  // 534
                    else {                                                                                             // 535
                        $scope.more = false;                                                                           // 536
                    }                                                                                                  // 537
                                                                                                                       // 538
                    angular.forEach( $scope.inputModel, function( value, key ) {                                       // 539
                        if ( typeof value !== 'undefined' && value[ attrs.tickProperty ] === true ) {                        
                            if ( ctr < tempMaxLabels ) {                                                               // 541
                                $scope.varButtonLabel += ( $scope.varButtonLabel.length > 0 ? '</div>, <div class="buttonLabel">' : '<div class="buttonLabel">') + $scope.writeLabel( value, 'buttonLabel' );
                            }                                                                                          // 543
                            ctr++;                                                                                     // 544
                        }                                                                                              // 545
                    });                                                                                                // 546
                                                                                                                       // 547
                    if ( $scope.more === true ) {                                                                      // 548
                        // https://github.com/isteven/angular-multi-select/pull/16                                     // 549
                        if (tempMaxLabels > 0) {                                                                       // 550
                            $scope.varButtonLabel += ', ... ';                                                         // 551
                        }                                                                                              // 552
                        $scope.varButtonLabel += '(' + $scope.outputModel.length + ')';                                // 553
                    }                                                                                                  // 554
                }                                                                                                      // 555
                $scope.varButtonLabel = $sce.trustAsHtml( $scope.varButtonLabel + '<span class="caret"></span>' );                
            }                                                                                                          // 557
                                                                                                                       // 558
            // Check if a checkbox is disabled or enabled. It will check the granular control (disableProperty) and global control (isDisabled)
            // Take note that the granular control has higher priority.                                                // 560
            $scope.itemIsDisabled = function( item ) {                                                                 // 561
                                                                                                                       // 562
                if ( typeof attrs.disableProperty !== 'undefined' && item[ attrs.disableProperty ] === true ) {                                        
                    return true;                                                                                       // 564
                }                                                                                                      // 565
                else {                                                                                                 // 566
                    if ( $scope.isDisabled === true ) {                                                                // 567
                        return true;                                                                                   // 568
                    }                                                                                                  // 569
                    else {                                                                                             // 570
                        return false;                                                                                  // 571
                    }                                                                                                  // 572
                }                                                                                                      // 573
                                                                                                                       // 574
            }                                                                                                          // 575
                                                                                                                       // 576
            // A simple function to parse the item label settings. Used on the buttons and checkbox labels.            // 577
            $scope.writeLabel = function( item, type ) {                                                               // 578
                                                                                                                       // 579
                // type is either 'itemLabel' or 'buttonLabel'                                                         // 580
                var temp    = attrs[ type ].split( ' ' );                                                              // 581
                var label   = '';                                                                                      // 582
                                                                                                                       // 583
                angular.forEach( temp, function( value, key ) {                                                        // 584
                    item[ value ] && ( label += '&nbsp;' + value.split( '.' ).reduce( function( prev, current ) {      // 585
                        return prev[ current ];                                                                        // 586
                    }, item ));                                                                                        // 587
                });                                                                                                    // 588
                                                                                                                       // 589
                if ( type.toUpperCase() === 'BUTTONLABEL' ) {                                                          // 590
                    return label;                                                                                      // 591
                }                                                                                                      // 592
                return $sce.trustAsHtml( label );                                                                      // 593
            }                                                                                                          // 594
                                                                                                                       // 595
            // UI operations to show/hide checkboxes based on click event..                                            // 596
            $scope.toggleCheckboxes = function( e ) {                                                                  // 597
                                                                                                                       // 598
                // We grab the button                                                                                  // 599
                var clickedEl = element.children()[0];                                                                 // 600
                                                                                                                       // 601
                // Just to make sure.. had a bug where key events were recorded twice                                  // 602
                angular.element( document ).off( 'click', $scope.externalClickListener );                              // 603
                angular.element( document ).off( 'keydown', $scope.keyboardListener );                                 // 604
                                                                                                                       // 605
                // The idea below was taken from another multi-select directive - https://github.com/amitava82/angular-multiselect 
                // His version is awesome if you need a more simple multi-select approach.                                
                                                                                                                       // 608
                // close                                                                                               // 609
                if ( angular.element( checkBoxLayer ).hasClass( 'show' )) {                                            // 610
                                                                                                                       // 611
                    angular.element( checkBoxLayer ).removeClass( 'show' );                                            // 612
                    angular.element( clickedEl ).removeClass( 'buttonClicked' );                                       // 613
                    angular.element( document ).off( 'click', $scope.externalClickListener );                          // 614
                    angular.element( document ).off( 'keydown', $scope.keyboardListener );                                    
                                                                                                                       // 616
                    // clear the focused element;                                                                      // 617
                    $scope.removeFocusStyle( $scope.tabIndex );                                                        // 618
                    if ( typeof formElements[ $scope.tabIndex ] !== 'undefined' ) {                                    // 619
                        formElements[ $scope.tabIndex ].blur();                                                        // 620
                    }                                                                                                  // 621
                                                                                                                       // 622
                    // close callback                                                                                  // 623
                    $timeout( function() {                                                                             // 624
                        $scope.onClose();                                                                              // 625
                    }, 0 );                                                                                            // 626
                                                                                                                       // 627
                    // set focus on button again                                                                       // 628
                    element.children().children()[ 0 ].focus();                                                        // 629
                }                                                                                                      // 630
                // open                                                                                                // 631
                else                                                                                                   // 632
                {                                                                                                      // 633
                    // clear filter                                                                                    // 634
                    $scope.inputLabel.labelFilter = '';                                                                // 635
                    $scope.updateFilter();                                                                             // 636
                                                                                                                       // 637
                    helperItems = [];                                                                                  // 638
                    helperItemsLength = 0;                                                                             // 639
                                                                                                                       // 640
                    angular.element( checkBoxLayer ).addClass( 'show' );                                               // 641
                    angular.element( clickedEl ).addClass( 'buttonClicked' );                                          // 642
                                                                                                                       // 643
                    // Attach change event listener on the input filter.                                               // 644
                    // We need this because ng-change is apparently not an event listener.                             // 645
                    angular.element( document ).on( 'click', $scope.externalClickListener );                           // 646
                    angular.element( document ).on( 'keydown', $scope.keyboardListener );                              // 647
                                                                                                                       // 648
                    // to get the initial tab index, depending on how many helper elements we have.                    // 649
                    // priority is to always focus it on the input filter                                                                
                    $scope.getFormElements();                                                                          // 651
                    $scope.tabIndex = 0;                                                                               // 652
                                                                                                                       // 653
                    var helperContainer = angular.element( element[ 0 ].querySelector( '.helperContainer' ) )[0];                
                                                                                                                       // 655
                    if ( typeof helperContainer !== 'undefined' ) {                                                    // 656
                        for ( var i = 0; i < helperContainer.getElementsByTagName( 'BUTTON' ).length ; i++ ) {         // 657
                            helperItems[ i ] = helperContainer.getElementsByTagName( 'BUTTON' )[ i ];                  // 658
                        }                                                                                              // 659
                        helperItemsLength = helperItems.length + helperContainer.getElementsByTagName( 'INPUT' ).length;
                    }                                                                                                  // 661
                                                                                                                       // 662
                    // focus on the filter element on open.                                                            // 663
                    if ( element[ 0 ].querySelector( '.inputFilter' ) ) {                                              // 664
                        element[ 0 ].querySelector( '.inputFilter' ).focus();                                          // 665
                        $scope.tabIndex = $scope.tabIndex + helperItemsLength - 2;                                     // 666
                        // blur button in vain                                                                         // 667
                        angular.element( element ).children()[ 0 ].blur();                                             // 668
                    }                                                                                                  // 669
                    // if there's no filter then just focus on the first checkbox item                                 // 670
                    else {                                                                                             // 671
                        if ( !$scope.isDisabled ) {                                                                    // 672
                            $scope.tabIndex = $scope.tabIndex + helperItemsLength;                                     // 673
                            if ( $scope.inputModel.length > 0 ) {                                                      // 674
                                formElements[ $scope.tabIndex ].focus();                                               // 675
                                $scope.setFocusStyle( $scope.tabIndex );                                               // 676
                                // blur button in vain                                                                 // 677
                                angular.element( element ).children()[ 0 ].blur();                                     // 678
                            }                                                                                          // 679
                        }                                                                                              // 680
                    }                                                                                                  // 681
                                                                                                                       // 682
                    // open callback                                                                                   // 683
                    $scope.onOpen();                                                                                   // 684
                }                                                                                                      // 685
            }                                                                                                          // 686
                                                                                                                       // 687
            // handle clicks outside the button / multi select layer                                                   // 688
            $scope.externalClickListener = function( e ) {                                                             // 689
                                                                                                                       // 690
                var targetsArr = element.find( e.target.tagName );                                                     // 691
                for (var i = 0; i < targetsArr.length; i++) {                                                          // 692
                    if ( e.target == targetsArr[i] ) {                                                                 // 693
                        return;                                                                                        // 694
                    }                                                                                                  // 695
                }                                                                                                      // 696
                                                                                                                       // 697
                angular.element( checkBoxLayer.previousSibling ).removeClass( 'buttonClicked' );                       // 698
                angular.element( checkBoxLayer ).removeClass( 'show' );                                                // 699
                angular.element( document ).off( 'click', $scope.externalClickListener );                              // 700
                angular.element( document ).off( 'keydown', $scope.keyboardListener );                                 // 701
                                                                                                                       // 702
                // close callback                                                                                      // 703
                $timeout( function() {                                                                                 // 704
                    $scope.onClose();                                                                                  // 705
                }, 0 );                                                                                                // 706
                                                                                                                       // 707
                // set focus on button again                                                                           // 708
                element.children().children()[ 0 ].focus();                                                            // 709
            }                                                                                                          // 710
                                                                                                                       // 711
            // select All / select None / reset buttons                                                                // 712
            $scope.select = function( type, e ) {                                                                      // 713
                                                                                                                       // 714
                var helperIndex = helperItems.indexOf( e.target );                                                     // 715
                $scope.tabIndex = helperIndex;                                                                         // 716
                                                                                                                       // 717
                switch( type.toUpperCase() ) {                                                                         // 718
                    case 'ALL':                                                                                        // 719
                        angular.forEach( $scope.filteredModel, function( value, key ) {                                // 720
                            if ( typeof value !== 'undefined' && value[ attrs.disableProperty ] !== true ) {                                
                                if ( typeof value[ attrs.groupProperty ] === 'undefined' ) {                                
                                    value[ $scope.tickProperty ] = true;                                               // 723
                                }                                                                                      // 724
                            }                                                                                          // 725
                        });                                                                                            // 726
                        $scope.refreshOutputModel();                                                                   // 727
                        $scope.refreshButton();                                                                        // 728
                        $scope.onSelectAll();                                                                          // 729
                        break;                                                                                         // 730
                    case 'NONE':                                                                                       // 731
                        angular.forEach( $scope.filteredModel, function( value, key ) {                                // 732
                            if ( typeof value !== 'undefined' && value[ attrs.disableProperty ] !== true ) {                        
                                if ( typeof value[ attrs.groupProperty ] === 'undefined' ) {                                
                                    value[ $scope.tickProperty ] = false;                                              // 735
                                }                                                                                      // 736
                            }                                                                                          // 737
                        });                                                                                            // 738
                        $scope.refreshOutputModel();                                                                   // 739
                        $scope.refreshButton();                                                                          
                        $scope.onSelectNone();                                                                         // 741
                        break;                                                                                         // 742
                    case 'RESET':                                                                                      // 743
                        angular.forEach( $scope.filteredModel, function( value, key ) {                                // 744
                            if ( typeof value[ attrs.groupProperty ] === 'undefined' && typeof value !== 'undefined' && value[ attrs.disableProperty ] !== true ) {                        
                                var temp = value[ $scope.indexProperty ];                                              // 746
                                value[ $scope.tickProperty ] = $scope.backUp[ temp ][ $scope.tickProperty ];           // 747
                            }                                                                                          // 748
                        });                                                                                            // 749
                        $scope.refreshOutputModel();                                                                   // 750
                        $scope.refreshButton();                                                                          
                        $scope.onReset();                                                                              // 752
                        break;                                                                                         // 753
                    case 'CLEAR':                                                                                      // 754
                        $scope.tabIndex = $scope.tabIndex + 1;                                                         // 755
                        $scope.onClear();                                                                              // 756
                        break;                                                                                         // 757
                    case 'FILTER':                                                                                     // 758
                        $scope.tabIndex = helperItems.length - 1;                                                      // 759
                        break;                                                                                         // 760
                    default:                                                                                           // 761
                }                                                                                                      // 762
            }                                                                                                          // 763
                                                                                                                       // 764
            // just to create a random variable name                                                                   // 765
            function genRandomString( length ) {                                                                       // 766
                var possible    = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';                              // 767
                var temp        = '';                                                                                  // 768
                for( var i=0; i < length; i++ ) {                                                                      // 769
                     temp += possible.charAt( Math.floor( Math.random() * possible.length ));                          // 770
                }                                                                                                      // 771
                return temp;                                                                                           // 772
            }                                                                                                          // 773
                                                                                                                       // 774
            // count leading spaces                                                                                    // 775
            $scope.prepareGrouping = function() {                                                                      // 776
                var spacing     = 0;                                                                                   // 777
                angular.forEach( $scope.filteredModel, function( value, key ) {                                        // 778
                    value[ $scope.spacingProperty ] = spacing;                                                         // 779
                    if ( value[ attrs.groupProperty ] === true ) {                                                     // 780
                        spacing+=2;                                                                                    // 781
                    }                                                                                                  // 782
                    else if ( value[ attrs.groupProperty ] === false ) {                                               // 783
                        spacing-=2;                                                                                    // 784
                    }                                                                                                  // 785
                });                                                                                                    // 786
            }                                                                                                          // 787
                                                                                                                       // 788
            // prepare original index                                                                                  // 789
            $scope.prepareIndex = function() {                                                                         // 790
                var ctr = 0;                                                                                           // 791
                angular.forEach( $scope.filteredModel, function( value, key ) {                                        // 792
                    value[ $scope.indexProperty ] = ctr;                                                               // 793
                    ctr++;                                                                                             // 794
                });                                                                                                    // 795
            }                                                                                                          // 796
                                                                                                                       // 797
            // navigate using up and down arrow                                                                        // 798
            $scope.keyboardListener = function( e ) {                                                                  // 799
                                                                                                                       // 800
                var key = e.keyCode ? e.keyCode : e.which;                                                             // 801
                var isNavigationKey = false;                                                                           // 802
                                                                                                                       // 803
                // ESC key (close)                                                                                     // 804
                if ( key === 27 ) {                                                                                    // 805
                    e.preventDefault();                                                                                // 806
                    e.stopPropagation();                                                                               // 807
                    $scope.toggleCheckboxes( e );                                                                      // 808
                }                                                                                                      // 809
                                                                                                                       // 810
                                                                                                                       // 811
                // next element ( tab, down & right key )                                                              // 812
                else if ( key === 40 || key === 39 || ( !e.shiftKey && key == 9 ) ) {                                  // 813
                                                                                                                       // 814
                    isNavigationKey = true;                                                                            // 815
                    prevTabIndex = $scope.tabIndex;                                                                    // 816
                    $scope.tabIndex++;                                                                                 // 817
                    if ( $scope.tabIndex > formElements.length - 1 ) {                                                 // 818
                        $scope.tabIndex = 0;                                                                           // 819
                        prevTabIndex = formElements.length - 1;                                                        // 820
                    }                                                                                                  // 821
                    while ( formElements[ $scope.tabIndex ].disabled === true ) {                                      // 822
                        $scope.tabIndex++;                                                                             // 823
                        if ( $scope.tabIndex > formElements.length - 1 ) {                                             // 824
                            $scope.tabIndex = 0;                                                                       // 825
                        }                                                                                              // 826
                        if ( $scope.tabIndex === prevTabIndex ) {                                                      // 827
                            break;                                                                                     // 828
                        }                                                                                              // 829
                    }                                                                                                  // 830
                }                                                                                                      // 831
                                                                                                                       // 832
                // prev element ( shift+tab, up & left key )                                                           // 833
                else if ( key === 38 || key === 37 || ( e.shiftKey && key == 9 ) ) {                                   // 834
                    isNavigationKey = true;                                                                            // 835
                    prevTabIndex = $scope.tabIndex;                                                                    // 836
                    $scope.tabIndex--;                                                                                 // 837
                    if ( $scope.tabIndex < 0 ) {                                                                       // 838
                        $scope.tabIndex = formElements.length - 1;                                                     // 839
                        prevTabIndex = 0;                                                                              // 840
                    }                                                                                                  // 841
                    while ( formElements[ $scope.tabIndex ].disabled === true ) {                                      // 842
                        $scope.tabIndex--;                                                                             // 843
                        if ( $scope.tabIndex === prevTabIndex ) {                                                      // 844
                            break;                                                                                     // 845
                        }                                                                                              // 846
                        if ( $scope.tabIndex < 0 ) {                                                                   // 847
                            $scope.tabIndex = formElements.length - 1;                                                 // 848
                        }                                                                                              // 849
                    }                                                                                                  // 850
                }                                                                                                      // 851
                                                                                                                       // 852
                if ( isNavigationKey === true ) {                                                                      // 853
                                                                                                                       // 854
                    e.preventDefault();                                                                                // 855
                                                                                                                       // 856
                    // set focus on the checkbox                                                                       // 857
                    formElements[ $scope.tabIndex ].focus();                                                           // 858
                    var actEl = document.activeElement;                                                                // 859
                                                                                                                       // 860
                    if ( actEl.type.toUpperCase() === 'CHECKBOX' ) {                                                   
                        $scope.setFocusStyle( $scope.tabIndex );                                                       // 862
                        $scope.removeFocusStyle( prevTabIndex );                                                       // 863
                    }                                                                                                  // 864
                    else {                                                                                             // 865
                        $scope.removeFocusStyle( prevTabIndex );                                                       // 866
                        $scope.removeFocusStyle( helperItemsLength );                                                  // 867
                        $scope.removeFocusStyle( formElements.length - 1 );                                            // 868
                    }                                                                                                  // 869
                }                                                                                                      // 870
                                                                                                                       // 871
                isNavigationKey = false;                                                                               // 872
            }                                                                                                          // 873
                                                                                                                       // 874
            // set (add) CSS style on selected row                                                                     // 875
            $scope.setFocusStyle = function( tabIndex ) {                                                              // 876
                angular.element( formElements[ tabIndex ] ).parent().parent().parent().addClass( 'multiSelectFocus' );                        
            }                                                                                                          // 878
                                                                                                                       // 879
            // remove CSS style on selected row                                                                        // 880
            $scope.removeFocusStyle = function( tabIndex ) {                                                           // 881
                angular.element( formElements[ tabIndex ] ).parent().parent().parent().removeClass( 'multiSelectFocus' );
            }                                                                                                          // 883
                                                                                                                       // 884
            /*********************                                                                                     // 885
             *********************                                                                                     // 886
             *                                                                                                         // 887
             * 1) Initializations                                                                                      // 888
             *                                                                                                         // 889
             *********************                                                                                     // 890
             *********************/                                                                                    // 891
                                                                                                                       // 892
            // attrs to $scope - attrs-$scope - attrs - $scope                                                         // 893
            // Copy some properties that will be used on the template. They need to be in the $scope.                  // 894
            $scope.groupProperty    = attrs.groupProperty;                                                             // 895
            $scope.tickProperty     = attrs.tickProperty;                                                              // 896
            $scope.directiveId      = attrs.directiveId;                                                               // 897
                                                                                                                       // 898
            // Unfortunately I need to add these grouping properties into the input model                              // 899
            var tempStr = genRandomString( 5 );                                                                        // 900
            $scope.indexProperty = 'idx_' + tempStr;                                                                   // 901
            $scope.spacingProperty = 'spc_' + tempStr;                                                                 // 902
                                                                                                                       // 903
            // set orientation css                                                                                     // 904
            if ( typeof attrs.orientation !== 'undefined' ) {                                                          // 905
                                                                                                                       // 906
                if ( attrs.orientation.toUpperCase() === 'HORIZONTAL' ) {                                              // 907
                    $scope.orientationH = true;                                                                        // 908
                    $scope.orientationV = false;                                                                       // 909
                }                                                                                                      // 910
                else                                                                                                   // 911
                {                                                                                                      // 912
                    $scope.orientationH = false;                                                                       // 913
                    $scope.orientationV = true;                                                                        // 914
                }                                                                                                      // 915
            }                                                                                                          // 916
                                                                                                                       // 917
            // get elements required for DOM operation                                                                 // 918
            checkBoxLayer = element.children().children().next()[0];                                                   // 919
                                                                                                                       // 920
            // set max-height property if provided                                                                     // 921
            if ( typeof attrs.maxHeight !== 'undefined' ) {                                                            // 922
                var layer = element.children().children().children()[0];                                               // 923
                angular.element( layer ).attr( "style", "height:" + attrs.maxHeight + "; overflow-y:scroll;" );                                
            }                                                                                                          // 925
                                                                                                                       // 926
            // some flags for easier checking                                                                          // 927
            for ( var property in $scope.helperStatus ) {                                                              // 928
                if ( $scope.helperStatus.hasOwnProperty( property )) {                                                 // 929
                    if (                                                                                               // 930
                        typeof attrs.helperElements !== 'undefined'                                                    // 931
                        && attrs.helperElements.toUpperCase().indexOf( property.toUpperCase() ) === -1                 // 932
                    ) {                                                                                                // 933
                        $scope.helperStatus[ property ] = false;                                                       // 934
                    }                                                                                                  // 935
                }                                                                                                      // 936
            }                                                                                                          // 937
            if ( typeof attrs.selectionMode !== 'undefined' && attrs.selectionMode.toUpperCase() === 'SINGLE' )  {     // 938
                $scope.helperStatus[ 'all' ] = false;                                                                  // 939
                $scope.helperStatus[ 'none' ] = false;                                                                 // 940
            }                                                                                                          // 941
                                                                                                                       // 942
            // helper button icons.. I guess you can use html tag here if you want to.                                 // 943
            $scope.icon        = {};                                                                                   // 944
            $scope.icon.selectAll  = '&#10003;';    // a tick icon                                                     // 945
            $scope.icon.selectNone = '&times;';     // x icon                                                          // 946
            $scope.icon.reset      = '&#8630;';     // undo icon                                                       // 947
            // this one is for the selected items                                                                      // 948
            $scope.icon.tickMark   = '&#10003;';    // a tick icon                                                     // 949
                                                                                                                       // 950
            // configurable button labels                                                                              // 951
            if ( typeof attrs.translation !== 'undefined' ) {                                                          // 952
                $scope.lang.selectAll       = $sce.trustAsHtml( $scope.icon.selectAll  + '&nbsp;&nbsp;' + $scope.translation.selectAll );
                $scope.lang.selectNone      = $sce.trustAsHtml( $scope.icon.selectNone + '&nbsp;&nbsp;' + $scope.translation.selectNone );
                $scope.lang.reset           = $sce.trustAsHtml( $scope.icon.reset      + '&nbsp;&nbsp;' + $scope.translation.reset );
                $scope.lang.search          = $scope.translation.search;                                               // 956
                $scope.lang.nothingSelected = $sce.trustAsHtml( $scope.translation.nothingSelected );                  // 957
            }                                                                                                          // 958
            else {                                                                                                     // 959
                $scope.lang.selectAll       = $sce.trustAsHtml( $scope.icon.selectAll  + '&nbsp;&nbsp;Select All' );                
                $scope.lang.selectNone      = $sce.trustAsHtml( $scope.icon.selectNone + '&nbsp;&nbsp;Select None' );  // 961
                $scope.lang.reset           = $sce.trustAsHtml( $scope.icon.reset      + '&nbsp;&nbsp;Reset' );        // 962
                $scope.lang.search          = 'Search...';                                                             // 963
                $scope.lang.nothingSelected = 'None Selected';                                                         // 964
            }                                                                                                          // 965
            $scope.icon.tickMark = $sce.trustAsHtml( $scope.icon.tickMark );                                           // 966
                                                                                                                       // 967
            // min length of keyword to trigger the filter function                                                    // 968
            if ( typeof attrs.MinSearchLength !== 'undefined' && parseInt( attrs.MinSearchLength ) > 0 ) {             // 969
                vMinSearchLength = Math.floor( parseInt( attrs.MinSearchLength ) );                                    // 970
            }                                                                                                          // 971
                                                                                                                       // 972
            /*******************************************************                                                   // 973
             *******************************************************                                                   // 974
             *                                                                                                         // 975
             * 2) Logic starts here, initiated by watch 1 & watch 2                                                    // 976
             *                                                                                                         // 977
             *******************************************************                                                   // 978
             *******************************************************/                                                  // 979
                                                                                                                       // 980
            // watch1, for changes in input model property                                                             // 981
            // updates multi-select when user select/deselect a single checkbox programatically                        // 982
            // https://github.com/isteven/angular-multi-select/issues/8                                                // 983
            $scope.$watch( 'inputModel' , function( newVal ) {                                                         // 984
                if ( newVal ) {                                                                                        // 985
                    $scope.refreshOutputModel();                                                                       // 986
                    $scope.refreshButton();                                                                            // 987
                }                                                                                                      // 988
            }, true );                                                                                                 // 989
                                                                                                                       // 990
            // watch2 for changes in input model as a whole                                                            // 991
            // this on updates the multi-select when a user load a whole new input-model. We also update the $scope.backUp variable
            $scope.$watch( 'inputModel' , function( newVal ) {                                                         // 993
                if ( newVal ) {                                                                                        // 994
                    $scope.backUp = angular.copy( $scope.inputModel );                                                 // 995
                    $scope.updateFilter();                                                                             // 996
                    $scope.prepareGrouping();                                                                          // 997
                    $scope.prepareIndex();                                                                             // 998
                    $scope.refreshOutputModel();                                                                       // 999
                    $scope.refreshButton();                                                                                                                 
                }                                                                                                      // 1001
            });                                                                                                        // 1002
                                                                                                                       // 1003
            // watch for changes in directive state (disabled or enabled)                                              // 1004
            $scope.$watch( 'isDisabled' , function( newVal ) {                                                         // 1005
                $scope.isDisabled = newVal;                                                                            // 1006
            });                                                                                                        // 1007
                                                                                                                       // 1008
            // this is for touch enabled devices. We don't want to hide checkboxes on scroll.                          // 1009
            var onTouchStart = function( e ) {                                                                         // 1010
            	$scope.$apply( function() {                                                                               // 1011
            		$scope.scrolled = false;                                                                                 // 1012
            	});                                                                                                       // 1013
            };                                                                                                         // 1014
            angular.element( document ).bind( 'touchstart', onTouchStart);                                             // 1015
            var onTouchMove = function( e ) {                                                                          // 1016
            	$scope.$apply( function() {                                                                               // 1017
            		$scope.scrolled = true;                                                                                  // 1018
            	});                                                                                                       // 1019
            };                                                                                                         // 1020
            angular.element( document ).bind( 'touchmove', onTouchMove);                                               // 1021
                                                                                                                       // 1022
            // unbind document events to prevent memory leaks                                                          // 1023
            $scope.$on( '$destroy', function () {                                                                      // 1024
			    angular.element( document ).unbind( 'touchstart', onTouchStart);                                                // 1025
            	angular.element( document ).unbind( 'touchmove', onTouchMove);                                            // 1026
            });                                                                                                        // 1027
        }                                                                                                              // 1028
    }                                                                                                                  // 1029
}]).run( [ '$templateCache' , function( $templateCache ) {                                                             // 1030
    var template =                                                                                                     // 1031
        '<span class="multiSelect inlineBlock">' +                                                                     // 1032
            // main button                                                                                             // 1033
            '<button id="{{directiveId}}" type="button"' +                                                             // 1034
                'ng-click="toggleCheckboxes( $event ); refreshSelectedItems(); refreshButton(); prepareGrouping; prepareIndex();"' +
                'ng-bind-html="varButtonLabel"' +                                                                      // 1036
                'ng-disabled="disable-button"' +                                                                       // 1037
            '>' +                                                                                                      // 1038
            '</button>' +                                                                                              // 1039
            // overlay layer                                                                                           // 1040
            '<div class="checkboxLayer">' +                                                                            // 1041
                // container of the helper elements                                                                    // 1042
                '<div class="helperContainer" ng-if="helperStatus.filter || helperStatus.all || helperStatus.none || helperStatus.reset ">' +
                    // container of the first 3 buttons, select all, none and reset                                    // 1044
                    '<div class="line" ng-if="helperStatus.all || helperStatus.none || helperStatus.reset ">' +        // 1045
                        // select all                                                                                  // 1046
                        '<button type="button" class="helperButton"' +                                                 // 1047
                            'ng-disabled="isDisabled"' +                                                               // 1048
                            'ng-if="helperStatus.all"' +                                                               // 1049
                            'ng-click="select( \'all\', $event );"' +                                                  // 1050
                            'ng-bind-html="lang.selectAll">' +                                                         // 1051
                        '</button>'+                                                                                   // 1052
                        // select none                                                                                 // 1053
                        '<button type="button" class="helperButton"' +                                                 // 1054
                            'ng-disabled="isDisabled"' +                                                               // 1055
                            'ng-if="helperStatus.none"' +                                                              // 1056
                            'ng-click="select( \'none\', $event );"' +                                                 // 1057
                            'ng-bind-html="lang.selectNone">' +                                                        // 1058
                        '</button>'+                                                                                   // 1059
                        // reset                                                                                       // 1060
                        '<button type="button" class="helperButton reset"' +                                           // 1061
                            'ng-disabled="isDisabled"' +                                                               // 1062
                            'ng-if="helperStatus.reset"' +                                                             // 1063
                            'ng-click="select( \'reset\', $event );"' +                                                // 1064
                            'ng-bind-html="lang.reset">'+                                                              // 1065
                        '</button>' +                                                                                  // 1066
                    '</div>' +                                                                                         // 1067
                    // the search box                                                                                  // 1068
                    '<div class="line" style="position:relative" ng-if="helperStatus.filter">'+                        // 1069
                        // textfield                                                                                   // 1070
                        '<input placeholder="{{lang.search}}" type="text"' +                                           // 1071
                            'ng-click="select( \'filter\', $event )" '+                                                // 1072
                            'ng-model="inputLabel.labelFilter" '+                                                      // 1073
                            'ng-change="searchChanged()" class="inputFilter"'+                                         // 1074
                            '/>'+                                                                                      // 1075
                        // clear button                                                                                // 1076
                        '<button type="button" class="clearButton" ng-click="clearClicked( $event )" >×</button> '+    // 1077
                    '</div> '+                                                                                         // 1078
                '</div> '+                                                                                             // 1079
                // selection items                                                                                     // 1080
                '<div class="checkBoxContainer">'+                                                                     // 1081
                    '<div '+                                                                                           // 1082
                        'ng-repeat="item in filteredModel | filter:removeGroupEndMarker" class="multiSelectItem"'+     // 1083
                        'ng-class="{selected: item[ tickProperty ], horizontal: orientationH, vertical: orientationV, multiSelectGroup:item[ groupProperty ], disabled:itemIsDisabled( item )}"'+
                        'ng-click="syncItems( item, $event, $index );" '+                                              // 1085
                        'ng-mouseleave="removeFocusStyle( tabIndex );"> '+                                             // 1086
                        // this is the spacing for grouped items                                                       // 1087
                        '<div class="acol" ng-if="item[ spacingProperty ] > 0" ng-repeat="i in numberToArray( item[ spacingProperty ] ) track by $index">'+                        
                    '</div>  '+                                                                                        // 1089
                    '<div class="acol">'+                                                                              // 1090
                        '<label>'+                                                                                     // 1091
                            // input, so that it can accept focus on keyboard click                                    // 1092
                            '<input class="checkbox focusable" type="checkbox" '+                                      // 1093
                                'ng-disabled="itemIsDisabled( item )" '+                                               // 1094
                                'ng-checked="item[ tickProperty ]" '+                                                  // 1095
                                'ng-click="syncItems( item, $event, $index )" />'+                                     // 1096
                            // item label using ng-bind-hteml                                                          // 1097
                            '<span '+                                                                                  // 1098
                                'ng-class="{disabled:itemIsDisabled( item )}" '+                                       // 1099
                                'ng-bind-html="writeLabel( item, \'itemLabel\' )">'+                                   // 1100
                            '</span>'+                                                                                 // 1101
                        '</label>'+                                                                                    // 1102
                    '</div>'+                                                                                          // 1103
                    // the tick/check mark                                                                             // 1104
                    '<span class="tickMark" ng-if="item[ groupProperty ] !== true && item[ tickProperty ] === true" ng-bind-html="icon.tickMark"></span>'+
                '</div>'+                                                                                              // 1106
            '</div>'+                                                                                                  // 1107
        '</div>'+                                                                                                      // 1108
    '</span>';                                                                                                         // 1109
	$templateCache.put( 'isteven-multi-select.htm' , template );                                                          // 1110
}]);                                                                                                                   // 1111
                                                                                                                       // 1112
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     // 1122
}).call(this);                                                       // 1123
                                                                     // 1124
///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['jortizsao:isteven-angular-multiselect'] = {};

})();
