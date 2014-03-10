goog.provide('com.gthrng.signup.Controller')
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
com.gthrng.signup.Controller = function(modelClass, viewClass){
	
	com.gthrng.shared_lib.Controller.call(this, modelClass, viewClass);
	
	this.authService = com.gthrng.globals.serviceLocator.getService('Auth');
	
}


goog.inherits(com.gthrng.signup.Controller, com.gthrng.shared_lib.Controller);

com.gthrng.signup.Controller.prototype.activate = function(){
	// wire the form submit with our handler
	this.view.activate();
	var owner = this;
	this.view.signupForm.onsubmit = function(event){
		event.preventDefault();
		return owner.submitForm(event);
	}

	var invitationCode = com.gthrng.globals.urlUtils.getParam("ic");
	if(typeof(invitationCode) == "string" && invitationCode != ""){
		invitationCode = invitationCode.toLowerCase();
		this.view.invitation_code.value = invitationCode;
	}
	
	goog.events.listen(this.authService["signup"], com.gthrng.shared_lib.events.RemoteServiceEventType.RESULT, this.onSignupResult, false, this);
	goog.events.listen(this.authService["signup"], com.gthrng.shared_lib.events.RemoteServiceEventType.FAULT, this.onSignupFault, false, this);
	
	goog.events.listen(this.view.submitButton, goog.events.EventType.CLICK, this.submitClicked, false, this);
	goog.events.listen(this.view.login_link, goog.events.EventType.CLICK, this.loginClicked, false, this);
}


com.gthrng.signup.Controller.prototype.loginClicked = function(event) {
	com.gthrng.setCurrentState('login')
}


com.gthrng.signup.Controller.prototype.submitClicked = function(event) {
	this.submitForm();
}

com.gthrng.signup.Controller.prototype.submitForm = function(event) {
	var formData = goog.dom.forms.getFormDataString(this.view.signupForm);
	this.authService['signup'].call(formData);
	return false;
}


com.gthrng.signup.Controller.prototype.onSignupResult = function(event){
	console.log("Signup result>")
	console.log(event.data);
	com.gthrng.globals.model.user.set(event.data.result);
	com.gthrng.setCurrentState('events')
}
com.gthrng.signup.Controller.prototype.onSignupFault = function(event){
	console.log("Signup fault>")
	console.log(event.data);
}

com.gthrng.signup.Controller.prototype.deactivate = function(){
	this.view.deactivate();
	goog.events.unlisten(this.authService["signup"], com.gthrng.shared_lib.events.RemoteServiceEventType.RESULT, this.onSignupResult);
	goog.events.unlisten(this.authService["signup"], com.gthrng.shared_lib.events.RemoteServiceEventType.FAULT, this.onSignupFault);
}