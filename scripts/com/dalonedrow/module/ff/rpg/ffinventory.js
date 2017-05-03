define(["com/dalonedrow/module/ff/constants/ffequipmentslots",
	"com/dalonedrow/module/ff/systems/webserviceclient",
	"com/dalonedrow/rpg/base/flyweights/inventorydata",
	"com/dalonedrow/rpg/base/flyweights/inventoryslot"], function(FFEquipmentSlots,
			WebServiceClient, InventoryData, InventorySlot) {
	function FFInventory() {
		InventoryData.call(this);
	    var slots = [];
		if (FFEquipmentSlots.values.length === 0) {
			WebServiceClient.getInstance().loadEquipmentSlots();
		}
	    for (var i = FFEquipmentSlots.values.length - 1; i >= 0; i--) {
	        slots.push(new InventorySlot());
	    }
	    this.setSlots(slots);
	}
	FFInventory.prototype = Object.create(InventoryData.prototype);
	/**
	 * Puts an item in front of the player.
	 * @param itemIO the item
	 * @param doNotApplyPhysics if <tt>true</tt>, do not apply physics
	 */
	FFInventory.prototype.PutInFrontOfPlayer = function(itemIO, doNotApplyPhysics) {
    	try {
    		this.checkInstanceOf(itemIO);
    	} catch (err) {
            var s = [];
            s.push("ERROR! FFInventory.PutInFrontOfPlayer() - itemIO ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkBoolean(doNotApplyPhysics);
    	} catch (err) {
            var s = [];
            s.push("ERROR! FFInventory.PutInFrontOfPlayer() - doNotApplyPhysics ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        // TODO Auto-generated method stub

    }
    return FFInventory;
});
