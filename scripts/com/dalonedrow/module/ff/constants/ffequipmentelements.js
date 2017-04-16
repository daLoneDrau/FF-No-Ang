/**
 * FFEquipmentElements
 * module with no dependencies
 */
define(function() {
	function FFEquipmentElements() {
	    /** the code. */
	    var code = "";
	    /** the element index. */
	    var index = 0;
	    if (arguments.length === 1) {
	    	code = arguments[0];
	    } else if (arguments.length === 2) {
	    	code = arguments[0];
	    	index = arguments[1];
	    } else {
	    	throw new Error("Invalid # of arguments");
	    }
	    /**
	     * Gets the element's code.
	     * @return {@link String}
	     */
	    this.getCode = function() {
	        return code;
	    }
	    /**
	     * Gets the element's index.
	     * @return {@link int}
	     */
	    this.getIndex = function() {
	        return index;
	    }
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
