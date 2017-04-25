define(["com/dalonedrow/rpg/base/constants/scriptglobals", 
	"com/dalonedrow/rpg/base/flyweights/scriptvariable",
	"test/basetester"], function(ScriptGlobals, ScriptVariable, BaseTester) {
	function ScriptVariableTest() {
		BaseTester.call(this);
		this.test = function() {
			try {
				new ScriptVariable();
				console.error("able to create with undefined");
			} catch (err) { }
			try {
				new ScriptVariable(null);
				console.error("able to create with null");
			} catch (err) { }
			try {
				new ScriptVariable({});
				console.error("able to create with object");
			} catch (err) { }
			try {
				new ScriptVariable(1);
				console.error("able to create with int");
			} catch (err) { }
			try {
				new ScriptVariable(0.5);
				console.error("able to create with float");
			} catch (err) { }
			try {
				new ScriptVariable(true);
				console.error("able to create with boolean");
			} catch (err) { }
			try {
				new ScriptVariable("testVar", ScriptGlobals.TYPE_G_00_TEXT);
				console.error("able to create with 2 arguments");
			} catch (err) { }
			// TYPE_G_00_TEXT
			var o = new ScriptVariable("testVar", ScriptGlobals.TYPE_G_00_TEXT, {"name": "test"});
			if (o.getText() !== "[object Object]") {
				console.error("unable to create global string variable with object");
			}
			try {
				new ScriptVariable("testVar", ScriptGlobals.TYPE_G_00_TEXT, []);
				console.error("able to create global string variable with array");
			} catch (err) { }
			o = new ScriptVariable("testVar", ScriptGlobals.TYPE_G_00_TEXT, null);
			if (o.getText() !== null) {
				console.error("unable to create global string variable with null");
			}
			o = new ScriptVariable("testVar", ScriptGlobals.TYPE_G_00_TEXT, 1);
			if (o.getText() !== "1") {
				console.error("unable to create global string variable with int");
			}
			o = new ScriptVariable("testVar", ScriptGlobals.TYPE_G_00_TEXT, 1.5);
			if (o.getText() !== "1.5") {
				console.error("unable to create global string variable with float");
			}
			o = new ScriptVariable("testVar", ScriptGlobals.TYPE_G_00_TEXT, true);
			if (o.getText() !== "true") {
				console.error("unable to create global string variable with boolean");
			}
			try {
				o.getTextArrayVal();
				console.error("able to get string array value for string variable");
			}  catch (err) {
				if (err.message !== "Not a string array") {
					console.error("unexpected error");
				}
			}
			try {
				o.getFloatVal();
				console.error("able to get float value for string variable");
			} catch (err) {
				if (err.message !== "Not a floating-point variable") {
					console.error("unexpected error");
				}
			}
			try {
				o.getFloatArrayVal();
				console.error("able to get float array value for string variable");
			} catch (err) {
				if (err.message !== "Not a floating-point array") {
					console.error("unexpected error");
				}
			}
			try {
				o.getIntVal();
				console.error("able to get int value for string variable");
			} catch (err) {
				if (err.message !== "Not an integer variable") {
					console.error("unexpected error");
				}
			}
			try {
				o.getIntArrayVal();
				console.error("able to get int array value for string variable");
			} catch (err) {
				if (err.message !== "Not an integer array") {
					console.error("unexpected error");
				}
			}
			try {
				o.getLongVal();
				console.error("able to get long value for string variable");
			} catch (err) {
				if (err.message !== "Not a long integer variable") {
					console.error("unexpected error");
				}
			}
			try {
				o.getLongArrayVal();
				console.error("able to get long array value for string variable");
			} catch (err) {
				if (err.message !== "Not a long integer array") {
					console.error("unexpected error");
				}
			}
			// TYPE_L_08_TEXT
			o = new ScriptVariable("testVar", ScriptGlobals.TYPE_L_08_TEXT, {"name": "test"});
			if (o.getText() !== "[object Object]") {
				console.error("unable to create local string variable with object");
			}
			try {
				new ScriptVariable("testVar", ScriptGlobals.TYPE_L_08_TEXT, []);
				console.error("able to create local string variable with array");
			} catch (err) { }
			o = new ScriptVariable("testVar", ScriptGlobals.TYPE_L_08_TEXT, null);
			if (o.getText() !== null) {
				console.error("unable to create local string variable with null");
			}
			o = new ScriptVariable("testVar", ScriptGlobals.TYPE_L_08_TEXT, 1);
			if (o.getText() !== "1") {
				console.error("unable to create local string variable with int");
			}
			o = new ScriptVariable("testVar", ScriptGlobals.TYPE_L_08_TEXT, 1.5);
			if (o.getText() !== "1.5") {
				console.error("unable to create local string variable with float");
			}
			o = new ScriptVariable("testVar", ScriptGlobals.TYPE_L_08_TEXT, true);
			if (o.getText() !== "true") {
				console.error("unable to create local string variable with boolean");
			}
			try {
				o.getTextArrayVal();
				console.error("able to get string array value for string variable");
			}  catch (err) {
				if (err.message !== "Not a string array") {
					console.error("unexpected error");
				}
			}
			try {
				o.getFloatVal();
				console.error("able to get float value for string variable");
			} catch (err) {
				if (err.message !== "Not a floating-point variable") {
					console.error("unexpected error");
				}
			}
			try {
				o.getFloatArrayVal();
				console.error("able to get float array value for string variable");
			} catch (err) {
				if (err.message !== "Not a floating-point array") {
					console.error("unexpected error");
				}
			}
			try {
				o.getIntVal();
				console.error("able to get int value for string variable");
			} catch (err) {
				if (err.message !== "Not an integer variable") {
					console.error("unexpected error");
				}
			}
			try {
				o.getIntArrayVal();
				console.error("able to get int array value for string variable");
			} catch (err) {
				if (err.message !== "Not an integer array") {
					console.error("unexpected error");
				}
			}
			try {
				o.getLongVal();
				console.error("able to get long value for string variable");
			} catch (err) {
				if (err.message !== "Not a long integer variable") {
					console.error("unexpected error");
				}
			}
			try {
				o.getLongArrayVal();
				console.error("able to get long array value for string variable");
			} catch (err) {
				if (err.message !== "Not a long integer array") {
					console.error("unexpected error");
				}
			}
			// TYPE_G_01_TEXT_ARR
			try {
				new ScriptVariable("testVar", ScriptGlobals.TYPE_G_01_TEXT_ARR, {});
				console.error("able to create global string array variable with object");
			} catch (err) { }
			o = new ScriptVariable("testVar", ScriptGlobals.TYPE_G_01_TEXT_ARR, null);
			if (!Array.isArray(o.getTextArrayVal())) {
				console.error("unable to create global string array variable with null");
			}
			try {
				new ScriptVariable("testVar", ScriptGlobals.TYPE_G_01_TEXT_ARR, 1);
				console.error("able to create global string array variable with int");
			} catch (err) { }
			try {
				new ScriptVariable("testVar", ScriptGlobals.TYPE_G_01_TEXT_ARR, 1.5);
				console.error("able to create global string array variable with float");
			} catch (err) { }
			try {
				new ScriptVariable("testVar", ScriptGlobals.TYPE_G_01_TEXT_ARR, true);
				console.error("able to create global string array variable with boolean");
			} catch (err) { }
			o = new ScriptVariable("testVar", ScriptGlobals.TYPE_G_01_TEXT_ARR, "test");
			if (!Array.isArray(o.getTextArrayVal())) {
				console.error("unable to create global string array variable with string");
			}
			try {
				o.getTextArrayVal(true);
				console.error("error");
			} catch (err) { }
			if (o.getTextArrayVal(0) !== "test") {
				console.error("unable to create global string array variable with string");
			}
			try {
				o.getText();
				console.error("able to get string array value for string variable");
			}  catch (err) {
				if (err.message !== "Not a String variable") {
					console.error("unexpected error");
				}
			}
			try {
				o.getFloatVal();
				console.error("able to get float value for string variable");
			} catch (err) {
				if (err.message !== "Not a floating-point variable") {
					console.error("unexpected error");
				}
			}
			try {
				o.getFloatArrayVal();
				console.error("able to get float array value for string variable");
			} catch (err) {
				if (err.message !== "Not a floating-point array") {
					console.error("unexpected error");
				}
			}
			try {
				o.getIntVal();
				console.error("able to get int value for string variable");
			} catch (err) {
				if (err.message !== "Not an integer variable") {
					console.error("unexpected error");
				}
			}
			try {
				o.getIntArrayVal();
				console.error("able to get int array value for string variable");
			} catch (err) {
				if (err.message !== "Not an integer array") {
					console.error("unexpected error");
				}
			}
			try {
				o.getLongVal();
				console.error("able to get long value for string variable");
			} catch (err) {
				if (err.message !== "Not a long integer variable") {
					console.error("unexpected error");
				}
			}
			try {
				o.getLongArrayVal();
				console.error("able to get long array value for string variable");
			} catch (err) {
				if (err.message !== "Not a long integer array") {
					console.error("unexpected error");
				}
			}
			// TYPE_L_09_TEXT_ARR
			try {
				new ScriptVariable("testVar", ScriptGlobals.TYPE_L_09_TEXT_ARR, {});
				console.error("able to create local string array variable with object");
			} catch (err) { }
			o = new ScriptVariable("testVar", ScriptGlobals.TYPE_L_09_TEXT_ARR, null);
			if (!Array.isArray(o.getTextArrayVal())) {
				console.error("unable to create local string array variable with null");
			}
			try {
				new ScriptVariable("testVar", ScriptGlobals.TYPE_L_09_TEXT_ARR, 1);
				console.error("able to create local string array variable with int");
			} catch (err) { }
			try {
				new ScriptVariable("testVar", ScriptGlobals.TYPE_L_09_TEXT_ARR, 1.5);
				console.error("able to create local string array variable with float");
			} catch (err) { }
			try {
				new ScriptVariable("testVar", ScriptGlobals.TYPE_L_09_TEXT_ARR, true);
				console.error("able to create local string array variable with boolean");
			} catch (err) { }
			o = new ScriptVariable("testVar", ScriptGlobals.TYPE_L_09_TEXT_ARR, "test");
			if (!Array.isArray(o.getTextArrayVal())) {
				console.error("unable to create local string array variable with null");
			}
			console.log("end ScriptVariable tests");
			// TYPE_G_02_FLOAT
			try {
				new ScriptVariable("testVar", ScriptGlobals.TYPE_G_02_FLOAT, {});
				console.error("able to create global float variable with object");
			} catch (err) { }
			o = new ScriptVariable("testVar", ScriptGlobals.TYPE_G_02_FLOAT, null);
			if (o.getFloatVal() !== 0) {
				console.error("unable to create global float variable with null");
			}
			try {
				new ScriptVariable("testVar", ScriptGlobals.TYPE_G_02_FLOAT, {});
				console.error("able to create global float variable with object");
			} catch (err) { }
			try {
				new ScriptVariable("testVar", ScriptGlobals.TYPE_G_02_FLOAT, true);
				console.error("able to create global float variable with boolean");
			} catch (err) { }
			o = new ScriptVariable("testVar", ScriptGlobals.TYPE_G_02_FLOAT, 1);
			if (o.getFloatVal() !== 1) {
				console.error("unable to create global string array variable with int");
			}
			o = new ScriptVariable("testVar", ScriptGlobals.TYPE_G_02_FLOAT, 2.5);
			if (o.getFloatVal() !== 2.5) {
				console.error("unable to create global string array variable with float");
			}
			// TYPE_L_10_FLOAT
			try {
				new ScriptVariable("testVar", ScriptGlobals.TYPE_L_10_FLOAT, {});
				console.error("able to create float variable with object");
			} catch (err) { }
			o = new ScriptVariable("testVar", ScriptGlobals.TYPE_L_10_FLOAT, null);
			if (o.getFloatVal() !== 0) {
				console.error("unable to create float variable with null");
			}
			try {
				new ScriptVariable("testVar", ScriptGlobals.TYPE_L_10_FLOAT, "test");
				console.error("able to create float variable with string");
			} catch (err) { }
			try {
				new ScriptVariable("testVar", ScriptGlobals.TYPE_L_10_FLOAT, []);
				console.error("able to create float variable with array");
			} catch (err) { }
			try {
				new ScriptVariable("testVar", ScriptGlobals.TYPE_L_10_FLOAT, true);
				console.error("able to create float variable with boolean");
			} catch (err) { }
			o = new ScriptVariable("testVar", ScriptGlobals.TYPE_L_10_FLOAT, 1);
			if (o.getFloatVal() !== 1) {
				console.error("unable to create string array variable with int");
			}
			o = new ScriptVariable("testVar", ScriptGlobals.TYPE_L_10_FLOAT, 2.5);
			if (o.getFloatVal() !== 2.5) {
				console.error("unable to create string array variable with float");
			}
			// TYPE_G_03_FLOAT_ARR
			try {
				new ScriptVariable("testVar", ScriptGlobals.TYPE_G_03_FLOAT_ARR, {});
				console.error("able to create float array variable with object");
			} catch (err) { }
			o = new ScriptVariable("testVar", ScriptGlobals.TYPE_G_03_FLOAT_ARR, null);
			if (!Array.isArray(o.getFloatArrayVal())) {
				console.error("unable to create float array variable with null");
			}
			o = new ScriptVariable("testVar", ScriptGlobals.TYPE_G_03_FLOAT_ARR, []);
			if (!Array.isArray(o.getFloatArrayVal())) {
				console.error("unable to create float array variable with array");
			}
			try {
				new ScriptVariable("testVar", ScriptGlobals.TYPE_G_03_FLOAT_ARR, true);
				console.error("able to create float array variable with boolean");
			} catch (err) { }
			o = new ScriptVariable("testVar", ScriptGlobals.TYPE_G_03_FLOAT_ARR, 1);
			if (!Array.isArray(o.getFloatArrayVal())) {
				console.error("unable to create float array variable with int");
			}
			o = new ScriptVariable("testVar", ScriptGlobals.TYPE_G_03_FLOAT_ARR, 2.5);
			if (!Array.isArray(o.getFloatArrayVal())) {
				console.error("unable to create float array variable with float");
			}
			// TYPE_L_11_FLOAT_ARR
			try {
				new ScriptVariable("testVar", ScriptGlobals.TYPE_L_11_FLOAT_ARR, {});
				console.error("able to create float array variable with object");
			} catch (err) { }
			o = new ScriptVariable("testVar", ScriptGlobals.TYPE_L_11_FLOAT_ARR, null);
			if (!Array.isArray(o.getFloatArrayVal())) {
				console.error("unable to create float array variable with null");
			}
			o = new ScriptVariable("testVar", ScriptGlobals.TYPE_L_11_FLOAT_ARR, []);
			if (!Array.isArray(o.getFloatArrayVal())) {
				console.error("unable to create float array variable with array");
			}
			try {
				new ScriptVariable("testVar", ScriptGlobals.TYPE_L_11_FLOAT_ARR, "test");
				console.error("able to create float array variable with string");
			} catch (err) { }
			try {
				new ScriptVariable("testVar", ScriptGlobals.TYPE_L_11_FLOAT_ARR, true);
				console.error("able to create float array variable with boolean");
			} catch (err) { }
			o = new ScriptVariable("testVar", ScriptGlobals.TYPE_L_11_FLOAT_ARR, 1);
			if (!Array.isArray(o.getFloatArrayVal())) {
				console.error("unable to create float array variable with int");
			}
			o = new ScriptVariable("testVar", ScriptGlobals.TYPE_L_11_FLOAT_ARR, 2.5);
			if (!Array.isArray(o.getFloatArrayVal())) {
				console.error("unable to create float array variable with float");
			}
			// TYPE_G_04_INT
			try {
				new ScriptVariable("testVar", ScriptGlobals.TYPE_G_04_INT, {});
				console.error("able to create int variable with object");
			} catch (err) { }
			o = new ScriptVariable("testVar", ScriptGlobals.TYPE_G_04_INT, null);
			if (o.getIntVal() !== 0) {
				console.error("unable to create int variable with null");
			}
			try {
				new ScriptVariable("testVar", ScriptGlobals.TYPE_G_04_INT, []);
				console.error("able to create int variable with array");
			} catch (err) { }
			try {
				new ScriptVariable("testVar", ScriptGlobals.TYPE_G_04_INT, "test");
				console.error("able to create int variable with string");
			} catch (err) { }
			try {
				new ScriptVariable("testVar", ScriptGlobals.TYPE_G_04_INT, true);
				console.error("able to create int variable with boolean");
			} catch (err) { }
			o = new ScriptVariable("testVar", ScriptGlobals.TYPE_G_04_INT, 1);
			if (o.getIntVal() !== 1) {
				console.error("unable to create int variable with int");
			}
			o = new ScriptVariable("testVar", ScriptGlobals.TYPE_G_04_INT, 2.5);
			if (o.getIntVal() !== 2) {
				console.error("unable to create int variable with float");
			}
			// TYPE_L_12_INT
			try {
				new ScriptVariable("testVar", ScriptGlobals.TYPE_L_12_INT, {});
				console.error("able to create int variable with object");
			} catch (err) { }
			o = new ScriptVariable("testVar", ScriptGlobals.TYPE_L_12_INT, null);
			if (o.getIntVal() !== 0) {
				console.error("unable to create int variable with null");
			}
			try {
				new ScriptVariable("testVar", ScriptGlobals.TYPE_L_12_INT, []);
				console.error("able to create int variable with array");
			} catch (err) { }
			try {
				new ScriptVariable("testVar", ScriptGlobals.TYPE_L_12_INT, "test");
				console.error("able to create int variable with string");
			} catch (err) { }
			try {
				new ScriptVariable("testVar", ScriptGlobals.TYPE_L_12_INT, true);
				console.error("able to create int variable with boolean");
			} catch (err) { }
			o = new ScriptVariable("testVar", ScriptGlobals.TYPE_L_12_INT, 1);
			if (o.getIntVal() !== 1) {
				console.error("unable to create int variable with int");
			}
			o = new ScriptVariable("testVar", ScriptGlobals.TYPE_L_12_INT, 2.5);
			if (o.getIntVal() !== 2) {
				console.error("unable to create int variable with float");
			}
			// TYPE_G_05_INT_ARR
			try {
				new ScriptVariable("testVar", ScriptGlobals.TYPE_G_05_INT_ARR, {});
				console.error("able to create int array variable with object");
			} catch (err) { }
			o = new ScriptVariable("testVar", ScriptGlobals.TYPE_G_05_INT_ARR, null);
			if (!Array.isArray(o.getIntArrayVal())) {
				console.error("unable to create int array variable with null");
			}
			o = new ScriptVariable("testVar", ScriptGlobals.TYPE_G_05_INT_ARR, []);
			if (!Array.isArray(o.getIntArrayVal())) {
				console.error("unable to create int array variable with array");
			}
			try {
				new ScriptVariable("testVar", ScriptGlobals.TYPE_G_05_INT_ARR, "test");
				console.error("able to create int array variable with string");
			} catch (err) { }
			try {
				new ScriptVariable("testVar", ScriptGlobals.TYPE_G_05_INT_ARR, true);
				console.error("able to create int array variable with boolean");
			} catch (err) { }
			o = new ScriptVariable("testVar", ScriptGlobals.TYPE_G_05_INT_ARR, 1);
			if (!Array.isArray(o.getIntArrayVal())) {
				console.error("unable to create int array variable with int");
			}
			o = new ScriptVariable("testVar", ScriptGlobals.TYPE_G_05_INT_ARR, 2.5);
			if (!Array.isArray(o.getIntArrayVal())) {
				console.error("unable to create int array variable with float");
			}
			// TYPE_L_13_INT_ARR
			try {
				new ScriptVariable("testVar", ScriptGlobals.TYPE_L_13_INT_ARR, {});
				console.error("able to create int array variable with object");
			} catch (err) { }
			o = new ScriptVariable("testVar", ScriptGlobals.TYPE_L_13_INT_ARR, null);
			if (!Array.isArray(o.getIntArrayVal())) {
				console.error("unable to create int array variable with null");
			}
			o = new ScriptVariable("testVar", ScriptGlobals.TYPE_L_13_INT_ARR, []);
			if (!Array.isArray(o.getIntArrayVal())) {
				console.error("unable to create int array variable with array");
			}
			try {
				new ScriptVariable("testVar", ScriptGlobals.TYPE_L_13_INT_ARR, "test");
				console.error("able to create int array variable with string");
			} catch (err) { }
			try {
				new ScriptVariable("testVar", ScriptGlobals.TYPE_L_13_INT_ARR, true);
				console.error("able to create int array variable with boolean");
			} catch (err) { }
			o = new ScriptVariable("testVar", ScriptGlobals.TYPE_L_13_INT_ARR, 1);
			if (!Array.isArray(o.getIntArrayVal())) {
				console.error("unable to create int array variable with int");
			}
			o = new ScriptVariable("testVar", ScriptGlobals.TYPE_L_13_INT_ARR, 2.5);
			if (!Array.isArray(o.getIntArrayVal())) {
				console.error("unable to create int array variable with float");
			}
			// TYPE_G_06_LONG
			try {
				new ScriptVariable("testVar", ScriptGlobals.TYPE_G_06_LONG, {});
				console.error("able to create long variable with object");
			} catch (err) { }
			o = new ScriptVariable("testVar", ScriptGlobals.TYPE_G_06_LONG, null);
			if (o.getLongVal() !== 0) {
				console.error("unable to create long variable with null");
			}
			try {
				new ScriptVariable("testVar", ScriptGlobals.TYPE_G_06_LONG, []);
				console.error("able to create long variable with array");
			} catch (err) { }
			try {
				new ScriptVariable("testVar", ScriptGlobals.TYPE_G_06_LONG, "test");
				console.error("able to create long variable with string");
			} catch (err) { }
			try {
				new ScriptVariable("testVar", ScriptGlobals.TYPE_G_06_LONG, true);
				console.error("able to create long variable with boolean");
			} catch (err) { }
			o = new ScriptVariable("testVar", ScriptGlobals.TYPE_G_06_LONG, 1);
			if (o.getLongVal() !== 1) {
				console.error("unable to create long variable with int");
			}
			o = new ScriptVariable("testVar", ScriptGlobals.TYPE_G_06_LONG, 2.5);
			if (o.getLongVal() !== 2) {
				console.error("unable to create long variable with float");
			}
			// TYPE_L_14_LONG
			try {
				new ScriptVariable("testVar", ScriptGlobals.TYPE_L_14_LONG, {});
				console.error("able to create long variable with object");
			} catch (err) { }
			o = new ScriptVariable("testVar", ScriptGlobals.TYPE_L_14_LONG, null);
			if (o.getLongVal() !== 0) {
				console.error("unable to create long variable with null");
			}
			try {
				new ScriptVariable("testVar", ScriptGlobals.TYPE_L_14_LONG, []);
				console.error("able to create long variable with array");
			} catch (err) { }
			try {
				new ScriptVariable("testVar", ScriptGlobals.TYPE_L_14_LONG, "test");
				console.error("able to create long variable with string");
			} catch (err) { }
			try {
				new ScriptVariable("testVar", ScriptGlobals.TYPE_L_14_LONG, true);
				console.error("able to create long variable with boolean");
			} catch (err) { }
			o = new ScriptVariable("testVar", ScriptGlobals.TYPE_L_14_LONG, 1);
			if (o.getLongVal() !== 1) {
				console.error("unable to create long variable with int");
			}
			o = new ScriptVariable("testVar", ScriptGlobals.TYPE_L_14_LONG, 2.5);
			if (o.getLongVal() !== 2) {
				console.error("unable to create long variable with float");
			}
			// TYPE_G_07_LONG_ARR
			try {
				new ScriptVariable("testVar", ScriptGlobals.TYPE_G_07_LONG_ARR, {});
				console.error("able to create long array variable with object");
			} catch (err) { }
			o = new ScriptVariable("testVar", ScriptGlobals.TYPE_G_07_LONG_ARR, null);
			if (!Array.isArray(o.getLongArrayVal())) {
				console.error("unable to create long array variable with null");
			}
			o = new ScriptVariable("testVar", ScriptGlobals.TYPE_G_07_LONG_ARR, []);
			if (!Array.isArray(o.getLongArrayVal())) {
				console.error("unable to create long array variable with array");
			}
			try {
				new ScriptVariable("testVar", ScriptGlobals.TYPE_G_07_LONG_ARR, "test");
				console.error("able to create long array variable with string");
			} catch (err) { }
			try {
				new ScriptVariable("testVar", ScriptGlobals.TYPE_G_07_LONG_ARR, true);
				console.error("able to create long array variable with boolean");
			} catch (err) { }
			o = new ScriptVariable("testVar", ScriptGlobals.TYPE_G_07_LONG_ARR, 1);
			if (!Array.isArray(o.getLongArrayVal())) {
				console.error("unable to create long array variable with int");
			}
			o = new ScriptVariable("testVar", ScriptGlobals.TYPE_G_07_LONG_ARR, 2.5);
			if (!Array.isArray(o.getLongArrayVal())) {
				console.error("unable to create long array variable with float");
			}
			// TYPE_L_15_LONG_ARR
			try {
				new ScriptVariable("testVar", ScriptGlobals.TYPE_L_15_LONG_ARR, {});
				console.error("able to create long array variable with object");
			} catch (err) { }
			o = new ScriptVariable("testVar", ScriptGlobals.TYPE_L_15_LONG_ARR, null);
			if (!Array.isArray(o.getLongArrayVal())) {
				console.error("unable to create long array variable with null");
			}
			o = new ScriptVariable("testVar", ScriptGlobals.TYPE_L_15_LONG_ARR, []);
			if (!Array.isArray(o.getLongArrayVal())) {
				console.error("unable to create long array variable with array");
			}
			try {
				new ScriptVariable("testVar", ScriptGlobals.TYPE_L_15_LONG_ARR, "test");
				console.error("able to create long array variable with string");
			} catch (err) { }
			try {
				new ScriptVariable("testVar", ScriptGlobals.TYPE_L_15_LONG_ARR, true);
				console.error("able to create long array variable with boolean");
			} catch (err) { }
			o = new ScriptVariable("testVar", ScriptGlobals.TYPE_L_15_LONG_ARR, 1);
			if (!Array.isArray(o.getLongArrayVal())) {
				console.error("unable to create long array variable with int");
			}
			o = new ScriptVariable("testVar", ScriptGlobals.TYPE_L_15_LONG_ARR, 2.5);
			if (!Array.isArray(o.getLongArrayVal())) {
				console.error("unable to create long array variable with float");
			}
		}
	};
	return ScriptVariableTest;
});