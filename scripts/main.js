
define(['jquery', 'app'], function($, App) {
    var app, game, webserviceclient;
    console.log("main called");
    var initWebServiceClient = function() {
        require(['com/dalonedrow/module/ff/systems/webserviceclient'], function(WebServiceClient) {
        	webserviceclient = new WebServiceClient();
        	log.info(JSON.parse(webserviceclient.getTextEntityByName("START"))[0]);
        });    	
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
        });    	
    };
    initApp();
});