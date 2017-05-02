/**
 * 
 */
define(["com/dalonedrow/engine/systems/base/interactive",
	"com/dalonedrow/rpg/base/constants/scriptglobals", "com/dalonedrow/utils/hashcode"],
		function(Interactive, ScriptGlobals, Hashcode) {
	function TargetParameters(initParams) {
		Hashcode.call(this);
    	try {
    		this.checkString(vinitParamsal);
    	} catch (err) {
            var s = [];
            s.push("ERROR! TargetParameters() - initParams ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
	    this.flags = 0;
	    this.targetInfo = -1;
	    
	    var split = initParams.split(" ");
	    for (var i = split.length - 1; i >= 0; i--) {
	        if (split[i].indexOf("-") === 0) {
	            if (split[i].toUpperCase().indexOf("S") >= 0) {
	                this.addFlag(ScriptGlobals.PATHFIND_ONCE);
	            }
	            if (split[i].toUpperCase().indexOf("A") >= 0) {
	                this.addFlag(ScriptGlobals.PATHFIND_ALWAYS);
	            }
	            if (split[i].toUpperCase().indexOf("N") >= 0) {
	                this.addFlag(ScriptGlobals.PATHFIND_NO_UPDATE);
	            }
	        }
	        if (split[i].toUpperCase() === "PATH") {
	        	this.targetInfo = -2;
	        }
	        if (split[i].toUpperCase() === "PLAYER") {
	        	this.targetInfo = Interactive.getInstance().getTargetByNameTarget("PLAYER");
	        }
	        if (split[i].toUpperCase() === "NONE") {
	        	this.targetInfo = ScriptGlobals.TARGET_NONE;
	        }
	        if (split[i].indexOf("NODE_") === 0) {
	        	this.targetInfo = Interactive.getInstance().getTargetByNameTarget(
	            		split[i].replace(/NODE_/, ""));
	        }
	        if (split[i].indexOf("OBJECT_") === 0) {
	        	this.targetInfo = Interactive.getInstance().getTargetByNameTarget(
	                    split[i].replace(/OBJECT_/, ""));
	        }
	        if (split[i].indexOf("ID_") === 0) {
	            var id = parseInt(split[i].replace(/ID_/, ""));
	            if (Interactive.getInstance().hasIO(id)) {
	            	this.targetInfo = id;
	            }
	        }
	    }
	}
	TargetParameters.prototype = Object.create(Hashcode.prototype);
    /**
     * Adds a flag.
     * @param flag the flag
     */
	TargetParameters.prototype.addFlag = function(flag) {
    	try {
    		this.checkPowerOfTwo(flag);
    	} catch (err) {
            var s = [];
            s.push("ERROR! TargetParameters.addFlag() - flag ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	this.flags |= flag;
    }
	TargetParameters.prototype.clearFlags = function() {
		this.flags = 0;
    }
    /**
     * @return the flags
     */
	TargetParameters.prototype.getFlags = function() {
        return this.flags;
    }
    /**
     * @return the targetInfo
     */
	TargetParameters.prototype.getTargetInfo = function() {
        return this.targetInfo;
    }
    /**
     * Determines if the {@link BaseInteractiveObject} has a specific flag.
     * @param flag the flag
     * @return true if the {@link BaseInteractiveObject} has the flag; false
     *         otherwise
     */
	TargetParameters.prototype.hasFlag = function(flag) {
    	try {
    		this.checkPowerOfTwo(flag);
    	} catch (err) {
            var s = [];
            s.push("ERROR! TargetParameters.hasFlag() - flag ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        return (this.flags & flag) == flag;
    }
    /**
     * Removes a flag.
     * @param flag the flag
     */
	TargetParameters.prototype.removeFlag = function(flag) {
    	try {
    		this.checkPowerOfTwo(flag);
    	} catch (err) {
            var s = [];
            s.push("ERROR! TargetParameters.removeFlag() - flag ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	this.flags &= ~flag;
    }
    /**
     * @param targetInfo the targetInfo to set
     */
	TargetParameters.prototype.setTargetInfo = function(val) {
    	try {
    		this.checkInteger(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! TargetParameters.setTargetInfo() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	this.targetInfo = val;
    }
	return TargetParameters;
});
