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
// packages/rshashkov_angular-meteor-breadcrumb/packages/rshashkov_angular-meteor-breadcrumb.js                      //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
(function () {                                                                                                       // 1
                                                                                                                     // 2
////////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 3
//                                                                                                            //     // 4
// packages/rshashkov:angular-meteor-breadcrumb/src/angular-breadcrumb.js                                     //     // 5
//                                                                                                            //     // 6
////////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 7
                                                                                                              //     // 8
/*! angular-breadcrumb - v0.4.0-dev-2015-08-07                                                                // 1   // 9
 * http://ncuillery.github.io/angular-breadcrumb                                                              // 2   // 10
 * Copyright (c) 2015 Nicolas Cuillery; Licensed MIT */                                                       // 3   // 11
                                                                                                              // 4   // 12
(function(window, angular, undefined) {                                                                       // 5   // 13
	'use strict';                                                                                                // 6   // 14
                                                                                                              // 7   // 15
	function isAOlderThanB(scopeA, scopeB) {                                                                     // 8   // 16
		if(angular.equals(scopeA.length, scopeB.length)) {                                                          // 9   // 17
			return scopeA > scopeB;                                                                                    // 10  // 18
		} else {                                                                                                    // 11  // 19
			return scopeA.length > scopeB.length;                                                                      // 12  // 20
		}                                                                                                           // 13  // 21
	}                                                                                                            // 14  // 22
                                                                                                              // 15  // 23
	function parseStateRef(ref) {                                                                                // 16  // 24
		var parsed = ref.replace(/\n/g, " ").match(/^([^(]+?)\s*(\((.*)\))?$/);                                     // 17  // 25
		if(!parsed || parsed.length !== 4) {                                                                        // 18  // 26
			throw new Error("Invalid state ref '" + ref + "'");                                                        // 19  // 27
		}                                                                                                           // 20  // 28
		return {                                                                                                    // 21  // 29
			state: parsed[1],                                                                                          // 22  // 30
			paramExpr: parsed[3] || null                                                                               // 23  // 31
		};                                                                                                          // 24  // 32
	}                                                                                                            // 25  // 33
                                                                                                              // 26  // 34
	function $Breadcrumb() {                                                                                     // 27  // 35
                                                                                                              // 28  // 36
		var $$options = {                                                                                           // 29  // 37
			prefixStateName: null,                                                                                     // 30  // 38
			template: 'bootstrap3',                                                                                    // 31  // 39
			templateUrl: null,                                                                                         // 32  // 40
			includeAbstract: false                                                                                     // 33  // 41
		};                                                                                                          // 34  // 42
                                                                                                              // 35  // 43
		this.setOptions = function(options) {                                                                       // 36  // 44
			angular.extend($$options, options);                                                                        // 37  // 45
		};                                                                                                          // 38  // 46
                                                                                                              // 39  // 47
		this.$get = ['$state', '$stateParams', '$rootScope', function($state, $stateParams, $rootScope) {           // 40  // 48
                                                                                                              // 41  // 49
			var $lastViewScope = $rootScope;                                                                           // 42  // 50
                                                                                                              // 43  // 51
			// Early catch of $viewContentLoaded event                                                                 // 44  // 52
			$rootScope.$on('$viewContentLoaded', function(event) {                                                     // 45  // 53
				// With nested views, the event occur several times, in "wrong" order                                     // 46  // 54
				if(!event.targetScope.ncyBreadcrumbIgnore &&                                                              // 47  // 55
					isAOlderThanB(event.targetScope.$id, $lastViewScope.$id)) {                                              // 48  // 56
					$lastViewScope = event.targetScope;                                                                      // 49  // 57
				}                                                                                                         // 50  // 58
			});                                                                                                        // 51  // 59
                                                                                                              // 52  // 60
			// Get the parent state                                                                                    // 53  // 61
			var $$parentState = function(state) {                                                                      // 54  // 62
				// Check if state has explicit parent OR we try guess parent from its name                                // 55  // 63
				var parent = state.parent || (/^(.+)\.[^.]+$/.exec(state.name) || [])[1];                                 // 56  // 64
				var isObjectParent = typeof parent === "object";                                                          // 57  // 65
				// if parent is a object reference, then extract the name                                                 // 58  // 66
				return isObjectParent ? parent.name : parent;                                                             // 59  // 67
			};                                                                                                         // 60  // 68
                                                                                                              // 61  // 69
			// Add the state in the chain if not already in and if not abstract                                        // 62  // 70
			var $$addStateInChain = function(chain, stateRef) {                                                        // 63  // 71
				var conf,                                                                                                 // 64  // 72
					parentParams,                                                                                            // 65  // 73
					ref = parseStateRef(stateRef),                                                                           // 66  // 74
					force = false,                                                                                           // 67  // 75
					skip = false;                                                                                            // 68  // 76
                                                                                                              // 69  // 77
				for(var i = 0, l = chain.length; i < l; i += 1) {                                                         // 70  // 78
					if(chain[i].name === ref.state) {                                                                        // 71  // 79
						return;                                                                                                 // 72  // 80
					}                                                                                                        // 73  // 81
				}                                                                                                         // 74  // 82
                                                                                                              // 75  // 83
				conf = $state.get(ref.state);                                                                             // 76  // 84
				// Get breadcrumb options                                                                                 // 77  // 85
				if(conf.ncyBreadcrumb) {                                                                                  // 78  // 86
					if(conf.ncyBreadcrumb.force) {                                                                           // 79  // 87
						force = true;                                                                                           // 80  // 88
					}                                                                                                        // 81  // 89
					if(conf.ncyBreadcrumb.skip) {                                                                            // 82  // 90
						skip = true;                                                                                            // 83  // 91
					}                                                                                                        // 84  // 92
				}                                                                                                         // 85  // 93
				if((!conf.abstract || $$options.includeAbstract || force) && !skip) {                                     // 86  // 94
					if(ref.paramExpr) {                                                                                      // 87  // 95
						parentParams = $lastViewScope.$eval(ref.paramExpr);                                                     // 88  // 96
					}                                                                                                        // 89  // 97
                                                                                                              // 90  // 98
					conf.ncyBreadcrumbLink = $state.href(ref.state, parentParams || $stateParams || {});                     // 91  // 99
					chain.unshift(conf);                                                                                     // 92  // 100
				}                                                                                                         // 93  // 101
			};                                                                                                         // 94  // 102
                                                                                                              // 95  // 103
			// Get the state for the parent step in the breadcrumb                                                     // 96  // 104
			var $$breadcrumbParentState = function(stateRef) {                                                         // 97  // 105
				var ref = parseStateRef(stateRef),                                                                        // 98  // 106
					conf = $state.get(ref.state);                                                                            // 99  // 107
                                                                                                              // 100
				if(conf.ncyBreadcrumb && conf.ncyBreadcrumb.parent) {                                                     // 101
					// Handle the "parent" property of the breadcrumb, override the parent/child relation of the state       // 102
					var isFunction = typeof conf.ncyBreadcrumb.parent === 'function';                                        // 103
					var parentStateRef = isFunction ? conf.ncyBreadcrumb.parent($lastViewScope) : conf.ncyBreadcrumb.parent; // 104
					if(parentStateRef) {                                                                                     // 105
						return parentStateRef;                                                                                  // 106
					}                                                                                                        // 107
				}                                                                                                         // 108
                                                                                                              // 109
				return $$parentState(conf);                                                                               // 110
			};                                                                                                         // 111
                                                                                                              // 112
			return {                                                                                                   // 113
                                                                                                              // 114
				getTemplate: function(templates) {                                                                        // 115
					if($$options.templateUrl) {                                                                              // 116
						// templateUrl takes precedence over template                                                           // 117
						return null;                                                                                            // 118
					} else if(templates[$$options.template]) {                                                               // 119
						// Predefined templates (bootstrap, ...)                                                                // 120
						return templates[$$options.template];                                                                   // 121
					} else {                                                                                                 // 122
						return $$options.template;                                                                              // 123
					}                                                                                                        // 124
				},                                                                                                        // 125
                                                                                                              // 126
				getTemplateUrl: function() {                                                                              // 127
					return $$options.templateUrl;                                                                            // 128
				},                                                                                                        // 129
                                                                                                              // 130
				getStatesChain: function(exitOnFirst) { // Deliberately undocumented param, see getLastStep               // 131
					var chain = [];                                                                                          // 132
                                                                                                              // 133
					// From current state to the root                                                                        // 134
					for(var stateRef = $state.$current.self.name; stateRef; stateRef = $$breadcrumbParentState(stateRef)) {  // 135
						$$addStateInChain(chain, stateRef);                                                                     // 136
						if(exitOnFirst && chain.length) {                                                                       // 137
							return chain;                                                                                          // 138
						}                                                                                                       // 139
					}                                                                                                        // 140
                                                                                                              // 141
					// Prefix state treatment                                                                                // 142
					if($$options.prefixStateName) {                                                                          // 143
						$$addStateInChain(chain, $$options.prefixStateName);                                                    // 144
					}                                                                                                        // 145
                                                                                                              // 146
					return chain;                                                                                            // 147
				},                                                                                                        // 148
                                                                                                              // 149
				getLastStep: function() {                                                                                 // 150
					var chain = this.getStatesChain(true);                                                                   // 151
					return chain.length ? chain[0] : undefined;                                                              // 152
				},                                                                                                        // 153
                                                                                                              // 154
				$getLastViewScope: function() {                                                                           // 155
					return $lastViewScope;                                                                                   // 156
				}                                                                                                         // 157
			};                                                                                                         // 158
		}];                                                                                                         // 159
	}                                                                                                            // 160
                                                                                                              // 161
	var getExpression = function(interpolationFunction) {                                                        // 162
		if(interpolationFunction.expressions) {                                                                     // 163
			return interpolationFunction.expressions;                                                                  // 164
		} else {                                                                                                    // 165
			var expressions = [];                                                                                      // 166
			angular.forEach(interpolationFunction.parts, function(part) {                                              // 167
				if(angular.isFunction(part)) {                                                                            // 168
					expressions.push(part.exp);                                                                              // 169
				}                                                                                                         // 170
			});                                                                                                        // 171
			return expressions;                                                                                        // 172
		}                                                                                                           // 173
	};                                                                                                           // 174
                                                                                                              // 175
	var registerWatchers = function(labelWatcherArray, interpolationFunction, viewScope, step) {                 // 176
		angular.forEach(getExpression(interpolationFunction), function(expression) {                                // 177
			var watcher = viewScope.$watch(expression, function() {                                                    // 178
				step.ncyBreadcrumbLabel = interpolationFunction(viewScope);                                               // 179
			});                                                                                                        // 180
			labelWatcherArray.push(watcher);                                                                           // 181
		});                                                                                                         // 182
                                                                                                              // 183
	};                                                                                                           // 184
                                                                                                              // 185
	var deregisterWatchers = function(labelWatcherArray) {                                                       // 186
		angular.forEach(labelWatcherArray, function(deregisterWatch) {                                              // 187
			deregisterWatch();                                                                                         // 188
		});                                                                                                         // 189
	};                                                                                                           // 190
                                                                                                              // 191
	function BreadcrumbDirective($interpolate, $breadcrumb, $rootScope) {                                        // 192
		var $$templates = {                                                                                         // 193
			bootstrap2: '<ul class="breadcrumb">' +                                                                    // 194
				'<li ng-repeat="step in steps" ng-switch="$last || !!step.abstract" ng-class="{active: $last}">' +        // 195
				'<a ng-switch-when="false" href="{{step.ncyBreadcrumbLink}}">{{step.ncyBreadcrumbLabel}}</a>' +           // 196
				'<span ng-switch-when="true">{{step.ncyBreadcrumbLabel}}</span>' +                                        // 197
				'<span class="divider" ng-hide="$last">/</span>' +                                                        // 198
				'</li>' +                                                                                                 // 199
				'</ul>',                                                                                                  // 200
			bootstrap3: '<ol class="breadcrumb">' +                                                                    // 201
				'<li ng-repeat="step in steps" ng-class="{active: $last}" ng-switch="$last || !!step.abstract">' +        // 202
				'<a ng-switch-when="false" href="{{step.ncyBreadcrumbLink}}">{{step.ncyBreadcrumbLabel}}</a>' +           // 203
				'<span ng-switch-when="true">{{step.ncyBreadcrumbLabel}}</span>' +                                        // 204
				'</li>' +                                                                                                 // 205
				'</ol>'                                                                                                   // 206
		};                                                                                                          // 207
                                                                                                              // 208
		return {                                                                                                    // 209
			restrict: 'AE',                                                                                            // 210
			replace: true,                                                                                             // 211
			scope: {},                                                                                                 // 212
			template: $breadcrumb.getTemplate($$templates),                                                            // 213
			templateUrl: $breadcrumb.getTemplateUrl(),                                                                 // 214
			link: {                                                                                                    // 215
				post: function postLink(scope) {                                                                          // 216
					var labelWatchers = [];                                                                                  // 217
                                                                                                              // 218
					var renderBreadcrumb = function() {                                                                      // 219
						deregisterWatchers(labelWatchers);                                                                      // 220
						labelWatchers = [];                                                                                     // 221
                                                                                                              // 222
						var viewScope = $breadcrumb.$getLastViewScope();                                                        // 223
						scope.steps = $breadcrumb.getStatesChain();                                                             // 224
						angular.forEach(scope.steps, function(step) {                                                           // 225
							if(step.ncyBreadcrumb && step.ncyBreadcrumb.label) {                                                   // 226
								var parseLabel = $interpolate(step.ncyBreadcrumb.label);                                              // 227
								step.ncyBreadcrumbLabel = parseLabel(viewScope);                                                      // 228
								// Watcher for further viewScope updates                                                              // 229
								registerWatchers(labelWatchers, parseLabel, viewScope, step);                                         // 230
							} else {                                                                                               // 231
								step.ncyBreadcrumbLabel = step.name;                                                                  // 232
							}                                                                                                      // 233
						});                                                                                                     // 234
					};                                                                                                       // 235
                                                                                                              // 236
					$rootScope.$on('$viewContentLoaded', function(event) {                                                   // 237
						if(!event.targetScope.ncyBreadcrumbIgnore) {                                                            // 238
							renderBreadcrumb();                                                                                    // 239
						}                                                                                                       // 240
					});                                                                                                      // 241
                                                                                                              // 242
					// View(s) may be already loaded while the directive's linking                                           // 243
					renderBreadcrumb();                                                                                      // 244
				}                                                                                                         // 245
			}                                                                                                          // 246
		};                                                                                                          // 247
	}                                                                                                            // 248
	BreadcrumbDirective.$inject = ['$interpolate', '$breadcrumb', '$rootScope'];                                 // 249
                                                                                                              // 250
	function BreadcrumbLastDirective($interpolate, $breadcrumb, $rootScope) {                                    // 251
                                                                                                              // 252
		return {                                                                                                    // 253
			restrict: 'A',                                                                                             // 254
			scope: {},                                                                                                 // 255
			template: '{{ncyBreadcrumbLabel}}',                                                                        // 256
			compile: function(cElement, cAttrs) {                                                                      // 257
                                                                                                              // 258
				// Override the default template if ncyBreadcrumbLast has a value                                         // 259
				var template = cElement.attr(cAttrs.$attr.ncyBreadcrumbLast);                                             // 260
				if(template) {                                                                                            // 261
					cElement.html(template);                                                                                 // 262
				}                                                                                                         // 263
                                                                                                              // 264
				return {                                                                                                  // 265
					post: function postLink(scope) {                                                                         // 266
						var labelWatchers = [];                                                                                 // 267
                                                                                                              // 268
						var renderLabel = function() {                                                                          // 269
							deregisterWatchers(labelWatchers);                                                                     // 270
							labelWatchers = [];                                                                                    // 271
                                                                                                              // 272
							var viewScope = $breadcrumb.$getLastViewScope();                                                       // 273
							var lastStep = $breadcrumb.getLastStep();                                                              // 274
							if(lastStep) {                                                                                         // 275
								scope.ncyBreadcrumbLink = lastStep.ncyBreadcrumbLink;                                                 // 276
								if(lastStep.ncyBreadcrumb && lastStep.ncyBreadcrumb.label) {                                          // 277
									var parseLabel = $interpolate(lastStep.ncyBreadcrumb.label);                                         // 278
									scope.ncyBreadcrumbLabel = parseLabel(viewScope);                                                    // 279
									// Watcher for further viewScope updates                                                             // 280
									// Tricky last arg: the last step is the entire scope of the directive !                             // 281
									registerWatchers(labelWatchers, parseLabel, viewScope, scope);                                       // 282
								} else {                                                                                              // 283
									scope.ncyBreadcrumbLabel = lastStep.name;                                                            // 284
								}                                                                                                     // 285
							}                                                                                                      // 286
						};                                                                                                      // 287
                                                                                                              // 288
						$rootScope.$on('$viewContentLoaded', function(event) {                                                  // 289
							if(!event.targetScope.ncyBreadcrumbIgnore) {                                                           // 290
								renderLabel();                                                                                        // 291
							}                                                                                                      // 292
						});                                                                                                     // 293
                                                                                                              // 294
						// View(s) may be already loaded while the directive's linking                                          // 295
						renderLabel();                                                                                          // 296
					}                                                                                                        // 297
				};                                                                                                        // 298
                                                                                                              // 299
			}                                                                                                          // 300
		};                                                                                                          // 301
	}                                                                                                            // 302
	BreadcrumbLastDirective.$inject = ['$interpolate', '$breadcrumb', '$rootScope'];                             // 303
                                                                                                              // 304
	function BreadcrumbTextDirective($interpolate, $breadcrumb, $rootScope) {                                    // 305
                                                                                                              // 306
		return {                                                                                                    // 307
			restrict: 'A',                                                                                             // 308
			scope: {},                                                                                                 // 309
			template: '{{ncyBreadcrumbChain}}',                                                                        // 310
                                                                                                              // 311
			compile: function(cElement, cAttrs) {                                                                      // 312
				// Override the default template if ncyBreadcrumbText has a value                                         // 313
				var template = cElement.attr(cAttrs.$attr.ncyBreadcrumbText);                                             // 314
				if(template) {                                                                                            // 315
					cElement.html(template);                                                                                 // 316
				}                                                                                                         // 317
                                                                                                              // 318
				var separator = cElement.attr(cAttrs.$attr.ncyBreadcrumbTextSeparator) || ' / ';                          // 319
                                                                                                              // 320
				return {                                                                                                  // 321
					post: function postLink(scope) {                                                                         // 322
						var labelWatchers = [];                                                                                 // 323
                                                                                                              // 324
						var registerWatchersText = function(labelWatcherArray, interpolationFunction, viewScope) {              // 325
							angular.forEach(getExpression(interpolationFunction), function(expression) {                           // 326
								var watcher = viewScope.$watch(expression, function(newValue, oldValue) {                             // 327
									if(newValue !== oldValue) {                                                                          // 328
										renderLabel();                                                                                      // 329
									}                                                                                                    // 330
								});                                                                                                   // 331
								labelWatcherArray.push(watcher);                                                                      // 332
							});                                                                                                    // 333
						};                                                                                                      // 334
                                                                                                              // 335
						var renderLabel = function() {                                                                          // 336
							deregisterWatchers(labelWatchers);                                                                     // 337
							labelWatchers = [];                                                                                    // 338
                                                                                                              // 339
							var viewScope = $breadcrumb.$getLastViewScope();                                                       // 340
							var steps = $breadcrumb.getStatesChain();                                                              // 341
							var combinedLabels = [];                                                                               // 342
							angular.forEach(steps, function(step) {                                                                // 343
								if(step.ncyBreadcrumb && step.ncyBreadcrumb.label) {                                                  // 344
									var parseLabel = $interpolate(step.ncyBreadcrumb.label);                                             // 345
									combinedLabels.push(parseLabel(viewScope));                                                          // 346
									// Watcher for further viewScope updates                                                             // 347
									registerWatchersText(labelWatchers, parseLabel, viewScope);                                          // 348
								} else {                                                                                              // 349
									combinedLabels.push(step.name);                                                                      // 350
								}                                                                                                     // 351
							});                                                                                                    // 352
                                                                                                              // 353
							scope.ncyBreadcrumbChain = combinedLabels.join(separator);                                             // 354
						};                                                                                                      // 355
                                                                                                              // 356
						$rootScope.$on('$viewContentLoaded', function(event) {                                                  // 357
							if(!event.targetScope.ncyBreadcrumbIgnore) {                                                           // 358
								renderLabel();                                                                                        // 359
							}                                                                                                      // 360
						});                                                                                                     // 361
                                                                                                              // 362
						// View(s) may be already loaded while the directive's linking                                          // 363
						renderLabel();                                                                                          // 364
					}                                                                                                        // 365
				};                                                                                                        // 366
                                                                                                              // 367
			}                                                                                                          // 368
		};                                                                                                          // 369
	}                                                                                                            // 370
	BreadcrumbTextDirective.$inject = ['$interpolate', '$breadcrumb', '$rootScope'];                             // 371
                                                                                                              // 372
	angular.module('ncy-angular-breadcrumb', ['ui.router.state'])                                                // 373
		.provider('$breadcrumb', $Breadcrumb)                                                                       // 374
		.directive('ncyBreadcrumb', BreadcrumbDirective)                                                            // 375
		.directive('ncyBreadcrumbLast', BreadcrumbLastDirective)                                                    // 376
		.directive('ncyBreadcrumbText', BreadcrumbTextDirective);                                                   // 377
})(window, window.angular);                                                                                   // 378
                                                                                                              // 379
////////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 388
                                                                                                                     // 389
}).call(this);                                                                                                       // 390
                                                                                                                     // 391
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rshashkov:angular-meteor-breadcrumb'] = {};

})();
