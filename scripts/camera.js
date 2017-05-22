define(["com/dalonedrow/engine/sprite/base/maptile",
	"com/dalonedrow/engine/sprite/base/rectangle",
	"com/dalonedrow/utils/hashcode"],
		function(MapTile, Rectangle, Hashcode) {
	var Camera = function(renderer) {
		Hashcode.call(this);
		this.renderer = renderer;
        /** the camera's position based on the left-most pixel in view. */
        this.x = 0;
        /** the camera's position based on the bottom-most pixel in view. */
        this.y = 0;
        /** the camera's position based on the left-most map cell in view. */
        this.gridX = 0;
        /** the camera's position based on the bottom-most map cell in view. */
        this.gridY = 0;
        this.offset = 0.5;
        this.viewport = new Rectangle();
        this.rescale();
	};
	Camera.prototype = Object.create(Hashcode.prototype);
	/**
	 * Gets the left-most boundaries of the camera's viewport.
	 * @return int
	 */
	Camera.prototype.getX = function() {
    	return this.x;
    };
	/**
	 * Gets the lupper-most boundaries of the camera's viewport.
	 * @return int
	 */
    Camera.prototype.getY = function() {
    	return this.y;
    };
	/**
	 * Determines if any part of a map cell is visible by the camera.
	 * @param cell the map cell
	 * @return <tt>true</tt> if all or part of the cell is visible; <tt>false</tt> otherwise
	 */
	Camera.prototype.isVisible = function(o) {
		var vis = false;
		try {
    		this.checkInstanceOf(o, MapTile);
    		var box = this.getBoundingBox(o);
    		if (this.viewport.contains(box)
    				|| this.viewport.intersects(box)) {
    			vis = true;
    		}
    	} catch (err) {
            var s = [];
            s.push("ERROR! SharmMap.isVisible() - o ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	return vis;
	};
	Camera.prototype.getBoundingBox = function(o) {
		var r = new Rectangle();
		try {
    		this.checkInstanceOf(o, MapTile);
	   		 r.x = o.getPosition().getX();
	   		 r.x *= 16;
			 r.y = o.getPosition().getY();
	   		 r.y *= 16;
	   		 r.width = 16;
	   		 r.height = 16;
    	} catch (err) {
            var s = [];
            s.push("ERROR! SharmMap.getBoundingBox() - o ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	return r;
	}
	Camera.prototype.setPosition = function(x, y) {
        this.x = x;
        this.y = y;

        this.gridX = Math.floor(x / 16);
        this.gridY = Math.floor(y / 16);
    };
    Camera.prototype.rescale = function() {
        var factor = this.renderer.mobile ? 1 : 2;
    
        this.gridW = 15 * factor;
        this.gridH = 7 * factor;
    
        console.log("---------");
        console.log("Factor:"+factor);
        console.log("W:"+this.gridW + " H:" + this.gridH);
        this.viewport.width = this.gridW * 16
        this.viewport.height = this.gridH * 16
    };
	return Camera;
});