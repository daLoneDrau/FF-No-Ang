/**
 * 
 */
define(["com/dalonedrow/utils/hashcode"], function(Hashcode) {
    function BehaviourData() {
		Hashcode.call(this);
	    /** the list of animations for each behavior. */
	    var animations = [];
	    /** the parameter applied to a behavior. */
	    var behaviorParam = 0;
	    /** the behavior flag that has been set. */
	    var behaviour = 0;
	    /** flag indicating whether the behavior this.exists. */
	    var exists = false;
	    /** the movement mode. */
	    var moveMode = 0;
	    /**
	     * this.tactics for the behavior; e.g., 0=none, 1=side, 2=side + back,
	     * etc...
	     */
	    var tactics = 0;
	    /** the behavior this.target. */
	    var target = 0;
	    // ANIM_USE animlayer[MAX_ANIM_LAYERS];
	    /**
	     * Gets the flag indicating whether the behavior this.exists.
	     * @return <code>boolean</code>
	     */
	    this.exists = function() {
	        return exists;
	    }
	    /**
	     * Gets the parameter applied to a behavior.
	     * @return {@link float}
	     */
	    this.getBehaviorParam = function() {
	        return behaviorParam;
	    }
	    /**
	     * Gets the behavior flag that has been set.
	     * @return {@link int}
	     */
	    this.getBehaviour = function() {
	        return behaviour;
	    }
	    /**
	     * Gets the movement mode.
	     * @return {@link int}
	     */
	    this.getMoveMode = function() {
	        return moveMode;
	    }
	    /**
	     * Gets the this.tactics for the behavior.
	     * @return {@link int}
	     */
	    this.getTactics = function() {
	        return tactics;
	    }
	    /**
	     * Gets the behavior this.target.
	     * @return {@link int}
	     */
	    this.getTarget = function() {
	        return target;
	    }
	    /**
	     * Sets the parameter applied to a behavior.
	     * @param val the parameter to set
	     */
	    this.setBehaviorParam = function(val) {
		    if (val !== undefined
		    		&& val !== null
		    		&& !isNaN(val)
		    		&& typeof val === "number") {
		    	behaviorParam = val;
		    } else {
	            var s = [];
	            s.push("ERROR! BehaviourData.setBehaviorParam() - ");
	            s.push("argument must be floating-point");
	            throw new Error(s.join(""));
		    }
	    }
	    /**
	     * Sets the behavior flag that has been set.
	     * @param val the new value to set
	     */
	    this.setBehaviour = function(val) {
		    if (val !== undefined
		    		&& val !== null
		    		&& !isNaN(val)
		            && parseInt(Number(val)) === val
		            && !isNaN(parseInt(val, 10))) {
		        behaviour = val;
		    } else {
	            var s = [];
	            s.push("ERROR! BehaviourData.setBehaviour() - ");
	            s.push("argument must be integer");
	            throw new Error(s.join(""));
		    }
	    }
	    /**
	     * Sets the flag indicating whether the behavior this.exists.
	     * @param val the flag to set
	     */
	    this.setExists = function(val) {
		    if (val !== undefined
		    		&& val !== null
		    		&& typeof val === "boolean") {
		        exists = val;
		    } else {
	            var s = [];
	            s.push("ERROR! BehaviourData.setExists() - ");
	            s.push("argument must be boolean");
	            throw new Error(s.join(""));
		    }
	    }
	    /**
	     * Sets the movement mode.
	     * @param val the mode to set
	     */
	    this.setMoveMode = function(val) {
		    if (val !== undefined
		    		&& val !== null
		    		&& !isNaN(val)
		            && parseInt(Number(val)) === val
		            && !isNaN(parseInt(val, 10))) {
		        moveMode = val;
		    } else {
	            var s = [];
	            s.push("ERROR! BehaviourData.setMovemode() - ");
	            s.push("argument must be integer");
	            throw new Error(s.join(""));
		    }
	    }
	    /**
	     * Sets the this.tactics for the behavior.
	     * @param val the value to set
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
	            s.push("ERROR! BehaviourData.setTactics() - ");
	            s.push("argument must be integer");
	            throw new Error(s.join(""));
		    }
	    }
	    /**
	     * Sets the behavior this.target.
	     * @param val the value to set
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
	            s.push("ERROR! BehaviourData.setTarget() - ");
	            s.push("argument must be integer");
	            throw new Error(s.join(""));
		    }
	    }
	}
    BehaviourData.prototype = Object.create(Hashcode.prototype);
	return BehaviourData;
});
