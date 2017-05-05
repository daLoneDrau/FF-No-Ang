
define(['jquery', 'app', 'test/FFInteractiveObjectTest'],
	function($, App, ProjectConstants, FFCommand, FFEquipmentElements, FFEquipmentSlots, 
			FFController, FFInteractive, FFScript, WebServiceClient, Interactive, Die, Dice, Script,
			FFInteractiveObjectTest) {
    var app, game;
    console.log("main called");
    var runTests = function() {
    	var t = new FFInteractiveObjectTest();
    	t.test();
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
            $('body').click(function(event) {
            	console.log("clicked on body");
            });
            // clicked New Game
    		$('#parchment .startgame').click(function(event) {
                app.tryStartingGame(name);
            });
            initGame();
            //runTests();
        });    	
    };
    var initGame = function() {
        require(['game'], function(Game) {
            
            var canvas = document.getElementById("entities"),
        	    background = document.getElementById("background"),
        	    foreground = document.getElementById("foreground");
        	    //input = document.getElementById("chatinput");

    		game = new Game(app);
    		game.setup('#bubbles', canvas, background, foreground);
    		//game.setup('#bubbles', canvas, background, foreground, input);
    		game.setStorage(app.storage);
    		app.setGame(game);
        });
    };
    initApp();
});