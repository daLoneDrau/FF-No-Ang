define(['jquery'], function($) {
	var App = function() {
        this.ready = false;
        this.$playButton = $('.startgame');
        this.$playDiv = $('.startgame span');
	};
	App.prototype.canStartGame = function() {
		var can = this.game;
        if(this.isDesktop) {
            can = (this.game && this.game.map && this.game.map.isLoaded);
        }
        //return can;
        return true;
    }
	App.prototype.center = function() {
        window.scrollTo(0, 1);
    };
    App.prototype.hideIntro = function(hidden_callback) {
        clearInterval(this.watchNameInputInterval);
        $('body').removeClass('intro');
        console.log("try to hide");
        $("#createcharacter").hide();
        setTimeout(function() {
            $('body').addClass('game');
            hidden_callback();
        }, 1000);
    },
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
	App.prototype.setGame = function(game) {
        this.game = game;
        this.isMobile = this.game.renderer.mobile;
        this.isTablet = this.game.renderer.tablet;
        this.isDesktop = !(this.isMobile || this.isTablet);
        this.supportsWorkers = !!window.Worker;
        this.ready = true;
    };
    App.prototype.start = function(username) {
    	console.log("start");
    	this.game.newHero();
        $("#inventory").show();
    	/*
        var self = this, firstTimePlaying = !self.storage.hasAlreadyPlayed();
        
        if (username && !this.game.started) {
            var optionsSet = false,
                config = this.config;

            //>>includeStart("devHost", pragmas.devHost);
            if(config.local) {
                log.debug("Starting game with local dev config.");
                this.game.setServerOptions(config.local.host, config.local.port, username);
            } else {
                log.debug("Starting game with default dev config.");
                this.game.setServerOptions(config.dev.host, config.dev.port, username);
            }
            optionsSet = true;
            //>>includeEnd("devHost");
            
            //>>includeStart("prodHost", pragmas.prodHost);
            if(!optionsSet) {
                log.debug("Starting game with build config.");
                this.game.setServerOptions(config.build.host, config.build.port, username);
            }
            //>>includeEnd("prodHost");

            this.center();
            this.game.run(function() {
                $('body').addClass('started');
            	if(firstTimePlaying) {
            	    self.toggleInstructions();
            	}
        	});
        }
        */
    },
    App.prototype.startGame = function(username, starting_callback) {
        var self = this;
        
        if(starting_callback) {
            starting_callback();
        }
        this.hideIntro(function() {
            if(!self.isDesktop) {
                // On mobile and tablet we load the map after the player has clicked
                // on the PLAY button instead of loading it in a web worker.
                self.game.loadMap();
            }
            self.start(username);
        });
    },
    App.prototype.tryStartingGame = function(username, starting_callback) {
    	console.log("try starting game");
        var self = this, $play = this.$playButton;
        if(!this.ready || !this.canStartGame()) {
            if(!this.isMobile) {
                // on desktop and tablets, add a spinner to the play button
                $play.addClass('loading');
                console.log("loading class");
            }
            this.$playDiv.unbind('click');
            var watchCanStart = setInterval(function() {
                log.debug("waiting...");
                if(self.canStartGame()) {
                    setTimeout(function() {
                        if(!self.isMobile) {
                            $play.removeClass('loading');
                            console.log("remove loading class");
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