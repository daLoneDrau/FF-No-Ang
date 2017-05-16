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
	 * Gets the {@link MapTile}'s position.
	 * @return {@link SimpleVector2}
	 */
    Map.prototype.addCell = function(cell) {
		try {
    		this.checkInstanceOf(ctx, MapTile);
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
    		this.setTileSprite(cell);
    		this.cells.push(cell);    		
    	}
    };
	/**
	 * Gets the {@link MapTile}'s position.
	 * @param val a {@link SimpleVector2}
	 */
    Map.prototype.getVisibleCells = function(x, y) {
    	try {
    		this.checkInteger(x);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Map.getVisibleCells() - x ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkInteger(y);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Map.getVisibleCells() - x ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	var visible = [];
    }
	return Map;
});
