/**
 * The Script controller executes all in-game scripts.
 * @author DaLoneDrau
 */
define(["require", "com/dalonedrow/engine/sprite/base/simplevector2",
	"com/dalonedrow/engine/systems/base/interactive",
	"com/dalonedrow/engine/systems/base/projectconstants",
	"com/dalonedrow/engine/systems/base/time",
	"com/dalonedrow/rpg/base/constants/ioglobals",
	"com/dalonedrow/rpg/base/constants/scriptglobals",
	"com/dalonedrow/rpg/base/flyweights/baseinteractiveobject",
	"com/dalonedrow/rpg/base/flyweights/scripttimer",
	"com/dalonedrow/rpg/base/flyweights/scripttimeraction",
	"com/dalonedrow/rpg/base/flyweights/scripttimerinitializationparameters",
	"com/dalonedrow/rpg/base/flyweights/scriptvariable",
	"com/dalonedrow/rpg/base/flyweights/scriptable",
	"com/dalonedrow/rpg/base/flyweights/sendparameters",
	"com/dalonedrow/rpg/base/flyweights/speechparameters",
	"com/dalonedrow/rpg/base/flyweights/stackedevent",
	"com/dalonedrow/rpg/base/systems/speech",
	"com/dalonedrow/utils/hashcode"],
		function(require, SimpleVector2, Interactive, ProjectConstants, Time, IoGlobals,
				ScriptGlobals, BaseInteractiveObject, ScriptTimer, ScriptTimerAction,
				ScriptTimerInitializationParameters, ScriptVariable, Scriptable, SendParameters,
				SpeechParameters, StackedEvent, Speech, Hashcode) {
	/** the singleton instance. */
    var instance = null;
	var Script = function() {
        if (instance !== null){
            throw new Error("Cannot instantiate more than one Script, use Script.getInstance()");
        }
		Hashcode.call(this);
		for (var i = Script.MAX_SYSTEM_PARAMS - 1; i >= 0; i--) {
			Script.SYSTEM_PARAMS.push(null);
		}
	    this.ARXPausedTime = false;
	    /** the flag indicating whether debug output is turned on. */
	    this.debug = false;
	    this.EDITMODE = false;
	    this.eventSender = null;
	    this.eventTotalCount = 0;
	    this.GLOB = 0;
	    /** the list of global script variables. */
	    this.gvars = null;
	    /** the maximum number of timer scripts. */
	    this.maxTimerScript = 0;
	    this.PauseScript = false;
	    this.stackFlow = 8;
	}
	Script.prototype = Object.create(Hashcode.prototype);
    /** the maximum number of system parameters. */
	Script.MAX_SYSTEM_PARAMS = 5;
    /** the list of system parameters. */
	Script.SYSTEM_PARAMS = [];
    /**
     * Adds an IO to a specific group.
     * @param io the IO
     * @param group the group name
     */
    Script.prototype.addToGroup = function(io, group) {
    	try {
    		this.checkInstanceOfNullsAllowed(io, BaseInteractiveObject);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.addToGroup() - io ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkStringNullsAllowed(group);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.addToGroup() - group ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        if (io !== null
                && group !== null) {
            io.addGroup(group);
        }
    }
    Script.prototype.allowInterScriptExecution = function() {
    	var Interactive = require("com/dalonedrow/engine/systems/base/interactive");
        var ppos = 0;

        if (!this.PauseScript && !this.EDITMODE && !this.ARXPausedTime) {
            this.eventSender = null;

            var numm = Math.min(Interactive.getInstance().getMaxIORefId(), 10);

            for (var n = 0; n < numm; n++) {
                var i = ppos;
                ppos++;

                if (ppos >= Interactive.getInstance().getMaxIORefId()) {
                    ppos = 0;
                    break;
                }
                if (Interactive.getInstance().hasIO(i)) {
                    var io = Interactive.getInstance().getIO(i);
                    if (io.hasGameFlag(IoGlobals.GFLAG_ISINTREATZONE)) {
                        if (io.getMainevent() !== null) {
                            this.this.sendIOScriptEvent(io, 0, null, io.getMainevent());
                        } else {
                        	this.this.sendIOScriptEvent(io, ScriptGlobals.SM_008_MAIN, null, null);
                        }
                    }
                }
            }
        }
    }
    /**
     * Clones all local variables from the source {@link IO} to the destination
     * {@link IO}.
     * @param src the source {@link IO}
     * @param dest the destination {@link IO}
     */
    Script.prototype.cloneLocalVars = function(src, dest) {
    	try {
    		this.checkInstanceOfNullsAllowed(src, BaseInteractiveObject);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.cloneLocalVars() - src ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkInstanceOfNullsAllowed(dest, BaseInteractiveObject);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.cloneLocalVars() - dest ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        if (dest !== null
                && src !== null) {
        	this.freeAllLocalVariables(dest);
            if (src.getScript().hasLocalVariables()) {
                var i = src.getScript().getLocalVarArrayLength() - 1;
                for (; i >= 0; i--) {
                    dest.getScript().setLocalVariable(
                    		new ScriptVariable(src.getScript().getLocalVariable(i)));
                }
            }
        }
    }
    /**
     * Count the number of active script timers.
     * @return <code>int</code>
     */
    Script.prototype.countTimers = function() {
        var activeTimers = 0;
        var scriptTimers = this.getScriptTimers();
        for (var i = scriptTimers.length - 1; i >= 0; i--) {
            if (scriptTimers[i] !== null
                    && scriptTimers[i].exists()) {
                activeTimers++;
            }
        }
        return activeTimers;
    }
    /**
     * Checks to see if a scripted event is disallowed.
     * @param msg the event message id
     * @param script the {@link Scriptable} script
     * @return <tt>true</tt> if the event is not allowed; <tt>false</tt>
     *         otherwise
     */
    Script.prototype.eventIsDisallowed = function(msg, script) {
    	try {
    		this.checkInteger(msg);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.eventIsDisallowed() - msg ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkInstanceOfNullsAllowed(script, Scriptable);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.eventIsDisallowed() - script ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        var disallowed = false;
        // check to see if message is for an event that was disabled
        switch (msg) {
        case ScriptGlobals.SM_055_COLLIDE_NPC:
            if (script.hasAllowedEvent(ScriptGlobals.DISABLE_COLLIDE_NPC)) {
                disallowed = true;
            }
            break;
        case ScriptGlobals.SM_010_CHAT:
            if (script.hasAllowedEvent(ScriptGlobals.DISABLE_CHAT)) {
                disallowed = true;
            }
            break;
        case ScriptGlobals.SM_016_HIT:
            if (script.hasAllowedEvent(ScriptGlobals.DISABLE_HIT)) {
                disallowed = true;
            }
            break;
        case ScriptGlobals.SM_028_INVENTORY2_OPEN:
            if (script.hasAllowedEvent(
                    ScriptGlobals.DISABLE_INVENTORY2_OPEN)) {
                disallowed = true;
            }
            break;
        case ScriptGlobals.SM_046_HEAR:
            if (script.hasAllowedEvent(ScriptGlobals.DISABLE_HEAR)) {
                disallowed = true;
            }
            break;
        case ScriptGlobals.SM_023_UNDETECTPLAYER:
        case ScriptGlobals.SM_022_DETECTPLAYER:
            if (script.hasAllowedEvent(ScriptGlobals.DISABLE_DETECT)) {
                disallowed = true;
            }
            break;
        case ScriptGlobals.SM_057_AGGRESSION:
            if (script.hasAllowedEvent(ScriptGlobals.DISABLE_AGGRESSION)) {
                disallowed = true;
            }
            break;
        case ScriptGlobals.SM_008_MAIN:
            if (script.hasAllowedEvent(ScriptGlobals.DISABLE_MAIN)) {
                disallowed = true;
            }
            break;
        case ScriptGlobals.SM_073_CURSORMODE:
            if (script.hasAllowedEvent(ScriptGlobals.DISABLE_CURSORMODE)) {
                disallowed = true;
            }
            break;
        case ScriptGlobals.SM_074_EXPLORATIONMODE:
            if (script.hasAllowedEvent(ScriptGlobals.DISABLE_EXPLORATIONMODE)) {
                disallowed = true;
            }
            break;
        case ScriptGlobals.SM_061_KEY_PRESSED:
            // float dwCurrTime = ARX_TIME_Get();
            // if ((dwCurrTime - g_TimeStartCinemascope) < 3000) {
            // return ScriptGlobals.REFUSE;
            // }
            break;
        default:
            break;
        }
        return disallowed;
    }
    Script.prototype.eventStackClear = function() {
        for (var i = 0; i < ScriptGlobals.MAX_EVENT_STACK; i++) {
            if (this.getStackedEvent(i).exists()) {
            	this.getStackedEvent(i).setParams(null);
            	this.getStackedEvent(i).setEventname(null);
            	this.getStackedEvent(i).setSender(null);
            	this.getStackedEvent(i).setExist(false);
            	this.getStackedEvent(i).setIo(null);
            	this.getStackedEvent(i).setMsg(0);
            }
        }
        this.clearAdditionalEventStacks();
    }
    Script.prototype.eventStackClearForIo = function(fio) {
    	try {
    		this.checkInstanceOf(io, BaseInteractiveObject);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.eventStackClearForIo() - io ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        for (var i = 0; i < ScriptGlobals.MAX_EVENT_STACK; i++) {
            if (this.getStackedEvent(i).exists()
                    && io.equals(this.getStackedEvent(i).getIo())) {
            	this.getStackedEvent(i).setParams(null);
            	this.getStackedEvent(i).setEventname(null);
            	this.getStackedEvent(i).setSender(null);
            	this.getStackedEvent(i).setExist(false);
            	this.getStackedEvent(i).setIo(null);
            	this.getStackedEvent(i).setMsg(0);
            }
        }
        this.clearAdditionalEventStacksForIO(io);
    }
    Script.prototype.eventStackExecute = function() {
    	var Interactive = require("com/dalonedrow/engine/systems/base/interactive");
        var count = 0;
        for (var i = 0; i < ScriptGlobals.MAX_EVENT_STACK; i++) {
            if (this.getStackedEvent(i).exists()) {
                var ioid = this.getStackedEvent(i).getIo().getRefId();
                if (Interactive.getInstance().hasIO(ioid)) {
                    if (this.getStackedEvent(i).getSender() !== null) {
                        var senderid = this.getStackedEvent(i).getSender().getRefId();
                        if (Interactive.getInstance().hasIO(senderid)) {
                        	this.eventSender = this.getStackedEvent(i).getSender();
                        } else {
                        	this.eventSender = null;
                        }
                    } else {
                    	this.eventSender = null;
                    }
                    this.this.sendIOScriptEvent(this.getStackedEvent(i).getIo(),
                    		this.getStackedEvent(i).getMsg(),
                    		this.getStackedEvent(i).getParams(),
                    		this.getStackedEvent(i).getEventname());
                }
                this.getStackedEvent(i).setParams(null);
                this.getStackedEvent(i).setEventname(null);
                this.getStackedEvent(i).setSender(null);
                this.getStackedEvent(i).setExist(false);
                this.getStackedEvent(i).setIo(null);
                this.getStackedEvent(i).setMsg(0);
                count++;
                if (count >= this.stackFlow) {
                    break;
                }
            }
        }
        this.executeAdditionalStacks();
    }
    Script.prototype.eventStackExecuteAll = function() {
    	this.stackFlow = 9999999;
    	this.eventStackExecute();
    	this.stackFlow = 20;
    }
    Script.prototype.forceDeath = function(io, target) {
    	var Interactive = require("com/dalonedrow/engine/systems/base/interactive");
    	try {
    		this.checkInstanceOf(io, BaseInteractiveObject);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.forceDeath() - io ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkString(target);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.forceDeath() - target ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        var tioid = -1;
        if (target.toLowerCase() === "me"
                || target.toLowerCase() === "self") {
            tioid = Interactive.getInstance().GetInterNum(io);
        } else {
            tioid = Interactive.getInstance().getTargetByNameTarget(target);
            if (tioid === -2) {
                tioid = Interactive.getInstance().GetInterNum(io);
            }
        }
        if (tioid >= 0) {
            var tio = Interactive.getInstance().getIO(tioid);
            if (tio.hasIOFlag(IoGlobals.IO_03_NPC)) {
                tio.getNPCData().forceDeath(io);
            }
        }
    }
    Script.prototype.freeAllGlobalVariables = function() {
        if (this.gvars !== null) {
            for (var i = this.gvars.length - 1; i >= 0; i--) {
                if (this.gvars[i] !== null
                        && (this.gvars[i].getType() === ScriptGlobals.TYPE_G_00_TEXT
                                || this.gvars[i].getType() === ScriptGlobals.TYPE_L_08_TEXT)
                        && this.gvars[i].getText() !== null) {
                	this.gvars[i].set(null);
                }
                this.gvars[i] = null;
            }
        }
    }
    /**
     * Removes all local variables from an {@link IO} and frees up the memory.
     * @param io the {@link IO}
     * @if an error occurs
     */
    Script.prototype.freeAllLocalVariables = function(io) {
    	try {
    		this.checkInstanceOfNullsAllowed(io, BaseInteractiveObject);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.freeAllLocalVariables() - io ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        if (io !== null
                && io.getScript() !== null
                && io.getScript().hasLocalVariables()) {
            var i = io.getScript().getLocalVarArrayLength() - 1;
            for (; i >= 0; i--) {
                if (io.getScript().getLocalVariable(i) !== null
                        && (io.getScript().getLocalVariable(i).getType() === ScriptGlobals.TYPE_G_00_TEXT
                                || io.getScript().getLocalVariable(i).getType() === ScriptGlobals.TYPE_L_08_TEXT)
                        && io.getScript().getLocalVariable(i).getText() !== null) {
                    io.getScript().getLocalVariable(i).set(null);
                }
                io.getScript().setLocalVariable(i, null);
            }
        }
    }
    /**
     * Gets the EVENT_SENDER global.
     * @return {@link BaseInteractiveObject}
     */
    Script.prototype.getEventSender = function() {
        return this.eventSender;
    }
    /**
     * Gets the value of a global floating-point array variable.
     * @param name the name of the variable
     * @return <code>float</code>[]
     */
    Script.prototype.getGlobalFloatArrayVariableValue = function(name) {
    	try {
    		this.checkString(name);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.getGlobalFloatArrayVariableValue() - name ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        if (this.gvars === null) {
        	this.gvars = new ScriptVariable[0];
        }
        var index = -1;
        for (var i = 0; i < this.gvars.length; i++) {
            if (this.gvars[i] !== null
                    && this.gvars[i].getName().equals(name)
                    && this.gvars[i].getType() === ScriptGlobals.TYPE_G_03_FLOAT_ARR) {
                index = i;
                break;
            }
        }
        if (index === -1) {
            var sb = [];
            sb.push("Global Float Array variable ");
            sb.push(name);
            sb.push(" was never set.");
            throw new Error(sb.join(""));
        }
        return this.gvars[index].getFloatArrayVal();
    }
    /**
     * Gets the global floating-point value assigned to a specific variable.
     * @param name the variable name
     * @return <code>float</code>
     */
    Script.prototype.getGlobalFloatVariableValue = function(name) {
    	try {
    		this.checkString(name);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.getGlobalFloatVariableValue() - name ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        if (this.gvars === null) {
            this.gvars = new ScriptVariable[0];
        }
        var index = -1;
        for (var i = 0; i < this.gvars.length; i++) {
            if (this.gvars[i] !== null
                    && this.gvars[i].getName().equals(name)
                    && this.gvars[i].getType() === ScriptGlobals.TYPE_G_02_FLOAT) {
                index = i;
                break;
            }
        }
        if (index === -1) {
            var sb = [];
            sb.push("Global Float Array variable ");
            sb.push(name);
            sb.push(" was never set.");
            throw new Error(sb.join(""));
        }
        return this.gvars[index].getFloatVal();
    }
    /**
     * Gets the value of a global integer array variable.
     * @param name the name of the variable
     * @return <code>int</code>[]
     */
    Script.prototype.getGlobalIntArrayVariableValue = function(name) {
    	try {
    		this.checkString(name);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.getGlobalIntArrayVariableValue() - name ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        if (this.gvars === null) {
            this.gvars = new ScriptVariable[0];
        }
        var index = -1;
        for (var i = 0; i < this.gvars.length; i++) {
            if (this.gvars[i] !== null
                    && this.gvars[i].getName().equals(name)
                    && this.gvars[i].getType() === ScriptGlobals.TYPE_G_05_INT_ARR) {
                index = i;
                break;
            }
        }
        if (index === -1) {
            var sb = [];
            sb.push("Global Float Array variable ");
            sb.push(name);
            sb.push(" was never set.");
            throw new Error(sb.join(""));
        }
        return this.gvars[index].getIntArrayVal();
    }
    /**
     * Gets the value of a global integer variable.
     * @param name the name of the variable
     * @return <code>int</code>
     */
    Script.prototype.getGlobalIntVariableValue = function(name) {
    	try {
    		this.checkString(name);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.getGlobalIntVariableValue() - name ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        if (this.gvars === null) {
            this.gvars = new ScriptVariable[0];
        }
        var index = -1;
        for (var i = 0; i < this.gvars.length; i++) {
            if (this.gvars[i] !== null
                    && this.gvars[i].getName().equals(name)
                    && this.gvars[i].getType() === ScriptGlobals.TYPE_G_04_INT) {
                index = i;
                break;
            }
        }
        if (index === -1) {
            var sb = [];
            sb.push("Global Float Array variable ");
            sb.push(name);
            sb.push(" was never set.");
            throw new Error(sb.join(""));
        }
        return this.gvars[index].getIntVal();
    }
    /**
     * Gets the value of a global long integer array variable.
     * @param name the name of the variable
     * @return <code>long</code>[]
     */
    Script.prototype.getGlobalLongArrayVariableValue = function(name) {
    	try {
    		this.checkString(name);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.getGlobalLongArrayVariableValue() - name ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        if (this.gvars === null) {
            this.gvars = new ScriptVariable[0];
        }
        var index = -1;
        for (var i = 0; i < this.gvars.length; i++) {
            if (this.gvars[i] !== null
                    && this.gvars[i].getName().equals(name)
                    && this.gvars[i].getType() === ScriptGlobals.TYPE_G_07_LONG_ARR) {
                index = i;
                break;
            }
        }
        if (index === -1) {
            var sb = [];
            sb.push("Global Float Array variable ");
            sb.push(name);
            sb.push(" was never set.");
            throw new Error(sb.join(""));
        }
        return this.gvars[index].getLongArrayVal();
    }
    /**
     * Gets the value of a global long integer variable.
     * @param name the name of the variable
     * @return <code>long</code>
     */
    Script.prototype.getGlobalLongVariableValue = function(name) {
    	try {
    		this.checkString(name);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.getGlobalLongVariableValue() - name ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        if (this.gvars === null) {
            this.gvars = new ScriptVariable[0];
        }
        var index = -1;
        for (var i = 0; i < this.gvars.length; i++) {
            if (this.gvars[i] !== null
                    && this.gvars[i].getName().equals(name)
                    && this.gvars[i].getType() === ScriptGlobals.TYPE_G_06_LONG) {
                index = i;
                break;
            }
        }
        if (index === -1) {
            var sb = [];
            sb.push("Global Float Array variable ");
            sb.push(name);
            sb.push(" was never set.");
            throw new Error(sb.join(""));
        }
        return this.gvars[index].getLongVal();
    }
    /**
     * Gets the local text array value assigned to a specific variable.
     * @param name the variable name
     * @return {@link String}
     */
    Script.prototype.getGlobalStringArrayVariableValue = function(name) {
    	try {
    		this.checkString(name);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.getGlobalStringArrayVariableValue() - name ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        if (this.gvars === null) {
            this.gvars = new ScriptVariable[0];
        }
        var index = -1;
        for (var i = 0; i < this.gvars.length; i++) {
            if (this.gvars[i] !== null
                    && this.gvars[i].getName().equals(name)
                    && this.gvars[i].getType() === ScriptGlobals.TYPE_G_01_TEXT_ARR) {
                index = i;
                break;
            }
        }
        if (index === -1) {
            var sb = [];
            sb.push("Global Float Array variable ");
            sb.push(name);
            sb.push(" was never set.");
            throw new Error(sb.join(""));
        }
        return this.gvars[index].getTextArrayVal();
    }
    /**
     * Gets the global text value assigned to a specific variable.
     * @param name the variable name
     * @return {@link String}
     * @if no such variable was assigned
     */
    Script.prototype.getGlobalStringVariableValue = function(name) {
    	try {
    		this.checkString(name);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.getGlobalStringVariableValue() - name ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        if (this.gvars === null) {
            this.gvars = new ScriptVariable[0];
        }
        var index = -1;
        for (var i = 0; i < this.gvars.length; i++) {
            if (this.gvars[i] !== null
                    && this.gvars[i].getName().equals(name)
                    && this.gvars[i].getType() === ScriptGlobals.TYPE_G_00_TEXT) {
                index = i;
                break;
            }
        }
        if (index === -1) {
            var sb = [];
            sb.push("Global Float Array variable ");
            sb.push(name);
            sb.push(" was never set.");
            throw new Error(sb.join(""));
        }
        return this.gvars[index].getText();
    }
    Script.prototype.getGlobalTargetParam = function(io) {
    	try {
    		this.checkInstanceOf(io, BaseInteractiveObject);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.getGlobalTargetParam() - io ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        return io.getTargetinfo();
    }
    /**
     * Gets a global {@link Scriptable} variable.
     * @param name the name of the variable
     * @return {@link ScriptVariable}
     */
    Script.prototype.getGlobalVariable = function(name) {
    	try {
    		this.checkString(name);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.getGlobalVariable() - name ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        var vari = null;
        for (var i = this.gvars.length - 1; i >= 0; i--) {
            if (this.gvars[i] !== null
                    && this.gvars[i].getName() !== null
                    && this.gvars[i].getName().toLowerCase() === name.toLowerCase()) {
                vari = this.gvars[i];
                break;
            }
        }
        return vari;
    }
    Script.prototype.getIOMaxEvents = function() {
    	var Interactive = require("com/dalonedrow/engine/systems/base/interactive");
    	var max = -1;
    	var ionum = -1;
    	var io = null;
        var i = Interactive.getInstance().getMaxIORefId();
        for (; i >= 0; i--) {
            if (Interactive.getInstance().hasIO(i)) {
            	var hio = Interactive.getInstance().getIO(i);
                if (hio.getStatCount() > max) {
                    ionum = i;
                    max = hio.getStatCount();
                }
                hio = null;
            }
        }
        if (max > 0
                && ionum > -1) {
            io = Interactive.getInstance().getIO(ionum);
        }
        return io;
    }
    Script.prototype.getIOMaxEventsSent = function() {
    	var Interactive = require("com/dalonedrow/engine/systems/base/interactive");
    	var max = -1;
    	var ionum = -1;
    	var io = null;
        var i = Interactive.getInstance().getMaxIORefId();
        for (; i >= 0; i--) {
            if (Interactive.getInstance().hasIO(i)) {
            	var hio = Interactive.getInstance().getIO(i);
                if (hio.getStatSent() > max) {
                    ionum = i;
                    max = hio.getStatSent();
                }
            }
        }
        if (max > 0
                && ionum > -1) {
            io = Interactive.getInstance().getIO(ionum);
        }
        return io;
    }
    /**
     * Gets the maximum number of timer scripts.
     * @return <code>int</code>
     */
    Script.prototype.getMaxTimerScript = function() {
        return this.maxTimerScript;
    }
    /**
     * Gets the id of a named script assigned to a specific IO.
     * @param io the IO
     * @param name the script's name
     * @return the script's id, if found. If no script exists, -1 is returned
     */
    Script.prototype.getSystemIOScript = function(io, name) {
    	try {
    		this.checkInstanceOf(io, BaseInteractiveObject);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.getSystemIOScript() - io ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkString(name);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.getSystemIOScript() - name ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        var index = -1;
        if (this.countTimers() > 0) {
            for (var i = 0; i < this.maxTimerScript; i++) {
                var scriptTimers = this.getScriptTimers();
                if (scriptTimers[i].exists()) {
                    if (scriptTimers[i].getIo().equals(io)
                            && scriptTimers[i].getName().toLowerCase() === name.toLowerCase()) {
                        index = i;
                        break;
                    }
                }
            }
        }
        return index;
    }
    /**
     * Determines if a {@link Script} has local variable with a specific name.
     * @param name the variable name
     * @return <tt>true</tt> if the {@link Script} has the local variable;
     *         <tt>false</tt> otherwise
     */
    Script.prototype.hasGlobalVariable = function(name) {
    	try {
    		this.checkString(name);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.hasGlobalVariable() - name ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        return this.getGlobalVariable(name) !== null;
    }
    Script.prototype.initEventStats = function() {
    	var Interactive = require("com/dalonedrow/engine/systems/base/interactive");
        this.eventTotalCount = 0;
        var i = Interactive.getInstance().getMaxIORefId();
        for (; i >= 0; i--) {
            if (Interactive.getInstance().hasIO(i)) {
                var io = Interactive.getInstance().getIO(i);
                io.setStatCount(0);
                io.setStatSent(0);
            }
        }
    }
    /**
     * Gets the flag indicating whether debug output is turned on.
     * @return <tt>true</tt> if the debug output is turned on; <tt>false</tt>
     *         otherwise
     */
    Script.prototype.isDebug = function() {
        return this.debug;
    }
    /**
     * Determines if an IO is in a specific group.
     * @param io the IO
     * @param group the group name
     * @return true if the IO is in the group; false otherwise
     */
    Script.prototype.isIOInGroup = function(io, group) {
    	try {
    		this.checkInstanceOfNullsAllowed(io, BaseInteractiveObject);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.isIOInGroup() - io ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkStringNullsAllowed(group);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.isIOInGroup() - group ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        var val = false;
        if (io !== null
                && group !== null) {
            for (var i = 0; i < io.getNumIOGroups(); i++) {
                if (group.toLowerCase() === io.getIOGroup(i).toLowerCase()) {
                    val = true;
                    break;
                }
            }
        }
        return val;
    }
    Script.prototype.isPlayerInvisible = function(io) {
    	try {
    		this.checkInstanceOf(io, BaseInteractiveObject);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.isPlayerInvisible() - io ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	var invisible = false;
        // if (inter.iobj[0]->invisibility > 0.3f) {
        // invisible = true;
        // }
        return invisible;
    }
    Script.prototype.MakeSSEPARAMS = function(params) {
    	try {
    		this.checkStringNullsAllowed(params);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.MakeSSEPARAMS() - params ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        for (var i = MAX_SYSTEM_PARAMS - 1; i >= 0; i--) {
            SYSTEM_PARAMS[i] = null;
        }
        if (params !== null) {
            var split = params.split(" ");
            for (var i = 0, len = split.length - 1; i < len; i++) {
                if (i / 2 < Script.MAX_SYSTEM_PARAMS) {
                	Script.SYSTEM_PARAMS[i] = split[i];
                } else {
                    break;
                }
            }
        }
    }
    /**
     * Sends an event message to the IO.
     * @param io the IO
     * @param msg the message
     * @param params the script parameters - ignored
     * @return {@link int}
     */
    Script.prototype.notifyIOEvent = function(io, msg, params) {
    	var Interactive = require("com/dalonedrow/engine/systems/base/interactive");
    	try {
    		this.checkInstanceOfNullsAllowed(io, BaseInteractiveObject);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.notifyIOEvent() - io ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkInteger(msg);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.notifyIOEvent() - msg ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        var acceptance = ScriptGlobals.REFUSE;
        if (this.sendIOScriptEvent(io, msg, null, null) !== acceptance) {
            switch (msg) {
            case ScriptGlobals.SM_017_DIE:
                if (io !== null && Interactive.getInstance().hasIO(io)) {
                    // TODO - set death color
                    // io->infracolor.b = 1.f;
                    // io->infracolor.g = 0.f;
                    // io->infracolor.r = 0.f;
                }
                break;
            default:
                break;
            }
            acceptance = ScriptGlobals.ACCEPT;
        }
        return acceptance;
    }
    /**
     * Hides a target IO.
     * @param io the IO sending the event.
     * @param megahide if true, the target IO is "mega-hidden"
     * @param targetName the target's name
     * @param hideOn if true, the hidden flags are set; otherwise all hidden
     *            flags are removed
     * @if an error occurs
     */
    Script.prototype.objectHide = function(io, megahide, targetName, hideOn) {
    	var Interactive = require("com/dalonedrow/engine/systems/base/interactive");
    	try {
    		this.checkInstanceOf(io, BaseInteractiveObject);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.objectHide() - io ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkBoolean(megahide);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.objectHide() - megahide ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkString(targetName);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.objectHide() - targetName ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkBoolean(hideOn);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.objectHide() - hideOn ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        var targetId = Interactive.getInstance().getTargetByNameTarget(targetName);
        if (targetId === -2) {
            targetId = io.getRefId();
        }
        if (Interactive.getInstance().hasIO(targetId)) {
            var tio = Interactive.getInstance().getIO(targetId);
            tio.removeGameFlag(IoGlobals.GFLAG_MEGAHIDE);
            if (hideOn) {
                if (megahide) {
                    tio.addGameFlag(IoGlobals.GFLAG_MEGAHIDE);
                    tio.setShow(IoGlobals.SHOW_FLAG_MEGAHIDE);
                } else {
                    tio.setShow(IoGlobals.SHOW_FLAG_HIDDEN);
                }
            } else if (tio.getShow() === IoGlobals.SHOW_FLAG_MEGAHIDE
                    || tio.getShow() === IoGlobals.SHOW_FLAG_HIDDEN) {
                tio.setShow(IoGlobals.SHOW_FLAG_IN_SCENE);
                if (tio.hasIOFlag(IoGlobals.IO_03_NPC)
                        && tio.getNPCData().getBaseLife() <= 0) {
                    // tio.animlayer[0].cur_anim =
                    // inter.iobj[t]->anims[ANIM_DIE];
                    // tio.animlayer[1].cur_anim = NULL;
                    // tio.animlayer[2].cur_anim = NULL;
                    // tio.animlayer[0].ctime = 9999999;
                }
            }
        }
    }
    /**
     * Removes an IO from all groups to which it was assigned.
     * @param io the IO
     */
    Script.prototype.releaseAllGroups = function(io) {
    	try {
    		this.checkInstanceOfNullsAllowed(io, BaseInteractiveObject);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.releaseAllGroups() - io ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        while (io !== null
                && io.getNumIOGroups() > 0) {
            io.removeGroup(io.getIOGroup(0));
        }
    }
    /**
     * Releases an event, clearing all variables.
     * @param event the scriptable event
     */
    Script.prototype.releaseScript = function(event) {
    	try {
    		this.checkInstanceOfNullsAllowed(event, Scriptable);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.releaseScript() - io ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        if (event !== null) {
            event.clearLocalVariables();
        }
    }
    /**
     * Removes an IO from a group.
     * @param io the IO
     * @param group the group
     */
    Script.prototype.removeGroup = function(io, group) {
    	try {
    		this.checkInstanceOfNullsAllowed(io, BaseInteractiveObject);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.removeGroup() - io ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkStringNullsAllowed(group);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.removeGroup() - group ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        if (io !== null
                && group !== null) {
            io.removeGroup(group);
        }
    }
    /**
     * Resets the object's script.
     * @param io the object
     * @param initialize if <tt>true</tt> and the object is script-loaded, it
     *            will be initialized again
     * @if an error occurs
     */
    Script.prototype.reset = function(io, initialize) {
    	try {
    		this.checkInstanceOf(io, BaseInteractiveObject);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.reset() - io ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkBoolean(initialize);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.reset() - initialize ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        // Release Script Local Variables
        if (io.getScript().getLocalVarArrayLength() > 0) {
            var i = io.getScript().getLocalVarArrayLength() - 1;
            for (; i >= 0; i--) {
                if (io.getScript().getLocalVariable(i) !== null) {
                    io.getScript().getLocalVariable(i).set(null);
                    io.getScript().setLocalVariable(i, null);
                }
            }
        }

        // Release Script Over-Script Local Variables
        if (io.getOverscript().getLocalVarArrayLength() > 0) {
            var i = io.getOverscript().getLocalVarArrayLength() - 1;
            for (; i >= 0; i--) {
                if (io.getOverscript().getLocalVariable(i) !== null) {
                    io.getOverscript().getLocalVariable(i).set(null);
                    io.getOverscript().setLocalVariable(i, null);
                }
            }
        }
        if (!io.isScriptLoaded()) {
            this.resetObject(io, initialize);
        }
    }
    /**
     * Resets all interactive objects.
     * @param initialize if <tt>true</tt> and an object is script-loaded, it
     *            will be initialized again
     * @if an error occurs
     */
    Script.prototype.resetAll = function(initialize) {
    	try {
    		this.checkBoolean(initialize);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.resetAll() - initialize ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	var Interactive = require("com/dalonedrow/engine/systems/base/interactive");
        var i = Interactive.getInstance().getMaxIORefId();
        for (; i >= 0; i--) {
            if (Interactive.getInstance().hasIO(i)) {
                var io = Interactive.getInstance().getIO(i);
                if (!io.isScriptLoaded()) {
                    this.resetObject(io, initialize);
                }
            }
        }
    }
    /**
     * Resets the IO.
     * @param io the IO
     * @param initialize if <tt>true</tt>, the object needs to be initialized as
     *            well
     * @if an error occurs
     */
    Script.prototype.resetObject = function(io, initialize) {
    	var BaseInteractiveObject = require("com/dalonedrow/rpg/base/flyweights/baseinteractiveobject");
    	try {
    		this.checkInstanceOf(io, BaseInteractiveObject);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.resetObject() - io ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkBoolean(initialize);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.resetObject() - initialize ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	var Interactive = require("com/dalonedrow/engine/systems/base/interactive");
        // Now go for Script INIT/RESET depending on Mode
        var num = Interactive.getInstance().GetInterNum(io);
        if (Interactive.getInstance().hasIO(num)) {
            var objIO = Interactive.getInstance().getIO(num);
            if (objIO !== null
                    && objIO.getScript() !== null) {
                objIO.getScript().clearDisallowedEvents();

                if (initialize) {
                    this.sendScriptEvent(objIO.getScript(),
                            ScriptGlobals.SM_001_INIT,
                            new Object[0],
                            objIO,
                            null);
                }
                objIO = Interactive.getInstance().getIO(num);
                if (objIO !== null) {
                    this.setMainEvent(objIO, "MAIN");
                }
            }

            // Do the same for Local Script
            objIO = Interactive.getInstance().getIO(num);
            if (objIO !== null
                    && objIO.getOverscript() !== null) {
                objIO.getOverscript().clearDisallowedEvents();

                if (initialize) {
                    this.sendScriptEvent(objIO.getOverscript(),
                            ScriptGlobals.SM_001_INIT,
                            new Object[0],
                            objIO,
                            null);
                }
            }

            // Sends InitEnd Event
            if (initialize) {
                objIO = Interactive.getInstance().getIO(num);
                if (objIO !== null
                        && objIO.getScript() !== null) {
                    this.sendScriptEvent(objIO.getScript(),
                            ScriptGlobals.SM_033_INITEND,
                            new Object[0],
                            objIO,
                            null);
                }
                objIO = Interactive.getInstance().getIO(num);
                if (objIO !== null
                        && objIO.getOverscript() !== null) {
                    this.sendScriptEvent(objIO.getOverscript(),
                            ScriptGlobals.SM_033_INITEND,
                            new Object[0],
                            objIO,
                            null);
                }
            }

            objIO = Interactive.getInstance().getIO(num);
            if (objIO !== null) {
                objIO.removeGameFlag(IoGlobals.GFLAG_NEEDINIT);
            }
        }
    }
    Script.prototype.runEvent = function(script, eventName, io) {
    	var BaseInteractiveObject = require("com/dalonedrow/rpg/base/flyweights/baseinteractiveobject");
    	try {
    		this.checkInstanceOf(script, Scriptable);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.runEvent() - script ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkString(eventName);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.runEvent() - eventName ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkInstanceOf(io, BaseInteractiveObject);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.runEvent() - io ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        var msg = 0;
        if (eventName.toUpperCase() === "INIT") {
            msg = ScriptGlobals.SM_001_INIT;
        } else if (eventName.toUpperCase() === "HIT") {
            msg = ScriptGlobals.SM_016_HIT;
        } else if (eventName.toUpperCase() === "INIT_END") {
            msg = ScriptGlobals.SM_033_INITEND;
        }
        if (msg > 0) {
            this.runMessage(script, msg, io);
        } else {
        	// JAVASCRIPT REFLECTION
        	var method;
        	if (eventName.indexOf("on") === 0) {
        		method = eventName;
        	} else {
        		method = ["on", eventName.charAt(0).toUpperCase(), eventName.slice(1)].join("");
        	}
        	script[method]();
        }
    }
    Script.prototype.runMessage = function(script, msg, io) {
    	var BaseInteractiveObject = require("com/dalonedrow/rpg/base/flyweights/baseinteractiveobject");
    	try {
    		this.checkInstanceOf(script, Scriptable);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.runMessage() - script ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkInteger(msg);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.runMessage() - msg ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkInstanceOf(io, BaseInteractiveObject);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.runMessage() - io ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        switch (msg) {
        case ScriptGlobals.SM_001_INIT:
            script.onInit();
            break;
        case ScriptGlobals.SM_002_INVENTORYIN:
            script.onInventoryIn();
            break;
        case ScriptGlobals.SM_004_INVENTORYUSE:
            script.onInventoryUse();
            break;
        case ScriptGlobals.SM_007_EQUIPOUT:
            script.onUnequip();
            break;
        case ScriptGlobals.SM_016_HIT:
            script.onHit();
            break;
        case ScriptGlobals.SM_017_DIE:
            script.onDie();
            break;
        case ScriptGlobals.SM_024_COMBINE:
            script.onCombine();
            break;
        case ScriptGlobals.SM_033_INITEND:
            script.onInitEnd();
            break;
        case ScriptGlobals.SM_041_LOAD:
            script.onLoad();
            break;
        case ScriptGlobals.SM_043_RELOAD:
            script.onReload();
            break;
        case ScriptGlobals.SM_045_OUCH:
            script.onOuch();
            break;
        case ScriptGlobals.SM_046_HEAR:
            script.onHear();
            break;
        case ScriptGlobals.SM_057_AGGRESSION:
            script.onAggression();
            break;
        case ScriptGlobals.SM_069_IDENTIFY:
            script.onIdentify();
            break;
        default:
            throw new Error("No action defined for message " + msg);
        }
    }
    Script.prototype.sendEvent = function(io, params) {
    	try {
    		this.checkInstanceOf(io, BaseInteractiveObject);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.sendEvent() - io ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkInstanceOf(params, SendParameters);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.sendEvent() - params ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	var Interactive = require("com/dalonedrow/engine/systems/base/interactive");
        var oes = this.eventSender;
        this.eventSender = io;
        if (params.hasFlag(SendParameters.RADIUS)) {
            // SEND EVENT TO ALL OBJECTS IN A RADIUS

            // LOOP THROUGH ALL IOs.
            var i = Interactive.getInstance().getMaxIORefId();
            for (; i >= 0; i--) {
                if (Interactive.getInstance().hasIO(i)) {
                    var iio = Interactive.getInstance().getIO(i);
                    // skip cameras and markers
                    // if (iio.hasIOFlag(IoGlobals.io_camera)
                    // || iio.hasIOFlag(IoGlobals.io_marker)) {
                    // continue;
                    // }
                    // skip IOs not in required group
                    if (params.hasFlag(SendParameters.GROUP)) {
                        if (!this.isIOInGroup(iio, params.getGroupName())) {
                            continue;
                        }
                    }
                    // if send event is for NPCs, send to NPCs,
                    // if for Items, send to Items, etc...
                    if ((params.hasFlag(SendParameters.NPC)
                            && iio.hasIOFlag(IoGlobals.IO_03_NPC))
                            // || (params.hasFlag(SendParameters.FIX)
                            // && iio.hasIOFlag(IoGlobals.IO_FIX))
                            || (params.hasFlag(SendParameters.ITEM)
                                    && iio.hasIOFlag(IoGlobals.IO_02_ITEM))) {
                    	var senderPos = new SimpleVector2(), ioPos = new SimpleVector2();
                        Interactive.getInstance().GetItemWorldPosition(io, senderPos);
                        Interactive.getInstance().GetItemWorldPosition(iio, ioPos);
                        // TODO - IF IO IS IN SENDER RADIUS, SEND EVENT
                        io.setStatSent(io.getStatSent() + 1);
                        this.stackSendIOScriptEvent(
                                iio,
                                0,
                                params.getEventParameters(),
                                params.getEventName());
                    }
                }
            }
        }
        if (params.hasFlag(SendParameters.ZONE)) {
            // SEND EVENT TO ALL OBJECTS IN A ZONE
            // ARX_PATH * ap = ARX_PATH_GetAddressByName(zonename);

            // if (ap !== NULL) {
            // LOOP THROUGH ALL IOs.
            var i = Interactive.getInstance().getMaxIORefId();
            for (; i >= 0; i--) {
                if (Interactive.getInstance().hasIO(i)) {
                    var iio = Interactive.getInstance().getIO(i);
                    // skip cameras and markers
                    // if (iio.hasIOFlag(IoGlobals.io_camera)
                    // || iio.hasIOFlag(IoGlobals.io_marker)) {
                    // continue;
                    // }
                    // skip IOs not in required group
                    if (params.hasFlag(SendParameters.GROUP)) {
                        if (!this.isIOInGroup(iio, params.getGroupName())) {
                            continue;
                        }
                    }
                    // if send event is for NPCs, send to NPCs,
                    // if for Items, send to Items, etc...
                    if ((params.hasFlag(SendParameters.NPC)
                            && iio.hasIOFlag(IoGlobals.IO_03_NPC))
                            // || (params.hasFlag(SendParameters.FIX)
                            // && iio.hasIOFlag(IoGlobals.IO_FIX))
                            || (params.hasFlag(SendParameters.ITEM)
                                    && iio.hasIOFlag(IoGlobals.IO_02_ITEM))) {
                    	var ioPos = new SimpleVector2();
                        Interactive.getInstance().GetItemWorldPosition(iio, ioPos);
                        // IF IO IS IN ZONE, SEND EVENT
                        // if (ARX_PATH_IsPosInZone(ap, _pos.x, _pos.y, _pos.z))
                        // {
                        io.setStatSent(io.getStatSent() + 1);
                        this.stackSendIOScriptEvent(
                                iio,
                                0,
                                params.getEventParameters(),
                                params.getEventName());
                        // }
                    }
                }
            }
        }
        if (params.hasFlag(SendParameters.GROUP)) {
            // sends an event to all members of a group
            // LOOP THROUGH ALL IOs.
            var i = Interactive.getInstance().getMaxIORefId();
            for (; i >= 0; i--) {
                if (Interactive.getInstance().hasIO(i)) {
                    var iio = Interactive.getInstance().getIO(i);
                    // skip IOs not in required group
                    if (!this.isIOInGroup(iio, params.getGroupName())) {
                        continue;
                    }
                    iio.setStatSent(io.getStatSent() + 1);
                    this.stackSendIOScriptEvent(
                            iio,
                            0,
                            params.getEventParameters(),
                            params.getEventName());
                }
            }
        } else {
            // SINGLE OBJECT EVENT
        	var tioid = Interactive.getInstance().getTargetByNameTarget(params.getTargetName());

            if (tioid === -2) {
                tioid = Interactive.getInstance().GetInterNum(io);
            }
            if (Interactive.getInstance().hasIO(tioid)) {
                io.setStatSent(io.getStatSent() + 1);
                this.stackSendIOScriptEvent(
                        Interactive.getInstance().getIO(tioid),
                        0,
                        params.getEventParameters(),
                        params.getEventName());
            }
        }
        this.eventSender = oes;
    }
    /**
     * Sends an initialization event to an IO. The initialization event runs the
     * local script first, followed by the over script.
     * @param io the IO
     * @return {@link int}
     * @if an error occurs
     */
    Script.prototype.sendInitScriptEvent = function(io) {
    	var BaseInteractiveObject = require("com/dalonedrow/rpg/base/flyweights/baseinteractiveobject");
    	try {
    		this.checkInstanceOfNullsAllowed(io, BaseInteractiveObject);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.sendInitScriptEvent() - io ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	var Interactive = require("com/dalonedrow/engine/systems/base/interactive");
        if (io === null) {
            return -1;
        }
        var num = io.getRefId();
        if (!Interactive.getInstance().hasIO(num)) {
            return -1;
        }
        var oldEventSender = this.eventSender;
        this.eventSender = null;
        // send script the init message
        var hio = Interactive.getInstance().getIO(num);
        if (hio.getScript() !== null) {
            this.GLOB = 0;
            this.sendScriptEvent(hio.getScript(),
                    ScriptGlobals.SM_001_INIT,
                    null,
                    hio,
                    null);
        }
        hio = null;
        // send overscript the init message
        if (Interactive.getInstance().getIO(num) !== null) {
            hio = Interactive.getInstance().getIO(num);
            if (hio.getOverscript() !== null) {
                this.GLOB = 0;
                this.sendScriptEvent(hio.getOverscript(),
                        ScriptGlobals.SM_001_INIT,
                        null,
                        hio,
                        null);
            }
            hio = null;
        }
        // send script the init end message
        if (Interactive.getInstance().getIO(num) !== null) {
            hio = Interactive.getInstance().getIO(num);
            if (hio.getScript() !== null) {
                this.GLOB = 0;
                this.sendScriptEvent(hio.getScript(),
                        ScriptGlobals.SM_033_INITEND,
                        null,
                        hio,
                        null);
            }
            hio = null;
        }
        // send overscript the init end message
        if (Interactive.getInstance().getIO(num) !== null) {
            hio = Interactive.getInstance().getIO(num);
            if (hio.getOverscript() !== null) {
                this.GLOB = 0;
                this.sendScriptEvent(hio.getOverscript(),
                        ScriptGlobals.SM_033_INITEND,
                        null,
                        hio,
                        null);
            }
            hio = null;
        }
        this.eventSender = oldEventSender;
        return ScriptGlobals.ACCEPT;
    }
    /**
     * Sends a script event to an interactive object. The returned value is a
     * flag indicating whether the event was successful or refused.
     * @param target the reference id of the targeted io
     * @param msg the message being sent
     * @param params the list of parameters applied, grouped in key-value pairs
     * @param eventname the name of the event, for example, new Object[]
     *            {"key0", value, "key1", new int[] {0, 0}}
     * @return <code>int</code>
     * @if an error occurs
     */
    Script.prototype.sendIOScriptEvent = function(target, msg, params, eventname) {
    	try {
    		this.checkInstanceOfNullsAllowed(target, BaseInteractiveObject);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.sendIOScriptEvent() - target ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkInteger(msg);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.sendIOScriptEvent() - msg ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkArrayNullsAllowed(params);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.sendIOScriptEvent() - params ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkStringNullsAllowed(eventname);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.sendIOScriptEvent() - eventname ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	var Interactive = require("com/dalonedrow/engine/systems/base/interactive");
        // checks invalid IO
        if (target === null) {
            return -1;
        }
        var num = target.getRefId();

        if (Interactive.getInstance().hasIO(num)) {
        	var originalEventSender = this.eventSender;
            if (msg === ScriptGlobals.SM_001_INIT
                    || msg === ScriptGlobals.SM_033_INITEND) {
            	var hio = Interactive.getInstance().getIO(num);
                this.sendIOScriptEventReverse(hio, msg, params, eventname);
                this.eventSender = originalEventSender;
                hio = null;
            }

            if (Interactive.getInstance().hasIO(num)) {
                // if this IO only has a Local script, send event to it
                var hio = Interactive.getInstance().getIO(num);
                if (hio.getOverscript() === null) {
                    this.GLOB = 0;
                    var ret = this.sendScriptEvent(
                            hio.getScript(),
                            msg,
                            params,
                            hio,
                            eventname);
                    this.eventSender = originalEventSender;
                    return ret;
                }

                // If this IO has a Global script send to Local (if exists)
                // then to Global if not overridden by Local
                var s = this.sendScriptEvent(
                        hio.getOverscript(),
                        msg,
                        params,
                        hio,
                        eventname);
                if (s !== ScriptGlobals.REFUSE) {
                    this.eventSender = originalEventSender;
                    this.GLOB = 0;

                    if (Interactive.getInstance().hasIO(num)) {
                        hio = Interactive.getInstance().getIO(num);
                        var ret = this.sendScriptEvent(
                                hio.getScript(),
                                msg,
                                params,
                                hio,
                                eventname);
                        this.eventSender = originalEventSender;
                        return ret;
                    } else {
                        return ScriptGlobals.REFUSE;
                    }
                }
                hio = null;
            }
            this.GLOB = 0;
        }

        // Refused further processing.
        return ScriptGlobals.REFUSE;
    }
    Script.prototype.sendIOScriptEventReverse = function(io, msg, params, eventname) {
    	var BaseInteractiveObject = require("com/dalonedrow/rpg/base/flyweights/baseinteractiveobject");
    	try {
    		this.checkInstanceOfNullsAllowed(io, BaseInteractiveObject);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.sendIOScriptEventReverse() - io ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkInteger(msg);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.sendIOScriptEventReverse() - msg ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkArrayNullsAllowed(params);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.sendIOScriptEventReverse() - params ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkStringNullsAllowed(eventname);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.sendIOScriptEventReverse() - eventname ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	var Interactive = require("com/dalonedrow/engine/systems/base/interactive");
        // checks invalid IO
        if (io === null) {
            return -1;
        }
        // checks for no script assigned
        if (io.getOverscript() === null
                && io.getScript() === null) {
            return -1;
        }
        var num = io.getRefId();
        if (Interactive.getInstance().hasIO(num)) {
            var hio = Interactive.getInstance().getIO(num);
            // if this IO only has a Local script, send event to it
            if (hio.getOverscript() === null
                    && hio.getScript() !== null) {
                this.GLOB = 0;
                return this.sendScriptEvent(
                         hio.getScript(),
                        msg,
                        params,
                        hio,
                        eventname);
            }

            // If this IO has a Global script send to Local (if exists)
            // then to global if no overriden by Local
            if (Interactive.getInstance().hasIO(num)) {
                hio = Interactive.getInstance().getIO(num);
                var s = this.sendScriptEvent(
                        hio.getScript(),
                        msg,
                        params,
                        hio,
                        eventname);
                if (s !== ScriptGlobals.REFUSE) {
                    this.GLOB = 0;
                    if (Interactive.getInstance().hasIO(io.getRefId())) {
                        return this.sendScriptEvent(
                                io.getOverscript(),
                                msg,
                                params,
                                io,
                                eventname);
                    } else {
                        return ScriptGlobals.REFUSE;
                    }
                }
            }
            hio = null;
            this.GLOB = 0;
        }
        // Refused further processing.
        return ScriptGlobals.REFUSE;
    }
    /**
     * Sends a scripted event to all IOs.
     * @param msg the message
     * @param dat any script variables
     * @return <code>int</code>
     * @if an error occurs
     */
    Script.prototype.sendMsgToAllIO = function(msg, dat) {
    	try {
    		this.checkInteger(msg);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.sendMsgToAllIO() - msg ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkArrayNullsAllowed(params);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.sendMsgToAllIO() - dat ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	var Interactive = require("com/dalonedrow/engine/systems/base/interactive");
        var ret = ScriptGlobals.ACCEPT;
        var i = Interactive.getInstance().getMaxIORefId();
        for (; i >= 0; i--) {
            if (Interactive.getInstance().hasIO(i)) {
                var io = Interactive.getInstance().getIO(i);
                if (this.sendIOScriptEvent(io, msg, dat, null) === ScriptGlobals.REFUSE) {
                    ret = ScriptGlobals.REFUSE;
                }
            }
        }
        return ret;
    }
    /**
     * Sends a scripted event to an IO.
     * @param localScript the local script the IO shoulod follow
     * @param msg the event message
     * @param params any parameters to be applied
     * @param io
     * @param eventName
     * @param info
     * @return
     * @throws RPGException
     */
    Script.prototype.sendScriptEvent = function(localScript, msg, params, io, eventName) {
    	var BaseInteractiveObject = require("com/dalonedrow/rpg/base/flyweights/baseinteractiveobject");
    	try {
    		this.checkInstanceOf(localScript, Scriptable);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.sendScriptEvent() - localScript ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkInteger(msg);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.sendScriptEvent() - msg ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkArrayNullsAllowed(params);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.sendScriptEvent() - params ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkInstanceOfNullsAllowed(io, BaseInteractiveObject);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.sendScriptEvent() - io ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkStringNullsAllowed(eventName);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.sendScriptEvent() - eventName ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	var retVal = ScriptGlobals.ACCEPT;
    	var keepGoing = true;
        if (io !== null) {
            if (io.hasGameFlag(IoGlobals.GFLAG_MEGAHIDE)
                    && msg !== ScriptGlobals.SM_043_RELOAD) {
                return ScriptGlobals.ACCEPT;
            }

            if (io.getShow() === IoGlobals.SHOW_FLAG_DESTROYED) {
                // destroyed
                return ScriptGlobals.ACCEPT;
            }
            this.eventTotalCount++;
            io.setStatCount(io.getStatCount() + 1);

            if (io.hasIOFlag(IoGlobals.IO_06_FREEZESCRIPT)) {
                if (msg === ScriptGlobals.SM_041_LOAD) {
                    return ScriptGlobals.ACCEPT;
                }
                return ScriptGlobals.REFUSE;
            }

            if (io.hasIOFlag(IoGlobals.IO_03_NPC)
                    && !io.hasIOFlag(IoGlobals.IO_09_DWELLING)) {
                if (io.getNPCData().getBaseLife() <= 0
                        && msg !== ScriptGlobals.SM_001_INIT
                        && msg !== ScriptGlobals.SM_012_DEAD
                        && msg !== ScriptGlobals.SM_017_DIE
                        && msg !== ScriptGlobals.SM_255_EXECUTELINE
                        && msg !== ScriptGlobals.SM_043_RELOAD
                        && msg !== ScriptGlobals.SM_255_EXECUTELINE
                        && msg !== ScriptGlobals.SM_028_INVENTORY2_OPEN
                        && msg !== ScriptGlobals.SM_029_INVENTORY2_CLOSE) {
                    return ScriptGlobals.ACCEPT;
                }
            }
            // change weapon if one breaks
            /*
             * if (((io->ioflags & IO_FIX) || (io->ioflags & IO_ITEM)) && (msg
             * === ScriptGlobals.SM_BREAK)) { ManageCasseDArme(io); }
             */
        }
        // use master script if available
        var script = localScript.getMaster();
        if (script === null) { // no master - use local script
            script = localScript;
        }
        // set parameters on script that will be used
        if (params !== null
                && params.length > 0) {
            for (var i = 0; i < params.length; i += 2) {
                script.setLocalVariable(params[i], params[i + 1]);
            }
        }
        // run the event
        if (eventName !== null
                && eventName.length() > 0) {
            this.runEvent(script, eventName, io);
        } else {
            if (this.eventIsDisallowed(msg, script)) {
                return ScriptGlobals.REFUSE;
            }
            this.runMessage(script, msg, io);
        }
        return ScriptGlobals.ACCEPT;
    }
    /**
     * Sets the value for the flag indicating whether debug output is turned on.
     * @param val the value to set
     */
    Script.prototype.setDebug = function(val) {
    	try {
    		this.checkBoolean(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.setDebug() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        this.debug = val;
    }
    Script.prototype.setEvent = function(io, event, isOn) {
    	try {
    		this.checkInstanceOf(io, BaseInteractiveObject);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.setEvent() - io ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkString(event);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.setEvent() - event ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkBoolean(isOn);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.setEvent() - isOn ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        if (event.toUpperCase() === "COLLIDE_NPC") {
            if (isOn) {
                io.getScript().removeDisallowedEvent(ScriptGlobals.DISABLE_COLLIDE_NPC);
            } else {
                io.getScript().assignDisallowedEvent(ScriptGlobals.DISABLE_COLLIDE_NPC);
            }
        } else if (event.toUpperCase() === "CHAT") {
            if (isOn) {
                io.getScript().removeDisallowedEvent(ScriptGlobals.DISABLE_CHAT);
            } else {
                io.getScript().assignDisallowedEvent(ScriptGlobals.DISABLE_CHAT);
            }
        } else if (event.toUpperCase() === "HIT") {
            if (isOn) {
                io.getScript().removeDisallowedEvent(ScriptGlobals.DISABLE_HIT);
            } else {
                io.getScript().assignDisallowedEvent(ScriptGlobals.DISABLE_HIT);
            }
        } else if (event.toUpperCase() === "INVENTORY2_OPEN") {
            if (isOn) {
                io.getScript().removeDisallowedEvent(ScriptGlobals.DISABLE_INVENTORY2_OPEN);
            } else {
                io.getScript().assignDisallowedEvent(ScriptGlobals.DISABLE_INVENTORY2_OPEN);
            }
        } else if (event.toUpperCase() === "DETECTPLAYER") {
            if (isOn) {
                io.getScript().removeDisallowedEvent(ScriptGlobals.DISABLE_DETECT);
            } else {
                io.getScript().assignDisallowedEvent(ScriptGlobals.DISABLE_DETECT);
            }
        } else if (event.toUpperCase() === "HEAR") {
            if (isOn) {
                io.getScript().removeDisallowedEvent(ScriptGlobals.DISABLE_HEAR);
            } else {
                io.getScript().assignDisallowedEvent(ScriptGlobals.DISABLE_HEAR);
            }
        } else if (event.toUpperCase() === "AGGRESSION") {
            if (isOn) {
                io.getScript().removeDisallowedEvent(ScriptGlobals.DISABLE_AGGRESSION);
            } else {
                io.getScript().assignDisallowedEvent(ScriptGlobals.DISABLE_AGGRESSION);
            }
        } else if (event.toUpperCase() === "MAIN") {
            if (isOn) {
                io.getScript().removeDisallowedEvent(ScriptGlobals.DISABLE_MAIN);
            } else {
                io.getScript().assignDisallowedEvent(ScriptGlobals.DISABLE_MAIN);
            }
        } else if (event.toUpperCase() === "CURSORMODE") {
            if (isOn) {
                io.getScript().removeDisallowedEvent(ScriptGlobals.DISABLE_CURSORMODE);
            } else {
                io.getScript().assignDisallowedEvent(ScriptGlobals.DISABLE_CURSORMODE);
            }
        } else if (event.toUpperCase() === "EXPLORATIONMODE") {
            if (isOn) {
                io.getScript().removeDisallowedEvent(ScriptGlobals.DISABLE_EXPLORATIONMODE);
            } else {
                io.getScript().assignDisallowedEvent(ScriptGlobals.DISABLE_EXPLORATIONMODE);
            }
        }
    }
    /**
     * Sets the value of the eventSender.
     * @param val the new value to set
     */
    Script.prototype.setEventSender = function(io) {
    	try {
    		this.checkInstanceOfNullsAllowed(io, BaseInteractiveObject);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.setEventSender() - io ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        this.eventSender = io;
    }
    /**
     * Sets a global variable.
     * @param name the name of the global variable
     * @param value the variable's value
     * @if an error occurs
     */
    Script.prototype.setGlobalVariable = function(name, value) {
    	try {
    		this.checkString(name);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.setGlobalVariable() - name ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	if (value === undefined) {
            throw new Error("ERROR! Script.setGlobalVariable() - value is undefined");
    	}
    	if (value === null) {
            throw new Error("ERROR! Script.setGlobalVariable() - value is null");
    	}
        if (this.gvars === null) {
            this.gvars = [];
        }
        var found = false;
        for (var i = this.gvars.length - 1; i >= 0; i--) {
            var vari = this.gvars[i];
            if (vari !== null
                    && vari.getName() !== null
                    && vari.getName() === name) {
                // found the correct script variable
                vari.set(value);
                found = true;
                break;
            }
        }
        if (!found) {
            // create a new variable and add to the global array
        	var vari = null;
            if (typeof value === "string") {
                vari = new ScriptVariable(name, ScriptGlobals.TYPE_G_00_TEXT, value);
            } else if (!isNaN(value)) {
        		if (parseInt(Number(value)) === value
        				&& !isNaN(parseInt(value, 10))) {
                    vari = new ScriptVariable(name, ScriptGlobals.TYPE_G_04_INT, value);
        		} else {
                    vari = new ScriptVariable(name, ScriptGlobals.TYPE_G_02_FLOAT, value);        			
        		}
            } else if (Array.isArray(value)) {
            	var all = true; // check to see if all array values are strings
            	for (var i = value.length - 1; i >= 0; i--) {
            		if (typeof value[i] !== "string") {
            			all = false;
            			break;
            		}
            	}
        		if (all) {
                    vari = new ScriptVariable(name,ScriptGlobals.TYPE_G_01_TEXT_ARR, value);
        		} else {
        			all = true; // check to see if all array values are numbers
                	for (var i = value.length - 1; i >= 0; i--) {
                		if (isNaN(value)) {
                			all = false;
                			break;
                		}
                	}
                	if (all) { // check to see if all array values are integers
                    	for (var i = value.length - 1; i >= 0; i--) {
                    		if (parseInt(Number(value)) !== value
                    				|| isNaN(parseInt(value, 10))) {
                    			all = false;
                    			break;
                    		}
                    	}
                    	if (all) {
                            vari = new ScriptVariable(name, ScriptGlobals.TYPE_G_05_INT_ARR, value);
                    	} else {
                            vari = new ScriptVariable(name, ScriptGlobals.TYPE_G_03_FLOAT_ARR, value);
                    	}
                	} else {
                		throw new Error("Array values must be consistent");
                	}
        		}
            }
            this.gvars.push(vari);
        }
    }
    /**
     * Sets the main event for an IO.
     * @param io the IO
     * @param newevent the event's name
     */
    Script.prototype.setMainEvent = function(io, newevent) {
    	try {
    		this.checkInstanceOfNullsAllowed(io, BaseInteractiveObject);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.setMainEvent() - io ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkString(newevent);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.setMainEvent() - newevent ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        if (io !== null) {
            if ("MAIN" !== newevent.toUpperCase()) {
                io.setMainevent(null);
            } else {
                io.setMainevent(newevent);
            }
        }
    }
    /**
     * Sets the maximum number of timer scripts.
     * @param val the maximum number of timer scripts to set
     */
    Script.prototype.setMaxTimerScript = function(val) {
    	try {
    		this.checkInteger(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.setMaxTimerScript() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        this.maxTimerScript = val;
    }
    /**
     * Processes and IO's speech.
     * @param io the IO
     * @param params the {@link SpeechParameters}
     * @
     */
    Script.prototype.speak = function(io, params) {
    	try {
    		this.checkInstanceOf(io, BaseInteractiveObject);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.speak() - io ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkInstanceOf(params, SpeechParameters);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.speak() - params ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        // speech variables
        // ARX_CINEMATIC_SPEECH acs;
        // acs.type = ARX_CINE_SPEECH_NONE;
    	var voixoff = 0;
    	var mood = ScriptGlobals.ANIM_TALK_NEUTRAL;
        if (params.isKillAllSpeech()) {
            // ARX_SPEECH_Reset();
        } else {
            if (params.hasFlag(SpeechParameters.HAPPY)) {
                mood = ScriptGlobals.ANIM_TALK_HAPPY;
            }
            if (params.hasFlag(SpeechParameters.ANGRY)) {
                mood = ScriptGlobals.ANIM_TALK_ANGRY;
            }
            if (params.hasFlag(SpeechParameters.OFF_VOICE)) {
                voixoff = 2;
            }
            if (params.hasFlag(SpeechParameters.KEEP_SPEECH)
                    || params.hasFlag(SpeechParameters.ZOOM_SPEECH)
                    || params.hasFlag(SpeechParameters.SPEECH_CCCTALKER_L)
                    || params.hasFlag(SpeechParameters.SPEECH_CCCTALKER_R)
                    || params.hasFlag(SpeechParameters.SPEECH_CCCLISTENER_L)
                    || params.hasFlag(SpeechParameters.SPEECH_CCCLISTENER_R)
                    || params.hasFlag(SpeechParameters.SIDE_L)
                    || params.hasFlag(SpeechParameters.SIDE_R)) {
                // FRAME_COUNT = 0;
                if (params.hasFlag(SpeechParameters.KEEP_SPEECH)) {
                    // acs.type = ARX_CINE_SPEECH_KEEP;
                    // acs.pos1.x = LASTCAMPOS.x;
                    // acs.pos1.y = LASTCAMPOS.y;
                    // acs.pos1.z = LASTCAMPOS.z;
                    // acs.pos2.a = LASTCAMANGLE.a;
                    // acs.pos2.b = LASTCAMANGLE.b;
                    // acs.pos2.g = LASTCAMANGLE.g;
                }
                if (params.hasFlag(SpeechParameters.ZOOM_SPEECH)) {
                    // acs.type = ARX_CINE_SPEECH_ZOOM;
                    // pos = GetNextWord(es, pos, temp2);
                    // acs.startangle.a = GetVarValueInterpretedAsFloat(temp2,
                    // esss, io);
                    // pos = GetNextWord(es, pos, temp2);
                    // acs.startangle.b = GetVarValueInterpretedAsFloat(temp2,
                    // esss, io);
                    // pos = GetNextWord(es, pos, temp2);
                    // acs.endangle.a = GetVarValueInterpretedAsFloat(temp2,
                    // esss, io);
                    // pos = GetNextWord(es, pos, temp2);
                    // acs.endangle.b = GetVarValueInterpretedAsFloat(temp2,
                    // esss, io);
                    // pos = GetNextWord(es, pos, temp2);
                    // acs.startpos = GetVarValueInterpretedAsFloat(temp2, esss,
                    // io);
                    // pos = GetNextWord(es, pos, temp2);
                    // acs.endpos = GetVarValueInterpretedAsFloat(temp2, esss,
                    // io);

                    // ARX_CHECK_NO_ENTRY(); //ARX: xrichter (2010-07-20) -
                    // temp2 is often (always?) a string number and
                    // GetTargetByNameTarget return -1. To be careful if temp2
                    // is not a string number, we choose to test
                    // GetTargetByNameTarget return value.
                    // acs.ionum = GetTargetByNameTarget(temp2);

                    // if (acs.ionum === -2) //means temp2 is "me" or "self"
                    // acs.ionum = GetInterNum(io);

                    if (params.hasFlag(SpeechParameters.PLAYER)) {
                        // ComputeACSPos(&acs, inter.iobj[0], acs.ionum);
                    } else {
                        // ComputeACSPos(&acs, io, -1);
                    }
                }
                if (params.hasFlag(SpeechParameters.SPEECH_CCCTALKER_L)
                        || params.hasFlag(SpeechParameters.SPEECH_CCCTALKER_R)) {
                    if (params.hasFlag(SpeechParameters.SPEECH_CCCTALKER_L)) {
                        // acs.type = ARX_CINE_SPEECH_CCCTALKER_R;
                    } else {
                        // acs.type = ARX_CINE_SPEECH_CCCTALKER_L;
                    }
                    // pos = GetNextWord(es, pos, temp2);
                    // acs.ionum = GetTargetByNameTarget(temp2);

                    // if (acs.ionum === -2) acs.ionum = GetInterNum(io);

                    // pos = GetNextWord(es, pos, temp2);
                    // acs.startpos = GetVarValueInterpretedAsFloat(temp2, esss,
                    // io);
                    // pos = GetNextWord(es, pos, temp2);
                    // acs.endpos = GetVarValueInterpretedAsFloat(temp2, esss,
                    // io);

                    if (params.hasFlag(SpeechParameters.PLAYER)) {
                        // ComputeACSPos(&acs, inter.iobj[0], acs.ionum);
                    } else {
                        // ComputeACSPos(&acs, io, acs.ionum);
                    }
                }
                if (params.hasFlag(SpeechParameters.SPEECH_CCCLISTENER_L)
                        || params.hasFlag(
                                SpeechParameters.SPEECH_CCCLISTENER_R)) {
                    if (params.hasFlag(SpeechParameters.SPEECH_CCCLISTENER_L)) {
                        // acs.type = ARX_CINE_SPEECH_CCCLISTENER_L;
                    } else {
                        // acs.type = ARX_CINE_SPEECH_CCCLISTENER_R;
                    }
                    // pos = GetNextWord(es, pos, temp2);
                    // acs.ionum = GetTargetByNameTarget(temp2);

                    // if (acs.ionum === -2) acs.ionum = GetInterNum(io);

                    // pos = GetNextWord(es, pos, temp2);
                    // acs.startpos = GetVarValueInterpretedAsFloat(temp2, esss,
                    // io);
                    // pos = GetNextWord(es, pos, temp2);
                    // acs.endpos = GetVarValueInterpretedAsFloat(temp2, esss,
                    // io);

                    if (params.hasFlag(SpeechParameters.PLAYER)) {
                        // ComputeACSPos(&acs, inter.iobj[0], acs.ionum);
                    } else {
                        // ComputeACSPos(&acs, io, acs.ionum);
                    }
                }
                if (params.hasFlag(SpeechParameters.SIDE_L)
                        || params.hasFlag(SpeechParameters.SIDE_R)) {
                    if (params.hasFlag(SpeechParameters.SIDE_L)) {
                        // acs.type = ARX_CINE_SPEECH_SIDE_LEFT;
                    } else {
                        // acs.type = ARX_CINE_SPEECH_SIDE;
                    }
                    // pos = GetNextWord(es, pos, temp2);
                    // acs.ionum = GetTargetByNameTarget(temp2);

                    // if (acs.ionum === -2) acs.ionum = GetInterNum(io);

                    // pos = GetNextWord(es, pos, temp2);
                    // acs.startpos = GetVarValueInterpretedAsFloat(temp2, esss,
                    // io);
                    // pos = GetNextWord(es, pos, temp2);
                    // acs.endpos = GetVarValueInterpretedAsFloat(temp2, esss,
                    // io);
                    // startdist
                    // pos = GetNextWord(es, pos, temp2);
                    // acs.f0 = GetVarValueInterpretedAsFloat(temp2, esss, io);
                    // enddist
                    // pos = GetNextWord(es, pos, temp2);
                    // acs.f1 = GetVarValueInterpretedAsFloat(temp2, esss, io);
                    // height modifier
                    // pos = GetNextWord(es, pos, temp2);
                    // acs.f2 = GetVarValueInterpretedAsFloat(temp2, esss, io);

                    if (params.hasFlag(SpeechParameters.PLAYER)) {
                        // ComputeACSPos(&acs, inter.iobj[0], acs.ionum);
                    } else {
                        // ComputeACSPos(&acs, io, acs.ionum);
                    }
                }
            }

            var speechnum = 0;

            if (params.getSpeechName() === null
                    || params.getSpeechName().length() === 0) {
                // ARX_SPEECH_ClearIOSpeech(io);
            } else {
                if (params.hasFlag(SpeechParameters.NO_TEXT)) {
                    // voixoff |= ARX_SPEECH_FLAG_NOTEXT;
                }

                // if (!CINEMASCOPE) voixoff |= ARX_SPEECH_FLAG_NOTEXT;
                if (params.hasFlag(SpeechParameters.PLAYER)) {
                    // speechnum = ARX_SPEECH_AddSpeech(inter.iobj[0], temp1,
                    // PARAM_LOCALISED, mood, voixoff);
                } else {
                    // speechnum = ARX_SPEECH_AddSpeech(io, temp1,
                    // PARAM_LOCALISED, mood, voixoff);
                    speechnum = Speech.getInstance().ARX_SPEECH_AddSpeech(
                    		io, mood, params.getSpeechName(), voixoff);
                }

                if (speechnum >= 0) {
                    // ARX_SCRIPT_Timer_GetDefaultName(timername2);
                    // sprintf(timername, "SPEAK_%s", timername2);
                    // aspeech[speechnum].scrpos = pos;
                    // aspeech[speechnum].es = es;
                    // aspeech[speechnum].ioscript = io;
                    if (params.hasFlag(SpeechParameters.UNBREAKABLE)) {
                        // aspeech[speechnum].flags |=
                        // ARX_SPEECH_FLAG_UNBREAKABLE;
                    }

                    // memcpy(&aspeech[speechnum].cine, &acs,
                    // sizeof(ARX_CINEMATIC_SPEECH));
                    // pos = GotoNextLine(es, pos);
                }
            }
        }
    }
    /**
     * Sends a scripted event to the event stack for all members of a group, to
     * be fired during the game cycle.
     * @param group the name of the IO group
     * @param msg the script message
     * @param params the parameters assigned to the script
     * @param eventname the event name
     * @if an error occurs
     */
    Script.prototype.stackSendGroupScriptEvent = function(group, msg, params, eventname) {
    	try {
    		this.checkString(group);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.stackSendGroupScriptEvent() - group ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkInteger(msg);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.stackSendGroupScriptEvent() - msg ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkArrayNullsAllowed(params);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.stackSendGroupScriptEvent() - params ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkStringNullsAllowed(eventname);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.stackSendGroupScriptEvent() - eventname ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	var Interactive = require("com/dalonedrow/engine/systems/base/interactive");
        var i = Interactive.getInstance().getMaxIORefId();
        for (; i >= 0; i--) {
            if (Interactive.getInstance().hasIO(i)) {
                var io = Interactive.getInstance().getIO(i);
                if (this.isIOInGroup(io, group)) {
                    this.stackSendIOScriptEvent(io, msg, params, eventname);
                }
                io = null;
            }
        }
    }
    /**
     * Sends an IO scripted event to the event stack, to be fired during the
     * game cycle.
     * @param io the IO
     * @param msg the script message
     * @param params the parameters assigned to the script
     * @param eventname the event name
     */
    Script.prototype.stackSendIOScriptEvent = function(io, msg, params, eventname) {
    	try {
    		this.checkInstanceOf(io, BaseInteractiveObject);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.stackSendIOScriptEvent() - io ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkInteger(msg);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.stackSendIOScriptEvent() - msg ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkArrayNullsAllowed(params);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.stackSendIOScriptEvent() - params ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkStringNullsAllowed(eventname);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.stackSendIOScriptEvent() - eventname ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        for (var i = 0; i < ScriptGlobals.MAX_EVENT_STACK; i++) {
            if (!this.getStackedEvent(i).exists()) {
                if (params !== null
                        && params.length > 0) {
                    this.getStackedEvent(i).setParams(params);
                } else {
                    this.getStackedEvent(i).setParams(null);
                }
                if (eventname !== null
                        && eventname.length() > 0) {
                    this.getStackedEvent(i).setEventname(eventname);
                } else {
                    this.getStackedEvent(i).setEventname(null);
                }

                this.getStackedEvent(i).setSender(this.eventSender);
                this.getStackedEvent(i).setIo(io);
                this.getStackedEvent(i).setMsg(msg);
                this.getStackedEvent(i).setExist(true);
                break;
            }
        }
    }
    /**
     * Adds messages for all NPCs to the event stack.
     * @param msg the message
     * @param dat the message parameters
     */
    Script.prototype.stackSendMsgToAllNPCIO = function(msg, dat) {
    	try {
    		this.checkInteger(msg);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.stackSendMsgToAllNPCIO() - msg ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkArrayNullsAllowed(params);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.stackSendMsgToAllNPCIO() - dat ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	var Interactive = require("com/dalonedrow/engine/systems/base/interactive");
        var i = Interactive.getInstance().getMaxIORefId();
        for (; i >= 0; i--) {
            if (Interactive.getInstance().hasIO(i)) {
                var io = Interactive.getInstance().getIO(i);
                if (io.hasIOFlag(IoGlobals.IO_03_NPC)) {
                    this.stackSendIOScriptEvent(io, msg, dat, null);
                }
            }
        }
    }
    /**
     * Starts a timer using a defined set of parameters.
     * @param params the parameters
     */
    Script.prototype.startTimer = function(params) {
    	try {
    		this.checkInstanceOf(params, ScriptTimerInitializationParameters);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.startTimer() - params ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	var timerNum = timerGetFree();
    	var timer = getScriptTimer(timerNum);
        timer.setScript(params.getScript());
        timer.setExists(true);
        timer.setIo(params.getIo());
        timer.setCycleLength(params.getMilliseconds());
        if (params.getName() === null
                || (params.getName() !== null
                        && params.getName().length() === 0)) {
            timer.setName(this.timerGetDefaultName());
        } else {
            timer.setName(params.getName());
        }
        timer.setAction(new ScriptTimerAction(
                params.getObj(),
                params.getMethod(),
                params.getArgs()));
        timer.setLastTimeCheck(params.getStartTime());
        timer.setRepeatTimes(params.getRepeatTimes());
        timer.clearFlags();
        timer.addFlag(params.getFlagValues());
    }
    /**
     * Teleports an IO to a target location.
     * @param io the io calling for the teleport event
     * @param behind flag indicating the target teleports behind
     * @param isPlayer flag indicating object being teleported is the player
     * @param initPosition flag indicating the object being teleported goes to
     *            its initial position
     * @param target the name of teleport destination
     * @if an error occurs
     */
    Script.prototype.teleport = function(io, behind, isPlayer, initPosition, target) {
    	try {
    		this.checkInstanceOf(io, BaseInteractiveObject);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.teleport() - io ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkBoolean(behind);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.teleport() - behind ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkBoolean(isPlayer);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.teleport() - isPlayer ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkBoolean(initPosition);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.teleport() - initPosition ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkString(target);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.teleport() - target ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	var Interactive = require("com/dalonedrow/engine/systems/base/interactive");
        if (behind) {
            Interactive.getInstance().ARX_INTERACTIVE_TeleportBehindTarget(io);
        } else {
            if (!initPosition) {
                var ioid = Interactive.getInstance().getTargetByNameTarget(target);

                if (ioid === -2) {
                    ioid = Interactive.getInstance().GetInterNum(io);
                }
                if (ioid !== -1
                        && ioid !== -2) {
                    if (ioid === -3) {
                        if (io.getShow() !== IoGlobals.SHOW_FLAG_LINKED
                                && io.getShow() !== IoGlobals.SHOW_FLAG_HIDDEN
                                && io.getShow() !== IoGlobals.SHOW_FLAG_MEGAHIDE
                                && io.getShow() !== IoGlobals.SHOW_FLAG_DESTROYED
                                && io.getShow() !== IoGlobals.SHOW_FLAG_KILLED) {
                            io.setShow(IoGlobals.SHOW_FLAG_IN_SCENE);
                        }
                        var pio = Interactive.getInstance().getIO(ProjectConstants.getInstance().getPlayer());
                        Interactive.getInstance().ARX_INTERACTIVE_Teleport(io, pio.getPosition());
                        pio = null;
                    } else {
                        if (Interactive.getInstance().hasIO(ioid)) {
                        	var tio = Interactive.getInstance().getIO(ioid);
                        	var pos = new SimpleVector2();

                            if (Interactive.getInstance().GetItemWorldPosition(tio, pos)) {
                                if (isPlayer) {
                                	var pio = Interactive.getInstance().getIO(
                                			ProjectConstants.getInstance().getPlayer());
                                    Interactive.getInstance().ARX_INTERACTIVE_Teleport(pio, pos);
                                    pio = null;
                                } else {
                                    if (io.hasIOFlag(IoGlobals.IO_03_NPC)
                                            && io.getNPCData().getBaseLife() <= 0) {
                                        // do nothing
                                    } else {
                                        if (io.getShow() !== IoGlobals.SHOW_FLAG_HIDDEN
                                                && io.getShow() !== IoGlobals.SHOW_FLAG_MEGAHIDE) {
                                            io.setShow(IoGlobals.SHOW_FLAG_IN_SCENE);
                                        }
                                        Interactive.getInstance().ARX_INTERACTIVE_Teleport(io, pos);
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                if (io !== null) {
                    if (isPlayer) {
                    	var pos = new SimpleVector2();
                        if (Interactive.getInstance().GetItemWorldPosition(io, pos)) {
                        	var pio = Interactive.getInstance().getIO(
                        			ProjectConstants.getInstance().getPlayer());
                            Interactive.getInstance().ARX_INTERACTIVE_Teleport(pio, pos);
                            pio = null;
                        }
                    } else {
                        if (io.hasIOFlag(IoGlobals.IO_03_NPC)
                                && io.getNPCData().getBaseLife() <= 0) {
                            // do nothing
                        } else {
                            if (io.getShow() !== IoGlobals.SHOW_FLAG_HIDDEN
                                    && io.getShow() !== IoGlobals.SHOW_FLAG_MEGAHIDE) {
                                io.setShow(IoGlobals.SHOW_FLAG_IN_SCENE);
                            }
                            Interactive.getInstance().ARX_INTERACTIVE_Teleport(io, io.getInitPosition());
                        }
                    }
                }
            }
        }
    }
    Script.prototype.timerCheck = function() {
    	var Interactive = require("com/dalonedrow/engine/systems/base/interactive");
        if (this.countTimers() > 0) {
            for (var i = 0, len = this.this.maxTimerScript; i < len; i++) {
            	var timer = this.getScriptTimers()[i];
                if (timer.exists()) {
                	var currentTime = Time.getInstance().getGameTime();
                    if (timer.isTurnBased()) {
                        currentTime = Time.getInstance().getGameRound();
                    }
                    if (timer.hasFlag(1)) {
                        if (!timer.getIo().hasGameFlag(
                                IoGlobals.GFLAG_ISINTREATZONE)) {
                            while (timer.getLastTimeCheck() + timer.getCycleLength() < currentTime) {
                                timer.setLastTimeCheck(timer.getLastTimeCheck() + timer.getCycleLength());
                            }
                            continue;
                        }
                    }
                    if (timer.getLastTimeCheck() + timer.getCycleLength() < currentTime) {
                    	var script = timer.getScript();
                    	var io = timer.getIo();
                        if (script !== null) {
                            if (timer.getName().toUpperCase() === "_R_A_T_") {
                                // if (Manage_Specific_RAT_Timer(st))
                                continue;
                            }
                        }
                        if (timer.getRepeatTimes() === 1) {
                            this.timerClearByNum(i);
                        } else {
                            if (timer.getRepeatTimes() !== 0) {
                                timer.setRepeatTimes(timer.getRepeatTimes() - 1);
                            }
                            timer.setLastTimeCheck(timer.getLastTimeCheck()+ timer.getCycleLength());
                        }
                        if (script !== null
                                && Interactive.getInstance().hasIO(io)) {
                            timer.getAction().process();
                        }
                        script = null;
                        io = null;
                    }
                }
                timer = null;
            }
        }
    }
    /** Clears all timers in play. */
    Script.prototype.timerClearAll = function() {
        for (var i = 0; i < this.maxTimerScript; i++) {
            this.timerClearByNum(i);
        }
    }
    Script.prototype.timerClearAllLocalsForIO = function(io) {
    	try {
    		this.checkInstanceOf(io, BaseInteractiveObject);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.timerClearAllLocalsForIO() - io ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        var scriptTimers = this.getScriptTimers();
        for (var i = 0; i < this.maxTimerScript; i++) {
            if (scriptTimers[i].exists()) {
                if (scriptTimers[i].getIo().equals(io)
                        && scriptTimers[i].getScript().equals(io.getOverscript())) {
                    this.timerClearByNum(i);
                }
            }
        }
    }
    /**
     * Clears a timer by the IO assigned to it.
     * @param io the IO
     */
    Script.prototype.timerClearByIO = function(io) {
    	try {
    		this.checkInstanceOf(io, BaseInteractiveObject);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.timerClearByIO() - io ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        var scriptTimers = this.getScriptTimers();
        for (var i = 0; i < this.maxTimerScript; i++) {
            if (scriptTimers[i] !== null
                    && scriptTimers[i].exists()) {
                if (scriptTimers[i].getIo().getRefId() === io.getRefId()) {
                    this.timerClearByNum(i);
                }
            }
        }
    }
    Script.prototype.timerClearByNameAndIO = function(timername, io) {
    	try {
    		this.checkString(timername);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.timerClearByNameAndIO() - timername ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkInstanceOf(io, BaseInteractiveObject);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.timerClearByNameAndIO() - io ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        var scriptTimers = this.getScriptTimers();
        for (var i = 0; i < this.maxTimerScript; i++) {
            if (scriptTimers[i] !== null
                    && scriptTimers[i].exists()) {
                if (scriptTimers[i].getIo().getRefId() === io.getRefId()
                        && timername.toLowerCase() === scriptTimers[i].getName().toLowerCase()) {
                    this.timerClearByNum(i);
                }
            }
        }
    }
    /**
     * Clears a timer by its index on the timers list.
     * @param timeridx the index
     */
    Script.prototype.timerClearByNum = function(timeridx) {
    	try {
    		this.checkInteger(timeridx);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.timerClearByNum() - timeridx ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        var scriptTimers = this.getScriptTimers();
        if (scriptTimers[timeridx].exists()) {
            scriptTimers[timeridx].setName(null);
            scriptTimers[timeridx].setExists(false);
        }
    }
    /**
     * Determines whether a specific named timer exists.
     * @param texx the timer's name
     * @return the timer's index if it exists, otherwise returns -1
     */
    Script.prototype.timerExist = function(texx) {
    	try {
    		this.checkString(texx);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.timerExist() - texx ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        var index = -1;
        var scriptTimers = this.getScriptTimers();
        for (var i = 0; i < this.maxTimerScript; i++) {
            if (scriptTimers[i].exists()) {
                if (scriptTimers[i].getName() !== null
                        && scriptTimers[i].getName().toLowerCase() === texx.toLowerCase()) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    }
    /**
     * Initializes all game timers.
     * @param number the maximum number of timers used. Must be at least 100.
     */
    Script.prototype.timerFirstInit = function(number) {
    	try {
    		this.checkInteger(number);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.timerFirstInit() - number ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        if (number < 100) {
            this.setMaxTimerScript(100);
        } else {
        	this.setMaxTimerScript(number);
        }
        this.destroyScriptTimers();
        this.initScriptTimers();
    }
    /**
     * Generates a random name for an unnamed timer.
     * @return {@link String}
     */
    Script.prototype.timerGetDefaultName = function() {
        var i = 1;
        var texx;

        while (true) {
            var sb = [];
            sb.push("TIMER_");
            sb.push(i);
            i++;

            if (this.timerExist(sb.join("")) === -1) {
                texx = sb.join("");
                break;
            }
        }
        return texx;
    }
    /**
     * Gets the index of a free script timer.
     * @return <code>int</code>
     */
    Script.prototype.timerGetFree = function() {
        var index = -1;
        var scriptTimers = this.getScriptTimers();
        for (var i = 0; i < this.maxTimerScript; i++) {
            if (!scriptTimers[i].exists()) {
                index = i;
                break;
            }
        }
        return index;
    }
    /**
     * Determines if an IO is speaking.
     * @param io the IO
     * @return <tt>true</tt> if the IO is speaking; <tt>false</tt> otherwise
     */
    Script.prototype.amISpeaking = function(io) {
    	try {
    		this.checkInstanceOf(io, BaseInteractiveObject);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Script.amISpeaking() - io ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        // TODO Auto-generated method stub
        // GO THROUGH ALL SPEECH INSTANCES.  IF THE IO IS SPEAKING
        // RETURN FALSE.  OTHERWISE TRUE
        //for (long i = 0; i < MAX_ASPEECH; i++) {
            //if (aspeech[i].exist) {
                //if (io === aspeech[i].io) {
                    //*lcontent = 1;
                    //return TYPE_LONG;
                //}
            //}
        //}
        return false;
    }
    Script.prototype.getGameSeconds = function() {
        return Time.getInstance().getGameTime(false);
    }
	Script.getInstance = function() {
        if (instance === null) {
        	throw new Error("No instance has been set!");
        }
        return instance;
	}
	Script.setInstance = function(val) {
		if (val === undefined) {
	        throw new Error("Error!  Script.setInstance() - val is undefined");
		}
		if (val === null) {
	        throw new Error("Error!  Script.setInstance() - val is null");
		}
		if (!(val instanceof Script)) {
	        throw new Error("Error!  Script.setInstance() - val is not a Script subclass.")
		}
		instance = val;
	}
	return Script;
});
