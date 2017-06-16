/**
 *
 */
define(["require",
	"com/dalonedrow/engine/systems/base/projectconstants",
	"com/dalonedrow/rpg/base/constants/equipmentglobals",
	"com/dalonedrow/rpg/base/constants/ioglobals",
	"com/dalonedrow/rpg/base/constants/scriptglobals",
	"com/dalonedrow/rpg/base/flyweights/iocharacter",
	"com/dalonedrow/rpg/base/flyweights/ioequipitem",
	"com/dalonedrow/rpg/base/systems/script",
	"com/dalonedrow/utils/hashcode"],
		function(require, ProjectConstants, EquipmentGlobals, IoGlobals, ScriptGlobals,
				IOCharacter, IOEquipItem, Script, Hashcode) {
	function IOItemData() {
		Hashcode.call(this);
	    /** the current number in an inventory slot. */
	    this.count = 0;
	    /** the item's description. */
	    this.description = null;
	    /** modifier data for the item. */
	    this.equipitem = new IOEquipItem();
	    /** dunno? */
	    this. foodValue = '';
	    /** the IO associated with this data. */
	    this.io = null;
	    /** the item's name. */
	    this.itemName = null;
	    /** the item's light value. */
	    this.lightValue = 0;
	    /** the maximum number of the item the player can own. */
	    this.maxOwned = 0;
	    /** the item's price. */
	    this.price = 0;
	    /** the type of ring the item is. */
	    this.ringType = 0;
	    /** the amount of the item that can be stacked in one inventory slot. */
	    this.stackSize = 0;
	    /** dunno? */
	    this.stealvalue = '';
	    /** the item's weight. */
	    this.weight = 0;
	    this.title = null;
	}
	IOItemData.prototype = Object.create(Hashcode.prototype);
    /**
     * Adjusts the {@link IOItemData}'s count.
     * @param val the amount adjusted by
     */
    IOItemData.prototype.adjustCount = function(val) {
    	try {
    		this.checkInteger(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IOItemData.adjustCount() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        if (this.count + val < 0) {
            throw new Error("Cannot remove that many items");
        }
        if (this.count + val > this.maxOwned) {
            throw new Error("Cannot add that many items");
        }
        this.count += val;
    }
    IOItemData.prototype.ARX_EQUIPMENT_ComputeDamages = function(io_source, io_target,
    		dmgModifier) {
    	var BaseInteractiveObject =
    		require("com/dalonedrow/rpg/base/flyweights/baseinteractiveobject");
    	try {
    		this.checkInstanceOf(io_source, BaseInteractiveObject);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IOItemData.ARX_EQUIPMENT_ComputeDamages() - io_source ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkInstanceOf(io_target, BaseInteractiveObject);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IOItemData.ARX_EQUIPMENT_ComputeDamages() - io_target ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkFloat(dmgModifier);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IOItemData.ARX_EQUIPMENT_ComputeDamages() - dmgModifier ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        var damages = 0;
        // send event to target. someone attacked you!
        Script.getInstance().setEventSender(io_source);
        Script.getInstance().sendIOScriptEvent(io_target,
                ScriptConstants.SM_057_AGGRESSION, null, null);
        if (io_source !== null
                && io_target !== null) {
            if (!io_target.hasIOFlag(IoGlobals.IO_01_PC)
                    && !io_target.hasIOFlag(IoGlobals.IO_03_NPC)
            /* && io_target.hasIOFlag(IoGlobals.fix) */) {
                if (io_source.hasIOFlag(IoGlobals.IO_01_PC)) {
                    // player fixing the target object
                    // ARX_DAMAGES_DamageFIX(io_target, player.Full_damages, 0,
                    // 0);
                } else if (io_source.hasIOFlag(IoGlobals.IO_03_NPC)) {
                    // NPC fixing target
                    // ARX_DAMAGES_DamageFIX(io_target,
                    // io_source->_npcdata->damages, GetInterNum(io_source), 0);
                } else {
                    // unknown fixing target
                    // ARX_DAMAGES_DamageFIX(io_target, 1,
                    // GetInterNum(io_source), 0);
                }
            } else {
                var attack, ac;
                var backstab = 1;
                // weapon material
                var wmat = "BARE";
                // armor material
                var amat = "FLESH";
                var critical = false;
                if (io_source.hasIOFlag(IoGlobals.IO_01_PC)) {
                	var wpnId = io_source.getPCData().getEquippedItem(
                            EquipmentGlobals.EQUIP_SLOT_WEAPON);
                    if (Interactive.getInstance().hasIO(wpnId)) {
                    	var ioo = Interactive.getInstance().getIO(wpnId);
                        if (ioo.getWeaponmaterial() !== null
                                && ioo.getWeaponmaterial().length() > 0) {
                            wmat = ioo.getWeaponmaterial();
                        }
                        ioo = null;
                    }
                    attack = io_source.getPCData().getFullDamage();
                    if (io_source.getPCData().calculateCriticalHit()
                            && Script.getInstance().sendIOScriptEvent(
                                    io_source, ScriptConstants.SM_054_CRITICAL,
                                    null, null) !== ScriptConstants.REFUSE) {
                        critical = true;
                    }
                    damages = attack * dmgModifier;
                    if (io_source.getPCData().calculateBackstab()
                            && Script.getInstance().sendIOScriptEvent(
                                    io_source, ScriptConstants.SM_056_BACKSTAB,
                                    null, null) !== ScriptConstants.REFUSE) {
                        backstab = this.getBackstabModifier();
                    }
                } else {
                    if (io_source.hasIOFlag(IoGlobals.IO_03_NPC)) {
                        var wpnId = io_source.getNPCData().getEquippedItem(
                        		EquipmentGlobals.EQUIP_SLOT_WEAPON);
                        if (Interactive.getInstance().hasIO(wpnId)) {
                        	var ioo = Interactive.getInstance().getIO(wpnId);
                            if (ioo.getWeaponmaterial() !== null
                                    && ioo.getWeaponmaterial().length() > 0) {
                                wmat = ioo.getWeaponmaterial();
                            }
                            ioo = null;
                        } else {
                            if (io_source.getWeaponmaterial() !== null
                                    && io_source.getWeaponmaterial()
                                            .length() > 0) {
                                wmat = io_source.getWeaponmaterial();
                            }
                        }
                        attack = io_source.getNPCData().getFullDamage();
                        if (io_source.getNPCData().calculateCriticalHit()
                                && Script.getInstance().sendIOScriptEvent(
                                        io_source,
                                        ScriptConstants.SM_054_CRITICAL,
                                        null, null) !== ScriptConstants.REFUSE) {
                            critical = true;
                        }
                        damages = attack * dmgModifier;
                        if (io_source.getNPCData().calculateBackstab()
                                && Script.getInstance().sendIOScriptEvent(
                                        io_source,
                                        ScriptConstants.SM_056_BACKSTAB,
                                        null, null) !== ScriptConstants.REFUSE) {
                            backstab = this.getBackstabModifier();
                        }
                    } else {
                        throw new Error("Compute Damages call made by non-character");
                    }
                }
                // calculate how much damage is absorbed by armor
                var absorb = this.calculateArmorDeflection();
                // float absorb;

                // if (io_target === inter.iobj[0]) {
                // ac = player.Full_armor_class;
                // absorb = player.Full_Skill_Defense * DIV2;
                // } else {
                // ac = ARX_INTERACTIVE_GetArmorClass(io_target);
                // absorb = io_target->_npcdata->absorb;
                // long value = ARX_SPELLS_GetSpellOn(io_target, SPELL_CURSE);
                // if (value >= 0) {
                // float modif = (spells[value].caster_level * 0.05f);
                // ac *= modif;
                // absorb *= modif;
                // }
                // }
                if (io_target.getArmormaterial() !== null
                        && io.getArmormaterial().length() > 0) {
                    amat = io.getArmormaterial();
                }
                if (io_target.hasIOFlag(IoGlobals.IO_03_NPC)
                        || io_target.hasIOFlag(IoGlobals.IO_01_PC)) {
                	var armrId;
                    if (io_target.hasIOFlag(IoGlobals.IO_03_NPC)) {
                        armrId = io_target.getNPCData().getEquippedItem(
                                EquipmentGlobals.EQUIP_SLOT_TORSO);
                    } else {
                        armrId = io_target.getPCData().getEquippedItem(
                                EquipmentGlobals.EQUIP_SLOT_TORSO);
                    }
                    if (Interactive.getInstance().hasIO(armrId)) {
                    	var ioo = Interactive.getInstance().getIO(armrId);
                        if (ioo.getArmormaterial() !== null
                                && ioo.getArmormaterial().length() > 0) {
                            amat = ioo.getArmormaterial();
                        }
                        ioo = null;
                    }
                }
                damages *= backstab;
                // dmgs -= dmgs * (absorb * DIV100);

                // TODO - play sound based on the power of the hit
                if (damages > 0) {
                    if (critical) {
                        damages = this.applyCriticalModifier();
                        // dmgs *= 1.5f;
                    }

                    if (io_target.hasIOFlag(IoGlobals.IO_01_PC)) {
                        // TODO - push player when hit
                        // ARX_DAMAGES_SCREEN_SPLATS_Add(&ppos, dmgs);
                        io_target.getPCData().ARX_DAMAGES_DamagePlayer(damages,
                                0, io_source.getRefId());
                        // ARX_DAMAGES_DamagePlayerEquipment(dmgs);
                    } else {
                        // TODO - push NPC when hit
                        io_target.getNPCData().damageNPC(damages,
                                io_source.getRefId(), false);
                    }
                }
            }	
        }
        return damages;
    }
    /**
     * Equips the item on a target IO.
     * @param target the target IO
     * @throws PooledException if an error occurs
     * @if an error occurs
     */
    IOItemData.prototype.equipOnIo = function(target) {
    	var Interactive = require("com/dalonedrow/engine/systems/base/interactive");
    	var BaseInteractiveObject =
    		require("com/dalonedrow/rpg/base/flyweights/baseinteractiveobject");
    	try {
    		this.checkInstanceOf(target, BaseInteractiveObject);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IOItemData.equipOnIo() - target ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        if (this.io === null) {
            throw new Error("Cannot equip item with no IO data");
        }
        if (target.hasIOFlag(IoGlobals.IO_01_PC)
                || target.hasIOFlag(IoGlobals.IO_03_NPC)) {
            var charData;
            if (target.hasIOFlag(IoGlobals.IO_01_PC)) {
                charData = target.getPCData();
            } else {
                charData = target.getNPCData();
            }
            var validid = -1;
            var i = Interactive.getInstance().getMaxIORefId();
            for (; i >= 0; i--) {
                if (Interactive.getInstance().hasIO(i)
                        && Interactive.getInstance().getIO(i) !== null
                        && this.io.equals(Interactive.getInstance().getIO(i))) {
                    validid = i;
                    break;
                }
            }
            if (validid >= 0) {
                Interactive.getInstance().RemoveFromAllInventories(this.io);
                this.io.setShow(IoGlobals.SHOW_FLAG_ON_PLAYER); // on player
                // handle drag
                // if (toequip === DRAGINTER)
                // Set_DragInter(NULL);
                if (this.io.hasTypeFlag(EquipmentGlobals.OBJECT_TYPE_WEAPON)) {
                	this.equipWeapon(charData);
                } else if (this.io.hasTypeFlag(EquipmentGlobals.OBJECT_TYPE_SHIELD)) {
                	this.equipShield(charData);
                } else if (this.io.hasTypeFlag(EquipmentGlobals.OBJECT_TYPE_RING)) {
                	this.equipRing(charData);
                } else if (this.io.hasTypeFlag(EquipmentGlobals.OBJECT_TYPE_ARMOR)) {
                    // unequip old armor
                	this.unequipItemInSlot(charData, EquipmentGlobals.EQUIP_SLOT_TORSO);
                    // equip new armor
                    charData.setEquippedItem(EquipmentGlobals.EQUIP_SLOT_TORSO, validid);
                } else if (this.io.hasTypeFlag(EquipmentGlobals.OBJECT_TYPE_LEGGINGS)) {
                    // unequip old leggings
                	this.unequipItemInSlot(charData, EquipmentGlobals.EQUIP_SLOT_LEGGINGS);
                    // equip new leggings
                    charData.setEquippedItem(EquipmentGlobals.EQUIP_SLOT_LEGGINGS, validid);
                } else if (this.io.hasTypeFlag(EquipmentGlobals.OBJECT_TYPE_HELMET)) {
                    // unequip old helmet
                	this.unequipItemInSlot(charData, EquipmentGlobals.EQUIP_SLOT_HELMET);
                    // equip new helmet
                    charData.setEquippedItem(EquipmentGlobals.EQUIP_SLOT_HELMET, validid);
                }
                if (this.io.hasTypeFlag(EquipmentGlobals.OBJECT_TYPE_HELMET)
                        || this.io.hasTypeFlag(EquipmentGlobals.OBJECT_TYPE_ARMOR)
                        || this.io.hasTypeFlag(EquipmentGlobals.OBJECT_TYPE_LEGGINGS)) {
                    charData.ARX_EQUIPMENT_RecreatePlayerMesh();
                }
                charData.computeFullStats();
            }
        }
    }
    IOItemData.prototype.ARX_EQUIPMENT_ReleaseAll = function() {
    	this.ARX_EQUIPMENT_ReleaseEquipItem();
    }
    /** Releases the {@link IOEquipItem} data from the item. */
    IOItemData.prototype.ARX_EQUIPMENT_ReleaseEquipItem = function() {
        if (this.equipitem !== null) {
        	this.equipitem = null;
        }
    }
    /**
     * Sets the item's object type.
     * @param flag the type flag
     * @param added if <tt>true</tt>, the type is set; otherwise it is removed
     * @if an error occurs
     */
    IOItemData.prototype.ARX_EQUIPMENT_SetObjectType = function(flag, added) {
    	try {
    		this.checkInteger(flag);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IOItemData.ARX_EQUIPMENT_SetObjectType() - flag ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkBoolean(added);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IOItemData.ARX_EQUIPMENT_SetObjectType() - added ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        if (added) {
        	this.io.addTypeFlag(flag);
        } else {
        	this.io.removeTypeFlag(flag);
        }
    }
    /**
     * Unequips the item from the targeted IO.
     * @param target the targeted IO
     * @param isDestroyed if<tt>true</tt> the item is destroyed afterwards
     * @throws PooledException if an error occurs
     * @if an error occurs
     */
    IOItemData.prototype.ARX_EQUIPMENT_UnEquip = function(target, isDestroyed) {
    	var Interactive = require("com/dalonedrow/engine/systems/base/interactive");
    	var BaseInteractiveObject =
    		require("com/dalonedrow/rpg/base/flyweights/baseinteractiveobject");
    	try {
    		this.checkInstanceOf(target, BaseInteractiveObject);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IOItemData.ARX_EQUIPMENT_UnEquip() - target ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkBoolean(isDestroyed);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IOItemData.ARX_EQUIPMENT_UnEquip() - isDestroyed ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        if (target.hasIOFlag(IoGlobals.IO_01_PC)) {
            var i = ProjectConstants.getInstance().getMaxEquipped() - 1;
            for (; i >= 0; i--) {
            	var player = target.getPCData();
            	var itemRefId = player.getEquippedItem(i);
                if (itemRefId >= 0
                        && Interactive.getInstance().hasIO(itemRefId)
                        && Interactive.getInstance().getIO(itemRefId).equals(this.io)) {
                    // EERIE_LINKEDOBJ_UnLinkObjectFromObject(
                    // target->obj, tounequip->obj);
                    player.ARX_EQUIPMENT_Release(itemRefId);
                    // target->bbox1.x = 9999;
                    // target->bbox2.x = -9999;

                    if (!isDestroyed) {
                        // if (DRAGINTER === null) {
                        // ARX_SOUND_PlayInterface(SND_INVSTD);
                        // Set_DragInter(tounequip);
                        // } else
                        if (!target.getInventory().CanBePutInInventory(this.io)) {
                            target.getInventory().PutInFrontOfPlayer(this.io, true);
                        }
                    }
                    // send event from this item to target to unequip
                    Script.getInstance().setEventSender(this.io);
                    Script.getInstance().sendIOScriptEvent(
                    		target, ScriptGlobals.SM_007_EQUIPOUT, null, null);
                    // send event from target to this item to unequip
                    Script.getInstance().setEventSender(target);
                    Script.getInstance().sendIOScriptEvent(
                    		this.io, ScriptGlobals.SM_007_EQUIPOUT, null, null);
                }
            }
            if (this.io.hasTypeFlag(EquipmentGlobals.OBJECT_TYPE_HELMET)
                    || this.io.hasTypeFlag(EquipmentGlobals.OBJECT_TYPE_ARMOR)
                    || this.io.hasTypeFlag(EquipmentGlobals.OBJECT_TYPE_LEGGINGS)) {
                target.getPCData().ARX_EQUIPMENT_RecreatePlayerMesh();
            }
        }
    }
    /**
     * Equips a ring on a character.
     * @param charData the character data
     * @if an error occurs
     */
    IOItemData.prototype.equipRing = function(charData) {
    	try {
    		this.checkInstanceOf(charData, IOCharacter);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IOItemData.equipRing() - charData ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        // check left and right finger
        // to see if it can be equipped
        var canEquip = true;
        var ioid = charData.getEquippedItem(EquipmentGlobals.EQUIP_SLOT_RING_LEFT);
        if (Interactive.getInstance().hasIO(ioid)) {
        	var oldRing = Interactive.getInstance().getIO(ioid);
            if (oldRing.getItemData().getRingType() === ringType) {
                // already wearing that type
                // of ring on left finger
                canEquip = false;
            }
            oldRing = null;
        }
        if (canEquip) {
            ioid = charData.getEquippedItem(
                    EquipmentGlobals.EQUIP_SLOT_RING_RIGHT);
            if (Interactive.getInstance().hasIO(ioid)) {
            	var oldRing = Interactive.getInstance().getIO(ioid);
                if (oldRing.getItemData().getRingType() === ringType) {
                    // already wearing that type
                    // of ring on right finger
                    canEquip = false;
                }
                oldRing = null;
            }
        }
        if (canEquip) {
        	var equipSlot = -1;
            if (charData.getEquippedItem(
                    EquipmentGlobals.EQUIP_SLOT_RING_LEFT) < 0) {
                equipSlot = EquipmentGlobals.EQUIP_SLOT_RING_LEFT;
            }
            if (charData.getEquippedItem(
                    EquipmentGlobals.EQUIP_SLOT_RING_RIGHT) < 0) {
                equipSlot = EquipmentGlobals.EQUIP_SLOT_RING_RIGHT;
            }
            if (equipSlot === -1) {
                if (!charData.getIo().getInventory().isLeftRing()) {
                    ioid = charData.getEquippedItem(
                            EquipmentGlobals.EQUIP_SLOT_RING_RIGHT);
                    if (Interactive.getInstance().hasIO(ioid)) {
                    	var oldIO = Interactive.getInstance().getIO(ioid);
                        if (oldIO.hasIOFlag(IoGlobals.IO_02_ITEM)) {
                        	this.unequipItemInSlot(
                        			charData, EquipmentGlobals.EQUIP_SLOT_RING_RIGHT);
                        }
                        oldIO = null;
                    }
                    equipSlot = EquipmentGlobals.EQUIP_SLOT_RING_RIGHT;
                } else {
                    ioid = charData.getEquippedItem(
                            EquipmentGlobals.EQUIP_SLOT_RING_LEFT);
                    if (Interactive.getInstance().hasIO(ioid)) {
                    	var oldIO = Interactive.getInstance().getIO(ioid);
                        if (oldIO.hasIOFlag(IoGlobals.IO_02_ITEM)) {
                        	this.unequipItemInSlot(charData, EquipmentGlobals.EQUIP_SLOT_RING_LEFT);
                        }
                        oldIO = null;
                    }
                    equipSlot = EquipmentGlobals.EQUIP_SLOT_RING_LEFT;
                }
                charData.getIo().getInventory().setLeftRing(
                		!charData.getIo().getInventory().isLeftRing());
            }
            charData.setEquippedItem(equipSlot, this.io.getRefId());
        }
    }
    /**
     * Equips a shield on a character.
     * @param charData the character data
     * @if an error occurs
     */
    IOItemData.prototype.equipShield = function(charData) {
    	try {
    		this.checkInstanceOf(charData, IOCharacter);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IOItemData.equipShield() - charData ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        // unequip old shield
    	this.unequipItemInSlot(charData, EquipmentGlobals.EQUIP_SLOT_SHIELD);
        // equip new shield
        charData.setEquippedItem(
                EquipmentGlobals.EQUIP_SLOT_SHIELD, this.io.getRefId());
        // TODO - attach new shield to mesh
        // EERIE_LINKEDOBJ_LinkObjectToObject(target->obj,
        // io->obj, "SHIELD_ATTACH", "SHIELD_ATTACH", io);
        var wpnID = charData.getEquippedItem(EquipmentGlobals.EQUIP_SLOT_WEAPON);
        if (wpnID >= 0) {
            if (Interactive.getInstance().hasIO(wpnID)) {
            	var wpn = Interactive.getInstance().getIO(wpnID);
                if (wpn.hasTypeFlag(EquipmentGlobals.OBJECT_TYPE_2H)
                        || wpn.hasTypeFlag(EquipmentGlobals.OBJECT_TYPE_BOW)) {
                    // unequip old weapon
                	this.unequipItemInSlot(charData, EquipmentGlobals.EQUIP_SLOT_WEAPON);
                }
            }
        }
    }
    /**
     * Equips a weapon for a character.
     * @param charData the character data
     * @if an error occurs
     */
    IOItemData.prototype.equipWeapon = function(charData) {
    	try {
    		this.checkInstanceOf(charData, IOCharacter);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IOItemData.equipWeapon() - charData ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        // unequip old weapon
    	this.unequipItemInSlot(charData, EquipmentGlobals.EQUIP_SLOT_WEAPON);
        // equip new weapon
        charData.setEquippedItem(EquipmentGlobals.EQUIP_SLOT_WEAPON, this.io.getRefId());
        // attach it to player mesh
        if (this.io.hasTypeFlag(EquipmentGlobals.OBJECT_TYPE_BOW)) {
            // EERIE_LINKEDOBJ_LinkObjectToObject(
            // target->obj, io->obj,
            // "WEAPON_ATTACH", "TEST", io);
        } else {
            // EERIE_LINKEDOBJ_LinkObjectToObject(
            // target->obj,
            // io->obj,
            // "WEAPON_ATTACH", "PRIMARY_ATTACH", io); //
        }
        if (this.io.hasTypeFlag(EquipmentGlobals.OBJECT_TYPE_2H)
                || this.io.hasTypeFlag(EquipmentGlobals.OBJECT_TYPE_BOW)) {
            // for bows or 2-handed swords, unequip old shield
        	this.unequipItemInSlot(charData, EquipmentGlobals.EQUIP_SLOT_SHIELD);
        }
    }
    /**
     * Gets the current number in an inventory slot.
     * @return {@link short}
     */
    IOItemData.prototype.getCount = function() {
        return this.count;
    }
    /**
     * Gets the item's description.
     * @return {@link char[]}
     */
    IOItemData.prototype.getDescription = function() {
        return this.description;
    }
    /**
     * Gets the list of equipment item modifiers.
     * @return {@link EquipmentItemModifier}[]
     */
    IOItemData.prototype.getEquipitem = function() {
        return this.equipitem;
    }
    /**
     * Gets the value for the foodValue.
     * @return {@link char}
     */
    IOItemData.prototype.getFoodValue = function() {
        return this.foodValue;
    }
    /**
     * Gets the IO associated with this data.
     * @return {@link IO}
     */
    IOItemData.prototype.getIo = function() {
        return this.io;
    }
    /**
     * Gets the item's name.
     * @return <code>char</code>[]
     */
    IOItemData.prototype.getItemName = function() {
        return this.itemName;
    }
    /**
     * Gets the value for the lightValue.
     * @return {@link int}
     */
    IOItemData.prototype.getLightValue = function() {
        return this.lightValue;
    }
    /**
     * Gets the maximum number of the item the player can own.
     * @return {@link int}
     */
    IOItemData.prototype.getMaxOwned = function() {
        return this.maxOwned;
    }
    /**
     * Gets the item's price.
     * @return {@link float}
     */
    IOItemData.prototype.getPrice = function() {
        return this.price;
    }
    /**
     * Gets the type of ring the item is.
     * @return {@link int}
     */
    IOItemData.prototype.getRingType = function() {
        return this.ringType;
    }
    /**
     * Gets the value for the stackSize.
     * @return {@link int}
     */
    IOItemData.prototype.getStackSize = function() {
        return this.stackSize;
    }
    /**
     * Gets the value for the stealvalue.
     * @return {@link char}
     */
    IOItemData.prototype.getStealvalue = function() {
        return this.stealvalue;
    }
    IOItemData.prototype.getTitle = function() {
        return this.title;
    }
    /**
     * Gets the type of weapon an item is.
     * @return {@link int}
     */
    IOItemData.prototype.getWeaponType = function() {
        var type = EquipmentGlobals.WEAPON_BARE;
        if (this.io.hasTypeFlag(EquipmentGlobals.OBJECT_TYPE_DAGGER)) {
            type = EquipmentGlobals.WEAPON_DAGGER;
        } else if (this.io.hasTypeFlag(EquipmentGlobals.OBJECT_TYPE_1H)) {
            type = EquipmentGlobals.WEAPON_1H;
        } else if (this.io.hasTypeFlag(EquipmentGlobals.OBJECT_TYPE_2H)) {
            type = EquipmentGlobals.WEAPON_2H;
        } else if (this.io.hasTypeFlag(EquipmentGlobals.OBJECT_TYPE_BOW)) {
            type = EquipmentGlobals.WEAPON_BOW;
        }
        return this.type;
    }
    /**
     * Gets the item's weight.
     * @return {@link float}
     */
    IOItemData.prototype.getWeight = function() {
        return this.weight;
    }
    /**
     * Sets the current number in an inventory slot.
     * @param val the new value to set
     */
    IOItemData.prototype.setCount = function(val) {
    	try {
    		this.checkInteger(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IOItemData.setCount() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	this.count = val;
    }
    /**
     * Sets the {@link IOItemData}'s description.
     * @param val the name to set
     * @if the parameter is null
     */
    IOItemData.prototype.setDescription = function(val) {
    	try {
    		this.checkString(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IOItemData.setDescription() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        this.description = val;
    }
    /**
     * Sets the equipitem
     * @param val the equipitem to set
     */
    IOItemData.prototype.setEquipitem = function(val) {
    	try {
    		this.checkInstanceOf(val, IOEquipItem);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IOItemData.setEquipitem() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        this.equipitem = val;
    }
    /**
     * Sets the value of the foodValue.
     * @param foodValue the new value to set
     */
    IOItemData.prototype.setFoodValue = function(val) {
        this.foodValue = val;
    }
    /**
     * Sets the the IO associated with this data.
     * @param val the new value to set
     */
    IOItemData.prototype.setIo = function(val) {
    	var BaseInteractiveObject =
    		require("com/dalonedrow/rpg/base/flyweights/baseinteractiveobject");
    	try {
    		this.checkInstanceOfNullsAllowed(val, BaseInteractiveObject);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IOItemData.setIo() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        this.io = val;
        if (val !== null
                && val.getItemData() === null) {
            val.setItemData(this);
        }
    }
    /**
     * Sets the item's name.
     * @param val the name to set
     * @if the parameter is null
     */
    IOItemData.prototype.setItemName = function(val) {
    	try {
    		this.checkString(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IOItemData.setItemName() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        this.itemName = val;
    }
    /**
     * Sets the value of the lightValue.
     * @param lightValue the new value to set
     */
    IOItemData.prototype.setLightValue = function(val) {
    	try {
    		this.checkInteger(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IOItemData.setLightValue() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        this.lightValue = val;
    }
    /**
     * Sets the maximum number of the item the player can own.
     * @param val the new value
     */
    IOItemData.prototype.setMaxOwned = function(val) {
    	try {
    		this.checkInteger(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IOItemData.setMaxOwned() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        this.maxOwned = val;
    }
    /**
     * Sets the item's price.
     * @param val the price to set
     */
    IOItemData.prototype.setPrice = function(val) {
    	try {
    		this.checkFloat(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IOItemData.setPrice() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        this.price = val;
    }
    /**
     * Sets the type of ring the item is.
     * @param val the new value to set
     */
    IOItemData.prototype.setRingType = function(val) {
    	try {
    		this.checkInteger(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IOItemData.setRingType() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        this.ringType = val;
    }
    /**
     * Sets the amount of the item that can be stacked in one inventory slot.
     * @param val the value to set
     */
    IOItemData.prototype.setStackSize = function(val) {
    	try {
    		this.checkInteger(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IOItemData.setStackSize() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        this.stackSize = val;
    }
    /**
     * Sets the value of the stealvalue.
     * @param stealvalue the new value to set
     */
    IOItemData.prototype.setStealvalue = function(val) {
        this.stealvalue = val;
    }
    IOItemData.prototype.setTitle = function(val) {
    	try {
    		this.checkStringNullsAllowed(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IOItemData.setTitle() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        this.title = val;
    }
    /**
     * Sets the item's weight.
     * @param f the weight to set
     */
    IOItemData.prototype.setWeight = function(f) {
    	try {
    		this.checkFloat(f);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IOItemData.setWeight() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        this.weight = f;
    }
    IOItemData.prototype.unequipItemInSlot = function(player, slot) {
    	try {
    		this.checkInstanceOf(player, IOCharacter);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IOItemData.unequipItemInSlot() - player ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkInteger(slot);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IOItemData.unequipItemInSlot() - slot ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		if (player.getEquippedItem(slot) >= 0) {
	    	var Interactive = require("com/dalonedrow/engine/systems/base/interactive");
		    var slotioid = player.getEquippedItem(slot);
		    if (Interactive.getInstance().hasIO(slotioid)) {
		        var equipIO = Interactive.getInstance().getIO(slotioid);
		        if (equipIO.hasIOFlag(IoGlobals.IO_02_ITEM)
		                && equipIO.getItemData() !== null) {
		            equipIO.getItemData().ARX_EQUIPMENT_UnEquip(player.getIo(), false);
		        }
		        equipIO = null;
		    }
		}
	}
	return IOItemData;
});
