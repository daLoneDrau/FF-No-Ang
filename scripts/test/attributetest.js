define(['com/dalonedrow/rpg/base/flyweights/attribute', "test/basetester"], function(Attribute,
		BaseTester) {
	function AttributeTest() {
		BaseTester.call(this);
		this.test = function() {
			var a = new Attribute("code", "name", "desc");
			this.stringMemberTest(a, "setAbbreviation", "getAbbreviation");
			this.stringMemberTest(a, "setDescription", "getDescription");
			this.stringMemberTest(a, "setDisplayName", "getDisplayName");
			this.floatMemberTest(a, "setBase", "getBase");
		}
	};
	return AttributeTest;
});