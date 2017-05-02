/**
 * 
 */
define(["com/dalonedrow/engine/systems/base/interactive",
	"com/dalonedrow/engine/systems/base/projectconstants",
	'com/dalonedrow/module/ff/constants/ffequipmentelements',
	"com/dalonedrow/module/ff/rpg/ffinteractiveobject",
	"com/dalonedrow/rpg/base/constants/equipmentglobals"], function(Interactive, ProjectConstants,
			FFEquipmentElements, FFInteractiveObject, EquipmentGlobals) {
    function FFController() {
    	ProjectConstants.call(this);
	    this.godMode = false;
	    /** flag indicating whether menus are on. */
	    this.menusOn = true;
	    /** the player IO's id. */
	    this.playerId = -1;
    }
    FFController.prototype = Object.create(ProjectConstants.prototype);
    FFController.prototype.isGodMode = function() {
        return godMode;
    }
    /**
     * @param godMode the godMode to set
     */
    FFController.prototype.setIsGodMode = function(val) {
    	try {
    		this.checkBoolean(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! FFController.setGodMode() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        this.godMode = val;
    }
    /**
     * Gets the height of a console.
     * @return {@link int}
     */
    FFController.prototype.getConsoleHeight = function() {
        return 30;
    }
    /**
     * Gets the width of a console.
     * @return {@link int}
     */
    FFController.prototype.getConsoleWidth = function() {
        return 100;
    }
    /**
     * Gets the index of the equipment element for damage.
     * @return {@link int}
     */
    FFController.prototype.getDamageElementIndex = function() {
        return FFEquipmentElements.ELEMENT_DAMAGE.getIndex();
    }
    /**
     * Gets the maximum number of equipment slots.
     * @return {@link int}
     */
    FFController.prototype.getMaxEquipped = function() {
        // TODO Auto-generated method stub
        return EquipmentGlobals.MAX_EQUIPPED;
    }
    /**
     * Gets the maximum number of spells.
     * @return {@link int}
     */
    FFController.prototype.getMaxSpells = function() {
        // TODO Auto-generated method stub
        return 0;
    }
    FFController.prototype.getNumberEquipmentElements = function() {
        return FFEquipmentElements.getNumberOfValues();
    }
    /**
     * Gets the reference id of the player.
     * @return {@link int}
     * @if an error occurs
     */
    FFController.prototype.getPlayer = function() {
        return this.playerId;
    }
    FFController.prototype.getPlayerIO = function() {
        return Interactive.getInstance().getIO(this.playerId);
    }
    FFController.prototype.isGameOver = function() {
        return false;
    }
    /**
     * @return the menusOn
     */
    FFController.prototype.isMenusOn = function() {
        return this.menusOn;
    }
    /**
     * @param menusOn the menusOn to set
     */
    FFController.prototype.setMenusOn = function(val) {
    	try {
    		this.checkBoolean(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! FFController.setMenusOn() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        this.menusOn = val;
    }
    /**
     * @param val the value to set
     */
    FFController.prototype.setPlayer = function(val) {
    	try {
    		this.checkInteger(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! FFController.setPlayer() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	this.playerId = val;
    }
    FFController.prototype.update = function() {
        // TODO Auto-generated method stub

    }
    return FFController;
});
