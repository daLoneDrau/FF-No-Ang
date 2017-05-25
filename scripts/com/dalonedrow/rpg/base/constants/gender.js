/**
 * FFCommand
 * module with no dependencies
 */
define(["com/dalonedrow/utils/hashcode"], function(Hashcode) {
    function Gender() {
		Hashcode.call(this);
	    /** the description. */
	    this.description = "";
	    /** the name. */
	    this.name = "";
	    /** the objective. */
	    this.objective = "";
	    /** the subjective. */
	    this.subjective = "";
	    /** the dependentPossessive. */
	    this.dependentPossessive = "";
	    /** the independentPossessive. */
	    this.independentPossessive = "";
	    /** the reflexive. */
	    this.reflexive = "";
	    /** the genderOffspring. */
	    this.genderOffspring = "";
	    /** the genderParent. */
	    this.genderParent = "";
	    if (arguments.length !== 9) {
	    	throw new Error("Invalid # of arguments");
	    }
	    this.description = arguments[0];
	    this.name = arguments[1];
	    this.objective = arguments[2];
	    this.subjective = arguments[3];
	    this.dependentPossessive = arguments[4];
	    this.independentPossessive = arguments[5];
	    this.reflexive = arguments[6];
	    this.genderOffspring = arguments[0];
	    this.genderParent = arguments[0];
	    Gender[this.name.toUpperCase()] = this;
	}
    Gender.prototype = Object.create(Hashcode.prototype);
	/** the list of values. */
    Gender.values = [];
	/**
	 * Gets the number of values.
	 * @return {@link int}
	 */
    Gender.getNumberOfValues = function() {
	    return Gender.values.length;
	}
	/**
	 * Gets the {@link Gender} value of a specific element code.
	 * @param code the code
	 * @return {@link Gender}
	 */
    Gender.valueOf = function(name) {
	    var value = null;
	    for (var i = Gender.values.length - 1; i >= 0; i--) {
	        if (name.toLowerCase() === FFCommand.values[i].getName().toLowerCase()) {
	            value = Gender.values[i];
	            break;
	        }
	    }
	    return value;
	}
	return Gender;
});
