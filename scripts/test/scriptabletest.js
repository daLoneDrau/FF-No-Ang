define(["com/dalonedrow/engine/systems/base/projectconstants",
	"com/dalonedrow/rpg/base/constants/scriptglobals",
	"com/dalonedrow/rpg/base/flyweights/baseinteractiveobject",
	"com/dalonedrow/rpg/base/flyweights/inventorydata",
	"com/dalonedrow/rpg/base/flyweights/iocharacter",
	"com/dalonedrow/rpg/base/flyweights/ioitemdata",
	"com/dalonedrow/rpg/base/flyweights/ionpcdata",
	"com/dalonedrow/rpg/base/flyweights/scriptable",
	"com/dalonedrow/rpg/base/flyweights/scriptvariable",
	"com/dalonedrow/rpg/base/systems/spellmaster",
	"test/basetester"], function(ProjectConstants, ScriptGlobals,
			BaseInteractiveObject, InventoryData, IOCharacter, IOItemData, IoNpcData, Scriptable,
			ScriptVariable, SpellMaster, BaseTester) {
	function ScriptableTest() {
		BaseTester.call(this);
		ProjectConstants.setInstance(new ProjectConstants());
		SpellMaster.setInstance(new SpellMaster());
		IOCharacter.prototype.getAttributeMap = function() {
			return [["ST", "STRENGTH"]];
		};
		this.test = function() {
			try {
				new Scriptable;
				console.error("can create with no parameters");
			} catch (err) { }
			try {
				new Scriptable(null);
				console.error("can create with null");
			} catch (err) { }
			try {
				new Scriptable({});
				console.error("can create with object");
			} catch (err) { }
			try {
				new Scriptable([]);
				console.error("can create with array");
			} catch (err) { }
			try {
				new Scriptable("test");
				console.error("can create with string");
			} catch (err) { }
			try {
				new Scriptable(1);
				console.error("can create with number");
			} catch (err) { }
			try {
				new Scriptable(true);
				console.error("can create with boolean");
			} catch (err) { }
			var o = new Scriptable(new BaseInteractiveObject(1));
			/*****************************************************
			 * TEST LOCAL VARIABLE METHODS
			 */
			try {
				o.addLocalVariable();
				console.error("can addLocalVariable with no parameters");
			} catch (err) { }
			try {
				o.addLocalVariable(null);
				console.error("can addLocalVariable with null");
			} catch (err) { }
			try {
				o.addLocalVariable({});
				console.error("can addLocalVariable with object");
			} catch (err) { }
			try {
				o.addLocalVariable([]);
				console.error("can addLocalVariable with array");
			} catch (err) { }
			try {
				o.addLocalVariable("test");
				console.error("can addLocalVariable with string");
			} catch (err) { }
			try {
				o.addLocalVariable(1);
				console.error("can addLocalVariable with number");
			} catch (err) { }
			try {
				o.addLocalVariable(true);
				console.error("can addLocalVariable with boolean");
			} catch (err) { }
			
			try {
				o.clearLocalVariable();
				console.error("can clearLocalVariable with no parameters");
			} catch (err) { }
			try {
				o.clearLocalVariable(null);
				console.error("can clearLocalVariable with null");
			} catch (err) { }
			try {
				o.clearLocalVariable({});
				console.error("can clearLocalVariable with object");
			} catch (err) { }
			try {
				o.clearLocalVariable([]);
				console.error("can clearLocalVariable with array");
			} catch (err) { }
			try {
				o.clearLocalVariable(1);
				console.error("can clearLocalVariable with number");
			} catch (err) { }
			try {
				o.clearLocalVariable(true);
				console.error("can clearLocalVariable with boolean");
			} catch (err) { }
			
			try {
				o.hasLocalVariable();
				console.error("can hasLocalVariable with no parameters");
			} catch (err) { }
			try {
				o.hasLocalVariable(null);
				console.error("can hasLocalVariable with null");
			} catch (err) { }
			try {
				o.hasLocalVariable({});
				console.error("can hasLocalVariable with object");
			} catch (err) { }
			try {
				o.hasLocalVariable([]);
				console.error("can hasLocalVariable with array");
			} catch (err) { }
			try {
				o.hasLocalVariable(1);
				console.error("can hasLocalVariable with number");
			} catch (err) { }
			try {
				o.hasLocalVariable(true);
				console.error("can hasLocalVariable with boolean");
			} catch (err) { }
			o.addLocalVariable(new ScriptVariable(
					"testVar", ScriptGlobals.TYPE_L_08_TEXT, "happy"));
			if (!o.hasLocalVariable("testVar")) {
				console.error("cannot set local variable");
			}
			o.clearLocalVariables();
			if (o.hasLocalVariable("testVar")) {
				console.error("cannot clear local variable");
			}
			o.addLocalVariable(new ScriptVariable(
					"testVar", ScriptGlobals.TYPE_L_08_TEXT, "happy"));
			o.addLocalVariable(new ScriptVariable(
					"testFloat", ScriptGlobals.TYPE_L_10_FLOAT, 1.5));
			if (!o.hasLocalVariable("testVar")) {
				console.error("cannot set local variable");
			}
			if (!o.hasLocalVariable("testFloat")) {
				console.error("cannot set local variable testFloat");
			}
			o.clearLocalVariable("testFloat");
			if (o.hasLocalVariable("testFloat")) {
				console.error("cannot clear local variable");
			}
			if (!o.hasLocalVariable("testVar")) {
				console.error("cleared wrong local variable");
			}
			
			console.log("end ScriptableTest tests");
		}
	};
	return ScriptableTest;
});