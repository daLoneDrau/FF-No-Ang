/**
 * 
 */
define(["require", "com/dalonedrow/engine/systems/base/interactive",
	"com/dalonedrow/rpg/base/constants/ioglobals",
	"com/dalonedrow/rpg/base/constants/scriptglobals",
	"com/dalonedrow/rpg/base/flyweights/baseinteractiveobject",
	"com/dalonedrow/rpg/base/flyweights/inventoryslot",
	"com/dalonedrow/rpg/base/systems/script", "com/dalonedrow/utils/hashcode"],
		function(require, Interactive, IoGlobals, ScriptGlobals, BaseInteractiveObject,
				InventorySlot, Script, Hashcode) {
	function InventoryData() {
		Hashcode.call(this);
		/** the IO associated with this {@link InventoryData}. */
		this.io = null;
		/** flag indicating the left ring needs to be replaced. */
		this.leftRing	= false;
		/** the inventory slots. */
		this.slots = null;
		/**
		 * UNTESTED DO NOT USE Replaces an item in an IO's inventory.
		 * @param itemIO the item being added
		 * @param old the item being replaced
		 * @if an error occurs
		 *//*
		this.CheckForInventoryReplaceMe(final IO itemIO, final IO old)
				{
			if (itemIO !== null
					&& old !== null) {
				boolean handled = false;
				if (io.hasIOFlag(IoGlobals.IO_01_PC)) {
					if (IsInPlayerInventory(old)) {
						if (CanBePutInInventory(itemIO)) {
							handled = true;
						} else {
							PutInFrontOfPlayer(itemIO, true);
							handled = true;
						}
					}
				}
				if (!handled) {
					var i = Interactive.getInstance().getMaxIORefId();
					for (; i >= 0; i--) {
						IO io = (IO) Interactive.getInstance().getIO(i);
						if (io !== null
								&& io.getInventory() !== null) {
							InventoryData id = io.getInventory();
							if (id.IsInPlayerInventory(old)) {
								if (CanBePutInInventory(itemIO)) {
									handled = true;
									break;
								} else {
									this.PutInFrontOfPlayer(itemIO, true);
									handled = true;
									break;
								}
							}
							id = null;
						}
					}
				}
			}
		}
		/**
		 * Puts an item in front of the player.
		 * @param itemIO the item
		 * @param doNotApplyPhysics if <tt>true</tt>, do not apply physics
		 *//*
		public abstract void PutInFrontOfPlayer(IO itemIO,
				boolean doNotApplyPhysics);
		*/
	}
	InventoryData.prototype = Object.create(Hashcode.prototype);
	/**
	 * Sends messages between an item and its owner that it is now in inventory.
	 * @param invOwnerIO the owner
	 * @param itemIO the item
	 * @if an error occurs
	 */
	InventoryData.prototype.ARX_INVENTORY_Declare_InventoryIn = function(invOwnerIO, itemIO) {
    	var BaseInteractiveObject =
    		require("com/dalonedrow/rpg/base/flyweights/baseinteractiveobject");
	    if (invOwnerIO === undefined
	    		|| invOwnerIO === null
	    		|| !(invOwnerIO instanceof BaseInteractiveObject)) {
            var s = [];
            s.push("ERROR! InventoryData.ARX_INVENTORY_Declare_InventoryIn() - ");
            s.push("invOwnerIO must be BaseInteractiveObject");
            throw new Error(s.join(""));
	    }
	    if (itemIO === undefined
	    		|| itemIO === null
	    		|| !(itemIO instanceof BaseInteractiveObject)) {
            var s = [];
            s.push("ERROR! InventoryData.ARX_INVENTORY_Declare_InventoryIn() - ");
            s.push("itemIO must be BaseInteractiveObject");
            throw new Error(s.join(""));
	    }
		if (itemIO !== null) {
			// TODO - handle ignition
			// if (io->ignition > 0) {
			// if (ValidDynLight(io->ignit_light))
			// DynLight[io->ignit_light].exist = 0;

			// io->ignit_light = -1;

			// if (io->ignit_sound !== ARX_SOUND_INVALID_RESOURCE) {
			// ARX_SOUND_Stop(io->ignit_sound);
			// io->ignit_sound = ARX_SOUND_INVALID_RESOURCE;
			// }

			// io->ignition = 0;
			// }

			// send event from item to inventory owner
			Script.getInstance().setEventSender(itemIO);
			Script.getInstance().sendIOScriptEvent(
					invOwnerIO, ScriptGlobals.SM_002_INVENTORYIN, [], null);
			// send event from inventory owner to item
			Script.getInstance().setEventSender(invOwnerIO);
			Script.getInstance().sendIOScriptEvent(
					itemIO, ScriptGlobals.SM_002_INVENTORYIN, [], null);
			// clear global event sender
			Script.getInstance().setEventSender(null);
		}
	}
	/**
	 * Action when a player attempts to identify an item.
	 * @param playerIO the player's {@link IO}
	 * @param itemIO the itme's {@link IO}
	 * @if an error occurs
	 */
	InventoryData.prototype.ARX_INVENTORY_IdentifyIO = function(playerIO, itemIO) {
    	var BaseInteractiveObject =
    		require("com/dalonedrow/rpg/base/flyweights/baseinteractiveobject");
	    if (playerIO === undefined
	    		|| playerIO === null
	    		|| !(playerIO instanceof BaseInteractiveObject)) {
            var s = [];
            s.push("ERROR! InventoryData.ARX_INVENTORY_IdentifyIO() - ");
            s.push("playerIO must be BaseInteractiveObject");
            throw new Error(s.join(""));
	    }
	    if (itemIO === undefined
	    		|| itemIO === null
	    		|| !(itemIO instanceof BaseInteractiveObject)) {
            var s = [];
            s.push("ERROR! InventoryData.ARX_INVENTORY_IdentifyIO() - ");
            s.push("itemIO must be BaseInteractiveObject");
            throw new Error(s.join(""));
	    }
		if (playerIO.hasIOFlag(IoGlobals.IO_01_PC)
				&& playerIO.getPCData() !== null
				&& itemIO.hasIOFlag(IoGlobals.IO_02_ITEM)
				&& itemIO.getItemData() !== null
				&& itemIO.getItemData().getEquipitem() !== null) {
			if (playerIO.getPCData().canIdentifyEquipment(itemIO.getItemData().getEquipitem())) {
				Script.getInstance().sendIOScriptEvent(itemIO, ScriptGlobals.SM_69_IDENTIFY, null, "");
			}
		}
	}
	/**
	 * Determines if an item can be put in inventory.
	 * @param itemIO the item
	 * @return <tt>true</tt> if the item can be put in inventory; <tt>false</tt>
	 *         otherwise
	 * @if an error occurs
	 */
	InventoryData.prototype.CanBePutInInventory = function(itemIO) {
		if (this.slots === null) {
            var s = [];
            s.push("ERROR! InventoryData.CanBePutInInventory() - ");
            s.push("slots have not been set");
            throw new Error(s.join(""));
		}
    	var BaseInteractiveObject =
    		require("com/dalonedrow/rpg/base/flyweights/baseinteractiveobject");
	    if (itemIO === undefined
	    		|| itemIO === null
	    		|| !(itemIO instanceof BaseInteractiveObject)) {
            var s = [];
            s.push("ERROR! InventoryData.CanBePutInInventory() - ");
            s.push("itemIO must be BaseInteractiveObject");
            throw new Error(s.join(""));
	    }
		var can = false;
		if (itemIO !== null
				&& !itemIO.hasIOFlag(IoGlobals.IO_15_MOVABLE)) {
			if (itemIO.hasIOFlag(IoGlobals.IO_10_GOLD)
					&& io.hasIOFlag(IoGlobals.IO_01_PC)) {
				io.getPCData().adjustGold(itemIO.getItemData().getPrice());
				if (itemIO.isScriptLoaded()) {
					Interactive.getInstance().RemoveFromAllInventories(itemIO);
					Interactive.getInstance().releaseIO(itemIO);
				} else {
					itemIO.setShow(IoGlobals.SHOW_FLAG_KILLED);
					itemIO.removeGameFlag(IoGlobals.GFLAG_ISINTREATZONE);
				}
				can = true;
			}
			if (!can) {
				// first try to stack
				for (var i = this.slots.length - 1; i >= 0; i--) {
					var slotIO = this.slots[i].getIo();
					if (slotIO !== null
							&& slotIO.getItemData().getStackSize() > 1
							&& Interactive.getInstance().isSameObject(itemIO, slotIO)) {
						// found a matching item - try to stack
						var slotCount = slotIO.getItemData().getCount();
						var itemCount = itemIO.getItemData().getCount();
						var slotMaxStack = slotIO.getItemData().getStackSize();
						if (slotCount < slotMaxStack) {
							// there's room to stack more - stack it
							slotIO.getItemData().adjustCount(itemCount);
							// check to see if too many are stacked
							slotCount = slotIO.getItemData().getCount();
							if (slotCount > slotMaxStack) {
								// remove excess from stack
								// and put it back into item io
								itemIO.getItemData().setCount(
										slotCount - slotMaxStack);
								slotIO.getItemData().setCount(slotMaxStack);
							} else {
								// no excess. remove count from item io
								itemIO.getItemData().setCount(0);
							}
							// was item count set to 0? release the IO
							if (itemIO.getItemData().getCount() === 0) {
								if (itemIO.isScriptLoaded()) {
									var inner = Interactive.getInstance().getMaxIORefId();
									for (; inner >= 0; inner--) {
										if (Interactive.getInstance().hasIO(inner)) {
											var innerIO = Interactive.getInstance().getIO(inner);
											if (innerIO.equals(itemIO)) {
												Interactive.getInstance().releaseIO(innerIO);
												innerIO = null;
											}
										}
									}
								} else {
									itemIO.setShow(IoGlobals.SHOW_FLAG_KILLED);
								}
							}
							// declare item in inventory
							this.ARX_INVENTORY_Declare_InventoryIn(io, slotIO);
							can = true;
							break;
						}
					}
				}
			}
			// cant stack the item? find an empty slot
			if (!can) {
				// find an empty slot for the item
				for (var i = this.slots.length - 1; i >= 0; i--) {
					// got an empty slot - add it
					if (this.slots[i].getIo() === null) {
						this.slots[i].setIo(itemIO);
						this.slots[i].setIsShow(true);
						this.ARX_INVENTORY_Declare_InventoryIn(this.io, itemIO);
						can = true;
						break;
					}
				}
			}
		}
		return can;
	}
	/** Removes all items from inventory. */
	InventoryData.prototype.CleanInventory = function() {
		if (this.slots === null) {
            var s = [];
            s.push("ERROR! InventoryData.CleanInventory() - ");
            s.push("slots have not been set");
            throw new Error(s.join(""));
		}
		for (var i = this.slots.length - 1; i >= 0; i--) {
			this.slots[i].setIo(null);
			this.slots[i].setIsShow(true);
		}
	}
	/**
	 * Forces all items in inventory to be set at a specific level.
	 * @param level the level
	 */
	InventoryData.prototype.ForcePlayerInventoryObjectLevel = function(level) {
		if (this.slots === null) {
            var s = [];
            s.push("ERROR! InventoryData.ForcePlayerInventoryObjectLevel() - ");
            s.push("slots have not been set");
            throw new Error(s.join(""));
		}
	    if (level === undefined
	    		|| level === null
	    		|| isNaN(level)
	            || parseInt(Number(level)) !== level
	            || isNaN(parseInt(level, 10))) {
            var s = [];
            s.push("ERROR! InventoryData.ForcePlayerInventoryObjectLevel() - ");
            s.push("level must be integer");
            throw new Error(s.join(""));
	    }
		for (var i = this.slots.length - 1; i >= 0; i--) {
			if (this.slots[i].getIo() !== null) {
				this.slots[i].getIo().setLevel(level);
			}
		}
	}
	/**
	 * Gets the IO associated with this {@link InventoryData}.
	 * @return {@link IO}
	 */
	InventoryData.prototype.getIo = function() {
		return this.io;
	}
	/**
	 * Gets the number of inventory slots.
	 * @return <code>int</code>
	 */
	InventoryData.prototype.getNumInventorySlots = function() {
		if (this.slots === null) {
            var s = [];
            s.push("ERROR! InventoryData.getNumInventorySlots() - ");
            s.push("slots have not been set");
            throw new Error(s.join(""));
		}
		return this.slots.length;
	}
	/**
	 * Gets the inventory slot at the specific index.
	 * @param index the slot index
	 * @return {@link SLOT}
	 */
	InventoryData.prototype.getSlot = function(index) {
		if (this.slots === null) {
            var s = [];
            s.push("ERROR! InventoryData.getSlot() - ");
            s.push("slots have not been set");
            throw new Error(s.join(""));
		}
	    if (index === undefined
	    		|| index === null
	    		|| isNaN(index)
	            || parseInt(Number(index)) !== index
	            || isNaN(parseInt(index, 10))) {
            var s = [];
            s.push("ERROR! InventoryData.getSlot() - ");
            s.push("argument must be integer");
            throw new Error(s.join(""));
	    }
		return this.slots[index];
	}
	/**
	 * Determines if an item is in inventory.
	 * @param io the item
	 * @return <tt>true</tt> if the item is in inventory; <tt>false</tt>
	 *         otherwise
	 */
	InventoryData.prototype.IsInPlayerInventory = function(io) {
		if (this.slots === null) {
            var s = [];
            s.push("ERROR! InventoryData.IsInPlayerInventory() - ");
            s.push("slots have not been set");
            throw new Error(s.join(""));
		}
    	var BaseInteractiveObject =
    		require("com/dalonedrow/rpg/base/flyweights/baseinteractiveobject");
	    if (io === undefined
	    		|| io === null
	    		|| !(io instanceof BaseInteractiveObject)) {
            var s = [];
            s.push("ERROR! InventoryData.IsInPlayerInventory() - ");
            s.push("io must be BaseInteractiveObject");
            throw new Error(s.join(""));
	    }
		var is = false;
		for (var i = this.slots.length - 1; i >= 0; i--) {
			var ioo = this.slots[i].getIo();
			if (ioo !== null
					&& ioo.equals(io)) {
				is = true;
				break;
			}
		}
		return is;
	}
	/**
	 * Gets the flag indicating whether the left ring is the next one that needs
	 * to be switched.
	 * @return <tt>true</tt> if the left ring should be switched; <tt>false</tt>
	 * otherwise
	 */
	InventoryData.prototype.isLeftRing = function() {
		return this.leftRing;
	}
	/**
	 * Replaces an item in all inventories.
	 * @param oldItemIO the old item being replaced
	 * @param newItemIO the new item
	 * @if an error occurs
	 */
	InventoryData.prototype.ReplaceInAllInventories = function(oldItemIO, newItemIO) {
    	var BaseInteractiveObject =
    		require("com/dalonedrow/rpg/base/flyweights/baseinteractiveobject");
	    if (oldItemIO === undefined
	    		|| oldItemIO === null
	    		|| !(oldItemIO instanceof BaseInteractiveObject)) {
            var s = [];
            s.push("ERROR! InventoryData.ReplaceInAllInventories() - ");
            s.push("oldItemIO must be BaseInteractiveObject");
            throw new Error(s.join(""));
	    }
	    if (newItemIO === undefined
	    		|| newItemIO === null
	    		|| !(newItemIO instanceof BaseInteractiveObject)) {
            var s = [];
            s.push("ERROR! InventoryData.ReplaceInAllInventories() - ");
            s.push("newItemIO must be BaseInteractiveObject");
            throw new Error(s.join(""));
	    }
		if (!oldItemIO.hasIOFlag(IoGlobals.IO_15_MOVABLE)
				&& !newItemIO.hasIOFlag(IoGlobals.IO_15_MOVABLE)) {
			var oldIORefId = Interactive.getInstance().GetInterNum(oldItemIO);
			var newIORefId = Interactive.getInstance().GetInterNum(newItemIO);
			var i = Interactive.getInstance().getMaxIORefId();
			for (; i >= 0; i--) {
				if (i === oldIORefId
						|| i === newIORefId
						|| !Interactive.getInstance().hasIO(i)) {
					continue;
				}
				var invOwner = Interactive.getInstance().getIO(i);
				if (invOwner.getInventory() !== null) {
					var inv = invOwner.getInventory();
					for (var j = inv.getNumInventorySlots() - 1; j >= 0; j--) {
						if (inv.slots[j].getIo().equals(oldItemIO)) {
							inv.slots[j].setIo(newItemIO);
						}
					}
				}
			}
		}
	}
	/**
	 * Sends a scripted command to an item in inventory.
	 * @param itemName the item name
	 * @param message the message
	 * @if an error occurs
	 */
	InventoryData.prototype.SendInventoryObjectCommand = function(itemName, message) {
		if (this.slots === null) {
            var s = [];
            s.push("ERROR! InventoryData.SendInventoryObjectCommand() - ");
            s.push("slots have not been set");
            throw new Error(s.join(""));
		}
		if (itemName === undefined
				|| itemName === null
				|| typeof itemName !== "string") {
            var s = [];
            s.push("ERROR! InventoryData.SendInventoryObjectCommand() - ");
            s.push("itemName must be string");
            throw new Error(s.join(""));
		}
	    if (message === undefined
	    		|| message === null
	    		|| isNaN(message)
	            || parseInt(Number(message)) !== message
	            || isNaN(parseInt(message, 10))) {
            var s = [];
            s.push("ERROR! InventoryData.SendInventoryObjectCommand() - ");
            s.push("message must be integer");
            throw new Error(s.join(""));
	    }
		for (var i = this.slots.length - 1; i >= 0; i--) {
			var slotIO = this.slots[i].getIo();
			if (slotIO !== null
					&& slotIO.hasGameFlag(IoGlobals.GFLAG_INTERACTIVITY)
					&& slotIO.getItemData() !== null) {
				var ioName = slotIO.getItemData().getItemName();
				if (itemName.toLowerCase() === ioName.toLowerCase()) {
					Script.getInstance().sendIOScriptEvent(
							slotIO, message, null, "");
					slotIO = null;
					break;
				}
				ioName = null;
			}
			slotIO = null;
		}
	}
	/**
	 * Sets the IO associated with the inventory.
	 * @param newIO the IO to set
	 */
	InventoryData.prototype.setIo = function(val) {
    	var BaseInteractiveObject =
    		require("com/dalonedrow/rpg/base/flyweights/baseinteractiveobject");
	    if (val === undefined
	    		|| val === null
	    		|| !(val instanceof BaseInteractiveObject)) {
            var s = [];
            s.push("ERROR! InventoryData.setIo() - ");
            s.push("argument must be BaseInteractiveObject");
            throw new Error(s.join(""));
	    }
        this.io = val;
	}
	/**
	 * Sets the value of the flag indicating whether the left ring is the next
	 * one that needs to be switched.
	 * @param flag the new value to set
	 */
	InventoryData.prototype.setIsLeftRing = function(flag) {
	    if (flag !== undefined
	    		&& flag !== null
	            && typeof flag === "boolean") {
			this.leftRing = flag;
	    } else {
            var s = [];
            s.push("ERROR! InventoryData.setIsLeftRing() - ");
            s.push("argument must be boolean");
            throw new Error(s.join(""));
	    }
	}
	/**
	 * Sets the inventory slots.
	 * @param val the inventory slots
	 */
	InventoryData.prototype.setSlots = function(val) {
		if (val === undefined
				|| val === null
				|| !Array.isArray(val)) {
            var s = [];
            s.push("ERROR! InventoryData.setSlots() - ");
            s.push("argument must be InventorySlot[]");
            throw new Error(s.join(""));
		}
		if (val.length === 0) {
            var s = [];
            s.push("ERROR! InventoryData.setSlots() - ");
            s.push("argument must not be empty InventorySlot[]");
            throw new Error(s.join(""));
		}
		var pass = true;
		for (var i = val.length - 1; i >= 0; i--) {
			if (!(val[i] instanceof InventorySlot)) {
				pass = false;
				break;
			}
		}
		if (!pass) {
            var s = [];
            s.push("ERROR! InventoryData.setSlots() - ");
            s.push("argument must be InventorySlot[]");
            throw new Error(s.join(""));
		}
		this.slots = val;
	}
	return InventoryData;
});	
