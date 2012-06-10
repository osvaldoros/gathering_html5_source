goog.provide('com.gthrng.Model');
goog.require('com.gthrng.shared_lib.Model');    
/**
 *
 * @constructor
 **/
com.gthrng.Model = function() {     
	com.gthrng.shared_lib.Model.call(this);    
	 
	var self = this;
	this.state = this.addProperty('state', 'login', null, function(value) { self.prevState.set(self.state.get()); return value; });  
	this.user = this.addProperty('user', {}, null, null);            
	this.currentEvent = this.addProperty('currentEvent', {}, null, null);            
	this.prevState = this.addProperty('prevState', null, null, null);            
	
}

goog.inherits(com.gthrng.Model, com.gthrng.shared_lib.Model);





