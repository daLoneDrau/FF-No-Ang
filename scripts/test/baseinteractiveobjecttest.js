define(["com/dalonedrow/engine/systems/base/projectconstants",
	"com/dalonedrow/rpg/base/flyweights/baseinteractiveobject",
	"com/dalonedrow/rpg/base/flyweights/inventorydata",
	"com/dalonedrow/rpg/base/flyweights/iocharacter",
	"com/dalonedrow/rpg/base/flyweights/ioitemdata",
	"com/dalonedrow/rpg/base/flyweights/ionpcdata",
	"com/dalonedrow/rpg/base/flyweights/iopcdata",
	"com/dalonedrow/rpg/base/flyweights/scriptable",
	"com/dalonedrow/rpg/base/systems/spellmaster",
	"test/basetester"], function(ProjectConstants,
			BaseInteractiveObject, InventoryData, IOCharacter, IOItemData, IoNpcData, IoPcData,
			Scriptable, SpellMaster, BaseTester) {
	function BaseInteractiveObjectTest() {
		BaseTester.call(this);
		ProjectConstants.setInstance(new ProjectConstants());
		SpellMaster.setInstance(new SpellMaster());
		IOCharacter.prototype.getAttributeMap = function() {
			return [["ST", "STRENGTH"]];
		};
		this.test = function() {
			var io = this.intConstructorTest("com/dalonedrow/rpg/base/flyweights/baseinteractiveobject");
			this.stringIntKeyValueTest(io, "Animation");
			this.stringListTest(io, "Group");
			// test flags
			this.flagTest(io, "BehaviorFlag");
			this.flagTest(io, "GameFlag");
			this.flagTest(io, "IOFlag");
			this.flagTest(io, "TypeFlag");
			// test spells
			SpellMaster.getInstance().newSpell(0, 0, 1);
			SpellMaster.getInstance().newSpell(0, 0, 1); // spell id 1
			this.intListTest(io, "SpellOn");
			// test equals
			this.equalsTest(io, new BaseInteractiveObject(25));
			this.stringMemberTest(io, "setArmormaterial", "getArmormaterial");
			this.stringMemberTest(io, "setMainevent", "getMainevent");
			this.stringMemberTest(io, "setWeaponmaterial", "getWeaponmaterial");
			this.floatMemberTest(io, "setDamageSum", "getDamageSum");
			this.intMemberTest(io, "setLevel", "getLevel");
			this.intMemberTest(io, "setPoisonCharges", "getPoisonCharges");
			this.intMemberTest(io, "setPoisonLevel", "getPoisonLevel");
			this.intMemberTest(io, "setShow", "getShow");
			this.intMemberTest(io, "setSparkNBlood", "getSparkNBlood");
			this.intMemberTest(io, "setStatCount", "getStatCount");
			this.intMemberTest(io, "setStatSent", "getStatSent");
			this.intMemberTest(io, "setSummoner", "getSummoner");
			this.intMemberTest(io, "setTargetinfo", "getTargetinfo");
			this.objectMemberTest(io, "com/dalonedrow/engine/sprite/base/simplevector2",
					"setInitPosition", "getInitPosition");
			this.objectMemberTest(io, "com/dalonedrow/engine/sprite/base/simplevector2",
					"setPosition", "getPosition");
			this.objectMemberTest(io, "com/dalonedrow/engine/sprite/base/simplevector3",
					"setTarget", "getTarget");
			this.associationMemberTest(io, new InventoryData(), "getIo", "setInventory",
					"getInventory");
			this.associationMemberTest(io, new IOItemData(), "getIo", "setItemData",
					"getItemData");
			this.associationMemberTest(io, new IoNpcData(), "getIo", "setNPCData",
					"getNPCData");
			this.associationMemberTest(io, new IoPcData(), "getIo", "setPCData",
					"getPCData");
			this.associationMemberTest(io, new Scriptable(), "getIo", "setOverscript",
					"getOverscript");
			this.associationMemberTest(io, new Scriptable(), "getIo", "setScript",
					"getScript");
			this.intMemberTest(io, "setPoisonCharges", "getPoisonCharges");
		}
	};
	return BaseInteractiveObjectTest;
});