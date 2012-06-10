goog.provide('com.gthrng.events.View')

goog.require('com.gthrng.shared_lib.View');  
goog.require('goog.dom');

/**
 *
 * @constructor
 **/
com.gthrng.events.View = function(model) {  
	com.gthrng.shared_lib.View.call(this, model); 
	 
	this.playerContainer = goog.dom.getElement('player-container');
}

goog.inherits(com.gthrng.events.View, com.gthrng.shared_lib.View);   
 
com.gthrng.events.View.prototype.activate = function(){
	this.login_link = goog.dom.getElement('backbutton');
	this.eventlist = goog.dom.getElement('eventlist');
}