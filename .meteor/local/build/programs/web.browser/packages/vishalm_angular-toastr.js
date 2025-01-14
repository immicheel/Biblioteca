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

//////////////////////////////////////////////////////////////////////////
//                                                                      //
// packages/vishalm_angular-toastr/packages/vishalm_angular-toastr.js   //
//                                                                      //
//////////////////////////////////////////////////////////////////////////
                                                                        //
(function () {                                                          // 1
                                                                        // 2
///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/vishalm:angular-toastr/bower_components/angular-toastr/d //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
!function(){"use strict";function t(t,e,s,n,o,r,a){function i(t){if(1!==arguments.length||t)if(t)g(t.toastId);else for(var e=0;e<O.length;e++)g(O[e].toastId)}function l(t,e,s){var n=m().iconClasses.error;return d(n,t,e,s)}function c(t,e,s){var n=m().iconClasses.info;return d(n,t,e,s)}function u(t,e,s){var n=m().iconClasses.success;return d(n,t,e,s)}function p(t,e,s){var n=m().iconClasses.warning;return d(n,t,e,s)}function g(e,s){function n(t){for(var e=0;e<O.length;e++)if(O[e].toastId===t)return O[e]}function o(){return!O.length}var i=n(e);i&&!i.deleting&&(i.deleting=!0,i.isOpened=!1,t.leave(i.el).then(function(){i.scope.options.onHidden&&i.scope.options.onHidden(s),i.scope.$destroy();var t=O.indexOf(i);delete T[i.scope.message],O.splice(t,1);var e=r.maxOpened;e&&O.length>=e&&O[e-1].open.resolve(),o()&&(h.remove(),h=null,B=a.defer())}))}function d(t,e,s,n){return angular.isObject(s)&&(n=s,s=null),v({iconClass:t,message:e,optionsOverride:n,title:s})}function m(){return angular.extend({},r)}function f(e){if(h)return B.promise;h=angular.element("<div></div>"),h.attr("id",e.containerId),h.addClass(e.positionClass),h.css({"pointer-events":"auto"});var s=angular.element(document.querySelector(e.target));if(!s||!s.length)throw"Target for toasts doesn't exist";return t.enter(h,s).then(function(){B.resolve()}),B.promise}function v(s){function r(){return d.autoDismiss&&d.maxOpened&&O.length>d.maxOpened}function i(t,e,s){s.allowHtml?(t.scope.allowHtml=!0,t.scope.title=o.trustAsHtml(e.title),t.scope.message=o.trustAsHtml(e.message)):(t.scope.title=e.title,t.scope.message=e.message),t.scope.toastType=t.iconClass,t.scope.toastId=t.toastId,t.scope.extraData=s.extraData,t.scope.options={extendedTimeOut:s.extendedTimeOut,messageClass:s.messageClass,onHidden:s.onHidden,onShown:s.onShown,onTap:s.onTap,progressBar:s.progressBar,tapToDismiss:s.tapToDismiss,timeOut:s.timeOut,titleClass:s.titleClass,toastClass:s.toastClass},s.closeButton&&(t.scope.options.closeHtml=s.closeHtml)}function l(){function t(t){for(var e=["containerId","iconClasses","maxOpened","newestOnTop","positionClass","preventDuplicates","preventOpenDuplicates","templates"],s=0,n=e.length;n>s;s++)delete t[e[s]];return t}var e={toastId:C++,isOpened:!1,scope:n.$new(),open:a.defer()};return e.iconClass=s.iconClass,s.optionsOverride&&(angular.extend(d,t(s.optionsOverride)),e.iconClass=s.optionsOverride.iconClass||e.iconClass),i(e,s,d),e.el=c(e.scope),e}function c(t){var s=angular.element("<div toast></div>"),n=e.get("$compile");return n(s)(t)}function u(){return d.maxOpened&&O.length<=d.maxOpened||!d.maxOpened}function p(){var t=d.preventDuplicates&&s.message===w,e=d.preventOpenDuplicates&&T[s.message];return t||e?!0:(w=s.message,T[s.message]=!0,!1)}var d=m();if(!p()){var v=l();if(O.push(v),r())for(var B=O.slice(0,O.length-d.maxOpened),x=0,$=B.length;$>x;x++)g(B[x].toastId);return u()&&v.open.resolve(),v.open.promise.then(function(){f(d).then(function(){if(v.isOpened=!0,d.newestOnTop)t.enter(v.el,h).then(function(){v.scope.init()});else{var e=h[0].lastChild?angular.element(h[0].lastChild):null;t.enter(v.el,h,e).then(function(){v.scope.init()})}})}),v}}var h,C=0,O=[],w="",T={},B=a.defer(),x={clear:i,error:l,info:c,remove:g,success:u,warning:p};return x}angular.module("toastr",[]).factory("toastr",t),t.$inject=["$animate","$injector","$document","$rootScope","$sce","toastrConfig","$q"]}(),function(){"use strict";angular.module("toastr").constant("toastrConfig",{allowHtml:!1,autoDismiss:!1,closeButton:!1,closeHtml:"<button>&times;</button>",containerId:"toast-container",extendedTimeOut:1e3,iconClasses:{error:"toast-error",info:"toast-info",success:"toast-success",warning:"toast-warning"},maxOpened:0,messageClass:"toast-message",newestOnTop:!0,onHidden:null,onShown:null,onTap:null,positionClass:"toast-top-right",preventDuplicates:!1,preventOpenDuplicates:!1,progressBar:!1,tapToDismiss:!0,target:"body",templates:{toast:"directives/toast/toast.html",progressbar:"directives/progressbar/progressbar.html"},timeOut:5e3,titleClass:"toast-title",toastClass:"toast"})}(),function(){"use strict";function t(t){function e(t,e,s,n){function o(){var t=(i-(new Date).getTime())/a*100;e.css("width",t+"%")}var r,a,i;n.progressBar=t,t.start=function(t){r&&clearInterval(r),a=parseFloat(t),i=(new Date).getTime()+a,r=setInterval(o,10)},t.stop=function(){r&&clearInterval(r)},t.$on("$destroy",function(){clearInterval(r)})}return{replace:!0,require:"^toast",templateUrl:function(){return t.templates.progressbar},link:e}}angular.module("toastr").directive("progressBar",t),t.$inject=["toastrConfig"]}(),function(){"use strict";function t(){this.progressBar=null,this.startProgressBar=function(t){this.progressBar&&this.progressBar.start(t)},this.stopProgressBar=function(){this.progressBar&&this.progressBar.stop()}}angular.module("toastr").controller("ToastController",t)}(),function(){"use strict";function t(t,e,s,n){function o(s,o,r,a){function i(t){return a.startProgressBar(t),e(function(){a.stopProgressBar(),n.remove(s.toastId)},t,1)}function l(){s.progressBar=!1,a.stopProgressBar()}function c(){return s.options.closeHtml}var u;if(s.toastClass=s.options.toastClass,s.titleClass=s.options.titleClass,s.messageClass=s.options.messageClass,s.progressBar=s.options.progressBar,c()){var p=angular.element(s.options.closeHtml),g=t.get("$compile");p.addClass("toast-close-button"),p.attr("ng-click","close(true, $event)"),g(p)(s),o.prepend(p)}s.init=function(){s.options.timeOut&&(u=i(s.options.timeOut)),s.options.onShown&&s.options.onShown()},o.on("mouseenter",function(){l(),u&&e.cancel(u)}),s.tapToast=function(){angular.isFunction(s.options.onTap)&&s.options.onTap(),s.options.tapToDismiss&&s.close(!0)},s.close=function(t,e){e&&angular.isFunction(e.stopPropagation)&&e.stopPropagation(),n.remove(s.toastId,t)},o.on("mouseleave",function(){(0!==s.options.timeOut||0!==s.options.extendedTimeOut)&&(s.$apply(function(){s.progressBar=s.options.progressBar}),u=i(s.options.extendedTimeOut))})}return{replace:!0,templateUrl:function(){return s.templates.toast},controller:"ToastController",link:o}}angular.module("toastr").directive("toast",t),t.$inject=["$injector","$interval","toastrConfig","toastr"]}(),angular.module("toastr").run(["$templateCache",function(t){t.put("directives/progressbar/progressbar.html",'<div class="toast-progress"></div>\n'),t.put("directives/toast/toast.html",'<div class="{{toastClass}} {{toastType}}" ng-click="tapToast()">\n  <div ng-switch on="allowHtml">\n    <div ng-switch-default ng-if="title" class="{{titleClass}}" aria-label="{{title}}">{{title}}</div>\n    <div ng-switch-default class="{{messageClass}}" aria-label="{{message}}">{{message}}</div>\n    <div ng-switch-when="true" ng-if="title" class="{{titleClass}}" ng-bind-html="title"></div>\n    <div ng-switch-when="true" class="{{messageClass}}" ng-bind-html="message"></div>\n  </div>\n  <progress-bar ng-if="progressBar"></progress-bar>\n</div>\n')}]);
///////////////////////////////////////////////////////////////////////
                                                                        // 11
}).call(this);                                                          // 12
                                                                        // 13
//////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['vishalm:angular-toastr'] = {};

})();
