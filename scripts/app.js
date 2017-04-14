define(['jquery'], function($) {
	var App = function() {
		this.center = function() {
            window.scrollTo(0, 1);
        };
        /** Hides any open windows. */
        this.hideWindows = function() {
        	/*
            if($('#achievements').hasClass('active')) {
        	    this.toggleAchievements();
        	    $('#achievementsbutton').removeClass('active');
        	}
        	if($('#instructions').hasClass('active')) {
        	    this.toggleInstructions();
        	    $('#helpbutton').removeClass('active');
        	}
        	if($('body').hasClass('credits')) {
        	    this.closeInGameCredits();
        	}
        	if($('body').hasClass('about')) {
        	    this.closeInGameAbout();
        	}
        	*/
        };
	};
    return App;
});