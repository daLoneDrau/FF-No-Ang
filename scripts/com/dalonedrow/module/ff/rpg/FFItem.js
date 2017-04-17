function FFItem() {
	IOItemData.call(this);
    this.setEquipitem(new IOEquipItem());
    this.applyCriticalModifier = function() {
        return 0;
    }
    this.calculateArmorDeflection = function() {
        return 0;
    }
    this.getBackstabModifier = function() {
        return 0;
    }
}
FFItem.prototype = Object.create(IOEquipItem.prototype);
