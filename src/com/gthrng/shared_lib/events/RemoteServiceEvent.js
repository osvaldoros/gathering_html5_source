goog.provide('com.gthrng.shared_lib.events.RemoteServiceEventType');
goog.provide('com.gthrng.shared_lib.events.RemoteServiceEvent');

goog.require('goog.events');
goog.require('goog.events.Event');   
goog.require('goog.events.EventType');

/**
* Event Types that are fired by Services   
* @enum {string}
*/
com.gthrng.shared_lib.events.RemoteServiceEventType = {
    RESULT: 'result',
	FAULT: 'fault'
};

/**
* Class for a RemoteServiceEvent        
* @constructor
* @extends {goog.events.Event}
*/
com.gthrng.shared_lib.events.RemoteServiceEvent = function(type, data) {
    this.data = data;
    goog.events.Event.call(this, type);
};
goog.inherits(com.gthrng.shared_lib.events.RemoteServiceEvent, goog.events.Event);