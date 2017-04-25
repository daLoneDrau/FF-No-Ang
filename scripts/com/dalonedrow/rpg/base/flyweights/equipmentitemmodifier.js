/**
 * 
 */
define(["com/dalonedrow/utils/hashcode"], function(Hashcode) {
    function EquipmentItemModifier() {
		Hashcode.call(this);
	    /** the flag indicating whether the modifier is a percentage modifier. */
	    var percent = false;
	    /** not used. yet. */
	    var special = 0;
	    /** the value of modifier to be applied. */
	    var value = 0.0;
	    /** Clears all data. */
	    this.clearData = function() {
	        percent = false;
	        special = 0;
	        value = 0;
	    }
	    /**
	     * Gets the special.
	     * @return int
	     */
	    this.getSpecial = function() {
	        return special;
	    }
	    /**
	     * Gets the value of modifier to be applied.
	     * @return float
	     */
	    this.getValue = function() {
	        return value;
	    }
	    /**
	     * Determines if the {@link EquipmentItemModifier} is a percentage modifier.
	     * @return <tt>true</tt> if the {@link EquipmentItemModifier} is a
	     *         percentage modifier; <tt>false</tt> otherwise
	     */
	    this.isPercentage = function() {
	        return percent;
	    }
	    /**
	     * Sets the modifier values.
	     * @param other the values being cloned
	     */
	    this.set = function(other) {
	        if (other === undefined) {
	            var s = [];
	            s.push("ERROR! EquipmentItemModifier.set() - ");
	            s.push("requires 1 parameters");
	            throw new Error(s.join(""));
	        }
	        if (other === null
	        		|| !(other instanceof EquipmentItemModifier)) {
	            var s = [];
	            s.push("ERROR! EquipmentItemModifier.set() - ");
	            s.push("requires parameter to be other EquipmentItemModifier");
	            throw new Error(s.join(""));
	        }
	        percent = other.isPercentage();
	        special = other.getSpecial();
	        value = other.getValue();
	    }
	    /**
	     * Sets the flag indicating whether the modifier is a percentage modifier.
	     * @param flag the flag
	     */
	    this.setIsPercentage = function(val) {
		    if (val !== undefined
		    		&& val !== null
		    		&& typeof val === "boolean") {
		        percent = val;
		    } else {
	            var s = [];
	            s.push("ERROR! EquipmentItemModifier.setPercentage() - ");
	            s.push("argument must be boolean");
	            throw new Error(s.join(""));
		    }
	    }
	    /**
	     * Sets the special.
	     * @param val the special to set
	     */
	    this.setSpecial = function(val) {
		    if (val !== undefined
		    		&& val !== null
		    		&& !isNaN(val)
		            && parseInt(Number(val)) === val
		            && !isNaN(parseInt(val, 10))) {
		        special = val;
		    } else {
	            var s = [];
	            s.push("ERROR! EquipmentItemModifier.setValue() - ");
	            s.push("argument must be integer");
	            throw new Error(s.join(""));
		    }
	    }
	    /**
	     * Sets the value of modifier to be applied.
	     * @param val the value to set
	     */
	    this.setValue = function(val) {
		    if (val !== undefined
		    		&& val !== null
		    		&& !isNaN(val)
		    		&& typeof val === "number") {
		        value = val;
		    } else {
	            var s = [];
	            s.push("ERROR! EquipmentItemModifier.setValue() - ");
	            s.push("argument must be floating-point");
	            throw new Error(s.join(""));
		    }
	    }
	}
    EquipmentItemModifier.prototype = Object.create(Hashcode.prototype);
	return EquipmentItemModifier;
});
