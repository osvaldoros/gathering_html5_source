goog.provide('com.gthrng');     
                                            
goog.require('com.gthrng.LoginSoy');
goog.require('com.gthrng.EventsSoy');
goog.require('com.gthrng.MediaSoy');
goog.require('com.gthrng.SignupSoy');

goog.require('com.gthrng.globals'); 
goog.require('com.gthrng.Model');

// Login
goog.require('com.gthrng.login.Controller');
goog.require('com.gthrng.login.Model');
goog.require('com.gthrng.login.View');
// Signup
goog.require('com.gthrng.signup.Controller');
goog.require('com.gthrng.signup.Model');
goog.require('com.gthrng.signup.View');
// Events
goog.require('com.gthrng.events.Controller');
goog.require('com.gthrng.events.Model');
goog.require('com.gthrng.events.View');
// Media
goog.require('com.gthrng.media.Controller');
goog.require('com.gthrng.media.Model');
goog.require('com.gthrng.media.View');


goog.require('com.gthrng.shared_lib.api.ServiceLocator');  

goog.require('goog.dom');
goog.require('goog.soy');



/**
 * Creates a testing environment   
 * @constructor
 */
com.gthrng.main = function(configObj) {
	
	
	//console.log('main')
	com.gthrng.globals.model = new com.gthrng.Model();
	//console.log(configObj)
	com.gthrng.globals.serviceLocator = new com.gthrng.shared_lib.api.ServiceLocator(configObj["services"]);
	//console.log('serviceLocator')
	goog.events.listen(com.gthrng.globals.model, com.gthrng.shared_lib.events.ModelEventType.SET_ATTRIBUTE, com.gthrng.onGlobalModelChange);
	
	// create components that will handle each state
	var loginComponent = new com.gthrng.login.Controller(com.gthrng.login.Model, com.gthrng.login.View);
	var signupComponent = new com.gthrng.signup.Controller(com.gthrng.signup.Model, com.gthrng.signup.View);
	var eventsComponent = new com.gthrng.events.Controller(com.gthrng.events.Model, com.gthrng.events.View);
	var mediaComponent = new com.gthrng.media.Controller(com.gthrng.media.Model, com.gthrng.media.View);
	
	
	com.gthrng.globals.stateMap = {
		'login': {"template" : com.gthrng.LoginSoy, "component" : loginComponent},
		'signup':{"template" : com.gthrng.SignupSoy, "component" : signupComponent},
		'events':{"template" : com.gthrng.EventsSoy, "component" : eventsComponent},
		'media':{"template" : com.gthrng.MediaSoy, "component" : mediaComponent}
	}
	
	com.gthrng.globals.setCurrentState = com.gthrng.setCurrentState;
	
	com.gthrng.setCurrentState('login');
	
};

com.gthrng.setCurrentState = function(state){
	com.gthrng.globals.model.state.set(state);
}

com.gthrng.mAlert = function(msg){
	if(typeof(navigator["notification"]) != "undefined" && typeof(navigator["notification"]["alert"]) != "undefined"){
		navigator["notification"]["alert"](msg, null, 'Phone-gap alert');
	}
}


com.gthrng.onGlobalModelChange = function(event){
	if(event.attributeName == 'state'){
		console.log('state has changed!')
		
		// remove the previous HTML element if exists
		var state_container = goog.dom.getElementByClass('state_container');
		if(state_container){
			goog.dom.removeNode(state_container);
		}
		
		// deactivate the previous state component
		if(typeof com.gthrng.currentStateComponent != 'undefined'){
			com.gthrng.currentStateComponent.deactivate();
			window["cleanScrolling"]();
		}
		
		// render the new template
		var template = com.gthrng.globals.stateMap[event.attributeValue]["template"];
		
		
		var model = {
			user: com.gthrng.globals.model.user.get(),
			event: com.gthrng.globals.model.currentEvent.get()
		}
		
		var HTML = template.getHTML(model);
		
		
		var params = {
			"class":"container state_container"
		}
		
		if(event.attributeValue == "login"){
			params.id = "login";
		}
		
		var element = goog.dom.createDom("div", params);
		element.innerHTML = HTML;
		goog.dom.flattenElement(element);
		goog.dom.appendChild(document.body, element);
		
		
		if(event.attributeValue == "login"){
			window["scrollLoginScreen"]();
		}else{
			window["scrollOtherScreens"]();
		}
		
		// activate the new state component
		com.gthrng.currentStateComponent = com.gthrng.globals.stateMap[event.attributeValue]["component"];
		com.gthrng.currentStateComponent.activate();
		
	}
}

// this is so we can call main from the outside
window["gthrng_main"] = com.gthrng.main;
window["gthrng_setCurrentState"] = com.gthrng.setCurrentState;




