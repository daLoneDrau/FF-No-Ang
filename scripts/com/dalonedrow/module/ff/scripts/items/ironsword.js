/**
 * 
 */
define(["com/dalonedrow/module/ff/scripts/items/weaponscript"], function(WeaponScript) {
	function IronSword(io) {
		WeaponScript.call(this, io);
        this.oldOnInit = WeaponScript.prototype.onInit;		
	}
	IronSword.prototype = Object.create(WeaponScript.prototype);
	IronSword.prototype.onInit = function() {
        // set local variables
        this.setLocalVariable("reagent", "none");
        this.setLocalVariable("poisonable", 1);
        return this.oldOnInit();
    };
    return IronSword;
});
