/**
 * Stores and executes actions associated with a {@link ScriptTimer}.
 * @author drau
 */
define(["com/dalonedrow/utils/hashcode"], function(Hashcode) {
    function ScriptTimerAction(o, m, a) {
		Hashcode.call(this);
		/**
		 * the argument list supplied to the {@link Method} being invoked. can be
		 * null.
		 */
		var args = null;
		/** if true, the {@link ScriptTimerAction} has an existing action. */
		var exists	= false;
		/** the {@link Method} invoked on the associated {@link Object}. */
		var method;
		/** the {@link Object} associated with the {@link ScriptTimerAction}. */
		var object;
		if (o === undefined
				|| m === undefined
				|| a === undefined) {
			throw new Error("ScriptTimerAction() requires 3 arguments");
		}
		exists = true;
		object = o;
		method = m;
		args = a;
		/** Clears the action without processing. */
		this.clear = function() {
			exists = false;
			object = null;
			method = null;
			args = null;
		}
		this.getArguments = function() {
			return args;
		}
		this.getMethod = function() {
			return method;
		}
		this.getObject = function() {
			return object;
		}
		/**
		 * Determines if the {@link ScriptTimerAction} has an existing action.
		 * @return <tt>true</tt> if the {@link ScriptTimerAction} has an existing
		 *         action; <tt>false</tt> otherwise
		 */
		this.exists = function() {
			return exists;
		}
		/**
		 * Process the associated action.
		 * @if an error occurs
		 */
		this.process = function() {
			if (exists) {
				exists = false;
				object[method](args);
			}
		}
		/**
		 * Sets a new action to process.
		 * @param o the object having the action applied
		 * @param m the method invoked
		 * @param a any arguments supplied to the method
		 */
		this.set = function() {
			if (arguments.length === 1
					&& arguments[0] !== null
					&& arguments[0] instanceof ScriptTimerAction) {
				exists = true;
				object = arguments[0].getObject();
				method = arguments[0].getMethod();
				args = arguments[0].getArguments();
			} else if (arguments.length === 3) {
				if (arguments[0] === undefined
						|| arguments[1] === undefined
						|| arguments[2] === undefined
						|| arguments[0] === null
						|| arguments[1] === null
						|| arguments[2] === null) {
					throw new Error("ScriptTimerAction.set() requires 3 arguments");
				}
				exists = true;
				object = arguments[0];
				method = arguments[1];
				args = arguments[2];
			} else {
				throw new Error("ScriptTimerAction.set() requires 1 or 3 arguments");
			}
		}
	}
    ScriptTimerAction.prototype = Object.create(Hashcode.prototype);
	return ScriptTimerAction;
});
