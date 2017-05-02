/**
 * Die
 * module with no dependencies
 */
define(["com/dalonedrow/utils/hashcode"], function(Hashcode) {
    function Die() {
		Hashcode.call(this);
	    /** the name. */
	    this.name = "";
	    /** the element index. */
	    this.faces = 0;
	    if (arguments.length === 2) {
	    	try {
	    		this.checkString(arguments[0]);
	    	} catch (err) {
	            var s = [];
	            s.push("ERROR! Die() - 1st argument ");
	            s.push(err.message);
	            throw new Error(s.join(""));
	    	}
	    	try {
	    		this.checkInteger(arguments[1]);
	    	} catch (err) {
	            var s = [];
	            s.push("ERROR! Die() - 2nd argument ");
	            s.push(err.message);
	            throw new Error(s.join(""));
	    	}
	    	this.name = arguments[0];
	    	this.faces = arguments[1];
	    } else {
            throw new Error("ERROR! Die.valueOf() - requires 2 arguments");
	    }
	    Die[this.name.toUpperCase()] = this;
	}
    Die.prototype = Object.create(Hashcode.prototype);
    /**
     * Gets the element's code.
     * @return {@link String}
     */
    Die.prototype.getName = function() {
        return this.name;
    }
    /**
     * Gets the element's index.
     * @return {@link int}
     */
    Die.prototype.getFaces = function() {
        return this.faces;
    }
	/** the list of values. */
    Die.values = [];
	/**
	 * Gets the number of values.
	 * @return {@link int}
	 */
    Die.getNumberOfValues = function() {
	    return Die.values.length;
	}
	/**
	 * Gets the {@link Die} value of a specific element name.
	 * @param name the name
	 * @return {@link Die}
	 */
    Die.valueOf = function(name) {
    	if (name === undefined) {
            throw new Error("ERROR! Die.valueOf() - name is undefined");
    	}
    	if (name === null) {
            throw new Error("ERROR! Die.valueOf() - name is null");
    	}
    	if (typeof name !== "string") {
            throw new Error("ERROR! Die.valueOf() - name is not a string");
    	}
	    var value = null;
	    for (var i = Die.values.length - 1; i >= 0; i--) {
	        if (name.toLowerCase() === Die.values[i].getName().toLowerCase()) {
	            value = Die.values[i];
	            break;
	        }
	    }
	    return value;
	}
	return Die;
});
