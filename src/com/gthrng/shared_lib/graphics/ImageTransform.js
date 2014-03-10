
goog.provide('com.gthrng.shared_lib.graphics.ImageTransform');  
goog.require('goog.events.EventTarget');    
goog.require('goog.dom');

/**
 * Creates a Generic Model (to be extended)
 * @constructor
 */
com.gthrng.shared_lib.graphics.ImageTransform = function() {
	this.dispatchMap = {};
	goog.events.EventTarget.call(this); 

	this.targetCanvas = goog.dom.createElement("canvas");
	this.canvasSupported = ( !!(this.targetCanvas.getContext && this.targetCanvas.getContext('2d')) )
} 
goog.inherits(com.gthrng.shared_lib.graphics.ImageTransform, goog.events.EventTarget);    
           


com.gthrng.shared_lib.graphics.ImageTransform.prototype.supportsToDataURL = function() {
	if(!this.canvasSupported){
		return false;
	}
 
	var c = document.createElement("canvas");
	var data = c.toDataURL("image/png");
	return (data.indexOf("data:image/png") == 0);
}

com.gthrng.shared_lib.graphics.ImageTransform.prototype.isSupported = function() {
	return this.canvasSupported && this.supportsToDataURL();
}
/**
*
*  Receives a file from a form, verifies that it is an image, then attempts to load it in an img tag and resize it usign the resize method.
*

Obtained from: http://hacks.mozilla.org/2011/01/how-to-develop-a-html5-image-uploader/

*
*/
com.gthrng.shared_lib.graphics.ImageTransform.prototype.resizeImageFile = function(file, width, height, callBack) {
	if(this.canvasSupported && file.type.match(/image.*/) ){
		var img = goog.dom.createElement("img");
		
		var reader = new FileReader();  
		var owner = this;
		reader.onload = function(event) {
			img.src = event.target.result;
			var res = owner.resize(img, width, height);
			if(typeof(callBack) == "function") callBack(res);
		}

		reader.readAsDataURL(file);
		return true;
	}else{
		return false;
	}
  
} 

/**
*
*  Resizes an img using a canvas, this method preserves the aspect ratio
*
*
*/
com.gthrng.shared_lib.graphics.ImageTransform.prototype.resize = function(img, desiredWidth, desiredHeight) {
	var width = img.width;
	var height = img.height;
	 
	if(desiredWidth != undefined){
		if (width > desiredWidth) {
	    	height *= desiredWidth / width;
	    	width = desiredWidth;
		}
	}else if(desiredHeight != undefined){
		if (height > desiredHeight) {
	    	width *= desiredHeight / height;
	    	height = desiredHeight;
		}
	}
	
	this.targetCanvas.width = width;
	this.targetCanvas.height = height;
	var ctx = this.targetCanvas.getContext("2d");
	ctx.drawImage(img, 0, 0, width, height);	

	var dataURL = this.targetCanvas.toDataURL('image/jpeg');
	if(!(typeof(dataURL) == "string" && dataURL.length > 30)){
		dataURL = this.targetCanvas.toDataURL('image/png');
		if(!(typeof(dataURL) == "string" && dataURL.length > 30)){
			return null;
		}

	}

	var blob = this.dataURItoBlob(dataURL);
	if(blob){
		return {type:"blob", file:blob}
	}else{
		return {type:"base64", file:dataURL.replace(/^data:image\/(png|jpg|jpeg);base64,/, "")};
	}

  
} 


/**
*
*  Converts a dataURI into a blob that can be added to a formData
*

Obtained from: http://stackoverflow.com/questions/4998908/convert-data-uri-to-file-then-append-to-formdata

*
*/
com.gthrng.shared_lib.graphics.ImageTransform.prototype.dataURItoBlob = function(dataURI) {

	var hasUint8Array = (typeof(window["Uint8Array"]) != "undefined");
	if(!hasUint8Array){
		return null;
	}

	var byteString;
	if (dataURI.split(',')[0].indexOf('base64') >= 0){
	    byteString = atob(dataURI.split(',')[1]);
	}else{
	    byteString = unescape(dataURI.split(',')[1]);
	}

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    var arr = [];
    for (var i = 0; i < byteString.length; i++) {
    	arr.push(byteString.charCodeAt(i));
    }
    var ui8 = new Uint8Array(arr);

	if(window['BlobBuilder'] || window['WebKitBlobBuilder'] || window['MozBlobBuilder'] || window['MSBlobBuilder']){
		window['BlobBuilder'] = window['BlobBuilder'] || window['WebKitBlobBuilder'] || window['MozBlobBuilder'] || window['MSBlobBuilder'];
	}

    // If the newer Blob function is available use that one
    if((typeof(window["Blob"]) == "function")){
    	return new Blob([ui8], {type: mimeString});
    // ofherwise try the old BlobBuilder
    }else if(window['BlobBuilder']){
	    // write the ArrayBuffer to a blob, and you're done
	    var bb = new BlobBuilder();
	    bb.append(ui8);

    	return bb.getBlob(mimeString);
    // else return null!
    }else{
    	return null;
    }


}  

