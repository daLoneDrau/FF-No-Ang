define(["com/dalonedrow/engine/sprite/base/simplevector2",
	"com/dalonedrow/engine/systems/base/projectconstants",
	"com/dalonedrow/module/ff/rpg/ffcharacter",
	"com/dalonedrow/module/ff/rpg/ffinteractiveobject",
	"com/dalonedrow/module/ff/rpg/ffnpc",
	"com/dalonedrow/module/ff/rpg/ffscriptable",
	"com/dalonedrow/module/ff/systems/ffcontroller",
	"com/dalonedrow/rpg/base/flyweights/inventorydata",
	"com/dalonedrow/rpg/base/flyweights/ioitemdata",
	"com/dalonedrow/rpg/base/systems/spellmaster",
	"test/basetester"], function(SimpleVector2, ProjectConstants, FFCharacter, FFInteractiveObject,
			FFNpc, FFScriptable, FFController, InventoryData, IOItemData, SpellMaster,
			BaseTester) {
	function FFInteractiveObjectTest() {
		BaseTester.call(this);
		SpellMaster.setInstance(new SpellMaster());
		this.test = function() {
			var io = this.intConstructorTest("com/dalonedrow/module/ff/rpg/ffinteractiveobject");
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
			this.equalsTest(io, new FFInteractiveObject(25));
			this.stringMemberTest(io, "setArmormaterial", "getArmormaterial", true);
			this.stringMemberTest(io, "setMainevent", "getMainevent", true);
			this.stringMemberTest(io, "setWeaponmaterial", "getWeaponmaterial", true);
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
					"setInitPosition", "getInitPosition", true);
			this.objectMemberTest(io, "com/dalonedrow/engine/sprite/base/simplevector2",
					"setPosition", "getPosition", false);
			this.objectMemberTest(io, "com/dalonedrow/engine/sprite/base/simplevector3",
					"setTarget", "getTarget", true);
			this.associationMemberTest(io, new InventoryData(), "getIo", "setInventory",
					"getInventory");
			this.associationMemberTest(io, new IOItemData(), "getIo", "setItemData",
					"getItemData");
			this.associationMemberTest(io, new FFNpc(), "getIo", "setNPCData",
					"getNPCData");
			this.associationMemberTest(io, new FFCharacter(), "getIo", "setPCData",
					"getPCData");
			this.associationMemberTest(io, new FFScriptable(io), "getIo", "setOverscript",
					"getOverscript");
			this.associationMemberTest(io, new FFScriptable(io), "getIo", "setScript",
					"getScript");
			this.intMemberTest(io, "setPoisonCharges", "getPoisonCharges");	
			console.log("end BaseInteractiveObject tests");
		}
	};
	return FFInteractiveObjectTest;
});