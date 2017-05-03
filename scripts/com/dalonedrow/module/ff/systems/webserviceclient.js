/**
 * WebWebServiceClient
 * module with no dependencies
 */
define(["com/dalonedrow/module/ff/constants/ffequipmentelements",
	"com/dalonedrow/module/ff/constants/ffequipmentslots"], function(FFEquipmentElements,
			FFEquipmentSlots) {
    var instance = null;
	var WebServiceClient = function() {
        if (instance !== null){
            throw new Error("Cannot instantiate more than one WebServiceClient, use WebServiceClient.getInstance()");
        }
		// production
		//var httpBase = "http://service-osrapi.rhcloud.com/OSRAPI/basic_dnd/";

		// local
		var httpBase = "http://localhost:8080/FFService/ff/";
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
	    /**
	     * Makes a synchronous call to the service to retrieve an Item by its name.
	     * @param name the item's name
	     */
	    this.getItemByName = function(name) {
		    var urlBase = [ httpBase, 'io_item_data' ].join("");
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
	        return JSON.parse(xmlhttp.responseText);	    	
	    };
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
	    this.loadEquipmentSlots = function() {
	        var list = WebServiceClient.getInstance().getEquipmentSlotEntities();
	        for (var i = 0, len = list.length; i < len; i++) {
	        	if (!list[i].value) {
	        		list[i].value = 0;
	        	}
	            FFEquipmentSlots.values.push(new FFEquipmentSlots(list[i].name, list[i].value));
	        }
	    };
	    this.loadItem = function(name) {
	        var list = this.getItemByName();
	        for (var i = 0, len = list.length; i < len; i++) {
	        	console.log(list[i]);
	        	/*
	            // *************************************************
	            // weight
	            // *************************************************
	            if (obj.weight !== undefined) {
	                itemData.setWeight(obj.weight);
	            } else {
	                itemData.setWeight(0);
	            }
	            // *************************************************
	            // stack_size
	            // *************************************************
	            if (obj.stack_size !== undefined) {
	                itemData.setStackSize(obj.stack_size);
	            } else {
	                itemData.setStackSize(1);
	            }
	            // *************************************************
	            // name
	            // *************************************************
	            itemData.setItemName(obj.name);
	            // *************************************************
	            // title
	            // *************************************************
	            itemData.setTitle(obj.title);
	            // *************************************************
	            // max_owned
	            // *************************************************
	            if (obj.max_owned !== undefined) {
	                itemData.setMaxOwned(obj.max_owned);
	            } else {
	                itemData.setMaxOwned(1);
	            }
	            // *************************************************
	            // description
	            // *************************************************
	            itemData.setDescription(obj.description);
	            // *************************************************
	            // types
	            // *************************************************
	            if (obj.types !== undefined) {
	            	for (var i = obj.types.length - 1; i >= 0; i--) {
	                    itemData.ARX_EQUIPMENT_SetObjectType(obj.types[i].flag, true);        		
	            	}
	            }
	            // *************************************************
	            // modifiers
	            // *************************************************
	            if (obj.modifiers !== undefined) {
	            	for (var i in obj.modifiers) {
	                    var elementIndex =
	                        FFEquipmentElements.valueOf(i).getIndex();
	                    itemData.getEquipitem().getElement(elementIndex).set(
	                    		this.getModifierByCode(obj.modifiers[i]));
	            		
	            	}
	            	
	            }
	            // *************************************************
	            // internal_script
	            // *************************************************
	            io.setScript(new window[obj.internal_script]());
	            // *************************************************
	            // groups
	            // *************************************************
	            if (obj.groups !== undefined) {
	            	for (var i = obj.groups.length - 1; i >= 0; i--) {
	            		io.addGroup(obj.groups[i].name);
	            	}
	            }
	            Script.getInstance().sendInitScriptEvent(io);
	            return io;
	            */
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