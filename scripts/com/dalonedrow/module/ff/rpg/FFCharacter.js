function FFCharacter() {
    this.getAttributeMap = function() {
    	console.log(FFCharacter.attributeMap);
        return FFCharacter.attributeMap;
    }
	IoPcData.call(this);
    /** flag indicating pretty printing has been turned on. */
    var prettyPrinting = false;
    var REFUSE_GAME_RETURN = false;
    this.adjustMana = function(dmg) {
        // TODO Auto-generated method stub

    }
    this.applyRulesModifiers = function() {
        // TODO Auto-generated method stub

    }
    this.applyRulesPercentModifiers = function() {
        // TODO Auto-generated method stub

    }
    this.ARX_EQUIPMENT_RecreatePlayerMesh = function() {
        // TODO Auto-generated method stub

    }
    this.calculateBackstab = function() {
        return false;
    }
    this.calculateCriticalHit = function() {
        return false;
    }
    this.canIdentifyEquipment = function(equipitem) {
        // TODO Auto-generated method stub
        return false;
    }
    this.getBaseLife = function() {
        return this.getFullAttributeScore("ST");
    }
    this.getBaseMana = function() {
        // TODO Auto-generated method stub
        return 0;
    }
    this.getFullDamage = function() {
        return this.getFullAttributeScore("DMG");
    }
    this.getLifeAttribute = function() {
        return "ST";
    }
    this.getMaxLife = function() {
        return this.getBaseAttributeScore("MST");
    }
    /**
     * Gets the status strings used in the display.
     * @return {@link String}[]
     * @if an error occurs
     */
    this.getStatusString = function() {
        this.computeFullStats();
        var sk = "", st = "", lk = "";
        var sb = [];
        sb.push(getFullAttributeScore("SK"));
        sb.push('/');
        sb.push(getFullAttributeScore("MSK"));
        sk = sb.join("");
        sb = [];
        sb.push(getFullAttributeScore("ST"));
        sb.push('/');
        sb.push(getFullAttributeScore("MST"));
        st = sb.join("");
        sb.setLength(0);
        sb.push(getFullAttributeScore("LK"));
        sb.push('/');
        sb.push(getFullAttributeScore("MLK"));
        lk = sb.join("");
        return [ sk, st, lk ];
    }
    this.isInCombat = function() {
        // TODO Auto-generated method stub
        return false;
    }
    this.newHero = function() {
    	var t = Interactive.getInstance().loadItem("IRON SWORD");
        console.log("after send");
        console.log(t);
        // roll stats
    	var roll = Dice.properties[Dice.ONE_D6].roll() + 6;
        this.setBaseAttributeScore("SK", roll);
        this.setBaseAttributeScore("MSK", roll);
        roll = Dice.properties[Dice.TWO_D6].roll() + 12;
        this.setBaseAttributeScore("ST", roll);
        this.setBaseAttributeScore("MST", roll);
        roll = Dice.properties[Dice.ONE_D6].roll() + 6;
        this.setBaseAttributeScore("LK", roll);
        this.setBaseAttributeScore("MLK", roll);
        // equip iron sword
        FFWebServiceClient.getInstance().loadItem(
                "IRON SWORD").getItemData().ARX_EQUIPMENT_Equip(getIo());
        this.computeFullStats();
    }
    /**
     * Sets the value of the flag indicating pretty printing has been turned on.
     * @param flag the new value to set
     */
    this.setPrettyPrinting = function(flag) {
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
    this.testYourLuck = function(isCombat) {
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
        	this.setBaseAttributeScore("LK", this.getBaseAttributeScore("LK") - 1);
        }
        return passed;
    }
    this.toString = function() {
        var sb = [];
        if (prettyPrinting) {
            sb.push(this.getName());
            sb.push('\n');
            sb.push("SK: ");
            sb.push(this.getFullAttributeScore("SK"));
            sb.push('/');
            sb.push(this.getFullAttributeScore("MSK"));
            sb.push('\n');
            sb.push("ST: ");
            sb.push(this.getFullAttributeScore("ST"));
            sb.push('/');
            sb.push(this.getFullAttributeScore("MST"));
            sb.push('\n');
            sb.push("LK: ");
            sb.push(this.getFullAttributeScore("LK"));
            sb.push('/');
            sb.push(this.getFullAttributeScore("MLK"));
            sb.push('\n');
            prettyPrinting = false;
        } else {}
        return sb.join("");
    }
}
FFCharacter.prototype = Object.create(IoPcData.prototype);
FFCharacter.attributeMap = [];
