/**
 * 
 */
define(["com/dalonedrow/utils/hashcode"], function(Hashcode) {
	/** the singleton instance. */
    var instance = null;
    var Time = function() {
        if (instance !== null){
            throw new Error("Cannot instantiate more than one Time, use Time.getInstance()");
        }
		Hashcode.call(this);
    	this.frameStart;
		/** the actual game time. */
    	this.gameTime = 0;
		/** the length in ns that each game loop should take. */
    	this.idealLoopTime = 0;
		this.LastFrameTime = 0;				// ARX: jycorbel
		/** the time the game was paused. */
		this.timePaused = 0;
		/** flag indicating whether the timer has been initialized. */
		this.timerInit = false;
		/** flag indicating whether the game is paused or not. */
		this.timerPaused = false;
		/** the time the timer was started. */
		this.timerStart = 0;
		/** the total time the game has been spent paused. */
		this.totalTimePaused	= 0;
    }
    Time.prototype = Object.create(Hashcode.prototype);
	/**
	 * Resets the timer - possibly due to lag when between game screens.
	 * @param time the time to which the timers are being reset
	 */
	Time.prototype.forceTimerReset = function(time) {
    	try {
    		this.checkInteger(time);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Time.forceTimerReset() - time ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		var tim = getCurrentTime();
		this.totalTimePaused = tim - time;
		this.gameTime = time;
		this.timePaused = 0;
		this.timerPaused = false;
	}
	/**
	 * Gets the number of milliseconds that have passed since the game was
	 * started.
	 * @return float
	 */
	Time.prototype.getCurrentTime = function() {
		this.initializeTimer(); // initialize the timer if needed
		var now = performance.now();
		return now - this.timerStart;
	}
	/**
	 * Gets the frameStart
	 * @return {@link float}
	 */
	Time.prototype.getFrameStart = function() {
		return this.frameStart;
	}
	/**
	 * Gets the number of milliseconds that have passed since the game was
	 * started.
	 * @param usePause if true, the time returned include the time spent paused;
	 *            otherwise the time returned does not include paused time
	 * @return long
	 */
	Time.prototype.getGameTime = function(usePause) {
    	try {
    		this.checkBoolean(usePause);
    	} catch (err) {
    		usePause = false;
    	}
		var tim = this.getCurrentTime();
		if (this.timerPaused && usePause) {
			this.gameTime = tim;
		} else {
			this.gameTime = tim - this.totalTimePaused;
		}
		return this.gameTime;
	}
	/**
	 * Gets the number of frames per second the game should run at.
	 * @return {@link int}
	 */
	Time.prototype.getIdealLoopTime = function() {
		return this.idealLoopTime;
	}
	/** Initializes the game timer. */
	Time.prototype.init = function() {
		this.initializeTimer();
		var tim = this.getCurrentTime();
		this.totalTimePaused = tim;
		this.gameTime = 0;
		this.timePaused = 0;
		this.timerPaused = false;
		// ARX_BEGIN: jycorbel (2010-07-19) - Add external vars for
		// resetting them on ARX_TIME_Init call.
		// Currently when ARX_TIME_Init
		// the substract FrameDiff = FrameTime - LastFrameTime
		// is negative because of resetting totalTimePaused.
		// This solution reinit FrameTime & LastFrameTime to get a min
		// frameDiff = 0 on ARX_TIME_Init.
		// frameStart = LastFrameTime = gameTime;
		// ARX_END: jycorbel (2010-07-19)
	}
	/** Hidden method to start the game timer. */
	Time.prototype.initializeTimer = function() {
		if (!this.timerInit) {
			// if the timer hasn't been started, start it
			this.timerStart = performance.now();
			this.timerInit = true;
			this.init();
		}
	}
	/**
	 * Determines if the game is paused.
	 * @return if true, the timer has been paused; false otherwise
	 */
	Time.prototype.isTimerPaused = function() {
		return this.timerPaused;
	}
	/** Pauses the game, and sets the time at which the pause started. */
	Time.prototype.pause = function() {
		if (!this.timerPaused) {
			// get the current time
			// store the time the pause started in a field
			this.timePaused = getCurrentTime();
			// set the paused flag
			this.timerPaused = true;
		}
	}
	/**
	 * Sets the number of frames per second the game should run at.
	 * @param val the fps to set
	 */
	Time.prototype.setIdealLoopTime = function(val) {
    	try {
    		this.checkInteger(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Time.setIdealLoopTime() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		this.idealLoopTime = val;
	}
	Time.prototype.startFrame = function() {
		this.frameStart = this.getGameTime();
	}
	/** Unpauses the game, and updates the time spent paused. */
	Time.prototype.unpause = function() {
		if (this.timerPaused) {
			// get the current time
			// update the amount of time spent paused
			this.totalTimePaused += this.getCurrentTime() - this.timePaused;
			// remove the time the pause was started
			this.timePaused = 0;
			// remove the paused flag
			this.timerPaused = false;
		}
	}
	Time.prototype.getGameRound = function() {
		return 1;
	}
	Time.getInstance = function() {
        if (instance === null) {
            instance = new Time();
        }
        return instance;
	}
	Time.setInstance = function(val) {
		if (val === undefined) {
	        throw new Error("Error!  Time.setInstance() - val is undefined");
		}
		if (val === null) {
	        throw new Error("Error!  Time.setInstance() - val is null");
		}
		if (!(val instanceof Time)) {
	        throw new Error("Error!  Time.setInstance() - val is not a Time subclass.")
		}
		instance = val;
	}
	return Time;
});
