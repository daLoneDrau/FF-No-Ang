/**
 * FFCommand
 * module with no dependencies
 */
define(["com/dalonedrow/utils/hashcode"], function(Hashcode) {
    function FFCommand() {
		Hashcode.call(this);
	    /** the code. */
	    this.name = "";
	    /** the element index. */
	    this.sortOrder = 0;
	    if (arguments.length === 1) {
	    	this.name = arguments[0];
	    } else if (arguments.length === 2) {
	    	this.name = arguments[0];
	    	this.sortOrder = arguments[1];
	    } else {
	    	throw new Error("Invalid # of arguments");
	    }
	    FFCommand[this.name.toUpperCase()] = this;
	}
    FFCommand.prototype = Object.create(Hashcode.prototype);
    /**
     * Gets the element's code.
     * @return {@link String}
     */
    FFCommand.prototype.getName = function() {
        return this.name;
    }
    /**
     * Gets the element's index.
     * @return {@link int}
     */
    FFCommand.prototype.getSortOrder = function() {
        return this.sortOrder;
    }
	/** the list of values. */
    FFCommand.values = [];
	/**
	 * Gets the number of values.
	 * @return {@link int}
	 */
    FFCommand.getNumberOfValues = function() {
	    return FFCommand.values.length;
	}
	/**
	 * Gets the {@link FFCommand} value of a specific element code.
	 * @param code the code
	 * @return {@link FFCommand}
	 */
    FFCommand.valueOf = function(name) {
	    var value = null;
	    for (var i = FFCommand.values.length - 1; i >= 0; i--) {
	        if (name.toLowerCase() === FFCommand.values[i].getName().toLowerCase()) {
	            value = FFCommand.values[i];
	            break;
	        }
	    }
	    return value;
	}
	return FFCommand;
});
