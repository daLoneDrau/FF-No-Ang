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
	"com/dalonedrow/engine/systems/base/sprites",
	"com/dalonedrow/rpg/base/constants/animationglobals"],
		function(AnimationFrame, AnimationProcess, AnimationSequence, Map, MapTile, Sprite, Sprites,
				AnimationGlobals) {
    var SharmMap = function(scale) {
    	Map.call(this);
		try {
    		this.checkInteger(scale);
    	} catch (err) {
            var s = [];
            s.push("ERROR! SharmMap - scale ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        this.oldAddCell = Map.prototype.addCell;
    	switch (scale) {
    	case 1:
        	this.srcFile = 'img/sharm_tiny.png';
            /** Sharm's  Tileset - ff_floor.png. */
        	this.imageMap = {
    	    		0: 	{ "x": 0,	"y": 0,		"animated": false 	}, 	// grass no vegetation
    	    		1: 	{ "x": 16,	"y": 0,		"animated": false 	},	// grass light vegetation
    	    		2: 	{ "x": 32,	"y": 0, 	"animated": false 	},	// grass heavy vegetation
    	    		3: 	{ "x": 48,	"y": 0,		"animated": false 	},	// bush
    	    		4: 	{ "x": 64,	"y": 0, 	"animated": false 	},	// tree
    	    		5: 	{ "x": 80,	"y": 0, 	"animated": false 	},	// rocks
    	    		6: 	{ "x": 96,	"y": 0, 	"animated": false 	},	// road
    	    		7: 	{ "x": 112,	"y": 0, 	"animated": true	},	// water frame 1
    	    		8: 	{ "x": 0,	"y": 16, 	"animated": false 	},	// wall 1
    	    		9: 	{ "x": 16,	"y": 16, 	"animated": false 	},	// flowers
    	    		10: { "x": 32,	"y": 16, 	"animated": false 	},	// cave floor
    	    		11: { "x": 48,	"y": 16, 	"animated": false 	},	// dungeon floor
    	    		12: { "x": 64,	"y": 16, 	"animated": false 	},
    	    		13: { "x": 80,	"y": 16, 	"animated": false 	},
    	    		14: { "x": 96,	"y": 16, 	"animated": false 	},
    	    		15: { "x": 112,	"y": 16, 	"animated": false 	},
    	    		16: { "x": 0,	"y": 32, 	"animated": false 	},	// cave wall solid
    	    		17: { "x": 16,	"y": 32, 	"animated": false 	},	// pit
    	    		18: { "x": 32,	"y": 32, 	"animated": false 	},	// 
    	    		19: { "x": 48,	"y": 32, 	"animated": false 	},	// 
    	    		20: { "x": 64,	"y": 32, 	"animated": false 	},
    	    		21: { "x": 80,	"y": 32, 	"animated": false 	},
    	    		22: { "x": 96,	"y": 32, 	"animated": false 	},
    	    		23: { "x": 112,	"y": 32, 	"animated": false 	},
    	    		24: { "x": 0,	"y": 48, 	"animated": true 	},	// water frame 2,
    	    		25: { "x": 16,	"y": 48, 	"animated": false 	},	// wall 2
    	    		26: { "x": 32,	"y": 48, 	"animated": true 	},	// lava frame 2,
    	    		27: { "x": 48,	"y": 48, 	"animated": true 	}	// lava frame 2,
    	    };
        	this.size = 16;
        	break;
    	case 2:
        	this.srcFile = 'img/sharm_med.png';
            /** Sharm's  Tileset - ff_floor.png. */
        	this.imageMap = {
    	    		0: 	{ "x": 0,	"y": 0,		"animated": false 	}, 	// grass no vegetation
    	    		1: 	{ "x": 32,	"y": 0,		"animated": false 	},	// grass light vegetation
    	    		2: 	{ "x": 64,	"y": 0, 	"animated": false 	},	// grass heavy vegetation
    	    		3: 	{ "x": 96,	"y": 0,		"animated": false 	},	// bush
    	    		4: 	{ "x": 128,	"y": 0, 	"animated": false 	},	// tree
    	    		5: 	{ "x": 160,	"y": 0, 	"animated": false 	},	// rocks
    	    		6: 	{ "x": 192,	"y": 0, 	"animated": false 	},	// road
    	    		7: 	{ "x": 224,	"y": 0, 	"animated": true	},	// water frame 1
    	    		8: 	{ "x": 0,	"y": 32, 	"animated": false 	},	// wall 1
    	    		9: 	{ "x": 32,	"y": 32, 	"animated": false 	},	// flowers
    	    		10: { "x": 64,	"y": 32, 	"animated": false 	},	// cave floor
    	    		11: { "x": 96,	"y": 32, 	"animated": false 	},	// dungeon floor
    	    		12: { "x": 128,	"y": 32, 	"animated": false 	},
    	    		13: { "x": 160,	"y": 32, 	"animated": false 	},
    	    		14: { "x": 192,	"y": 32, 	"animated": false 	},
    	    		15: { "x": 224,	"y": 32, 	"animated": false 	},
    	    		16: { "x": 0,	"y": 64, 	"animated": false 	},	// cave wall solid
    	    		17: { "x": 32,	"y": 64, 	"animated": false 	},	// pit
    	    		18: { "x": 64,	"y": 64, 	"animated": false 	},	// 
    	    		19: { "x": 96,	"y": 64, 	"animated": false 	},	// 
    	    		20: { "x": 128,	"y": 64, 	"animated": false 	},
    	    		21: { "x": 160,	"y": 64, 	"animated": false 	},
    	    		22: { "x": 192,	"y": 64, 	"animated": false 	},
    	    		23: { "x": 224,	"y": 64, 	"animated": false 	},
    	    		24: { "x": 0,	"y": 96, 	"animated": true 	},	// water frame 2,
    	    		25: { "x": 32,	"y": 96, 	"animated": false 	},	// wall 2
    	    		26: { "x": 64,	"y": 96, 	"animated": true 	},	// lava frame 2,
    	    		27: { "x": 96,	"y": 96, 	"animated": true 	}	// lava frame 2,
    	    };
        	this.size = 32;
    		break;
    	}
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
    	// define water animation
    	if (SharmMap.WATER_ANIMATION === null) {
    		SharmMap.WATER_ANIMATION = new AnimationProcess();
			var animSeq = new AnimationSequence(AnimationSequence.getNextId());
			animSeq.addFrame(new AnimationFrame(AnimationFrame.getNextId(),
					500,
					0,
					this.imageMap[SharmMap.TILE_WATER_1].imgRef,
					"water_1"));
			animSeq.addFrame(new AnimationFrame(AnimationFrame.getNextId(),
					500,
					1,
					this.imageMap[SharmMap.TILE_WATER_2].imgRef,
					"water_2"));
			animSeq.setAnimationTime(1000); // play for 1000ms
			animSeq.assignFlag(AnimationGlobals.ANIM_REPEATS_FROM_BEGINNING);
    		SharmMap.WATER_ANIMATION.sequence = animSeq;
    	}
    	// define lava animation
    	if (SharmMap.LAVA_ANIMATION === null) {
    		SharmMap.LAVA_ANIMATION = new AnimationProcess();
			var animSeq = new AnimationSequence(AnimationSequence.getNextId());
			animSeq.addFrame(new AnimationFrame(AnimationFrame.getNextId(),
					333,
					0,
					this.imageMap[SharmMap.TILE_LAVA_1].imgRef,
					"lava_1"));
			animSeq.addFrame(new AnimationFrame(AnimationFrame.getNextId(),
					334,
					1,
					this.imageMap[SharmMap.TILE_LAVA_2].imgRef,
					"lava_2"));
			animSeq.setAnimationTime(667); // play for 1000ms
			animSeq.assignFlag(AnimationGlobals.ANIM_REPEATS_FROM_BEGINNING);
    		SharmMap.LAVA_ANIMATION.sequence = animSeq;
    	}
    }
    SharmMap.prototype = Object.create(Map.prototype);
    /**
     * Adds a cell to the {@link Map}.
     * @param cell the {@link MapTile} being added
     */
    SharmMap.prototype.addCell = function(cell) {
		try {
    		this.checkInstanceOf(cell, MapTile);
    	} catch (err) {
            var s = [];
            s.push("ERROR! SharmMap.addCell() - cell ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	cell.setSize(this.size);
    	this.oldAddCell(cell);
    }
    SharmMap.prototype.checkTileImage = function(cell) {
		try {
    		this.checkInstanceOf(cell, MapTile);
    	} catch (err) {
            var s = [];
            s.push("ERROR! SharmMap.checkTileImage() - cell ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		switch (cell.getType()) {
		case SharmMap.TILE_CAVE_WALL:
			console.log("check wall" + cell.getPosition())
			break;
		}
    };
    SharmMap.prototype.setTileSprite = function(cell) {
		try {
    		this.checkInstanceOf(cell, MapTile);
    	} catch (err) {
            var s = [];
            s.push("ERROR! SharmMap.setTileSprite() - cell ");
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
			case SharmMap.TILE_LAVA_1:
			case SharmMap.TILE_LAVA_2:
				cell.animation = SharmMap.LAVA_ANIMATION;
				break;
			}
		}
    };
    SharmMap.TILE_GRASS_NO_VEG = 0;
    SharmMap.TILE_GRASS_LT_VEG = 1;
    SharmMap.TILE_GRASS_HV_VEG = 2;
    SharmMap.TILE_BUSH = 3;
    SharmMap.TILE_FOREST = 4;
    SharmMap.TILE_ROCKS = 5;
    SharmMap.TILE_ROAD = 6;
    SharmMap.TILE_WATER_1 = 7;
    SharmMap.TILE_DUNGEON_WALL = 8;
    SharmMap.TILE_FLOWERS = 9;
    SharmMap.TILE_CAVE_FLOOR = 10;
    SharmMap.TILE_DUNGEON_FLOOR = 11;
    SharmMap.TILE_CAVE_WALL = 16;
    SharmMap.TILE_WATER_2 = 24;
    SharmMap.TILE_LAVA_1 = 26;
    SharmMap.TILE_LAVA_2 = 27;
    SharmMap.WATER_ANIMATION = null;
    SharmMap.LAVA_ANIMATION = null;
	return SharmMap;
});
