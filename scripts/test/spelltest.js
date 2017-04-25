define(["com/dalonedrow/rpg/base/flyweights/spell",
	"test/basetester"], function(Spell, BaseTester) {
	function SpellTest() {
		BaseTester.call(this);
		this.test = function() {
			var o = new Spell;
			this.flagTest(o, "Flag");
			this.intMemberTest(o, "setCaster", "getCaster");
			this.floatMemberTest(o, "setCasterLevel", "getCasterLevel");
			this.booleanMemberTest(o, "Exists");
			this.intMemberTest(o, "setId", "getId");
			this.intMemberTest(o, "setLastTurnUpdated", "getLastTurnUpdated");
			this.intMemberTest(o, "setLastUpdated", "getLastUpdated");
			this.intMemberTest(o, "setLonginfo", "getLonginfo");
			this.intMemberTest(o, "setLonginfo2", "getLonginfo2");
			this.intMemberTest(o, "setTarget", "getTarget");
			this.intMemberTest(o, "setTimeCreated", "getTimeCreated");
			this.intMemberTest(o, "setTimeToLive", "getTimeToLive");
			this.intMemberTest(o, "setTurnCreated", "getTurnCreated");
			this.intMemberTest(o, "setTurnsToLive", "getTurnsToLive");
			this.intMemberTest(o, "setType", "getType");
			console.log("end Spell tests");
		}
	};
	return SpellTest;
});