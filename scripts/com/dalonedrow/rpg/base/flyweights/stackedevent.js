define(["com/dalonedrow/rpg/base/flyweights/baseinteractiveobject",
	"com/dalonedrow/utils/hashcode"], function(BaseInteractiveObject, Hashcode) {
    function StackedEvent() {
		Hashcode.call(this);
		/** the event name. */
		var eventname = null;
		/** flag indicating whether the event still exists. */
		var exist = false;
		/** the IO associated with the event. */
		var io = null;
		/** the event message. */
		var msg = 0;
		/** the event parameters. */
		var params = null;
		/** the event sender. */
		var sender = null;
		/**
		 * Gets the flag indicating whether the event still exists.
		 * @return <code>boolean</code>
		 */
		this.exists = function() {
			return exist;
		}
		/**
		 * Gets the event name.
		 * @return {@link String}
		 */
		this.getEventname = function() {
			return eventname;
		}
		/**
		 * Gets the IO associated with the event.
		 * @return {@link IO}
		 */
		this.getIo = function() {
			return io;
		}
		/**
		 * Gets the event message.
		 * @return {@link int}
		 */
		this.getMsg = function() {
			return msg;
		}
		/**
		 * Gets the event parameters.
		 * @return {@link Object}[]
		 */
		this.getParams = function() {
			return params;
		}
		/**
		 * Gets the event sender.
		 * @return {@link IO}
		 */
		this.getSender = function() {
			return sender;
		}
		/**
		 * Sets the event name.
		 * @param val the eventname to set
		 */
		this.setEventname = function(val) {
	        if (val !== undefined) {
	        	if (val === null) {
	        		eventname = val;
	        	} else if (typeof val === "string") {
	        		eventname = val;	        	
	        	} else {
		            var s = [];
		            s.push("ERROR! StackedEvent.setEventname() - ");
		            s.push("argument must be string");
		            throw new Error(s.join(""));
	        	}
	        } else {
	            var s = [];
	            s.push("ERROR! StackedEvent.setEventname() - ");
	            s.push("requires 1 argument");
	            throw new Error(s.join(""));
	        }
		}
		/**
		 * Sets the flag indicating whether the event still exists.
		 * @param val the exist to set
		 */
		this.setExists = function(val) {
		    if (val !== undefined
		    		&& val !== null
		    		&& typeof val === "boolean") {
		    	exist = val;
		    } else {
	            var s = [];
	            s.push("ERROR! StackedEvent.setExist() - ");
	            s.push("argument must be boolean");
	            throw new Error(s.join(""));
		    }
		}
		/**
		 * Sets the IO associated with the event.
		 * @param val the io to set
		 */
		this.setIo = function(val) {
	        if (val === undefined) {
	            var s = [];
	            s.push("ERROR! StackedEvent.setIo() - ");
	            s.push("requires 1 argument");
	            throw new Error(s.join(""));
	        }
	        if (val === null) {
				io = val;
	        } else if (val instanceof BaseInteractiveObject) {
				io = val;
        	} else {
	            var s = [];
	            s.push("ERROR! StackedEvent.setIo() - ");
	            s.push("argument must be BaseInteractiveObject");
	            throw new Error(s.join(""));
        	}
		}
		/**
		 * Sets the event message.
		 * @param val the msg to set
		 */
		this.setMsg = function(val) {
		    if (val !== undefined
		    		&& val !== null
		    		&& !isNaN(val)
		            && parseInt(Number(val)) === val
		            && !isNaN(parseInt(val, 10))) {
		    	msg = val;
		    } else {
	            var s = [];
	            s.push("ERROR! StackedEvent.setMsg() - ");
	            s.push("argument must be integer");
	            throw new Error(s.join(""));
		    }
		}
		/**
		 * Sets the event parameters.
		 * @param val the params to set
		 */
		this.setParams = function(val) {
		    if (val !== undefined
		    		&& val !== null
		    		&& Array.isArray(val)) {
		    	params = val;
		    } else {
	            var s = [];
	            s.push("ERROR! StackedEvent.setParams() - ");
	            s.push("argument must be Array");
	            throw new Error(s.join(""));
		    }
		}
		/**
		 * Sets the event sender.
		 * @param val the sender to set
		 */
		this.setSender = function(val) {
	        if (val === undefined) {
	            var s = [];
	            s.push("ERROR! StackedEvent.setSender() - ");
	            s.push("requires 1 argument");
	            throw new Error(s.join(""));
	        }
	        if (val === null) {
	        	sender = val;
	        } else if (val instanceof BaseInteractiveObject) {
	        	sender = val;
        	} else {
	            var s = [];
	            s.push("ERROR! StackedEvent.setSender() - ");
	            s.push("argument must be BaseInteractiveObject");
	            throw new Error(s.join(""));
        	}
		}
	}
	StackedEvent.prototype = Object.create(Hashcode.prototype);
	return StackedEvent;
});
