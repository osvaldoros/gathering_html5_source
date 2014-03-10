goog.provide('com.gthrng.media.Controller')
goog.require('com.gthrng.shared_lib.Controller');

goog.require('com.gthrng.MediaItemSoy');    
goog.require('com.gthrng.globals');    
goog.require('com.gthrng.shared_lib.utils.formatters');    
goog.require('com.gthrng.shared_lib.utils.CallBackManager');    
goog.require('com.gthrng.shared_lib.api.ServiceLocator');  
goog.require('com.gthrng.shared_lib.graphics.ImageTransform');  
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

	this.imgTransform = new com.gthrng.shared_lib.graphics.ImageTransform();
	this.cbManaer = new com.gthrng.shared_lib.utils.CallBackManager();
	                           
}


goog.inherits(com.gthrng.media.Controller, com.gthrng.shared_lib.Controller);

com.gthrng.media.Controller.prototype.activate = function(){
	// wire the form submit with our handler
	this.view.activate();
	
	
	goog.events.listen(this.mediaService["listMedia"], com.gthrng.shared_lib.events.RemoteServiceEventType.RESULT, this.onListMediaResult, false, this);
	goog.events.listen(this.mediaService["listMedia"], com.gthrng.shared_lib.events.RemoteServiceEventType.FAULT, this.onListMediaFault, false, this);

	goog.events.listen(this.mediaService["uploadMedia"], com.gthrng.shared_lib.events.RemoteServiceEventType.RESULT, this.onUploadMediaResult, false, this);
	goog.events.listen(this.mediaService["uploadMedia"], com.gthrng.shared_lib.events.RemoteServiceEventType.FAULT, this.onUploadMediaFault, false, this);
	
	var event = com.gthrng.globals.model.currentEvent.get()
	this.mediaService["listMedia"].call({"event_id": event['id']});
	
	this.channel = com.gthrng.globals.pusher["subscribe"](event['id']);
	

	
	this.channel["bind"]("new_media", this.pushCallback);
	
	goog.events.listen(this.view.login_link, goog.events.EventType.CLICK, this.loginClicked, false, this);
	goog.events.listen(this.view.file, goog.events.EventType.CHANGE, this.fileChanged, false, this);
	goog.events.listen(this.view.file, "DOMSubtreeModified", this.fileChanged, false, this);
	goog.events.listen(this.view.cameraButton, goog.events.EventType.CLICK, this.captureImage, false, this);
	
	//com.gthrng.mAlert("Bracket style in Media");
}


com.gthrng.media.Controller.prototype.fileChanged = function(event) {
	var formdata = false;
	var owner = this;
	
	// if form data is supported build the form programatically
	if (window["FormData"]) {

		// loop through files in the form
  		var files = this.view.file.files;
  		if(files && files.length > 0){

  			// If image transformation is supported resize the image before uploading it
	  		if(this.imgTransform.isSupported()){

	  			var resizedFiles = [];
	  			var resizedBase64Files = [];

	  			// Handler executes when we processed ALL the files in the form
	  			// * add the handler at the beginning so that it is setup for whenever a file is ready
				this.cbManaer.waitForAllCallbacks(files, function(){
					var formdata = new FormData();
					// add those files that we were able to add as bynary Blobs
					for (var rf = resizedFiles.length - 1; rf >= 0; rf--) {
				  		var resizedFile = resizedFiles[rf];
			  			formdata.append("file", resizedFile);
					};
					// add those files that we are posting as base64 strings
					for (var h = resizedBase64Files.length - 1; h >= 0; h--) {
				  		var resized64 = resizedBase64Files[h];
			  			formdata.append("base64" + h, resized64);
					};
					
					owner.appendFormVarsAndSend(formdata);

				})

				// loop over the files in the form and try to process each one
			  	for (var i = files.length - 1; i >= 0; i--) {
			  		var file = files[i];
			  		// attempt to resize
		  			var processing = this.imgTransform.resizeImageFile(file, 800, 600, 
		  				// Handler for each file that we are processing
		  				function(localizedFile){
			  				return function(resizedFile){
			  					// if we successfully resized the file push that one
			  					if(resizedFile != null){
			  						if(resizedFile.type == "blob"){
										resizedFiles.push(resizedFile.file);
			  						}else if(resizedFile.type == "base64"){
										resizedBase64Files.push(resizedFile.file);
			  						}
									owner.cbManaer.callBackComplete(localizedFile);	
								// otherwise push the original file (bummer)
			  					}else{
									resizedFiles.push(localizedFile);
									owner.cbManaer.callBackComplete(localizedFile);
			  					}
							}
						}(file)
		  			);
					// if the browser doesn't support some of the features required this will return false, so we'll just do the upload without resizing (bummer)
					if(processing == false){
						resizedFiles.push(file);
						this.cbManaer.callBackComplete(file);
					}
				}

				
			// if Image transform is not supported append the files to a form data object and post them directly
	  		}else{
		  		var formdata = new FormData();
			  	for (var i = files.length - 1; i >= 0; i--) {
			  		var file = files[i];
		  			formdata.append("file", file);
				};

				this.appendFormVarsAndSend(formdata);
	  			
	  		}
  		}



  	// else submit the form which is in the template ( which will have the file in it already )
	}else{

		var user = com.gthrng.globals.model.user.get(); 
    	var event = com.gthrng.globals.model.currentEvent.get()

    	// fill in the hidden fields in the form so we get them with the post
		this.view.key.value = "969490e925ae635134d0977aa6e74f9e";
    	this.view.event_id.value = event['id'];
    	this.view.user_email.value = user["email"]; 

		this.view.upload_form.submit();
	}
	/*
	*/
}



