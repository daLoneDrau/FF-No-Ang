define(["com/dalonedrow/rpg/base/flyweights/baseinteractiveobject",
	"com/dalonedrow/rpg/base/flyweights/ScriptTimer", "test/basetester"], function(
			BaseInteractiveObject, ScriptTimer, BaseTester) {
	function ScriptTimerTest() {
		BaseTester.call(this);
		this.test = function() {
			var o = new ScriptTimer();
			this.stringMemberTest(o, "setEventname", "getEventname", true);
			this.booleanMemberTest(o, "Exists");
			this.objectMemberTest(o, new BaseInteractiveObject(1), "setIo", "getIo", true);
			this.intMemberTest(o, "setMsg", "getMsg");
			this.objectMemberTest(o, [], "setParams", "getParams");
			this.objectMemberTest(o, new BaseInteractiveObject(2), "setSender", "getSender", true);
			console.log("end StackedEvent tests");
		}
	};
	return ScriptTimerTest;
});