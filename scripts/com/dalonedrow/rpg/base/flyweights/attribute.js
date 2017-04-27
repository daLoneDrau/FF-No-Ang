/**
 * 
 */
define(["com/dalonedrow/utils/hashcode"], function(Hashcode) {
    function Attribute() {
		Hashcode.call(this);
	    /** the {@link Attribute}'s name abbreviation. */
	    this.abbreviation = null;
	    /** the {@link Attribute}'s base value. */
	    this.base = 0;
	    /** the {@link Attribute}'s description. */
	    this.description = null;
	    /** the {@link Attribute}'s display name. */
	    this.displayName = null;
	    /** the value of any modifiers to the attribute. */
	    this.modifier = 0;
		if (arguments.length === 1
		        && arguments[0] instanceof Attribute) {
			this.abbreviation = arguments[0].getCode();
			this.displayName = arguments[0].getDisplayName();
			this.description = arguments[0].getDescription();
		} else if (arguments.length === 2) {
	        if (typeof arguments[0] !== "string") {
	            var s = [];
	            s.push("ERROR! Attribute(string, string) - ");
	            s.push("1st argument must be string");
	            throw new Error(s.join(""));
	        }
	        if (typeof arguments[1] !== "string") {
	            var s = [];
	            s.push("ERROR! Attribute(string, string) - ");
	            s.push("2nd argument must be string");
	            throw new Error(s.join(""));
	        }
	        this.abbreviation = arguments[0];
	        this.displayName = arguments[1];
	        this.description = "";
		} else if (arguments.length === 3) {
	        if (typeof arguments[0] !== "string") {
	            var s = [];
	            s.push("ERROR! Attribute(string, string, string) - ");
	            s.push("1st argument must be string");
	            throw new Error(s.join(""));
	        }
	        if (typeof arguments[1] !== "string") {
	            var s = [];
	            s.push("ERROR! Attribute(string, string, string) - ");
	            s.push("2nd argument must be string");
	            throw new Error(s.join(""));
	        }
	        if (typeof arguments[2] !== "string") {
	            var s = [];
	            s.push("ERROR! Attribute(string, string, string) - ");
	            s.push("3rd argument must be string");
	            throw new Error(s.join(""));
	        }
	        this.abbreviation = arguments[0];
	        this.displayName = arguments[1];
	        this.description = arguments[2];
		} else {
			throw new Error(
			        "Invalid number of arguments, must be 1 Attribute to copy, or 2 or 3 strings");
		}
		if (this.abbreviation === null) {
			throw new Error("abbreviation cannot be null");
		}
		if (this.displayName === null) {
			throw new Error("name cannot be null");
		}
	}
    Attribute.prototype = Object.create(Hashcode.prototype);
    /**
     * Sets the value for the modifier.
     * @param val the value to set
     */
    Attribute.prototype.adjustModifier = function(val) {
	    if (val !== undefined
	    		&& val !== null
	    		&& !isNaN(val)
	    		&& typeof val === "number") {
	    	this.modifier += val;
	    } else {
            var s = [];
            s.push("ERROR! Attribute.adjustModifier() - ");
            s.push("argument must be floating-point");
            throw new Error(s.join(""));
	    }
    };
    /** Resets the {@link Attribute}'s modifier value to 0. */
    Attribute.prototype.clearModifier = function() {
    	this.modifier = 0;
    };
    /**
     * Gets the {@link Attribute}'s name abbreviation.
     * @return <code>char</code>[]
     */
    Attribute.prototype.getAbbreviation = function() {
        return this.abbreviation;
    };
    /**
     * Gets the base {@link Attribute} value.
     * @return {@link float}
     */
    Attribute.prototype.getBase = function() {
        return this.base;
    };
    /**
     * Gets the {@link Attribute}'s description.
     * @return <code>char</code>[]
     */
    Attribute.prototype.getDescription = function() {
        return this.description;
    };
    /**
     * Gets the {@link Attribute}'s display name.
     * @return <code>char</code>[]
     */
    Attribute.prototype.getDisplayName = function() {
        return this.displayName;
    };
    /**
     * Gets the full {@link Attribute} value.
     * @return {@link float}
     */
    Attribute.prototype.getFull = function() {
        return this.base + this.modifier;
    };
    /**
     * Gets the value of all modifiers to the {@link Attribute}.
     * @return {@link float}
     */
    Attribute.prototype.getModifier = function() {
        return this.modifier;
    };
    /**
     * Sets the {@link Attribute}'s name abbreviation.
     * @param val the name to set
     * @throws RPGException if the parameter is null
     */
    Attribute.prototype.setAbbreviation = function(val) {
        if (val === undefined
                || val === null) {
            throw new Error("abbreviation cannot be null");
        }
        if (typeof val !== "string") {
            var s = [];
            s.push("ERROR! Attribute.setAbbreviation() - ");
            s.push("argument must be string");
            throw new Error(s.join(""));
        }
        this.abbreviation = val;
    }
    /**
     * Sets the base {@link Attribute} value.
     * @param val the value to set
     */
    Attribute.prototype.setBase = function(val) {
	    if (val !== undefined
	    		&& val !== null
	    		&& !isNaN(val)
	    		&& typeof val === "number") {
	    	this.base = val;
	    } else {
            var s = [];
            s.push("ERROR! Attribute.setBase() - ");
            s.push("argument must be floating-point");
            throw new Error(s.join(""));
	    }
    }
    /**
     * Sets the {@link Attribute}'s description.
     * @param val the name to set
     * @throws RPGException if the parameter is null
     */
    Attribute.prototype.setDescription = function(val) {
        if (val === undefined
                || val === null) {
            throw new Error("Description cannot be null");
        }
        if (typeof val !== "string") {
            var s = [];
            s.push("ERROR! Attribute.setDescription() - ");
            s.push("argument must be string");
            throw new Error(s.join(""));
        }
        this.description = val;
    }
    /**
     * Sets the {@link Attribute}'s display name.
     * @param val the name to set
     * @throws RPGException if the parameter is null
     */
    Attribute.prototype.setDisplayName = function(val) {
        if (val === undefined
                || val === null) {
            throw new Error("name cannot be null");
        }
        if (typeof val !== "string") {
            var s = [];
            s.push("ERROR! Attribute.setDisplayName() - ");
            s.push("argument must be string");
            throw new Error(s.join(""));
        }
        this.displayName = val;
    }
	return Attribute;
});
