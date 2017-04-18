/**
 * 
 */
define(["com/dalonedrow/utils/hashcode"], function(Hashcode) {
    function Watchable() {
		Hashcode.call(this);
	    /**
	     * the list of {@link Watcher}s..
	     */
	    var watchers = [];
	    this.addWatcher = function(watcher) {
	        watchers.push(watcher);
	    }
	    this.notifyWatchers = function() {
	        for (var i = 0; i < watchers.length; i++) {
	            watchers[i].watchUpdated(this);
	        }
	    }
	    this.removeWatcher = function(watcher) {
	        var index = watchers.findIndex(this.findHashcode);
	        watchers.splice(index, 1);
	    }    
	}
	Watchable.prototype = Object.create(Hashcode.prototype);
	return Watchable;
});