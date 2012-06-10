gathering_html5_source
======================

This is an html5 mobile app built using Google Closure library. It is designed to be built into a mobile native app by wrapping it with phonegap.

In order to update this app, do the following:

 - Modify the source code as you like
 - Run compilers/recompile script ( this will generate a single highly compressed javascript file with the entire app in web/js/app.js)
 - Use this javascript file in the phonegap projects i.e. Xcode or Phonegap build
 
 * There is a line in the recompile script which copies the output javascript into /work/gathering/client/Gathering1/www/js/app.js ( this is my local Xcode project ). You may do without this or modify it to copy
 to your own project 