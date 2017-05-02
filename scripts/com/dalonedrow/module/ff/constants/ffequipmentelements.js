/**
 * FFEquipmentElements
 * module with no dependencies
 */
define(["com/dalonedrow/utils/hashcode"], function(Hashcode) {
    function FFEquipmentElements() {
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
	    FFEquipmentElements[this.code.toUpperCase()] = this;
	}
	FFEquipmentElements.prototype = Object.create(Hashcode.prototype);
    /**
     * Gets the element's code.
     * @return {@link String}
     */
	FFEquipmentElements.prototype.getCode = function() {
        return this.code;
    }
    /**
     * Gets the element's index.
     * @return {@link int}
     */
	FFEquipmentElements.prototype.getIndex = function() {
        return this.index;
    }
	/** the list of values. */
	FFEquipmentElements.values = [];
	/**
	 * Gets the number of values.
	 * @return {@link int}
	 */
	FFEquipmentElements.getNumberOfValues = function() {
	    return FFEquipmentElements.values.length;
	}
	/**
	 * Gets the {@link FFEquipmentSlots} value of a specific element code.
	 * @param code the code
	 * @return {@link FFEquipmentSlots}
	 */
	FFEquipmentElements.valueOf = function(code) {
	    var value = null;
	    for (var i = FFEquipmentElements.values.length - 1; i >= 0; i--) {
	        if (code.toLowerCase() === FFEquipmentElements.values[i].getCode().toLowerCase()) {
	            value = FFEquipmentElements.values[i];
	            break;
	        }
	    }
	    return value;
	}
	return FFEquipmentElements;
});
