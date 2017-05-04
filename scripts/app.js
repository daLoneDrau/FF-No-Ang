define(['jquery'], function($) {
	var App = function() {
        this.ready = false;
        this.$playButton = $('.startgame');
        this.$playDiv = $('.startgame span');
	};
	App.prototype.canStartGame = function() {
        if(this.isDesktop) {
            return (this.game && this.game.map && this.game.map.isLoaded);
        } else {
            return this.game;
        }
    }
	App.prototype.setGame = function(game) {
        this.game = game;
        this.isMobile = this.game.renderer.mobile;
        this.isTablet = this.game.renderer.tablet;
        this.isDesktop = !(this.isMobile || this.isTablet);
        this.supportsWorkers = !!window.Worker;
        this.ready = true;
    };
	App.prototype.center = function() {
        window.scrollTo(0, 1);
    };
    /** Hides any open windows. */
    App.prototype.hideWindows = function() {
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
    App.prototype.tryStartingGame = function(username, starting_callback) {
    	console.log("try starting");
        var self = this, $play = this.$playButton;
        if(!this.ready || !this.canStartGame()) {
            if(!this.isMobile) {
                // on desktop and tablets, add a spinner to the play button
                $play.addClass('loading');
            }
            this.$playDiv.unbind('click');
            var watchCanStart = setInterval(function() {
                log.debug("waiting...");
                if(self.canStartGame()) {
                    setTimeout(function() {
                        if(!self.isMobile) {
                            $play.removeClass('loading');
                        }
                    }, 1500);
                    clearInterval(watchCanStart);
                    self.startGame(username, starting_callback);
                }
            }, 100);
        } else {
            this.$playDiv.unbind('click');
            this.startGame(username, starting_callback);
        }
        /*
        
        if(username !== '') {
            if(!this.ready || !this.canStartGame()) {
                if(!this.isMobile) {
                    // on desktop and tablets, add a spinner to the play button
                    $play.addClass('loading');
                }
                this.$playDiv.unbind('click');
                var watchCanStart = setInterval(function() {
                    log.debug("waiting...");
                    if(self.canStartGame()) {
                        setTimeout(function() {
                            if(!self.isMobile) {
                                $play.removeClass('loading');
                            }
                        }, 1500);
                        clearInterval(watchCanStart);
                        self.startGame(username, starting_callback);
                    }
                }, 100);
            } else {
                this.$playDiv.unbind('click');
                this.startGame(username, starting_callback);
            }      
        }
        */
    };
    return App;
});