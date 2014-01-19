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
	this.file = goog.dom.getElement('file');
	this.event_id = goog.dom.getElement('event_id');
	this.user_email = goog.dom.getElement('user_email');
	this.key = goog.dom.getElement('key');
	this.upload_form = goog.dom.getElement('upload_form');

	this.login_link = goog.dom.getElement('backbutton');
	this.photolist = goog.dom.getElement('photolist');
	this.cameraButton = goog.dom.getElement('camerabuttonwrapper');
}