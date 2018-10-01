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
var Accounts = Package['accounts-base'].Accounts;
var $ = Package.jquery.$;
var jQuery = Package.jquery.jQuery;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/zuuk_stale-session/packages/zuuk_stale-session.js                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
(function () {                                                                                                         // 1
                                                                                                                       // 2
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/zuuk:stale-session/client.js                                                                            //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
//                                                                                                                  // 1
// Client side activity detection for the session timeout                                                           // 2
// - depends on jquery                                                                                              // 3
//                                                                                                                  // 4
// Meteor settings:                                                                                                 // 5
// - staleSessionHeartbeatInterval: interval (in ms) at which activity heartbeats are sent up to the server         // 6
// - staleSessionActivityEvents: the jquery events which are considered indicator of activity e.g. in an on() call. // 7
//                                                                                                                  // 8
var heartbeatInterval = Meteor.settings && Meteor.settings.public && Meteor.settings.public.staleSessionHeartbeatInterval || (3*60*1000); // 3mins
var activityEvents = Meteor.settings && Meteor.settings.public && Meteor.settings.public.staleSessionActivityEvents || 'mousemove click keydown';
                                                                                                                    // 11
var activityDetected = false;                                                                                       // 12
                                                                                                                    // 13
Meteor.startup(function() {                                                                                         // 14
                                                                                                                    // 15
    //                                                                                                              // 16
    // periodically send a heartbeat if activity has been detected within the interval                              // 17
    //                                                                                                              // 18
    Meteor.setInterval(function() {                                                                                 // 19
        if (Meteor.userId() && activityDetected) {                                                                  // 20
            Meteor.call('heartbeat');                                                                               // 21
            activityDetected = false;                                                                               // 22
        }                                                                                                           // 23
    }, heartbeatInterval);                                                                                          // 24
                                                                                                                    // 25
    //                                                                                                              // 26
    // detect activity and mark it as detected on any of the following events                                       // 27
    //                                                                                                              // 28
    $(document).on(activityEvents, function() {                                                                     // 29
       activityDetected = true;                                                                                     // 30
    });                                                                                                             // 31
});                                                                                                                 // 32
                                                                                                                    // 33
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       // 43
}).call(this);                                                                                                         // 44
                                                                                                                       // 45
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['zuuk:stale-session'] = {};

})();
