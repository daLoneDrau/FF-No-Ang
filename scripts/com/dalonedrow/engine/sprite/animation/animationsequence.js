define(["com/dalonedrow/engine/sprite/animation/animationframe",
	"com/dalonedrow/utils/hashcode"], function(AnimationFrame, Hashcode) {
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
	AnimationSequence.prototype.addFrame = function() {
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
			refId = arguments[0].getRefId();
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
	AnimationSequence.prototype.getAnimationTime = function() {
		return this.animationTime;
	}
	/**
	 * Gets the endKeyFrame.
	 * @return <code>int</code>
	 */
	AnimationSequence.prototype.getEndKeyFrame = function() {
		return this.endKeyFrame;
	}
	/**
	 * Gets the frame at a specific index.
	 * @param index the index
	 * @return {@link AnimationFrameObject}
	 * @if the index is invalid
	 */
	AnimationSequence.prototype.getFrame = function(index) {
    	try {
    		this.checkInteger(index);
    	} catch (err) {
            var s = [];
            s.push("ERROR! AnimationSequence.getFrame() - index ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		var frame = null;
		if (index >= 0
				&& index < this.frames.length) {
			frame = AnimationFrame.getFrameById(this.frames[index]);
		}
		if (frame === null) {
			var sb = [];
			sb.push("ERROR! AnimationSequenceObject.getFrame() - ");
			sb.push("invalid index - ");
			sb.push(index);
			throw new Error(sb.join(""));
		}
		return frame;
	}
	AnimationSequence.prototype.getModSpeed = function() {
		return this.modSpeed;
	}
	/**
	 * Gets the total number of frames in the sequence.
	 * @return <code>int</code>
	 */
	AnimationSequence.prototype.getNumFrames = function() {
		var numFrames = 0;
		for (var i = this.frames[i] - 1; i >= 0; i--) {
			if (this.frames[i] !== -1) {
				numFrames++;
			}
		}
		return numFrames;
	}
	/**
	 * Gets the sequence's reference id
	 * @return <code>int</code>
	 */
	AnimationSequence.prototype.getRefId = function() {
		return this.refId;
	}
	/**
	 * Gets the startKeyFrame.
	 * @return <code>int</code>
	 */
	AnimationSequence.prototype.getStartKeyFrame = function() {
		return this.startKeyFrame;
	}
	/**
	 * Determines if the {@link AnimationSequenceObject} has a specific flag
	 * set.
	 * @param flag the flag
	 * @return true if the flag was set; false otherwise
	 */
	AnimationSequence.prototype.hasFlag = function(flag) {
    	try {
    		this.checkPowerOfTwo(flag);
    	} catch (err) {
            var s = [];
            s.push("ERROR! AnimationSequence.hasFlag() - flag ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		return (this.flags & flag) === flag;
	}
	/**
	 * Removes a flag.
	 * @param flag the flag
	 */
	AnimationSequence.prototype.removeFlag = function(flag) {
    	try {
    		this.checkPowerOfTwo(flag);
    	} catch (err) {
            var s = [];
            s.push("ERROR! AnimationSequence.removeFlag() - flag ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		this.flags &= ~flag;

	}
	AnimationSequence.prototype.setAnimationTime = function(val) {
    	try {
    		this.checkInteger(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! AnimationSequence.setAnimationTime() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		this.animationTime = val;
	}
	/**
	 * Sets the endKeyFrame
	 * @param endKeyFrame the endKeyFrame to set
	 */
	AnimationSequence.prototype.setEndKeyFrame = function(val) {
    	try {
    		this.checkInteger(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! AnimationSequence.setEndKeyFrame() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		this.endKeyFrame = val;
	}
	AnimationSequence.prototype.setModSpeed = function(val) {
    	try {
    		this.checkFloat(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! AnimationSequence.setModSpeed() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		this.modSpeed = val;
	}
	/**
	 * Sets the startKeyFrame
	 * @param startKeyFrame the startKeyFrame to set
	 */
	AnimationSequence.prototype.setStartKeyFrame = function(val) {
    	try {
    		this.checkInteger(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! AnimationSequence.setStartKeyFrame() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		this.startKeyFrame = val;
	}
	/** the list of image names used. */
	AnimationSequence.names		= [null, null, null, null, null, null, null, null, null, null];
	/** the next available image id. */
	AnimationSequence.nextId		= 0;
	/** the list of images. */
	AnimationSequence.sequences	= [null, null, null, null, null, null, null, null, null, null];
	/**
	 * Attempts to add an animation sequence to the
	 * {@link AnimationSequence}.
	 * @param sequenceName the sequence's name
	 * @param sequence the {@link AnimationSequenceObject}
	 * @if the sequence could not be loaded
	 */
	AnimationSequence.addSequence = function(sequenceName, sequence) {
    	try {
    		AnimationSequence.prototype.checkString(sequenceName);
    	} catch (err) {
            var s = [];
            s.push("ERROR! AnimationSequence.addSequence() - sequenceName ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		AnimationSequence.prototype.checkInstanceOf(sequence, AnimationSequence);
    	} catch (err) {
            var s = [];
            s.push("ERROR! AnimationSequence.addSequence() - sequence ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		if (AnimationSequence.hasFrame(sequenceName)) {
			var sb = [];
			sb.push("ERROR! AnimationSequence.addSequence() - ");
			sb.push("sequence '");
			sb.push(sequenceName);
			sb.push("' already loaded");
            throw new Error(sb.join(""));
			throw ex;
		}
		if (sequence.getRefId() < AnimationSequence.sequences.length
				&& AnimationSequence.sequences[sequence.getRefId()] !== null) {
			var sb = [];
			sb.push("ERROR! AnimationSequence.addSequence() - ");
			sb.push("sequence '");
			sb.push(sequenceName);
			sb.push("' assigned invalid refId.  RefId already in use.");
            throw new Error(sb.join(""));
		}
		while (sequence.getRefId() >= AnimationSequence.sequences.length) {
			AnimationSequence.names.push(null);
			AnimationSequence.sequences.push(null);
		}
		AnimationSequence.names[sequence.getRefId()] = sequenceName;
		AnimationSequence.sequences[sequence.getRefId()] = sequence;
	}
	/**
	 * Gets the next available sequence id.
	 * @return int
	 */
	AnimationSequence.getNextId = function() {
		return AnimationSequence.nextId++;
	}
	/**
	 * Gets a {@link AnimationSequenceObject} by its reference id.
	 * @param id the reference id
	 * @return {@link AnimationSequenceObject}
	 * @if the sequence does not exist
	 */
	AnimationSequence.getSequenceById = function(id) {
    	try {
    		AnimationSequence.prototype.checkInteger(id);
    	} catch (err) {
            var s = [];
            s.push("ERROR! AnimationSequence.getSequenceById() - id ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		var sequence = null;
		if (id >= 0
				&& id < AnimationSequence.sequences.length) {
			sequence = AnimationSequence.sequences[id];
		}
		if (sequence === null) {
			var sb = [];
			sb.push("ERROR! AnimationSequence.getSequenceById() - ");
			sb.push("invalid refId. sequence with refId");
			sb.push(id);
			sb.push(" was never loaded.");
            throw new Error(sb.join(""));
		}
		return sequence;
	}
	/**
	 * Gets a {@link AnimationSequenceObject} by its name.
	 * @param sequenceName the sequence's name
	 * @return {@link AnimationSequenceObject}
	 * @if the sequence does not exist
	 */
	AnimationSequence.getSequenceByName = function(sequenceName) {
    	try {
    		AnimationSequence.prototype.checkString(sequenceName);
    	} catch (err) {
            var s = [];
            s.push("ERROR! AnimationSequence.getSequenceByName() - sequenceName ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		var sequence = null;
		var id = -1;
		for (var i = 0; i < AnimationSequence.names.length; i++) {
			if (AnimationSequence.names[i] !== null
					&& AnimationSequence.names[i] === sequenceName) {
				id = i;
				break;
			}
		}
		if (id >= 0
				&& id < AnimationSequence.sequences.length) {
			sequence = AnimationSequence.sequences[id];
		}
		if (sequence === null) {
			var sb = [];
			sb.push("ERROR! AnimationSequence.getSequenceByName() - ");
			sb.push("invalid refId. sequence '");
			sb.push(sequenceName);
			sb.push("' was never loaded.");
            throw new Error(sb.join(""));
		}
		return sequence;
	}
	/**
	 * Gets the reference id for a specific sequence.
	 * @param sequenceName the sequence's name
	 * @return int
	 * @if the sequence was not loaded
	 */
	AnimationSequence.getSequenceRefId = function(sequenceName) {
    	try {
    		AnimationSequence.prototype.checkString(sequenceName);
    	} catch (err) {
            var s = [];
            s.push("ERROR! AnimationSequence.getSequenceRefId() - sequenceName ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		var id = -1;
		for (var i = 0; i < AnimationSequence.names.length; i++) {
			if (AnimationSequence.names[i] !== null
					&& AnimationSequence.names[i] === sequenceName) {
				id = i;
				break;
			}
		}
		if (id === -1) {
			var sb = [];
			sb.push("ERROR! AnimationSequence.getSequenceRefId() - ");
			sb.push("invalid name: '");
			sb.push(sequenceName);
			sb.push("'");
            throw new Error(sb.join(""));
		}
		return id;
	}
	/**
	 * Determines if the {@link AnimationSequence} has a sequence
	 * by a specific name.
	 * @param sequenceName the sequence's name
	 * @return true if a sequence by that name has been stored already; false
	 *         otherwise
	 */
	AnimationSequence.hasFrame = function(sequenceName) {
    	try {
    		AnimationSequence.prototype.checkString(sequenceName);
    	} catch (err) {
            var s = [];
            s.push("ERROR! AnimationSequence.hasFrame() - sequenceName ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		var has = false;
		for (var i = 0; i < AnimationSequence.names.length; i++) {
			if (sequenceName !== null
					&& AnimationSequence.names[i] !== null
					&& sequenceName.equals(AnimationSequence.names[i])) {
				has = true;
				break;
			}
		}
		return has;
	}
	return AnimationSequence;
});