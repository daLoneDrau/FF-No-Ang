define(function() {
	var FFGameStates = (function () {
		return {
			/** game showing intro screen. */
			SPLASH	: 0,
			/** game displaying character selection screen. */
			CHARACTER_SELECTION : 1,
			/** game in play. */
			INTRO : 2,
			/** game in play. */
			IN_PLAY : 3
		}
	})();
	return FFGameStates;
});