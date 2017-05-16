/**
 * Simple Vector class, module with no dependencies.
 * @author DaLoneDrow
 */
define(["com/dalonedrow/utils/hashcode"], function(Hashcode) {
    var Sprite = function() {
		Hashcode.call(this);
		/** the backing image. */
		this.img = new Image();
		/** the top corner of the image rendered from the source spritesheet. */
		this.top = 0;
		/** the left corner of the image rendered from the source spritesheet. */
		this.left = 0;
		/** the sprite's width. */
		this.width = 0;
		/** the sprite's width. */
		this.height = 0;
		/** the sprite's reference id. */
		this.refId = -1;
    }
    Sprite.prototype = Object.create(Hashcode.prototype);
    Sprite.prototype.setImage = function(src, top, left, width, height) {
		this.img.src = src;
		var self = this;
    	this.img.onload = function() {
    	};
    	this.top = top;
    	this.left = left;
    	this.width = width;
    	this.height = height;
    }
    Sprite.prototype.getRefId = function() {
		return this.refId;
    }
	/**
	 * Sets the <code>SimpleVector2</code> position.
	 * @param x1 the new position along the x-axis
	 * @param y1 the new position along the y-axis
	 */
    Sprite.prototype.render = function(ctx, dx, dy) {
		try {
    		this.checkInstanceOf(ctx, CanvasRenderingContext2D);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Sprite.render() - ctx ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		try {
    		this.checkInteger(dx);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Sprite.render() - dx ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		try {
    		this.checkInteger(dy);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Sprite.render() - dy ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	var sx = this.imageMap[tile.getValue()].x, sy = this.imageMap[tile.getValue()].y;
    	// to improve performance, do not scale images
    	// instead use pre-loaded scaled images
    	ctx.drawImage(this.img, left, top, width, height, dx, dy, width, height);
	};
	return Sprite;
});
