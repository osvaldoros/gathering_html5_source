// This file was automatically generated from mediaItem.soy.
// Please don't edit this file by hand.

goog.provide('com.gthrng.MediaItemSoy');

goog.require('soy');
goog.require('soy.StringBuilder');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
com.gthrng.MediaItemSoy.getHTML = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<li class="photoitem"><img src="', soy.$$escapeHtml(opt_data.url), '" width="220" /><p class="owner">', soy.$$escapeHtml(opt_data.owner), '</p><p class="timestamp">', soy.$$escapeHtml(opt_data.when), '</p><hr class="clear"/></li>');
  if (!opt_sb) return output.toString();
};
