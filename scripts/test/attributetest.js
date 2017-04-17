define(['com/dalonedrow/rpg/base/flyweights/attribute'], function(Attribute) {
	function AttributeTest() {
		this.test = function() {
			var a = new Attribute("code", "name", "desc");
			console.log(a.getAbbreviation());
			console.log(a.getDisplayName());
			console.log(a.getDescription());
			a.setBase(10);
			a.adjustModifier(2);
			console.log(a.getFull());
		}
	};
	return AttributeTest;
});