define(['com/dalonedrow/rpg/base/flyweights/behaviourparameters', "test/basetester"],
		function(BehaviorParameters, BaseTester) {
	function BehaviorParametersTest() {
		BaseTester.call(this);
		this.test = function() {
			try {
				new BehaviorParameters();
				console.error("able to create with 2 undefineds");
			} catch (err) { }
			try {
				new BehaviorParameters("STACK GO_HOME");
				console.error("able to create with 1 undefined");
			} catch (err) { }
			try {
				new BehaviorParameters(null, null);
				console.error("able to create with 2 nulls");
			} catch (err) { }
			try {
				new BehaviorParameters(null, 0.5);
				console.error("able to create with null initParams");
			} catch (err) { }
			try {
				new BehaviorParameters({}, 0.5);
				console.error("able to create with object initParams");
			} catch (err) { }
			try {
				new BehaviorParameters(1, 0.5);
				console.error("able to create with int initParams");
			} catch (err) { }
			try {
				new BehaviorParameters(0.5, 0.5);
				console.error("able to create with float initParams");
			} catch (err) { }
			try {
				new BehaviorParameters(true, 0.5);
				console.error("able to create with boolean initParams");
			} catch (err) { }
			try {
				new BehaviorParameters("STACK GO_HOME", null);
				console.error("able to create with null bParam");
			} catch (err) { }
			try {
				new BehaviorParameters("STACK GO_HOME", {});
				console.error("able to create with object bParam");
			} catch (err) { }
			try {
				new BehaviorParameters("STACK GO_HOME", true);
				console.error("able to create with boolean bParam");
			} catch (err) { }
			var o = new BehaviorParameters("STACK GO_HOME", 1);
			this.flagTest(o, "Flag");
			this.stringMemberTest(o, "setAction", "getAction", true);
			this.intMemberTest(o, "setMoveMode", "getMoveMode");
			this.stringMemberTest(o, "setTargetName", "getTargetName", true);
			this.intMemberTest(o, "setTactics", "getTactics");
			this.intMemberTest(o, "setTargetInfo", "getTargetInfo");
		}
	};
	return BehaviorParametersTest;
});