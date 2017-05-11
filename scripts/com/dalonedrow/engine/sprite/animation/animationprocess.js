/**
 * 
 */
package com.dalonedrau.jogl.opengl.animation;

import com.rpg.base.interactive.flyweight.BaseInteractiveObject;

/**
 * The animation process class, which holds references to the id of the current 
 * animation and the number of the current frame being displayed.  Each 
 * animation process is associated with a specific interactive object being 
 * drawn
 * @author DaLoneDrau
 */
public final class AnimationProcessObject {
	/** the reference id of the current animation. */
	private int		currentAnimationSequenceId;
	/** the current frame being displayed. */
	private int		currentFrame	= 0;
	/** any flags applied to the current animation. */
	private long	flags			= 0;
	/** the time that the current animation frame started playing. */
	private long	frameStart		= AnimConsts.ANIM_NOT_STARTED;
	/**
	 * the flag indicating whether the {@link AnimationProcessObject} is in use.
	 */
	private boolean	inUse			= false;
	/**
	 * the reference id of the next animation played after the current finishes.
	 */
	private int		nextAnimation;
	/** any flags applied to the next animation. */
	private long	nextFlags;
	/**
	 * the reference id of the {@link BaseInteractiveObject} the animation is
	 * associated with.
	 */
	private int		refId;
	/** Creates a new instance of {@link AnimationProcessObject}. */
	public AnimationProcessObject() {
		refId = -1;
		inUse = false;
	}
	/**
	 * Gets the reference id of the current animation.
	 * @return int
	 */
	public int getCurrentAnimationSequenceId() {
		return currentAnimationSequenceId;
	}
	/**
	 * Gets the current frame being displayed.
	 * @return int
	 */
	public int getCurrentFrame() {
		return currentFrame;
	}
	/**
	 * Gets the time that the current animation frame started playing.
	 * @return long
	 */
	public long getFrameStart() {
		return frameStart;
	}
	/**
	 * Gets the reference id of the {@link BaseInteractiveObject} the animation
	 * is associated with.
	 * @return int
	 */
	public int getRefId() {
		return refId;
	}
	/**
	 * Gets the flag indicating whether the {@link AnimationProcessObject} is in
	 * use.
	 * @return true if the {@link AnimationProcessObject} is being used; false
	 *         otherwise
	 */
	public boolean isInUse() {
		return inUse;
	}
	/**
	 * Sets the reference id of the current animation.
	 * @param id the id to set
	 */
	public void setCurrentAnimationSequenceId(final int id) {
		currentAnimationSequenceId = id;
	}
	/**
	 * Sets the current frame being displayed.
	 * @param index the index to set
	 */
	public void setCurrentFrame(final int index) {
		currentFrame = index;
	}
	/**
	 * Sets the time that the current animation frame started playing.
	 * @param time the time to set
	 */
	public void setFrameStart(final long time) {
		frameStart = time;
	}
	/**
	 * Sets the flag indicating whether the {@link AnimationProcessObject} is in
	 * use.
	 * @param val the flag
	 */
	public void setInUse(final boolean val) {
		inUse = val;
	}
	/**
	 * Sets the reference id of the {@link BaseInteractiveObject} the animation
	 * is associated with.
	 * @param val the id to set
	 */
	public void setRefId(final int val) {
		refId = val;
	}
}