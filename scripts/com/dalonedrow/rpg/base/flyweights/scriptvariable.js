/**
 * 
 */
define(["com/dalonedrow/rpg/base/constants/scriptglobals", "com/dalonedrow/utils/hashcode"],
		function(ScriptGlobals, Hashcode) {
    function ScriptVariable() {
		Hashcode.call(this);
		/** the floating-point array value the {@link ScriptVariable} references. */
		var	faval = null;
		/** the floating-point value the {@link ScriptVariable} references. */
		var fval = 0;
		/** the integer array value the {@link ScriptVariable} references. */
		var iaval = null;
		/** the integer value the {@link ScriptVariable} references. */
		var ival = 0;
		/** the long array value the {@link ScriptVariable} references. */
		var laval = null;
		/** the long value the {@link ScriptVariable} references. */
		var lval = 0;
		/** the {@link ScriptVariable}'s name. */
		var name = null;
		/** the string value the {@link ScriptVariable} references. */
		var text = null;
		/** the string array value the {@link ScriptVariable} references. */
		var textaval = null;
		/** the {@link ScriptVariable}'s type. */
		var type = 0;
		/**
		 * Sets the value the {@link ScriptVariable} references.
		 * @param value the floating-point array value to set
		 * @if the type is invalid
		 */
		this.set = function() {
			var value;
			if (arguments.length === 1) {
				value = arguments[0];
			} else if (arguments.length === 2) {
				type = arguments[0];
				value = arguments[1];
			}
			var throwException = false;
			switch (type) {
			case ScriptGlobals.TYPE_G_00_TEXT:
			case ScriptGlobals.TYPE_L_08_TEXT:
				if (value === null) {
					text = null;
				} else if (typeof value === "string") {
					text = value;
				} else if (Array.isArray(value)) {
					throwException = true;
				} else {
					text = String(value);
				}
				break;
			case ScriptGlobals.TYPE_G_01_TEXT_ARR:
			case ScriptGlobals.TYPE_L_09_TEXT_ARR:
				if (value === null) {
					textaval = [];
				} else if (typeof value === "string") {
					textaval = [value];
				} else if (Array.isArray(value)) {
					textaval = value;
				} else {
					throwException = true;
				}
				break;
			case ScriptGlobals.TYPE_G_02_FLOAT:
			case ScriptGlobals.TYPE_L_10_FLOAT:
				if (value === null) {
					fval = 0;
				} else if (typeof value === 'number') {
					fval = value;
				} else {
					if (!isNaN(parseFloat(value))) {
						fval = parseFloat(value);
					} else {
						throwException = true;
					}
				}
				break;
			case ScriptGlobals.TYPE_G_03_FLOAT_ARR:
			case ScriptGlobals.TYPE_L_11_FLOAT_ARR:
				if (value === null) {
					faval = [];
				} else if (Array.isArray(value)) {
					faval = value;
				} else if (typeof value === 'number') {
					faval = [value];
				} else {
					throwException = true;
				}
				break;
			case ScriptGlobals.TYPE_G_04_INT:
			case ScriptGlobals.TYPE_L_12_INT:
				if (value === null) {
					ival = 0;
				} else if (typeof value === 'number'
		    		&& !isNaN(value)
		            && parseInt(Number(value)) === value
		            && !isNaN(parseInt(value, 10))) {
					ival = value;
				} else {
					if (!isNaN(parseInt(value, 10))) {
						ival = parseInt(value, 10);
					} else {
						throwException = true;
					}
				}
				break;
			case ScriptGlobals.TYPE_G_05_INT_ARR:
			case ScriptGlobals.TYPE_L_13_INT_ARR:
				if (value === null) {
					iaval = [];
				} else if (Array.isArray(value)) {
					iaval = value;
				} else if (typeof value === 'number') {
					if (!isNaN(parseInt(value, 10))) {
						iaval = [parseInt(value, 10)];
					} else {
						throwException = true;
					}
				} else {
					throwException = true;
				}
				break;
			case ScriptGlobals.TYPE_G_06_LONG:
			case ScriptGlobals.TYPE_L_14_LONG:
				if (value === null) {
					lval = 0;
				} else if (typeof value === 'number'
		    		&& !isNaN(value)
		            && parseInt(Number(value)) === value
		            && !isNaN(parseInt(value, 10))) {
					lval = value;
				} else {
					if (!isNaN(parseInt(value, 10))) {
						lval = parseInt(value, 10);
					} else {
						throwException = true;
					}
				}
				break;
			case ScriptGlobals.TYPE_G_07_LONG_ARR:
			case ScriptGlobals.TYPE_L_15_LONG_ARR:
			default:
				if (value === null) {
					laval = [];
				} else if (Array.isArray(value)) {
					laval = value;
				} else if (typeof value === 'number') {
					if (!isNaN(parseInt(value, 10))) {
						laval = [parseInt(value, 10)];
					} else {
						throwException = true;
					}
				} else {
					throwException = true;
				}
				break;
			}
			if (throwException) {
				throw new Error(
						["Invalid value ", value, " for ScriptVariable type - ", type, "."].join(""));
			}
		}
		/**
		 * Validates the variable type.
		 * @if the type is invalid
		 */
		var validateType = function() {
			if (type < ScriptGlobals.TYPE_G_00_TEXT
					|| type > ScriptGlobals.TYPE_L_15_LONG_ARR) {
				throw new Error(["Invalid ScriptVariable type - ", type, "."].join(""));
			}
		}
		if (arguments.length === 1) {
			if (arguments[0] === null) {
	            var s = [];
	            s.push("ERROR! ScriptVariable() - ");
	            s.push("cannot clone from null");
	            throw new Error(s.join(""));
			}
			if (!(arguments[0] instanceof ScriptVariable)) {
	            var s = [];
	            s.push("ERROR! ScriptVariable() - ");
	            s.push("can only clone ScriptVariable");
	            throw new Error(s.join(""));
			}
			name = arguments[0].getName();
			type = arguments[0].getType();
			if (arguments[0].getFloatArrayVal() !== null) {
				faval = [].concat(arguments[0].getFloatArrayVal());
			}
			fval = arguments[0].getFloatVal();
			if (arguments[0].getIntArrayVal() !== null) {
				iaval = [].concat(arguments[0].getIntArrayVal());
			}
			ival = arguments[0].getIntVal();
			if (arguments[0].getLongArrayVal() !== null) {
				laval = [].concat(arguments[0].getLongArrayVal());
			}
			lval = arguments[0].getLongVal;
			if (arguments[0].getTextArrayVal() !== null) {
				textaval = [].concat(arguments[0].getTextArrayVal());
			}
			text = arguments[0].getText();
		} else if (arguments.length === 3) {
			if (arguments[0] === null) {
	            var s = [];
	            s.push("ERROR! ScriptVariable() - ");
	            s.push("1st argument cannot be null");
	            throw new Error(s.join(""));
			}
			if (typeof arguments[0] !== "string") {
	            var s = [];
	            s.push("ERROR! ScriptVariable() - ");
	            s.push("1st argument must be string");
	            throw new Error(s.join(""));
			}
			if (arguments[0].trim().length === 0) {
	            var s = [];
	            s.push("ERROR! ScriptVariable() - ");
	            s.push("1st argument must be not be empty string");
	            throw new Error(s.join(""));
			}
		    if (arguments[1] === null
		    		|| isNaN(arguments[1])
		            || parseInt(Number(arguments[1])) !== arguments[1]
		            || isNaN(parseInt(arguments[1], 10))) {
	            var s = [];
	            s.push("ERROR! ScriptVariable() - ");
	            s.push("2nd argument must be number");
	            throw new Error(s.join(""));
		    }
			name = arguments[0];
			type = arguments[1];
			validateType();
			this.set(arguments[2]);
		} else {
            var s = [];
            s.push("ERROR! ScriptVariable() - ");
            s.push("requires 1 ScriptVariable argument to clone, or string, int and object to set");
            throw new Error(s.join(""));			
		}
		/** Clears up member fields, releasing their memory. */
		this.clear = function() {
			faval = null;
			fval = 0;
			iaval = null;
			ival = 0;
			laval = null;
			lval = 0;
			name = null;
			text = null;
			textaval = null;
		}
		/**
		 * Gets the floating-point array value the {@link ScriptVariable}
		 * references.
		 * @return <code>float[]</code>
		 * @if the type is invalid
		 */
		this.getFloatArrayVal = function() {
			if (type !== ScriptGlobals.TYPE_G_03_FLOAT_ARR
					&& type !== ScriptGlobals.TYPE_L_11_FLOAT_ARR) {
				throw new Error("Not a floating-point array");
			}
			if (arguments.length === 0) {
				return faval;
			} else {
			    if (arguments[0] !== undefined
			    		&& arguments[0] !== null
			    		&& !isNaN(arguments[0])
			            && parseInt(Number(arguments[0])) === arguments[0]
			            && !isNaN(parseInt(arguments[0], 10))) {
					return faval[arguments[0]];
			    } else {
		            var s = [];
		            s.push("ERROR! ScriptVariable.getFloatArrayVal() - ");
		            s.push("argument must be integer");
		            throw new Error(s.join(""));
			    }
			}
		}
		/**
		 * Gets the floating-point value the {@link ScriptVariable} references.
		 * @return <code>float</code>
		 * @if the type is invalid
		 */
		this.getFloatVal = function() {
			if (type !== ScriptGlobals.TYPE_G_02_FLOAT
					&& type !== ScriptGlobals.TYPE_L_10_FLOAT) {
				throw new Error("Not a floating-point variable");
			}
			return fval;
		}
		/**
		 * Gets the integer array value the {@link ScriptVariable} references.
		 * @return <code>int[]</code>
		 * @if the type is invalid
		 */
		this.getIntArrayVal = function() {
			if (type !== ScriptGlobals.TYPE_G_05_INT_ARR
					&& type !== ScriptGlobals.TYPE_L_13_INT_ARR) {
				throw new Error("Not an integer array");
			}
			if (arguments.length === 0) {
				return iaval;
			} else {
			    if (arguments[0] !== undefined
			    		&& arguments[0] !== null
			    		&& !isNaN(arguments[0])
			            && parseInt(Number(arguments[0])) === arguments[0]
			            && !isNaN(parseInt(arguments[0], 10))) {
					return iaval[arguments[0]];
			    } else {
		            var s = [];
		            s.push("ERROR! ScriptVariable.getIntArrayVal() - ");
		            s.push("argument must be integer");
		            throw new Error(s.join(""));
			    }
			}
		}
		/**
		 * Gets the integer value the {@link ScriptVariable} references.
		 * @return <code>long</code>
		 * @if the type is invalid
		 */
		this.getIntVal = function() {
			if (type !== ScriptGlobals.TYPE_G_04_INT
					&& type !== ScriptGlobals.TYPE_L_12_INT) {
				throw new Error("Not an integer variable");
			}
			return ival;
		}
		/**
		 * Gets the long integer array value the {@link ScriptVariable} references.
		 * @return <code>long[]</code>
		 * @if the type is invalid
		 */
		this.getLongArrayVal = function() {
			if (type !== ScriptGlobals.TYPE_G_07_LONG_ARR
					&& type !== ScriptGlobals.TYPE_L_15_LONG_ARR) {
				throw new Error("Not a long integer array");
			}
			if (arguments.length === 0) {
				return laval;
			} else {
			    if (arguments[0] !== undefined
			    		&& arguments[0] !== null
			    		&& !isNaN(arguments[0])
			            && parseInt(Number(arguments[0])) === arguments[0]
			            && !isNaN(parseInt(arguments[0], 10))) {
					return laval[arguments[0]];
			    } else {
		            var s = [];
		            s.push("ERROR! ScriptVariable.getLongArrayVal() - ");
		            s.push("argument must be integer");
		            throw new Error(s.join(""));
			    }
			}
		}
		/**
		 * Gets the long integer value the {@link ScriptVariable} references.
		 * @return <code>long</code>
		 * @if the type is invalid
		 */
		this.getLongVal = function() {
			if (type !== ScriptGlobals.TYPE_G_06_LONG
					&& type !== ScriptGlobals.TYPE_L_14_LONG) {
				throw new Error("Not a long integer variable");
			}
			return lval;
		}
		/**
		 * Gets the {@link ScriptVariable} 's name.
		 * @return {@link String}
		 */
		this.getName = function() {
			return name;
		}
		/**
		 * Gets the text value the {@link ScriptVariable} references.
		 * @return {@link String}
		 * @if the type is invalid
		 */
		this.getText = function() {
			if (type !== ScriptGlobals.TYPE_G_00_TEXT
					&& type !== ScriptGlobals.TYPE_L_08_TEXT) {
				throw new Error("Not a String variable");
			}
			return text;
		}
		/**
		 * Gets the {@link String} array value the {@link ScriptVariable} references.
		 * @return {@link String}[]
		 * @if the type is invalid
		 */
		this.getTextArrayVal = function() {
			if (type !== ScriptGlobals.TYPE_G_01_TEXT_ARR
					&& type !== ScriptGlobals.TYPE_L_09_TEXT_ARR) {
				throw new Error("Not a string array");
			}
			if (arguments.length === 0) {
				return textaval;
			} else {
			    if (arguments[0] !== undefined
			    		&& arguments[0] !== null
			    		&& !isNaN(arguments[0])
			            && parseInt(Number(arguments[0])) === arguments[0]
			            && !isNaN(parseInt(arguments[0], 10))) {
					return textaval[arguments[0]];
			    } else {
		            var s = [];
		            s.push("ERROR! ScriptVariable.getTextArrayVal() - ");
		            s.push("argument must be integer");
		            throw new Error(s.join(""));
			    }
			}
		}
		/**
		 * Gets the {@link ScriptVariable}'s type.
		 * @return <code>int</code>
		 */
		this.getType = function() {
			return type;
		}
		/**
		 * Sets the {@link ScriptVariable}'s name.
		 * @param value the name to set
		 * @if the value field is invalid
		 */
		this.setName = function(val) {
	        if (val !== undefined
	        		&& val !== null) {
	        	if (typeof val !== "string") {
		            var s = [];
		            s.push("ERROR! ScriptVariable.setName() - ");
		            s.push("argument must be string");
		            throw new Error(s.join(""));
	        	} else {
	        		name = val;
	        	}
	        } else {
	            var s = [];
	            s.push("ERROR! ScriptVariable.setName() - ");
	            s.push("requires 1 argument");
	            throw new Error(s.join(""));
	        }
		}
		/**
		 * Sets the {@link ScriptVariable}'s type.
		 * @param val the type to set
		 * @throws PooledException if one occurs
		 * @if the type is invalid
		 */
		this.setType = function(val) {
		    if (val !== undefined
		    		&& val !== null
		    		&& !isNaN(val)
		            && parseInt(Number(val)) === val
		            && !isNaN(parseInt(val, 10))) {
				type = val;
				validateType();
				this.clear();
		    } else {
	            var s = [];
	            s.push("ERROR! ScriptVariable.setType() - ");
	            s.push("argument must be integer");
	            throw new Error(s.join(""));
		    }
		}
	}
	ScriptVariable.prototype = Object.create(Hashcode.prototype);
	return ScriptVariable;
});
