/**
 * 
 */
define(["com/dalonedrow/engine/sprite/base/sprite",
	"com/dalonedrow/utils/hashcode"], function(Sprite, Hashcode) {
    var instance = null;
    var Sprites = function() {
        if (instance !== null){
            throw new Error("Cannot instantiate more than one Sprite, use Sprites.getInstance()");
        }
		Hashcode.call(this);
	    /** the list of {@link Sprite}s. */
	    this.objs = [];
		this.FAST_RELEASE = false;
		this.nextId = 0;
    }
    Sprites.prototype = Object.create(Hashcode.prototype);
    /**
     * Adds a {@link Sprite} to the image library.
     * @param sprite the {@link Sprite} being added
     */
    Sprites.prototype.addSprite = function(sprite) {
    	try {
    		this.checkInstanceOf(sprite, Sprite);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Sprites.addSprite() - sprite ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	if (sprite.getRefId() >= 0) {
            var s = [];
            s.push("ERROR! Sprites.addSprite() - sprite ");
            s.push(" has an existing reference id");
            throw new Error(s.join(""));
    	}
    	sprite.setRefId(this.nextId++);
    	this.objs.push(sprite);
    }
    Sprites.prototype.getSprite = function(id) {
    	var sprite = null;
    	for (var i = this.objs.length - 1; i >= 0; i--) {
    		if (this.objs[i] !== null
    				&& this.objs[i].getRefId() === id) {
    			sprite = this.objs[i];
    		}
    	}
    	return sprite;
    }
    /**
     * Gets the singleton instance of the image library}
     * @return {@link Sprites}
     */
	Sprites.getInstance = function() {
		/*
        if (instance === null) {
        	throw new Error("No instance has been set!");
        }
        */ 
        if (instance === null) {
        	console.log("no instance of Sprites")
            instance = new Sprites();
        }
        return instance;
	}
	Sprites.setInstance = function(val) {
		if (val === undefined) {
	        throw new Error("Error!  Sprites.setInstance() - val is undefined");
		}
		if (val === null) {
	        throw new Error("Error!  Sprites.setInstance() - val is null");
		}
		if (!(val instanceof Sprites)) {
	        throw new Error("Error!  Sprites.setInstance() - val is not a Sprites subclass.")
		}
		instance = val;
	}
	return Sprites;
});
