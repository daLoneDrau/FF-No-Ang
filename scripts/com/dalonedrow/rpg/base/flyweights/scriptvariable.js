/**
 * 
 */
define(["com/dalonedrow/rpg/base/constants/scriptglobals", "com/dalonedrow/utils/hashcode"],
		function(ScriptGlobals, Hashcode) {
    function ScriptVariable() {
		Hashcode.call(this);
		/** the floating-point array value the {@link ScriptVariable} references. */
		this.faval = null;
		/** the floating-point value the {@link ScriptVariable} references. */
		this.fval = 0;
		/** the integer array value the {@link ScriptVariable} references. */
		this.iaval = null;
		/** the integer value the {@link ScriptVariable} references. */
		this.ival = 0;
		/** the long array value the {@link ScriptVariable} references. */
		this.laval = null;
		/** the long value the {@link ScriptVariable} references. */
		this.lval = 0;
		/** the {@link ScriptVariable}'s name. */
		this.name = null;
		/** the string value the {@link ScriptVariable} references. */
		this.text = null;
		/** the string array value the {@link ScriptVariable} references. */
		this.textaval = null;
		/** the {@link ScriptVariable}'s type. */
		this.type = 0;
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
			this.name = arguments[0].getName();
			this.type = arguments[0].getType();
			if (arguments[0].getFloatArrayVal() !== null) {
				this.faval = [].concat(arguments[0].getFloatArrayVal());
			}
			this.fval = arguments[0].getFloatVal();
			if (arguments[0].getIntArrayVal() !== null) {
				this.iaval = [].concat(arguments[0].getIntArrayVal());
			}
			this.ival = arguments[0].getIntVal();
			if (arguments[0].getLongArrayVal() !== null) {
				this.laval = [].concat(arguments[0].getLongArrayVal());
			}
			this.lval = arguments[0].getLongVal;
			if (arguments[0].getTextArrayVal() !== null) {
				this.textaval = [].concat(arguments[0].getTextArrayVal());
			}
			this.text = arguments[0].getText();
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
			this.name = arguments[0];
			this.type = arguments[1];
			this.validateType();
			this.set(arguments[2]);
		} else {
            var s = [];
            s.push("ERROR! ScriptVariable() - ");
            s.push("requires 1 ScriptVariable argument to clone, or name, type and value to set");
            throw new Error(s.join(""));			
		}
    }
	ScriptVariable.prototype = Object.create(Hashcode.prototype);
	/**
	 * Sets the value the {@link ScriptVariable} references.
	 * @param value the floating-point array value to set
	 * @if the type is invalid
	 */
	ScriptVariable.prototype.set = function() {
		var value;
		if (arguments.length === 1) {
			value = arguments[0];
		} else if (arguments.length === 2) {
			this.type = arguments[0];
			value = arguments[1];
		}
		var throwException = false;
		switch (this.type) {
		case ScriptGlobals.TYPE_G_00_TEXT:
		case ScriptGlobals.TYPE_L_08_TEXT:
			if (value === null) {
				this.text = null;
			} else if (typeof value === "string") {
				this.text = value;
			} else if (Array.isArray(value)) {
				throwException = true;
			} else {
				this.text = String(value);
			}
			break;
		case ScriptGlobals.TYPE_G_01_TEXT_ARR:
		case ScriptGlobals.TYPE_L_09_TEXT_ARR:
			if (value === null) {
				this.textaval = [];
			} else if (typeof value === "string") {
				this.textaval = [value];
			} else if (Array.isArray(value)) {
				this.textaval = value;
			} else {
				throwException = true;
			}
			break;
		case ScriptGlobals.TYPE_G_02_FLOAT:
		case ScriptGlobals.TYPE_L_10_FLOAT:
			if (value === null) {
				this.fval = 0;
			} else if (typeof value === 'number') {
				this.fval = value;
			} else {
				if (!isNaN(parseFloat(value))) {
					this.fval = parseFloat(value);
				} else {
					throwException = true;
				}
			}
			break;
		case ScriptGlobals.TYPE_G_03_FLOAT_ARR:
		case ScriptGlobals.TYPE_L_11_FLOAT_ARR:
			if (value === null) {
				this.faval = [];
			} else if (Array.isArray(value)) {
				this.faval = value;
			} else if (typeof value === 'number') {
				this.faval = [value];
			} else {
				throwException = true;
			}
			break;
		case ScriptGlobals.TYPE_G_04_INT:
		case ScriptGlobals.TYPE_L_12_INT:
			if (value === null) {
				this.ival = 0;
			} else if (typeof value === 'number'
	    		&& !isNaN(value)
	            && parseInt(Number(value)) === value
	            && !isNaN(parseInt(value, 10))) {
				this.ival = value;
			} else {
				if (!isNaN(parseInt(value, 10))) {
					this.ival = parseInt(value, 10);
				} else {
					throwException = true;
				}
			}
			break;
		case ScriptGlobals.TYPE_G_05_INT_ARR:
		case ScriptGlobals.TYPE_L_13_INT_ARR:
			if (value === null) {
				this.iaval = [];
			} else if (Array.isArray(value)) {
				this.iaval = value;
			} else if (typeof value === 'number') {
				if (!isNaN(parseInt(value, 10))) {
					this.iaval = [parseInt(value, 10)];
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
				this.lval = 0;
			} else if (typeof value === 'number'
	    		&& !isNaN(value)
	            && parseInt(Number(value)) === value
	            && !isNaN(parseInt(value, 10))) {
				this.lval = value;
			} else {
				if (!isNaN(parseInt(value, 10))) {
					this.lval = parseInt(value, 10);
				} else {
					throwException = true;
				}
			}
			break;
		case ScriptGlobals.TYPE_G_07_LONG_ARR:
		case ScriptGlobals.TYPE_L_15_LONG_ARR:
		default:
			if (value === null) {
				this.laval = [];
			} else if (Array.isArray(value)) {
				this.laval = value;
			} else if (typeof value === 'number') {
				if (!isNaN(parseInt(value, 10))) {
					this.laval = [parseInt(value, 10)];
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
					["Invalid value ", value, " for ScriptVariable type - ", this.type, "."].join(""));
		}
	}
	/**
	 * Validates the variable type.
	 * @if the type is invalid
	 */
	ScriptVariable.prototype.validateType = function() {
		if (this.type < ScriptGlobals.TYPE_G_00_TEXT
				|| this.type > ScriptGlobals.TYPE_L_15_LONG_ARR) {
			throw new Error(["Invalid ScriptVariable type - ", this.type, "."].join(""));
		}
	}
	/** Clears up member fields, releasing their memory. */
	ScriptVariable.prototype.clear = function() {
		this.faval = null;
		this.fval = 0;
		this.iaval = null;
		this.ival = 0;
		this.laval = null;
		this.lval = 0;
		this.name = null;
		this.text = null;
		this.textaval = null;
	}
	/**
	 * Gets the floating-point array value the {@link ScriptVariable}
	 * references.
	 * @return <code>float[]</code>
	 * @if the type is invalid
	 */
	ScriptVariable.prototype.getFloatArrayVal = function() {
		if (this.type !== ScriptGlobals.TYPE_G_03_FLOAT_ARR
				&& this.type !== ScriptGlobals.TYPE_L_11_FLOAT_ARR) {
			throw new Error("Not a floating-point array");
		}
		if (arguments.length === 0) {
			return this.faval;
		} else {
		    if (arguments[0] !== undefined
		    		&& arguments[0] !== null
		    		&& !isNaN(arguments[0])
		            && parseInt(Number(arguments[0])) === arguments[0]
		            && !isNaN(parseInt(arguments[0], 10))) {
				return this.faval[arguments[0]];
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
	ScriptVariable.prototype.getFloatVal = function() {
		if (this.type !== ScriptGlobals.TYPE_G_02_FLOAT
				&& this.type !== ScriptGlobals.TYPE_L_10_FLOAT) {
			throw new Error("Not a floating-point variable");
		}
		return this.fval;
	}
	/**
	 * Gets the integer array value the {@link ScriptVariable} references.
	 * @return <code>int[]</code>
	 * @if the type is invalid
	 */
	ScriptVariable.prototype.getIntArrayVal = function() {
		if (this.type !== ScriptGlobals.TYPE_G_05_INT_ARR
				&& this.type !== ScriptGlobals.TYPE_L_13_INT_ARR) {
			throw new Error("Not an integer array");
		}
		if (arguments.length === 0) {
			return this.iaval;
		} else {
		    if (arguments[0] !== undefined
		    		&& arguments[0] !== null
		    		&& !isNaN(arguments[0])
		            && parseInt(Number(arguments[0])) === arguments[0]
		            && !isNaN(parseInt(arguments[0], 10))) {
				return this.iaval[arguments[0]];
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
	ScriptVariable.prototype.getIntVal = function() {
		if (this.type !== ScriptGlobals.TYPE_G_04_INT
				&& this.type !== ScriptGlobals.TYPE_L_12_INT) {
			throw new Error("Not an integer variable");
		}
		return this.ival;
	}
	/**
	 * Gets the long integer array value the {@link ScriptVariable} references.
	 * @return <code>long[]</code>
	 * @if the type is invalid
	 */
	ScriptVariable.prototype.getLongArrayVal = function() {
		if (this.type !== ScriptGlobals.TYPE_G_07_LONG_ARR
				&& this.type !== ScriptGlobals.TYPE_L_15_LONG_ARR) {
			throw new Error("Not a long integer array");
		}
		if (arguments.length === 0) {
			return this.laval;
		} else {
		    if (arguments[0] !== undefined
		    		&& arguments[0] !== null
		    		&& !isNaN(arguments[0])
		            && parseInt(Number(arguments[0])) === arguments[0]
		            && !isNaN(parseInt(arguments[0], 10))) {
				return this.laval[arguments[0]];
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
	ScriptVariable.prototype.getLongVal = function() {
		if (this.type !== ScriptGlobals.TYPE_G_06_LONG
				&& this.type !== ScriptGlobals.TYPE_L_14_LONG) {
			throw new Error("Not a long integer variable");
		}
		return this.lval;
	}
	/**
	 * Gets the {@link ScriptVariable} 's name.
	 * @return {@link String}
	 */
	ScriptVariable.prototype.getName = function() {
		return this.name;
	}
	/**
	 * Gets the text value the {@link ScriptVariable} references.
	 * @return {@link String}
	 * @if the type is invalid
	 */
	ScriptVariable.prototype.getText = function() {
		if (this.type !== ScriptGlobals.TYPE_G_00_TEXT
				&& this.type !== ScriptGlobals.TYPE_L_08_TEXT) {
			throw new Error("Not a String variable");
		}
		return this.text;
	}
	/**
	 * Gets the {@link String} array value the {@link ScriptVariable} references.
	 * @return {@link String}[]
	 * @if the type is invalid
	 */
	ScriptVariable.prototype.getTextArrayVal = function() {
		if (this.type !== ScriptGlobals.TYPE_G_01_TEXT_ARR
				&& this.type !== ScriptGlobals.TYPE_L_09_TEXT_ARR) {
			throw new Error("Not a string array");
		}
		if (arguments.length === 0) {
			return this.textaval;
		} else {
		    if (arguments[0] !== undefined
		    		&& arguments[0] !== null
		    		&& !isNaN(arguments[0])
		            && parseInt(Number(arguments[0])) === arguments[0]
		            && !isNaN(parseInt(arguments[0], 10))) {
				return this.textaval[arguments[0]];
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
	ScriptVariable.prototype.getType = function() {
		return this.type;
	}
	/**
	 * Sets the {@link ScriptVariable}'s name.
	 * @param value the name to set
	 * @if the value field is invalid
	 */
	ScriptVariable.prototype.setName = function(val) {
        if (val !== undefined
        		&& val !== null) {
        	if (typeof val !== "string") {
	            var s = [];
	            s.push("ERROR! ScriptVariable.setName() - ");
	            s.push("argument must be string");
	            throw new Error(s.join(""));
        	} else {
        		this.name = val;
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
	ScriptVariable.prototype.setType = function(val) {
	    if (val !== undefined
	    		&& val !== null
	    		&& !isNaN(val)
	            && parseInt(Number(val)) === val
	            && !isNaN(parseInt(val, 10))) {
			this.type = val;
			this.validateType();
			this.clear();
	    } else {
            var s = [];
            s.push("ERROR! ScriptVariable.setType() - ");
            s.push("argument must be integer");
            throw new Error(s.join(""));
	    }
	}
	return ScriptVariable;
});
