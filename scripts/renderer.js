define(["camera", "timer",
	"com/dalonedrow/engine/sprite/base/maptile",
	"com/dalonedrow/engine/sprite/base/simplevector2",
	"com/dalonedrow/engine/sprite/base/tile",
	"com/dalonedrow/engine/sprite/base/tilesheet"],
	function(Camera, Timer, MapTile, SimpleVector2, Tile, Tilesheet) {
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
        this.sampleSheet = new Tilesheet('img/sharm_tiny.png');
        this.map = [];
        this.sampleTiles = [];
        for (var i = 0; i < 15; i++) {
        	this.sampleTiles.push(new Tile(this.sampleSheet, i));
        }
        // mmmfgggwwwwgggbmmmm
        var x = 0, y = 0;
        for (var l = x + 3; x < l; x++) { // 3 mountain
            this.map.push(new MapTile(new SimpleVector2(x, y), this.sampleTiles[5]));
        }
        this.map.push(new MapTile(new SimpleVector2(x++, y), this.sampleTiles[4]));
        for (var l = x + 3; x < l; x++) { // 3 grass
            this.map.push(new MapTile(new SimpleVector2(x, y), this.sampleTiles[1]));
        }
        for (var l = x + 4; x < l; x++) { // 4 water
            this.map.push(new MapTile(new SimpleVector2(x, y), this.sampleTiles[6]));
        }
        for (var l = x + 3; x < l; x++) { // 3 grass
            this.map.push(new MapTile(new SimpleVector2(x, y), this.sampleTiles[1]));
        }
        this.map.push(new MapTile(new SimpleVector2(x++, y), this.sampleTiles[3]));
        for (var l = x + 4; x < l; x++) { // 4 mountain
            this.map.push(new MapTile(new SimpleVector2(x, y), this.sampleTiles[5]));
        }
        
        // fffggcwwwwwwgggbmmm
        x = 0, y++;
        for (var l = x + 3; x < l; x++) { // 3 forest
            this.map.push(new MapTile(new SimpleVector2(x, y), this.sampleTiles[4]));
        }
        for (var l = x + 2; x < l; x++) { // 2 grass
            this.map.push(new MapTile(new SimpleVector2(x, y), this.sampleTiles[1]));
        }
        this.map.push(new MapTile(new SimpleVector2(x++, y), this.sampleTiles[8]));
        for (var l = x + 6; x < l; x++) { // 6 water
            this.map.push(new MapTile(new SimpleVector2(x, y), this.sampleTiles[6]));
        }
        for (var l = x + 3; x < l; x++) { // 3 grass
            this.map.push(new MapTile(new SimpleVector2(x, y), this.sampleTiles[1]));
        }
        this.map.push(new MapTile(new SimpleVector2(x++, y), this.sampleTiles[3]));
        for (var l = x + 3; x < l; x++) { // 3 mountain
            this.map.push(new MapTile(new SimpleVector2(x, y), this.sampleTiles[5]));
        }
        // mfgggwwwwwwwwgggbbb
        x = 0, y++;
        this.map.push(new MapTile(new SimpleVector2(x++, y), this.sampleTiles[5]));
        this.map.push(new MapTile(new SimpleVector2(x++, y), this.sampleTiles[4]));
        for (var l = x + 3; x < l; x++) { // 3 grass
            this.map.push(new MapTile(new SimpleVector2(x, y), this.sampleTiles[1]));
        }
        for (var l = x + 8; x < l; x++) { // 8 water
            this.map.push(new MapTile(new SimpleVector2(x, y), this.sampleTiles[6]));
        }
        for (var l = x + 3; x < l; x++) { // 3 grass
            this.map.push(new MapTile(new SimpleVector2(x, y), this.sampleTiles[1]));
        }
        for (var l = x + 3; x < l; x++) { // 3 bush
            this.map.push(new MapTile(new SimpleVector2(x, y), this.sampleTiles[3]));
        }
        // mfgggwwwwwwwwgggbbm
        x = 0, y++;
        this.map.push(new MapTile(new SimpleVector2(x++, y), this.sampleTiles[5]));
        this.map.push(new MapTile(new SimpleVector2(x++, y), this.sampleTiles[4]));
        for (var l = x + 3; x < l; x++) { // 3 grass
            this.map.push(new MapTile(new SimpleVector2(x, y), this.sampleTiles[1]));
        }
        for (var l = x + 9; x < l; x++) { // 9 water
            this.map.push(new MapTile(new SimpleVector2(x, y), this.sampleTiles[6]));
        }
        for (var l = x + 2; x < l; x++) { // 2 grass
            this.map.push(new MapTile(new SimpleVector2(x, y), this.sampleTiles[1]));
        }
        for (var l = x + 2; x < l; x++) { // 2 bush
            this.map.push(new MapTile(new SimpleVector2(x, y), this.sampleTiles[3]));
        }
        this.map.push(new MapTile(new SimpleVector2(x++, y), this.sampleTiles[5]));
        // mmfggCwwggwwwwgbbmm
        x = 0, y++;
        for (var l = x + 2; x < l; x++) { // 2 mountain
            this.map.push(new MapTile(new SimpleVector2(x, y), this.sampleTiles[5]));
        }
        this.map.push(new MapTile(new SimpleVector2(x++, y), this.sampleTiles[4]));
        for (var l = x + 2; x < l; x++) { // 2 grass
            this.map.push(new MapTile(new SimpleVector2(x, y), this.sampleTiles[1]));
        }
        this.map.push(new MapTile(new SimpleVector2(x++, y), this.sampleTiles[9]));
        for (var l = x + 2; x < l; x++) { // 2 water
            this.map.push(new MapTile(new SimpleVector2(x, y), this.sampleTiles[6]));
        }
        for (var l = x + 2; x < l; x++) { // 2 grass
            this.map.push(new MapTile(new SimpleVector2(x, y), this.sampleTiles[1]));
        }
        for (var l = x + 4; x < l; x++) { // 4 water
            this.map.push(new MapTile(new SimpleVector2(x, y), this.sampleTiles[6]));
        }
        this.map.push(new MapTile(new SimpleVector2(x++, y), this.sampleTiles[1]));
        for (var l = x + 2; x < l; x++) { // 2 bush
            this.map.push(new MapTile(new SimpleVector2(x, y), this.sampleTiles[3]));
        }
        for (var l = x + 2; x < l; x++) { // 2 mountain
            this.map.push(new MapTile(new SimpleVector2(x, y), this.sampleTiles[5]));
        }
        // mmmfgggggggwwgbbmmm
        x = 0, y++;
        for (var l = x + 3; x < l; x++) { // 3 mountain
            this.map.push(new MapTile(new SimpleVector2(x, y), this.sampleTiles[5]));
        }
        this.map.push(new MapTile(new SimpleVector2(x++, y), this.sampleTiles[4]));
        for (var l = x + 7; x < l; x++) { // 7 grass
            this.map.push(new MapTile(new SimpleVector2(x, y), this.sampleTiles[1]));
        }
        for (var l = x + 2; x < l; x++) { // 2 water
            this.map.push(new MapTile(new SimpleVector2(x, y), this.sampleTiles[6]));
        }
        this.map.push(new MapTile(new SimpleVector2(x++, y), this.sampleTiles[1]));
        for (var l = x + 2; x < l; x++) { // 2 bush
            this.map.push(new MapTile(new SimpleVector2(x, y), this.sampleTiles[3]));
        }
        for (var l = x + 3; x < l; x++) { // 3 mountain
            this.map.push(new MapTile(new SimpleVector2(x, y), this.sampleTiles[5]));
        }
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
        for (var i = this.map.length - 1; i >= 0; i--) {
        	console.log(this.map[i]);
        	console.log(this.map[i].getPosition().getX());
        	console.log(Tilesheet.size);
        	console.log(Tilesheet.scale);
        	var x = this.map[i].getPosition().getX() * Tilesheet.size * Tilesheet.scale;
        	var y = this.canvas.height - Tilesheet.size * Tilesheet.scale
        	- this.map[i].getPosition().getY() * Tilesheet.size * Tilesheet.scale;
        	this.map[i].getTile().render(this.background, x, y);
        	console.log(x+","+y);
        }
        //Tile.sort(this.sampleTiles);
        //this.sampleTiles[0].render(this.background, 0, 0);
        //this.sampleTiles[1].render(this.background, 32, 0);
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