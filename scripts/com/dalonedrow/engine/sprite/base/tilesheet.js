/**
 * Simple Tilesheet class, module with no dependencies.
 * @author DaLoneDrow
 */
define(["require", "com/dalonedrow/utils/hashcode"], function(require, Hashcode) {
    var Tilesheet = function(src) {
		Hashcode.call(this);
		try {
    		this.checkString(src);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Tilesheet() - src ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		/** the backing image. */
		this.img = new Image();
		this.img.src = src;
		var self = this;
    	this.img.onload = function() {
    	};
    }
    Tilesheet.prototype = Object.create(Hashcode.prototype);
    Tilesheet.scale = 2;
    Tilesheet.size = 16;
    /** DawnBringer Tileset - ff_floor.png. */
    Tilesheet.imageMap = {
    		0: { "x": 16, "y": 16 },
    		1: { "x": 16, "y": 0 },
    		2: { "x": 32, "y": 16 },
    		3: { "x": 32, "y": 0 },
    		4: { "x": 16, "y": 32 },
    		5: { "x": 80, "y": 16 },
    		6: { "x": 32, "y": 32 },
    		7: { "x": 96, "y": 16 },
    		8: { "x": 0, "y": 16 },
    		9: { "x": 0, "y": 0 },
    		10: { "x": 48, "y": 16 },
    		11: { "x": 48, "y": 0 },
    		12: { "x": 0, "y": 32 },
    		13: { "x": 64, "y": 16 },
    		14: { "x": 48, "y": 32 },
    		15: { "x": 80, "y": 0 }
    };
	/**
	 * Sets the <code>SimpleVector2</code> position.
	 * @param x1 the new position along the x-axis
	 * @param y1 the new position along the y-axis
	 */
    Tilesheet.prototype.renderTile = function(ctx, tile, dx, dy) {
		try {
    		this.checkInstanceOf(ctx, CanvasRenderingContext2D);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Tilesheet.renderTile() - ctx ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	var Tile = require("com/dalonedrow/engine/sprite/base/tile");
		try {
    		this.checkInstanceOf(tile, Tile);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Tilesheet.renderTile() - tile ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		try {
    		this.checkInteger(dx);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Tilesheet.renderTile() - dx ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		try {
    		this.checkInteger(dy);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Tilesheet.renderTile() - dy ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	var sx = Tilesheet.imageMap[tile.getValue()].x, sy = Tilesheet.imageMap[tile.getValue()].y;
    	ctx.drawImage(this.img, sx, sy, Tilesheet.size, Tilesheet.size,
    			dx, dy, Tilesheet.size * Tilesheet.scale, Tilesheet.size * Tilesheet.scale);
	};
	return Tilesheet;
});
