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
var Template = Package['templating-runtime'].Template;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var Spacebars = Package.spacebars.Spacebars;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var data, selected;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/emdagon_bootstrap-multiselect/packages/emdagon_bootstrap-multiselect.js                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
(function () {                                                                                                         // 1
                                                                                                                       // 2
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/emdagon:bootstrap-multiselect/bootstrap-multiselect/dist/js/bootstrap-multiselect.js                    //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
/**                                                                                                                 // 1
 * Bootstrap Multiselect (https://github.com/davidstutz/bootstrap-multiselect)                                      // 2
 *                                                                                                                  // 3
 * Apache License, Version 2.0:                                                                                     // 4
 * Copyright (c) 2012 - 2015 David Stutz                                                                            // 5
 *                                                                                                                  // 6
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not                                      // 7
 * use this file except in compliance with the License. You may obtain a                                            // 8
 * copy of the License at http://www.apache.org/licenses/LICENSE-2.0                                                // 9
 *                                                                                                                  // 10
 * Unless required by applicable law or agreed to in writing, software                                              // 11
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT                                        // 12
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the                                         // 13
 * License for the specific language governing permissions and limitations                                          // 14
 * under the License.                                                                                               // 15
 *                                                                                                                  // 16
 * BSD 3-Clause License:                                                                                            // 17
 * Copyright (c) 2012 - 2015 David Stutz                                                                            // 18
 * All rights reserved.                                                                                             // 19
 *                                                                                                                  // 20
 * Redistribution and use in source and binary forms, with or without                                               // 21
 * modification, are permitted provided that the following conditions are met:                                      // 22
 *    - Redistributions of source code must retain the above copyright notice,                                      // 23
 *      this list of conditions and the following disclaimer.                                                       // 24
 *    - Redistributions in binary form must reproduce the above copyright notice,                                   // 25
 *      this list of conditions and the following disclaimer in the documentation                                   // 26
 *      and/or other materials provided with the distribution.                                                      // 27
 *    - Neither the name of David Stutz nor the names of its contributors may be                                    // 28
 *      used to endorse or promote products derived from this software without                                      // 29
 *      specific prior written permission.                                                                          // 30
 *                                                                                                                  // 31
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"                                      // 32
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,                                            // 33
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR                                           // 34
 * PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR                                                // 35
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,                                            // 36
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,                                              // 37
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;                                      // 38
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,                                         // 39
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR                                          // 40
 * OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF                                           // 41
 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.                                                                       // 42
 */                                                                                                                 // 43
!function ($) {                                                                                                     // 44
    "use strict";// jshint ;_;                                                                                      // 45
                                                                                                                    // 46
    if (typeof ko !== 'undefined' && ko.bindingHandlers && !ko.bindingHandlers.multiselect) {                       // 47
        ko.bindingHandlers.multiselect = {                                                                          // 48
            after: ['options', 'value', 'selectedOptions'],                                                         // 49
                                                                                                                    // 50
            init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {                        // 51
                var $element = $(element);                                                                          // 52
                var config = ko.toJS(valueAccessor());                                                              // 53
                                                                                                                    // 54
                $element.multiselect(config);                                                                       // 55
                                                                                                                    // 56
                if (allBindings.has('options')) {                                                                   // 57
                    var options = allBindings.get('options');                                                       // 58
                    if (ko.isObservable(options)) {                                                                 // 59
                        ko.computed({                                                                               // 60
                            read: function() {                                                                      // 61
                                options();                                                                          // 62
                                setTimeout(function() {                                                             // 63
                                    var ms = $element.data('multiselect');                                          // 64
                                    if (ms)                                                                         // 65
                                        ms.updateOriginalOptions();//Not sure how beneficial this is.               // 66
                                    $element.multiselect('rebuild');                                                // 67
                                }, 1);                                                                              // 68
                            },                                                                                      // 69
                            disposeWhenNodeIsRemoved: element                                                       // 70
                        });                                                                                         // 71
                    }                                                                                               // 72
                }                                                                                                   // 73
                                                                                                                    // 74
                //value and selectedOptions are two-way, so these will be triggered even by our own actions.        // 75
                //It needs some way to tell if they are triggered because of us or because of outside change.       // 76
                //It doesn't loop but it's a waste of processing.                                                   // 77
                if (allBindings.has('value')) {                                                                     // 78
                    var value = allBindings.get('value');                                                           // 79
                    if (ko.isObservable(value)) {                                                                   // 80
                        ko.computed({                                                                               // 81
                            read: function() {                                                                      // 82
                                value();                                                                            // 83
                                setTimeout(function() {                                                             // 84
                                    $element.multiselect('refresh');                                                // 85
                                }, 1);                                                                              // 86
                            },                                                                                      // 87
                            disposeWhenNodeIsRemoved: element                                                       // 88
                        }).extend({ rateLimit: 100, notifyWhenChangesStop: true });                                 // 89
                    }                                                                                               // 90
                }                                                                                                   // 91
                                                                                                                    // 92
                //Switched from arrayChange subscription to general subscription using 'refresh'.                   // 93
                //Not sure performance is any better using 'select' and 'deselect'.                                 // 94
                if (allBindings.has('selectedOptions')) {                                                           // 95
                    var selectedOptions = allBindings.get('selectedOptions');                                       // 96
                    if (ko.isObservable(selectedOptions)) {                                                         // 97
                        ko.computed({                                                                               // 98
                            read: function() {                                                                      // 99
                                selectedOptions();                                                                  // 100
                                setTimeout(function() {                                                             // 101
                                    $element.multiselect('refresh');                                                // 102
                                }, 1);                                                                              // 103
                            },                                                                                      // 104
                            disposeWhenNodeIsRemoved: element                                                       // 105
                        }).extend({ rateLimit: 100, notifyWhenChangesStop: true });                                 // 106
                    }                                                                                               // 107
                }                                                                                                   // 108
                                                                                                                    // 109
                ko.utils.domNodeDisposal.addDisposeCallback(element, function() {                                   // 110
                    $element.multiselect('destroy');                                                                // 111
                });                                                                                                 // 112
            },                                                                                                      // 113
                                                                                                                    // 114
            update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {                      // 115
                var $element = $(element);                                                                          // 116
                var config = ko.toJS(valueAccessor());                                                              // 117
                                                                                                                    // 118
                $element.multiselect('setOptions', config);                                                         // 119
                $element.multiselect('rebuild');                                                                    // 120
            }                                                                                                       // 121
        };                                                                                                          // 122
    }                                                                                                               // 123
                                                                                                                    // 124
    function forEach(array, callback) {                                                                             // 125
        for (var index = 0; index < array.length; ++index) {                                                        // 126
            callback(array[index], index);                                                                          // 127
        }                                                                                                           // 128
    }                                                                                                               // 129
                                                                                                                    // 130
    /**                                                                                                             // 131
     * Constructor to create a new multiselect using the given select.                                              // 132
     *                                                                                                              // 133
     * @param {jQuery} select                                                                                       // 134
     * @param {Object} options                                                                                      // 135
     * @returns {Multiselect}                                                                                       // 136
     */                                                                                                             // 137
    function Multiselect(select, options) {                                                                         // 138
                                                                                                                    // 139
        this.$select = $(select);                                                                                   // 140
                                                                                                                    // 141
        // Placeholder via data attributes                                                                          // 142
        if (this.$select.attr("data-placeholder")) {                                                                // 143
            options.nonSelectedText = this.$select.data("placeholder");                                             // 144
        }                                                                                                           // 145
                                                                                                                    // 146
        this.options = this.mergeOptions($.extend({}, options, this.$select.data()));                               // 147
                                                                                                                    // 148
        // Initialization.                                                                                          // 149
        // We have to clone to create a new reference.                                                              // 150
        this.originalOptions = this.$select.clone()[0].options;                                                     // 151
        this.query = '';                                                                                            // 152
        this.searchTimeout = null;                                                                                  // 153
        this.lastToggledInput = null                                                                                // 154
                                                                                                                    // 155
        this.options.multiple = this.$select.attr('multiple') === "multiple";                                       // 156
        this.options.onChange = $.proxy(this.options.onChange, this);                                               // 157
        this.options.onDropdownShow = $.proxy(this.options.onDropdownShow, this);                                   // 158
        this.options.onDropdownHide = $.proxy(this.options.onDropdownHide, this);                                   // 159
        this.options.onDropdownShown = $.proxy(this.options.onDropdownShown, this);                                 // 160
        this.options.onDropdownHidden = $.proxy(this.options.onDropdownHidden, this);                               // 161
                                                                                                                    // 162
        // Build select all if enabled.                                                                             // 163
        this.buildContainer();                                                                                      // 164
        this.buildButton();                                                                                         // 165
        this.buildDropdown();                                                                                       // 166
        this.buildSelectAll();                                                                                      // 167
        this.buildDropdownOptions();                                                                                // 168
        this.buildFilter();                                                                                         // 169
                                                                                                                    // 170
        this.updateButtonText();                                                                                    // 171
        this.updateSelectAll();                                                                                     // 172
                                                                                                                    // 173
        if (this.options.disableIfEmpty && $('option', this.$select).length <= 0) {                                 // 174
            this.disable();                                                                                         // 175
        }                                                                                                           // 176
                                                                                                                    // 177
        this.$select.hide().after(this.$container);                                                                 // 178
    };                                                                                                              // 179
                                                                                                                    // 180
    Multiselect.prototype = {                                                                                       // 181
                                                                                                                    // 182
        defaults: {                                                                                                 // 183
            /**                                                                                                     // 184
             * Default text function will either print 'None selected' in case no                                   // 185
             * option is selected or a list of the selected options up to a length                                  // 186
             * of 3 selected options.                                                                               // 187
             *                                                                                                      // 188
             * @param {jQuery} options                                                                              // 189
             * @param {jQuery} select                                                                               // 190
             * @returns {String}                                                                                    // 191
             */                                                                                                     // 192
            buttonText: function(options, select) {                                                                 // 193
                if (options.length === 0) {                                                                         // 194
                    return this.nonSelectedText;                                                                    // 195
                }                                                                                                   // 196
                else if (this.allSelectedText                                                                       // 197
                            && options.length === $('option', $(select)).length                                     // 198
                            && $('option', $(select)).length !== 1                                                  // 199
                            && this.multiple) {                                                                     // 200
                                                                                                                    // 201
                    if (this.selectAllNumber) {                                                                     // 202
                        return this.allSelectedText + ' (' + options.length + ')';                                  // 203
                    }                                                                                               // 204
                    else {                                                                                          // 205
                        return this.allSelectedText;                                                                // 206
                    }                                                                                               // 207
                }                                                                                                   // 208
                else if (options.length > this.numberDisplayed) {                                                   // 209
                    return options.length + ' ' + this.nSelectedText;                                               // 210
                }                                                                                                   // 211
                else {                                                                                              // 212
                    var selected = '';                                                                              // 213
                    var delimiter = this.delimiterText;                                                             // 214
                                                                                                                    // 215
                    options.each(function() {                                                                       // 216
                        var label = ($(this).attr('label') !== undefined) ? $(this).attr('label') : $(this).text(); // 217
                        selected += label + delimiter;                                                              // 218
                    });                                                                                             // 219
                                                                                                                    // 220
                    return selected.substr(0, selected.length - 2);                                                 // 221
                }                                                                                                   // 222
            },                                                                                                      // 223
            /**                                                                                                     // 224
             * Updates the title of the button similar to the buttonText function.                                  // 225
             *                                                                                                      // 226
             * @param {jQuery} options                                                                              // 227
             * @param {jQuery} select                                                                               // 228
             * @returns {@exp;selected@call;substr}                                                                 // 229
             */                                                                                                     // 230
            buttonTitle: function(options, select) {                                                                // 231
                if (options.length === 0) {                                                                         // 232
                    return this.nonSelectedText;                                                                    // 233
                }                                                                                                   // 234
                else {                                                                                              // 235
                    var selected = '';                                                                              // 236
                    var delimiter = this.delimiterText;                                                             // 237
                                                                                                                    // 238
                    options.each(function () {                                                                      // 239
                        var label = ($(this).attr('label') !== undefined) ? $(this).attr('label') : $(this).text(); // 240
                        selected += label + delimiter;                                                              // 241
                    });                                                                                             // 242
                    return selected.substr(0, selected.length - 2);                                                 // 243
                }                                                                                                   // 244
            },                                                                                                      // 245
            /**                                                                                                     // 246
             * Create a label.                                                                                      // 247
             *                                                                                                      // 248
             * @param {jQuery} element                                                                              // 249
             * @returns {String}                                                                                    // 250
             */                                                                                                     // 251
            optionLabel: function(element){                                                                         // 252
                return $(element).attr('label') || $(element).text();                                               // 253
            },                                                                                                      // 254
            /**                                                                                                     // 255
             * Triggered on change of the multiselect.                                                              // 256
             *                                                                                                      // 257
             * Not triggered when selecting/deselecting options manually.                                           // 258
             *                                                                                                      // 259
             * @param {jQuery} option                                                                               // 260
             * @param {Boolean} checked                                                                             // 261
             */                                                                                                     // 262
            onChange : function(option, checked) {                                                                  // 263
                                                                                                                    // 264
            },                                                                                                      // 265
            /**                                                                                                     // 266
             * Triggered when the dropdown is shown.                                                                // 267
             *                                                                                                      // 268
             * @param {jQuery} event                                                                                // 269
             */                                                                                                     // 270
            onDropdownShow: function(event) {                                                                       // 271
                                                                                                                    // 272
            },                                                                                                      // 273
            /**                                                                                                     // 274
             * Triggered when the dropdown is hidden.                                                               // 275
             *                                                                                                      // 276
             * @param {jQuery} event                                                                                // 277
             */                                                                                                     // 278
            onDropdownHide: function(event) {                                                                       // 279
                                                                                                                    // 280
            },                                                                                                      // 281
            /**                                                                                                     // 282
             * Triggered after the dropdown is shown.                                                               // 283
             *                                                                                                      // 284
             * @param {jQuery} event                                                                                // 285
             */                                                                                                     // 286
            onDropdownShown: function(event) {                                                                      // 287
                                                                                                                    // 288
            },                                                                                                      // 289
            /**                                                                                                     // 290
             * Triggered after the dropdown is hidden.                                                              // 291
             *                                                                                                      // 292
             * @param {jQuery} event                                                                                // 293
             */                                                                                                     // 294
            onDropdownHidden: function(event) {                                                                     // 295
                                                                                                                    // 296
            },                                                                                                      // 297
            /**                                                                                                     // 298
             * Triggered on select all.                                                                             // 299
             */                                                                                                     // 300
            onSelectAll: function() {                                                                               // 301
                                                                                                                    // 302
            },                                                                                                      // 303
            enableHTML: false,                                                                                      // 304
            buttonClass: 'btn btn-default',                                                                         // 305
            inheritClass: false,                                                                                    // 306
            buttonWidth: 'auto',                                                                                    // 307
            buttonContainer: '<div class="btn-group" />',                                                           // 308
            dropRight: false,                                                                                       // 309
            selectedClass: 'active',                                                                                // 310
            // Maximum height of the dropdown menu.                                                                 // 311
            // If maximum height is exceeded a scrollbar will be displayed.                                         // 312
            maxHeight: false,                                                                                       // 313
            checkboxName: false,                                                                                    // 314
            includeSelectAllOption: false,                                                                          // 315
            includeSelectAllIfMoreThan: 0,                                                                          // 316
            selectAllText: ' Select all',                                                                           // 317
            selectAllValue: 'multiselect-all',                                                                      // 318
            selectAllName: false,                                                                                   // 319
            selectAllNumber: true,                                                                                  // 320
            enableFiltering: false,                                                                                 // 321
            enableCaseInsensitiveFiltering: false,                                                                  // 322
            enableClickableOptGroups: false,                                                                        // 323
            filterPlaceholder: 'Search',                                                                            // 324
            // possible options: 'text', 'value', 'both'                                                            // 325
            filterBehavior: 'text',                                                                                 // 326
            includeFilterClearBtn: true,                                                                            // 327
            preventInputChangeEvent: false,                                                                         // 328
            nonSelectedText: 'None selected',                                                                       // 329
            nSelectedText: 'selected',                                                                              // 330
            allSelectedText: 'All selected',                                                                        // 331
            numberDisplayed: 3,                                                                                     // 332
            disableIfEmpty: false,                                                                                  // 333
            delimiterText: ', ',                                                                                    // 334
            templates: {                                                                                            // 335
                button: '<button type="button" class="multiselect dropdown-toggle" data-toggle="dropdown"><span class="multiselect-selected-text"></span> <b class="caret"></b></button>',
                ul: '<ul class="multiselect-container dropdown-menu"></ul>',                                        // 337
                filter: '<li class="multiselect-item filter"><div class="input-group"><span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span><input class="form-control multiselect-search" type="text"></div></li>',
                filterClearBtn: '<span class="input-group-btn"><button class="btn btn-default multiselect-clear-filter" type="button"><i class="glyphicon glyphicon-remove-circle"></i></button></span>',
                li: '<li><a tabindex="0"><label></label></a></li>',                                                 // 340
                divider: '<li class="multiselect-item divider"></li>',                                              // 341
                liGroup: '<li class="multiselect-item multiselect-group"><label></label></li>'                      // 342
            }                                                                                                       // 343
        },                                                                                                          // 344
                                                                                                                    // 345
        constructor: Multiselect,                                                                                   // 346
                                                                                                                    // 347
        /**                                                                                                         // 348
         * Builds the container of the multiselect.                                                                 // 349
         */                                                                                                         // 350
        buildContainer: function() {                                                                                // 351
            this.$container = $(this.options.buttonContainer);                                                      // 352
            this.$container.on('show.bs.dropdown', this.options.onDropdownShow);                                    // 353
            this.$container.on('hide.bs.dropdown', this.options.onDropdownHide);                                    // 354
            this.$container.on('shown.bs.dropdown', this.options.onDropdownShown);                                  // 355
            this.$container.on('hidden.bs.dropdown', this.options.onDropdownHidden);                                // 356
        },                                                                                                          // 357
                                                                                                                    // 358
        /**                                                                                                         // 359
         * Builds the button of the multiselect.                                                                    // 360
         */                                                                                                         // 361
        buildButton: function() {                                                                                   // 362
            this.$button = $(this.options.templates.button).addClass(this.options.buttonClass);                     // 363
            if (this.$select.attr('class') && this.options.inheritClass) {                                          // 364
                this.$button.addClass(this.$select.attr('class'));                                                  // 365
            }                                                                                                       // 366
            // Adopt active state.                                                                                  // 367
            if (this.$select.prop('disabled')) {                                                                    // 368
                this.disable();                                                                                     // 369
            }                                                                                                       // 370
            else {                                                                                                  // 371
                this.enable();                                                                                      // 372
            }                                                                                                       // 373
                                                                                                                    // 374
            // Manually add button width if set.                                                                    // 375
            if (this.options.buttonWidth && this.options.buttonWidth !== 'auto') {                                  // 376
                this.$button.css({                                                                                  // 377
                    'width' : this.options.buttonWidth,                                                             // 378
                    'overflow' : 'hidden',                                                                          // 379
                    'text-overflow' : 'ellipsis'                                                                    // 380
                });                                                                                                 // 381
                this.$container.css({                                                                               // 382
                    'width': this.options.buttonWidth                                                               // 383
                });                                                                                                 // 384
            }                                                                                                       // 385
                                                                                                                    // 386
            // Keep the tab index from the select.                                                                  // 387
            var tabindex = this.$select.attr('tabindex');                                                           // 388
            if (tabindex) {                                                                                         // 389
                this.$button.attr('tabindex', tabindex);                                                            // 390
            }                                                                                                       // 391
                                                                                                                    // 392
            this.$container.prepend(this.$button);                                                                  // 393
        },                                                                                                          // 394
                                                                                                                    // 395
        /**                                                                                                         // 396
         * Builds the ul representing the dropdown menu.                                                            // 397
         */                                                                                                         // 398
        buildDropdown: function() {                                                                                 // 399
                                                                                                                    // 400
            // Build ul.                                                                                            // 401
            this.$ul = $(this.options.templates.ul);                                                                // 402
                                                                                                                    // 403
            if (this.options.dropRight) {                                                                           // 404
                this.$ul.addClass('pull-right');                                                                    // 405
            }                                                                                                       // 406
                                                                                                                    // 407
            // Set max height of dropdown menu to activate auto scrollbar.                                          // 408
            if (this.options.maxHeight) {                                                                           // 409
                // TODO: Add a class for this option to move the css declarations.                                  // 410
                this.$ul.css({                                                                                      // 411
                    'max-height': this.options.maxHeight + 'px',                                                    // 412
                    'overflow-y': 'auto',                                                                           // 413
                    'overflow-x': 'hidden'                                                                          // 414
                });                                                                                                 // 415
            }                                                                                                       // 416
                                                                                                                    // 417
            this.$container.append(this.$ul);                                                                       // 418
        },                                                                                                          // 419
                                                                                                                    // 420
        /**                                                                                                         // 421
         * Build the dropdown options and binds all nessecary events.                                               // 422
         *                                                                                                          // 423
         * Uses createDivider and createOptionValue to create the necessary options.                                // 424
         */                                                                                                         // 425
        buildDropdownOptions: function() {                                                                          // 426
                                                                                                                    // 427
            this.$select.children().each($.proxy(function(index, element) {                                         // 428
                                                                                                                    // 429
                var $element = $(element);                                                                          // 430
                // Support optgroups and options without a group simultaneously.                                    // 431
                var tag = $element.prop('tagName')                                                                  // 432
                    .toLowerCase();                                                                                 // 433
                                                                                                                    // 434
                if ($element.prop('value') === this.options.selectAllValue) {                                       // 435
                    return;                                                                                         // 436
                }                                                                                                   // 437
                                                                                                                    // 438
                if (tag === 'optgroup') {                                                                           // 439
                    this.createOptgroup(element);                                                                   // 440
                }                                                                                                   // 441
                else if (tag === 'option') {                                                                        // 442
                                                                                                                    // 443
                    if ($element.data('role') === 'divider') {                                                      // 444
                        this.createDivider();                                                                       // 445
                    }                                                                                               // 446
                    else {                                                                                          // 447
                        this.createOptionValue(element);                                                            // 448
                    }                                                                                               // 449
                                                                                                                    // 450
                }                                                                                                   // 451
                                                                                                                    // 452
                // Other illegal tags will be ignored.                                                              // 453
            }, this));                                                                                              // 454
                                                                                                                    // 455
            // Bind the change event on the dropdown elements.                                                      // 456
            $('li input', this.$ul).on('change', $.proxy(function(event) {                                          // 457
                var $target = $(event.target);                                                                      // 458
                                                                                                                    // 459
                var checked = $target.prop('checked') || false;                                                     // 460
                var isSelectAllOption = $target.val() === this.options.selectAllValue;                              // 461
                                                                                                                    // 462
                // Apply or unapply the configured selected class.                                                  // 463
                if (this.options.selectedClass) {                                                                   // 464
                    if (checked) {                                                                                  // 465
                        $target.closest('li')                                                                       // 466
                            .addClass(this.options.selectedClass);                                                  // 467
                    }                                                                                               // 468
                    else {                                                                                          // 469
                        $target.closest('li')                                                                       // 470
                            .removeClass(this.options.selectedClass);                                               // 471
                    }                                                                                               // 472
                }                                                                                                   // 473
                                                                                                                    // 474
                // Get the corresponding option.                                                                    // 475
                var value = $target.val();                                                                          // 476
                var $option = this.getOptionByValue(value);                                                         // 477
                                                                                                                    // 478
                var $optionsNotThis = $('option', this.$select).not($option);                                       // 479
                var $checkboxesNotThis = $('input', this.$container).not($target);                                  // 480
                                                                                                                    // 481
                if (isSelectAllOption) {                                                                            // 482
                    if (checked) {                                                                                  // 483
                        this.selectAll();                                                                           // 484
                    }                                                                                               // 485
                    else {                                                                                          // 486
                        this.deselectAll();                                                                         // 487
                    }                                                                                               // 488
                }                                                                                                   // 489
                                                                                                                    // 490
                if(!isSelectAllOption){                                                                             // 491
                    if (checked) {                                                                                  // 492
                        $option.prop('selected', true);                                                             // 493
                                                                                                                    // 494
                        if (this.options.multiple) {                                                                // 495
                            // Simply select additional option.                                                     // 496
                            $option.prop('selected', true);                                                         // 497
                        }                                                                                           // 498
                        else {                                                                                      // 499
                            // Unselect all other options and corresponding checkboxes.                             // 500
                            if (this.options.selectedClass) {                                                       // 501
                                $($checkboxesNotThis).closest('li').removeClass(this.options.selectedClass);        // 502
                            }                                                                                       // 503
                                                                                                                    // 504
                            $($checkboxesNotThis).prop('checked', false);                                           // 505
                            $optionsNotThis.prop('selected', false);                                                // 506
                                                                                                                    // 507
                            // It's a single selection, so close.                                                   // 508
                            this.$button.click();                                                                   // 509
                        }                                                                                           // 510
                                                                                                                    // 511
                        if (this.options.selectedClass === "active") {                                              // 512
                            $optionsNotThis.closest("a").css("outline", "");                                        // 513
                        }                                                                                           // 514
                    }                                                                                               // 515
                    else {                                                                                          // 516
                        // Unselect option.                                                                         // 517
                        $option.prop('selected', false);                                                            // 518
                    }                                                                                               // 519
                }                                                                                                   // 520
                                                                                                                    // 521
                this.$select.change();                                                                              // 522
                                                                                                                    // 523
                this.updateButtonText();                                                                            // 524
                this.updateSelectAll();                                                                             // 525
                                                                                                                    // 526
                this.options.onChange($option, checked);                                                            // 527
                                                                                                                    // 528
                if(this.options.preventInputChangeEvent) {                                                          // 529
                    return false;                                                                                   // 530
                }                                                                                                   // 531
            }, this));                                                                                              // 532
                                                                                                                    // 533
            $('li a', this.$ul).on('mousedown', function(e) {                                                       // 534
                if (e.shiftKey) {                                                                                   // 535
                    // Prevent selecting text by Shift+click                                                        // 536
                    return false;                                                                                   // 537
                }                                                                                                   // 538
            });                                                                                                     // 539
                                                                                                                    // 540
            $('li a', this.$ul).on('touchstart click', $.proxy(function(event) {                                    // 541
                event.stopPropagation();                                                                            // 542
                                                                                                                    // 543
                var $target = $(event.target);                                                                      // 544
                                                                                                                    // 545
                if (event.shiftKey && this.options.multiple) {                                                      // 546
                    if($target.is("label")){ // Handles checkbox selection manually (see https://github.com/davidstutz/bootstrap-multiselect/issues/431)
                        event.preventDefault();                                                                     // 548
                        $target = $target.find("input");                                                            // 549
                        $target.prop("checked", !$target.prop("checked"));                                          // 550
                    }                                                                                               // 551
                    var checked = $target.prop('checked') || false;                                                 // 552
                                                                                                                    // 553
                    if (this.lastToggledInput !== null && this.lastToggledInput !== $target) { // Make sure we actually have a range
                        var from = $target.closest("li").index();                                                   // 555
                        var to = this.lastToggledInput.closest("li").index();                                       // 556
                                                                                                                    // 557
                        if (from > to) { // Swap the indices                                                        // 558
                            var tmp = to;                                                                           // 559
                            to = from;                                                                              // 560
                            from = tmp;                                                                             // 561
                        }                                                                                           // 562
                                                                                                                    // 563
                        // Make sure we grab all elements since slice excludes the last index                       // 564
                        ++to;                                                                                       // 565
                                                                                                                    // 566
                        // Change the checkboxes and underlying options                                             // 567
                        var range = this.$ul.find("li").slice(from, to).find("input");                              // 568
                                                                                                                    // 569
                        range.prop('checked', checked);                                                             // 570
                                                                                                                    // 571
                        if (this.options.selectedClass) {                                                           // 572
                            range.closest('li')                                                                     // 573
                                .toggleClass(this.options.selectedClass, checked);                                  // 574
                        }                                                                                           // 575
                                                                                                                    // 576
                        for (var i = 0, j = range.length; i < j; i++) {                                             // 577
                            var $checkbox = $(range[i]);                                                            // 578
                                                                                                                    // 579
                            var $option = this.getOptionByValue($checkbox.val());                                   // 580
                                                                                                                    // 581
                            $option.prop('selected', checked);                                                      // 582
                        }                                                                                           // 583
                    }                                                                                               // 584
                                                                                                                    // 585
                    // Trigger the select "change" event                                                            // 586
                    $target.trigger("change");                                                                      // 587
                }                                                                                                   // 588
                                                                                                                    // 589
                // Remembers last clicked option                                                                    // 590
                if($target.is("input") && !$target.closest("li").is(".multiselect-item")){                          // 591
                    this.lastToggledInput = $target;                                                                // 592
                }                                                                                                   // 593
                                                                                                                    // 594
                $target.blur();                                                                                     // 595
            }, this));                                                                                              // 596
                                                                                                                    // 597
            // Keyboard support.                                                                                    // 598
            this.$container.off('keydown.multiselect').on('keydown.multiselect', $.proxy(function(event) {          // 599
                if ($('input[type="text"]', this.$container).is(':focus')) {                                        // 600
                    return;                                                                                         // 601
                }                                                                                                   // 602
                                                                                                                    // 603
                if (event.keyCode === 9 && this.$container.hasClass('open')) {                                      // 604
                    this.$button.click();                                                                           // 605
                }                                                                                                   // 606
                else {                                                                                              // 607
                    var $items = $(this.$container).find("li:not(.divider):not(.disabled) a").filter(":visible");   // 608
                                                                                                                    // 609
                    if (!$items.length) {                                                                           // 610
                        return;                                                                                     // 611
                    }                                                                                               // 612
                                                                                                                    // 613
                    var index = $items.index($items.filter(':focus'));                                              // 614
                                                                                                                    // 615
                    // Navigation up.                                                                               // 616
                    if (event.keyCode === 38 && index > 0) {                                                        // 617
                        index--;                                                                                    // 618
                    }                                                                                               // 619
                    // Navigate down.                                                                               // 620
                    else if (event.keyCode === 40 && index < $items.length - 1) {                                   // 621
                        index++;                                                                                    // 622
                    }                                                                                               // 623
                    else if (!~index) {                                                                             // 624
                        index = 0;                                                                                  // 625
                    }                                                                                               // 626
                                                                                                                    // 627
                    var $current = $items.eq(index);                                                                // 628
                    $current.focus();                                                                               // 629
                                                                                                                    // 630
                    if (event.keyCode === 32 || event.keyCode === 13) {                                             // 631
                        var $checkbox = $current.find('input');                                                     // 632
                                                                                                                    // 633
                        $checkbox.prop("checked", !$checkbox.prop("checked"));                                      // 634
                        $checkbox.change();                                                                         // 635
                    }                                                                                               // 636
                                                                                                                    // 637
                    event.stopPropagation();                                                                        // 638
                    event.preventDefault();                                                                         // 639
                }                                                                                                   // 640
            }, this));                                                                                              // 641
                                                                                                                    // 642
            if(this.options.enableClickableOptGroups && this.options.multiple) {                                    // 643
                $('li.multiselect-group', this.$ul).on('click', $.proxy(function(event) {                           // 644
                    event.stopPropagation();                                                                        // 645
                                                                                                                    // 646
                    var group = $(event.target).parent();                                                           // 647
                                                                                                                    // 648
                    // Search all option in optgroup                                                                // 649
                    var $options = group.nextUntil('li.multiselect-group');                                         // 650
                    var $visibleOptions = $options.filter(":visible:not(.disabled)");                               // 651
                                                                                                                    // 652
                    // check or uncheck items                                                                       // 653
                    var allChecked = true;                                                                          // 654
                    var optionInputs = $visibleOptions.find('input');                                               // 655
                    optionInputs.each(function() {                                                                  // 656
                        allChecked = allChecked && $(this).prop('checked');                                         // 657
                    });                                                                                             // 658
                                                                                                                    // 659
                    optionInputs.prop('checked', !allChecked).trigger('change');                                    // 660
               }, this));                                                                                           // 661
            }                                                                                                       // 662
        },                                                                                                          // 663
                                                                                                                    // 664
        /**                                                                                                         // 665
         * Create an option using the given select option.                                                          // 666
         *                                                                                                          // 667
         * @param {jQuery} element                                                                                  // 668
         */                                                                                                         // 669
        createOptionValue: function(element) {                                                                      // 670
            var $element = $(element);                                                                              // 671
            if ($element.is(':selected')) {                                                                         // 672
                $element.prop('selected', true);                                                                    // 673
            }                                                                                                       // 674
                                                                                                                    // 675
            // Support the label attribute on options.                                                              // 676
            var label = this.options.optionLabel(element);                                                          // 677
            var value = $element.val();                                                                             // 678
            var inputType = this.options.multiple ? "checkbox" : "radio";                                           // 679
                                                                                                                    // 680
            var $li = $(this.options.templates.li);                                                                 // 681
            var $label = $('label', $li);                                                                           // 682
            $label.addClass(inputType);                                                                             // 683
                                                                                                                    // 684
            if (this.options.enableHTML) {                                                                          // 685
                $label.html(" " + label);                                                                           // 686
            }                                                                                                       // 687
            else {                                                                                                  // 688
                $label.text(" " + label);                                                                           // 689
            }                                                                                                       // 690
                                                                                                                    // 691
            var $checkbox = $('<input/>').attr('type', inputType);                                                  // 692
                                                                                                                    // 693
            if (this.options.checkboxName) {                                                                        // 694
                $checkbox.attr('name', this.options.checkboxName);                                                  // 695
            }                                                                                                       // 696
            $label.prepend($checkbox);                                                                              // 697
                                                                                                                    // 698
            var selected = $element.prop('selected') || false;                                                      // 699
            $checkbox.val(value);                                                                                   // 700
                                                                                                                    // 701
            if (value === this.options.selectAllValue) {                                                            // 702
                $li.addClass("multiselect-item multiselect-all");                                                   // 703
                $checkbox.parent().parent()                                                                         // 704
                    .addClass('multiselect-all');                                                                   // 705
            }                                                                                                       // 706
                                                                                                                    // 707
            $label.attr('title', $element.attr('title'));                                                           // 708
                                                                                                                    // 709
            this.$ul.append($li);                                                                                   // 710
                                                                                                                    // 711
            if ($element.is(':disabled')) {                                                                         // 712
                $checkbox.attr('disabled', 'disabled')                                                              // 713
                    .prop('disabled', true)                                                                         // 714
                    .closest('a')                                                                                   // 715
                    .attr("tabindex", "-1")                                                                         // 716
                    .closest('li')                                                                                  // 717
                    .addClass('disabled');                                                                          // 718
            }                                                                                                       // 719
                                                                                                                    // 720
            $checkbox.prop('checked', selected);                                                                    // 721
                                                                                                                    // 722
            if (selected && this.options.selectedClass) {                                                           // 723
                $checkbox.closest('li')                                                                             // 724
                    .addClass(this.options.selectedClass);                                                          // 725
            }                                                                                                       // 726
        },                                                                                                          // 727
                                                                                                                    // 728
        /**                                                                                                         // 729
         * Creates a divider using the given select option.                                                         // 730
         *                                                                                                          // 731
         * @param {jQuery} element                                                                                  // 732
         */                                                                                                         // 733
        createDivider: function(element) {                                                                          // 734
            var $divider = $(this.options.templates.divider);                                                       // 735
            this.$ul.append($divider);                                                                              // 736
        },                                                                                                          // 737
                                                                                                                    // 738
        /**                                                                                                         // 739
         * Creates an optgroup.                                                                                     // 740
         *                                                                                                          // 741
         * @param {jQuery} group                                                                                    // 742
         */                                                                                                         // 743
        createOptgroup: function(group) {                                                                           // 744
            var groupName = $(group).prop('label');                                                                 // 745
                                                                                                                    // 746
            // Add a header for the group.                                                                          // 747
            var $li = $(this.options.templates.liGroup);                                                            // 748
                                                                                                                    // 749
            if (this.options.enableHTML) {                                                                          // 750
                $('label', $li).html(groupName);                                                                    // 751
            }                                                                                                       // 752
            else {                                                                                                  // 753
                $('label', $li).text(groupName);                                                                    // 754
            }                                                                                                       // 755
                                                                                                                    // 756
            if (this.options.enableClickableOptGroups) {                                                            // 757
                $li.addClass('multiselect-group-clickable');                                                        // 758
            }                                                                                                       // 759
                                                                                                                    // 760
            this.$ul.append($li);                                                                                   // 761
                                                                                                                    // 762
            if ($(group).is(':disabled')) {                                                                         // 763
                $li.addClass('disabled');                                                                           // 764
            }                                                                                                       // 765
                                                                                                                    // 766
            // Add the options of the group.                                                                        // 767
            $('option', group).each($.proxy(function(index, element) {                                              // 768
                this.createOptionValue(element);                                                                    // 769
            }, this));                                                                                              // 770
        },                                                                                                          // 771
                                                                                                                    // 772
        /**                                                                                                         // 773
         * Build the selct all.                                                                                     // 774
         *                                                                                                          // 775
         * Checks if a select all has already been created.                                                         // 776
         */                                                                                                         // 777
        buildSelectAll: function() {                                                                                // 778
            if (typeof this.options.selectAllValue === 'number') {                                                  // 779
                this.options.selectAllValue = this.options.selectAllValue.toString();                               // 780
            }                                                                                                       // 781
                                                                                                                    // 782
            var alreadyHasSelectAll = this.hasSelectAll();                                                          // 783
                                                                                                                    // 784
            if (!alreadyHasSelectAll && this.options.includeSelectAllOption && this.options.multiple                // 785
                    && $('option', this.$select).length > this.options.includeSelectAllIfMoreThan) {                // 786
                                                                                                                    // 787
                // Check whether to add a divider after the select all.                                             // 788
                if (this.options.includeSelectAllDivider) {                                                         // 789
                    this.$ul.prepend($(this.options.templates.divider));                                            // 790
                }                                                                                                   // 791
                                                                                                                    // 792
                var $li = $(this.options.templates.li);                                                             // 793
                $('label', $li).addClass("checkbox");                                                               // 794
                                                                                                                    // 795
                if (this.options.enableHTML) {                                                                      // 796
                    $('label', $li).html(" " + this.options.selectAllText);                                         // 797
                }                                                                                                   // 798
                else {                                                                                              // 799
                    $('label', $li).text(" " + this.options.selectAllText);                                         // 800
                }                                                                                                   // 801
                                                                                                                    // 802
                if (this.options.selectAllName) {                                                                   // 803
                    $('label', $li).prepend('<input type="checkbox" name="' + this.options.selectAllName + '" />'); // 804
                }                                                                                                   // 805
                else {                                                                                              // 806
                    $('label', $li).prepend('<input type="checkbox" />');                                           // 807
                }                                                                                                   // 808
                                                                                                                    // 809
                var $checkbox = $('input', $li);                                                                    // 810
                $checkbox.val(this.options.selectAllValue);                                                         // 811
                                                                                                                    // 812
                $li.addClass("multiselect-item multiselect-all");                                                   // 813
                $checkbox.parent().parent()                                                                         // 814
                    .addClass('multiselect-all');                                                                   // 815
                                                                                                                    // 816
                this.$ul.prepend($li);                                                                              // 817
                                                                                                                    // 818
                $checkbox.prop('checked', false);                                                                   // 819
            }                                                                                                       // 820
        },                                                                                                          // 821
                                                                                                                    // 822
        /**                                                                                                         // 823
         * Builds the filter.                                                                                       // 824
         */                                                                                                         // 825
        buildFilter: function() {                                                                                   // 826
                                                                                                                    // 827
            // Build filter if filtering OR case insensitive filtering is enabled and the number of options exceeds (or equals) enableFilterLength.
            if (this.options.enableFiltering || this.options.enableCaseInsensitiveFiltering) {                      // 829
                var enableFilterLength = Math.max(this.options.enableFiltering, this.options.enableCaseInsensitiveFiltering);
                                                                                                                    // 831
                if (this.$select.find('option').length >= enableFilterLength) {                                     // 832
                                                                                                                    // 833
                    this.$filter = $(this.options.templates.filter);                                                // 834
                    $('input', this.$filter).attr('placeholder', this.options.filterPlaceholder);                   // 835
                                                                                                                    // 836
                    // Adds optional filter clear button                                                            // 837
                    if(this.options.includeFilterClearBtn){                                                         // 838
                        var clearBtn = $(this.options.templates.filterClearBtn);                                    // 839
                        clearBtn.on('click', $.proxy(function(event){                                               // 840
                            clearTimeout(this.searchTimeout);                                                       // 841
                            this.$filter.find('.multiselect-search').val('');                                       // 842
                            $('li', this.$ul).show().removeClass("filter-hidden");                                  // 843
                            this.updateSelectAll();                                                                 // 844
                        }, this));                                                                                  // 845
                        this.$filter.find('.input-group').append(clearBtn);                                         // 846
                    }                                                                                               // 847
                                                                                                                    // 848
                    this.$ul.prepend(this.$filter);                                                                 // 849
                                                                                                                    // 850
                    this.$filter.val(this.query).on('click', function(event) {                                      // 851
                        event.stopPropagation();                                                                    // 852
                    }).on('input keydown', $.proxy(function(event) {                                                // 853
                        // Cancel enter key default behaviour                                                       // 854
                        if (event.which === 13) {                                                                   // 855
                          event.preventDefault();                                                                   // 856
                        }                                                                                           // 857
                                                                                                                    // 858
                        // This is useful to catch "keydown" events after the browser has updated the control.      // 859
                        clearTimeout(this.searchTimeout);                                                           // 860
                                                                                                                    // 861
                        this.searchTimeout = this.asyncFunction($.proxy(function() {                                // 862
                                                                                                                    // 863
                            if (this.query !== event.target.value) {                                                // 864
                                this.query = event.target.value;                                                    // 865
                                                                                                                    // 866
                                var currentGroup, currentGroupVisible;                                              // 867
                                $.each($('li', this.$ul), $.proxy(function(index, element) {                        // 868
                                    var value = $('input', element).length > 0 ? $('input', element).val() : "";    // 869
                                    var text = $('label', element).text();                                          // 870
                                                                                                                    // 871
                                    var filterCandidate = '';                                                       // 872
                                    if ((this.options.filterBehavior === 'text')) {                                 // 873
                                        filterCandidate = text;                                                     // 874
                                    }                                                                               // 875
                                    else if ((this.options.filterBehavior === 'value')) {                           // 876
                                        filterCandidate = value;                                                    // 877
                                    }                                                                               // 878
                                    else if (this.options.filterBehavior === 'both') {                              // 879
                                        filterCandidate = text + '\n' + value;                                      // 880
                                    }                                                                               // 881
                                                                                                                    // 882
                                    if (value !== this.options.selectAllValue && text) {                            // 883
                                        // By default lets assume that element is not                               // 884
                                        // interesting for this search.                                             // 885
                                        var showElement = false;                                                    // 886
                                                                                                                    // 887
                                        if (this.options.enableCaseInsensitiveFiltering && filterCandidate.toLowerCase().indexOf(this.query.toLowerCase()) > -1) {
                                            showElement = true;                                                     // 889
                                        }                                                                           // 890
                                        else if (filterCandidate.indexOf(this.query) > -1) {                        // 891
                                            showElement = true;                                                     // 892
                                        }                                                                           // 893
                                                                                                                    // 894
                                        // Toggle current element (group or group item) according to showElement boolean.
                                        $(element).toggle(showElement).toggleClass('filter-hidden', !showElement);  // 896
                                                                                                                    // 897
                                        // Differentiate groups and group items.                                    // 898
                                        if ($(element).hasClass('multiselect-group')) {                             // 899
                                            // Remember group status.                                               // 900
                                            currentGroup = element;                                                 // 901
                                            currentGroupVisible = showElement;                                      // 902
                                        }                                                                           // 903
                                        else {                                                                      // 904
                                            // Show group name when at least one of its items is visible.           // 905
                                            if (showElement) {                                                      // 906
                                                $(currentGroup).show().removeClass('filter-hidden');                // 907
                                            }                                                                       // 908
                                                                                                                    // 909
                                            // Show all group items when group name satisfies filter.               // 910
                                            if (!showElement && currentGroupVisible) {                              // 911
                                                $(element).show().removeClass('filter-hidden');                     // 912
                                            }                                                                       // 913
                                        }                                                                           // 914
                                    }                                                                               // 915
                                }, this));                                                                          // 916
                            }                                                                                       // 917
                                                                                                                    // 918
                            this.updateSelectAll();                                                                 // 919
                        }, this), 300, this);                                                                       // 920
                    }, this));                                                                                      // 921
                }                                                                                                   // 922
            }                                                                                                       // 923
        },                                                                                                          // 924
                                                                                                                    // 925
        /**                                                                                                         // 926
         * Unbinds the whole plugin.                                                                                // 927
         */                                                                                                         // 928
        destroy: function() {                                                                                       // 929
            this.$container.remove();                                                                               // 930
            this.$select.show();                                                                                    // 931
            this.$select.data('multiselect', null);                                                                 // 932
        },                                                                                                          // 933
                                                                                                                    // 934
        /**                                                                                                         // 935
         * Refreshs the multiselect based on the selected options of the select.                                    // 936
         */                                                                                                         // 937
        refresh: function() {                                                                                       // 938
            $('option', this.$select).each($.proxy(function(index, element) {                                       // 939
                var $input = $('li input', this.$ul).filter(function() {                                            // 940
                    return $(this).val() === $(element).val();                                                      // 941
                });                                                                                                 // 942
                                                                                                                    // 943
                if ($(element).is(':selected')) {                                                                   // 944
                    $input.prop('checked', true);                                                                   // 945
                                                                                                                    // 946
                    if (this.options.selectedClass) {                                                               // 947
                        $input.closest('li')                                                                        // 948
                            .addClass(this.options.selectedClass);                                                  // 949
                    }                                                                                               // 950
                }                                                                                                   // 951
                else {                                                                                              // 952
                    $input.prop('checked', false);                                                                  // 953
                                                                                                                    // 954
                    if (this.options.selectedClass) {                                                               // 955
                        $input.closest('li')                                                                        // 956
                            .removeClass(this.options.selectedClass);                                               // 957
                    }                                                                                               // 958
                }                                                                                                   // 959
                                                                                                                    // 960
                if ($(element).is(":disabled")) {                                                                   // 961
                    $input.attr('disabled', 'disabled')                                                             // 962
                        .prop('disabled', true)                                                                     // 963
                        .closest('li')                                                                              // 964
                        .addClass('disabled');                                                                      // 965
                }                                                                                                   // 966
                else {                                                                                              // 967
                    $input.prop('disabled', false)                                                                  // 968
                        .closest('li')                                                                              // 969
                        .removeClass('disabled');                                                                   // 970
                }                                                                                                   // 971
            }, this));                                                                                              // 972
                                                                                                                    // 973
            this.updateButtonText();                                                                                // 974
            this.updateSelectAll();                                                                                 // 975
        },                                                                                                          // 976
                                                                                                                    // 977
        /**                                                                                                         // 978
         * Select all options of the given values.                                                                  // 979
         *                                                                                                          // 980
         * If triggerOnChange is set to true, the on change event is triggered if                                   // 981
         * and only if one value is passed.                                                                         // 982
         *                                                                                                          // 983
         * @param {Array} selectValues                                                                              // 984
         * @param {Boolean} triggerOnChange                                                                         // 985
         */                                                                                                         // 986
        select: function(selectValues, triggerOnChange) {                                                           // 987
            if(!$.isArray(selectValues)) {                                                                          // 988
                selectValues = [selectValues];                                                                      // 989
            }                                                                                                       // 990
                                                                                                                    // 991
            for (var i = 0; i < selectValues.length; i++) {                                                         // 992
                var value = selectValues[i];                                                                        // 993
                                                                                                                    // 994
                if (value === null || value === undefined) {                                                        // 995
                    continue;                                                                                       // 996
                }                                                                                                   // 997
                                                                                                                    // 998
                var $option = this.getOptionByValue(value);                                                         // 999
                var $checkbox = this.getInputByValue(value);                                                        // 1000
                                                                                                                    // 1001
                if($option === undefined || $checkbox === undefined) {                                              // 1002
                    continue;                                                                                       // 1003
                }                                                                                                   // 1004
                                                                                                                    // 1005
                if (!this.options.multiple) {                                                                       // 1006
                    this.deselectAll(false);                                                                        // 1007
                }                                                                                                   // 1008
                                                                                                                    // 1009
                if (this.options.selectedClass) {                                                                   // 1010
                    $checkbox.closest('li')                                                                         // 1011
                        .addClass(this.options.selectedClass);                                                      // 1012
                }                                                                                                   // 1013
                                                                                                                    // 1014
                $checkbox.prop('checked', true);                                                                    // 1015
                $option.prop('selected', true);                                                                     // 1016
                                                                                                                    // 1017
                if (triggerOnChange) {                                                                              // 1018
                    this.options.onChange($option, true);                                                           // 1019
                }                                                                                                   // 1020
            }                                                                                                       // 1021
                                                                                                                    // 1022
            this.updateButtonText();                                                                                // 1023
            this.updateSelectAll();                                                                                 // 1024
        },                                                                                                          // 1025
                                                                                                                    // 1026
        /**                                                                                                         // 1027
         * Clears all selected items.                                                                               // 1028
         */                                                                                                         // 1029
        clearSelection: function () {                                                                               // 1030
            this.deselectAll(false);                                                                                // 1031
            this.updateButtonText();                                                                                // 1032
            this.updateSelectAll();                                                                                 // 1033
        },                                                                                                          // 1034
                                                                                                                    // 1035
        /**                                                                                                         // 1036
         * Deselects all options of the given values.                                                               // 1037
         *                                                                                                          // 1038
         * If triggerOnChange is set to true, the on change event is triggered, if                                  // 1039
         * and only if one value is passed.                                                                         // 1040
         *                                                                                                          // 1041
         * @param {Array} deselectValues                                                                            // 1042
         * @param {Boolean} triggerOnChange                                                                         // 1043
         */                                                                                                         // 1044
        deselect: function(deselectValues, triggerOnChange) {                                                       // 1045
            if(!$.isArray(deselectValues)) {                                                                        // 1046
                deselectValues = [deselectValues];                                                                  // 1047
            }                                                                                                       // 1048
                                                                                                                    // 1049
            for (var i = 0; i < deselectValues.length; i++) {                                                       // 1050
                var value = deselectValues[i];                                                                      // 1051
                                                                                                                    // 1052
                if (value === null || value === undefined) {                                                        // 1053
                    continue;                                                                                       // 1054
                }                                                                                                   // 1055
                                                                                                                    // 1056
                var $option = this.getOptionByValue(value);                                                         // 1057
                var $checkbox = this.getInputByValue(value);                                                        // 1058
                                                                                                                    // 1059
                if($option === undefined || $checkbox === undefined) {                                              // 1060
                    continue;                                                                                       // 1061
                }                                                                                                   // 1062
                                                                                                                    // 1063
                if (this.options.selectedClass) {                                                                   // 1064
                    $checkbox.closest('li')                                                                         // 1065
                        .removeClass(this.options.selectedClass);                                                   // 1066
                }                                                                                                   // 1067
                                                                                                                    // 1068
                $checkbox.prop('checked', false);                                                                   // 1069
                $option.prop('selected', false);                                                                    // 1070
                                                                                                                    // 1071
                if (triggerOnChange) {                                                                              // 1072
                    this.options.onChange($option, false);                                                          // 1073
                }                                                                                                   // 1074
            }                                                                                                       // 1075
                                                                                                                    // 1076
            this.updateButtonText();                                                                                // 1077
            this.updateSelectAll();                                                                                 // 1078
        },                                                                                                          // 1079
                                                                                                                    // 1080
        /**                                                                                                         // 1081
         * Selects all enabled & visible options.                                                                   // 1082
         *                                                                                                          // 1083
         * If justVisible is true or not specified, only visible options are selected.                              // 1084
         *                                                                                                          // 1085
         * @param {Boolean} justVisible                                                                             // 1086
         * @param {Boolean} triggerOnSelectAll                                                                      // 1087
         */                                                                                                         // 1088
        selectAll: function (justVisible, triggerOnSelectAll) {                                                     // 1089
            var justVisible = typeof justVisible === 'undefined' ? true : justVisible;                              // 1090
            var allCheckboxes = $("li input[type='checkbox']:enabled", this.$ul);                                   // 1091
            var visibleCheckboxes = allCheckboxes.filter(":visible");                                               // 1092
            var allCheckboxesCount = allCheckboxes.length;                                                          // 1093
            var visibleCheckboxesCount = visibleCheckboxes.length;                                                  // 1094
                                                                                                                    // 1095
            if(justVisible) {                                                                                       // 1096
                visibleCheckboxes.prop('checked', true);                                                            // 1097
                $("li:not(.divider):not(.disabled)", this.$ul).filter(":visible").addClass(this.options.selectedClass);
            }                                                                                                       // 1099
            else {                                                                                                  // 1100
                allCheckboxes.prop('checked', true);                                                                // 1101
                $("li:not(.divider):not(.disabled)", this.$ul).addClass(this.options.selectedClass);                // 1102
            }                                                                                                       // 1103
                                                                                                                    // 1104
            if (allCheckboxesCount === visibleCheckboxesCount || justVisible === false) {                           // 1105
                $("option:enabled", this.$select).prop('selected', true);                                           // 1106
            }                                                                                                       // 1107
            else {                                                                                                  // 1108
                var values = visibleCheckboxes.map(function() {                                                     // 1109
                    return $(this).val();                                                                           // 1110
                }).get();                                                                                           // 1111
                                                                                                                    // 1112
                $("option:enabled", this.$select).filter(function(index) {                                          // 1113
                    return $.inArray($(this).val(), values) !== -1;                                                 // 1114
                }).prop('selected', true);                                                                          // 1115
            }                                                                                                       // 1116
                                                                                                                    // 1117
            if (triggerOnSelectAll) {                                                                               // 1118
                this.options.onSelectAll();                                                                         // 1119
            }                                                                                                       // 1120
        },                                                                                                          // 1121
                                                                                                                    // 1122
        /**                                                                                                         // 1123
         * Deselects all options.                                                                                   // 1124
         *                                                                                                          // 1125
         * If justVisible is true or not specified, only visible options are deselected.                            // 1126
         *                                                                                                          // 1127
         * @param {Boolean} justVisible                                                                             // 1128
         */                                                                                                         // 1129
        deselectAll: function (justVisible) {                                                                       // 1130
            var justVisible = typeof justVisible === 'undefined' ? true : justVisible;                              // 1131
                                                                                                                    // 1132
            if(justVisible) {                                                                                       // 1133
                var visibleCheckboxes = $("li input[type='checkbox']:not(:disabled)", this.$ul).filter(":visible"); // 1134
                visibleCheckboxes.prop('checked', false);                                                           // 1135
                                                                                                                    // 1136
                var values = visibleCheckboxes.map(function() {                                                     // 1137
                    return $(this).val();                                                                           // 1138
                }).get();                                                                                           // 1139
                                                                                                                    // 1140
                $("option:enabled", this.$select).filter(function(index) {                                          // 1141
                    return $.inArray($(this).val(), values) !== -1;                                                 // 1142
                }).prop('selected', false);                                                                         // 1143
                                                                                                                    // 1144
                if (this.options.selectedClass) {                                                                   // 1145
                    $("li:not(.divider):not(.disabled)", this.$ul).filter(":visible").removeClass(this.options.selectedClass);
                }                                                                                                   // 1147
            }                                                                                                       // 1148
            else {                                                                                                  // 1149
                $("li input[type='checkbox']:enabled", this.$ul).prop('checked', false);                            // 1150
                $("option:enabled", this.$select).prop('selected', false);                                          // 1151
                                                                                                                    // 1152
                if (this.options.selectedClass) {                                                                   // 1153
                    $("li:not(.divider):not(.disabled)", this.$ul).removeClass(this.options.selectedClass);         // 1154
                }                                                                                                   // 1155
            }                                                                                                       // 1156
        },                                                                                                          // 1157
                                                                                                                    // 1158
        /**                                                                                                         // 1159
         * Rebuild the plugin.                                                                                      // 1160
         *                                                                                                          // 1161
         * Rebuilds the dropdown, the filter and the select all option.                                             // 1162
         */                                                                                                         // 1163
        rebuild: function() {                                                                                       // 1164
            this.$ul.html('');                                                                                      // 1165
                                                                                                                    // 1166
            // Important to distinguish between radios and checkboxes.                                              // 1167
            this.options.multiple = this.$select.attr('multiple') === "multiple";                                   // 1168
                                                                                                                    // 1169
            this.buildSelectAll();                                                                                  // 1170
            this.buildDropdownOptions();                                                                            // 1171
            this.buildFilter();                                                                                     // 1172
                                                                                                                    // 1173
            this.updateButtonText();                                                                                // 1174
            this.updateSelectAll();                                                                                 // 1175
                                                                                                                    // 1176
            if (this.options.disableIfEmpty && $('option', this.$select).length <= 0) {                             // 1177
                this.disable();                                                                                     // 1178
            }                                                                                                       // 1179
            else {                                                                                                  // 1180
                this.enable();                                                                                      // 1181
            }                                                                                                       // 1182
                                                                                                                    // 1183
            if (this.options.dropRight) {                                                                           // 1184
                this.$ul.addClass('pull-right');                                                                    // 1185
            }                                                                                                       // 1186
        },                                                                                                          // 1187
                                                                                                                    // 1188
        /**                                                                                                         // 1189
         * The provided data will be used to build the dropdown.                                                    // 1190
         */                                                                                                         // 1191
        dataprovider: function(dataprovider) {                                                                      // 1192
                                                                                                                    // 1193
            var groupCounter = 0;                                                                                   // 1194
            var $select = this.$select.empty();                                                                     // 1195
                                                                                                                    // 1196
            $.each(dataprovider, function (index, option) {                                                         // 1197
                var $tag;                                                                                           // 1198
                                                                                                                    // 1199
                if ($.isArray(option.children)) { // create optiongroup tag                                         // 1200
                    groupCounter++;                                                                                 // 1201
                                                                                                                    // 1202
                    $tag = $('<optgroup/>').attr({                                                                  // 1203
                        label: option.label || 'Group ' + groupCounter,                                             // 1204
                        disabled: !!option.disabled                                                                 // 1205
                    });                                                                                             // 1206
                                                                                                                    // 1207
                    forEach(option.children, function(subOption) { // add children option tags                      // 1208
                        $tag.append($('<option/>').attr({                                                           // 1209
                            value: subOption.value,                                                                 // 1210
                            label: subOption.label || subOption.value,                                              // 1211
                            title: subOption.title,                                                                 // 1212
                            selected: !!subOption.selected,                                                         // 1213
                            disabled: !!subOption.disabled                                                          // 1214
                        }));                                                                                        // 1215
                    });                                                                                             // 1216
                }                                                                                                   // 1217
                else {                                                                                              // 1218
                    $tag = $('<option/>').attr({                                                                    // 1219
                        value: option.value,                                                                        // 1220
                        label: option.label || option.value,                                                        // 1221
                        title: option.title,                                                                        // 1222
                        selected: !!option.selected,                                                                // 1223
                        disabled: !!option.disabled                                                                 // 1224
                    });                                                                                             // 1225
                }                                                                                                   // 1226
                                                                                                                    // 1227
                $select.append($tag);                                                                               // 1228
            });                                                                                                     // 1229
                                                                                                                    // 1230
            this.rebuild();                                                                                         // 1231
        },                                                                                                          // 1232
                                                                                                                    // 1233
        /**                                                                                                         // 1234
         * Enable the multiselect.                                                                                  // 1235
         */                                                                                                         // 1236
        enable: function() {                                                                                        // 1237
            this.$select.prop('disabled', false);                                                                   // 1238
            this.$button.prop('disabled', false)                                                                    // 1239
                .removeClass('disabled');                                                                           // 1240
        },                                                                                                          // 1241
                                                                                                                    // 1242
        /**                                                                                                         // 1243
         * Disable the multiselect.                                                                                 // 1244
         */                                                                                                         // 1245
        disable: function() {                                                                                       // 1246
            this.$select.prop('disabled', true);                                                                    // 1247
            this.$button.prop('disabled', true)                                                                     // 1248
                .addClass('disabled');                                                                              // 1249
        },                                                                                                          // 1250
                                                                                                                    // 1251
        /**                                                                                                         // 1252
         * Set the options.                                                                                         // 1253
         *                                                                                                          // 1254
         * @param {Array} options                                                                                   // 1255
         */                                                                                                         // 1256
        setOptions: function(options) {                                                                             // 1257
            this.options = this.mergeOptions(options);                                                              // 1258
        },                                                                                                          // 1259
                                                                                                                    // 1260
        /**                                                                                                         // 1261
         * Merges the given options with the default options.                                                       // 1262
         *                                                                                                          // 1263
         * @param {Array} options                                                                                   // 1264
         * @returns {Array}                                                                                         // 1265
         */                                                                                                         // 1266
        mergeOptions: function(options) {                                                                           // 1267
            return $.extend(true, {}, this.defaults, this.options, options);                                        // 1268
        },                                                                                                          // 1269
                                                                                                                    // 1270
        /**                                                                                                         // 1271
         * Checks whether a select all checkbox is present.                                                         // 1272
         *                                                                                                          // 1273
         * @returns {Boolean}                                                                                       // 1274
         */                                                                                                         // 1275
        hasSelectAll: function() {                                                                                  // 1276
            return $('li.multiselect-all', this.$ul).length > 0;                                                    // 1277
        },                                                                                                          // 1278
                                                                                                                    // 1279
        /**                                                                                                         // 1280
         * Updates the select all checkbox based on the currently displayed and selected checkboxes.                // 1281
         */                                                                                                         // 1282
        updateSelectAll: function() {                                                                               // 1283
            if (this.hasSelectAll()) {                                                                              // 1284
                var allBoxes = $("li:not(.multiselect-item):not(.filter-hidden) input:enabled", this.$ul);          // 1285
                var allBoxesLength = allBoxes.length;                                                               // 1286
                var checkedBoxesLength = allBoxes.filter(":checked").length;                                        // 1287
                var selectAllLi  = $("li.multiselect-all", this.$ul);                                               // 1288
                var selectAllInput = selectAllLi.find("input");                                                     // 1289
                                                                                                                    // 1290
                if (checkedBoxesLength > 0 && checkedBoxesLength === allBoxesLength) {                              // 1291
                    selectAllInput.prop("checked", true);                                                           // 1292
                    selectAllLi.addClass(this.options.selectedClass);                                               // 1293
                    this.options.onSelectAll();                                                                     // 1294
                }                                                                                                   // 1295
                else {                                                                                              // 1296
                    selectAllInput.prop("checked", false);                                                          // 1297
                    selectAllLi.removeClass(this.options.selectedClass);                                            // 1298
                }                                                                                                   // 1299
            }                                                                                                       // 1300
        },                                                                                                          // 1301
                                                                                                                    // 1302
        /**                                                                                                         // 1303
         * Update the button text and its title based on the currently selected options.                            // 1304
         */                                                                                                         // 1305
        updateButtonText: function() {                                                                              // 1306
            var options = this.getSelected();                                                                       // 1307
                                                                                                                    // 1308
            // First update the displayed button text.                                                              // 1309
            if (this.options.enableHTML) {                                                                          // 1310
                $('.multiselect .multiselect-selected-text', this.$container).html(this.options.buttonText(options, this.$select));
            }                                                                                                       // 1312
            else {                                                                                                  // 1313
                $('.multiselect .multiselect-selected-text', this.$container).text(this.options.buttonText(options, this.$select));
            }                                                                                                       // 1315
                                                                                                                    // 1316
            // Now update the title attribute of the button.                                                        // 1317
            $('.multiselect', this.$container).attr('title', this.options.buttonTitle(options, this.$select));      // 1318
        },                                                                                                          // 1319
                                                                                                                    // 1320
        /**                                                                                                         // 1321
         * Get all selected options.                                                                                // 1322
         *                                                                                                          // 1323
         * @returns {jQUery}                                                                                        // 1324
         */                                                                                                         // 1325
        getSelected: function() {                                                                                   // 1326
            return $('option', this.$select).filter(":selected");                                                   // 1327
        },                                                                                                          // 1328
                                                                                                                    // 1329
        /**                                                                                                         // 1330
         * Gets a select option by its value.                                                                       // 1331
         *                                                                                                          // 1332
         * @param {String} value                                                                                    // 1333
         * @returns {jQuery}                                                                                        // 1334
         */                                                                                                         // 1335
        getOptionByValue: function (value) {                                                                        // 1336
                                                                                                                    // 1337
            var options = $('option', this.$select);                                                                // 1338
            var valueToCompare = value.toString();                                                                  // 1339
                                                                                                                    // 1340
            for (var i = 0; i < options.length; i = i + 1) {                                                        // 1341
                var option = options[i];                                                                            // 1342
                if (option.value === valueToCompare) {                                                              // 1343
                    return $(option);                                                                               // 1344
                }                                                                                                   // 1345
            }                                                                                                       // 1346
        },                                                                                                          // 1347
                                                                                                                    // 1348
        /**                                                                                                         // 1349
         * Get the input (radio/checkbox) by its value.                                                             // 1350
         *                                                                                                          // 1351
         * @param {String} value                                                                                    // 1352
         * @returns {jQuery}                                                                                        // 1353
         */                                                                                                         // 1354
        getInputByValue: function (value) {                                                                         // 1355
                                                                                                                    // 1356
            var checkboxes = $('li input', this.$ul);                                                               // 1357
            var valueToCompare = value.toString();                                                                  // 1358
                                                                                                                    // 1359
            for (var i = 0; i < checkboxes.length; i = i + 1) {                                                     // 1360
                var checkbox = checkboxes[i];                                                                       // 1361
                if (checkbox.value === valueToCompare) {                                                            // 1362
                    return $(checkbox);                                                                             // 1363
                }                                                                                                   // 1364
            }                                                                                                       // 1365
        },                                                                                                          // 1366
                                                                                                                    // 1367
        /**                                                                                                         // 1368
         * Used for knockout integration.                                                                           // 1369
         */                                                                                                         // 1370
        updateOriginalOptions: function() {                                                                         // 1371
            this.originalOptions = this.$select.clone()[0].options;                                                 // 1372
        },                                                                                                          // 1373
                                                                                                                    // 1374
        asyncFunction: function(callback, timeout, self) {                                                          // 1375
            var args = Array.prototype.slice.call(arguments, 3);                                                    // 1376
            return setTimeout(function() {                                                                          // 1377
                callback.apply(self || window, args);                                                               // 1378
            }, timeout);                                                                                            // 1379
        },                                                                                                          // 1380
                                                                                                                    // 1381
        setAllSelectedText: function(allSelectedText) {                                                             // 1382
            this.options.allSelectedText = allSelectedText;                                                         // 1383
            this.updateButtonText();                                                                                // 1384
        }                                                                                                           // 1385
    };                                                                                                              // 1386
                                                                                                                    // 1387
    $.fn.multiselect = function(option, parameter, extraOptions) {                                                  // 1388
        return this.each(function() {                                                                               // 1389
            var data = $(this).data('multiselect');                                                                 // 1390
            var options = typeof option === 'object' && option;                                                     // 1391
                                                                                                                    // 1392
            // Initialize the multiselect.                                                                          // 1393
            if (!data) {                                                                                            // 1394
                data = new Multiselect(this, options);                                                              // 1395
                $(this).data('multiselect', data);                                                                  // 1396
            }                                                                                                       // 1397
                                                                                                                    // 1398
            // Call multiselect method.                                                                             // 1399
            if (typeof option === 'string') {                                                                       // 1400
                data[option](parameter, extraOptions);                                                              // 1401
                                                                                                                    // 1402
                if (option === 'destroy') {                                                                         // 1403
                    $(this).data('multiselect', false);                                                             // 1404
                }                                                                                                   // 1405
            }                                                                                                       // 1406
        });                                                                                                         // 1407
    };                                                                                                              // 1408
                                                                                                                    // 1409
    $.fn.multiselect.Constructor = Multiselect;                                                                     // 1410
                                                                                                                    // 1411
    $(function() {                                                                                                  // 1412
        $("select[data-role=multiselect]").multiselect();                                                           // 1413
    });                                                                                                             // 1414
                                                                                                                    // 1415
}(window.jQuery);                                                                                                   // 1416
                                                                                                                    // 1417
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       // 1427
}).call(this);                                                                                                         // 1428
                                                                                                                       // 1429
                                                                                                                       // 1430
                                                                                                                       // 1431
                                                                                                                       // 1432
                                                                                                                       // 1433
                                                                                                                       // 1434
