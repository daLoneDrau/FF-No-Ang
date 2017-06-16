
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
		var io = game.newHero();
		console.log("reroll")
		console.log(io)
		$("#stats").html(["HEALTH: ", io.getPCData().getFullAttributeScore("ST"), "/",
			io.getPCData().getFullAttributeScore("MST"), "<br>ATTACK: ",
			io.getPCData().getFullAttributeScore("SK")].join(""));
    }
    var unequip = function(e) {
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
    var equip = function(e) {
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
    var clearItem = function() {
    	console.log("clear item description");
    }
    var showItem = function(e) {
		$("#inv_desc").html("");
    	if (e.data.ioid >= 0) {
    		var itemio = Interactive.getInstance().getIO(e.data.ioid);
			if (itemio !== null) {
				if (itemio.hasTypeFlag(EquipmentGlobals.OBJECT_TYPE_WEAPON)) {
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
					console.log(itemio);
					$divl.append($p)
					$div.append($divl);
					$("#inv_desc").append($div);
				}
			}
    	}
    }
    var showWeapons = function() {
		var io = ProjectConstants.getInstance().getPlayerIO();
		console.log("weapons")
		// get all weapons
		//io.getPCData()
		var wpnIo = null, wpnId = io.getPCData().getEquippedItem(
				FFEquipmentSlots.EQUIP_SLOT_WEAPON.index);
		//var mkUp = ["<ul class=\"nav_ver\">"];
		$("#inv_equip").html("");
		var c = 0;
		var $ul = $("<ul>", {"class": "nav_ver"});
		$ul.mouseleave(clearItem);
		if (wpnId >= 0) {
			wpnIo = Interactive.getInstance().getIO(wpnId);
			var $li = $("<li>", {"class": "menu"});
			$li.click({"ioid":wpnId, "slot": FFEquipmentSlots.EQUIP_SLOT_WEAPON.index}, unequip);
			$li.mouseenter({"ioid":wpnIo.getRefId()}, showItem);
			$li.html(["E-", wpnIo.getItemData().getItemName()].join(""));
			$ul.append($li);
			c++;
			$li = null;
		}
		// go through character's inventory
		var lis = [];
		for (var i = io.getInventory().getNumInventorySlots() - 1; i >= 0; i--) {
			console.log("loop "+i)
			var itemio = io.getInventory().getSlot(i).getIo();
			if (itemio !== null
					&& itemio.hasTypeFlag(EquipmentGlobals.OBJECT_TYPE_WEAPON)) {
				var $li = $("<li>", {"class": "menu"});
				$li.click({"ioid":itemio.getRefId(), "slot": FFEquipmentSlots.EQUIP_SLOT_WEAPON.index}, equip);
				$li.mouseenter({"ioid":itemio.getRefId()}, showItem);
				$li.html(itemio.getItemData().getItemName());
				$ul.append($li);
				c++;
				$li = null;
			}
		}
		while (c < maxItemDisplayed) {
			var $li = $("<li>", { });
			$li.mouseleave(clearItem);
			$li.html("&nbsp;");
			$ul.append($li);
			c++;
			$li = null;
		}
		console.log($ul)
		$("#inv_equip").append($ul);
		$ul = null;
		//mkUp.push("</ul>");
		
		//$("#inv_equip").html(mkUp.join(""));
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
            // clicked Weapon list
    		$('#btnWpn').click(function(event) {
    			showWeapons();
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