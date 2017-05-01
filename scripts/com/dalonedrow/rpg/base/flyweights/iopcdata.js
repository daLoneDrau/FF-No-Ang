/**
 *
 */
define(['require', "com/dalonedrow/engine/systems/base/interactive",
	'com/dalonedrow/rpg/base/constants/equipmentglobals',
	'com/dalonedrow/rpg/base/constants/gender',
	'com/dalonedrow/rpg/base/constants/ioglobals',
	'com/dalonedrow/rpg/base/constants/scriptglobals',
	'com/dalonedrow/rpg/base/flyweights/baseinteractiveobject',
	'com/dalonedrow/rpg/base/flyweights/iocharacter',
	'com/dalonedrow/rpg/base/systems/script'],
		function(require, Interactive, EquipmentGlobals, Gender, IoGlobals, ScriptGlobals,
				BaseInteractiveObject, IOCharacter, Script) {
	function IoPcData() {
		IOCharacter.call(this);
		/** the number of bags the player has. */
		var bags = 0;
		/** the {@link IoPcData}'s gender. */
	    var gender = null;
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
		this.addInterfaceFlag = function(flag) {
	        if (flag !== undefined
	        		&& flag !== null
	        		&& !isNaN(flag)
	        		&& flag && (flag & (flag - 1)) === 0) {
				interfaceFlags |= flag;
	        } else {
	            var s = [];
	            s.push("ERROR! IoPcData.addInterfaceFlag() - ");
	            s.push("flag must be power of 2");
	            throw new Error(s.join(""));
	        }
		}
		/**
		 * Adds a key to the keyring.
		 * @param key the key
		 */
		this.addKey = function(val) {
	        if (val !== undefined
	        		&& val !== null) {
	        	if (typeof val === "string") {
					if (keyring === null) {
						keyring = [];
					}
					var index = 0;
					for (len = keyring.length; index < len; index++) {
						if (keyring[index] === val) {
							break;
						}
					}
					if (index >= keyring.length) {
						keyring.push(key);
						numKeys++;
					}
	        	} else {
		            var s = [];
		            s.push("ERROR! IoPcData.addKey() - ");
		            s.push("argument must be string");
		            throw new Error(s.join(""));
	        	}
	        } else {
	            var s = [];
	            s.push("ERROR! IoPcData.addKey() - ");
	            s.push("requires 1 argument");
	            throw new Error(s.join(""));
	        }
		}
		/**
		 * Adjusts the {@link IoPcData}'s gold.
		 * @param val the amount adjusted by
		 */
		this.adjustGold = function(val) {
		    if (val !== undefined
		    		&& val !== null
		    		&& !isNaN(val)) {
				gold += val;
				if (gold < 0) {
					gold = 0;
				}
				this.notifyWatchers();
		    } else {
	            var s = [];
	            s.push("ERROR! IoPcData.adjustGold() - ");
	            s.push("argument must be floating-point");
	            throw new Error(s.join(""));
		    }
		}
		/**
		 * Adjusts the player's life by a specific amount.
		 * @param dmg the amount
		 */
		var adjustLife = function(val) {
		    if (val !== undefined
		    		&& val !== null
		    		&& !isNaN(val)) {
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
		    } else {
	            var s = [];
	            s.push("ERROR! IoPcData.adjustLife() - ");
	            s.push("argument must be floating-point");
	            throw new Error(s.join(""));
		    }
		}
		/**
		 * Adjusts the player's mana by a specific amount.
		 * @param dmg the amount
		 */
		this.adjustMana = function(val) {
		    if (val !== undefined
		    		&& val !== null
		    		&& !isNaN(val)) {
		    } else {
	            var s = [];
	            s.push("ERROR! IoPcData.adjustMana() - ");
	            s.push("argument must be floating-point");
	            throw new Error(s.join(""));
		    }
		}
		/**
		 * Adjusts the {@link IoPcData}'s experience points.
		 * @param val the amount adjusted by
		 */
		this.adjustXp = function(val) {
		    if (val !== undefined
		    		&& val !== null
		    		&& !isNaN(val)
		            && parseInt(Number(val)) === val
		            && !isNaN(parseInt(val, 10))) {
				xp += val;
				if (xp < 0) {
					xp = 0;
				}
				this.notifyWatchers();
		    } else {
	            var s = [];
	            s.push("ERROR! IoPcData.adjustXp() - ");
	            s.push("argument must be integer");
	            throw new Error(s.join(""));
		    }
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
			if (dmg === undefined
					|| dmg == null
					|| type === undefined
					|| type == null
					|| source === undefined
					|| source == null) {
	            var s = [];
	            s.push("ERROR! IoPcData.ARX_DAMAGES_DamagePlayer() - ");
	            s.push("requires 3 parameters");
	            throw new Error(s.join(""));
			}
		    if (isNaN(dmg)) {
	            var s = [];
	            s.push("ERROR! IoPcData.ARX_DAMAGES_DamagePlayer() - ");
	            s.push("dmg must be floating-point");
	            throw new Error(s.join(""));
		    }
		    if (isNaN(type)
		            || parseInt(Number(type)) !== type
		            || isNaN(parseInt(type, 10))) {
	            var s = [];
	            s.push("ERROR! IoPcData.ARX_DAMAGES_DamagePlayer() - ");
	            s.push("type must be integer");
	            throw new Error(s.join(""));
		    }
		    if (isNaN(source)
		            || parseInt(Number(source)) !== source
		            || isNaN(parseInt(source, 10))) {
	            var s = [];
	            s.push("ERROR! IoPcData.ARX_DAMAGES_DamagePlayer() - ");
	            s.push("source must be integer");
	            throw new Error(s.join(""));
		    }
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
			if (val === undefined
					|| val == null) {
	            var s = [];
	            s.push("ERROR! IoPcData.ARX_DAMAGES_DrainMana() - ");
	            s.push("requires 3 parameters");
	            throw new Error(s.join(""));
			}
		    if (isNaN(val)) {
	            var s = [];
	            s.push("ERROR! IoPcData.ARX_DAMAGES_DrainMana() - ");
	            s.push("dmg must be floating-point");
	            throw new Error(s.join(""));
		    }
			var manaDrained = 0;
			if (!io.hasIOFlag(IoGlobals.PLAYERFLAGS_NO_MANA_DRAIN)) {
				if (this.getBaseMana() >= val) {
					this.adjustMana(-val);
					manaDrained = val;
				} else {
					this.manaDrained = this.getBaseMana();
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
			if (val === undefined
					|| val == null) {
	            var s = [];
	            s.push("ERROR! IoPcData.ARX_DAMAGES_HealManaPlayer() - ");
	            s.push("requires 3 parameters");
	            throw new Error(s.join(""));
			}
		    if (isNaN(val)) {
	            var s = [];
	            s.push("ERROR! IoPcData.ARX_DAMAGES_HealManaPlayer() - ");
	            s.push("dmg must be floating-point");
	            throw new Error(s.join(""));
		    }
			if (this.getBaseLife() > 0) { // player still alive
				if (val > 0) {
					this.adjustMana(val);
				}
			}
		}
		/**
		 * Heals the player.
		 * @param dmg the amount of healing
		 */
		this.ARX_DAMAGES_HealPlayer = function(val) {
			if (val === undefined
					|| val == null) {
	            var s = [];
	            s.push("ERROR! IoPcData.ARX_DAMAGES_HealPlayer() - ");
	            s.push("requires 3 parameters");
	            throw new Error(s.join(""));
			}
		    if (isNaN(val)) {
	            var s = [];
	            s.push("ERROR! IoPcData.ARX_DAMAGES_HealPlayer() - ");
	            s.push("dmg must be floating-point");
	            throw new Error(s.join(""));
		    }
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
		 */
		this.ARX_EQUIPMENT_IsPlayerEquip = function(itemIO) {
	    	var BaseInteractiveObject =
	    		require("com/dalonedrow/rpg/base/flyweights/baseinteractiveobject");
		    if (itemIO !== undefined
		    		&& itemIO !== null
		    		&& itemIO instanceof BaseInteractiveObject) {
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
		    } else {
	            var s = [];
	            s.push("ERROR! IoPcData.ARX_EQUIPMENT_IsPlayerEquip() - ");
	            s.push("argument must be BaseInteractiveObject");
	            throw new Error(s.join(""));
		    }
		}
		/** Re-creates the player's appearance. */
		this.ARX_EQUIPMENT_RecreatePlayerMesh = function() {
			
		}
		/**
		 * Unequips the player's weapon.
		 * @throws PooledException if an error occurs
		 * @if an error occurs
		 */
		this.ARX_EQUIPMENT_UnEquipPlayerWeapon = function() {
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
	    	var BaseInteractiveObject =
	    		require("com/dalonedrow/rpg/base/flyweights/baseinteractiveobject");
		    if (equipitem !== undefined
		    		&& equipitem !== null
		    		&& equipitem instanceof BaseInteractiveObject) {
				return false;
		    } else {
	            var s = [];
	            s.push("ERROR! IoPcData.canIdentifyEquipment() - ");
	            s.push("argument must be BaseInteractiveObject");
	            throw new Error(s.join(""));
		    }
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
		this.getKey = function(val) {
		    if (val !== undefined
		    		&& val !== null
		    		&& !isNaN(val)
		            && parseInt(Number(val)) === val
		            && !isNaN(parseInt(val, 10))) {
				return keyring[val];
		    } else {
	            var s = [];
	            s.push("ERROR! IoPcData.getKey() - ");
	            s.push("argument must be integer");
	            throw new Error(s.join(""));
		    }
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
		this.hasInterfaceFlag = function(flag) {
	        if (flag !== undefined
	        		&& flag !== null
	        		&& !isNaN(flag)
	        		&& flag && (flag & (flag - 1)) === 0) {
				return (interfaceFlags & flag) === flag;
	        } else {
	            var s = [];
	            s.push("ERROR! IoPcData.hasInterfaceFlag() - ");
	            s.push("flag must be power of 2");
	            throw new Error(s.join(""));
	        }
		}
		/**
		 * Determines if the PC has a key in their keyring.
		 * @param key the key's name
		 * @return <tt>true</tt> if the PC has the key <tt>false></tt> otherwise
		 */
		this.hasKey = function(val) {
	        if (val !== undefined
	        		&& val !== null) {
	        	if (typeof val === "string") {
	    			if (keyring === null) {
	    				keyring = [];
	    			}
	    			var index = keyring.indexOf(val);
	    			return index >= 0;	        	
	        	} else {
		            var s = [];
		            s.push("ERROR! IoPcData.hasKey() - ");
		            s.push("argument must be string");
		            throw new Error(s.join(""));
	        	}
	        } else {
	            var s = [];
	            s.push("ERROR! IoPcData.hasKey() - ");
	            s.push("requires 1 argument");
	            throw new Error(s.join(""));
	        }
		}
		/**
		 * Removes an interface flag.
		 * @param flag the flag
		 */
		this.removeInterfaceFlag = function(flag) {
	        if (flag !== undefined
	        		&& flag !== null
	        		&& !isNaN(flag)
	        		&& flag && (flag & (flag - 1)) === 0) {
				interfaceFlags &= ~flag;
	        } else {
	            var s = [];
	            s.push("ERROR! IoPcData.removeInterfaceFlag() - ");
	            s.push("flag must be power of 2");
	            throw new Error(s.join(""));
	        }
		}
		/**
		 * Removes a key.
		 * @param key the key's id
		 */
		this.removeKey = function(val) {
	        if (val !== undefined
	        		&& val !== null) {
	        	if (typeof val === "string") {
	    			if (keyring === null) {
	    				keyring = [];
	    			}
	    			var index = keyRing.indexOf(val);
	    			if (index >= 0) {
	    				keyring.splice(index, 1);
	    				numKeys--;
	    			}        	
	        	} else {
		            var s = [];
		            s.push("ERROR! IoPcData.removeKey() - ");
		            s.push("argument must be string");
		            throw new Error(s.join(""));
	        	}
	        } else {
	            var s = [];
	            s.push("ERROR! IoPcData.removeKey() - ");
	            s.push("requires 1 argument");
	            throw new Error(s.join(""));
	        }
		}
		/**
		 * Sets the {@link IoPcData}'s gender.
		 * @param val the gender to set
		 */
		this.setGender = function(val) {
		    if (val !== undefined
		    		&& val !== null
		    		&& val instanceof Gender) {
				gender = val;
				this.notifyWatchers();
		    } else {
	            var s = [];
	            s.push("ERROR! IoPcData.setGender() - ");
	            s.push("argument must be BaseInteractiveObject");
	            throw new Error(s.join(""));
		    }
		}
		/**
		 * Sets the IO associated with the pc data.
		 * @param newIO the IO to set
		 */
		this.setIo = function(val) {
	    	var BaseInteractiveObject =
	    		require("com/dalonedrow/rpg/base/flyweights/baseinteractiveobject");
		    if (val !== undefined
		    		&& val !== null
		    		&& val instanceof BaseInteractiveObject) {
		        io = val;
				if (val !== null
				        && val.getPCData() === null) {
					val.setPCData(this);
				}
		    } else {
	            var s = [];
	            s.push("ERROR! IoPcData.setIo() - ");
	            s.push("argument must be BaseInteractiveObject");
	            throw new Error(s.join(""));
		    }
		}
		/**
		 * Sets the {@link IoPcData}'s level.
		 * @param val the level to set
		 */
		this.setLevel = function(val) {
		    if (val !== undefined
		    		&& val !== null
		    		&& !isNaN(val)
		            && parseInt(Number(val)) === val
		            && !isNaN(parseInt(val, 10))) {
				level = val;
				this.notifyWatchers();
		    } else {
	            var s = [];
	            s.push("ERROR! IoPcData.setLevel() - ");
	            s.push("argument must be integer");
	            throw new Error(s.join(""));
		    }
		}
		/**
		 * Sets the {@link IoPcData}'s name.
		 * @param val the name to set
		 */
		this.setName = function(val) {
	        if (val !== undefined
	        		&& val !== null) {
	        	if (typeof val === "string") {
	        		name = val;
	    			this.notifyWatchers();
	        	} else {
		            var s = [];
		            s.push("ERROR! IoPcData.setName() - ");
		            s.push("argument must be string");
		            throw new Error(s.join(""));
	        	}
	        } else {
	            var s = [];
	            s.push("ERROR! IoPcData.setName() - ");
	            s.push("requires 1 argument");
	            throw new Error(s.join(""));
	        }
		}
		/**
		 * Sets the {@link IoPcData}'s Profession.
		 * @param val the profession to set
		 */
		this.setProfession = function(val) {
		    if (val !== undefined
		    		&& val !== null
		    		&& !isNaN(val)
		            && parseInt(Number(val)) === val
		            && !isNaN(parseInt(val, 10))) {
				profession = val;
				this.notifyWatchers();
		    } else {
	            var s = [];
	            s.push("ERROR! IoPcData.setProfession() - ");
	            s.push("argument must be integer");
	            throw new Error(s.join(""));
		    }
		}
		/**
		 * Sets the {@link IoPcData}'s Race.
		 * @param val the race to set
		 */
		this.setRace = function(val) {
		    if (val !== undefined
		    		&& val !== null
		    		&& !isNaN(val)
		            && parseInt(Number(val)) === val
		            && !isNaN(parseInt(val, 10))) {
				race = val;
				this.notifyWatchers();
		    } else {
	            var s = [];
	            s.push("ERROR! IoPcData.setRace() - ");
	            s.push("argument must be integer");
	            throw new Error(s.join(""));
		    }
		}
	}
	IoPcData.prototype = Object.create(IOCharacter.prototype);
	return IoPcData;
});
