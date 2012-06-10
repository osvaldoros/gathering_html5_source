goog.provide('com.gthrng.media.View')

goog.require('com.gthrng.shared_lib.View');  
goog.require('goog.dom');

/**
 *
 * @constructor
 **/
com.gthrng.media.View = function(model) {  
	com.gthrng.shared_lib.View.call(this, model); 
}

goog.inherits(com.gthrng.media.View, com.gthrng.shared_lib.View);   
 
com.gthrng.media.View.prototype.activate = function(){
	this.login_link = goog.dom.getElement('backbutton');
	this.photolist = goog.dom.getElement('photolist');
	this.cameraButton = goog.dom.getElement('camerabuttonwrapper');
}