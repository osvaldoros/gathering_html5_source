//Note, to reference the properties please use this['propertyname']
//Using this.propertyname breaks in advanced mode closure compiler

goog.provide('com.gthrng.shared_lib.Model');             
       
goog.require('com.gthrng.shared_lib.events.ModelEventType');
goog.require('com.gthrng.shared_lib.events.ModelEvent');    
goog.require('goog.events.EventTarget');    

goog.require('com.gthrng.shared_lib.VBScript');      
/**
 * Creates a Generic Model (to be extended)
 * @constructor
 */
com.gthrng.shared_lib.Model = function() {         
	this.dispatchMap = {};
	goog.events.EventTarget.call(this);   
} 
goog.inherits(com.gthrng.shared_lib.Model, goog.events.EventTarget);    
           
/**
 * Add a property to this model (writes setters and getters for it)
 * @param event passed in event object        
 * @param event passed in event object
 */
com.gthrng.shared_lib.Model.prototype.addProperty = function(propertyName, defaultValue, getCallback, setCallback) {    
	var myself = this;
	var property = {};
	myself[propertyName+"_"] = (defaultValue == undefined ? null : defaultValue);
	                                       
	//This browser supports the __defineGetter__ function
	//Override setters and getters    
   property.get = function(){ 
		var returnValue = '';     

		if (getCallback != undefined && getCallback != null) {
			returnValue = getCallback(myself[propertyName+"_"]);
		} else {           
			returnValue = myself[propertyName+"_"];
		}   
		
		//var eventToDispatch = new com.gthrng.shared_lib.events.ModelEvent(com.gthrng.shared_lib.events.ModelEventType.GET_ATTRIBUTE, propertyName, returnValue);  
		//goog.events.dispatchEvent(this, eventToDispatch);      

		return returnValue;
    }            

	property.set = function(value){
		if (setCallback == 'readonly') {
			//Do nothing  
		} else if (setCallback != undefined && setCallback != null) {
			myself[propertyName+"_"] = setCallback(value);   
		} else {
			myself[propertyName+"_"] = value; 
		}                                               

		var getValue = property.get();
		if (myself.dispatchMap[propertyName] != getValue) {  
			var eventToDispatch = new com.gthrng.shared_lib.events.ModelEvent(com.gthrng.shared_lib.events.ModelEventType.SET_ATTRIBUTE, propertyName, getValue);        
			goog.events.dispatchEvent(myself, eventToDispatch);  
			myself.dispatchMap[propertyName] = getValue; 
		}  
    }
                  
    myself[propertyName] = property;

    return property;
  
}  