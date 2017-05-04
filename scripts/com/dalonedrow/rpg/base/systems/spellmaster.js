/**
 * Script
 * module with no dependencies
 */
define(["com/dalonedrow/rpg/base/flyweights/spell",
	"com/dalonedrow/rpg/base/constants/equipmentglobals",
	"com/dalonedrow/utils/hashcode"], function(Spell, EquipmentGlobals, Hashcode) {
	/** the singleton instance. */
    var instance = null;
    var SpellMaster = function() {
		Hashcode.call(this);
	    /** the next available id. */
	    this.nextId = 0;
	    /** the list of {@link Spell}s. */
    	this.spells = [];
    	for (var i = EquipmentGlobals.MAX_SPELLS - 1; i >= 0; i--) {
    		this.spells.push(new Spell());
    	}
    }
    SpellMaster.prototype = Object.create(Hashcode.prototype);
    SpellMaster.prototype.newSpell = function(source, target, type) {
		for (var i = 0; i < EquipmentGlobals.MAX_SPELLS; i++) {
			var spell = this.spells[i];
			if (!spell.exists()) {
				spell.setExists(true);
				spell.setId(this.nextId++);
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
    SpellMaster.prototype.getSpell = function(id) {
    	var spell = null;
    	for (var i = this.spells.length - 1; i >= 0; i--) {
    		if (this.spells[i].getId() === id) {
    			spell = this.spells[i];
    			break;
    		}
    	}
    	return spell;
    }
    SpellMaster.getInstance = function() {
        if (instance === null) {
        	throw new Error("No instance has been set!");
        }
        return instance;
	}
    SpellMaster.setInstance = function(val) {
		if (val === undefined) {
	        throw new Error("Error!  SpellMaster.setInstance() - val is undefined");
		}
		if (val === null) {
	        throw new Error("Error!  SpellMaster.setInstance() - val is null");
		}
		if (!(val instanceof Script)) {
	        throw new Error("Error!  SpellMaster.setInstance() - val is not a SpellMaster subclass.")
		}
		instance = val;
	}
    return SpellMaster;
});
