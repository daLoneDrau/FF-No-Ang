define(["com/dalonedrow/engine/systems/base/interactive",
	"com/dalonedrow/engine/systems/base/projectconstants",
	"com/dalonedrow/rpg/base/constants/ioglobals",
	"com/dalonedrow/rpg/base/constants/mathglobals",
	"com/dalonedrow/utils/watchable",
	"com/dalonedrow/rpg/base/flyweights/baseinteractiveobject"],
		function(Interactive, ProjectConstants, IoGlobals, MathGlobals, Watchable,
				BaseInteractiveObject) {
	function IOCharacter() {
		Watchable.call(this);
	    /** the set of attributes defining the PC. */
		this.attributes = null;
	    /**
	     * the reference ids of all items equipped by the {@link IOCharacter},
	     * indexed by equipment slot.
	     */
	    this.equippedItems = null;
	    defineAttributes();
	    initEquippedItems(ProjectConstants.getInstance().getMaxEquipped());
	    /**
	     * Defines the PC's attributes.
	     * @if an error occurs
	     */
	    var defineAttributes = function() {
	        this.attributes = {};
	        var map = this.getAttributeMap();
	        for (var i = map.length - 1; i >= 0; i--) {
	        	this.attributes[map[i][0]] = new Attribute(map[i][0], map[i][1]);
	        }
	        map = null;
	    }
	    /**
	     * Initializes the items the {@link IOCharacter} has equipped.
	     * @param total the total number of equipment slots
	     */
	    var initEquippedItems = function(total) {
		    if (total === undefined
		    		|| total === null
		    		|| isNaN(total)
		            || parseInt(Number(total)) !== total
		            || isNaN(parseInt(total, 10))) {
	            var s = [];
	            s.push("ERROR! IOCharacter.initEquippedItems() - ");
	            s.push("argument must be integer");
	            throw new Error(s.join(""));
		    }
	        equippedItems = [];
	        for (var i = total; i >= 0; i--) {
	            this.equippedItems.push(-1);
	        }
	    }
	}
	IOCharacter.prototype = Object.create(Watchable.prototype);
    /**
     * Adjusts the attribute modifier for a specific attribute.
     * @param attr the attribute name
     * @param val the modifier
     * @if the attribute name is missing or incorrect
     */
    IOCharacter.prototype.adjustAttributeModifier = function(attr, val) {
		if (attr === undefined
				|| attr === null
				|| typeof attr !== "string") {
            var s = [];
            s.push("ERROR! IOCharacter.adjustAttributeModifier() - ");
            s.push("attr must be string");
            throw new Error(s.join(""));
		}
		if (!this.attributes.hasOwnProperty(attr)) {
            var s = [];
            s.push("ERROR! IOCharacter.adjustAttributeModifier() - ");
            s.push("attribute ");
            s.push(attr);
            s.push(" never set on character")
            throw new Error(s.join(""));
		}
	    if (val === undefined
	    		|| val !== null
	    		|| isNaN(val)
	    		|| typeof val !== "number") {
            var s = [];
            s.push("ERROR! IOCharacter.adjustAttributeModifier() - ");
            s.push("val must be floating-point");
            throw new Error(s.join(""));
	    }
        this.attributes[attr].adjustModifier(val);
    }
    /**
     * Gets the total modifier for a specific element type from the equipment
     * the player is wielding.
     * @param elementType the type of element
     * @return {@link float}
     * @if an error occurs
     */
    IOCharacter.prototype.ARX_EQUIPMENT_Apply = function(elementType) {
	    if (elementType === undefined
	    		|| elementType === null
	    		|| isNaN(elementType)
	            || parseInt(Number(elementType)) !== elementType
	            || isNaN(parseInt(elementType, 10))) {
            var s = [];
            s.push("ERROR! IOCharacter.ARX_EQUIPMENT_Apply() - ");
            s.push("elementType must be integer");
            throw new Error(s.join(""));
	    }
        var toadd = 0;
        var i = ProjectConstants.getInstance().getMaxEquipped() - 1;
        for (; i >= 0; i--) {
            if (this.equippedItems[i] >= 0
                    && Interactive.getInstance().hasIO(this.equippedItems[i])) {
                var toequip = Interactive.getInstance().getIO(this.equippedItems[i]);
                if (toequip.hasIOFlag(IoGlobals.IO_02_ITEM)
                        && toequip.getItemData() !== null
                        && toequip.getItemData().getEquipitem() !== null) {
                    var element = toequip.getItemData().getEquipitem().getElement(elementType);
                    if (!element.isPercentage()) {
                        toadd += element.getValue();
                    }
                }
                toequip = null;
            }
        }
        return toadd;
    }
    /**
     * Gets the total percentage modifier for a specific element type from the
     * equipment the player is wielding.
     * @param elementType the type of element
     * @param trueval the true value
     * @return {@link float}
     * @if an error occurs
     */
    IOCharacter.prototype.ARX_EQUIPMENT_ApplyPercent = function(elementType, trueval) {
	    if (elementType === undefined
	    		|| elementType === null
	    		|| isNaN(elementType)
	            || parseInt(Number(elementType)) !== elementType
	            || isNaN(parseInt(elementType, 10))) {
            var s = [];
            s.push("ERROR! IOCharacter.ARX_EQUIPMENT_ApplyPercent() - ");
            s.push("elementType must be integer");
            throw new Error(s.join(""));
	    }
	    if (trueval === undefined
	    		|| trueval !== null
	    		|| isNaN(trueval)
	    		|| typeof trueval !== "number") {
            var s = [];
            s.push("ERROR! IOCharacter.ARX_EQUIPMENT_ApplyPercent() - ");
            s.push("trueval must be floating-point");
            throw new Error(s.join(""));
	    }
        var toadd = 0;
        var i = ProjectConstants.getInstance().getMaxEquipped() - 1;
        for (; i >= 0; i--) {
            if (this.equippedItems[i] >= 0
                    && Interactive.getInstance().hasIO(this.equippedItems[i])) {
                var toequip = Interactive.getInstance().getIO(this.equippedItems[i]);
                if (toequip.hasIOFlag(IoGlobals.IO_02_ITEM)
                        && toequip.getItemData() !== null
                        && toequip.getItemData().getEquipitem() !== null) {
                    var element = toequip.getItemData().getEquipitem().getElement(elementType);
                    if (element.isPercentage()) {
                        toadd += element.getValue();
                    }
                }
                toequip = null;
            }
        }
        return toadd * trueval * MathGlobals.DIV100;
    }
    /**
     * Releases an equipped IO.
     * @param id the IO's reference id
     * @if an error occurs
     */
    IOCharacter.prototype.ARX_EQUIPMENT_Release = function(id) {
	    if (id === undefined
	    		|| id === null
	    		|| isNaN(id)
	            || parseInt(Number(id)) !== id
	            || isNaN(parseInt(id, 10))) {
            var s = [];
            s.push("ERROR! IOCharacter.ARX_EQUIPMENT_Release() - ");
            s.push("id must be integer");
            throw new Error(s.join(""));
	    }
        var i = ProjectConstants.getInstance().getMaxEquipped() - 1;
        for (; i >= 0; i--) {
            if (this.equippedItems[i] === id) {
                this.equippedItems[i] = -1;
            }
        }
    }
    /**
     * Removes all the player's equipment.
     * @throws PooledException if an error occurs
     * @if an error occurs
     */
    IOCharacter.prototype.ARX_EQUIPMENT_UnEquipAll = function() {
        var i = ProjectConstants.getInstance().getMaxEquipped() - 1;
        for (; i >= 0; i--) {
            if (this.equippedItems[i] >= 0) {
                if (!Interactive.getInstance().hasIO(this.equippedItems[i])) {
                    throw new Error("Equipped unregistered item in slot " + i);
                }
                var itemIO = Interactive.getInstance().getIO(this.equippedItems[i]);
                if (!itemIO.hasIOFlag(IoGlobals.IO_02_ITEM)) {
                    throw new Error("Equipped item without IO_02_ITEM in slot " + i);
                }
                if (itemIO.getItemData() === null) {
                    throw new Error("Equipped item with null item data in slot " + i);
                }
                itemIO.getItemData().ARX_EQUIPMENT_UnEquip(this.getIo(), false);
                itemIO = null;
            }
        }
        this.computeFullStats();
    }
    /**
     * Clears the attribute modifier for a specific attribute.
     * @param attr the attribute name
     */
    IOCharacter.prototype.clearAttributeModifier = function(attr) {
		if (attr === undefined
				|| attr === null
				|| typeof attr !== "string") {
            var s = [];
            s.push("ERROR! IOCharacter.clearAttributeModifier() - ");
            s.push("attr must be string");
            throw new Error(s.join(""));
		}
		if (!this.attributes.hasOwnProperty(attr)) {
            var s = [];
            s.push("ERROR! IOCharacter.adjustAttributeModifier() - ");
            s.push("attribute ");
            s.push(attr);
            s.push(" never set on character")
            throw new Error(s.join(""));
		}
        this.attributes[attr].clearModifier();
    }
    /** Clears all ability score modifiers. */
    IOCharacter.prototype.clearModAbilityScores = function() {
        if (this.attributes !== null) {
        	for (var attr in this.attributes) {
        		if (this.attributes.hasOwnProperty(attr)) {
        			this.attributes[attr].clearModifier();
        		} 
        	} 
        }
    }
    /**
     * Compute FULL versions of player stats including equipped items, spells,
     * and any other effect altering them.
     * @if an error occurs
     */
    IOCharacter.prototype.computeFullStats = function() {
        // clear mods
        this.clearModAbilityScores();
        // apply equipment modifiers
        var map = this.getAttributeMap();
        for (var i = map.length - 1; i >= 0; i--) {
            this.adjustAttributeModifier(map[i][0], this.ARX_EQUIPMENT_Apply(map[i][2]));
        }
        // apply modifiers based on rules
        this.applyRulesModifiers();
        // apply percent modifiers
        for (var i = map.length - 1; i >= 0; i--) {
            var percentModifier = this.ARX_EQUIPMENT_ApplyPercent(map[i][2],
            		this.getBaseAttributeScore(map[i][0]) + this.getAttributeModifier(map[i][0]));
            this.adjustAttributeModifier(map[i][0], percentModifier);
        }
        // apply percent modifiers based on rules
        this.applyRulesPercentModifiers();
    }
    /**
     * Gets a specific attribute.
     * @param abbr the attribute's abbreviation
     * @return {@link Attribute}
     */
	IOCharacter.prototype.getAttribute = function(abbr) {
		if (attr === undefined
				|| attr === null
				|| typeof attr !== "string") {
            var s = [];
            s.push("ERROR! IOCharacter.getAttribute() - ");
            s.push("attr must be string");
            throw new Error(s.join(""));
		}
		if (!this.attributes.hasOwnProperty(attr)) {
            var s = [];
            s.push("ERROR! IOCharacter.getAttribute() - ");
            s.push("attribute ");
            s.push(attr);
            s.push(" never set on character")
            throw new Error(s.join(""));
		}
        return attributes[abbr];
    }
    /**
     * Gets the attribute modifier for a specific attribute.
     * @param attr the attribute name
     * @return {@link float}
     */
    IOCharacter.prototype.getAttributeModifier = function(attr) {
		if (attr === undefined
				|| attr === null
				|| typeof attr !== "string") {
            var s = [];
            s.push("ERROR! IOCharacter.getAttributeModifier() - ");
            s.push("attr must be string");
            throw new Error(s.join(""));
		}
		if (!this.attributes.hasOwnProperty(attr)) {
            var s = [];
            s.push("ERROR! IOCharacter.getAttributeModifier() - ");
            s.push("attribute ");
            s.push(attr);
            s.push(" never set on character")
            throw new Error(s.join(""));
		}
        return attributes[attr].getModifier();
    }
    /**
     * Gets an attribute's display name.
     * @param attr the attribute's abbreviation
     * @return {@link String}
     */
    IOCharacter.prototype.getAttributeName = function(attr) {
		if (attr === undefined
				|| attr === null
				|| typeof attr !== "string") {
            var s = [];
            s.push("ERROR! IOCharacter.getAttributeName() - ");
            s.push("attr must be string");
            throw new Error(s.join(""));
		}
		if (!this.attributes.hasOwnProperty(attr)) {
            var s = [];
            s.push("ERROR! IOCharacter.getAttributeName() - ");
            s.push("attribute ");
            s.push(attr);
            s.push(" never set on character")
            throw new Error(s.join(""));
		}
        return this.attributes[attr].getDisplayName();
    }
    /**
     * Gets all attributes.
     * @return {@link Map}<{@link String}, {@link Attribute}>
     */
	IOCharacter.prototype.getAttributes = function() {
        return this.attributes;
    }
    /**
     * Gets the base attribute score for a specific attribute.
     * @param attr the attribute name
     * @return {@link float}
     */
    IOCharacter.prototype.getBaseAttributeScore = function(attr) {
		if (attr === undefined
				|| attr === null
				|| typeof attr !== "string") {
            var s = [];
            s.push("ERROR! IOCharacter.getBaseAttributeScore() - ");
            s.push("attr must be string");
            throw new Error(s.join(""));
		}
		if (!this.attributes.hasOwnProperty(attr)) {
            var s = [];
            s.push("ERROR! IOCharacter.getBaseAttributeScore() - ");
            s.push("attribute ");
            s.push(attr);
            s.push(" never set on character")
            throw new Error(s.join(""));
		}
        return this.attributes[attr].getBase();
    }
    /**
     * Gets the reference id of the item the {@link IOCharacter} has equipped at
     * a specific equipment slot. -1 is returned if no item is equipped.
     * @param slot the equipment slot
     * @return <code>int</code>
     * @if the equipment slot was never defined
     */
    IOCharacter.prototype.getEquippedItem = function(slot) {
	    if (slot === undefined
	    		|| slot === null
	    		|| isNaN(slot)
	            || parseInt(Number(slot)) !== slot
	            || isNaN(parseInt(slot, 10))) {
            var s = [];
            s.push("ERROR! IOCharacter.getEquippedItem() - ");
            s.push("slot must be integer");
            throw new Error(s.join(""));
	    }
        if (slot < 0
                || slot >= equippedItems.length) {
            var s = [];
            s.push("ERROR! IOCharacter.getEquippedItem() - ");
            s.push("Error - equipment slot ");
            s.push(slot);
            s.push(" is outside array bounds.");
        }
        return this.equippedItems[slot];
    }
    /**
     * Gets the full attribute score for a specific attribute.
     * @param attr the attribute name
     * @return {@link float}
     */
    IOCharacter.prototype.getFullAttributeScore = function(attr) {
		if (attr === undefined
				|| attr === null
				|| typeof attr !== "string") {
            var s = [];
            s.push("ERROR! IOCharacter.getFullAttributeScore() - ");
            s.push("attr must be string");
            throw new Error(s.join(""));
		}
		if (!this.attributes.hasOwnProperty(attr)) {
            var s = [];
            s.push("ERROR! IOCharacter.getFullAttributeScore() - ");
            s.push("attribute ");
            s.push(attr);
            s.push(" never set on character")
            throw new Error(s.join(""));
		}
        return this.attributes[attr].getFull();
    }
    /**
     * Sets the base attribute score for a specific attribute.
     * @param attr the attribute name
     * @param val the new base attribute score
     */
    IOCharacter.prototype.setBaseAttributeScore = function(attr, val) {
		if (attr === undefined
				|| attr === null
				|| typeof attr !== "string") {
            var s = [];
            s.push("ERROR! IOCharacter.setBaseAttributeScore() - ");
            s.push("attr must be string");
            throw new Error(s.join(""));
		}
		if (!this.attributes.hasOwnProperty(attr)) {
            var s = [];
            s.push("ERROR! IOCharacter.setBaseAttributeScore() - ");
            s.push("attribute ");
            s.push(attr);
            s.push(" never set on character")
            throw new Error(s.join(""));
		}
	    if (val === undefined
	    		|| val === null
	    		|| isNaN(val)
	    		|| typeof val !== "number") {
            var s = [];
            s.push("ERROR! IOCharacter.setBaseAttributeScore() - ");
            s.push("val must be floating-point");
            throw new Error(s.join(""));
	    }
        this.attributes[attr].setBase(val);
    }
    /**
     * Sets the reference id of the item the {@link IOCharacter} has equipped at
     * a specific equipment slot.
     * @param slot the equipment slot
     * @param id the item's reference id or the item itself
     * @if the equipment slot was never defined
     */
    IOCharacter.prototype.setEquippedItem = function(slot, id) {
	    if (slot === undefined
	    		|| slot === null
	    		|| isNaN(slot)
	            || parseInt(Number(slot)) !== slot
	            || isNaN(parseInt(slot, 10))) {
            var s = [];
            s.push("ERROR! IOCharacter.setEquippedItem() - ");
            s.push("slot must be integer");
            throw new Error(s.join(""));
	    }
        if (slot < 0
                || slot >= equippedItems.length) {
            var s = [];
            s.push("ERROR! IOCharacter.setEquippedItem() - ");
            s.push("Error - equipment slot ");
            s.push(slot);
            s.push(" is outside array bounds.");
        }
	    if (id === undefined) {
            var s = [];
            s.push("ERROR! IOCharacter.setEquippedItem() - ");
            s.push("id must be integer or BaseInteractiveObject");
            throw new Error(s.join(""));
	    }
	    if (id === null) {
            this.equippedItems[slot] = -1;
	    }
	    if (!isNaN(id)
	    		&& parseInt(Number(id)) === id
	    		&& !isNaN(parseInt(id, 10))) {
	        this.equippedItems[slot] = id;
	    } else if (id instanceof BaseInteractiveObject) {
            this.equippedItems[slot] = item.getRefId();
	    } else {
            var s = [];
            s.push("ERROR! IOCharacter.setEquippedItem() - ");
            s.push("id must be integer or BaseInteractiveObject");
            throw new Error(s.join(""));
	    }
    }
	return IOCharacter;
});
