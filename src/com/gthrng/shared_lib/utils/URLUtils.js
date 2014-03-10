goog.provide('com.gthrng.shared_lib.utils.URLUtils');
goog.require('goog.events.EventTarget');    


/**
 * @constructor
 */
com.gthrng.shared_lib.utils.URLUtils = function() {
	this.dispatchMap = {};
	goog.events.EventTarget.call(this); 

	this._urlParams = this.getUrlVars();
} 
goog.inherits(com.gthrng.shared_lib.utils.URLUtils, goog.events.EventTarget);    
           
/**
* 
* Parses the url search and returns it as an object with key-value pairs
*
*/
com.gthrng.shared_lib.utils.URLUtils.prototype.getUrlVars = function() {
	  var vars = [], hash;
	  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	  for(var i = 0; i < hashes.length; i++){
	      hash = hashes[i].split('=');
	      //vars.push(hash[0]);
	      vars[hash[0]] = hash[1];
	  }
	  return vars;
}

com.gthrng.shared_lib.utils.URLUtils.prototype.getParams = function() {
	return this._urlParams;
}

com.gthrng.shared_lib.utils.URLUtils.prototype.getParam = function(name) {
	if(this._urlParams && this._urlParams.hasOwnProperty(name)){
		return this._urlParams[name];
	}else{
		return null;
	}
}
