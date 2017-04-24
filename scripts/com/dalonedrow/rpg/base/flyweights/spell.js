/**
 *
 */
define(["com/dalonedrow/utils/hashcode"], function(Hashcode) {
    function Spell() {
		Hashcode.call(this);
		/** the caster's reference id. */
		var caster = 0;
		/** the caster's level. */
		var casterLevel = 0;
		var	exists = false;
		/** any flags that have been set. */
		var flags	= 0;
		var id = -1;
		var lastTurnUpdated = 0;
		var lastUpdated = 0;
		var longinfo = 0;
		var longinfo2 = 0;
		var misc = null;
		var target = 0;
		var timeCreated = 0;
		var timeToLive = 0;
		var turnCreated = 0;
		var turnsToLive = 0;
		var type = 0;
		/**
		 * Adds a flag.
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
	            s.push("ERROR! Spell.addFlag() - ");
	            s.push("flag must be power of 2");
	            throw new Error(s.join(""));
	        }
		}
		/** Clears all flags that were set. */
		this.clearFlags = function() {
			flags = 0;
		}
		/**
		 * Gets the exists
		 * @return <code>boolean</code>
		 */
		this.exists = function() {
			return exists;
		}
		/**
		 * Gets the caster
		 * @return {@link int}
		 */
		this.getCaster = function() {
			return caster;
		}
		/**
		 * Gets the caster level.
		 * @return {@link float}
		 */
		this.getCasterLevel = function() {
			return casterLevel;
		}
		/**
		 * Gets the ID.
		 * @return {@link int}
		 */
		this.getId = function() {
			return id;
		}
		/**
		 * Gets the lastTurnUpdated
		 * @return {@link int}
		 */
		this.getLastTurnUpdated = function() {
			return lastTurnUpdated;
		}
		/**
		 * Gets the lastUpdated
		 * @return {@link long}
		 */
		this.getLastUpdated = function() {
			return lastUpdated;
		}
		/**
		 * Gets the value of the longinfo.
		 * @return {@link int}
		 */
		this.getLonginfo = function() {
			return longinfo;
		}
		/**
		 * Gets the value of the longinfo2.
		 * @return {@link int}
		 */
		this.getLonginfo2 = function() {
			return longinfo2;
		}
		/**
		 * Gets the value of the misc.
		 * @return {@link Object}
		 */
		this.getMisc = function() {
			return misc;
		}
		/**
		 * Gets the target
		 * @return {@link int}
		 */
		this.getTarget = function() {
			return target;
		}
		/**
		 * Gets the timeCreated
		 * @return {@link long}
		 */
		this.getTimeCreated = function() {
			return timeCreated;
		}
		/**
		 * Gets the timeToLive
		 * @return {@link long}
		 */
		this.getTimeToLive = function() {
			return timeToLive;
		}
		/**
		 * Gets the turnCreated
		 * @return {@link int}
		 */
		this.getTurnCreated = function() {
			return turnCreated;
		}
		/**
		 * Gets the turnsToLive
		 * @return {@link int}
		 */
		this.getTurnsToLive = function() {
			return turnsToLive;
		}
		/**
		 * Gets the type
		 * @return {@link int}
		 */
		this.getType = function() {
			return type;
		}
		/**
		 * Determines if the {@link Spell} has a specific flag.
		 * @param flag the flag
		 * @return true if the {@link Spell} has the flag; false otherwise
		 */
		this.hasFlag = function(flag) {
	        if (flag !== undefined
	        		&& flag !== null
	        		&& !isNaN(flag)
	        		&& flag && (flag & (flag - 1)) === 0) {
				return (flags & flag) == flag;
	        } else {
	            var s = [];
	            s.push("ERROR! Spell.hasFlag() - ");
	            s.push("flag must be power of 2");
	            throw new Error(s.join(""));
	        }
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
	            s.push("ERROR! Spell.removeFlag() - ");
	            s.push("flag must be power of 2");
	            throw new Error(s.join(""));
	        }
		}
		/**
		 * Sets the caster
		 * @param caster the caster to set
		 */
		this.setCaster = function(val) {
		    if (val !== undefined
		    		&& val !== null
		    		&& !isNaN(val)
		            && parseInt(Number(val)) === val
		            && !isNaN(parseInt(val, 10))) {
		    	caster = val;
		    } else {
	            var s = [];
	            s.push("ERROR! Spell.setCaster() - ");
	            s.push("argument must be integer");
	            throw new Error(s.join(""));
		    }
		}
		/**
		 * Sets the caster level.
		 * @param val the level to set
		 */
		this.setCasterLevel = function(val) {
		    if (val !== undefined
		    		&& val !== null
		    		&& !isNaN(val)) {
				casterLevel = val;
		    } else {
	            var s = [];
	            s.push("ERROR! Spell.setCasterLevel() - ");
	            s.push("argument must be floating-point");
	            throw new Error(s.join(""));
		    }
		}
		/**
		 * Sets the caster
		 * @param caster the caster to set
		 */
		this.setId = function(val) {
		    if (val !== undefined
		    		&& val !== null
		    		&& !isNaN(val)
		            && parseInt(Number(val)) === val
		            && !isNaN(parseInt(val, 10))) {
		    	id = val;
		    } else {
	            var s = [];
	            s.push("ERROR! Spell.setId() - ");
	            s.push("argument must be integer");
	            throw new Error(s.join(""));
		    }
		}
		/**
		 * Sets the exists
		 * @param exists the exists to set
		 */
		this.setExists = function(val) {
		    if (val !== undefined
		    		&& val !== null
		    		&& typeof val === "boolean") {
		    	exists = val;
		    } else {
	            var s = [];
	            s.push("ERROR! Spell.setExists() - ");
	            s.push("argument must be boolean");
	            throw new Error(s.join(""));
		    }
		}
		/**
		 * Sets the lastTurnUpdated
		 * @param lastTurnUpdated the lastTurnUpdated to set
		 */
		this.setLastTurnUpdated = function(val) {
		    if (val !== undefined
		    		&& val !== null
		    		&& !isNaN(val)
		            && parseInt(Number(val)) === val
		            && !isNaN(parseInt(val, 10))) {
		    	lastTurnUpdated = val;
		    } else {
	            var s = [];
	            s.push("ERROR! Spell.setLastTurnUpdated() - ");
	            s.push("argument must be integer");
	            throw new Error(s.join(""));
		    }
		}
		/**
		 * Sets the lastUpdated
		 * @param lastUpdated the lastUpdated to set
		 */
		this.setLastUpdated = function(val) {
		    if (val !== undefined
		    		&& val !== null
		    		&& !isNaN(val)
		            && parseInt(Number(val)) === val) {
		    	lastUpdated = val;
		    } else {
	            var s = [];
	            s.push("ERROR! Spell.setLastUpdated() - ");
	            s.push("argument must be long integer");
	            throw new Error(s.join(""));
		    }
		}
		/**
		 * Sets the value of the longinfo.
		 * @param longinfo the value to set
		 */
		this.setLonginfo = function(val) {
		    if (val !== undefined
		    		&& val !== null
		    		&& !isNaN(val)
		            && parseInt(Number(val)) === val) {
		    	longinfo = val;
		    } else {
	            var s = [];
	            s.push("ERROR! Spell.setLonginfo() - ");
	            s.push("argument must be long integer");
	            throw new Error(s.join(""));
		    }
		}
		/**
		 * Sets the value of the longinfo2.
		 * @param longinfo2 the value to set
		 */
		this.setLonginfo2 = function(val) {
		    if (val !== undefined
		    		&& val !== null
		    		&& !isNaN(val)
		            && parseInt(Number(val)) === val) {
		    	longinfo2 = val;
		    } else {
	            var s = [];
	            s.push("ERROR! Spell.setLonginfo2() - ");
	            s.push("argument must be long integer");
	            throw new Error(s.join(""));
		    }
		}
		/**
		 * Sets the value of the misc.
		 * @param misc the value to set
		 */
		this.setMisc = function(val) {
	        if (val !== undefined) {
	        	misc = val;
	        } else {
	            var s = [];
	            s.push("ERROR! Spell.setMisc() - ");
	            s.push("requires 1 argument");
	            throw new Error(s.join(""));
	        }
		}
		/**
		 * Sets the target
		 * @param target the target to set
		 */
		this.setTarget = function(val) {
		    if (val !== undefined
		    		&& val !== null
		    		&& !isNaN(val)
		            && parseInt(Number(val)) === val
		            && !isNaN(parseInt(val, 10))) {
		    	target = val;
		    } else {
	            var s = [];
	            s.push("ERROR! Spell.setTarget() - ");
	            s.push("argument must be integer");
	            throw new Error(s.join(""));
		    }
		}
		/**
		 * Sets the timeCreated
		 * @param timeCreated the timeCreated to set
		 */
		this.setTimeCreated = function(val) {
		    if (val !== undefined
		    		&& val !== null
		    		&& !isNaN(val)
		            && parseInt(Number(val)) === val) {
		    	timeCreated = val;
		    } else {
	            var s = [];
	            s.push("ERROR! Spell.setTimeCreated() - ");
	            s.push("argument must be long integer");
	            throw new Error(s.join(""));
		    }
		}
		/**
		 * Sets the timeToLive
		 * @param timeToLive the timeToLive to set
		 */
		this.setTimeToLive = function(val) {
		    if (val !== undefined
		    		&& val !== null
		    		&& !isNaN(val)
		            && parseInt(Number(val)) === val) {
		    	timeToLive = val;
		    } else {
	            var s = [];
	            s.push("ERROR! Spell.setTimeToLive() - ");
	            s.push("argument must be long integer");
	            throw new Error(s.join(""));
		    }
		}
		/**
		 * Sets the turnCreated
		 * @param turnCreated the turnCreated to set
		 */
		this.setTurnCreated = function(val) {
		    if (val !== undefined
		    		&& val !== null
		    		&& !isNaN(val)
		            && parseInt(Number(val)) === val
		            && !isNaN(parseInt(val, 10))) {
		    	turnCreated = val;
		    } else {
	            var s = [];
	            s.push("ERROR! Spell.setTurnCreated() - ");
	            s.push("argument must be integer");
	            throw new Error(s.join(""));
		    }
		}
		/**
		 * Sets the turnsToLive
		 * @param turnsToLive the turnsToLive to set
		 */
		this.setTurnsToLive = function(val) {
		    if (val !== undefined
		    		&& val !== null
		    		&& !isNaN(val)
		            && parseInt(Number(val)) === val
		            && !isNaN(parseInt(val, 10))) {
		    	turnsToLive = val;
		    } else {
	            var s = [];
	            s.push("ERROR! Spell.setTurnsToLive() - ");
	            s.push("argument must be integer");
	            throw new Error(s.join(""));
		    }
		}
		/**
		 * Sets the type
		 * @param type the type to set
		 */
		this.setType = function(val) {
		    if (val !== undefined
		    		&& val !== null
		    		&& !isNaN(val)
		            && parseInt(Number(val)) === val
		            && !isNaN(parseInt(val, 10))) {
		    	type = val;
		    } else {
	            var s = [];
	            s.push("ERROR! Spell.setType() - ");
	            s.push("argument must be integer");
	            throw new Error(s.join(""));
		    }
		}
	}
    Spell.prototype = Object.create(Hashcode.prototype);
	return Spell;
});
