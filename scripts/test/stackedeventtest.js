define(["com/dalonedrow/rpg/base/flyweights/baseinteractiveobject",
	"com/dalonedrow/rpg/base/flyweights/stackedevent", "test/basetester"], function(
			BaseInteractiveObject, StackedEvent, BaseTester) {
	function StackedEventTest() {
		BaseTester.call(this);
		this.test = function() {
			var o = new StackedEvent();
			this.stringMemberTest(o, "setEventname", "getEventname", true);
			this.booleanMemberTest(o, "Exists");
			this.objectMemberTest(o, new BaseInteractiveObject(1), "setIo", "getIo", true);
			this.intMemberTest(o, "setMsg", "getMsg");
			this.objectMemberTest(o, [], "setParams", "getParams");
			this.objectMemberTest(o, new BaseInteractiveObject(2), "setSender", "getSender", true);
			console.log("end StackedEvent tests");
		}
	};
	return StackedEventTest;
});