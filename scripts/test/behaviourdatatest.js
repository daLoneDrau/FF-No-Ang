define(['com/dalonedrow/rpg/base/flyweights/behaviourdata', "test/basetester"], function(
		BehaviourData, BaseTester) {
	function BehaviourDataTest() {
		BaseTester.call(this);
		this.test = function() {
			var o = new BehaviourData();
			this.floatMemberTest(o, "setBehaviorParam", "getBehaviorParam");
			this.intMemberTest(o, "setBehaviour", "getBehaviour");
			this.intMemberTest(o, "setMoveMode", "getMoveMode");
			this.intMemberTest(o, "setTactics", "getTactics");
			this.intMemberTest(o, "setTarget", "getTarget");
			this.booleanMemberTest(o, "Exists");
			console.log("end BehaviourData tests");
		}
	};
	return BehaviourDataTest;
});