define(['com/dalonedrow/rpg/base/flyweights/targetparameters', "test/basetester"], function(
		TargetParameters, BaseTester) {
	function TargetParametersTest() {
		BaseTester.call(this);
		this.test = function() {
			try {
				new TargetParameters();
				console.error("able to create with undefined");
			} catch (err) { }
			try {
				new TargetParameters(null);
				console.error("able to create with null");
			} catch (err) { }
			try {
				new TargetParameters({});
				console.error("able to create with object");
			} catch (err) { }
			try {
				new TargetParameters(1);
				console.error("able to create with int");
			} catch (err) { }
			try {
				new TargetParameters(0.5);
				console.error("able to create with float");
			} catch (err) { }
			try {
				new TargetParameters(true);
				console.error("able to create with boolean");
			} catch (err) { }
			var o = new TargetParameters("NONE");
			this.flagTest(o, "Flag");
			this.intMemberTest(o, "setTargetInfo", "getTargetInfo");
			console.log("end TargetParameters tests");
		}
	};
	return TargetParametersTest;
});