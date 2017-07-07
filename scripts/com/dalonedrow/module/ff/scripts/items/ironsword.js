/**
 * 
 */
define(["com/dalonedrow/module/ff/scripts/items/weaponscript"], function(WeaponScript) {
	function IronSword(io) {
		WeaponScript.call(this, io);
	}
	IronSword.prototype = Object.create(WeaponScript.prototype);
    return IronSword;
});
