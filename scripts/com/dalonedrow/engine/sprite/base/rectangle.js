/**
 * Simple Sprite class, module with no dependencies.
 * @author DaLoneDrow
 */
define(["com/dalonedrow/engine/sprite/base/simplevector2", "com/dalonedrow/utils/hashcode"],
		function(SimpleVector2, Hashcode) {
    var Rectangle = function() {
		Hashcode.call(this);
		this.x = 0;
		this.y = 0;
		this.width = 0;
		this.height = 0;
    };
    Rectangle.prototype = Object.create(Hashcode.prototype);
    Rectangle.prototype.getHeight = function() {
    	return this.height;
    };
    Rectangle.prototype.getWidth = function() {
    	return this.width;
    };
    Rectangle.prototype.getX = function() {
    	return this.x;
    };
    Rectangle.prototype.getY = function() {
    	return this.y;
    };
    Rectangle.prototype.intersectsLine = function() {
    	var x1, y1, x2, y2;
    	if (arguments.length === 4) {
    		for (var i = arguments.length - 1; i >= 0; i--) {
	    		try {
	        		this.checkInteger(arguments[i]);
	        	} catch (err) {
	                var s = [];
	                s.push("ERROR! Rectangle.intersectsLine() - arguments[" + i + "] ");
	                s.push(err.message);
	                throw new Error(s.join(""));
	        	}
	    	}
    		x1 = arguments[0];
    		y1 = arguments[1];
    		x2 = arguments[2];
    		y2 = arguments[3];
    	}
    	var intersects = false;
    	if (this.w > 0 && this.height > 0) {
    		if (x1 >= this.x && x1 <= this.x + this.width && y1 >= this.y && y1 <= this.y + this.height) {
    			intersects = true;
    		}
    		if (!intersects) {
    			if (x2 >= this.x && x2 <= this.x + this.width && y2 >= this.y && y2 <= this.y + this.height) {
        			intersects = true;    				
    			}
    		}
    		if (!intersects) {
    			var x3 = this.x + this.width;
    			var y3 = this.y + this.height;
    			
    		}
    	}
		return intersects;
    };
    Rectangle.prototype.intersects = function() {
    	var x1, y1, w1, h1;
    	if (arguments.length === 4) {
    		for (var i = arguments.length - 1; i >= 0; i--) {
	    		try {
	        		this.checkInteger(arguments[i]);
	        	} catch (err) {
	                var s = [];
	                s.push("ERROR! Rectangle.intersects() - arguments[" + i + "] ");
	                s.push(err.message);
	                throw new Error(s.join(""));
	        	}
	    	}
    		x1 = arguments[0];
    		y1 = arguments[1];
    		w1 = arguments[2];
    		h1 = arguments[3];
    	} else if (arguments.length === 1) {
    		try {
        		this.checkInstanceOf(arguments[0], Rectangle);
        		x1 = arguments[0].getX();
        		y1 = arguments[0].getY();
        		w1 = arguments[0].getWidth();
        		h1 = arguments[0].getHeight();
        	} catch (err) {
                var s = [];
                s.push("ERROR! Rectangle.intersects() - arguments[0] ");
                s.push(err.message);
                throw new Error(s.join(""));
        	}
    	}
    	return w1 > 0 && h1 > 0 && this.width > 0 && this.height > 0 && x1 >= this.x
    	&& x1 + w1 <= this.x + this.width && y1 >= this.y && y1 + h1 <= this.y + this.height;
    };
    /**
     * Gets the {@link Sprite}'s reference id.
     * @return int
     */
    Rectangle.prototype.contains = function() {
    	var contains = false;
    	if (arguments.length === 2) {
    		for (var i = arguments.length - 1; i >= 0; i--) {
	    		try {
	        		this.checkInteger(arguments[i]);
	        	} catch (err) {
	                var s = [];
	                s.push("ERROR! Rectangle.contains() - arguments[" + i + "] ");
	                s.push(err.message);
	                throw new Error(s.join(""));
	        	}
	    	}
    		var x1 = arguments[0];
    		var y1 = arguments[1];
        	contains = this.width > 0 && this.height > 0 && x1 >= this.x && x1 < this.x + this.width
        	&& y1 >= this.y && y1 < this.y + this.height;
    	} else if (arguments.length === 1) {
    		try {
        		this.checkInstanceOf(arguments[0], SimpleVector2);
        		var x1 = arguments[0].getX();
        		var y1 = arguments[0].getY();
            	contains = this.width > 0 && this.height > 0 && x1 >= this.x && x1 < this.x + this.width
            	&& y1 >= this.y && y1 < this.y + this.height;
        	} catch (err) {
        		try {
            		this.checkInstanceOf(arguments[0], Rectangle);
            		var x1 = arguments[0].getX();
            		var y1 = arguments[0].getY();
            		var w = arguments[0].getWidth();
            		var h = arguments[0].getHeight();
                	contains = w > 0 && h > 0 && this.width > 0 && this.height > 0 
                	&& x1 >= this.x && x1 + w <= this.x + this.width
                	&& y1 >= this.y && y1 + h <= this.y + this.height;
            	} catch (err) {
                    var s = [];
                    s.push("ERROR! Rectangle.contains() - arguments[0] is not a SimpleVector2 or a Rectangle - ");
	                s.push(err.message);
                    throw new Error(s.join(""));
            	}
        	}
    	}
    	return contains;
    }
	return Rectangle;
});
