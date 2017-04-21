/**
 * BaseTester constructor.
 */
define(function() {
    function BaseTester() {
    	this.intConstructorTest = function(obj) {
			try {
				new window[obj]();
			} catch (err) {
				console.log(["cannot create ", obj, " with undefined"].join(""));
			}
			try {
				new window[obj](null);
			} catch (err) {
				console.log(["cannot create ", obj, " with null"].join(""));
			}
			try {
				new window[obj]("test");
			} catch (err) {
				console.log(["cannot create ", obj, " with string"].join(""));
			}
			try {
				new new window[obj](0.5);
			} catch (err) {
				console.log(["cannot create ", obj, " with float"].join(""));
			}
			var inst = new window[obj](1);
			if (inst !== null) {
				console.log(["can create ", obj, " with int"].join(""));
			}
			return inst;
    	}
		this.intSetterTest = function(obj, setter, getter) {
			try {
				obj[setter]();
			} catch (err) {
				console.log(["cannot ", setter, " with undefined"].join(""));
			}
			try {
				obj[setter](null);
			} catch (err) {
				console.log(["cannot ", setter, " with null"].join(""));
			}
			try {
				obj[setter]("test");
			} catch (err) {
				console.log(["cannot ", setter, " with string"].join(""));
			}
			try {
				obj[setter](0.5);
			} catch (err) {
				console.log(["cannot ", setter, " with float"].join(""));
			}
			obj[setter](3);
			if (obj[getter]() === 3) {
				console.log(["can ", setter, " with int"].join(""));
			}
		}
    }
	return BaseTester;
});