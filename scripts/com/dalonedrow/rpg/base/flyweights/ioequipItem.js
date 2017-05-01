define(["com/dalonedrow/engine/systems/base/projectconstants",
	"com/dalonedrow/rpg/base/flyweights/equipmentitemmodifier", "com/dalonedrow/utils/hashcode"],
		function(ProjectConstants, EquipmentItemModifier, Hashcode) {
    function IOEquipItem() {
		Hashcode.call(this);
	    /** the list of equipment modifiers. */
	    this.elements = [];
	    for (var i = 0; i < ProjectConstants.getInstance().getNumberEquipmentElements(); i++) {
	    	this.elements.push(new EquipmentItemModifier());
	    }
	}
    IOEquipItem.prototype = Object.create(Hashcode.prototype);
	/** Frees all resources. */
    IOEquipItem.prototype.free = function() {
        for (var i = 0; i < this.elements.length; i++) {
        	this.elements[i] = null;
        }
	}
	/**
	 * Gets the element.
	 * @param element the element
	 * @return {@link EquipmentItemModifier}
	 */
    IOEquipItem.prototype.getElement = function(element) {
		return this.elements[element];
	}
	/** Resets all modifiers. */
    IOEquipItem.prototype.reset = function() {
		for (var i = 0; i < this.elements.length; i++) {
			this.elements[i].clearData();
		}
	}
	return IOEquipItem;
});
