/**
 * 
 */
define([ "com/dalonedrow/rpg/base/flyweights/baseinteractiveobject",
	"com/dalonedrow/rpg/base/flyweights/scriptable",
	"com/dalonedrow/rpg/base/flyweights/scripttimeraction",
	"com/dalonedrow/utils/hashcode"], function(BaseInteractiveObject, Scriptable, ScriptTimerAction,
			Hashcode) {
    function ScriptTimer() {
		Hashcode.call(this);
		/** the action taken when the script timer completes. */
		var action = null;
		/** the flag indicating whether the timer exists. */
		var exists = false;
		/** any flags set on the timer. */
		var flags = 0;
		/** the {@link IO} associated with this timer. */
		var io = null;
		/** the index of any array the timer is associated with. */
		var longinfo = 0;
		/** the timer's length in milliseconds. */
		var msecs = 0;
		/** the timer's name. */
		var name = null;
		/** the script associated with the timer. */
		var script = null;
		/** the amount of time passed since the timer was started. */
		var tim = 0;
		/** the number of times the timer repeats. */
		var times = 0;
		/** if true, the timer is turn-based, otherwise it is millisecond based. */
		var turnBased = false;
		/**
		 * Adds a flag set on the timer..
		 * @param flag the flag
		 */
		this.addFlag = function(flag) {
	        if (flag !== undefined
	        		&& flag !== null
	        		&& !isNaN(flag)
	        		&& flag && (flag & (flag - 1)) === 0) {
	        	flags |= flag;
	        } else {
	            var s = [];
	            s.push("ERROR! ScriptTimer.addFlag() - ");
	            s.push("flag must be power of 2");
	            throw new Error(s.join(""));
	        }
		}
		/** Clears all flags that were set. */
		this.clearFlags = function() {
			flags = 0;
		}
		/**
		 * Gets the flag indicating whether the timer exists.
		 * @return <code>boolean</code>
		 */
		this.exists = function() {
			return exists;
		}
		/**
		 * Gets the value for the action.
		 * @return {@link ScriptTimerAction}
		 */
		this.getAction = function() {
			return action;
		}
		/**
		 * Gets the {@link IO} associated with this timer.
		 * @return {@link IO}
		 */
		this.getIo = function() {
			return io;
		}
		/**
		 * Gets the index of any array the timer is associated with.
		 * @return {@link long}
		 */
		this.getLonginfo = function() {
			return longinfo;
		}
		/**
		 * Gets the timer's length in milliseconds.
		 * @return {@link long}
		 */
		this.getCycleLength = function() {
			return msecs;
		}
		/**
		 * Gets the timer's name.
		 * @return {@link String}
		 */
		this.getName = function() {
			return name;
		}
		/**
		 * Gets the script associated with the timer.
		 * @return {@link Scriptable}<{@link IO}>
		 */
		this.getScript = function() {
			return script;
		}
		/**
		 * Gets the amount of time passed since the timer was started.
		 * @return {@link long}
		 */
		this.getLastTimeCheck = function() {
			return tim;
		}
		/**
		 * Gets the number of times the timer repeats.
		 * @return {@link long}
		 */
		this.getRepeatTimes = function() {
			return times;
		}
		/**
		 * Determines if the {@link ScriptTimer} has a specific flag.
		 * @param flag the flag
		 * @return true if the {@link ScriptTimer} has the flag; false otherwise
		 */
		this.hasFlag = function(flag) {
	        if (flag !== undefined
	        		&& flag !== null
	        		&& !isNaN(flag)
	        		&& flag && (flag & (flag - 1)) === 0) {
				return (flags & flag) == flag;
	        } else {
	            var s = [];
	            s.push("ERROR! ScriptTimer.hasFlag() - ");
	            s.push("flag must be power of 2");
	            throw new Error(s.join(""));
	        }
		}
		/**
		 * Determines whether the timer is turn-based, or millisecond based.
		 * @return {@link boolean}
		 */
		this.isTurnBased = function() {
			return turnBased;
		}
		/**
		 * Removes a flag.
		 * @param flag the flag
		 */
		this.removeFlag = function(flag) {
	        if (flag !== undefined
	        		&& flag !== null
	        		&& !isNaN(flag)
	        		&& flag && (flag & (flag - 1)) === 0) {
				flags &= ~flag;
	        } else {
	            var s = [];
	            s.push("ERROR! ScriptTimer.removeFlag() - ");
	            s.push("flag must be power of 2");
	            throw new Error(s.join(""));
	        }
		}
		/**
		 * Sets the timer.
		 * @param params the parameters used to set the timer.
		 */
		this.set = function(params) {
	        if (params !== undefined
	        		&& params === null
	        		&& params instanceof ScriptTimerInitializationParameters) {
				script = params.getScript();
				exists = true;
				io = params.getIo();
				msecs = params.getMilliseconds();
				name = params.getName();
				action = new ScriptTimerAction(
						params.getObj(),
						params.getMethod(),
						params.getArgs());
				tim = params.getStartTime();
				times = params.getRepeatTimes();
				this.clearFlags();
				this.addFlag(params.getFlagValues());
        	} else {
	            var s = [];
	            s.push("ERROR! ScriptTimer.set() - ");
	            s.push("argument must be ScriptTimerInitializationParameters");
	            throw new Error(s.join(""));
        	}
		}
		/**
		 * Sets the action taken when the script timer completes.
		 * @param sta the {@link ScriptTimerAction}
		 */
		this.setAction = function(sta) {
	        if (params !== undefined
	        		&& params === null
	        		&& params instanceof ScriptTimerAction) {
				action = sta;
        	} else {
	            var s = [];
	            s.push("ERROR! ScriptTimer.setAction() - ");
	            s.push("argument must be ScriptTimerAction");
	            throw new Error(s.join(""));
        	}
		}
		/**
		 * Sets the timer's length in milliseconds.
		 * @param val the value to set
		 */
		this.setCycleLength = function(val) {
		    if (val !== undefined
		    		&& val !== null
		    		&& !isNaN(val)
		            && parseInt(Number(val)) === val) {
		    	msecs = val;
		    } else {
	            var s = [];
	            s.push("ERROR! ScriptTimer.setCycleLength() - ");
	            s.push("argument must be long integer");
	            throw new Error(s.join(""));
		    }
		}
		/**
		 * Sets the flag indicating whether the timer exists.
		 * @param flag the flag to set
		 */
		this.setExists = function(val) {
		    if (val !== undefined
		    		&& val !== null
		    		&& typeof val === "boolean") {
		    	exists = val;
		    } else {
	            var s = [];
	            s.push("ERROR! ScriptTimer.setExists() - ");
	            s.push("argument must be boolean");
	            throw new Error(s.join(""));
		    }
		}
		/**
		 * Sets the {@link IO} associated with this timer.
		 * @param val the value to set
		 */
		this.setIo = function(val) {
	        if (val !== undefined
	        		&& val === null
	        		&& val instanceof BaseInteractiveObject) {
				io = val;
        	} else {
	            var s = [];
	            s.push("ERROR! ScriptTimer.setIo() - ");
	            s.push("argument must be BaseInteractiveObject");
	            throw new Error(s.join(""));
        	}
		}
		/**
		 * Sets the index of any array the timer is associated with.
		 * @param val the value to set
		 */
		this.setLonginfo = function(val) {
		    if (val !== undefined
		    		&& val !== null
		    		&& !isNaN(val)
		            && parseInt(Number(val)) === val) {
		    	longinfo = val;
		    } else {
	            var s = [];
	            s.push("ERROR! ScriptTimer.setCycleLength() - ");
	            s.push("argument must be long integer");
	            throw new Error(s.join(""));
		    }
		}
		/**
		 * Sets the timer's name.
		 * @param val the value to set
		 */
		this.setName = function(val) {
		    if (val !== undefined
		    		&& val !== null
		    		&& typeof val === "string") {
		    	name = val;
		    } else {
	            var s = [];
	            s.push("ERROR! ScriptTimer.setName() - ");
	            s.push("argument must be string");
	            throw new Error(s.join(""));
		    }
		}
		/**
		 * Sets the script associated with the timer.
		 * @param val the {@link Scriptable}<{@link IO}> to set
		 */
		this.setScript = function(val) {
	        if (val !== undefined
	        		&& val === null
	        		&& val instanceof Scriptable) {
	        	script = val;
        	} else {
	            var s = [];
	            s.push("ERROR! ScriptTimer.setScript() - ");
	            s.push("argument must be Scriptable");
	            throw new Error(s.join(""));
        	}
		}
		/**
		 * Sets the amount of time passed since the timer was started.
		 * @param val the value to set
		 */
		this.setLastTimeCheck = function(val) {
		    if (val !== undefined
		    		&& val !== null
		    		&& !isNaN(val)
		            && parseInt(Number(val)) === val) {
				tim = val;
		    } else {
	            var s = [];
	            s.push("ERROR! ScriptTimer.setLastTimeCheck() - ");
	            s.push("argument must be long integer");
	            throw new Error(s.join(""));
		    }
		}
		/**
		 * Sets the number of times the timer repeats.
		 * @param val the value to set
		 */
		this.setRepeatTimes = function(val) {
		    if (val !== undefined
		    		&& val !== null
		    		&& !isNaN(val)
		            && parseInt(Number(val)) === val) {
				times = val;
		    } else {
	            var s = [];
	            s.push("ERROR! ScriptTimer.setRepeatTimes() - ");
	            s.push("argument must be long integer");
	            throw new Error(s.join(""));
		    }
		}
		/**
		 * Sets whether the timer is turn-based, or millisecond based.
		 * @param isTurnBased the new value to set
		 */
		this.setTurnBased = function(val) {
		    if (val !== undefined
		    		&& val !== null
		    		&& typeof val === "boolean") {
		    	turnBased = val;
		    } else {
	            var s = [];
	            s.push("ERROR! ScriptTimer.setTurnBased() - ");
	            s.push("argument must be boolean");
	            throw new Error(s.join(""));
		    }
		}
	}
	ScriptTimer.prototype = Object.create(Hashcode.prototype);
	return ScriptTimer;
});
