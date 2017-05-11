/**
 * 
 */
package com.dalonedrau.jogl.opengl.animation;

import com.dalonedrau.jogl.opengl.sprite.SpriteImageObject;

/**
 * @author Donald
 */
public final class AnimationFrameObject {
	/** the length in nanoseconds that this frame should play. */
	private long	duration;
	/** any flags applied to the frame. */
	private long	flags;
	/** the order that this frame appears in in the animation sequence. */
	private int		frameNumber;
	/**
	 * the reference id for the {@link SpriteImageObject} this frame displays.
	 */
	private int		imageRefId;
	/** the frame's reference id. */
	private int		refId;
	/**
	 * @param id
	 * @param time
	 * @param order
	 * @param imgId
	 */
	public AnimationFrameObject(final int id, final long time,
			final int order, final int imgId) {
		this.refId = id;
		this.duration = time;
		this.frameNumber = order;
		this.imageRefId = imgId;
	}
	/**
	 * Assigns a flag.
	 * @param flag the flag
	 */
	public void assignFlag(final long flag) {
		flags |= flag;
	}
	/** Clears all flags that were assigned. */
	public void clearFlags() {
		flags = 0;
	}
	/**
	 * Gets the length in nanoseconds that this frame should play.
	 * @return long
	 */
	public long getDuration() {
		return duration;
	}
	/**
	 * Gets the order that this frame appears in in the animation sequence.
	 * @return int
	 */
	public final int getFrameNumber() {
		return frameNumber;
	}
	/**
	 * Gets the reference id for the {@link SpriteImageObject} this frame
	 * displays.
	 * @return int
	 */
	public int getImageRefId() {
		return imageRefId;
	}
	/**
	 * Gets the frame's reference id.
	 * @return int
	 */
	public int getRefId() {
		return refId;
	}
	private float modSpeed;
	public final float getModSpeed() {
		return modSpeed;
	}
	public final void setModSpeed(final float val) {
		this.modSpeed = val;
	}
	/**
	 * Determines if the {@link AnimationFrameObject} has a specific flag set.
	 * @param flag the flag
	 * @return true if the flag was set; false otherwise
	 */
	public boolean hasFlag(final long flag) {
		return (flags & flag) == flag;
	}
	/**
	 * Removes a flag.
	 * @param flag the flag
	 */
	public void removeFlag(final long flag) {
		flags &= ~flag;
	}
	/**
	 * Sets the length in nanoseconds that this frame should play.
	 * @param val the length
	 */
	public void setDuration(final long val) {
		this.duration = val;
	}
	/**
	 * Sets the order that this frame appears in in the animation sequence.
	 * @param frameNumber
	 */
	public void setFrameNumber(final int val) {
		frameNumber = val;
	}
	/**
	 * Sets the reference id for the {@link SpriteImageObject} this frame
	 * displays.
	 * @param id the reference id
	 */
	public void setImageRefId(final int id) {
		imageRefId = id;
	}

}