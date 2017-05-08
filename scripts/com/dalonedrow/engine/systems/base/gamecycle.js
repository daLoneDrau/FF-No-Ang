/**
 * 
 */
define(["com/dalonedrow/utils/hashcode"], function(Hashcode) {
    var instance = null;
    var GameCycle = function() {
        if (instance !== null){
            throw new Error("Cannot instantiate more than one GameCycle, use GameCycle.getInstance()");
        }
		Hashcode.call(this);
	}
    GameCycle.prototype = Object.create(Hashcode.prototype);
    GameCycle.prototype.execute = function() {
        // get frame start
        Time.getInstance().getFrameStart();

        // on splash? do not stop rendering

        // clicked new quest? start new quest

        // first frame? update player for first frame ARX_PLAYER_Frame_Update()

        // ESC key down?
        // if menus are off
        // if speeches are playing, cancel them
        // else
        // pause time
        // create a screenshot
        // display menus against that background
        // put player in normal stance (as opposed to fighting)
        //

        // being teleported? change level

        // launching intro? show intro and stop processing

        // set screen size and compute center

        if (!firstFrame) {
            // not first frame
            // set flags for keyboard and mouse input
            // wait for input
            InputProcessor.getInstance().acceptInput();
        } else {
            // else first frame
            // do 1st frame tasks
            firstFrame = !firstFrame;
        }

        // rendering menus? keep rendering and exit processing

        // quicksave? do it

        // quickload? do it.

        // special rendering? keep rendering and exit processing

        // 2d cinematics? keep rendering and exit processing

        // menus off? controls not blocked? player not paralyzed?
        // process input/interaction with environment
        // (i.e., clicking an NPC, inventory, clicking IO in environment)
        InputEvent.getInstance().processActions();

        // manage player movement

        // manage the player's visual display

        // start rendering
        // render screens to the output buffer
        ConsoleInterface.getInstance().prepareForRendering();

        // check script timers
        Script.getInstance().timerCheck();

        // check speeches

        // player is dead? switch to dead camera and block the controls

        // update cameras

        // check frame - ARX_PLAYER_FrameCheck

        // apply global mods - ARX_GLOBALMODS_Apply

        // manage quake fx

        // set sound listener position

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
        OutputEvent.getInstance().render();

        // get snapshot if F10 pressed

        // if no menus means game is being played
        Script.getInstance().eventStackExecute();
        // allow interscript execution
        // eventstack execute
        // update damages
        // update missiles

        // end
    };
    GameCycle.getInstance = function() {
        if (instance === null) {
        	throw new Error("No instance has been set!");
        }
        return instance;
	}
    GameCycle.setInstance = function(val) {
		if (val === undefined) {
	        throw new Error("Error!  ProjectConstants.setInstance() - val is undefined");
		}
		if (val === null) {
	        throw new Error("Error!  ProjectConstants.setInstance() - val is null");
		}
		if (!(val instanceof GameCycle)) {
	        throw new Error("Error!  GameCycle.setInstance() - val is not a GameCycle subclass.")
		}
		instance = val;
	}
	return GameCycle;
});

