define(["com/dalonedrow/rpg/base/flyweights/scriptable",
	"com/dalonedrow/rpg/base/constants/scriptglobals"], function(Scriptable, ScriptGlobals) {
	function FFScriptable(io) {
		Scriptable.call(this, io);
	}
	FFScriptable.prototype = Object.create(Scriptable.prototype);
    /**
     * Bashing a door.
     * @return {link int}
     * @throws RPGException if an error occurs
     */
	FFScriptable.prototype.onBashDoor = function() {
        return ScriptGlobals.ACCEPT;
    }
    /**
     * Entering the dungeon.
     * @return {link int}
     * @throws RPGException if an error occurs
     */
	FFScriptable.prototype.onEnterDungeon = function() {
        return ScriptGlobals.ACCEPT;
    }
    /**
     * Entering a room.
     * @return {link int}
     * @throws RPGException if an error occurs
     */
	FFScriptable.prototype.onEnterRoom = function() {
        return ScriptGlobals.ACCEPT;
    }
    /**
     * Exiting a room.
     * @return {link int}
     * @throws RPGException if an error occurs
     */
	FFScriptable.prototype.onExitRoom = function() {
        return ScriptGlobals.ACCEPT;
    }
    /**
     * IO was hit.
     * @return {link int}
     * @throws RPGException if an error occurs
     */
	FFScriptable.prototype.onHit = function() {
        return ScriptGlobals.ACCEPT;
    }
	return FFScriptable;
});