(function () {                                                                                                         // 1435
                                                                                                                       // 1436
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/emdagon:bootstrap-multiselect/template.Multiselect.js                                                   //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
                                                                                                                    // 1
Template.__checkName("Multiselect");                                                                                // 2
Template["Multiselect"] = new Template("Template.Multiselect", (function() {                                        // 3
  var view = this;                                                                                                  // 4
  return HTML.SELECT({                                                                                              // 5
    name: function() {                                                                                              // 6
      return Spacebars.mustache(view.lookup("name"));                                                               // 7
    },                                                                                                              // 8
    multiple: "multiple"                                                                                            // 9
  }, "\n    ", Blaze.Each(function() {                                                                              // 10
    return Spacebars.call(view.lookup("options"));                                                                  // 11
  }, function() {                                                                                                   // 12
    return [ "\n      ", Blaze._InOuterTemplateScope(view, function() {                                             // 13
      return Blaze._TemplateWith(function() {                                                                       // 14
        return Spacebars.call(view.lookup("args"));                                                                 // 15
      }, function() {                                                                                               // 16
        return Spacebars.include(function() {                                                                       // 17
          return Spacebars.call(view.templateContentBlock);                                                         // 18
        });                                                                                                         // 19
      });                                                                                                           // 20
    }), "\n    " ];                                                                                                 // 21
  }), "\n  ");                                                                                                      // 22
}));                                                                                                                // 23
                                                                                                                    // 24
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       // 1468
}).call(this);                                                                                                         // 1469
                                                                                                                       // 1470
                                                                                                                       // 1471
                                                                                                                       // 1472
                                                                                                                       // 1473
                                                                                                                       // 1474
                                                                                                                       // 1475
(function () {                                                                                                         // 1476
                                                                                                                       // 1477
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/emdagon:bootstrap-multiselect/Multiselect.js                                                            //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
                                                                                                                    // 1
Template.Multiselect.onRendered(function() {                                                                        // 2
  this.$('select').multiselect({                                                                                    // 3
    disableIfEmpty: true                                                                                            // 4
  });                                                                                                               // 5
});                                                                                                                 // 6
                                                                                                                    // 7
Template.Multiselect.helpers({                                                                                      // 8
  args: function() {                                                                                                // 9
    data = Template.instance().data;                                                                                // 10
    selected = false;                                                                                               // 11
    if (data.selected instanceof Array)                                                                             // 12
      selected = Boolean(data.selected.indexOf(this._id) > -1 );                                                    // 13
    else                                                                                                            // 14
      selected = this._id === data.selected;                                                                        // 15
    return _.extend({}, this, {attrs: (selected ? 'selected' : '')});                                               // 16
  }                                                                                                                 // 17
});                                                                                                                 // 18
                                                                                                                    // 19
                                                                                                                    // 20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       // 1505
}).call(this);                                                                                                         // 1506
                                                                                                                       // 1507
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['emdagon:bootstrap-multiselect'] = {};

})();
