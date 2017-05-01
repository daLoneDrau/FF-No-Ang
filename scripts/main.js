
define(['jquery', 'app', "com/dalonedrow/module/ff/constants/ffcommand",
	'com/dalonedrow/module/ff/constants/ffequipmentelements',
	'com/dalonedrow/module/ff/constants/ffequipmentslots',
	//"com/dalonedrow/module/ff/systems/ffcontroller",
	//"com/dalonedrow/module/ff/systems/ffinteractive",
	'com/dalonedrow/module/ff/systems/webserviceclient',
	'com/dalonedrow/engine/systems/base/interactive',
	'test/BaseInteractiveObjectTest'],
	function($, App, FFCommand, FFEquipmentElements, FFEquipmentSlots, 
			//FFController, FFInteractive,
			WebServiceClient, Interactive, BaseInteractiveObjectTest) {
    var app, game;
    console.log("main called");
    var initWebServiceClient = function() {
    	new WebServiceClient();
        var list = WebServiceClient.getInstance().getCommandEntities();
        for (var i = 0, len = list.length; i < len; i++) {
        	if (!list[i].sort_order) {
        		list[i].sort_order = 0;
        	}
        	FFCommand.values.push(new FFCommand(list[i].name, list[i].sort_order));
        }
        list = WebServiceClient.getInstance().getEquipmentElementEntities();
        for (var i = 0, len = list.length; i < len; i++) {
        	if (!list[i].value) {
        		list[i].value = 0;
        	}
        	FFEquipmentElements.values.push(new FFEquipmentElements(list[i].code, list[i].value));
        }
        list = WebServiceClient.getInstance().getEquipmentSlotEntities();
        for (var i = 0, len = list.length; i < len; i++) {
        	if (!list[i].value) {
        		list[i].value = 0;
        	}
            FFEquipmentSlots.values.push(new FFEquipmentSlots(list[i].name, list[i].value));
        }
        //new FFController();
    };
    var runTests = function() {
    	var t = new BaseInteractiveObjectTest();
    	t.test();
    };
    var testVector = function() {
    	log.info(WebServiceClient.getInstance().getTextEntityByName("START"));
        require(['com/dalonedrow/engine/sprite/base/simplevector2'], function(SimpleVector2) {
        	var v = new SimpleVector2(1, 5);
        	console.log(v.toString());
        });
        console.log(FFEquipmentSlots.valueOf("EQUIP_SLOT_WEAPON"));
        Interactive.setInstance(new Interactive());
        console.log(Interactive.getInstance());
    };
    /**
     * App initialization called when page loads.
     */
    var initApp = function() {
        $(document).ready(function() {
            console.log("in initApp");
        	// create new app
        	app = new App();
            app.center();
    		
    		$('#parchment .startgame').click(function(event) {
    			console.log("start")
            });
            /* don't use yet
            if(Detect.isWindows()) {
                // Workaround for graphical glitches on text
                $('body').addClass('windows');
            }
            
            if(Detect.isOpera()) {
                // Fix for no pointer events
                $('body').addClass('opera');
            }
        	*/
            /* get rid of parchment for now
            $('body').click(function(event) {
                if($('#parchment').hasClass('credits')) {
                    app.toggleCredits();
                }
                
                if($('#parchment').hasClass('about')) {
                    app.toggleAbout();
                }
            });
			*/
            /* barbuttons is a div containing the chat, achievements, mute, help buttons.
             * each button under has the barbutton class.
             * clicking the button toggles the active class on the button 
        	$('.barbutton').click(function() {
        	    $(this).toggleClass('active');
        	});
			*/
            /* show the chat window
        	$('#chatbutton').click(function() {
        	    if($('#chatbutton').hasClass('active')) {
        	        app.showChat();
        	    } else {
                    app.hideChat();
        	    }
        	});
			*/
            /* show the about window
        	$('#helpbutton').click(function() {
                app.toggleAbout();
        	});
			*/
            /* show the achievements window.  don't know about blink
        	$('#achievementsbutton').click(function() {
                app.toggleAchievements();
                if(app.blinkInterval) {
                    clearInterval(app.blinkInterval);
                }
                $(this).removeClass('blink');
        	});
			*/
            /* when the instructions are displayed, clicking anywhere closes it
        	$('#instructions').click(function() {
                app.hideWindows();
        	});
        	*/
            /* toggle the population div.
        	$('#playercount').click(function() {
        	    app.togglePopulationInfo();
        	});
        	*/
            /* when population div is displayed, toggle when clicked
        	$('#population').click(function() {
        	    app.togglePopulationInfo();
        	});
			*/
            /* toggles credits when 'Credits' is clicked
        	$('#toggle-credits').click(function() {
        	    app.toggleCredits();
        	});
			*/
            /* creates a new character when 'reset your character' is clicked
        	$('#create-new span').click(function() {
        	    app.animateParchment('loadcharacter', 'confirmation');
        	});
			*/
            /* give you chance to confirm deletion of old character
        	$('.delete').click(function() {
                app.storage.clear();
        	    app.animateParchment('confirmation', 'createcharacter');
        	});
	
        	$('#cancel span').click(function() {
        	    app.animateParchment('confirmation', 'loadcharacter');
        	});
        	*/
            /* toggle (i)nfo ribbon when clicked
        	$('.ribbon').click(function() {
        	    app.toggleAbout();
        	});
			*/
            /* i stopped caring what these do
            $('#nameinput').bind("keyup", function() {
                app.toggleButton();
            });
    
            $('#previous').click(function() {
                var $achievements = $('#achievements');
        
                if(app.currentPage === 1) {
                    return false;
                } else {
                    app.currentPage -= 1;
                    $achievements.removeClass().addClass('active page' + app.currentPage);
                }
            });
    
            $('#next').click(function() {
                var $achievements = $('#achievements'),
                    $lists = $('#lists'),
                    nbPages = $lists.children('ul').length;
        
                if(app.currentPage === nbPages) {
                    return false;
                } else {
                    app.currentPage += 1;
                    $achievements.removeClass().addClass('active page' + app.currentPage);
                }
            });

            $('#notifications div').bind(TRANSITIONEND, app.resetMessagesPosition.bind(app));
    
            $('.close').click(function() {
                app.hideWindows();
            });
        
            $('.twitter').click(function() {
                var url = $(this).attr('href');

               app.openPopup('twitter', url);
               return false;
            });

            $('.facebook').click(function() {
                var url = $(this).attr('href');

               app.openPopup('facebook', url);
               return false;
            });
        
            var data = app.storage.data;
    		if(data.hasAlreadyPlayed) {
    		    if(data.player.name && data.player.name !== "") {
		            $('#playername').html(data.player.name);
    		        $('#playerimage').attr('src', data.player.image);
    		    }
    		}
    		
    		$('.play div').click(function(event) {
                var nameFromInput = $('#nameinput').attr('value'),
                    nameFromStorage = $('#playername').html(),
                    name = nameFromInput || nameFromStorage;
                
                app.tryStartingGame(name);
            });
        
            document.addEventListener("touchstart", function() {},false);
            
            $('#resize-check').bind("transitionend", app.resizeUi.bind(app));
            $('#resize-check').bind("webkitTransitionEnd", app.resizeUi.bind(app));
            $('#resize-check').bind("oTransitionEnd", app.resizeUi.bind(app));
        
            log.info("App initialized.");
        
            initGame();
            */
            initWebServiceClient();
            //testVector();
            runTests();
        });    	
    };
    initApp();
});