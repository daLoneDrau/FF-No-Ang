/**
 * Simple Tile class, module with no dependencies.
 * @author DaLoneDrow
 */
define(["com/dalonedrow/engine/sprite/animation/animationframe",
	"com/dalonedrow/engine/sprite/animation/animationprocess",
	"com/dalonedrow/engine/sprite/animation/animationsequence",
	"com/dalonedrow/engine/sprite/base/map",	
	"com/dalonedrow/engine/sprite/base/maptile",
	"com/dalonedrow/engine/sprite/base/sprite",
	"com/dalonedrow/engine/systems/base/sprites"],
		function(AnimationFrame, AnimationProcess, AnimationSequence, Map, MapTile, Sprite, Sprites) {
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
	    		6: { "x": 96, "y": 0, "animated": true },		// water frame 1
	    		7: { "x": 112, "y": 0, "animated": true },		// water frame 2
	    		8: { "x": 0, "y": 16, "animated": false },		// city
	    		9: { "x": 16, "y": 16, "animated": false },		// castle
	    		10: { "x": 32, "y": 16, "animated": false },
	    		11: { "x": 48, "y": 16, "animated": false },
	    		12: { "x": 64, "y": 16, "animated": false },
	    		13: { "x": 80, "y": 16, "animated": false },
	    		14: { "x": 96, "y": 16, "animated": false },
	    		15: { "x": 112, "y": 16, "animated": false }
	    };
    	for (var i in this.imageMap) {
    		var sprite = new Sprite();
    		sprite.setImage(this.srcFile,
    				this.imageMap[i].y,
    				this.imageMap[i].x,
    				this.size,
    				this.size);
    		Sprites.getInstance().addSprite(sprite);
    		this.imageMap[i].imgRef = sprite.getRefId();
    	}
    	if (SharmMap.WATER_ANIMATION === null) {
    		SharmMap.WATER_ANIMATION = new AnimationProcess();
			var flowingWater = new AnimationSequence(AnimationSequence.getNextId());
			flowingWater.addFrame(new AnimationFrame(AnimationFrame.getNextId(),
					500,
					0,
					this.imageMap[SharmMap.TILE_WATER_1].imgRef,
					"water_1"));
			flowingWater.addFrame(new AnimationFrame(AnimationFrame.getNextId(),
					500,
					1,
					this.imageMap[SharmMap.TILE_WATER_2].imgRef,
					"water_2"));
			flowingWater.setAnimationTime(1000); // play for 1000ms
    		SharmMap.WATER_ANIMATION.sequence = flowingWater;
    	}
    }
    SharmMap.prototype = Object.create(Map.prototype);
    SharmMap.prototype.setTileSprite = function(cell) {
		try {
    		this.checkInstanceOf(cell, MapTile);
    	} catch (err) {
            var s = [];
            s.push("ERROR! SharmMap.addCell() - cell ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		cell.setIsAnimated(this.imageMap[cell.getType()].animated);
		cell.setImage(Sprites.getInstance().getSprite(this.imageMap[cell.getType()].imgRef));
		if (cell.isAnimated()) {
			switch (cell.getType()) {
			case SharmMap.TILE_WATER_1:
			case SharmMap.TILE_WATER_2:
				cell.animation = SharmMap.WATER_ANIMATION;
				break;
			}
		}
    };
    SharmMap.TILE_GRASS_NO_VEG = 0;
    SharmMap.TILE_GRASS_LT_VEG = 1;
    SharmMap.TILE_GRASS_HV_VEG = 2;
    SharmMap.TILE_BUSH = 3;
    SharmMap.TILE_FOREST = 4;
    SharmMap.TILE_MOUNTAIN = 5;
    SharmMap.TILE_WATER_1 = 6;
    SharmMap.TILE_WATER_2 = 7;
    SharmMap.TILE_CITY = 8;
    SharmMap.TILE_CASTLE = 9;
    SharmMap.WATER_ANIMATION = null;
	return SharmMap;
});
