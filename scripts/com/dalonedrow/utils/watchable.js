/**
 * 
 */
define(["com/dalonedrow/utils/hashcode", "com/dalonedrow/utils/watcher"], function(Hashcode,
		Watcher) {
    function Watchable() {
		Hashcode.call(this);
	    /**
	     * the list of {@link Watcher}s.
	     */
	    this.watchers = [];
	}
	Watchable.prototype = Object.create(Hashcode.prototype);
	Watchable.prototype.addWatcher = function(val) {
	    if (val !== undefined
	    		&& val !== null
	    		&& val instanceof Watcher) {
	    	this.watchers.push(val);
	    } else {
            var s = [];
            s.push("ERROR! Watchable.addWatcher() - ");
            s.push("argument must be Watcher");
            throw new Error(s.join(""));
	    }
    }
	Watchable.prototype.notifyWatchers = function() {
        for (var i = 0; i < this.watchers.length; i++) {
        	this.watchers[i].watchUpdated(this);
        }
    }
	Watchable.prototype.removeWatcher = function(val) {
	    if (val !== undefined
	    		&& val !== null
	    		&& val instanceof Watcher) {
	        var index = this.watchers.findIndex(val.findHashcode);
	        this.watchers.splice(index, 1);
	    } else {
            var s = [];
            s.push("ERROR! Watchable.addWatcher() - ");
            s.push("argument must be Watcher");
            throw new Error(s.join(""));
	    }
    }
	return Watchable;
});