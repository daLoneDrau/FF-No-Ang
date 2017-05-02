/**
 * 
 */
define(["com/dalonedrow/utils/hashcode"], function(Hashcode) {
    var instance = null;
    var ProjectConstants = function() {
        if (instance !== null){
            throw new Error("Cannot instantiate more than one ProjectConstants, use ProjectConstants.getInstance()");
        }
		Hashcode.call(this);
	}
    ProjectConstants.prototype = Object.create(Hashcode.prototype);
	ProjectConstants.getInstance = function() {
        if (instance === null) {
        	throw new Error("No instance has been set!");
        }
        return instance;
	}
	ProjectConstants.setInstance = function(val) {
		if (val === undefined) {
	        throw new Error("Error!  ProjectConstants.setInstance() - val is undefined");
		}
		if (val === null) {
	        throw new Error("Error!  ProjectConstants.setInstance() - val is null");
		}
		if (!(val instanceof ProjectConstants)) {
	        throw new Error("Error!  ProjectConstants.setInstance() - val is not a ProjectConstants subclass.")
		}
		instance = val;
	}
	return ProjectConstants;
});

