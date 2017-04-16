/**
 * Simple Vector class, module with no dependencies.
 * @author DaLoneDrow
 */
define(function() {
	var SimpleVector2 = function() {
		/**
		 * private members
		 */
		/** the x-coordinate. */
		var x;
		/** the y-coordinate. */
		var y;
		/**
		 * Sets the <code>SimpleVector2</code> position.
		 * @param x1 the new position along the x-axis
		 * @param y1 the new position along the y-axis
		 */
		this.set = function() {
			if (arguments.length === 1) {
				if (arguments[0] instanceof SimpleVector2
						|| arguments[0] instanceof SimpleVector3) {
			        x = arguments[0].getX();
			        y = arguments[0].getY();
				} else {
					throw new Error(
			        "Invalid number of arguments, must be 1 SimpleVector2 or SimpleVector3");
				} 
			} else if (arguments.length === 2
					&& !isNaN(arguments[0])
					&& !isNaN(arguments[1])) {
				x = arguments[0];
				y = arguments[1];
			} else {
				throw new Error(
		        "Invalid number of arguments, must be 1 vector to set, or 2 numbers");
			}
		};
		/**
		 * Constructor.
		 */
		if (arguments.length === 0) {
			x = 0;
			y = 0;
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
		/**
		 * Decrements the <code>SimpleVector2</code>.
		 * @param v the other <code>SimpleVector2</code> used to calculate the
		 *            decrement
		 */
		this.decrement = function(v) {
			if (v === null
					|| !v instanceof SimpleVector2) {
				throw new Error("Cannot decrement SimpleVector2 from null or invalid");
			}
			x -= v.getX();
			y -= v.getY();
		};
		/**
		 * Calculates the distance between two <code>SimpleVector2</code>s.
		 * @param v the other <code>SimpleVector2</code> used to calculate the
		 *            distance
		 * @return double
		 */
		this.distance = function(v) {
			if (v === null
					|| !v instanceof SimpleVector2) {
				throw new Error("Cannot distance SimpleVector2 from null");
			}
			return Math.sqrt((v.getX() - x) * (v.getX() - x) + (v.v.getY() - y) * (v.v.getY() - y));
		};
		/**
		 * Divides one vector by another.
		 * @param v the other <code>SimpleVector2</code> used to divide
		 */
		this.divide = function(v) {
			if (v === null
					|| !v instanceof SimpleVector2) {
				throw new Error("Cannot divide SimpleVector2 by null");
			}
			x /= v.getX();
			y /= v.getY();
		};
		/**
		 * Gets the dot/scalar product: the difference between two directions.
		 * @param v the other <code>SimpleVector2</code>
		 * @return double
		 */
		this.dotProduct = function(v) {
			if (v === null
					|| !v instanceof SimpleVector2) {
				throw new Error("Cannot dot product SimpleVector2 with null");
			}
			return x * v.getX() + y * v.getY();
		};
		/**
		 * Indicates whether the supplied values are equal to this
		 * {@link SimpleVector2}'s location.
		 * @return true if the supplied coordinates are equal to the
		 *         {@link SimpleVector2}'s location; false otherwise
		 */
		this.equals = function() {
			var equals = false;
			var variation = 0.0001;
			if (arguments.length === 1
					&& arguments[0] instanceof SimpleVector2) {
				equals = arguments[0].getX() - variation < x
				&& x < arguments[0].getX() + variation
				&& arguments[0].getY() - variation < y
				&& y < arguments[0].getY() + variation;
			} else if (arguments.length === 2
					&& !isNaN(arguments[0])
					&& !isNaN(arguments[1])) {
				equals = arguments[0] - variation < x
				&& x < arguments[0] + variation
				&& arguments[1] - variation < y
				&& y < arguments[1] + variation;
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
		this.getX = function() {
			return x;
		};
		/**
		 * Gets the y.
		 * @return double
		 */
		this.getY = function() {
			return y;
		};
		/**
		 * Increments the <code>SimpleVector2</code>.
		 * @param v the other <code>SimpleVector2</code> used to calculate the
		 *            increment
		 */
		this.increment = function(v) {
			if (v === null
					|| !v instanceof SimpleVector2) {
				throw new Error("Cannot increment SimpleVector2 with null");
			}
			x += v.getX();
			y += v.getY();
		};
		/**
		 * Gets the distance from the origin.
		 * @return double
		 */
		this.length = function() {
			return Math.sqrt(x * x + y * y);
		};
		/**
		 * Moves the <code>SimpleVector2</code> to by a certain amount.
		 * @param mx the distance moved along the x-axis
		 * @param my the distance moved along the y-axis
		 */
		this.move = function(mx, my) {
			x += mx;
			y += my;
		};
		/**
		 * Multiplies one vector by another.
		 * @param v the other <code>SimpleVector2</code> used to multipy
		 * @throws RPGException if the supplied vector is null
		 */
		this.multiply = function(v) {
			if (v === null
					|| !v instanceof SimpleVector2) {
				throw new Error("Cannot multiply SimpleVector2 with null");
				throw ex;
			}
			x *= v.getX();
			y *= v.getY();
		};
		/**
		 * Calculates the normal angle of the <code>SimpleVector2</code>.
		 * @return {@link SimpleVector2}
		 */
		this.normal = function() {
			var length;
			if (this.length() == 0) {
				length = 0;
			} else {
				length = 1 / this.length();
			}
			var nx = x * length;
			var ny = y * length;
			return new SimpleVector2(nx, ny);
		};
		/**
		 * Sets the position along the x-axis.
		 * @param v the double to set
		 */
		this.setX = function(v) {
			x = v;
		};
		/**
		 * Sets the position along the y-axis.
		 * @param v the double to set
		 */
		this.setY = function(v) {
			y = v;
		};
		this.toString = function() {
			return ["SimpleVector2[x=", x, ", y=", y, "]"].join("");
		};
	}
	return SimpleVector2;
});
