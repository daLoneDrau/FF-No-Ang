/**
 * Simple Tile class, module with no dependencies.
 * @author DaLoneDrow
 */
define(["com/dalonedrow/engine/sprite/base/simplevector2",
	"com/dalonedrow/engine/sprite/animation/animationprocess",
	"com/dalonedrow/engine/sprite/base/sprite",
	"com/dalonedrow/utils/hashcode"],
		function(SimpleVector2, AnimationProcess, Sprite, Hashcode) {
    var MapTile = function(position, sprite) {
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
    		this.checkInstanceOf(sprite, Sprite);
    	} catch (err) {
            var s = [];
            s.push("ERROR! MapTile() - sprite ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		this.position = position;
		this.image = sprite;
		this.animated = false;
		this.type = -1;
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
	 * Gets the {@link MapTile}'s position.
	 * @return {@link SimpleVector2}
	 */
    MapTile.prototype.getPosition = function() {
    	return this.position;
    }
    MapTile.prototype.getType = function() {
    	return this.type;
    }
	/**
	 * Sets the <code>SimpleVector2</code> position.
	 * @param x1 the new position along the x-axis
	 * @param y1 the new position along the y-axis
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
    	this.tile = val;
    }
	return MapTile;
});
