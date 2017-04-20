/**
 * 
 */
define(["com/dalonedrow/rpg/base/flyweights/baseinteractiveobject",
	"com/dalonedrow/rpg/base/flyweights/scriptable", "com/dalonedrow/utils/hashcode"],
		function(BaseInteractiveObject, Scriptable, Hashcode) {
	function ScriptTimerInitializationParameters() {
		Hashcode.call(this);
		/**
		 * the argument list supplied to the {@link Method} being invoked when the
		 * timer completes. can be null.
		 */
		var args = null;
		/** the flags set on the timer. */
		var flagValues = 0;
		/** the {@link IO} associated with the timer. */
		var io = null;
		/** the {@link Method} invoked on the associated {@link Object}. */
		var method = null;
		/** the number of milliseconds in the timer's cycle. */
		var milliseconds = 0;
		/** the timer's name. */
		var name = null;
		/** the {@link Object} having an action applied when the timer completes. */
		var obj = null;
		/** the number of times the timer repeats. */
		var repeatTimes = 0;
		/** the {@link Scriptable} associated with the timer. */
		var script = null;
		/** the time when the timer starts. */
		var startTime = 0;
		/** Clears all parameters. */
		this.clear = function() {
			args = null;
			flagValues = 0;
			io = null;
			method = null;
			milliseconds = 0;
			name = null;
			obj = null;
			repeatTimes = 0;
			script = null;
			startTime = 0;
		}
		/**
		 * Gets the argument list supplied to the {@link Method} being invoked when
		 * the timer completes. can be null.
		 * @return {@link Object}
		 */
		this.getArgs = function() {
			return args;
		}
		/**
		 * Gets the flags to set on the timer.
		 * @return {@link long}
		 */
		this.getFlagValues = function() {
			return flagValues;
		}
		/**
		 * Gets the {@link IO} associated with the timer.
		 * @return {@link IO}
		 */
		this.getIo = function() {
			return io;
		}
		/**
		 * Gets the {@link Method} invoked on the associated {@link Object}.
		 * @return {@link Method}
		 */
		this.getMethod = function() {
			return method;
		}
		/**
		 * Gets the number of milliseconds in the timer's cycle.
		 * @return {@link int}
		 */
		this.getMilliseconds = function() {
			return milliseconds;
		}
		/**
		 * Gets the timer's name.
		 * @return {@link String}
		 */
		this.getName = function() {
			return name;
		}
		/**
		 * Gets the {@link Object} having an action applied when the timer
		 * completes.
		 * @return {@link Object}
		 */
		this.getObj = function() {
			return obj;
		}
		/**
		 * Gets the number of times the timer repeats.
		 * @return {@link int}
		 */
		this.getRepeatTimes = function() {
			return repeatTimes;
		}
		/**
		 * Gets the {@link Scriptable} associated with the timer.
		 * @return {@link Scriptable<IO>}
		 */
		this.getScript = function() {
			return script;
		}
		/**
		 * Gets the time when the timer starts.
		 * @return {@link long}
		 */
		this.getStartTime = function() {
			return startTime;
		}
		/**
		 * Sets the argument list supplied to the {@link Method} being invoked when
		 * the timer completes. can be null.
		 * @param val the new value to set
		 */
		this.setArgs = function(val) {
	        if (val !== undefined) {
	        	if (val === null) {
	        		args = val;
	        	} else if (Array.isArray(val)) {
	        		args = val;	        	
	        	} else {
		            var s = [];
		            s.push("ERROR! ScriptTimerInitializationParameters.setArgs() - ");
		            s.push("argument must be Array");
		            throw new Error(s.join(""));
	        	}
	        } else {
	            var s = [];
	            s.push("ERROR! ScriptTimerInitializationParameters.setArgs() - ");
	            s.push("requires 1 argument");
	            throw new Error(s.join(""));
	        }
			args = val;
		}
		/**
		 * Sets the flags to set on the timer.
		 * @param val the new value to set
		 */
		this.setFlagValues = function(flag) {
	        if (flag !== undefined
	        		&& flag !== null
	        		&& !isNaN(flag)
	        		&& flag && (flag & (flag - 1)) === 0) {
	        	flagValues = flag;
	        } else {
	            var s = [];
	            s.push("ERROR! ScriptTimerInitializationParameters.setFlagValues() - ");
	            s.push("flag must be power of 2");
	            throw new Error(s.join(""));
	        }
		}
		/**
		 * Sets the {@link IO} associated with the timer.
		 * @param val the new value to set
		 */
		this.setIo = function(val) {
	        if (val !== undefined) {
	        	if (val === null) {
	        		io = val;
	        	} else if (val instanceof BaseInteractiveObject) {
	        		io = val;	        	
	        	} else {
		            var s = [];
		            s.push("ERROR! ScriptTimerInitializationParameters.setIo() - ");
		            s.push("argument must be BaseInteractiveObject");
		            throw new Error(s.join(""));
	        	}
	        } else {
	            var s = [];
	            s.push("ERROR! ScriptTimerInitializationParameters.setIo() - ");
	            s.push("requires 1 argument");
	            throw new Error(s.join(""));
	        }
		}
		/**
		 * Sets the {@link Method} invoked on the associated {@link Object}.
		 * @param val the new value to set
		 */
		this.setMethod = function(val) {
	        if (val !== undefined) {
	        	if (val === null) {
	        		method = val;
	        	} else if (typeof val === "function") {
	        		method = val;	        	
	        	} else {
		            var s = [];
		            s.push("ERROR! ScriptTimerInitializationParameters.setMethod() - ");
		            s.push("argument must be function");
		            throw new Error(s.join(""));
	        	}
	        } else {
	            var s = [];
	            s.push("ERROR! ScriptTimerInitializationParameters.setMethod() - ");
	            s.push("requires 1 argument");
	            throw new Error(s.join(""));
	        }
		}
		/**
		 * Sets the number of milliseconds in the timer's cycle.
		 * @param val the new value to set
		 */
		this.setMilliseconds = function(val) {
		    if (val !== undefined
		    		&& val !== null
		    		&& !isNaN(val)
		            && parseInt(Number(val)) === val) {
		    	milliseconds = val;
		    } else {
	            var s = [];
	            s.push("ERROR! ScriptTimerInitializationParameters.setMilliseconds() - ");
	            s.push("argument must be long integer");
	            throw new Error(s.join(""));
		    }
		}
		/**
		 * Sets the timer's name.
		 * @param val the new value to set
		 */
		this.setName = function(val) {
	        if (val !== undefined) {
	        	if (val === null) {
	        		name = val;
	        	} else if (typeof val === "string") {
	        		name = val;	        	
	        	} else {
		            var s = [];
		            s.push("ERROR! ScriptTimerInitializationParameters.setName() - ");
		            s.push("argument must be string");
		            throw new Error(s.join(""));
	        	}
	        } else {
	            var s = [];
	            s.push("ERROR! ScriptTimerInitializationParameters.setName() - ");
	            s.push("requires 1 argument");
	            throw new Error(s.join(""));
	        }
		}
		/**
		 * Sets the {@link Object} having an action applied when the timer
		 * completes.
		 * @param val the new value to set
		 */
		this.setObj = function(val) {
	        if (val !== undefined) {
				obj = val;
	        } else {
	            var s = [];
	            s.push("ERROR! ScriptTimerInitializationParameters.setObj() - ");
	            s.push("requires 1 argument");
	            throw new Error(s.join(""));
	        }
		}
		/**
		 * Sets the number of times the timer repeats.
		 * @param val the new value to set
		 */
		this.setRepeatTimes = function(val) {
	        if (val !== undefined) {
	        	if (val === null) {
	        		repeatTimes = val;
	        	} else if (typeof val === "string") {
	        		repeatTimes = val;	        	
	        	} else {
		            var s = [];
		            s.push("ERROR! ScriptTimerInitializationParameters.setRepeatTimes() - ");
		            s.push("argument must be string");
		            throw new Error(s.join(""));
	        	}
	        } else {
	            var s = [];
	            s.push("ERROR! ScriptTimerInitializationParameters.setRepeatTimes() - ");
	            s.push("requires 1 argument");
	            throw new Error(s.join(""));
	        }
		}
		/**
		 * Sets the {@link Scriptable} associated with the timer.
		 * @param val the new value to set
		 */
		this.setScript = function(val) {
	        if (val !== undefined) {
	        	if (val === null) {
	        		script = val;
	        	} else if (val instanceof SimpleVector3) {
	        		script = val; 	
	        	} else {
		            var s = [];
		            s.push("ERROR! ScriptTimerInitializationParameters.setScript() - ");
		            s.push("argument must be Scriptable");
		            throw new Error(s.join(""));
	        	}
	        } else {
	            var s = [];
	            s.push("ERROR! ScriptTimerInitializationParameters.setScript() - ");
	            s.push("requires 1 argument");
	            throw new Error(s.join(""));
	        }
		}
		/**
		 * Sets the time when the timer starts.
		 * @param val the new value to set
		 */
		this.setStartTime = function(val) {
		    if (val !== undefined
		    		&& val !== null
		    		&& !isNaN(val)
		            && parseInt(Number(val)) === val) {
		    	startTime = val;
		    } else {
	            var s = [];
	            s.push("ERROR! ScriptTimerInitializationParameters.setStartTime() - ");
	            s.push("argument must be long integer");
	            throw new Error(s.join(""));
		    }
		}
	}
	ScriptTimerInitializationParameters.prototype = Object.create(Hashcode.prototype);
	return ScriptTimerInitializationParameters;
});
