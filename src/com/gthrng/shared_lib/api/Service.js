
goog.provide('com.gthrng.shared_lib.api.Service');             
goog.require('com.gthrng.shared_lib.api.ServiceMethod');             
goog.require('goog.events.EventTarget');    



/**
 * Creates a Service that allows us to call methods on it and translates them into ajax calls matching a RESTful api
 * @constructor
 */
com.gthrng.shared_lib.api.Service = function(serviceConfig) {         
	this.dispatchMap = {};
	this.serviceConfig = serviceConfig;
	
	for(var p in serviceConfig["methods"]){
		var methodConfig = serviceConfig["methods"][p];
		console.log('found method = ' + methodConfig["name"]);
		this.addMethod(methodConfig)
	}
	 
	goog.events.EventTarget.call(this);  
	
} 
goog.inherits(com.gthrng.shared_lib.api.Service, goog.events.EventTarget);    
           



/**
 */
com.gthrng.shared_lib.api.Service.prototype.addMethod = function(methodConfig){
	if(typeof(this[methodConfig["name"]]) != 'undefined'){
		console.log("WARNING > Duplicate method '" + methodConfig["name"] + "' for service '" + this.serviceConfig["name"] + "'. IGNORED!");
		return;
	}
	console.log('adding method = ' + methodConfig["name"]);
	this[methodConfig["name"]] = new com.gthrng.shared_lib.api.ServiceMethod(methodConfig);
	
}