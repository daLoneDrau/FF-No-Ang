define(["com/dalonedrow/rpg/base/flyweights/baseinteractiveobject",
	"com/dalonedrow/rpg/base/flyweights/scriptable",
	"com/dalonedrow/rpg/base/flyweights/scriptTimer",
	"com/dalonedrow/rpg/base/flyweights/scripttimeraction", 
	"com/dalonedrow/rpg/base/flyweights/scripttimerinitializationparameters","test/basetester"],
	function(BaseInteractiveObject, Scriptable, ScriptTimer, ScriptTimerAction,
			ScriptTimerInitializationParameters, BaseTester) {
	function ScriptTimerTest() {
		BaseTester.call(this);
		this.test = function() {
			var o = new ScriptTimer();
			this.flagTest(o, "Flag");
			var x = 0;
			var t = {};
			t.add = function() {
				x += parseInt(arguments[0]);
			};
			this.objectMemberTest(o, new ScriptTimerAction(t, "add", 2), "setAction", "getAction");
			this.intMemberTest(o, "setCycleLength", "getCycleLength");
			this.booleanMemberTest(o, "Exists");
			this.objectMemberTest(o, new BaseInteractiveObject(1), "setIo", "getIo");
			this.intMemberTest(o, "setLonginfo", "getLonginfo");
			this.stringMemberTest(o, "setName", "getName");
			this.objectMemberTest(o, "com/dalonedrow/rpg/base/flyweights/scriptable", "setScript",
					"getScript");
			this.intMemberTest(o, "setLastTimeCheck", "getLastTimeCheck");
			this.intMemberTest(o, "setRepeatTimes", "getRepeatTimes");
			this.booleanMemberTest(o, "IsTurnBased");
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
			var p = new ScriptTimerInitializationParameters();
			p.setObj(t);
			p.setMethod("add");
			p.setArgs([2]);
			o.set(p);
			o.getAction().process();
			if (x !== 2) {
				console.error("did not process as expected");
			}
			console.log("end ScriptTimer tests");
		}
	};
	return ScriptTimerTest;
});