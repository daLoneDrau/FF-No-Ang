define(["com/dalonedrow/engine/systems/base/projectconstants",
	"com/dalonedrow/rpg/base/constants/scriptglobals",
	"com/dalonedrow/rpg/base/flyweights/baseinteractiveobject",
	"com/dalonedrow/rpg/base/flyweights/inventorydata",
	"com/dalonedrow/rpg/base/flyweights/iocharacter",
	"com/dalonedrow/rpg/base/flyweights/ioitemdata",
	"com/dalonedrow/rpg/base/flyweights/ionpcdata",
	"com/dalonedrow/rpg/base/flyweights/scriptable",
	"com/dalonedrow/rpg/base/flyweights/scriptvariable",
	"com/dalonedrow/rpg/base/systems/spellmaster", "com/dalonedrow/utils/hashcode",
	"test/basetester"], function(ProjectConstants, ScriptGlobals,
			BaseInteractiveObject, InventoryData, IOCharacter, IOItemData, IoNpcData, Scriptable,
			ScriptVariable, SpellMaster, Hashcode, BaseTester) {
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
			
			try {
				o.getLocalFloatArrayVariableValue();
				console.error("can getLocalFloatArrayVariableValue with no parameters");
			} catch (err) { }
			try {
				o.getLocalFloatArrayVariableValue(null);
				console.error("can getLocalFloatArrayVariableValue with null");
			} catch (err) { }
			try {
				o.getLocalFloatArrayVariableValue({});
				console.error("can getLocalFloatArrayVariableValue with object");
			} catch (err) { }
			try {
				o.getLocalFloatArrayVariableValue([]);
				console.error("can getLocalFloatArrayVariableValue with array");
			} catch (err) { }
			try {
				o.getLocalFloatArrayVariableValue(1);
				console.error("can getLocalFloatArrayVariableValue with number");
			} catch (err) { }
			try {
				o.getLocalFloatArrayVariableValue(true);
				console.error("can getLocalFloatArrayVariableValue with boolean");
			} catch (err) { }
			try {
				o.getLocalFloatArrayVariableValue("testFloatArr");
				console.error("can getLocalFloatArrayVariableValue unassigned");
			} catch (err) { }
			o.addLocalVariable(new ScriptVariable(
					"testFloatArr", ScriptGlobals.TYPE_L_11_FLOAT_ARR, 2));
			if (!Array.isArray(o.getLocalFloatArrayVariableValue("testFloatArr"))) {
				console.error("cannot set local float array variable");
			}
			
			try {
				o.getLocalFloatVariableValue();
				console.error("can getLocalFloatVariableValue with no parameters");
			} catch (err) { }
			try {
				o.getLocalFloatVariableValue(null);
				console.error("can getLocalFloatVariableValue with null");
			} catch (err) { }
			try {
				o.getLocalFloatVariableValue({});
				console.error("can getLocalFloatVariableValue with object");
			} catch (err) { }
			try {
				o.getLocalFloatVariableValue([]);
				console.error("can getLocalFloatVariableValue with array");
			} catch (err) { }
			try {
				o.getLocalFloatVariableValue(1);
				console.error("can getLocalFloatVariableValue with number");
			} catch (err) { }
			try {
				o.getLocalFloatVariableValue(true);
				console.error("can getLocalFloatVariableValue with boolean");
			} catch (err) { }
			try {
				o.getLocalFloatVariableValue("testFloat");
				console.error("can getLocalFloatVariableValue unassigned");
			} catch (err) { }
			o.addLocalVariable(new ScriptVariable(
					"testFloat", ScriptGlobals.TYPE_L_10_FLOAT, 2));
			if (o.getLocalFloatVariableValue("testFloat") !== 2) {
				console.error("cannot set local float variable");
			}
			
			try {
				o.getLocalIntArrayVariableValue();
				console.error("can getLocalIntArrayVariableValue with no parameters");
			} catch (err) { }
			try {
				o.getLocalIntArrayVariableValue(null);
				console.error("can getLocalIntArrayVariableValue with null");
			} catch (err) { }
			try {
				o.getLocalIntArrayVariableValue({});
				console.error("can getLocalIntArrayVariableValue with object");
			} catch (err) { }
			try {
				o.getLocalIntArrayVariableValue([]);
				console.error("can getLocalIntArrayVariableValue with array");
			} catch (err) { }
			try {
				o.getLocalIntArrayVariableValue(1);
				console.error("can getLocalIntArrayVariableValue with number");
			} catch (err) { }
			try {
				o.getLocalIntArrayVariableValue(true);
				console.error("can getLocalIntArrayVariableValue with boolean");
			} catch (err) { }
			try {
				o.getLocalIntArrayVariableValue("testIntArr");
				console.error("can getLocalIntArrayVariableValue unassigned");
			} catch (err) { }
			o.addLocalVariable(new ScriptVariable(
					"testIntArr", ScriptGlobals.TYPE_L_13_INT_ARR, 2));
			if (!Array.isArray(o.getLocalIntArrayVariableValue("testIntArr"))) {
				console.error("cannot set local int array variable");
			}
			
			try {
				o.getLocalIntVariableValue();
				console.error("can getLocalIntVariableValue with no parameters");
			} catch (err) { }
			try {
				o.getLocalIntVariableValue(null);
				console.error("can getLocalIntVariableValue with null");
			} catch (err) { }
			try {
				o.getLocalIntVariableValue({});
				console.error("can getLocalIntVariableValue with object");
			} catch (err) { }
			try {
				o.getLocalIntVariableValue([]);
				console.error("can getLocalIntVariableValue with array");
			} catch (err) { }
			try {
				o.getLocalIntVariableValue(1);
				console.error("can getLocalIntVariableValue with number");
			} catch (err) { }
			try {
				o.getLocalIntVariableValue(true);
				console.error("can getLocalIntVariableValue with boolean");
			} catch (err) { }
			try {
				o.getLocalIntVariableValue("testInt");
				console.error("can getLocalIntVariableValue unassigned");
			} catch (err) { }
			o.addLocalVariable(new ScriptVariable(
					"testInt", ScriptGlobals.TYPE_L_12_INT, 2));
			if (o.getLocalIntVariableValue("testInt") !== 2) {
				console.error("cannot set local int variable");
			}
			
			try {
				o.getLocalLongArrayVariableValue();
				console.error("can getLocalLongArrayVariableValue with no parameters");
			} catch (err) { }
			try {
				o.getLocalLongArrayVariableValue(null);
				console.error("can getLocalLongArrayVariableValue with null");
			} catch (err) { }
			try {
				o.getLocalLongArrayVariableValue({});
				console.error("can getLocalLongArrayVariableValue with object");
			} catch (err) { }
			try {
				o.getLocalLongArrayVariableValue([]);
				console.error("can getLocalLongArrayVariableValue with array");
			} catch (err) { }
			try {
				o.getLocalLongArrayVariableValue(1);
				console.error("can getLocalLongArrayVariableValue with number");
			} catch (err) { }
			try {
				o.getLocalLongArrayVariableValue(true);
				console.error("can getLocalLongArrayVariableValue with boolean");
			} catch (err) { }
			try {
				o.getLocalLongArrayVariableValue("testIntArr");
				console.error("can getLocalLongArrayVariableValue unassigned");
			} catch (err) { }
			o.addLocalVariable(new ScriptVariable(
					"testLongArr", ScriptGlobals.TYPE_L_15_LONG_ARR, 2));
			if (!Array.isArray(o.getLocalLongArrayVariableValue("testLongArr"))) {
				console.error("cannot set local long array variable");
			}
			
			try {
				o.getLocalLongVariableValue();
				console.error("can getLocalLongVariableValue with no parameters");
			} catch (err) { }
			try {
				o.getLocalLongVariableValue(null);
				console.error("can getLocalLongVariableValue with null");
			} catch (err) { }
			try {
				o.getLocalLongVariableValue({});
				console.error("can getLocalLongVariableValue with object");
			} catch (err) { }
			try {
				o.getLocalLongVariableValue([]);
				console.error("can getLocalLongVariableValue with array");
			} catch (err) { }
			try {
				o.getLocalLongVariableValue(1);
				console.error("can getLocalLongVariableValue with number");
			} catch (err) { }
			try {
				o.getLocalLongVariableValue(true);
				console.error("can getLocalLongVariableValue with boolean");
			} catch (err) { }
			try {
				o.getLocalLongVariableValue("testLong");
				console.error("can getLocalLongVariableValue unassigned");
			} catch (err) { }
			o.addLocalVariable(new ScriptVariable(
					"testLong", ScriptGlobals.TYPE_L_14_LONG, 2));
			if (o.getLocalLongVariableValue("testLong") !== 2) {
				console.error("cannot set local long variable");
			}
			
			try {
				o.getLocalStringArrayVariableValue();
				console.error("can getLocalStringArrayVariableValue with no parameters");
			} catch (err) { }
			try {
				o.getLocalStringArrayVariableValue(null);
				console.error("can getLocalStringArrayVariableValue with null");
			} catch (err) { }
			try {
				o.getLocalStringArrayVariableValue({});
				console.error("can getLocalStringArrayVariableValue with object");
			} catch (err) { }
			try {
				o.getLocalStringArrayVariableValue([]);
				console.error("can getLocalStringArrayVariableValue with array");
			} catch (err) { }
			try {
				o.getLocalStringArrayVariableValue(1);
				console.error("can getLocalStringArrayVariableValue with number");
			} catch (err) { }
			try {
				o.getLocalStringArrayVariableValue(true);
				console.error("can getLocalStringArrayVariableValue with boolean");
			} catch (err) { }
			try {
				o.getLocalStringArrayVariableValue("testIntArr");
				console.error("can getLocalStringArrayVariableValue unassigned");
			} catch (err) { }
			o.addLocalVariable(new ScriptVariable(
					"testStringArr", ScriptGlobals.TYPE_L_09_TEXT_ARR, "test"));
			if (!Array.isArray(o.getLocalStringArrayVariableValue("testStringArr"))) {
				console.error("cannot set local string array variable");
			}
			
			try {
				o.getLocalStringVariableValue();
				console.error("can getLocalStringVariableValue with no parameters");
			} catch (err) { }
			try {
				o.getLocalStringVariableValue(null);
				console.error("can getLocalStringVariableValue with null");
			} catch (err) { }
			try {
				o.getLocalStringVariableValue({});
				console.error("can getLocalStringVariableValue with object");
			} catch (err) { }
			try {
				o.getLocalStringVariableValue([]);
				console.error("can getLocalStringVariableValue with array");
			} catch (err) { }
			try {
				o.getLocalStringVariableValue(1);
				console.error("can getLocalStringVariableValue with number");
			} catch (err) { }
			try {
				o.getLocalStringVariableValue(true);
				console.error("can getLocalStringVariableValue with boolean");
			} catch (err) { }
			try {
				o.getLocalStringVariableValue("testLong");
				console.error("can getLocalStringVariableValue unassigned");
			} catch (err) { }
			o.addLocalVariable(new ScriptVariable(
					"testString", ScriptGlobals.TYPE_L_08_TEXT, "test"));
			if (o.getLocalStringVariableValue("testString") !== "test") {
				console.error("cannot set local string variable");
			}
			
			o.addLocalVariable(new ScriptVariable(
					"testVar", ScriptGlobals.TYPE_L_08_TEXT, "happy"));
			if (!o.hasLocalVariables()) {
				console.error("cannot tell if has local variables");
			}
			if (!o.hasLocalVariable("testVar")) {
				console.error("cannot set local variable");
			}
			if (o.getLocalVariable("testVar").getText() !== "happy") {
				console.error("local variable value is wrong");
			}
			o.clearLocalVariables();
			if (o.hasLocalVariable("testVar")) {
				console.error("cannot clear local variable");
			}
			if (o.hasLocalVariables()) {
				console.error("cannot tell if has local variables");
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

			o.clearLocalVariables();
			try {
				o.setLocalVariable();
				console.error("can setLocalVariable with no parameters");
			} catch (err) { }
			try {
				o.setLocalVariable(null);
				console.error("can setLocalVariable with null");
			} catch (err) { }
			try {
				o.setLocalVariable({});
				console.error("can setLocalVariable with object");
			} catch (err) { }
			try {
				o.setLocalVariable([]);
				console.error("can setLocalVariable with array");
			} catch (err) { }
			try {
				o.setLocalVariable(1);
				console.error("can setLocalVariable with number");
			} catch (err) { }
			try {
				o.setLocalVariable(true);
				console.error("can setLocalVariable with boolean");
			} catch (err) { }
			
			o.setLocalVariable("testFloat", 1.5);
			if (!o.hasLocalVariable("testFloat")) {
				console.error("cannot setLocalVariable");
			}
			if (o.getLocalFloatVariableValue("testFloat") !== 1.5) {
				console.error("cannot set setLocalVariable");
			}
			o.setLocalVariable(new ScriptVariable("testFloat", ScriptGlobals.TYPE_L_10_FLOAT, 2));
			if (o.getLocalFloatVariableValue("testFloat") !== 2) {
				console.error("cannot set setLocalVariable");
			}
			console.log("end ScriptableTest tests");
		}
	};
	return ScriptableTest;
});