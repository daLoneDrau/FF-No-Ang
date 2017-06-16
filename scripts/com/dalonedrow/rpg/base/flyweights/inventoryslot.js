/**
 * 
 */
define(["require", "com/dalonedrow/utils/watchable"], function(require, Watchable) {
    function InventorySlot() {
	    Watchable.call(this);
	    /** the item occupying the inventory slot. */
	    this.io = null;
	    /** a flag indicating the item is showing and should be rendered. */
	    this.show = false;
	}
	InventorySlot.prototype = Object.create(Watchable.prototype);
    /**
     * Gets the item occupying the inventory slot.
     * @return {@link IO}
     */
	InventorySlot.prototype.getIo = function() {
        return this.io;
    }
    /**
     * Gets the flag indicating the item is showing and should be rendered.
     * @return <code>boolean</code>
     */
	InventorySlot.prototype.isShow = function() {
        return this.show;
    }
    /**
     * Sets the item occupying the inventory slot.
     * @param val the val to set
     */
	InventorySlot.prototype.setIo = function(val) {
    	var BaseInteractiveObject =
    		require("com/dalonedrow/rpg/base/flyweights/baseinteractiveobject");
    	try {
    		this.checkInstanceOfNullsAllowed(val, BaseInteractiveObject);
    	} catch (err) {
            var s = [];
            s.push("ERROR! InventorySlot.setIo() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        this.io = val;
        this.notifyWatchers();
    }
    /**
     * Sets the flag indicating the item is showing and should be rendered.
     * @param flag the show to set
     */
	InventorySlot.prototype.setIsShow = function(flag) {
    	try {
    		this.checkBoolean(flag);
    	} catch (err) {
            var s = [];
            s.push("ERROR! InventorySlot.setIsShow() - flag ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        this.show = flag;
        this.notifyWatchers();
    }
	return InventorySlot;
});
