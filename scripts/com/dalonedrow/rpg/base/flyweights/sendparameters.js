define(["com/dalonedrow/utils/hashcode"], function(Hashcode) {
	/**
	 * Creates a new instance of {@link SendParameters}.
	 * @param initParams the initialization parameters, such as GROUP, RADIUS,
	 *            etc.
	 * @param gName the group name
	 * @param eventParams the event parameters
	 * @param eName the event name
	 * @param tName the target name
	 * @param rad the radius
	 */
	function SendParameters(initParams, gName, eventParams, eName, tName, rad) {
		Hashcode.call(this);
    	try {
    		this.checkStringNullsAllowed(initParams);
    	} catch (err) {
            var s = [];
            s.push("ERROR! SendParameters() - initParams ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkStringNullsAllowed(gName);
    	} catch (err) {
            var s = [];
            s.push("ERROR! SendParameters() - gName ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        if (eventParams === undefined) {
            var s = [];
            s.push("ERROR! SendParameters() - ");
            s.push("eventParams must be array or null");
            throw new Error(s.join(""));
        }
    	try {
    		this.checkStringNullsAllowed(eName);
    	} catch (err) {
            var s = [];
            s.push("ERROR! SendParameters() - eName ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkStringNullsAllowed(tName);
    	} catch (err) {
            var s = [];
            s.push("ERROR! SendParameters() - tName ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkInteger(rad);
    	} catch (err) {
            var s = [];
            s.push("ERROR! SendParameters() - rad ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
	    this.eventName = eName;
	    this.eventParameters = eventParams;
	    this.flags = 0;
	    this.groupName = gName;
	    this.radius = rad;
	    this.targetName = tName;
        if (initParams != null
                && initParams.length() > 0) {
            var split = initParams.split(" ");
            for (var i = split.length - 1; i >= 0; i--) {
                if (split[i].equalsIgnoreCase("GROUP")) {
                    this.addFlag(SendParameters.GROUP);
                }
                if (split[i].equalsIgnoreCase("FIX")) {
                	this.addFlag(SendParameters.FIX);
                }
                if (split[i].equalsIgnoreCase("ITEM")) {
                	this.addFlag(SendParameters.ITEM);
                }
                if (split[i].equalsIgnoreCase("NPC")) {
                	this.addFlag(SendParameters.NPC);
                }
                if (split[i].equalsIgnoreCase("RADIUS")) {
                	this.addFlag(SendParameters.RADIUS);
                }
                if (split[i].equalsIgnoreCase("ZONE")) {
                	this.addFlag(SendParameters.ZONE);
                }
            }
        }
	}
    SendParameters.prototype = Object.create(Hashcode.prototype);
    /**
     * Adds a flag.
     * @param flag the flag
     */
    this.addFlag = function(flag) {
	   	try {
			this.checkPowerOfTwo(val);
		} catch (err) {
	        var s = [];
	        s.push("ERROR! SendParameters.addFlag() - val ");
	        s.push(err.message);
	        throw new Error(s.join(""));
		}
    	this.flags |= flag;
    }
    /**
     * @return the speechName
     */
    this.getEventName = function() {
        return this.eventName;
    }
    /**
     * @return the eventParameters
     */
    this.getEventParameters = function() {
        return this.eventParameters;
    }
    /**
     * @return the speechName
     */
    this.getGroupName = function() {
        return this.groupName;
    }
    /**
     * @return the radius
     */
    this.getRadius = function() {
        return this.radius;
    }
    /**
     * @return the speechName
     */
    this.getTargetName = function() {
        return this.targetName;
    }
    /**
     * Determines if the {@link BaseInteractiveObject} has a specific flag.
     * @param flag the flag
     * @return true if the {@link BaseInteractiveObject} has the flag; false
     *         otherwise
     */
   this.hasFlag = function(flag) {
	   	try {
			this.checkPowerOfTwo(val);
		} catch (err) {
	        var s = [];
	        s.push("ERROR! SendParameters.hasFlag() - val ");
	        s.push(err.message);
	        throw new Error(s.join(""));
		}
        return (this.flags & flag) == flag;
    }
    /**
     * Removes a flag.
     * @param flag the flag
     */
    this.removeFlag = function(flag) {
    	try {
    		this.checkPowerOfTwo(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! SendParameters.removeFlag() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	this.flags &= ~flag;
    }
    /**
     * @param val the value to set
     */
    this.setEventName = function(val) {
    	try {
    		this.checkStringNullsAllowed(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! SendParameters.setEventName() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		this.eventName = val;	
    }
    /**
     * @param eventParameters the eventParameters to set
     */
    this.setEventParameters = function(val) {
        if (val !== undefined) {
        	if (val === null) {
        		this.eventParameters = val;
        	} else if (Array.isArray(val)) {
        		this.eventParameters = val;
        	} else {
	            var s = [];
	            s.push("ERROR! SendParameters.setEventParameters() - ");
	            s.push("argument must be Array");
	            throw new Error(s.join(""));
        	}
        } else {
            var s = [];
            s.push("ERROR! SendParameters.setEventParameters() - ");
            s.push("requires 1 argument");
            throw new Error(s.join(""));
        }
    }
    /**
     * @param val the value to set
     */
    this.setGroupName = function(val) {
    	try {
    		this.checkStringNullsAllowed(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! SendParameters.setGroupName() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		this.groupName = val;
    }
    /**
     * @param radius the radius to set
     */
    this.setRadius = function(val) {
    	try {
    		this.checkInteger(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! SendParameters.setRadius() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	this.radius = val;
    }
    /**
     * @param val the value to set
     */
    this.setTargetName = function(val) {
    	try {
    		this.checkStringNullsAllowed(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! SendParameters.setTargetName() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		this.targetName = val;
    }
    SendParameters.FIX = 2;
    SendParameters.GROUP = 1;
    SendParameters.ITEM = 4;
    SendParameters.NPC = 8;
    SendParameters.RADIUS = 16;
    SendParameters.ZONE = 32;
	return SendParameters;
});
