/**
 * 
 */
define(["com/dalonedrow/engine/systems/base/interactive",
	"com/dalonedrow/rpg/base/constants/scriptglobals", "com/dalonedrow/utils/hashcode"],
		function(Interactive, ScriptGlobals, Hashcode) {
	function TargetParameters(initParams) {
        if (initParams === undefined
        		|| initParams === null
        		|| typeof initParams !== "string") {
            var s = [];
            s.push("ERROR! TargetParameters() - ");
            s.push("constructor argument must be string");
            throw new Error(s.join(""));
    	}
		Hashcode.call(this);
	    var flags = 0;
	    var targetInfo = -1;
	    
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
	            targetInfo = -2;
	        }
	        if (split[i].toUpperCase() === "PLAYER") {
	            targetInfo = Interactive.getInstance().getTargetByNameTarget("PLAYER");
	        }
	        if (split[i].toUpperCase() === "NONE") {
	            targetInfo = ScriptGlobals.TARGET_NONE;
	        }
	        if (split[i].indexOf("NODE_") === 0) {
	            targetInfo = Interactive.getInstance().getTargetByNameTarget(
	            		split[i].replace(/NODE_/, ""));
	        }
	        if (split[i].indexOf("OBJECT_") === 0) {
	            targetInfo = Interactive.getInstance().getTargetByNameTarget(
	                    split[i].replace(/OBJECT_/, ""));
	        }
	        if (split[i].indexOf("ID_") === 0) {
	            var id = parseInt(split[i].replace(/ID_/, ""));
	            if (Interactive.getInstance().hasIO(id)) {
	                targetInfo = id;
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
	            s.push("ERROR! TargetParameters.addFlag() - ");
	            s.push("flag must be power of 2");
	            throw new Error(s.join(""));
	        }
	    }
	    this.clearFlags = function() {
	        flags = 0;
	    }
	    /**
	     * @return the flags
	     */
	    this.getFlags = function() {
	        return flags;
	    }
	    /**
	     * @return the targetInfo
	     */
	    this.getTargetInfo = function() {
	        return targetInfo;
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
	            s.push("ERROR! TargetParameters.hasFlag() - ");
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
	            s.push("ERROR! TargetParameters.removeFlag() - ");
	            s.push("flag must be power of 2");
	            throw new Error(s.join(""));
	        }
	    }
	    /**
	     * @param targetInfo the targetInfo to set
	     */
	    this.setTargetInfo = function(val) {
		    if (val !== undefined
		    		&& val !== null
		    		&& !isNaN(val)
		            && parseInt(Number(val)) === val
		            && !isNaN(parseInt(val, 10))) {
		    	targetInfo = val;
		    } else {
	            var s = [];
	            s.push("ERROR! TargetParameters.setTargetInfo() - ");
	            s.push("argument must be integer");
	            throw new Error(s.join(""));
		    }
	    }
	}
	TargetParameters.prototype = Object.create(Hashcode.prototype);
	return TargetParameters;
});
