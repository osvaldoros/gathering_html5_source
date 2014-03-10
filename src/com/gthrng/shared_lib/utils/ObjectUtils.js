goog.provide('com.gthrng.shared_lib.utils.ObjectUtils');
goog.require('goog.events.EventTarget');    


/**
 * @constructor
 */
com.gthrng.shared_lib.utils.ObjectUtils = function() {
	this.dispatchMap = {};
	goog.events.EventTarget.call(this); 
} 
goog.inherits(com.gthrng.shared_lib.utils.ObjectUtils, goog.events.EventTarget);    
           

com.gthrng.shared_lib.utils.ObjectUtils.prototype.isObject = function(value) {
	return (typeof(value) == "object" && value != null)
}

com.gthrng.shared_lib.utils.ObjectUtils.prototype.isNumeric = function(value) {
	return !isNaN(parseFloat(value)) && isFinite(value);
}

com.gthrng.shared_lib.utils.ObjectUtils.prototype.isNonEmptyString = function(value) {
	return (typeof(value) == "string" && value != "");
}

com.gthrng.shared_lib.utils.ObjectUtils.prototype.isArray = function(value) {
	return value && (value instanceof Array || typeof value == "array"); // Boolean
}

