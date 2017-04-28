define(["com/dalonedrow/rpg/base/flyweights/baseinteractiveobject",
	"com/dalonedrow/rpg/base/flyweights/inventorydata",
	"com/dalonedrow/rpg/base/flyweights/inventoryslot", "test/basetester"], function(
			BaseInteractiveObject, InventoryData, InventorySlot, BaseTester) {
	function InventoryDataTest() {
		BaseTester.call(this);
	};
	InventoryDataTest.prototype.test = function() {
		var o = new InventoryData();
		this.objectMemberTest(o, new BaseInteractiveObject(1), "setIo", "getIo");
		this.booleanMemberTest(o, "IsLeftRing");
		try {
			o.getNumInventorySlots();
			console.err("can getNumInventorySlots before setting");
		} catch (err) { }
		try {
			o.getSlot(0);
			console.err("can getSlot before setting");
		} catch (err) { }
		try {
			o.setSlots();
			console.err("can setSlots with undefined");
		} catch (err) { }
		try {
			o.setSlots(null);
			console.err("can setSlots with null");
		} catch (err) { }
		try {
			o.setSlots({});
			console.err("can setSlots with object");
		} catch (err) { }
		try {
			o.setSlots(new InventorySlot());
			console.err("can setSlots with InventorySlot");
		} catch (err) { }
		try {
			o.setSlots([]);
			console.err("can setSlots with array");
		} catch (err) { }
		try {
			o.setSlots("test");
			console.err("can setSlots with string");
		} catch (err) { }
		try {
			o.setSlots(1);
			console.err("can setSlots with number");
		} catch (err) { }
		try {
			o.setSlots(true);
			console.err("can setSlots with boolean");
		} catch (err) { }
		try {
			o.setSlots(["test", 1]);
			console.err("can setSlots with invalid array");
		} catch (err) { }
		try {
			o.setSlots([new InventorySlot(), true]);
			console.err("can setSlots with invalid array");
		} catch (err) { }
		o.setSlots([new InventorySlot(), new InventorySlot()]);
		if (o.getNumInventorySlots() !== 2) {
			console.error("set with wrong # of slots");
		}
		if (!(o.getSlot(0) instanceof InventorySlot)) {
			console.error("set with wrong type of slots");
		}
		/*
		this.stringMemberTest(o, "setEventname", "getEventname", true);
		this.intMemberTest(o, "setMsg", "getMsg");
		this.objectMemberTest(o, [], "setParams", "getParams");
		this.objectMemberTest(o, new BaseInteractiveObject(2), "setSender", "getSender", true);
		*/
		console.log("end InventoryData tests");
	}
	return InventoryDataTest;
});