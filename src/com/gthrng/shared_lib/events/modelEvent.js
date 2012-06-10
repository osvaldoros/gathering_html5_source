goog.provide('com.gthrng.shared_lib.events.ModelEventType');
goog.provide('com.gthrng.shared_lib.events.ModelEvent');

goog.require('goog.events');
goog.require('goog.events.Event');   
goog.require('goog.events.EventType');

/**
* Event Types that are fired by ModelEvent Object   
* @enum {string}
*/
com.gthrng.shared_lib.events.ModelEventType = {
    SET_ATTRIBUTE: 'set_attribute',
	GET_ATTRIBUTE: 'get_attribute'
};

/**
* Class for a Model Event object        
* @constructor
* @extends {goog.events.Event}
*/
com.gthrng.shared_lib.events.ModelEvent = function(type, attributeName, attributeValue) {
    this.attributeName = attributeName;
	this.attributeValue = attributeValue;
    goog.events.Event.call(this, type);
};
goog.inherits(com.gthrng.shared_lib.events.ModelEvent, goog.events.Event);