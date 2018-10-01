(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var Accounts = Package['accounts-base'].Accounts;

(function(){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/zuuk_stale-session/packages/zuuk_stale-session.js        //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/zuuk:stale-session/server.js                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
//                                                                                                                     // 1
// Server side activity detection for the session timeout                                                              // 2
//                                                                                                                     // 3
// Meteor settings:                                                                                                    // 4
// - staleSessionInactivityTimeout: the amount of time (in ms) after which, if no activity is noticed, a session will be considered stale
// - staleSessionPurgeInterval: interval (in ms) at which stale sessions are purged i.e. found and forcibly logged out // 6
//                                                                                                                     // 7
var staleSessionPurgeInterval = Meteor.settings && Meteor.settings.public && Meteor.settings.public.staleSessionPurgeInterval || (1*60*1000); // 1min
var inactivityTimeout = Meteor.settings && Meteor.settings.public && Meteor.settings.public.staleSessionInactivityTimeout || (30*60*1000); // 30mins
                                                                                                                       // 10
//                                                                                                                     // 11
// provide a user activity heartbeat method which stamps the user record with a timestamp of the last                  // 12
// received activity heartbeat.                                                                                        // 13
//                                                                                                                     // 14
Meteor.methods({                                                                                                       // 15
    heartbeat: function(options) {                                                                                     // 16
        if (!this.userId) { return; }                                                                                  // 17
        var user = Meteor.users.findOne(this.userId);                                                                  // 18
        if (user) {                                                                                                    // 19
            Meteor.users.update(user._id, {$set: {heartbeat: new Date()}});                                            // 20
        }                                                                                                              // 21
    }                                                                                                                  // 22
});                                                                                                                    // 23
                                                                                                                       // 24
                                                                                                                       // 25
//                                                                                                                     // 26
// periodically purge any stale sessions, removing their login tokens and clearing out the stale heartbeat.            // 27
//                                                                                                                     // 28
Meteor.setInterval(function() {                                                                                        // 29
    var now = new Date(), overdueTimestamp = new Date(now-inactivityTimeout);                                          // 30
    Meteor.users.update({heartbeat: {$lt: overdueTimestamp}},                                                          // 31
                        {$set: {'services.resume.loginTokens': []},                                                    // 32
                         $unset: {heartbeat:1}},                                                                       // 33
                        {multi: true});                                                                                // 34
}, staleSessionPurgeInterval);                                                                                         // 35
                                                                                                                       // 36
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);

///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['zuuk:stale-session'] = {};

})();
