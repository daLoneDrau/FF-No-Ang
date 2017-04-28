define(["com/dalonedrow/rpg/base/flyweights/baseinteractiveobject",
	"com/dalonedrow/rpg/base/flyweights/inventoryslot", "test/basetester"], function(
			BaseInteractiveObject, InventorySlot, BaseTester) {
	function InventorySlotTest() {
		BaseTester.call(this);
	};
	InventorySlotTest.prototype.test = function() {
		var o = new InventorySlot();
		this.objectMemberTest(o, new BaseInteractiveObject(1), "setIo", "getIo");
		this.booleanMemberTest(o, "IsShow");
		console.log("end InventorySlot tests");
	}
	return InventorySlotTest;
});