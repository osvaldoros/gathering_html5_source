goog.provide('com.gthrng.login.View')

goog.require('com.gthrng.shared_lib.View');  
goog.require('goog.dom');

/**
 *
 * @constructor
 **/
com.gthrng.login.View = function(model) {  
	com.gthrng.shared_lib.View.call(this, model); 
	 
	
}


goog.inherits(com.gthrng.login.View, com.gthrng.shared_lib.View);   


com.gthrng.login.View.prototype.activate = function(){
	this.signup_link = goog.dom.getElement('no_account_link');
	
	this.loginForm = goog.dom.getElement('loginform');
	this.email = goog.dom.getElement('email');
	this.password = goog.dom.getElement('password');
}
