/**
 * 
 */
define(["com/dalonedrow/engine/sprite/animation/animationframe",
	"com/dalonedrow/engine/sprite/animation/animationprocess",
	"com/dalonedrow/engine/sprite/animation/animationsequence",
	"com/dalonedrow/engine/systems/base/interactive",
	"com/dalonedrow/engine/systems/base/time",
	"com/dalonedrow/rpg/base/constants/animationglobals",
	"com/dalonedrow/rpg/base/flyweights/baseinteractiveobject",
	"com/dalonedrow/utils/hashcode"], function(AnimationFrame, AnimationProcess, AnimationSequence,
			Interactive, Time, AnimationGlobals, BaseInteractiveObject, Hashcode) {
	/** the singleton instance of the <code>Animator</code> class. */
    var instance = null;
    var Animator = function() {
    	Hashcode.call(this);
    	/** the list of animation processes. */
    	this.processes = [new AnimationProcess(), new AnimationProcess(), new AnimationProcess(),
    		new AnimationProcess(), new AnimationProcess(), new AnimationProcess(),
    		new AnimationProcess(), new AnimationProcess(), new AnimationProcess(),
    		new AnimationProcess()];    	
    }
    Animator.prototype = Object.create(Hashcode.prototype);
	Animator.prototype.computeAnimationSequenceLength = function(sequence) {
    	try {
    		this.checkInstanceOf(sequence, AnimationSequence);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Animator.computeAnimationSequenceLength() - sequence ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		var totalSpeed = 0;
		for (var i = 0; i < sequence.getNumFrames(); i++) {
			totalSpeed += this.computeFrameLength(sequence, sequence.getFrame(i));
		}
		sequence.setAnimationTime(totalSpeed);
	}
	/**
	 * Computes the length in nanoseconds that an animation frame should play.
	 * @param sequence the {@link AnimationSequenceObject} the frame belongs to
	 * @param frame the {@link AnimationFrameObject}
	 * @return long
	 */
	Animator.prototype.computeFrameLength = function(sequence, frame) {
    	try {
    		this.checkInstanceOf(sequence, AnimationSequence);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Animator.computeFrameLength() - sequence ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkInstanceOf(frame, AnimationFrame);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Animator.computeFrameLength() - frame ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		var speed = frame.getDuration();
		if (sequence.hasFlag(AnimationGlobals.ANIM_SEQUENCE_SPEED_MODIFIED)) {
			speed *= sequence.getModSpeed();
		} else if (frame.hasFlag(AnimationGlobals.ANIM_FRAME_SPEED_MODIFIED)) {
			speed *= frame.getModSpeed();
		}
		return speed;
	}
	/**
	 * Gets the index of the next available {@link AnimationProcessObject}. If
	 * no object is available the process array is extended and the last slot is
	 * returned.
	 * @return <code>int</code>
	 */
	Animator.prototype.getNextAvailableProcess = function() {
		var available = -1;
		for (var i = 0; i < this.processes.length; i++) {
			if (!this.processes[i].isInUse()) {
				available = i;
				break;
			}
		}
		if (available === -1) {
			available = this.processes.length;
			this.processes.push(new AnimationProcess());
		}
		return available;
	}
	Animator.prototype.handleProcess = function(process) {
    	try {
    		this.checkInstanceOf(process, AnimationProcess);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Animator.handleProcess() - process ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		var now = Time.getInstance().getFrameStart();
		// set the frame start time if needed
		if (process.getFrameStart() === AnimationGlobals.ANIM_NOT_STARTED) {
			process.setFrameStart(now);
		}
		// get the current sequence
		var sequence = AnimationSequence.getSequenceById(process.getCurrentAnimationSequenceId());
		// get the current frame
		var currFrameIndex = process.getCurrentFrame();
		var currFrame = sequence.getFrame(currFrameIndex);
		var frameEndTime = process.getFrameStart();
		frameEndTime += this.computeFrameLength(sequence, currFrame);
		// has the sequence finished?
		// TO DO
		this.computeAnimationSequenceLength(sequence);
		var sequenceEnd = sequence.getAnimationTime();
		// is it time to move on to the next frame?
		if (frameEndTime < now) {
			// time to move to next frame.
			// are there more frames?
			if (currFrameIndex + 1 < sequence.getNumFrames()) {
				// move on the next frame
				process.setCurrentFrame(currFrameIndex + 1);
				process.setFrameStart(now);
			} else {
				if (sequence.hasFlag(AnimationGlobals.ANIM_REPEATS_FROM_BEGINNING)) {
					process.setCurrentFrame(0);
					process.setFrameStart(now);
				} else if (sequence.hasFlag(AnimationGlobals.ANIM_REPEATS_FROM_STARTKEYFRAME)) {
					process.setCurrentFrame(sequence.getStartKeyFrame());
					process.setFrameStart(now);
				} else if (sequence.hasFlag(AnimationGlobals.ANIM_REPEATS_FROM_ENDKEYFRAME)) {
					process.setCurrentFrame(sequence.getEndKeyFrame());
					process.setFrameStart(now);
				} else if (sequence.hasFlag(AnimationGlobals.ANIM_GOTO_END_FRAME)) {
					process.setCurrentFrame(sequence.getEndKeyFrame());
					// this call stops the animation
					process.setInUse(false);
				} else if (sequence.hasFlag(AnimationGlobals.ANIM_GOTO_START_FRAME)) {
					process.setCurrentFrame(sequence.getStartKeyFrame());
					// this call stops the animation
					process.setInUse(false);
				}
				// move on to the next sequence
				// TO DO
			}
		}
		// change the IO's image to the latest frame from the sequence
		this.setIOImageFromAnimation(process, sequence);
		// TO DO ASSIGN FLAGS TO IO
	}
	/**
	 * Determines if an animation is currently playing
	 * @param ioId the reference id for the interactive object
	 * @param sequenceId the animation sequence id
	 * @return true if the animation is already playing; false otherwise
	 */
	Animator.prototype.isAnimationPlaying = function(final int ioId, final int sequenceId) {
		boolean is = false;
		for (var i = 0; i < this.processes.length; i++) {
			if (this.processes[i].isInUse()
					&& this.processes[i].getCurrentAnimationSequenceId()
					== sequenceId
					&& this.processes[i].getRefId() === ioId) {
				is = true;
				break;
			}
		}
		return is;
	}
	/**
	 * Plays an animation for an interactive object.
	 * @param io the {@link BaseInteractiveObject}
	 * @param sequenceId the animation sequence id
	 */
	Animator.prototype.playAnimation = function(final BaseInteractiveObject io,
			final int sequenceId) {
		if (!this.isAnimationPlaying(io.getRefId(), sequenceId)) {
			int index = getNextAvailableProcess();
			this.processes[index].setRefId(io.getRefId());
			this.processes[index].setCurrentAnimationSequenceId(sequenceId);
			this.processes[index].setInUse(true);
		}
	}
	/**
	 * Plays an animation for an interactive object.
	 * @param io the {@link BaseInteractiveObject}
	 * @param sequenceId the animation sequence id
	 * @param flags any flags assigned to the animation
	 * @if an error occurs
	 */
	Animator.prototype.playAnimation = function(final BaseInteractiveObject io,
			final int sequenceId, final long flags) {
		if (!this.isAnimationPlaying(io.getRefId(), sequenceId)) {
			int index = getNextAvailableProcess();
			this.processes[index].setRefId(io.getRefId());
			this.processes[index].setCurrentAnimationSequenceId(sequenceId);
			this.processes[index].setInUse(true);
		}
		AnimationSequenceObject sequence =
				AnimationSequenceObjectFactory.getInstance().getSequenceById(
						sequenceId);
		sequence.clearFlags();
		sequence.assignFlag(flags);
	}
	/**
	 * Plays an animation for an interactive object.
	 * @param io the {@link BaseInteractiveObject}
	 * @param sequenceName the name of the animation sequence
	 * @if an error occurs
	 */
	Animator.prototype.playAnimation = function(final BaseInteractiveObject io,
			final String sequenceName) {
		AnimationSequenceObject sequence =
				AnimationSequenceObjectFactory.getInstance().getSequenceByName(
						sequenceName);
		playAnimation(io, sequence.getRefId());
	}
	/**
	 * 
	 * Plays an animation for an interactive object.
	 * @param io the {@link BaseInteractiveObject}
	 * @param sequenceName the name of the animation sequence
	 * @param flags any flags assigned to the animation
	 * @if an error occurs
	 */
	Animator.prototype.playAnimation = function(final BaseInteractiveObject io,
			final String sequenceName, final long flags) {
		this.playAnimation(
				io, 
				AnimationSequenceObjectFactory.getInstance().getSequenceByName(
						sequenceName).getRefId(), 
				flags);
	}
	/**
	 * Removes all animation flags assigned to a specific animation sequence.
	 * @param io the {@link BaseInteractiveObject}
	 * @param sequenceName the name of the animation sequence
	 * @if an error occurs
	 */
	Animator.prototype.removeAllAnimationFlags = function(final BaseInteractiveObject io,
			final String sequenceName) {
		AnimationSequenceObject sequence =
				AnimationSequenceObjectFactory.getInstance().getSequenceByName(
						sequenceName);
		for (var i = 0; i < this.processes.length; i++) {
			AnimationProcessObject process = this.processes[i];
			if (process.getCurrentAnimationSequenceId() 
					== sequence.getRefId()) {
				// found the sequence
				sequence.clearFlags();
				break;
			}
		}
	}
	/**
	 * Sets the image associated with an {@link BaseInteractiveObject} to be
	 * rendered for the current animation frame.
	 * @param process the {@link AnimationProcessObject}
	 * @param sequence the {@link AnimationSequenceObject}
	 * @if an error occurs
	 */
	Animator.prototype.setIOImageFromAnimation = function(final AnimationProcessObject process,
			final AnimationSequenceObject sequence) {
		// sets the image rendered for the io in the animation
		AnimationFrameObject currFrame =
				sequence.getFrame(process.getCurrentFrame());
		int refId = currFrame.getImageRefId();
		Interactive.getInstance().getIO(
				process.getRefId()).getSprite().setImageRefId(refId);

	}
	/**
	 * Stops all animations playing for an interactive object.
	 * @param io the {@link BaseInteractiveObject}
	 */
	Animator.prototype.stopAllAnimations = function(final BaseInteractiveObject io) {
		for (var i = 0; i < this.processes.length; i++) {
			if (this.processes[i].getRefId() === io.getRefId()) {
				// found the animation process
				this.processes[i].setInUse(false);
			}
		}
	}
	Animator.prototype.stopRepeatingAnimation = function(final BaseInteractiveObject io)
			{
		for (var i = 0; i < this.processes.length; i++) {
			AnimationProcessObject process = this.processes[i];
			if (process.getRefId() === io.getRefId()) {
				// get the animation sequence
				AnimationSequenceObject sequence =
						AnimationSequenceObjectFactory
								.getInstance()
								.getSequenceById(
										process.getCurrentAnimationSequenceId());
				sequence.removeFlag(AnimationGlobals.ANIM_REPEATS_FROM_BEGINNING);
				sequence.removeFlag(AnimationGlobals.ANIM_REPEATS_FROM_STARTKEYFRAME);
				sequence.removeFlag(AnimationGlobals.ANIM_REPEATS_FROM_ENDKEYFRAME);
				sequence.assignFlag(AnimationGlobals.ANIM_GOTO_END_FRAME);
			}
		}
	}
	/** Updates all animations. */
	Animator.prototype.update = function() {
		try {
			for (var i = 0; i < this.processes.length; i++) {
				if (this.processes[i].isInUse()) {
					if (Interactive.getInstance().hasIO(
							this.processes[i].getRefId())) {
						handleProcess(this.processes[i]);
					} else {
						this.processes[i].setInUse(false);
					}
				}
			}
		} catch (Exception ex) {
			GameApplet.getInstance().fatalError(ex);
		}
	}
}