/**
 * 
 */
define(["com/dalonedrow/engine/systems/base/interactive",
        "com/dalonedrow/engine/systems/base/projectconstants",
        "com/dalonedrow/module/ff/rpg/ffscriptable",
    	"com/dalonedrow/rpg/base/constants/scriptglobals",
    	"com/dalonedrow/rpg/base/systems/script"],
		function(Interactive, ProjectConstants, FFScriptable, ScriptGlobals, Script) {
	function WeaponScript(io) {
		FFScriptable.call(this, io);
        this.oldOnCombine = FFScriptable.prototype.onCombine;
        this.oldOnEquip = FFScriptable.prototype.onEquip;
        this.oldOnInit = FFScriptable.prototype.onInit;
        this.oldOnInventoryUse = FFScriptable.prototype.onInventoryUse;
        this.oldOnCombine = FFScriptable.prototype.onCombine;
	}
	WeaponScript.prototype = Object.create(FFScriptable.prototype);
    /**
     * Enchants the item.
     * @if an error occurs
     */
    WeaponScript.prototype.enchant = function() {
        this.getIO().getItemData().setPrice(this.getLocalIntVariableValue("tmp"));
        this.setLocalVariable("tmp", 0);
        this.setLocalVariable("reagent", "none");
    }
    /**
     * Break the item.
     * @return {@link int}
     * @throws PooledException if an error occurs
     * @if an error occurs
     */
    WeaponScript.prototype.onBreak = function() {
        // PLAY "broken_weapon"
        Interactive.getInstance().ARX_INTERACTIVE_DestroyIO(this.getIO());
        return ScriptGlobals.ACCEPT;
    }
    WeaponScript.prototype.onCombine = function() {
        // disabled, for now.
        var playerIO = ProjectConstants.getInstance().getPlayerIO();
        var itemIO = Interactive.getInstance().getIO(this.getLocalIntVariableValue("combined_with"));
        if (itemIO !== null) {
            var mixedWith = itemIO.getItemData().getItemName();
            var myName = this.getIO().getItemData().getItemName();
            // if combining with a green potion
            if (mixedWith.toLowerCase() === "green potion") {
                if (this.getLocalIntVariableValue("poisonable") === 0) {
                    // send message that the weapon can't be poisoned
                } else {
                    if (playerIO.getPCData().getFullAttributeScore("SK") < 30) {
                        // send message player isn't skilled enough
                    } else {
                        // send event to potion to empty itself
                        Script.getInstance().stackSendIOScriptEvent(
                                itemIO,
                                0,
                                null,
                                "Empty");
                        var tmp = parseInt(playerIO.getPCData().getFullAttributeScore("SK"));
                        tmp -= 27; // change temp value to 3 to 73
                        tmp /= 3; // change temo value to 1 to 24
                        tmp = parseInt(tmp);
                        this.getIO().setPoisonLevel(tmp);
                        this.getIO().setPoisonCharges(tmp);
                        // send message to player that weapon is poisoned
                    }
                }
            } else if (mixedWith.toLowerCase() === "egg") {
                // send message that you cannot combine
            } else if (this.getLocalIntVariableValue("enchanted") === 1) {
                // send message that you cannot combine
            } else if (mixedWith.toLowerCase() === "dragon egg") {
                if ("meteor sabre" === myName.toLowerCase()
                        || "meteor zweihander" === myName.toLowerCase()) {
                    this.setLocalVariable("reagent", "egg");
                    // show halo graphic
                    this.reagentMixed();
                } else {
                    // send message to player that you can't combine
                }
            } else if ("meteor sabre" === myName.toLowerCase()
            		|| "meteor zweihander" === myName.toLowerCase()) {
                // send message to player that you can't combine
            } else if (mixedWith.toLowerCase() === "garlic") {
                this.setLocalVariable("reagent", "garlic");
                // show halo graphic
                this.reagentMixed();
            } else if (mixedWith.toLowerCase() === "bone powder"
                    || mixedWith.toLowerCase() === "dragon bone powder"
                    || mixedWith.toLowerCase() === "golem heart"
                    || mixedWith.toLowerCase() === "amikar rock") {
                this.setLocalVariable("reagent", mixedWith);
                // show halo graphic
                this.reagentMixed();
            }
        }
        return this.oldOnCombine();
    }
    /** no durability in this game. */
    WeaponScript.prototype.onDurability = function() {
        // SET_DURABILITY -c ~^$PARAM1~
        return ScriptGlobals.ACCEPT;
    }
    WeaponScript.prototype.onEquip = function() {
        // play sound file "equip_sword"
        // PLAY "equip_sword"
        return this.oldOnEquip();
    }
    WeaponScript.prototype.onInit = function() {
        // set local variables
        this.setLocalVariable("reagent", "none");
        this.setLocalVariable("poisonable", 1);
        return this.oldOnInit();
    }
    WeaponScript.prototype.onInventoryUse = function() {
        var fighting = Script.getInstance().getGlobalIntVariableValue("FIGHTING");
        if (fighting === 0) {
            // player isn't fighting already
            // check to see if player is strong enough to use?
            // if player isn't strong enough to wield
            // send a message
            // else if player isn't skilled enough to wield
            // send a message
            // else
            // have player equip the item
            this.getIO().getItemData().equipOnIo(
            		ProjectConstants.getInstance().getPlayerIO());
        }
        return this.oldOnInventoryUse();
    }
    /** No repair in this game. */
    WeaponScript.prototype.onRepaired = function() {
        // if (this.getLocalIntVariableValue("repair_check_durability") === 1) {
        // IF (^DURABILITY === ^MAXDURABILITY) {
        // SPEAK -p [player_weapon_already_repaired] NOP
        // ACCEPT
        // }
        // SENDEVENT REPAIR ^SENDER ""
        // ACCEPT
        // }
        // SET �tmp ~^MAXDURABILITY~
        // REPAIR SELF ~^PLAYER_SKILL_OBJECT_KNOWLEDGE~
        // if (^DURABILITY < �tmp) {
        // SPEAK -p [player_weapon_repaired_partially] NOP
        // ACCEPT
        // }
        // SPEAK -p [player_weapon_repaired_in_full] NOP
        // UNSET �tmp
        // ACCEPT
        return ScriptGlobals.ACCEPT;
    }
    WeaponScript.prototype.onSpellCast = function() {
        if ("enchant weapon" === this.getLocalStringVariableValue("spell_cast").toLowerCase()) {
            if (this.getLocalIntVariableValue("enchanted") === 1) {
                // send message cannot enchant
                // SPEAK -p [player_no] NOP
            } else {
                if ("none" === this.getLocalStringVariableValue("reagent").toLowerCase()) {
                    // send message cannot enchant
                    // SPEAK -p [player_wrong] NOP
                } else {
                    // play spell sound
                    // PLAY -o "Magic_Spell_Enchant_Weapon"
                    // enchanting with dragon egg
                    if ("egg" === this.getLocalStringVariableValue("reagent").toLowerCase()) {
                        if (this.getLocalIntVariableValue("caster_skill_level") < 8) {
                            // send message not skilled enough
                            // SPEAK -p [player_not_skilled_enough] NOP
                        } else {
                            this.setLocalVariable("enchanted", 1);
                            if (Script.getInstance().getGlobalIntVariableValue( "need_superweapon")
                            		=== 1) {
                                // update quest book
                                // QUEST [system_Quest_log_final_meeting]
                                // HEROSAY [system_questbook_updated]
                                // play sound for system alerts
                                // PLAY SYSTEM
                            }
                            if (Script.getInstance().getGlobalIntVariableValue("superweapon") < 2) {
                                Script.getInstance().setGlobalVariable("weapon_enchanted", 2);
                                Script.getInstance().setGlobalVariable("need_superweapon", 2);
                                Script.getInstance().setGlobalVariable("superweapon", 2);
                            }
                            this.setLocalVariable("reagent", "none");
                            var myName = this.getIO().getItemData().getItemName();
                            if ("meteor sabre" === myName.toLowerCase()) {
                                // replace me with an enchanted Meteor Sabre
                                // REPLACEME "SABRE_METEOR_ENCHANT"
                            } else if ("meteor zweihander" === myName.toLowerCase()) {
                                // replace me with an enchanted Meteor Sabre
                                // REPLACEME "SWORD_2HANDED_METEOR_ENCHANT"
                            }
                        }
                    } else {
                        this.setLocalVariable("enchanted", 1);
                        this.getIO().getItemData().setItemName("Axe");
                        // SETNAME [description_axe]
                        if ("garlic" === this.getLocalStringVariableValue("reagent").toLowerCase()) {
                            // play halo effect
                            // if player casting skill < 50,
                            // set affect DEX by 1, else by 2
                            // HALO -ocs 0 1 0 30
                            // IF (^PLAYER_SKILL_CASTING < 50) {
                            // SETEQUIP DEXTERITY 1
                            // }
                            // IF (^PLAYER_SKILL_CASTING > 50) {
                            // SETEQUIP DEXTERITY 2
                            // }
                            var tmp = this.getIO().getItemData().getPrice();
                            tmp *= 1.5;
                            this.setLocalVariable("tmp", tmp);
                            this.enchant();
                        } else if ("bone powder"
                        		=== this.getLocalStringVariableValue("reagent").toLowerCase()) {
                            // play halo effect
                            // if player casting skill < 50,
                            // set affect STR by 2, else by 3
                            // HALO -ocs 1 0.5 0 30
                            // IF (^PLAYER_SKILL_CASTING < 50) {
                            // SETEQUIP STRENGTH 2
                            // }
                            // IF (^PLAYER_SKILL_CASTING > 50) {
                            // SETEQUIP STRENGTH 3
                            // }
                            var tmp = this.getIO().getItemData().getPrice();
                            tmp *= 3;
                            this.setLocalVariable("tmp", tmp);
                            this.enchant();
                        } else if ("dragon bone powder" === 
                                this.getLocalStringVariableValue("reagent").toLowerCase()) {
                            // play halo effect
                            // set affect STR by 1
                            // HALO -ocs 1 0 0 30
                            // SETEQUIP STRENGTH 1
                            var tmp = this.getIO().getItemData().getPrice();
                            tmp *= 1.5;
                            this.setLocalVariable("tmp", tmp);
                            enchant();
                        }
                    }
                }
            }
        }
        return ScriptGlobals.ACCEPT;
    }
    WeaponScript.prototype.reagentMixed = function() {
        var itemIO = Interactive.getInstance().getIO(this.getLocalIntVariableValue("combined_with"));
        Interactive.getInstance().ARX_INTERACTIVE_DestroyIO(itemIO);
        // kill the haloe
        // TIMERoff 1 1 HALO -f
        // SPEAK -p [Player_off_interesting] NOP
    }
    return WeaponScript;
});