com.gthrng.media.Controller.prototype.appendFormVarsAndSend = function(formdata) {


    var user = com.gthrng.globals.model.user.get(); 
    var event = com.gthrng.globals.model.currentEvent.get()

	formdata.append("key", "969490e925ae635134d0977aa6e74f9e");
	formdata.append("event_id", event['id']);
	formdata.append("user_email", user["email"]);

	this.mediaService["uploadMedia"].call(formdata, null, false);
}

com.gthrng.media.Controller.prototype.loginClicked = function(event) {
	com.gthrng.setCurrentState('events')
}

com.gthrng.media.Controller.prototype.refresh = function(){
	var event = com.gthrng.globals.model.currentEvent.get()
	this.mediaService["listMedia"].call({"event_id": event['id']});
}

com.gthrng.media.Controller.prototype.onUploadMediaResult = function(event){
	console.log("uploadMedia result>")
}

com.gthrng.media.Controller.prototype.onUploadMediaFault = function(event){
	console.log("uploadMedia fault>")
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

		if(com.gthrng.globals.objectUtils.isArray(mediaObj["likes"])){
			media.likes = mediaObj["likes"].length
		}else{
			media.likes = 0
		}

		if(com.gthrng.globals.objectUtils.isArray(mediaObj["comments"])){
			media.comments = mediaObj["comments"].length
		}else{
			media.comments = 0
		}
		
		media.when = com.gthrng.shared_lib.utils.formatters.friendlyFromTimestamp(mediaObj["uploaded"]);
		
		var html = com.gthrng.MediaItemSoy.getHTML(media);
		var element = goog.dom.htmlToDocumentFragment(html);
		//element.innerHTML = html;
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

com.gthrng.media.Controller.prototype.captureImage = function() {
	this.view.file.click();
}


com.gthrng.media.Controller.prototype.deactivate = function(){
	this.view.deactivate();
	
	this.channel["unbind"]("new_media", this.pushCallback);
	
	goog.events.unlisten(this.view.cameraButton, goog.events.EventType.CLICK, this.captureImage, false, this);
	goog.events.unlisten(this.view.login_link, goog.events.EventType.CLICK, this.loginClicked, false, this);
	goog.events.unlisten(this.mediaService["listMedia"], com.gthrng.shared_lib.events.RemoteServiceEventType.RESULT, this.onListMediaResult);
	goog.events.unlisten(this.mediaService["listMedia"], com.gthrng.shared_lib.events.RemoteServiceEventType.FAULT, this.onListMediaFault);
}