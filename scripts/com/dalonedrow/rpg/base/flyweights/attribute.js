/**
 * 
 */
define(["com/dalonedrow/utils/hashcode"], function(Hashcode) {
    function Attribute() {
		Hashcode.call(this);
	    /** the {@link Attribute}'s name abbreviation. */
	    var abbreviation = null;
	    /** the {@link Attribute}'s base value. */
	    var base = 0;
	    /** the {@link Attribute}'s description. */
	    var description = null;
	    /** the {@link Attribute}'s display name. */
	    var displayName = null;
	    /** the value of any modifiers to the attribute. */
	    var modifier = 0;
		if (arguments.length === 1
		        && arguments[0] instanceof Attribute) {
			abbreviation = arguments[0].code;
			displayName = arguments[0].name;
			description = arguments[0].description;
		} else if (arguments.length === 2) {
			abbreviation = arguments[0];
			displayName = arguments[1];
			description = "";
		} else if (arguments.length === 3) {
			abbreviation = arguments[0];
			displayName = arguments[1];
			description = arguments[2];
		} else {
			throw new Error(
			        "Invalid number of arguments, must be 1 Attribute to copy, or 2 or 3 strings");
		}
		if (abbreviation === null) {
			throw new Error("abbreviation cannot be null");
		}
		if (displayName === null) {
			throw new Error("name cannot be null");
		}
	    /**
	     * Sets the value for the modifier.
	     * @param val the value to set
	     */
	    this.adjustModifier = function(val) {
	        modifier += val;
	    };
	    /** Resets the {@link Attribute}'s modifier value to 0. */
	    this.clearModifier = function() {
	        modifier = 0;
	    };
	    /**
	     * Gets the {@link Attribute}'s name abbreviation.
	     * @return <code>char</code>[]
	     */
	    this.getAbbreviation = function() {
	        return abbreviation;
	    };
	    /**
	     * Gets the base {@link Attribute} value.
	     * @return {@link float}
	     */
	    this.getBase = function() {
	        return base;
	    };
	    /**
	     * Gets the {@link Attribute}'s description.
	     * @return <code>char</code>[]
	     */
	    this.getDescription = function() {
	        return description;
	    };
	    /**
	     * Gets the {@link Attribute}'s display name.
	     * @return <code>char</code>[]
	     */
	    this.getDisplayName = function() {
	        return displayName;
	    };
	    /**
	     * Gets the full {@link Attribute} value.
	     * @return {@link float}
	     */
	    this.getFull = function() {
	        return base + modifier;
	    };
	    /**
	     * Gets the value of all modifiers to the {@link Attribute}.
	     * @return {@link float}
	     */
	    this.getModifier = function() {
	        return modifier;
	    };
	    /**
	     * Sets the {@link Attribute}'s name abbreviation.
	     * @param val the name to set
	     * @throws RPGException if the parameter is null
	     */
	    this.setAbbreviation = function(val) {
	        if (val === undefined
	                || val === null) {
	            throw new Error("abbreviation cannot be null");
	        }
	        abbreviation = val;
	    }
	    /**
	     * Sets the base {@link Attribute} value.
	     * @param val the value to set
	     */
	    this.setBase = function(val) {
	        if (val === undefined
	                || val === null) {
	            throw new Error("Base cannot be null");
	        }
	        base = val;
	    }
	    /**
	     * Sets the {@link Attribute}'s description.
	     * @param val the name to set
	     * @throws RPGException if the parameter is null
	     */
	    this.setDescription = function(val) {
	        if (val === undefined
	                || val === null) {
	            throw new Error("Description cannot be null");
	        }
	        description = val;
	    }
	    /**
	     * Sets the {@link Attribute}'s display name.
	     * @param val the name to set
	     * @throws RPGException if the parameter is null
	     */
	    this.setDisplayName = function(val) {
	        if (val === undefined
	                || val === null) {
	            throw new Error("name cannot be null");
	        }
	        displayName = val;
	    }
	}
    Attribute.prototype = Object.create(Hashcode.prototype);
	return Attribute;
});
