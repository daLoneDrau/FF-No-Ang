/**
 * Simple Tile class, module with no dependencies.
 * @author DaLoneDrow
 */
define(["com/dalonedrow/engine/sprite/base/simplevector2",
	"com/dalonedrow/engine/sprite/animation/animationprocess",
	"com/dalonedrow/engine/sprite/base/sprite",
	"com/dalonedrow/utils/hashcode"],
		function(SimpleVector2, AnimationProcess, Sprite, Hashcode) {
    var MapTile = function(position, type) {
		Hashcode.call(this);
    	try {
    		this.checkInstanceOf(position, SimpleVector2);
    	} catch (err) {
            var s = [];
            s.push("ERROR! MapTile() - position ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkInteger(type);
    	} catch (err) {
            var s = [];
            s.push("ERROR! MapTile() - type ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		this.position = position;
		this.image = null;
		this.animated = false;
		this.animations = null;
		this.type = type;
    }
    MapTile.prototype = Object.create(Hashcode.prototype);
	/**
	 * Gets the {@link MapTile}'s image.
	 * @return {@link Sprite}
	 */
    MapTile.prototype.getImage = function() {
    	return this.image;
    }
	/**
	 * Gets the {@link MapTile}'s image.
	 * @return {@link Sprite}
	 */
    MapTile.prototype.setAnimation = function(anim) {
		this.animations = anim;
    }
	/**
	 * Gets the {@link MapTile}'s position.
	 * @return {@link SimpleVector2}
	 */
    MapTile.prototype.getPosition = function() {
    	return this.position;
    }
	/**
	 * Gets the {@link MapTile}'s type.
	 * @return {@link SimpleVector2}
	 */
    MapTile.prototype.getType = function() {
    	return this.type;
    }
	/**
	 * Renders the map tile.
	 * @param ctx the {@link CanvasRenderingContext2D}
	 * @param dx the X coordinate in the destination canvas at which to place the top-left corner of
	 * the source image
	 * @param dy the Y coordinate in the destination canvas at which to place the top-left corner of
	 * the source image
	 */
    MapTile.prototype.render = function(ctx, dx, dy) {
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
    	if (this.animated) {
    		console.log("animated");
    	} else { // render static image
    		this.image.render(ctx, dx, dy);
    	}
	};
	/**
	 * Gets the {@link MapTile}'s position.
	 * @param val a {@link SimpleVector2}
	 */
    MapTile.prototype.setIsAnimated = function(val) {
    	try {
    		this.checkBoolean(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! MapTile.setIsAnimated() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	this.animated = val;
    }
	/**
	 * Gets the {@link MapTile}'s position.
	 * @param val a {@link SimpleVector2}
	 */
    MapTile.prototype.setPosition = function(val) {
    	try {
    		this.checkInstanceOf(val, SimpleVector2);
    	} catch (err) {
            var s = [];
            s.push("ERROR! MapTile.setPosition() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	this.position = val;
    }
	/**
	 * Sets the {@link MapTile}'s image.
	 * @param val a {@link Sprite}
	 */
    MapTile.prototype.setImage = function(val) {
    	try {
    		this.checkInstanceOf(val, Sprite);
    	} catch (err) {
            var s = [];
            s.push("ERROR! MapTile.setImage() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	this.image = val;
    }
	/**
	 * Sets the {@link MapTile}'s image.
	 * @param val an integer value
	 */
    MapTile.prototype.setType = function(val) {
    	try {
    		this.checkInteger(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! MapTile.setType() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	this.type = val;
    }
	return MapTile;
});
