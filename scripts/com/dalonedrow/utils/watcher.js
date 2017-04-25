/**
 * 
 */
define(["com/dalonedrow/utils/hashcode"], function(Hashcode) {
    function Watcher() {
		Hashcode.call(this);
	}
    Watcher.prototype = Object.create(Hashcode.prototype);
	return Watcher;
});
