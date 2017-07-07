/**
 * 
 */
define(["com/dalonedrow/engine/systems/base/inputevent",
	"com/dalonedrow/engine/systems/base/time",
	"com/dalonedrow/rpg/base/systems/script", 
	"com/dalonedrow/utils/hashcode"],
	function(InputEvent, Time, Script, Hashcode) {
    var instance = null;
    var GameCycle = function() {
        if (instance !== null){
            throw new Error("Cannot instantiate more than one GameCycle, use GameCycle.getInstance()");
        }
		Hashcode.call(this);
		/** the stack of input events. */
		this.inputStack = [];
		/** the parent class containing the renderer. */
		this.parent;
		this.firstFrame = false;
	}
    GameCycle.prototype = Object.create(Hashcode.prototype);
    /**
     * Gets the parent class.
     */
    GameCycle.prototype.getParent = function(parent) {
    	return this.parent;
    }
    /**
     * Sets the parent class.
     */
    GameCycle.prototype.setParent = function(parent) {
    	this.parent = parent;
    }
    GameCycle.prototype.newEvent = function(event) {
		try {
    		this.checkInstanceOf(event, InputEvent);
    	} catch (err) {
            var s = [];
            s.push("ERROR! GameCycle() - event ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	this.inputStack.push(event);
    	this.menuMode = GameCycle.MENUS_OFF
    }
    GameCycle.prototype.execute = function() {
        // get frame start
        Time.getInstance().startFrame();
        // on splash? do not stop rendering
        // manageSplashThings();
    	
    	if (this.parent.state === 3) {	
	        // clicked new quest? start new quest
	        // if (startNewQuest) {
	        //	startNewQuest();
	        // }
	    	
	        // first frame? update player for first frame ARX_PLAYER_Frame_Update()
	        if (this.firstFrame) {
	        	console.log("1st frame - do frame update");
	        	// ARX_PLAYER_Frame_Update();
	        }
	
	        // ESC key down?
	        if (this.inputStack.length > 0
	        		&& this.inputStack[0].getType() === InputEvent.KEY_TYPE) {
	        	console.log("have a key event");
	            // if menus are off
	            if (this.menuMode === GameCycle.MENUS_OFF) {
	            	console.log("menus off");
	            	// menus are off
	            	// is a speech playing?
	            	// true - turn off speech
	            	// false - do following
	                // pause time
	                // create a screenshot
	                // display menus against that background
	                // put player in normal stance (as opposed to fighting)
	            }        	
	        }
	
	        // being teleported? change level
	
	        // launching intro? show intro and stop processing
	
	        // set screen size and compute center
	
	        if (!this.firstFrame) {
	            // not first frame
	            // if menus are off
	            if (this.menuMode === GameCycle.MENUS_OFF) {
	                // set flags for keyboard and mouse input
	            	// such as mouse over inventory or mouse over spellbook
	                // wait for input
	            }
	            // if player NOT paralyzed AND menus NOT on AND NOT ignoring input
	            // process input
	        } else {
	            // else first frame
	            // do 1st frame tasks
	        	this.firstFrame = !this.firstFrame;
	        }
	
	        // rendering menus? keep rendering and exit processing
	
	        // quicksave? do it
	
	        // quickload? do it.
	
	        // special rendering? keep rendering and exit processing
	
	        // 2d cinematics? keep rendering and exit processing
	
	        // menus off? controls not blocked? player not paralyzed?
	        //*************************
	        // process input/interaction with environment
	        // (i.e., clicking an NPC, inventory, clicking IO in environment)
	        //*************************
	
	        //*************************
	        // manage player movement
	        //*************************
	
	        //*************************
	        // manage the player's visual display
	        //*************************
	
	
	        // check script timers
	        if (!this.firstFrame) {
	        	Script.getInstance().timerCheck();
	        }
	        // check speeches

	        // player is dead? switch to dead camera and block the controls

	        // update cameras

	        // check frame - ARX_PLAYER_FrameCheck

	        // apply global mods - ARX_GLOBALMODS_Apply

	        // manage quake fx

	        // set sound listener position
	    }

        //*************************
        // start rendering
        //*************************
    	this.parent.renderer.renderFrame();

    	if (this.parent.state === 3) {	
	        // start particles
	
	        // manage magic
	
	        // manage torch
	
	        // check for spell fx
	
	        // fade screen red for hits
	
	        // manage notes
	
	        // update spells
	
	        // player dead for 2 seconds? launch death process
	
	        // draw game interface if needed
	
	        // check and update speeches
	
	        // render minimap
	
	        // render cursor
	
	        // end rendering
	        // write and flush output
	
	        // get snapshot if F10 pressed
	
	        // if no menus means game is being played
	        if (this.menuMode === GameCycle.MENUS_OFF) {
	        	console.log("event stack");
	        	Script.getInstance().eventStackExecute();
	            // allow interscript execution
	            // eventstack execute
	            // update damages
	            // update missiles
	        }
    	}
        // end
    };
    /** flag indicating menus are off. */
    GameCycle.MENUS_OFF = true;
    GameCycle.getInstance = function() {
        if (instance === null) {
        	console.log("no instance of GameCycle")
            instance = new GameCycle();
        }
        return instance;
	}
    GameCycle.setInstance = function(val) {
		if (val === undefined) {
	        throw new Error("Error!  GameCycle.setInstance() - val is undefined");
		}
		if (val === null) {
	        throw new Error("Error!  GameCycle.setInstance() - val is null");
		}
		if (!(val instanceof GameCycle)) {
	        throw new Error("Error!  GameCycle.setInstance() - val is not a GameCycle subclass.")
		}
		instance = val;
	}
	return GameCycle;
});

