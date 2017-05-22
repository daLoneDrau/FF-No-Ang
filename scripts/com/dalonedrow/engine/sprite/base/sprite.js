/**
 * Simple Sprite class, module with no dependencies.
 * @author DaLoneDrow
 */
define(["com/dalonedrow/utils/hashcode"], function(Hashcode) {
    var Sprite = function() {
		Hashcode.call(this);
		/** the sprite's height. */
		this.height = 0;
		/** the backing image. */
		this.img = new Image();
		/** the left corner of the image rendered from the source spritesheet. */
		this.left = 0;
		/** the sprite's reference id. */
		this.refId = -1;
		/** the top corner of the image rendered from the source spritesheet. */
		this.top = 0;
		/** the sprite's width. */
		this.width = 0;
    };
    Sprite.prototype = Object.create(Hashcode.prototype);
    /**
     * Gets the {@link Sprite}'s reference id.
     * @return int
     */
    Sprite.prototype.getRefId = function() {
		return this.refId;
    };
	/**
	 * Renders the {@link Sprite}.
	 * @param ctx the {@link CanvasRenderingContext2D}
	 * @param dx the X coordinate in the destination canvas at which to place the top-left corner of
	 * the source image
	 * @param dy the Y coordinate in the destination canvas at which to place the top-left corner of
	 * the source image
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
    	// to improve performance, do not scale images
    	// instead use pre-loaded scaled images
    	ctx.drawImage(this.img, this.left, this.top, this.width, this.height, dx, dy, this.width, this.height);
	};
	/**
	 * Sets the {@link Sprite}'s source image.
	 * @param src the full URL of the image including base URI
	 * @param top the top corner of the image rendered from the source spritesheet
	 * @param left the left corner of the image rendered from the source spritesheet
	 * @param width the sprite's width
	 * @param height the sprite's height
	 */
    Sprite.prototype.setImage = function(src, top, left, width, height) {
		try {
    		this.checkString(src);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Sprite.setImage() - src ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		try {
    		this.checkInteger(top);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Sprite.setImage() - top ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		try {
    		this.checkInteger(left);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Sprite.setImage() - left ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		try {
    		this.checkInteger(width);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Sprite.setImage() - width ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		try {
    		this.checkInteger(height);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Sprite.setImage() - height ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		this.img.src = src;
		var self = this;
    	this.img.onload = function() {
    	};
    	this.top = top;
    	this.left = left;
    	this.width = width;
    	this.height = height;
    };
    /**
     * Sets the {@link Sprite}'s reference id.
     * @param val the new value
     */
    Sprite.prototype.setRefId = function(val) {
		try {
    		this.checkInteger(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Sprite.setRefId() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		this.refId = val;
    };
	return Sprite;
});
