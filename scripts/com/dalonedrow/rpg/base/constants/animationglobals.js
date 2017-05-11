define(function() {
	var AnimationGlobals = (function () {
		return {
			/** flag indicating the animation repeats itself from the beginning. */
			ANIM_REPEATS_FROM_BEGINNING	: 1,
			/** flag indicating the animation repeats itself from the key frame. */
			ANIM_REPEATS_FROM_STARTKEYFRAME : 1 << 1,
			/** flag indicating the animation repeats itself from the key frame. */
			ANIM_REPEATS_FROM_ENDKEYFRAME : 1 << 2,
			/** flag indicating that the frame's speed has been modified. */
			ANIM_FRAME_SPEED_MODIFIED : 1 << 3,
			/** flag indicating that the sequence's speed has been modified. */
			ANIM_SEQUENCE_SPEED_MODIFIED : 1 << 4,
			/** 
			 * flag indicating the animation should display its start 
			 * frame when stopped. 
			 */
			ANIM_GOTO_START_FRAME : 1 << 6,
			/** 
			 * flag indicating the animation should display its end 
			 * frame when stopped. 
			 */
			ANIM_GOTO_END_FRAME : 1 << 5,
			/** flag indicating that an animation has not started playing. */
			ANIM_NOT_STARTED : -1,
		}
	})();
	return AnimationGlobals;
});