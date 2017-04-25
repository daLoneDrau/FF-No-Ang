/**
 * 
 */
define(['require', 'com/dalonedrow/rpg/base/flyweights/baseinteractiveobject',
	"com/dalonedrow/utils/hashcode"], function(require, BaseInteractiveObject, Hashcode) {
    function InventoryData() {
		Hashcode.call(this);
	    /** the IO associated with this {@link InventoryData}. */
	    var io = null;
	    /** flag indicating the left ring needs to be replaced. */
	    var leftRing = false;
	    /** the inventory slots. */
	    var slots;
	    /**
	     * Sets the inventory slots.
	     * @param val the inventory slots
	     */
	    this.setSlots = function(val) {
	        slots = val;
	    }
	    /**
	     * Sends messages between an item and its owner that it is now in inventory.
	     * @param invOwnerIO the owner
	     * @param itemIO the item
	     * @throws Error if an error occurs
	     */
	    this.ARX_INVENTORY_Declare_InventoryIn = function(invOwnerIO, itemIO) {
	    	var BaseInteractiveObject =
	    		require("com/dalonedrow/rpg/base/flyweights/baseInteractiveobject");
		    if (invOwnerIO === undefined
		    		|| itemIO === undefined) {
	            var s = [];
	            s.push("ERROR! InventoryData.ARX_INVENTORY_Declare_InventoryIn() - ");
	            s.push("requires 2 parameters");
	            throw new Error(s.join(""));
		    }
		    if (invOwnerIO === null
		    		|| !(invOwnerIO instanceof BaseInteractiveObject)) {
	            var s = [];
	            s.push("ERROR! InventoryData.ARX_INVENTORY_Declare_InventoryIn() - ");
	            s.push("invOwnerIO must be BaseInteractiveObject");
	            throw new Error(s.join(""));
		    }
	        if (itemIO !== null) {
	        	if (!(itemIO instanceof BaseInteractiveObject)) {
		            var s = [];
		            s.push("ERROR! InventoryData.ARX_INVENTORY_Declare_InventoryIn() - ");
		            s.push("itemIO must be BaseInteractiveObject");
		            throw new Error(s.join(""));
			    }
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
	            Script.getInstance().sendIOScriptEvent(invOwnerIO,
	                    ScriptGlobals.SM_002_INVENTORYIN, new Object[0], null);
	            // send event from inventory owner to item
	            Script.getInstance().setEventSender(invOwnerIO);
	            Script.getInstance().sendIOScriptEvent(itemIO,
	                    ScriptGlobals.SM_002_INVENTORYIN, new Object[0], null);
	            // clear global event sender
	            Script.getInstance().setEventSender(null);
	        }
	    }
	    /**
	     * Action when a player attempts to identify an item.
	     * @param playerIO the player's {@link IO}
	     * @param itemIO the itme's {@link IO}
	     * @throws Error if an error occurs
	     */
	    this.ARX_INVENTORY_IdentifyIO = function(playerIO, itemIO) {
	    	var BaseInteractiveObject =
	    		require("com/dalonedrow/rpg/base/flyweights/baseInteractiveobject");
		    if (playerIO === undefined
		    		|| itemIO === undefined) {
	            var s = [];
	            s.push("ERROR! InventoryData.ARX_INVENTORY_IdentifyIO() - ");
	            s.push("requires 2 parameters");
	            throw new Error(s.join(""));
		    }
		    if (itemIO !== null
		    		&& !(itemIO instanceof BaseInteractiveObject)) {
	            var s = [];
	            s.push("ERROR! InventoryData.ARX_INVENTORY_IdentifyIO() - ");
	            s.push("itemIO must be BaseInteractiveObject");
	            throw new Error(s.join(""));
		    }
	        if (playerIO !== null) {
	        	if (!(playerIO instanceof BaseInteractiveObject)) {
		            var s = [];
		            s.push("ERROR! InventoryData.ARX_INVENTORY_IdentifyIO() - ");
		            s.push("playerIO must be BaseInteractiveObject");
		            throw new Error(s.join(""));
			    }
	        	if (playerIO.hasIOFlag(IoGlobals.IO_01_PC)
	        			&& playerIO.getPCData() !== null && itemIO !== null
		                && itemIO.hasIOFlag(IoGlobals.IO_02_ITEM)
		                && itemIO.getItemData() !== null
		                && itemIO.getItemData().getEquipitem() !== null) {
		            if (playerIO.getPCData().canIdentifyEquipment(
		                    itemIO.getItemData().getEquipitem())) {
		                Script.getInstance().sendIOScriptEvent(itemIO,
		                        ScriptGlobals.SM_69_IDENTIFY, null, "");
		            }
	        	}
	        }
	    }
	    /**
	     * Determines if an item can be put in inventory.
	     * @param itemIO the item
	     * @return <tt>true</tt> if the item can be put in inventory;
	     *         <tt>false</tt> otherwise
	     * @throws Error if an error occurs
	     */
	    this.CheckForInventoryReplaceMe = function(itemIO) {
	    	var BaseInteractiveObject =
	    		require("com/dalonedrow/rpg/base/flyweights/baseInteractiveobject");
		    if (itemIO === undefined) {
	            var s = [];
	            s.push("ERROR! InventoryData.CheckForInventoryReplaceMe() - ");
	            s.push("requires 1 parameter");
	            throw new Error(s.join(""));
		    }
		    if (itemIO !== null
		    		&& !(itemIO instanceof BaseInteractiveObject)) {
	            var s = [];
	            s.push("ERROR! InventoryData.CheckForInventoryReplaceMe() - ");
	            s.push("itemIO must be BaseInteractiveObject");
	            throw new Error(s.join(""));
		    }
	        var can = false;
	        if (itemIO !== null && !itemIO.hasIOFlag(IoGlobals.IO_15_MOVABLE)) {
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
	                for (var i = slots.length - 1; i >= 0; i--) {
	                    var slotIO = slots[i].getIo();
	                    if (slotIO !== null
	                            && slotIO.getItemData().getStackSize() > 1
	                            && Interactive.getInstance().isSameObject(itemIO,
	                                    slotIO)) {
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
	                                    var inner = Interactive.getInstance()
	                                            .getMaxIORefId();
	                                    for (; inner >= 0; inner--) {
	                                        if (Interactive.getInstance().hasIO(
	                                                inner)) {
	                                            var innerIO = Interactive
	                                                    .getInstance().getIO(inner);
	                                            if (innerIO.equals(itemIO)) {
	                                                Interactive.getInstance()
	                                                        .releaseIO(innerIO);
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
	                for (var i = slots.length - 1; i >= 0; i--) {
	                    // got an empty slot - add it
	                    if (slots[i].getIo() === null) {
	                        slots[i].setIo(itemIO);
	                        slots[i].setShow(true);
	                        this.ARX_INVENTORY_Declare_InventoryIn(io, itemIO);
	                        can = true;
	                        break;
	                    }
	                }
	            }
	        }
	        return can;
	    }
	    /**
	     * UNTESTED DO NOT USE Replaces an item in an IO's inventory.
	     * @param itemIO the item being added
	     * @param old the item being replaced
	     * @throws Error if an error occurs
	     */
	    this.CheckForInventoryReplaceMe = function(itemIO, old) {
	        if (itemIO !== null && old !== null) {
	            var handled = false;
	            if (io.hasIOFlag(IoGlobals.IO_01_PC)) {
	                if (this.IsInPlayerInventory(old)) {
	                    if (this.CanBePutInInventory(itemIO)) {
	                        handled = true;
	                    } else {
	                        this.PutInFrontOfPlayer(itemIO, true);
	                        handled = true;
	                    }
	                }
	            }
	            if (!handled) {
	                var i = Interactive.getInstance().getMaxIORefId();
	                for (; i >= 0; i--) {
	                    var io = Interactive.getInstance().getIO(i);
	                    if (io !== null && io.getInventory() !== null) {
	                        var invData = io.getInventory();
	                        if (invData.IsInPlayerInventory(old)) {
	                            if (this.CanBePutInInventory(itemIO)) {
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
	    /** Removes all items from inventory. */
	    this.CleanInventory = function() {
	        for (var i = slots.length - 1; i >= 0; i--) {
	            slots[i].setIo(null);
	            slots[i].setShow(true);
	        }
	    }
	    /**
	     * Forces all items to be set at a specific level.
	     * @param level the level
	     */
	    this.ForcePlayerInventoryObjectLevel = function(val) {
		    if (val !== undefined
		    		&& val !== null
		    		&& !isNaN(val)
		            && parseInt(Number(val)) === val
		            && !isNaN(parseInt(val, 10))) {
		        for (var i = slots.length - 1; i >= 0; i--) {
		            if (slots[i].getIo() !== null) {
		                slots[i].getIo().setLevel(val);
		            }
		        }
		    } else {
	            var s = [];
	            s.push("ERROR! InventoryData.ForcePlayerInventoryObjectLevel() - ");
	            s.push("argument must be integer");
	            throw new Error(s.join(""));
		    }
	    }
	    /**
	     * Gets the IO associated with this {@link InventoryData}.
	     * @return {@link IO}
	     */
	    this.getIo = function() {
	        return io;
	    }
		/**
		 * Gets the number of inventory slots.
		 * @return <code>int</code>
		 */
	    this.getNumInventorySlots = function() {
			return slots.length;
		}
	    /**
	     * Gets the inventory slot at the specific index.
	     * @param index the slot index
	     * @return {@link SLOT}
	     */
	    this.getSlot = function(val) {
		    if (val !== undefined
		    		&& val !== null
		    		&& !isNaN(val)
		            && parseInt(Number(val)) === val
		            && !isNaN(parseInt(val, 10))) {
		        return slots[val];
		    } else {
	            var s = [];
	            s.push("ERROR! InventoryData.getSlot() - ");
	            s.push("argument must be integer");
	            throw new Error(s.join(""));
		    }
	    }
	    /**
	     * Determines if an item is in inventory.
	     * @param io the item
	     * @return <tt>true</tt> if the item is in inventory; <tt>false</tt>
	     *         otherwise
	     */
	    this.IsInPlayerInventory = function(io) {
	    	var BaseInteractiveObject =
	    		require("com/dalonedrow/rpg/base/flyweights/baseInteractiveobject");
		    if (io === undefined) {
	            var s = [];
	            s.push("ERROR! InventoryData.IsInPlayerInventory() - ");
	            s.push("requires 1 parameter");
	            throw new Error(s.join(""));
		    }
		    if (io === null
		    		|| !(io instanceof BaseInteractiveObject)) {
	            var s = [];
	            s.push("ERROR! InventoryData.IsInPlayerInventory() - ");
	            s.push("io must be BaseInteractiveObject");
	            throw new Error(s.join(""));
		    }
	        var is = false;
	        for (var i = slots.length - 1; i >= 0; i--) {
	            var ioo = slots[i].getIo();
	            if (ioo !== null && ioo.getRefId() === io.getRefId()) {
	                is = true;
	                break;
	            }
	        }
	        return is;
	    }
	    /**
	     * Gets the flag indicating whether the left ring is the next one that needs
	     * to be switched.
	     * @return <tt>true</tt> if the left ring should be switched;
	     *         <tt>false</tt> otherwise
	     */
	    this.isLeftRing = function() {
	        return leftRing;
	    }
	    /**
	     * Replaces an item in all inventories.
	     * @param oldItemIO the old item being replaced
	     * @param newItemIO the new item
	     * @throws Error if an error occurs
	     */
	    this.ReplaceInAllInventories = function(oldItemIO, newItemIO) {
	    	var BaseInteractiveObject =
	    		require("com/dalonedrow/rpg/base/flyweights/baseInteractiveobject");
		    if (oldItemIO === undefined
		    		|| newItemIO === undefined) {
	            var s = [];
	            s.push("ERROR! InventoryData.ReplaceInAllInventories() - ");
	            s.push("requires 2 parameters");
	            throw new Error(s.join(""));
		    }
		    if (oldItemIO !== null
		    		&& !(oldItemIO instanceof BaseInteractiveObject)) {
	            var s = [];
	            s.push("ERROR! InventoryData.ReplaceInAllInventories() - ");
	            s.push("oldItemIO must be BaseInteractiveObject");
	            throw new Error(s.join(""));
		    }
		    if (newItemIO !== null
		    		&& !(newItemIO instanceof BaseInteractiveObject)) {
	            var s = [];
	            s.push("ERROR! InventoryData.ReplaceInAllInventories() - ");
	            s.push("newItemIO must be BaseInteractiveObject");
	            throw new Error(s.join(""));
		    }
	        if (oldItemIO !== null && !oldItemIO.hasIOFlag(IoGlobals.IO_15_MOVABLE)
	                && newItemIO !== null
	                && !newItemIO.hasIOFlag(IoGlobals.IO_15_MOVABLE)) {
	            var oldIORefId = Interactive.getInstance().GetInterNum(oldItemIO);
	            var newIORefId = Interactive.getInstance().GetInterNum(newItemIO);
	            var i = Interactive.getInstance().getMaxIORefId();
	            for (; i >= 0; i--) {
	                if (i === oldIORefId || i === newIORefId
	                        || !Interactive.getInstance().hasIO(i)) {
	                    continue;
	                }
	                var invOwner = Interactive.getInstance().getIO(i);
	                if (invOwner.getInventory() !== null) {
	                    var inv = invOwner.getInventory();
	                    for (var j = inv.slots.length - 1; j >= 0; j--) {
	                        if (inv.slots[j].getIo().getRefId() === oldItemIO
	                                .getRefId()) {
	                            inv.slots[j].setIo(newItemIO);
	                            break;
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
	     * @throws Error if an error occurs
	     */
	    this.SendInventoryObjectCommand = function(itemName, message) {
		    if (itemName === undefined
		    		|| message === undefined) {
	            var s = [];
	            s.push("ERROR! InventoryData.SendInventoryObjectCommand() - ");
	            s.push("requires 2 parameters");
	            throw new Error(s.join(""));
		    }
		    if (itemName !== null
		    		&& typeof itemName !== "string") {
	            var s = [];
	            s.push("ERROR! InventoryData.SendInventoryObjectCommand() - ");
	            s.push("itemName must be string");
	            throw new Error(s.join(""));
		    }
	        if (itemName !== null && itemName.length() > 0 && slots !== null) {
			    if (message !== null
			    		&& !isNaN(message)
			            && parseInt(Number(message)) === message
			            && !isNaN(parseInt(message, 10))) {
		            for (var i = slots.length - 1; i >= 0; i--) {
		                var slotIO = slots[i].getIo();
		                if (slotIO !== null
		                        && slotIO.hasGameFlag(IoGlobals.GFLAG_INTERACTIVITY)
		                        && slotIO.getItemData() !== null) {
		                    var ioName = slotIO.getItemData().getItemName();
		                    if (itemName === ioName) {
		                        Script.getInstance().sendIOScriptEvent(slotIO, message,
		                                null, "");
		                        slotIO = null;
		                        break;
		                    }
		                    ioName = null;
		                }
		                slotIO = null;
		            }
			    } else {
		            var s = [];
		            s.push("ERROR! InventoryData.SendInventoryObjectCommand() - ");
		            s.push("message must be integer");
		            throw new Error(s.join(""));
			    }
	        }
	    }
	    /**
	     * Sets the IO associated with the inventory.
	     * @param val the IO to set
	     */
	    this.setIo = function(val) {
	    	var BaseInteractiveObject =
	    		require("com/dalonedrow/rpg/base/flyweights/baseinteractiveobject");
		    if (val
		    		&& val !== null
		    		&& val instanceof BaseInteractiveObject) {
		    	io = val;
		    } else {
	            var s = [];
	            s.push("ERROR! InventoryData.setIo() - ");
	            s.push("argument must be BaseInteractiveObject");
	            throw new Error(s.join(""));
		    }
	    }
	    /**
	     * Sets the value of the flag indicating whether the left ring is the next
	     * one that needs to be switched.
	     * @param flag the new value to set
	     */
	    this.setLeftRing = function(val) {
		    if (val !== undefined
		    		&& val !== null
		    		&& typeof val === "boolean") {
		        leftRing = val;
		    } else {
	            var s = [];
	            s.push("ERROR! EquipmentItemModifier.setPercentage() - ");
	            s.push("argument must be boolean");
	            throw new Error(s.join(""));
		    }
	    }
	}
    InventoryData.prototype = Object.create(Hashcode.prototype);
	return InventoryData;
});
