// This file was automatically generated from eventItem.soy.
// Please don't edit this file by hand.

goog.provide('com.gthrng.EventItemSoy');

goog.require('soy');
goog.require('soy.StringBuilder');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
com.gthrng.EventItemSoy.getHTML = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<li class="eventitem clearfix now"><div class="eventiteminfo"><h2>', soy.$$escapeHtml(opt_data.name), '</h2><p>', soy.$$escapeHtml(opt_data.eventWhen), '</p></div><div class="eventitembadge now"><p>Now</p></div></li>');
  if (!opt_sb) return output.toString();
};
