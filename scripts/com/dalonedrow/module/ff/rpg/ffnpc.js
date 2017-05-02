/**
 * 
 */
define(["com/dalonedrow/module/ff/constants/ffequipmentelements",
	"com/dalonedrow/module/ff/rpg/ffinteractiveobject",
	"com/dalonedrow/module/ff/systems/webserviceclient",
	"com/dalonedrow/rpg/base/flyweights/ionpcdata"], function(FFEquipmentElements,
			FFInteractiveObject, WebServiceClient, IoNpcData) {
	function FFNpc() {
		IoNpcData.call(this);		
	}
	FFNpc.prototype = Object.create(IoNpcData.prototype);
	if (FFEquipmentElements.values.length === 0) {
		WebServiceClient.getInstance().loadEquipmentElements();
	}
    /** the list of attributes and their matching names and modifiers. */
	FFNpc.attributeMap = [
            [ "ST", "Stamina", FFEquipmentElements.valueOf("ELEMENT_STAMINA").getIndex() ],
            [ "MST", "Max Stamina",
                    FFEquipmentElements.valueOf("ELEMENT_MAX_STAMINA").getIndex() ],
            [ "SK", "Skill", FFEquipmentElements.valueOf("ELEMENT_SKILL").getIndex() ],
            [ "MSK", "Max Skill", FFEquipmentElements.valueOf("ELEMENT_MAX_SKILL").getIndex() ],
            [ "DMG", "Damage", FFEquipmentElements.valueOf("ELEMENT_DAMAGE").getIndex() ]
            ];
    /**
     * Adjusts the NPC's life by a specific amount.
     * @param dmg the amount
     */
    FFNpc.prototype.adjustLife = function(dmg) {
    	try {
    		this.checkFloat(dmg);
    	} catch (err) {
            var s = [];
            s.push("ERROR! FFNpc.adjustLife() - dmg ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        this.setBaseAttributeScore("ST", this.getBaseAttributeScore("ST") + dmg);
        if (this.getBaseAttributeScore("ST") > this.getFullAttributeScore("MST")) {
            // if Stamina now > max
            this.setBaseAttributeScore("ST", this.getFullAttributeScore("MST"));
        }
        if (this.getBaseAttributeScore("ST") < 0) {
            // if Stamina now < 0
            this.setBaseAttributeScore("ST", 0);
        }
    }
    /**
     * Adjusts the NPC's mana by a specific amount.
     * @param dmg the amount
     */
    FFNpc.prototype.adjustMana = function(dmg) {
    	try {
    		this.checkFloat(dmg);
    	} catch (err) {
            var s = [];
            s.push("ERROR! FFNpc.adjustMana() - dmg ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        // TODO Auto-generated method stub

    }
    FFNpc.prototype.applyRulesModifiers = function() {
        // TODO Auto-generated method stub

    }
    FFNpc.prototype.applyRulesPercentModifiers = function() {
        // TODO Auto-generated method stub

    }
    FFNpc.prototype.ARX_EQUIPMENT_RecreatePlayerMesh = function() {
        // TODO Auto-generated method stub

    }
    FFNpc.prototype.ARX_NPC_ManagePoison = function() {
        // TODO Auto-generated method stub

    }
    /**
     * @param xp
     * @param killerIO
     */
    FFNpc.prototype.awardXpForNpcDeath = function(xp, killerIO) {
    	try {
    		this.checkInteger(xp);
    	} catch (err) {
            var s = [];
            s.push("ERROR! FFNpc.awardXpForNpcDeath() - xp ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkInstanceOf(killerIO, FFInteractiveObject);
    	} catch (err) {
            var s = [];
            s.push("ERROR! FFNpc.awardXpForNpcDeath() - killerIO ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        // NO XP
    }
    FFNpc.prototype.calculateBackstab = function() {
        return false;
    }
    FFNpc.prototype.calculateCriticalHit = function() {
        return false;
    }
    /**
     * Handles a non-living NPC being damaged.
     * @param dmg the amount of damage
     * @param srcIoid the source of the damage
     * @param isSpellDamage flag indicating whether the damage is from a spell
     */
    FFNpc.prototype.damageNonLivingNPC = function(dmg, srcIoid, isSpellDamage) {
    	try {
    		this.checkFloat(dmg);
    	} catch (err) {
            var s = [];
            s.push("ERROR! FFNpc.damageNonLivingNPC() - dmg ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkInteger(srcIoid);
    	} catch (err) {
            var s = [];
            s.push("ERROR! FFNpc.damageNonLivingNPC() - srcIoid ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkBoolean(isSpellDamage);
    	} catch (err) {
            var s = [];
            s.push("ERROR! FFNpc.damageNonLivingNPC() - isSpellDamage ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        // TODO Auto-generated method stub

    }
    FFNpc.prototype.getAttributeMap = function() {
        return FFNpc.attributeMap;
    }
	/**
	 * Gets the NPC's base life value from the correct attribute.
	 * @return {@link float}
	 */
    FFNpc.prototype.getBaseLife = function() {
        return this.getBaseAttributeScore("ST");
    }
	/**
	 * Gets the NPC's base mana value from the correct attribute.
	 * @return {@link float}
	 */
    FFNpc.prototype.getBaseMana = function() {
        // TODO Auto-generated method stub
        return 0;
    }
    FFNpc.prototype.getFullDamage = function() {
        return this.getFullAttributeScore("DMG");
    }
    FFNpc.prototype.getMaxLife = function() {
        return this.getBaseAttributeScore("MST");
    }
    FFNpc.prototype.getPoisonned = function() {
        // TODO Auto-generated method stub
        return 0;
    }
    /**
     * Gets the status strings used in the display.
     * @return {@link String}[]
     * @if an error occurs
     */
    FFNpc.prototype.getStatusString = function() {
        this.computeFullStats();
        var sk = [], st = [];
        sb.push(getFullAttributeScore("SK"));
        sk.push('/');
        sk.push(getFullAttributeScore("MSK"));
        
        st.push(getFullAttributeScore("ST"));
        st.push('/');
        st.push(getFullAttributeScore("MST"));
        var s = [ this.getTitle() , sk.join(""), st.join("") ];
        sk = null;
        st = null;
        return s;
    }
    /**
     * Determines if the NPC has life remaining.
     * @return <tt>true</tt> if the NPC still have some LP/HP remaining;
     *         <tt>false</tt> otherwise
     */
    FFNpc.prototype.hasLifeRemaining = function() {
        return this.getBaseAttributeScore("ST") > 0;
    }
    /** Moves the NPC to their initial position. */
    FFNpc.prototype.moveToInitialPosition = function() {
        // TODO Auto-generated method stub

    }
    /** Restores the NPC to their maximum life. */
    FFNpc.prototype.restoreLifeToMax = function() {
        this.setBaseAttributeScore("ST", this.getBaseAttributeScore("MST"));
    }
    FFNpc.prototype.stopActiveAnimation = function() {
        // TODO Auto-generated method stub

    }
    FFNpc.prototype.stopIdleAnimation = function() {
        // TODO Auto-generated method stub

    }
    return FFNpc;
});
