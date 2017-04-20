define(["com/dalonedrow/engine/systems/base/projectconstants",
	"com/dalonedrow/rpg/base/flyweights/equipmentitemmodifier", "com/dalonedrow/utils/hashcode"],
		function(ProjectConstants, EquipmentItemModifier, Hashcode) {
    function IOEquipItem() {
		Hashcode.call(this);
	    /** the list of equipment modifiers. */
	    var elements = [];
	    var numElements =
				ProjectConstants.getInstance().getNumberEquipmentElements();  
	    for (var i = 0; i < numElements; i++) {
	        elements.push(new EquipmentItemModifier());
	    }
		/** Frees all resources. */
		this.free = function() {
	        for (var i = 0; i < elements.length; i++) {
	            elements[i] = null;
	        }
		}
		/**
		 * Gets the element.
		 * @param element the element
		 * @return {@link EquipmentItemModifier}
		 */
		this.getElement = function(element) {
			return elements[element];
		}
		/** Resets all modifiers. */
		this.reset = function() {
			for (var i = 0; i < elements.length; i++) {
				elements[i].clearData();
			}
		}
	}
    IOEquipItem.prototype = Object.create(Hashcode.prototype);
	return IOEquipItem;
});
