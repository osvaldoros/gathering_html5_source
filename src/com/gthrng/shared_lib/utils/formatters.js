goog.provide('com.gthrng.utils.formatters');

com.gthrng.utils.formatters.dateFromTimestamp = function(timestamp){
	
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


com.gthrng.utils.formatters.friendlyFromTimestamp = function(timestamp){
	
	var date = new Date(timestamp * 1000);
	
	var delta = Math.round((+new Date - date) / 1000);
	
	var minute = 60,
	    hour = minute * 60,
	    day = hour * 24,
	    week = day * 7;
	    month = week * 4;
	    year = month * 12;
	
	var fuzzy;
	
	if (delta < 30) {
	    fuzzy = 'just now.';
	} else if (delta < minute) {
	    fuzzy = delta + ' seconds ago.';
	} else if (delta < 2 * minute) {
	    fuzzy = 'a minute ago.'
	} else if (delta < hour) {
	    fuzzy = Math.floor(delta / minute) + ' minutes ago.';
	} else if (Math.floor(delta / hour) == 1) {
	    fuzzy = '1 hour ago.'
	} else if (delta < day) {
	    fuzzy = Math.floor(delta / hour) + ' hours ago.';
	} else if (delta < day * 2) {
	    fuzzy = 'yesterday';
	} else if (delta < week) {
	    fuzzy = Math.floor(delta / day) + ' days ago.';
	} else if (delta < 2 * week) {
	    fuzzy = 'a week ago.'
	} else if (delta < month) {
	    fuzzy = Math.floor(delta / week) + ' weeks ago.';
	} else if (delta < 2 * month) {
	    fuzzy = 'a month ago.'
	} else if (delta < year) {
	    fuzzy = Math.floor(delta / month) + ' months ago.';
	} else if (delta < 2 * year) {
	    fuzzy = 'a year ago.'
	} else if (delta >= 2 * year) {
	    fuzzy = Math.floor(delta / year) + ' years ago.';
	}
	
	return fuzzy;

}