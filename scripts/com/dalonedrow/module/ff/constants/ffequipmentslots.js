/**
 * FFEquipmentSlots
 * module with no dependencies
 */
define(["com/dalonedrow/utils/hashcode"], function(Hashcode) {
    function FFEquipmentSlots() {
		Hashcode.call(this);
	    /** the code. */
	    this.code = "";
	    /** the element index. */
	    this.index = 0;
	    if (arguments.length === 1) {
	    	this.code = arguments[0];
	    } else if (arguments.length === 2) {
	    	this.code = arguments[0];
	    	this.index = arguments[1];
	    } else {
	    	throw new Error("Invalid # of arguments");
	    }
	    FFEquipmentSlots[this.code.toUpperCase()] = this;
	}
    FFEquipmentSlots.prototype = Object.create(Hashcode.prototype);
    /**
     * Gets the element's code.
     * @return {@link String}
     */
    FFEquipmentSlots.prototype.getCode = function() {
        return this.code;
    }
    /**
     * Gets the element's index.
     * @return {@link int}
     */
    FFEquipmentSlots.prototype.getIndex = function() {
        return this.index;
    }
	/** the list of values. */
	FFEquipmentSlots.values = [];
	/**
	 * Gets the number of values.
	 * @return {@link int}
	 */
	FFEquipmentSlots.getNumberOfValues = function() {
	    return FFEquipmentSlots.values.length;
	}
	/**
	 * Gets the {@link FFEquipmentSlots} value of a specific element code.
	 * @param code the code
	 * @return {@link FFEquipmentSlots}
	 */
	FFEquipmentSlots.valueOf = function(code) {
	    var value = null;
	    for (var i = FFEquipmentSlots.values.length - 1; i >= 0; i--) {
	        if (code.toLowerCase() === FFEquipmentSlots.values[i].getCode().toLowerCase()) {
	            value = FFEquipmentSlots.values[i];
	            break;
	        }
	    }
	    return value;
	}
	return FFEquipmentSlots;
});
