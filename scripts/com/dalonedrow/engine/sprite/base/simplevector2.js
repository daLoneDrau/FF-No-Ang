/**
 * Simple Vector class, module with no dependencies.
 * @author DaLoneDrow
 */
define(["com/dalonedrow/utils/hashcode"], function(Hashcode) {
    var SimpleVector2 = function() {
		Hashcode.call(this);
		/** the x-coordinate. */
		this.x;
		/** the y-coordinate. */
		this.y;
		/**
		 * Constructor.
		 */
		if (arguments.length === 0) {
			this.x = 0;
			this.y = 0;
		} else if (arguments.length === 1
				&& arguments[0] instanceof SimpleVector2) {
			this.set(arguments[0]);
		} else if (arguments.length === 2
				&& !isNaN(arguments[0])
				&& !isNaN(arguments[1])) {
			this.set(arguments[0], arguments[1]);
		} else {
			throw new Error(
			        "Invalid number of arguments, must be 1 SimpleVector2 to copy, or 2 numbers");
		}
    }
    SimpleVector2.prototype = Object.create(Hashcode.prototype);
	/**
	 * Sets the <code>SimpleVector2</code> position.
	 * @param x1 the new position along the x-axis
	 * @param y1 the new position along the y-axis
	 */
    SimpleVector2.prototype.set = function() {
		if (arguments.length === 1) {
	    	try {
	    		this.checkInstanceOf(arguments[0], SimpleVector2);
		        this.x = arguments[0].getX();
		        this.y = arguments[0].getY();
	    	} catch (err) {
		    	try {
		    		this.checkInstanceOf(arguments[0], SimpleVector3);
			        this.x = arguments[0].getX();
			        this.y = arguments[0].getY();
		    	} catch (err2) {
		            var s = [];
		            s.push("ERROR! SimpleVector2.set() - argument must be SimpleVector2 or SimpleVector3");
		            s.push(err.message);
		            throw new Error(s.join(""));
		    	}
	    	}
		} else if (arguments.length === 2) {
			try {
	    		this.checkFloat(arguments[0]);
	    		this.checkFloat(arguments[1]);
		        this.x = arguments[0];
		        this.y = arguments[1]
	    	} catch (err) {
	            var s = [];
	            s.push("ERROR! SimpleVector2.set() - arguments must be floating-point - ");
	            s.push(err.message);
	            throw new Error(s.join(""));
	    	}
		} else {
			throw new Error(
	        "Invalid number of arguments, must be 1 vector to set, or 2 numbers");
		}
	};
	/**
	 * Decrements the <code>SimpleVector2</code>.
	 * @param v the other <code>SimpleVector2</code> used to calculate the
	 *            decrement
	 */
	SimpleVector2.prototype.decrement = function(v) {
    	try {
    		this.checkInstanceOf(v, SimpleVector2);
    	} catch (err) {
            var s = [];
            s.push("ERROR! SimpleVector2.decrement() - v ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		this.x -= v.getX();
		this.y -= v.getY();
	};
	/**
	 * Calculates the distance between two <code>SimpleVector2</code>s.
	 * @param v the other <code>SimpleVector2</code> used to calculate the
	 *            distance
	 * @return double
	 */
	SimpleVector2.prototype.distance = function(v) {
    	try {
    		this.checkInstanceOf(v, SimpleVector2);
    	} catch (err) {
            var s = [];
            s.push("ERROR! SimpleVector2.distance() - v ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		return Math.sqrt((v.getX() - this.x) * (v.getX() -this.x) + (v.v.getY() - this.y) * (v.v.getY() - this.y));
	};
	/**
	 * Divides one vector by another.
	 * @param v the other <code>SimpleVector2</code> used to divide
	 */
	SimpleVector2.prototype.divide = function(v) {
    	try {
    		this.checkInstanceOf(v, SimpleVector2);
    	} catch (err) {
            var s = [];
            s.push("ERROR! SimpleVector2.divide() - v ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		this.x /= v.getX();
		this.y /= v.getY();
	};
	/**
	 * Gets the dot/scalar product: the difference between two directions.
	 * @param v the other <code>SimpleVector2</code>
	 * @return double
	 */
	SimpleVector2.prototype.dotProduct = function(v) {
    	try {
    		this.checkInstanceOf(v, SimpleVector2);
    	} catch (err) {
            var s = [];
            s.push("ERROR! SimpleVector2.dotProduct() - v ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		return this.x * v.getX() + this.y * v.getY();
	};
	/**
	 * Indicates whether the supplied values are equal to this
	 * {@link SimpleVector2}'s location.
	 * @return true if the supplied coordinates are equal to the
	 *         {@link SimpleVector2}'s location; false otherwise
	 */
	SimpleVector2.prototype.equals = function() {
		var equals = false;
		var variation = 0.0001;
		if (arguments.length === 1) {
	    	try {
	    		this.checkInstanceOf(arguments[0], SimpleVector2);
	    	} catch (err) {
	            var s = [];
	            s.push("ERROR! SimpleVector2.equals() - v ");
	            s.push(err.message);
	            throw new Error(s.join(""));
	    	}
			equals = arguments[0].getX() - variation < this.x
			&& this.x < arguments[0].getX() + variation
			&& arguments[0].getY() - variation < this.y
			&& this.y < arguments[0].getY() + variation;
		} else if (arguments.length === 2) {
			try {
	    		this.checkFloat(arguments[0]);
	    		this.checkFloat(arguments[1]);
	    	} catch (err) {
	            var s = [];
	            s.push("ERROR! SimpleVector2.equals() - arguments must be floating-point - ");
	            s.push(err.message);
	            throw new Error(s.join(""));
	    	}
			equals = arguments[0] - variation < this.x
			&& this.x < arguments[0] + variation
			&& arguments[1] - variation < this.y
			&& this.y < arguments[1] + variation;	
		} else {
			throw new Error(
	        "Invalid number of arguments, must be 1 vector to compare, or 2 numbers");
		}
		return equals;
	};
	/**
	 * Gets the x.
	 * @return double
	 */
	SimpleVector2.prototype.getX = function() {
		return this.x;
	};
	/**
	 * Gets the y.
	 * @return double
	 */
	SimpleVector2.prototype.getY = function() {
		return this.y;
	};
	/**
	 * Increments the <code>SimpleVector2</code>.
	 * @param v the other <code>SimpleVector2</code> used to calculate the
	 *            increment
	 */
	SimpleVector2.prototype.increment = function(v) {
    	try {
    		this.checkInstanceOf(v, SimpleVector2);
    	} catch (err) {
            var s = [];
            s.push("ERROR! SimpleVector2.increment() - v ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		this.x += v.getX();
		this.y += v.getY();
	};
	/**
	 * Gets the distance from the origin.
	 * @return double
	 */
	SimpleVector2.prototype.length = function() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	};
	/**
	 * Moves the <code>SimpleVector2</code> to by a certain amount.
	 * @param mx the distance moved along the x-axis
	 * @param my the distance moved along the y-axis
	 */
	SimpleVector2.prototype.move = function(mx, my) {
		try {
    		this.checkFloat(mx);
    		this.checkFloat(my);
    	} catch (err) {
            var s = [];
            s.push("ERROR! SimpleVector2.move() - arguments must be floating-point - ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		this.x += mx;
		this.y += my;
	};
	/**
	 * Multiplies one vector by another.
	 * @param v the other <code>SimpleVector2</code> used to multipy
	 * @throws RPGException if the supplied vector is null
	 */
	SimpleVector2.prototype.multiply = function(v) {
    	try {
    		this.checkInstanceOf(v, SimpleVector2);
    	} catch (err) {
            var s = [];
            s.push("ERROR! SimpleVector2.multiply() - v ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		this.x *= v.getX();
		this.y *= v.getY();
	};
	/**
	 * Calculates the normal angle of the <code>SimpleVector2</code>.
	 * @return {@link SimpleVector2}
	 */
	SimpleVector2.prototype.normal = function() {
		var length;
		if (this.length() == 0) {
			length = 0;
		} else {
			length = 1 / this.length();
		}
		var nx = this.x * length;
		var ny = this.y * length;
		return new SimpleVector2(nx, ny);
	};
	/**
	 * Sets the position along the x-axis.
	 * @param v the double to set
	 */
	SimpleVector2.prototype.setX = function(v) {
		try {
    		this.checkFloat(v);
    	} catch (err) {
            var s = [];
            s.push("ERROR! SimpleVector2.setX() - v ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		this.x = v;
	};
	/**
	 * Sets the position along the y-axis.
	 * @param v the double to set
	 */
	SimpleVector2.prototype.setY = function(v) {
		try {
    		this.checkFloat(v);
    	} catch (err) {
            var s = [];
            s.push("ERROR! SimpleVector2.setY() - v ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		this.y = v;
	};
	SimpleVector2.prototype.toString = function() {
		return ["SimpleVector2[x=", this.x, ", y=", this.y, "]"].join("");
	};
	return SimpleVector2;
});
