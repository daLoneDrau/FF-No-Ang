/**
 * Script
 * module with no dependencies
 */
define(["com/dalonedrow/rpg/base/flyweights/spell",
	"com/dalonedrow/rpg/base/constants/equipmentglobals"], function(Spell, EquipmentGlobals) {
    function SpellMaster() {
	    /** the list of {@link Spell}s. */
    	var spells = [];
    	for (var i = EquipmentGlobals.MAX_SPELLS - 1; i >= 0; i--) {
    		spells.push(new Spell());
    	}
	    /** the next available id. */
	    var nextId = 0;
    	this.newSpell = function(source, target, type) {
    		for (var i = 0; i < EquipmentGlobals.MAX_SPELLS; i++) {
    			var spell = spells[i];
    			if (!spell.exists()) {
    				spell.setExists(true);
    				spell.setId(nextId++);
    				spell.setLonginfo(-1);
    				spell.setLonginfo2(-1);
    				spell.setMisc(null);
    				spell.setCaster(source);
    				spell.setTarget(target);
    				spell.setType(type);
    				break;
    			}
    		}
    	}
        this.getSpell = function(id) {
        	var spell = null;
        	for (var i = spells.length - 1; i >= 0; i--) {
        		if (spells[i].getId() === id) {
        			spell = spells[i];
        			break;
        		}
        	}
        	return spell;
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
