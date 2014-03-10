goog.provide('com.gthrng.signup.View')

goog.require('com.gthrng.shared_lib.View');  
goog.require('goog.dom');

/**
 *
 * @constructor
 **/
com.gthrng.signup.View = function(model) {  
	com.gthrng.shared_lib.View.call(this, model); 
	 
}

goog.inherits(com.gthrng.signup.View, com.gthrng.shared_lib.View);   
 

com.gthrng.signup.View.prototype.activate = function(){
	this.login_link = goog.dom.getElement('backbutton');
	this.submitButton = goog.dom.getElement('donebutton');
	this.signupForm = goog.dom.getElement('accountform');
	
	this.invitation_code = goog.dom.getElement('invitation_code');
	this.tos = goog.dom.getElement('tos');
}
