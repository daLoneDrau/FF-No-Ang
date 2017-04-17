function FFScriptable(io) {
	Scriptable.call(this, io);
    /**
     * Bashing a door.
     * @return {link int}
     * @throws RPGException if an error occurs
     */
    this.onBashDoor = function() {
        return ScriptConstants.ACCEPT;
    }
    /**
     * Entering the dungeon.
     * @return {link int}
     * @throws RPGException if an error occurs
     */
    this.onEnterDungeon = function() {
        return ScriptConstants.ACCEPT;
    }
    /**
     * Entering a room.
     * @return {link int}
     * @throws RPGException if an error occurs
     */
    this.onEnterRoom = function() {
        return ScriptConstants.ACCEPT;
    }
    /**
     * Exiting a room.
     * @return {link int}
     * @throws RPGException if an error occurs
     */
    this.onExitRoom = function() {
        return ScriptConstants.ACCEPT;
    }
    /**
     * IO was hit.
     * @return {link int}
     * @throws RPGException if an error occurs
     */
    this.onHit = function() {
        return ScriptConstants.ACCEPT;
    }
}
FFScriptable.prototype = Object.create(Scriptable.prototype);
