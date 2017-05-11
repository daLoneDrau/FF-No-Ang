/**
 * 
 */
package com.dalonedrau.jogl.opengl.animation;

import com.dalonedrau.pool.PooledStringBuilder;
import com.dalonedrau.pool.StringBuilderPool;

/**
 * @author Donald
 *
 */
public final class AnimationFrameObjectFactory {
	/**
	 * the one and only instance of the <code>AnimationFrameObjectFactory</code>
	 * class.
	 */
	private static AnimationFrameObjectFactory	instance;
	/**
	 * Gives access to the singleton instance of
	 * {@link AnimationFrameObjectFactory}.
	 * @return {@link AnimationFrameObjectFactory}
	 */
	public static AnimationFrameObjectFactory getInstance() {
		if (AnimationFrameObjectFactory.instance == null) {
			AnimationFrameObjectFactory.instance = new AnimationFrameObjectFactory();
		}
		return AnimationFrameObjectFactory.instance;
	}
	/** the list of images. */
	private AnimationFrameObject[]	frames	= new AnimationFrameObject[10];
	/** the list of image names used. */
	private String[]			names	= new String[10];
	/** the next available image id. */
	private int					nextId	= 0;
	/**
	 * Attempts to add a frame to the {@link AnimationFrameObjectFactory}.
	 * @param frameName the image's name
	 * @param frame the {@link AnimationFrameObject}
	 * @throws Exception if the frame could not be loaded
	 */
	public void addFrame(final String frameName,
			final AnimationFrameObject frame) throws Exception {
		if (frameName == null) {
			PooledStringBuilder sb = StringBuilderPool.getInstance()
					.getStringBuilder();
			sb.append("ERROR! AnimationFrameObjectFactory.addFrame() - ");
			sb.append("null value sent in parameters");
			Exception ex = new Exception(sb.toString());
			sb.returnToPool();
			throw ex;
		}
		if (frame == null) {
			PooledStringBuilder sb = StringBuilderPool.getInstance()
					.getStringBuilder();
			sb.append("ERROR! AnimationFrameObjectFactory.addFrame() - ");
			sb.append("null value sent in parameters");
			Exception ex = new Exception(sb.toString());
			sb.returnToPool();
			throw ex;
		}
		if (hasFrame(frameName)) {
			PooledStringBuilder sb = StringBuilderPool.getInstance()
					.getStringBuilder();
			sb.append("ERROR! AnimationFrameObjectFactory.addFrame() - ");
			sb.append("frame '");
			sb.append(frameName);
			sb.append("' already loaded");
			AnimationFramelLoadedException ex = new AnimationFramelLoadedException(sb.toString());
			sb.returnToPool();
			throw ex;
		}
		if (frame.getRefId()< frames.length
				&& frames[frame.getRefId()] != null) {
			PooledStringBuilder sb = StringBuilderPool.getInstance()
					.getStringBuilder();
			sb.append("ERROR! AnimationFrameObjectFactory.addFrame() - ");
			sb.append("frame '");
			sb.append(frameName);
			sb.append("' assigned invalid refId.  RefId already in use.");
			Exception ex = new Exception(sb.toString());
			sb.returnToPool();
			throw ex;
		}
		if (frame.getRefId() >= frames.length) {
			// extend the names array
			String[] tempStr = new String[frame.getRefId() + 1];
			System.arraycopy(names, 0, tempStr, 0, names.length);
			names = tempStr;
			// extend the images array
			AnimationFrameObject[] tempImg =
					new AnimationFrameObject[frame.getRefId() + 1];
			System.arraycopy(frames, 0, tempImg, 0, frames.length);
			frames = tempImg;
		}
		names[frame.getRefId()] = frameName;
		frames[frame.getRefId()] = frame;
	}
	/**
	 * Gets a {@link AnimationFrameObject} by its reference id.
	 * @param id the reference id
	 * @return {@link AnimationFrameObject}
	 * @throws Exception if the frame does not exist
	 */
	public AnimationFrameObject getFrameById(final int id) throws Exception {
		AnimationFrameObject frame = null;
		if (id >= 0
				&& id < frames.length) {
			frame = frames[id];
		}
		if (frame == null) {
			PooledStringBuilder sb = StringBuilderPool.getInstance()
					.getStringBuilder();
			sb.append("ERROR! AnimationFrameObjectFactory.getFrameById() - ");
			sb.append("invalid refId. frame with refId ");
			sb.append(id);
			sb.append(" was never loaded.");
			Exception ex = new Exception(sb.toString());
			sb.returnToPool();
			throw ex;
		}
		return frame;
	}
	/**
	 * Gets a {@link AnimationFrameObject} by its name.
	 * @param frameName the frame's name
	 * @return {@link AnimationFrameObject}
	 * @throws Exception if the frame does not exist
	 */
	public AnimationFrameObject getFrameByName(final String frameName)
			throws Exception {
		AnimationFrameObject frame = null;
		int id = -1;
		for (int i = 0; i < names.length; i++) {
			if (names[i] != null
					&& names[i].equals(frameName)) {
				id = i;
				break;
			}
		}
		if (id >= 0
				&& id < frames.length) {
			frame = frames[id];
		}
		if (frame == null) {
			PooledStringBuilder sb = StringBuilderPool.getInstance()
					.getStringBuilder();
			sb.append("ERROR! AnimationFrameObjectFactory.getFrameByName() - ");
			sb.append("invalid refId. frame '");
			sb.append(frameName);
			sb.append("' was never loaded.");
			Exception ex = new Exception(sb.toString());
			sb.returnToPool();
			throw ex;
		}
		return frame;
	}
	/**
	 * Gets the reference id for a specific frame.
	 * @param frameName the frame's name
	 * @return int
	 * @throws Exception if the frame was not loaded
	 */
	public int getFrameRefId(final String frameName) throws Exception {
		int id = -1;
		for (int i = 0; i < names.length; i++) {
			if (names[i] != null
					&& names[i].equals(frameName)) {
				id = i;
				break;
			}
		}
		if (id == -1) {
			PooledStringBuilder sb = StringBuilderPool.getInstance()
					.getStringBuilder();
			sb.append("ERROR! AnimationFrameObjectFactory.getFrameRefId() - ");
			sb.append("invalid name: '");
			sb.append(frameName);
			sb.append("'");
			Exception ex = new Exception(sb.toString());
			sb.returnToPool();
			throw ex;
		}
		return id;
	}
	/**
	 * Gets the next available frame id.
	 * @return int
	 */
	public int getNextId() {
		return nextId++;
	}
	/**
	 * Determines if the {@link AnimationFrameObjectFactory} has an frame by a
	 * specific name.
	 * @param frameName the frame's name
	 * @return true if an frame by that name has been stored already; false
	 *         otherwise
	 */
	public boolean hasFrame(final String frameName) {
		boolean has = false;
		for (int i = 0; i < names.length; i++) {
			if (frameName != null
					&& names[i] != null
					&& frameName.equals(names[i])) {
				has = true;
				break;
			}
		}
		return has;
	}	
}