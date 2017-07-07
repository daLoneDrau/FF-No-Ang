define(["camera", "timer",
	"com/dalonedrow/engine/sprite/base/map",	
	"com/dalonedrow/engine/sprite/base/maptile",
	"com/dalonedrow/engine/sprite/base/simplevector2",
	"com/dalonedrow/engine/sprite/base/tile",
	"com/dalonedrow/engine/sprite/base/tilesheet",
	"com/dalonedrow/module/ff/constants/ffgamestates",
	"com/dalonedrow/module/ff/constants/ffmaptiles",
	"com/dalonedrow/module/ff/sprite/sharmmap",
	"com/dalonedrow/module/ff/systems/webserviceclient"],
	function(Camera, Timer, Map, MapTile, SimpleVector2, Tile, Tilesheet, FFGameStates,
			FFMapTiles, SharmMap, WebServiceClient) {
	var Renderer = function(game, canvas, background, foreground) {
        this.game = game;
        this.elevation2 = null;
        this.elevation1 = null;
        this.foreground = null;
        if (canvas && canvas.getContext) {
        	this.elevation2 = canvas.getContext("2d");
        }
        if (background && background.getContext) {
        	this.elevation1 = background.getContext("2d");
        }
        if (foreground && foreground.getContext) {
        	this.foreground = foreground.getContext("2d");
        }
        this.canvas = canvas;
        this.backcanvas = background;
        this.forecanvas = foreground;

        this.initFPS();
        this.tilesize = 16;
    
        this.upscaledRendering = this.elevation2.mozImageSmoothingEnabled !== undefined;
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
        this.initMap();
        // exodus map
        // mmmfgggggggwwgbbmmm
        // mmfggCwwggwwwwgbbmm
        // mfgggwwwwwwwwgggbbm
        // mfgggwwwwwwwwgggbbb
        // fffggcwwwwwwgggbmlm
        // mmmfgggwwwwgggbmmmm
        /** introduction text. */
        this.introPages = this.loadIntroText();
        this.introScreen = 0;
        this.introRendered = false;
        this.txtPages = this.introPages.length;
        this.afterText = null;
	};
	Renderer.prototype.initMap = function() {
    	if (FFMapTiles.values.length === 0) {
    		WebServiceClient.getInstance().loadMapTiles();
    	}
        this.map = WebServiceClient.getInstance().loadMap("Warlock of Firetop Mountain",
        		this.scale,
        		"com/dalonedrow/module/ff/sprite/sharmmap");
        this.map.sort(Map.sort);		
	};
    Renderer.prototype.loadIntroText = function() {
    	var paragraphs = WebServiceClient.getInstance().loadText("START");
    	var pages = [];
    	paragraphs = paragraphs.split("\r\n");
    	var divWidth = $("#introScroll").width();
    	var sh = parseInt(.85 * $("#canvas").height());
    	var spaceDim = this.textDimensions("&nbsp;");
    	var LINE_MAX = parseInt(sh / spaceDim[1]);
    	for (var i = 0, numParas = paragraphs.length; i < numParas; i++) {
    		var page = [], tokens = paragraphs[i].split(" ");
    		var line = [], lineWidth = 0;
    		for (var j = 0, ltkn = tokens.length; j < ltkn; j++) {
    			var word = tokens[j], wordWidth = this.textDimensions(word)[0];
    			if (word.length === 0) {
    				continue;
    			}
    			if (lineWidth + wordWidth < divWidth) {
    				// word fits on line
    				line.push(word);
    				lineWidth += wordWidth;
    				// peek ahead - will next word also fit?
    				if (j + 1 < ltkn) {
	    				var nextWidth = this.textDimensions(tokens[j + 1])[0] + spaceDim[0];
	        			if (lineWidth + nextWidth < divWidth) {
	        				//next word will fit - add a space
	        				line.push(" ");
	        				lineWidth += spaceDim[0];
	        			} else {
	        				// next word will not fit - push line to page and start new line
	        				if (this.textDimensions(page.join("<br>"))[1] + spaceDim[1] < sh) {
	        					// page will still fit on screen with line - add it
			    				page.push(line.join(""));
	        				} else {
	        					// page will still NOT fit on screen with line -  new page
	        					pages.push(page);
	        					page = [line.join("")];
	        				}
		    				line = [], lineWidth = 0;
	        			}
	    			} else {
	    				// no more words in paragraph - push line to page and start new line
        				if (this.textDimensions(page.join("<br>"))[1] + spaceDim[1] < sh) {
        					// page will still fit on screen with line - add it
		    				page.push(line.join(""));
        				} else {
        					// page will still NOT fit on screen with line -  new page
        					pages.push(page);
        					page = [line.join("")];
        				}
	    				line = [], lineWidth = 0;
	    			}
    			} else {
    				// word does not fit - push line to page and start new line
        			console.log(line);
    				if (this.textDimensions(page.join("<br>"))[1] + spaceDim[1] < sh) {
    					// page will still fit on screen with line - add it
	    				page.push(line.join(""));
    				} else {
    					// page will still NOT fit on screen with line -  new page
    					pages.push(page);
    					page = [line.join("")];
    				}
    				line = [word], lineWidth = wordWidth;
    				// peek ahead - will next word also fit?
    				if (j + 1 < ltkn) {
	    				var nextWidth = this.textDimensions(tokens[j + 1])[0] + spaceDim[0];
	        			if (lineWidth + nextWidth < divWidth) {
	        				//next word will fit - add a space
	        				line.push(" ");
	        				lineWidth += spaceDim[0];
	        			} else {
	        				// next word will not fit - push line to page and start new line
	        				if (this.textDimensions(page.join("<br>"))[1] + spaceDim[1] < sh) {
	        					// page will still fit on screen with line - add it
			    				page.push(line.join(""));
	        				} else {
	        					// page will still NOT fit on screen with line -  new page
	        					pages.push(page);
	        					page = [line.join("")];
	        				}
		    				line = [], lineWidth = 0;
	        			}
	    			} else {
	    				// no more words in paragraph - push line to page and start new line
        				if (this.textDimensions(page.join("<br>"))[1] + spaceDim[1] < sh) {
        					// page will still fit on screen with line - add it
		    				page.push(line.join(""));
        				} else {
        					// page will still NOT fit on screen with line -  new page
        					pages.push(page);
        					page = [line.join("")];
        				}
	    				line = [], lineWidth = 0;
	    			}
    			}
    		}
			if (line.join("").length > 0) {
    			// put the last text on a page
				if (this.textDimensions(page.join("<br>"))[1] + spaceDim[1] < sh) {
					// page will still fit on screen with line - add it
    				page.push(line.join(""));
				} else {
					// page will still NOT fit on screen with line -  new page
					pages.push(page);
					page = [line.join("")];
				}
			}
			// push paragraph to page
			pages.push(page);
    	}
    	// combine pages
    	for (var i = 0; i < pages.length; i++) {
    		if (i + 1 === pages.length) {
    			continue;
    		}
    		var lena = pages[i].length, lenb = pages[i + 1].length;
    		if (i + 2 < pages.length) {
    			var lenc = pages[i + 2].length;
        		if (lena + lenb < LINE_MAX
        				&& lena + lenb > lenb + lenc) {
        			pages[i] = pages[i].concat(pages[i + 1]);
        			pages.splice(i + 1, 1);
        			i--;
        			continue;
        		} else if (lenb + lenc < LINE_MAX
        				&& lenb + lenc > lena + lenb) {
        			pages[i + 1] = pages[i + 1].concat(pages[i + 2]);
        			pages.splice(i + 2, 1);
        			i--;
        			continue;
        		}
    		}
    	}
    	for (var i = pages.length - 1; i >= 0; i--) {
    		if (pages[i].length < LINE_MAX) {
    			for (var j = LINE_MAX - pages[i].length; j >= 0; j--) {
    				pages[i].push("&nbsp;");
    			}
    		}
    		pages[i] = pages[i].join("<br>");
    	}
    	return pages;
    }
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
    };
    /**
     * Initializes the Frame Per Second.  Always 50.
     */
	Renderer.prototype.initFPS = function() {
        this.FPS = this.mobile ? 50 : 50;
    };
	Renderer.prototype.nextPage = function() {
        this.introScreen++;
		if (this.introScreen >= this.txtPages) {
			this.introScreen = 0;
			this.afterText();
		}
        this.introRendered = false;
	};
    Renderer.prototype.rescale = function(factor) {
        this.scale = this.getScaleFactor();
    
        this.createCamera();
    
        this.elevation2.mozImageSmoothingEnabled = false;
        this.elevation1.mozImageSmoothingEnabled = false;
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
    /**
     * Sets the callback function after page text has been displayed.
     * @param callback
     */
	Renderer.prototype.setTextCallback = function(callback) {
		this.afterText = callback;
    };
    Renderer.prototype.showIntro = function() {
    	if (!this.introRendered) {
	    	$("#introText").html(this.introPages[this.introScreen]);
	    	this.introRendered = true;
    	}
    }
    Renderer.prototype.renderFrameDesktop = function() {
    	// clear the screen and push onto the drawing stack
        this.clearScreen(this.elevation2);
        this.elevation2.save();
        // fill the screen with black
        this.elevation1.fillStyle = "black";
        this.elevation1.fillRect(0, 0, this.canvas.width, this.canvas.height);
        switch (this.game.state) {
        case FFGameStates.SPLASH:
        	console.log("splash");
        	break;
        case FFGameStates.CHARACTER_SELECTION:
        	console.log("charsel");
        	break;
        case FFGameStates.INTRO:
        	console.log("intro");
        	this.showIntro();
        	break;
        case FFGameStates.IN_PLAY:
        	console.log("in play");
        	break;
        }
        /*
        // iterate through the map drawing tiles
        this.renderMap();
        
        var cells = this.map.getCells();
        for (var i = cells.length - 1; i >= 0; i--) {
        	var cell = cells[i];
        	if (this.camera.isVisible(cell)) {
        		var cx = cell.getPosition().getX() * cell.getSize() - this.camera.getX();
        		var cy = cell.getPosition().getY() * cell.getSize() - this.camera.getY();
        		cy = this.canvas.height - cell.getSize() - cy;
        		cell.render(this.elevation1, cx, cy);
        	}
        }
        //Tile.sort(this.sampleTiles);
        //this.sampleTiles[0].render(this.elevation1, 0, 0);
        //this.elevation1.drawImage(sampleSheet, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        //this.foreground.fillStyle = "blue";
        //this.foreground.fillRect(0, 0, this.canvas.width, this.canvas.height);
        //ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        /*
        this.setCameraView(this.elevation2);
        this.drawAnimatedTiles();
    
        if(this.game.started) {
            this.drawSelectedCell();
            this.drawTargetCell();
        }

        //this.drawOccupiedCells();
        this.drawPathingCells();
        this.drawEntities();
        this.drawCombatInfo();
        this.drawHighTiles(this.elevation2);
        this.elevation2.restore();
    
        // Overlay UI elements
        this.drawCursor();
        this.drawDebugInfo();
        */
    };
    Renderer.prototype.renderGame = function() {
    	
    }
    Renderer.prototype.renderMap = function() {
        // iterate through the map drawing tiles
        var cells = this.map[0].getCells();
        for (var i = cells.length - 1; i >= 0; i--) {
        	var cell = cells[i];
        	if (this.camera.isVisible(cell)) {
        		console.log("render cell");
        		console.log(cell);
        		var cx = cell.getPosition().getX() * cell.getSize() - this.camera.getX();
        		var cy = cell.getPosition().getY() * cell.getSize() - this.camera.getY();
        		cy = this.canvas.height - cell.getSize() - cy;
        		cell.render(this.elevation1, cx, cy, this.map[0]);
        	}
        }
        if (this.map.length > 1) {
            cells = this.map[1].getCells();
            for (var i = cells.length - 1; i >= 0; i--) {
            	var cell = cells[i];
            	if (this.camera.isVisible(cell)) {
            		var cx = cell.getPosition().getX() * cell.getSize() - this.camera.getX();
            		var cy = cell.getPosition().getY() * cell.getSize() - this.camera.getY();
            		cy = this.canvas.height - cell.getSize() - cy;
            		cell.render(this.elevation2, cx, cy, this.map[0]);
            	}
            }
        }
    };
    /**
     * Sets the game's font size on the context and background canvases.
     * @param size the font size
     */
    Renderer.prototype.setFontSize = function(size) {
        var font = [size, "px GraphicPixel"].join("");
    
        this.elevation2.font = font;
        this.elevation1.font = font;
    };
	Renderer.prototype.textDimensions = function(text) {
	    var div = document.createElement("div");
	    div.style.position = "absolute";
	    div.style.top="-999px";
	    div.style.left="-999px";
	    div.style.fontFamily = "Pixel Emulator, Press Start 2P, Courier new, monospace"
	    div.id = "width";
	    div.innerHTML = text;
	    document.body.appendChild(div);
	    var el = document.getElementById("width");
	    var w = [el.offsetWidth, el.offsetHeight];
	    el.parentNode.removeChild(el);
	    return w;
    };
	return Renderer;
});