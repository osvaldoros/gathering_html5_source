goog.provide('com.gthrng.events.Controller')
goog.require('com.gthrng.shared_lib.Controller');

goog.require('com.gthrng.EventItemSoy');    
goog.require('com.gthrng.globals');    
goog.require('com.gthrng.shared_lib.api.ServiceLocator');  
goog.require('com.gthrng.shared_lib.api.Service');  
goog.require('com.gthrng.shared_lib.api.ServiceMethod');  
goog.require('com.gthrng.shared_lib.events.RemoteServiceEvent');
goog.require('com.gthrng.shared_lib.events.RemoteServiceEventType');

goog.require('goog.events');
goog.require('goog.dom');

/**
 * @param {Object} view
 * @param {Object} model
 * 
 * @constructor
 */
com.gthrng.events.Controller = function(modelClass, viewClass){
	
	com.gthrng.shared_lib.Controller.call(this, modelClass, viewClass);
	
	this.eventsService = com.gthrng.globals.serviceLocator.getService('Events');
	                           
}


goog.inherits(com.gthrng.events.Controller, com.gthrng.shared_lib.Controller);

com.gthrng.events.Controller.prototype.activate = function(){
	// wire the form submit with our handler
	this.view.activate();
	
	goog.events.listen(this.eventsService["listEventsUsersIsInvited"], com.gthrng.shared_lib.events.RemoteServiceEventType.RESULT, this.onListEventsResult, false, this);
	goog.events.listen(this.eventsService["listEventsUsersIsInvited"], com.gthrng.shared_lib.events.RemoteServiceEventType.FAULT, this.onListEventsFault, false, this);
	
	var user = com.gthrng.globals.model.user.get()
	
	this.eventsService["listEventsUsersIsInvited"].call({"email": user['email']});
	goog.events.listen(this.view.login_link, goog.events.EventType.CLICK, this.loginClicked, false, this);
}


com.gthrng.events.Controller.prototype.eventClicked = function(event) {
	var eventObj = this.getEventByElement(event.target);
	com.gthrng.globals.model.currentEvent.set(eventObj);
	com.gthrng.setCurrentState('media')
}

com.gthrng.events.Controller.prototype.getEventByElement = function(element) {
	var maxLoops = 20;
	var currentLoop = 0;
	do{
		for (var i=0; i < this.eventMap.length; i++) {
			var elem = this.eventMap[i].element;
			if(elem == element){
				return this.eventMap[i].event;
			}
		}
		element = element.parentNode;
		currentLoop++
	}while(element && element != document.body && currentLoop < maxLoops)
	return null;
}

com.gthrng.events.Controller.prototype.loginClicked = function(event) {
	com.gthrng.storage.localData.deleteObject("user");
	com.gthrng.setCurrentState('login')
}


com.gthrng.events.Controller.prototype.onListEventsResult = function(event){
	console.log("ListEvents result>")
	console.log(event.data);
	this.clearEvents();
	
	var previousState = com.gthrng.globals.model.prevState.get();
	console.log("prevState = " + previousState);
	
	if(event.data.length == 1 && previousState != "media"){
			var single_eventObj = event.data[0];
			
			var single_evt = {};
			single_evt.name = single_eventObj["name"];
			single_evt.eventWhen = single_eventObj["eventWhen"];
			single_evt.id = single_eventObj["id"];
			
			com.gthrng.globals.model.currentEvent.set(single_eventObj);
			com.gthrng.setCurrentState('media')
	}else{
		for (var i=0; i < event.data.length; i++) {
			var eventObj = event.data[i];
			
			var evt = {};
			evt.name = eventObj["name"];
			evt.eventWhen = eventObj["eventWhen"];
			evt.id = eventObj["id"];
			
			var html = com.gthrng.EventItemSoy.getHTML(evt);
			var element = goog.dom.createElement("div");
			goog.events.listen(element, goog.events.EventType.CLICK, this.eventClicked, false, this);
			element.innerHTML = html;
			goog.dom.flattenElement(element);
			this.eventMap.push({element: element, event:evt})
			goog.dom.appendChild(this.view.eventlist, element);
		};
	}
	
}


com.gthrng.events.Controller.prototype.onListEventsFault = function(event){
	console.log("ListEvents fault>")
	console.log(event.data);
}

com.gthrng.events.Controller.prototype.clearEvents = function(event){
	if(typeof(this.eventMap) != "undefined"){
		for (var i=0; i < this.eventMap.length; i++) {
			var element = this.eventMap[i].element;
			goog.events.unlisten(element, goog.events.EventType.CLICK, this.eventClicked);
		}
	}
	
	this.eventMap = [];
}

com.gthrng.events.Controller.prototype.deactivate = function(){
	this.view.deactivate();
	this.clearEvents();
	goog.events.unlisten(this.view.login_link, goog.events.EventType.CLICK, this.loginClicked, false, this);
	goog.events.unlisten(this.eventsService["listEventsUsersIsInvited"], com.gthrng.shared_lib.events.RemoteServiceEventType.RESULT, this.onListEventsResult);
	goog.events.unlisten(this.eventsService["listEventsUsersIsInvited"], com.gthrng.shared_lib.events.RemoteServiceEventType.FAULT, this.onListEventsFault);
}