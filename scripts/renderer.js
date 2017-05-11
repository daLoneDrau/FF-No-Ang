define(["camera", "timer",
	"com/dalonedrow/engine/sprite/base/tile",
	"com/dalonedrow/engine/sprite/base/tilesheet"],
	function(Camera, Timer, Tile, Tilesheet) {
	var Renderer = function(game, canvas, background, foreground) {
        this.game = game;
        this.context = null;
        this.background = null;
        this.foreground = null;
        if (canvas && canvas.getContext) {
        	this.context = canvas.getContext("2d");
        }
        if (background && background.getContext) {
        	this.background = background.getContext("2d");
        }
        if (foreground && foreground.getContext) {
        	this.foreground = foreground.getContext("2d");
        }
    
        this.canvas = canvas;
        this.backcanvas = background;
        this.forecanvas = foreground;

        this.initFPS();
        this.tilesize = 16;
    
        this.upscaledRendering = this.context.mozImageSmoothingEnabled !== undefined;
        this.supportsSilhouettes = this.upscaledRendering;
    
        this.rescale(this.getScaleFactor());
    
        this.lastTime = new Date();
        this.frameCount = 0;
        this.maxFPS = this.FPS;
        this.realFPS = 0;
        this.isDebugInfoVisible = false;
    
        this.animatedTileCount = 0;
        this.highTileCount = 0;
    
        this.tablet = Detect.isTablet(window.innerWidth);
        
        this.fixFlickeringTimer = new Timer(100);
        this.sampleSheet = new Tilesheet('img/wang.png');
        this.sampleTiles = [
        	new Tile(this.sampleSheet, 0),
        	new Tile(this.sampleSheet, 1)
        ];
	};
	/**
	 * Clears all previously drawn content.
	 * @param ctx the {@link CanvasRenderingContext2D} instance being cleared
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clearRect
	 */
	Renderer.prototype.clearScreen = function(ct2) {
        ct2.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };
	Renderer.prototype.createCamera = function() {
        this.camera = new Camera(this);
        this.camera.rescale();
    
        this.canvas.width = this.camera.gridW * this.tilesize * this.scale;
        this.canvas.height = this.camera.gridH * this.tilesize * this.scale;
        log.debug("#entities set to "+this.canvas.width+" x "+this.canvas.height);
    
        this.backcanvas.width = this.canvas.width;
        this.backcanvas.height = this.canvas.height;
        log.debug("#background set to "+this.backcanvas.width+" x "+this.backcanvas.height);
    
        this.forecanvas.width = this.canvas.width;
        this.forecanvas.height = this.canvas.height;
        log.debug("#foreground set to "+this.forecanvas.width+" x "+this.forecanvas.height);
    };
    /**
     * Gets the game's scale factor, based on the window's height.  If less than 1000px, the scale
     * factor is 2.  If between 870px and 1500px, scale factor is 3, and over 1500px, scale factor
     * is 3.
     */
    Renderer.prototype.getScaleFactor = function() {
        var w = window.innerWidth,
            h = window.innerHeight,
            scale;
    
        this.mobile = false;
    
        if (w <= 1000) {
            scale = 2;
            this.mobile = true;
        } else if (w <= 1500 || h <= 870) {
            scale = 2;
        } else {
            scale = 3;
        }
    
        return scale;
    };
    /**
     * Initializes the game's font size based on the scale.
     */
    Renderer.prototype.initFont = function() {
        var fontsize;
    
        switch(this.scale) {
            case 1:
                fontsize = 10;
                break;
            case 2:
            	if (Detect.isWindows()) {
            		fontsize = 10;
            	} else {
            		fontsize = 13;
            	}
                break;
            default:
                fontsize = 20;
        }
        this.setFontSize(fontsize);
    },
    /**
     * Initializes the Frame Per Second.  Always 50.
     */
	Renderer.prototype.initFPS = function() {
        this.FPS = this.mobile ? 50 : 50;
    };
    Renderer.prototype.rescale = function(factor) {
        this.scale = this.getScaleFactor();
    
        this.createCamera();
    
        this.context.mozImageSmoothingEnabled = false;
        this.background.mozImageSmoothingEnabled = false;
        this.foreground.mozImageSmoothingEnabled = false;
    
        this.initFont();
        this.initFPS();
    
        if (!this.upscaledRendering && this.game.map && this.game.map.tilesets) {
            this.setTileset(this.game.map.tilesets[this.scale - 1]);
        }
        if (this.game.renderer) {
            this.game.setSpriteScale(this.scale);
        }
    };
    Renderer.prototype.renderFrame = function() {
        if(this.mobile || this.tablet) {
            this.renderFrameMobile();
        }
        else {
            this.renderFrameDesktop();
        }
    };
    Renderer.prototype.renderFrameDesktop = function() {
    	// clear the screen and push onto the drawing stack
        this.clearScreen(this.context);
        this.context.save();
        console.log(ctx)
        console.log(this.context)
        // fill the screen with green
        this.background.fillStyle = "green";
        this.background.fillRect(0, 0, this.canvas.width, this.canvas.height);
        Tile.sort(this.sampleTiles);
        this.sampleTiles[0].render(this.background, 0, 0);
        this.sampleTiles[1].render(this.background, 32, 0);
        //this.background.drawImage(sampleSheet, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        //this.foreground.fillStyle = "blue";
        //this.foreground.fillRect(0, 0, this.canvas.width, this.canvas.height);
        //ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        /*
        this.setCameraView(this.context);
        this.drawAnimatedTiles();
    
        if(this.game.started) {
            this.drawSelectedCell();
            this.drawTargetCell();
        }

        //this.drawOccupiedCells();
        this.drawPathingCells();
        this.drawEntities();
        this.drawCombatInfo();
        this.drawHighTiles(this.context);
        this.context.restore();
    
        // Overlay UI elements
        this.drawCursor();
        this.drawDebugInfo();
        */
    };
    /**
     * Sets the game's font size on the context and background canvases.
     * @param size the font size
     */
    Renderer.prototype.setFontSize = function(size) {
        var font = [size, "px GraphicPixel"].join("");
    
        this.context.font = font;
        this.background.font = font;
    };
	return Renderer;
});