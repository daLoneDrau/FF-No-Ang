/**
 * 
 */
define(["com/dalonedrow/engine/systems/base/interactive",
	"com/dalonedrow/engine/systems/base/projectconstants",
	"com/dalonedrow/rpg/base/flyweights/attribute", "com/dalonedrow/utils/watchable"],
		function(Interactive, ProjectConstants, Attribute, Watchable) {
    function IOCharacter() {
	    Watchable.call(this);
	    var self = this;
	    /** the set of attributes defining the PC. */
	    var attributes = {};
	    /**
	     * the reference ids of all items equipped by the {@link IOCharacter},
	     * indexed by equipment slot.
	     */
	    var equippedItems = [];
	    /**
	     * Defines the PC's attributes.
	     * @if an error occurs
	     */
	    var defineAttributes = function() {
	        attributes = {};
	        var map = self.getAttributeMap();
	        for (var i = map.length - 1; i >= 0; i--) {
	            attributes[map[i][0]] = new Attribute(map[i][0], map[i][1]);
	        }
	        map = null;
	    }
	    /**
	     * Initializes the items the {@link IOCharacter} has equipped.
	     * @param total the total number of equipment slots
	     */
	    var initEquippedItems = function(total) {
	        equippedItems = [];
	        for (var i = 0; i < total; i++) {
	            equippedItems.push(-1);
	        }
	    }
	    defineAttributes();
	    initEquippedItems(ProjectConstants.getInstance().getMaxEquipped());
	    /**
	     * Adjusts the attribute modifier for a specific attribute.
	     * @param attr the attribute name
	     * @param val the modifier
	     */
	    this.adjustAttributeModifier = function(attr, val) {
	        if (attr === null) {
	            throw new Error("Attribute name cannot be null");
	        }
	        if (attributes[attr] === undefined) {
	            throw new Error("No such attribute " + attr);
	        }
	        attributes[attr].adjustModifier(val);
	    }
	    /**
	     * Gets the total modifier for a specific element type from the equipment
	     * the player is wielding.
	     * @param elementType the type of element
	     * @return {@link float}
	     * @if an error occurs
	     */
	    this.ARX_EQUIPMENT_Apply = function(elementType) {
	        var toadd = 0;
	        var i = ProjectConstants.getInstance().getMaxEquipped() - 1;
	        for (; i >= 0; i--) {
	            if (equippedItems[i] >= 0
	                    && Interactive.getInstance().hasIO(equippedItems[i])) {
	            	var toequip = Interactive.getInstance().getIO(equippedItems[i]);
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
	    this.ARX_EQUIPMENT_ApplyPercent = function(elementType, trueval) {
	    	var toadd = 0;
	        var i = ProjectConstants.getInstance().getMaxEquipped() - 1;
	        for (; i >= 0; i--) {
	            if (equippedItems[i] >= 0
	                    && Interactive.getInstance().hasIO(equippedItems[i])) {
	            	var toequip = Interactive.getInstance().getIO(equippedItems[i]);
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
	    this.ARX_EQUIPMENT_Release = function(id) {
	        var i = ProjectConstants.getInstance().getMaxEquipped() - 1;
	        for (; i >= 0; i--) {
	            if (equippedItems[i] === id) {
	                equippedItems[i] = -1;
	            }
	        }
	    }
	    /**
	     * Removes all the player's equipment.
	     * @throws PooledException if an error occurs
	     * @if an error occurs
	     */
	    this.ARX_EQUIPMENT_UnEquipAll = function()
	            {
	        var i = ProjectConstants.getInstance().getMaxEquipped() - 1;
	        for (; i >= 0; i--) {
	            if (equippedItems[i] >= 0) {
	                if (!Interactive.getInstance().hasIO(equippedItems[i])) {
	                    throw new Error(["Equipped unregistered item in slot ", i].join(""));
	                }
	                var itemIO = Interactive.getInstance().getIO(equippedItems[i]);
	                if (!itemIO.hasIOFlag(IoGlobals.IO_02_ITEM)) {
	                    throw new Error(["Equipped item without IO_02_ITEM in slot ", i].join(""));
	                }
	                if (itemIO.getItemData() === null) {
	                    throw new Error(["Equipped item with null item data in slot ", i].join(""));
	                }
	                itemIO.getItemData().ARX_EQUIPMENT_UnEquip(getIo(), false);
	            }
	        }
	        this.computeFullStats();
	    }
	    /**
	     * Clears the attribute modifier for a specific attribute.
	     * @param attr the attribute name
	     */
	    this.clearAttributeModifier = function(attr) {
	        attributes[attr].clearModifier();
	    }
	    /** Clears all ability score modifiers. */
	    this.clearModAbilityScores = function() {
	        if (attributes !== null) {
	        	for (var attr in attributes) {
	        		attributes[attr].clearModifier();
	        	}
	        }
	    }
	    /**
	     * Compute FULL versions of player stats including equipped items, spells,
	     * and any other effect altering them.
	     * @if an error occurs
	     */
	    this.computeFullStats = function() {
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
	                    this.getBaseAttributeScore(map[i][0])
	                            + this.getAttributeModifier(map[i][0]));
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
	    this.getAttribute = function(abbr) {
	        return attributes[abbr];
	    }
	    /**
	     * Gets the attribute modifier for a specific attribute.
	     * @param attr the attribute name
	     * @return {@link float}
	     */
	    this.getAttributeModifier = function(attr) {
	        return attributes[attr].getModifier();
	    }
	    /**
	     * Gets an attribute's display name.
	     * @param attr the attribute's abbreviation
	     * @return {@link String}
	     */
	    this.getAttributeName = function(attr) {
	        return attributes[attr].getDisplayName();
	    }
	    /**
	     * Gets all attributes.
	     * @return {@link Map}<{@link String}, {@link Attribute}>
	     */
	    this.getAttributes = function() {
	        return attributes;
	    }
	    /**
	     * Gets the base attribute score for a specific attribute.
	     * @param attr the attribute name
	     * @return {@link float}
	     */
	    this.getBaseAttributeScore = function(attr) {
	        return attributes[attr].getBase();
	    }
	    /**
	     * Gets the reference id of the item the {@link IOCharacter} has equipped at
	     * a specific equipment slot. -1 is returned if no item is equipped.
	     * @param slot the equipment slot
	     * @return <code>int</code>
	     * @if the equipment slot was never defined
	     */
	    this.getEquippedItem = function(slot) {
	    	var id = -1;
	        if (slot < 0
	                || slot >= equippedItems.length) {
	        	throw new Error(["Error - equipment slot ", slot, " is outside array bounds."].join(""));
	        }
	        id = equippedItems[slot];
	        return id;
	    }
	    /**
	     * Gets the full attribute score for a specific attribute.
	     * @param attr the attribute name
	     * @return {@link float}
	     */
	    this.getFullAttributeScore = function(attr) {
	        return attributes[attr].getFull();
	    }
	    /**
	     * Sets the base attribute score for a specific attribute.
	     * @param attr the attribute name
	     * @param val the new base attribute score
	     */
	    this.setBaseAttributeScore = function(attr, val) {
	        attributes[attr].setBase(val);
	    }
	    /**
	     * Sets the reference id of the item the {@link IOCharacter} has equipped at
	     * a specific equipment slot.
	     * @param slot the equipment slot
	     * @param item the item being equipped
	     */
	    this.setEquippedItem = function(slot, item) {
	        if (slot < 0
	                || slot >= equippedItems.length) {
	        	throw new Error(["Error - equipment slot ", slot, " is outside array bounds."].join(""));
	        }
	        if (item === null) {
	            equippedItems[slot] = -1;
	        } else {
	            equippedItems[slot] = item.getRefId();
	        }
	    }
	    /**
	     * Sets the reference id of the item the {@link IOCharacter} has equipped at
	     * a specific equipment slot.
	     * @param slot the equipment slot
	     * @param id the item's reference id
	     * @if the equipment slot was never defined
	     */
	    this.setEquippedItem = function(slot, id) {
	        if (slot < 0
	                || slot >= equippedItems.length) {
	            throw new Error(["Error - equipment slot ", slot, " is outside array bounds."].join(""));
	        }
	        equippedItems[slot] = id;
	    }
	}
	IOCharacter.prototype = Object.create(Watchable.prototype);
	return IOCharacter;
});