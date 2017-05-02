/**
 * WebWebServiceClient
 * module with no dependencies
 */
define(["com/dalonedrow/module/ff/constants/ffequipmentelements"], function(FFEquipmentElements) {
    var instance = null;
	var WebServiceClient = function() {
        if (instance !== null){
            throw new Error("Cannot instantiate more than one WebServiceClient, use WebServiceClient.getInstance()");
        }
		// production
		//var httpBase = "http://service-osrapi.rhcloud.com/OSRAPI/basic_dnd/";

		// local
		var httpBase = "http://localhost:8080/FFService/ff/";
		this.getTextEntityByName = function(name) {
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
	        return JSON.parse(xmlhttp.responseText)[0];
	    };
	    this.getCommandEntities = function() {
		    var u = [ httpBase, 'commands' ].join("");
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
	        return JSON.parse(xmlhttp.responseText);	    	
	    };
	    this.getDieEntities = function() {
		    var u = [ httpBase, 'dies' ].join("");
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
	        return JSON.parse(xmlhttp.responseText);	    	
	    };
	    this.getDiceEntities = function() {
		    var u = [ httpBase, 'dices' ].join("");
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
	        return JSON.parse(xmlhttp.responseText);	    	
	    };
	    this.getEquipmentElementEntities = function() {
		    var u = [ httpBase, 'equipment_element_types' ].join("");
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
	        return JSON.parse(xmlhttp.responseText);	    	
	    };
	    this.getEquipmentSlotEntities = function() {
		    var u = [ httpBase, 'equipment_slots' ].join("");
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
	        return JSON.parse(xmlhttp.responseText);
	    	
	    };
	    this.loadEquipmentElements = function() {
	        var list = this.getEquipmentElementEntities();
	        for (var i = 0, len = list.length; i < len; i++) {
	        	if (!list[i].value) {
	        		list[i].value = 0;
	        	}
	        	FFEquipmentElements.values.push(
	        			new FFEquipmentElements(list[i].code, list[i].value));
	        }
	    };
	}
	WebServiceClient.getInstance = function() {
        // summary:
        //      Gets an instance of the singleton. It is better to use 
        if (instance === null) {
        	console.log("no instance")
            instance = new WebServiceClient();
        }
        return instance;
    };
    return WebServiceClient;
});