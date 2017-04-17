/**
 * Simple Vector class, module with no dependencies.
 * @author DaLoneDrow
 */
define(function() {
	function SimpleVector3() {
		/** the number of coordinates needed to create a new vector. */
		const NUM_COORDINATES	= 3;
		/** the x-coordinate. */
		var x;
		/** the y-coordinate. */
		var y;
		/** the z-coordinate. */
		var z;
		/** Sets the <code>Vector3</code> position. */
		this.set = function() {
			if (arguments.length === 1
					&& arguments[0] instanceof SimpleVector3) {
				x = arguments[0].getX();
				y = arguments[0].getY();
				z = arguments[0].getZ();
			} else if (arguments.length === 3
					&& !isNaN(arguments[0])
					&& !isNaN(arguments[1])
					&& !isNaN(arguments[2])) {
				x = arguments[0];
				y = arguments[1];
				z = arguments[2];
			} else {
				throw new Error(
		        "Invalid number of arguments, must be 1 vector to set, or 3 numbers");
			}
		};
		if (arguments.length === 0) {
			x = 0;
			y = 0;
			z = 0;
		} else if (arguments.length === 1
				&& arguments[0] instanceof SimpleVector2) {
			this.set(arguments[0].getX(), arguments[0].getY(), 0);
		} else if (arguments.length === 1
				&& arguments[0] instanceof SimpleVector3) {
			this.set(arguments[0]);
		} else if (arguments.length === 2
				&& arguments[0] instanceof SimpleVector2
				&& !isNaN(arguments[1])) {
			this.set(arguments[0].getX(), arguments[0].getY(), arguments[1]);
		} else if (arguments.length === 3) {
			this.set(arguments[0], arguments[1], arguments[2]);
		} else {
			throw new Error("Invalid number of arguments");
		}
		/**
		 * Cross product - used to calculate the normal.
		 * @param v the other <code>Vector3</code>
		 * @return {@link SimpleVector3}
		 */
		this.crossProduct = function(v) {
			if (v === null
					|| !v instanceof SimpleVector3) {
				throw new Error("Cannot crossProduct SimpleVector3 from null or invalid");
			}
			var nx = y * v.getZ() - z * v.getY();
			var ny = z * v.getY() - x * v.getZ();
			var nz = x * v.getY() - y * v.getX();
			return new SimpleVector3(nx, ny, nz);
		};
		/**
		 * Decrements the <code>Vector3</code>.
		 * @param v the other <code>Vector3</code> used to calculate the decrement
		 * @throws RPGException
		 */
		this.decrement = function(v) {
			if (v === null
					|| !v instanceof SimpleVector3) {
				throw new Error("Cannot decrement SimpleVector3 from null");
			}
			x -= v.getX();
			y -= v.getY();
			z -= v.getZ();
		};
		/**
		 * Calculates the distance between two <code>Vector3</code>s.
		 * @param v the other <code>Vector3</code> used to calculate the distance
		 * @return double
		 */
		this.distance = function(v) {
			if (v === null
					|| !v instanceof SimpleVector3) {
				throw new Error("Cannot distance SimpleVector3 from null");
			}
			return Math.sqrt((v.getX() - x) * (v.getX() - x) + (v.getY() - y) * (v.getY() - y));
		};
		/**
		 * Divides one vector by another.
		 * @param v the other <code>Vector3</code> used to divide
		 */
		this.divide = function(v) {
			if (v === null
					|| !v instanceof SimpleVector3) {
				throw new Error("Cannot divide SimpleVector3 from null");
			}
			x /= v.getX();
			y /= v.getY();
			z /= v.getZ();
		};
		/**
		 * Gets the dot/scalar product: the difference between two directions.
		 * @param v the other <code>Vector3</code>
		 * @return double
		 */
		this.dotProduct = function(v) {
			if (v === null
					|| !v instanceof SimpleVector3) {
				throw new Error("Cannot create dotProduct from null");
			}
			return x * v.getX() + y * v.getY() + z * v.getZ();
		};
		/**
		 * Indicates whether the supplied values are equal to this
		 * {@link SimpleVector3}'s location.
		 * @return true if the supplied coordinates are equal to the
		 *         {@link SimpleVector3}'s location; false otherwise
		 */
		this.equals = function() {
			var equals = false;
			var variation = 0.0001;
			if (arguments.length === 1
					&& arguments[0] instanceof SimpleVector3) {
				equals = arguments[0].getX() - variation < x
				&& x < arguments[0].getX() + variation
				&& arguments[0].getY() - variation < y
				&& y < arguments[0].getY() + variation
				&& arguments[0].getZ() - variation < z
				&& z < arguments[0].getZ() + variation;
			} else if (arguments.length === 3
					&& !isNaN(arguments[0])
					&& !isNaN(arguments[1])
					&& !isNaN(arguments[2])) {
				equals = arguments[0] - variation < x
				&& x < arguments[0] + variation
				&& arguments[1] - variation < y
				&& y < arguments[1] + variation
				&& arguments[2] - variation < y
				&& y < arguments[2] + variation;
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
		 * Gets the z.
		 * @return double
		 */
		this.getZ = function() {
			return z;
		};
		/**
		 * Increments the <code>Vector3</code>.
		 * @param v the other <code>Vector3</code> used to calculate the increment
		 */
		this.increment = function(v) {
			if (v === null
					|| !v instanceof SimpleVector3) {
				throw new Error("Cannot increment SimpleVector3 from null");
			}
			x += v.getX();
			y += v.getY();
			z += v.getZ();
		};
		/**
		 * Gets the distance from the origin.
		 * @return double
		 */
		this.length = function() {
			return Math.sqrt(x * x + y * y + z * z);
		}
		/**
		 * Moves the <code>Vector3</code> to by a certain amount.
		 * @param mx the distance moved along the x-axis
		 * @param my the distance moved along the y-axis
		 * @param mz the distance moved along the z-axis
		 */
		this.move = function(mx, my, mz) {
			x += mx;
			y += my;
			z += mz;
		};
		/**
		 * Multiplies one vector by another.
		 * @param v the other <code>Vector3</code> used to multipy
		 */
		this.multiply = function(v) {
			if (v === null
					|| !v instanceof SimpleVector3) {
				throw new Error("Cannot move SimpleVector3 from null");
				throw ex;
			}
			x *= v.getX();
			y *= v.getY();
			z *= v.getZ();
		};
		/**
		 * Calculates the normal angle of the <code>Vector3</code>.
		 * @return {@link SimpleVector3}
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
			var nz = z * length;
			return new SimpleVector3(nx, ny, nz);
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
		/**
		 * Sets the position along the z-axis.
		 * @param v the double to set
		 */
		this.setZ = function(v) {
			z = v;
		};
		this.toString = function() {
			return ["[x=", x, ", y=", y, ", z=", z, "]" ].join("");
		};
	}
	return SimpleVector3;
});

