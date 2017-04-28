define(["com/dalonedrow/engine/sprite/base/simplevector2",
	//"com/dalonedrow/module/ff/graph/ffroomnode",
	//"com/dalonedrow/module/ff/graph/ffworldmap",
	"com/dalonedrow/rpg/base/constants/ioglobals",
	"com/dalonedrow/rpg/base/flyweights/baseinteractiveobject",
	"com/dalonedrow/rpg/base/systems/script",
	"com/dalonedrow/module/ff/rpg/ffitem",
	"com/dalonedrow/module/ff/rpg/ffinventory",
	"com/dalonedrow/module/ff/rpg/ffcharacter",
	"com/dalonedrow/module/ff/rpg/ffnpc",
	"com/dalonedrow/module/ff/rpg/ffscriptable"
	], function(SimpleVector2, 
			//FFRoomNode, FFWorldMap,
			IoGlobals, BaseInteractiveObject, Script,
			FFItem, FFInventory, FFCharacter, FFNpc, FFScriptable
			) {
	function FFInteractiveObject(ioid) {
		BaseInteractiveObject.call(this, ioid);
	    /** door data. */
	    this.doorData = null;
	    /** room data. */
	    this.roomData = null;
        this.setInventory(new FFInventory());
        this.getInventory().setIo(this);
        this.setItemData(new FFItem());
        this.oldSetPosition = BaseInteractiveObject.prototype.setPosition;
	}
	FFInteractiveObject.prototype = Object.create(BaseInteractiveObject.prototype);
    /**
     * Gets the door data.
     * @return {@link FFDoorData}
     */
	FFInteractiveObject.prototype.getDoorData = function() {
        return this.doorData;
    }
    /**
     * Gets the room data.
     * @return {@link FFRoomData}
     */
	FFInteractiveObject.prototype.getRoomData = function() {
        return this.roomData;
    }
    /**
     * Sets the door data.
     * @param data the {@link FFDoorData} data
     */
	FFInteractiveObject.prototype.setDoorData = function(val) {
	    if (val === undefined
	    		|| val === null
	    		|| !(val instanceof FFDoorData)) {
            var s = [];
            s.push("ERROR! FFInteractiveObject.setDoorData() - ");
            s.push("argument must be FFDoorData");
            throw new Error(s.join(""));
	    }
        this.doorData = val;
    }
    /**
     * {@inheritDoc}
     * @throws RPGException
     */
	FFInteractiveObject.prototype.setPosition = function(val) {
	    if (val === undefined
	    		|| val === null
	    		|| !(val instanceof SimpleVector2)) {
            var s = [];
            s.push("ERROR! FFInteractiveObject.setPosition() - ");
            s.push("argument must be SimpleVector2");
            throw new Error(s.join(""));
	    }
        if (this.hasIOFlag(IoGlobals.IO_01_PC)) {
            // this is the player
            var room = FFWorldMap.getInstance().getRoomByCellCoordinates(val);
            var oldRoom = FFWorldMap.getInstance().getRoomByCellCoordinates(this.getPosition());
            if (oldRoom !== null
                    && room.getId() !== oldRoom.getId()) {
                // player is entering different room
                // send event
                Script.getInstance().sendIOScriptEvent(
                		this, 0, ["tmp_int1", room.getId()], "EnterRoom");
            }
            room.setVisited(true);
            room = null;
            oldRoom = null;
        }
        this.oldSetPosition(val);
    }
    /**
     * Sets the room data.
     * @param data the {@link FFRoomData} data
     */
	FFInteractiveObject.prototype.setRoomData = function(val) {
	    if (val === undefined
	    		|| val === null
	    		|| !(val instanceof FFRoomData)) {
            var s = [];
            s.push("ERROR! FFInteractiveObject.setRoomData() - ");
            s.push("argument must be FFRoomData");
            throw new Error(s.join(""));
	    }
        this.roomData = val;
    }
	return FFInteractiveObject;
});
