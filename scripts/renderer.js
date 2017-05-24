define(["camera", "timer",
	"com/dalonedrow/engine/sprite/base/maptile",
	"com/dalonedrow/engine/sprite/base/simplevector2",
	"com/dalonedrow/engine/sprite/base/tile",
	"com/dalonedrow/engine/sprite/base/tilesheet",
	"com/dalonedrow/module/ff/sprite/sharmmap"],
	function(Camera, Timer, MapTile, SimpleVector2, Tile, Tilesheet, SharmMap) {
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
        //***************************************
        //              CREATE MAP
        //***************************************
        this.map = new SharmMap(this.scale);
        // mmmfgggwwwwgggbmmmm
        var x = 0, y = 0;
        for (var l = x + 3; x < l; x++) { // 3 mountain
            this.map.addCell(new MapTile(new SimpleVector2(x, y), SharmMap.TILE_MOUNTAIN));
        }
        this.map.addCell(new MapTile(new SimpleVector2(x++, y), SharmMap.TILE_FOREST));
        for (var l = x + 3; x < l; x++) { // 3 grass
            this.map.addCell(new MapTile(new SimpleVector2(x, y), SharmMap.TILE_GRASS_LT_VEG));
        }
        for (var l = x + 4; x < l; x++) { // 4 water
            this.map.addCell(new MapTile(new SimpleVector2(x, y), SharmMap.TILE_WATER_1));
        }
        for (var l = x + 3; x < l; x++) { // 3 grass
            this.map.addCell(new MapTile(new SimpleVector2(x, y), SharmMap.TILE_GRASS_LT_VEG));
        }
        this.map.addCell(new MapTile(new SimpleVector2(x++, y), SharmMap.TILE_BUSH));
        for (var l = x + 4; x < l; x++) { // 4 mountain
            this.map.addCell(new MapTile(new SimpleVector2(x, y), SharmMap.TILE_MOUNTAIN));
        }
        // fffggcwwwwwwgggbmlm
        x = 0, y++;
        for (var l = x + 3; x < l; x++) { // 3 forest
            this.map.addCell(new MapTile(new SimpleVector2(x, y), SharmMap.TILE_FOREST));
        }
        for (var l = x + 2; x < l; x++) { // 2 grass
            this.map.addCell(new MapTile(new SimpleVector2(x, y), SharmMap.TILE_GRASS_LT_VEG));
        }
        this.map.addCell(new MapTile(new SimpleVector2(x++, y), SharmMap.TILE_CITY));
        for (var l = x + 6; x < l; x++) { // 6 water
            this.map.addCell(new MapTile(new SimpleVector2(x, y), SharmMap.TILE_WATER_1));
        }
        for (var l = x + 3; x < l; x++) { // 3 grass
            this.map.addCell(new MapTile(new SimpleVector2(x, y), SharmMap.TILE_GRASS_LT_VEG));
        }
        this.map.addCell(new MapTile(new SimpleVector2(x++, y), SharmMap.TILE_BUSH));
        this.map.addCell(new MapTile(new SimpleVector2(x++, y), SharmMap.TILE_MOUNTAIN));
        this.map.addCell(new MapTile(new SimpleVector2(x++, y), SharmMap.TILE_LAVA_1));
        this.map.addCell(new MapTile(new SimpleVector2(x++, y), SharmMap.TILE_MOUNTAIN));
        // mfgggwwwwwwwwgggbbb
        x = 0, y++;
        this.map.addCell(new MapTile(new SimpleVector2(x++, y), SharmMap.TILE_MOUNTAIN));
        this.map.addCell(new MapTile(new SimpleVector2(x++, y), SharmMap.TILE_FOREST));
        for (var l = x + 3; x < l; x++) { // 3 grass
            this.map.addCell(new MapTile(new SimpleVector2(x, y), SharmMap.TILE_GRASS_LT_VEG));
        }
        for (var l = x + 8; x < l; x++) { // 8 water
            this.map.addCell(new MapTile(new SimpleVector2(x, y), SharmMap.TILE_WATER_1));
        }
        for (var l = x + 3; x < l; x++) { // 3 grass
            this.map.addCell(new MapTile(new SimpleVector2(x, y), SharmMap.TILE_GRASS_LT_VEG));
        }
        for (var l = x + 3; x < l; x++) { // 3 bush
            this.map.addCell(new MapTile(new SimpleVector2(x, y), SharmMap.TILE_BUSH));
        }
        // mfgggwwwwwwwwgggbbm
        x = 0, y++;
        this.map.addCell(new MapTile(new SimpleVector2(x++, y), SharmMap.TILE_MOUNTAIN));
        this.map.addCell(new MapTile(new SimpleVector2(x++, y), SharmMap.TILE_FOREST));
        for (var l = x + 3; x < l; x++) { // 3 grass
            this.map.addCell(new MapTile(new SimpleVector2(x, y), SharmMap.TILE_GRASS_LT_VEG));
        }
        for (var l = x + 9; x < l; x++) { // 9 water
            this.map.addCell(new MapTile(new SimpleVector2(x, y), SharmMap.TILE_WATER_1));
        }
        for (var l = x + 2; x < l; x++) { // 2 grass
            this.map.addCell(new MapTile(new SimpleVector2(x, y), SharmMap.TILE_GRASS_LT_VEG));
        }
        for (var l = x + 2; x < l; x++) { // 2 bush
            this.map.addCell(new MapTile(new SimpleVector2(x, y), SharmMap.TILE_BUSH));
        }
        this.map.addCell(new MapTile(new SimpleVector2(x++, y), SharmMap.TILE_MOUNTAIN));
        // mmfggCwwggwwwwgbbmm
        x = 0, y++;
        for (var l = x + 2; x < l; x++) { // 2 mountain
            this.map.addCell(new MapTile(new SimpleVector2(x, y), SharmMap.TILE_MOUNTAIN));
        }
        this.map.addCell(new MapTile(new SimpleVector2(x++, y), SharmMap.TILE_FOREST));
        for (var l = x + 2; x < l; x++) { // 2 grass
            this.map.addCell(new MapTile(new SimpleVector2(x, y), SharmMap.TILE_GRASS_LT_VEG));
        }
        this.map.addCell(new MapTile(new SimpleVector2(x++, y), SharmMap.TILE_CASTLE));
        for (var l = x + 2; x < l; x++) { // 2 water
            this.map.addCell(new MapTile(new SimpleVector2(x, y), SharmMap.TILE_WATER_1));
        }
        for (var l = x + 2; x < l; x++) { // 2 grass
            this.map.addCell(new MapTile(new SimpleVector2(x, y), SharmMap.TILE_GRASS_LT_VEG));
        }
        for (var l = x + 4; x < l; x++) { // 4 water
            this.map.addCell(new MapTile(new SimpleVector2(x, y), SharmMap.TILE_WATER_1));
        }
        this.map.addCell(new MapTile(new SimpleVector2(x++, y), SharmMap.TILE_GRASS_LT_VEG));
        for (var l = x + 2; x < l; x++) { // 2 bush
            this.map.addCell(new MapTile(new SimpleVector2(x, y), SharmMap.TILE_BUSH));
        }
        for (var l = x + 2; x < l; x++) { // 2 mountain
            this.map.addCell(new MapTile(new SimpleVector2(x, y), SharmMap.TILE_MOUNTAIN));
        }
        // mmmfgggggggwwgbbmmm
        x = 0, y++;
        for (var l = x + 3; x < l; x++) { // 3 mountain
            this.map.addCell(new MapTile(new SimpleVector2(x, y), SharmMap.TILE_MOUNTAIN));
        }
        this.map.addCell(new MapTile(new SimpleVector2(x++, y), SharmMap.TILE_FOREST));
        for (var l = x + 7; x < l; x++) { // 7 grass
            this.map.addCell(new MapTile(new SimpleVector2(x, y), SharmMap.TILE_GRASS_LT_VEG));
        }
        for (var l = x + 2; x < l; x++) { // 2 water
            this.map.addCell(new MapTile(new SimpleVector2(x, y), SharmMap.TILE_WATER_1));
        }
        this.map.addCell(new MapTile(new SimpleVector2(x++, y), SharmMap.TILE_GRASS_LT_VEG));
        for (var l = x + 2; x < l; x++) { // 2 bush
            this.map.addCell(new MapTile(new SimpleVector2(x, y), SharmMap.TILE_BUSH));
        }
        for (var l = x + 3; x < l; x++) { // 3 mountain
            this.map.addCell(new MapTile(new SimpleVector2(x, y), SharmMap.TILE_MOUNTAIN));
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
        console.log(this.camera.gridW)
        console.log(this.tilesize)
        console.log(this.scale)
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
    Renderer.prototype.getMapHeight = function() {
    	return this.map.getHeight();
    }
    Renderer.prototype.getMapWidth = function() {
    	return this.map.getWidth();
    }
    Renderer.prototype.renderFrameDesktop = function() {
    	// clear the screen and push onto the drawing stack
        this.clearScreen(this.context);
        this.context.save();
        // fill the screen with green
        this.background.fillStyle = "green";
        this.background.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // iterate through the map drawing tiles
        var cells = this.map.getCells();
        for (var i = cells.length - 1; i >= 0; i--) {
        	var cell = cells[i];
        	if (this.camera.isVisible(cell)) {
        		var cx = cell.getPosition().getX() * cell.getSize() - this.camera.getX();
        		var cy = cell.getPosition().getY() * cell.getSize() - this.camera.getY();
        		cy = this.canvas.height - cell.getSize() - cy;
        		cell.render(this.background, cx, cy);
        	}
        }
        //Tile.sort(this.sampleTiles);
        //this.sampleTiles[0].render(this.background, 0, 0);
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