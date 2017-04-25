/**
 * 
 */
define(["com/dalonedrow/utils/hashcode", "com/dalonedrow/utils/watcher"], function(Hashcode,
		Watcher) {
    function Watchable() {
		Hashcode.call(this);
	    /**
	     * the list of {@link Watcher}s..
	     */
	    var watchers = [];
	    this.addWatcher = function(val) {
		    if (val !== undefined
		    		&& val !== null
		    		&& val instanceof Watcher) {
		        watchers.push(val);
		    } else {
	            var s = [];
	            s.push("ERROR! Watchable.addWatcher() - ");
	            s.push("argument must be Watcher");
	            throw new Error(s.join(""));
		    }
	    }
	    this.notifyWatchers = function() {
	        for (var i = 0; i < watchers.length; i++) {
	            watchers[i].watchUpdated(this);
	        }
	    }
	    this.removeWatcher = function(val) {
		    if (val !== undefined
		    		&& val !== null
		    		&& val instanceof Watcher) {
		        var index = watchers.findIndex(val.findHashcode);
		        watchers.splice(index, 1);
		    } else {
	            var s = [];
	            s.push("ERROR! Watchable.addWatcher() - ");
	            s.push("argument must be Watcher");
	            throw new Error(s.join(""));
		    }
	    }    
	}
	Watchable.prototype = Object.create(Hashcode.prototype);
	return Watchable;
});