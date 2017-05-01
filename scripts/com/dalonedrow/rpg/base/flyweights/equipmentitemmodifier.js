/**
 * 
 */
define(["com/dalonedrow/utils/hashcode"], function(Hashcode) {
    function EquipmentItemModifier() {
		Hashcode.call(this);
	    /** the flag indicating whether the modifier is a percentage modifier. */
	    this.percent = false;
	    /** not used. yet. */
	    this.special = 0;
	    /** the value of modifier to be applied. */
	    this.value = 0.0;
	}
    EquipmentItemModifier.prototype = Object.create(Hashcode.prototype);
    /** Clears all data. */
    EquipmentItemModifier.prototype.clearData = function() {
    	this.percent = false;
    	this.special = 0;
    	this.value = 0;
    }
    /**
     * Gets the special.
     * @return int
     */
    EquipmentItemModifier.prototype.getSpecial = function() {
        return this.special;
    }
    /**
     * Gets the value of modifier to be applied.
     * @return float
     */
    EquipmentItemModifier.prototype.getValue = function() {
        return this.value;
    }
    /**
     * Determines if the {@link EquipmentItemModifier} is a percentage modifier.
     * @return <tt>true</tt> if the {@link EquipmentItemModifier} is a
     *         percentage modifier; <tt>false</tt> otherwise
     */
    EquipmentItemModifier.prototype.isPercentage = function() {
        return this.percent;
    }
    /**
     * Sets the modifier values.
     * @param other the values being cloned
     */
    EquipmentItemModifier.prototype.set = function(other) {
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
        this.percent = other.isPercentage();
        this.special = other.getSpecial();
        this.value = other.getValue();
    }
    /**
     * Sets the flag indicating whether the modifier is a percentage modifier.
     * @param flag the flag
     */
    EquipmentItemModifier.prototype.setIsPercentage = function(val) {
	    if (val !== undefined
	    		&& val !== null
	    		&& typeof val === "boolean") {
	    	this.percent = val;
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
    EquipmentItemModifier.prototype.setSpecial = function(val) {
	    if (val !== undefined
	    		&& val !== null
	    		&& !isNaN(val)
	            && parseInt(Number(val)) === val
	            && !isNaN(parseInt(val, 10))) {
	    	this.special = val;
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
    EquipmentItemModifier.prototype.setValue = function(val) {
	    if (val !== undefined
	    		&& val !== null
	    		&& !isNaN(val)
	    		&& typeof val === "number") {
	    	this.value = val;
	    } else {
            var s = [];
            s.push("ERROR! EquipmentItemModifier.setValue() - ");
            s.push("argument must be floating-point");
            throw new Error(s.join(""));
	    }
    }
	return EquipmentItemModifier;
});
