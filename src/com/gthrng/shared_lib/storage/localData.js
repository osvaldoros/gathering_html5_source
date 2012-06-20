goog.require('goog.json');
goog.require('goog.json.Serializer');

goog.provide('com.gthrng.storage.localData');

com.gthrng.storage.localData.saveObject = function(name, object){
	if (typeof(localStorage) == 'undefined' ) {
		console.log('Your browser does not support HTML5 localStorage. Try upgrading.');
	} else {
		localStorage.removeItem(name); //deletes the matching item from the database
		try {
			localStorage.setItem(name, goog.json.serialize(object)); //saves to the database, "key", "value"
		} catch (e) {
	 	 	 console.log('Storage quota exceeded!'); //data wasn't successfully saved due to quota exceed so throw an error
		}
	}
}

com.gthrng.storage.localData.getObject = function(name){
	if (typeof(localStorage) == 'undefined' ) {
		console.log('Your browser does not support HTML5 localStorage. Try upgrading.');
	}else{
		var storedItem = localStorage.getItem(name);
		if(typeof(storedItem) != "undefined"){
			return goog.json.parse(storedItem);
		}else{
			return null;
		}
	}
}

com.gthrng.storage.localData.deleteObject = function(name){
	if (typeof(localStorage) == 'undefined' ) {
		console.log('Your browser does not support HTML5 localStorage. Try upgrading.');
	} else {
		localStorage.removeItem(name); //deletes the matching item from the database
	}
}
