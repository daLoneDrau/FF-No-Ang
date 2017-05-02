/**
 * 
 */
define(["com/dalonedrow/utils/hashcode"], function(Hashcode) {
    function IOPathfind() {
	    this.flags = 0;
	    this.listnb = 0; 
	    this.list = null;  
	    this.listPosition = 0;
	    this.pathwait = 0;
	    this.truetarget = 0;
    }
    IOPathfind.prototype = Object.create(Hashcode.prototype);
    /**
     * Adds a flag.
     * @param flag the flag
     */
    IOPathfind.prototype.addFlag = function(flag) {
    	try {
    		this.checkPowerOfTwo(flag);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IOPathfind.addFlag() - flag ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	this.flags |= flag;
    }
    IOPathfind.prototype.clearFlags = function() {
    	this.flags = 0;
    }
    IOPathfind.prototype.getListItem = function(index) {
    	try {
    		this.checkInteger(index);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IOPathfind.getListItem() - index ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        return this.list[index];
    }
    /**
     * @return the listnb
     */
    IOPathfind.prototype.getListnb = function() {
        return this.listnb;
    }
    /**
     * @return the listPosition
     */
    IOPathfind.prototype.getListPosition = function() {
        return this.listPosition;
    }
    /**
     * @return the pathwait
     */
    IOPathfind.prototype.getPathwait = function() {
        return this.pathwait;
    }
    /**
     * @return the truetarget
     */
    IOPathfind.prototype.getTruetarget = function() {
        return this.truetarget;
    }
    /**
     * Determines if the {@link BaseInteractiveObject} has a specific flag.
     * @param flag the flag
     * @return true if the {@link BaseInteractiveObject} has the flag; false
     *         otherwise
     */
    IOPathfind.prototype.hasFlag = function(flag) {
    	try {
    		this.checkPowerOfTwo(flag);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IOPathfind.hasFlag() - flag ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        return (this.flags & flag) == flag;
    }
    IOPathfind.prototype.hasList = function() {
        return this.list != null;
    }
    /**
     * Removes a flag.
     * @param flag the flag
     */
    IOPathfind.prototype.removeFlag = function(flag) {
    	try {
    		this.checkPowerOfTwo(flag);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IOPathfind.removeFlag() - flag ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	this.flags &= ~flag;
    }
    /**
     * @param listnb the listnb to set
     */
    IOPathfind.prototype.setListnb = function(listnb) {
    	try {
			this.checkInteger(listnb);
		} catch (err) {
	        var s = [];
	        s.push("ERROR! IOPathfind.setListnb() - listnb ");
	        s.push(err.message);
	        throw new Error(s.join(""));
		}
        this.listnb = listnb;
    }
    /**
     * @param listPosition the listPosition to set
     */
    IOPathfind.prototype.setListPosition = function(listPosition) {
    	try {
			this.checkInteger(listPosition);
		} catch (err) {
	        var s = [];
	        s.push("ERROR! IOPathfind.setListPosition() - listPosition ");
	        s.push(err.message);
	        throw new Error(s.join(""));
		}
        this.listPosition = listPosition;
    }
    /**
     * @param pathwait the pathwait to set
     */
    IOPathfind.prototype.setPathwait = function(pathwait) {
    	try {
			this.checkInteger(pathwait);
		} catch (err) {
	        var s = [];
	        s.push("ERROR! IOPathfind.setPathwait() - pathwait ");
	        s.push(err.message);
	        throw new Error(s.join(""));
		}
        this.pathwait = pathwait;
    }
    /**
     * @param truetarget the truetarget to set
     */
    IOPathfind.prototype.setTruetarget = function(truetarget) {
    	try {
			this.checkInteger(truetarget);
		} catch (err) {
	        var s = [];
	        s.push("ERROR! IOPathfind.setTruetarget() - truetarget ");
	        s.push(err.message);
	        throw new Error(s.join(""));
		}
        this.truetarget = truetarget;
    }
	return IOPathfind;
});
