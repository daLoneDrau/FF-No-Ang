/**
 * BaseTester constructor.
 */
define(["require"], function(require) {
    function BaseTester() {
    	this.equalsTest = function(obj, anotherObj) {
    		if (obj.equals()) {
				console.error(["equals undefined"].join(""));
    		}
    		if (obj.equals(null)) {
				console.error(["equals null"].join(""));
    		}
    		if (obj.equals({})) {
				console.error(["equals object"].join(""));
    		}
    		if (obj.equals("test")) {
				console.error(["equals string"].join(""));
    		}
    		if (obj.equals(0.5)) {
				console.error(["equals float"].join(""));
    		}
			if (obj.equals(1)) {
				console.error(["equals int"].join(""));
			}
			if (obj.equals(1)) {
				console.error(["equals int"].join(""));
			}
			if (obj.equals(true)) {
				console.error(["equals boolean"].join(""));
			}
			if (obj.equals(anotherObj)) {
				console.error(["equals another instance"].join(""));
			}
    		if (!obj.equals(obj)) {
				console.error(["does not equal itself"].join(""));
    		} 
			console.log("end equals test");   		
    	}
    	this.intConstructorTest = function(obj) {
			try {
				new (require(obj))();
				console.error(["can create ", obj, " with undefined"].join(""));
			} catch (err) {
				//console.log(["cannot create ", obj, " with undefined"].join(""));
			}
			try {
				new (require(obj))(null);
				console.error(["can create ", obj, " with null"].join(""));
			} catch (err) {
				//console.log(["cannot create ", obj, " with null"].join(""));
			}
			try {
				new (require(obj))({});
				console.error(["can create ", obj, " with object"].join(""));
			} catch (err) {
				//console.log(["cannot create ", obj, " with string"].join(""));
			}
			try {
				new (require(obj))("test");
				console.error(["can create ", obj, " with string"].join(""));
			} catch (err) {
				//console.log(["cannot create ", obj, " with string"].join(""));
			}
			try {
				new (require(obj))(0.5);
				console.error(["can create ", obj, " with float"].join(""));
			} catch (err) {
				//console.log(["cannot create ", obj, " with float"].join(""));
			}
			try {
				new (require(obj))(true);
				console.error(["can create ", obj, " with boolean"].join(""));
			} catch (err) {
				//console.log(["cannot create ", obj, " with float"].join(""));
			}
			var inst = new (require(obj))(1);
			if (inst === null) {
				console.error(["cannot create ", obj, " with int"].join(""));
			}
			console.log("end constructor test for " + obj);
			return inst;
    	}
		this.booleanMemberTest = function(obj, member) {
			var setter = ["set", member].join("");
			var getter = [member.charAt(0).toLowerCase(), member.slice(1)].join("");
			try {
				obj[setter]();
				console.error(["can ", setter, " with undefined"].join(""));
			} catch (err) { }
			try {
				obj[setter](null);
				console.error(["can ", setter, " with null"].join(""));
			} catch (err) { }
			try {
				obj[setter]({});
				console.error(["can ", setter, " with object"].join(""));
			} catch (err) { }
			try {
				obj[setter](25);
				console.error(["can ", setter, " with int"].join(""));
			} catch (err) { }
			try {
				obj[setter](0.5);
				console.error(["can ", setter, " with float"].join(""));
			} catch (err) { }
			try {
				obj[setter]("test");
				console.error(["can ", setter, " with string"].join(""));
			} catch (err) { }
			obj[setter](true);
			if (!obj[getter]()) {
				console.error(["cannot ", setter, " with boolean"].join(""));
			}
			console.log("end test for " + setter + ", " + getter);
		}
		this.floatMemberTest = function(obj, setter, getter) {
			try {
				obj[setter]();
				console.error(["can ", setter, " with undefined"].join(""));
			} catch (err) {
				//console.log(["cannot ", setter, " with undefined"].join(""));
			}
			try {
				obj[setter](null);
				console.error(["can ", setter, " with null"].join(""));
			} catch (err) {
				//console.log(["cannot ", setter, " with null"].join(""));
			}
			try {
				obj[setter]({});
				console.error(["can ", setter, " with object"].join(""));
			} catch (err) {
				//console.log(["cannot ", setter, " with null"].join(""));
			}
			try {
				obj[setter]("test");
				console.error(["can ", setter, " with string"].join(""));
			} catch (err) {
				//console.log(["cannot ", setter, " with string"].join(""));
			}
			try {
				obj[setter](true);
				console.error(["can ", setter, " with boolean"].join(""));
			} catch (err) {
				//console.log(["cannot ", setter, " with string"].join(""));
			}
			obj[setter](0.5);
			if (obj[getter]() !== 0.5) {
				console.error(["cannot ", setter, " with float"].join(""));
			}
			obj[setter](3);
			if (obj[getter]() !== 3) {
				console.error(["cannot ", setter, " with int"].join(""));
			}
			console.log("end test for " + setter + ", " + getter);
		}
		this.intMemberTest = function(obj, setter, getter) {
			try {
				obj[setter]();
				console.error(["can ", setter, " with undefined"].join(""));
			} catch (err) {
				//console.log(["cannot ", setter, " with undefined"].join(""));
			}
			try {
				obj[setter](null);
				console.error(["can ", setter, " with null"].join(""));
			} catch (err) {
				//console.log(["cannot ", setter, " with null"].join(""));
			}
			try {
				obj[setter]({});
				console.error(["can ", setter, " with object"].join(""));
			} catch (err) {
				//console.log(["cannot ", setter, " with null"].join(""));
			}
			try {
				obj[setter]("test");
				console.error(["can ", setter, " with string"].join(""));
			} catch (err) {
				//console.log(["cannot ", setter, " with string"].join(""));
			}
			try {
				obj[setter](0.5);
				console.error(["can ", setter, " with float"].join(""));
			} catch (err) {
				//console.log(["cannot ", setter, " with float"].join(""));
			}
			try {
				obj[setter](true);
				console.error(["can ", setter, " with boolean"].join(""));
			} catch (err) {
				//console.log(["cannot ", setter, " with float"].join(""));
			}
			obj[setter](2);
			if (obj[getter]() !== 2) {
				console.error(["cannot ", setter, " with int"].join(""));
			}
			console.log("end test for " + setter + ", " + getter);
		}
		this.objectMemberTest = function(obj, member, setter, getter, nullsAllowed) {
			try {
				obj[setter]();
				console.error(["can ", setter, " with undefined"].join(""));
			} catch (err) {
				//console.log(["cannot ", setter, " with undefined"].join(""));
			}
			if (nullsAllowed !== undefined
					&& nullsAllowed !== null
					&& nullsAllowed) {
				obj[setter](null);
				if (obj[getter]() !== null) {
					console.error(["cannot ", setter, " with null"].join(""));
				}
			} else {
				try {
					obj[setter](null);
					console.error(["can ", setter, " with null"].join(""));
				} catch (err) {
					//console.log(["cannot ", setter, " with undefined"].join(""));
				}
			}
			try {
				obj[setter]("test");
				console.error(["can ", setter, " with string"].join(""));
			} catch (err) {
				//console.log(["cannot ", setter, " with string"].join(""));
			}
			try {
				obj[setter](25);
				console.error(["can ", setter, " with int"].join(""));
			} catch (err) {
				//console.log(["cannot ", setter, " with string"].join(""));
			}
			try {
				obj[setter](0.5);
				console.error(["can ", setter, " with float"].join(""));
			} catch (err) {
				//console.log(["cannot ", setter, " with float"].join(""));
			}
			try {
				obj[setter](true);
				console.error(["can ", setter, " with boolean"].join(""));
			} catch (err) {
				//console.log(["cannot ", setter, " with float"].join(""));
			}
			var instance = null;
			if (typeof member === "string") {
				instance = new (require(member))();
			} else {
				instance = member;
			}
			try {
				obj[setter](instance);
			} catch (err) {
				console.log(err);
				console.error(["cannot ", setter, " with ", member].join(""));				
			}
			var member2 = obj[getter]();
			if (typeof member2 !== typeof instance) {
				console.error(["cannot ", getter, " assigned type"].join(""));
			}
			console.log("end test for " + setter + ", " + getter);
		}
		this.stringMemberTest = function(obj, setter, getter, nullsAllowed) {
			try {
				obj[setter]();
				console.error(["can ", setter, " with undefined"].join(""));
			} catch (err) { }
			if (nullsAllowed !== undefined
					&& nullsAllowed) {
				obj[setter](null);
				if (obj[getter]() !== null) {
					console.error(["cannot ", setter, " with null"].join(""));
				}
			} else {
				try {
					obj[setter](null);
					console.error(["can ", setter, " with null"].join(""));
				} catch (err) { }
			}
			try {
				obj[setter]({});
				console.error(["can ", setter, " with object"].join(""));
			} catch (err) {
				//console.log(["cannot ", setter, " with string"].join(""));
			}
			try {
				obj[setter](25);
				console.error(["can ", setter, " with int"].join(""));
			} catch (err) {
				//console.log(["cannot ", setter, " with string"].join(""));
			}
			try {
				obj[setter](0.5);
				console.error(["can ", setter, " with float"].join(""));
			} catch (err) {
				//console.log(["cannot ", setter, " with float"].join(""));
			}
			try {
				obj[setter](true);
				console.error(["can ", setter, " with boolean"].join(""));
			} catch (err) {
				//console.log(["cannot ", setter, " with float"].join(""));
			}
			obj[setter]("test");
			if (obj[getter]() !== "test") {
				console.error(["cannot ", setter, " with int"].join(""));
			}
			console.log("end test for " + setter + ", " + getter);
		}
		this.associationMemberTest = function(obj, associationInstance, associationMethod, setter,
				getter) {
			try {
				obj[setter]();
				console.error(["can ", setter, " with undefined"].join(""));
			} catch (err) { }
			try {
				obj[setter](null);
				console.error("can ", setter, " with null".join(""));
			} catch (err) { }
			try {
				obj[setter]({});
				console.error("can ", setter, " with object".join(""));
			} catch (err) { }
			try {
				obj[setter]("test");
				console.error("can ", setter, " with string".join(""));
			} catch (err) { }
			try {
				obj[setter](1);
				console.error("can ", setter, " with Number".join(""));
			} catch (err) { }
			try {
				obj[setter](true);
				console.error(["can ", setter, " with boolean"].join(""));
			} catch (err) { }
			obj[setter](associationInstance);
			if (typeof obj[getter]() !== typeof associationInstance) {
				console.error(["cannot ", getter, " assigned type"].join(""));
			}
			if (typeof associationInstance[associationMethod] === "function") {
				if (!associationInstance[associationMethod]().equals(obj)) {
					console.error("association not set for associationInstance");
				}
			}
			console.log(["end test for ", setter, ", ", getter].join(""));
		}
		this.flagTest = function(obj, flag) {
			var add = ["add", flag].join("");
			var clear = ["clear", flag, "s"].join("");
			var has = ["has", flag].join("");
			var remove = ["remove", flag].join("");
			try {
				obj[add]();
				console.error(["can ", add, " with undefined"].join(""));
			} catch (err) {
				//console.log(["cannot ", add, " with undefined"].join(""));
			}
			try {
				obj[add](null);
				console.error(["can ", add, " with null"].join(""));
			} catch (err) {
				//console.log(["cannot ", add, " with null"].join(""));
			}
			try {
				obj[add]({});
				console.error(["can ", add, " with object"].join(""));
			} catch (err) {
				//console.log(["cannot ", add, " with null"].join(""));
			}
			try {
				obj[add]("test");
				console.error(["can ", add, " with string"].join(""));
			} catch (err) {
				//console.log(["cannot ", add, " with string"].join(""));
			}
			try {
				obj[add](0.5);
				console.error(["can ", add, " with float"].join(""));
			} catch (err) {
				//console.log(["cannot ", add, " with float"].join(""));
			}
			try {
				obj[add](3);
				console.error(["can ", add, " with non-power of two"].join(""));
			} catch (err) {
				//console.log(["cannot ", add, " with non-power of two"].join(""));
			}
			try {
				obj[add](true);
				console.error(["can ", add, " with boolean"].join(""));
			} catch (err) { }
			obj[add](128);
			try {
				obj[has]();
				console.error([has, " undefined"].join(""));
			} catch (err) {
				//console.log(["cannot ", has, " with undefined"].join(""));
			}
			try {
				obj[has]({});
				console.error([has, " object"].join(""));
			} catch (err) {
				//console.log(["cannot ", has, " with undefined"].join(""));
			}
			try {
				obj[has](null);
				console.error([has, " null"].join(""));
			} catch (err) {
				//console.log(["cannot ", has, " with null"].join(""));
			}
			try {
				obj[has]("test");
				console.error([has, " string"].join(""));
			} catch (err) {
				//console.log(["cannot ", has, " with string"].join(""));
			}
			try {
				obj[has](0.5);
				console.error([has, " float"].join(""));
			} catch (err) {
				//console.log(["cannot ", has, " with float"].join(""));
			}
			try {
				obj[has](3);
				console.error([has, " non-power of two"].join(""));
			} catch (err) {
				//console.log(["cannot ", has, " with non-power of two"].join(""));
			}
			try {
				obj[has](true);
				console.error(["can ", has, " with boolean"].join(""));
			} catch (err) { }
			if (obj[has](64)) {
				console.error([has, " unassigned flag"].join(""));
			}
			if (!obj[has](128)) {
				console.error(["does not ", has, " assigned flag"].join(""));
			}
			obj[clear]();
			if (obj[has](128)) {
				console.error([has, " assigned flag after clearing"].join(""));
			}
			try {
				obj[remove]();
				console.error(["can ", remove, " with undefined"].join(""));
			} catch (err) {
				//console.log(["cannot ", remove, " with undefined"].join(""));
			}
			try {
				obj[remove](null);
				console.error(["can ", remove, " with null"].join(""));
			} catch (err) {
				//console.log(["cannot ", remove, " with null"].join(""));
			}
			try {
				obj[remove]({});
				console.error(["can ", remove, " with object"].join(""));
			} catch (err) {
				//console.log(["cannot ", remove, " with null"].join(""));
			}
			try {
				obj[remove]("test");
				console.error(["cannot ", remove, " with string"].join(""));
			} catch (err) {
				//console.log(["cannot ", remove, " with string"].join(""));
			}
			try {
				obj[remove](0.5);
				console.error(["can ", remove, " with string"].join(""));
			} catch (err) {
				//console.log(["cannot ", remove, " with float"].join(""));
			}
			try {
				obj[remove](3);
				console.error(["can ", remove, " with non-power of two"].join(""));
			} catch (err) {
				//console.log(["cannot ", remove, " with non-power of two"].join(""));
			}
			try {
				obj[remove](true);
				console.error(["can ", remove, " with boolean"].join(""));
			} catch (err) { }
			obj[add](128);
			if (!obj[has](128)) {
				console.error(["does not ", has, " assigned flag"].join(""));
			}
			obj[remove](128);
			if (obj[has](128)) {
				console.error([has, " assigned flag after removal"].join(""));
			}
			console.log("end test for " + add + ", " + clear + ", " + has + ", " + remove);
		}
		this.stringIntKeyValueTest = function(obj, map) {
			var add = ["add", map].join("");
			var get = ["get", map].join("");
			var has = ["has", map].join("");
			var remove = ["remove", map].join("");
			try {
				obj[add]();
				console.error(["can ", add, " with no values"].join(""));
			} catch (err) {
				//console.log(["cannot ", add, " with undefined"].join(""));
			}
			try {
				obj[add]("name");
				console.error(["can ", add, " with 1 string value"].join(""));
			} catch (err) {
				//console.log(["cannot ", add, " with undefined"].join(""));
			}
			try {
				obj[add](1);
				console.error(["can ", add, " with 1 int value"].join(""));
			} catch (err) {
				//console.log(["cannot ", add, " with undefined"].join(""));
			}
			try {
				obj[add](true);
				console.error(["can ", add, " with boolean"].join(""));
			} catch (err) { }
			try {
				obj[add](null, null);
				console.error(["can ", add, " with nulls"].join(""));
			} catch (err) {
				//console.log(["cannot ", add, " with null"].join(""));
			}
			try {
				obj[add](null, 1);
				console.error(["can ", add, " with null as key"].join(""));
			} catch (err) {
				//console.log(["cannot ", add, " with string"].join(""));
			}
			try {
				obj[add]({}, 1);
				console.error(["can ", add, " with object as key"].join(""));
			} catch (err) {
				//console.log(["cannot ", add, " with string"].join(""));
			}
			try {
				obj[add](1, 1);
				console.error(["can ", add, " with int as key"].join(""));
			} catch (err) {
				//console.log(["cannot ", add, " with string"].join(""));
			}
			try {
				obj[add](0.5, 1);
				console.error(["can ", add, " with float as key"].join(""));
			} catch (err) {
				//console.log(["cannot ", add, " with float"].join(""));
			}
			try {
				obj[add](true, 1);
				console.error(["can ", add, " with boolean as key"].join(""));
			} catch (err) {
				//console.log(["cannot ", add, " with float"].join(""));
			}
			try {
				obj[add]("test", null);
				console.error(["can ", add, " with null as value"].join(""));
			} catch (err) {
				//console.log(["cannot ", add, " with null"].join(""));
			}
			try {
				obj[add]("test", {});
				console.error(["can ", add, " with object as value"].join(""));
			} catch (err) {
				//console.log(["cannot ", add, " with null"].join(""));
			}
			try {
				obj[add]("test", 0.5);
				console.error(["can ", add, " with float as value"].join(""));
			} catch (err) {
				//console.log(["cannot ", add, " with null"].join(""));
			}
			try {
				obj[add]("test", true);
				console.error(["can ", add, " with boolean as value"].join(""));
			} catch (err) {
				//console.log(["cannot ", add, " with null"].join(""));
			}
			obj[add]("test", 1);
			try {
				obj[get]();
				console.error(["can ", get, " undefined"].join(""));
			} catch (err) {
				//console.log(["cannot ", has, " with undefined"].join(""));
			}
			try {
				obj[get](null);
				console.error(["can ", get, " null"].join(""));
			} catch (err) {
				//console.log(["cannot ", has, " with null"].join(""));
			}
			try {
				obj[get]({});
				console.error(["can ", get, " object"].join(""));
			} catch (err) {
				//console.log(["cannot ", has, " with undefined"].join(""));
			}
			try {
				obj[get](0.5);
				console.error(["can ", get, " Number"].join(""));
			} catch (err) {
				//console.log(["cannot ", has, " with float"].join(""));
			}
			try {
				obj[get](true);
				console.error(["can ", get, " boolean"].join(""));
			} catch (err) { }
			if (typeof obj[get]("test") !== "number") {
				console.error(["cannot ", get, " assigned key"].join(""));
			}
			console.log("end test for " + add + ", " + get + ", " + has + ", " + remove);
		}
		this.stringListTest = function(obj, list) {
			var add = ["add", list].join("");
			var has = ["has", list].join("");
			var remove = ["remove", list].join("");
			try {
				obj[add]();
				console.error(["can ", add, " with undefined"].join(""));
			} catch (err) {
				//console.log(err);
			}
			try {
				obj[add](null);
				console.error(["can ", add, " with null"].join(""));
			} catch (err) {
				//console.log(err);
			}
			try {
				obj[add]({});
				console.error(["can ", add, " with object"].join(""));
			} catch (err) {
				//console.log(["cannot ", add, " with string"].join(""));
			}
			try {
				obj[add](1);
				console.error(["can ", add, " with int"].join(""));
			} catch (err) {
				//console.log(["cannot ", add, " with string"].join(""));
			}
			try {
				obj[add](0.5);
				console.error(["can ", add, " with float"].join(""));
			} catch (err) {
				//console.log(["cannot ", add, " with float"].join(""));
			}
			try {
				obj[add](true);
				console.error(["can ", add, " with boolean"].join(""));
			} catch (err) { }
			obj[add]("test");
			try {
				obj[has]();
				console.error(["can ", has, " with undefined"].join(""));
			} catch (err) {
				//console.log(err);
			}
			try {
				obj[has](null);
				console.error(["can ", has, " with null"].join(""));
			} catch (err) {
				//console.log(err);
			}
			try {
				obj[has]({});
				console.error(["can ", has, " with object"].join(""));
			} catch (err) {
				//console.log(["cannot ", add, " with string"].join(""));
			}
			try {
				obj[has](1);
				console.error(["can ", has, " with int"].join(""));
			} catch (err) {
				//console.log(["cannot ", add, " with string"].join(""));
			}
			try {
				obj[has](0.5);
				console.error(["can ", has, " with float"].join(""));
			} catch (err) {
				//console.log(["cannot ", add, " with float"].join(""));
			}
			try {
				obj[has](true);
				console.error(["can ", has, " with boolean"].join(""));
			} catch (err) { }
			if (!obj[has]("test")) {
				console.error(["does not ", has, " assigned item"].join(""));
			}
			try {
				obj[remove]();
				console.error(["can ", remove, " with undefined"].join(""));
			} catch (err) {
				//console.log(err);
			}
			try {
				obj[remove](null);
				console.error(["can ", remove, " with null"].join(""));
			} catch (err) {
				//console.log(err);
			}
			try {
				obj[remove]({});
				console.error(["can ", remove, " with object"].join(""));
			} catch (err) {
				//console.log(["cannot ", add, " with string"].join(""));
			}
			try {
				obj[remove](1);
				console.error(["can ", remove, " with int"].join(""));
			} catch (err) {
				//console.log(["cannot ", add, " with string"].join(""));
			}
			try {
				obj[remove](0.5);
				console.error(["can ", remove, " with float"].join(""));
			} catch (err) {
				//console.log(["cannot ", add, " with float"].join(""));
			}
			try {
				obj[remove](true);
				console.error(["can ", remove, " with boolean"].join(""));
			} catch (err) { }
			obj[remove]("test");
			if (obj[has]("test")) {
				console.error([has, " assigned item after removal"].join(""));
			}
			console.log("end test for " + add + ", " + has + ", " + remove);
		}
		this.intListTest = function(obj, list) {
			var add = ["add", list].join("");
			var has = ["has", list].join("");
			var remove = ["remove", list].join("");
			try {
				obj[add]();
				console.error(["can ", add, " with undefined"].join(""));
			} catch (err) {
				//console.log(err);
			}
			try {
				obj[add](null);
				console.error(["can ", add, " with null"].join(""));
			} catch (err) {
				//console.log(err);
			}
			try {
				obj[add]({});
				console.error(["can ", add, " with object"].join(""));
			} catch (err) {
				//console.log(["cannot ", add, " with string"].join(""));
			}
			try {
				obj[add]("test");
				console.error(["can ", add, " with string"].join(""));
			} catch (err) {
				//console.log(["cannot ", add, " with string"].join(""));
			}
			try {
				obj[add](0.5);
				console.error(["can ", add, " with float"].join(""));
			} catch (err) {
				//console.log(["cannot ", add, " with float"].join(""));
			}
			try {
				obj[add](true);
				console.error(["can ", add, " with boolean"].join(""));
			} catch (err) { }
			obj[add](1);
			try {
				obj[has]();
				console.error(["can ", has, " with undefined"].join(""));
			} catch (err) {
				//console.log(err);
			}
			try {
				obj[has](null);
				console.error(["can ", has, " with null"].join(""));
			} catch (err) {
				//console.log(err);
			}
			try {
				obj[has]({});
				console.error(["can ", has, " with object"].join(""));
			} catch (err) {
				//console.log(["cannot ", add, " with string"].join(""));
			}
			try {
				obj[has]("test");
				console.error(["can ", has, " with string"].join(""));
			} catch (err) {
				//console.log(["cannot ", add, " with string"].join(""));
			}
			try {
				obj[has](0.5);
				console.error(["can ", has, " with float"].join(""));
			} catch (err) {
				//console.log(["cannot ", add, " with float"].join(""));
			}
			try {
				obj[has](true);
				console.error(["can ", has, " with boolean"].join(""));
			} catch (err) { }
			if (!obj[has](1)) {
				console.error(["does not ", has, " assigned item"].join(""));
			}
			try {
				obj[remove]();
				console.error(["can ", remove, " with undefined"].join(""));
			} catch (err) {
				//console.log(err);
			}
			try {
				obj[remove](null);
				console.error(["can ", remove, " with null"].join(""));
			} catch (err) {
				//console.log(err);
			}
			try {
				obj[remove]({});
				console.error(["can ", remove, " with object"].join(""));
			} catch (err) {
				//console.log(["cannot ", add, " with string"].join(""));
			}
			try {
				obj[remove]("test");
				console.error(["can ", remove, " with string"].join(""));
			} catch (err) {
				//console.log(["cannot ", add, " with string"].join(""));
			}
			try {
				obj[remove](0.5);
				console.error(["can ", remove, " with float"].join(""));
			} catch (err) {
				//console.log(["cannot ", add, " with float"].join(""));
			}
			try {
				obj[remove](true);
				console.error(["can ", remove, " with boolean"].join(""));
			} catch (err) { }
			obj[remove](1);
			if (obj[has](1)) {
				console.error([has, " assigned item after removal"].join(""));
			}
			console.log("end test for " + add + ", " + has + ", " + remove);
		}
    }
	return BaseTester;
});