// This file was automatically generated from media.soy.
// Please don't edit this file by hand.

goog.provide('com.gthrng.MediaSoy');

goog.require('soy');
goog.require('soy.StringBuilder');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
com.gthrng.MediaSoy.getHTML = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="noscroll"><div id="header"><div id="navbar"><div class="button" id="backbutton"><div><p>Events</p></div></div></div><p id="pagetitle">', soy.$$escapeHtml(opt_data.event.name), '</p></div> <!-- Header ends --><div id="sidebar"><!-- form action="http://api.gthrng.com/gathering/uploadFullResFile " method="post" enctype="multipart/form-data" id="upload_form" --><form action="http://api.gthrng.com/gathering/uploadMediaFile " method="post" enctype="multipart/form-data" id="upload_form"><input type="file" name="file" id="file"><input type="hidden" name="event_id" id="event_id"><input type="hidden" name="user_email" id="user_email"><input type="hidden" name="key" id="key"></form><div id="camerabuttonwrapper"><p class="buttonlabel">Camara</p><div class="button bigbutton" id="camerabutton">&nbsp;</div></div></div></div><div id="wrapper"><div id="scroller"><ul id="photolist" class="maincontent"></ul></div></div>');
  if (!opt_sb) return output.toString();
};
