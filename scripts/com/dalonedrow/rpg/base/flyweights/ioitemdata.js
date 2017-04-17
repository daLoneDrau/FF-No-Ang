define(['require', 'com/dalonedrow/rpg/base/flyweights/baseinteractiveobject',
	'com/dalonedrow/rpg/base/flyweights/ioequipitem'], function(require, BaseInteractiveObject,
			IOEquipItem) {
    function IOItemData() {
	    /** the current number in an inventory slot. */
	    var count = 0;
	    /** the item's description. */
	    var description = '';
	    /** modifier data for the item. */
	    var equipitem = new IOEquipItem();
	    /** dunno? */
	    var foodValue;
	    /** the IO associated with this data. */
	    var io = null;
	    /** the item's name. */
	    var itemName = '';
	    /** the item's light value. */
	    var lightValue = 0;
	    /** the maximum number of the item the player can own. */
	    var maxOwned = 0;
	    /** the item's price. */
	    var price = 0;
	    /** the type of ring the item is. */
	    var ringType = 0;
	    /** the amount of the item that can be stacked in one inventory slot. */
	    var stackSize = 0;
	    /** dunno? */
	    var stealvalue;
	    /** the item's weight. */
	    var weight = 0;
	    var title = '';
	    /**
	     * Adjusts the {@link IOItemData}'s count.
	     * @param val the amount adjusted by
	     */
	    this.adjustCount = function(val) {
	        if (count + val < 0) {
	            throw new Error("Cannot remove that many items");
	        }
	        if (count + val > maxOwned) {
	            throw new Error("Cannot add that many items");
	        }
	        count += val;
	    }
	    var applyCriticalModifier = function() {
	    	return 0;
	    }
	    this.ARX_EQUIPMENT_ComputeDamages = function(io_source, io_target, dmgModifier) {
	    	var damages = 0;
	        // send event to target. someone attacked you!
	        Script.getInstance().setEventSender(io_source);
	        Script.getInstance().sendIOScriptEvent(io_target,
	                ScriptGlobals.SM_057_AGGRESSION, null, null);
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
	                    	var io = Interactive.getInstance().getIO(wpnId);
	                        if (io.getWeaponmaterial() !== null
	                                && io.getWeaponmaterial().length() > 0) {
	                            wmat = io.getWeaponmaterial();
	                        }
	                        io = null;
	                    }
	                    attack = io_source.getPCData().getFullDamage();
	                    if (io_source.getPCData().calculateCriticalHit()
	                            && Script.getInstance().sendIOScriptEvent(
	                                    io_source, ScriptGlobals.SM_054_CRITICAL,
	                                    null, null) !== ScriptGlobals.REFUSE) {
	                        critical = true;
	                    }
	                    damages = attack * dmgModifier;
	                    if (io_source.getPCData().calculateBackstab()
	                            && Script.getInstance().sendIOScriptEvent(
	                                    io_source, ScriptGlobals.SM_056_BACKSTAB,
	                                    null, null) !== ScriptGlobals.REFUSE) {
	                        backstab = this.getBackstabModifier();
	                    }
	                } else {
	                    if (io_source.hasIOFlag(IoGlobals.IO_03_NPC)) {
	                    	var wpnId = io_source.getNPCData().getEquippedItem(
	                                EquipmentGlobals.EQUIP_SLOT_WEAPON);
	                        if (Interactive.getInstance().hasIO(wpnId)) {
	                        	var io = Interactive.getInstance().getIO(wpnId);
	                            if (io.getWeaponmaterial() !== null
	                                    && io.getWeaponmaterial().length() > 0) {
	                                wmat = io.getWeaponmaterial();
	                            }
	                            io = null;
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
	                                        ScriptGlobals.SM_054_CRITICAL,
	                                        null, null) !== ScriptGlobals.REFUSE) {
	                            critical = true;
	                        }
	                        damages = attack * dmgModifier;
	                        if (io_source.getNPCData().calculateBackstab()
	                                && Script.getInstance().sendIOScriptEvent(
	                                        io_source,
	                                        ScriptGlobals.SM_056_BACKSTAB,
	                                        null, null) !== ScriptGlobals.REFUSE) {
	                            backstab = this.getBackstabModifier();
	                        }
	                    } else {
	                        throw new RPGException(ErrorMessage.BAD_PARAMETERS,
	                                "Compute Damages call made by non-character");
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
	                    	var io = Interactive.getInstance().getIO(armrId);
	                        if (io.getArmormaterial() !== null
	                                && io.getArmormaterial().length() > 0) {
	                            amat = io.getArmormaterial();
	                        }
	                        io = null;
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
	    this.ARX_EQUIPMENT_Equip = function(target) {
	        if (io === null) {
	            throw new Error("Cannot equip item with no IO data");
	        }
	        if (target !== null) {
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
	                            && io.equals(Interactive.getInstance().getIO(i))) {
	                        validid = i;
	                        break;
	                    }
	                }
	                if (validid >= 0) {
	                    Interactive.getInstance().RemoveFromAllInventories(io);
	                    io.setShow(IoGlobals.SHOW_FLAG_ON_PLAYER); // on player
	                    // handle drag
	                    // if (toequip === DRAGINTER)
	                    // Set_DragInter(NULL);
	                    if (io.hasTypeFlag(EquipmentGlobals.OBJECT_TYPE_WEAPON)) {
	                        equipWeapon(charData);
	                    } else if (io
	                            .hasTypeFlag(EquipmentGlobals.OBJECT_TYPE_SHIELD)) {
	                        equipShield(charData);
	                    } else if (io
	                            .hasTypeFlag(EquipmentGlobals.OBJECT_TYPE_RING)) {
	                        equipRing(charData);
	                    } else if (io
	                            .hasTypeFlag(EquipmentGlobals.OBJECT_TYPE_ARMOR)) {
	                        // unequip old armor
	                        unequipItemInSlot(
	                                charData, EquipmentGlobals.EQUIP_SLOT_TORSO);
	                        // equip new armor
	                        charData.setEquippedItem(
	                                EquipmentGlobals.EQUIP_SLOT_TORSO, validid);
	                    } else if (io
	                            .hasTypeFlag(
	                                    EquipmentGlobals.OBJECT_TYPE_LEGGINGS)) {
	                        // unequip old leggings
	                        unequipItemInSlot(
	                                charData, EquipmentGlobals.EQUIP_SLOT_LEGGINGS);
	                        // equip new leggings
	                        charData.setEquippedItem(
	                                EquipmentGlobals.EQUIP_SLOT_LEGGINGS, validid);
	                    } else if (io
	                            .hasTypeFlag(EquipmentGlobals.OBJECT_TYPE_HELMET)) {
	                        // unequip old helmet
	                        unequipItemInSlot(
	                                charData, EquipmentGlobals.EQUIP_SLOT_HELMET);
	                        // equip new helmet
	                        charData.setEquippedItem(
	                                EquipmentGlobals.EQUIP_SLOT_HELMET, validid);
	                    }
	                    if (io.hasTypeFlag(EquipmentGlobals.OBJECT_TYPE_HELMET)
	                            || io.hasTypeFlag(
	                                    EquipmentGlobals.OBJECT_TYPE_ARMOR)
	                            || io.hasTypeFlag(
	                                    EquipmentGlobals.OBJECT_TYPE_LEGGINGS)) {
	                        charData.ARX_EQUIPMENT_RecreatePlayerMesh();
	                    }
	                    charData.computeFullStats();
	                }
	            }
	        }
	    }
	    this.ARX_EQUIPMENT_ReleaseAll = function() {
	        this.ARX_EQUIPMENT_ReleaseEquipItem();
	    }
	    /** Releases the {@link IOEquipItem} data from the item. */
	    this.ARX_EQUIPMENT_ReleaseEquipItem = function() {
	        if (equipitem !== null) {
	            equipitem = null;
	        }
	    }
	    /**
	     * Sets the item's object type.
	     * @param flag the type flag
	     * @param added if <tt>true</tt>, the type is set; otherwise it is removed
	     * @if an error occurs
	     */
	    this.ARX_EQUIPMENT_SetObjectType = function(flag, added) {
	        if (added) {
	            io.addTypeFlag(flag);
	        } else {
	            io.removeTypeFlag(flag);
	        }
	    }
	    /**
	     * Unequips the item from the targeted IO.
	     * @param target the targeted IO
	     * @param isDestroyed if<tt>true</tt> the item is destroyed afterwards
	     * @throws PooledException if an error occurs
	     * @if an error occurs
	     */
	    this.ARX_EQUIPMENT_UnEquip = function(target, isDestroyed) {
	        if (target !== null) {
	            if (target.hasIOFlag(IoGlobals.IO_01_PC)) {
	            	var i = ProjectConstants.getInstance().getMaxEquipped() - 1;
	                for (; i >= 0; i--) {
	                	var player = target.getPCData();
	                	var itemRefId = player.getEquippedItem(i);
	                    if (itemRefId >= 0
	                            && Interactive.getInstance().hasIO(itemRefId)
	                            && Interactive.getInstance().getIO(
	                                    itemRefId).equals(io)) {
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
	                            if (!target.getInventory().CanBePutInInventory(io)) {
	                                target.getInventory().PutInFrontOfPlayer(io, true);
	                            }
	                        }
	                        // send event from this item to target to unequip
	                        Script.getInstance().setEventSender(io);
	                        Script.getInstance().sendIOScriptEvent(target,
	                                ScriptGlobals.SM_007_EQUIPOUT, null, null);
	                        // send event from target to this item to unequip
	                        Script.getInstance().setEventSender(target);
	                        Script.getInstance().sendIOScriptEvent(io,
	                                ScriptGlobals.SM_007_EQUIPOUT, null, null);
	                    }
	                }
	                if (io.hasTypeFlag(EquipmentGlobals.OBJECT_TYPE_HELMET)
	                        || io.hasTypeFlag(EquipmentGlobals.OBJECT_TYPE_ARMOR)
	                        || io.hasTypeFlag(EquipmentGlobals.OBJECT_TYPE_LEGGINGS)) {
	                    target.getPCData().ARX_EQUIPMENT_RecreatePlayerMesh();
	                }
	            }
	        }
	    }
	    this.calculateArmorDeflection = function() {
	    	return 0;
	    }
	    /**
	     * Equips a ring on a character.
	     * @param charData the character data
	     * @if an error occurs
	     */
	    var equipRing = function(charData) {
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
	                            unequipItemInSlot(charData,
	                                    EquipmentGlobals.EQUIP_SLOT_RING_RIGHT);
	                        }
	                        oldIO = null;
	                    }
	                    equipSlot =
	                            EquipmentGlobals.EQUIP_SLOT_RING_RIGHT;
	                } else {
	                    ioid = charData.getEquippedItem(
	                            EquipmentGlobals.EQUIP_SLOT_RING_LEFT);
	                    if (Interactive.getInstance().hasIO(ioid)) {
	                    	var oldIO = Interactive.getInstance().getIO(ioid);
	                        if (oldIO.hasIOFlag(IoGlobals.IO_02_ITEM)) {
	                            unequipItemInSlot(charData,
	                                    EquipmentGlobals.EQUIP_SLOT_RING_LEFT);
	                        }
	                        oldIO = null;
	                    }
	                    equipSlot = EquipmentGlobals.EQUIP_SLOT_RING_LEFT;
	                }
	                charData.getIo().getInventory().setLeftRing(
	                		!charData.getIo().getInventory().isLeftRing());
	            }
	            charData.setEquippedItem(equipSlot, io.getRefId());
	        }
	    }
	    /**
	     * Equips a shield on a character.
	     * @param charData the character data
	     * @if an error occurs
	     */
	    var equipShield = function(charData) {
	        // unequip old shield
	        unequipItemInSlot(charData, EquipmentGlobals.EQUIP_SLOT_SHIELD);
	        // equip new shield
	        charData.setEquippedItem(
	                EquipmentGlobals.EQUIP_SLOT_SHIELD, io.getRefId());
	        // TODO - attach new shield to mesh
	        // EERIE_LINKEDOBJ_LinkObjectToObject(target->obj,
	        // io->obj, "SHIELD_ATTACH", "SHIELD_ATTACH", io);
	        var wpnID =
	                charData.getEquippedItem(EquipmentGlobals.EQUIP_SLOT_WEAPON);
	        if (wpnID >= 0) {
	            if (Interactive.getInstance().hasIO(wpnID)) {
	            	var wpn = Interactive.getInstance().getIO(wpnID);
	                if (wpn.hasTypeFlag(EquipmentGlobals.OBJECT_TYPE_2H)
	                        || wpn.hasTypeFlag(EquipmentGlobals.OBJECT_TYPE_BOW)) {
	                    // unequip old weapon
	                    unequipItemInSlot(charData, EquipmentGlobals.EQUIP_SLOT_WEAPON);
	                }
	            }
	        }
	    }
	    /**
	     * Equips a weapon for a character.
	     * @param charData the character data
	     * @if an error occurs
	     */
	    var equipWeapon = function(charData) {
	        // unequip old weapon
	        unequipItemInSlot(charData, EquipmentGlobals.EQUIP_SLOT_WEAPON);
	        // equip new weapon
	        charData.setEquippedItem(
	                EquipmentGlobals.EQUIP_SLOT_WEAPON, io.getRefId());
	        // attach it to player mesh
	        if (io.hasTypeFlag(EquipmentGlobals.OBJECT_TYPE_BOW)) {
	            // EERIE_LINKEDOBJ_LinkObjectToObject(
	            // target->obj, io->obj,
	            // "WEAPON_ATTACH", "TEST", io);
	        } else {
	            // EERIE_LINKEDOBJ_LinkObjectToObject(
	            // target->obj,
	            // io->obj,
	            // "WEAPON_ATTACH", "PRIMARY_ATTACH", io); //
	        }
	        if (io.hasTypeFlag(EquipmentGlobals.OBJECT_TYPE_2H)
	                || io.hasTypeFlag(EquipmentGlobals.OBJECT_TYPE_BOW)) {
	            // for bows or 2-handed swords, unequip old shield
	            unequipItemInSlot(charData, EquipmentGlobals.EQUIP_SLOT_SHIELD);
	        }
	    }
	    this.getBackstabModifier = function() {
	    	return 0;
	    }
	    /**
	     * Gets the current number in an inventory slot.
	     * @return {@link short}
	     */
	    this.getCount = function() {
	        return count;
	    }
	    /**
	     * Gets the item's description.
	     * @return {@link char[]}
	     */
	    this.getDescription = function() {
	        return description;
	    }
	    /**
	     * Gets the list of equipment item modifiers.
	     * @return {@link EquipmentItemModifier}[]
	     */
	    this.getEquipitem = function() {
	        return equipitem;
	    }
	    /**
	     * Gets the value for the foodValue.
	     * @return {@link char}
	     */
	    this.getFoodValue = function() {
	        return foodValue;
	    }
	    /**
	     * Gets the IO associated with this data.
	     * @return {@link IO}
	     */
	    this.getIo = function() {
	        return io;
	    }
	    /**
	     * Gets the item's name.
	     * @return <code>char</code>[]
	     */
	    this.getItemName = function() {
	        return itemName;
	    }
	    /**
	     * Gets the value for the lightValue.
	     * @return {@link int}
	     */
	    this.getLightValue = function() {
	        return lightValue;
	    }
	    /**
	     * Gets the maximum number of the item the player can own.
	     * @return {@link int}
	     */
	    this.getMaxOwned = function() {
	        return maxOwned;
	    }
	    /**
	     * Gets the item's price.
	     * @return {@link float}
	     */
	    this.getPrice = function() {
	        return price;
	    }
	    /**
	     * Gets the type of ring the item is.
	     * @return {@link int}
	     */
	    this.getRingType = function() {
	        return ringType;
	    }
	    /**
	     * Gets the value for the stackSize.
	     * @return {@link int}
	     */
	    this.getStackSize = function() {
	        return stackSize;
	    }
	    /**
	     * Gets the value for the stealvalue.
	     * @return {@link char}
	     */
	    this.getStealvalue = function() {
	        return stealvalue;
	    }
	    /**
	     * Gets the type of weapon an item is.
	     * @return {@link int}
	     */
	    this.getWeaponType = function() {
	        var type = EquipmentGlobals.WEAPON_BARE;
	        if (io.hasTypeFlag(EquipmentGlobals.OBJECT_TYPE_DAGGER)) {
	            type = EquipmentGlobals.WEAPON_DAGGER;
	        } else if (io.hasTypeFlag(EquipmentGlobals.OBJECT_TYPE_1H)) {
	            type = EquipmentGlobals.WEAPON_1H;
	        } else if (io.hasTypeFlag(EquipmentGlobals.OBJECT_TYPE_2H)) {
	            type = EquipmentGlobals.WEAPON_2H;
	        } else if (io.hasTypeFlag(EquipmentGlobals.OBJECT_TYPE_BOW)) {
	            type = EquipmentGlobals.WEAPON_BOW;
	        }
	        return type;
	    }
	    /**
	     * Gets the item's weight.
	     * @return {@link float}
	     */
	    this.getWeight = function() {
	        return weight;
	    }
	    /**
	     * Sets the current number in an inventory slot.
	     * @param val the new value to set
	     */
	    this.setCount = function(val) {
	        count = val;
	    }
	    /**
	     * Sets the {@link IOItemData}'s description.
	     * @param val the name to set
	     * @if the parameter is null
	     */
	    this.setDescription = function(val) {
	        if (val === null) {
	            throw new Error("Description cannot be null");
	        }
	        description = val;
	    }
	    /**
	     * Sets the equipitem
	     * @param val the equipitem to set
	     */
	    this.setEquipitem = function(val) {
	    	if (!(val instanceof IOEquipItem)) {
	    		throw new Error("Argument must be an IOEquipItem");
	    	}
	        equipitem = val;
	    }
	    /**
	     * Sets the value of the foodValue.
	     * @param val the new value to set
	     */
	    this.setFoodValue = function(val) {
	        foodValue = val;
	    }
	    /**
	     * Sets the the IO associated with this data.
	     * @param val the new value to set
	     */
	    this.setIo = function(val) {
	    	var BaseInteractiveObject =
	    		require("com/dalonedrow/rpg/base/flyweights/baseinteractiveobject");
		    if (val) {
		    	if (val === null) {
			        io = val;
		    	} else if (val instanceof BaseInteractiveObject) {
			        io = val;
			        if (val.getItemData() === null) {
			            val.setItemData(this);
			        }
		    	} else {
		            var s = [];
		            s.push("ERROR! IOItemData.setIo() - ");
		            s.push("argument must be BaseInteractiveObject");
		            throw new Error(s.join(""));
		    	}
		    } else {
	            var s = [];
	            s.push("ERROR! IOItemData.setIo() - ");
	            s.push("argument must be BaseInteractiveObject");
	            throw new Error(s.join(""));
		    }
	    }
	    /**
	     * Sets the item's name.
	     * @param val the name to set
	     * @if the parameter is null
	     */
	    this.setItemName = function(val) {
	        itemName = val;
	    }
	    /**
	     * Sets the value of the lightValue.
	     * @param val the new value to set
	     */
	    this.setLightValue = function(val) {
	        lightValue = val;
	    }
	    /**
	     * Sets the maximum number of the item the player can own.
	     * @param val the new value
	     */
	    this.setMaxOwned = function(val) {
	        maxOwned = val;
	    }
	    /**
	     * Sets the item's price.
	     * @param val the price to set
	     */
	    this.setPrice = function(val) {
	        price = val;
	    }
	    /**
	     * Sets the type of ring the item is.
	     * @param val the new value to set
	     */
	    this.setRingType = function(val) {
	        ringType = val;
	    }
	    /**
	     * Sets the amount of the item that can be stacked in one inventory slot.
	     * @param val the value to set
	     */
	    this.setStackSize = function(val) {
	        stackSize = val;
	    }
	    /**
	     * Sets the value of the stealvalue.
	     * @param stealvalue the new value to set
	     */
	    this.setStealvalue = function(val) {
	        stealvalue = val;
	    }
	    /**
	     * Sets the item's weight.
	     * @param f the weight to set
	     */
	    this.setWeight = function(f) {
	        weight = f;
	    }
	    var unequipItemInSlot = function(player, slot) {
	        if (player.getEquippedItem(slot) >= 0) {
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
	    this.getTitle = function() {
	        return title;
	    }
	    this.setTitle = function(val) {
	        title = val;
	    }
	}
	return IOItemData;
});
