define(["com/dalonedrow/utils/watchable", "com/dalonedrow/utils/watcher", "test/basetester"],
		function(Watchable, Watcher, BaseTester) {
	function WatchTest() {
		BaseTester.call(this);
		this.test = function() {
			var watchable = new Watchable();
			var watcher1 = new Watcher();
			var watcher2 = new Watcher();
			var watchVal1 = 0, watchVal2 = 10;
			watcher1.watchUpdated = function(w) {
				console.log(w.getHashcode());
				watchVal1++;
			}
			watcher2.watchUpdated = function(w) {
				console.log(w.getHashcode());
				watchVal2++;
			}
			try {
				watchable.addWatcher();
				console.error("can addWatcher with undefined");
			} catch (err) { }
			try {
				watchable.addWatcher(null);
				console.error("can addWatcher with null");
			} catch (err) { }
			try {
				watchable.addWatcher({});
				console.error("can addWatcher with object");
			} catch (err) { }
			try {
				watchable.addWatcher(1.5);
				console.error("can addWatcher with number");
			} catch (err) { }
			try {
				watchable.addWatcher("test");
				console.error("can addWatcher with string");
			} catch (err) { }
			try {
				watchable.addWatcher(true);
				console.error("can addWatcher with boolean");
			} catch (err) { }
			watchable.addWatcher(watcher1);
			watchable.addWatcher(watcher2);
			watchable.notifyWatchers();
			if (watchVal1 !== 1) {
				console.error("watchable1 not notified");
			}
			if (watchVal2 !== 11) {
				console.error("watchable2 not notified");
			}
			try {
				watchable.removeWatcher();
				console.error("can removeWatcher with undefined");
			} catch (err) { }
			try {
				watchable.removeWatcher(null);
				console.error("can removeWatcher with null");
			} catch (err) { }
			try {
				watchable.removeWatcher({});
				console.error("can removeWatcher with object");
			} catch (err) { }
			try {
				watchable.removeWatcher(1.5);
				console.error("can removeWatcher with number");
			} catch (err) { }
			try {
				watchable.removeWatcher("test");
				console.error("can removeWatcher with string");
			} catch (err) { }
			try {
				watchable.removeWatcher(true);
				console.error("can removeWatcher with boolean");
			} catch (err) { }
			watchable.removeWatcher(watcher2);
			watchable.notifyWatchers();
			if (watchVal1 !== 2) {
				console.error("watchable1 not notified");
			}
			if (watchVal2 !== 11) {
				console.error("watchable2 was notified");
			}
			console.log("end watchable/watcher tests");
		}
	};
	return WatchTest;
});