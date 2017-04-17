/**
 *
 */
define(function() {
    function IoPcData() {
		IOCharacter.call(this);
		/** the number of bags the player has. */
		var bags = 0;
		/** the {@link IoPcData}'s gender. */
		var gender = -1;
		/** the character's gold. */
		var gold = 0;
		/** interface flags. */
		var interfaceFlags = 0;
		/** the IO associated with this {@link IoPcData}. */
		var io = null;
		/** the player's key ring. */
		var keyring = null;
		/** the {@link IoPcData}'s level. */
		var level = 0;
		/** the {@link IoPcData}'s name. */
		var name = "";
		/** the number of keys on the key ring. */
		var numKeys = 0;
		/** the {@link IoPcData}'s Profession. */
		var profession = -1;
		/** the {@link IoPcData}'s Race. */
		var race = -1;
		/** the {@link IoPcData}'s experience points. */
		var xp = 0;
		/**
		 * Adds an interface flag.
		 * @param flag the flag
		 */
		this.addInterfaceFlag = function(val) {
			interfaceFlags |= flag;
		}
		/**
		 * Adds a key to the keyring.
		 * @param key the key
		 */
		this.addKey = function(val) {
			if (typeof val !== "string") {
				throw new Error("Argument must be a string");
			}
			if (keyring === null) {
				keyring = [];
			}
			var index = keyring.indexOf(val);
			if (index === -1) {
				keyring.push(key);
				numKeys++;
			}
		}
		/**
		 * Adjusts the {@link IoPcData}'s gold.
		 * @param val the amount adjusted by
		 */
		this.adjustGold = function(val) {
			gold += val;
			if (gold < 0) {
				gold = 0;
			}
			this.notifyWatchers();
		}
		/**
		 * Adjusts the player's life by a specific amount.
		 * @param dmg the amount
		 */
		var adjustLife = function(val) {
			var ls = this.getLifeAttribute();
			var mls = ["M", ls].join("");
			this.setBaseAttributeScore(this.getLifeAttribute(), this.getBaseLife() + val);
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
		 * Adjusts the player's mana by a specific amount.
		 * @param dmg the amount
		 */
		this.adjustMana = function(dmg) {
			
		}
		/**
		 * Adjusts the {@link IoPcData}'s experience points.
		 * @param val the amount adjusted by
		 */
		this.adjustXp = function(val) {
			xp += val;
			if (xp < 0) {
				xp = 0;
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
		this.ARX_DAMAGES_DamagePlayer = function(dmg, type, source) {
			var damagesdone = 0;
			this.computeFullStats();
			if (!io.hasIOFlag(IoGlobals.PLAYERFLAGS_INVULNERABILITY)
			        && this.getBaseLife() > 0) {
				if (dmg > this.getBaseLife()) {
					damagesdone = this.getBaseLife();
				} else {
					damagesdone = dmg;
				}
				io.setDamageSum(io.getDamageSum() + dmg);
	
				// TODO - add timer for ouch
				// if (ARXTime > inter.iobj[0]->ouch_time + 500) {
				var oes = Script.getInstance().getEventSender();
	
				if (Interactive.getInstance().hasIO(source)) {
					Script.getInstance().setEventSender(Interactive.getInstance().getIO(source));
				} else {
					Script.getInstance().setEventSender(null);
				}
				Script.getInstance().sendIOScriptEvent(io,
				        ScriptGlobals.SM_045_OUCH,
				        [ "OUCH", io.getDamageSum(), "SUMMONED_OUCH", 0 ],
				        null);
				Script.getInstance().setEventSender(oes);
				io.setDamageSum(0);
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
					adjustLife(-dmg);
	
					if (this.getBaseLife() <= 0) {
						adjustLife(-this.getBaseLife());
						if (alive) {
							// TODO - what is this?
							// REFUSE_GAME_RETURN = true;
							becomesDead();
	
							// TODO - play fire sounds
							// if (type & DAMAGE_TYPE_FIRE
							// || type & DAMAGE_TYPE_FAKEFIRE) {
							// ARX_SOUND_PlayInterface(SND_PLAYER_DEATH_BY_FIRE);
							// }
	
							Script.getInstance().sendIOScriptEvent(io,
							        ScriptGlobals.SM_017_DIE, null, null);
	
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
										Script.getInstance()
										        .setEventSender(io);
										var killer = "";
										if (source === io.getRefId()) {
											killer = "PLAYER";
										} else if (source <= -1) {
											killer = "NONE";
										} else if (Interactive.getInstance()
										        .hasIO(source)) {
											var sourceIO = Interactive.getInstance().getIO(source);
											if (sourceIO.hasIOFlag(
											        IoGlobals.IO_03_NPC)) {
												killer = sourceIO.getNPCData().getName();
											}
										}
										Script.getInstance().sendIOScriptEvent(ioo,
										        0,
										        ["tmp_int1", source ],
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
		this.ARX_DAMAGES_DrainMana = function(val) {
			var manaDrained = 0;
			if (!io.hasIOFlag(IoGlobals.PLAYERFLAGS_NO_MANA_DRAIN)) {
				if (this.getBaseMana() >= val) {
					adjustMana(-val);
					manaDrained = val;
				} else {
					manaDrained = this.getBaseMana();
					adjustMana(-manaDrained);
				}
			}
			return manaDrained;
		}
		/**
		 * Heals the player's mana.
		 * @param dmg the amount of healing
		 */
		this.ARX_DAMAGES_HealManaPlayer = function(val) {
			if (this.getBaseLife() > 0) { // player still alive
				if (val > 0) {
					adjustMana(val);
				}
			}
		}
		/**
		 * Heals the player.
		 * @param dmg the amount of healing
		 */
		this.ARX_DAMAGES_HealPlayer = function(val) {
			if (this.getBaseLife() > 0) {
				if (val > 0) {
					// if (!BLOCK_PLAYER_CONTROLS)
					adjustLife(val);
				}
			}
		}
		/**
		 * Gets the type of weapon the player is wielding.
		 * @return {@link long}
		 * @throws PooledException if an error occurs
		 * @if an error occurs
		 */
		this.ARX_EQUIPMENT_GetPlayerWeaponType = function() {
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
		this.ARX_EQUIPMENT_IsPlayerEquip = function(itemIO) {
			var isEquipped = false;
			var i = ProjectConstants.getInstance().getMaxEquipped() - 1;
			for (; i >= 0; i--) {
				if (this.getEquippedItem(i) >= 0
				        && Interactive.getInstance().hasIO(getEquippedItem(i))) {
					var toequip = Interactive.getInstance().getIO(this.getEquippedItem(i));
					if (toequip.equals(itemIO)) {
						isEquipped = true;
						break;
					}
				}
			}
			return isEquipped;
		}
		/** Re-creates the player's appearance. */
		this.ARX_EQUIPMENT_RecreatePlayerMesh = function() {
			
		}
		/**
		 * Unequips the player's weapon.
		 * @throws PooledException if an error occurs
		 * @if an error occurs
		 */
		this.ARX_EQUIPMENT_UnEquipPlayerWeapon = function()
		        {
			var wpnId = getEquippedItem(EquipmentGlobals.EQUIP_SLOT_WEAPON);
			if (wpnId >= 0
			        && Interactive.getInstance().hasIO(wpnId)) {
				var weapon = Interactive.getInstance().getIO(wpnId);
				weapon.getItemData().ARX_EQUIPMENT_UnEquip(io, false);
			}
			this.setEquippedItem(EquipmentGlobals.EQUIP_SLOT_WEAPON, -1);
		}
		/**
		 * Called when a player dies.
		 * @throws RPGException
		 */
		this.becomesDead = function() {
			var i = ProjectConstants.getInstance().getMaxSpells() - 1;
			for (; i >= 0; i--) {
				var spell = SpellController.getInstance().getSpell(i);
				if (spell.exists()
				        && spell.getCaster() === io.getRefId()) {
					spell.setTimeToLive(0);
					spell.setTurnsToLive(0);
				}
			}
		}
		/**
		 * Determines if a PC can identify a piece of equipment.
		 * @param equipitem
		 * @return
		 */
		this.canIdentifyEquipment = function(equipitem) {
			return false;
		}
		/** Clears all interface flags that were set. */
		this.clearInterfaceFlags = function() {
			interfaceFlags = 0;
		}
		/**
		 * Gets the player's base life value from the correct attribute.
		 * @return {@link float}
		 */
		this.getBaseLife = function() {
			return 0;
		}
		/**
		 * Gets the player's base mana value from the correct attribute.
		 * @return {@link float}
		 */
		this.getBaseMana = function() {
			return 0;
		}
		/**
		 * Gets the {@link IoPcData}'s gender.
		 * @return int
		 */
		this.getGender = function() {
			return gender;
		}
		/**
		 * Gets the character's gold.
		 * @return <code>float</code>
		 */
		this.getGold = function() {
			return gold;
		}
		/**
		 * Gets the IO associated with this {@link IoPcData}.
		 * @return {@link IO}
		 */
		this.getIo = function() {
			return io;
		}
		/**
		 * Gets a specific key from the keyring.
		 * @param index the key's index
		 * @return {@link String}
		 */
		this.getKey = function(index) {
			return keyring[index];
		}
		/**
		 * Gets the {@link IoPcData}'s level.
		 * @return int
		 */
		this.getLevel = function() {
			return level;
		}
		this.getLifeAttribute = function() {
			return null;
		}
		/**
		 * Gets the {@link IoPcData}'s name.
		 * @return char[]
		 */
		this.getName = function() {
			return name;
		}
		/**
		 * Gets the value for the bags.
		 * @return {@link int}
		 */
		this.getNumberOfBags = function() {
			return bags;
		}
		/**
		 * Gets the number of keys on the key ring.
		 * @return {@link int}
		 */
		this.getNumKeys = function() {
			return numKeys;
		}
		/**
		 * Gets the {@link IoPcData}'s Profession.
		 * @return int
		 */
		this.getProfession = function() {
			return profession;
		}
		/**
		 * Gets the {@link IoPcData}'s Race.
		 * @return int
		 */
		this.getRace = function() {
			return race;
		}
		/**
		 * Gets the {@link IoPcData}'s experience points.
		 * @return int
		 */
		this.getXp = function() {
			return xp;
		}
		/**
		 * Determines if the {@link IoPcData} has a specific flag.
		 * @param flag the flag
		 * @return true if the {@link IoPcData} has the flag; false otherwise
		 */
		this.hasInterfaceFlag = function(val) {
			return (interfaceFlags & flag) === flag;
		}
		/**
		 * Determines if the PC has a key in their keyring.
		 * @param key the key's name
		 * @return <tt>true</tt> if the PC has the key <tt>false></tt> otherwise
		 */
		this.hasKey = function(val) {
			if (typeof val !== "string") {
				throw new Error("Argument must be a string");
			}
			if (keyring === null) {
				keyring = [];
			}
			var index = keyring.indexOf(val);
			return index >= 0;
		}
		/**
		 * Removes an interface flag.
		 * @param flag the flag
		 */
		this.removeInterfaceFlag = function(val) {
			interfaceFlags &= ~flag;
		}
		/**
		 * Removes a key.
		 * @param key the key's id
		 */
		this.removeKey = function(val) {
			if (typeof val !== "string") {
				throw new Error("Argument must be a string");
			}
			if (keyring === null) {
				keyring = [];
			}
			var index = keyRing.indexOf(val);
			if (index >= 0) {
				keyring.splice(index, 1);
				numKeys--;
			}
		}
		/**
		 * Sets the {@link IoPcData}'s gender.
		 * @param val the gender to set
		 */
		this.setGender = function(val) {
			gender = val;
			this.notifyWatchers();
		}
		/**
		 * Sets the IO associated with the pc data.
		 * @param newIO the IO to set
		 */
		this.setIo = function(val) {
			io = val;
			if (val !== null
			        && val.getPCData() === null) {
				val.setPCData(this);
			}
		}
		/**
		 * Sets the {@link IoPcData}'s level.
		 * @param val the level to set
		 */
		this.setLevel = function(val) {
			level = val;
			this.notifyWatchers();
		}
		/**
		 * Sets the {@link IoPcData}'s name.
		 * @param val the name to set
		 */
		this.setName = function(val) {
			name = val;
			this.notifyWatchers();
		}
		/**
		 * Sets the {@link IoPcData}'s Profession.
		 * @param val the profession to set
		 */
		this.setProfession = function(val) {
			profession = val;
			this.notifyWatchers();
		}
		/**
		 * Sets the {@link IoPcData}'s Race.
		 * @param val the race to set
		 */
		this.setRace = function(val) {
			race = val;
			this.notifyWatchers();
		}
	}
	IoPcData.prototype = Object.create(IOCharacter.prototype);
	return IoPcData;
});
