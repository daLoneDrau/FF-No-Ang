define(["com/dalonedrow/rpg/base/flyweights/ioequipitem",
	"com/dalonedrow/rpg/base/flyweights/ioitemdata"], function(IOEquipItem, IOItemData) {
	function FFItem() {
		IOItemData.call(this);
	    this.setEquipitem(new IOEquipItem());
	}
	FFItem.prototype = Object.create(IOItemData.prototype);
	FFItem.prototype.applyCriticalModifier = function() { return 0; }
	FFItem.prototype.calculateArmorDeflection = function() { return 0; }
	FFItem.prototype.getBackstabModifier = function() { return 0; }
    return FFItem;
});
