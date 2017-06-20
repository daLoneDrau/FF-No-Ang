/**
 * WebWebServiceClient
 * module with no dependencies
 */
define(["require",
	"com/dalonedrow/engine/systems/base/interactive",
	"com/dalonedrow/engine/sprite/base/maptile",
	"com/dalonedrow/engine/sprite/base/simplevector2",
	"com/dalonedrow/module/ff/constants/ffequipmentelements",
	"com/dalonedrow/module/ff/constants/ffequipmentslots",
	"com/dalonedrow/module/ff/constants/ffmaptiles",
	"com/dalonedrow/module/ff/rpg/ffitem",
	"com/dalonedrow/rpg/base/flyweights/equipmentitemmodifier",
	"com/dalonedrow/rpg/base/systems/script"], function(require, Interactive, MapTile,
			SimpleVector2, FFEquipmentElements, FFEquipmentSlots, FFMapTiles, FFItem,
			EquipmentItemModifier, Script) {
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
	    this.getEquipmentModifierByCode = function(code) {
		    var urlBase = [ httpBase, 'equipment_item_modifiers' ].join("");
	    	var u = [urlBase , '/code/', code].join("");
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
	    this.getMapTileEntities = function() {
		    var u = [ httpBase, 'map_tiles' ].join("");
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
	    /**
	     * Makes a synchronous call to the service to retrieve an Item by its name.
	     * @param name the item's name
	     */
	    this.getMapByName = function(name) {
		    var urlBase = [ httpBase, 'map_levels' ].join("");
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
	    this.loadEquipmentModifierByCode = function(code) {
	        var obj = this.getEquipmentModifierByCode(code);
	        if (obj.length > 1) {
	        	throw new Error("More than 1 item found!");
	        }
	        if (obj.length === 0) {
	        	throw new Error("Modifier " + code + " doesn't exist");
	        }
	        obj = obj[0];
	        var mod = new EquipmentItemModifier();
	        mod.setValue(obj.value);
	        mod.setIsPercentage(obj.percent);
	        obj = null;
	        return mod;
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
	        var obj = this.getItemByName(name);
	        if (obj.length > 1) {
	        	throw new Error("More than 1 item found!");
	        }
	        if (obj.length === 0) {
	        	throw new Error("Item " + name + " doesn't exist");
	        }
	        obj = obj[0];
	        var io = Interactive.getInstance().newItem();
	        var itemData = new FFItem();
            io.setItemData(itemData);
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
                    		this.loadEquipmentModifierByCode(obj.modifiers[i]));
            		
            	}
            	
            }
            // *************************************************
            // internal_script
            // *************************************************
            io.setScript(new (require(obj.internal_script_js))(io));
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
	    };
	    this.loadMap = function(name, scale, mapClassString) {
	    	var map = [];
	        var levels = this.getMapByName(name);
	        if (levels.length === 0) {
	        	throw new Error("Map " + name + " doesn't exist");
	        }
	        for (var i = levels.length - 1; i >= 0; i--) {
	        	var mapLevel = new (require(mapClassString))(scale);
	        	mapLevel.setElevation(levels[i].elevation);
	        	mapLevel.setName(levels[i].name);
	        	for (var j = levels[i].cells.length - 1; j >= 0; j--) {
	        		var cellObj = levels[i].cells[j];
	        		if (cellObj.x === undefined) {
	        			cellObj.x = 0;
	        		}
	        		if (cellObj.y === undefined) {
	        			cellObj.y = 0;
	        		}
		        	var cell = new MapTile(new SimpleVector2(cellObj.x, cellObj.y),
		        			FFMapTiles[cellObj.map_tile.name.toUpperCase()].getValue());
		        	mapLevel.addCell(cell);
		        	cell = null;
		        	cellObj = null;
	        	}
	        	map.push(mapLevel);
	        }
	        levels = null;
            return map;
	    };
	    this.loadMapTiles = function() {
	        var list = WebServiceClient.getInstance().getMapTileEntities();
	        for (var i = 0, len = list.length; i < len; i++) {
	        	if (!list[i].code_number) {
	        		list[i].code_number = 0;
	        	}
	        	FFMapTiles.values.push(new FFMapTiles(list[i].name, list[i].code_number));
	        }
	    };
	}
	WebServiceClient.getInstance = function() {
        // summary:
        //      Gets an instance of the singleton. It is better to use 
        if (instance === null) {
        	console.log("no instance of WebServiceClient")
            instance = new WebServiceClient();
        }
        return instance;
    };
    return WebServiceClient;
});