define(["com/dalonedrow/rpg/base/constants/behaviourglobals",
	"com/dalonedrow/rpg/base/constants/ioglobals", 
	"com/dalonedrow/rpg/base/flyweights/baseinteractiveobject", "com/dalonedrow/utils/hashcode"],
		function(BehaviourGlobals, IOGlobals, BaseInteractiveObject, Hashcode) {
	function BehaviorParameters(initParams, bParam) {
	    Hashcode.call(this);
        if (initParams === undefined
        		|| initParams === null
        		|| typeof initParams !== "string") {
            var s = [];
            s.push("ERROR! BehaviorParameters() - ");
            s.push("initParams must be string");
            throw new Error(s.join(""));
        }
	    if (bParam === undefined
	    		|| bParam === null
	    		|| isNaN(bParam)
	    		|| typeof bParam !== "number") {
            var s = [];
            s.push("ERROR! BehaviorParameters() - ");
            s.push("bParam must be floating-point");
            throw new Error(s.join(""));
	    }
	    var action = null;
	    var behaviorParam = bParam;
	    var flags = 0;
	    var movemode = -1;
	    var tactics = -1;
	    var targetInfo = -1;
	    var targetName = null;
	    var split = initParams.split(" ");
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
	            s.push("ERROR! BehaviorParameters.addFlag() - ");
	            s.push("flag must be power of 2");
	            throw new Error(s.join(""));
	        }
	    }
	    this.clearFlags = function() {
	        flags = 0;
	    }
	    /**
	     * @param val the value to set
	     */
	    this.setAction = function(val) {
	        if (val !== undefined) {
	        	if (val === null) {
	        		action = val;
	        	} else if (typeof val === "string") {
	        		action = val;	        	
	        	} else {
		            var s = [];
		            s.push("ERROR! BehaviorParameters.setAction() - ");
		            s.push("argument must be string");
		            throw new Error(s.join(""));
	        	}
	        } else {
	            var s = [];
	            s.push("ERROR! BehaviorParameters.setAction() - ");
	            s.push("requires 1 argument");
	            throw new Error(s.join(""));
	        }
	    }
	    for (var i = split.length - 1; i >= 0; i--) {
	        if (split[i] === "STACK") {
	            this.setAction("STACK");
	            break;
	        }
	        if (split[i] === "UNSTACK") {
	        	this.setAction("UNSTACK");
	            break;
	        }
	        if (split[i] === "UNSTACKALL") {
	        	this.setAction("UNSTACKALL");
	            break;
	        }
	        if (split[i] === "L") {
	        	this.addFlag(BehaviourGlobals.BEHAVIOUR_LOOK_AROUND);
	        }
	        if (split[i] === "S") {
	        	this.addFlag(BehaviourGlobals.BEHAVIOUR_SNEAK);
	        }
	        if (split[i] === "D") {
	        	this.addFlag(BehaviourGlobals.BEHAVIOUR_DISTANT);
	        }
	        if (split[i] === "M") {
	        	this.addFlag(BehaviourGlobals.BEHAVIOUR_MAGIC);
	        }
	        if (split[i] === "F") {
	        	this.addFlag(BehaviourGlobals.BEHAVIOUR_FIGHT);
	        }
	        if (split[i] === "A") {
	        	this.addFlag(BehaviourGlobals.BEHAVIOUR_STARE_AT);
	        }
	        if (split[i] === "0"
	                || split[i] === "1"
	                || split[i] === "2") {
	            tactics = 0;
	        }
	        if (split[i] === "GO_HOME") {
	        	this.clearFlags();
	            this.addFlag(BehaviourGlobals.BEHAVIOUR_GO_HOME);
	        }
	        if (split[i] === "FRIENDLY") {
	        	this.clearFlags();
	            this.addFlag(BehaviourGlobals.BEHAVIOUR_FRIENDLY);
	            movemode = IoGlobals.NOMOVEMODE;
	        }
	        if (split[i] === "MOVE_TO") {
	        	this.clearFlags();
	            this.addFlag(BehaviourGlobals.BEHAVIOUR_MOVE_TO);
	            movemode = IoGlobals.WALKMODE;
	        }
	        if (split[i] === "FLEE") {
	        	this.clearFlags();
	            this.addFlag(BehaviourGlobals.BEHAVIOUR_FLEE);
	            movemode = IoGlobals.RUNMODE;
	        }
	        if (split[i] === "LOOK_FOR") {
	        	this.clearFlags();
	            this.addFlag(BehaviourGlobals.BEHAVIOUR_LOOK_FOR);
	            movemode = IoGlobals.WALKMODE;
	        }
	        if (split[i] === "HIDE") {
	        	this.clearFlags();
	            this.addFlag(BehaviourGlobals.BEHAVIOUR_HIDE);
	            movemode = IoGlobals.WALKMODE;
	        }
	        if (split[i] === "WANDER_AROUND") {
	        	this.clearFlags();
	            this.addFlag(BehaviourGlobals.BEHAVIOUR_WANDER_AROUND);
	            movemode = IoGlobals.WALKMODE;
	        }
	        if (split[i] === "GUARD") {
	        	this.clearFlags();
	            this.addFlag(BehaviourGlobals.BEHAVIOUR_GUARD);
	            movemode = IoGlobals.NOMOVEMODE;
	            targetInfo = -2;
	        }
	    }
	    /**
	     * @return the speechName
	     */
	    this.getAction = function() {
	        return action;
	    }
	    /**
	     * @return the behaviorParam
	     */
	    this.getBehaviorParam = function() {
	        return behaviorParam;
	    }
	    /**
	     * @return the flags
	     */
	    this.getFlags = function() {
	        return flags;
	    }
	    /**
	     * @return the movemode
	     */
	    this.getMoveMode = function() {
	        return movemode;
	    }
	    /**
	     * @return the tactics
	     */
	    this.getTactics = function() {
	        return tactics;
	    }
	    /**
	     * @return the targetInfo
	     */
	    this.getTargetInfo = function() {
	        return targetInfo;
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
		        return (flags & flag) === flag;
	        } else {
	            var s = [];
	            s.push("ERROR! BehaviorParameters.hasFlag() - ");
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
	            s.push("ERROR! BehaviorParameters.hasFlag() - ");
	            s.push("flag must be power of 2");
	            throw new Error(s.join(""));
	        }
	    }
	    /**
	     * @param movemode the movemode to set
	     */
	    this.setMoveMode = function(val) {
		    if (val !== undefined
		    		&& val !== null
		    		&& !isNaN(val)
		            && parseInt(Number(val)) === val
		            && !isNaN(parseInt(val, 10))) {
		        movemode = val;
		    } else {
	            var s = [];
	            s.push("ERROR! BehaviorParameters.setMovemode() - ");
	            s.push("argument must be integer");
	            throw new Error(s.join(""));
		    }
	    }
	    /**
	     * @param tactics the tactics to set
	     */
	    this.setTactics = function(val) {
		    if (val !== undefined
		    		&& val !== null
		    		&& !isNaN(val)
		            && parseInt(Number(val)) === val
		            && !isNaN(parseInt(val, 10))) {
		    	tactics = val;
		    } else {
	            var s = [];
	            s.push("ERROR! BehaviorParameters.setTactics() - ");
	            s.push("argument must be integer");
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
	            s.push("ERROR! BehaviorParameters.setTargetinfo() - ");
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
		            s.push("ERROR! BehaviorParameters.setTargetName() - ");
		            s.push("argument must be string");
		            throw new Error(s.join(""));
	        	}
	        } else {
	            var s = [];
	            s.push("ERROR! BehaviorParameters.setTargetName() - ");
	            s.push("requires 1 argument");
	            throw new Error(s.join(""));
	        }
	    }
	}
	BehaviorParameters.prototype = Object.create(Hashcode.prototype);
	return BehaviorParameters;
});
