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
  output.append('<li class="photoitem"><p class="owner">', soy.$$escapeHtml(opt_data.owner), '</p><p class="timestamp">', soy.$$escapeHtml(opt_data.when), '</p><img src="', soy.$$escapeHtml(opt_data.url), '" width="220" /><div class="button socialbutton likebutton">&nbsp;</div><p class="likes">', soy.$$escapeHtml(opt_data.likes), '</p><div class="button socialbutton commentbutton">&nbsp;</div><p class="comments">', soy.$$escapeHtml(opt_data.comments), '</p><hr class="clear"/></li>');
  if (!opt_sb) return output.toString();
};
