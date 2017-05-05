/**
 * 
 */
define(["com/dalonedrow/module/ff/constants/ffequipmentelements",
	"com/dalonedrow/module/ff/systems/webserviceclient",
	"com/dalonedrow/rpg/base/constants/dice",
	"com/dalonedrow/rpg/base/flyweights/ioequipitem",
	"com/dalonedrow/rpg/base/flyweights/iopcdata"],
		function(FFEquipmentElements, WebServiceClient, Dice, IOEquipItem, IoPcData) {
	function FFCharacter() {
		IoPcData.call(this);
	    /** flag indicating pretty printing has been turned on. */
	    this.prettyPrinting = false;
	    this.REFUSE_GAME_RETURN = false;
	}
	FFCharacter.prototype = Object.create(IoPcData.prototype);
	if (FFEquipmentElements.values.length === 0) {
		WebServiceClient.getInstance().loadEquipmentElements();
	}
    /** the list of attributes and their matching names and modifiers. */
	FFCharacter.attributeMap = [
            [ "ST", "Stamina", FFEquipmentElements.valueOf("ELEMENT_STAMINA").getIndex() ],
            [ "MST", "Max Stamina",
                    FFEquipmentElements.valueOf("ELEMENT_MAX_STAMINA").getIndex() ],
            [ "SK", "Skill", FFEquipmentElements.valueOf("ELEMENT_SKILL").getIndex() ],
            [ "MSK", "Max Skill", FFEquipmentElements.valueOf("ELEMENT_MAX_SKILL").getIndex() ],
            [ "LK", "Luck", FFEquipmentElements.valueOf("ELEMENT_LUCK").getIndex() ],
            [ "MLK", "Max Luck", FFEquipmentElements.valueOf("ELEMENT_MAX_LUCK").getIndex() ],
            [ "DMG", "Damage", FFEquipmentElements.valueOf("ELEMENT_DAMAGE").getIndex() ]
            ];
	/**
	 * Adjusts the player's mana by a specific amount.
	 * @param dmg the amount
	 */
    FFCharacter.prototype.adjustMana = function(dmg) {
    	try {
    		this.checkFloat(dmg);
    	} catch (err) {
            var s = [];
            s.push("ERROR! FFCharacter.adjustMana() - dmg ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        // TODO Auto-generated method stub

    }
    FFCharacter.prototype.applyRulesModifiers = function() {
        // TODO Auto-generated method stub

    }
    FFCharacter.prototype.applyRulesPercentModifiers = function() {
        // TODO Auto-generated method stub

    }
    FFCharacter.prototype.ARX_EQUIPMENT_RecreatePlayerMesh = function() {
        // TODO Auto-generated method stub

    }
    FFCharacter.prototype.calculateBackstab = function() {
        return false;
    }
    FFCharacter.prototype.calculateCriticalHit = function() {
        return false;
    }
	/**
	 * Determines if a PC can identify a piece of equipment.
	 * @param equipitem
	 * @return <tt>true</tt> if the PC can identify the equipment; <tt>false</tt> otherwise
	 */
    FFCharacter.prototype.canIdentifyEquipment = function(equipitem) {
    	try {
    		this.checkInstanceOf(equipitem);
    	} catch (err) {
            var s = [];
            s.push("ERROR! FFCharacter.canIdentifyEquipment() - equipitem ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        // TODO Auto-generated method stub
        return false;
    }
    FFCharacter.prototype.getAttributeMap = function() {
        return FFCharacter.attributeMap;
    }
	/**
	 * Gets the player's base life value from the correct attribute.
	 * @return {@link float}
	 */
    FFCharacter.prototype.getBaseLife = function() {
        return this.getFullAttributeScore("ST");
    }
	/**
	 * Gets the player's base mana value from the correct attribute.
	 * @return {@link float}
	 */
    FFCharacter.prototype.getBaseMana = function() {
        // TODO Auto-generated method stub
        return 0;
    }
    FFCharacter.prototype.getFullDamage = function() {
        return this.getFullAttributeScore("DMG");
    }
    FFCharacter.prototype.getLifeAttribute = function() {
        return "ST";
    }
    FFCharacter.prototype.getMaxLife = function() {
        return this.getBaseAttributeScore("MST");
    }
    /**
     * Gets the status strings used in the display.
     * @return {@link String}[]
     * @if an error occurs
     */
    FFCharacter.prototype.getStatusString = function() {
        this.computeFullStats();
        var sk = [], st = [], lk = [];
        sk.push(getFullAttributeScore("SK"));
        sk.push('/');
        sk.push(getFullAttributeScore("MSK"));
        
        st.push(getFullAttributeScore("ST"));
        st.push('/');
        st.push(getFullAttributeScore("MST"));
        
        lk.push(getFullAttributeScore("LK"));
        lk.push('/');
        lk.push(getFullAttributeScore("MLK"));
        var s = [ sk.join(""), st.join(""), lk.join("") ];
        sk = null;
        st = null;
        lk = null;
        return s;
    }
	/**
	 * Determines if the {@link Combatant} is in combat.
	 * @return <tt>true</tt> if the combatant is in combat; <tt>false</tt>
	 * otherwise
	 */
    FFCharacter.prototype.isInCombat = function() {
        // TODO Auto-generated method stub
        return false;
    }
    FFCharacter.prototype.newHero = function() {
        // roll stats
        var roll = Dice.ONE_D6.roll() + 6;
        this.setBaseAttributeScore("SK", roll);
        this.setBaseAttributeScore("MSK", roll);
        roll = Dice.TWO_D6.roll() + 12;
        this.setBaseAttributeScore("ST", roll);
        this.setBaseAttributeScore("MST", roll);
        roll = Dice.ONE_D6.roll() + 6;
        this.setBaseAttributeScore("LK", roll);
        this.setBaseAttributeScore("MLK", roll);
        // equip iron sword
        WebServiceClient.getInstance().loadItem(
        		"IRON SWORD").getItemData().ARX_EQUIPMENT_Equip(this.getIo());
        this.computeFullStats();
    }
    /**
     * Sets the value of the flag indicating pretty printing has been turned on.
     * @param flag the new value to set
     */
    FFCharacter.prototype.setPrettyPrinting = function(flag) {
    	try {
    		this.checkBoolean(flag);
    	} catch (err) {
            var s = [];
            s.push("ERROR! FFCharacter.setPrettyPrinting() - flag ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        prettyPrinting = flag;
    }
    /**
     * Tests the player's luck.
     * @param isCombat if <tt>true</tt>, this is tested during combat, and the
     *            player's Luck score will be lowered by 1, no matter the
     *            outcome
     * @return if <tt>true</tt> the player passes the luck test; otherwise they
     *         fail
     * @if an error occurs
     */
    FFCharacter.prototype.testYourLuck = function(isCombat) {
    	try {
    		this.checkBoolean(isCombat);
    	} catch (err) {
            var s = [];
            s.push("ERROR! FFCharacter.testYourLuck() - isCombat ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        var passed = false;
        this.computeFullStats();
        // roll 2 dice. if that is less than equal to Luck, the test passed
        var roll = Dice.TWO_D6.roll();
        var score = this.getFullAttributeScore("LK");
        if (false) {
            // if (roll <= score) {
            passed = true;
        }
        if (isCombat) {
            // remove one luck point
            this.setBaseAttributeScore(
                    "LK", this.getBaseAttributeScore("LK") - 1);
        }
        return passed;
    }
    FFCharacter.prototype.toString = function() {
        var s = [];
        if (prettyPrinting) {
            s.push(new String(this.getName()));
            s.push('\n');
            s.push("SK: ");
            s.push(this.getFullAttributeScore("SK"));
            s.push('/');
            s.push(this.getFullAttributeScore("MSK"));
            s.push(System.lineSeparator());
            s.push("ST: ");
            s.push(this.getFullAttributeScore("ST"));
            s.push('/');
            s.push(this.getFullAttributeScore("MST"));
            s.push(System.lineSeparator());
            s.push("LK: ");
            s.push(this.getFullAttributeScore("LK"));
            s.push('/');
            s.push(this.getFullAttributeScore("MLK"));
            s.push(System.lineSeparator());
            prettyPrinting = false;
        } else {}
        return s;
    }
	return FFCharacter;
});
