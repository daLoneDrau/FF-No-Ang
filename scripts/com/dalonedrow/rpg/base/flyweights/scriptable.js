define(["require", "com/dalonedrow/engine/sprite/base/simplevector2",
	"com/dalonedrow/engine/systems/base/interactive",
	"com/dalonedrow/engine/systems/base/projectconstants",
	"com/dalonedrow/rpg/base/constants/scriptglobals",
	"com/dalonedrow/rpg/base/flyweights/baseinteractiveobject",
	"com/dalonedrow/rpg/base/flyweights/behaviourparameters",
	"com/dalonedrow/rpg/base/flyweights/scriptaction",
	"com/dalonedrow/rpg/base/flyweights/scriptvariable", "com/dalonedrow/utils/hashcode"],
	function(require, SimpleVector2, Interactive, ProjectConstants, ScriptGlobals,
			BaseInteractiveObject, BehaviourParameters, ScriptAction, ScriptVariable, Hashcode) {
	function Scriptable(ioInstance) {
	    Hashcode.call(this);
	    /** bit flag storing which events are allowed. */
	    this.allowedEvent = 0;
	    /** the list of actions for an event. */
	    this.eventActions = {};
	    /** the this.io associated with this script. */
	    this.io = null;
    	var BaseInteractiveObject =
    		require("com/dalonedrow/rpg/base/flyweights/baseinteractiveobject");
    	if (ioInstance !== undefined
    			&& ioInstance !== null) {
    		if (ioInstance instanceof BaseInteractiveObject) {
    			this.io = ioInstance;
    		} else {
    			throw new Error(
    					"Scriptable() - constructor argument must be BaseInteractiveObject");
    		}
    	} else {
			throw new Error(
					"Scriptable() - constructor argument must be BaseInteractiveObject");
		}
	    /** the array of local {@link ScriptVariable}s. */
	    this.lvar = [];
	    /** the this.master script. */
	    this.master = null;
	    /** the list of script this.timers. */
	    this.timers = [];
	    for (var i = ScriptGlobals.MAX_SCRIPTTIMERS - 1; i >= 0; i--) {
	    	this.timers.push(0);
	    }
	}
	Scriptable.prototype = Object.create(Hashcode.prototype);
    /**
     * Adds a local variable.
     * @param svar the local variable
     */
	Scriptable.prototype.addLocalVariable = function(svar) {
        if (svar !== undefined
        		&& svar !== null
        		&& svar instanceof ScriptVariable) {
	    	var index = -1;
	        for (var i = 0; i < this.lvar.length; i++) {
	            if (this.lvar[i] === null) {
	                this.lvar[i] = svar;
	                index = i;
	                break;
	            }
	        }
	        if (index === -1) {
	            this.lvar.push(svar);
	        }
    	} else {
            var s = [];
            s.push("ERROR! Scriptable.addLocalVariable() - ");
            s.push("argument must be ScriptVariable");
            throw new Error(s.join(""));
    	}
    }
    /**
     * Adds a {@link ScriptAction} to the list of actions for an event.
     * @param eventID the event ID - usually the script message #
     * @param action the script action
     */
	Scriptable.prototype.addScriptAction = function(eventID, action) {
    	if (eventID !== undefined
    			&& action !== undefined) {
		    if (eventID === null
		    		|| isNaN(eventID)
		            || parseInt(Number(eventID)) !== eventID
		            || isNaN(parseInt(eventID, 10))) {
	            var s = [];
	            s.push("ERROR! Scriptable.addScriptAction() - ");
	            s.push("eventID must be integer");
	            throw new Error(s.join(""));
		    }
		    if (action === null
		    		|| !(action instanceof ScriptAction)) {
	            var s = [];
	            s.push("ERROR! Scriptable.addScriptAction() - ");
	            s.push("action must be ScriptAction");
	            throw new Error(s.join(""));
		    }
	        if (this.eventActions[eventID] === null) {
	            this.eventActions[eventID] = [];
	        }
            action.setScript(this);
            this.eventActions[eventID].push(action);
    	} else {
            var s = [];
            s.push("ERROR! Scriptable.addScriptAction() - ");
            s.push("requires 2 arguments");
            throw new Error(s.join(""));
    	}
    }
    /**
     * Assigns a bit flag for an allowed event.
     * @param event the event flag
     */
	Scriptable.prototype.assignDisallowedEvent = function(flag) {
        if (flag !== undefined
        		&& flag !== null
        		&& !isNaN(flag)
	            && parseInt(Number(flag)) === flag
        		&& flag && (flag & (flag - 1)) === 0) {
	        this.allowedEvent |= flag;
        } else {
            var s = [];
            s.push("ERROR! Scriptable.assignDisallowedEvent() - ");
            s.push("flag must be power of 2");
            throw new Error(s.join(""));
        }
    }
    /**
     * Changes the this.io's behavior.
     * @param params the behavior parameters
     */
	Scriptable.prototype.behavior = function(params) {
        if (params !== undefined
        		&& params !== null
        		&& params instanceof BehaviourParameters) {
	        if (this.io.hasIOFlag(IoGlobals.IO_03_NPC)) {
	            if ("STACK" === params.getAction().toUpperCase()) {
	                this.io.getNPCData().ARX_NPC_Behaviour_Stack();
	            } else if ("UNSTACK" === params.getAction().toUpperCase()) {
	                this.io.getNPCData().ARX_NPC_Behaviour_UnStack();
	            } else if ("UNSTACKALL" === params.getAction().toUpperCase()) {
	                this.io.getNPCData().resetBehavior();
	            } else {
	                this.io.getNPCData().ARX_NPC_Behaviour_Change(params.getFlags(),
	                		params.getBehaviorParam());
	                if (params.getMovemode() > -1) {
	                    this.io.getNPCData().setMovemode(params.getMovemode());
	                }
	                if (params.getTactics() > -1) {
	                    this.io.getNPCData().setTactics(params.getTactics());
	                }
	                if (params.getTargetInfo() !== -1) {
	                    this.io.setTargetinfo(params.getTargetInfo());
	                }
	            }
	        }
    	} else {
            var s = [];
            s.push("ERROR! Scriptable.behavior() - ");
            s.push("argument must be BehaviourParameters");
            throw new Error(s.join(""));
    	}
    }
    /** Clears the bit flags for allowed events. */
	Scriptable.prototype.clearDisallowedEvents = function() {
        this.allowedEvent = 0;
    }
    /**
     * Clears a local variable assigned to the {@link Scriptable}.
     * @param varName the variable's name
     */
	Scriptable.prototype.clearLocalVariable = function(varName) {
        if (varName !== undefined
        		&& varName !== null
        		&& typeof varName === "string") {
	        for (var i = this.lvar.length - 1; i >= 0; i--) {
	            if (this.lvar[i] !== null
	                    && this.lvar[i].getName() !== null
	                    && this.lvar[i].getName() === varName) {
	                this.lvar[i].clear();
		            this.lvar[i] = null;
		            break;
	            }
	        }
        } else {
            var s = [];
            s.push("ERROR! Scriptable.clearLocalVariable() - ");
            s.push("requires 1 argument");
            throw new Error(s.join(""));
        }
    }
    /** Clears all local variables assigned to the {@link Scriptable}. */
	Scriptable.prototype.clearLocalVariables = function() {
        for (var i = this.lvar.length - 1; i >= 0; i--) {
            if (this.lvar[i] !== null) {
                this.lvar[i].clear();
            }
            this.lvar[i] = null;
        }
    }
    /**
     * Gets all event actions for a scripted event.
     * @param eventID the event ID - usually the script message #
     * @return {@link ScriptAction}[]
     */
	Scriptable.prototype.getEventActions = function(eventID) {
	    if (eventID !== undefined
	    		&& eventID !== null
	    		&& !isNaN(eventID)
	            && parseInt(Number(eventID)) === eventID
	            && !isNaN(parseInt(eventID, 10))) {
	        if (this.eventActions[eventID] === null) {
	            this.eventActions[eventID] = [];
	        }
	        return this.eventActions[eventID];
	    } else {
            var s = [];
            s.push("ERROR! Scriptable.getEventActions() - ");
            s.push("argument must be integer");
            throw new Error(s.join(""));
	    }
    }
    /**
     * Gets the this.io associated with this script.
     * @return {@link this.io}
     */
	Scriptable.prototype.getIO = function() {
        return this.io;
    }
    /**
     * Gets the local floating-point array value assigned to a specific
     * variable.
     * @param name the variable name
     * @return {@link String}
     * @throws PooledException if one occurs
     * @if no such variable was assigned
     */
	Scriptable.prototype.getLocalFloatArrayVariableValue = function(name) {
        if (name !== undefined
        		&& name !== null
        		&& typeof name === 'string') {
	        if (this.lvar === null) {
	        	this.lvar = [];
	        }
	        var index = -1;
	        for (var i = 0; i < this.lvar.length; i++) {
	            if (this.lvar[i] !== null
	                    && this.lvar[i].getName() === name
	                    && this.lvar[i].getType() === ScriptGlobals.TYPE_L_11_FLOAT_ARR) {
	                index = i;
	                break;
	            }
	        }
	        if (index === -1) {
	            throw new Error(["Local Float Array variable ", name, " was never set."].join(""));
	        }
	        return this.lvar[index].getFloatArrayVal();
        } else {
            var s = [];
            s.push("ERROR! Scriptable.getLocalFloatArrayVariableValue() - ");
            s.push("requires 1 argument");
            throw new Error(s.join(""));
        }
    }
    /**
     * Gets the local floating-point value assigned to a specific variable.
     * @param name the variable name
     * @return {@link String}
     * @throws PooledException if one occurs
     * @if no such variable was assigned
     */
	Scriptable.prototype.getLocalFloatVariableValue = function(name) {
        if (name !== undefined
        		&& name !== null
        		&& typeof name === 'string') {
	        if (this.lvar === null) {
	        	this.lvar = [];
	        }
	        var index = -1;
	        for (var i = 0; i < this.lvar.length; i++) {
	            if (this.lvar[i] !== null
	                    && this.lvar[i].getName() === name
	                    && this.lvar[i].getType() === ScriptGlobals.TYPE_L_10_FLOAT) {
	                index = i;
	                break;
	            }
	        }
	        if (index === -1) {
	            throw new Error(["Local Float variable ", name, " was never set."].join(""));
	        }
	        return this.lvar[index].getFloatVal();
        } else {
            var s = [];
            s.push("ERROR! Scriptable.getLocalFloatVariableValue() - ");
            s.push("requires 1 argument");
            throw new Error(s.join(""));
        }
    }
    /**
     * Gets the local integer array value assigned to a specific variable.
     * @param name the variable name
     * @return {@link String}
     * @throws PooledException if one occurs
     * @if no such variable was assigned
     */
	Scriptable.prototype.getLocalIntArrayVariableValue = function(name) {
        if (name !== undefined
        		&& name !== null
        		&& typeof name === 'string') {
	        if (this.lvar === null) {
	            this.lvar = [];
	        }
	        var index = -1;
	        for (var i = 0; i < this.lvar.length; i++) {
	            if (this.lvar[i] !== null
	                    && this.lvar[i].getName() === name
	                    && this.lvar[i].getType() === ScriptGlobals.TYPE_L_13_INT_ARR) {
	                index = i;
	                break;
	            }
	        }
	        if (index === -1) {
	            throw new Error(["Local Int Array variable ", name, " was never set."].join(""));
	        }
	        return this.lvar[index].getIntArrayVal();
        } else {
            var s = [];
            s.push("ERROR! Scriptable.getLocalIntArrayVariableValue() - ");
            s.push("requires 1 argument");
            throw new Error(s.join(""));
        }
    }
    /**
     * Gets the local integer value assigned to a specific variable.
     * @param name the variable name
     * @return {@link String}
     * @if no such variable was assigned
     */
	Scriptable.prototype.getLocalIntVariableValue = function(name) {
        if (name !== undefined
        		&& name !== null
        		&& typeof name === 'string') {
	        if (this.lvar === null) {
	            this.lvar = [];
	        }
	        var index = -1;
	        for (var i = 0; i < this.lvar.length; i++) {
	            if (this.lvar[i] !== null
	                    && this.lvar[i].getName() === name
	                    && this.lvar[i].getType() === ScriptGlobals.TYPE_L_12_INT) {
	                index = i;
	                break;
	            }
	        }
	        if (index === -1) {
	            throw new Error(["Local Int variable ", name, " was never set."].join(""));
	        }
	        return this.lvar[index].getIntVal();
        } else {
            var s = [];
            s.push("ERROR! Scriptable.getLocalIntVariableValue() - ");
            s.push("requires 1 argument");
            throw new Error(s.join(""));
        }
    }
    /**
     * Gets the local long integer value assigned to a specific variable.
     * @param name the variable name
     * @return {@link String}
     * @throws PooledException if one occurs
     * @if no such variable was assigned
     */
	Scriptable.prototype.getLocalLongArrayVariableValue = function(name) {
        if (name !== undefined
        		&& name !== null
        		&& typeof name === 'string') {
	        if (this.lvar === null) {
	            this.lvar = [];
	        }
	        var index = -1;
	        for (var i = 0; i < this.lvar.length; i++) {
	            if (this.lvar[i] !== null
	                    && this.lvar[i].getName() === name
	                    && this.lvar[i].getType() === ScriptGlobals.TYPE_L_15_LONG_ARR) {
	                index = i;
	                break;
	            }
	        }
	        if (index === -1) {
	            throw new Error(["Local Long Array variable ", name, " was never set."].join(""));
	        }
	        return this.lvar[index].getLongArrayVal();
        } else {
            var s = [];
            s.push("ERROR! Scriptable.getLocalLongArrayVariableValue() - ");
            s.push("requires 1 argument");
            throw new Error(s.join(""));
        }
    }
    /**
     * Gets the local long integer value assigned to a specific variable.
     * @param name the variable name
     * @return {@link String}
     * @throws PooledException if one occurs
     */
	Scriptable.prototype.getLocalLongVariableValue = function(name) {
        if (name !== undefined
        		&& name !== null
        		&& typeof name === 'string') {
	        if (this.lvar === null) {
	            this.lvar = [];
	        }
	        var index = -1;
	        for (var i = 0; i < this.lvar.length; i++) {
	            if (this.lvar[i] !== null
	                    && this.lvar[i].getName() === name
	                    && this.lvar[i].getType() === ScriptGlobals.TYPE_L_14_LONG) {
	                index = i;
	                break;
	            }
	        }
	        if (index === -1) {
	            throw new Error(["Local Long variable ", name, " was never set."].join(""));
	        }
	        return this.lvar[index].getLongVal();
        } else {
            var s = [];
            s.push("ERROR! Scriptable.getLocalLongVariableValue() - ");
            s.push("requires 1 argument");
            throw new Error(s.join(""));
        }
    }
    /**
     * Gets the local text array value assigned to a specific variable.
     * @param name the variable name
     * @return {@link String}
     * @if no such variable was assigned
     */
	Scriptable.prototype.getLocalStringArrayVariableValue = function(name) {
        if (name !== undefined
        		&& name !== null
        		&& typeof name === 'string') {
	        if (this.lvar === null) {
	            this.lvar = [];
	        }
	        var index = -1;
	        for (var i = 0; i < this.lvar.length; i++) {
	            if (this.lvar[i] !== null
	                    && this.lvar[i].getName() === name
	                    && this.lvar[i].getType() === ScriptGlobals.TYPE_L_09_TEXT_ARR) {
	                index = i;
	                break;
	            }
	        }
	        if (index === -1) {
	            throw new Error(["Local String Array variable ", name, " was never set."].join(""));
	        }
	        return this.lvar[index].getTextArrayVal();
        } else {
            var s = [];
            s.push("ERROR! Scriptable.getLocalStringArrayVariableValue() - ");
            s.push("requires 1 argument");
            throw new Error(s.join(""));
        }
    }
    /**
     * Gets the local text value assigned to a specific variable.
     * @param name the variable name
     * @return {@link String}
     * @if no such variable was assigned
     */
	Scriptable.prototype.getLocalStringVariableValue = function(name) {
        if (name !== undefined
        		&& name !== null
        		&& typeof name === 'string') {
	        if (this.lvar === null) {
	            this.lvar = [];
	        }
	        var index = -1;
	        for (var i = 0; i < this.lvar.length; i++) {
	            if (this.lvar[i] !== null
	                    && this.lvar[i].getName() === name
	                    && this.lvar[i].getType() === ScriptGlobals.TYPE_L_08_TEXT) {
	                index = i;
	                break;
	            }
	        }
	        if (index === -1) {
	            throw new Error(["Local String variable ", name, " was never set."].join(""));
	        }
	        return this.lvar[index].getText();
        } else {
            var s = [];
            s.push("ERROR! Scriptable.getLocalStringVariableValue() - ");
            s.push("requires 1 argument");
            throw new Error(s.join(""));
        }
    }
    /**
     * Gets the length of the local variable array.
     * @return int
     */
	Scriptable.prototype.getLocalVarArrayLength = function() {
        if (this.lvar === null) {
            this.lvar = [];
        }
        return this.lvar.length;
    }
    /**
     * Gets a local {@link Scriptable} variable.
     * @param index the index of the variable
     * @return {@link ScriptVariable}
     */
	Scriptable.prototype.getLocalVariable = function(varid) {
        if (varid === undefined
        		|| varid === null) {
            var s = [];
            s.push("ERROR! Scriptable.getLocalVariable() - ");
            s.push("requires 1 argument");
            throw new Error(s.join(""));
        }
        var svar = null;
        if (typeof varid === 'string') {
            for (var i = this.lvar.length - 1; i >= 0; i--) {
                if (this.lvar[i] !== null
                        && this.lvar[i].getName() !== null
                        && this.lvar[i].getName() === varid) {
                    svar = this.lvar[i];
                    break;
                }
            }
        } else if (!isNaN(varid)
	            && parseInt(Number(varid)) === varid
	            && !isNaN(parseInt(varid, 10))) {
            if (varid >= 0
                    && varid < this.lvar.length) {
                svar = this.lvar[varid];
            }	        	
        }
        return svar;
    }
    /**
     * Gets the this.master script.
     * @return {@link Scriptable<this.io>}
     */
	Scriptable.prototype.getMaster = function() {
        return this.master;
    }
	Scriptable.prototype.getTargetPos = function(io, smoothing) {
        if (io === undefined
        		|| io === null) {
            return;
        }
    	var BaseInteractiveObject = require("com/dalonedrow/rpg/base/flyweights/baseinteractiveobject");
        if (!(io instanceof BaseInteractiveObject)) {
            var s = [];
            s.push("ERROR! Scriptable.getTargetPos() - ");
            s.push("this.io must be BaseInteractiveObject");
            throw new Error(s.join(""));
        }
	    if (smoothing === undefined
	    		|| smoothing === null
	    		|| isNaN(smoothing)
	            || parseInt(Number(smoothing)) !== smoothing) {
            var s = [];
            s.push("ERROR! Scriptable.getTargetPos() - ");
            s.push("smoothing must be long integer");
            throw new Error(s.join(""));
	    }

        if (io.hasIOFlag(IoGlobals.IO_03_NPC)) {
            if (io.getNPCData().hasBehavior(BehaviourGlobals.BEHAVIOUR_NONE)) {
                io.getTarget().setX(this.io.getPosition().getX());
                io.getTarget().setY(this.io.getPosition().getY());
                io.getTarget().setZ(0);
                return;
            }
            if (io.getNPCData().hasBehavior(BehaviourGlobals.BEHAVIOUR_GO_HOME)) {
                if (io.getNPCData().getPathfinding().getListPosition()
                		< io.getNPCData().getPathfinding().getListnb()) {
                	var pos = io.getNPCData().getPathfinding().getListItem(
                			io.getNPCData().getPathfinding().getListPosition());
                    // this.io.getTarget().setX(ACTIVEBKG->anchors[pos].pos.x;
                    // this.io.getTarget().setY(ACTIVEBKG->anchors[pos].pos.y;
                    // this.io.getTarget().setZ(ACTIVEBKG->anchors[pos].pos.z;
                    return;
                }
                io.getTarget().setX(this.io.getInitPosition().getX());
                io.getTarget().setY(this.io.getInitPosition().getY());
                io.getTarget().setZ(0);
                return;
            }
            if (io.hasIOFlag(IoGlobals.IO_03_NPC)
                    && io.getNPCData().getPathfinding().getListnb() !== -1
                    && io.getNPCData().getPathfinding().hasList()
                    && !io.getNPCData().hasBehavior(BehaviourGlobals.BEHAVIOUR_FRIENDLY)) {
                // Targeting Anchors !
                if (io.getNPCData().getPathfinding().getListPosition()
                		< io.getNPCData().getPathfinding().getListnb()) {
                	var pos = io.getNPCData().getPathfinding().getListItem(
                            io.getNPCData().getPathfinding().getListPosition());
                    // this.io.getTarget().setX(ACTIVEBKG->anchors[pos].pos.x;
                    // this.io.getTarget().setY(ACTIVEBKG->anchors[pos].pos.y;
                    // this.io.getTarget().setZ(ACTIVEBKG->anchors[pos].pos.z;
                } else if (Interactive.getInstance().hasIO(
                        io.getNPCData().getPathfinding().getTruetarget())) {
                	var ioo = Interactive.getInstance().getIO(
                			io.getNPCData().getPathfinding().getTruetarget());
                    io.getTarget().setX(ioo.getPosition().getX());
                    io.getTarget().setY(ioo.getPosition().getY());
                    io.getTarget().setZ(0);
                }
                return;
            }
        }
        if (io.getTargetinfo() === ScriptGlobals.TARGET_PATH) {
            // if (this.io->usepath === NULL)
            // {
            // this.io->target.x = this.io->pos.x;
            // this.io->target.y = this.io->pos.y;
            // this.io->target.z = this.io->pos.z;
            // return;
            // }

            // ARX_USE_PATH * aup = (ARX_USE_PATH *)this.io->usepath;
            // aup->_curtime += smoothing + 100;
            // EERIE_3D tp;
            // long wp = ARX_PATHS_Interpolate(aup, &tp);

            // if (wp < 0)
            // {
            // if (this.io->ioflags & IO_CAMERA)
            // this.io->_camdata->cam.lastinfovalid = FALSE;
            // }
            // else
            // {

            // this.io->target.x = tp.x;
            // this.io->target.y = tp.y;
            // this.io->target.z = tp.z;

            // }

            // return;
        }

        if (io.getTargetinfo() === ScriptGlobals.TARGET_NONE) {
            io.getTarget().setX(io.getPosition().getX());
            io.getTarget().setY(io.getPosition().getY());
            io.getTarget().setZ(0);
            return;
        }
        if (io.getTargetinfo() === ScriptGlobals.TARGET_PLAYER
                || io.getTargetinfo() === -1) {
        	var player = Interactive.getInstance().getIO(
        			ProjectConstants.getInstance().getPlayer());
            io.getTarget().setX(player.getPosition().getX());
            io.getTarget().setY(player.getPosition().getY());
            io.getTarget().setZ(0);
            player = null;
            return;
        } else {
            if (Interactive.getInstance().hasIO(this.io.getTargetinfo())) {
            	var tio = Interactive.getInstance().getIO(this.io.getTargetinfo());
            	var pos = new SimpleVector2();
                if (Interactive.getInstance().GetItemWorldPosition(tio, pos)) {
                    io.getTarget().setX(pos.getX());
                    io.getTarget().setY(pos.getY());
                    io.getTarget().setZ(0);
                    return;
                }
                io.getTarget().setX(tio.getPosition().getX());
                io.getTarget().setY(tio.getPosition().getY());
                io.getTarget().setZ(0);
                return;
            }
        }
        io.getTarget().setX(io.getPosition().getX());
        io.getTarget().setY(io.getPosition().getY());
        io.getTarget().setZ(0);
    }
    /**
     * Gets a specific script timer's reference id.
     * @param index the timer's index
     * @return {@link int}
     */
	Scriptable.prototype.getTimer = function(val) {
	    if (val !== undefined
	    		&& val !== null
	    		&& !isNaN(val)
	            && parseInt(Number(val)) === val
	            && !isNaN(parseInt(val, 10))) {
	        return this.timers[val];
	    } else {
            var s = [];
            s.push("ERROR! Scriptable.getTimer() - ");
            s.push("argument must be integer");
            throw new Error(s.join(""));
	    }
    }
    /**
     * Shorthand method to get the type variable.
     * @return {@link String}
     * @if an error occurs
     */
	Scriptable.prototype.getType = function() {
        return this.getLocalStringVariableValue("type");
    }
    /**
     * Determines if the {@link InteractiveObject} allows a specific event.
     * @param event the event flag
     * @return true if the object has the event set; false otherwise
     */
	Scriptable.prototype.hasAllowedEvent = function(flag) {
        if (flag !== undefined
        		&& flag !== null
        		&& !isNaN(flag)
	            && parseInt(Number(flag)) === flag
        		&& flag && (flag & (flag - 1)) === 0) {
	        return (this.allowedEvent & flag) === flag;
        } else {
            var s = [];
            s.push("ERROR! Scriptable.hasAllowedEvent() - ");
            s.push("flag must be power of 2");
            throw new Error(s.join(""));
        }
    }
    /**
     * Determines if a {@link ScriptObject} has local variable with a specific
     * name.
     * @param name the variable name
     * @return <tt>true</tt> if the {@link ScriptObject} has the local variable;
     *         <tt>false</tt> otherwise
     */
	Scriptable.prototype.hasLocalVariable = function(val) {
        if (val !== undefined
        		&& val !== null
        		&& typeof val === "string") {
	        return this.getLocalVariable(val) !== null;
        } else {
            var s = [];
            s.push("ERROR! Scriptable.hasLocalVariable() - ");
            s.push("requires 1 argument");
            throw new Error(s.join(""));
        }
    }
    /**
     * Determines if a {@link ScriptObject} has local variables assigned to it.
     * @return true if the {@link ScriptObject} has local variables; false
     *         otherwise
     */
	Scriptable.prototype.hasLocalVariables = function() {
        var has = false;
        for (var i = this.lvar.length - 1; i >= 0; i--) {
            if (this.lvar[i] !== null) {
                has = true;
                break;
            }
        }
        return has;
    }
    /**
     * Shorthand method to determine if the type variable matches a specific
     * type.
     * @param val the type
     * @return {@link boolean}
     * @if an error occurs
     */
	Scriptable.prototype.isType = function(val) {
        if (val !== undefined
        		&& val !== null
        		&& typeof val === "string") {
	        return this.getLocalStringVariableValue("type") === val;
        } else {
            var s = [];
            s.push("ERROR! Scriptable.hasLocalVariable() - ");
            s.push("requires 1 argument");
            throw new Error(s.join(""));
        }
    }
    /**
     * Script run when the {@link Scriptable} is added to a party.
     * @return {@link int}
     * @when an error occurs
     */
	Scriptable.prototype.onAddToParty = function() {
        return ScriptGlobals.ACCEPT;
    }
    /**
     * Script run when the {@link Scriptable} is a target of aggression.
     * @return {@link int}
     * @when an error occurs
     */
	Scriptable.prototype.onAggression = function() {
        return ScriptGlobals.ACCEPT;
    }
	Scriptable.prototype.onAttackPlayer = function() {
        return ScriptGlobals.ACCEPT;
    }
	Scriptable.prototype.onCallHelp = function() {
        return ScriptGlobals.ACCEPT;
    }
    /**
     * On this.io chat start.
     * @return <code>int</code>
     * @if an error occurs
     */
	Scriptable.prototype.onChat = function() {
        return ScriptGlobals.ACCEPT;
    }
	Scriptable.prototype.onCheatDie = function() {
        return ScriptGlobals.ACCEPT;
    }
	Scriptable.prototype.onCollideDoor = function() {
        return ScriptGlobals.ACCEPT;
    }
	Scriptable.prototype.onCollideNPC = function() {
        return ScriptGlobals.ACCEPT;
    }
	Scriptable.prototype.onCollisionError = function() {
        return ScriptGlobals.ACCEPT;
    }
    /**
     * On this.io combine.
     * @return <code>int</code>
     * @if an error occurs
     */
	Scriptable.prototype.onCombine = function() {
        return ScriptGlobals.ACCEPT;
    }
	Scriptable.prototype.onControlsOff = function() {
        return ScriptGlobals.ACCEPT;
    }
	Scriptable.prototype.onControlsOn = function() {
        return ScriptGlobals.ACCEPT;
    }
	Scriptable.prototype.onDelation = function() {
        return ScriptGlobals.ACCEPT;
    }
	Scriptable.prototype.onDetectPlayer = function() {
        return ScriptGlobals.ACCEPT;
    }
    /**
     * On this.io dies.
     * @return <code>int</code>
     * @if an error occurs
     */
	Scriptable.prototype.onDie = function() {
        return ScriptGlobals.ACCEPT;
    }
	Scriptable.prototype.onDoorLocked = function() {
        return ScriptGlobals.ACCEPT;
    }
    /**
     * On this.io equipped.
     * @return <code>int</code>
     * @if an error occurs
     */
	Scriptable.prototype.onEquip = function() {
        return ScriptGlobals.ACCEPT;
    }
	Scriptable.prototype.onFleeEnd = function() {
        return ScriptGlobals.ACCEPT;
    }
	Scriptable.prototype.onGameReady = function() {
        return ScriptGlobals.ACCEPT;
    }
	Scriptable.prototype.onHear = function() {
        return ScriptGlobals.ACCEPT;
    }
    /**
     * On this.io hit.
     * @return <code>int</code>
     * @if an error occurs
     */
	Scriptable.prototype.onHit = function() {
        return ScriptGlobals.ACCEPT;
    }
    /**
     * On this.io attempt to identify.
     * @return <code>int</code>
     * @if an error occurs
     */
	Scriptable.prototype.onIdentify = function() {
        return ScriptGlobals.ACCEPT;
    }
    /**
     * On this.io initialization.
     * @return <code>int</code>
     * @if an error occurs
     */
	Scriptable.prototype.onInit = function() {
        return ScriptGlobals.ACCEPT;
    }
    /**
     * On this.io initialization end.
     * @return <code>int</code>
     * @if an error occurs
     */
	Scriptable.prototype.onInitEnd = function() {
        return ScriptGlobals.ACCEPT;
    }
    /**
     * On this.io closes inventory.
     * @return <code>int</code>
     * @if an error occurs
     */
	Scriptable.prototype.onInventoryClose = function() {
        return ScriptGlobals.ACCEPT;
    }
    /**
     * On this.io goes into inventory.
     * @return <code>int</code>
     * @if an error occurs
     */
	Scriptable.prototype.onInventoryIn = function() {
        return ScriptGlobals.ACCEPT;
    }
    /**
     * On this.io opens inventory.
     * @return <code>int</code>
     * @if an error occurs
     */
	Scriptable.prototype.onInventoryOpen = function() {
        return ScriptGlobals.ACCEPT;
    }
    /**
     * On this.io comes out of inventory.
     * @return <code>int</code>
     * @if an error occurs
     */
	Scriptable.prototype.onInventoryOut = function() {
        return ScriptGlobals.ACCEPT;
    }
    /**
     * On this.io is used inside inventory.
     * @return <code>int</code>
     * @if an error occurs
     */
	Scriptable.prototype.onInventoryUse = function() {
        return ScriptGlobals.ACCEPT;
    }
	Scriptable.prototype.onLoad = function() {
        return ScriptGlobals.ACCEPT;
    }
	Scriptable.prototype.onLookFor = function() {
        return ScriptGlobals.ACCEPT;
    }
	Scriptable.prototype.onLookMe = function() {
        return ScriptGlobals.ACCEPT;
    }
    /**
     * On this.io traveling on the game map.
     * @return <code>int</code>
     * @if an error occurs
     */
	Scriptable.prototype.onMovement = function() {
        return ScriptGlobals.ACCEPT;
    }
    /**
     * On this.io ouch.
     * @return <code>int</code>
     * @if an error occurs
     */
	Scriptable.prototype.onOuch = function() {
        return ScriptGlobals.ACCEPT;
    }
	Scriptable.prototype.onPlayerEnemy = function() {
        return ScriptGlobals.ACCEPT;
    }
	Scriptable.prototype.onReachedTarget = function() {
        return ScriptGlobals.ACCEPT;
    }
	Scriptable.prototype.onReload = function() {
        return ScriptGlobals.ACCEPT;
    }
    /**
     * Causes an NPC to
     * @return
     * @throws RPGException
     */
	Scriptable.prototype.onSpeakNoRepeat = function() {
        return ScriptGlobals.ACCEPT;
    }
	Scriptable.prototype.onSpellcast = function() {
        return ScriptGlobals.ACCEPT;
    }
	Scriptable.prototype.onSteal = function() {
        return ScriptGlobals.ACCEPT;
    }
    /**
     * On this.io successfully strikes a target.
     * @return {@link int}
     * @if an error occurs
     */
	Scriptable.prototype.onStrike = function() {
        return ScriptGlobals.ACCEPT;
    }
	Scriptable.prototype.onTargetDeath = function() {
        return ScriptGlobals.ACCEPT;
    }
	Scriptable.prototype.onUndetectPlayer = function() {
        return ScriptGlobals.ACCEPT;
    }
    /**
     * On this.io unequipped.
     * @return <code>int</code>
     * @if an error occurs
     */
	Scriptable.prototype.onUnequip = function() {
        return ScriptGlobals.ACCEPT;
    }
    /**
     * Removed an event from the list of allowed events.
     * @param event the event flag
     */
	Scriptable.prototype.removeDisallowedEvent = function(flag) {
        if (flag !== undefined
        		&& flag !== null
        		&& !isNaN(flag)
	            && parseInt(Number(flag)) === flag
        		&& flag && (flag & (flag - 1)) === 0) {
	        this.allowedEvent = this.allowedEvent & ~flag;
        } else {
            var s = [];
            s.push("ERROR! Scriptable.removeDisallowedEvent() - ");
            s.push("flag must be power of 2");
            throw new Error(s.join(""));
        }
    }
	Scriptable.prototype.onOtherReflection = function() {
        return ScriptGlobals.ACCEPT;
    }
	Scriptable.prototype.onMiscReflection = function() {
        return ScriptGlobals.ACCEPT;
    }
	Scriptable.prototype.onPathfinderFailure = function() {
        return ScriptGlobals.ACCEPT;
    }
	Scriptable.prototype.onSpellEnd = function() {
        return ScriptGlobals.ACCEPT;
    }
    /**
     * Sets the this.master script.
     * @param script the script to set
     */
	Scriptable.prototype.setMaster = function(script) {
	    if (script != undefined
	    		&& script !== null
	    		&& script instanceof Scriptable) {
	        this.master = script;
	    } else {
            var s = [];
            s.push("ERROR! Scriptable.setMaster() - ");
            s.push("argument must be Scriptable");
            throw new Error(s.join(""));
	    }
    }
    /**
     * Sets the this.io associated with this script.
     * @param val the this.io to set
     */
	Scriptable.prototype.setIO = function(val) {
    	var BaseInteractiveObject =
    		require("com/dalonedrow/rpg/base/flyweights/baseinteractiveobject");
	    if (val !== undefined
	    		&& val !== null
	    		&& val instanceof BaseInteractiveObject) {
	        this.io = val;
	    } else {
            var s = [];
            s.push("ERROR! Scriptable.setIo() - ");
            s.push("argument must be BaseInteractiveObject");
            throw new Error(s.join(""));
	    }
    }
    /**
     * Sets a local {@link ScriptVariable}.
     * @param index the index of the variable
     * @param svar the local {@link ScriptVariable}
     * @throws PooledException if one occurs
     * @if no such variable was assigned
     */
	Scriptable.prototype.setLocalVariable = function() {
        if (this.lvar === null) {
        	this.lvar = [];
        }
    	var svar;
    	if (arguments.length === 2) {
	        if (arguments[0] === null
	        		|| typeof arguments[0] !== "string") {
	            var s = [];
	            s.push("ERROR! Scriptable.setLocalVariable(name, value) - ");
	            s.push("name must be string");
	            throw new Error(s.join(""));
        	}
	        if (arguments[1] === null) {
	            var s = [];
	            s.push("ERROR! Scriptable.setLocalVariable(name, value) - ");
	            s.push("value cannot be null");
	            throw new Error(s.join(""));
        	}
	        if (this.hasLocalVariable(arguments[0])) {
	        	svar = this.getLocalVariable(arguments[0]);
	        	console.log("/*******************")
	        	console.log("setting variable "+arguments[0])
	        	console.log("to "+arguments[1])
	        	console.log("/*******************")
	        	svar.set(arguments[1]);
	        } else {
	            if (typeof arguments[1] === 'string') {
	            	svar = new ScriptVariable(arguments[0], ScriptGlobals.TYPE_L_08_TEXT, arguments[1]);
	            } else if (typeof arguments[1] === 'number') {
	            	if ((arguments[1] | 0) === arguments[1]) {
	            		svar = new ScriptVariable(arguments[0], ScriptGlobals.TYPE_L_12_INT, arguments[1]);
	            	} else if (arguments[1] % 1 === 0) {
	            		svar = new ScriptVariable(arguments[0], ScriptGlobals.TYPE_L_14_LONG, arguments[1]);
	            	} else {
	            		svar = new ScriptVariable(arguments[0], ScriptGlobals.TYPE_L_10_FLOAT, arguments[1]);
	            	}
	            } else if (Array.isArray(arguments[1])) {
	                if (typeof arguments[1][0] === 'string') {
	                	svar = new ScriptVariable(arguments[0], ScriptGlobals.TYPE_L_09_TEXT_ARR, arguments[1]);
	                } else if (typeof arguments[1][0] === 'number') {
	                	if ((arguments[1][0] | 0) === arguments[1][0]) {
	                		svar = new ScriptVariable(arguments[0], ScriptGlobals.TYPE_L_13_INT_ARR, arguments[1]);
	                	} else if (arguments[1][0] % 1 === 0) {
	                		svar = new ScriptVariable(arguments[0], ScriptGlobals.TYPE_L_15_LONG_ARR, arguments[1]);
	                	} else {
	                		svar = new ScriptVariable(arguments[0], ScriptGlobals.TYPE_L_11_FLOAT_ARR, arguments[1]);
	                	}
	                }
	            } else {
	                var sb = [];
	                sb.push("Local variable ");
	                sb.push(name);
	                sb.push(" was passed unrecognized value. Only String, String[], Float, ");
	                sb.push("float[], Integer, int[], Long, or long[] allowed.");
	                throw new Error(sb.join(""));
	            }    	        	
	        }
    	} else if (arguments.length === 1
    			&& arguments[0] instanceof ScriptVariable) {
    		svar = arguments[0];
    	} else {
            var s = [];
            s.push("ERROR! Scriptable().setLocalVariable - ");
            s.push("invalid arguments - requires 1 ScriptVariable to set, or name-value");
            throw new Error(s.join(""));
    	}
        var found = false;
        for (var i = this.lvar.length - 1; i >= 0; i--) {
            if (this.lvar[i] !== null
                    && this.lvar[i].getName() !== null
                    && this.lvar[i].getName() === svar.getName()) {
                // found the correct script variable
            	this.lvar[i] = svar;
                found = true;
                break;
            }
        }
        if (!found) {
        	this.addLocalVariable(svar);
        }
        svar = null;
        found = null;
    }
    Scriptable.prototype.setTarget = function(params) {
	    if (params != undefined
	    		&& params !== null
	    		&& params instanceof TargetParameters) {
	        if (this.io.hasIOFlag(IoGlobals.IO_03_NPC)) {
	            this.io.getNPCData().getPathfinding()
	                    .removeFlag(ScriptGlobals.PATHFIND_ALWAYS);
	            this.io.getNPCData().getPathfinding()
	                    .removeFlag(ScriptGlobals.PATHFIND_ONCE);
	            this.io.getNPCData().getPathfinding()
	                    .removeFlag(ScriptGlobals.PATHFIND_NO_UPDATE);
	            if (params.hasFlag(ScriptGlobals.PATHFIND_ALWAYS)) {
	                this.io.getNPCData().getPathfinding()
	                        .addFlag(ScriptGlobals.PATHFIND_ALWAYS);
	            }
	            if (params.hasFlag(ScriptGlobals.PATHFIND_ONCE)) {
	                this.io.getNPCData().getPathfinding()
	                        .addFlag(ScriptGlobals.PATHFIND_ONCE);
	            }
	            if (params.hasFlag(ScriptGlobals.PATHFIND_NO_UPDATE)) {
	                this.io.getNPCData().getPathfinding()
	                        .addFlag(ScriptGlobals.PATHFIND_NO_UPDATE);
	            }
	            var old_target = -12;
	            if (this.io.getNPCData().hasReachedtarget()) {
	                old_target = this.io.getTargetinfo();
	            }
	            if (this.io.getNPCData().hasBehavior(BehaviourGlobals.BEHAVIOUR_FLEE)
	                    || this.io.getNPCData()
	                            .hasBehavior(BehaviourGlobals.BEHAVIOUR_WANDER_AROUND)) {
	                old_target = -12;
	            }
	            var t = params.getTargetInfo();
	
	            if (t === -2) {
	                t = Interactive.getInstance().GetInterNum(this.io);
	            }
	            // if (this.io.hasIOFlag(ioglobals.io_camera)) {
	            // EERIE_CAMERA * cam = (EERIE_CAMERA *)this.io->_camdata;
	            // cam->translatetarget.x = 0.f;
	            // cam->translatetarget.y = 0.f;
	            // cam->translatetarget.z = 0.f;
	            // }
	            if (t === ScriptGlobals.TARGET_PATH) {
	                this.io.setTargetinfo(t); // TARGET_PATH;
	                getTargetPos(this.io, 0);
	            } else if (t === ScriptGlobals.TARGET_NONE) {
	                this.io.setTargetinfo(ScriptGlobals.TARGET_NONE);
	            } else {
	                if (Interactive.getInstance().hasIO(t)) {
	                    this.io.setTargetinfo(t); // TARGET_PATH;
	                    getTargetPos(this.io, 0);
	                }
	            }
	
	            if (old_target !== t) {
	                this.io.getNPCData().setReachedtarget(false);
	
	                // ARX_NPC_LaunchPathfind(this.io, t);
	            }
	        }
	    } else {
            var s = [];
            s.push("ERROR! Scriptable.setTarget() - ");
            s.push("argument must be TargetParameters");
            throw new Error(s.join(""));
	    }
    }
    /**
     * Sets the reference id of the {@link ScriptTimer} found at a specific
     * index.
     * @param index the index
     * @param refId the reference id
     */
	Scriptable.prototype.setTimer = function(index, refId) {
    	if (index === undefined
    			|| refId === undefined
    			|| index === null
    			|| refId === null) {
            var s = [];
            s.push("ERROR! Scriptable.setTimer() - ");
            s.push("requires 2 parameters");
            throw new Error(s.join(""));	    		
    	}
	    if (isNaN(index)
	            || parseInt(Number(index)) !== index
	            || isNaN(parseInt(index, 10))) {
            var s = [];
            s.push("ERROR! Scriptable.setTimer() - ");
            s.push("index must be integer");
            throw new Error(s.join(""));
	    }
	    if (isNaN(refId)
	            || parseInt(Number(refId)) !== refId
	            || isNaN(parseInt(refId, 10))) {
            var s = [];
            s.push("ERROR! Scriptable.setTimer() - ");
            s.push("refId must be integer");
            throw new Error(s.join(""));
	    }
        this.timers[index] = refId;
    }
	Scriptable.prototype.showX = function() {
    	return this.x;
	};
	return Scriptable;
});
