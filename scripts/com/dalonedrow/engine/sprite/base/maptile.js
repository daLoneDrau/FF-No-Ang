/**
 * Simple Tile class, module with no dependencies.
 * @author DaLoneDrow
 */
define(["com/dalonedrow/engine/sprite/base/simplevector2",
	"com/dalonedrow/engine/sprite/base/tile",
	"com/dalonedrow/utils/hashcode"],
		function(SimpleVector2, Tile, Hashcode) {
    var MapTile = function(position, tile) {
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
    		this.checkInstanceOf(tile, Tile);
    	} catch (err) {
            var s = [];
            s.push("ERROR! MapTile() - tile ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		this.position = position;
		this.tile = tile;
    }
    MapTile.prototype = Object.create(Hashcode.prototype);
	/**
	 * Gets the {@link MapTile}'s position.
	 * @return {@link SimpleVector2}
	 */
    MapTile.prototype.getPosition = function() {
    	return this.position;
    }
	/**
	 * Gets the {@link MapTile}'s {@link Tile}.
	 * @return {@link Tile}
	 */
    MapTile.prototype.getTile = function() {
    	return this.tile;
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
	 * Sets the {@link MapTile}'s {@link Tile}.
	 * @param val a {@link Tile}
	 */
    MapTile.prototype.setTile = function(val) {
    	try {
    		this.checkInstanceOf(val, Tile);
    	} catch (err) {
            var s = [];
            s.push("ERROR! MapTile.setTile() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	this.tile = val;
    }
	return MapTile;
});
