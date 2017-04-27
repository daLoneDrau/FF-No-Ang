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
        if (initParams === undefined) {
            var s = [];
            s.push("ERROR! SendParameters() - ");
            s.push("initParams must be string or null");
            throw new Error(s.join(""));
        }
        if (initParams !== null
        		&& typeof initParams !== "string") {
            var s = [];
            s.push("ERROR! SendParameters() - ");
            s.push("initParams must be string");
            throw new Error(s.join(""));
        }
        if (gName === undefined) {
            var s = [];
            s.push("ERROR! SendParameters() - ");
            s.push("gName must be string or null");
            throw new Error(s.join(""));
        }
        if (gName !== null
        		&& typeof gName !== "string") {
            var s = [];
            s.push("ERROR! SendParameters() - ");
            s.push("gName must be string");
            throw new Error(s.join(""));
        }
        if (eventParams === undefined) {
            var s = [];
            s.push("ERROR! SendParameters() - ");
            s.push("eventParams must be array or null");
            throw new Error(s.join(""));
        }
        if (eName === undefined) {
            var s = [];
            s.push("ERROR! SendParameters() - ");
            s.push("eName must be string or null");
            throw new Error(s.join(""));
        }
        if (eName !== null
        		&& typeof eName !== "string") {
            var s = [];
            s.push("ERROR! SendParameters() - ");
            s.push("eName must be string");
            throw new Error(s.join(""));
        }
        if (tName === undefined) {
            var s = [];
            s.push("ERROR! SendParameters() - ");
            s.push("tName must be string or null");
            throw new Error(s.join(""));
        }
        if (tName !== null
        		&& typeof tName !== "string") {
            var s = [];
            s.push("ERROR! SendParameters() - ");
            s.push("tName must be string");
            throw new Error(s.join(""));
        }
	    if (rad === undefined
	    		&& rad === null
	    		&& isNaN(rad)
	            && parseInt(Number(rad)) !== rad
	            && isNaN(parseInt(rad, 10))) {
            var s = [];
            s.push("ERROR! SendParameters() - ");
            s.push("rad must be int");
            throw new Error(s.join(""));
	    }
	    var eventName = eName;
	    var eventParameters = eventParams;
	    var flags = 0;
	    var groupName = gName;
	    var radius = rad;
	    var targetName = tName;
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
	    /**
	     * Adds a flag.
	     * @param flag the flag
	     */
	    this.addFlag = function(flag) {
	        if (flag !== undefined
	        		&& flag !== null
	        		&& !isNaN(flag)
		            && parseInt(Number(flag)) === flag
	        		&& flag && (flag & (flag - 1)) === 0) {
		        flags |= flag;
	        } else {
	            var s = [];
	            s.push("ERROR! SendParameters.addFlag() - ");
	            s.push("flag must be power of 2");
	            throw new Error(s.join(""));
	        }
	    }
	    /**
	     * @return the speechName
	     */
	    this.getEventName = function() {
	        return eventName;
	    }
	    /**
	     * @return the eventParameters
	     */
	    this.getEventParameters = function() {
	        return eventParameters;
	    }
	    /**
	     * @return the speechName
	     */
	    this.getGroupName = function() {
	        return groupName;
	    }
	    /**
	     * @return the radius
	     */
	    this.getRadius = function() {
	        return radius;
	    }
	    /**
	     * @return the speechName
	     */
	    this.getTargetName = function() {
	        return targetName;
	    }
	    /**
	     * Determines if the {@link BaseInteractiveObject} has a specific flag.
	     * @param flag the flag
	     * @return true if the {@link BaseInteractiveObject} has the flag; false
	     *         otherwise
	     */
	   this.hasFlag = function(flag) {
	        if (flag !== undefined
	        		&& flag !== null
	        		&& !isNaN(flag)
		            && parseInt(Number(flag)) === flag
	        		&& flag && (flag & (flag - 1)) === 0) {
		        return (flags & flag) == flag;
	        } else {
	            var s = [];
	            s.push("ERROR! SendParameters.hasFlag() - ");
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
		            && parseInt(Number(flag)) === flag
	        		&& flag && (flag & (flag - 1)) === 0) {
		        flags &= ~flag;
	        } else {
	            var s = [];
	            s.push("ERROR! SendParameters.removeFlag() - ");
	            s.push("flag must be power of 2");
	            throw new Error(s.join(""));
	        }
	    }
	    /**
	     * @param val the value to set
	     */
	    this.setEventName = function(val) {
	        if (val !== undefined) {
	        	if (val === null) {
	        		eventName = val;
	        	} else if (typeof val === "string") {
	        		eventName = val;	        	
	        	} else {
		            var s = [];
		            s.push("ERROR! SendParameters.setEventName() - ");
		            s.push("argument must be string");
		            throw new Error(s.join(""));
	        	}
	        } else {
	            var s = [];
	            s.push("ERROR! SendParameters.setEventName() - ");
	            s.push("requires 1 argument");
	            throw new Error(s.join(""));
	        }
	    }
	    /**
	     * @param eventParameters the eventParameters to set
	     */
	    this.setEventParameters = function(val) {
	        if (val !== undefined) {
	        	if (val === null) {
	        		eventParameters = val;
	        	} else if (Array.isArray(val)) {
	        		eventParameters = val;	        	
	        	} else {
		            var s = [];
		            s.push("ERROR! SendParameters.setEventParameters() - ");
		            s.push("argument must be string");
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
	        if (val !== undefined) {
	        	if (val === null) {
	        		groupName = val;
	        	} else if (typeof val === "string") {
	        		groupName = val;	        	
	        	} else {
		            var s = [];
		            s.push("ERROR! SendParameters.setGroupName() - ");
		            s.push("argument must be string");
		            throw new Error(s.join(""));
	        	}
	        } else {
	            var s = [];
	            s.push("ERROR! SendParameters.setGroupName() - ");
	            s.push("requires 1 argument");
	            throw new Error(s.join(""));
	        }
	    }
	    /**
	     * @param radius the radius to set
	     */
	    this.setRadius = function(val) {
		    if (val !== undefined
		    		&& val !== null
		    		&& !isNaN(val)
		            && parseInt(Number(val)) === val
		            && !isNaN(parseInt(val, 10))) {
		    	radius = val;
		    } else {
	            var s = [];
	            s.push("ERROR! SendParameters.setRadius() - ");
	            s.push("argument must be integer");
	            throw new Error(s.join(""));
		    }
	    }
	    /**
	     * @param val the value to set
	     */
	    this.setTargetName = function(val) {
	        if (val !== undefined) {
	        	if (val === null) {
	        		targetName = val;
	        	} else if (typeof val === "string") {
	        		targetName = val;	        	
	        	} else {
		            var s = [];
		            s.push("ERROR! SendParameters.setTargetName() - ");
		            s.push("argument must be string");
		            throw new Error(s.join(""));
	        	}
	        } else {
	            var s = [];
	            s.push("ERROR! SendParameters.setTargetName() - ");
	            s.push("requires 1 argument");
	            throw new Error(s.join(""));
	        }
	    }
	}
    SendParameters.prototype = Object.create(Hashcode.prototype);
    SendParameters.FIX = 2;
    SendParameters.GROUP = 1;
    SendParameters.ITEM = 4;
    SendParameters.NPC = 8;
    SendParameters.RADIUS = 16;
    SendParameters.ZONE = 32;
	return SendParameters;
});
