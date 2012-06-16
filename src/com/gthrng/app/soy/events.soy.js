// This file was automatically generated from events.soy.
// Please don't edit this file by hand.

goog.provide('com.gthrng.EventsSoy');

goog.require('soy');
goog.require('soy.StringBuilder');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
com.gthrng.EventsSoy.getHTML = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="header"><div id="navbar"><div class="button" id="backbutton"><div><p>Log out</p></div></div></div><p id="pagetitle">All events for ', soy.$$escapeHtml(opt_data.user.name), '</p></div> <!-- Header ends --><ul id="eventlist" class="maincontent"></ul>');
  if (!opt_sb) return output.toString();
};
