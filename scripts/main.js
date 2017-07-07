
define(['jquery', 'app', 'test/FFInteractiveObjectTest',
	"com/dalonedrow/engine/systems/base/interactive",
	"com/dalonedrow/engine/systems/base/projectconstants",
	"com/dalonedrow/module/ff/constants/ffequipmentelements",
	"com/dalonedrow/module/ff/constants/ffequipmentslots",
	"com/dalonedrow/rpg/base/constants/equipmentglobals"],
	function($, App, FFInteractiveObjectTest, Interactive, ProjectConstants, FFEquipmentElements,
			FFEquipmentSlots, EquipmentGlobals) {
    var app, game, maxItemDisplayed = 4;
    console.log("main called");
    // define animation loop method
    window.requestAnimFrame = (function(){
  	  return  window.requestAnimationFrame       || 
  	          window.webkitRequestAnimationFrame || 
  	          window.mozRequestAnimationFrame    || 
  	          window.oRequestAnimationFrame      || 
  	          window.msRequestAnimationFrame     || 
  	          function(/* function */ callback, /* DOMElement */ element){
  	            window.setTimeout(callback, 1000 / 60);
  	          };
  	})();
    var runTests = function() {
    	var t = new FFInteractiveObjectTest();
    	t.test();
    };
    // game start-up process:
    // 1. initialize the application
    // 2. initialize the game
    // 3. display the intro screen
    var newHero = function() {
    	clearItem();
    	clearItemList();
		var io = game.newHero();
		console.log(io);
		$("#stats").html(["HEALTH: ", io.getPCData().getFullAttributeScore("ST"), "/",
			io.getPCData().getFullAttributeScore("MST"), "<br>ATTACK: ",
			io.getPCData().getFullAttributeScore("SK")].join(""));
    }
    /**
     * Unequips an item.
     * @param e the jQuery.Event object
     */
    var unequip = function(e) {
    	clearItem();
    	if (e.data.ioid >= 0) {
    		var io = ProjectConstants.getInstance().getPlayerIO();
			var itemio = Interactive.getInstance().getIO(e.data.ioid);
			itemio.getItemData().unequipItemInSlot(io.getPCData(), e.data.slot);
			switch (e.data.slot) {
			case FFEquipmentSlots.EQUIP_SLOT_WEAPON.index:
				showWeapons();
				break;
			}
    	}
    }
    /**
     * Equips an item.
     * @param e the jQuery.Event object
     */
    var equip = function(e) {
    	clearItem();
    	if (e.data.ioid >= 0) {
    		var io = ProjectConstants.getInstance().getPlayerIO();
			var itemio = Interactive.getInstance().getIO(e.data.ioid);
			itemio.getItemData().equipOnIo(io);
			switch (e.data.slot) {
			case FFEquipmentSlots.EQUIP_SLOT_WEAPON.index:
				showWeapons();
				break;
			}
    	}
    }
    /** Clears the inventory item list section. */
    var clearItemList = function() {
		$("#inv_equip").html("");
		var $ul = $("<ul>", {"class": "nav_ver"});
		for (var i = maxItemDisplayed - 1; i >= 0; i--) {
			var $li = $("<li>", { });
			$li.html("&nbsp;");
			$ul.append($li);
			$li = null;
		}
		$("#inv_equip").append($ul);
		$ul = null;
    }
    /** Clears the inventory description section. */
    var clearItem = function() {
		$("#inv_desc").html("&nbsp;<br>&nbsp;<br>");
    }
    var showItem = function(e) {
		$("#inv_desc").html("");
    	if (e.data.ioid >= 0) {
    		var itemio = Interactive.getInstance().getIO(e.data.ioid);
			if (itemio !== null) {
				if (itemio.hasTypeFlag(EquipmentGlobals.OBJECT_TYPE_WEAPON)) {
					var h = [itemio.getItemData().getDescription(), "<br>"];
					h.push("DMG: ");
					h.push(itemio.getItemData().getEquipitem().getElement(
							FFEquipmentElements.ELEMENT_DAMAGE.index).getValue());
					var $div = $("<div>", {"class": "justify_items"});
					var $divl = $("<div>", {});
					var $p = $("<p>", {});
					var t = itemio.getItemData().getDescription();
					$p.html(itemio.getItemData().getDescription());
					$divl.append($p)
					$div.append($divl);
					$divl = $("<div>", {});
					$p = $("<p>", {});
					$p.html(["DMG: ", itemio.getItemData().getEquipitem().getElement(
							FFEquipmentElements.ELEMENT_DAMAGE.index).getValue()].join(""));
					$divl.append($p)
					$div.append($divl);
					$("#inv_desc").html(h.join(""));
				}
			}
    	}
    }
    var showEquippableItems = function(slot, type) {
    	console.log(slot)
    	console.log(type)
		var io = ProjectConstants.getInstance().getPlayerIO();
		// get all weapons
		var wpnIo = null, wpnId = io.getPCData().getEquippedItem(slot);
		$("#inv_equip").html("");
		var c = 0;
		var $ul = $("<ul>", {"class": "nav_ver"});
		$ul.mouseleave(clearItem);
		if (wpnId >= 0) {
			wpnIo = Interactive.getInstance().getIO(wpnId);
			console.log(wpnIo)
			var $li = $("<li>", {"class": "menu"});
			$li.click({"ioid":wpnId, "slot": slot}, unequip);
			$li.mouseenter({"ioid":wpnIo.getRefId()}, showItem);
			$li.mouseleave(clearItem);
			$li.html(["E-", wpnIo.getItemData().getItemName()].join(""));
			$ul.append($li);
			c++;
			$li = null;
		}
		// go through character's inventory
		var lis = [];
		for (var i = io.getInventory().getNumInventorySlots() - 1; i >= 0; i--) {
			var itemio = io.getInventory().getSlot(i).getIo();
			if (itemio !== null
					&& itemio.hasTypeFlag(type)) {
				var $li = $("<li>", {"class": "menu"});
				$li.click({"ioid":itemio.getRefId(), "slot": slot}, equip);
				$li.mouseenter({"ioid":itemio.getRefId()}, showItem);
				$li.mouseleave(clearItem);
				$li.html(itemio.getItemData().getItemName());
				$ul.append($li);
				c++;
				$li = null;
			}
		}
		while (c < maxItemDisplayed) {
			var $li = $("<li>", { });
			$li.html("&nbsp;");
			$ul.append($li);
			c++;
			$li = null;
		}
		console.log($ul)
		$("#inv_equip").append($ul);
		io = null;
		$ul = null;
		wpnId = null;
		wpnIo = null;
    }
    /**
     * App initialization called when page loads.
     */
    var initApp = function() {
        $(document).ready(function() {
            console.log("document ready - in initApp");
        	// create new app
        	app = new App();
            app.center();
            $('body').click(function(event) {
            	console.log("clicked on body");
            });
            // capture all key events
            $(document).keydown(function(e) {
                e.preventDefault();
                // do my work
                console.log("key was pressed");
                if (e.keyCode == 116) {
                	console.log("f5 pressed");
                    window.location.reload()
                }
            });
            // clicked New Game
    		$('#menuNewGame').click(function(event) {
    			$('div#newGame').hide();
    			game.state = 1;
    			$('div#charSel').show();
    			newHero();
            });
            // clicked Re-Roll Hero
    		$('#rerollChar').click(function(event) {
    			newHero();
            });
            // clicked Start Game
    		$('#startGame').click(function(event) {
    			$('div#charSel').hide();
    			$('div#introScroll').show();
    			game.state = 2;
    			game.renderer.setTextCallback(function() {
    				console.log("text done");
        			game.state = 3;
        			$('div#introScroll').hide();
    			});
    			
            });
            // clicked Weapon list
    		$('#btnWpn').click(function(event) {
    			showEquippableItems(FFEquipmentSlots.EQUIP_SLOT_WEAPON.index,
    					EquipmentGlobals.OBJECT_TYPE_WEAPON);
            });
            // clicked Shield list
    		$('#btnShld').click(function(event) {
    			showEquippableItems(FFEquipmentSlots.EQUIP_SLOT_SHIELD.index,
    					EquipmentGlobals.OBJECT_TYPE_SHIELD);
            });
            // clicked continue intro text
    		$('#nextPage').click(function(event) {
    			game.renderer.nextPage();
            });
            initGame();
            app.tryStartingGame(name);
            //runTests();
        });    	
    };
    var initGame = function() {
        require(['game'], function(Game) {            
            var canvas = document.getElementById("entities"),
            background = document.getElementById("background"),
            foreground = document.getElementById("foreground");
            // initialize the game with canvases
    		game = new Game(app);
    		game.setup('#bubbles', canvas, background, foreground);
    		//game.setup('#bubbles', canvas, background, foreground, input);
    		game.setStorage(app.storage);
    		app.setGame(game);
    		// handle mouse clicks on the canvas
        	if(game.renderer.mobile || game.renderer.tablet) {
                $('#foreground').bind('touchstart', function(event) {
                    app.center();
                    app.setMouseCoordinates(event.originalEvent.touches[0]);
                	game.click();
                	app.hideWindows();
                });
            } else {
                $('#foreground').click(function(event) {
                    app.center();
                    app.setMouseCoordinates(event);
                    if (game) {
                	    game.click();
                	}
                	app.hideWindows();
                    // $('#chatinput').focus();
                });
            }
        	// unbind previous click event for body
            $('body').unbind('click');
            // bind new click event
            $('body').click(function(event) {                
                if(game.started && !game.renderer.mobile) {
                    game.click();
                }
            });
        });
    };
    // initialize the game application
    initApp();
});