define(["com/dalonedrow/rpg/base/flyweights/baseinteractiveobject",
	"com/dalonedrow/utils/hashcode"], function(BaseInteractiveObject, Hashcode) {
    function StackedEvent() {
		Hashcode.call(this);
		/** the event name. */
		this.eventname = null;
		/** flag indicating whether the event still exists. */
		this.exist = false;
		/** the IO associated with the event. */
		this.io = null;
		/** the event message. */
		this.msg = 0;
		/** the event parameters. */
		this.params = null;
		/** the event sender. */
		this.sender = null;
    }
	StackedEvent.prototype = Object.create(Hashcode.prototype);
	/**
	 * Gets the flag indicating whether the event still exists.
	 * @return <code>boolean</code>
	 */
	StackedEvent.prototype.exists = function() {
		return this.exist;
	}
	/**
	 * Gets the event name.
	 * @return {@link String}
	 */
	StackedEvent.prototype.getEventname = function() {
		return this.eventname;
	}
	/**
	 * Gets the IO associated with the event.
	 * @return {@link IO}
	 */
	StackedEvent.prototype.getIo = function() {
		return this.io;
	}
	/**
	 * Gets the event message.
	 * @return {@link int}
	 */
	StackedEvent.prototype.getMsg = function() {
		return this.msg;
	}
	/**
	 * Gets the event parameters.
	 * @return {@link Object}[]
	 */
	StackedEvent.prototype.getParams = function() {
		return this.params;
	}
	/**
	 * Gets the event sender.
	 * @return {@link IO}
	 */
	StackedEvent.prototype.getSender = function() {
		return this.sender;
	}
	/**
	 * Sets the event name.
	 * @param val the eventname to set
	 */
	StackedEvent.prototype.setEventname = function(val) {
    	try {
    		this.checkStringNullsAllowed(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! StackedEvent.setEventname() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		this.eventname = val;
	}
	/**
	 * Sets the flag indicating whether the event still exists.
	 * @param val the exist to set
	 */
	StackedEvent.prototype.setExists = function(val) {
    	try {
    		this.checkBoolean(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! StackedEvent.setExists() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	this.exist = val;
	}
	/**
	 * Sets the IO associated with the event.
	 * @param val the io to set
	 */
	StackedEvent.prototype.setIo = function(val) {
    	try {
    		this.checkInstanceOfNullsAllowed(val, BaseInteractiveObject);
    	} catch (err) {
            var s = [];
            s.push("ERROR! StackedEvent.setIo() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		this.io = val;
	}
	/**
	 * Sets the event message.
	 * @param val the msg to set
	 */
	StackedEvent.prototype.setMsg = function(val) {
    	try {
    		this.checkInteger(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! StackedEvent.setMsg() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	this.msg = val;
	}
	/**
	 * Sets the event parameters.
	 * @param val the params to set
	 */
	StackedEvent.prototype.setParams = function(val) {
    	try {
    		this.checkArray(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! StackedEvent.setParams() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	this.params = val;
	}
	/**
	 * Sets the event sender.
	 * @param val the sender to set
	 */
	StackedEvent.prototype.setSender = function(val) {
    	try {
    		this.checkInstanceOfNullsAllowed(val, BaseInteractiveObject);
    	} catch (err) {
            var s = [];
            s.push("ERROR! StackedEvent.setIo() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	this.sender = val;
	}
	StackedEvent.prototype = Object.create(Hashcode.prototype);
	return StackedEvent;
});
