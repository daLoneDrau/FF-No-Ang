/**
 * Hashcode constructor.
 */
define(function() {
    function Hashcode() {
		/**
		 * private members
		 */
	    this.text = [];
	    this.possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	    do { 
	        for (var i = 8; i > 0; i--) {
	        	this.text.push(this.possible.charAt(Math.floor(Math.random() * this.possible.length)));
	        }
	        this.text = this.text.join("");
	    } while (Hashcode.codes.indexOf(this.text) >= 0);
	    Hashcode.codes.push(this.text);
	}
	Hashcode.codes = [];
    /**
     * privileged members
     */
	Hashcode.prototype.getHashcode = function() {
        return this.text;
    };
	Hashcode.prototype.findHashcode = function(hashcode) {
    	var ret = false;
    	if (hashcode instanceof Hashcode) {
    		ret = hashcode.getHashcode() === this.text;
    	}
        return ret;
    };
	Hashcode.prototype.checkArray = function(val) {
		if (val === undefined) {
	        throw new Error("is undefined");
		}
		if (val === null) {
	        throw new Error("is null");
		}
	    if (!Array.isArray(val)) {
	        throw new Error("is not an Array");
	    }
	};
	Hashcode.prototype.checkArrayNullsAllowed = function(val) {
	    if (val === undefined) {
	        throw new Error("is undefined");
	    }
	    if (val !== null
	    		&& !Array.isArray(val)) {
	        throw new Error("is not an Array");
	    }
	};
	Hashcode.prototype.checkBoolean = function(val) {
		if (val === undefined) {
	        throw new Error("is undefined");
		}
		if (val === null) {
	        throw new Error("is null");
		}
	    if (typeof val !== "boolean") {
	        throw new Error("is not a boolean");
	    }
	};
	Hashcode.prototype.checkFloat = function(val) {
		if (val === undefined) {
	        throw new Error("is undefined");
		}
		if (val === null) {
	        throw new Error("is null");
		}
		if (isNaN(val)) {
	        throw new Error("is not a number");
		}
		if (typeof val !== "number") {
	        throw new Error("is not a number type");
		}
	};
	Hashcode.prototype.checkInstanceOf = function(val, type) {
		if (val === undefined) {
	        throw new Error("is undefined");
		}
		if (val === null) {
	        throw new Error("is null");
		}
		if (!(val instanceof type)) {
	        throw new Error("is not an instance of " + type);
		}
	};
	Hashcode.prototype.checkInstanceOfNullsAllowed = function(val, type) {
		if (val === undefined) {
	        throw new Error("is undefined");
		}
		if (val !== null
				&& !(val instanceof type)) {
	        throw new Error("is not an instance of " + type);
		}
	};
	Hashcode.prototype.checkInteger = function(val) {
		if (val === undefined) {
	        throw new Error("is undefined");
		}
		if (val === null) {
	        throw new Error("is null");
		}
		if (isNaN(val)) {
	        throw new Error("is not a number");
		}
		if (parseInt(Number(val)) !== val) {
	        throw new Error("is not an integer type");
		}
		if (isNaN(parseInt(val, 10))) {
	        throw new Error("is a long integer type");
		}
	};
	Hashcode.prototype.checkPowerOfTwo = function(flag) {
		if (flag === undefined) {
	        throw new Error("is undefined");
		}
		if (flag === null) {
	        throw new Error("is null");
		}
		if (isNaN(flag)) {
	        throw new Error("is not a number");
		}
		if (parseInt(Number(flag)) !== flag) {
	        throw new Error("is not an integer type");
		}
		if (flag && (flag & (flag - 1)) !== 0) {
	        throw new Error("is a not a power of two");
		}
	};
	Hashcode.prototype.checkString = function(val) {
		if (val === undefined) {
	        throw new Error("is undefined");
		}
		if (val === null) {
	        throw new Error("is null");
		}
		if (typeof val !== "string") {
	        throw new Error("is not a string");
		}
	};
	Hashcode.prototype.checkStringNullsAllowed = function(val) {
		if (val === undefined) {
	        throw new Error("is undefined");
		}
		if (val !== null
				&& typeof val !== "string") {
	        throw new Error("is not a string");
		}
	};
	return Hashcode;
});