goog.provide('com.gthrng.shared_lib.utils.CallBackManager');
goog.require('goog.events.EventTarget');    


/**
 * @constructor
 */
com.gthrng.shared_lib.utils.CallBackManager = function() {
	this.dispatchMap = {};
	goog.events.EventTarget.call(this); 
	this.callBackComplete = this._callBackComplete.bind(this);
} 
goog.inherits(com.gthrng.shared_lib.utils.CallBackManager, goog.events.EventTarget);    
           
/**
* 
* If an item matches one of the items in the callbackItems it will remove it from the array until there are no items left at which point it will invoke the allCompleteHandler
*
*/
com.gthrng.shared_lib.utils.CallBackManager.prototype._callBackComplete = function(item) {
	for (var i = this.callbackItems.length - 1; i >= 0; i--) {
		if(item == this.callbackItems[i]){
			this.callbackItems.splice(i, 1);
			break;
		}
	};

	if(this.callbackItems.length == 0){
		if(typeof(this.allCompleteHandler) == "function") this.allCompleteHandler();
	}
}

/**
* Given an array of 'items' it waits until it has a callBack for each item, then it calls the allCompleteHandler
*
*
*/
com.gthrng.shared_lib.utils.CallBackManager.prototype.waitForAllCallbacks = function(callbackItems, allCompleteHandler) {

	this.callbackItems =  []
	for (var i = callbackItems.length - 1; i >= 0; i--) {
		var file = callbackItems[i];
		this.callbackItems.push(file);
	};
	this.allCompleteHandler = allCompleteHandler;
}
