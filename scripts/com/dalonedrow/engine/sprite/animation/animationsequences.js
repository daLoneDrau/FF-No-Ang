/**
 * 
 */
package com.dalonedrau.jogl.opengl.animation;

import com.dalonedrau.pool.PooledStringBuilder;
import com.dalonedrau.pool.StringBuilderPool;

/**
 * @author Donald
 */
public final class AnimationSequenceObjectFactory {
	/**
	 * the one and only instance of the
	 * <code>AnimationSequenceObjectFactory</code> class.
	 */
	private static AnimationSequenceObjectFactory	instance;
	/**
	 * Gives access to the singleton instance of
	 * {@link AnimationSequenceObjectFactory}.
	 * @return {@link AnimationSequenceObjectFactory}
	 */
	public static AnimationSequenceObjectFactory getInstance() {
		if (AnimationSequenceObjectFactory.instance == null) {
			AnimationSequenceObjectFactory.instance = 
				new AnimationSequenceObjectFactory();
		}
		return AnimationSequenceObjectFactory.instance;
	}
	/** the list of image names used. */
	private String[]					names		= new String[10];
	/** the next available image id. */
	private int							nextId		= 0;
	/** the list of images. */
	private AnimationSequenceObject[]	sequences	= 
		new AnimationSequenceObject[10];
	/**
	 * Attempts to add an animation sequence to the
	 * {@link AnimationSequenceObjectFactory}.
	 * @param sequenceName the sequence's name
	 * @param sequence the {@link AnimationSequenceObject}
	 * @throws Exception if the sequence could not be loaded
	 */
	public void addSequence(final String sequenceName,
			final AnimationSequenceObject sequence) throws Exception {
		if (sequenceName == null) {
			PooledStringBuilder sb = StringBuilderPool.getInstance()
					.getStringBuilder();
			sb.append("ERROR! AnimationSequenceObjectFactory.addSequence() - ");
			sb.append("null value sent in parameters");
			Exception ex = new Exception(sb.toString());
			sb.returnToPool();
			throw ex;
		}
		if (sequence == null) {
			PooledStringBuilder sb = StringBuilderPool.getInstance()
					.getStringBuilder();
			sb.append("ERROR! AnimationSequenceObjectFactory.addSequence() - ");
			sb.append("null value sent in parameters");
			Exception ex = new Exception(sb.toString());
			sb.returnToPool();
			throw ex;
		}
		if (hasFrame(sequenceName)) {
			PooledStringBuilder sb = StringBuilderPool.getInstance()
					.getStringBuilder();
			sb.append("ERROR! AnimationSequenceObjectFactory.addSequence() - ");
			sb.append("sequence '");
			sb.append(sequenceName);
			sb.append("' already loaded");
			Exception ex = new Exception(sb.toString());
			sb.returnToPool();
			throw ex;
		}
		if (sequence.getRefId() < sequences.length
				&& sequences[sequence.getRefId()] != null) {
			PooledStringBuilder sb = StringBuilderPool.getInstance()
					.getStringBuilder();
			sb.append("ERROR! AnimationSequenceObjectFactory.addSequence() - ");
			sb.append("sequence '");
			sb.append(sequenceName);
			sb.append("' assigned invalid refId.  RefId already in use.");
			Exception ex = new Exception(sb.toString());
			sb.returnToPool();
			throw ex;
		}
		if (sequence.getRefId() >= sequences.length) {
			// extend the names array
			String[] tempStr = new String[sequence.getRefId() + 1];
			System.arraycopy(names, 0, tempStr, 0, names.length);
			names = tempStr;
			// extend the images array
			AnimationSequenceObject[] tempImg =
					new AnimationSequenceObject[sequence.getRefId() + 1];
			System.arraycopy(sequences, 0, tempImg, 0, sequences.length);
			sequences = tempImg;
		}
		names[sequence.getRefId()] = sequenceName;
		sequences[sequence.getRefId()] = sequence;
	}
	/**
	 * Gets the next available sequence id.
	 * @return int
	 */
	public int getNextId() {
		return nextId++;
	}
	/**
	 * Gets a {@link AnimationSequenceObject} by its reference id.
	 * @param id the reference id
	 * @return {@link AnimationSequenceObject}
	 * @throws Exception if the sequence does not exist
	 */
	public AnimationSequenceObject getSequenceById(final int id)
			throws Exception {
		AnimationSequenceObject sequence = null;
		if (id >= 0
				&& id < sequences.length) {
			sequence = sequences[id];
		}
		if (sequence == null) {
			PooledStringBuilder sb = StringBuilderPool.getInstance()
					.getStringBuilder();
			sb.append("ERROR! AnimationSequenceObjectFactory.getSequenceById() - ");
			sb.append("invalid refId. sequence with refId");
			sb.append(id);
			sb.append(" was never loaded.");
			Exception ex = new Exception(sb.toString());
			sb.returnToPool();
			throw ex;
		}
		return sequence;
	}
	/**
	 * Gets a {@link AnimationSequenceObject} by its name.
	 * @param sequenceName the sequence's name
	 * @return {@link AnimationSequenceObject}
	 * @throws Exception if the sequence does not exist
	 */
	public AnimationSequenceObject getSequenceByName(final String sequenceName)
			throws Exception {
		AnimationSequenceObject sequence = null;
		int id = -1;
		for (int i = 0; i < names.length; i++) {
			if (names[i] != null
					&& names[i].equals(sequenceName)) {
				id = i;
				break;
			}
		}
		if (id >= 0
				&& id < sequences.length) {
			sequence = sequences[id];
		}
		if (sequence == null) {
			PooledStringBuilder sb = StringBuilderPool.getInstance()
					.getStringBuilder();
			sb.append("ERROR! AnimationSequenceObjectFactory.getSequenceByName() - ");
			sb.append("invalid refId. sequence '");
			sb.append(sequenceName);
			sb.append("' was never loaded.");
			Exception ex = new Exception(sb.toString());
			sb.returnToPool();
			throw ex;
		}
		return sequence;
	}
	/**
	 * Gets the reference id for a specific sequence.
	 * @param sequenceName the sequence's name
	 * @return int
	 * @throws Exception if the sequence was not loaded
	 */
	public int getSequenceRefId(final String sequenceName) throws Exception {
		int id = -1;
		for (int i = 0; i < names.length; i++) {
			if (names[i] != null
					&& names[i].equals(sequenceName)) {
				id = i;
				break;
			}
		}
		if (id == -1) {
			PooledStringBuilder sb = StringBuilderPool.getInstance()
					.getStringBuilder();
			sb.append("ERROR! AnimationSequenceObjectFactory.getSequenceRefId() - ");
			sb.append("invalid name: '");
			sb.append(sequenceName);
			sb.append("'");
			Exception ex = new Exception(sb.toString());
			sb.returnToPool();
			throw ex;
		}
		return id;
	}
	/**
	 * Determines if the {@link AnimationSequenceObjectFactory} has a sequence
	 * by a specific name.
	 * @param sequenceName the sequence's name
	 * @return true if a sequence by that name has been stored already; false
	 *         otherwise
	 */
	public boolean hasFrame(final String sequenceName) {
		boolean has = false;
		for (int i = 0; i < names.length; i++) {
			if (sequenceName != null
					&& names[i] != null
					&& sequenceName.equals(names[i])) {
				has = true;
				break;
			}
		}
		return has;
	}
}