define(["com/dalonedrow/rpg/base/flyweights/baseinteractiveobject",
	"com/dalonedrow/rpg/base/flyweights/ScriptTimerAction", "test/basetester"], function(
			BaseInteractiveObject, ScriptTimerAction, BaseTester) {
	function ScriptTimerActionTest() {
		BaseTester.call(this);
		this.test = function() {
			try {
				new ScriptTimerAction();
				console.error("can create with no parameters");
			} catch (err) { }
			try {
				new ScriptTimerAction(t);
				console.error("can create with 1 parameters");
			} catch (err) { }
			try {
				new ScriptTimerAction(t, "add");
				console.error("can create with 2 parameters");
			} catch (err) { }
			var x = 0;
			var t = {};
			t.add = function(v) {
				x += v;
			};
			var o = new ScriptTimerAction(t, "add", 2);
			o.process();
			if (x !== 2) {
				console.error("process did not fire correctly");
			}
			var m = {};
			m.add = function(v) {
				x += v * 2;
			};
			var o2 = new ScriptTimerAction(m, "add", 2);
			try {
				o.set();
				console.error("can set with no parameters");
			} catch (err) { }
			try {
				o.set(null);
				console.error("can set with null");
			} catch (err) { }
			try {
				o.set({});
				console.error("can set with object");
			} catch (err) { }
			try {
				o.set([]);
				console.error("can set with array");
			} catch (err) { }
			try {
				o.set("test");
				console.error("can set with string");
			} catch (err) { }
			try {
				o.set(1);
				console.error("can set with number");
			} catch (err) { }
			try {
				o.set(true);
				console.error("can set with boolean");
			} catch (err) { }
			o.set(o2);
			o.process();
			if (x !== 6) {
				console.error("process did not fire correctly");
			}
			try {
				o.set(null, null);
				console.error("can set with 2 nulls");
			} catch (err) { }
			try {
				o.set(t, "add");
				console.error("can set with 2 parameters");
			} catch (err) { }
			o.set(t, "add", 2);
			o.process();
			if (x !== 8) {
				console.error("process did not fire correctly");
			}
			console.log("end ScriptTimerAction tests");
		}
	};
	return ScriptTimerActionTest;
});