/**
 * 
 */
define(["com/dalonedrow/utils/hashcode"], function(Hashcode) {
    function BehaviourData() {
		Hashcode.call(this);
	    /** the list of animations for each behavior. */
		this.animations = [];
	    /** the parameter applied to a behavior. */
		this.behaviorParam = 0;
	    /** the behavior flag that has been set. */
		this.behaviour = 0;
	    /** flag indicating whether the behavior this.exists. */
		this.exists = false;
	    /** the movement mode. */
		this.moveMode = 0;
	    /**
	     * this.tactics for the behavior; e.g., 0=none, 1=side, 2=side + back,
	     * etc...
	     */
		this.tactics = 0;
	    /** the behavior this.target. */
		this.target = 0;
	    // ANIM_USE animlayer[MAX_ANIM_LAYERS];
	}
    BehaviourData.prototype = Object.create(Hashcode.prototype);
    /**
     * Gets the flag indicating whether the behavior this.exists.
     * @return <code>boolean</code>
     */
    BehaviourData.prototype.exists = function() {
        return this.exists;
    }
    /**
     * Gets the parameter applied to a behavior.
     * @return {@link float}
     */
    BehaviourData.prototype.getBehaviorParam = function() {
        return this.behaviorParam;
    }
    /**
     * Gets the behavior flag that has been set.
     * @return {@link int}
     */
    BehaviourData.prototype.getBehaviour = function() {
        return this.behaviour;
    }
    /**
     * Gets the movement mode.
     * @return {@link int}
     */
    BehaviourData.prototype.getMoveMode = function() {
        return this.moveMode;
    }
    /**
     * Gets the this.tactics for the behavior.
     * @return {@link int}
     */
    BehaviourData.prototype.getTactics = function() {
        return this.tactics;
    }
    /**
     * Gets the behavior this.target.
     * @return {@link int}
     */
    BehaviourData.prototype.getTarget = function() {
        return this.target;
    }
    /**
     * Sets the parameter applied to a behavior.
     * @param val the parameter to set
     */
    BehaviourData.prototype.setBehaviorParam = function(val) {
	    if (val === undefined
	    		|| val === null
	    		|| isNaN(val)
	    		|| typeof val !== "number") {
            var s = [];
            s.push("ERROR! BehaviourData.setBehaviorParam() - ");
            s.push("argument must be floating-point");
            throw new Error(s.join(""));
	    }
    	this.behaviorParam = val;
    }
    /**
     * Sets the behavior flag that has been set.
     * @param val the new value to set
     */
    BehaviourData.prototype.setBehaviour = function(val) {
	    if (val === undefined
	    		|| val === null
	    		|| isNaN(val)
	    		|| parseInt(Number(val)) !== val
	            || isNaN(parseInt(val, 10))) {
            var s = [];
            s.push("ERROR! BehaviourData.setBehaviour() - ");
            s.push("argument must be integer");
            throw new Error(s.join(""));
	    }
    	this.behaviour = val;
    }
    /**
     * Sets the flag indicating whether the behavior this.exists.
     * @param val the flag to set
     */
    BehaviourData.prototype.setExists = function(val) {
	    if (val === undefined
	    		|| val === null
	    		|| typeof val !== "boolean") {
            var s = [];
            s.push("ERROR! BehaviourData.setExists() - ");
            s.push("argument must be boolean");
            throw new Error(s.join(""));
	    }
    	this.exists = val;
    }
    /**
     * Sets the movement mode.
     * @param val the mode to set
     */
    BehaviourData.prototype.setMoveMode = function(val) {
	    if (val === undefined
	    		|| val === null
	    		|| isNaN(val)
	    		|| parseInt(Number(val)) !== val
	            || isNaN(parseInt(val, 10))) {
            var s = [];
            s.push("ERROR! BehaviourData.setMoveMode() - ");
            s.push("argument must be integer");
            throw new Error(s.join(""));
	    }
    	this.moveMode = val;
    }
    /**
     * Sets the this.tactics for the behavior.
     * @param val the value to set
     */
    BehaviourData.prototype.setTactics = function(val) {
	    if (val === undefined
	    		|| val === null
	    		|| isNaN(val)
	    		|| parseInt(Number(val)) !== val
	            || isNaN(parseInt(val, 10))) {
            var s = [];
            s.push("ERROR! BehaviourData.setTactics() - ");
            s.push("argument must be integer");
            throw new Error(s.join(""));
	    }
    	this.tactics = val;
    }
    /**
     * Sets the behavior this.target.
     * @param val the value to set
     */
    BehaviourData.prototype.setTarget = function(val) {
	    if (val === undefined
	    		|| val === null
	    		|| isNaN(val)
	    		|| parseInt(Number(val)) !== val
	            || isNaN(parseInt(val, 10))) {
            var s = [];
            s.push("ERROR! BehaviourData.setTarget() - ");
            s.push("argument must be integer");
            throw new Error(s.join(""));
	    }
    	this.target = val;
    }
	return BehaviourData;
});
