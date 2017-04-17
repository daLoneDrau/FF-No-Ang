function FFInventory() {
	InventoryData.call(this);
    var slots = [];
    for (var i = FFEquipmentSlots.getNumberOfValues() - 1; i >= 0; i--) {
        slots[i] = new InventorySlot();
    }
    this.setSlots(slots);
    this.PutInFrontOfPlayer = function(itemIO, doNotApplyPhysics) {
        // TODO Auto-generated method stub

    }
}
FFInventory.prototype = Object.create(InventoryData.prototype);
