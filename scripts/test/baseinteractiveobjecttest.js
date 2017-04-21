define(["com/dalonedrow/engine/systems/base/projectconstants",
	"com/dalonedrow/rpg/base/flyweights/baseinteractiveobject",
	"com/dalonedrow/rpg/base/flyweights/inventorydata",
	"com/dalonedrow/rpg/base/flyweights/iocharacter",
	"com/dalonedrow/rpg/base/flyweights/ioitemdata",
	"com/dalonedrow/rpg/base/flyweights/ionpcdata",
	"com/dalonedrow/rpg/base/flyweights/iopcdata",
	"com/dalonedrow/rpg/base/flyweights/scriptable",
	"test/basetester"], function(ProjectConstants,
			BaseInteractiveObject, InventoryData, IOCharacter, IOItemData, IoNpcData, IoPcData,
			Scriptable, BaseTester) {
	function BaseInteractiveObjectTest() {
		BaseTester.call(this);
		ProjectConstants.setInstance(new ProjectConstants());
		IOCharacter.prototype.getAttributeMap = function() {
			return [["ST", "STRENGTH"]];
		};
		this.test = function() {
			var io = this.intConstructorTest("BaseInteractiveObject");
			try {
				io.addAnimation();
			} catch (err) {
				console.log("cannot addAnimation with 2 undefined")
			}
			try {
				io.addAnimation("name");
			} catch (err) {
				console.log("cannot addAnimation with 1 undefined")
			}
			try {
				io.addAnimation(null, 1);
			} catch (err) {
				console.log("cannot addAnimation with name null")
			}
			try {
				io.addAnimation("name", null);
			} catch (err) {
				console.log("cannot addAnimation with id null")
			}
			try {
				io.addAnimation(1, 1);
			} catch (err) {
				console.log("cannot addAnimation with name not string")
			}
			try {
				io.addAnimation("1", "test");
			} catch (err) {
				console.log("cannot addAnimation with id not string")
			}
			try {
				io.addAnimation("1", 0.5);
			} catch (err) {
				console.log("cannot addAnimation with id float")
			}
			io.addAnimation("anim_1", 1);
			try {
				io.addBehaviorFlag();
			} catch (err) {
				console.log("cannot addBehaviorFlag with undefined")
			}
			try {
				io.addBehaviorFlag(null);
			} catch (err) {
				console.log("cannot addBehaviorFlag with null")
			}
			try {
				io.addBehaviorFlag("test");
			} catch (err) {
				console.log("cannot addBehaviorFlag with string")
			}
			try {
				io.addBehaviorFlag(0.5);
			} catch (err) {
				console.log("cannot addBehaviorFlag with float")
			}
			try {
				io.addBehaviorFlag(3);
			} catch (err) {
				console.log("cannot addBehaviorFlag with non-power of two")
			}
			io.addBehaviorFlag(1);
			io.addBehaviorFlag(8);
			try {
				io.addGroup();
			} catch (err) {
				console.log("cannot addGroup with undefined")
			}
			try {
				io.addGroup(null);
			} catch (err) {
				console.log("cannot addGroup with null")
			}
			try {
				io.addGroup({});
			} catch (err) {
				console.log("cannot addGroup with non-string")
			}
			io.addGroup("testgroup");
			try {
				io.addSpellOn();
			} catch (err) {
				console.log("cannot addSpellOn with undefined")
			}
			try {
				io.addSpellOn(null);
			} catch (err) {
				console.log("cannot addSpellOn with null")
			}
			try {
				io.addSpellOn("test");
			} catch (err) {
				console.log("cannot addSpellOn with string")
			}
			try {
				io.addSpellOn({});
			} catch (err) {
				console.log("cannot addSpellOn with object")
			}
			try {
				io.addSpellOn(0.5);
			} catch (err) {
				console.log("cannot addSpellOn with float")
			}
			io.addSpellOn(5);
			try {
				io.addTypeFlag();
			} catch (err) {
				console.log("cannot addTypeFlag with undefined")
			}
			try {
				io.addTypeFlag(null);
			} catch (err) {
				console.log("cannot addTypeFlag with null")
			}
			try {
				io.addTypeFlag("test");
			} catch (err) {
				console.log("cannot addTypeFlag with string")
			}
			try {
				io.addTypeFlag({});
			} catch (err) {
				console.log("cannot addTypeFlag with object")
			}
			try {
				io.addTypeFlag(0.5);
			} catch (err) {
				console.log("cannot addTypeFlag with float")
			}
			try {
				io.addTypeFlag(3);
			} catch (err) {
				console.log("cannot addTypeFlag with non-power of two")
			}
			try {
				io.addTypeFlag(1);
			} catch (err) {
				console.log("cannot addTypeFlag OBJECT_TYPE_WEAPON")
			}
			io.addTypeFlag(2);
			if (!io.equals()) {
				console.log("does not equal undefined");
			}
			if (!io.equals(null)) {
				console.log("does not equal null");
			}
			if (!io.equals({})) {
				console.log("does not equal object");
			}
			if (io.equals(io)) {
				console.log("does equal itself");
			}
			try {
				io.getAnimation();
			} catch (err) {
				console.log("cannot getAnimation with undefined")
			}
			try {
				io.getAnimation(null);
			} catch (err) {
				console.log("cannot getAnimation with null")
			}
			try {
				io.getAnimation({});
			} catch (err) {
				console.log("cannot getAnimation with object")
			}
			try {
				io.getAnimation(1);
			} catch (err) {
				console.log("cannot getAnimation with number")
			}
			try {
				io.getAnimation("test");
			} catch (err) {
				console.log("cannot getAnimation with non-existent name")
			}
			if (io.getAnimation("anim_1") === 1) {
				console.log("has anim_1");
			}
			try {
				io.hasBehaviorFlag(3);
			} catch (err) {
				console.log("cannot hasBehaviorFlag with non-power of two")
			}
			if (io.hasBehaviorFlag(1)) {
				console.log("has BehaviorFlag 1");
			}
			if (io.hasBehaviorFlag(8)) {
				console.log("has BehaviorFlag 8");
			}
			if (!io.hasBehaviorFlag(16)) {
				console.log("does not have BehaviorFlag 16");
			}
			try {
				io.isInGroup();
			} catch (err) {
				console.log("cannot isInGroup with undefined")
			}
			try {
				io.isInGroup(1);
			} catch (err) {
				console.log("cannot isInGroup with non-string")
			}
			if (io.isInGroup("testgroup")) {
				console.log("is in group testgroup");
			}
			if (!io.isInGroup("armory")) {
				console.log("is not in group armory");
			}
			try {
				io.removeBehaviorFlag(3);
			} catch (err) {
				console.log("cannot removeBehaviorFlag with non-power of two")
			}
			io.removeBehaviorFlag(8)
			if (!io.hasBehaviorFlag(8)) {
				console.log("does not have BehaviorFlag 8");
			}
			io.setDamageSum(0.5);
			io.setDamageSum(5);
			try {
				io.setInitPosition({});
			} catch (err) {
				console.log("cannot setInitPosition with object")
			}
			try {
				io.setInventory();
			} catch (err) {
				console.log("cannot setInventory with undefined")
			}
			try {
				io.setInventory({});
			} catch (err) {
				console.log("cannot setInventory with object")
			}
			var inv = new InventoryData();
			io.setInventory(inv);
			if (io.getInventory() instanceof InventoryData) {
				console.log("inventory set to InventoryData");
			}
			if (inv.getIo().equals(io)) {
				console.log("io set to IO for inventory");
			}
			var id = new IOItemData();
			io.setItemData(id);
			if (io.getItemData() instanceof IOItemData) {
				console.log("itemdata set to IOItemData");
			}
			if (id.getIo().equals(io)) {
				console.log("io set to IO for itemdata");
			}
			try {
				io.setNPCData();
			} catch (err) {
				console.log("cannot setNPCData with undefined");
			}
			io.setNPCData(null);
			if (io.getNPCData() === null) {
				console.log("can setNPCData with null");
			}
			try {
				io.setNPCData(new Object());
			} catch (err) {
				console.log("cannot setNPCData with object");
			}
			var npcdata = new IoNpcData();
			io.setNPCData(npcdata);
			if (npcdata.getHashcode() === io.getNPCData().getHashcode()) {
				console.log("can setNPCData with IoNpcData -- " + npcdata.getHashcode());
			}
			var over = new Scriptable();
			try {
				io.setOverscript({});
			} catch (err) {
				console.log("cannot setOverscript with object");
			}
			io.setOverscript(over);
			if (over.getHashcode() === io.getOverscript().getHashcode()) {
				console.log("can setOverscript with Scriptable");
			}
			var pcdata = new IoPcData();
			io.setPCData(null);
			io.setPCData(pcdata);
			if (pcdata.getHashcode() === io.getPCData().getHashcode()) {
				console.log("can setPCData with IoPcData -- " + pcdata.getHashcode());
			}
			this.intSetterTest(io, "setPoisonCharges", "getPoisonCharges");
		}
	};
	return BaseInteractiveObjectTest;
});