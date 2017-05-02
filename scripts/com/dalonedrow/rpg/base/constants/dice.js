/**
 * Dice
 */
define(["com/dalonedrow/rpg/base/constants/die", "com/dalonedrow/utils/hashcode"],
		function(Die, Hashcode) {
    function Dice() {
		Hashcode.call(this);
	    /** the code. */
	    this.code = "";
	    /** the die being rolled. */
	    this.die = null;
	    /** the number of die being rolled. */
	    this.number = 0;
	    /** the number of die being rolled. */
	    this.plus = 0;
	    if (arguments.length === 3
	    		|| arguments.length === 4) {
	    	try {
	    		this.checkString(arguments[0]);
	    	} catch (err) {
	            var s = [];
	            s.push("ERROR! Dice() - 1st argument ");
	            s.push(err.message);
	            throw new Error(s.join(""));
	    	}
	    	try {
	    		this.checkInteger(arguments[1]);
	    	} catch (err) {
	            var s = [];
	            s.push("ERROR! Dice() - 2nd argument ");
	            s.push(err.message);
	            throw new Error(s.join(""));
	    	}
	    	try {
	    		this.checkInstanceOf(arguments[2], Die);
	    	} catch (err) {
	            var s = [];
	            s.push("ERROR! Dice() - 3rd argument ");
	            s.push(err.message);
	            throw new Error(s.join(""));
	    	}
	    	this.code = arguments[0];
	    	this.number = arguments[1];
	    	this.die = arguments[2];
	    	if (arguments.length === 4
	    			&& arguments[3] !== undefined) {
		    	try {
		    		this.checkInteger(arguments[3]);
		    	} catch (err) {
		            var s = [];
		            s.push("ERROR! Dice() - 4th argument ");
		            s.push(err.message);
		            throw new Error(s.join(""));
		    	}
		    	this.plus = arguments[3];
	    	}
	    } else {
            throw new Error("ERROR! Dice.valueOf() - requires 3 or 4 arguments");
	    }
	    Dice[this.code.toUpperCase()] = this;
	}
    Dice.prototype = Object.create(Hashcode.prototype);
    /**
     * Gets the element's code.
     * @return {@link String}
     */
    Dice.prototype.getCode = function() {
        return this.code;
    }
    /**
     * Gets the element's code.
     * @return {@link String}
     */
    Dice.prototype.getDie = function() {
        return this.die;
    }
    /**
     * Gets the element's index.
     * @return {@link int}
     */
    Dice.prototype.getNumber = function() {
        return this.number;
    }
    /**
     * Rolls the dice.
     * @return {@link int}
     */
    Dice.prototype.roll = function() {
    	var roll = 0;
    	for (var i = this.number - 1; i >= 0; i--) {
    		roll += Math.floor(Math.random() * this.die.faces) + 1;
    	}
    	roll += this.plus;
        return roll;
    }
	/** the list of values. */
    Dice.values = [];
	/**
	 * Gets the number of values.
	 * @return {@link int}
	 */
    Dice.getNumberOfValues = function() {
	    return Dice.values.length;
	}
	/**
	 * Gets the {@link Dice} value of a specific element code.
	 * @param code the code
	 * @return {@link Dice}
	 */
    Dice.valueOf = function(code) {
    	if (code === undefined) {
            throw new Error("ERROR! Die.valueOf() - code is undefined");
    	}
    	if (code === null) {
            throw new Error("ERROR! Die.valueOf() - code is null");
    	}
    	if (typeof code !== "string") {
            throw new Error("ERROR! Die.valueOf() - code is not a string");
    	}
	    var value = null;
	    for (var i = Dice.values.length - 1; i >= 0; i--) {
	        if (code.toLowerCase() === Dice.values[i].getCode().toLowerCase()) {
	            value = Dice.values[i];
	            break;
	        }
	    }
	    return value;
	}
	return Dice;
});
