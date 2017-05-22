/**
 * Simple Tile class, module with no dependencies.
 * @author DaLoneDrow
 */
define(["com/dalonedrow/engine/sprite/base/maptile", "com/dalonedrow/utils/hashcode"],
		function(MapTile, Hashcode) {
    var Map = function() {
		Hashcode.call(this);
		this.cells = [];
    }
    Map.prototype = Object.create(Hashcode.prototype);
    /**
     * Adds a cell to the {@link Map}.
     * @param cell the {@link MapTile} being added
     */
    Map.prototype.addCell = function(cell) {
		try {
    		this.checkInstanceOf(cell, MapTile);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Map.addCell() - cell ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	var found = false;
    	for (var i = this.cells.length - 1; i >= 0; i--) {
    		if (this.cells[i].getPosition().equals(cell.getPosition())) {
    			found = true;
    			break;
    		}
    	}
    	if (!found) {
    		// set the cell's sprite image based on the Map implementation
    		this.setTileSprite(cell);
    		this.cells.push(cell);    		
    	} else {
            var s = [];
            s.push("ERROR! Map.addCell() - cell at position ");
            s.push(cell.getPosition().toString());
            s.push(" was already set!");
    		throw new Error(s.join(""));
    	}
    };
	/**
	 * Gets the {@link MapTile}'s position.
	 * @param val a {@link SimpleVector2}
	 */
    Map.prototype.getCells = function() {
    	return this.cells;
    }
    Map.prototype.getHeight = function() {
    	var h = 0;
    	for (var i = this.cells.length - 1; i >= 0; i--) {
    		h = Math.max(h, this.cells[i].getPosition().getY());
    	}
    	return ++h;
    }
    Map.prototype.getWidth = function() {
    	var w = 0;
    	for (var i = this.cells.length - 1; i >= 0; i--) {
    		w = Math.max(w, this.cells[i].getPosition().getX());
    	}
    	return ++w;
    }
	return Map;
});
