define(['com/dalonedrow/rpg/base/flyweights/equipmentitemmodifier', "test/basetester"],
		function(EquipmentItemModifier, BaseTester) {
	function EquipmentItemModifierTest() {
		BaseTester.call(this);
		this.test = function() {
			var o = new EquipmentItemModifier();
			this.intMemberTest(o, "setSpecial", "getSpecial");
			this.floatMemberTest(o, "setValue", "getValue");
			this.booleanMemberTest(o, "IsPercentage");	
		}
	};
	return EquipmentItemModifierTest;
});