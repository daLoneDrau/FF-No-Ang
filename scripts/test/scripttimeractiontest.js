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
			console.log("end ScriptTimerAction tests");
		}
	};
	return ScriptTimerActionTest;
});