define(["com/dalonedrow/rpg/base/flyweights/baseinteractiveobject",
	"com/dalonedrow/utils/hashcode"], function(BaseInteractiveObject, Hashcode) {
	/** the singleton instance. */
    var instance = null;
	var Speech = function() {
        if (instance !== null){
            throw new Error("Cannot instantiate more than one Speech instance, use Speech.getInstance()");
        }
		Hashcode.call(this);		
	}
	Speech.prototype = Object.create(Hashcode.prototype);
	Speech.getInstance = function() {
        if (instance === null) {
        	throw new Error("No instance has been set!");
        }
        return instance;
	}
	Speech.setInstance = function(val) {
		if (val === undefined) {
	        throw new Error("Error!  Speech.setInstance() - val is undefined");
		}
		if (val === null) {
	        throw new Error("Error!  Speech.setInstance() - val is null");
		}
		if (!(val instanceof Speech)) {
	        throw new Error("Error!  Speech.setInstance() - val is not a Speech subclass.")
		}
		instance = val;
	}
	return Speech;
});
