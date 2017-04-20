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
		        window[obj.internal_script]();
				try {
					method.invoke(object, args);
				} catch (IllegalAccessException | IllegalArgumentException
						| InvocationTargetException e) {
					throw new RPGException(ErrorMessage.INTERNAL_ERROR, e);
				}
			}
		}
		/**
		 * Sets a new action to process.
		 * @param o the object having the action applied
		 * @param m the method invoked
		 * @param a any arguments supplied to the method
		 */
		this.set = function(final Object o, final Method m, final Object[] a) {
			exists = true;
			object = o;
			method = m;
			args = a;
		}
		/**
		 * Sets a new action to process.
		 * @param action the new action to process
		 */
		this.set(final ScriptTimerAction action) {
			exists = true;
			object = action.object;
			method = action.method;
			args = action.args;
		}
	}
    ScriptTimerAction.prototype = Object.create(Hashcode.prototype);
	return ScriptTimerAction;
});
