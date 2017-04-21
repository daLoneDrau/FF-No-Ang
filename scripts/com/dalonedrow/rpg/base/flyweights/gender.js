/**
 * 
 */
define(["com/dalonedrow/utils/hashcode"], function(Hashcode) {
    function Gender() {
		Hashcode.call(this);
	}
    Gender.prototype = Object.create(Hashcode.prototype);
	return Gender;
});
