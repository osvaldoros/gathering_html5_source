// This file was automatically generated from login.soy.
// Please don't edit this file by hand.

goog.provide('com.gthrng.LoginSoy');

goog.require('soy');
goog.require('soy.StringBuilder');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
com.gthrng.LoginSoy.getHTML = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div class="container state_container" id="login"><form id="loginform"><p class="wp7">Email Address</p><input class="textfield" id="email" name="email" type="email" placeholder="Email Address"/><p class="wp7">Password</p><input class="textfield" id="password" name="password" type="password" placeholder="Password"/><input class="visuallyhidden" type="submit"/><p><div id="no_account_link">I don\'t have an account yet.</div></p></form></div>');
  if (!opt_sb) return output.toString();
};
