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
  output.append('<div id="noscroll"><div id="header"><div id="navbar"><div class="button" id="backbutton"><div><p>Events</p></div></div></div><p id="pagetitle">', soy.$$escapeHtml(opt_data.event.name), '</p></div> <!-- Header ends --><div id="sidebar"><div id="camerabuttonwrapper"><p class="buttonlabel">Camera</p><div class="button bigbutton" id="camerabutton">&nbsp;</div></div></div></div><ul id="photolist" class="maincontent"></ul>');
  if (!opt_sb) return output.toString();
};
