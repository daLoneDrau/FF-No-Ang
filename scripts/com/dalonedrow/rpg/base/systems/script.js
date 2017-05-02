/**
 * Script
 * module with no dependencies
 */
define(["require", "com/dalonedrow/engine/sprite/base/simplevector2",
	"com/dalonedrow/engine/systems/base/interactive",
	"com/dalonedrow/engine/systems/base/projectconstants",
	"com/dalonedrow/rpg/base/constants/ioglobals",
	"com/dalonedrow/rpg/base/constants/scriptglobals",
	"com/dalonedrow/rpg/base/flyweights/baseinteractiveobject",
	"com/dalonedrow/rpg/base/flyweights/scripttimer",
	"com/dalonedrow/rpg/base/flyweights/scripttimeraction",
	"com/dalonedrow/rpg/base/flyweights/scripttimerinitializationparameters",
	"com/dalonedrow/rpg/base/flyweights/scriptable",
	"com/dalonedrow/rpg/base/flyweights/scriptvariable",
	"com/dalonedrow/rpg/base/flyweights/sendparameters",
	"com/dalonedrow/rpg/base/flyweights/speechparameters",
	"com/dalonedrow/rpg/base/flyweights/ioitemdata", "com/dalonedrow/rpg/base/flyweights/ionpcdata",
	"com/dalonedrow/rpg/base/flyweights/iopcdata",
	"com/dalonedrow/rpg/base/flyweights/iospellcastdata",
	"com/dalonedrow/rpg/base/flyweights/scriptable", 
	"com/dalonedrow/rpg/base/flyweights/stackedevent", "com/dalonedrow/utils/hashcode"],
		function(require, SimpleVector2, Interactive, ProjectConstants, IoGlobals, ScriptGlobals,
				BaseInteractiveObject, ScriptTimer, ScriptTimerAction,
				ScriptTimerInitializationParameters, Scriptable, ScriptVariable, SendParameters,
				SpeechParameters, StackedEvent, Hashcode) {
    function Script() {
		Hashcode.call(this);
	    var ARXPausedTime = false;
	    /** the flag indicating whether debug output is turned on. */
	    var debug = false;
	    var EDITMODE = false;
	    var eventSender = null;
	    var eventTotalCount = 0;
	    var GLOB = 0;
	    /** the list of global script variables. */
	    var gvars = [];
	    /** the maximum number of timer scripts. */
	    var maxTimerScript = 0;
	    var PauseScript = false;
	    var stackFlow = 8;
	    /**
	     * Adds an IO to a specific group.
	     * @param io the IO
	     * @param group the group name
	     */
	    this.addToGroup = function(io, group) {
	        if (io !== null
	                && group !== null) {
	            io.addGroup(group);
	        }
	    }
	    this.allowInterScriptExecution = function() {
	    	var ppos = 0;
	
	        if (!PauseScript && !EDITMODE && !ARXPausedTime) {
	            eventSender = null;
	
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
	                            this.sendIOScriptEvent(io, 0, null, io.getMainevent());
	                        } else {
	                            this.sendIOScriptEvent(
	                                    io, ScriptGlobals.SM_008_MAIN, null, null);
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
	     * @throws RPGException if an error occurs
	     */
	    this.cloneLocalVars = function(src, dest) {
	        if (dest !== null
	                && src !== null) {
	            this.freeAllLocalVariables(dest);
	            if (src.getScript().hasLocalVariables()) {
	                var i = src.getScript().getLocalVarArrayLength() - 1;
	                for (; i >= 0; i--) {
	                    dest.getScript().setLocalVariable(new ScriptVariable(
	                            src.getScript().getLocalVariable(i)));
	                }
	            }
	        }
	    }
	    /**
	     * Count the number of active script timers.
	     * @return <code>int</code>
	     */
	    this.countTimers = function() {
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
	    this.destroyScriptTimers = function() {
	    	
	    }
	    /**
	     * Checks to see if a scripted event is disallowed.
	     * @param msg the event message id
	     * @param script the {@link Scriptable} script
	     * @return <tt>true</tt> if the event is not allowed; <tt>false</tt>
	     *         otherwise
	     */
	    var eventIsDisallowed = function(msg, script) {
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
	            if (script.hasAllowedEvent(
	                    ScriptGlobals.DISABLE_AGGRESSION)) {
	                disallowed = true;
	            }
	            break;
	        case ScriptGlobals.SM_008_MAIN:
	            if (script.hasAllowedEvent(ScriptGlobals.DISABLE_MAIN)) {
	                disallowed = true;
	            }
	            break;
	        case ScriptGlobals.SM_073_CURSORMODE:
	            if (script.hasAllowedEvent(
	                    ScriptGlobals.DISABLE_CURSORMODE)) {
	                disallowed = true;
	            }
	            break;
	        case ScriptGlobals.SM_074_EXPLORATIONMODE:
	            if (script.hasAllowedEvent(
	                    ScriptGlobals.DISABLE_EXPLORATIONMODE)) {
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
	    this.eventStackClear = function() {
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
	    this.eventStackClearForIo = function(io) {
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
	    this.eventStackExecute = function() {
	    	var count = 0;
	        for (var i = 0; i < ScriptGlobals.MAX_EVENT_STACK; i++) {
	            if (this.getStackedEvent(i).exists()) {
	            	var ioid = this.getStackedEvent(i).getIo().getRefId();
	                if (Interactive.getInstance().hasIO(ioid)) {
	                    if (this.getStackedEvent(i).getSender() !== null) {
	                    	var senderid = this.getStackedEvent(i).getSender().getRefId();
	                        if (Interactive.getInstance().hasIO(senderid)) {
	                            eventSender = this.getStackedEvent(i).getSender();
	                        } else {
	                            eventSender = null;
	                        }
	                    } else {
	                        eventSender = null;
	                    }
	                    this.sendIOScriptEvent(this.getStackedEvent(i).getIo(),
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
	                if (count >= stackFlow) {
	                    break;
	                }
	            }
	        }
	        this.executeAdditionalStacks();
	    }
	    this.eventStackExecuteAll = function() {
	        stackFlow = 9999999;
	        this.eventStackExecute();
	        stackFlow = 20;
	    }
	    this.eventStackInit = function() {
	    	
	    }
	    this.executeAdditionalStacks = function() {
	    	
	    }
	    this.forceDeath = function(io, target) {
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
	    this.freeAllGlobalVariables = function() {
	        if (gvars !== null) {
	            for (var i = gvars.length - 1; i >= 0; i--) {
	                if (gvars[i] !== null
	                        && (gvars[i].getType() === ScriptGlobals.TYPE_G_00_TEXT
	                                || gvars[i].getType() === ScriptGlobals.TYPE_L_08_TEXT)
	                        && gvars[i].getText() !== null) {
	                    gvars[i].set(null);
	                }
	                gvars[i] = null;
	            }
	        }
	    }
	    /**
	     * Removes all local variables from an {@link IO} and frees up the memory.
	     * @param io the {@link IO}
	     * @throws RPGException if an error occurs
	     */
	    this.freeAllLocalVariables = function(io) {
	        if (io !== null
	                && io.getScript() !== null
	                && io.getScript().hasLocalVariables()) {
	        	var i = io.getScript().getLocalVarArrayLength() - 1;
	            for (; i >= 0; i--) {
	                if (io.getScript().getLocalVariable(i) !== null
	                        && (io.getScript().getLocalVariable(i).getType()
	                        		=== ScriptGlobals.TYPE_G_00_TEXT
	                                || io.getScript().getLocalVariable(i)
	                                        .getType() === ScriptGlobals.TYPE_L_08_TEXT)
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
	    this.getEventSender = function() {
	        return eventSender;
	    }
	    /**
	     * Gets the value of a global floating-point array variable.
	     * @param name the name of the variable
	     * @return <code>float</code>[]
	     * @throws RPGException if the variable value was never set
	     */
	    this.getGlobalFloatArrayVariableValue = function(name) {
	        if (gvars === null) {
	            gvars = [];
	        }
	        var index = -1;
	        for (var i = 0; i < gvars.length; i++) {
	            if (gvars[i] !== null
	                    && gvars[i].getName() === name
	                    && gvars[i].getType() === ScriptGlobals.TYPE_G_03_FLOAT_ARR) {
	                index = i;
	                break;
	            }
	        }
	        if (index === -1) {
	            throw new Error(["Global Float Array variable ", name, " was never set."].join(""));
	        }
	        return gvars[index].getFloatArrayVal();
	    }
	    /**
	     * Gets the global floating-point value assigned to a specific variable.
	     * @param name the variable name
	     * @return <code>float</code>
	     * @throws RPGException if no such variable was assigned
	     */
	    this.getGlobalFloatVariableValue = function(name) {
	        if (gvars === null) {
	            gvars = [];
	        }
	        var index = -1;
	        for (var i = 0; i < gvars.length; i++) {
	            if (gvars[i] !== null
	                    && gvars[i].getName() === name
	                    && gvars[i].getType() === ScriptGlobals.TYPE_G_02_FLOAT) {
	                index = i;
	                break;
	            }
	        }
	        if (index === -1) {
	            throw new Error(["Global Float variable ", name, " was never set."].join(""));
	        }
	        return gvars[index].getFloatVal();
	    }
	    /**
	     * Gets the value of a global integer array variable.
	     * @param name the name of the variable
	     * @return <code>int</code>[]
	     * @throws RPGException if the variable value was never set
	     */
	    this.getGlobalIntArrayVariableValue = function(name) {
	        if (gvars === null) {
	            gvars = [];
	        }
	        var index = -1;
	        for (var i = 0; i < gvars.length; i++) {
	            if (gvars[i] !== null
	                    && gvars[i].getName() === name
	                    && gvars[i].getType() === ScriptGlobals.TYPE_G_05_INT_ARR) {
	                index = i;
	                break;
	            }
	        }
	        if (index === -1) {
	            throw new Error(["Global Int Array variable ", name, " was never set."].join(""));
	        }
	        return gvars[index].getIntArrayVal();
	    }
	    /**
	     * Gets the value of a global integer variable.
	     * @param name the name of the variable
	     * @return <code>int</code>
	     * @throws RPGException if the variable value was never set
	     */
	    this.getGlobalIntVariableValue = function(name) {
	        if (gvars === null) {
	            gvars = [];
	        }
	        var index = -1;
	        for (var i = 0; i < gvars.length; i++) {
	            if (gvars[i] !== null
	                    && gvars[i].getName() === name
	                    && gvars[i].getType() === ScriptGlobals.TYPE_G_04_INT) {
	                index = i;
	                break;
	            }
	        }
	        if (index === -1) {
	            throw new Error(["Global Int variable ", name, " was never set."].join(""));
	        }
	        return gvars[index].getIntVal();
	    }
	    /**
	     * Gets the value of a global long integer array variable.
	     * @param name the name of the variable
	     * @return <code>long</code>[]
	     * @throws RPGException if the variable value was never set
	     */
	    this.getGlobalLongArrayVariableValue = function(name) {
	        if (gvars === null) {
	            gvars = [];
	        }
	        var index = -1;
	        for (var i = 0; i < gvars.length; i++) {
	            if (gvars[i] !== null
	                    && gvars[i].getName() === name
	                    && gvars[i].getType() === ScriptGlobals.TYPE_G_07_LONG_ARR) {
	                index = i;
	                break;
	            }
	        }
	        if (index === -1) {
	            throw new Error(["Global Long Array variable ", name, " was never set."].join(""));
	        }
	        return gvars[index].getLongArrayVal();
	    }
	    /**
	     * Gets the value of a global long integer variable.
	     * @param name the name of the variable
	     * @return <code>long</code>
	     * @throws RPGException if the variable value was never set
	     */
	    this.getGlobalLongVariableValue = function(name) {
	        if (gvars === null) {
	            gvars = [];
	        }
	        var index = -1;
	        for (var i = 0; i < gvars.length; i++) {
	            if (gvars[i] !== null
	                    && gvars[i].getName() === name
	                    && gvars[i].getType() === ScriptGlobals.TYPE_G_06_LONG) {
	                index = i;
	                break;
	            }
	        }
	        if (index === -1) {
	            throw new Error(["Global Long variable ", name, " was never set."].join(""));
	        }
	        return gvars[index].getLongVal();
	    }
	    /**
	     * Gets the local text array value assigned to a specific variable.
	     * @param name the variable name
	     * @return {@link String}
	     * @throws RPGException if no such variable was assigned
	     */
	    this.getGlobalStringArrayVariableValue = function(name) {
	        if (gvars === null) {
	            gvars = [];
	        }
	        var index = -1;
	        for (var i = 0; i < gvars.length; i++) {
	            if (gvars[i] !== null
	                    && gvars[i].getName() === name
	                    && gvars[i].getType() === ScriptGlobals.TYPE_G_01_TEXT_ARR) {
	                index = i;
	                break;
	            }
	        }
	        if (index === -1) {
	            throw new Error(["Global String Array variable ", name, " was never set."].join(""));
	        }
	        return gvars[index].getTextArrayVal();
	    }
	    /**
	     * Gets the global text value assigned to a specific variable.
	     * @param name the variable name
	     * @return {@link String}
	     * @throws RPGException if no such variable was assigned
	     */
	    this.getGlobalStringVariableValue = function(name) {
	        if (gvars === null) {
	            gvars = [];
	        }
	        var index = -1;
	        for (var i = 0; i < gvars.length; i++) {
	            if (gvars[i] !== null
	                    && gvars[i].getName() === name
	                    && gvars[i].getType() === ScriptGlobals.TYPE_G_00_TEXT) {
	                index = i;
	                break;
	            }
	        }
	        if (index === -1) {
	            throw new Error(["Global String variable ", name, " was never set."].join(""));
	        }
	        return gvars[index].getText();
	    }
	    this.getGlobalTargetParam = function(io) {
	        return io.getTargetinfo();
	    }
	    /**
	     * Gets a global {@link Scriptable} variable.
	     * @param name the name of the variable
	     * @return {@link ScriptVariable}
	     */
	    this.getGlobalVariable = function(name) {
	    	var vari = null;
	        for (var i = gvars.length - 1; i >= 0; i--) {
	            if (gvars[i] !== null
	                    && gvars[i].getName() !== null
	                    && gvars[i].getName().toLowerCase() === name) {
	            	vari = gvars[i];
	                break;
	            }
	        }
	        return vari;
	    }
	    this.getIOMaxEvents = function() {
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
	    this.getIOMaxEventsSent = function() {
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
	    this.getMaxTimerScript = function() {
	        return maxTimerScript;
	    }
	    /**
	     * Gets a script timer.
	     * @param id the timer's id
	     * @return {@link TIMER}
	     */
	    this.getScriptTimer = function(id) {
	    	
	    }
	    /**
	     * Gets the script timers.
	     * @return {@link TIMER}[]
	     */
	    this.getScriptTimers = function() {
	    	
	    }
	    /**
	     * Gets the stacked event at a specific index.
	     * @param index the index
	     * @return {@link STACKED}
	     */
	    this.getStackedEvent = function(index) {
	    	
	    }
	    /**
	     * Gets the id of a named script assigned to a specific IO.
	     * @param io the IO
	     * @param name the script's name
	     * @return the script's id, if found. If no script exists, -1 is returned
	     */
	    this.getSystemIOScript = function(io, name) {
	    	var index = -1;
	        if (countTimers() > 0) {
	            for (var i = 0; i < maxTimerScript; i++) {
	                var scriptTimers = getScriptTimers();
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
	    this.hasGlobalVariable = function(name) {
	        return getGlobalVariable(name) !== null;
	    }
	    this.initEventStats = function() {
	        eventTotalCount = 0;
	        var i = Interactive.getInstance().getMaxIORefId();
	        for (; i >= 0; i--) {
	            if (Interactive.getInstance().hasIO(i)) {
	            	var io = Interactive.getInstance().getIO(i);
	                io.setStatCount(0);
	                io.setStatSent(0);
	            }
	        }
	    }
	    this.initScriptTimers = function() {
	    	
	    }
	    /**
	     * Gets the flag indicating whether debug output is turned on.
	     * @return <tt>true</tt> if the debug output is turned on; <tt>false</tt>
	     *         otherwise
	     */
	    this.isDebug = function() {
	        return debug;
	    }
	    /**
	     * Determines if an IO is in a specific group.
	     * @param io the IO
	     * @param group the group name
	     * @return true if the IO is in the group; false otherwise
	     */
	    this.isIOInGroup = function(io, group) {
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
	    this.isPlayerInvisible = function(io) {
	    	var invisible = false;
	        // if (inter.iobj[0]->invisibility > 0.3f) {
	        // invisible = true;
	        // }
	        return invisible;
	    }
	    var MakeSSEPARAMS = function(params) {
	        for (var i = MAX_SYSTEM_PARAMS - 1; i >= 0; i--) {
	            SYSTEM_PARAMS[i] = null;
	        }
	        if (params !== null) {
	        	var split = params.split(" ");
	            for (var i = 0, len = split.length - 1; i < len; i++) {
	                if (i / 2 < MAX_SYSTEM_PARAMS) {
	                    SYSTEM_PARAMS[i] = split[i];
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
	     * @param params the script parameters
	     * @return {@link int}
	     * @throws RPGException if an error occurs
	     */
	    this.notifyIOEvent = function(io, msg, params) {
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
	     * @throws RPGException if an error occurs
	     */
	    this.objectHide = function(io, megahide, targetName, hideOn) {
	    	var targetId =
	                Interactive.getInstance().getTargetByNameTarget(targetName);
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
	    this.releaseAllGroups = function(io) {
	        while (io !== null
	                && io.getNumIOGroups() > 0) {
	            io.removeGroup(io.getIOGroup(0));
	        }
	    }
	    /**
	     * Releases an event, clearing all variables.
	     * @param event the scriptable event
	     */
	    this.releaseScript = function(event) {
	        if (event !== null) {
	            event.clearLocalVariables();
	        }
	    }
	    /**
	     * Removes an IO from a group.
	     * @param io the IO
	     * @param group the group
	     */
	    this.removeGroup = function(io, group) {
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
	     * @throws RPGException if an error occurs
	     */
	    this.reset = function(io, initialize) {
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
	            resetObject(io, initialize);
	        }
	    }
	    /**
	     * Resets all interactive objects.
	     * @param initialize if <tt>true</tt> and an object is script-loaded, it
	     *            will be initialized again
	     * @throws RPGException if an error occurs
	     */
	    this.resetAll = function(initialize) {
	    	var i = Interactive.getInstance().getMaxIORefId();
	        for (; i >= 0; i--) {
	            if (Interactive.getInstance().hasIO(i)) {
	            	var io = Interactive.getInstance().getIO(i);
	                if (!io.isScriptLoaded()) {
	                    resetObject(io, initialize);
	                }
	            }
	        }
	    }
	    /**
	     * Resets the IO.
	     * @param io the IO
	     * @param initialize if <tt>true</tt>, the object needs to be initialized as
	     *            well
	     * @throws RPGException if an error occurs
	     */
	    this.resetObject = function(io, initialize) {
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
	    var runEvent = function(script, eventName, io) {
	    	var msg = 0;
	        if (eventName.toUpperCase() === "INIT") {
	            msg = ScriptGlobals.SM_001_INIT;
	        } else if (eventName.toUpperCase() === "HIT") {
	            msg = ScriptGlobals.SM_016_HIT;
	        } else if (eventName.toUpperCase() === "INIT_END") {
	            msg = ScriptGlobals.SM_033_INITEND;
	        }
	        if (msg > 0) {
	            runMessage(script, msg, io);
	        } else {
	        	var method;
	        	if (eventName.indexOf("on") === 0) {
	        		method = eventName;
	        	} else {
	        		method = ["on", eventName].join("");
	        	}
	        	script[method]();
	        	method = null;
	        }
	    }
	    var runMessage = function(script, msg, io) {
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
	            throw new Error(["No action defined for message ", msg].join(""));
	        }
	    }
	    this.sendEvent = function(io, params) {
	    	var oes = eventSender;
	        eventSender = io;
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
	                        // IF IO IS IN SENDER RADIUS, SEND EVENT
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
	        eventSender = oes;
	    }
	    /**
	     * Sends an initialization event to an IO. The initialization event runs the
	     * local script first, followed by the over script.
	     * @param io the IO
	     * @return {@link int}
	     * @throws RPGException if an error occurs
	     */
	    this.sendInitScriptEvent = function(io) {
	        if (io === null) {
	            return -1;
	        }
	        var num = io.getRefId();
	        if (!Interactive.getInstance().hasIO(num)) {
	            return -1;
	        }
	        var oldEventSender = eventSender;
	        eventSender = null;
	        // send script the init message
	        var hio = Interactive.getInstance().getIO(num);
	        if (hio.getScript() !== null) {
	            GLOB = 0;
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
	                GLOB = 0;
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
	                GLOB = 0;
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
	                GLOB = 0;
	                this.sendScriptEvent(hio.getOverscript(),
	                        ScriptGlobals.SM_033_INITEND,
	                        null,
	                        hio,
	                        null);
	            }
	            hio = null;
	        }
	        eventSender = oldEventSender;
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
	     * @throws RPGException if an error occurs
	     */
	    this.sendIOScriptEvent = function(target, msg, params, eventname) {
	        // checks invalid IO
	        if (target === null) {
	            return -1;
	        }
	        var num = target.getRefId();
	
	        if (Interactive.getInstance().hasIO(num)) {
	        	var originalEventSender = eventSender;
	            if (msg === ScriptGlobals.SM_001_INIT
	                    || msg === ScriptGlobals.SM_033_INITEND) {
	            	var hio = Interactive.getInstance().getIO(num);
	                sendIOScriptEventReverse(hio, msg, params, eventname);
	                eventSender = originalEventSender;
	                hio = null;
	            }
	
	            if (Interactive.getInstance().hasIO(num)) {
	                // if this IO only has a Local script, send event to it
	            	var hio = Interactive.getInstance().getIO(num);
	                if (hio.getOverscript() === null) {
	                    GLOB = 0;
	                    var ret = this.sendScriptEvent(
	                            hio.getScript(),
	                            msg,
	                            params,
	                            hio,
	                            eventname);
	                    eventSender = originalEventSender;
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
	                    eventSender = originalEventSender;
	                    GLOB = 0;
	
	                    if (Interactive.getInstance().hasIO(num)) {
	                        hio = Interactive.getInstance().getIO(num);
	                        var ret = this.sendScriptEvent(
	                                hio.getScript(),
	                                msg,
	                                params,
	                                hio,
	                                eventname);
	                        eventSender = originalEventSender;
	                        return ret;
	                    } else {
	                        return ScriptGlobals.REFUSE;
	                    }
	                }
	                hio = null;
	            }
	            GLOB = 0;
	        }
	
	        // Refused further processing.
	        return ScriptGlobals.REFUSE;
	    }
	    var sendIOScriptEventReverse = function(io, msg, params, eventname) {
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
	                GLOB = 0;
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
	                    GLOB = 0;
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
	            GLOB = 0;
	        }
	        // Refused further processing.
	        return ScriptGlobals.REFUSE;
	    }
	    /**
	     * Sends a scripted event to all IOs.
	     * @param msg the message
	     * @param dat any script variables
	     * @return <code>int</code>
	     * @throws RPGException if an error occurs
	     */
	    this.sendMsgToAllIO = function(msg, dat) {
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
	    this.sendScriptEvent = function(localScript, msg, params, io, eventName) {
	    	var retVal = ScriptGlobals.ACCEPT;
	    	var keepGoing = true;
	        if (localScript === null) {
	            throw new Error("script cannot be null");
	        }
	        if (io !== null) {
	            if (io.hasGameFlag(IoGlobals.GFLAG_MEGAHIDE)
	                    && msg !== ScriptGlobals.SM_043_RELOAD) {
	                return ScriptGlobals.ACCEPT;
	            }
	
	            if (io.getShow() === IoGlobals.SHOW_FLAG_DESTROYED) {
	                // destroyed
	                return ScriptGlobals.ACCEPT;
	            }
	            eventTotalCount++;
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
	            runEvent(script, eventName, io);
	        } else {
	            if (eventIsDisallowed(msg, script)) {
	                return ScriptGlobals.REFUSE;
	            }
	            runMessage(script, msg, io);
	        }
	        var ret = ScriptGlobals.ACCEPT;
	        return ret;
	    }
	    /**
	     * Sets the value for the flag indicating whether debug output is turned on.
	     * @param val the value to set
	     */
	    this.setDebug = function(val) {
	        debug = val;
	    }
	    this.setEvent = function(io, event, isOn) {
	        if (event.toUpperCase() === "COLLIDE_NPC") {
	            if (isOn) {
	                io.getScript().removeDisallowedEvent(
	                        ScriptGlobals.DISABLE_COLLIDE_NPC);
	            } else {
	                io.getScript().assignDisallowedEvent(
	                        ScriptGlobals.DISABLE_COLLIDE_NPC);
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
	                io.getScript().removeDisallowedEvent(
	                        ScriptGlobals.DISABLE_INVENTORY2_OPEN);
	            } else {
	                io.getScript().assignDisallowedEvent(
	                        ScriptGlobals.DISABLE_INVENTORY2_OPEN);
	            }
	        } else if (event.toUpperCase() === "DETECTPLAYER") {
	            if (isOn) {
	                io.getScript()
	                        .removeDisallowedEvent(ScriptGlobals.DISABLE_DETECT);
	            } else {
	                io.getScript()
	                        .assignDisallowedEvent(ScriptGlobals.DISABLE_DETECT);
	            }
	        } else if (event.toUpperCase() === "HEAR") {
	            if (isOn) {
	                io.getScript().removeDisallowedEvent(ScriptGlobals.DISABLE_HEAR);
	            } else {
	                io.getScript().assignDisallowedEvent(ScriptGlobals.DISABLE_HEAR);
	            }
	        } else if (event.toUpperCase() === "AGGRESSION") {
	            if (isOn) {
	                io.getScript()
	                        .removeDisallowedEvent(ScriptGlobals.DISABLE_AGGRESSION);
	            } else {
	                io.getScript()
	                        .assignDisallowedEvent(ScriptGlobals.DISABLE_AGGRESSION);
	            }
	        } else if (event.toUpperCase() === "MAIN") {
	            if (isOn) {
	                io.getScript().removeDisallowedEvent(ScriptGlobals.DISABLE_MAIN);
	            } else {
	                io.getScript().assignDisallowedEvent(ScriptGlobals.DISABLE_MAIN);
	            }
	        } else if (event.toUpperCase() === "CURSORMODE") {
	            if (isOn) {
	                io.getScript()
	                        .removeDisallowedEvent(ScriptGlobals.DISABLE_CURSORMODE);
	            } else {
	                io.getScript()
	                        .assignDisallowedEvent(ScriptGlobals.DISABLE_CURSORMODE);
	            }
	        } else if (event.toUpperCase() === "EXPLORATIONMODE") {
	            if (isOn) {
	                io.getScript().removeDisallowedEvent(
	                        ScriptGlobals.DISABLE_EXPLORATIONMODE);
	            } else {
	                io.getScript().assignDisallowedEvent(
	                        ScriptGlobals.DISABLE_EXPLORATIONMODE);
	            }
	        }
	    }
	    /**
	     * Sets the value of the eventSender.
	     * @param val the new value to set
	     */
	    this.setEventSender = function(val) {
	        eventSender = val;
	    }
	    /**
	     * Sets a global variable.
	     * @param name the name of the global variable
	     * @param value the variable's value
	     * @throws RPGException if an error occurs
	     */
	    this.setGlobalVariable = function(name, value) {
	        if (gvars === null) {
	            gvars = [];
	        }
	        var found = false;
	        for (var i = gvars.length - 1; i >= 0; i--) {
	            var vari = gvars[i];
	            if (vari !== null
	                    && vari.getName() !== null
	                    && vari.getName().toLowerCase() === name.toLowerCase()) {
	                // found the correct script variable
	                vari.set(value);
	                found = true;
	                break;
	            }
	        }
	        if (!found) {
	            // create a new variable and add to the global array
	            var vari = null;
	            if (typeof value === 'string') {
	                vari = new ScriptVariable(name, ScriptGlobals.TYPE_G_00_TEXT, value);
	            } else if (typeof value === 'number') {
	            	if ((value | 0) === value) {
	                    vari = new ScriptVariable(name, ScriptGlobals.TYPE_G_04_INT, value);
	            	} else if (value % 1 === 0) {
	                    vari = new ScriptVariable(name, ScriptGlobals.TYPE_G_06_LONG, value);
	            	} else {
	                    vari = new ScriptVariable(name, ScriptGlobals.TYPE_G_02_FLOAT, value);
	            	}
	            } else if (Array.isArray(value)) {
	                if (typeof value[0] === 'string') {
	                    vari = new ScriptVariable(name, ScriptGlobals.TYPE_G_01_TEXT_ARR, value);
	                } else if (typeof value[0] === 'number') {
	                	if ((value[0] | 0) === value[0]) {
	                        vari = new ScriptVariable(name, ScriptGlobals.TYPE_G_05_INT_ARR, value);
	                	} else if (value[0] % 1 === 0) {
	                        vari = new ScriptVariable(name, ScriptGlobals.TYPE_G_07_LONG_ARR, value);
	                	} else {
	                        vari = new ScriptVariable(name, ScriptGlobals.TYPE_G_03_FLOAT_ARR, value);
	                	}
	                }
	            } else {
	                var sb = [];
	                sb.push("Global variable ");
	                sb.push(name);
	                sb.push(" was passed unrecognized value. Only String, String[], Float, ");
	                sb.push("float[], Integer, int[], Long, or long[] allowed.");
	                throw new Error(sb.join(""));
	            }
	            gvars.push(vari);
	        }
	    }
	    /**
	     * Sets the main event for an IO.
	     * @param io the IO
	     * @param newevent the event's name
	     */
	    this.setMainEvent = function(io, newevent) {
	        if (io !== null) {
	            if ("MAIN".toLowerCase() !== newevent) {
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
	    this.setMaxTimerScript = function(val) {
	        maxTimerScript = val;
	    }
	    this.setScriptTimer = function(index, timer) {
	    	
	    }
	    /**
	     * Processes and IO's speech.
	     * @param io the IO
	     * @param params the {@link SpeechParameters}
	     * @throws RPGException 
	     */
	    this.speak = function(io, params) {
	        // speech variables
	        // ARX_CINEMATIC_SPEECH acs;
	        // acs.type = ARX_CINE_SPEECH_NONE;
	    	var voixoff = 0;
	    	var mood = ANIM_TALK_NEUTRAL;
	        if (params.isKillAllSpeech()) {
	            // ARX_SPEECH_Reset();
	        } else {
	            if (params.hasFlag(SpeechParameters.HAPPY)) {
	                mood = ANIM_TALK_HAPPY;
	            }
	            if (params.hasFlag(SpeechParameters.ANGRY)) {
	                mood = ANIM_TALK_ANGRY;
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
	                        || params.hasFlag(SpeechParameters.SPEECH_CCCLISTENER_R)) {
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
	                    speechnum = Speech.getInstance().ARX_SPEECH_AddSpeech(io,
	                            mood, params.getSpeechName(), voixoff);
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
	     * @throws RPGException if an error occurs
	     */
	    this.stackSendGroupScriptEvent = function(group, msg, params, eventname) {
	    	var i = Interactive.getInstance().getMaxIORefId();
	        for (; i >= 0; i--) {
	            if (Interactive.getInstance().hasIO(i)) {
	            	var io = Interactive.getInstance().getIO(i);
	                if (isIOInGroup(io, group)) {
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
	    this.stackSendIOScriptEvent = function(io, msg, params, eventname) {
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
	
	                this.getStackedEvent(i).setSender(eventSender);
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
	     * @throws RPGException if an error occurs
	     */
	    this.stackSendMsgToAllNPCIO = function(msg, fdat) {
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
	    this.startTimer = function(params) {
	    	var timerNum = timerGetFree();
	    	var timer = getScriptTimer(timerNum);
	        timer.setScript(params.getScript());
	        timer.setExists(true);
	        timer.setIo(params.getIo());
	        timer.setCycleLength(params.getMilliseconds());
	        if (params.getName() === null
	                || (params.getName() !== null
	                        && params.getName().length() === 0)) {
	            timer.setName(timerGetDefaultName());
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
	     * @throws RPGException if an error occurs
	     */
	    this.teleport = function(fio, behind, isPlayer, initPosition, target) {
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
	                        var pio = Interactive.getInstance().getIO(
	                                ProjectConstants.getInstance().getPlayer());
	                        Interactive.getInstance().ARX_INTERACTIVE_Teleport(
	                                io, pio.getPosition());
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
	                            Interactive.getInstance().ARX_INTERACTIVE_Teleport(
	                                    io, io.getInitPosition());
	                        }
	                    }
	                }
	            }
	        }
	    }
	    this.timerCheck = function() {
	        if (countTimers() > 0) {
	            for (var i = 0, len = this.maxTimerScript; i < len; i++) {
	            	var timer = getScriptTimers()[i];
	                if (timer.exists()) {
	                	var currentTime = Time.getInstance().getGameTime();
	                    if (timer.isTurnBased()) {
	                        currentTime = Time.getInstance().getGameRound();
	                    }
	                    if (timer.hasFlag(1)) {
	                        if (!timer.getIo().hasGameFlag(
	                                IoGlobals.GFLAG_ISINTREATZONE)) {
	                            while (timer.getLastTimeCheck()
	                                    + timer.getCycleLength() < currentTime) {
	                                timer.setLastTimeCheck(timer.getLastTimeCheck()
	                                        + timer.getCycleLength());
	                            }
	                            continue;
	                        }
	                    }
	                    if (timer.getLastTimeCheck()
	                            + timer.getCycleLength() < currentTime) {
	                    	var script = timer.getScript();
	                    	var io = timer.getIo();
	                        if (script !== null) {
	                            if (timer.getName().toLowerCase() === "_R_A_T_") {
	                                // if (Manage_Specific_RAT_Timer(st))
	                                continue;
	                            }
	                        }
	                        if (timer.getRepeatTimes() === 1) {
	                        	this.timerClearByNum(i);
	                        } else {
	                            if (timer.getRepeatTimes() !== 0) {
	                                timer.setRepeatTimes(
	                                        timer.getRepeatTimes() - 1);
	                            }
	                            timer.setLastTimeCheck(timer.getLastTimeCheck()
	                                    + timer.getCycleLength());
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
	    this.timerClearAll = function() {
	        for (var i = 0; i < maxTimerScript; i++) {
	        	this.timerClearByNum(i);
	        }
	    }
	    this.timerClearAllLocalsForIO = function(io) {
	    	var scriptTimers = getScriptTimers();
	        for (var i = 0; i < maxTimerScript; i++) {
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
	    this.timerClearByIO = function(io) {
	        if (io !== null) {
	        	var scriptTimers = getScriptTimers();
	            for (var i = 0; i < maxTimerScript; i++) {
	                if (scriptTimers[i] !== null
	                        && scriptTimers[i].exists()) {
	                    if (scriptTimers[i].getIo().getRefId() === io.getRefId()) {
	                    	this.timerClearByNum(i);
	                    }
	                }
	            }
	        }
	    }
	    this.timerClearByNameAndIO = function(timername, io) {
	        if (io !== null) {
	        	var scriptTimers = getScriptTimers();
	            for (var i = 0; i < maxTimerScript; i++) {
	                if (scriptTimers[i] !== null
	                        && scriptTimers[i].exists()) {
	                    if (scriptTimers[i].getIo().getRefId() === io.getRefId()
	                            && timername.toLowerCase() === scriptTimers[i].getName().toLowerCase()) {
	                    	this.timerClearByNum(i);
	                    }
	                }
	            }
	        }
	    }
	    /**
	     * Clears a timer by its index on the timers list.
	     * @param timeridx the index
	     */
	    this.timerClearByNum = function(timeridx) {
	        var scriptTimers = getScriptTimers();
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
	    var timerExist = function(texx) {
	    	var index = -1;
	    	var scriptTimers = getScriptTimers();
	        for (var i = 0; i < maxTimerScript; i++) {
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
	    this.timerFirstInit = function(number) {
	        if (number < 100) {
	            this.setMaxTimerScript(100);
	        } else {
	        	this.setMaxTimerScript(number);
	        }
	        destroyScriptTimers();
	        initScriptTimers();
	    }
	    /**
	     * Generates a random name for an unnamed timer.
	     * @return {@link String}
	     */
	    var timerGetDefaultName = function() {
	    	var i = 1;
	    	var texx;
	
	        while (true) {
	        	var sb = ["TIMER_", i].join("");
	            i++;
	
	            if (timerExist(sb) === -1) {
	                texx = sb.toString();
	                sb = null;
	                break;
	            }
	            sb = null;
	        }
	        return texx;
	    }
	    /**
	     * Gets the index of a free script timer.
	     * @return <code>int</code>
	     */
	    this.timerGetFree = function() {
	        var index = -1;
	        var scriptTimers = this.getScriptTimers();
	        for (var i = 0; i < maxTimerScript; i++) {
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
	    this.amISpeaking = function(io) {
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
	    this.getGameSeconds = function() {
	        return Time.getInstance().getGameTime(false);
	    }
	}
    Script.prototype = Object.create(Hashcode.prototype);
	Script.getInstance = function() {
		return Script.instance;
	}
	Script.setInstance = function(i) {
		if (!(i instanceof Script)) {
			throw new Error("Instance must be a Script subclass.")
		}
		Script.instance = i;
	}
	Script.ANIM_TALK_ANGRY = 0;
	Script.ANIM_TALK_HAPPY = 0;
	Script.ANIM_TALK_NEUTRAL = 0;
	/** the maximum number of system parameters. */
	Script.MAX_SYSTEM_PARAMS = 5;
	/** the list of system parameters. */
	Script.SYSTEM_PARAMS = [];
	return Script;
});
