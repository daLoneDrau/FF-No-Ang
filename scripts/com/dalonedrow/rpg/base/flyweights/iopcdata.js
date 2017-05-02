/**
 * 
 */
define(["require", "com/dalonedrow/engine/systems/base/interactive",
	"com/dalonedrow/engine/systems/base/projectconstants",
	"com/dalonedrow/rpg/base/constants/equipmentglobals",
	"com/dalonedrow/rpg/base/constants/ioglobals",
	"com/dalonedrow/rpg/base/constants/mathglobals",
	"com/dalonedrow/rpg/base/constants/scriptglobals",
	"com/dalonedrow/rpg/base/flyweights/baseinteractiveobject",
	"com/dalonedrow/rpg/base/flyweights/behaviourdata",
	"com/dalonedrow/rpg/base/flyweights/iocharacter",
	"com/dalonedrow/rpg/base/flyweights/iopathfind",
	"com/dalonedrow/rpg/base/systems/script",
	"com/dalonedrow/rpg/base/systems/spellmaster"],
		function(require, Interactive, ProjectConstants, EquipmentGlobals, IoGlobals, MathGlobals,
				ScriptGlobals, BaseInteractiveObject, IOCharacter, Script, SpellMaster) {
	function IoPcData() {
		/** the number of bags the player has. */
		this.bags = 0;
		/** the {@link IoPcData}'s gender. */
		this.gender = -1;
		/** the character's gold. */
		this.gold = 0;
		/** interface flags. */
		this.interfaceFlags = 0;
		/** the IO associated with this {@link IoPcData}. */
		this.io = null;
		/** the player's key ring. */
		this.keyring = null;
		/** the {@link IoPcData}'s level. */
		this.level = 0;
		/** the {@link IoPcData}'s name. */
		this.name = "";
		/** the number of keys on the key ring. */
		this.numKeys = 0;
		/** the {@link IoPcData}'s Profession. */
		this.profession = -1;
		/** the {@link IoPcData}'s Race. */
		this.race = -1;
		/** the {@link IoPcData}'s experience points. */
		this.xp = 0;
	}
	IoPcData.prototype = Object.create(IOCharacter.prototype);
	/**
	 * Adds an interface flag.
	 * @param flag the flag
	 */
	IoPcData.prototype.addInterfaceFlag = function(flag) {
    	try {
    		this.checkPowerOfTwo(flag);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IoPcData.addInterfaceFlag() - flag ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		this.interfaceFlags |= flag;
	}
	/**
	 * Adds a key to the keyring.
	 * @param key the key
	 */
	IoPcData.prototype.addKey = function(key) {
    	try {
    		this.checkString(key);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IoPcData.addKey() - key ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		if (this.keyring === null) {
			this.keyring = [];
		}
		if (this.keyring.indexOf(key) < 0) {
			this.keyring.push(key);
		}
	}
	/**
	 * Adjusts the {@link IoPcData}'s gold.
	 * @param val the amount adjusted by
	 */
	IoPcData.prototype.adjustGold = function(val) {
    	try {
    		this.checkFloat(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IoPcData.adjustGold() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		this.gold += val;
		if (this.gold < 0) {
			this.gold = 0;
		}
		this.notifyWatchers();
	}
	/**
	 * Adjusts the player's life by a specific amount.
	 * @param dmg the amount
	 */
	IoPcData.prototype.adjustLife = function(dmg) {
    	try {
    		this.checkFloat(dmg);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IoPcData.adjustLife() - dmg ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		var ls = this.getLifeAttribute();
		var mls = ["M", ls].join("");
		this.setBaseAttributeScore(this.getLifeAttribute(), this.getBaseLife() + dmg);
		if (this.getBaseLife() > this.getFullAttributeScore(mls)) {
			// if Hit Points now > max
			this.setBaseAttributeScore(ls, this.getFullAttributeScore(mls));
		}
		if (this.getBaseLife() < 0) {
			// if life now < 0
			this.setBaseAttributeScore(ls, 0);
		}
		ls = null;
		mls = null;
	}
	/**
	 * Adjusts the {@link IoPcData}'s experience points.
	 * @param val the amount adjusted by
	 */
	IoPcData.prototype.adjustXp = function(val) {
    	try {
    		this.checkInteger(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IoPcData.adjustXp() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		this.xp += val;
		if (this.xp < 0) {
			this.xp = 0;
		}
		this.notifyWatchers();
	}
	/**
	 * Damages the player.
	 * @param dmg the damage amount
	 * @param type the type of damage
	 * @param source the source of the damage
	 * @return {@link float}
	 * @if an error occurs
	 */
	IoPcData.prototype.ARX_DAMAGES_DamagePlayer = function(dmg, type, source) {
    	try {
    		this.checkFloat(dmg);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IoPcData.ARX_DAMAGES_DamagePlayer() - dmg ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkInteger(type);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IoPcData.ARX_DAMAGES_DamagePlayer() - type ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkInteger(source);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IoPcData.ARX_DAMAGES_DamagePlayer() - source ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		var damagesdone = 0;
		this.computeFullStats();
		if (!this.io.hasIOFlag(IoGlobals.PLAYERFLAGS_INVULNERABILITY)
		        && this.getBaseLife() > 0) {
			if (dmg > this.getBaseLife()) {
				damagesdone = this.getBaseLife();
			} else {
				damagesdone = dmg;
			}
			this.io.setDamageSum(this.io.getDamageSum() + dmg);

			// TODO - add timer for ouch
			// if (ARXTime > inter.iobj[0]->ouch_time + 500) {
			var oes = Script.getInstance().getEventSender();

			if (Interactive.getInstance().hasIO(source)) {
				Script.getInstance().setEventSender(Interactive.getInstance().getIO(source));
			} else {
				Script.getInstance().setEventSender(null);
			}
			// send ouch event to IO
			Script.getInstance().sendIOScriptEvent(this.io,
			        ScriptConsts.SM_045_OUCH,
			        [ "OUCH", this.io.getDamageSum(),
			        	"SUMMONED_OUCH", 0 ],
			        null);
			Script.getInstance().setEventSender(oes);
			this.io.setDamageSum(0);
			// }

			if (dmg > 0) {
				if (Interactive.getInstance().hasIO(source)) {
					var poisonWeaponIO = null;
					var sourceIO = Interactive.getInstance().getIO(source);

					if (sourceIO.hasIOFlag(IoGlobals.IO_03_NPC)) {
						poisonWeaponIO = sourceIO.getNPCData().getWeapon();
						if (poisonWeaponIO !== null
						        && (poisonWeaponIO.getPoisonLevel() === 0
						                || poisonWeaponIO.getPoisonCharges() === 0)) {
							poisonWeaponIO = null;
						}
					}

					if (poisonWeaponIO === null) {
						poisonWeaponIO = sourceIO;
					}

					if (poisonWeaponIO !== null
					        && poisonWeaponIO.getPoisonLevel() > 0
					        && poisonWeaponIO.getPoisonCharges() > 0) {
						// TODO - handle poisoning

						if (poisonWeaponIO.getPoisonCharges() > 0) {
							poisonWeaponIO.setPoisonCharges(poisonWeaponIO.getPoisonCharges() - 1);
						}
					}
				}

				var alive;
				if (this.getBaseLife() > 0) {
					alive = true;
				} else {
					alive = false;
				}
				this.adjustLife(-dmg);

				if (this.getBaseLife() <= 0) {
					this.adjustLife(-this.getBaseLife());
					if (alive) {
						// TODO - what is this?
						// REFUSE_GAME_RETURN = true;
						this.becomesDead();

						// TODO - play fire sounds
						// if (type & DAMAGE_TYPE_FIRE
						// || type & DAMAGE_TYPE_FAKEFIRE) {
						// ARX_SOUND_PlayInterface(SND_PLAYER_DEATH_BY_FIRE);
						// }

						Script.getInstance().sendIOScriptEvent(
								this.io, ScriptConsts.SM_017_DIE, null, null);

						var i = Interactive.getInstance().getMaxIORefId();
						for (; i >= 0; i--) {
							if (!Interactive.getInstance().hasIO(i)) {
								continue;
							}
							var ioo = Interactive.getInstance().getIO(i);
							// tell all IOs not to target player anymore
							if (ioo !== null
							        && ioo.hasIOFlag(IoGlobals.IO_03_NPC)) {
								if (ioo.getTargetinfo() === io.getRefId()
								        || ioo.getTargetinfo() === IoGlobals.TARGET_PLAYER) {
									Script.getInstance().setEventSender(this.io);
									var killer = "";
									if (source === io.getRefId()) {
										killer = "PLAYER";
									} else if (source <= -1) {
										killer = "NONE";
									} else if (Interactive.getInstance().hasIO(source)) {
										var sourceIO = Interactive.getInstance().getIO(source);
										if (sourceIO.hasIOFlag(IoGlobals.IO_03_NPC)) {
											killer = sourceIO.getNPCData().getName();
										}
									}
									Script.getInstance().sendIOScriptEvent(ioo,
									        0,
									        [ "tmp_int1", source ],
									        "TargetDeath");
								}
							}
						}
					}
				}
			}
		}
		return damagesdone;
	}
	/**
	 * Drains mana from the NPC, returning the full amount drained.
	 * @param dmg the attempted amount of mana to be drained
	 * @return {@link float}
	 */
	IoPcData.prototype.ARX_DAMAGES_DrainMana = function(dmg) {
    	try {
    		this.checkFloat(dmg);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IoPcData.ARX_DAMAGES_DrainMana() - dmg ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		var manaDrained = 0;
		if (!this.io.hasIOFlag(IoGlobals.PLAYERFLAGS_NO_MANA_DRAIN)) {
			if (this.getBaseMana() >= dmg) {
				this.adjustMana(-dmg);
				manaDrained = dmg;
			} else {
				manaDrained = getBaseMana();
				this.adjustMana(-manaDrained);
			}
		}
		return manaDrained;
	}
	/**
	 * Heals the player's mana.
	 * @param dmg the amount of healing
	 */
	IoPcData.prototype.ARX_DAMAGES_HealManaPlayer = function(dmg) {
    	try {
    		this.checkFloat(dmg);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IoPcData.ARX_DAMAGES_HealManaPlayer() - dmg ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		if (this.getBaseLife() > 0) {
			if (dmg > 0) {
				this.adjustMana(dmg);
			}
		}
	}
	/**
	 * Heals the player.
	 * @param dmg the amount of healing
	 */
	IoPcData.prototype.ARX_DAMAGES_HealPlayer = function(dmg) {
    	try {
    		this.checkFloat(dmg);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IoPcData.ARX_DAMAGES_HealPlayer() - dmg ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		if (this.getBaseLife() > 0) {
			if (dmg > 0) {
				// if (!BLOCK_PLAYER_CONTROLS)
				this.adjustLife(dmg);
			}
		}
	}
	/**
	 * Gets the type of weapon the player is wielding.
	 * @return {@link long}
	 * @throws PooledException if an error occurs
	 * @if an error occurs
	 */
	IoPcData.prototype.ARX_EQUIPMENT_GetPlayerWeaponType = function() {
		var type = EquipmentGlobals.WEAPON_BARE;
		var wpnId = this.getEquippedItem(EquipmentGlobals.EQUIP_SLOT_WEAPON);
		if (wpnId >= 0
		        && Interactive.getInstance().hasIO(wpnId)) {
			var weapon = Interactive.getInstance().getIO(wpnId);
			if (weapon.hasTypeFlag(EquipmentGlobals.OBJECT_TYPE_DAGGER)) {
				type = EquipmentGlobals.WEAPON_DAGGER;
			}
			if (weapon.hasTypeFlag(EquipmentGlobals.OBJECT_TYPE_1H)) {
				type = EquipmentGlobals.WEAPON_1H;
			}
			if (weapon.hasTypeFlag(EquipmentGlobals.OBJECT_TYPE_2H)) {
				type = EquipmentGlobals.WEAPON_2H;
			}
			if (weapon.hasTypeFlag(EquipmentGlobals.OBJECT_TYPE_BOW)) {
				type = EquipmentGlobals.WEAPON_BOW;
			}
			weapon = null;
		}
		return type;
	}
	/**
	 * Determines if the player has an item equipped.
	 * @param itemIO the item
	 * @return <tt>true</tt> if the player has the item equipped; <tt>false</tt>
	 *         otherwise
	 * @throws PooledException if an error occurs
	 * @if an error occurs
	 */
	IoPcData.prototype.ARX_EQUIPMENT_IsPlayerEquip = function(itemIO) {
    	var BaseInteractiveObject =
    		require("com/dalonedrow/rpg/base/flyweights/baseinteractiveobject");
    	try {
    		this.checkInstanceOf(itemIO, BaseInteractiveObject);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IoNpcData.setIo() - itemIO ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		var isEquipped = false;
		var i = ProjectConstants.getInstance().getMaxEquipped() - 1;
		for (; i >= 0; i--) {
			if (this.getEquippedItem(i) >= 0
			        && Interactive.getInstance().hasIO(this.getEquippedItem(i))) {
				var toequip = Interactive.getInstance().getIO(getEquippedItem(i));
				if (toequip.equals(itemIO)) {
					isEquipped = true;
					break;
				}
			}
		}
		return isEquipped;
	}
	/**
	 * Unequips the player's weapon.
	 * @throws PooledException if an error occurs
	 * @if an error occurs
	 */
	IoPcData.prototype.ARX_EQUIPMENT_UnEquipPlayerWeapon = function() {
		var wpnId = this.getEquippedItem(EquipmentGlobals.EQUIP_SLOT_WEAPON);
		if (wpnId >= 0
		        && Interactive.getInstance().hasIO(wpnId)) {
			var weapon = Interactive.getInstance().getIO(wpnId);
			weapon.getItemData().ARX_EQUIPMENT_UnEquip(this.io, false);
		}
		this.setEquippedItem(EquipmentGlobals.EQUIP_SLOT_WEAPON, -1);
	}
	/**
	 * Called when a player dies.
	 * @throws RPGException
	 */
	IoPcData.prototype.becomesDead = function() {
		var i = ProjectConstants.getInstance().getMaxSpells() - 1;
		for (; i >= 0; i--) {
			var spell = SpellMaster.getInstance().getSpell(i);
			if (spell.exists()
			        && spell.getCaster() === this.io.getRefId()) {
				spell.setTimeToLive(0);
				spell.setTurnsToLive(0);
			}
		}
	}
	/** Clears all interface flags that were set. */
	IoPcData.prototype.clearInterfaceFlags = function() {
		this.interfaceFlags = 0;
	}
	/**
	 * Gets the {@link IoPcData}'s gender.
	 * @return int
	 */
	IoPcData.prototype.getGender = function() {
		return this.gender;
	}
	/**
	 * Gets the character's gold.
	 * @return <code>float</code>
	 */
	IoPcData.prototype.getGold = function() {
		return this.gold;
	}
	/**
	 * Gets the IO associated with this {@link IoPcData}.
	 * @return {@link IO}
	 */
	IoPcData.prototype.getIo = function() {
		return this.io;
	}
	/**
	 * Gets a specific key from the keyring.
	 * @param index the key's index
	 * @return {@link String}
	 */
	IoPcData.prototype.getKey = function(index) {
    	try {
    		this.checkInteger(index);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IoPcData.getKey() - index ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		var key = null;
		if (this.keyring !== null
		        && index >= 0
		        && index < this.keyring.length) {
			key = this.keyring[index];
		}
		return key;
	}
	/**
	 * Gets the index of a specific key.
	 * @param key the key's id.
	 * @return {@link int}
	 */
	IoPcData.prototype.getKeyIndex = function(key) {
    	try {
    		this.checkString(key);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IoPcData.getKeyIndex() - key ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		return this.keyring.indexOf(key);
	}
	/**
	 * Gets the {@link IoPcData}'s level.
	 * @return int
	 */
	IoPcData.prototype.getLevel = function() {
		return this.level;
	}
	/**
	 * Gets the {@link IoPcData}'s name.
	 * @return char[]
	 */
	IoPcData.prototype.getName = function() {
		return this.name;
	}
	/**
	 * Gets the value for the bags.
	 * @return {@link int}
	 */
	IoPcData.prototype.getNumberOfBags = function() {
		return this.bags;
	}
	/**
	 * Gets the number of keys on the key ring.
	 * @return {@link int}
	 */
	IoPcData.prototype.getNumKeys = function() {
		if (this.keyring === null) {
			this.keyring = [];
		}
		return this.keyring.length;
	}
	/**
	 * Gets the {@link IoPcData}'s Profession.
	 * @return int
	 */
	IoPcData.prototype.getProfession = function() {
		return this.profession;
	}
	/**
	 * Gets the {@link IoPcData}'s Race.
	 * @return int
	 */
	IoPcData.prototype.getRace = function() {
		return this.race;
	}
	/**
	 * Gets the {@link IoPcData}'s experience points.
	 * @return int
	 */
	IoPcData.prototype.getXp = function() {
		return this.xp;
	}
	/**
	 * Determines if the {@link IoPcData} has a specific flag.
	 * @param flag the flag
	 * @return true if the {@link IoPcData} has the flag; false otherwise
	 */
	IoPcData.prototype.hasInterfaceFlag = function(flag) {
    	try {
    		this.checkPowerOfTwo(flag);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IoPcData.hasInterfaceFlag() - flag ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		return (this.interfaceFlags & flag) === flag;
	}
	/**
	 * Determines if the PC has a key in their keyring.
	 * @param key the key's name
	 * @return <tt>true</tt> if the PC has the key <tt>false></tt> otherwise
	 */
	IoPcData.prototype.hasKey = function(key) {
    	try {
    		this.checkString(key);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IoPcData.hasKey() - key ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		if (this.keyring === null) {
			this.keyring = [];
		}
		return this.keyring.indexof(key) >= 0;
	}
	/**
	 * Removes an interface flag.
	 * @param flag the flag
	 */
	IoPcData.prototype.removeInterfaceFlag = function(flag) {
    	try {
    		this.checkPowerOfTwo(flag);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IoPcData.removeInterfaceFlag() - flag ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		this.interfaceFlags &= ~flag;
	}
	/**
	 * Removes a key.
	 * @param key the key's id
	 */
	IoPcData.prototype.removeKey = function(key) {
    	try {
    		this.checkString(key);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IoPcData.removeKey() - key ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		if (this.keyring === null) {
			this.keyring = [];
		}
		var index = this.keyring.indexof(key);
		if (index >= 0) {
			this.keyring.splice(index, 1);
		}
	}
	/**
	 * Sets the {@link IoPcData}'s gender.
	 * @param val the gender to set
	 */
	IoPcData.prototype.setGender = function(val) {
    	try {
    		this.checkInstanceOfNullsAllowed(val, Gender);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IoPcData.setGender() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		this.gender = val;
		this.notifyWatchers();
	}
	/**
	 * Sets the IO associated with the pc data.
	 * @param newIO the IO to set
	 */
	IoPcData.prototype.setIo = function(newIO) {
    	var BaseInteractiveObject =
    		require("com/dalonedrow/rpg/base/flyweights/baseinteractiveobject");
    	try {
    		this.checkInstanceOfNullsAllowed(newIO, BaseInteractiveObject);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IoPcData.setIo() - newIO ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		this.io = newIO;
		if (newIO !== null
		        && newIO.getPCData() === null) {
			newIO.setPCData(this);
		}
	}
	/**
	 * Sets the {@link IoPcData}'s level.
	 * @param val the level to set
	 */
	IoPcData.prototype.setLevel = function(val) {
    	try {
    		this.checkInteger(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IoPcData.setLevel() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		this.level = val;
		this.notifyWatchers();
	}
	/**
	 * Sets the {@link IoPcData}'s name.
	 * @param val the name to set
	 */
	IoPcData.prototype.setName = function(val) {
    	try {
    		this.checkStringNullsAllowed(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IoPcData.setName() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		this.name = val;
		this.notifyWatchers();
	}
	/**
	 * Sets the {@link IoPcData}'s Profession.
	 * @param val the profession to set
	 */
	IoPcData.prototype.setProfession = function(val) {
    	try {
    		this.checkInteger(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IoPcData.setProfession() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		this.profession = val;
		this.notifyWatchers();
	}
	/**
	 * Sets the {@link IoPcData}'s Race.
	 * @param val the race to set
	 */
	IoPcData.prototype.setRace = function(val) {
    	try {
    		this.checkInteger(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! IoPcData.setRace() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		this.race = val;
		this.notifyWatchers();
	}
	return IoPcData;
});
