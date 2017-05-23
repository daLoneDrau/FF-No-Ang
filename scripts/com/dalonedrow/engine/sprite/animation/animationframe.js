define(["com/dalonedrow/utils/hashcode"], function(Hashcode) {
	function AnimationFrame(id, time, order, imgId, name) {
		Hashcode.call(this);
    	try {
    		this.checkInteger(id);
    	} catch (err) {
            var s = [];
            s.push("ERROR! AnimationFrame() - id ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkInteger(time);
    	} catch (err) {
            var s = [];
            s.push("ERROR! AnimationFrame() - time ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkInteger(order);
    	} catch (err) {
            var s = [];
            s.push("ERROR! AnimationFrame() - order ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkInteger(imgId);
    	} catch (err) {
            var s = [];
            s.push("ERROR! AnimationFrame() - imgId ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkString(name);
    	} catch (err) {
            var s = [];
            s.push("ERROR! AnimationFrame() - name ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		/** the length in nanoseconds that this frame should play. */
		this.duration = time;
		/** any flags applied to the frame. */
		this.flags = 0;
		/** the order that this frame appears in in the animation sequence. */
		this.frameNumber = order;
		/**
		 * the reference id for the {@link Sprite} this frame displays.
		 */
		this.imageRefId = imgId;
		this.modSpeed = 0;
		/** the frame's reference id. */
		this.refId = id;
		AnimationFrame.addFrame(name, this);
	}
	AnimationFrame.prototype = Object.create(Hashcode.prototype);
	/**
	 * Assigns a flag.
	 * @param flag the flag
	 */
	AnimationFrame.prototype.assignFlag = function(flag) {
    	try {
    		this.checkPowerOfTwo(flag);
    	} catch (err) {
            var s = [];
            s.push("ERROR! AnimationFrame.assignFlag() - flag ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        this.flags |= flag;
	}
	/** Clears all flags that were assigned. */
	AnimationFrame.prototype.clearFlags = function() {
		this.flags = 0;
	}
	/**
	 * Gets the length in nanoseconds that this frame should play.
	 * @return long
	 */
	AnimationFrame.prototype.getDuration = function() {
		return this.duration;
	}
	/**
	 * Gets the order that this frame appears in in the animation sequence.
	 * @return int
	 */
	AnimationFrame.prototype.getFrameNumber = function() {
		return this.frameNumber;
	}
	/**
	 * Gets the reference id for the {@link SpriteImageObject} this frame
	 * displays.
	 * @return int
	 */
	AnimationFrame.prototype.getImageRefId = function() {
		return this.imageRefId;
	}
	AnimationFrame.prototype.getModSpeed = function() {
		return this.modSpeed;
	}
	/**
	 * Gets the frame's reference id.
	 * @return int
	 */
	AnimationFrame.prototype.getRefId = function() {
		return this.refId;
	}
	/**
	 * Determines if the {@link AnimationFrame} has a specific flag
	 * set.
	 * @param flag the flag
	 * @return true if the flag was set; false otherwise
	 */
	AnimationFrame.prototype.hasFlag = function(flag) {
    	try {
    		this.checkPowerOfTwo(flag);
    	} catch (err) {
            var s = [];
            s.push("ERROR! AnimationFrame.hasFlag() - flag ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		return (this.flags & flag) === flag;
	}
	/**
	 * Removes a flag.
	 * @param flag the flag
	 */
	AnimationFrame.prototype.removeFlag = function(flag) {
    	try {
    		this.checkPowerOfTwo(flag);
    	} catch (err) {
            var s = [];
            s.push("ERROR! AnimationFrame.removeFlag() - flag ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		this.flags &= ~flag;

	}
	/**
	 * Sets the length in nanoseconds that this frame should play.
	 * @param val the length
	 */
	AnimationFrame.prototype.setDuration = function(val) {
    	try {
    		this.checkInteger(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! AnimationFrame.setDuration() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		this.duration = val;
	}
	/**
	 * Sets the order that this frame appears in in the animation sequence.
	 * @param frameNumber
	 */
	AnimationFrame.prototype.setFrameNumber = function(val) {
    	try {
    		this.checkInteger(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! AnimationFrame.setFrameNumber() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		this.frameNumber = val;
	}
	/**
	 * Sets the reference id for the {@link SpriteImageObject} this frame
	 * displays.
	 * @param id the reference id
	 */
	AnimationFrame.prototype.setImageRefId = function(id) {
    	try {
    		this.checkInteger(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! AnimationFrame.setImageRefId() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		this.imageRefId = id;
	}
	AnimationFrame.prototype.setModSpeed = function(val) {
    	try {
    		this.checkFloat(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! AnimationFrame.setModSpeed() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		this.modSpeed = val;
	}
	/** the list of images. */
	AnimationFrame.frames = [null, null, null, null, null, null, null, null, null, null];
	/** the list of image names used. */
	AnimationFrame.names = [null, null, null, null, null, null, null, null, null, null];
	/** the next available image id. */
	AnimationFrame.nextId	= 0;
	/**
	 * Attempts to add a frame to the {@link AnimationFrameObjectFactory}.
	 * @param frameName the image's name
	 * @param frame the {@link AnimationFrameObject}
	 * @if the frame could not be loaded
	 */
	AnimationFrame.addFrame = function(frameName, frame) {
    	try {
    		AnimationFrame.prototype.checkString(frameName);
    	} catch (err) {
            var s = [];
            s.push("ERROR! AnimationFrame.addFrame() - frameName ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		AnimationFrame.prototype.checkInstanceOf(frame, AnimationFrame);
    	} catch (err) {
            var s = [];
            s.push("ERROR! AnimationFrame.addFrame() - frame ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		if (AnimationFrame.hasFrame(frameName)) {
			var sb = [];
			sb.push("ERROR! AnimationFrame.addFrame() - ");
			sb.push("frame '");
			sb.push(frameName);
			sb.push("' already loaded");
			throw new Error(sb.join(""));
		}
		if (frame.getRefId() < AnimationFrame.frames.length
				&& AnimationFrame.frames[frame.getRefId()] !== null) {
			var sb = [];
			sb.push("ERROR! AnimationFrame.addFrame() - ");
			sb.push("frame '");
			sb.push(frameName);
			sb.push("' assigned invalid refId.  RefId already in use.");
			throw new Error(sb.join(""));
		}
		while (frame.getRefId() >= AnimationFrame.frames.length) {
			AnimationFrame.frames.push(null);
			AnimationFrame.names.push(null);
		}
		AnimationFrame.names[frame.getRefId()] = frameName;
		AnimationFrame.frames[frame.getRefId()] = frame;
	}
	/**
	 * Gets a {@link AnimationFrameObject} by its reference id.
	 * @param id the reference id
	 * @return {@link AnimationFrameObject}
	 * @if the frame does not exist
	 */
	AnimationFrame.getFrameById = function(id) {
    	try {
    		AnimationFrame.prototype.checkInteger(id);
    	} catch (err) {
            var s = [];
            s.push("ERROR! AnimationFrame.getFrameById() - id ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		var frame = null;
		if (id >= 0
				&& id < AnimationFrame.frames.length) {
			frame = AnimationFrame.frames[id];
		}
		if (frame === null) {
			var sb = [];
			sb.push("ERROR! AnimationFrame.getFrameById() - ");
			sb.push("invalid refId. frame with refId ");
			sb.push(id);
			sb.push(" was never loaded.");
			throw new Error(sb.join(""));
		}
		return frame;
	}
	/**
	 * Gets a {@link AnimationFrameObject} by its name.
	 * @param frameName the frame's name
	 * @return {@link AnimationFrameObject}
	 * @if the frame does not exist
	 */
	AnimationFrame.getFrameByName = function(frameName) {
    	try {
    		AnimationFrame.prototype.checkString(frameName);
    	} catch (err) {
            var s = [];
            s.push("ERROR! AnimationFrame.getFrameByName() - frameName ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		var frame = null;
		var id = -1;
		for (var i = 0; i < AnimationFrame.names.length; i++) {
			if (AnimationFrame.names[i] !== null
					&& AnimationFrame.names[i] === frameName) {
				id = i;
				break;
			}
		}
		if (id >= 0
				&& id < AnimationFrame.frames.length) {
			frame = AnimationFrame.frames[id];
		}
		if (frame === null) {
			var sb = [];
			sb.push("ERROR! AnimationFrame.getFrameByName() - ");
			sb.push("invalid refId. frame '");
			sb.push(frameName);
			sb.push("' was never loaded.");
			throw new Error(sb.join(""));
		}
		return frame;
	}
	/**
	 * Gets the reference id for a specific frame.
	 * @param frameName the frame's name
	 * @return int
	 * @if the frame was not loaded
	 */
	AnimationFrame.getFrameRefId = function(frameName) {
    	try {
    		AnimationFrame.prototype.checkString(frameName);
    	} catch (err) {
            var s = [];
            s.push("ERROR! AnimationFrame.getFrameRefId() - frameName ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		var id = -1;
		for (var i = 0; i < AnimationFrame.names.length; i++) {
			if (AnimationFrame.names[i] !== null
					&& AnimationFrame.names[i] === frameName) {
				id = i;
				break;
			}
		}
		if (id === -1) {
			var sb = [];
			sb.push("ERROR! AnimationFrame.getFrameRefId() - ");
			sb.push("invalid name: '");
			sb.push(frameName);
			sb.push("'");
			throw new Error(sb.join(""));
		}
		return id;
	}
	/**
	 * Gets the next available frame id.
	 * @return int
	 */
	AnimationFrame.getNextId = function() {
		return AnimationFrame.nextId++;
	}
	/**
	 * Determines if the {@link AnimationFrameObjectFactory} has an frame by a
	 * specific name.
	 * @param frameName the frame's name
	 * @return true if an frame by that name has been stored already; false
	 *         otherwise
	 */
	AnimationFrame.hasFrame = function(frameName) {
    	try {
    		AnimationFrame.prototype.checkString(frameName);
    	} catch (err) {
            var s = [];
            s.push("ERROR! AnimationFrame.hasFrame() - frameName ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		var has = false;
		for (var i = 0; i < AnimationFrame.names.length; i++) {
			if (frameName !== null
					&& AnimationFrame.names[i] !== null
					&& AnimationFrame.names[i] === frameName) {
				has = true;
				break;
			}
		}
		return has;
	}
	return AnimationFrame;
});