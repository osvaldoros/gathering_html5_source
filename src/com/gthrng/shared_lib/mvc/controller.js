goog.provide('com.gthrng.shared_lib.Controller');

goog.require('goog.events.EventTarget');

/**
 * Creates a Generic Controller (to be extended)   
 * @param model the model which this view reflects
 * @constructor
 */
com.gthrng.shared_lib.Controller = function(modelClass, viewClass) { 
	goog.events.EventTarget.call(this); 
	
	this.model = new modelClass();
	this.view = new viewClass(this.model);
	
	goog.events.listen(this.model, com.gthrng.shared_lib.events.ModelEventType.SET_ATTRIBUTE, this.modelUpdateHandler, false, this);
	
}

goog.inherits(com.gthrng.shared_lib.Controller, goog.events.EventTarget);   

/**
 * Internal Model Event Handler, takes the event and forwards it to onModelUpdate
 * @param event the ModelEvent that the model raised
 */
com.gthrng.shared_lib.Controller.prototype.modelUpdateHandler = function(event) {  
	this.onModelUpdate(event.attributeName , event.attributeValue);
}  



com.gthrng.shared_lib.Controller.prototype.activate = function(){
	this.view.activate()
}

com.gthrng.shared_lib.Controller.prototype.deactivate = function(){
	this.view.deactivate()
}


/**
 * The model change handler to be overridden by the Controller implementation
 * @param attributeName the attribute that was changed
 * @param value the current value of the attribute
 */
com.gthrng.shared_lib.Controller.prototype.onModelUpdate = function(attributeName, value) {  
  //Implement me                                  
}
