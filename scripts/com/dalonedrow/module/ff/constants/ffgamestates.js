define(function() {
	var FFGameStates = (function () {
		return {
			/** game showing intro screen. */
			INTRO	: 0,
			/** game displaying character selection screen. */
			CHARACTER_SELECTION : 1,
			/** game in play. */
			IN_PLAY : 2
		}
	})();
	return FFGameStates;
});