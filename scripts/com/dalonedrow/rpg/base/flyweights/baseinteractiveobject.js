/**
 * 
 */
define(["require", "com/dalonedrow/engine/sprite/base/simplevector2",
	"com/dalonedrow/engine/sprite/base/simplevector3",
	"com/dalonedrow/rpg/base/constants/equipmentglobals",
	"com/dalonedrow/rpg/base/constants/ioglobals",
	"com/dalonedrow/rpg/base/flyweights/inventorydata",
	"com/dalonedrow/rpg/base/flyweights/ioitemdata",
	"com/dalonedrow/rpg/base/flyweights/ionpcdata",
	"com/dalonedrow/rpg/base/flyweights/iopcdata",
	"com/dalonedrow/rpg/base/flyweights/iospellcastdata",
	"com/dalonedrow/rpg/base/flyweights/scriptable", 
	"com/dalonedrow/rpg/base/systems/spellmaster","com/dalonedrow/utils/hashcode"],
		function(require, SimpleVector2, SimpleVector3, EquipmentGlobals, IoGlobals, InventoryData,
				IOItemData, IoNpcData, IoPcData, IOSpellCastData, Scriptable, SpellMaster,
				Hashcode) {
	function BaseInteractiveObject(id) {
		Hashcode.call(this);
	    /** the animation ids associated with the interactive object. */
	    this.animations = {};
	    /** the {@link BaseInteractiveObject}'s armor material. */
	    this.armormaterial = "";
	    /** any flags that have been set. */
	    this.behaviorFlags = 0;
	    this.damageSum = 0.0;
	    /** flags indicating the IO is taking damage of a specific type. */
	    this.dmgFlags = 0;
	    /** any game flags that have been set. */
	    this.gameFlags = 0;
	    /** the object's init this.position. */
	    this.initPosition = null;
	    /** the this.inventory data. */
	    this.inventory = null;
	    /** any flags that have been set. */
	    this.ioFlags = 0;
	    /** the list of groups to which the IO belongs. */
	    this.ioGroups = [];
	    this.itemData = null;
	    this.level = 0;
	    this.mainevent = "";
	    this.npcData = null;
	    /** overriding this.script associated with the object. */
	    this.overscript = null;
	    this.pcData = null;
	    this.poisonCharges = 0;
	    this.poisonLevel = 0;
	    /** the object's this.position. */
	    this.position = null;
	    /** the object's reference id. */
	    this.refId = 0;
	    /** primary this.script associated with the object. */
	    this.script = null;
	    /** is the item loaded by this.script. */
	    this.scriptLoaded = false;
	    /** the this.show status (in scene, in this.inventory). */
	    this.show = 0;
	    this.sparkNBlood = 0;
	    this.spellcastData = new IOSpellCastData();
	    /** the list of spells currently active on the object. */
	    this.spellsOn = [];
	    this.statCount = 0;
	    this.statSent = 0;
	    this.summoner = 0;
	    this.target = new SimpleVector3();
	    this.targetinfo = 0;
	    /**
	     * any type flags that have been set (is the object a goblin, weapon,
	     * etc...).
	     */
	    this.typeFlags = 0;
	    /** the {@link BaseInteractiveObject}'s weapon material. */
	    this.weaponmaterial = null;
	    if (id !== undefined
	    		&& id !== null
	    		&& !isNaN(id)
	            && parseInt(Number(id)) === id
	            && !isNaN(parseInt(id, 10))) {
	        this.refId = parseInt(id, 10);
	    } else {
	        throw new Error("Cannot create without reference id");
	    }
	}
	BaseInteractiveObject.prototype = Object.create(Hashcode.prototype);
    /**
     * Adds an animation by a given name to the interactive object.
     * 
     * @param name the animation's name
     * @param id the animation's reference id
     * @throws PooledException if there is an error with the stringbuilder
     * @throws RPGException if the name is null
     */
	BaseInteractiveObject.prototype.addAnimation = function(name, id) {
    	if (name !== undefined || id !== undefined) {
	        if (name === null
	                || id === null) {
	            var s = [];
	            s.push("ERROR! BaseInteractiveObject.addAnimation() - ");
	            s.push("null value sent in parameters");
	            throw new Error(s.join(""));
	        }
	        if (typeof name !== "string") {
	            var s = [];
	            s.push("ERROR! BaseInteractiveObject.addAnimation() - ");
	            s.push("animation name must be a string");
	            throw new Error(s.join(""));
	        }
	        if (isNaN(id)
	                || parseInt(Number(id)) !== id
	                || isNaN(parseInt(id, 10))) {
	            var s = [];
	            s.push("ERROR! BaseInteractiveObject.addAnimation() - ");
	            s.push("animation id must be an integer");
	            throw new Error(s.join(""));
	        }
	        this.animations[name] = id;
    	} else {
            var s = [];
            s.push("ERROR! BaseInteractiveObject.addAnimation() - ");
            s.push("requires 2 parameters");
            throw new Error(s.join(""));
        }
    }
    /**
     * Adds a behavior flag.
     * @param flag the flag
     */
	BaseInteractiveObject.prototype.addBehaviorFlag = function(flag) {
        if (flag !== undefined
        		&& flag !== null
        		&& !isNaN(flag)
	            && parseInt(Number(flag)) === flag
        		&& flag && (flag & (flag - 1)) === 0) {
	        this.behaviorFlags |= flag;
        } else {
            var s = [];
            s.push("ERROR! BaseInteractiveObject.addBehaviorFlag() - ");
            s.push("flag must be power of 2");
            throw new Error(s.join(""));
        }
    }
    /**
     * Adds a game flag.
     * @param flag the flag
     */
	BaseInteractiveObject.prototype.addGameFlag = function(flag) {
        if (flag !== undefined
        		&& flag !== null
        		&& !isNaN(flag)
	            && parseInt(Number(flag)) === flag
        		&& flag && (flag & (flag - 1)) === 0) {
        	this.gameFlags |= flag;
        } else {
            var s = [];
            s.push("ERROR! BaseInteractiveObject.addGameFlag() - ");
            s.push("flag must be power of 2");
            throw new Error(s.join(""));
        }
    }
    /**
     * Adds the IO to a group.
     * @param group the group
     */
	BaseInteractiveObject.prototype.addGroup = function(group) {
        if (group !== undefined
        		&& group !== null
        		&& typeof group === "string") {
	        var found = false;
	        for (var i = 0; i < this.ioGroups.length; i++) {
	            if (group === this.ioGroups[i]) {
	                found = true;
	                break;
	            }
	        }
	        if (!found) {
	            this.ioGroups.push(group);
	        }
        } else {
            var s = [];
            s.push("ERROR! BaseInteractiveObject.addGroup() - ");
            s.push("group must be string");
            throw new Error(s.join(""));
        }
    }
    /**
     * Adds a flag.
     * @param flag the flag
     */
	BaseInteractiveObject.prototype.addIOFlag = function(flag) {
        if (flag !== undefined
        		&& flag !== null
        		&& !isNaN(flag)
	            && parseInt(Number(flag)) === flag
        		&& flag && (flag & (flag - 1)) === 0) {
        	this.ioFlags |= flag;
        } else {
            var s = [];
            s.push("ERROR! BaseInteractiveObject.addIOFlag() - ");
            s.push("flag must be power of 2");
            throw new Error(s.join(""));
        }
    }
    /**
     * Adds an active spell on the object.
     * @param id the spell's id
     */
	BaseInteractiveObject.prototype.addSpellOn = function(id) {
	    if (id !== undefined
	    		&& id !== null
	    		&& !isNaN(id)
	            && parseInt(Number(id)) === id
	            && !isNaN(parseInt(id, 10))) {
	        if (this.spellsOn === null) {
	            this.spellsOn = [];
	        }
	        this.spellsOn.push(id);
	    } else {
            s.push("ERROR! BaseInteractiveObject.addSpellOn() - ");
            s.push("spell id must be integer");
            throw new Error(s.join(""));
	    }
    }
    /**
     * Adds a type flag.
     * @param flag the flag
     * @throws Error if an invalid type is set
     */
	BaseInteractiveObject.prototype.addTypeFlag = function(flag) {
        if (flag !== undefined
        		&& flag !== null
        		&& !isNaN(flag)
	            && parseInt(Number(flag)) === flag
        		&& flag && (flag & (flag - 1)) === 0) {
        	switch (flag) {
	            case EquipmentGlobals.OBJECT_TYPE_DAGGER:
	            case EquipmentGlobals.OBJECT_TYPE_1H:
	            case EquipmentGlobals.OBJECT_TYPE_2H:
	            case EquipmentGlobals.OBJECT_TYPE_BOW:
	                this.clearTypeFlags();
	                this.typeFlags |= EquipmentGlobals.OBJECT_TYPE_WEAPON;
	                this.addIOFlag(IoGlobals.IO_02_ITEM);
	                break;
	            case EquipmentGlobals.OBJECT_TYPE_SHIELD:
	            case EquipmentGlobals.OBJECT_TYPE_ARMOR:
	            case EquipmentGlobals.OBJECT_TYPE_HELMET:
	            case EquipmentGlobals.OBJECT_TYPE_LEGGINGS:
	            case EquipmentGlobals.OBJECT_TYPE_RING:
	                this.addIOFlag(IoGlobals.IO_02_ITEM);
	            case EquipmentGlobals.OBJECT_TYPE_FOOD:
	            case EquipmentGlobals.OBJECT_TYPE_GOLD:
	                this.clearTypeFlags();
	                break;
	            case EquipmentGlobals.OBJECT_TYPE_WEAPON:
	                throw new Error(
	                        "Cannot set weapon type, must specify weapon class");
	            default:
	                throw new Error("Invalid object type " + flag);
	        }
	        this.typeFlags |= flag;
	    } else {
            s.push("ERROR! BaseInteractiveObject.addSpellOn() - ");
            s.push("flag must be power of two");
            throw new Error(s.join(""));
	    }
    }
    /** Clears all behavior flags that were set. */
	BaseInteractiveObject.prototype.clearBehaviorFlags = function() {
        this.behaviorFlags = 0;
    }
    /** Clears all game flags that were set. */
	BaseInteractiveObject.prototype.clearGameFlags = function() {
        this.gameFlags = 0;
    }
    /** Clears all flags that were set. */
	BaseInteractiveObject.prototype.clearIOFlags = function() {
        this.ioFlags = 0;
    }
    /** Clears all type flags that were set. */
	BaseInteractiveObject.prototype.clearTypeFlags = function() {
        this.typeFlags = 0;
    }
    /**
     * {@inheritDoc}
     */
	BaseInteractiveObject.prototype.equals = function(obj) {
        var equals = false;
        if (obj !== undefined
        		&& obj !== null
                && obj instanceof BaseInteractiveObject
                && this.refId === obj.getRefId()) {
            equals = true;
        }
        return equals;
    }
    /**
     * Gets the reference id of the animation associated with a specific name.
     * @param name the name of the animation
     * @return var
     * @throws Error if the name is null, or no animation by the given name was
     *             ever set on the interactive object
     */
	BaseInteractiveObject.prototype.getAnimation = function(name) {
    	if (name !== undefined) {
	        if (name === null) {
	            var s = [];
	            s.push("ERROR! BaseInteractiveObject.getAnimation() - ");
	            s.push("null value sent in parameters");
	            throw new Error(s.join(""));
	        }
	        if (typeof name !== "string") {
	            var s = [];
	            s.push("ERROR! BaseInteractiveObject.getAnimation() - ");
	            s.push("animation name must be a string");
	            throw new Error(s.join(""));
	        }
	        if (!this.animations.hasOwnProperty(name)) {
	            var s = [];
	            s.push("ERROR! BaseInteractiveObject.getAnimation() - ");
	            s.push("no animation set for ");
	            s.push(name);
	            throw new Error(s.join(""));
	        }
	        return this.animations[name];
    	} else {
            var s = [];
            s.push("ERROR! BaseInteractiveObject.getAnimation() - ");
            s.push("no value sent in parameters");
            throw new Error(s.join(""));
        }
    }
    /**
     * Gets the {@link BaseInteractiveObject}'s armor material. 
     * @return {@link var}
     */
	BaseInteractiveObject.prototype.getArmormaterial = function() {
        return this.armormaterial;
    }
	BaseInteractiveObject.prototype.getDamageSum = function() {
        return this.damageSum;
    }
    /**
     * @return the this.initPosition
     */
	BaseInteractiveObject.prototype.getInitPosition = function() {
        return this.initPosition;
    }
    /**
     * Gets the IO's this.inventory.
     * @return {@link INVENTORY}
     */
	BaseInteractiveObject.prototype.getInventory = function() {
        return this.inventory;
    }
    /**
     * Gets a group to which the IO belongs.
     * @param index the index
     * @return {@link var}
     */
	BaseInteractiveObject.prototype.getIOGroup = function(index) {
    	var group;
	    if (index !== undefined
	    		&& index !== null
	    		&& !isNaN(index)
	            && parseInt(Number(index)) === id
	            && !isNaN(parseInt(index, 10))) {
	    	group = this.ioGroups[index];
	    } else {
            s.push("ERROR! BaseInteractiveObject.getIOGroup() - ");
            s.push("index must be integer");
            throw new Error(s.join(""));
	    }
	    return group;
    }
    /**
     * Gets item data for the {@link BaseInteractiveObject}.
     * @return {@link ITEM}
     */
	BaseInteractiveObject.prototype.getItemData = function() {
        return this.itemData;
    }
    /**
     * Gets the value for the this.level.
     * @return {@link var}
     */
	BaseInteractiveObject.prototype.getLevel = function() {
        return this.level;
    }
    /**
     * Gets the this.mainevent.
     * @return {@link var}
     */
	BaseInteractiveObject.prototype.getMainevent = function() {
        return this.mainevent;
    }
    /**
     * Gets NPC data for the {@link BaseInteractiveObject}.
     * @return {@link NPC}
     */
	BaseInteractiveObject.prototype.getNPCData = function() {
        return this.npcData;
    }
    /**
     * Gets the number of spells on the {@link BaseInteractiveObject}.
     * @return <code>var</code>
     */
	BaseInteractiveObject.prototype.getNumberOfSpellsOn = function() {
        return numberOfSpellsOn;
    }
    /**
     * Gets the number of IO groups to which the IO belongs.
     * @return {@link var}
     */
	BaseInteractiveObject.prototype.getNumIOGroups = function() {
        return this.ioGroups.length;
    }
    /**
     * Gets the this.overscript.
     * @return {@link SCRIPT}
     */
	BaseInteractiveObject.prototype.getOverscript = function() {
        return this.overscript;
    }
    /**
     * Gets item data for the {@link BaseInteractiveObject}.
     * @return {@link PC}
     */
	BaseInteractiveObject.prototype.getPCData = function() {
        return this.pcData;
    }
	BaseInteractiveObject.prototype.getPoisonCharges = function() {
        return this.poisonCharges;
    }
    /**
     * Gets the value for the this.poisonLevel.
     * @return {@link var}
     */
	BaseInteractiveObject.prototype.getPoisonLevel = function() {
        return this.poisonLevel;
    }
    /**
     * Gets the this.position.
     * @return {@link SimpleVector2}
     */
	BaseInteractiveObject.prototype.getPosition = function() {
        return this.position;
    }
    /**
     * Gets the {@link BaseInteractiveObject}'s reference id.
     * @return var
     */
	BaseInteractiveObject.prototype.getRefId = function() {
        return this.refId;
    }
    /**
     * Gets the this.script
     * @return {@link SCRIPT}
     */
	BaseInteractiveObject.prototype.getScript = function() {
        return this.script;
    }
    /**
     * Gets the this.show status.
     * @return <code>var</code>
     */
	BaseInteractiveObject.prototype.getShow = function() {
        return this.show;
    }
	BaseInteractiveObject.prototype.getSparkNBlood = function() {
        return this.sparkNBlood;
    }
    /**
     * Gets the spellcast_data
     * @return {@link IOSpellCastData}
     */
	BaseInteractiveObject.prototype.getSpellcastData = function() {
        return this.spellcastData;
    }
    /**
     * Gets the this.statCount
     * @return {@link var}
     */
	BaseInteractiveObject.prototype.getStatCount = function() {
        return this.statCount;
    }
    /**
     * Gets the this.statSent
     * @return {@link var}
     */
	BaseInteractiveObject.prototype.getStatSent = function() {
        return this.statSent;
    }
	BaseInteractiveObject.prototype.getSummoner = function() {
        return this.summoner;
    }
    /**
     * @return the this.target
     */
	BaseInteractiveObject.prototype.getTarget = function() {
        return this.target;
    }
    /**
     * Gets the this.targetinfo
     * @return {@link var}
     */
	BaseInteractiveObject.prototype.getTargetinfo = function() {
        return this.targetinfo;
    }
    /**
     * Gets the {@link BaseInteractiveObject}'s weapon material.
     * @return {@link var}
     */
	BaseInteractiveObject.prototype.getWeaponmaterial = function() {
        return this.weaponmaterial;
    }
    /**
     * Determines if the {@link BaseInteractiveObject} has a specific behavior
     * flag.
     * @param flag the flag
     * @return true if the {@link BaseInteractiveObject} has the flag; false
     *         otherwise
     */
	BaseInteractiveObject.prototype.hasBehaviorFlag = function(flag) {
    	var has = false;
        if (flag !== undefined
        		&& flag !== null
        		&& !isNaN(flag)
	            && parseInt(Number(flag)) === flag
        		&& flag && (flag & (flag - 1)) === 0) {
        	has = (this.behaviorFlags & flag) === flag;
        } else {
            var s = [];
            s.push("ERROR! BaseInteractiveObject.hasBehaviorFlag() - ");
            s.push("flag must be power of 2");
            throw new Error(s.join(""));
        }
        return has;
    }
    /**
     * Determines if the {@link BaseInteractiveObject} has a specific game flag.
     * @param flag the flag
     * @return true if the {@link BaseInteractiveObject} has the flag; false
     *         otherwise
     */
	BaseInteractiveObject.prototype.hasGameFlag = function(flag) {
    	var has = false;
        if (flag !== undefined
        		&& flag !== null
        		&& !isNaN(flag)
	            && parseInt(Number(flag)) === flag
        		&& flag && (flag & (flag - 1)) === 0) {
        	has = (this.gameFlags & flag) === flag;
        } else {
            var s = [];
            s.push("ERROR! BaseInteractiveObject.hasGameFlag() - ");
            s.push("flag must be power of 2");
            throw new Error(s.join(""));
        }
        return has;
    }
    /**
     * Determines if the {@link BaseInteractiveObject} has a specific flag.
     * @param flag the flag
     * @return true if the {@link BaseInteractiveObject} has the flag; false
     *         otherwise
     */
	BaseInteractiveObject.prototype.hasIOFlag = function(flag) {
    	var has = false;
        if (flag !== undefined
        		&& flag !== null
        		&& !isNaN(flag)
	            && parseInt(Number(flag)) === flag
        		&& flag && (flag & (flag - 1)) === 0) {
        	has = (this.ioFlags & flag) === flag;
        } else {
            var s = [];
            s.push("ERROR! BaseInteractiveObject.hasIOFlag() - ");
            s.push("flag must be power of 2");
            throw new Error(s.join(""));
        }
        return has;
    }
    /**
     * Determines if the {@link BaseInteractiveObject} has a specific type of spell affecting
     * it.
     * @param type the spell type
     * @return <tt>true</tt> if the {@link BaseInteractiveObject} has the flag; <tt>false</tt>
     *         otherwise
     */
	BaseInteractiveObject.prototype.hasSpellOn = function(type) {
    	var has = false;
	    if (type !== undefined
	    		&& type !== null
	    		&& !isNaN(type)
	            && parseInt(Number(type)) === type
	            && !isNaN(parseInt(type, 10))) {
	    	for (var i = this.spellsOn.length - 1; i >= 0; i--) {
	    		var spell = SpellMaster.getInstance().getSpell(this.spellsOn[i]);
	    		if (spell !== null
	    				&& spell.getType() === type
	    				&& spell.exists()) {
	    			has = true;
	    			break;
	    		}
	    	}
	    } else {
            s.push("ERROR! BaseInteractiveObject.getSpellOn() - ");
            s.push("type must be integer");
            throw new Error(s.join(""));
	    }
	    return has;
    }
    /**
     * Determines if the {@link BaseInteractiveObject} has a specific type flag.
     * @param flag the flag
     * @return true if the {@link BaseInteractiveObject} has the flag; false
     *         otherwise
     */
	BaseInteractiveObject.prototype.hasTypeFlag = function(flag) {
    	var has = false;
        if (flag !== undefined
        		&& flag !== null
        		&& !isNaN(flag)
	            && parseInt(Number(flag)) === flag
        		&& flag && (flag & (flag - 1)) === 0) {
        	has = (this.typeFlags & flag) === flag;
        } else {
            var s = [];
            s.push("ERROR! BaseInteractiveObject.hasTypeFlag() - ");
            s.push("flag must be power of 2");
            throw new Error(s.join(""));
        }
        return has;
    }
	BaseInteractiveObject.prototype.hasGroup = function(group) {
    	return this.isInGroup(group);
    }
	BaseInteractiveObject.prototype.isInGroup = function(group) {
    	var is = false;
        if (group !== undefined
        		&& group !== null
        		&& typeof group === "string") {
	        for (var i = 0; i < this.ioGroups.length; i++) {
	            if (group === this.ioGroups[i]) {
	                is = true;
	                break;
	            }
	        }
        } else {
            var s = [];
            s.push("ERROR! BaseInteractiveObject.isInGroup() - ");
            s.push("argument must be string");
            throw new Error(s.join(""));
        }
        return is;
    }
    /**
     * Gets the flag indicating if the item is loaded by this.script.
     * @return <code>var</code>
     */
	BaseInteractiveObject.prototype.isScriptLoaded = function() {
        return this.scriptLoaded;
    }
    /** Removes all active spells. */
	BaseInteractiveObject.prototype.removeAllSpells = function() {
        this.spellsOn.length = 0;
    }
    /**
     * Removes a behavior flag.
     * @param flag the flag
     */
	BaseInteractiveObject.prototype.removeBehaviorFlag = function(flag) {
        if (flag !== undefined
        		&& flag !== null
        		&& !isNaN(flag)
	            && parseInt(Number(flag)) === flag
        		&& flag && (flag & (flag - 1)) === 0) {
	        this.behaviorFlags &= ~flag;
        } else {
            var s = [];
            s.push("ERROR! BaseInteractiveObject.removeBehaviorFlag() - ");
            s.push("flag must be power of 2");
            throw new Error(s.join(""));
        }
    }
    /**
     * Removes a game flag.
     * @param flag the flag
     */
	BaseInteractiveObject.prototype.removeGameFlag = function(flag) {
        if (flag !== undefined
        		&& flag !== null
        		&& !isNaN(flag)
	            && parseInt(Number(flag)) === flag
        		&& flag && (flag & (flag - 1)) === 0) {
        	this.gameFlags &= ~flag;
        } else {
            var s = [];
            s.push("ERROR! BaseInteractiveObject.removeGameFlag() - ");
            s.push("flag must be power of 2");
            throw new Error(s.join(""));
        }
    }
    /**
     * Removes the IO from a group.
     * @param group the group
     */
	BaseInteractiveObject.prototype.removeGroup = function(group) {
        if (group !== undefined
        		&& group !== null
        		&& typeof group === "string") {
	        var index = -1;
	        if (group !== null) {
	            for (var i = 0; i < this.ioGroups.length; i++) {
	                if (group === this.ioGroups[i]) {
	                    index = i;
	                    break;
	                }
	            }
	        }
	        if (index !== -1) {
	            this.ioGroups.splice(index, 1);
	        }
        } else {
            var s = [];
            s.push("ERROR! BaseInteractiveObject.removeGroup() - ");
            s.push("argument must be string");
            throw new Error(s.join(""));
        }
    }
    /**
     * Removes a flag.
     * @param flag the flag
     */
	BaseInteractiveObject.prototype.removeIOFlag = function(flag) {
        if (flag !== undefined
        		&& flag !== null
        		&& !isNaN(flag)
	            && parseInt(Number(flag)) === flag
        		&& flag && (flag & (flag - 1)) === 0) {
        	this.ioFlags &= ~flag;
        } else {
            var s = [];
            s.push("ERROR! BaseInteractiveObject.removeIOFlag() - ");
            s.push("flag must be power of 2");
            throw new Error(s.join(""));
        }
    }
    /**
     * Removes an active spell.
     * @param id the spell's id
     */
	BaseInteractiveObject.prototype.removeSpellOn = function(id) {
	    if (id !== undefined
	    		&& id !== null
	    		&& !isNaN(id)
	            && parseInt(Number(id)) === id
	            && !isNaN(parseInt(id, 10))) {
	        var index = 0;
	        for (len = this.spellsOn.length; index < len; index++) {
	            if (this.spellsOn[index] === id) {
	                break;
	            }
	        }
	        if (index < this.spellsOn.length) {
	            this.spellsOn.splice(index, 1);
	        } else {
	            // spell id was never found
	            // nothing to remove
	        }
	    } else {
            s.push("ERROR! BaseInteractiveObject.removeSpellOn() - ");
            s.push("argument must be integer");
            throw new Error(s.join(""));
	    }
    }
    /**
     * Removes a type flag.
     * @param flag the flag
     */
	BaseInteractiveObject.prototype.removeTypeFlag = function(flag) {
    	try {
    		this.checkPowerOfTwo(flag);
    	} catch (err) {
            var s = [];
            s.push("ERROR! BaseInteractiveObject.removeTypeFlag() - flag ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	this.typeFlags &= ~flag;
    }
    /**
     * Sets the {@link BaseInteractiveObject}'s armor material.
     * @param val the new value
     */
	BaseInteractiveObject.prototype.setArmormaterial = function(val) {
    	try {
    		this.checkStringNullsAllowed(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! BaseInteractiveObject.setArmormaterial() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		this.armormaterial = val;
    }
    /**
     * Sets the value of the this.damageSum.
     * @param val the new value to set
     */
	BaseInteractiveObject.prototype.setDamageSum = function(val) {
    	try {
    		this.checkFloat(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! BaseInteractiveObject.setDamageSum() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        this.damageSum = val;
    }
    /**
     * Sets the initial this.position.
     * @param val the this.position to set
     */
	BaseInteractiveObject.prototype.setInitPosition = function(val) {
        if (val !== undefined) {
        	if (val === null) {
        		this.initPosition = val;
        	} else if (val instanceof SimpleVector2) {
        		this.initPosition = val;	        	
        	} else {
	            var s = [];
	            s.push("ERROR! BaseInteractiveObject.setInitPosition() - ");
	            s.push("argument must be SimpleVector2");
	            throw new Error(s.join(""));
        	}
        } else {
            var s = [];
            s.push("ERROR! BaseInteractiveObject.setInitPosition() - ");
            s.push("requires 1 argument");
            throw new Error(s.join(""));
        }
    }
    /**
     * Sets the IO's this.inventory.
     * @param data the this.inventory to set
     */
	BaseInteractiveObject.prototype.setInventory = function(val) {
    	var InventoryData = require("com/dalonedrow/rpg/base/flyweights/inventorydata");
	    if (val !== undefined
	    		&& val !== null
	    		&& val instanceof InventoryData) {
	        this.inventory = val;
	        this.inventory.setIo(this);
	    } else {
            var s = [];
            s.push("ERROR! BaseInteractiveObject.setInventory() - ");
            s.push("argument must be InventoryData");
            throw new Error(s.join(""));
	    }
    }
    /**
     * Sets {@link ITEM} data for the {@link BaseInteractiveObject}.
     * @param data the new {@link ITEM}
     */
	BaseInteractiveObject.prototype.setItemData = function(data) {
    	var IOItemData = require("com/dalonedrow/rpg/base/flyweights/ioitemdata");
        if (data !== undefined) {
        	if (data === null) {
		        this.itemData = data;
        	} else if (data instanceof IOItemData) {
		        this.itemData = data;
	            if (this.itemData.getIo() === null) {
	                this.itemData.setIo(this);
	            } else if (this.itemData.getIo().this.refId !== this.refId) {
	                this.itemData.setIo(this);
	            }
        	} else {
	            var s = [];
	            s.push("ERROR! BaseInteractiveObject.setItemData() - ");
	            s.push("argument must be IOItemData");
	            throw new Error(s.join(""));
        	}
        } else {
            var s = [];
            s.push("ERROR! BaseInteractiveObject.setItemData() - ");
            s.push("requires 1 argument");
            throw new Error(s.join(""));
        }
    }
    /**
     * Sets the value of the this.level.
     * @param this.level the new value to set
     */
	BaseInteractiveObject.prototype.setLevel = function(val) {
	    if (val !== undefined
	    		&& val !== null
	    		&& !isNaN(val)
	            && parseInt(Number(val)) === val
	            && !isNaN(parseInt(val, 10))) {
	        this.level = val;
	    } else {
            var s = [];
            s.push("ERROR! BaseInteractiveObject.setLevel() - ");
            s.push("argument must be integer");
            throw new Error(s.join(""));
	    }
    }
    /**
     * Sets the this.mainevent
     * @param val the this.mainevent to set
     */
	BaseInteractiveObject.prototype.setMainevent = function(val) {
        if (val !== undefined) {
        	if (val === null) {
        		this.mainevent = val;
        	} else if (typeof val === "string") {
        		this.mainevent = val;	        	
        	} else {
	            var s = [];
	            s.push("ERROR! BaseInteractiveObject.setMainevent() - ");
	            s.push("argument must be string");
	            throw new Error(s.join(""));
        	}
        } else {
            var s = [];
            s.push("ERROR! BaseInteractiveObject.setMainevent() - ");
            s.push("requires 1 argument");
            throw new Error(s.join(""));
        }
    }
    /**
     * Sets NPC data for the {@link BaseInteractiveObject}.
     * @param data the new item data
     */
	BaseInteractiveObject.prototype.setNPCData = function(data) {
    	var IoNpcData = require("com/dalonedrow/rpg/base/flyweights/ionpcdata");
        if (data !== undefined) {
        	if (data === null) {
        		this.npcData = data;
        	} else if (data instanceof IoNpcData) {
        		this.npcData = data;
	            if (this.npcData.getIo() === null) {
	            	this.npcData.setIo(this);
	            } else if (this.npcData.getIo().this.refId !== this.refId) {
	            	this.npcData.setIo(this);
	            }
        	} else {
	            var s = [];
	            s.push("ERROR! BaseInteractiveObject.setNPCData() - ");
	            s.push("argument must be IoNpcData");
	            throw new Error(s.join(""));
        	}
        } else {
            var s = [];
            s.push("ERROR! BaseInteractiveObject.setNPCData() - ");
            s.push("requires 1 argument");
            throw new Error(s.join(""));
        }
    }
    /**
     * Sets the this.overscript.
     * @param val the this.overscript to set
     */
	BaseInteractiveObject.prototype.setOverscript = function(val) {
    	var Scriptable = require("com/dalonedrow/rpg/base/flyweights/scriptable");
        if (val !== undefined) {
        	if (val === null) {
        		this.overscript = val;
        	} else if (val instanceof Scriptable) {
        		this.overscript = val;
        	} else {
	            var s = [];
	            s.push("ERROR! BaseInteractiveObject.setOverscript() - ");
	            s.push("argument must be Scriptable");
	            throw new Error(s.join(""));
        	}
        } else {
            var s = [];
            s.push("ERROR! BaseInteractiveObject.setOverscript() - ");
            s.push("requires 1 argument");
            throw new Error(s.join(""));
        }
    }
    /**
     * Sets item data for the {@link BaseInteractiveObject}.
     * @param data the new pc data
     */
	BaseInteractiveObject.prototype.setPCData = function(data) {
    	var IoPcData = require("com/dalonedrow/rpg/base/flyweights/iopcdata");
        if (data !== undefined) {
        	if (data === null) {
        		this.pcData = data;
        	} else if (data instanceof IoPcData) {
        		this.pcData = data;
	            if (this.pcData.getIo() === null) {
	            	this.pcData.setIo(this);
	            } else if (this.pcData.getIo().this.refId !== this.refId) {
	            	this.pcData.setIo(this);
	            }
        	} else {
	            var s = [];
	            s.push("ERROR! BaseInteractiveObject.setPCData() - ");
	            s.push("argument must be IoPcData");
	            throw new Error(s.join(""));
        	}
        } else {
            var s = [];
            s.push("ERROR! BaseInteractiveObject.setPCData() - ");
            s.push("requires 1 argument");
            throw new Error(s.join(""));
        }
    }
    /**
     * Sets the value of the this.poisonCharges.
     * @param this.poisonCharges the new value to set
     */
	BaseInteractiveObject.prototype.setPoisonCharges = function(val) {
	    if (val !== undefined
	    		&& val !== null
	    		&& !isNaN(val)
	            && parseInt(Number(val)) === val
	            && !isNaN(parseInt(val, 10))) {
	    	this.poisonCharges = val;
	    } else {
            var s = [];
            s.push("ERROR! BaseInteractiveObject.setPoisonCharges() - ");
            s.push("argument must be integer");
            throw new Error(s.join(""));
	    }
    }
    /**
     * Sets the value of the this.poisonLevel.
     * @param val the new value to set
     */
	BaseInteractiveObject.prototype.setPoisonLevel = function(val) {
	    if (val !== undefined
	    		&& val !== null
	    		&& !isNaN(val)
	            && parseInt(Number(val)) === val
	            && !isNaN(parseInt(val, 10))) {
	    	this.poisonLevel = val;
	    } else {
            var s = [];
            s.push("ERROR! BaseInteractiveObject.setPoisonLevel() - ");
            s.push("argument must be integer");
            throw new Error(s.join(""));
	    }
    }
    /**
     * Sets the this.position.
     * @param val the this.position to set
     */
	BaseInteractiveObject.prototype.setPosition = function(val) {
        if (val !== undefined) {
        	if (val === null) {
        		this.position = val;
        	} else if (val instanceof SimpleVector2) {
        		this.position = val;	        	
        	} else {
	            var s = [];
	            s.push("ERROR! BaseInteractiveObject.setPosition() - ");
	            s.push("argument must be SimpleVector2");
	            throw new Error(s.join(""));
        	}
        } else {
            var s = [];
            s.push("ERROR! BaseInteractiveObject.setPosition() - ");
            s.push("requires 1 argument");
            throw new Error(s.join(""));
        }
    }
    /**
     * Sets the this.script.
     * @param this.script the this.script to set
     */
	BaseInteractiveObject.prototype.setScript = function(val) {
    	var Scriptable = require("com/dalonedrow/rpg/base/flyweights/scriptable");
        if (val !== undefined
        		&& val !== null
        		&& val instanceof Scriptable) {
	        this.script = val;
	        val.setIO(this);
    	} else {
            var s = [];
            s.push("ERROR! BaseInteractiveObject.setScript() - ");
            s.push("argument must be Scriptable");
            throw new Error(s.join(""));
    	}
    }
    /**
     * Sets the flag indicating if the item is loaded by this.script.
     * @param val the flag to set
     */
	BaseInteractiveObject.prototype.setScriptLoaded = function(val) {
	    if (val !== undefined
	    		&& val !== null
	    		&& typeof val === "boolean") {
	        this.scriptLoaded = val;
	    } else {
            var s = [];
            s.push("ERROR! BaseInteractiveObject.setScriptLoaded() - ");
            s.push("argument must be boolean");
            throw new Error(s.join(""));
	    }
    }
    /**
     * Sets the this.show status.
     * @param val the this.show status to set
     */
	BaseInteractiveObject.prototype.setShow = function(val) {
	    if (val !== undefined
	    		&& val !== null
	    		&& !isNaN(val)
	            && parseInt(Number(val)) === val
	            && !isNaN(parseInt(val, 10))) {
	    	this.show = val;
	    } else {
            var s = [];
            s.push("ERROR! BaseInteractiveObject.setShow() - ");
            s.push("argument must be integer");
            throw new Error(s.join(""));
	    }
    }
	BaseInteractiveObject.prototype.setSparkNBlood = function(val) {
	    if (val !== undefined
	    		&& val !== null
	    		&& !isNaN(val)
	            && parseInt(Number(val)) === val
	            && !isNaN(parseInt(val, 10))) {
	    	this.sparkNBlood = val;
	    } else {
            var s = [];
            s.push("ERROR! BaseInteractiveObject.setSparkNBlood() - ");
            s.push("argument must be integer");
            throw new Error(s.join(""));
	    }
    }
    /**
     * Sets the this.statCount
     * @param val the this.statCount to set
     */
	BaseInteractiveObject.prototype.setStatCount = function(val) {
	    if (val !== undefined
	    		&& val !== null
	    		&& !isNaN(val)
	            && parseInt(Number(val)) === val
	            && !isNaN(parseInt(val, 10))) {
	    	this.statCount = val;
	    } else {
            var s = [];
            s.push("ERROR! BaseInteractiveObject.setStatCount() - ");
            s.push("argument must be integer");
            throw new Error(s.join(""));
	    }
    }
    /**
     * Sets the this.statSent
     * @param val the this.statSent to set
     */
	BaseInteractiveObject.prototype.setStatSent = function(val) {
	    if (val !== undefined
	    		&& val !== null
	    		&& !isNaN(val)
	            && parseInt(Number(val)) === val
	            && !isNaN(parseInt(val, 10))) {
	    	this.statSent = val;
	    } else {
            var s = [];
            s.push("ERROR! BaseInteractiveObject.setStatSent() - ");
            s.push("argument must be integer");
            throw new Error(s.join(""));
	    }
    }
    /**
     * Sets the value of the this.summoner.
     * @param val the new value to set
     */
	BaseInteractiveObject.prototype.setSummoner = function(val) {
    	try {
    		this.checkInteger(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! BaseInteractiveObject.setSummoner() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	this.summoner = val;
    }
    /**
     * Sets the this.target.
     * @param val the this.target to set
     */
	BaseInteractiveObject.prototype.setTarget = function(val) {
    	try {
    		this.checkInstanceOfNullsAllowed(val, SimpleVector3);
    	} catch (err) {
            var s = [];
            s.push("ERROR! BaseInteractiveObject.setTarget() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        this.target = val;
    }
    /**
     * Sets the this.targetinfo.
     * @param val the this.targetinfo to set
     */
	BaseInteractiveObject.prototype.setTargetinfo = function(val) {
    	try {
    		this.checkInteger(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! BaseInteractiveObject.setTargetinfo() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	this.targetinfo = val;
    }
    /**
     * Sets the {@link BaseInteractiveObject}'s weapon material.
     * @param val the new value
     */
	BaseInteractiveObject.prototype.setWeaponmaterial = function(val) {
    	try {
    		this.checkStringNullsAllowed(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! BaseInteractiveObject.setWeaponmaterial() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		this.weaponmaterial = val;
    }
	return BaseInteractiveObject;
});
