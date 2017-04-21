/**
 * 
 */
define(["com/dalonedrow/utils/hashcode"], function(Hashcode) {
    function Combatant() {
		Hashcode.call(this);
	}
    Combatant.prototype = Object.create(Hashcode.prototype);
	return Combatant;
});
