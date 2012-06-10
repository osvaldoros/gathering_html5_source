
goog.provide('com.gthrng.shared_lib.api.ServiceLocator');  
goog.require('com.gthrng.shared_lib.api.Service');            
goog.require('goog.events.EventTarget');    

/**
 * Creates a Generic Model (to be extended)
 * @constructor
 */
com.gthrng.shared_lib.api.ServiceLocator = function(servicesConfig) {
	console.log(servicesConfig)    
	this.dispatchMap = {};
	this.servicesConfig = servicesConfig;
	this.services = {};
	goog.events.EventTarget.call(this);   
} 
goog.inherits(com.gthrng.shared_lib.api.ServiceLocator, goog.events.EventTarget);    
           
/**
 */
com.gthrng.shared_lib.api.ServiceLocator.prototype.getService = function(serviceName) {
	//console.log('getService = ' + serviceName);
	var service;
	
	if(typeof(this.services[serviceName]) != 'undefined'){
		//console.log('a')
		//console.log('Service '+serviceName+' already exists, returning it')
		service = this.services[serviceName];
	}else{
		//console.log('b')
		//console.log(this.servicesConfig)
		if(typeof(this.servicesConfig[serviceName]) != 'undefined'){
			//console.log('c')
			//console.log('Creating new service '+serviceName+', returning it')
			var serviceConfig = this.servicesConfig[serviceName];
			serviceConfig["name"] = serviceName;
			service = new com.gthrng.shared_lib.api.Service(serviceConfig);
			this.services[serviceName] = service;
		}
	}
	
	//console.log('d')
	if(typeof(service) == 'undefined'){
		console.log("ERROR: Service '" + serviceName + "' not found");
	}
	
    return service;
	
  
}  