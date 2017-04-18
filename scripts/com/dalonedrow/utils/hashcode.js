/**
 * Hashcode constructor.
 */
define(function() {
    function Hashcode() {
		/**
		 * private members
		 */
	    var text = [];
	    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	    do { 
	        for (var i = 8; i > 0; i--) {
	            text.push(possible.charAt(Math.floor(Math.random() * possible.length)));
	        }
	        text = text.join("");
	    } while (Hashcode.codes.indexOf(text) >= 0);
	    Hashcode.codes.push(text);
	    /**
	     * privileged members
	     */
	    this.getHashcode = function() {
	        return text;
	    }
	    this.findHashcode = function(hashcode) {
	    	var ret = false;
	    	if (hashcode instanceof Hashcode) {
	    		ret = hashcode.getHashcode() === text;
	    	}
	        return ret;
	    }
	}
	Hashcode.codes = [];
	return Hashcode;
});