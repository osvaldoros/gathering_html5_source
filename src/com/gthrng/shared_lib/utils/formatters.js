goog.provide('com.gthrng.shared_lib.utils.formatters');

com.gthrng.shared_lib.utils.formatters.dateFromTimestamp = function(timestamp){

	if(timestamp == undefined || timestamp == false || timestamp == -1 || timestamp == null || timestamp == "") return "";
	
	var date = new Date(timestamp * 1000);
	// hours part from the timestamp
	var hours = date.getHours();
	// minutes part from the timestamp
	var minutes = date.getMinutes();
	// seconds part from the timestamp
	var seconds = date.getSeconds();
	
	// will display time in 10:30:23 format
	var formattedTime = hours + ':' + minutes + ':' + seconds;	
	
	
	return formattedTime;
}

com.gthrng.shared_lib.utils.formatters.displayTime = function(timestamp){

	if(timestamp == undefined || timestamp == false || timestamp == -1 || timestamp == null || timestamp == "") return "";
	
	var date = new Date(timestamp * 1000);
	// hours part from the timestamp
	var hours = date.getHours();
	var pm = "";
	if(hours < 10){
		hours = "0" + hours;
	}else if(hours > 12){
		hours = hours - 12;
		pm = "pm"
	}

	

	// minutes part from the timestamp
	var minutes = date.getMinutes();

	if(minutes < 10){
		minutes = "0" + minutes;
	}
	
	// will display time in 10:30:23 format
	var formattedTime = hours + ':' + minutes + " "+ pm;	
	
	
	return formattedTime;
}


com.gthrng.shared_lib.utils.formatters.friendlyFromTimestamp = function(timestamp){

	if(timestamp == undefined || timestamp == false || timestamp == -1 || timestamp == null || timestamp == "") return "";
	
	var date = new Date(timestamp * 1000);
	
	var delta = Math.round((+new Date - date) / 1000);
	
	var minute = 60,
	    hour = minute * 60,
	    day = hour * 24,
	    week = day * 7;
	    month = week * 4;
	    year = month * 12;
	
	var fuzzy;
	
	// past
	if(delta > 0){

		if (delta < 30) {
		    fuzzy = 'just now';
		} else if (delta < minute) {
		    fuzzy = delta + ' seconds ago';
		} else if (delta < 2 * minute) {
		    fuzzy = 'a minute ago'
		} else if (delta < hour) {
		    fuzzy = Math.floor(delta / minute) + ' minutes ago';
		} else if (Math.floor(delta / hour) == 1) {
		    fuzzy = '1 hour ago'
		} else if (delta < day) {
		    fuzzy = Math.floor(delta / hour) + ' hours ago';
		} else if (delta < day * 2) {
		    fuzzy = 'yesterday';
		} else if (delta < week) {
		    fuzzy = Math.floor(delta / day) + ' days ago';
		} else if (delta < 2 * week) {
		    fuzzy = 'a week ago'
		} else if (delta < month) {
		    fuzzy = Math.floor(delta / week) + ' weeks ago';
		} else if (delta < 2 * month) {
		    fuzzy = 'a month ago'
		} else if (delta < year) {
		    fuzzy = Math.floor(delta / month) + ' months ago';
		} else if (delta < 2 * year) {
		    fuzzy = 'a year ago'
		} else if (delta >= 2 * year) {
		    fuzzy = Math.floor(delta / year) + ' years ago';
		}

	// future
	}else{

		delta = delta * -1;

		if (delta < minute) {
		    fuzzy = 'in ' + delta + ' seconds';
		} else if (delta < 2 * minute) {
		    fuzzy = 'in a minute'
		} else if (delta < hour) {
		    fuzzy = 'in ' + Math.floor(delta / minute) + ' minutes';
		} else if (Math.floor(delta / hour) == 1) {
		    fuzzy = 'in 1 hour'
		} else if (delta < day) {
		    fuzzy = 'in ' + Math.floor(delta / hour) + ' hours';
		} else if (delta < day * 2) {
		    fuzzy = 'tomorrow';
		} else if (delta < week) {
		    fuzzy = 'in ' + Math.floor(delta / day) + ' days';
		} else if (delta < 2 * week) {
		    fuzzy = 'in a week'
		} else if (delta < month) {
		    fuzzy = 'in ' + Math.floor(delta / week) + ' weeks';
		} else if (delta < 2 * month) {
		    fuzzy = 'in a month'
		} else if (delta < year) {
		    fuzzy = 'in ' + Math.floor(delta / month) + ' months';
		} else if (delta < 2 * year) {
		    fuzzy = 'in a year'
		} else if (delta >= 2 * year) {
		    fuzzy = 'in ' + Math.floor(delta / year) + ' years';
		}
	}
	
	return fuzzy;

}