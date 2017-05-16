/**
 * Simple Tile class, module with no dependencies.
 * @author DaLoneDrow
 */
define(["com/dalonedrow/engine/sprite/base/map",
	"com/dalonedrow/engine/sprite/base/sprite",
	"com/dalonedrow/engine/systems/base/sprites"],
		function(Map, Sprite, Sprites) {
    var SharmMap = function() {
    	Map.call(this);
    	this.srcFile = 'img/sharm_tiny.png';
    	this.size = 16;
        /** Sharm's  Tileset - ff_floor.png. */
    	this.imageMap = {
	    		0: { "x": 0, "y": 0, "animated": false }, 		// grass no vegetation
	    		1: { "x": 16, "y": 0, "animated": false },		// grass light vegetation
	    		2: { "x": 32, "y": 0, "animated": false },		// grass heavy vegetation
	    		3: { "x": 48, "y": 0, "animated": false },		// bush
	    		4: { "x": 64, "y": 0, "animated": false },		// forest
	    		5: { "x": 80, "y": 0, "animated": false },		// mountain
	    		6: { "x": 96, "y": 0, "animated": false },		// water frame 1
	    		7: { "x": 112, "y": 0, "animated": false },	// water frame 2
	    		8: { "x": 0, "y": 16, "animated": false },		// city
	    		9: { "x": 16, "y": 16, "animated": false },		// castle
	    		10: { "x": 32, "y": 16, "animated": false },
	    		11: { "x": 48, "y": 16, "animated": false },
	    		12: { "x": 64, "y": 16, "animated": false },
	    		13: { "x": 80, "y": 16, "animated": false },
	    		14: { "x": 96, "y": 16, "animated": false },
	    		15: { "x": 112, "y": 16, "animated": false }
	    };
    	for (var i = this.imageMap.length - 1; i >= 0; i--) {
    		var sprite = new Sprite();
    		sprite.setImage(this.srcFile,
    				this.imageMap[i].x,
    				this.imageMap[i].y,
    				this.size,
    				this.size);
    		Sprites.getInstance().addSprite(sprite);
    		this.imageMap[i].imgRef = sprite.getRefId();
    	}
    }
    SharmMap.prototype = Object.create(Map.prototype);
    SharmMap.prototype.setTileSprite = function(cell) {
		cell.setIsAnimated(this.imageMap[cell.getType()].animated);
		cell.setImage(Sprites.getInstance().getSprite(this.imageMap[cell.getType()].imgRef));
    }
	return Map;
});
