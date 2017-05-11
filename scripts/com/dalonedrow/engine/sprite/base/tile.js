/**
 * Simple Tile class, module with no dependencies.
 * @author DaLoneDrow
 */
define(["require", "com/dalonedrow/utils/hashcode"],
		function(require, Hashcode) {
    var Tile = function(tilesheet, value) {
		Hashcode.call(this);
		try {
	    	var Tilesheet = require("com/dalonedrow/engine/sprite/base/tilesheet");
    		this.checkInstanceOf(tilesheet, Tilesheet);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Tile() - tilesheet ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		try {
    		this.checkInteger(value);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Tile() - value ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		/** the backing image. */
		this.tilesheet = tilesheet;
		this.value = value;
    }
    Tile.prototype = Object.create(Hashcode.prototype);
	/**
	 * Gets the {@link Tile}'s {@link Tilesheet}.
	 * @return {@link Tilesheet
	 */
    Tile.prototype.getTilesheet = function() {
    	return this.tilesheet;
    }
	/**
	 * Gets the {@link Tile}'s value.
	 * @return int
	 */
    Tile.prototype.getValue = function() {
    	return this.value;
    }
	/**
	 * Gets the {@link Tile}'s value.
	 * @return int
	 */
    Tile.prototype.render = function(ctx, dx, dy) {
		try {
    		this.checkInstanceOf(ctx, CanvasRenderingContext2D);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Tile.render() - ctx ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		try {
    		this.checkInteger(dx);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Tile.render() - dx ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		try {
    		this.checkInteger(dy);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Tile.render() - dy ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	this.tilesheet.renderTile(ctx, this, dx, dy);
    }
	/**
	 * Sorts an array of {@link Tile}s.
	 * @param arr the array being sorted
	 */
    Tile.sort = function(arr) {
    	if (arr === undefined) {
            throw new Error("ERROR! Tile.sort() - arr is undefined");
    	}
    	if (arr === null) {
            throw new Error("ERROR! Tile.sort() - arr is null");
    	}
    	if (!Array.isArray(arr)) {
            throw new Error("ERROR! Tile.sort() - arr is not an Array");
    	}
	    for (var i = arr.length - 1; i >= 0; i--) {
	    	if (arr[i] === undefined) {
	            throw new Error("ERROR! Tile.sort() - array element is undefined");
	    	}
	    	if (arr[i] === null) {
	            throw new Error("ERROR! Tile.sort() - array element is null");
	    	}
			if (!(arr[i] instanceof Tile)) {
	            throw new Error("ERROR! Tile.sort() - array element is not a Tile");
			}
	    }
	    arr = arr.sort(function(a, b) {
	    	var compare = 0;
	    	if (a.getTilesheet().src < b.getTilesheet().src) {
	    		compare = -1;
	    	} else if (a.getTilesheet().src > b.getTilesheet().src) {
	    		compare = 1;
	    	}
	    	return compare;
	    });
	};
	return Tile;
});
