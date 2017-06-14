
define(['jquery', 'app', 'test/FFInteractiveObjectTest'],
	function($, App, FFInteractiveObjectTest) {
    var app, game;
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
		console.log(io);
		$("#stats").html(["HEALTH: ", io.getPCData().getFullAttributeScore("ST"), "/",
			io.getPCData().getFullAttributeScore("MST"), "<br>ATTACK: ",
			io.getPCData().getFullAttributeScore("SK")].join(""));
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
            // clicked New Game
    		$('#rerollChar').click(function(event) {
    			newHero();
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