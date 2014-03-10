
goog.provide('com.gthrng.shared_lib.api.ServiceMethod');  

goog.require('goog.events.EventTarget');    
goog.require('com.gthrng.shared_lib.events.RemoteServiceEventType');
goog.require('com.gthrng.shared_lib.events.RemoteServiceEvent');
goog.require('goog.net.XhrIo');
goog.require('goog.json');

/**
 * 
 * A ServiceMethod object is added to a service, so that listeners can be added to particular methods
 * 
 * methods are added automatically during service construction via a ServiceConfig node. To work with a service method follow this form:
 * 
 * goog.events.listen(service.method, eventType, handler)
 * 
 * service.method.call(paramsObject)
 * 
 * @constructor
 */
com.gthrng.shared_lib.api.ServiceMethod = function(methodConfig) {         
	this.dispatchMap = {};
	this.methodConfig = methodConfig;
	this.services = {};
	
	// Currently every method has its own instance of XhrIo.
	// TODO: Look into using XhrIo pools to limite the proliferation of instances. However it is important not to mix event handlers
	// http://code.google.com/closure/library/docs/xhrio.html
	this.io = new goog.net.XhrIo();
	goog.events.listen(this.io, goog.net.EventType.COMPLETE, this.onResponse, false, this); 


	// this.io.upload.addEventListener(
	// 	"progress", 
	// 	function(e) {
	// 		if (e.lengthComputable) {
	// 			var percentage = Math.round((e.loaded * 100) / e.total);
	// 			console.log(percentage)
	// 		}
	// 	}, 
	// 	false
	// );
	
	goog.events.EventTarget.call(this);   
} 
goog.inherits(com.gthrng.shared_lib.api.ServiceMethod, goog.events.EventTarget);    
           
/**
 * 
 * Performs the actual Ajax call
 * 
 */
com.gthrng.shared_lib.api.ServiceMethod.prototype.call = function(params, headers, defaultContentType) {
	console.log('ServiceMethod [' + this.methodConfig["name"] + '].call >');
	var url = this.replaceParamsInURL(this.methodConfig["url"], this.methodConfig["requiredURLParams"], params);
	this.io.send(url, this.methodConfig["httpMethod"], params, headers, defaultContentType);
}  

/**
 * 
 * Analyze the response from the ajax call and dispatch either a Result event or a Fault event
 * 
 */
com.gthrng.shared_lib.api.ServiceMethod.prototype.onResponse = function(event) {
	//console.log('ServiceMethod [' + this.methodConfig.name + '].response >');
  	var status = event.target.getStatus();
	//console.log(status);
	
	var eventToDispatch
	if(status > 399 || status < 200){
		//console.log(event);
		eventToDispatch = new com.gthrng.shared_lib.events.RemoteServiceEvent(com.gthrng.shared_lib.events.RemoteServiceEventType.FAULT, event); 
	}else{
		var responseObj = event.target.getResponseJson();
		//console.log(responseObj);
		if(typeof responseObj.success != 'undefined' && responseObj.success == false){
			console.log(responseObj.message)
			eventToDispatch = new com.gthrng.shared_lib.events.RemoteServiceEvent(com.gthrng.shared_lib.events.RemoteServiceEventType.FAULT, responseObj); 
		}else{
			eventToDispatch = new com.gthrng.shared_lib.events.RemoteServiceEvent(com.gthrng.shared_lib.events.RemoteServiceEventType.RESULT, responseObj); 
		}
	}
	       
	goog.events.dispatchEvent(this, eventToDispatch);  
}


/**
 * 
 *loop over the required params array and substitute them one at a time in the url
 * 
 */
com.gthrng.shared_lib.api.ServiceMethod.prototype.replaceParamsInURL = function(url, requiredParamsArray, paramsObj){
	for (var i = requiredParamsArray.length - 1; i >= 0; i--){
		var reqParam = requiredParamsArray[i];
		var urlArray = url.split("{" + reqParam + "}");
		if(typeof(paramsObj[reqParam]) != 'undefined'){
			url = urlArray.join( paramsObj[reqParam] );
		}else{
			console.log("ERROR > Missing required URL param '" + reqParam + "' for method '" + this.methodConfig.name + "'");
		}
	};
	
	return url;
}

