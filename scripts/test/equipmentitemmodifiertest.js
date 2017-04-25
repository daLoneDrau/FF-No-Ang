define(['com/dalonedrow/rpg/base/flyweights/equipmentitemmodifier', "test/basetester"],
		function(EquipmentItemModifier, BaseTester) {
	function EquipmentItemModifierTest() {
		BaseTester.call(this);
		this.test = function() {
			var o = new EquipmentItemModifier();
			this.intMemberTest(o, "setSpecial", "getSpecial");
			this.floatMemberTest(o, "setValue", "getValue");
			this.booleanMemberTest(o, "IsPercentage");
			var o2 = new EquipmentItemModifier();
			o.setValue(4);
			o.setIsPercentage(true);
			try {
				o2.set()
				console.error(["can set with undefined"].join(""));
			} catch (err) { }
			try {
				o2.set(null)
				console.error(["can set with null"].join(""));
			} catch (err) { }
			try {
				o2.set({})
				console.error(["can set with object"].join(""));
			} catch (err) { }
			try {
				o2.set(1)
				console.error(["can set with number"].join(""));
			} catch (err) { }
			try {
				o2.set("test")
				console.error(["can set with string"].join(""));
			} catch (err) { }
			try {
				o2.set(true)
				console.error(["can set with boolean"].join(""));
			} catch (err) { }
			if (o2.getValue() !== 0) {
				console.error("initialized with wrong value - " + o2.getValue());
			}
			if (o2.isPercentage()) {
				console.error("initialized with wrong percentage flag");
			}
			o2.set(o);
			if (o2.getValue() !== o.getValue()) {
				console.error("did not set value");
			}
			if (o2.isPercentage() !== o.isPercentage()) {
				console.error("did not set percentage flag");
			}
			console.log("end EquipmentItemModifier tests");
		}
	};
	return EquipmentItemModifierTest;
});