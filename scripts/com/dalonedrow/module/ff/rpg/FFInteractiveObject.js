/**
 * 
 */
define(['com/dalonedrow/rpg/base/constants/ioglobals', 'com/dalonedrow/rpg/base/flyweights/baseinteractiveobject'],
		function(IOGlobals, BaseInteractiveObject) {
	function FFInteractiveObject(id) {
		BaseInteractiveObject.call(this, id);
	    /** door data. */
	    var doorData = null;
	    /** room data. */
	    var roomData = null;
	    this.setInventory(new FFInventory());
	    this.getInventory().setIo(this);
	    this.setItemData(new FFItem());
	    /**
	     * Gets the door data.
	     * @return {@link FFDoorData}
	     */
	    this.getDoorData = function() {
	        return doorData;
	    }
	    /**
	     * Gets the room data.
	     * @return {@link FFRoomData}
	     */
	    this.getRoomData = function() {
	        return roomData;
	    }
	    /**
	     * Sets the door data.
	     * @param data the {@link FFDoorData} data
	     */
	    this.setDoorData = function(data) {
	        doorData = data;
	    }
	    var oldSetPosition = this.setPosition;
	    this.setPosition = function(val) {
	        if (this.hasIOFlag(IoGlobals.IO_01_PC)) {
	            // this is the player
	        	var room = FFWorldMap.getInstance().getRoomByCellCoordinates(val);
	        	var oldRoom = FFWorldMap.getInstance().getRoomByCellCoordinates(this.getPosition());
	            if (oldRoom !== null
	                    && room.getId() !== oldRoom.getId()) {
	                // player is entering different room
	                // send event
	                Script.getInstance().sendIOScriptEvent(
	                		this, 0, [ "tmp_int1", room.getId() ], "EnterRoom");
	            }
	            room.setVisited(true);
	            room = null;
	            oldRoom = null;
	        }
	        oldSetPosition(val);
	    }
	    /**
	     * Sets the room data.
	     * @param data the {@link FFRoomData} data
	     */
	    this.setRoomData = function(data) {
	        roomData = data;
	    }
	}
	FFInteractiveObject.prototype = Object.create(BaseInteractiveObject.prototype);
	return FFInteractiveObject;
});
