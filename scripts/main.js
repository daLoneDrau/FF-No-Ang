
define(['jquery', 'app', 
	"com/dalonedrow/engine/systems/base/projectconstants",
	"com/dalonedrow/module/ff/constants/ffcommand",
	'com/dalonedrow/module/ff/constants/ffequipmentelements',
	"com/dalonedrow/module/ff/constants/ffequipmentslots",
	//"com/dalonedrow/module/ff/systems/ffcontroller",
	//"com/dalonedrow/module/ff/systems/ffinteractive",
	"com/dalonedrow/module/ff/systems/ffcontroller",
	"com/dalonedrow/module/ff/systems/webserviceclient",
	'com/dalonedrow/engine/systems/base/interactive',
	"com/dalonedrow/rpg/base/constants/die",
	"com/dalonedrow/rpg/base/constants/dice",
	'test/FFInteractiveObjectTest'],
	function($, App, ProjectConstants, FFCommand, FFEquipmentElements, FFEquipmentSlots, 
			//FFController, FFInteractive,
			FFController, WebServiceClient, Interactive, Die, Dice, FFInteractiveObjectTest) {
    var app, game;
    console.log("main called");
    var initWebServiceClient = function() {
        var list = WebServiceClient.getInstance().getDieEntities();
        for (var i = 0, len = list.length; i < len; i++) {
        	if (!list[i].value) {
        		list[i].value = 0;
        	}
        	Die.values.push(new Die(list[i].code, list[i].value));
        }
        list = WebServiceClient.getInstance().getDiceEntities();
        for (var i = 0, len = list.length; i < len; i++) {
        	Dice.values.push(new Dice(list[i].code, list[i].number, Die[list[i].die.code],
        			list[i].plus));
        }
        list = WebServiceClient.getInstance().getCommandEntities();
        for (var i = 0, len = list.length; i < len; i++) {
        	if (!list[i].sort_order) {
        		list[i].sort_order = 0;
        	}
        	FFCommand.values.push(new FFCommand(list[i].name, list[i].sort_order));
        }
    	if (FFEquipmentElements.values.length === 0) {
    		console.log("need to load FFEquipmentElements2")
            list = WebServiceClient.getInstance().getEquipmentElementEntities();
            for (var i = 0, len = list.length; i < len; i++) {
            	if (!list[i].value) {
            		list[i].value = 0;
            	}
            	FFEquipmentElements.values.push(new FFEquipmentElements(list[i].code, list[i].value));
            }
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
    	var t = new FFInteractiveObjectTest();
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
        
            */
            initGame();
            //initWebServiceClient();
            //testVector();
            runTests();
        });    	
    };
    var initGame = function() {
		ProjectConstants.setInstance(new FFController());
		Interactive.setInstance(new FFInteractive());
    	/*
        require(['game'], function(Game) {            
            var canvas = document.getElementById("entities"),
        	    background = document.getElementById("background"),
        	    foreground = document.getElementById("foreground"),
        	    input = document.getElementById("chatinput");

    		game = new Game(app);
    		game.setup('#bubbles', canvas, background, foreground, input);
    		game.setStorage(app.storage);
    		app.setGame(game);
    		
    		if(app.isDesktop && app.supportsWorkers) {
    		    game.loadMap();
    		}
	
    		game.onGameStart(function() {
                app.initEquipmentIcons();
    		});
    		
    		game.onDisconnect(function(message) {
    		    $('#death').find('p').html(message+"<em>Please reload the page.</em>");
    		    $('#respawn').hide();
    		});
	
    		game.onPlayerDeath(function() {
    		    if($('body').hasClass('credits')) {
    		        $('body').removeClass('credits');
    		    }
                $('body').addClass('death');
    		});
	
    		game.onPlayerEquipmentChange(function() {
    		    app.initEquipmentIcons();
    		});
	
    		game.onPlayerInvincible(function() {
    		    $('#hitpoints').toggleClass('invincible');
    		});

    		game.onNbPlayersChange(function(worldPlayers, totalPlayers) {
    		    var setWorldPlayersString = function(string) {
        		        $("#instance-population").find("span:nth-child(2)").text(string);
        		        $("#playercount").find("span:nth-child(2)").text(string);
        		    },
        		    setTotalPlayersString = function(string) {
        		        $("#world-population").find("span:nth-child(2)").text(string);
        		    };
    		    
    		    $("#playercount").find("span.count").text(worldPlayers);
    		    
    		    $("#instance-population").find("span").text(worldPlayers);
    		    if(worldPlayers == 1) {
    		        setWorldPlayersString("player");
    		    } else {
    		        setWorldPlayersString("players");
    		    }
    		    
    		    $("#world-population").find("span").text(totalPlayers);
    		    if(totalPlayers == 1) {
    		        setTotalPlayersString("player");
    		    } else {
    		        setTotalPlayersString("players");
    		    }
    		});
	
    		game.onAchievementUnlock(function(id, name, description) {
    		    app.unlockAchievement(id, name);
    		});
	
    		game.onNotification(function(message) {
    		    app.showMessage(message);
    		});
	
            app.initHealthBar();
	
            $('#nameinput').attr('value', '');
    		$('#chatbox').attr('value', '');
    		
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
                    if(game) {
                	    game.click();
                	}
                	app.hideWindows();
                    // $('#chatinput').focus();
                });
            }

            $('body').unbind('click');
            $('body').click(function(event) {
                var hasClosedParchment = false;
                
                if($('#parchment').hasClass('credits')) {
                    if(game.started) {
                        app.closeInGameCredits();
                        hasClosedParchment = true;
                    } else {
                        app.toggleCredits();
                    }
                }
                
                if($('#parchment').hasClass('about')) {
                    if(game.started) {
                        app.closeInGameAbout();
                        hasClosedParchment = true;
                    } else {
                        app.toggleAbout();
                    }
                }
                
                if(game.started && !game.renderer.mobile && game.player && !hasClosedParchment) {
                    game.click();
                }
            });
            
            $('#respawn').click(function(event) {
                game.audioManager.playSound("revive");
                game.restart();
                $('body').removeClass('death');
            });
            
            $(document).mousemove(function(event) {
            	app.setMouseCoordinates(event);
            	if(game.started) {
            	    game.movecursor();
            	}
            });

            $(document).keydown(function(e) {
            	var key = e.which,
                    $chat = $('#chatinput');

                if(key === 13) {
                    if($('#chatbox').hasClass('active')) {
                        app.hideChat();
                    } else {
                        app.showChat();
                    }
                }
            });
            
            $('#chatinput').keydown(function(e) {
                var key = e.which,
                    $chat = $('#chatinput');

                if(key === 13) {
                    if($chat.attr('value') !== '') {
                        if(game.player) {
                            game.say($chat.attr('value'));
                        }
                        $chat.attr('value', '');
                        app.hideChat();
                        $('#foreground').focus();
                        return false;
                    } else {
                        app.hideChat();
                        return false;
                    }
                }
                
                if(key === 27) {
                    app.hideChat();
                    return false;
                }
            });

            $('#nameinput').keypress(function(event) {
                var $name = $('#nameinput'),
                    name = $name.attr('value');

                if(event.keyCode === 13) {
                    if(name !== '') {
                        app.tryStartingGame(name, function() {
                            $name.blur(); // exit keyboard on mobile
                        });
                        return false; // prevent form submit
                    } else {
                        return false; // prevent form submit
                    }
                }
            });
            
            $('#mutebutton').click(function() {
                game.audioManager.toggle();
            });
            
            $(document).bind("keydown", function(e) {
            	var key = e.which,
            	    $chat = $('#chatinput');

                if($('#chatinput:focus').size() == 0 && $('#nameinput:focus').size() == 0) {
                    if(key === 13) { // Enter
                        if(game.ready) {
                            $chat.focus();
                            return false;
                        }
                    }
                    if(key === 32) { // Space
                        // game.togglePathingGrid();
                        return false;
                    }
                    if(key === 70) { // F
                        // game.toggleDebugInfo();
                        return false;
                    }
                    if(key === 27) { // ESC
                        app.hideWindows();
                        _.each(game.player.attackers, function(attacker) {
                            attacker.stop();
                        });
                        return false;
                    }
                    if(key === 65) { // a
                        // game.player.hit();
                        return false;
                    }
                } else {
                    if(key === 13 && game.ready) {
                        $chat.focus();
                        return false;
                    }
                }
            });
            
            if(game.renderer.tablet) {
                $('body').addClass('tablet');
            }
        });
            */
    };
    initApp();
});