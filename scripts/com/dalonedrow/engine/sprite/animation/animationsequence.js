define(["com/dalonedrow/engine/sprite/animation/animationframe",
	"com/dalonedrow/utils/hashcode",
	
	
	"com/dalonedrow/rpg/base/constants/ioglobals",
	"com/dalonedrow/rpg/base/constants/mathglobals",
	"com/dalonedrow/rpg/base/flyweights/attribute",
	"com/dalonedrow/rpg/base/flyweights/baseinteractiveobject"],
		function(AnimationFrame, Hashcode, 
				
				ProjectConstants, IoGlobals, MathGlobals, Attribute,
				BaseInteractiveObject) {
	function AnimationSequence(id) {
		Hashcode.call(this);
    	try {
    		this.checkInteger(id);
    	} catch (err) {
            var s = [];
            s.push("ERROR! AnimationSequence() - id ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		/** the total animation time for the sequence. */
		this.animationTime = 0;
		/** the frame that defines the starting point of the transition. */
		this.endKeyFrame = 0;
		/** any flags applied to the animation. */
		this.flags = 0;
		/** the ids of all frames in the sequence. */
		this.frames = [];
		for (var i = 10; i > 0; i--) {
			this.frames[i] = -1;
		}
		/** the factor by which the animation speed has been modified. */
		this.modSpeed = 0;
		/** the sequence's reference id. */
		this.refId = id;
		/** the frame that defines the starting point of the transition. */
		this.startKeyFrame = 0;
	}
	AnimationSequence.prototype = Object.create(Hashcode.prototype);
	/**
	 * Adds a frame to the sequence.
	 * @param frame the {@link AnimationFrameObject}
	 * @if an error occurs
	 */
	AnimationSequence.prototype.addFrame = function(frame) {
		var index, refId;
		if (arguments.length === 1) {
	    	try {
	    		this.checkInstanceOf(arguments[0], AnimationFrame);
	    	} catch (err) {
	            var s = [];
	            s.push("ERROR! AnimationSequence.addFrame() - frame ");
	            s.push(err.message);
	            throw new Error(s.join(""));
	    	}
			index = arguments[0].getFrameNumber();
			if (index < 0) {
				var sb = [];
				sb.push("ERROR! AnimationSequence.addFrame() - ");
				sb.push("frame created with invalid frame number ");
				sb.push(index);
	            throw new Error(sb.join(""));
			}
			refId = frame.getRefId();
		} else if (arguments.length === 2) {
	    	try {
	    		this.checkInteger(arguments[0]);
	    	} catch (err) {
	            var s = [];
	            s.push("ERROR! AnimationSequence() - index ");
	            s.push(err.message);
	            throw new Error(s.join(""));
	    	}
	    	try {
	    		this.checkInteger(arguments[1]);
	    	} catch (err) {
	            var s = [];
	            s.push("ERROR! AnimationSequence() - refId ");
	            s.push(err.message);
	            throw new Error(s.join(""));
	    	}
			index = arguments[0];
			refId = arguments[1];			
		}
		while (index >= this.frames.length) {
			this.frames.push(-1);
		}
		this.frames[index] = refId;
	}
	/**
	 * Assigns a flag.
	 * @param flag the flag
	 */
	AnimationSequence.prototype.assignFlag = function(flag) {
    	try {
    		this.checkPowerOfTwo(flag);
    	} catch (err) {
            var s = [];
            s.push("ERROR! AnimationSequence.assignFlag() - flag ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        this.flags |= flag;
	}
	/** Clears all flags that were assigned. */
	AnimationSequence.prototype.clearFlags = function() {
		this.flags = 0;
	}
	public final long getAnimationTime = function() {
		return this.animationTime;
	}
	/**
	 * Gets the endKeyFrame.
	 * @return <code>int</code>
	 */
	public int getEndKeyFrame = function() {
		return this.endKeyFrame;
	}
	/**
	 * Gets the frame at a specific index.
	 * @param index the index
	 * @return {@link AnimationFrameObject}
	 * @if the index is invalid
	 */
	public AnimationFrameObject getFrame = function(final int index) {
		AnimationFrameObject frame = null;
		if (index >= 0
				&& index < this.frames.length) {
			frame =
					AnimationFrameObjectFactory.getInstance().getFrameById(
							this.frames[index]);
		}
		if (frame == null) {
			PooledStringBuilder sb = StringBuilderPool.getInstance()
					.getStringBuilder();
			sb.append("ERROR! AnimationSequenceObject.getFrame() - ");
			sb.append("invalid index - ");
			sb.append(index);
			Exception ex = new Exception(sb.toString());
			sb.returnToPool();
			throw ex;
		}
		return frame;
	}
	public final float getModSpeed = function() {
		return this.modSpeed;
	}
	/**
	 * Gets the total number of frames in the sequence.
	 * @return <code>int</code>
	 */
	public int getNumFrames = function() {
		return numFrames;
	}
	/**
	 * Gets the sequence's reference id
	 * @return <code>int</code>
	 */
	public final int getRefId = function() {
		return this.refId;
	}
	/**
	 * Gets the startKeyFrame.
	 * @return <code>int</code>
	 */
	public int getStartKeyFrame = function() {
		return this.startKeyFrame;
	}
	/**
	 * Determines if the {@link AnimationSequenceObject} has a specific flag
	 * set.
	 * @param flag the flag
	 * @return true if the flag was set; false otherwise
	 */
	public boolean hasFlag = function(final long flag) {
    	try {
    		this.checkPowerOfTwo(flag);
    	} catch (err) {
            var s = [];
            s.push("ERROR! AnimationSequence.assignFlag() - flag ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        this.flags |= flag;
		return (this.flags & flag) == flag;
	}
	/**
	 * Removes a flag.
	 * @param flag the flag
	 */
	AnimationSequence.prototype.removeFlag = function(final long flag) {
		this.flags &= ~flag;

	}
	AnimationSequence.prototype.setAnimationTime = function(final long animationTime) {
		this.animationTime = animationTime;
	}
	/**
	 * Sets the endKeyFrame
	 * @param endKeyFrame the endKeyFrame to set
	 */
	AnimationSequence.prototype.setEndKeyFrame = function(int endKeyFrame) {
		this.endKeyFrame = endKeyFrame;
	}
	AnimationSequence.prototype.setModSpeed = function(final float val) {
		this.modSpeed = val;
	}
	/**
	 * Sets the startKeyFrame
	 * @param startKeyFrame the startKeyFrame to set
	 */
	AnimationSequence.prototype.setStartKeyFrame = function(int startKeyFrame) {
		this.startKeyFrame = startKeyFrame;
	}
}