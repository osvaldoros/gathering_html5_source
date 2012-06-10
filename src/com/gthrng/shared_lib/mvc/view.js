goog.provide('com.gthrng.shared_lib.View');
          
goog.require('com.gthrng.shared_lib.events.ModelEventType');  
goog.require('goog.events'); 

/**
 * Creates a Generic View (to be extended)   
 * @param model the model which this view reflects
 * @constructor
 */
com.gthrng.shared_lib.View = function(model) {  
	this.model = model; 
	     
	//Listen to model events     
	goog.events.listen(this.model, com.gthrng.shared_lib.events.ModelEventType.SET_ATTRIBUTE, this.modelUpdateHandler, false, this);
}                                                                                                 
      
/**
 * Internal Model Event Handler, takes the event and forwards it to onModelUpdate
 * @param event the ModelEvent that the model raised
 */
com.gthrng.shared_lib.View.prototype.modelUpdateHandler = function(event) {      
	this.onModelUpdate(event.attributeName , event.attributeValue);
}   


com.gthrng.shared_lib.View.prototype.activate = function(){
}

com.gthrng.shared_lib.View.prototype.deactivate = function(){
}    
   
/**
 * The model change handler to be overridden by the View implementation
 * @param attributeName the attribute that was changed
 * @param value the current value of the attribute
 */
com.gthrng.shared_lib.View.prototype.onModelUpdate = function(attributeName, value) {    
  //Implement me                                  
}