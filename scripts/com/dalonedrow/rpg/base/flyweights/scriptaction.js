/**
 * 
 */
define(["com/dalonedrow/utils/hashcode"], function(Hashcode) {
    function ScriptAction() {
		Hashcode.call(this);
	}
    ScriptAction.prototype = Object.create(Hashcode.prototype);
	return ScriptAction;
});
