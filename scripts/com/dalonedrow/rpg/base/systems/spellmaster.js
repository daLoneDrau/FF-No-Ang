/**
 * Script
 * module with no dependencies
 */
define(["com/dalonedrow/rpg/base/flyweights/spell"], function(Spell) {
    function SpellMaster() {
	    /** the list of {@link Spell}s. */
    	var spells = [];
    	this.newSpell = function() {
    		
    	}
    }
    SpellMaster.getInstance = function() {
		return SpellMaster.instance;
	}
    SpellMaster.setInstance = function(i) {
		if (!(i instanceof SpellMaster)) {
			throw new Error("Instance must be a SpellMaster subclass.")
		}
		SpellMaster.instance = i;
	}
    return SpellMaster;
});
