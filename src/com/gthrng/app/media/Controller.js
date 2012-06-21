goog.provide('com.gthrng.media.Controller')
goog.require('com.gthrng.shared_lib.Controller');

goog.require('com.gthrng.MediaItemSoy');    
goog.require('com.gthrng.globals');    
goog.require('com.gthrng.utils.formatters');    
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
com.gthrng.media.Controller = function(modelClass, viewClass){
	
	com.gthrng.shared_lib.Controller.call(this, modelClass, viewClass);
	
	var owner = this;
	var pushCallback = function(data){
		console.log("this.pushCallback > ");
		owner.refresh();
	};
	this.pushCallback = pushCallback;
	
	this.mediaService = com.gthrng.globals.serviceLocator.getService('Media');
	                           
}


goog.inherits(com.gthrng.media.Controller, com.gthrng.shared_lib.Controller);

com.gthrng.media.Controller.prototype.activate = function(){
	// wire the form submit with our handler
	this.view.activate();
	
	
	goog.events.listen(this.mediaService["listMedia"], com.gthrng.shared_lib.events.RemoteServiceEventType.RESULT, this.onListMediaResult, false, this);
	goog.events.listen(this.mediaService["listMedia"], com.gthrng.shared_lib.events.RemoteServiceEventType.FAULT, this.onListMediaFault, false, this);
	
	var event = com.gthrng.globals.model.currentEvent.get()
	this.mediaService["listMedia"].call({"event_id": event['id']});
	
	this.channel = com.gthrng.globals.pusher["subscribe"](event['id']);
	

	
	this.channel["bind"]("new_media", this.pushCallback);
	
	goog.events.listen(this.view.login_link, goog.events.EventType.CLICK, this.loginClicked, false, this);
	goog.events.listen(this.view.cameraButton, goog.events.EventType.CLICK, this.captureImage, false, this);
	
	//com.gthrng.mAlert("Bracket style in Media");
}


com.gthrng.media.Controller.prototype.loginClicked = function(event) {
	com.gthrng.setCurrentState('events')
}

com.gthrng.media.Controller.prototype.refresh = function(){
	var event = com.gthrng.globals.model.currentEvent.get()
	this.mediaService["listMedia"].call({"event_id": event['id']});
}

com.gthrng.media.Controller.prototype.onListMediaResult = function(event){
	console.log("ListMedia result>")
	console.log(event.data);
	
	// RIGHT now this whole thing assumes that whenever we get the pictures we want to delete all the current ones and load the most recent	
	goog.dom.removeChildren(this.view.photolist);
	
	for (var i=0; i < event.data.length; i++) {
		var mediaObj = event.data[i];
		
		var media = {};
		media.url = "http://photos.gthrng.com/" + mediaObj["_id"]["$id"] + "_thumb.jpg";
		media.fullSizeURL = "http://photos.gthrng.com/" + mediaObj["_id"]["$id"] + ".jpg";
		
		if(typeof(mediaObj["user"]) == "object" && typeof(mediaObj["user"]["name"]) != "undefined"){
			media.owner = mediaObj["user"]["name"];
		}else{
			media.owner = "Unknown User";
		}
		
		media.when = com.gthrng.utils.formatters.friendlyFromTimestamp(mediaObj["uploaded"]);
		
		var html = com.gthrng.MediaItemSoy.getHTML(media);
		var element = goog.dom.createElement("div");
		element.innerHTML = html;
		goog.dom.appendChild(this.view.photolist, element);
	};
	
	var hr = goog.dom.createDom("hr", {"class":"clear"});
	goog.dom.appendChild(this.view.photolist, hr);
	
	var endoftimeline = goog.dom.createDom("div", {"id":"endoftimeline"});
	endoftimeline.innerHTML = "<p>This event is happening right now. Take some pictures!</p>";
	goog.dom.appendChild(this.view.photolist, endoftimeline);
	
}
com.gthrng.media.Controller.prototype.onListMediaFault = function(event){
	console.log("ListMedia fault>")
	console.log(event.data);
}

//==========================================================================
// PHONEGAP
//==========================================================================

com.gthrng.media.Controller.prototype.captureSuccess = function(mediaFiles) {
	//com.gthrng.mAlert("captureSuccess")
    var i, len;
    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
        this.uploadMediaFile(mediaFiles[i]);
    }       
}

// Called if something bad happens.
// 
com.gthrng.media.Controller.prototype.captureError = function(error) {
	//com.gthrng.mAlert("captureError")
    console.log(error)
    var msg = 'An error occurred during capture: ' + error.code;
    com.gthrng.mAlert(msg);
}

// A button will call this function
//
com.gthrng.media.Controller.prototype.captureImage = function() {
	//com.gthrng.mAlert("captureImage >")
    // Launch device camera application, 
    // allowing user to capture an image
    navigator["device"]["capture"]["captureImage"](this.captureSuccess, this.captureError, {
                                          limit: 1,
                                          quality: 50
                                          });
}

com.gthrng.media.Controller.prototype.uploadMediaFile = function(mediaFile){
	//com.gthrng.mAlert("uploadMediaFile")	
    path = mediaFile.fullPath;
    this.uploadByURI(path);
}

com.gthrng.media.Controller.prototype.uploadByURI = function(imageURI) {
    var options = new FileUploadOptions();
    options["fileKey"]="file";
    options["fileName"]=imageURI.substr(imageURI.lastIndexOf('/')+1);
    options["mimeType"]="image/jpeg";
    
    var params = new Object();
    params["key"] = "969490e925ae635134d0977aa6e74f9e";
    params["event_id"] = "62ad28eb85c44f36b1a6b755ab5a40ca";
    
    var user = com.gthrng.globals.model.user.get(); 
    params["user_email"] = user["email"]; 
    
    options["params"] = params;
    
    var ft = new FileTransfer();
    //ft.upload(imageURI, "http://talktu.me/upload", com.gthrng.win, com.gthrng.fail, options);
    ft["upload"](imageURI, "http://api.gthrng.com/gathering/uploadMediaFile", com.gthrng.globals.imageUploaded, com.gthrng.globals.uploadFail, options);
}

// Global functions
com.gthrng.globals.imageUploaded = function(r) {
	
	var mediaComponent = com.gthrng.globals.stateMap["media"]["component"];
	mediaComponent.refresh();
	
	//com.gthrng.mAlert("Image uploaded!")		
    console.log("Code = " + r["responseCode"]);
    console.log("Response = " + r["response"]);
    console.log("Sent = " + r["bytesSent"]);
}

com.gthrng.globals.uploadFail = function(error) {
	//com.gthrng.mAlert("Upload Error :(")		
    alert("An error has occurred: Code = " + error["code"]);
    console.log("upload error source " + error["source"]);
    console.log("upload error target " + error["target"]);
}
//==========================================================================
// PHONEGAP ENDS
//==========================================================================




com.gthrng.media.Controller.prototype.deactivate = function(){
	this.view.deactivate();
	
	this.channel["unbind"]("new_media", this.pushCallback);
	
	goog.events.unlisten(this.view.cameraButton, goog.events.EventType.CLICK, this.captureImage, false, this);
	goog.events.unlisten(this.view.login_link, goog.events.EventType.CLICK, this.loginClicked, false, this);
	goog.events.unlisten(this.mediaService["listMedia"], com.gthrng.shared_lib.events.RemoteServiceEventType.RESULT, this.onListMediaResult);
	goog.events.unlisten(this.mediaService["listMedia"], com.gthrng.shared_lib.events.RemoteServiceEventType.FAULT, this.onListMediaFault);
}