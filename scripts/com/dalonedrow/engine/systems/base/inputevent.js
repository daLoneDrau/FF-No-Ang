/**
 * Simple Tile class, module with no dependencies.
 * @author DaLoneDrow
 */
define(["require", "com/dalonedrow/utils/hashcode"],
		function(require, Hashcode) {
    var InputEvent = function(type, params) {
		Hashcode.call(this);
		try {
    		this.checkInteger(type);
    	} catch (err) {
            var s = [];
            s.push("ERROR! InputEvent() - type ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		try {
    		this.checkArray(params);
    	} catch (err) {
            var s = [];
            s.push("ERROR! InputEvent() - value ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		this.type = type;
		this.keycode;
		switch (this.type) {
		case InputEvent.KEY_TYPE:
			this.keycode = params[0];
			break;
		case InputEvent.CLICK_TYPE:
			this.rightClick = params[0];
			this.target = params[1];
			break;
			default:
            var s = [];
            s.push("ERROR! InputEvent() - unrecognized event type ");
            s.push(type);
            throw new Error(s.join(""));				
		}
    }
    InputEvent.KEY_TYPE = 0;
    InputEvent.CLICK_TYPE = 1;
    InputEvent.prototype = Object.create(Hashcode.prototype);
    /**
     * Gets the event type, key or click.
     * @return int
     */
    InputEvent.prototype.getType = function() {
		return this.type;
    }
	return InputEvent;
});
