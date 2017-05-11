/**
 * 
 */
package com.dalonedrau.jogl.engine;

import com.dalonedrau.jogl.opengl.animation.AnimConsts;
import com.dalonedrau.jogl.opengl.animation.AnimationFrameObject;
import com.dalonedrau.jogl.opengl.animation.AnimationProcessObject;
import com.dalonedrau.jogl.opengl.animation.AnimationSequenceObject;
import com.dalonedrau.jogl.opengl.animation.AnimationSequenceObjectFactory;
import com.rpg.base.interactive.flyweight.BaseInteractiveObject;

/**
 * @author Donald
 */
public class Animation {
	/** the one and only instance of the <code>Animation</code> class. */
	private static Animation	instance;
	/**
	 * Gives access to the singleton instance of {@link Animation}.
	 * @return {@link Animation}
	 */
	public static Animation getInstance() {
		if (Animation.instance == null) {
			Animation.instance = new Animation();
		}
		return Animation.instance;
	}
	/** the list of animation processes. */
	private AnimationProcessObject[]	processes;
	/** Hidden constructor. */
	private Animation() {
		processes = new AnimationProcessObject[10];
		for (int i = 0; i < processes.length; i++) {
			processes[i] = new AnimationProcessObject();
		}
	}
	public void computeAnimationSequenceLength(
			final AnimationSequenceObject sequence) throws Exception {
		long totalSpeed = 0;
		for (int i = 0; i < sequence.getNumFrames(); i++) {
			totalSpeed += computeFrameLength(sequence, sequence.getFrame(i));
		}
		sequence.setAnimationTime(totalSpeed);
	}
	/**
	 * Computes the length in nanoseconds that an animation frame should play.
	 * @param sequence the {@link AnimationSequenceObject} the frame belongs to
	 * @param frame the {@link AnimationFrameObject}
	 * @return long
	 */
	private long computeFrameLength(final AnimationSequenceObject sequence,
			final AnimationFrameObject frame) {
		long speed = frame.getDuration();
		if (sequence.hasFlag(AnimConsts.ANIM_SEQUENCE_SPEED_MODIFIED)) {
			speed *= sequence.getModSpeed();
		} else if (frame.hasFlag(AnimConsts.ANIM_FRAME_SPEED_MODIFIED)) {
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
	private int getNextAvailableProcess() {
		int available = -1;
		for (int i = 0; i < processes.length; i++) {
			if (!processes[i].isInUse()) {
				available = i;
				break;
			}
		}
		if (available == -1) {
			available = processes.length;
			// extend the processes array
			AnimationProcessObject[] temp =
					new AnimationProcessObject[processes.length + 1];
			System.arraycopy(processes, 0, temp, 0, processes.length);
			temp[available] = new AnimationProcessObject();
			processes = temp;
		}
		return available;
	}
	private void handleProcess(final AnimationProcessObject process)
			throws Exception {
		long now = Time.getInstance().getFrameStart();
		// set the frame start time if needed
		if (process.getFrameStart() == AnimConsts.ANIM_NOT_STARTED) {
			process.setFrameStart(now);
		}
		// get the current sequence
		AnimationSequenceObject sequence =
				AnimationSequenceObjectFactory.getInstance().getSequenceById(
						process.getCurrentAnimationSequenceId());
		// get the current frame
		int currFrameIndex = process.getCurrentFrame();
		AnimationFrameObject currFrame = sequence.getFrame(currFrameIndex);
		long frameEndTime = process.getFrameStart();
		frameEndTime += computeFrameLength(sequence, currFrame);
		// has the sequence finished?
		// TO DO
		computeAnimationSequenceLength(sequence);
		long sequenceEnd = sequence.getAnimationTime();
		// is it time to move on to the next frame?
		if (frameEndTime < now) {
			// time to move to next frame.
			// are there more frames?
			if (currFrameIndex + 1 < sequence.getNumFrames()) {
				// move on the next frame
				process.setCurrentFrame(currFrameIndex + 1);
				process.setFrameStart(now);
			} else {
				if (sequence.hasFlag(AnimConsts.ANIM_REPEATS_FROM_BEGINNING)) {
					process.setCurrentFrame(0);
					process.setFrameStart(now);
				} else if (sequence.hasFlag(
						AnimConsts.ANIM_REPEATS_FROM_STARTKEYFRAME)) {
					process.setCurrentFrame(sequence.getStartKeyFrame());
					process.setFrameStart(now);
				} else if (sequence.hasFlag(
						AnimConsts.ANIM_REPEATS_FROM_ENDKEYFRAME)) {
					process.setCurrentFrame(sequence.getEndKeyFrame());
					process.setFrameStart(now);
				} else if (sequence.hasFlag(
						AnimConsts.ANIM_GOTO_END_FRAME)) {
					process.setCurrentFrame(sequence.getEndKeyFrame());
					// this call stops the animation
					process.setInUse(false);
				} else if (sequence.hasFlag(
						AnimConsts.ANIM_GOTO_START_FRAME)) {
					process.setCurrentFrame(sequence.getStartKeyFrame());
					// this call stops the animation
					process.setInUse(false);
				}
				// move on to the next sequence
				// TO DO
			}
		}
		// change the IO's image to the latest frame from the sequence
		setIOImageFromAnimation(process, sequence);
		// TO DO ASSIGN FLAGS TO IO
	}
	/**
	 * Determines if an animation is currently playing
	 * @param ioId the reference id for the interactive object
	 * @param sequenceId the animation sequence id
	 * @return true if the animation is already playing; false otherwise
	 */
	private boolean isAnimationPlaying(final int ioId, final int sequenceId) {
		boolean is = false;
		for (int i = 0; i < processes.length; i++) {
			if (processes[i].isInUse()
					&& processes[i].getCurrentAnimationSequenceId()
					== sequenceId
					&& processes[i].getRefId() == ioId) {
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
	public void playAnimation(final BaseInteractiveObject io,
			final int sequenceId) {
		if (!isAnimationPlaying(io.getRefId(), sequenceId)) {
			int index = getNextAvailableProcess();
			processes[index].setRefId(io.getRefId());
			processes[index].setCurrentAnimationSequenceId(sequenceId);
			processes[index].setInUse(true);
		}
	}
	/**
	 * Plays an animation for an interactive object.
	 * @param io the {@link BaseInteractiveObject}
	 * @param sequenceId the animation sequence id
	 * @param flags any flags assigned to the animation
	 * @throws Exception if an error occurs
	 */
	public void playAnimation(final BaseInteractiveObject io,
			final int sequenceId, final long flags) throws Exception {
		if (!isAnimationPlaying(io.getRefId(), sequenceId)) {
			int index = getNextAvailableProcess();
			processes[index].setRefId(io.getRefId());
			processes[index].setCurrentAnimationSequenceId(sequenceId);
			processes[index].setInUse(true);
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
	 * @throws Exception if an error occurs
	 */
	public void playAnimation(final BaseInteractiveObject io,
			final String sequenceName) throws Exception {
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
	 * @throws Exception if an error occurs
	 */
	public void playAnimation(final BaseInteractiveObject io,
			final String sequenceName, final long flags) throws Exception {
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
	 * @throws Exception if an error occurs
	 */
	public void removeAllAnimationFlags(final BaseInteractiveObject io,
			final String sequenceName) throws Exception {
		AnimationSequenceObject sequence =
				AnimationSequenceObjectFactory.getInstance().getSequenceByName(
						sequenceName);
		for (int i = 0; i < processes.length; i++) {
			AnimationProcessObject process = processes[i];
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
	 * @throws Exception if an error occurs
	 */
	private void setIOImageFromAnimation(final AnimationProcessObject process,
			final AnimationSequenceObject sequence) throws Exception {
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
	public void stopAllAnimations(final BaseInteractiveObject io) {
		for (int i = 0; i < processes.length; i++) {
			if (processes[i].getRefId() == io.getRefId()) {
				// found the animation process
				processes[i].setInUse(false);
			}
		}
	}
	public void stopRepeatingAnimation(final BaseInteractiveObject io)
			throws Exception {
		for (int i = 0; i < processes.length; i++) {
			AnimationProcessObject process = processes[i];
			if (process.getRefId() == io.getRefId()) {
				// get the animation sequence
				AnimationSequenceObject sequence =
						AnimationSequenceObjectFactory
								.getInstance()
								.getSequenceById(
										process.getCurrentAnimationSequenceId());
				sequence.removeFlag(AnimConsts.ANIM_REPEATS_FROM_BEGINNING);
				sequence.removeFlag(AnimConsts.ANIM_REPEATS_FROM_STARTKEYFRAME);
				sequence.removeFlag(AnimConsts.ANIM_REPEATS_FROM_ENDKEYFRAME);
				sequence.assignFlag(AnimConsts.ANIM_GOTO_END_FRAME);
			}
		}
	}
	/** Updates all animations. */
	public void update() {
		try {
			for (int i = 0; i < processes.length; i++) {
				if (processes[i].isInUse()) {
					if (Interactive.getInstance().hasIO(
							processes[i].getRefId())) {
						handleProcess(processes[i]);
					} else {
						processes[i].setInUse(false);
					}
				}
			}
		} catch (Exception ex) {
			GameApplet.getInstance().fatalError(ex);
		}
	}
}