
define(["renderer", "com/dalonedrow/engine/systems/base/projectconstants",
	"com/dalonedrow/module/ff/constants/ffcommand",
	'com/dalonedrow/module/ff/constants/ffequipmentelements',
	"com/dalonedrow/module/ff/constants/ffequipmentslots",
	"com/dalonedrow/module/ff/systems/ffcontroller",
	"com/dalonedrow/module/ff/systems/ffinteractive",
	"com/dalonedrow/module/ff/systems/ffscript",
	"com/dalonedrow/module/ff/systems/webserviceclient",
	'com/dalonedrow/engine/systems/base/interactive',
	"com/dalonedrow/rpg/base/constants/die",
	"com/dalonedrow/rpg/base/constants/dice",
	"com/dalonedrow/rpg/base/systems/script",
	// LOAD SCRIPTS
	"com/dalonedrow/module/ff/scripts/items/ironsword"
	],
	function(Renderer, ProjectConstants, FFCommand, FFEquipmentElements, FFEquipmentSlots, 
			FFController, FFInteractive, FFScript, WebServiceClient, Interactive, Die, Dice,
			Script, IronSword) {
	var Game = function(app) {
        this.app = app;
        //this.app.config = config;
        this.ready = false;
        this.started = false;
        this.hasNeverStarted = true;
    
        this.renderer = null;
        this.updater = null;
        this.pathfinder = null;
        this.chatinput = null;
        this.bubbleManager = null;
        this.audioManager = null;
    
        // Player
        //this.player = new Warrior("player", "");
        this.player = null;

        // Game state
        this.entities = {};
        this.deathpositions = {};
        this.entityGrid = null;
        this.pathingGrid = null;
        this.renderingGrid = null;
        this.itemGrid = null;
        this.currentCursor = null;
        this.mouse = { x: 0, y: 0 };
        this.zoningQueue = [];
        this.previousClickPosition = {};

        this.selectedX = 0;
        this.selectedY = 0;
        this.selectedCellVisible = false;
        this.targetColor = "rgba(255, 255, 255, 0.5)";
        this.targetCellVisible = true;
        this.hoveringTarget = false;
        this.hoveringMob = false;
        this.hoveringItem = false;
        this.hoveringCollidingTile = false;
    
        // combat
        //this.infoManager = new InfoManager(this);
    
        // zoning
        this.currentZoning = null;
    
        this.cursors = {};

        this.sprites = {};
    
        // tile animation
        this.animatedTiles = null;
    
        // debug
        this.debugPathing = false;		
	}
    /**
     * Processes game logic when the user triggers a click/touch event during the game.
     */
	Game.prototype.click = function() {
		console.log("canvas click");
		// figure out where on the screen was clicked
        // var pos = this.getMouseGridPosition();
        var entity;
        /*
        if (pos.x === this.previousClickPosition.x
        		&& pos.y === this.previousClickPosition.y) {
            return;
        } else {
            this.previousClickPosition = pos;
        }
        
	    if (this.started
	    && this.player
	    && !this.isZoning()
	    && !this.isZoningTile(this.player.nextGridX, this.player.nextGridY)
	    && !this.player.isDead
	    && !this.hoveringCollidingTile
	    && !this.hoveringPlateauTile) {
    	    entity = this.getEntityAt(pos.x, pos.y);
	    
    	    if(entity instanceof Mob) {
    	        this.makePlayerAttack(entity);
    	    }
    	    else if(entity instanceof Item) {
    	        this.makePlayerGoToItem(entity);
    	    }
    	    else if(entity instanceof Npc) {
    	        if(this.player.isAdjacentNonDiagonal(entity) === false) {
                    this.makePlayerTalkTo(entity);
    	        } else {
                    this.makeNpcTalk(entity);
    	        }
    	    }
    	    else if(entity instanceof Chest) {
    	        this.makePlayerOpenChest(entity);
    	    }
    	    else {
    	        this.makePlayerGoTo(pos.x, pos.y);
    	    }
    	}
    	*/
    };
    Game.prototype.initWebServiceClient = function() {
        var list = WebServiceClient.getInstance().getDieEntities();
        for (var i = 0, len = list.length; i < len; i++) {
        	if (!list[i].value) {
        		list[i].value = 0;
        	}
        	Die.values.push(new Die(list[i].code, list[i].value));
        }
        list = WebServiceClient.getInstance().getDiceEntities();
        for (var i = 0, len = list.length; i < len; i++) {
        	Dice.values.push(new Dice(list[i].code, list[i].number, Die[list[i].die.code],
        			list[i].plus));
        }
        list = WebServiceClient.getInstance().getCommandEntities();
        for (var i = 0, len = list.length; i < len; i++) {
        	if (!list[i].sort_order) {
        		list[i].sort_order = 0;
        	}
        	FFCommand.values.push(new FFCommand(list[i].name, list[i].sort_order));
        }
    	if (FFEquipmentElements.values.length === 0) {
    		console.log("need to load FFEquipmentElements2")
            list = WebServiceClient.getInstance().getEquipmentElementEntities();
            for (var i = 0, len = list.length; i < len; i++) {
            	if (!list[i].value) {
            		list[i].value = 0;
            	}
            	FFEquipmentElements.values.push(new FFEquipmentElements(list[i].code, list[i].value));
            }
    	}
    	if (FFEquipmentSlots.values.length === 0) {
    		console.log("need to load FFEquipmentSlots2")
	        list = WebServiceClient.getInstance().getEquipmentSlotEntities();
	        for (var i = 0, len = list.length; i < len; i++) {
	        	if (!list[i].value) {
	        		list[i].value = 0;
	        	}
	            FFEquipmentSlots.values.push(new FFEquipmentSlots(list[i].name, list[i].value));
	        }
    	}
    };
    Game.prototype.newHero = function(renderer) {
    	Interactive.getInstance().newHero();
    	var io = ProjectConstants.getInstance().getPlayerIO();
    	console.log(io);
    };
    Game.prototype.run = function(renderer) {
    	console.log("running...")
        this.currentTime = new Date().getTime();

        if (this.started) {
            //this.updateCursorLogic();
            //this.updater.update();
            this.renderer.renderFrame();
        }

        if (!this.isStopped) {
        	requestAnimFrame(Game.prototype.run);
        }
    };
    Game.prototype.setRenderer = function(renderer) {
        this.renderer = renderer;
    };
    Game.prototype.start = function(renderer) {
    	this.started = true;
        this.run();
    };
    Game.prototype.setStorage = function(storage) {
        this.storage = storage;
    };
	Game.prototype.setup = function($bubbleContainer, canvas, background, foreground) {
		//this.setBubbleManager(new BubbleManager($bubbleContainer));
		this.setRenderer(new Renderer(this, canvas, background, foreground));
		//this.setChatInput(input);"
		this.initWebServiceClient();
		ProjectConstants.setInstance(new FFController());
		Interactive.setInstance(new FFInteractive());
		Script.setInstance(new FFScript());
    };
	return Game;
});