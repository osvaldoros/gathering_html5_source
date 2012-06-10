/* If you are supporting your own protocol, the var invokeString will contain any arguments to the app launch.
 see http://iphonedevelopertips.com/cocoa/launching-your-own-application-via-a-custom-url-scheme.html
 for more details -jm */
/*
 function handleOpenURL(url)
 {
 // TODO: do something with the url passed in.
 }
 */
if(typeof(com) == 'undefined'){
    var com = {};
}

if(typeof(com.gthrng) == 'undefined'){
    com.gthrng = {};
}

function com_gthrng_onBodyLoad(){
    console.log('com_gthrng_onBodyLoad()')
    com.gthrng.onBodyLoad();
}

com.gthrng.onBodyLoad = function(){
    console.log('body load!')
    document.addEventListener("deviceready", com.gthrng.onDeviceReady, false);
}

/* When this function is called, Cordova has been initialized and is ready to roll */
/* If you are supporting your own protocol, the var invokeString will contain any arguments to the app launch.
 see http://iphonedevelopertips.com/cocoa/launching-your-own-application-via-a-custom-url-scheme.html
 for more details -jm */
com.gthrng.onDeviceReady = function() {
    //captureImage();
    console.log('Device ready!')
    //captureImage();
}

com.gthrng.captureSuccess = function(mediaFiles) {
    var i, len;
    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
        com.gthrng.uploadMediaFile(mediaFiles[i]);
    }       
}

// Called if something bad happens.
// 
com.gthrng.captureError = function(error) {
    console.log(error)
    var msg = 'An error occurred during capture: ' + error.code;
    navigator.notification.alert(msg, null, 'Uh oh!');
}

// A button will call this function
//
com.gthrng.captureImage = function() {
    // Launch device camera application, 
    // allowing user to capture an image
    navigator.device.capture.captureImage(com.gthrng.captureSuccess, com.gthrng.captureError, {
                                          limit: 1,
                                          quality: 50
                                          });
}

com.gthrng.uploadMediaFile = function(mediaFile){
    path = mediaFile.fullPath;
    com.gthrng.uploadByURI(path);
}

com.gthrng.uploadByURI = function(imageURI) {
    var options = new FileUploadOptions();
    options.fileKey="file";
    options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
    options.mimeType="image/jpeg";
    
    var params = new Object();
    params.key = "969490e925ae635134d0977aa6e74f9e";
    params.event_id = "ericandellie";
    
    options.params = params;
    
    var ft = new FileTransfer();
    //ft.upload(imageURI, "http://talktu.me/upload", com.gthrng.win, com.gthrng.fail, options);
    ft.upload(imageURI, "http://api.gthrng.com/gathering/uploadMediaFile", com.gthrng.win, com.gthrng.fail, options);
}


com.gthrng.win = function(r) {
    console.log("Code = " + r.responseCode);
    console.log("Response = " + r.response);
    console.log("Sent = " + r.bytesSent);
}

com.gthrng.fail = function(error) {
    alert("An error has occurred: Code = " = error.code);
    console.log("upload error source " + error.source);
    console.log("upload error target " + error.target);
}