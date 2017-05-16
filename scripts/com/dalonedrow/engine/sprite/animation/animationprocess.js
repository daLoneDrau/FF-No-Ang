/**
 * The animation process class, which holds references to the id of the current 
 * animation and the number of the current frame being displayed.  Each 
 * animation process is associated with a specific interactive object being 
 * drawn
 * @author DaLoneDrau
 */
define(["com/dalonedrow/rpg/base/constants/animationglobals",
	"com/dalonedrow/utils/hashcode"], function(AnimationGlobals, Hashcode) {
	function AnimationProcess() {
		Hashcode.call(this);
		/** the reference id of the current animation. */
		this.currentAnimationSequenceId = 0;
		/** the current frame being displayed. */
		this.currentFrame	= 0;
		/** any flags applied to the current animation. */
		this.flags			= 0;
		/** the time that the current animation frame started playing. */
		this.frameStart		= AnimationGlobals.ANIM_NOT_STARTED;
		/**
		 * the flag indicating whether the {@link AnimationProcessObject} is in use.
		 */
		this.inUse			= false;
		/**
		 * the reference id of the next animation played after the current finishes.
		 */
		this.nextAnimation = -1;
		/** any flags applied to the next animation. */
		this.nextFlags = 0;
		/**
		 * the reference id of the {@link BaseInteractiveObject} the animation is
		 * associated with.
		 */
		this.refId = -1;		
	}
	AnimationProcess.prototype = Object.create(Hashcode.prototype);
	/**
	 * Gets the reference id of the current animation.
	 * @return int
	 */
	AnimationProcess.prototype.getCurrentAnimationSequenceId = function() {
		return this.currentAnimationSequenceId;
	}
	/**
	 * Gets the current frame being displayed.
	 * @return int
	 */
	AnimationProcess.prototype.getCurrentFrame = function() {
		return this.currentFrame;
	}
	/**
	 * Gets the time that the current animation frame started playing.
	 * @return long
	 */
	AnimationProcess.prototype.getFrameStart = function() {
		return this.frameStart;
	}
	/**
	 * Gets the reference id of the {@link BaseInteractiveObject} the animation
	 * is associated with.
	 * @return int
	 */
	AnimationProcess.prototype.getRefId = function() {
		return this.refId;
	}
	/**
	 * Gets the flag indicating whether the {@link AnimationProcessObject} is in
	 * use.
	 * @return true if the {@link AnimationProcessObject} is being used; false
	 *         otherwise
	 */
	AnimationProcess.prototype.isInUse = function() {
		return this.inUse;
	}
	/**
	 * Sets the reference id of the current animation.
	 * @param id the id to set
	 */
	AnimationProcess.prototype.setCurrentAnimationSequenceId = function(val) {
    	try {
    		this.checkInteger(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! AnimationProcess.setCurrentAnimationSequenceId() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		this.currentAnimationSequenceId = val;
	}
	/**
	 * Sets the current frame being displayed.
	 * @param index the index to set
	 */
	AnimationProcess.prototype.setCurrentFrame = function(val) {
    	try {
    		this.checkInteger(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! AnimationProcess.setCurrentFrame() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		this.currentFrame = val;
	}
	/**
	 * Sets the time that the current animation frame started playing.
	 * @param time the time to set
	 */
	AnimationProcess.prototype.setFrameStart = function(val) {
    	try {
    		this.checkInteger(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! AnimationProcess.setFrameStart() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		this.frameStart = val;
	}
	/**
	 * Sets the flag indicating whether the {@link AnimationProcessObject} is in
	 * use.
	 * @param val the flag
	 */
	AnimationProcess.prototype.setInUse = function(val) {
    	try {
    		this.checkBoolean(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! AnimationProcess.setInUse() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		this.inUse = val;
	}
	/**
	 * Sets the reference id of the {@link BaseInteractiveObject} the animation
	 * is associated with.
	 * @param val the id to set
	 */
	AnimationProcess.prototype.setRefId = function(val) {
    	try {
    		this.checkInteger(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! AnimationProcess.setRefId() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		this.refId = val;
	}
	return AnimationProcess;
});
