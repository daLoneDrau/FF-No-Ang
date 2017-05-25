/**
 * FFMapTiles
 * module with no dependencies
 */
define(["com/dalonedrow/utils/hashcode"], function(Hashcode) {
    function FFMapTiles() {
		Hashcode.call(this);
	    /** the name. */
	    this.name = "";
	    /** the value. */
	    this.value = 0;
	    if (arguments.length === 1) {
	    	this.name = arguments[0];
	    } else if (arguments.length === 2) {
	    	this.name = arguments[0];
	    	this.value = arguments[1];
	    } else {
	    	throw new Error("Invalid # of arguments");
	    }
	    FFMapTiles[this.name.toUpperCase()] = this;
	}
    FFMapTiles.prototype = Object.create(Hashcode.prototype);
    /**
     * Gets the element's code.
     * @return {@link String}
     */
    FFMapTiles.prototype.getName = function() {
        return this.name;
    }
    /**
     * Gets the element's index.
     * @return {@link int}
     */
    FFMapTiles.prototype.getValue = function() {
        return this.value;
    }
	/** the list of values. */
	FFMapTiles.values = [];
	/**
	 * Gets the number of values.
	 * @return {@link int}
	 */
	FFMapTiles.getNumberOfValues = function() {
	    return FFMapTiles.values.length;
	}
	/**
	 * Gets the {@link FFMapTiles} value of a specific element code.
	 * @param code the code
	 * @return {@link FFMapTiles}
	 */
	FFMapTiles.valueOf = function(name) {
	    var value = null;
	    for (var i = FFMapTiles.values.length - 1; i >= 0; i--) {
	        if (name.toLowerCase() === FFMapTiles.values[i].getName().toLowerCase()) {
	            value = FFMapTiles.values[i];
	            break;
	        }
	    }
	    return value;
	}
	return FFMapTiles;
});
