define(['jquery'], function($) {
	var WebServiceClient = function() {
		// production
		//var httpBase = "http://service-osrapi.rhcloud.com/OSRAPI/basic_dnd/";

		// local
		var httpBase = "http://localhost:8080/FFService/ff/";
		this.getTextEntityByName = function (name) {
		    var urlBase = [ httpBase, 'texts' ].join("");
	    	var u = [urlBase , '/name/', name].join("");
	    	var xmlhttp = new XMLHttpRequest();
	        xmlhttp.onreadystatechange = function() {
	            if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
	               if (xmlhttp.status == 200) {
	               } else if (xmlhttp.status == 400) {
	            	   console.log('There was an error 400');
	               } else {
	            	   console.log('something else other than 200 was returned');
	               }
	            }
	        };
	        xmlhttp.open("GET", u, false);
	        xmlhttp.send();
	        return xmlhttp.responseText;
	    };
	}
    return WebServiceClient;
});