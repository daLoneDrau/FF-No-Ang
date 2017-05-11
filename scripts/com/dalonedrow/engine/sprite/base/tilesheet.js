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
    Tilesheet.size = 32;
    Tilesheet.imageMap = {
    		0: { "x": 0, "y": 0 },
    		1: { "x": 32, "y": 192 }
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
    	ctx.drawImage(this.img, sx, sy, Tilesheet.size, Tilesheet.size, dx, dy, Tilesheet.size, Tilesheet.size);
	};
	return Tilesheet;
});
