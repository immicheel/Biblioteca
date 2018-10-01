var require = meteorInstall({"client":{"lib":{"smartadmin":{"plugins":{"checkboxList.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/lib/smartadmin/plugins/checkboxList.js                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/**                                                                                                                    //
 * Checklist-model                                                                                                     //
 * AngularJS directive for list of checkboxes                                                                          //
 * https://github.com/vitalets/checklist-model                                                                         //
 * License: MIT http://opensource.org/licenses/MIT                                                                     //
 */                                                                                                                    //
                                                                                                                       //
angular.module('checklist-model', []).directive('checklistModel', ['$parse', '$compile', function ($parse, $compile) {
  // contains                                                                                                          //
  function contains(arr, item, comparator) {                                                                           // 11
    if (angular.isArray(arr)) {                                                                                        // 12
      for (var i = arr.length; i--;) {                                                                                 // 13
        if (comparator(arr[i], item)) {                                                                                // 14
          return true;                                                                                                 // 15
        }                                                                                                              //
      }                                                                                                                //
    }                                                                                                                  //
    return false;                                                                                                      // 19
  }                                                                                                                    //
                                                                                                                       //
  // add                                                                                                               //
  function add(arr, item, comparator) {                                                                                // 23
    arr = angular.isArray(arr) ? arr : [];                                                                             // 24
    if (!contains(arr, item, comparator)) {                                                                            // 25
      arr.push(item);                                                                                                  // 26
    }                                                                                                                  //
    return arr;                                                                                                        // 28
  }                                                                                                                    //
                                                                                                                       //
  // remove                                                                                                            //
  function remove(arr, item, comparator) {                                                                             // 32
    if (angular.isArray(arr)) {                                                                                        // 33
      for (var i = arr.length; i--;) {                                                                                 // 34
        if (comparator(arr[i], item)) {                                                                                // 35
          arr.splice(i, 1);                                                                                            // 36
          break;                                                                                                       // 37
        }                                                                                                              //
      }                                                                                                                //
    }                                                                                                                  //
    return arr;                                                                                                        // 41
  }                                                                                                                    //
                                                                                                                       //
  // http://stackoverflow.com/a/19228302/1458162                                                                       //
  function postLinkFn(scope, elem, attrs) {                                                                            // 45
    // exclude recursion, but still keep the model                                                                     //
    var checklistModel = attrs.checklistModel;                                                                         // 47
    attrs.$set("checklistModel", null);                                                                                // 48
    // compile with `ng-model` pointing to `checked`                                                                   //
    $compile(elem)(scope);                                                                                             // 50
    attrs.$set("checklistModel", checklistModel);                                                                      // 51
                                                                                                                       //
    // getter / setter for original model                                                                              //
    var getter = $parse(checklistModel);                                                                               // 54
    var setter = getter.assign;                                                                                        // 55
    var checklistChange = $parse(attrs.checklistChange);                                                               // 56
    var checklistBeforeChange = $parse(attrs.checklistBeforeChange);                                                   // 57
                                                                                                                       //
    // value added to list                                                                                             //
    var value = attrs.checklistValue ? $parse(attrs.checklistValue)(scope.$parent) : attrs.value;                      // 60
                                                                                                                       //
    var comparator = angular.equals;                                                                                   // 63
                                                                                                                       //
    if (attrs.hasOwnProperty('checklistComparator')) {                                                                 // 65
      if (attrs.checklistComparator[0] == '.') {                                                                       // 66
        var comparatorExpression = attrs.checklistComparator.substring(1);                                             // 67
        comparator = function (a, b) {                                                                                 // 68
          return a[comparatorExpression] === b[comparatorExpression];                                                  // 69
        };                                                                                                             //
      } else {                                                                                                         //
        comparator = $parse(attrs.checklistComparator)(scope.$parent);                                                 // 73
      }                                                                                                                //
    }                                                                                                                  //
                                                                                                                       //
    // watch UI checked change                                                                                         //
    scope.$watch(attrs.ngModel, function (newValue, oldValue) {                                                        // 78
      if (newValue === oldValue) {                                                                                     // 79
        return;                                                                                                        // 80
      }                                                                                                                //
                                                                                                                       //
      if (checklistBeforeChange && checklistBeforeChange(scope) === false) {                                           // 83
        scope[attrs.ngModel] = contains(getter(scope.$parent), value, comparator);                                     // 84
        return;                                                                                                        // 85
      }                                                                                                                //
                                                                                                                       //
      setValueInChecklistModel(value, newValue);                                                                       // 88
                                                                                                                       //
      if (checklistChange) {                                                                                           // 90
        checklistChange(scope);                                                                                        // 91
      }                                                                                                                //
    });                                                                                                                //
                                                                                                                       //
    function setValueInChecklistModel(value, checked) {                                                                // 95
      var current = getter(scope.$parent);                                                                             // 96
      if (angular.isFunction(setter)) {                                                                                // 97
        if (checked === true) {                                                                                        // 98
          setter(scope.$parent, add(current, value, comparator));                                                      // 99
        } else {                                                                                                       //
          setter(scope.$parent, remove(current, value, comparator));                                                   // 101
        }                                                                                                              //
      }                                                                                                                //
    }                                                                                                                  //
                                                                                                                       //
    // declare one function to be used for both $watch functions                                                       //
    function setChecked(newArr, oldArr) {                                                                              // 108
      if (checklistBeforeChange && checklistBeforeChange(scope) === false) {                                           // 109
        setValueInChecklistModel(value, scope[attrs.ngModel]);                                                         // 110
        return;                                                                                                        // 111
      }                                                                                                                //
      scope[attrs.ngModel] = contains(newArr, value, comparator);                                                      // 113
    }                                                                                                                  //
                                                                                                                       //
    // watch original model change                                                                                     //
    // use the faster $watchCollection method if it's available                                                        //
    if (angular.isFunction(scope.$parent.$watchCollection)) {                                                          // 118
      scope.$parent.$watchCollection(checklistModel, setChecked);                                                      // 119
    } else {                                                                                                           //
      scope.$parent.$watch(checklistModel, setChecked, true);                                                          // 121
    }                                                                                                                  //
  }                                                                                                                    //
                                                                                                                       //
  return {                                                                                                             // 125
    restrict: 'A',                                                                                                     // 126
    priority: 1000,                                                                                                    // 127
    terminal: true,                                                                                                    // 128
    scope: true,                                                                                                       // 129
    compile: function compile(tElement, tAttrs) {                                                                      // 130
      if ((tElement[0].tagName !== 'INPUT' || tAttrs.type !== 'checkbox') && tElement[0].tagName !== 'MD-CHECKBOX' && !tAttrs.btnCheckbox) {
        throw 'checklist-model should be applied to `input[type="checkbox"]` or `md-checkbox`.';                       // 132
      }                                                                                                                //
                                                                                                                       //
      if (!tAttrs.checklistValue && !tAttrs.value) {                                                                   // 135
        throw 'You should provide `value` or `checklist-value`.';                                                      // 136
      }                                                                                                                //
                                                                                                                       //
      // by default ngModel is 'checked', so we set it if not specified                                                //
      if (!tAttrs.ngModel) {                                                                                           // 140
        // local scope var storing individual checkbox model                                                           //
        tAttrs.$set("ngModel", "checked");                                                                             // 142
      }                                                                                                                //
                                                                                                                       //
      return postLinkFn;                                                                                               // 145
    }                                                                                                                  //
  };                                                                                                                   //
}]);                                                                                                                   //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"jarvis.widget.min.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/lib/smartadmin/plugins/jarvis.widget.min.js                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/*! SmartAdmin - v1.5 - 2014-10-16 */!(function (a, b, c, d) {                                                         //
  function e(b, c) {                                                                                                   // 1
    this.obj = a(b), this.o = a.extend({}, a.fn[f].defaults, c), this.objId = this.obj.attr("id"), this.pwCtrls = ".jarviswidget-ctrls", this.widget = this.obj.find(this.o.widgets), this.toggleClass = this.o.toggleClass.split("|"), this.editClass = this.o.editClass.split("|"), this.fullscreenClass = this.o.fullscreenClass.split("|"), this.customClass = this.o.customClass.split("|"), this.storage = { "enabled": this.o.localStorage }, this.initialized = !1, this.init();
  }var f = "jarvisWidgets",                                                                                            //
      g = ("ontouchstart" in b || b.DocumentTouch && c instanceof DocumentTouch ? "touchstart" : "click") + "." + f;e.prototype = { "_runLoaderWidget": function _runLoaderWidget(a) {
      var b = this;b.o.indicator === !0 && a.parents(b.o.widgets).find(".jarviswidget-loader:first").stop(!0, !0).fadeIn(100).delay(b.o.indicatorTime).fadeOut(100);
    }, "_getPastTimestamp": function _getPastTimestamp(a) {                                                            //
      var b = this,                                                                                                    // 1
          c = new Date(a),                                                                                             //
          d = c.getMonth() + 1,                                                                                        //
          e = c.getDate(),                                                                                             //
          f = c.getFullYear(),                                                                                         //
          g = c.getHours(),                                                                                            //
          h = c.getMinutes(),                                                                                          //
          i = c.getUTCSeconds();10 > d && (d = "0" + d), 10 > e && (e = "0" + e), 10 > g && (g = "0" + g), 10 > h && (h = "0" + h), 10 > i && (i = "0" + i);var j = b.o.timestampFormat.replace(/%d%/g, e).replace(/%m%/g, d).replace(/%y%/g, f).replace(/%h%/g, g).replace(/%i%/g, h).replace(/%s%/g, i);return j;
    }, "_loadAjaxFile": function _loadAjaxFile(b, c, d) {                                                              //
      var e = this;b.find(".widget-body").load(c, function (c, d, f) {                                                 // 1
        var g = a(this);if (("error" == d && g.html('<h4 class="alert alert-danger">' + e.o.labelError + "<b> " + f.status + " " + f.statusText + "</b></h4>"), "success" == d)) {
          var h = b.find(e.o.timestampPlaceholder);h.length && h.html(e._getPastTimestamp(new Date())), "function" == typeof e.o.afterLoad && e.o.afterLoad.call(this, b);
        }e = null;                                                                                                     //
      }), this._runLoaderWidget(d);                                                                                    //
    }, "_loadKeys": function _loadKeys() {                                                                             //
      var a = this;if (a.o.ajaxnav === !0) {                                                                           // 1
        var b = location.hash.replace(/^#/, "");a.storage.keySettings = "Plugin_settings_" + b + "_" + a.objId, a.storage.keyPosition = "Plugin_position_" + b + "_" + a.objId;
      } else if (a.initialized === !1) {                                                                               //
        var b = a.o.pageKey || location.pathname;a.storage.keySettings = "jarvisWidgets_settings_" + b + "_" + a.objId, a.storage.keyPosition = "jarvisWidgets_position_" + b + "_" + a.objId;
      }                                                                                                                //
    }, "_saveSettingsWidget": function _saveSettingsWidget() {                                                         //
      var b = this,                                                                                                    // 1
          c = b.storage;b._loadKeys();var d = b.obj.find(b.o.widgets).map(function () {                                //
        var b = {};return b.id = a(this).attr("id"), b.style = a(this).attr("data-widget-attstyle"), b.title = a(this).children("header").children("h2").text(), b.hidden = "none" == a(this).css("display") ? 1 : 0, b.collapsed = a(this).hasClass("jarviswidget-collapsed") ? 1 : 0, b;
      }).get(),                                                                                                        //
          e = JSON.stringify({ "widget": d });c.enabled && c.getKeySettings != e && (localStorage.setItem(c.keySettings, e), c.getKeySettings = e), "function" == typeof b.o.onSave && b.o.onSave.call(this, null, e, c.keySettings);
    }, "_savePositionWidget": function _savePositionWidget() {                                                         //
      var b = this,                                                                                                    // 1
          c = b.storage;b._loadKeys();var d = b.obj.find(b.o.grid + ".sortable-grid").map(function () {                //
        var c = a(this).children(b.o.widgets).map(function () {                                                        // 1
          return { "id": a(this).attr("id") };                                                                         // 1
        }).get();return { "section": c };                                                                              //
      }).get(),                                                                                                        //
          e = JSON.stringify({ "grid": d });c.enabled && c.getKeyPosition != e && (localStorage.setItem(c.keyPosition, e), c.getKeyPosition = e), "function" == typeof b.o.onSave && b.o.onSave.call(this, e, c.keyPosition);
    }, "init": function init() {                                                                                       //
      var b = this;if (!b.initialized) {                                                                               // 1
        if ((b._initStorage(b.storage), a("#" + b.objId).length || alert("It looks like your using a class instead of an ID, dont do that!"), b.o.rtl === !0 && a("body").addClass("rtl"), a(b.o.grid).each(function () {
          a(this).find(b.o.widgets).length && a(this).addClass("sortable-grid");                                       // 1
        }), b.storage.enabled && b.storage.getKeyPosition)) {                                                          //
          var c = JSON.parse(b.storage.getKeyPosition);for (var e in c.grid) {                                         // 1
            var h = b.obj.find(b.o.grid + ".sortable-grid").eq(e);for (var i in c.grid[e].section) h.append(a("#" + c.grid[e].section[i].id));
          }                                                                                                            //
        }if (b.storage.enabled && b.storage.getKeySettings) {                                                          //
          var j = JSON.parse(b.storage.getKeySettings);for (var e in j.widget) {                                       // 1
            var k = a("#" + j.widget[e].id);j.widget[e].style && k.removeClassPrefix("jarviswidget-color-").addClass(j.widget[e].style).attr("data-widget-attstyle", "" + j.widget[e].style), 1 == j.widget[e].hidden ? k.hide(1) : k.show(1).removeAttr("data-widget-hidden"), 1 == j.widget[e].collapsed && k.addClass("jarviswidget-collapsed").children("div").hide(1), k.children("header").children("h2").text() != j.widget[e].title && k.children("header").children("h2").text(j.widget[e].title);
          }                                                                                                            //
        }if ((b.widget.each(function () {                                                                              //
          var c,                                                                                                       // 1
              e,                                                                                                       //
              f,                                                                                                       //
              g,                                                                                                       //
              h,                                                                                                       //
              i,                                                                                                       //
              j,                                                                                                       //
              k,                                                                                                       //
              l = a(this),                                                                                             //
              m = a(this).children("header");if (!m.parent().attr("role")) {                                           //
            l.data("widget-hidden") === !0 && l.hide(), l.data("widget-collapsed") === !0 && l.addClass("jarviswidget-collapsed").children("div").hide(), c = b.o.customButton === !0 && l.data("widget-custombutton") === d && 0 !== b.customClass[0].length ? '<a href="javascript:void(0);" class="button-icon jarviswidget-custom-btn"><i class="' + b.customClass[0] + '"></i></a>' : "", e = b.o.deleteButton === !0 && l.data("widget-deletebutton") === d ? '<a href="javascript:void(0);" class="button-icon jarviswidget-delete-btn" rel="tooltip" title="Delete" data-placement="bottom"><i class="' + b.o.deleteClass + '"></i></a>' : "", f = b.o.editButton === !0 && l.data("widget-editbutton") === d ? '<a href="javascript:void(0);" class="button-icon jarviswidget-edit-btn" rel="tooltip" title="Edit" data-placement="bottom"><i class="' + b.editClass[0] + '"></i></a>' : "", g = b.o.fullscreenButton === !0 && l.data("widget-fullscreenbutton") === d ? '<a href="javascript:void(0);" class="button-icon jarviswidget-fullscreen-btn" rel="tooltip" title="Fullscreen" data-placement="bottom"><i class="' + b.fullscreenClass[0] + '"></i></a>' : "", b.o.colorButton === !0 && l.data("widget-colorbutton") === d ? (h = '<a data-toggle="dropdown" class="dropdown-toggle color-box selector" href="javascript:void(0);"></a><ul class="dropdown-menu arrow-box-up-right color-select pull-right"><li><span class="bg-color-green" data-widget-setstyle="jarviswidget-color-green" rel="tooltip" data-placement="left" data-original-title="Green Grass"></span></li><li><span class="bg-color-greenDark" data-widget-setstyle="jarviswidget-color-greenDark" rel="tooltip" data-placement="top" data-original-title="Dark Green"></span></li><li><span class="bg-color-greenLight" data-widget-setstyle="jarviswidget-color-greenLight" rel="tooltip" data-placement="top" data-original-title="Light Green"></span></li><li><span class="bg-color-purple" data-widget-setstyle="jarviswidget-color-purple" rel="tooltip" data-placement="top" data-original-title="Purple"></span></li><li><span class="bg-color-magenta" data-widget-setstyle="jarviswidget-color-magenta" rel="tooltip" data-placement="top" data-original-title="Magenta"></span></li><li><span class="bg-color-pink" data-widget-setstyle="jarviswidget-color-pink" rel="tooltip" data-placement="right" data-original-title="Pink"></span></li><li><span class="bg-color-pinkDark" data-widget-setstyle="jarviswidget-color-pinkDark" rel="tooltip" data-placement="left" data-original-title="Fade Pink"></span></li><li><span class="bg-color-blueLight" data-widget-setstyle="jarviswidget-color-blueLight" rel="tooltip" data-placement="top" data-original-title="Light Blue"></span></li><li><span class="bg-color-teal" data-widget-setstyle="jarviswidget-color-teal" rel="tooltip" data-placement="top" data-original-title="Teal"></span></li><li><span class="bg-color-blue" data-widget-setstyle="jarviswidget-color-blue" rel="tooltip" data-placement="top" data-original-title="Ocean Blue"></span></li><li><span class="bg-color-blueDark" data-widget-setstyle="jarviswidget-color-blueDark" rel="tooltip" data-placement="top" data-original-title="Night Sky"></span></li><li><span class="bg-color-darken" data-widget-setstyle="jarviswidget-color-darken" rel="tooltip" data-placement="right" data-original-title="Night"></span></li><li><span class="bg-color-yellow" data-widget-setstyle="jarviswidget-color-yellow" rel="tooltip" data-placement="left" data-original-title="Day Light"></span></li><li><span class="bg-color-orange" data-widget-setstyle="jarviswidget-color-orange" rel="tooltip" data-placement="bottom" data-original-title="Orange"></span></li><li><span class="bg-color-orangeDark" data-widget-setstyle="jarviswidget-color-orangeDark" rel="tooltip" data-placement="bottom" data-original-title="Dark Orange"></span></li><li><span class="bg-color-red" data-widget-setstyle="jarviswidget-color-red" rel="tooltip" data-placement="bottom" data-original-title="Red Rose"></span></li><li><span class="bg-color-redLight" data-widget-setstyle="jarviswidget-color-redLight" rel="tooltip" data-placement="bottom" data-original-title="Light Red"></span></li><li><span class="bg-color-white" data-widget-setstyle="jarviswidget-color-white" rel="tooltip" data-placement="right" data-original-title="Purity"></span></li><li><a href="javascript:void(0);" class="jarviswidget-remove-colors" data-widget-setstyle="" rel="tooltip" data-placement="bottom" data-original-title="Reset widget color to default">Remove</a></li></ul>', m.prepend('<div class="widget-toolbar">' + h + "</div>")) : h = "", b.o.toggleButton === !0 && l.data("widget-togglebutton") === d ? (j = l.data("widget-collapsed") === !0 || l.hasClass("jarviswidget-collapsed") ? b.toggleClass[1] : b.toggleClass[0], i = '<a href="javascript:void(0);" class="button-icon jarviswidget-toggle-btn" rel="tooltip" title="Collapse" data-placement="bottom"><i class="' + j + '"></i></a>') : i = "", k = b.o.refreshButton === !0 && l.data("widget-refreshbutton") !== !1 && l.data("widget-load") ? '<a href="javascript:void(0);" class="button-icon jarviswidget-refresh-btn" data-loading-text="&nbsp;&nbsp;Loading...&nbsp;" rel="tooltip" title="Refresh" data-placement="bottom"><i class="' + b.o.refreshButtonClass + '"></i></a>' : "";var n = b.o.buttonOrder.replace(/%refresh%/g, k).replace(/%delete%/g, e).replace(/%custom%/g, c).replace(/%fullscreen%/g, g).replace(/%edit%/g, f).replace(/%toggle%/g, i);("" !== k || "" !== e || "" !== c || "" !== g || "" !== f || "" !== i) && m.prepend('<div class="jarviswidget-ctrls">' + n + "</div>"), b.o.sortable === !0 && l.data("widget-sortable") === d && l.addClass("jarviswidget-sortable"), l.find(b.o.editPlaceholder).length && l.find(b.o.editPlaceholder).find("input").val(a.trim(m.children("h2").text())), m.append('<span class="jarviswidget-loader"><i class="fa fa-refresh fa-spin"></i></span>'), l.attr("role", "widget").children("div").attr("role", "content").prev("header").attr("role", "heading").children("div").attr("role", "menu");
          }                                                                                                            //
        }), b.o.buttonsHidden === !0 && a(b.o.pwCtrls).hide(), a(".jarviswidget header [rel=tooltip]").tooltip(), b.obj.find("[data-widget-load]").each(function () {
          {                                                                                                            // 1
            var c = a(this),                                                                                           // 1
                d = c.children(),                                                                                      //
                e = c.data("widget-load"),                                                                             //
                f = 1e3 * c.data("widget-refresh");c.children();                                                       //
          }c.find(".jarviswidget-ajax-placeholder").length || (c.children("widget-body").append('<div class="jarviswidget-ajax-placeholder">' + b.o.loadingLabel + "</div>"), c.data("widget-refresh") > 0 ? (b._loadAjaxFile(c, e, d), a.intervalArr.push(setInterval(function () {
            b._loadAjaxFile(c, e, d);                                                                                  // 1
          }, f))) : b._loadAjaxFile(c, e, d));                                                                         //
        }), b.o.sortable === !0 && jQuery.ui)) {                                                                       //
          var l = b.obj.find(b.o.grid + ".sortable-grid").not("[data-widget-excludegrid]");l.sortable({ "items": l.find(b.o.widgets + ".jarviswidget-sortable"), "connectWith": l, "placeholder": b.o.placeholderClass, "cursor": "move", "revert": !0, "opacity": b.o.opacity, "delay": 200, "cancel": ".button-icon, #jarviswidget-fullscreen-mode > div", "zIndex": 1e4, "handle": b.o.dragHandle, "forcePlaceholderSize": !0, "forceHelperSize": !0, "update": function update(a, c) {
              b._runLoaderWidget(c.item.children()), b._savePositionWidget(), "function" == typeof b.o.onChange && b.o.onChange.call(this, c.item);
            } });                                                                                                      //
        }b.o.buttonsHidden === !0 && b.widget.children("header").on("mouseenter." + f, function () {                   //
          a(this).children(b.o.pwCtrls).stop(!0, !0).fadeTo(100, 1);                                                   // 1
        }).on("mouseleave." + f, function () {                                                                         //
          a(this).children(b.o.pwCtrls).stop(!0, !0).fadeTo(100, 0);                                                   // 1
        }), b._clickEvents(), b.storage.enabled && (a(b.o.deleteSettingsKey).on(g, this, function (a) {                //
          var c = confirm(b.o.settingsKeyLabel);c && localStorage.removeItem(keySettings), a.preventDefault();         // 1
        }), a(b.o.deletePositionKey).on(g, this, function (a) {                                                        //
          var c = confirm(b.o.positionKeyLabel);c && localStorage.removeItem(keyPosition), a.preventDefault();         // 1
        })), initialized = !0;                                                                                         //
      }                                                                                                                //
    }, "_initStorage": function _initStorage(a) {                                                                      //
      a.enabled = a.enabled && !!(function () {                                                                        // 1
        var a,                                                                                                         // 1
            b = +new Date();try {                                                                                      //
          return localStorage.setItem(b, b), a = localStorage.getItem(b) == b, localStorage.removeItem(b), a;          // 1
        } catch (c) {}                                                                                                 //
      })(), this._loadKeys(), a.enabled && (a.getKeySettings = localStorage.getItem(a.keySettings), a.getKeyPosition = localStorage.getItem(a.keyPosition));
    }, "_clickEvents": function _clickEvents() {                                                                       //
      function c() {                                                                                                   // 1
        if (a("#jarviswidget-fullscreen-mode").length) {                                                               // 1
          var c = a(b).height(),                                                                                       // 1
              e = a("#jarviswidget-fullscreen-mode").children(d.o.widgets).children("header").height();a("#jarviswidget-fullscreen-mode").children(d.o.widgets).children("div").height(c - e - 15);
        }                                                                                                              //
      }var d = this,                                                                                                   //
          e = d.widget.children("header");e.on(g, ".jarviswidget-toggle-btn", function (b) {                           //
        var c = a(this),                                                                                               // 1
            e = c.parents(d.o.widgets);d._runLoaderWidget(c), e.hasClass("jarviswidget-collapsed") ? c.children().removeClass(d.toggleClass[1]).addClass(d.toggleClass[0]).parents(d.o.widgets).removeClass("jarviswidget-collapsed").children("[role=content]").slideDown(d.o.toggleSpeed, function () {
          d._saveSettingsWidget();                                                                                     // 1
        }) : c.children().removeClass(d.toggleClass[0]).addClass(d.toggleClass[1]).parents(d.o.widgets).addClass("jarviswidget-collapsed").children("[role=content]").slideUp(d.o.toggleSpeed, function () {
          d._saveSettingsWidget();                                                                                     // 1
        }), "function" == typeof d.o.onToggle && d.o.onToggle.call(this, e), b.preventDefault();                       //
      }), e.on(g, ".jarviswidget-fullscreen-btn", function (b) {                                                       //
        var e = a(this).parents(d.o.widgets),                                                                          // 1
            f = e.children("div");d._runLoaderWidget(a(this)), a("#jarviswidget-fullscreen-mode").length ? (a(".nooverflow").removeClass("nooverflow"), e.unwrap("<div>").children("div").removeAttr("style").end().find(".jarviswidget-fullscreen-btn:first").children().removeClass(d.fullscreenClass[1]).addClass(d.fullscreenClass[0]).parents(d.pwCtrls).children("a").show(), f.hasClass("jarviswidget-visible") && f.hide().removeClass("jarviswidget-visible")) : (a("body").addClass("nooverflow"), e.wrap('<div id="jarviswidget-fullscreen-mode"/>').parent().find(".jarviswidget-fullscreen-btn:first").children().removeClass(d.fullscreenClass[0]).addClass(d.fullscreenClass[1]).parents(d.pwCtrls).children("a:not(.jarviswidget-fullscreen-btn)").hide(), f.is(":hidden") && f.show().addClass("jarviswidget-visible")), c(), "function" == typeof d.o.onFullscreen && d.o.onFullscreen.call(this, e), b.preventDefault();
      }), a(b).on("resize." + f, function () {                                                                         //
        c();                                                                                                           // 1
      }), e.on(g, ".jarviswidget-edit-btn", function (b) {                                                             //
        var c = a(this).parents(d.o.widgets);d._runLoaderWidget(a(this)), c.find(d.o.editPlaceholder).is(":visible") ? a(this).children().removeClass(d.editClass[1]).addClass(d.editClass[0]).parents(d.o.widgets).find(d.o.editPlaceholder).slideUp(d.o.editSpeed, function () {
          d._saveSettingsWidget();                                                                                     // 1
        }) : a(this).children().removeClass(d.editClass[0]).addClass(d.editClass[1]).parents(d.o.widgets).find(d.o.editPlaceholder).slideDown(d.o.editSpeed), "function" == typeof d.o.onEdit && d.o.onEdit.call(this, c), b.preventDefault();
      }), a(d.o.editPlaceholder).find("input").keyup(function () {                                                     //
        a(this).parents(d.o.widgets).children("header").children("h2").text(a(this).val());                            // 1
      }), e.on(g, "[data-widget-setstyle]", function (b) {                                                             //
        var c = a(this).data("widget-setstyle"),                                                                       // 1
            e = "";a(this).parents(d.o.editPlaceholder).find("[data-widget-setstyle]").each(function () {              //
          e += a(this).data("widget-setstyle") + " ";                                                                  // 1
        }), a(this).parents(d.o.widgets).attr("data-widget-attstyle", "" + c).removeClassPrefix("jarviswidget-color-").addClass(c), d._runLoaderWidget(a(this)), d._saveSettingsWidget(), b.preventDefault();
      }), e.on(g, ".jarviswidget-custom-btn", function (b) {                                                           //
        var c = a(this).parents(d.o.widgets);d._runLoaderWidget(a(this)), a(this).children("." + d.customClass[0]).length ? (a(this).children().removeClass(d.customClass[0]).addClass(d.customClass[1]), "function" == typeof d.o.customStart && d.o.customStart.call(this, c)) : (a(this).children().removeClass(d.customClass[1]).addClass(d.customClass[0]), "function" == typeof d.o.customEnd && d.o.customEnd.call(this, c)), d._saveSettingsWidget(), b.preventDefault();
      }), e.on(g, ".jarviswidget-delete-btn", function (b) {                                                           //
        var c = a(this).parents(d.o.widgets),                                                                          // 1
            e = c.attr("id"),                                                                                          //
            f = c.children("header").children("h2").text();a.SmartMessageBox ? a.SmartMessageBox({ "title": "<i class='fa fa-times' style='color:#ed1c24'></i> " + d.o.labelDelete + ' "' + f + '"', "content": d.o.deleteMsg, "buttons": "[No][Yes]" }, function (b) {
          "Yes" == b && (d._runLoaderWidget(a(this)), a("#" + e).fadeOut(d.o.deleteSpeed, function () {                // 1
            a(this).remove(), "function" == typeof d.o.onDelete && d.o.onDelete.call(this, c);                         // 1
          }));                                                                                                         //
        }) : a("#" + e).fadeOut(d.o.deleteSpeed, function () {                                                         //
          a(this).remove(), "function" == typeof d.o.onDelete && d.o.onDelete.call(this, c);                           // 1
        }), b.preventDefault();                                                                                        //
      }), e.on(g, ".jarviswidget-refresh-btn", function (b) {                                                          //
        var c = a(this).parents(d.o.widgets),                                                                          // 1
            e = c.data("widget-load"),                                                                                 //
            f = c.children(),                                                                                          //
            g = a(this);g.button("loading"), f.addClass("widget-body-ajax-loading"), setTimeout(function () {          //
          g.button("reset"), f.removeClass("widget-body-ajax-loading"), d._loadAjaxFile(c, e, f);                      // 1
        }, 1e3), b.preventDefault();                                                                                   //
      }), e = null;                                                                                                    //
    }, "destroy": function destroy() {                                                                                 //
      var c = this,                                                                                                    // 1
          d = "." + f,                                                                                                 //
          e = c.obj.find(c.o.grid + ".sortable-grid").not("[data-widget-excludegrid]");e.sortable("destroy"), c.widget.children("header").off(d), a(c.o.deleteSettingsKey).off(d), a(c.o.deletePositionKey).off(d), a(b).off(d), c.obj.removeData(f);
    } }, a.fn[f] = function (b) {                                                                                      //
    return this.each(function () {                                                                                     // 1
      var c = a(this),                                                                                                 // 1
          d = c.data(f);if (!d) {                                                                                      //
        var g = "object" == typeof b && b;c.data(f, d = new e(this, g));                                               // 1
      }"string" == typeof b && d[b]();                                                                                 //
    });                                                                                                                //
  }, a.fn[f].defaults = { "grid": "section", "widgets": ".jarviswidget", "localStorage": !0, "deleteSettingsKey": "", "settingsKeyLabel": "Reset settings?", "deletePositionKey": "", "positionKeyLabel": "Reset position?", "sortable": !0, "buttonsHidden": !1, "toggleButton": !0, "toggleClass": "min-10 | plus-10", "toggleSpeed": 200, "onToggle": function onToggle() {}, "deleteButton": !0, "deleteMsg": "Warning: This action cannot be undone", "deleteClass": "trashcan-10", "deleteSpeed": 200, "onDelete": function onDelete() {}, "editButton": !0, "editPlaceholder": ".jarviswidget-editbox", "editClass": "pencil-10 | delete-10", "editSpeed": 200, "onEdit": function onEdit() {}, "colorButton": !0, "fullscreenButton": !0, "fullscreenClass": "fullscreen-10 | normalscreen-10", "fullscreenDiff": 3, "onFullscreen": function onFullscreen() {}, "customButton": !0, "customClass": "", "customStart": function customStart() {}, "customEnd": function customEnd() {}, "buttonOrder": "%refresh% %delete% %custom% %edit% %fullscreen% %toggle%", "opacity": 1, "dragHandle": "> header", "placeholderClass": "jarviswidget-placeholder", "indicator": !0, "indicatorTime": 600, "ajax": !0, "loadingLabel": "loading...", "timestampPlaceholder": ".jarviswidget-timestamp", "timestampFormat": "Last update: %m%/%d%/%y% %h%:%i%:%s%", "refreshButton": !0, "refreshButtonClass": "refresh-10", "labelError": "Sorry but there was a error:", "labelUpdated": "Last Update:", "labelRefresh": "Refresh", "labelDelete": "Delete widget:", "afterLoad": function afterLoad() {}, "rtl": !1, "onChange": function onChange() {}, "onSave": function onSave() {}, "ajaxnav": !0 }, a.fn.removeClassPrefix = function (b) {
    return this.each(function (c, d) {                                                                                 // 1
      var e = d.className.split(" ").map(function (a) {                                                                // 1
        return 0 === a.indexOf(b) ? "" : a;                                                                            // 1
      });d.className = a.trim(e.join(" "));                                                                            //
    }), this;                                                                                                          //
  };                                                                                                                   //
})(jQuery, window, document);                                                                                          //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"jquery.bootstrap.wizard.min.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/lib/smartadmin/plugins/jquery.bootstrap.wizard.min.js                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/*! SmartAdmin - v1.5 - 2014-09-27 */!(function (a) {                                                                  //
  var b = function b(b, c) {                                                                                           // 1
    var b = a(b),                                                                                                      // 1
        d = this,                                                                                                      //
        e = 'li:has([data-toggle="tab"])',                                                                             //
        f = a.extend({}, a.fn.bootstrapWizard.defaults, c),                                                            //
        g = null,                                                                                                      //
        h = null;this.rebindClick = function (a, b) {                                                                  //
      a.unbind("click", b).bind("click", b);                                                                           // 1
    }, this.fixNavigationButtons = function () {                                                                       //
      return g.length || (h.find("a:first").tab("show"), g = h.find(e + ":first")), a(f.previousSelector, b).toggleClass("disabled", d.firstIndex() >= d.currentIndex()), a(f.nextSelector, b).toggleClass("disabled", d.currentIndex() >= d.navigationLength()), d.rebindClick(a(f.nextSelector, b), d.next), d.rebindClick(a(f.previousSelector, b), d.previous), d.rebindClick(a(f.lastSelector, b), d.last), d.rebindClick(a(f.firstSelector, b), d.first), f.onTabShow && "function" == typeof f.onTabShow && f.onTabShow(g, h, d.currentIndex()) === !1 ? !1 : void 0;
    }, this.next = function () {                                                                                       //
      return b.hasClass("last") ? !1 : f.onNext && "function" == typeof f.onNext && f.onNext(g, h, d.nextIndex()) === !1 ? !1 : ($index = d.nextIndex(), void ($index > d.navigationLength() || h.find(e + ":eq(" + $index + ") a").tab("show")));
    }, this.previous = function () {                                                                                   //
      return b.hasClass("first") ? !1 : f.onPrevious && "function" == typeof f.onPrevious && f.onPrevious(g, h, d.previousIndex()) === !1 ? !1 : ($index = d.previousIndex(), void (0 > $index || h.find(e + ":eq(" + $index + ") a").tab("show")));
    }, this.first = function () {                                                                                      //
      return f.onFirst && "function" == typeof f.onFirst && f.onFirst(g, h, d.firstIndex()) === !1 ? !1 : b.hasClass("disabled") ? !1 : void h.find(e + ":eq(0) a").tab("show");
    }, this.last = function () {                                                                                       //
      return f.onLast && "function" == typeof f.onLast && f.onLast(g, h, d.lastIndex()) === !1 ? !1 : b.hasClass("disabled") ? !1 : void h.find(e + ":eq(" + d.navigationLength() + ") a").tab("show");
    }, this.currentIndex = function () {                                                                               //
      return h.find(e).index(g);                                                                                       // 1
    }, this.firstIndex = function () {                                                                                 //
      return 0;                                                                                                        // 1
    }, this.lastIndex = function () {                                                                                  //
      return d.navigationLength();                                                                                     // 1
    }, this.getIndex = function (a) {                                                                                  //
      return h.find(e).index(a);                                                                                       // 1
    }, this.nextIndex = function () {                                                                                  //
      return h.find(e).index(g) + 1;                                                                                   // 1
    }, this.previousIndex = function () {                                                                              //
      return h.find(e).index(g) - 1;                                                                                   // 1
    }, this.navigationLength = function () {                                                                           //
      return h.find(e).length - 1;                                                                                     // 1
    }, this.activeTab = function () {                                                                                  //
      return g;                                                                                                        // 1
    }, this.nextTab = function () {                                                                                    //
      return h.find(e + ":eq(" + (d.currentIndex() + 1) + ")").length ? h.find(e + ":eq(" + (d.currentIndex() + 1) + ")") : null;
    }, this.previousTab = function () {                                                                                //
      return d.currentIndex() <= 0 ? null : h.find(e + ":eq(" + parseInt(d.currentIndex() - 1) + ")");                 // 1
    }, this.show = function (a) {                                                                                      //
      return b.find(e + ":eq(" + a + ") a").tab("show");                                                               // 1
    }, this.disable = function (a) {                                                                                   //
      h.find(e + ":eq(" + a + ")").addClass("disabled");                                                               // 1
    }, this.enable = function (a) {                                                                                    //
      h.find(e + ":eq(" + a + ")").removeClass("disabled");                                                            // 1
    }, this.hide = function (a) {                                                                                      //
      h.find(e + ":eq(" + a + ")").hide();                                                                             // 1
    }, this.display = function (a) {                                                                                   //
      h.find(e + ":eq(" + a + ")").show();                                                                             // 1
    }, this.remove = function (b) {                                                                                    //
      var c = b[0],                                                                                                    // 1
          d = "undefined" != typeof b[1] ? b[1] : !1,                                                                  //
          f = h.find(e + ":eq(" + c + ")");if (d) {                                                                    //
        var g = f.find("a").attr("href");a(g).remove();                                                                // 1
      }f.remove();                                                                                                     //
    }, h = b.find("ul:first", b), g = h.find(e + ".active", b), h.hasClass(f.tabClass) || h.addClass(f.tabClass), f.onInit && "function" == typeof f.onInit && f.onInit(g, h, 0), f.onShow && "function" == typeof f.onShow && f.onShow(g, h, d.nextIndex()), d.fixNavigationButtons(), a('a[data-toggle="tab"]', h).on("click", function (b) {
      var c = h.find(e).index(a(b.currentTarget).parent(e));return f.onTabClick && "function" == typeof f.onTabClick && f.onTabClick(g, h, d.currentIndex(), c) === !1 ? !1 : void 0;
    }), a('a[data-toggle="tab"]', h).on("shown shown.bs.tab", function (b) {                                           //
      $element = a(b.target).parent();var c = h.find(e).index($element);return $element.hasClass("disabled") ? !1 : f.onTabChange && "function" == typeof f.onTabChange && f.onTabChange(g, h, d.currentIndex(), c) === !1 ? !1 : (g = $element, void d.fixNavigationButtons());
    });                                                                                                                //
  };a.fn.bootstrapWizard = function (c) {                                                                              //
    if ("string" == typeof c) {                                                                                        // 1
      var d = Array.prototype.slice.call(arguments, 1);return 1 === d.length && d.toString(), this.data("bootstrapWizard")[c](d);
    }return this.each(function () {                                                                                    //
      var d = a(this);if (!d.data("bootstrapWizard")) {                                                                // 1
        var e = new b(d, c);d.data("bootstrapWizard", e);                                                              // 1
      }                                                                                                                //
    });                                                                                                                //
  }, a.fn.bootstrapWizard.defaults = { "tabClass": "nav nav-pills", "nextSelector": ".wizard li.next", "previousSelector": ".wizard li.previous", "firstSelector": ".wizard li.first", "lastSelector": ".wizard li.last", "onShow": null, "onInit": null, "onNext": null, "onPrevious": null, "onLast": null, "onFirst": null, "onTabChange": null, "onTabClick": null, "onTabShow": null };
})(jQuery);                                                                                                            //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"smart_collapse_toggle.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/lib/smartadmin/plugins/smart_collapse_toggle.js                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
(function ($) {                                                                                                        // 1
                                                                                                                       //
  $.fn.smartCollapseToggle = function () {                                                                             // 3
                                                                                                                       //
    return this.each(function () {                                                                                     // 5
                                                                                                                       //
      var $body = $('body');                                                                                           // 7
      var $this = $(this);                                                                                             // 8
                                                                                                                       //
      // only if not  'menu-on-top'                                                                                    //
      if ($body.hasClass('menu-on-top')) {} else {                                                                     // 11
                                                                                                                       //
        $body.hasClass('mobile-view-activated');                                                                       // 16
                                                                                                                       //
        // toggle open                                                                                                 //
        $this.toggleClass('open');                                                                                     // 19
                                                                                                                       //
        // for minified menu collapse only second level                                                                //
        if ($body.hasClass('minified')) {                                                                              // 22
          if ($this.closest('nav ul ul').length) {                                                                     // 23
            $this.find('>a .collapse-sign .fa').toggleClass('fa-minus-square-o fa-plus-square-o');                     // 24
            $this.find('ul:first').slideToggle(200);                                                                   // 25
          }                                                                                                            //
        } else {                                                                                                       //
          // toggle expand item                                                                                        //
          $this.find('>a .collapse-sign .fa').toggleClass('fa-minus-square-o fa-plus-square-o');                       // 29
          $this.find('ul:first').slideToggle(200);                                                                     // 30
        }                                                                                                              //
      }                                                                                                                //
    });                                                                                                                //
  };                                                                                                                   //
})(jQuery);                                                                                                            //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"wizard.min.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/lib/smartadmin/plugins/wizard.min.js                                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/*! SmartAdmin - v1.5 - 2014-09-27 */var old = $.fn.wizard,                                                            //
    Wizard = function Wizard(a, b) {                                                                                   //
  var c;this.$element = $(a), this.options = $.extend({}, $.fn.wizard.defaults, b), this.options.disablePreviousStep = "previous" === this.$element.data().restrict ? !0 : !1, this.currentStep = this.options.selectedItem.step, this.numSteps = this.$element.find(".steps li").length, this.$prevBtn = this.$element.find("button.btn-prev"), this.$nextBtn = this.$element.find("button.btn-next"), c = this.$nextBtn.children().detach(), this.nextText = $.trim(this.$nextBtn.text()), this.$nextBtn.append(c), this.$prevBtn.on("click", $.proxy(this.previous, this)), this.$nextBtn.on("click", $.proxy(this.next, this)), this.$element.on("click", "li.complete", $.proxy(this.stepclicked, this)), this.currentStep > 1 && this.selectedItem(this.options.selectedItem), this.options.disablePreviousStep && (this.$prevBtn.attr("disabled", !0), this.$element.find(".steps").addClass("previous-disabled"));
};Wizard.prototype = { "constructor": Wizard, "setState": function setState() {                                        //
    var a = this.currentStep > 1,                                                                                      // 1
        b = 1 === this.currentStep,                                                                                    //
        c = this.currentStep === this.numSteps;this.options.disablePreviousStep || this.$prevBtn.attr("disabled", b === !0 || a === !1);var d = this.$nextBtn.data();if (d && d.last && (this.lastText = d.last, "undefined" != typeof this.lastText)) {
      var e = c !== !0 ? this.nextText : this.lastText,                                                                // 1
          f = this.$nextBtn.children().detach();this.$nextBtn.text(e).append(f);                                       //
    }var g = this.$element.find(".steps li");g.removeClass("active").removeClass("complete"), g.find("span.badge").removeClass("badge-info").removeClass("badge-success");var h = ".steps li:lt(" + (this.currentStep - 1) + ")",
        i = this.$element.find(h);i.addClass("complete"), i.find("span.badge").addClass("badge-success");var j = ".steps li:eq(" + (this.currentStep - 1) + ")",
        k = this.$element.find(j);k.addClass("active"), k.find("span.badge").addClass("badge-info");var l = k.data().target;this.$element.next(".step-content").find(".step-pane").removeClass("active"), $(l).addClass("active"), this.$element.find(".steps").first().attr("style", "margin-left: 0");var m = 0;this.$element.find(".steps > li").each(function () {
      m += $(this).outerWidth();                                                                                       // 1
    });var n = 0;if ((n = this.$element.find(".actions").length ? this.$element.width() - this.$element.find(".actions").first().outerWidth() : this.$element.width(), m > n)) {
      var o = m - n;this.$element.find(".steps").first().attr("style", "margin-left: -" + o + "px"), this.$element.find("li.active").first().position().left < 200 && (o += this.$element.find("li.active").first().position().left - 200, 1 > o ? this.$element.find(".steps").first().attr("style", "margin-left: 0") : this.$element.find(".steps").first().attr("style", "margin-left: -" + o + "px"));
    }this.$element.trigger("changed");                                                                                 //
  }, "stepclicked": function stepclicked(a) {                                                                          //
    var b = $(a.currentTarget),                                                                                        // 1
        c = this.$element.find(".steps li").index(b),                                                                  //
        d = !0;if ((this.options.disablePreviousStep && c < this.currentStep && (d = !1), d)) {                        //
      var e = $.Event("stepclick");if ((this.$element.trigger(e, { "step": c + 1 }), e.isDefaultPrevented())) return;this.currentStep = c + 1, this.setState();
    }                                                                                                                  //
  }, "previous": function previous() {                                                                                 //
    var a = this.currentStep > 1;if ((this.options.disablePreviousStep && (a = !1), a)) {                              // 1
      var b = $.Event("change");if ((this.$element.trigger(b, { "step": this.currentStep, "direction": "previous" }), b.isDefaultPrevented())) return;this.currentStep -= 1, this.setState();
    }                                                                                                                  //
  }, "next": function next() {                                                                                         //
    var a = this.currentStep + 1 <= this.numSteps,                                                                     // 1
        b = this.currentStep === this.numSteps;if (a) {                                                                //
      var c = $.Event("change");if ((this.$element.trigger(c, { "step": this.currentStep, "direction": "next" }), c.isDefaultPrevented())) return;this.currentStep += 1, this.setState();
    } else b && this.$element.trigger("finished");                                                                     //
  }, "selectedItem": function selectedItem(a) {                                                                        //
    var b, c;return a ? (c = a.step || -1, c >= 1 && c <= this.numSteps && (this.currentStep = c, this.setState()), b = this) : b = { "step": this.currentStep }, b;
  } }, $.fn.wizard = function (a) {                                                                                    //
  var b,                                                                                                               // 1
      c = Array.prototype.slice.call(arguments, 1),                                                                    //
      d = this.each(function () {                                                                                      //
    var d = $(this),                                                                                                   // 1
        e = d.data("wizard"),                                                                                          //
        f = "object" == typeof a && a;e || d.data("wizard", e = new Wizard(this, f)), "string" == typeof a && (b = e[a].apply(e, c));
  });return void 0 === b ? d : b;                                                                                      //
}, $.fn.wizard.defaults = { "selectedItem": { "step": 1 } }, $.fn.wizard.Constructor = Wizard, $.fn.wizard.noConflict = function () {
  return $.fn.wizard = old, this;                                                                                      // 1
}, $(function () {                                                                                                     //
  $("body").on("mouseover.wizard.data-api", ".wizard", function () {                                                   // 1
    var a = $(this);a.data("wizard") || a.wizard(a.data());                                                            // 1
  });                                                                                                                  //
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"app.smartadmin.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/lib/smartadmin/app.smartadmin.js                                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
angular.module('smartadmin', []);                                                                                      // 1
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"calendar.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/lib/smartadmin/calendar.js                                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/*                                                                                                                     //
*  AngularJs Fullcalendar Wrapper for the JQuery FullCalendar                                                          //
*  API @ http://arshaw.com/fullcalendar/                                                                               //
*                                                                                                                      //
*  Angular Calendar Directive that takes in the [eventSources] nested array object as the ng-model and watches it deeply changes.
*       Can also take in multiple event urls as a source object(s) and feed the events per view.                       //
*       The calendar will watch any eventSource array and update itself when a change is made.                         //
*                                                                                                                      //
*/                                                                                                                     //
                                                                                                                       //
angular.module('ui.calendar', []).constant('uiCalendarConfig', { calendars: {} }).controller('uiCalendarCtrl', ['$scope', '$locale', function ($scope, $locale) {
                                                                                                                       //
  var sources = $scope.eventSources,                                                                                   // 18
      extraEventSignature = $scope.calendarWatchEvent ? $scope.calendarWatchEvent : angular.noop,                      //
      wrapFunctionWithScopeApply = function wrapFunctionWithScopeApply(functionToWrap) {                               //
    return function () {                                                                                               // 22
      // This may happen outside of angular context, so create one if outside.                                         //
                                                                                                                       //
      if ($scope.$root.$$phase) {                                                                                      // 25
        return functionToWrap.apply(this, arguments);                                                                  // 26
      } else {                                                                                                         //
        var args = arguments;                                                                                          // 28
        var self = this;                                                                                               // 29
        return $scope.$root.$apply(function () {                                                                       // 30
          return functionToWrap.apply(self, args);                                                                     // 31
        });                                                                                                            //
      }                                                                                                                //
    };                                                                                                                 //
  };                                                                                                                   //
                                                                                                                       //
  var eventSerialId = 1;                                                                                               // 37
  // @return {String} fingerprint of the event object and its properties                                               //
  this.eventFingerprint = function (e) {                                                                               // 39
    if (!e._id) {                                                                                                      // 40
      e._id = eventSerialId++;                                                                                         // 41
    }                                                                                                                  //
                                                                                                                       //
    var extraSignature = extraEventSignature({ event: e }) || '';                                                      // 44
    var start = moment.isMoment(e.start) ? e.start.unix() : e.start ? moment(e.start).unix() : '';                     // 45
    var end = moment.isMoment(e.end) ? e.end.unix() : e.end ? moment(e.end).unix() : '';                               // 46
                                                                                                                       //
    // This extracts all the information we need from the event. http://jsperf.com/angular-calendar-events-fingerprint/3
    return "" + e._id + (e.id || '') + (e.title || '') + (e.url || '') + start + end + (e.allDay || '') + (e.className || '') + extraSignature;
  };                                                                                                                   //
                                                                                                                       //
  var sourceSerialId = 1,                                                                                              // 53
      sourceEventsSerialId = 1;                                                                                        //
  // @return {String} fingerprint of the source object and its events array                                            //
  this.sourceFingerprint = function (source) {                                                                         // 55
    var fp = '' + (source.__id || (source.__id = sourceSerialId++)),                                                   // 56
        events = angular.isObject(source) && source.events;                                                            //
    if (events) {                                                                                                      // 58
      fp = fp + '-' + (events.__id || (events.__id = sourceEventsSerialId++));                                         // 59
    }                                                                                                                  //
    return fp;                                                                                                         // 61
  };                                                                                                                   //
                                                                                                                       //
  // @return {Array} all events from all sources                                                                       //
  this.allEvents = function () {                                                                                       // 65
    // do sources.map(&:events).flatten(), but we don't have flatten                                                   //
    var arraySources = [];                                                                                             // 67
    for (var i = 0, srcLen = sources.length; i < srcLen; i++) {                                                        // 68
      var source = sources[i];                                                                                         // 69
      if (angular.isArray(source)) {                                                                                   // 70
        // event source as array                                                                                       //
        arraySources.push(source);                                                                                     // 72
      } else if (angular.isObject(source) && angular.isArray(source.events)) {                                         //
        // event source as object, ie extended form                                                                    //
        var extEvent = {};                                                                                             // 75
        for (var key in source) {                                                                                      // 76
          if (key !== '_id' && key !== 'events') {                                                                     // 77
            extEvent[key] = source[key];                                                                               // 78
          }                                                                                                            //
        }                                                                                                              //
        for (var eI = 0; eI < source.events.length; eI++) {                                                            // 81
          angular.extend(source.events[eI], extEvent);                                                                 // 82
        }                                                                                                              //
        arraySources.push(source.events);                                                                              // 84
      }                                                                                                                //
    }                                                                                                                  //
    return Array.prototype.concat.apply([], arraySources);                                                             // 87
  };                                                                                                                   //
                                                                                                                       //
  // Track changes in array of objects by assigning id tokens to each element and watching the scope for changes in the tokens
  // @param {Array|Function} arraySource array of objects to watch                                                     //
  // @param tokenFn {Function} that returns the token for a given object                                               //
  // @return {Object}                                                                                                  //
  //  subscribe: function(scope, function(newTokens, oldTokens))                                                       //
  //    called when source has changed. return false to prevent individual callbacks from firing                       //
  //  onAdded/Removed/Changed:                                                                                         //
  //    when set to a callback, called each item where a respective change is detected                                 //
  this.changeWatcher = function (arraySource, tokenFn) {                                                               // 98
    var self;                                                                                                          // 99
    var getTokens = function getTokens() {                                                                             // 100
      var array = angular.isFunction(arraySource) ? arraySource() : arraySource;                                       // 101
      var result = [],                                                                                                 // 102
          token,                                                                                                       //
          el;                                                                                                          //
      for (var i = 0, n = array.length; i < n; i++) {                                                                  // 103
        el = array[i];                                                                                                 // 104
        token = tokenFn(el);                                                                                           // 105
        map[token] = el;                                                                                               // 106
        result.push(token);                                                                                            // 107
      }                                                                                                                //
      return result;                                                                                                   // 109
    };                                                                                                                 //
                                                                                                                       //
    // @param {Array} a                                                                                                //
    // @param {Array} b                                                                                                //
    // @return {Array} elements in that are in a but not in b                                                          //
    // @example                                                                                                        //
    //  subtractAsSets([6, 100, 4, 5], [4, 5, 7]) // [6, 100]                                                          //
    var subtractAsSets = function subtractAsSets(a, b) {                                                               // 117
      var result = [],                                                                                                 // 118
          inB = {},                                                                                                    //
          i,                                                                                                           //
          n;                                                                                                           //
      for (i = 0, n = b.length; i < n; i++) {                                                                          // 119
        inB[b[i]] = true;                                                                                              // 120
      }                                                                                                                //
      for (i = 0, n = a.length; i < n; i++) {                                                                          // 122
        if (!inB[a[i]]) {                                                                                              // 123
          result.push(a[i]);                                                                                           // 124
        }                                                                                                              //
      }                                                                                                                //
      return result;                                                                                                   // 127
    };                                                                                                                 //
                                                                                                                       //
    // Map objects to tokens and vice-versa                                                                            //
    var map = {};                                                                                                      // 131
                                                                                                                       //
    // Compare newTokens to oldTokens and call onAdded, onRemoved, and onChanged handlers for each affected event respectively.
    var applyChanges = function applyChanges(newTokens, oldTokens) {                                                   // 134
      var i, n, el, token;                                                                                             // 135
      var replacedTokens = {};                                                                                         // 136
      var removedTokens = subtractAsSets(oldTokens, newTokens);                                                        // 137
      for (i = 0, n = removedTokens.length; i < n; i++) {                                                              // 138
        var removedToken = removedTokens[i];                                                                           // 139
        el = map[removedToken];                                                                                        // 140
        delete map[removedToken];                                                                                      // 141
        var newToken = tokenFn(el);                                                                                    // 142
        // if the element wasn't removed but simply got a new token, its old token will be different from the current one
        if (newToken === removedToken) {                                                                               // 144
          self.onRemoved(el);                                                                                          // 145
        } else {                                                                                                       //
          replacedTokens[newToken] = removedToken;                                                                     // 147
          self.onChanged(el);                                                                                          // 148
        }                                                                                                              //
      }                                                                                                                //
                                                                                                                       //
      var addedTokens = subtractAsSets(newTokens, oldTokens);                                                          // 152
      for (i = 0, n = addedTokens.length; i < n; i++) {                                                                // 153
        token = addedTokens[i];                                                                                        // 154
        el = map[token];                                                                                               // 155
        if (!replacedTokens[token]) {                                                                                  // 156
          self.onAdded(el);                                                                                            // 157
        }                                                                                                              //
      }                                                                                                                //
    };                                                                                                                 //
    return self = {                                                                                                    // 161
      subscribe: function subscribe(scope, onArrayChanged) {                                                           // 162
        scope.$watch(getTokens, function (newTokens, oldTokens) {                                                      // 163
          var notify = !(onArrayChanged && onArrayChanged(newTokens, oldTokens) === false);                            // 164
          if (notify) {                                                                                                // 165
            applyChanges(newTokens, oldTokens);                                                                        // 166
          }                                                                                                            //
        }, true);                                                                                                      //
      },                                                                                                               //
      onAdded: angular.noop,                                                                                           // 170
      onChanged: angular.noop,                                                                                         // 171
      onRemoved: angular.noop                                                                                          // 172
    };                                                                                                                 //
  };                                                                                                                   //
                                                                                                                       //
  this.getFullCalendarConfig = function (calendarSettings, uiCalendarConfig) {                                         // 176
    var config = {};                                                                                                   // 177
                                                                                                                       //
    angular.extend(config, uiCalendarConfig);                                                                          // 179
    angular.extend(config, calendarSettings);                                                                          // 180
                                                                                                                       //
    angular.forEach(config, function (value, key) {                                                                    // 182
      if (typeof value === 'function') {                                                                               // 183
        config[key] = wrapFunctionWithScopeApply(config[key]);                                                         // 184
      }                                                                                                                //
    });                                                                                                                //
                                                                                                                       //
    return config;                                                                                                     // 188
  };                                                                                                                   //
                                                                                                                       //
  this.getLocaleConfig = function (fullCalendarConfig) {                                                               // 191
    if (!fullCalendarConfig.lang || fullCalendarConfig.useNgLocale) {                                                  // 192
      // Configure to use locale names by default                                                                      //
      var tValues = function tValues(data) {                                                                           // 194
        // convert {0: "Jan", 1: "Feb", ...} to ["Jan", "Feb", ...]                                                    //
        var r, k;                                                                                                      // 196
        r = [];                                                                                                        // 197
        for (k in data) {                                                                                              // 198
          r[k] = data[k];                                                                                              // 199
        }                                                                                                              //
        return r;                                                                                                      // 201
      };                                                                                                               //
      var dtf = $locale.DATETIME_FORMATS;                                                                              // 203
      return {                                                                                                         // 204
        monthNames: tValues(dtf.MONTH),                                                                                // 205
        monthNamesShort: tValues(dtf.SHORTMONTH),                                                                      // 206
        dayNames: tValues(dtf.DAY),                                                                                    // 207
        dayNamesShort: tValues(dtf.SHORTDAY)                                                                           // 208
      };                                                                                                               //
    }                                                                                                                  //
    return {};                                                                                                         // 211
  };                                                                                                                   //
}]).directive('uiCalendar', ['uiCalendarConfig', function (uiCalendarConfig) {                                         //
  return {                                                                                                             // 215
    restrict: 'A',                                                                                                     // 216
    scope: { eventSources: '=ngModel', calendarWatchEvent: '&' },                                                      // 217
    controller: 'uiCalendarCtrl',                                                                                      // 218
    link: function link(scope, elm, attrs, controller) {                                                               // 219
                                                                                                                       //
      var sources = scope.eventSources,                                                                                // 221
          sourcesChanged = false,                                                                                      //
          calendar,                                                                                                    //
          eventSourcesWatcher = controller.changeWatcher(sources, controller.sourceFingerprint),                       //
          eventsWatcher = controller.changeWatcher(controller.allEvents, controller.eventFingerprint),                 //
          options = null;                                                                                              //
                                                                                                                       //
      function getOptions() {                                                                                          // 228
        var calendarSettings = attrs.uiCalendar ? scope.$parent.$eval(attrs.uiCalendar) : {},                          // 229
            fullCalendarConfig;                                                                                        //
                                                                                                                       //
        fullCalendarConfig = controller.getFullCalendarConfig(calendarSettings, uiCalendarConfig);                     // 232
                                                                                                                       //
        var localeFullCalendarConfig = controller.getLocaleConfig(fullCalendarConfig);                                 // 234
        angular.extend(localeFullCalendarConfig, fullCalendarConfig);                                                  // 235
        options = { eventSources: sources };                                                                           // 236
        angular.extend(options, localeFullCalendarConfig);                                                             // 237
        //remove calendars from options                                                                                //
        options.calendars = null;                                                                                      // 239
                                                                                                                       //
        var options2 = {};                                                                                             // 241
        for (var o in options) {                                                                                       // 242
          if (o !== 'eventSources') {                                                                                  // 243
            options2[o] = options[o];                                                                                  // 244
          }                                                                                                            //
        }                                                                                                              //
        return JSON.stringify(options2);                                                                               // 247
      }                                                                                                                //
                                                                                                                       //
      scope.destroyCalendar = function () {                                                                            // 250
        if (calendar && calendar.fullCalendar) {                                                                       // 251
          calendar.fullCalendar('destroy');                                                                            // 252
        }                                                                                                              //
        if (attrs.calendar) {                                                                                          // 254
          calendar = uiCalendarConfig.calendars[attrs.calendar] = $(elm).html('');                                     // 255
        } else {                                                                                                       //
          calendar = $(elm).html('');                                                                                  // 257
        }                                                                                                              //
      };                                                                                                               //
                                                                                                                       //
      scope.initCalendar = function () {                                                                               // 261
        if (!calendar) {                                                                                               // 262
          calendar = angular.element(elm).html('');                                                                    // 263
        }                                                                                                              //
        calendar.fullCalendar(options);                                                                                // 265
        if (attrs.calendar) {                                                                                          // 266
          uiCalendarConfig.calendars[attrs.calendar] = calendar;                                                       // 267
        }                                                                                                              //
      };                                                                                                               //
      scope.$on('$destroy', function () {                                                                              // 270
        scope.destroyCalendar();                                                                                       // 271
      });                                                                                                              //
                                                                                                                       //
      eventSourcesWatcher.onAdded = function (source) {                                                                // 274
        if (calendar && calendar.fullCalendar) {                                                                       // 275
          calendar.fullCalendar(options);                                                                              // 276
          if (attrs.calendar) {                                                                                        // 277
            uiCalendarConfig.calendars[attrs.calendar] = calendar;                                                     // 278
          }                                                                                                            //
          calendar.fullCalendar('addEventSource', source);                                                             // 280
          sourcesChanged = true;                                                                                       // 281
        }                                                                                                              //
      };                                                                                                               //
                                                                                                                       //
      eventSourcesWatcher.onRemoved = function (source) {                                                              // 285
        if (calendar && calendar.fullCalendar) {                                                                       // 286
          calendar.fullCalendar('removeEventSource', source);                                                          // 287
          sourcesChanged = true;                                                                                       // 288
        }                                                                                                              //
      };                                                                                                               //
                                                                                                                       //
      eventSourcesWatcher.onChanged = function () {                                                                    // 292
        if (calendar && calendar.fullCalendar) {                                                                       // 293
          calendar.fullCalendar('refetchEvents');                                                                      // 294
          sourcesChanged = true;                                                                                       // 295
        }                                                                                                              //
      };                                                                                                               //
                                                                                                                       //
      eventsWatcher.onAdded = function (event) {                                                                       // 300
        if (calendar && calendar.fullCalendar) {                                                                       // 301
          calendar.fullCalendar('renderEvent', event, event.stick ? true : false);                                     // 302
        }                                                                                                              //
      };                                                                                                               //
                                                                                                                       //
      eventsWatcher.onRemoved = function (event) {                                                                     // 306
        if (calendar && calendar.fullCalendar) {                                                                       // 307
          calendar.fullCalendar('removeEvents', event._id);                                                            // 308
        }                                                                                                              //
      };                                                                                                               //
                                                                                                                       //
      eventsWatcher.onChanged = function (event) {                                                                     // 312
        if (calendar && calendar.fullCalendar) {                                                                       // 313
          var clientEvents = calendar.fullCalendar('clientEvents', event._id);                                         // 314
          for (var i = 0; i < clientEvents.length; i++) {                                                              // 315
            var clientEvent = clientEvents[i];                                                                         // 316
            clientEvent = angular.extend(clientEvent, event);                                                          // 317
            calendar.fullCalendar('updateEvent', clientEvent);                                                         // 318
          }                                                                                                            //
        }                                                                                                              //
      };                                                                                                               //
                                                                                                                       //
      eventSourcesWatcher.subscribe(scope);                                                                            // 323
      eventsWatcher.subscribe(scope, function () {                                                                     // 324
        if (sourcesChanged === true) {                                                                                 // 325
          sourcesChanged = false;                                                                                      // 326
          // return false to prevent onAdded/Removed/Changed handlers from firing in this case                         //
          return false;                                                                                                // 328
        }                                                                                                              //
      });                                                                                                              //
                                                                                                                       //
      scope.$watch(getOptions, function (newValue, oldValue) {                                                         // 332
        if (newValue !== oldValue) {                                                                                   // 333
          scope.destroyCalendar();                                                                                     // 334
          scope.initCalendar();                                                                                        // 335
        } else if (newValue && angular.isUndefined(calendar)) {                                                        //
          scope.initCalendar();                                                                                        // 337
        }                                                                                                              //
      });                                                                                                              //
    }                                                                                                                  //
  };                                                                                                                   //
}]);                                                                                                                   //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"collection2Validate.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/lib/smartadmin/collection2Validate.js                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
angular.module('smartadmin').directive('collection2Validate', ['$rootScope', function ($rootScope) {                   // 1
                                                                                                                       //
  return {                                                                                                             // 3
    require: 'ngModel',                                                                                                // 4
    restrict: 'A',                                                                                                     // 5
    link: function link(scope, element, attributes, ctrl) {                                                            // 6
      var inputForm = element.closest("form");                                                                         // 7
      var formName = inputForm.attr("name");                                                                           // 8
                                                                                                                       //
      var schema = inputForm.prop("schema");                                                                           // 10
      var modelName = inputForm.data('collection2-schema');                                                            // 11
      var ngModelName = attributes.ngModel.split(".")[attributes.ngModel.split(".").length - 1];                       // 12
      var methodValidation = (modelName + ngModelName + "Validation").toLowerCase();                                   // 13
      //console.log(ctrl);                                                                                             //
      //console.log(scope);                                                                                            //
                                                                                                                       //
      //console.log(ctrl);                                                                                             //
      if ('undefined' != typeof element.attr(methodValidation)) {                                                      // 18
        return;                                                                                                        // 19
      }                                                                                                                //
                                                                                                                       //
      if ('undefined' != typeof scope.submitted) {                                                                     // 22
        scope.submitted == false;                                                                                      // 23
      }                                                                                                                //
                                                                                                                       //
      if ("undefined" == typeof scope.validationMessages) scope.validationMessages = {};                               // 26
                                                                                                                       //
      if ("undefined" == typeof scope.validationMessages[methodValidation]) scope.validationMessages[methodValidation] = "";
                                                                                                                       //
      var label = schema.schema()[ngModelName].label ? schema.schema()[ngModelName].label : ngModelName;               // 33
                                                                                                                       //
      element.attr("name", ngModelName);                                                                               // 35
                                                                                                                       //
      if ("undefined" == typeof element.attr("placeholder")) element.attr("placeholder", label);                       // 37
                                                                                                                       //
      if (element.parent().find($("label")).length == 0) element.parent().prepend('<label for="' + ngModelName + '">' + label + '</label>');
                                                                                                                       //
      //element.parent().append("<div class='alert  collection2ValidateMessage' role='alert'></div>");                 //
      //element.parent().find(".collection2ValidateMessage").html("uno dos tres por mi");                              //
      //console.log(element.parent().find(".collection2ValidateMessage"));                                             //
      ctrl.$validators[methodValidation] = function (modelValue, viewValue) {                                          // 46
        //console.log(modelValue);                                                                                     //
        //console.log(ctrl.viewValue);                                                                                 //
                                                                                                                       //
        var tmpModel = {};                                                                                             // 50
        switch (schema.schema()[ngModelName].type) {                                                                   // 51
          case Number:                                                                                                 // 52
            tmpModel[ngModelName] = "undefined" == typeof modelValue || modelValue.length == 0 ? null : parseFloat(modelValue);
            break;                                                                                                     // 54
          case Boolean:                                                                                                // 54
            tmpModel[ngModelName] = "undefined" == typeof modelValue || modelValue.length == 0 ? null : Boolean(modelValue);
            break;                                                                                                     // 57
          case Date:                                                                                                   // 57
            //tmpModel[ngModelName]=("undefined"==typeof modelValue || modelValue.length==0)? null:Date(modelValue);   //
            tmpModel[ngModelName] = "undefined" == typeof modelValue || modelValue.length == 0 ? null : new Date("string" == typeof modelValue ? modelValue.replace(" ", "T") : modelValue);
            break;                                                                                                     // 61
          case String:                                                                                                 // 61
            tmpModel[ngModelName] = "undefined" == typeof modelValue || modelValue.length == 0 ? null : modelValue;    // 63
            break;                                                                                                     // 64
          default:                                                                                                     // 64
            tmpModel[ngModelName] = "undefined" == typeof modelValue || modelValue.length == 0 ? null : modelValue;    // 66
        }                                                                                                              // 66
                                                                                                                       //
        var ssContext1 = schema.newContext();                                                                          // 69
        if ((!('undefined' === typeof modelValue) || !schema.schema()[ngModelName].optional) && !ssContext1.validateOne(tmpModel, ngModelName)) {
          var ik = ssContext1.invalidKeys();                                                                           // 73
          ik = _.map(ik, function (o) {                                                                                // 74
            return _.extend({ message: ssContext1.keyErrorMessage(o.name) }, o);                                       // 75
          });                                                                                                          //
          //console.log(methodValidation,ik[0].message);                                                               //
          scope.validationMessages[methodValidation] = ik[0].message;                                                  // 78
          //console.log($scope[formName][ngModelName]);                                                                //
          scope.$watch('submitted', function (submitted) {                                                             // 80
                                                                                                                       //
            element.parent().find(".collection2ValidateMessage").remove();                                             // 82
            if (submitted || ctrl.$dirty) element.parent().append("<div ng-show='submitted' class='text-danger collection2ValidateMessage' role='alert'>" + "<span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span><span class='sr-only' >Error:</span>" + scope.validationMessages[methodValidation] + "</div>");
          });                                                                                                          //
          //console.log("si estoy validando");                                                                         //
          scope.validForm = _.reduce(scope.validationMessages, function (memo, num) {                                  // 87
            //console.log(num);                                                                                        //
            return memo && num == "";                                                                                  // 89
          }, true);                                                                                                    //
          //console.log(scope.validForm);                                                                              //
                                                                                                                       //
          return false;                                                                                                // 93
        }                                                                                                              //
        scope.validationMessages[methodValidation] = "";                                                               // 95
        //console.log("si estoy validando");                                                                           //
        scope.validForm = _.reduce(scope.validationMessages, function (memo, num) {                                    // 97
          //console.log(num);                                                                                          //
          return memo && num == "";                                                                                    // 99
        }, true);                                                                                                      //
        //console.log(scope.validForm);                                                                                //
        element.parent().find(".collection2ValidateMessage").remove();                                                 // 102
        return true;                                                                                                   // 103
      };                                                                                                               //
    }                                                                                                                  //
  };                                                                                                                   //
}]);                                                                                                                   //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"fullscreen.directive.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/lib/smartadmin/fullscreen.directive.js                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
angular.module('smartadmin').directive('fullScreen', [function () {                                                    // 1
  return {                                                                                                             // 2
    restrict: 'A',                                                                                                     // 3
    link: function link(scope, element) {                                                                              // 4
      var $body = $('body');                                                                                           // 5
      var toggleFullSceen = function toggleFullSceen(e) {                                                              // 6
        if (!$body.hasClass("full-screen")) {                                                                          // 7
          $body.addClass("full-screen");                                                                               // 8
          if (document.documentElement.requestFullscreen) {                                                            // 9
            document.documentElement.requestFullscreen();                                                              // 10
          } else if (document.documentElement.mozRequestFullScreen) {                                                  //
            document.documentElement.mozRequestFullScreen();                                                           // 12
          } else if (document.documentElement.webkitRequestFullscreen) {                                               //
            document.documentElement.webkitRequestFullscreen();                                                        // 14
          } else if (document.documentElement.msRequestFullscreen) {                                                   //
            document.documentElement.msRequestFullscreen();                                                            // 16
          }                                                                                                            //
        } else {                                                                                                       //
          $body.removeClass("full-screen");                                                                            // 19
          if (document.exitFullscreen) {                                                                               // 20
            document.exitFullscreen();                                                                                 // 21
          } else if (document.mozCancelFullScreen) {                                                                   //
            document.mozCancelFullScreen();                                                                            // 23
          } else if (document.webkitExitFullscreen) {                                                                  //
            document.webkitExitFullscreen();                                                                           // 25
          }                                                                                                            //
        }                                                                                                              //
      };                                                                                                               //
                                                                                                                       //
      element.on('click', toggleFullSceen);                                                                            // 30
    }                                                                                                                  //
  };                                                                                                                   //
}]);                                                                                                                   //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"jarvis.widget.directive.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/lib/smartadmin/jarvis.widget.directive.js                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/*widget options:                                                                                                      //
        usage: <div data-jarvis-widget id="wid-id-0" data-widget-editbutton="false">                                   //
        data-widget-colorbutton="false"                                                                                //
        data-widget-editbutton="false"                                                                                 //
        data-widget-togglebutton="false"                                                                               //
        data-widget-deletebutton="false"                                                                               //
        data-widget-fullscreenbutton="false"                                                                           //
        data-widget-custombutton="false"                                                                               //
        data-widget-collapsed="true"                                                                                   //
        data-widget-sortable="false"                                                                                   //
*/                                                                                                                     //
angular.module('smartadmin').directive('jarvisWidget', ['$rootScope', function ($rootScope) {                          // 12
    return {                                                                                                           // 13
        restrict: "A",                                                                                                 // 14
        compile: function compile(element, attributes) {                                                               // 15
            if (element.data('widget-color')) element.addClass('jarviswidget-color-' + element.data('widget-color'));  // 16
                                                                                                                       //
            element.find('.widget-body').prepend('<div class="jarviswidget-editbox"><input class="form-control" type="text"></div>');
                                                                                                                       //
            element.addClass('jarviswidget jarviswidget-sortable');                                                    // 22
            $rootScope.$emit('jarvisWidgetAdded', element);                                                            // 23
        }                                                                                                              //
    };                                                                                                                 //
}]);                                                                                                                   //
                                                                                                                       //
angular.module('smartadmin').directive('ngConfirmClick', [function () {                                                // 29
    return {                                                                                                           // 31
        link: function link(scope, element, attr) {                                                                    // 32
            var msg = attr.ngConfirmClick || "Está seguro?";                                                           // 33
            var clickAction = attr.confirmedClick;                                                                     // 34
            element.bind('click', function (event) {                                                                   // 35
                if (window.confirm(msg)) {                                                                             // 36
                    scope.$eval(clickAction);                                                                          // 37
                }                                                                                                      //
            });                                                                                                        //
        }                                                                                                              //
    };                                                                                                                 //
}]);                                                                                                                   //
                                                                                                                       //
angular.module('smartadmin').directive('bsPopover', function () {                                                      // 45
    return function (scope, element, attrs) {                                                                          // 46
        element.find("a[rel=popover]").popover({ placement: 'bottom', html: 'true' });                                 // 47
    };                                                                                                                 //
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"smartmenu.directive.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/lib/smartadmin/smartmenu.directive.js                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
angular.module('smartadmin').directive('smartMenu', ['$state', '$rootScope', function ($state, $rootScope) {           // 1
  return {                                                                                                             // 2
    restrict: 'A',                                                                                                     // 3
    link: function link(scope, element, attrs) {                                                                       // 4
      var $body = $('body');                                                                                           // 5
                                                                                                                       //
      var $collapsible = element.find('li[data-menu-collapse]');                                                       // 7
      $collapsible.each(function (idx, li) {                                                                           // 8
        var $li = $(li);                                                                                               // 9
        $li.on('click', '>a', function (e) {                                                                           // 10
                                                                                                                       //
          // collapse all open siblings                                                                                //
          $li.siblings('.open').smartCollapseToggle();                                                                 // 14
                                                                                                                       //
          // toggle element                                                                                            //
          $li.smartCollapseToggle();                                                                                   // 17
                                                                                                                       //
          // add active marker to collapsed element if it has active childs                                            //
          if (!$li.hasClass('open') && $li.find('li.active').length > 0) {                                             // 20
            $li.addClass('active');                                                                                    // 21
          }                                                                                                            //
                                                                                                                       //
          e.preventDefault();                                                                                          // 24
        }).find('>a').append('<b class="collapse-sign"><em class="fa fa-plus-square-o"></em></b>');                    //
                                                                                                                       //
        // initialization toggle                                                                                       //
        if ($li.find('li.active').length) {                                                                            // 29
          $li.smartCollapseToggle();                                                                                   // 30
          $li.find('li.active').parents('li').addClass('active');                                                      // 31
        }                                                                                                              //
      });                                                                                                              //
                                                                                                                       //
      // click on route link                                                                                           //
      element.on('click', 'a[data-ui-sref]', function (e) {                                                            // 36
        // collapse all siblings to element parents and remove active markers                                          //
        $(this).parents('li').addClass('active').each(function () {                                                    // 38
          $(this).siblings('li.open').smartCollapseToggle();                                                           // 41
          $(this).siblings('li').removeClass('active');                                                                // 42
        });                                                                                                            //
                                                                                                                       //
        if ($body.hasClass('mobile-view-activated')) {                                                                 // 45
          // TODO: Find out what this shit is all about                                                                //
          $rootScope.$broadcast('requestToggleMenu');                                                                  // 47
        }                                                                                                              //
      });                                                                                                              //
                                                                                                                       //
      scope.$on('$smartLayoutMenuOnTop', function (event, menuOnTop) {                                                 // 52
        if (menuOnTop) {                                                                                               // 53
          $collapsible.filter('.open').smartCollapseToggle();                                                          // 54
        }                                                                                                              //
      });                                                                                                              //
    }                                                                                                                  //
  };                                                                                                                   //
}]);                                                                                                                   //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"toggle_menu.directive.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/lib/smartadmin/toggle_menu.directive.js                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
angular.module('smartadmin').directive('toggleMenu', [function () {                                                    // 1
  return {                                                                                                             // 2
    restrict: 'A',                                                                                                     // 3
    link: function link(scope, element) {                                                                              // 4
      var $body = $('body');                                                                                           // 5
                                                                                                                       //
      var toggleMenu = function toggleMenu() {                                                                         // 7
        if (!$body.hasClass("menu-on-top")) {                                                                          // 8
          $('html').toggleClass("hidden-menu-mobile-lock");                                                            // 9
          $body.toggleClass("hidden-menu");                                                                            // 10
          $body.removeClass("minified");                                                                               // 11
        } else if ($body.hasClass("menu-on-top") && $body.hasClass("mobile-view-activated")) {                         //
          $('html').toggleClass("hidden-menu-mobile-lock");                                                            // 13
          $body.toggleClass("hidden-menu");                                                                            // 14
          $body.removeClass("minified");                                                                               // 15
        }                                                                                                              //
      };                                                                                                               //
                                                                                                                       //
      element.on('click', toggleMenu);                                                                                 // 19
                                                                                                                       //
      scope.$on('requestToggleMenu', function () {                                                                     // 21
        toggleMenu();                                                                                                  // 22
      });                                                                                                              //
    }                                                                                                                  //
  };                                                                                                                   //
}]);                                                                                                                   //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"validator.collection2Schema.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/lib/smartadmin/validator.collection2Schema.js                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/*                                                                                                                     //
SimpleSchema.messages({                                                                                                //
  required: "[label] es requerido",                                                                                    //
  minString: "[label] debe contener al menos [min] caracteres",                                                        //
  maxString: "[label] no debe de exceder los [max] caracteres",                                                        //
  minNumber: "[label] debe ser al menos [min]",                                                                        //
  maxNumber: "[label] no debe de exceder [max]",                                                                       //
  minDate: "[label] debe ser [min] o posterior",                                                                       //
  maxDate: "[label] no puede ser despues [max]",                                                                       //
  badDate: "[label] no es una fecha valida",                                                                           //
  minCount: "You must specify at least [minCount] values",                                                             //
  maxCount: "You cannot specify more than [maxCount] values",                                                          //
  noDecimal: "[label] must be an integer",                                                                             //
  notAllowed: "[value] is not an allowed value",                                                                       //
  expectedString: "[label] must be a string",                                                                          //
  expectedNumber: "[label] must be a number",                                                                          //
  expectedBoolean: "[label] must be a boolean",                                                                        //
  expectedArray: "[label] must be an array",                                                                           //
  expectedObject: "[label] must be an object",                                                                         //
  expectedConstructor: "[label] must be a [type]",                                                                     //
  regEx: [                                                                                                             //
    {msg: "[label] failed regular expression validation"},                                                             //
    {exp: SimpleSchema.RegEx.Email, msg: "[label] must be a valid e-mail address"},                                    //
    {exp: SimpleSchema.RegEx.WeakEmail, msg: "[label] must be a valid e-mail address"},                                //
    {exp: SimpleSchema.RegEx.Domain, msg: "[label] must be a valid domain"},                                           //
    {exp: SimpleSchema.RegEx.WeakDomain, msg: "[label] must be a valid domain"},                                       //
    {exp: SimpleSchema.RegEx.IP, msg: "[label] must be a valid IPv4 or IPv6 address"},                                 //
    {exp: SimpleSchema.RegEx.IPv4, msg: "[label] must be a valid IPv4 address"},                                       //
    {exp: SimpleSchema.RegEx.IPv6, msg: "[label] must be a valid IPv6 address"},                                       //
    {exp: SimpleSchema.RegEx.Url, msg: "[label] must be a valid URL"},                                                 //
    {exp: SimpleSchema.RegEx.Id, msg: "[label] must be a valid alphanumeric ID"}                                       //
  ],                                                                                                                   //
  keyNotInSchema: "[key] is not allowed by the schema"                                                                 //
});                                                                                                                    //
                                                                                                                       //
angular.module('smartadmin').directive('collection2Schema', ['$rootScope', function ($rootScope) {                     //
  return {                                                                                                             //
    restrict: "A",                                                                                                     //
                                                                                                                       //
    compile:  function(element, attributes){                                                                           //
      if ('undefined' != typeof  element.prop("schema")) {                                                             //
          return ;                                                                                                     //
      }                                                                                                                //
      var modelName=element.data('collection2-schema');                                                                //
      var schema=eval(modelName+".simpleSchema()");                                                                    //
      //console.log(schema);                                                                                           //
      element.attr("name","form"+modelName);                                                                           //
      element.prop("schema",schema);                                                                                   //
                                                                                                                       //
      /*$.listen('parsley:field:error', function (fieldInstance) {                                                     //
          console.log(fieldInstance);                                                                                  //
          arrErrorMsg = ParsleyUI.getErrorsMessages(fieldInstance);                                                    //
          errorMsg = arrErrorMsg.join(';');                                                                            //
                                                                                                                       //
          fieldInstance.$element                                                                                       //
              .popover('destroy')                                                                                      //
              .popover({                                                                                               //
                                                                                                                       //
                  placement: 'top',                                                                                    //
                  delay: { "show": 500, "hide": 100 },                                                                 //
                                                                                                                       //
                  content: errorMsg                                                                                    //
              })                                                                                                       //
              .popover('show');                                                                                        //
                                                                                                                       //
      });                                                                                                              //
                                                                                                                       //
      $.listen('parsley:field:success', function (fieldInstance) {                                                     //
          fieldInstance.$element.popover('destroy');                                                                   //
      });                                                                                                              //
                                                                                                                       //
    }                                                                                                                  //
  };                                                                                                                   //
}]);                                                                                                                   //
*/                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"widget.grid.directive.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/lib/smartadmin/widget.grid.directive.js                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
angular.module('smartadmin').directive('widgetGrid', ['$rootScope', '$compile', '$q', '$state', '$timeout', function ($rootScope, $compile, $q, $state, $timeout) {
                                                                                                                       //
  var jarvisWidgetsDefaults = {                                                                                        // 3
    grid: 'article',                                                                                                   // 4
    widgets: '.jarviswidget',                                                                                          // 5
    localStorage: true,                                                                                                // 6
    deleteSettingsKey: '#deletesettingskey-options',                                                                   // 7
    settingsKeyLabel: 'Reset settings?',                                                                               // 8
    deletePositionKey: '#deletepositionkey-options',                                                                   // 9
    positionKeyLabel: 'Reset position?',                                                                               // 10
    sortable: true,                                                                                                    // 11
    buttonsHidden: false,                                                                                              // 12
    // toggle button                                                                                                   //
    toggleButton: true,                                                                                                // 14
    toggleClass: 'fa fa-minus | fa fa-plus',                                                                           // 15
    toggleSpeed: 200,                                                                                                  // 16
    onToggle: function onToggle() {},                                                                                  // 17
    // delete btn                                                                                                      //
    deleteButton: true,                                                                                                // 20
    deleteMsg: 'Warning: This action cannot be undone!',                                                               // 21
    deleteClass: 'fa fa-times',                                                                                        // 22
    deleteSpeed: 200,                                                                                                  // 23
    onDelete: function onDelete() {},                                                                                  // 24
    // edit btn                                                                                                        //
    editButton: true,                                                                                                  // 27
    editPlaceholder: '.jarviswidget-editbox',                                                                          // 28
    editClass: 'fa fa-cog | fa fa-save',                                                                               // 29
    editSpeed: 200,                                                                                                    // 30
    onEdit: function onEdit() {},                                                                                      // 31
    // color button                                                                                                    //
    colorButton: true,                                                                                                 // 34
    // full screen                                                                                                     //
    fullscreenButton: true,                                                                                            // 36
    fullscreenClass: 'fa fa-expand | fa fa-compress',                                                                  // 37
    fullscreenDiff: 3,                                                                                                 // 38
    onFullscreen: function onFullscreen() {},                                                                          // 39
    // custom btn                                                                                                      //
    customButton: false,                                                                                               // 42
    customClass: 'folder-10 | next-10',                                                                                // 43
    customStart: function customStart() {                                                                              // 44
      alert('Hello you, this is a custom button...');                                                                  // 45
    },                                                                                                                 //
    customEnd: function customEnd() {                                                                                  // 47
      alert('bye, till next time...');                                                                                 // 48
    },                                                                                                                 //
    // order                                                                                                           //
    buttonOrder: '%refresh% %custom% %edit% %toggle% %fullscreen% %delete%',                                           // 51
    opacity: 1.0,                                                                                                      // 52
    dragHandle: '> header',                                                                                            // 53
    placeholderClass: 'jarviswidget-placeholder',                                                                      // 54
    indicator: true,                                                                                                   // 55
    indicatorTime: 600,                                                                                                // 56
    ajax: true,                                                                                                        // 57
    timestampPlaceholder: '.jarviswidget-timestamp',                                                                   // 58
    timestampFormat: 'Last update: %m%/%d%/%y% %h%:%i%:%s%',                                                           // 59
    refreshButton: true,                                                                                               // 60
    refreshButtonClass: 'fa fa-refresh',                                                                               // 61
    labelError: 'Sorry but there was a error:',                                                                        // 62
    labelUpdated: 'Last Update:',                                                                                      // 63
    labelRefresh: 'Refresh',                                                                                           // 64
    labelDelete: 'Delete widget:',                                                                                     // 65
    afterLoad: function afterLoad() {},                                                                                // 66
    rtl: false, // best not to toggle this!                                                                            // 68
    onChange: function onChange() {},                                                                                  // 69
    onSave: function onSave() {},                                                                                      // 72
    ajaxnav: true                                                                                                      // 75
                                                                                                                       //
  };                                                                                                                   //
                                                                                                                       //
  var dispatchedWidgetIds = [];                                                                                        // 79
  var setupWaiting = false;                                                                                            // 80
                                                                                                                       //
  var debug = 1;                                                                                                       // 82
                                                                                                                       //
  var setupWidgets = function setupWidgets(element, widgetIds) {                                                       // 84
                                                                                                                       //
    if (!setupWaiting) {                                                                                               // 86
                                                                                                                       //
      if (_.intersection(widgetIds, dispatchedWidgetIds).length != widgetIds.length) {                                 // 88
                                                                                                                       //
        dispatchedWidgetIds = _.union(widgetIds, dispatchedWidgetIds);                                                 // 90
                                                                                                                       //
        //                    console.log('setupWidgets', debug++);                                                    //
                                                                                                                       //
        element.data('jarvisWidgets') && element.data('jarvisWidgets').destroy();                                      // 94
        element.jarvisWidgets(jarvisWidgetsDefaults);                                                                  // 95
        initDropdowns(widgetIds);                                                                                      // 96
      }                                                                                                                //
    } else {                                                                                                           //
      if (!setupWaiting) {                                                                                             // 100
        setupWaiting = true;                                                                                           // 101
        $timeout(function () {                                                                                         // 102
          setupWaiting = false;                                                                                        // 103
          setupWidgets(element, widgetIds);                                                                            // 104
        }, 200);                                                                                                       //
      }                                                                                                                //
    }                                                                                                                  //
  };                                                                                                                   //
                                                                                                                       //
  var destroyWidgets = function destroyWidgets(element, widgetIds) {                                                   // 111
    element.data('jarvisWidgets') && element.data('jarvisWidgets').destroy();                                          // 112
    // Using _.difference instead of _.xor since our project uses underscore and not lodash                            //
    dispatchedWidgetIds = _.difference(dispatchedWidgetIds, widgetIds);                                                // 114
  };                                                                                                                   //
                                                                                                                       //
  var initDropdowns = function initDropdowns(widgetIds) {                                                              // 117
    angular.forEach(widgetIds, function (wid) {                                                                        // 118
      $('#' + wid + ' [data-toggle="dropdown"]').each(function () {                                                    // 119
        var $parent = $(this).parent();                                                                                // 120
        $(this).removeAttr('data-toggle');                                                                             // 121
        if (!$parent.attr('dropdown')) {                                                                               // 122
          $(this).removeAttr('href');                                                                                  // 123
          $parent.attr('dropdown', '');                                                                                // 124
          var compiled = $compile($parent)($parent.scope());                                                           // 125
          $parent.replaceWith(compiled);                                                                               // 126
        }                                                                                                              //
      });                                                                                                              //
    });                                                                                                                //
  };                                                                                                                   //
                                                                                                                       //
  var jarvisWidgetAddedOff, $viewContentLoadedOff, $stateChangeStartOff;                                               // 132
                                                                                                                       //
  return {                                                                                                             // 136
    restrict: 'A',                                                                                                     // 137
    compile: function compile(element) {                                                                               // 138
                                                                                                                       //
      element.removeAttr('widget-grid data-widget-grid');                                                              // 140
                                                                                                                       //
      var widgetIds = [];                                                                                              // 142
                                                                                                                       //
      $viewContentLoadedOff = $rootScope.$on('$viewContentLoaded', function (event, data) {                            // 144
        $timeout(function () {                                                                                         // 145
          setupWidgets(element, widgetIds);                                                                            // 146
        }, 100);                                                                                                       //
      });                                                                                                              //
                                                                                                                       //
      $stateChangeStartOff = $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        jarvisWidgetAddedOff();                                                                                        // 153
        $viewContentLoadedOff();                                                                                       // 154
        $stateChangeStartOff();                                                                                        // 155
        destroyWidgets(element, widgetIds);                                                                            // 156
      });                                                                                                              //
                                                                                                                       //
      jarvisWidgetAddedOff = $rootScope.$on('jarvisWidgetAdded', function (event, widget) {                            // 159
        if (widgetIds.indexOf(widget.attr('id')) == -1) {                                                              // 160
          widgetIds.push(widget.attr('id'));                                                                           // 161
          $timeout(function () {                                                                                       // 162
            setupWidgets(element, widgetIds);                                                                          // 163
          }, 100);                                                                                                     //
        }                                                                                                              //
        //                    console.log('jarvisWidgetAdded', widget.attr('id'));                                     //
      });                                                                                                              //
    }                                                                                                                  //
  };                                                                                                                   //
}]);                                                                                                                   //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"globals":{"download.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/lib/globals/download.js                                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
window.downloadFile = function (params) {                                                                              // 1
  if (!params || !params.uri || !params.nombre) {                                                                      // 2
    console.log('err');                                                                                                // 3
  } else {                                                                                                             //
    var link = document.createElement("a");                                                                            // 5
    link.download = params.nombre;                                                                                     // 6
    link.href = params.uri;                                                                                            // 7
    link.click();                                                                                                      // 8
  }                                                                                                                    //
};                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"loading.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/lib/globals/loading.js                                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
window.loading = function (val, milisec) {                                                                             // 1
  if (!milisec) {                                                                                                      // 2
    milisec = 300;                                                                                                     // 3
  }                                                                                                                    //
  if (val) {                                                                                                           // 5
    if (!window.loadingInterval) {                                                                                     // 6
      $("[type=button]").attr("disabled", true);                                                                       // 7
      $("body").css("cursor", "progress");                                                                             // 8
      window.loadingInterval = setInterval(function () {                                                               // 9
        NProgress.inc();                                                                                               // 9
      }, milisec);                                                                                                     //
    }                                                                                                                  //
  } else {                                                                                                             //
    clearInterval(window.loadingInterval);                                                                             // 12
    delete window.loadingInterval;                                                                                     // 13
    $("[type=button]").attr("disabled", false);                                                                        // 14
    $("body").css("cursor", "default");                                                                                // 15
    NProgress.done();                                                                                                  // 16
  }                                                                                                                    //
};                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"app.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/lib/app.js                                                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       //
angular.module('planeacion', ['angular-meteor', 'ngAnimate', 'ngCookies', 'ngSanitize', 'toastr', 'ui.router', 'ui.grid', 'smartadmin', 'datePicker', 'ui.calendar', 'ui.bootstrap', 'checklist-model', 'ncy-angular-breadcrumb']);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"signarutre.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/lib/signarutre.js                                                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
(function (root, factory) {                                                                                            // 1
    if (typeof define === 'function' && define.amd) {                                                                  // 2
        // AMD. Register as an anonymous module unless amdModuleId is set                                              //
        define([], function () {                                                                                       // 4
            return root['SignaturePad'] = factory();                                                                   // 5
        });                                                                                                            //
    } else if (typeof exports === 'object') {                                                                          //
        // Node. Does not work with strict CommonJS, but                                                               //
        // only CommonJS-like environments that support module.exports,                                                //
        // like Node.                                                                                                  //
        module.exports = factory();                                                                                    // 11
    } else {                                                                                                           //
        root['SignaturePad'] = factory();                                                                              // 13
    }                                                                                                                  //
})(this, function () {                                                                                                 //
                                                                                                                       //
    /*!                                                                                                                //
     * Signature Pad v1.5.2                                                                                            //
     * https://github.com/szimek/signature_pad                                                                         //
     *                                                                                                                 //
     * Copyright 2015 Szymon Nowak                                                                                     //
     * Released under the MIT license                                                                                  //
     *                                                                                                                 //
     * The main idea and some parts of the code (e.g. drawing variable width Bézier curve) are taken from:             //
     * http://corner.squareup.com/2012/07/smoother-signatures.html                                                     //
     *                                                                                                                 //
     * Implementation of interpolation using cubic Bézier curves is taken from:                                        //
     * http://benknowscode.wordpress.com/2012/09/14/path-interpolation-using-cubic-bezier-and-control-point-estimation-in-javascript
     *                                                                                                                 //
     * Algorithm for approximated length of a Bézier curve is taken from:                                              //
     * http://www.lemoda.net/maths/bezier-length/index.html                                                            //
     *                                                                                                                 //
     */                                                                                                                //
    var SignaturePad = (function (document) {                                                                          // 34
        "use strict";                                                                                                  // 35
                                                                                                                       //
        var SignaturePad = function SignaturePad(canvas, options) {                                                    // 37
            var self = this,                                                                                           // 38
                opts = options || {};                                                                                  //
                                                                                                                       //
            this.velocityFilterWeight = opts.velocityFilterWeight || 0.7;                                              // 41
            this.minWidth = opts.minWidth || 0.5;                                                                      // 42
            this.maxWidth = opts.maxWidth || 2.5;                                                                      // 43
            this.dotSize = opts.dotSize || function () {                                                               // 44
                return (this.minWidth + this.maxWidth) / 2;                                                            // 45
            };                                                                                                         //
            this.penColor = opts.penColor || "black";                                                                  // 47
            this.backgroundColor = opts.backgroundColor || "rgba(0,0,0,0)";                                            // 48
            this.onEnd = opts.onEnd;                                                                                   // 49
            this.onBegin = opts.onBegin;                                                                               // 50
                                                                                                                       //
            this._canvas = canvas;                                                                                     // 52
            this._ctx = canvas.getContext("2d");                                                                       // 53
            this.clear();                                                                                              // 54
                                                                                                                       //
            // we need add these inline so they are available to unbind while still having                             //
            //  access to 'self' we could use _.bind but it's not worth adding a dependency                            //
            this._handleMouseDown = function (event) {                                                                 // 58
                if (event.which === 1) {                                                                               // 59
                    self._mouseButtonDown = true;                                                                      // 60
                    self._strokeBegin(event);                                                                          // 61
                }                                                                                                      //
            };                                                                                                         //
                                                                                                                       //
            this._handleMouseMove = function (event) {                                                                 // 65
                if (self._mouseButtonDown) {                                                                           // 66
                    self._strokeUpdate(event);                                                                         // 67
                }                                                                                                      //
            };                                                                                                         //
                                                                                                                       //
            this._handleMouseUp = function (event) {                                                                   // 71
                if (event.which === 1 && self._mouseButtonDown) {                                                      // 72
                    self._mouseButtonDown = false;                                                                     // 73
                    self._strokeEnd(event);                                                                            // 74
                }                                                                                                      //
            };                                                                                                         //
                                                                                                                       //
            this._handleTouchStart = function (event) {                                                                // 78
                if (event.targetTouches.length == 1) {                                                                 // 79
                    var touch = event.changedTouches[0];                                                               // 80
                    self._strokeBegin(touch);                                                                          // 81
                }                                                                                                      //
            };                                                                                                         //
                                                                                                                       //
            this._handleTouchMove = function (event) {                                                                 // 85
                // Prevent scrolling.                                                                                  //
                event.preventDefault();                                                                                // 87
                                                                                                                       //
                var touch = event.targetTouches[0];                                                                    // 89
                self._strokeUpdate(touch);                                                                             // 90
            };                                                                                                         //
                                                                                                                       //
            this._handleTouchEnd = function (event) {                                                                  // 93
                var wasCanvasTouched = event.target === self._canvas;                                                  // 94
                if (wasCanvasTouched) {                                                                                // 95
                    event.preventDefault();                                                                            // 96
                    self._strokeEnd(event);                                                                            // 97
                }                                                                                                      //
            };                                                                                                         //
                                                                                                                       //
            this._handleMouseEvents();                                                                                 // 101
            this._handleTouchEvents();                                                                                 // 102
        };                                                                                                             //
                                                                                                                       //
        SignaturePad.prototype.clear = function () {                                                                   // 105
            var ctx = this._ctx,                                                                                       // 106
                canvas = this._canvas;                                                                                 //
                                                                                                                       //
            ctx.fillStyle = this.backgroundColor;                                                                      // 109
            ctx.clearRect(0, 0, canvas.width, canvas.height);                                                          // 110
            ctx.fillRect(0, 0, canvas.width, canvas.height);                                                           // 111
            this._reset();                                                                                             // 112
        };                                                                                                             //
                                                                                                                       //
        SignaturePad.prototype.toDataURL = function (imageType, quality) {                                             // 115
            var canvas = this._canvas;                                                                                 // 116
            return canvas.toDataURL.apply(canvas, arguments);                                                          // 117
        };                                                                                                             //
                                                                                                                       //
        SignaturePad.prototype.fromDataURL = function (dataUrl) {                                                      // 120
            var self = this,                                                                                           // 121
                image = new Image(),                                                                                   //
                ratio = window.devicePixelRatio || 1,                                                                  //
                width = this._canvas.width / ratio,                                                                    //
                height = this._canvas.height / ratio;                                                                  //
                                                                                                                       //
            this._reset();                                                                                             // 127
            image.src = dataUrl;                                                                                       // 128
            image.onload = function () {                                                                               // 129
                self._ctx.drawImage(image, 0, 0, width, height);                                                       // 130
            };                                                                                                         //
            this._isEmpty = false;                                                                                     // 132
        };                                                                                                             //
                                                                                                                       //
        SignaturePad.prototype._strokeUpdate = function (event) {                                                      // 135
            var point = this._createPoint(event);                                                                      // 136
            this._addPoint(point);                                                                                     // 137
        };                                                                                                             //
                                                                                                                       //
        SignaturePad.prototype._strokeBegin = function (event) {                                                       // 140
            this._reset();                                                                                             // 141
            this._strokeUpdate(event);                                                                                 // 142
            if (typeof this.onBegin === 'function') {                                                                  // 143
                this.onBegin(event);                                                                                   // 144
            }                                                                                                          //
        };                                                                                                             //
                                                                                                                       //
        SignaturePad.prototype._strokeDraw = function (point) {                                                        // 148
            var ctx = this._ctx,                                                                                       // 149
                dotSize = typeof this.dotSize === 'function' ? this.dotSize() : this.dotSize;                          //
                                                                                                                       //
            ctx.beginPath();                                                                                           // 152
            this._drawPoint(point.x, point.y, dotSize);                                                                // 153
            ctx.closePath();                                                                                           // 154
            ctx.fill();                                                                                                // 155
        };                                                                                                             //
                                                                                                                       //
        SignaturePad.prototype._strokeEnd = function (event) {                                                         // 158
            var canDrawCurve = this.points.length > 2,                                                                 // 159
                point = this.points[0];                                                                                //
                                                                                                                       //
            if (!canDrawCurve && point) {                                                                              // 162
                this._strokeDraw(point);                                                                               // 163
            }                                                                                                          //
            if (typeof this.onEnd === 'function') {                                                                    // 165
                this.onEnd(event);                                                                                     // 166
            }                                                                                                          //
        };                                                                                                             //
                                                                                                                       //
        SignaturePad.prototype._handleMouseEvents = function () {                                                      // 170
            this._mouseButtonDown = false;                                                                             // 171
                                                                                                                       //
            this._canvas.addEventListener("mousedown", this._handleMouseDown);                                         // 173
            this._canvas.addEventListener("mousemove", this._handleMouseMove);                                         // 174
            document.addEventListener("mouseup", this._handleMouseUp);                                                 // 175
        };                                                                                                             //
                                                                                                                       //
        SignaturePad.prototype._handleTouchEvents = function () {                                                      // 178
            // Pass touch events to canvas element on mobile IE.                                                       //
            this._canvas.style.msTouchAction = 'none';                                                                 // 180
                                                                                                                       //
            this._canvas.addEventListener("touchstart", this._handleTouchStart);                                       // 182
            this._canvas.addEventListener("touchmove", this._handleTouchMove);                                         // 183
            document.addEventListener("touchend", this._handleTouchEnd);                                               // 184
        };                                                                                                             //
                                                                                                                       //
        SignaturePad.prototype.on = function () {                                                                      // 187
            this._handleMouseEvents();                                                                                 // 188
            this._handleTouchEvents();                                                                                 // 189
        };                                                                                                             //
                                                                                                                       //
        SignaturePad.prototype.off = function () {                                                                     // 192
            this._canvas.removeEventListener("mousedown", this._handleMouseDown);                                      // 193
            this._canvas.removeEventListener("mousemove", this._handleMouseMove);                                      // 194
            document.removeEventListener("mouseup", this._handleMouseUp);                                              // 195
                                                                                                                       //
            this._canvas.removeEventListener("touchstart", this._handleTouchStart);                                    // 197
            this._canvas.removeEventListener("touchmove", this._handleTouchMove);                                      // 198
            document.removeEventListener("touchend", this._handleTouchEnd);                                            // 199
        };                                                                                                             //
                                                                                                                       //
        SignaturePad.prototype.isEmpty = function () {                                                                 // 202
            return this._isEmpty;                                                                                      // 203
        };                                                                                                             //
                                                                                                                       //
        SignaturePad.prototype._reset = function () {                                                                  // 206
            this.points = [];                                                                                          // 207
            this._lastVelocity = 0;                                                                                    // 208
            this._lastWidth = (this.minWidth + this.maxWidth) / 2;                                                     // 209
            this._isEmpty = true;                                                                                      // 210
            this._ctx.fillStyle = this.penColor;                                                                       // 211
        };                                                                                                             //
                                                                                                                       //
        SignaturePad.prototype._createPoint = function (event) {                                                       // 214
            var rect = this._canvas.getBoundingClientRect();                                                           // 215
            return new Point(event.clientX - rect.left, event.clientY - rect.top);                                     // 216
        };                                                                                                             //
                                                                                                                       //
        SignaturePad.prototype._addPoint = function (point) {                                                          // 222
            var points = this.points,                                                                                  // 223
                c2,                                                                                                    //
                c3,                                                                                                    //
                curve,                                                                                                 //
                tmp;                                                                                                   //
                                                                                                                       //
            points.push(point);                                                                                        // 227
                                                                                                                       //
            if (points.length > 2) {                                                                                   // 229
                // To reduce the initial lag make it work with 3 points                                                //
                // by copying the first point to the beginning.                                                        //
                if (points.length === 3) points.unshift(points[0]);                                                    // 232
                                                                                                                       //
                tmp = this._calculateCurveControlPoints(points[0], points[1], points[2]);                              // 234
                c2 = tmp.c2;                                                                                           // 235
                tmp = this._calculateCurveControlPoints(points[1], points[2], points[3]);                              // 236
                c3 = tmp.c1;                                                                                           // 237
                curve = new Bezier(points[1], c2, c3, points[2]);                                                      // 238
                this._addCurve(curve);                                                                                 // 239
                                                                                                                       //
                // Remove the first element from the list,                                                             //
                // so that we always have no more than 4 points in points array.                                       //
                points.shift();                                                                                        // 243
            }                                                                                                          //
        };                                                                                                             //
                                                                                                                       //
        SignaturePad.prototype._calculateCurveControlPoints = function (s1, s2, s3) {                                  // 247
            var dx1 = s1.x - s2.x,                                                                                     // 248
                dy1 = s1.y - s2.y,                                                                                     //
                dx2 = s2.x - s3.x,                                                                                     //
                dy2 = s2.y - s3.y,                                                                                     //
                m1 = { x: (s1.x + s2.x) / 2.0, y: (s1.y + s2.y) / 2.0 },                                               //
                m2 = { x: (s2.x + s3.x) / 2.0, y: (s2.y + s3.y) / 2.0 },                                               //
                l1 = Math.sqrt(dx1 * dx1 + dy1 * dy1),                                                                 //
                l2 = Math.sqrt(dx2 * dx2 + dy2 * dy2),                                                                 //
                dxm = m1.x - m2.x,                                                                                     //
                dym = m1.y - m2.y,                                                                                     //
                k = l2 / (l1 + l2),                                                                                    //
                cm = { x: m2.x + dxm * k, y: m2.y + dym * k },                                                         //
                tx = s2.x - cm.x,                                                                                      //
                ty = s2.y - cm.y;                                                                                      //
                                                                                                                       //
            return {                                                                                                   // 266
                c1: new Point(m1.x + tx, m1.y + ty),                                                                   // 267
                c2: new Point(m2.x + tx, m2.y + ty)                                                                    // 268
            };                                                                                                         //
        };                                                                                                             //
                                                                                                                       //
        SignaturePad.prototype._addCurve = function (curve) {                                                          // 272
            var startPoint = curve.startPoint,                                                                         // 273
                endPoint = curve.endPoint,                                                                             //
                velocity,                                                                                              //
                newWidth;                                                                                              //
                                                                                                                       //
            velocity = endPoint.velocityFrom(startPoint);                                                              // 277
            velocity = this.velocityFilterWeight * velocity + (1 - this.velocityFilterWeight) * this._lastVelocity;    // 278
                                                                                                                       //
            newWidth = this._strokeWidth(velocity);                                                                    // 281
            this._drawCurve(curve, this._lastWidth, newWidth);                                                         // 282
                                                                                                                       //
            this._lastVelocity = velocity;                                                                             // 284
            this._lastWidth = newWidth;                                                                                // 285
        };                                                                                                             //
                                                                                                                       //
        SignaturePad.prototype._drawPoint = function (x, y, size) {                                                    // 288
            var ctx = this._ctx;                                                                                       // 289
                                                                                                                       //
            ctx.moveTo(x, y);                                                                                          // 291
            ctx.arc(x, y, size, 0, 2 * Math.PI, false);                                                                // 292
            this._isEmpty = false;                                                                                     // 293
        };                                                                                                             //
                                                                                                                       //
        SignaturePad.prototype._drawCurve = function (curve, startWidth, endWidth) {                                   // 296
            var ctx = this._ctx,                                                                                       // 297
                widthDelta = endWidth - startWidth,                                                                    //
                drawSteps,                                                                                             //
                width,                                                                                                 //
                i,                                                                                                     //
                t,                                                                                                     //
                tt,                                                                                                    //
                ttt,                                                                                                   //
                u,                                                                                                     //
                uu,                                                                                                    //
                uuu,                                                                                                   //
                x,                                                                                                     //
                y;                                                                                                     //
                                                                                                                       //
            drawSteps = Math.floor(curve.length());                                                                    // 301
            ctx.beginPath();                                                                                           // 302
            for (i = 0; i < drawSteps; i++) {                                                                          // 303
                // Calculate the Bezier (x, y) coordinate for this step.                                               //
                t = i / drawSteps;                                                                                     // 305
                tt = t * t;                                                                                            // 306
                ttt = tt * t;                                                                                          // 307
                u = 1 - t;                                                                                             // 308
                uu = u * u;                                                                                            // 309
                uuu = uu * u;                                                                                          // 310
                                                                                                                       //
                x = uuu * curve.startPoint.x;                                                                          // 312
                x += 3 * uu * t * curve.control1.x;                                                                    // 313
                x += 3 * u * tt * curve.control2.x;                                                                    // 314
                x += ttt * curve.endPoint.x;                                                                           // 315
                                                                                                                       //
                y = uuu * curve.startPoint.y;                                                                          // 317
                y += 3 * uu * t * curve.control1.y;                                                                    // 318
                y += 3 * u * tt * curve.control2.y;                                                                    // 319
                y += ttt * curve.endPoint.y;                                                                           // 320
                                                                                                                       //
                width = startWidth + ttt * widthDelta;                                                                 // 322
                this._drawPoint(x, y, width);                                                                          // 323
            }                                                                                                          //
            ctx.closePath();                                                                                           // 325
            ctx.fill();                                                                                                // 326
        };                                                                                                             //
                                                                                                                       //
        SignaturePad.prototype._strokeWidth = function (velocity) {                                                    // 329
            return Math.max(this.maxWidth / (velocity + 1), this.minWidth);                                            // 330
        };                                                                                                             //
                                                                                                                       //
        var Point = function Point(x, y, time) {                                                                       // 334
            this.x = x;                                                                                                // 335
            this.y = y;                                                                                                // 336
            this.time = time || new Date().getTime();                                                                  // 337
        };                                                                                                             //
                                                                                                                       //
        Point.prototype.velocityFrom = function (start) {                                                              // 340
            return this.time !== start.time ? this.distanceTo(start) / (this.time - start.time) : 1;                   // 341
        };                                                                                                             //
                                                                                                                       //
        Point.prototype.distanceTo = function (start) {                                                                // 344
            return Math.sqrt(Math.pow(this.x - start.x, 2) + Math.pow(this.y - start.y, 2));                           // 345
        };                                                                                                             //
                                                                                                                       //
        var Bezier = function Bezier(startPoint, control1, control2, endPoint) {                                       // 348
            this.startPoint = startPoint;                                                                              // 349
            this.control1 = control1;                                                                                  // 350
            this.control2 = control2;                                                                                  // 351
            this.endPoint = endPoint;                                                                                  // 352
        };                                                                                                             //
                                                                                                                       //
        // Returns approximated length.                                                                                //
        Bezier.prototype.length = function () {                                                                        // 356
            var steps = 10,                                                                                            // 357
                length = 0,                                                                                            //
                i,                                                                                                     //
                t,                                                                                                     //
                cx,                                                                                                    //
                cy,                                                                                                    //
                px,                                                                                                    //
                py,                                                                                                    //
                xdiff,                                                                                                 //
                ydiff;                                                                                                 //
                                                                                                                       //
            for (i = 0; i <= steps; i++) {                                                                             // 361
                t = i / steps;                                                                                         // 362
                cx = this._point(t, this.startPoint.x, this.control1.x, this.control2.x, this.endPoint.x);             // 363
                cy = this._point(t, this.startPoint.y, this.control1.y, this.control2.y, this.endPoint.y);             // 364
                if (i > 0) {                                                                                           // 365
                    xdiff = cx - px;                                                                                   // 366
                    ydiff = cy - py;                                                                                   // 367
                    length += Math.sqrt(xdiff * xdiff + ydiff * ydiff);                                                // 368
                }                                                                                                      //
                px = cx;                                                                                               // 370
                py = cy;                                                                                               // 371
            }                                                                                                          //
            return length;                                                                                             // 373
        };                                                                                                             //
                                                                                                                       //
        Bezier.prototype._point = function (t, start, c1, c2, end) {                                                   // 376
            return start * (1.0 - t) * (1.0 - t) * (1.0 - t) + 3.0 * c1 * (1.0 - t) * (1.0 - t) * t + 3.0 * c2 * (1.0 - t) * t * t + end * t * t * t;
        };                                                                                                             //
                                                                                                                       //
        return SignaturePad;                                                                                           // 383
    })(document);                                                                                                      //
                                                                                                                       //
    return SignaturePad;                                                                                               // 386
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"administradores":{"admins.html":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/administradores/admins.html                                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
      if (Meteor.isServer) return;                                                                                     // 2
                                                                                                                       // 3
      var templateUrl = "/client/administradores/admins.html";                                                         // 4
      var template = "<title>Agregar bibliotecarios</title> <h2>{{am.VerSiEsPerfil()}}</h2> <form name=\"form\" class=\"form-horizontal\" role=\"form\" novalidate> <div class=\"well\"> <fieldset> <legend>Datos de la cuenta</legend> <div class=\"row\"> <div class=\"col-sm-12\"> <div class=\"col-sm-4\" valida> <label>Usuario</label> <input ng-disabled=\"!am.accion\" placeholder=\"Usuario\" name=\"usuario\" type=\"text\" class=\"form-control\" ng-model=\"am.usuario.username\" required> </div> <div class=\"col-sm-4\" valida> <label>Contraseña</label> <input type=\"password\" placeholder=\"Contraseña\" name=\"contrasena\" type=\"text\" class=\"form-control\" ng-model=\"am.usuario.password\" required> </div> <div class=\"col-sm-4\" valida> <label>Repetir Contraseña</label> <input type=\"password\" placeholder=\"Repetir Contraseña\" name=\"repetirContrasena\" type=\"text\" class=\"form-control\" ng-model=\"am.usuario.repetirContra\" required> </div> </div> </div></fieldset> <br> <fieldset> <legend>Datos del usuario</legend> <div class=\"row\"> <div class=\"col-sm-12\"> <div class=\"col-sm-4\"> <label>Nombre (s)</label> <input type=\"text\" class=\"form-control\" placeholder=\"Nombre (s)\" ng-model=\"am.usuario.profile.nombres\"> </div> <div class=\"col-sm-4\" valida> <label>Apellido Paterno</label> <input name=\"apellidoPatern\" type=\"text\" placeholder=\"Apellido Paterno\" class=\"form-control\" ng-model=\"am.usuario.profile.apellidoPaterno\" required> </div> <div class=\"col-sm-4\" valida> <label>Apellido Materno</label> <input name=\"apellidoMaterno\" type=\"text\" placeholder=\"Apellido Materno\" class=\"form-control\" ng-model=\"am.usuario.profile.apellidoMaterno\" required> </div> </div> <h6>&nbsp;</h6> <div class=\"col-sm-12\"> <div class=\"col-sm-4\" valida> <label>Sexo</label> <select name=\"sexo\" class=\"form-control\" ng-model=\"am.usuario.profile.sexo\" required> <option value disabled=\"disabled\" selected=\"selected\">Seleccionar sexo...</option> <option value=\"Masculino\">Masculino</option> <option value=\"Femenino\">Femenino</option> </select> </div> </div> </div> </fieldset> <br> <div class=\"row\"> <div class=\"col-sm-3\"> <input type=\"submit\" ng-click=\"am.guardar(am.usuario, form)\" class=\"btn btn-xs btn-info\" ng-if=\"am.accion\" valida-form formulario=\"form\" value=\"Guardar\"> <input type=\"submit\" ng-click=\"am.actualizar(am.objeto, form)\" class=\"btn btn-xs btn-info\" valida-form formulario=\"form\" value=\"Actualizar\" ng-if=\"!am.accion\"> <button type=\"button\" ui-sref=\"root.listaAdministradores\" class=\"btn btn-xs btn-danger\">Cancelar</button> </div> </div> </div> </form>";
                                                                                                                       // 6
      angular.module('angular-templates')                                                                              // 7
        .run(['$templateCache', function($templateCache) {                                                             // 8
          $templateCache.put(templateUrl, template);                                                                   // 9
        }]);                                                                                                           // 10
                                                                                                                       // 11
      module.exports = {};                                                                                             // 12
      module.exports.__esModule = true;                                                                                // 13
      module.exports.default = templateUrl;                                                                            // 14
                                                                                                                       // 15
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"admins.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/administradores/admins.js                                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
AdministradoresCtrl.$inject = ["$scope", "$meteor", "$reactive", "$state", "toastr", "$stateParams"];angular.module("planeacion").controller("AdministradoresCtrl", AdministradoresCtrl);
function AdministradoresCtrl($scope, $meteor, $reactive, $state, toastr, $stateParams) {                               //
    var _this = this;                                                                                                  //
                                                                                                                       // 5
    var rc = $reactive(this).attach($scope);                                                                           // 6
    var usuario = [];                                                                                                  // 7
    rc.accion = true;                                                                                                  // 8
    rc.buscar = {};                                                                                                    // 9
    rc.buscar.nombre = "";                                                                                             //
                                                                                                                       //
    //#Region Main Suubscripciones                                                                                     // 13
    this.subscribe('buscarUsuarios', function () {                                                                     // 14
        return [{                                                                                                      // 15
            options: { limit: 10 },                                                                                    // 16
            where: { profile: { nombreCompleto: _this.getReactively("buscar.nombre") } }                               //
        }];                                                                                                            //
    });                                                                                                                //
                                                                                                                       // 21
    this.subscribe('unidades', function () {                                                                           // 22
        return [{}];                                                                                                   //
    });                                                                                                                //
                                                                                                                       // 27
    this.subscribe('listaAdministradores', function () {                                                               // 28
        return [{}];                                                                                                   //
    });                                                                                                                //
                                                                                                                       // 32
    if ($stateParams.id != undefined) {                                                                                // 33
        this.subscribe('usuarios', function () {                                                                       // 34
            return [{ _id: $stateParams.id }];                                                                         //
        });                                                                                                            // 36
        rc.accion = false;                                                                                             //
    }                                                                                                                  //
                                                                                                                       //
    //#endregion                                                                                                       //
                                                                                                                       //
    //#Region Helpers                                                                                                  // 44
    this.helpers({                                                                                                     // 45
        usuario: function usuario() {                                                                                  // 46
            rc.objeto = Meteor.users.findOne($stateParams.id);                                                         // 47
            if (rc.objeto != undefined) return rc.objeto;                                                              //
        },                                                                                                             // 50
        administradores: function administradores() {                                                                  // 51
            return Meteor.users.find({ "roles": "Administrador" });                                                    //
        },                                                                                                             // 53
        unidades: function unidades() {                                                                                // 54
            return Unidades.find().fetch();                                                                            //
        }                                                                                                              //
    });                                                                                                                //
                                                                                                                       //
    //#endregion                                                                                                       //
                                                                                                                       //
    //#Region Metodos                                                                                                  // 61
    this.guardar = function (usuario, form) {                                                                          // 62
        var existeUsarioEnUnidad = Meteor.users.find({                                                                 // 63
            "roles": "Administrador",                                                                                  // 64
            "profile.unidad": usuario.profile.unidad,                                                                  // 65
            "profile.estatus": true }).count();                                                                        //
                                                                                                                       // 68
        if (existeUsarioEnUnidad > 0) {                                                                                // 69
            toastr.info("Ya existe un Administrador Activo asignado a esa unidad");                                    // 70
            return;                                                                                                    //
        }                                                                                                              // 72
        if (form.$invalid) {                                                                                           // 73
            toastr.error("ERROR");                                                                                     // 74
            return;                                                                                                    //
        }                                                                                                              //
                                                                                                                       // 77
        usuario.profile.nombreCompleto = usuario.profile.nombres + " " + usuario.profile.apellidoPaterno + " " + usuario.profile.apellidoMaterno;
        usuario.profile.estatus = true;                                                                                //
                                                                                                                       // 80
        if (usuario.password === usuario.repetirContra) {                                                              // 81
            Meteor.call('createUsuario', usuario, 'Administrador', function (error, result) {                          // 82
                if (error) {                                                                                           // 83
                    toastr.error("ERROR");                                                                             //
                } else {                                                                                               // 85
                    toastr.success("Se guardo corretamente el usuario");                                               //
                }                                                                                                      //
            });                                                                                                        // 88
            $state.go("root.listaAdministradores");                                                                    //
        } else {                                                                                                       // 91
            toastr.error("Las contraseñas no coinciden");                                                              //
        }                                                                                                              //
    };                                                                                                                 //
                                                                                                                       // 96
    this.actualizar = function (usuario, form) {                                                                       // 97
        if (form.$invalid) {                                                                                           // 98
            toastr.error("Error, verificar los datos");                                                                // 99
            return;                                                                                                    //
        }                                                                                                              //
                                                                                                                       // 102
        if (usuario.password != undefined) {                                                                           // 103
            if (usuario.password != usuario.repetirContra) {                                                           // 104
                toastr.error("Las contraseñas no coinciden");                                                          // 105
                return;                                                                                                //
            }                                                                                                          //
        }                                                                                                              //
                                                                                                                       // 109
        usuario.usuarioActualizo = Meteor.userId();                                                                    // 110
        usuario.profile.nombreCompleto = usuario.profile.nombres + " " + usuario.profile.apellidoPaterno + " " + usuario.profile.apellidoMaterno;
        Meteor.call('updateUsuario', usuario, "Administrador", function (error, result) {                              // 112
            if (error) {                                                                                               // 113
                toastr.error("Error");                                                                                 //
            } else {                                                                                                   // 115
                toastr.success("Se Actualizo correctamente el usuario");                                               //
            }                                                                                                          //
                                                                                                                       // 118
            if ($stateParams.pantallaAnterior != "Perfil") $state.go("root.listaAdministradores");else {               // 121
                $state.go("root.home");                                                                                //
            }                                                                                                          //
        });                                                                                                            //
    };                                                                                                                 //
                                                                                                                       // 128
    this.VerSiEsPerfil = function () {                                                                                 // 129
        if ($stateParams.pantallaAnterior != "Perfil") return "Registrar Administrador";else {                         // 132
            return "Actualizar Perfil";                                                                                //
        }                                                                                                              //
    };                                                                                                                 //
    //#endregion                                                                                                       //
}                                                                                                                      //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"listaAdministradores.html":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/administradores/listaAdministradores.html                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
      if (Meteor.isServer) return;                                                                                     // 2
                                                                                                                       // 3
      var templateUrl = "/client/administradores/listaAdministradores.html";                                           // 4
      var template = "<title>Administradores - pudoP</title> <h2>Administradores</h2> <div class=\"row\"> <div class=\"col-sm-1\"> <a href=\"./admins\" class=\"btn btn-default btn-success\">Nuevo</a> </div> </div> <br>  <br> <div class=\"row\"> <div class=\"col-sm-12\"> <table class=\"table table-bordered\"> <thead> <tr> <th width=\"37%\">Nombre</th> <th width=\"26%\"> Usuario </th> <th width=\"7%\"> Estatus </th> <th width=\"12%\">Acción</th> </tr> </thead> <tbody> <tr ng-repeat=\"administrador in lam.administradores\"> <td>{{administrador.profile.nombreCompleto}}</td> <td>{{administrador.username}}</td> <td> <div class=\"text-center\"> <span ng-if=\"administrador.profile.estatus\" class=\"label label-success\"> Activo </span> <span ng-if=\"!administrador.profile.estatus\" class=\"label label-danger\"> Inactivo </span> </div> </td> <td class=\"text-center\"> <button type=\"button\" class=\"btn btn-xs btn-info\" title=\"Editar\" ui-sref=\"root.editarAdministrador({id: administrador._id, pantallaAnterior: 'Registro'})\"><i class=\"fa fa-pencil\"></i></button> <button type=\"button\" class=\"btn btn-{{administrador.profile.estatus ? 'danger' : 'success' }}\" title=\"{{administrador.profile.estatus ? 'Desactivar' : 'Activar' }}\" ng-click=\"lam.cambiarEstatus(administrador._id)\"><i class=\"fa fa-{{administrador.profile.estatus ? 'times' : 'check' }}\"></i></button> </td> </tr> </tbody> </table> </div> </div> ";
                                                                                                                       // 6
      angular.module('angular-templates')                                                                              // 7
        .run(['$templateCache', function($templateCache) {                                                             // 8
          $templateCache.put(templateUrl, template);                                                                   // 9
        }]);                                                                                                           // 10
                                                                                                                       // 11
      module.exports = {};                                                                                             // 12
      module.exports.__esModule = true;                                                                                // 13
      module.exports.default = templateUrl;                                                                            // 14
                                                                                                                       // 15
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"listaAdministradores.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/administradores/listaAdministradores.js                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
ListaAdministradoresCtrl.$inject = ["$scope", "$meteor", "$reactive", "$state", "toastr"];angular.module("planeacion").controller("ListaAdministradoresCtrl", ListaAdministradoresCtrl);
function ListaAdministradoresCtrl($scope, $meteor, $reactive, $state, toastr) {                                        //
  var _this = this;                                                                                                    //
                                                                                                                       // 5
  var rc = $reactive(this).attach($scope);                                                                             //
                                                                                                                       // 7
  this.buscar = {};                                                                                                    // 8
  this.buscar.nombre = "";                                                                                             //
                                                                                                                       // 12
  this.subscribe('unidades', function () {                                                                             // 13
    return [{}];                                                                                                       //
  });                                                                                                                  // 17
  this.subscribe('listaAdministradoresPorUnidad', function () {                                                        // 18
    return [{ "roles": "Administrador", "profile.unidad": _this.getReactively("buscar.unidad"), "profile.estatus": _this.getReactively("buscar.estatus") }];
  });                                                                                                                  //
                                                                                                                       // 21
  this.helpers({                                                                                                       // 22
    administradores: function administradores() {                                                                      // 23
      return Meteor.users.find({ "roles": "Administrador" });                                                          //
    },                                                                                                                 // 25
    departamentos: function departamentos() {                                                                          // 26
      return Departamentos.find().fetch();                                                                             //
    },                                                                                                                 // 28
    unidades: function unidades() {                                                                                    // 29
      return Unidades.find().fetch();                                                                                  //
    }                                                                                                                  //
  });                                                                                                                  //
                                                                                                                       //
  //Se comenta debido a un funcionamiento EXTREMADAMENTE RARO                                                          //
  // this.subscribe('buscarUsuarios', () => {                                                                          //
  //   return [{                                                                                                       //
  //     options: { limit: 10 },                                                                                       //
  //     where: { username: this.getReactively("buscar.nombre") }                                                      //
  //   }]                                                                                                              //
  // });                                                                                                               //
                                                                                                                       //
  // this.helpers({                                                                                                    //
  //   maestros: () => {                                                                                               //
  //     return Meteor.users.find({                                                                                    //
  //       "username": { '$regex': '.' + this.getReactively("buscar.nombre") || '' + '.', '$options': 'i' }            //
  //     });                                                                                                           //
  //   }                                                                                                               //
  // });                                                                                                               //
                                                                                                                       // 52
  this.obtenerNombreUnidad = function (id) {                                                                           // 53
    nombreUnidades = Unidades.findOne({ _id: id });                                                                    // 54
    return nombreUnidades.nombreUnidad;                                                                                //
  };                                                                                                                   //
                                                                                                                       // 58
  this.cambiarEstatus = function (id) {                                                                                // 59
    var Usuario = Meteor.users.findOne(id);                                                                            // 60
    console.log(Usuario);                                                                                              // 61
    var existeUsuarioActivo = Meteor.users.find({                                                                      // 62
      "roles": "Administrador",                                                                                        // 63
      "profile.unidad": Usuario.profile.unidad,                                                                        // 64
      "profile.estatus": true }).count();                                                                              //
                                                                                                                       // 66
    if (existeUsuarioActivo > 0 && Usuario.profile.estatus === false) {                                                // 67
      toastr.info('Ya existe un usario activo para esa unidad', 'Informacion');                                        // 68
      return;                                                                                                          //
    }                                                                                                                  // 70
    if (Usuario.profile.estatus == true) Usuario.profile.estatus = false;else Usuario.profile.estatus = true;          // 74
    Meteor.call('updateUsuario', Usuario, "Administrador", function (error, result) {                                  // 75
      if (error) {                                                                                                     // 76
        toastr.error("Error");                                                                                         //
      } else {                                                                                                         // 79
        console.log('si se cambio esta cosa wey');                                                                     //
      }                                                                                                                //
    });                                                                                                                //
  };                                                                                                                   //
}                                                                                                                      //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"alumnos":{"alumnos.html":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/alumnos/alumnos.html                                                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
      if (Meteor.isServer) return;                                                                                     // 2
                                                                                                                       // 3
      var templateUrl = "/client/alumnos/alumnos.html";                                                                // 4
      var template = "<title>Alumnos</title> <h2>Alumnos</h2> <div class=\"row\"> <div class=\"col-sm-12\"> <button type=\"button\" href=\"#Agregar\" data-toggle=\"collapse\" aria-expanded=\"false\" aria-controls=\"collapseExample\" ng-click=\"alum.Nuevo()\" class=\"btn btn-{{alum.nuevo == true ? 'success' : 'danger'}}\">{{alum.nuevo == true ? 'Nuevo' : 'Cancelar'}}</button> <div class=\"collapse\" id=\"Agregar\"> <br> <form name=\"form\" class=\"form-horizontal\" role=\"form\"> <div class=\"well\"> <legend>Datos del Alumno</legend> <div class=\"row\"> <div class=\"col-sm-12\"> <div class=\"col-sm-3\" valida> <label>Matricula</label> <input name=\"matricula\" type=\"number\" class=\"form-control\" placeholder=\"Matricula\" ng-model=\"alum.alumno.matricula\" required capitalize> </div> <div class=\"col-sm-9\" valida> <label>Nombre del Alumno</label> <input name=\"nombreAlumno\" type=\"text\" class=\"form-control\" placeholder=\"Nombre\" ng-model=\"alum.alumno.nombreAlumno\" required capitalize> </div> </div> <h6>&nbsp;</h6> <div class=\"col-sm-12\"> <div class=\"col-sm-3\" valida> <label>Grupo</label> <input name=\"grupo\" type=\"text\" class=\"form-control\" placeholder=\"Grupo\" ng-model=\"alum.alumno.grupo\" required capitalize> </div> <div class=\"col-sm-3\" valida> <label>Teléfono</label> <input name=\"telefono\" type=\"number\" class=\"form-control\" placeholder=\"Teléfono\" ng-model=\"alumn.alumno.telefono\" required capitalize> </div> </div> </div> </div> <br> <div class=\"row\"> <div class=\"col-sm-12\"> <input type=\"submit\" ng-click=\"alum.guardar(alum.alumno,form)\" value=\"Guardar\" class=\"btn btn-xs btn-info\" ng-show=\"alum.action\" valida-form formulario=\"form\"> <input type=\"submit\" ng-click=\"alum.actualizar(alum.alumno,form)\" value=\"Actualizar\" class=\"btn btn-xs btn-info\" ng-show=\"!alum.action\" valida-form formulario=\"form\"> </div> </div> </form></div>  </div> </div>  <br> <!-- List --> <div class=\"well\"> <!-- <div class=\"row\">\r\n\t\t\t\t<div class=\"col-sm-12\">\t\r\n\t\t\t\t\t<div class=\"col-sm-3\">\r\n\t\t\t\t\t\t<label>Filtrar por...</label>\r\n\t\t\t\t\t\t<select name=\"OBJETO\" class=\"form-control\"  disabled>\r\n\t\t\t\t\t\t\t<option value abled selected>Seleccionar</option>\r\n\t\t\t\t\t\t</select>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class=\"col-sm-9\">\r\n\t\t\t\t\t\t\t<label>&nbsp;</label>\r\n\t\t\t\t\t\t\t<div class=\"input-group\">\r\n\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" placeholder=\"Buscar...\"  disabled>\r\n\t\t\t\t\t\t\t\t<span class=\"input-group-btn\">\r\n\t\t\t\t\t\t\t\t\t<button class=\"btn btn-xs btn-info\"\"  type=\"button\" disabled>Buscar</button>\r\n\t\t\t\t\t\t\t\t</span>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\t\t\t\r\n\t\t\t\t</div>\r\n\t\t\t</div> --> <br> <div class=\"row\"> <div class=\"col-sm-12\"> <table class=\"table table-bordered\"> <thead> <tr> <th width=\"5%\"> <div class=\"text-center\">Matricula</div> </th> <th width=\"25%\"> <div class=\"text-center\">Nombre</div> </th> <th width=\"8%\"> <div class=\"text-center\">Grupo</div> </th> <th width=\"5%\"> <div class=\"text-center\">Teléfono</div> </th> <th width=\"10%\"> <div class=\"text-center\"> Acciones </div> </th> </tr> </thead> <tbody> <tr ng-repeat=\"alumno in alum.alumnos\"> <td>{{alumno.matricula}}</td> <td>{{alumno.nombre}}</td> <td>{{alumno.grupo}}</td> <td>{{alumno.telefono}}</td> <td class=\"text-center\"> <button type=\"button\" class=\"btn btn-xs btn-info\" title=\"Editar\" ng-click=\"alum.editar(alumno._id)\"><i class=\"fa fa-pencil\"></i></button> <!-- <button type=\"button\" class=\"btn btn-{{alum.estatus ? 'danger' : 'success' }}\" title=\"{{alum.estatus ? 'Desactivar' : 'Activar' }}\" ng-click=\"alum.cambiarEstatus(alumno._id)\"><i class=\"fa fa-{{alumno.estatus ? 'times' : 'check' }}\"></i></a></button>\t     --> </td> </tr> </tbody> </table> </div> </div></div>";
                                                                                                                       // 6
      angular.module('angular-templates')                                                                              // 7
        .run(['$templateCache', function($templateCache) {                                                             // 8
          $templateCache.put(templateUrl, template);                                                                   // 9
        }]);                                                                                                           // 10
                                                                                                                       // 11
      module.exports = {};                                                                                             // 12
      module.exports.__esModule = true;                                                                                // 13
      module.exports.default = templateUrl;                                                                            // 14
                                                                                                                       // 15
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"alumnos.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/alumnos/alumnos.js                                                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
AlumnosCtrl.$inject = ["$scope", "$meteor", "$reactive", "$state", "toastr"];angular.module("planeacion").controller("AlumnosCtrl", AlumnosCtrl);
function AlumnosCtrl($scope, $meteor, $reactive, $state, toastr) {                                                     //
                                                                                                                       // 6
	$reactive(this).attach($scope);                                                                                       // 7
	this.action = true;                                                                                                   // 8
	this.nuevo = true;                                                                                                    // 9
	this.alumno = {};                                                                                                     //
                                                                                                                       // 11
	this.subscribe('alumnos', function () {                                                                               // 12
		return [{}];                                                                                                         //
	});                                                                                                                   //
                                                                                                                       // 17
	this.helpers({                                                                                                        // 18
		alumnos: function alumnos() {                                                                                        // 19
			return Alumnos.find();                                                                                              //
		}                                                                                                                    //
	});                                                                                                                   //
                                                                                                                       // 23
	this.Nuevo = function () {                                                                                            // 25
		this.action = true;                                                                                                  // 26
		this.nuevo = !this.nuevo;                                                                                            // 27
		this.alumno = {};                                                                                                    //
	};                                                                                                                    //
                                                                                                                       // 30
	this.guardar = function (alumno, form) {                                                                              // 32
		if (form.$invalid) {                                                                                                 // 33
			toastr.error('Error al guardar los datos.');                                                                        // 34
			return;                                                                                                             //
		}                                                                                                                    // 36
		console.log(alumno);                                                                                                 // 37
		alumno.estatus = true;                                                                                               // 38
		alumno.usuarioInserto = Meteor.userId();                                                                             // 39
		Alumnos.insert(alumno);                                                                                              // 40
		toastr.success('Guardado correctamente.');                                                                           // 41
		this.alumno = {};                                                                                                    // 42
		$('.collapse').collapse('hide');                                                                                     // 43
		this.nuevo = true;                                                                                                   // 44
		form.$setPristine();                                                                                                 // 45
		form.$setUntouched();                                                                                                //
	};                                                                                                                    //
                                                                                                                       // 49
	this.editar = function (id) {                                                                                         // 51
		this.alumno = Alumnos.findOne({ _id: id });                                                                          // 52
		this.action = false;                                                                                                 // 53
		$('.collapse').collapse('show');                                                                                     // 54
		this.nuevo = false;                                                                                                  //
	};                                                                                                                    //
                                                                                                                       // 57
	this.actualizar = function (alumno, form) {                                                                           // 59
		if (form.$invalid) {                                                                                                 // 60
			toastr.error('Error al actualizar los datos.');                                                                     // 61
			return;                                                                                                             //
		}                                                                                                                    // 63
		var idTemp = alumno._id;                                                                                             // 64
		delete alumno._id;                                                                                                   // 65
		alumno.usuarioActualizo = Meteor.userId();                                                                           // 66
		Alumno.update({ _id: idTemp }, { $set: alumnos });                                                                   // 67
		toastr.success('Actualizado correctamente.');                                                                        // 68
		$('.collapse').collapse('hide');                                                                                     // 69
		this.nuevo = true;                                                                                                   // 70
		form.$setPristine();                                                                                                 // 71
		form.$setUntouched();                                                                                                //
	};                                                                                                                    //
                                                                                                                       // 74
	this.cambiarEstatus = function (id) {                                                                                 // 76
		var libro = Libros.findOne({ _id: id });                                                                             // 77
		if (libro.estatus == true) libro.estatus = false;else libro.estatus = true;                                          //
                                                                                                                       // 82
		Libros.update({ _id: id }, { $set: { libro: libro.estatus } });                                                      //
	};                                                                                                                    //
};                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"categorias":{"categorias.html":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/categorias/categorias.html                                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
      if (Meteor.isServer) return;                                                                                     // 2
                                                                                                                       // 3
      var templateUrl = "/client/categorias/categorias.html";                                                          // 4
      var template = "<title>Categorías</title> <h2>Categorías</h2> <div class=\"row\"> <div class=\"col-sm-12\"> <button type=\"button\" href=\"#Agregar\" data-toggle=\"collapse\" aria-expanded=\"false\" aria-controls=\"collapseExample\" ng-click=\"cat.Nuevo()\" class=\"btn btn-{{cat.nuevo == true ? 'success' : 'danger'}}\">{{cat.nuevo == true ? 'Nuevo' : 'Cancelar'}}</button> <div class=\"collapse\" id=\"Agregar\"> <br> <form name=\"form\" class=\"form-horizontal\" role=\"form\"> <div class=\"well\"> <div class=\"row\"> <div class=\"col-sm-12\"> <div class=\"col-sm-9\" valida> <label>Categoría</label> <input name=\"nombreCategoria\" type=\"text\" class=\"form-control\" placeholder=\"Categoria\" ng-model=\"cat.categoria.nombreCategoria\" required> </div> <h6>&nbsp;</h6> </div> </div> <br> <div class=\"row\"> <div class=\"col-sm-12\"> <input type=\"submit\" ng-click=\"cat.guardar(cat.categoria,form)\" value=\"Guardar\" class=\"btn btn-xs btn-info\" ng-show=\"cat.action\" valida-form formulario=\"form\"> <input type=\"submit\" ng-click=\"cat.actualizar(cat.categoria,form)\" value=\"Actualizar\" class=\"btn btn-xs btn-info\" ng-show=\"!cat.action\" valida-form formulario=\"form\"> </div> </div> </div> </form> </div> </div> </div> <br> <!-- List --> <div class=\"well\"> <br> <div class=\"row\"> <div class=\"col-sm-12\"> <table class=\"table table-bordered\"> <thead> <tr> <th width=\"37%\"><div class=\"text-center\">Nombre</div></th> <th width=\"12%\"><div class=\"text-center\">Acciones</div></th> </tr> </thead> <tbody> <tr ng-repeat=\"categoria in cat.categorias\"> <td>{{categoria.nombreCategoria}}</td> <td class=\"text-center\"> <button type=\"button\" class=\"btn btn-xs btn-info\" title=\"Editar\" ng-click=\"cat.editar(cat._id)\"><i class=\"fa fa-pencil\"></i></button> </td> </tr> </tbody> </table> </div> </div> </div>";
                                                                                                                       // 6
      angular.module('angular-templates')                                                                              // 7
        .run(['$templateCache', function($templateCache) {                                                             // 8
          $templateCache.put(templateUrl, template);                                                                   // 9
        }]);                                                                                                           // 10
                                                                                                                       // 11
      module.exports = {};                                                                                             // 12
      module.exports.__esModule = true;                                                                                // 13
      module.exports.default = templateUrl;                                                                            // 14
                                                                                                                       // 15
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"categorias.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/categorias/categorias.js                                                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
CategoriasCtrl.$inject = ["$scope", "$meteor", "$reactive", "$state", "toastr"];angular.module("planeacion").controller("CategoriasCtrl", CategoriasCtrl);
function CategoriasCtrl($scope, $meteor, $reactive, $state, toastr) {                                                  //
                                                                                                                       // 6
	$reactive(this).attach($scope);                                                                                       // 7
	this.action = true;                                                                                                   // 8
	this.nuevo = true;                                                                                                    // 9
	this.categoria = {};                                                                                                  //
                                                                                                                       // 11
	this.subscribe('categorias', function () {                                                                            // 12
		return [{}];                                                                                                         //
	});                                                                                                                   //
                                                                                                                       // 17
	this.helpers({                                                                                                        // 18
		categorias: function categorias() {                                                                                  // 19
			return Categorias.find();                                                                                           //
		}                                                                                                                    //
	});                                                                                                                   //
                                                                                                                       // 23
	this.Nuevo = function () {                                                                                            // 25
		this.action = true;                                                                                                  // 26
		this.nuevo = !this.nuevo;                                                                                            // 27
		this.categoria = {};                                                                                                 //
	};                                                                                                                    //
                                                                                                                       // 30
	this.guardar = function (categoria, form) {                                                                           // 32
		if (form.$invalid) {                                                                                                 // 33
			toastr.error('Error al guardar los datos.');                                                                        // 34
			return;                                                                                                             //
		}                                                                                                                    // 36
		console.log(categoria);                                                                                              // 37
		categoria.estatus = true;                                                                                            // 38
		categoria.usuarioInserto = Meteor.userId();                                                                          // 39
		Categorias.insert(categoria);                                                                                        // 40
		toastr.success('Guardado correctamente.');                                                                           // 41
		this.categoria = {};                                                                                                 // 42
		$('.collapse').collapse('hide');                                                                                     // 43
		this.nuevo = true;                                                                                                   // 44
		form.$setPristine();                                                                                                 // 45
		form.$setUntouched();                                                                                                //
	};                                                                                                                    //
                                                                                                                       // 49
	this.editar = function (id) {                                                                                         // 51
		this.categoria = Categorias.findOne({ _id: id });                                                                    // 52
		this.action = false;                                                                                                 // 53
		$('.collapse').collapse('show');                                                                                     // 54
		this.nuevo = false;                                                                                                  //
	};                                                                                                                    //
                                                                                                                       // 57
	this.actualizar = function (categoria, form) {                                                                        // 59
		if (form.$invalid) {                                                                                                 // 60
			toastr.error('Error al actualizar los datos.');                                                                     // 61
			return;                                                                                                             //
		}                                                                                                                    // 63
		var idTemp = categoria._id;                                                                                          // 64
		delete categoria._id;                                                                                                // 65
		categoria.usuarioActualizo = Meteor.userId();                                                                        // 66
		Categorias.update({ _id: idTemp }, { $set: categorias });                                                            // 67
		toastr.success('Actualizado correctamente.');                                                                        // 68
		$('.collapse').collapse('hide');                                                                                     // 69
		this.nuevo = true;                                                                                                   // 70
		form.$setPristine();                                                                                                 // 71
		form.$setUntouched();                                                                                                //
	};                                                                                                                    //
};                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"coordinadores":{"coordinadores.html":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/coordinadores/coordinadores.html                                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
      if (Meteor.isServer) return;                                                                                     // 2
                                                                                                                       // 3
      var templateUrl = "/client/coordinadores/coordinadores.html";                                                    // 4
      var template = "<title>Nuevo Coordinador - pudoP</title> <h2>{{cc.VerSiEsPerfil()}}</h2> <form name=\"form\" class=\"form-horizontal\" role=\"form\" novalidate> <div class=\"well\"> <fieldset> <legend>Datos de la cuenta</legend> <div class=\"row\"> <div class=\"col-sm-12\"> <div class=\"col-sm-4\" valida> <label>Usuario</label> <input ng-disabled=\"!cc.accion\" placeholder=\"Usuario\" name=\"usuario\" type=\"text\" class=\"form-control\" ng-model=\"cc.usuario.username\" required> </div> <div class=\"col-sm-4\" valida> <label>Contraseña</label> <input type=\"password\" name=\"contrasena\" placeholder=\"Contraseña\" type=\"text\" class=\"form-control\" ng-model=\"cc.usuario.password\" required> </div> <div class=\"col-sm-4\" valida> <label>Repetir Contraseña</label> <input type=\"password\" name=\"repetirContrasena\" placeholder=\"Repetir Contraseña\" type=\"text\" class=\"form-control\" ng-model=\"cc.usuario.repetirContra\" required> </div> </div> </div></fieldset> <br> <fieldset> <legend>Datos del usuario</legend> <div class=\"row\"> <div class=\"col-sm-12\"> <div class=\"col-sm-4\"> <label>Nombre (s)</label> <input type=\"text\" class=\"form-control\" placeholder=\"Nombre (s)\" ng-model=\"cc.usuario.profile.nombres\"> </div> <div class=\"col-sm-4\" valida> <label>Apellido Paterno:</label> <input name=\"apellidoPatern\" type=\"text\" placeholder=\"Apellido Paterno\" class=\"form-control\" ng-model=\"cc.usuario.profile.apellidoPaterno\" required> </div> <div class=\"col-sm-4\" valida> <label>Apellido Materno:</label> <input name=\"apellidoMaterno\" type=\"text\" placeholder=\"Apellido Materno\" class=\"form-control\" ng-model=\"cc.usuario.profile.apellidoMaterno\" required> </div> </div> <h6>&nbsp;</h6> <div class=\"col-sm-12\"> <div class=\"col-sm-4\"> <label>Departamento</label> <select name=\"departamento\" class=\"form-control\" ng-model=\"cc.usuario.profile.departamento\"> <option value disabled=\"disabled\" selected=\"selected\">Seleccionar Departamento...</option> <option ng-repeat=\"depa in cc.departamentos\" value=\"{{depa._id}}\">{{depa.nombreDepartamento}}</option> </select> </div> <div class=\"col-sm-4\" valida> <label>Sexo</label> <select name=\"sexo\" class=\"form-control\" ng-model=\"cc.usuario.profile.sexo\" required> <option value disabled=\"disabled\" selected=\"selected\">Seleccionar sexo...</option> <option value=\"Masculino\">Masculino</option> <option value=\"Femenino\">Femenino</option> </select> </div> </div> </div></fieldset> <br> <div class=\"row\"> <div class=\"col-sm-3\"> <input type=\"submit\" ng-click=\"cc.guardar(cc.usuario, form)\" class=\"btn btn-xs btn-info\" ng-if=\"cc.accion\" valida-form formulario=\"form\" value=\"Guardar\"> <input type=\"submit\" ng-click=\"cc.actualizar(cc.objeto, form)\" class=\"btn btn-xs btn-info\" valida-form formulario=\"form\" value=\"Actualizar\" ng-if=\"!cc.accion\"> <button type=\"button\" ui-sref=\"root.listacoordinadores\" class=\"btn btn-xs btn-danger\">Cancelar</button> </div> </div> </div> </form>";
                                                                                                                       // 6
      angular.module('angular-templates')                                                                              // 7
        .run(['$templateCache', function($templateCache) {                                                             // 8
          $templateCache.put(templateUrl, template);                                                                   // 9
        }]);                                                                                                           // 10
                                                                                                                       // 11
      module.exports = {};                                                                                             // 12
      module.exports.__esModule = true;                                                                                // 13
      module.exports.default = templateUrl;                                                                            // 14
                                                                                                                       // 15
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"coordinadores.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/coordinadores/coordinadores.js                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
CoordinadoresCtrl.$inject = ["$scope", "$meteor", "$reactive", "$state", "toastr", "$stateParams"];angular.module("planeacion").controller("CoordinadoresCtrl", CoordinadoresCtrl);
function CoordinadoresCtrl($scope, $meteor, $reactive, $state, toastr, $stateParams) {                                 //
    var _this = this;                                                                                                  //
                                                                                                                       // 5
    var rc = $reactive(this).attach($scope);                                                                           // 6
    var usuario = [];                                                                                                  // 7
    rc.accion = true;                                                                                                  // 8
    rc.buscar = {};                                                                                                    // 9
    rc.buscar.nombre = "";                                                                                             //
                                                                                                                       // 12
    this.subscribe('buscarUsuarios', function () {                                                                     // 13
        return [{                                                                                                      // 14
            options: { limit: 10 },                                                                                    // 15
            where: { profile: { nombreCompleto: _this.getReactively("buscar.nombre") } }                               //
        }];                                                                                                            //
    });                                                                                                                //
                                                                                                                       // 20
    this.subscribe('listaCoordinadores', function () {                                                                 // 21
        return [];                                                                                                     //
    });                                                                                                                //
                                                                                                                       // 24
    this.subscribe('unidades', function () {                                                                           // 25
        return [{}];                                                                                                   //
    });                                                                                                                //
                                                                                                                       // 31
    this.subscribe('departamentos', function () {                                                                      // 32
        return [{}];                                                                                                   //
    });                                                                                                                //
                                                                                                                       // 37
    if ($stateParams.id != undefined) {                                                                                // 38
        this.subscribe('usuarios', function () {                                                                       // 39
            return [{ _id: $stateParams.id }];                                                                         //
        });                                                                                                            // 41
        rc.accion = false;                                                                                             //
    }                                                                                                                  //
                                                                                                                       // 45
    this.helpers({                                                                                                     // 46
        usuario: function usuario() {                                                                                  // 47
            rc.objeto = Meteor.users.findOne($stateParams.id);                                                         // 48
            if (rc.objeto != undefined) return rc.objeto;                                                              //
        },                                                                                                             // 51
        coordinadores: function coordinadores() {                                                                      // 52
            return Meteor.users.find({ "roles": "Coordinador" });                                                      //
        },                                                                                                             // 54
        departamentos: function departamentos() {                                                                      // 55
            return Departamentos.find().fetch();                                                                       //
        },                                                                                                             // 57
        unidades: function unidades() {                                                                                // 58
            return Unidades.find().fetch();                                                                            //
        }                                                                                                              //
    });                                                                                                                //
                                                                                                                       // 63
    this.guardar = function (usuario, form) {                                                                          // 64
        var existeUsarioEnUnidad = Meteor.users.find({                                                                 // 65
            "profile.unidad": usuario.profile.unidad,                                                                  // 66
            "profile.estatus": true,                                                                                   // 67
            "profile.departamento": usuario.profile.departamento }).count();                                           //
                                                                                                                       // 70
        if (existeUsarioEnUnidad > 0) {                                                                                // 71
            toastr.info("Ya existe un coordinador asignado a esa unidad y ese departamento");                          // 72
            return;                                                                                                    //
        }                                                                                                              // 74
        if (form.$invalid) {                                                                                           // 75
            toastr.error("ERROR");                                                                                     // 76
            return;                                                                                                    //
        }                                                                                                              //
                                                                                                                       // 79
        usuario.profile.nombreCompleto = usuario.profile.nombres + " " + usuario.profile.apellidoPaterno + " " + usuario.profile.apellidoMaterno;
        usuario.profile.estatus = true;                                                                                // 81
        usuario.profile.unidad = Meteor.user().profile.unidad;                                                         //
                                                                                                                       // 83
        if (usuario.password === usuario.repetirContra) {                                                              // 84
            Meteor.call('createUsuario', usuario, 'Coordinador', function (error, result) {                            // 85
                if (error) {                                                                                           // 86
                    toastr.error("ERROR");                                                                             //
                } else {                                                                                               // 88
                    toastr.success("Se guardo corretamente el usuario");                                               //
                }                                                                                                      //
            });                                                                                                        // 91
            $state.go("root.listacoordinadores");                                                                      //
        } else {                                                                                                       // 94
            toastr.error("Las contraseñas no coinciden");                                                              //
        }                                                                                                              //
    };                                                                                                                 //
                                                                                                                       // 100
    this.actualizar = function (usuario, form) {                                                                       // 101
        if (form.$invalid) {                                                                                           // 102
            toastr.error("Error, verificar los datos");                                                                // 103
            return;                                                                                                    //
        }                                                                                                              //
                                                                                                                       // 107
        if (usuario.password != undefined) {                                                                           // 108
            if (usuario.password != usuario.repetirContra) {                                                           // 109
                toastr.error("Las contraseñas no coinciden");                                                          // 110
                return;                                                                                                //
            }                                                                                                          //
        }                                                                                                              //
                                                                                                                       // 114
        usuario.usuarioActualizo = Meteor.userId();                                                                    // 115
        usuario.profile.nombreCompleto = usuario.profile.nombres + " " + usuario.profile.apellidoPaterno + " " + usuario.profile.apellidoMaterno;
        Meteor.call('updateUsuario', usuario, "Coordinador", function (error, result) {                                // 117
            if (error) {                                                                                               // 118
                toastr.error("Error");                                                                                 //
            } else {                                                                                                   // 120
                toastr.success("Se Actualizo correctamente el usuario");                                               //
            }                                                                                                          // 122
            if ($stateParams.pantallaAnterior != "Perfil") $state.go("root.listacoordinadores");else {                 // 125
                $state.go("root.home");                                                                                //
            }                                                                                                          //
        });                                                                                                            //
    };                                                                                                                 //
                                                                                                                       // 134
    this.VerSiEsPerfil = function () {                                                                                 // 135
        if ($stateParams.pantallaAnterior != "Perfil") return "Registrar Administrador";else {                         // 138
            return "Actualizar Perfil";                                                                                //
        }                                                                                                              //
    };                                                                                                                 //
}                                                                                                                      //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"listacoordinadores.html":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/coordinadores/listacoordinadores.html                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
      if (Meteor.isServer) return;                                                                                     // 2
                                                                                                                       // 3
      var templateUrl = "/client/coordinadores/listacoordinadores.html";                                               // 4
      var template = "<title>Coordinadores - pudoP</title> <h2>Coordinadores</h2> <div class=\"row\"> <div class=\"col-sm-1\"> <a href=\"./coordinadores\" class=\"btn btn-default btn-success\">Nuevo</a> </div> </div> <br> <div class=\"well\"> <div class=\"row\"> <div class=\"col-sm-12\"> <div class=\"col-sm-3\"> <label>Filtrar por Unidad</label> <select name=\"unidad\" ng-model=\"lam.buscar.unidad\" class=\"form-control\"> <option value disabled=\"disabled\" selected=\"selected\">Unidad</option> <option ng-repeat=\"unidades in lcc.unidades\" value=\"{{unidades._id}}\">{{unidades.nombreUnidad}}</option> </select> </div> <div class=\"col-sm-9\"> <label>&nbsp;</label> <div class=\"input-group\"> <input type=\"text\" class=\"form-control\" placeholder=\"Buscar...\" ng-model=\"lcc.buscar.nombre\"> <span class=\"input-group-btn\"> <button class=\"btn btn-xs btn-info\" type=\"button\">Buscar</button> </span> </div> </div> </div> </div> <br> <div class=\"row\"> <div class=\"col-sm-12\"> <table class=\"table table-bordered\"> <thead> <tr> <th width=\"37%\">Nombre</th> <th width=\"22%\">Departamento</th> <th width=\"22%\">Usuario</th> <th width=\"7%\">Estatus</th> <th width=\"12%\">Acción</th> </tr> </thead> <tbody> <tr ng-repeat=\"coordinador in lcc.coordinadores\"> <td>{{coordinador.profile.nombreCompleto}}</td> <td>{{lcc.obtenerNombreDepartamento(coordinador.profile.departamento)}}</td> <td>{{coordinador.username}}</td> <td> <div class=\"text-center\"> <span ng-if=\"coordinador.profile.estatus\" class=\"label label-success\"> Activo </span> <span ng-if=\"!coordinador.profile.estatus\" class=\"label label-danger\"> Inactivo </span> </div> </td> <td class=\"text-center\"> <button type=\"button\" class=\"btn btn-xs btn-info\" title=\"Editar\" ui-sref=\"root.editarCoordinador({id: coordinador._id, pantallaAnterior: 'Registro' })\"><i class=\"fa fa-pencil\"></i></button> <button type=\"button\" class=\"btn btn-xs btn-danger\" title=\"Desactivar\" disabled=\"disabled\"><i class=\"fa fa-times\"></i></button> </td> </tr> </tbody> </table> </div> </div> </div>";
                                                                                                                       // 6
      angular.module('angular-templates')                                                                              // 7
        .run(['$templateCache', function($templateCache) {                                                             // 8
          $templateCache.put(templateUrl, template);                                                                   // 9
        }]);                                                                                                           // 10
                                                                                                                       // 11
      module.exports = {};                                                                                             // 12
      module.exports.__esModule = true;                                                                                // 13
      module.exports.default = templateUrl;                                                                            // 14
                                                                                                                       // 15
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"listacoordinadores.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/coordinadores/listacoordinadores.js                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
ListaCoordinadoresCtrl.$inject = ["$scope", "$meteor", "$reactive", "$state", "toastr"];angular.module("planeacion").controller("ListaCoordinadoresCtrl", ListaCoordinadoresCtrl);
function ListaCoordinadoresCtrl($scope, $meteor, $reactive, $state, toastr) {                                          //
                                                                                                                       // 5
  var rc = $reactive(this).attach($scope);                                                                             //
                                                                                                                       // 7
  this.buscar = {};                                                                                                    // 8
  this.buscar.nombre = "";                                                                                             //
                                                                                                                       // 12
  this.subscribe('departamentos', function () {                                                                        // 13
    return [{}];                                                                                                       //
  });                                                                                                                  //
                                                                                                                       // 18
  this.subscribe('unidades', function () {                                                                             // 19
    return [{}];                                                                                                       //
  });                                                                                                                  // 23
  this.subscribe('listaCoordinadoresPorUnidad', function () {                                                          // 24
    return [{ "roles": "Coordinador", "profile.unidad": Meteor.user().profile.unidad }];                               //
  });                                                                                                                  //
                                                                                                                       // 27
  this.helpers({                                                                                                       // 28
    coordinadores: function coordinadores() {                                                                          // 29
      return Meteor.users.find({ "roles": "Coordinador" });                                                            //
    },                                                                                                                 // 31
    departamentos: function departamentos() {                                                                          // 32
      return Departamentos.find().fetch();                                                                             //
    },                                                                                                                 // 34
    unidades: function unidades() {                                                                                    // 35
      return Unidades.find().fetch();                                                                                  //
    }                                                                                                                  //
  });                                                                                                                  //
                                                                                                                       //
  //Se comenta debido a un funcionamiento EXTREMADAMENTE RARO                                                          //
  /*                                                                                                                   //
   this.subscribe('buscarUsuarios', () => {                                                                            //
     return [{                                                                                                         //
       options: { limit: 10 },                                                                                         //
       where: { username: this.getReactively("buscar.nombre") }                                                        //
     }]                                                                                                                //
   });                                                                                                                 //
                                                                                                                       //
                                                                                                                       //
   this.helpers({                                                                                                      //
     maestros: () => {                                                                                                 //
       return Meteor.users.find({                                                                                      //
         "username": { '$regex': '.' + this.getReactively("buscar.nombre") || '' + '.', '$options': 'i' }              //
       });                                                                                                             //
     }                                                                                                                 //
   });                                                                                                                 //
  */                                                                                                                   //
                                                                                                                       // 60
  this.obtenerNombreDepartamento = function (id) {                                                                     // 61
    nombreDepa = Departamentos.findOne({ _id: id });                                                                   // 62
    return nombreDepa.nombreDepartamento;                                                                              //
  };                                                                                                                   //
}                                                                                                                      //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"departamentos":{"departamentos.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/departamentos/departamentos.js                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
DepartamentosCtrl.$inject = ["$scope", "$meteor", "$reactive", "$state", "toastr"];angular.module("planeacion").controller("DepartamentosCtrl", DepartamentosCtrl);
function DepartamentosCtrl($scope, $meteor, $reactive, $state, toastr) {                                               //
                                                                                                                       // 6
	$reactive(this).attach($scope);                                                                                       // 7
	this.action = true;                                                                                                   // 8
	this.nuevo = true;                                                                                                    // 9
	this.departamento = {};                                                                                               //
                                                                                                                       // 11
	this.subscribe('departamentos', function () {                                                                         // 12
		return [{}];                                                                                                         //
	});                                                                                                                   //
                                                                                                                       // 15
	this.subscribe('unidades', function () {                                                                              // 16
		return [{ estatus: true }];                                                                                          //
	});                                                                                                                   //
                                                                                                                       // 19
	this.helpers({                                                                                                        // 20
		unidades: function unidades() {                                                                                      // 21
			return Unidades.find().fetch();                                                                                     //
		},                                                                                                                   // 23
		departamentos: function departamentos() {                                                                            // 24
			var deptos = Departamentos.find().fetch();                                                                          //
                                                                                                                       // 26
			_.each(deptos, function (departamento) {                                                                            // 27
				Meteor.call('getUnidad', departamento.unidad_id, function (error, result) {                                        // 28
					if (result) {                                                                                                     // 30
						departamento.unidad = result.nombreUnidad;                                                                       // 31
						$scope.$apply();                                                                                                 //
					}                                                                                                                 //
				});                                                                                                                //
			});                                                                                                                 //
			//console.log(deptos);                                                                                              //
                                                                                                                       // 37
			return deptos;                                                                                                      //
		}                                                                                                                    //
                                                                                                                       //
	});                                                                                                                   //
                                                                                                                       // 42
	this.Nuevo = function () {                                                                                            // 44
		this.action = true;                                                                                                  // 45
		this.nuevo = !this.nuevo;                                                                                            // 46
		this.departamento = {};                                                                                              //
	};                                                                                                                    //
                                                                                                                       // 49
	this.guardar = function (departamento, form) {                                                                        // 51
		if (form.$invalid) {                                                                                                 // 52
			toastr.error('Error al guardar los datos.');                                                                        // 53
			return;                                                                                                             //
		}                                                                                                                    // 55
		console.log(departamento);                                                                                           // 56
		departamento.estatus = true;                                                                                         // 57
		departamento.usuarioInserto = Meteor.userId();                                                                       // 58
		Departamentos.insert(departamento);                                                                                  // 59
		toastr.success('Guardado correctamente.');                                                                           // 60
		this.departamento = {};                                                                                              // 61
		$('.collapse').collapse('hide');                                                                                     // 62
		this.nuevo = true;                                                                                                   // 63
		form.$setPristine();                                                                                                 // 64
		form.$setUntouched();                                                                                                //
	};                                                                                                                    //
                                                                                                                       // 68
	this.editar = function (id) {                                                                                         // 70
		this.departamento = Departamentos.findOne({ _id: id });                                                              // 71
		this.action = false;                                                                                                 // 72
		$('.collapse').collapse('show');                                                                                     // 73
		this.nuevo = false;                                                                                                  //
	};                                                                                                                    //
                                                                                                                       // 76
	this.actualizar = function (departamento, form) {                                                                     // 78
		if (form.$invalid) {                                                                                                 // 79
			toastr.error('Error al actualizar los datos.');                                                                     // 80
			return;                                                                                                             //
		}                                                                                                                    // 82
		var idTemp = departamento._id;                                                                                       // 83
		delete departamento._id;                                                                                             // 84
		departamento.usuarioActualizo = Meteor.userId();                                                                     // 85
		Departamentos.update({ _id: idTemp }, { $set: departamento });                                                       // 86
		toastr.success('Actualizado correctamente.');                                                                        // 87
		$('.collapse').collapse('hide');                                                                                     // 88
		this.nuevo = true;                                                                                                   // 89
		form.$setPristine();                                                                                                 // 90
		form.$setUntouched();                                                                                                //
	};                                                                                                                    //
                                                                                                                       // 93
	this.cambiarEstatus = function (id) {                                                                                 // 95
		var departamento = Departamentos.findOne({ _id: id });                                                               // 96
		if (departamento.estatus == true) departamento.estatus = false;else departamento.estatus = true;                     //
                                                                                                                       // 101
		Departamentos.update({ _id: id }, { $set: { estatus: departamento.estatus } });                                      //
	};                                                                                                                    //
};                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"departamentos.ng.html":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/departamentos/departamentos.ng.html                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
      if (Meteor.isServer) return;                                                                                     // 2
                                                                                                                       // 3
      var templateUrl = "/client/departamentos/departamentos.ng.html";                                                 // 4
      var template = "<title>Departamentos - pudoP</title> <h2>Departamentos</h2> <div class=\"row\"> <div class=\"col-sm-12\"> <button type=\"button\" href=\"#Agregar\" data-toggle=\"collapse\" aria-expanded=\"false\" aria-controls=\"collapseExample\" ng-click=\"depa.Nuevo()\" class=\"btn btn-{{depa.nuevo == true ? 'success' : 'danger'}}\">{{depa.nuevo == true ? 'Nuevo' : 'Cancelar'}}</button> <button type=\"button\" ui-sref=\"root.unidades\" class=\"btn btn-primary\">Unidades</button> <div class=\"collapse\" id=\"Agregar\"> <br> <form name=\"form\" class=\"form-horizontal\" role=\"form\"> <div class=\"well\"> <legend>Datos del departamento</legend> <div class=\"row\"> <div class=\"col-sm-12\"> <div class=\"col-sm-3\" valida> <label>Clave del Departamentos</label> <input name=\"clvDepartamento\" type=\"text\" class=\"form-control\" placeholder=\"Clave del Departamento\" ng-model=\"depa.departamento.clvDepartamento\" required> </div> <div class=\"col-sm-5\" valida> <label>Nombre del Departamento</label> <input name=\"nombreDepartamento\" type=\"text\" class=\"form-control\" placeholder=\"Nombre del Departamento\" ng-model=\"depa.departamento.nombreDepartamento\" required> </div> <div class=\"col-sm-4\" valida> <label>Unidad</label> <select name=\"unidad\" class=\"form-control select2\" ng-model=\"depa.departamento.unidad_id\" required> <option value disabled=\"disabled\" selected=\"selected\">Seleccionar Unidad...</option> <option ng-repeat=\"unidad in depa.unidades\" value=\"{{unidad._id}}\"> {{unidad.nombreUnidad}}</option> </select> </div> </div> </div> <br> <div class=\"row\"> <div class=\"col-sm-12\"> <input type=\"submit\" ng-click=\"depa.guardar(depa.departamento,form)\" value=\"Guardar\" class=\"btn btn-xs btn-info\" ng-show=\"depa.action\" valida-form formulario=\"form\"> <input type=\"submit\" ng-click=\"depa.actualizar(depa.departamento,form)\" value=\"Actualizar\" class=\"btn btn-xs btn-info\" ng-show=\"!depa.action\" valida-form formulario=\"form\"> </div> </div> </div> </form> </div> </div> </div> <br> <!-- List --> <div class=\"well\"> <div class=\"row\"> <div class=\"col-sm-12\"> <div class=\"col-sm-3\"> <label>Filtrar por...</label> <select name=\"OBJETO\" class=\"form-control\" disabled=\"disabled\"> <option value disabled=\"disabled\" selected=\"selected\">Seleccionar</option> </select> </div> <div class=\"col-sm-9\"> <label>&nbsp;</label> <div class=\"input-group\"> <input type=\"text\" class=\"form-control\" placeholder=\"Buscar...\" disabled=\"disabled\"> <span class=\"input-group-btn\"> <button class=\"btn btn-xs btn-info\" type=\"button\" disabled=\"disabled\">Buscar</button> </span> </div> </div> </div> </div> <br> <div class=\"row\"> <div class=\"col-sm-12\"> <table class=\"table table-bordered\"> <thead> <tr> <th width=\"4%\"><div class=\"text-center\">Clave</div></th> <th width=\"37%\"><div class=\"text-center\">Nombre</div></th> <th width=\"37%\"><div class=\"text-center\">Unidad</div></th> <th width=\"7%\"><div class=\"text-center\">Estatus</div></th> <th width=\"12%\"><div class=\"text-center\">Acciones</div></th> </tr> </thead> <tbody> <tr ng-repeat=\"departamento in depa.departamentos\"> <td class=\"text-center\">{{departamento.clvDepartamento}}</td> <td>{{departamento.nombreDepartamento}}</td> <td>{{departamento.unidad}}</td> <td> <div class=\"text-center\"> <span ng-if=\"departamento.estatus\" class=\"label label-success\"> Activo </span> <span ng-if=\"!departamento.estatus\" class=\"label label-danger\"> Inactivo </span> </div> </td> <td class=\"text-center\"> <button type=\"button\" class=\"btn btn-xs btn-info\" title=\"Editar\" ng-click=\"depa.editar(departamento._id)\"><i class=\"fa fa-pencil\"></i></button> <button type=\"button\" class=\"btn btn-{{departamento.estatus ? 'danger' : 'success' }}\" title=\"{{departamento.estatus ? 'Desactivar' : 'Activar' }}\" ng-click=\"depa.cambiarEstatus(departamento._id)\"><i class=\"fa fa-{{departamento.estatus ? 'times' : 'check' }}\"></i></button> </td> </tr> </tbody> </table> </div> </div> </div>";
                                                                                                                       // 6
      angular.module('angular-templates')                                                                              // 7
        .run(['$templateCache', function($templateCache) {                                                             // 8
          $templateCache.put(templateUrl, template);                                                                   // 9
        }]);                                                                                                           // 10
                                                                                                                       // 11
      module.exports = {};                                                                                             // 12
      module.exports.__esModule = true;                                                                                // 13
      module.exports.default = templateUrl;                                                                            // 14
                                                                                                                       // 15
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"directives":{"validador.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/directives/validador.js                                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       //
angular.module('planeacion').directive('valida', validador);                                                           // 2
function validador() {                                                                                                 // 3
  return {                                                                                                             // 4
    restrict: 'A',                                                                                                     // 5
    link: function link(scope, element, attrs) {                                                                       // 6
      element.carga = false;                                                                                           // 7
      input = element.find('.form-control');                                                                           // 8
      var formName = element.parents('form').attr('name');                                                             // 9
      scope.$watch(formName + '.' + input[0].name + '.$invalid', function (val) {                                      // 10
        if (element.carga) {                                                                                           // 11
          if (val) element.addClass('has-error');else element.removeClass('has-error');                                // 12
        } else {                                                                                                       //
          element.carga = true;                                                                                        // 17
        }                                                                                                              //
      });                                                                                                              //
    }                                                                                                                  //
  };                                                                                                                   //
}                                                                                                                      //
                                                                                                                       //
angular.module('planeacion').directive('validaForm', validaForm);                                                      // 25
function validaForm() {                                                                                                // 26
  return {                                                                                                             // 27
    restrict: 'A',                                                                                                     // 28
    scope: {                                                                                                           // 29
      formulario: "="                                                                                                  // 30
    },                                                                                                                 //
    link: function link(scope, element, attrs) {                                                                       // 32
      element.on("click", function () {                                                                                // 33
        errorsType = scope.formulario.$error;                                                                          // 34
        if (errorsType != undefined) {                                                                                 // 35
          angular.forEach(errorsType, function (errors) {                                                              // 36
            errors.forEach(function (error) {                                                                          // 37
              if (error.$invalid == true) {                                                                            // 38
                var elem = document.getElementsByName(error.$name)[0].parentElement;                                   // 39
                elem.className += " has-error";                                                                        // 40
              }                                                                                                        //
            });                                                                                                        //
          });                                                                                                          //
        } else {                                                                                                       //
          setTimeout(function () {                                                                                     // 45
            $("div").removeClass("has-error");                                                                         // 45
          }, 10);                                                                                                      //
        }                                                                                                              //
      });                                                                                                              //
    }                                                                                                                  //
  };                                                                                                                   //
}                                                                                                                      //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"home":{"home.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/home/home.js                                                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
HomeCtrl.$inject = ["$scope", "$meteor", "$reactive", "$state", "toastr", "$stateParams"];angular.module('planeacion').controller('HomeCtrl', HomeCtrl);
                                                                                                                       // 5
function HomeCtrl($scope, $meteor, $reactive, $state, toastr, $stateParams) {                                          // 6
  var rc = $reactive(this).attach($scope);                                                                             //
                                                                                                                       // 8
  window = rc;                                                                                                         //
                                                                                                                       // 10
  this.subscribe('listaUsuarios', function () {                                                                        // 11
    return [];                                                                                                         //
  });                                                                                                                  //
                                                                                                                       // 14
  this.subscribe('unidades', function () {                                                                             // 15
    return [{}];                                                                                                       //
  });                                                                                                                  //
                                                                                                                       // 20
  this.helpers({                                                                                                       // 21
    usuario: function usuario() {                                                                                      // 22
      return Meteor.users.findOne(Meteor.user()._id);                                                                  //
    },                                                                                                                 // 24
    unidad: function unidad() {                                                                                        // 25
      return Unidades.findOne(Meteor.user().profile.unidad);                                                           //
    }                                                                                                                  //
                                                                                                                       //
  });                                                                                                                  //
                                                                                                                       // 30
  this.nigga = function () {                                                                                           // 31
    console.log("Niggas");                                                                                             //
  };                                                                                                                   //
}                                                                                                                      //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"home.ng.html":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/home/home.ng.html                                                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
      if (Meteor.isServer) return;                                                                                     // 2
                                                                                                                       // 3
      var templateUrl = "/client/home/home.ng.html";                                                                   // 4
      var template = "<title>Perfil</title> <div class=\"row\"> <h3>&nbsp;</h3> <div class=\"col-xs-12 col-sm-10\"> <div class=\"panel panel-default\"> <div class=\"panel-heading resume-heading\"> <div class=\"row\"> <div class=\"col-lg-12\"> <h1>Datos del Usuario, ¡BIENVENIDO!</h1> <div class=\"col-xs-12 col-sm-8\"> <ul class=\"list-group\"> <li class=\"list-group-item\"><i class=\"fa fa-user\"></i> {{ho.usuario.profile.nombreCompleto == undefined ? \"Super Administrador\" : ho.usuario.profile.nombreCompleto}}</li> </ul> </div> </div> </div> </div> </div> </div> </div> ";
                                                                                                                       // 6
      angular.module('angular-templates')                                                                              // 7
        .run(['$templateCache', function($templateCache) {                                                             // 8
          $templateCache.put(templateUrl, template);                                                                   // 9
        }]);                                                                                                           // 10
                                                                                                                       // 11
      module.exports = {};                                                                                             // 12
      module.exports.__esModule = true;                                                                                // 13
      module.exports.default = templateUrl;                                                                            // 14
                                                                                                                       // 15
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"layouts":{"left-nav.ng.html":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/layouts/left-nav.ng.html                                                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
      if (Meteor.isServer) return;                                                                                     // 2
                                                                                                                       // 3
      var templateUrl = "/client/layouts/left-nav.ng.html";                                                            // 4
      var template = "<nav> <ul data-smart-menu> <li data-ui-sref-active=\"active\"> <a ui-sref=\"root.home\" title=\"Perfil\"> <i class=\"fa fa-lg fa-fw fa-user\"></i> <span class=\"menu-item-parent\">Perfil</span> </a> </li> <!-- sADMIN\t--> <li data-ui-sref-active=\"active\"> <a ng-show=\"currentUser.roles[0] == 'sAdmin'\" ui-sref=\"root.libros\" title=\"Libros\"> <i class=\"fa fa-lg fa-fw fa-book\"></i> <span class=\"menu-item-child\">Libros</span> </a> </li> <li data-ui-sref-active=\"active\"> <a ng-show=\"currentUser.roles[0] == 'sAdmin'\" ui-sref=\"root.categorias\" title=\"Categorias\"> <i class=\"fa fa-lg fa-fw fa-book\"></i> <span class=\"menu-item-child\">Categorías</span> </a> </li> <li data-ui-sref-active=\"active\"> <a ng-show=\"currentUser.roles[0] == 'sAdmin'\" ui-sref=\"root.listaAdministradores\" title=\"Administradores\"> <i class=\"fa fa-lg fa-fw fa-building\"></i> <span class=\"menu-item-child\">Administradores</span> </a> </li> <li data-ui-sref-active=\"active\"> <a ng-show=\"currentUser.roles[0] == 'Administrador'\" ui-sref=\"\" title=\"Administradores\"> <i class=\"fa fa-lg fa-fw fa-book\"></i> <span class=\"menu-item-child\">Préstamos</span> </a> </li> <li data-ui-sref-active=\"active\"> <a ng-show=\"currentUser.roles[0] == 'Administrador'\" ui-sref=\"\" title=\"Administradores\"> <i class=\"fa fa-lg fa-fw fa-book\"></i> <span class=\"menu-item-child\">Devoluciones</span> </a> </li> <li data-ui-sref-active=\"active\"> <a ng-show=\"currentUser.roles[0] == 'Administrador'\" ui-sref=\"\" title=\"Administradores\"> <i class=\"fa fa-lg fa-fw fa-list\"></i> <span class=\"menu-item-child\">Reportes</span> </a> </li> <li data-ui-sref-active=\"active\"> <a ui-sref=\"anon.logout\" title=\"Cerrar Sesión\"> <i class=\"fa fa-sign-{{ro.isLoggedIn() ? 'out' : 'in'}}\"></i> <span class=\"menu-item-child\">Cerrar Sesión</span> </a> </li> </ul> </nav>";
                                                                                                                       // 6
      angular.module('angular-templates')                                                                              // 7
        .run(['$templateCache', function($templateCache) {                                                             // 8
          $templateCache.put(templateUrl, template);                                                                   // 9
        }]);                                                                                                           // 10
                                                                                                                       // 11
      module.exports = {};                                                                                             // 12
      module.exports.__esModule = true;                                                                                // 13
      module.exports.default = templateUrl;                                                                            // 14
                                                                                                                       // 15
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"root.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/layouts/root.js                                                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
RootCtrl.$inject = ["$scope", "$meteor", "$reactive", "$state", "$stateParams", "toastr"];angular.module("planeacion").controller("RootCtrl", RootCtrl);
function RootCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr) {                                          // 4
	var rc = $reactive(this).attach($scope);                                                                              // 5
	this.usuarioActual = {};                                                                                              //
                                                                                                                       // 7
	if (Meteor.user() && Meteor.user().roles && Meteor.user().roles[0] != "admin") {                                      // 8
		this.autorun(function () {                                                                                           //
                                                                                                                       // 10
			if (Meteor.user() && Meteor.user()._id) {                                                                           // 11
				rc.usuarioActual = Meteor.user();                                                                                  //
			}                                                                                                                   //
		});                                                                                                                  //
	}                                                                                                                     //
                                                                                                                       //
	//Funcion Evalua la sessión del usuario                                                                               // 19
	this.autorun(function () {                                                                                            // 20
		if (!Meteor.user()) {                                                                                                // 21
			$state.go('anon.login');                                                                                            //
		}                                                                                                                    //
	});                                                                                                                   //
};                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"root.ng.html":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/layouts/root.ng.html                                                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
      if (Meteor.isServer) return;                                                                                     // 2
                                                                                                                       // 3
      var templateUrl = "/client/layouts/root.ng.html";                                                                // 4
      var template = "<aside id=\"left-panel\"> <img class=\"profile-img\" src=\"/img/escudoUAdeOblanco.png\" width=\"200px\" height=\"45px\" alt=\"BIBLIOTECA\"> <div ng-include=\" 'client/layouts/left-nav.ng.html' \"></div> </aside> <div id=\"main\" role=\"main\"> <div id=\"content\" ui-view></div> </div>";
                                                                                                                       // 6
      angular.module('angular-templates')                                                                              // 7
        .run(['$templateCache', function($templateCache) {                                                             // 8
          $templateCache.put(templateUrl, template);                                                                   // 9
        }]);                                                                                                           // 10
                                                                                                                       // 11
      module.exports = {};                                                                                             // 12
      module.exports.__esModule = true;                                                                                // 13
      module.exports.default = templateUrl;                                                                            // 14
                                                                                                                       // 15
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"libros":{"libros.html":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/libros/libros.html                                                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
      if (Meteor.isServer) return;                                                                                     // 2
                                                                                                                       // 3
      var templateUrl = "/client/libros/libros.html";                                                                  // 4
      var template = "<title>Libros</title> <h2>Libros</h2> <div class=\"row\"> <div class=\"col-sm-12\"> <button type=\"button\" href=\"#Agregar\" data-toggle=\"collapse\" aria-expanded=\"false\" aria-controls=\"collapseExample\" ng-click=\"lib.Nuevo()\" class=\"btn btn-{{lib.nuevo == true ? 'success' : 'danger'}}\">{{lib.nuevo == true ? 'Nuevo' : 'Cancelar'}}</button> <div class=\"collapse\" id=\"Agregar\"> <br> <form name=\"form\" class=\"form-horizontal\" role=\"form\"> <div class=\"well\"> <legend>Datos del Libro</legend> <div class=\"row\"> <div class=\"col-sm-12\"> <div class=\"col-sm-3\" valida> <label>Clave del Libro</label> <input name=\"clvLibro\" type=\"text\" class=\"form-control\" placeholder=\"Clave\" ng-model=\"lib.libro.clvLibro\" required capitalize> </div> <div class=\"col-sm-9\" valida> <label>Nombre del Libro</label> <input name=\"nombreLibro\" type=\"text\" class=\"form-control\" placeholder=\"Nombre\" ng-model=\"lib.libro.nombre\" required capitalize> </div> </div> <h6>&nbsp;</h6> <div class=\"col-sm-12\"> <div class=\"col-sm-3\" valida> <label>Autor</label> <input name=\"autorLibro\" type=\"text\" class=\"form-control\" placeholder=\"Autor\" ng-model=\"lib.libro.autor\" required capitalize> </div> <div class=\"col-sm-3\" valida> <label>Editorial</label> <input name=\"editorialLibro\" type=\"text\" class=\"form-control\" placeholder=\"Editorial\" ng-model=\"lib.libro.editorial\" required capitalize> </div> <div class=\"col-sm-3\" valida> <label>Número de Páginas</label> <input name=\"paginasLibro\" type=\"number\" class=\"form-control\" placeholder=\"Páginas\" ng-model=\"lib.libro.paginas\" required capitalize> </div> <div class=\"col-sm-3\" valida> <label>Año</label> <input name=\"anoLibro\" type=\"text\" class=\"form-control\" placeholder=\"Año\" ng-model=\"lib.libro.ano\" required capitalize> </div> </div> <h6>&nbsp;</h6> <div class=\"col-sm-12\"> <div class=\"col-sm-3\" valida> <label>Lugar</label> <input name=\"LugarLibro\" type=\"text\" class=\"form-control\" placeholder=\"Lugar\" ng-model=\"lib.libro.lugar\" required capitalize> </div> <div class=\"col-sm-3\" valida> <label>Cantidad</label> <input name=\"cantidadLibro\" type=\"number\" class=\"form-control\" placeholder=\"Cantidad\" ng-model=\"lib.libro.cantidad\" required capitalize> </div> <div class=\"col-sm-4\" valida> <label>Categoría</label> <select name=\"categoria\" class=\"form-control select2\" ng-model=\"lib.libro.categoria_id\" required> <option value disabled=\"disabled\" selected=\"selected\">Seleccionar Categoria...</option> <option ng-repeat=\"categoria in lib.categorias\" value=\"{{categoria._id}}\"> {{categoria.nombreCategoria}}</option> </select> </div> </div> </div> <br> <div class=\"row\"> <div class=\"col-sm-12\"> <input type=\"submit\" ng-click=\"lib.guardar(lib.libro,form)\" value=\"Guardar\" class=\"btn btn-xs btn-info\" ng-show=\"lib.action\" valida-form formulario=\"form\"> <input type=\"submit\" ng-click=\"lib.actualizar(lib.libro,form)\" value=\"Actualizar\" class=\"btn btn-xs btn-info\" ng-show=\"!lib.action\" valida-form formulario=\"form\"> </div> </div> </div> </form> </div> </div> </div> <br> <!-- List --> <div class=\"well\"> <div class=\"row\"> <div class=\"col-sm-12\"> <div class=\"col-sm-3\"> <label>Filtrar por...</label> <select name=\"OBJETO\" class=\"form-control\" disabled=\"disabled\"> <option value abled selected=\"selected\">Seleccionar</option> </select> </div> <div class=\"col-sm-9\"> <label>&nbsp;</label> <div class=\"input-group\"> <input type=\"text\" class=\"form-control\" placeholder=\"Buscar...\" disabled=\"disabled\"> <span class=\"input-group-btn\"> <button class=\"btn btn-xs btn-info\" type=\"button\" disabled=\"disabled\">Buscar</button> </span> </div> </div> </div> </div> <br> <div class=\"row\"> <div class=\"col-sm-12\"> <table class=\"table table-bordered\"> <thead> <tr> <th width=\"5%\"> <div class=\"text-center\">Clave</div> </th> <th width=\"25%\"> <div class=\"text-center\">Nombre</div> </th> <th width=\"8%\"> <div class=\"text-center\">Autor</div> </th> <th width=\"5%\"> <div class=\"text-center\">Editorial</div> </th> <th width=\"5%\"> <div class=\"text-center\">Páginas</div> </th> <th width=\"5%\"> <div class=\"text-center\">Año</div> </th> <th width=\"5%\"> <div class=\"text-center\">Lugar</div> </th> <th width=\"5%\"> <div class=\"text-center\">Cantidad</div> </th> <th width=\"5%\"> <div class=\"text-center\">Categoría</div> </th> <th width=\"10%\"> <div class=\"text-center\"> Acciones </div> </th> </tr> </thead> <tbody> <tr ng-repeat=\"libro in lib.libros\"> <td>{{libro.clvLibro}}</td> <td>{{libro.nombre}}</td> <td>{{libro.autor}}</td> <td>{{libro.editorial}}</td> <td>{{libro.paginas}}</td> <td>{{libro.ano}}</td> <td>{{libro.lugar}}</td> <td>{{libro.cantidad}}</td> <td>{{lib.getCategoria(libro.categoria_id)}}</td> <td class=\"text-center\"> <button type=\"button\" class=\"btn btn-xs btn-info\" title=\"Editar\" ng-click=\"lib.editar(libro._id)\"><i class=\"fa fa-pencil\"></i></button> <!-- <button type=\"button\" class=\"btn btn-{{lib.estatus ? 'danger' : 'success' }}\" title=\"{{lib.estatus ? 'Desactivar' : 'Activar' }}\" ng-click=\"lib.cambiarEstatus(libro._id)\"><i class=\"fa fa-{{libro.estatus ? 'times' : 'check' }}\"></i></a></button>\t     --> </td> </tr> </tbody> </table> </div> </div></div>";
                                                                                                                       // 6
      angular.module('angular-templates')                                                                              // 7
        .run(['$templateCache', function($templateCache) {                                                             // 8
          $templateCache.put(templateUrl, template);                                                                   // 9
        }]);                                                                                                           // 10
                                                                                                                       // 11
      module.exports = {};                                                                                             // 12
      module.exports.__esModule = true;                                                                                // 13
      module.exports.default = templateUrl;                                                                            // 14
                                                                                                                       // 15
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"libros.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/libros/libros.js                                                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
LibrosCtrl.$inject = ["$scope", "$meteor", "$reactive", "$state", "toastr"];angular.module("planeacion").controller("LibrosCtrl", LibrosCtrl);
function LibrosCtrl($scope, $meteor, $reactive, $state, toastr) {                                                      //
                                                                                                                       // 6
	$reactive(this).attach($scope);                                                                                       // 7
	this.action = true;                                                                                                   // 8
	this.nuevo = true;                                                                                                    // 9
	this.libro = {};                                                                                                      //
                                                                                                                       // 11
	this.subscribe('libros', function () {                                                                                // 12
		return [{}];                                                                                                         //
	});                                                                                                                   // 14
	this.subscribe('categorias', function () {                                                                            // 15
		return [{}];                                                                                                         //
	});                                                                                                                   //
                                                                                                                       // 18
	this.helpers({                                                                                                        // 19
		libros: function libros() {                                                                                          // 20
			return Libros.find();                                                                                               //
		},                                                                                                                   // 22
		categorias: function categorias() {                                                                                  // 23
			return Categorias.find();                                                                                           //
		}                                                                                                                    //
	});                                                                                                                   //
                                                                                                                       // 27
	this.Nuevo = function () {                                                                                            // 29
		this.action = true;                                                                                                  // 30
		this.nuevo = !this.nuevo;                                                                                            // 31
		this.libro = {};                                                                                                     //
	};                                                                                                                    //
                                                                                                                       // 34
	this.guardar = function (libro, form) {                                                                               // 36
		if (form.$invalid) {                                                                                                 // 37
			toastr.error('Error al guardar los datos.');                                                                        // 38
			return;                                                                                                             //
		}                                                                                                                    // 40
		console.log(libro);                                                                                                  // 41
		libro.estatus = true;                                                                                                // 42
		libro.usuarioInserto = Meteor.userId();                                                                              // 43
		Libros.insert(libro);                                                                                                // 44
		toastr.success('Guardado correctamente.');                                                                           // 45
		this.libro = {};                                                                                                     // 46
		$('.collapse').collapse('hide');                                                                                     // 47
		this.nuevo = true;                                                                                                   // 48
		form.$setPristine();                                                                                                 // 49
		form.$setUntouched();                                                                                                //
	};                                                                                                                    //
                                                                                                                       // 53
	this.editar = function (id) {                                                                                         // 55
		this.libro = Libros.findOne({ _id: id });                                                                            // 56
		this.action = false;                                                                                                 // 57
		$('.collapse').collapse('show');                                                                                     // 58
		this.nuevo = false;                                                                                                  //
	};                                                                                                                    //
                                                                                                                       // 61
	this.actualizar = function (libro, form) {                                                                            // 63
		if (form.$invalid) {                                                                                                 // 64
			toastr.error('Error al actualizar los datos.');                                                                     // 65
			return;                                                                                                             //
		}                                                                                                                    // 67
		libro.usuarioActualizo = Meteor.userId();                                                                            // 68
		Libros.update({ _id: libro._id }, { $set: libro });                                                                  // 69
		toastr.success('Actualizado correctamente.');                                                                        // 70
		$('.collapse').collapse('hide');                                                                                     // 71
		this.nuevo = true;                                                                                                   // 72
		form.$setPristine();                                                                                                 // 73
		form.$setUntouched();                                                                                                //
	};                                                                                                                    //
                                                                                                                       // 76
	this.cambiarEstatus = function (id) {                                                                                 // 78
		var libro = Libros.findOne({ _id: id });                                                                             // 79
		if (libro.estatus == true) libro.estatus = false;else libro.estatus = true;                                          //
                                                                                                                       // 84
		Libros.update({ _id: id }, { $set: { libro: libro.estatus } });                                                      //
	};                                                                                                                    //
                                                                                                                       // 87
	this.getCategoria = function (id) {                                                                                   // 89
		var categoria = Categorias.findOne({ _id: id });                                                                     // 90
		if (categoria != undefined) return categoria.nombreCategoria;                                                        //
	};                                                                                                                    //
};                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"listamaestros":{"listamaestros.html":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/listamaestros/listamaestros.html                                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
      if (Meteor.isServer) return;                                                                                     // 2
                                                                                                                       // 3
      var templateUrl = "/client/listamaestros/listamaestros.html";                                                    // 4
      var template = "<h3> Buscar Maestros </h3> <div class=\"well\"> <div class=\"row\"> <div class=\"col-sm-8\"> <div class=\"input-group\"> <div class=\"input-group-btn\"> <a href=\"./maestros\" class=\"btn btn-default btn-primary\"> <i class=\"fa fa-plus\"></i> Nuevo </a> </div> <input class=\"form-control\" type=\"text\" ng-model=\"lmc.buscar.nombre\"> </div> </div> </div> </div> <div class=\"well\"> <div class=\"row\"> <div class=\"col-sm-12\"> <table class=\"table table-bordered\"> <thead> <tr> <th width=\"10%\">Número</th> <th>Nombre</th> <th>Telefono</th> <th>Correo</th> <th width=\"10%\">Sexo</th> <th width=\"20%\"> Usuario </th> <th width=\"10%\">Acción</th> </tr> </thead> <tbody> <tr ng-repeat=\"maestro in lmc.maestros\"> <td>{{$index + 1}}</td> <td>{{maestro.profile.nombreCompleto}}</td> <td>{{maestro.profile.telefono}}</td> <td>{{maestro.profile.email}}</td> <td>{{maestro.profile.sexo}}</td> <td>{{maestro.username}}</td> <td> <div class=\"text-center\"> <div class=\"btn-group\"> <button type=\"button\" class=\"btn btn-primary dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"> <span class=\"caret\"></span> <span class=\"sr-only\">Toggle Dropdown</span> </button> <ul class=\"dropdown-menu text-left\"> <li><a ui-sref=\"root.editarMaestro({id: maestro._id})\"> <i class=\"fa fa-pencil\"></i> Editar</a> </li> </ul> </div> </div></td> </tr> </tbody> </table> </div> </div> </div>";
                                                                                                                       // 6
      angular.module('angular-templates')                                                                              // 7
        .run(['$templateCache', function($templateCache) {                                                             // 8
          $templateCache.put(templateUrl, template);                                                                   // 9
        }]);                                                                                                           // 10
                                                                                                                       // 11
      module.exports = {};                                                                                             // 12
      module.exports.__esModule = true;                                                                                // 13
      module.exports.default = templateUrl;                                                                            // 14
                                                                                                                       // 15
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"listamaestros.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/listamaestros/listamaestros.js                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
ListaMaestrosCtrl.$inject = ["$scope", "$meteor", "$reactive", "$state", "toastr"];angular.module("planeacion").controller("ListaMaestrosCtrl", ListaMaestrosCtrl);
function ListaMaestrosCtrl($scope, $meteor, $reactive, $state, toastr) {                                               //
                                                                                                                       // 5
  var rc = $reactive(this).attach($scope);                                                                             //
                                                                                                                       // 7
  rc.buscar = {};                                                                                                      // 8
  rc.buscar.nombre = "";                                                                                               //
                                                                                                                       //
  //Se comenta debido a un funcionamiento EXTREMADAMENTE RARO                                                          //
  // this.subscribe('buscarUsuarios', () => {                                                                          //
  //   return [{                                                                                                       //
  //     options: { limit: 10 },                                                                                       //
  //     where: { username: this.getReactively("buscar.nombre") }                                                      //
  //   }]                                                                                                              //
  // });                                                                                                               //
                                                                                                                       //
  // this.helpers({                                                                                                    //
  //   maestros: () => {                                                                                               //
  //     return Meteor.users.find({                                                                                    //
  //       "username": { '$regex': '.' + this.getReactively("buscar.nombre") || '' + '.', '$options': 'i' }            //
  //     });                                                                                                           //
  //   }                                                                                                               //
  // });                                                                                                               //
                                                                                                                       // 29
  this.subscribe('listaUsuarios', function () {                                                                        // 30
    return [];                                                                                                         //
  });                                                                                                                  //
                                                                                                                       // 33
  this.subscribe('departamentos', function () {                                                                        // 34
    return [{}];                                                                                                       //
  });                                                                                                                  //
                                                                                                                       // 39
  this.helpers({                                                                                                       // 40
    maestros: function maestros() {                                                                                    // 41
      return Meteor.users.find({ "roles": "Maestro" });                                                                //
    },                                                                                                                 //
                                                                                                                       // 44
    departamentos: function departamentos() {                                                                          // 45
      return Departamentos.find().fetch();                                                                             //
    }                                                                                                                  //
  });                                                                                                                  //
                                                                                                                       // 51
  this.obtenerNombreDepartamento = function (id) {                                                                     // 52
    nombreDepa = Departamentos.findOne({ _id: id });                                                                   // 53
    return nombreDepa.nombreDepartamento;                                                                              //
  };                                                                                                                   //
}                                                                                                                      //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"login":{"login.controller.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/login/login.controller.js                                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
LoginCtrl.$inject = ["$scope", "$meteor", "$reactive", "$state", "toastr"];angular.module('planeacion').controller('LoginCtrl', LoginCtrl);
                                                                                                                       // 5
function LoginCtrl($scope, $meteor, $reactive, $state, toastr) {                                                       // 6
  var rc = $reactive(this).attach($scope);                                                                             //
                                                                                                                       // 8
  var myCanvas = document.getElementById("myCanvas");                                                                  //
                                                                                                                       // 10
  this.credentials = {                                                                                                 // 11
    username: '',                                                                                                      // 12
    password: ''                                                                                                       //
  };                                                                                                                   //
                                                                                                                       // 15
  this.login = function () {                                                                                           //
                                                                                                                       // 17
    $meteor.loginWithPassword(this.credentials.username, this.credentials.password).then(function () {                 // 21
      if (Meteor.user().roles[0] === "Administrador" && Meteor.user().profile.estatus === false) {                     // 22
        toastr.error('El administrador se encuentra desactivado', "Informacion");                                      // 23
        Meteor.logout();                                                                                               // 24
        $state.go('anon.logout');                                                                                      // 25
        return;                                                                                                        //
      }                                                                                                                // 27
      toastr.info("Bienvenido al sistema");                                                                            // 28
      $state.go('root.home');                                                                                          //
    }, function (error) {                                                                                              //
                                                                                                                       // 32
      if (error.reason == "Match failed") {                                                                            // 33
        toastr.error("Escriba su usuario y contraseña para iniciar");                                                  //
      } else if (error.reason == "User not found") {                                                                   // 35
        toastr.error("Usuario no encontrado");                                                                         //
      } else if (error.reason == "Incorrect password") {                                                               // 37
        toastr.error("Contraseña incorrecta");                                                                         //
      }                                                                                                                //
    });                                                                                                                //
  };                                                                                                                   //
}                                                                                                                      //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"login.ng.html":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/login/login.ng.html                                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
      if (Meteor.isServer) return;                                                                                     // 2
                                                                                                                       // 3
      var templateUrl = "/client/login/login.ng.html";                                                                 // 4
      var template = "<!-- FONDO\t\n\t<style>\n\thtml {\n\t\tmargin: 0;\n\t\tpadding: 0;\n\t\tmin-height: 100%;\n\t\tbackground: url(\"img/mybglogin.png\") #660000;\n\t\tposition: relative;\n\t}\n\n\tbody {\n\t\tmargin: 0;\n\t\tpadding: 0;\n\t\tmin-height: 100%;\n\t\tbackground: url(\"img/mybglogin.png\") #660000;\n\t\tdirection: ltr;\n\t}\t\n\t</style>\n--> <title>Iniciar sesión</title> <div class=\"col-sm-8 col-md-6 col-md-offset-3\"> <h1 class=\"text-center login-title\">Iniciar sesión para continuar</h1> <div class=\"account-wall\"> <img class=\"profile-img\" src=\"/img/escudoUAdeO.png\" width=\"255px\" height=\"55px\" alt=\"Universidad de Occidente\"> <form class=\"form-signin\"> <input type=\"text\" name=\"username\" class=\"form-control\" placeholder=\"Nombre de usuario\" ng-model=\"lc.credentials.username\" required autofocus> <input type=\"password\" name=\"password\" class=\"form-control\" placeholder=\"Contraseña\" ng-model=\"lc.credentials.password\" required> <button class=\"btn btn-lg btn-info btn-block\" type=\"submit\" ng-click=\"lc.login()\">Iniciar sesión</button> </form> </div> <!-- LOGIN ANTERIOR\n    <header id=\"header\" style=\"height: 80px;\">\n    </header>\n    <div id=\"content\" class=\"container\">\t\t\t\t\n        <div class=\"row\">\n            <div class=\"col-lg-4 col-lg-offset-4 col-sm-12\">\n                <div class=\"well no-padding\">\n                    <form id=\"login-form\" class=\"smart-form client-form\" novalidate>\n                <header>Iniciar Sesión</header>\n                <fieldset>\n                  <section>\n                    <label for=\"\" class=\"label\">Nombre de Usuario</label>\n                    <label for=\"\" class=\"input\">\n                      <i class=\"icon-append fa fa-user\"></i>\n                      <input type=\"text\" name=\"username\" ng-model=\"lc.credentials.username\">\n                    </label>\n                  </section>\t\n                  <section>\n                    <label for=\"\" class=\"label\">Contraseña</label>\n                    <label class=\"input\">\n                      <i class=\"icon-append fa fa-lock\"></i>\n                      <input type=\"password\" name=\"password\" ng-model=\"lc.credentials.password\">\n                    </label>\n                  </section>\n                </fieldset>\t\n                <footer>\n                  <button class=\"btn btn-primary pull-left\" type=\"submit\" ng-click=\"lc.login()\">Iniciar Sesión</button>\n                </footer>\n              </form>\n                </div>\t\t\t\t\t\t\t\t\t\t\t\t\n            </div>\n        </div>\t\t\n\t\t</div>\n\t--> </div>";
                                                                                                                       // 6
      angular.module('angular-templates')                                                                              // 7
        .run(['$templateCache', function($templateCache) {                                                             // 8
          $templateCache.put(templateUrl, template);                                                                   // 9
        }]);                                                                                                           // 10
                                                                                                                       // 11
      module.exports = {};                                                                                             // 12
      module.exports.__esModule = true;                                                                                // 13
      module.exports.default = templateUrl;                                                                            // 14
                                                                                                                       // 15
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"maestros":{"maestros.html":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/maestros/maestros.html                                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
      if (Meteor.isServer) return;                                                                                     // 2
                                                                                                                       // 3
      var templateUrl = "/client/maestros/maestros.html";                                                              // 4
      var template = "<h2>{{mc .VerSiEsPerfil()}}</h2> <form name=\"form\" class=\"form-horizontal\" role=\"form\" novalidate> <div class=\"well\"> <fieldset> <legend>Datos de la cuenta</legend> <div class=\"row\"> <div class=\"col-sm-4\" valida> <label>Usuario:</label> <input ng-disabled=\"!mc.accion\" name=\"usuario\" type=\"text\" class=\"form-control\" ng-model=\"mc.usuario.username\" ng-required=\"!mc.accion\"> </div> <div class=\"col-sm-4\" valida> <label>Contraseña:</label> <input type=\"password\" name=\"contrasena\" type=\"text\" class=\"form-control\" ng-model=\"mc.usuario.password\" ng-required=\"mc.accion\"> </div> <div class=\"col-sm-4\" valida> <label>Repetir Contraseña:</label> <input type=\"password\" name=\"repetirContrasena\" type=\"text\" class=\"form-control\" ng-model=\"mc.usuario.repetirContra\" ng-required=\"mc.accion\"> </div> </div></fieldset> <fieldset> <legend>Datos del usuario</legend> <div class=\"row\"> <div class=\"col-sm-4\"> <label>Nombres:</label> <input type=\"text\" class=\"form-control\" ng-model=\"mc.usuario.profile.nombres\"> </div> <div class=\"col-sm-4\" valida> <label>Apellido Paterno:</label> <input name=\"apellidoPatern\" type=\"text\" class=\"form-control\" ng-model=\"mc.usuario.profile.apellidoPaterno\" required> </div> <div class=\"col-sm-4\" valida> <label>Apellido Materno:</label> <input name=\"apellidoMaterno\" type=\"text\" class=\"form-control\" ng-model=\"mc.usuario.profile.apellidoMaterno\" required> </div> <div class=\"col-sm-4\" valida> <label>Telefono</label> <input name=\"telefono\" maxlength=\"10\" type=\"tel\" class=\"form-control\" ng-model=\"mc.usuario.profile.telefono\" required> </div> <div class=\"col-sm-4\"> <label>Email</label> <input name=\"correo\" type=\"email\" class=\"form-control\" ng-model=\"mc.usuario.profile.email\" required> </div> <div class=\"col-sm-2\" valida> <label>Sexo</label> <select name=\"sexo\" class=\"form-control\" ng-model=\"mc.usuario.profile.sexo\" required> <option value=\"Masculino\">Masculino</option> <option value=\"Femenino\">Femenino</option> </select> </div> </div> </fieldset> <br> <div class=\"row\"> <div class=\"col-sm-3\"> <input type=\"submit\" ng-click=\"mc.guardar(mc.usuario, form)\" class=\"btn btn-primary\" ng-if=\"mc.accion\" valida-form formulario=\"form\" value=\"Guardar\"> <input type=\"submit\" ng-click=\"mc.actualizar(mc.objeto, form)\" class=\"btn btn-primary\" valida-form formulario=\"form\" value=\"Actualizar\" ng-if=\"!mc.accion\"> </div> </div> </div> </form>";
                                                                                                                       // 6
      angular.module('angular-templates')                                                                              // 7
        .run(['$templateCache', function($templateCache) {                                                             // 8
          $templateCache.put(templateUrl, template);                                                                   // 9
        }]);                                                                                                           // 10
                                                                                                                       // 11
      module.exports = {};                                                                                             // 12
      module.exports.__esModule = true;                                                                                // 13
      module.exports.default = templateUrl;                                                                            // 14
                                                                                                                       // 15
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"maestros.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/maestros/maestros.js                                                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
MaestrosCtrl.$inject = ["$scope", "$meteor", "$reactive", "$state", "toastr", "$stateParams"];angular.module("planeacion").controller("MaestrosCtrl", MaestrosCtrl);
function MaestrosCtrl($scope, $meteor, $reactive, $state, toastr, $stateParams) {                                      //
    var _this = this;                                                                                                  //
                                                                                                                       // 5
    var rc = $reactive(this).attach($scope);                                                                           // 6
    var usuario = [];                                                                                                  // 7
    rc.accion = true;                                                                                                  // 8
    rc.buscar = {};                                                                                                    // 9
    rc.buscar.nombre = "";                                                                                             // 10
    var rolesAccesibles = [];                                                                                          //
                                                                                                                       // 18
    this.subscribe('buscarMAestros', function () {                                                                     // 19
        return [{                                                                                                      // 20
            options: { limit: 10 },                                                                                    // 21
            where: { profile: { nombreCompleto: _this.getReactively("buscar.nombre") } }                               //
        }];                                                                                                            //
    });                                                                                                                //
                                                                                                                       // 27
    this.subscribe('departamentos', function () {                                                                      // 28
        return [{}];                                                                                                   //
    });                                                                                                                //
                                                                                                                       // 33
    if ($stateParams.id != undefined) {                                                                                // 34
        this.subscribe('usuarios', function () {                                                                       // 35
            return [{ _id: $stateParams.id }];                                                                         //
        });                                                                                                            // 37
        rc.accion = false;                                                                                             //
    }                                                                                                                  //
                                                                                                                       // 43
    this.helpers({                                                                                                     // 44
        usuario: function usuario() {                                                                                  // 45
            rc.objeto = Meteor.users.findOne($stateParams.id);                                                         // 46
            if (rc.objeto != undefined) return rc.objeto;                                                              //
        },                                                                                                             // 49
        departamentos: function departamentos() {                                                                      // 50
            return Departamentos.find().fetch();                                                                       //
        }                                                                                                              //
                                                                                                                       //
    });                                                                                                                //
                                                                                                                       // 55
    this.guardar = function (usuario, form) {                                                                          // 56
        if (form.$invalid) {                                                                                           // 57
            toastr.error("ERROR");                                                                                     // 58
            return;                                                                                                    //
        }                                                                                                              // 60
        usuario.profile.nombreCompleto = usuario.profile.nombres + " " + usuario.profile.apellidoPaterno + " " + usuario.profile.apellidoMaterno;
        usuario.profile.estatus = true;                                                                                // 62
        if (usuario.password === usuario.repetirContra) {                                                              // 63
            Meteor.call('createUsuario', usuario, "Maestro", function (error, result) {                                // 64
                if (error) {                                                                                           // 65
                    toastr.error("ERROR");                                                                             //
                } else {                                                                                               // 67
                    toastr.success("Se guardo corretamente el usuario");                                               //
                }                                                                                                      //
            });                                                                                                        // 70
            $state.go("root.listamaestros");                                                                           //
        }                                                                                                              //
    };                                                                                                                 //
                                                                                                                       // 75
    this.actualizar = function (usuario, form) {                                                                       // 76
        if (form.$invalid) {                                                                                           // 77
            toastr.error("Error, verificar los datos");                                                                // 78
            return;                                                                                                    //
        }                                                                                                              // 80
        if (usuario.password != undefined) {                                                                           // 81
            if (usuario.password != usuario.repetirContra) {                                                           // 82
                toastr.error("Las contraseñas no coinciden");                                                          // 83
                return;                                                                                                //
            }                                                                                                          //
        }                                                                                                              // 86
        usuario.usuarioActualizo = Meteor.userId();                                                                    // 87
        usuario.profile.nombreCompleto = usuario.profile.nombres + " " + usuario.profile.apellidoPaterno + " " + usuario.profile.apellidoMaterno;
        Meteor.call('updateUsuario', usuario, "Maestro", function (error, result) {                                    // 89
            if (error) {                                                                                               // 90
                toastr.error("Error");                                                                                 //
            } else {                                                                                                   // 92
                toastr.success("Se Actualizo correctamente el usuario");                                               //
            }                                                                                                          //
                                                                                                                       // 95
            if ($stateParams.pantallaAnterior != "Perfil") $state.go("root.listaMaestros");else {                      // 98
                $state.go("root.home");                                                                                //
            }                                                                                                          //
        });                                                                                                            //
    };                                                                                                                 //
                                                                                                                       // 103
    this.obtenerNombreDepartamento = function (departamentoId) {                                                       // 104
        return departamentos.findOne(departamentoId).nombreDepartamento;                                               //
    };                                                                                                                 //
                                                                                                                       // 107
    this.VerSiEsPerfil = function () {                                                                                 // 108
        if ($stateParams.pantallaAnterior != "Perfil") return "Registrar Maestro";else {                               // 111
            return "Actualizar Perfil";                                                                                //
        }                                                                                                              //
    };                                                                                                                 //
}                                                                                                                      //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"materias":{"materias.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/materias/materias.js                                                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
MateriasCtrl.$inject = ["$scope", "$meteor", "$reactive", "$state", "toastr"];angular.module("planeacion").controller("MateriasCtrl", MateriasCtrl);
function MateriasCtrl($scope, $meteor, $reactive, $state, toastr) {                                                    //
                                                                                                                       // 6
	$reactive(this).attach($scope);                                                                                       // 7
	this.action = true;                                                                                                   // 8
	this.nuevo = true;                                                                                                    // 9
	this.asignatura = {};                                                                                                 //
                                                                                                                       // 11
	this.subscribe('materias', function () {                                                                              // 12
		return [{}];                                                                                                         //
	});                                                                                                                   //
                                                                                                                       // 17
	this.helpers({                                                                                                        // 18
		materias: function materias() {                                                                                      // 19
			return Materias.find();                                                                                             //
		}                                                                                                                    //
	});                                                                                                                   //
                                                                                                                       // 23
	this.Nuevo = function () {                                                                                            // 25
		this.action = true;                                                                                                  // 26
		this.nuevo = !this.nuevo;                                                                                            // 27
		this.asignatura = {};                                                                                                //
	};                                                                                                                    //
                                                                                                                       // 30
	this.guardar = function (asignatura, form) {                                                                          // 32
		if (form.$invalid) {                                                                                                 // 33
			toastr.error('Error al guardar los datos.');                                                                        // 34
			return;                                                                                                             //
		}                                                                                                                    // 36
		console.log(asignatura);                                                                                             // 37
		asignatura.estatus = true;                                                                                           // 38
		asignatura.usuarioInserto = Meteor.userId();                                                                         // 39
		Materias.insert(asignatura);                                                                                         // 40
		toastr.success('Guardado correctamente.');                                                                           // 41
		this.asignatura = {};                                                                                                // 42
		$('.collapse').collapse('hide');                                                                                     // 43
		this.nuevo = true;                                                                                                   // 44
		form.$setPristine();                                                                                                 // 45
		form.$setUntouched();                                                                                                //
	};                                                                                                                    //
                                                                                                                       // 49
	this.editar = function (id) {                                                                                         // 51
		this.asignatura = Materias.findOne({ _id: id });                                                                     // 52
		this.action = false;                                                                                                 // 53
		$('.collapse').collapse('show');                                                                                     // 54
		this.nuevo = false;                                                                                                  //
	};                                                                                                                    //
                                                                                                                       // 57
	this.actualizar = function (asignatura, form) {                                                                       // 59
		if (form.$invalid) {                                                                                                 // 60
			toastr.error('Error al actualizar los datos.');                                                                     // 61
			return;                                                                                                             //
		}                                                                                                                    // 63
		var idTemp = asignatura._id;                                                                                         // 64
		delete asignatura._id;                                                                                               // 65
		asignatura.usuarioActualizo = Meteor.userId();                                                                       // 66
		Materias.update({ _id: idTemp }, { $set: asignatura });                                                              // 67
		toastr.success('Actualizado correctamente.');                                                                        // 68
		$('.collapse').collapse('hide');                                                                                     // 69
		this.nuevo = true;                                                                                                   // 70
		form.$setPristine();                                                                                                 // 71
		form.$setUntouched();                                                                                                //
	};                                                                                                                    //
                                                                                                                       // 74
	this.cambiarEstatus = function (id) {                                                                                 // 76
		var asignatura = Materias.findOne({ _id: id });                                                                      // 77
		if (asignatura.estatus == true) asignatura.estatus = false;else asignatura.estatus = true;                           //
                                                                                                                       // 82
		Materias.update({ _id: id }, { $set: { estatus: asignatura.estatus } });                                             //
	};                                                                                                                    //
                                                                                                                       // 85
	$(document).ready(function () {                                                                                       // 86
		$('#periodo').change(function () {                                                                                   // 88
			var periodo = $('option:selected', this).text();                                                                    // 89
			if (periodo == "Trimestral") {                                                                                      // 90
				$('#numero').text("Número de Trimestre *");                                                                        //
			} else if (periodo == "Semestral") {                                                                                // 92
				$('#numero').html("Número de Semestre *");                                                                         //
			}                                                                                                                   //
		});                                                                                                                  //
	});                                                                                                                   //
};                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"materias.ng.html":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/materias/materias.ng.html                                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
      if (Meteor.isServer) return;                                                                                     // 2
                                                                                                                       // 3
      var templateUrl = "/client/materias/materias.ng.html";                                                           // 4
      var template = "<title>Materias - pudoP</title> <h2>Materias</h2> <div class=\"row\"> <div class=\"col-sm-12\"> <button type=\"button\" href=\"#Agregar\" data-toggle=\"collapse\" aria-expanded=\"false\" aria-controls=\"collapseExample\" ng-click=\"mat.Nuevo()\" class=\"btn btn-{{mat.nuevo == true ? 'success' : 'danger'}}\">{{mat.nuevo == true ? 'Nuevo' : 'Cancelar'}}</button> <div class=\"collapse\" id=\"Agregar\"> <br> <form name=\"form\" class=\"form-horizontal\" role=\"form\"> <div class=\"well\"> <legend>Datos de la materia</legend> <div class=\"row\"> <div class=\"col-sm-12\"> <div class=\"col-sm-3\" valida> <label>Clave de la Asignatura</label> <input name=\"clvAsignatura\" type=\"text\" class=\"form-control\" placeholder=\"Clave\" ng-model=\"mat.asignatura.clvAsignatura\" required capitalize> </div> <div class=\"col-sm-9\" valida> <label>Nombre de la Asignatura</label> <input name=\"nombreAsignatura\" type=\"text\" class=\"form-control\" placeholder=\"Nombre\" ng-model=\"mat.asignatura.nombre\" required capitalize> </div> </div> <h6>&nbsp;</h6> <div class=\"col-sm-12\"> <div class=\"col-sm-3\" valida> <label>Periodo</label> <select name=\"periodo\" id=\"periodo\" class=\"form-control\" ng-model=\"mat.asignatura.periodo\" required> <option value disabled=\"disabled\" selected=\"selected\">Seleccionar Periodo...</option> <option value=\"Trimestral\">Trimestral</option> <option value=\"Semestral\">Semestral</option> </select> </div> <div class=\"col-sm-4\" valida> <label id=\"numero\">Número</label> <input name=\"numeroPeriodo\" type=\"text\" class=\"form-control\" placeholder=\"\" ng-model=\"mat.asignatura.numeroPeriodo\" required capitalize> </div> <div class=\"col-sm-4\" valida> <label>Horas Semanales*</label> <input name=\"duracionAsignatura\" type=\"text\" class=\"form-control\" placeholder=\"Duración\" ng-model=\"mat.asignatura.duracion\" required capitalize> </div> </div> <h6>&nbsp;</h6> <div class=\"col-sm-12\"> <div class=\"col-sm-12\" valida> <label for=\"textarea\">Descripción de la Asignatura</label> <textarea cols=\"40\" rows=\"10\" name=\"descripAsignatura\" class=\"form-control\" ng-model=\"mat.asignatura.descripAsignatura\" required capitalize></textarea> </div> </div> </div> <br> <div class=\"row\"> <div class=\"col-sm-12\"> <input type=\"submit\" ng-click=\"mat.guardar(mat.asignatura,form)\" value=\"Guardar\" class=\"btn btn-xs btn-info\" ng-show=\"mat.action\" valida-form formulario=\"form\"> <input type=\"submit\" ng-click=\"mat.actualizar(mat.asignatura,form)\" value=\"Actualizar\" class=\"btn btn-xs btn-info\" ng-show=\"!mat.action\" valida-form formulario=\"form\"> </div> </div> </div> </form> </div> </div> </div> <br> <!-- List --> <div class=\"well\"> <div class=\"row\"> <div class=\"col-sm-12\"> <div class=\"col-sm-3\"> <label>Filtrar por...</label> <select name=\"OBJETO\" class=\"form-control\" disabled=\"disabled\"> <option value disabled=\"disabled\" selected=\"selected\">Seleccionar</option> </select> </div> <div class=\"col-sm-9\"> <label>&nbsp;</label> <div class=\"input-group\"> <input type=\"text\" class=\"form-control\" placeholder=\"Buscar...\" disabled=\"disabled\"> <span class=\"input-group-btn\"> <button class=\"btn btn-xs btn-info\" type=\"button\" disabled=\"disabled\">Buscar</button> </span> </div> </div> </div> </div> <br> <div class=\"row\"> <div class=\"col-sm-12\"> <table class=\"table table-bordered\"> <thead> <tr> <th width=\"5%\"> <div class=\"text-center\">Clave</div> </th> <th width=\"25%\"> <div class=\"text-center\">Nombre</div> </th> <th width=\"8%\"> <div class=\"text-center\">Periodo</div> </th> <th width=\"5%\"> <div class=\"text-center\">Número</div> </th> <th width=\"5%\"> <div class=\"text-center\">Duración</div> </th> <th width=\"10%\"> <div class=\"text-center\"> Estatus </div> </th> <th width=\"10%\"> <div class=\"text-center\"> Acciones </div> </th> </tr> </thead> <tbody> <tr ng-repeat=\"asignatura in mat.materias\"> <td>{{asignatura.clvAsignatura}}</td> <td>{{asignatura.nombre}}</td> <td>{{asignatura.periodo}}</td> <td>{{asignatura.numeroPeriodo}}</td> <td>{{asignatura.duracion}}</td> <td> <div class=\"text-center\"> <span ng-if=\"asignatura.estatus\" class=\"label label-success\"> Activo </span> <span ng-if=\"!asignatura.estatus\" class=\"label label-danger\"> Inactivo </span> </div> </td> <td class=\"text-center\"> <button type=\"button\" class=\"btn btn-xs btn-info\" title=\"Editar\" ng-click=\"mat.editar(asignatura._id)\"><i class=\"fa fa-pencil\"></i></button> <button type=\"button\" class=\"btn btn-{{asignatura.estatus ? 'danger' : 'success' }}\" title=\"{{asignatura.estatus ? 'Desactivar' : 'Activar' }}\" ng-click=\"mat.cambiarEstatus(asignatura._id)\"><i class=\"fa fa-{{asignatura.estatus ? 'times' : 'check' }}\"></i></button> </td> </tr> </tbody> </table> </div> </div></div>";
                                                                                                                       // 6
      angular.module('angular-templates')                                                                              // 7
        .run(['$templateCache', function($templateCache) {                                                             // 8
          $templateCache.put(templateUrl, template);                                                                   // 9
        }]);                                                                                                           // 10
                                                                                                                       // 11
      module.exports = {};                                                                                             // 12
      module.exports.__esModule = true;                                                                                // 13
      module.exports.default = templateUrl;                                                                            // 14
                                                                                                                       // 15
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"planEstudio":{"planEstudio.html":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/planEstudio/planEstudio.html                                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
      if (Meteor.isServer) return;                                                                                     // 2
                                                                                                                       // 3
      var templateUrl = "/client/planEstudio/planEstudio.html";                                                        // 4
      var template = " <title>Planes de Estudio - pudoP</title> <h2>Planes de Estudio</h2> <div class=\"row\"> <div class=\"col-sm-12\"> <button type=\"button\" href=\"#Agregar\" data-toggle=\"collapse\" aria-expanded=\"false\" aria-controls=\"collapseExample\" ng-click=\"plae.Nuevo()\" class=\"btn btn-{{plae.nuevo == true ? 'success' : 'danger'}}\">{{plae.nuevo == true ? 'Nuevo' : 'Cancelar'}}</button> <div class=\"collapse\" id=\"Agregar\"> <br> <form name=\"form\" class=\"form-horizontal\" role=\"form\"> <div class=\"well\"> <div class=\"row\"> <div class=\"col-sm-12\"> <div class=\"col-sm-4\" valida> <label>Nombre del Plan de Estudio</label> <input name=\"nombrePlandeEstudio\" type=\"text\" class=\"form-control\" placeholder=\"Nombre del Plan de Estudio\" ng-model=\"plae.plandeEstudio.nombrePlandeEstudio\" required> </div> <div class=\"col-sm-2\" valida> <label>Duracion</label> <select name=\"txtDuracion\" class=\"form-control\" ng-model=\"plae.plandeEstudio.duracionPlandeEstudio\"> <option>Seleccionar duracion</option> <option value=\"1\">1</option> <option value=\"2\">2</option> </select> </div> <div class=\"col-sm-2\" valida> <label>Tipo</label> <select name=\"txtTipo\" class=\"form-control\" ng-model=\"plae.plandeEstudio.tipoPlandeEstudio\"> <option>Seleccionar tipo</option> <option value=\"Bimestral\">Bimestral</option> <option value=\"Trimestral\">Trimestral</option> <option value=\"Semestral\">Semestral</option> </select> </div> <div class=\"col-sm-6\"> <label>Materias </label> <select class=\"mutiSelect\" style=\"width:50%\" name=\"materias\" ng-model=\"plae.plandeEstudio.Materias\" multiple=\"multiple\"> <option ng-repeat=\"materia in plae.materias\" value=\"{{materia._id}}\"> {{materia.nombre}}</option> </select> </div> </div> </div> </div> <br> <div class=\"row\"> <div class=\"col-sm-12\"> <input type=\"submit\" ng-click=\"plae.guardar(plae.plandeEstudio,form)\" value=\"Guardar\" class=\"btn btn-xs btn-info\" ng-show=\"plae.action\" valida-form formulario=\"form\"> <input type=\"submit\" ng-click=\"plae.actualizar(plae.plandeEstudio,form)\" value=\"Actualizar\" class=\"btn btn-xs btn-info\" ng-show=\"!plae.action\" valida-form formulario=\"form\"> </div> </div> </form></div>  </div> </div>  <br> <div class=\"well\"> <div class=\"row\"> <div class=\"col-sm-12\"> <div class=\"col-sm-3\"> <label>Filtrar por...</label> <select name=\"OBJETO\" class=\"form-control\" disabled=\"disabled\"> <option value disabled=\"disabled\" selected=\"selected\">Seleccionar</option> </select> </div> <div class=\"col-sm-9\"> <label>&nbsp;</label> <div class=\"input-group\"> <input type=\"text\" class=\"form-control\" placeholder=\"Buscar...\" disabled=\"disabled\"> <span class=\"input-group-btn\"> <button class=\"btn btn-xs btn-info\" type=\"button\" disabled=\"disabled\">Buscar</button> </span> </div> </div> </div> </div> <br> <div class=\"row\"> <div class=\"col-sm-12\"> <table class=\"table table-bordered\"> <thead> <tr> <th width=\"24%\"><div class=\"text-center\">Nombre</div></th> <th width=\"12%\"><div class=\"text-center\">Duracion</div></th> <th width=\"12%\"><div class=\"text-center\">Tipo</div></th> <th width=\"40%\" hidden class=\"materiasMostrar\"><div class=\"text-center\">Materias</div></th> <th width=\"12%\"><div class=\"text-center\">Acciones</div></th> </tr> </thead> <tbody> <tr ng-repeat=\"plandeEstudio in plae.planesdeEstudio\"> <td>{{plandeEstudio.nombrePlandeEstudio}}</td> <td>{{plandeEstudio.duracionPlandeEstudio}}</td> <td>{{plandeEstudio.tipoPlandeEstudio}}</td> <td class=\"materiasMostrar\" hidden><p>{{plae.ObtenerMaterias(plandeEstudio.Materias)}}</p></td> <td class=\"text-center\"> <button type=\"button\" class=\"btn btn-xs btn-info\" onclick=\"toggleraro()\" title=\"Mostrar Materias\" id=\"btnMostrarMaterias\"><i class=\"fa fa-eye\"></i></button> <button type=\"button\" class=\"btn btn-xs btn-info\" title=\"Editar\" ng-click=\"plae.editar(plandeEstudio._id)\"><i class=\"fa fa-pencil\"></i></button> </td> </tr> </tbody> </table> </div> </div> </div> <script>function toggleraro(){$(\".materiasMostrar\").toggle()}$(document).ready(function(){$(\".mutiSelect\").select2({})})</script>";
                                                                                                                       // 6
      angular.module('angular-templates')                                                                              // 7
        .run(['$templateCache', function($templateCache) {                                                             // 8
          $templateCache.put(templateUrl, template);                                                                   // 9
        }]);                                                                                                           // 10
                                                                                                                       // 11
      module.exports = {};                                                                                             // 12
      module.exports.__esModule = true;                                                                                // 13
      module.exports.default = templateUrl;                                                                            // 14
                                                                                                                       // 15
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"planEstudio.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/planEstudio/planEstudio.js                                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
PlanesdeEstudioCtrl.$inject = ["$scope", "$meteor", "$reactive", "$state", "toastr"];angular.module("planeacion").controller("PlanesdeEstudioCtrl", PlanesdeEstudioCtrl);
function PlanesdeEstudioCtrl($scope, $meteor, $reactive, $state, toastr) {                                             //
                                                                                                                       // 7
	$reactive(this).attach($scope);                                                                                       // 8
	this.action = true;                                                                                                   // 9
	this.nuevo = true;                                                                                                    // 10
	this.planEstudio = {};                                                                                                // 11
	this.materiasEnPlanesDeEstudio = {};                                                                                  // 12
	this.MateriasMostrar = false;                                                                                         //
                                                                                                                       // 15
	this.subscribe('planesEstudio', function () {                                                                         // 16
		return [{}];                                                                                                         //
	});                                                                                                                   //
                                                                                                                       // 19
	this.subscribe('materias', function () {                                                                              // 20
		return [{}];                                                                                                         //
	});                                                                                                                   //
                                                                                                                       // 23
	this.helpers({                                                                                                        // 24
		planesdeEstudio: function planesdeEstudio() {                                                                        // 25
			return PlanesEstudio.find();                                                                                        //
		},                                                                                                                   // 27
		materias: function materias() {                                                                                      // 28
			return Materias.find();                                                                                             //
		}                                                                                                                    //
                                                                                                                       //
	});                                                                                                                   //
                                                                                                                       // 33
	this.Nuevo = function () {                                                                                            // 35
		this.action = true;                                                                                                  // 36
		this.nuevo = !this.nuevo;                                                                                            // 37
		this.planEstudio = {};                                                                                               //
	};                                                                                                                    //
                                                                                                                       // 40
	this.guardar = function (planEstudio, form) {                                                                         // 42
		if (form.$invalid) {                                                                                                 // 43
			toastr.error('Error al guardar los datos.');                                                                        // 44
			return;                                                                                                             //
		}                                                                                                                    // 46
		console.log(planEstudio);                                                                                            // 47
		planEstudio.estatus = true;                                                                                          // 48
		planEstudio.usuarioInserto = Meteor.userId();                                                                        // 49
		PlanesEstudio.insert(planEstudio);                                                                                   // 50
		toastr.success('Guardado correctamente.');                                                                           // 51
		this.planEstudio = {};                                                                                               // 52
		$('.collapse').collapse('hide');                                                                                     // 53
		this.nuevo = true;                                                                                                   // 54
		form.$setPristine();                                                                                                 // 55
		form.$setUntouched();                                                                                                //
	};                                                                                                                    //
                                                                                                                       // 59
	this.editar = function (id) {                                                                                         // 61
		this.plandeEstudio = PlanesEstudio.findOne({ _id: id });                                                             //
		// for(var i = 0, len = planEstudio.Materias.length; i < len; i++ ) {                                                //
		// 	var materia = Materias.findOne({_id: planEstudio.Materias[i]})	                                                  //
		// 	this.Materias.push(materia)	                                                                                     //
		// }                                                                                                                 // 66
		this.action = false;                                                                                                 // 67
		$('.collapse').collapse('show');                                                                                     // 68
		this.nuevo = false;                                                                                                  //
	};                                                                                                                    //
                                                                                                                       // 72
	this.ObtenerMaterias = function (materiasID) {                                                                        // 73
		if (materiasID !== undefined) {                                                                                      // 74
			var materia;                                                                                                        // 75
			var NombreMaterias = [];                                                                                            // 76
			var listaMaterias;                                                                                                  // 77
			for (var i = 0, len = materiasID.length; i < len; i++) {                                                            // 78
				materia = Materias.findOne({ _id: materiasID[i] });                                                                // 79
				if (materia !== undefined) {                                                                                       // 80
					NombreMaterias.push(materia.nombre);                                                                              //
				}                                                                                                                  //
			}                                                                                                                   //
                                                                                                                       // 84
			return NombreMaterias.join(", ");                                                                                   //
		}                                                                                                                    //
	};                                                                                                                    //
                                                                                                                       // 88
	this.actualizar = function (planEstudio, form) {                                                                      // 90
		if (form.$invalid) {                                                                                                 // 91
			toastr.error('Error al actualizar los datos.');                                                                     // 92
			return;                                                                                                             //
		}                                                                                                                    // 94
		var idTemp = planEstudio._id;                                                                                        // 95
		delete planEstudio._id;                                                                                              // 96
		planEstudio.usuarioActualizo = Meteor.userId();                                                                      // 97
		PlanesEstudio.update({ _id: idTemp }, { $set: planEstudio });                                                        // 98
		toastr.success('Actualizado correctamente.');                                                                        // 99
		$('.collapse').collapse('hide');                                                                                     // 100
		this.nuevo = true;                                                                                                   // 101
		form.$setPristine();                                                                                                 // 102
		form.$setUntouched();                                                                                                //
	};                                                                                                                    //
                                                                                                                       // 105
	this.MostrarMaterias = function (mostrar) {                                                                           // 106
		console.log("Lol click");                                                                                            // 107
		return !mostrar;                                                                                                     //
	};                                                                                                                    // 110
	this.cambiarEstatus = function (id) {                                                                                 // 112
		var planEstudio = PlanesEstudio.findOne({ _id: id });                                                                // 113
		if (planEstudio.estatus == true) planEstudio.estatus = false;else planEstudio.estatus = true;                        //
                                                                                                                       // 118
		PlanesEstudio.update({ _id: id }, { $set: { estatus: planEstudio.estatus } });                                       //
	};                                                                                                                    //
};                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"programasEducativos":{"programasEducativos.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/programasEducativos/programasEducativos.js                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
ProgramasEducativosCtrl.$inject = ["$scope", "$meteor", "$reactive", "$state", "toastr"];angular.module("planeacion").controller("ProgramasEducativosCtrl", ProgramasEducativosCtrl);
function ProgramasEducativosCtrl($scope, $meteor, $reactive, $state, toastr) {                                         //
	var _this = this;                                                                                                     //
                                                                                                                       // 6
	$reactive(this).attach($scope);                                                                                       // 7
	this.action = true;                                                                                                   // 8
	this.nuevo = true;                                                                                                    // 9
	this.buscar = {};                                                                                                     // 10
	this.programaEducativo = {};                                                                                          //
                                                                                                                       // 12
	this.subscribe('unidades', function () {                                                                              // 13
		return [{ estatus: true }];                                                                                          //
	});                                                                                                                   //
                                                                                                                       // 16
	this.subscribe('departamentos', function () {                                                                         // 17
		return [{ unidad_id: _this.getReactively("programaEducativo.unidad_id"),                                             // 18
			estatus: true }];                                                                                                   //
	});                                                                                                                   //
                                                                                                                       // 21
	this.subscribe('programasEducativos', function () {                                                                   // 22
		return [{}];                                                                                                         //
	});                                                                                                                   //
                                                                                                                       // 25
	this.helpers({                                                                                                        // 26
		unidades: function unidades() {                                                                                      // 27
			return Unidades.find().fetch();                                                                                     //
		},                                                                                                                   // 29
		departamentos: function departamentos() {                                                                            // 30
			return Departamentos.find();                                                                                        //
		},                                                                                                                   // 32
		programasEducativos: function programasEducativos() {                                                                // 33
			return ProgramasEducativos.find();                                                                                  //
		}                                                                                                                    //
                                                                                                                       //
	});                                                                                                                   //
                                                                                                                       // 38
	this.Nuevo = function () {                                                                                            // 40
		this.action = true;                                                                                                  // 41
		this.nuevo = !this.nuevo;                                                                                            // 42
		this.programaEducativo = {};                                                                                         //
	};                                                                                                                    //
                                                                                                                       // 45
	this.guardar = function (programaEducativo, form) {                                                                   // 47
		if (form.$invalid) {                                                                                                 // 48
			toastr.error('Error al guardar los datos.');                                                                        // 49
			return;                                                                                                             //
		}                                                                                                                    //
                                                                                                                       // 52
		console.log(programaEducativo);                                                                                      // 53
		programaEducativo.estatus = true;                                                                                    // 54
		programaEducativo.usuarioInserto = Meteor.userId();                                                                  // 55
		ProgramasEducativos.insert(programaEducativo);                                                                       // 56
		toastr.success('Guardado correctamente.');                                                                           // 57
		this.programaEducativo = {};                                                                                         // 58
		$('.collapse').collapse('hide');                                                                                     // 59
		this.nuevo = true;                                                                                                   // 60
		form.$setPristine();                                                                                                 // 61
		form.$setUntouched();                                                                                                //
	};                                                                                                                    //
                                                                                                                       // 65
	this.editar = function (id) {                                                                                         // 67
		this.programaEducativo = ProgramasEducativos.findOne({ _id: id });                                                   // 68
		this.action = false;                                                                                                 // 69
		$('.collapse').collapse('show');                                                                                     // 70
		this.nuevo = false;                                                                                                  //
	};                                                                                                                    //
                                                                                                                       // 73
	this.actualizar = function (programaEducativo, form) {                                                                // 75
		if (form.$invalid) {                                                                                                 // 76
			toastr.error('Error al actualizar los datos.');                                                                     // 77
			return;                                                                                                             //
		}                                                                                                                    // 79
		var idTemp = programaEducativo._id;                                                                                  // 80
		delete programaEducativo._id;                                                                                        // 81
		programaEducativo.usuarioActualizo = Meteor.userId();                                                                // 82
		ProgramasEducativos.update({ _id: idTemp }, { $set: programaEducativo });                                            // 83
		toastr.success('Actualizado correctamente.');                                                                        // 84
		$('.collapse').collapse('hide');                                                                                     // 85
		this.nuevo = true;                                                                                                   // 86
		form.$setPristine();                                                                                                 // 87
		form.$setUntouched();                                                                                                //
	};                                                                                                                    //
                                                                                                                       // 90
	this.cambiarEstatus = function (id) {                                                                                 // 92
		var programaEducativo = ProgramasEducativos.findOne({ _id: id });                                                    // 93
		if (programaEducativo.estatus == true) programaEducativo.estatus = false;else programaEducativo.estatus = true;      //
                                                                                                                       // 98
		ProgramasEducativos.update({ _id: id }, { $set: { estatus: programaEducativo.estatus } });                           //
	};                                                                                                                    //
                                                                                                                       // 101
	this.obtenerUnidades = function (unidadesID) {                                                                        // 102
		if (unidadesID !== undefined) {                                                                                      // 103
			var unidad;                                                                                                         // 104
			var NombreUnidades = [];                                                                                            // 105
			for (var i = 0, len = unidadesID.length; i < len; i++) {                                                            // 106
				unidad = Unidades.findOne({ _id: unidadesID[i] });                                                                 // 107
				if (unidad !== undefined) {                                                                                        // 108
					NombreUnidades.push(unidad.nombreUnidad);                                                                         //
				}                                                                                                                  //
			}                                                                                                                   //
                                                                                                                       // 112
			return NombreUnidades.join(", ");                                                                                   //
		}                                                                                                                    //
	};                                                                                                                    //
};                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"programasEducativos.ng.html":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/programasEducativos/programasEducativos.ng.html                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
      if (Meteor.isServer) return;                                                                                     // 2
                                                                                                                       // 3
      var templateUrl = "/client/programasEducativos/programasEducativos.ng.html";                                     // 4
      var template = "<title>Programas Educativos - pudoP</title> <h2>Programas Educativos</h2> <div class=\"row\"> <div class=\"col-sm-12\"> <button type=\"button\" href=\"#Agregar\" data-toggle=\"collapse\" aria-expanded=\"false\" aria-controls=\"collapseExample\" ng-click=\"proe.Nuevo()\" class=\"btn btn-{{proe.nuevo == true ? 'success' : 'danger'}}\">{{proe.nuevo == true ? 'Nuevo' : 'Cancelar'}}</button> <div class=\"collapse\" id=\"Agregar\"> <br> <form name=\"form\" class=\"form-horizontal\" role=\"form\"> <div class=\"well\"> <legend>Datos del Programa Educativo</legend> <div class=\"row\"> <div class=\"col-sm-12\"> <div class=\"col-sm-3\" valida> <label>Clave </label> <input name=\"clvProgramaEducativo\" type=\"text\" class=\"form-control\" placeholder=\"Clave del Programa Educativo\" ng-model=\"proe.programaEducativo.clvProgramaEducativo\" required> </div> <div class=\"col-sm-9\" valida> <label>Nombre del Programa Educativo</label> <input name=\"nombreProgramaEducativo\" type=\"text\" class=\"form-control\" placeholder=\"Nombre del Programa Educativo\" ng-model=\"proe.programaEducativo.nombreProgramaEducativo\" required> </div> </div> <h6>&nbsp;</h6> <div class=\"col-sm-12\"> <div class=\"col-sm-3\" valida> <label>Unidades</label> <select name=\"unidad\" class=\"form-control mutiSelect\" style=\"width:100%\" multiple=\"multiple\" ng-model=\"proe.programaEducativo.unidades\" required> <option ng-repeat=\"unidad in proe.unidades\" value=\"{{unidad._id}}\"> {{unidad.nombreUnidad}}</option> </select> </div> <div class=\"col-sm-3\" valida> <label>Departamento</label> <select name=\"departamento\" class=\"form-control select2\" ng-model=\"proe.programaEducativo.departamentoProgramaEducativo\" required> <option value disabled=\"disabled\" selected=\"selected\">Seleccionar departamento...</option> <option ng-repeat=\"departamento in proe.departamentos\" value=\"{{departamento.nombreDepartamento}}\"> {{departamento.nombreDepartamento}}</option> </select> </div> </div> <h6>&nbsp;</h6> <div class=\"col-sm-12\"> <div class=\"col-sm-12\"> <label for=\"textarea\">Detalles</label> <textarea cols=\"20\" rows=\"10\" name=\"detallesProgramaEducativo\" class=\"form-control\" placeholder=\"Detalles del Programa Educativo\" ng-model=\"proe.programaEducativo.detallesProgramaEducativo\"></textarea> </div> </div> </div> <br> <div class=\"row\"> <div class=\"col-sm-12\"> <input type=\"submit\" ng-click=\"proe.guardar(proe.programaEducativo,form)\" value=\"Guardar\" class=\"btn btn-xs btn-info\" ng-show=\"proe.action\" valida-form formulario=\"form\"> <input type=\"submit\" ng-click=\"proe.actualizar(proe.programaEducativo,form)\" value=\"Actualizar\" class=\"btn btn-xs btn-info\" ng-show=\"!proe.action\" valida-form formulario=\"form\"> </div> </div> </div> </form> </div> </div> </div> <br> <!-- List --> <div class=\"well\"> <div class=\"row\"> <div class=\"col-sm-12\"> <div class=\"col-sm-3\"> <label>Filtrar por...</label> <select name=\"OBJETO\" class=\"form-control\" disabled=\"disabled\"> <option value disabled=\"disabled\" selected=\"selected\">Seleccionar</option> </select> </div> <div class=\"col-sm-9\"> <label>&nbsp;</label> <div class=\"input-group\"> <input type=\"text\" class=\"form-control\" placeholder=\"Buscar...\" disabled=\"disabled\"> <span class=\"input-group-btn\"> <button class=\"btn btn-xs btn-info\" type=\"button\" disabled=\"disabled\">Buscar</button> </span> </div> </div> </div> </div> <br> <div class=\"row\"> <div class=\"col-sm-12\"> <table class=\"table table-bordered\"> <thead> <tr> <th width=\"4%\"><div class=\"text-center\">Clave</div></th> <th width=\"20%\"><div class=\"text-center\">Nombre</div></th> <th width=\"19%\" class=\"unidadesMostrar\" hidden><div class=\"text-center\">Unidades</div></th> <th width=\"19%\"><div class=\"text-center\">Departamento</div></th> <th width=\"20%\"><div class=\"text-center\">Detalles</div></th> <th width=\"7%\"><div class=\"text-center\">Estatus</div></th> <th width=\"12%\"><div class=\"text-center\">Acciones</div></th> </tr> </thead> <tbody> <tr ng-repeat=\"programaEducativo in proe.programasEducativos\"> <td class=\"text-center\">{{programaEducativo.clvProgramaEducativo}}</td> <td>{{programaEducativo.nombreProgramaEducativo}}</td> <td class=\"unidadesMostrar\" hidden><p>{{proe.obtenerUnidades(programaEducativo.unidades)}}</p></td> <td>{{programaEducativo.departamentoProgramaEducativo}}</td> <td>{{programaEducativo.detallesProgramaEducativo}}</td> <td> <div class=\"text-center\"> <span ng-if=\"programaEducativo.estatus\" class=\"label label-success\"> Activo </span> <span ng-if=\"!programaEducativo.estatus\" class=\"label label-danger\"> Inactivo </span> </div> </td> <td class=\"text-center\"> <button type=\"button\" class=\"btn btn-success\" onclick=\"toggleUnidades()\" title=\"Mostrar Unidades\" id=\"btnMostrarUnidades\"><i class=\"fa fa-eye\"></i></button> <button type=\"button\" class=\"btn btn-xs btn-info\" title=\"Editar\" ng-click=\"proe.editar(programaEducativo._id)\"><i class=\"fa fa-pencil\"></i></button> <button type=\"button\" class=\"btn btn-{{programaEducativo.estatus ? 'danger' : 'success' }}\" title=\"{{programaEducativo.estatus ? 'Desactivar' : 'Activar' }}\" ng-click=\"proe.cambiarEstatus(programaEducativo._id)\"><i class=\"fa fa-{{programaEducativo.estatus ? 'times' : 'check' }}\"></i></button> </td> </tr> </tbody> </table> </div> </div> <script>function toggleUnidades(){$(\".unidadesMostrar\").toggle()}$(document).ready(function(){$(\".mutiSelect\").select2({})})</script></div>";
                                                                                                                       // 6
      angular.module('angular-templates')                                                                              // 7
        .run(['$templateCache', function($templateCache) {                                                             // 8
          $templateCache.put(templateUrl, template);                                                                   // 9
        }]);                                                                                                           // 10
                                                                                                                       // 11
      module.exports = {};                                                                                             // 12
      module.exports.__esModule = true;                                                                                // 13
      module.exports.default = templateUrl;                                                                            // 14
                                                                                                                       // 15
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"unidades":{"unidades.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/unidades/unidades.js                                                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
UnidadesCtrl.$inject = ["$scope", "$meteor", "$reactive", "$state", "toastr"];angular.module("planeacion").controller("UnidadesCtrl", UnidadesCtrl);
function UnidadesCtrl($scope, $meteor, $reactive, $state, toastr) {                                                    //
                                                                                                                       // 6
	$reactive(this).attach($scope);                                                                                       // 7
	this.action = true;                                                                                                   // 8
	this.nuevo = true;                                                                                                    // 9
	this.unidad = {};                                                                                                     //
                                                                                                                       // 11
	this.subscribe('unidades', function () {                                                                              // 12
		return [{}];                                                                                                         //
	});                                                                                                                   //
                                                                                                                       // 17
	this.helpers({                                                                                                        // 18
		unidades: function unidades() {                                                                                      // 19
			return Unidades.find();                                                                                             //
		}                                                                                                                    //
	});                                                                                                                   //
                                                                                                                       // 23
	this.Nuevo = function () {                                                                                            // 25
		this.action = true;                                                                                                  // 26
		this.nuevo = !this.nuevo;                                                                                            // 27
		this.unidad = {};                                                                                                    //
	};                                                                                                                    //
                                                                                                                       // 30
	this.guardar = function (unidad, form) {                                                                              // 32
		if (form.$invalid) {                                                                                                 // 33
			toastr.error('Error al guardar los datos.');                                                                        // 34
			return;                                                                                                             //
		}                                                                                                                    // 36
		console.log(unidad);                                                                                                 // 37
		unidad.estatus = true;                                                                                               // 38
		unidad.usuarioInserto = Meteor.userId();                                                                             // 39
		Unidades.insert(unidad);                                                                                             // 40
		toastr.success('Guardado correctamente.');                                                                           // 41
		this.unidad = {};                                                                                                    // 42
		$('.collapse').collapse('hide');                                                                                     // 43
		this.nuevo = true;                                                                                                   // 44
		form.$setPristine();                                                                                                 // 45
		form.$setUntouched();                                                                                                //
	};                                                                                                                    //
                                                                                                                       // 49
	this.editar = function (id) {                                                                                         // 51
		this.unidad = Unidades.findOne({ _id: id });                                                                         // 52
		this.action = false;                                                                                                 // 53
		$('.collapse').collapse('show');                                                                                     // 54
		this.nuevo = false;                                                                                                  //
	};                                                                                                                    //
                                                                                                                       // 57
	this.actualizar = function (unidad, form) {                                                                           // 59
		if (form.$invalid) {                                                                                                 // 60
			toastr.error('Error al actualizar los datos.');                                                                     // 61
			return;                                                                                                             //
		}                                                                                                                    // 63
		var idTemp = unidad._id;                                                                                             // 64
		delete unidad._id;                                                                                                   // 65
		unidad.usuarioActualizo = Meteor.userId();                                                                           // 66
		Unidades.update({ _id: idTemp }, { $set: unidad });                                                                  // 67
		toastr.success('Actualizado correctamente.');                                                                        // 68
		$('.collapse').collapse('hide');                                                                                     // 69
		this.nuevo = true;                                                                                                   // 70
		form.$setPristine();                                                                                                 // 71
		form.$setUntouched();                                                                                                //
	};                                                                                                                    //
                                                                                                                       // 74
	this.cambiarEstatus = function (id) {                                                                                 // 76
		var unidad = Unidades.findOne({ _id: id });                                                                          // 77
		if (unidad.estatus == true) unidad.estatus = false;else unidad.estatus = true;                                       //
                                                                                                                       // 82
		Unidades.update({ _id: id }, { $set: { estatus: unidad.estatus } });                                                 //
	};                                                                                                                    //
};                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"unidades.ng.html":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/unidades/unidades.ng.html                                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
      if (Meteor.isServer) return;                                                                                     // 2
                                                                                                                       // 3
      var templateUrl = "/client/unidades/unidades.ng.html";                                                           // 4
      var template = "<title>Unidades - pudoP</title> <h2>Unidades</h2> <div class=\"row\"> <div class=\"col-sm-12\"> <button type=\"button\" href=\"#Agregar\" data-toggle=\"collapse\" aria-expanded=\"false\" aria-controls=\"collapseExample\" ng-click=\"unid.Nuevo()\" class=\"btn btn-{{unid.nuevo == true ? 'success' : 'danger'}}\">{{unid.nuevo == true ? 'Nuevo' : 'Cancelar'}}</button> <button type=\"button\" ui-sref=\"root.departamentos\" class=\"btn btn-primary\">Departamentos</button> <div class=\"collapse\" id=\"Agregar\"> <br> <form name=\"form\" class=\"form-horizontal\" role=\"form\"> <div class=\"well\"> <legend>Datos de la unidad</legend> <div class=\"row\"> <div class=\"col-sm-12\"> <div class=\"col-sm-3\" valida> <label>Clave de la Unidad</label> <input name=\"clvUnidad\" type=\"text\" class=\"form-control\" placeholder=\"Clave de la Unidad\" ng-model=\"unid.unidad.clvUnidad\" required> </div> <div class=\"col-sm-9\" valida> <label>Nombre de la Unidad</label> <input name=\"nombreUnidad\" type=\"text\" class=\"form-control\" placeholder=\"Nombre de la Unidad\" ng-model=\"unid.unidad.nombreUnidad\" required> </div> <h6>&nbsp;</h6> <div class=\"col-sm-12\" valida> <label for=\"textarea\">Direccion</label> <textarea cols=\"20\" rows=\"10\" name=\"direccionUnidad\" class=\"form-control\" placeholder=\"Direccion de la Unidad\" ng-model=\"unid.unidad.direccionUnidad\" required></textarea> </div> </div> </div> <br> <div class=\"row\"> <div class=\"col-sm-12\"> <input type=\"submit\" ng-click=\"unid.guardar(unid.unidad,form)\" value=\"Guardar\" class=\"btn btn-xs btn-info\" ng-show=\"unid.action\" valida-form formulario=\"form\"> <input type=\"submit\" ng-click=\"unid.actualizar(unid.unidad,form)\" value=\"Actualizar\" class=\"btn btn-xs btn-info\" ng-show=\"!unid.action\" valida-form formulario=\"form\"> </div> </div> </div> </form> </div> </div> </div> <br> <!-- List --> <div class=\"well\"> <div class=\"row\"> <div class=\"col-sm-12\"> <div class=\"col-sm-3\"> <label>Filtrar por...</label> <select name=\"OBJETO\" class=\"form-control\" disabled=\"disabled\"> <option value disabled=\"disabled\" selected=\"selected\">Seleccionar</option> </select> </div> <div class=\"col-sm-9\"> <label>&nbsp;</label> <div class=\"input-group\"> <input type=\"text\" class=\"form-control\" placeholder=\"Buscar...\" disabled=\"disabled\"> <span class=\"input-group-btn\"> <button class=\"btn btn-xs btn-info\" type=\"button\" disabled=\"disabled\">Buscar</button> </span> </div> </div> </div> </div> <br> <div class=\"row\"> <div class=\"col-sm-12\"> <table class=\"table table-bordered\"> <thead> <tr> <th width=\"4%\"><div class=\"text-center\">Clave</div></th> <th width=\"37%\"><div class=\"text-center\">Nombre</div></th> <th width=\"40%\"><div class=\"text-center\">Dirección</div></th> <th width=\"7%\"><div class=\"text-center\">Estatus</div></th> <th width=\"12%\"><div class=\"text-center\">Acciones</div></th> </tr> </thead> <tbody> <tr ng-repeat=\"unidad in unid.unidades\"> <td class=\"text-center\">{{unidad.clvUnidad}}</td> <td>{{unidad.nombreUnidad}}</td> <td>{{unidad.direccionUnidad}}</td> <td> <div class=\"text-center\"> <span ng-if=\"unidad.estatus\" class=\"label label-success\"> Activo </span> <span ng-if=\"!unidad.estatus\" class=\"label label-danger\"> Inactivo </span> </div> </td> <td class=\"text-center\"> <button type=\"button\" class=\"btn btn-xs btn-info\" title=\"Editar\" ng-click=\"unid.editar(unidad._id)\"><i class=\"fa fa-pencil\"></i></button> <button type=\"button\" class=\"btn btn-{{unidad.estatus ? 'danger' : 'success' }}\" title=\"{{unidad.estatus ? 'Desactivar' : 'Activar' }}\" ng-click=\"unid.cambiarEstatus(unidad._id)\"><i class=\"fa fa-{{unidad.estatus ? 'times' : 'check' }}\"></i></button> </td> </tr> </tbody> </table> </div> </div> </div>";
                                                                                                                       // 6
      angular.module('angular-templates')                                                                              // 7
        .run(['$templateCache', function($templateCache) {                                                             // 8
          $templateCache.put(templateUrl, template);                                                                   // 9
        }]);                                                                                                           // 10
                                                                                                                       // 11
      module.exports = {};                                                                                             // 12
      module.exports.__esModule = true;                                                                                // 13
      module.exports.default = templateUrl;                                                                            // 14
                                                                                                                       // 15
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"index.html.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/index.html.js                                                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
            Meteor.startup(function() {                                                                                // 2
              var attrs = {"ng-app":"planeacion","class":"menu-on-left"};                                              // 3
              for (var prop in attrs) {                                                                                // 4
                document.body.setAttribute(prop, attrs[prop]);                                                         // 5
              }                                                                                                        // 6
            });                                                                                                        // 7
                                                                                                                       // 8
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.ng.html":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/index.ng.html                                                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
      if (Meteor.isServer) return;                                                                                     // 2
                                                                                                                       // 3
      var templateUrl = "/client/index.ng.html";                                                                       // 4
      var template = "<ui-view></ui-view>";                                                                            // 5
                                                                                                                       // 6
      angular.module('angular-templates')                                                                              // 7
        .run(['$templateCache', function($templateCache) {                                                             // 8
          $templateCache.put(templateUrl, template);                                                                   // 9
        }]);                                                                                                           // 10
                                                                                                                       // 11
      module.exports = {};                                                                                             // 12
      module.exports.__esModule = true;                                                                                // 13
      module.exports.default = templateUrl;                                                                            // 14
                                                                                                                       // 15
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"routes.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/routes.js                                                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
angular.module("planeacion").run(["$rootScope", "$state", "toastr", function ($rootScope, $state, toastr) {            // 1
  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {              // 2
    switch (error) {                                                                                                   // 3
      case "AUTH_REQUIRED":                                                                                            // 4
        $state.go('anon.login');                                                                                       // 5
        break;                                                                                                         // 6
      case "FORBIDDEN":                                                                                                // 6
        //$state.go('root.home');                                                                                      //
        break;                                                                                                         // 9
      case "UNAUTHORIZED":                                                                                             // 9
        toastr.error("Acceso Denegado");                                                                               // 11
        toastr.error("No tiene permiso para ver esta opción");                                                         // 12
        break;                                                                                                         // 13
      default:                                                                                                         // 13
        $state.go('internal-client-error');                                                                            // 15
    }                                                                                                                  // 15
  });                                                                                                                  //
}]);                                                                                                                   //
                                                                                                                       //
angular.module('planeacion').config(['$injector', function ($injector) {                                               // 20
  var $stateProvider = $injector.get('$stateProvider');                                                                // 21
  var $urlRouterProvider = $injector.get('$urlRouterProvider');                                                        // 22
  var $locationProvider = $injector.get('$locationProvider');                                                          // 23
                                                                                                                       //
  $locationProvider.html5Mode(true);                                                                                   // 25
  $urlRouterProvider.otherwise('/');                                                                                   // 26
                                                                                                                       //
  /***************************                                                                                         //
   * Anonymous Routes                                                                                                  //
   ***************************/                                                                                        //
  $stateProvider.state('anon', {                                                                                       // 31
    url: '',                                                                                                           // 33
    abstract: true,                                                                                                    // 34
    template: '<ui-view/>'                                                                                             // 35
  }).state('anon.login', {                                                                                             //
    url: '/login',                                                                                                     // 38
    templateUrl: 'client/login/login.ng.html',                                                                         // 39
    controller: 'LoginCtrl',                                                                                           // 40
    controllerAs: 'lc'                                                                                                 // 41
  }).state('anon.logout', {                                                                                            //
    url: '/logout',                                                                                                    // 44
    resolve: {                                                                                                         // 45
      'logout': ['$meteor', '$state', 'toastr', function ($meteor, $state, toastr) {                                   // 46
        return $meteor.logout().then(function () {                                                                     // 47
          toastr.info("Sesión finalizada.");                                                                           // 49
          $state.go('anon.login');                                                                                     // 50
        }, function (error) {                                                                                          //
          toastr.error(error.reason);                                                                                  // 53
        });                                                                                                            //
      }]                                                                                                               //
    }                                                                                                                  //
  });                                                                                                                  //
                                                                                                                       //
  /***************************                                                                                         //
   * Login Users Routes                                                                                                //
   ***************************/                                                                                        //
  $stateProvider.state('root', {                                                                                       // 63
    url: '',                                                                                                           // 65
    abstract: true,                                                                                                    // 66
    templateUrl: 'client/layouts/root.ng.html',                                                                        // 67
    controller: 'RootCtrl as ro',                                                                                      // 68
    resolve: {                                                                                                         // 69
      "currentUser": ["$meteor", function ($meteor) {                                                                  // 70
        return $meteor.requireUser();                                                                                  // 71
      }]                                                                                                               //
    }                                                                                                                  //
  }).state('root.home', {                                                                                              //
    url: '/',                                                                                                          // 76
    templateUrl: 'client/home/home.ng.html',                                                                           // 77
    controller: 'HomeCtrl as ho',                                                                                      // 78
    ncyBreadcrumb: {                                                                                                   // 79
      label: "Home"                                                                                                    // 80
    },                                                                                                                 //
    resolve: {                                                                                                         // 82
      "currentUser": ["$meteor", function ($meteor) {                                                                  // 83
        return $meteor.requireUser();                                                                                  // 84
      }]                                                                                                               //
    }                                                                                                                  //
  }).state('root.libros', {                                                                                            //
    url: '/libros',                                                                                                    // 89
    templateUrl: 'client/libros/libros.html',                                                                          // 90
    controller: 'LibrosCtrl as lib',                                                                                   // 91
    resolve: {                                                                                                         // 92
      "currentUser": ["$meteor", function ($meteor) {                                                                  // 93
        return $meteor.requireUser();                                                                                  // 94
      }]                                                                                                               //
    }                                                                                                                  //
  }).state('root.categorias', {                                                                                        //
    url: '/categorias',                                                                                                // 99
    templateUrl: 'client/categorias/categorias.html',                                                                  // 100
    controller: 'CategoriasCtrl as cat',                                                                               // 101
    resolve: {                                                                                                         // 102
      "currentUser": ["$meteor", function ($meteor) {                                                                  // 103
        return $meteor.requireUser();                                                                                  // 104
      }]                                                                                                               //
    }                                                                                                                  //
  }).state('root.alumnos', {                                                                                           //
    url: '/alumnos',                                                                                                   // 109
    templateUrl: 'client/alumnos/alumnos.html',                                                                        // 110
    controller: 'AlumnosCtrl as alum',                                                                                 // 111
    resolve: {                                                                                                         // 112
      "currentUser": ["$meteor", function ($meteor) {                                                                  // 113
        return $meteor.requireUser();                                                                                  // 114
      }]                                                                                                               //
    }                                                                                                                  //
  })                                                                                                                   //
                                                                                                                       //
  // .state('root.unidades', {                                                                                         //
  //   url: '/unidades',                                                                                               //
  //   templateUrl: 'client/unidades/unidades.ng.html',                                                                //
  //   controller: 'UnidadesCtrl as unid',                                                                             //
  //   resolve: {                                                                                                      //
  //     "currentUser": ["$meteor", function($meteor){                                                                 //
  //       return $meteor.requireUser();                                                                               //
  //     }]                                                                                                            //
  //   }                                                                                                               //
  // })                                                                                                                //
  // .state('root.departamentos', {                                                                                    //
  //   url: '/departamentos',                                                                                          //
  //   templateUrl: 'client/departamentos/departamentos.ng.html',                                                      //
  //   controller: 'DepartamentosCtrl as depa',                                                                        //
  //   resolve: {                                                                                                      //
  //     "currentUser": ["$meteor", function($meteor){                                                                 //
  //       return $meteor.requireUser();                                                                               //
  //     }]                                                                                                            //
  //   }                                                                                                               //
  // })                                                                                                                //
  // .state('root.programasEducativos', {                                                                              //
  //   url: '/programasEducativos',                                                                                    //
  //   templateUrl: 'client/programasEducativos/programasEducativos.ng.html',                                          //
  //   controller: 'ProgramasEducativosCtrl as proe',                                                                  //
  //   resolve: {                                                                                                      //
  //     "currentUser": ["$meteor", function($meteor){                                                                 //
  //       return $meteor.requireUser();                                                                               //
  //     }]                                                                                                            //
  //   }                                                                                                               //
  // })                                                                                                                //
  // .state('root.planEstudio', {                                                                                      //
  //   url: '/planEstudio',                                                                                            //
  //   templateUrl: 'client/planEstudio/planEstudio.html',                                                             //
  //   controller: 'PlanesdeEstudioCtrl as plae',                                                                      //
  //   resolve: {                                                                                                      //
  //     "currentUser": ["$meteor", function($meteor){                                                                 //
  //       return $meteor.requireUser();                                                                               //
  //       }]                                                                                                          //
  //   }                                                                                                               //
  // })                                                                                                                //
                                                                                                                       //
  // .state('root.listamaestros', {                                                                                    //
  //   url: '/listamaestros',                                                                                          //
  //   templateUrl: 'client/listamaestros/listamaestros.html',                                                         //
  //   controller: 'ListaMaestrosCtrl as lmc',                                                                         //
  //   ncyBreadcrumb: {                                                                                                //
  //     label: "Maestros"                                                                                             //
  //   },                                                                                                              //
  //   resolve: {                                                                                                      //
  //     "currentUser": ["$meteor", function($meteor){                                                                 //
  //       return $meteor.requireUser();                                                                               //
  //     }]                                                                                                            //
  //   },                                                                                                              //
  // })                                                                                                                //
                                                                                                                       //
  // .state('root.maestros', {                                                                                         //
  //   url: '/maestros',                                                                                               //
  //   templateUrl: 'client/maestros/maestros.html',                                                                   //
  //   controller: 'MaestrosCtrl as mc',                                                                               //
  //   ncyBreadcrumb: {                                                                                                //
  //     label: "Maestros"                                                                                             //
  //   },                                                                                                              //
  //   resolve: {                                                                                                      //
  //     "currentUser": ["$meteor", function($meteor){                                                                 //
  //       return $meteor.requireUser();                                                                               //
  //     }]                                                                                                            //
  //   },                                                                                                              //
  // })                                                                                                                //
  // .state('root.editarMaestro', {                                                                                    //
  //   url: '/editarMaestro/:id,:pantallaAnterior',                                                                    //
  //   templateUrl: 'client/maestros/maestros.html',                                                                   //
  //   controller: 'MaestrosCtrl as mc',                                                                               //
  //   ncyBreadcrumb: {                                                                                                //
  //     label: "Maestros"                                                                                             //
  //   },                                                                                                              //
  //   resolve: {                                                                                                      //
  //     "currentUser": ["$meteor", function($meteor){                                                                 //
  //       return $meteor.requireUser();                                                                               //
  //     }]                                                                                                            //
  //   },                                                                                                              //
  // })                                                                                                                //
                                                                                                                       //
  // .state('root.listacoordinadores', {                                                                               //
  //   url: '/listacoordinadores',                                                                                     //
  //   templateUrl: 'client/coordinadores/listacoordinadores.html',                                                    //
  //   controller: 'ListaCoordinadoresCtrl as lcc',                                                                    //
  //   ncyBreadcrumb: {                                                                                                //
  //     label: "Coordinadores"                                                                                        //
  //   },                                                                                                              //
  //   resolve: {                                                                                                      //
  //     "currentUser": ["$meteor", function($meteor){                                                                 //
  //       return $meteor.requireUser();                                                                               //
  //     }]                                                                                                            //
  //   },                                                                                                              //
  // })                                                                                                                //
  // .state('root.coordinadores', {                                                                                    //
  //   url: '/coordinadores',                                                                                          //
  //   templateUrl: 'client/coordinadores/coordinadores.html',                                                         //
  //   controller: 'CoordinadoresCtrl as cc',                                                                          //
  //   resolve: {                                                                                                      //
  //     "currentUser": ["$meteor", function($meteor){                                                                 //
  //       return $meteor.requireUser();                                                                               //
  //     }]                                                                                                            //
  //   },                                                                                                              //
  // })                                                                                                                //
                                                                                                                       //
  // .state('root.editarCoordinador', {                                                                                //
  //   url: '/coordinadores/:id,:pantallaAnterior',                                                                    //
  //   templateUrl: 'client/coordinadores/coordinadores.html',                                                         //
  //   controller: 'CoordinadoresCtrl as cc',                                                                          //
  //   ncyBreadcrumb: {                                                                                                //
  //     label: "Coordinadores"                                                                                        //
  //   },                                                                                                              //
  //   resolve: {                                                                                                      //
  //     "currentUser": ["$meteor", function($meteor){                                                                 //
  //       return $meteor.requireUser();                                                                               //
  //     }]                                                                                                            //
  //   },                                                                                                              //
  // })                                                                                                                //
                                                                                                                       //
  .state('root.listaAdministradores', {                                                                                //
    url: '/listaAdministradores',                                                                                      // 241
    templateUrl: 'client/administradores/listaAdministradores.html',                                                   // 242
    controller: 'ListaAdministradoresCtrl as lam',                                                                     // 243
    ncyBreadcrumb: {                                                                                                   // 244
      label: "Admins"                                                                                                  // 245
    },                                                                                                                 //
    resolve: {                                                                                                         // 247
      "currentUser": ["$meteor", function ($meteor) {                                                                  // 248
        return $meteor.requireUser();                                                                                  // 249
      }]                                                                                                               //
    }                                                                                                                  //
  }).state('root.admins', {                                                                                            //
    url: '/admins',                                                                                                    // 255
    templateUrl: 'client/administradores/admins.html',                                                                 // 256
    controller: 'AdministradoresCtrl as am',                                                                           // 257
    resolve: {                                                                                                         // 258
      "currentUser": ["$meteor", function ($meteor) {                                                                  // 259
        return $meteor.requireUser();                                                                                  // 260
      }]                                                                                                               //
    }                                                                                                                  //
  }).state('root.editarAdministrador', {                                                                               //
    url: '/admins/:id,:pantallaAnterior',                                                                              // 266
    templateUrl: 'client/administradores/admins.html',                                                                 // 267
    controller: 'AdministradoresCtrl as am',                                                                           // 268
    ncyBreadcrumb: {                                                                                                   // 269
      label: "Admins"                                                                                                  // 270
    },                                                                                                                 //
    resolve: {                                                                                                         // 272
      "currentUser": ["$meteor", function ($meteor) {                                                                  // 273
        return $meteor.requireUser();                                                                                  // 274
      }]                                                                                                               //
    }                                                                                                                  //
  });                                                                                                                  //
}]);                                                                                                                   //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"modelos":{"alumnos.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// modelos/alumnos.js                                                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Alumnos = new Mongo.Collection("alumnos");                                                                             // 1
Alumnos.allow({                                                                                                        // 2
  insert: function insert() {                                                                                          // 3
    return true;                                                                                                       // 3
  },                                                                                                                   //
  update: function update() {                                                                                          // 4
    return true;                                                                                                       // 4
  },                                                                                                                   //
  remove: function remove() {                                                                                          // 5
    return true;                                                                                                       // 5
  }                                                                                                                    //
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"categorias.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// modelos/categorias.js                                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Categorias = new Mongo.Collection("categorias");                                                                       // 1
Categorias.allow({                                                                                                     // 2
  insert: function insert() {                                                                                          // 3
    return true;                                                                                                       // 3
  },                                                                                                                   //
  update: function update() {                                                                                          // 4
    return true;                                                                                                       // 4
  },                                                                                                                   //
  remove: function remove() {                                                                                          // 5
    return true;                                                                                                       // 5
  }                                                                                                                    //
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"departamentos.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// modelos/departamentos.js                                                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Departamentos = new Mongo.Collection("departamentos");                                                                 // 1
Departamentos.allow({                                                                                                  // 2
  insert: function insert() {                                                                                          // 3
    return true;                                                                                                       // 3
  },                                                                                                                   //
  update: function update() {                                                                                          // 4
    return true;                                                                                                       // 4
  },                                                                                                                   //
  remove: function remove() {                                                                                          // 5
    return true;                                                                                                       // 5
  }                                                                                                                    //
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"libros.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// modelos/libros.js                                                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Libros = new Mongo.Collection("libros");                                                                               // 1
Libros.allow({                                                                                                         // 2
  insert: function insert() {                                                                                          // 3
    return true;                                                                                                       // 3
  },                                                                                                                   //
  update: function update() {                                                                                          // 4
    return true;                                                                                                       // 4
  },                                                                                                                   //
  remove: function remove() {                                                                                          // 5
    return true;                                                                                                       // 5
  }                                                                                                                    //
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"maestros.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// modelos/maestros.js                                                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Maestros = new Mongo.Collection("maestros");                                                                           // 1
Maestros.allow({                                                                                                       // 2
  insert: function insert() {                                                                                          // 3
    return true;                                                                                                       // 3
  },                                                                                                                   //
  update: function update() {                                                                                          // 4
    return true;                                                                                                       // 4
  },                                                                                                                   //
  remove: function remove() {                                                                                          // 5
    return true;                                                                                                       // 5
  }                                                                                                                    //
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"materias.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// modelos/materias.js                                                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Materias = new Mongo.Collection("materias");                                                                           // 1
Materias.allow({                                                                                                       // 2
  insert: function insert() {                                                                                          // 3
    return true;                                                                                                       // 3
  },                                                                                                                   //
  update: function update() {                                                                                          // 4
    return true;                                                                                                       // 4
  },                                                                                                                   //
  remove: function remove() {                                                                                          // 5
    return true;                                                                                                       // 5
  }                                                                                                                    //
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"planEstudio.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// modelos/planEstudio.js                                                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
PlanesEstudio = new Mongo.Collection("planesdeEstudio");                                                               // 1
PlanesEstudio.allow({                                                                                                  // 2
  insert: function insert() {                                                                                          // 3
    return true;                                                                                                       // 3
  },                                                                                                                   //
  update: function update() {                                                                                          // 4
    return true;                                                                                                       // 4
  },                                                                                                                   //
  remove: function remove() {                                                                                          // 5
    return true;                                                                                                       // 5
  }                                                                                                                    //
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"programasEducativos.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// modelos/programasEducativos.js                                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
ProgramasEducativos = new Mongo.Collection("programasEducativos");                                                     // 1
ProgramasEducativos.allow({                                                                                            // 2
  insert: function insert() {                                                                                          // 3
    return true;                                                                                                       // 3
  },                                                                                                                   //
  update: function update() {                                                                                          // 4
    return true;                                                                                                       // 4
  },                                                                                                                   //
  remove: function remove() {                                                                                          // 5
    return true;                                                                                                       // 5
  }                                                                                                                    //
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"unidades.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// modelos/unidades.js                                                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Unidades = new Mongo.Collection("unidades");                                                                           // 1
Unidades.allow({                                                                                                       // 2
  insert: function insert() {                                                                                          // 3
    return true;                                                                                                       // 3
  },                                                                                                                   //
  update: function update() {                                                                                          // 4
    return true;                                                                                                       // 4
  },                                                                                                                   //
  remove: function remove() {                                                                                          // 5
    return true;                                                                                                       // 5
  }                                                                                                                    //
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},{"extensions":[".js",".json",".html",".scss",".css"]});
require("./client/lib/smartadmin/plugins/checkboxList.js");
require("./client/lib/smartadmin/plugins/jarvis.widget.min.js");
require("./client/lib/smartadmin/plugins/jquery.bootstrap.wizard.min.js");
require("./client/lib/smartadmin/plugins/smart_collapse_toggle.js");
require("./client/lib/smartadmin/plugins/wizard.min.js");
require("./client/lib/globals/download.js");
require("./client/lib/globals/loading.js");
require("./client/lib/smartadmin/app.smartadmin.js");
require("./client/lib/smartadmin/calendar.js");
require("./client/lib/smartadmin/collection2Validate.js");
require("./client/lib/smartadmin/fullscreen.directive.js");
require("./client/lib/smartadmin/jarvis.widget.directive.js");
require("./client/lib/smartadmin/smartmenu.directive.js");
require("./client/lib/smartadmin/toggle_menu.directive.js");
require("./client/lib/smartadmin/validator.collection2Schema.js");
require("./client/lib/smartadmin/widget.grid.directive.js");
require("./client/lib/app.js");
require("./client/lib/signarutre.js");
require("./client/administradores/admins.html");
require("./client/administradores/admins.js");
require("./client/administradores/listaAdministradores.html");
require("./client/administradores/listaAdministradores.js");
require("./client/alumnos/alumnos.html");
require("./client/alumnos/alumnos.js");
require("./client/categorias/categorias.html");
require("./client/categorias/categorias.js");
require("./client/coordinadores/coordinadores.html");
require("./client/coordinadores/coordinadores.js");
require("./client/coordinadores/listacoordinadores.html");
require("./client/coordinadores/listacoordinadores.js");
require("./client/departamentos/departamentos.js");
require("./client/departamentos/departamentos.ng.html");
require("./client/directives/validador.js");
require("./client/home/home.js");
require("./client/home/home.ng.html");
require("./client/layouts/left-nav.ng.html");
require("./client/layouts/root.js");
require("./client/layouts/root.ng.html");
require("./client/libros/libros.html");
require("./client/libros/libros.js");
require("./client/listamaestros/listamaestros.html");
require("./client/listamaestros/listamaestros.js");
require("./client/login/login.controller.js");
require("./client/login/login.ng.html");
require("./client/maestros/maestros.html");
require("./client/maestros/maestros.js");
require("./client/materias/materias.js");
require("./client/materias/materias.ng.html");
require("./client/planEstudio/planEstudio.html");
require("./client/planEstudio/planEstudio.js");
require("./client/programasEducativos/programasEducativos.js");
require("./client/programasEducativos/programasEducativos.ng.html");
require("./client/unidades/unidades.js");
require("./client/unidades/unidades.ng.html");
require("./client/index.html.js");
require("./client/index.ng.html");
require("./client/routes.js");
require("./modelos/alumnos.js");
require("./modelos/categorias.js");
require("./modelos/departamentos.js");
require("./modelos/libros.js");
require("./modelos/maestros.js");
require("./modelos/materias.js");
require("./modelos/planEstudio.js");
require("./modelos/programasEducativos.js");
require("./modelos/unidades.js");