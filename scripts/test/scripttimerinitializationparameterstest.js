define(["com/dalonedrow/rpg/base/flyweights/baseinteractiveobject",
	"com/dalonedrow/rpg/base/flyweights/ScriptTimerInitializationParameters", "test/basetester"], function(
			BaseInteractiveObject, ScriptTimerInitializationParameters, BaseTester) {
	function ScriptTimerInitializationParametersTest() {
		BaseTester.call(this);
		this.test = function() {
			var o = new ScriptTimerInitializationParameters();
			this.objectMemberTest(o, [], "setArgs", "getArgs", true);
			this.intMemberTest(o, "setFlagValues", "getFlagValues");
			this.objectMemberTest(o, new BaseInteractiveObject(1), "setIo", "getIo", true);
			this.stringMemberTest(o, "setMethod", "getMethod", true);
			this.intMemberTest(o, "setMilliseconds", "getMilliseconds");
			this.stringMemberTest(o, "setName", "getName", true);
			this.intMemberTest(o, "setRepeatTimes", "getRepeatTimes");
			this.objectMemberTest(o, "com/dalonedrow/rpg/base/flyweights/scriptable", "setScript",
					"getScript", true);
			this.intMemberTest(o, "setStartTime", "getStartTime");
			console.log("end ScriptTimerInitializationParameters tests");
		}
	};
	return ScriptTimerInitializationParametersTest;
});