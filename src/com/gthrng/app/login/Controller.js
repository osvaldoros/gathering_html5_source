goog.provide('com.gthrng.login.Controller')
goog.require('com.gthrng.shared_lib.Controller');

goog.require('com.gthrng.globals');    
goog.require('com.gthrng.shared_lib.api.ServiceLocator');  
goog.require('com.gthrng.shared_lib.api.Service');  
goog.require('com.gthrng.shared_lib.api.ServiceMethod');  
goog.require('com.gthrng.shared_lib.events.RemoteServiceEvent');
goog.require('com.gthrng.shared_lib.events.RemoteServiceEventType');

goog.require('goog.dom.forms');
goog.require('goog.events');

/**
 * @param {Object} view
 * @param {Object} model
 * 
 * @constructor
 */
com.gthrng.login.Controller = function(modelClass, viewClass){
	
	com.gthrng.shared_lib.Controller.call(this, modelClass, viewClass);
	
	
	this.authService = com.gthrng.globals.serviceLocator.getService('Auth');
}

goog.inherits(com.gthrng.login.Controller, com.gthrng.shared_lib.Controller);


com.gthrng.login.Controller.prototype.activate = function(){
	// wire the form submit with our handler
	this.view.activate();
	var owner = this;
	this.view.loginForm.onsubmit = function(event){
		event.preventDefault();
		return owner.submitForm(event);
	}
	
	goog.events.listen(this.view.signup_link, goog.events.EventType.CLICK, this.signupClicked, false, this);
	goog.events.listen(this.authService["login"], com.gthrng.shared_lib.events.RemoteServiceEventType.RESULT, this.onLoginResult, false, this);
	goog.events.listen(this.authService["login"], com.gthrng.shared_lib.events.RemoteServiceEventType.FAULT, this.onLoginFault, false, this);
}

com.gthrng.login.Controller.prototype.signupClicked = function(event) {
	com.gthrng.setCurrentState('signup')
}

com.gthrng.login.Controller.prototype.submitForm = function(event) {
	var formData = goog.dom.forms.getFormDataString(this.view.loginForm);
	this.authService['login'].call(formData);
	return false;
}

com.gthrng.login.Controller.prototype.onLoginResult = function(event){
	console.log("Login result>")
	console.log(event.data);
	com.gthrng.globals.model.user.set(event.data.result);
	com.gthrng.setCurrentState('events')
}
com.gthrng.login.Controller.prototype.onLoginFault = function(event){
	console.log("Login fault>")
	console.log(event.data);
	// TODO: pop alert here "Invalid user/pass "
	
}

com.gthrng.login.Controller.prototype.deactivate = function(){
	this.view.deactivate();
	goog.events.unlisten(this.authService["login"], com.gthrng.shared_lib.events.RemoteServiceEventType.RESULT, this.onLoginResult);
	goog.events.unlisten(this.authService["login"], com.gthrng.shared_lib.events.RemoteServiceEventType.FAULT, this.onLoginFault);
	
}
