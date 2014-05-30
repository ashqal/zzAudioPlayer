// JavaScript Document
$(document).ready( function(){
	if (typeof window.console == "undefined") {
		$('body').prepend('<div id="aconsole" style="position:fixed;bottom:0;right:0; width:200px"></div>');
		window.console = {log: function( param ) {
			$('#aconsole').html( $('#aconsole').html() + '</br>' + param );	
		}};
	}
});
