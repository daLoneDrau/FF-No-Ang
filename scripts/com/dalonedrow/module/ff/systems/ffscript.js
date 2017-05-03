define(["com/dalonedrow/engine/systems/base/interactive",
	"com/dalonedrow/module/ff/rpg/ffinteractiveobject",
	"com/dalonedrow/rpg/base/constants/scriptglobals",
	"com/dalonedrow/rpg/base/flyweights/scripttimer",
	"com/dalonedrow/rpg/base/flyweights/stackedevent",
	"com/dalonedrow/rpg/base/systems/script"], function(Interactive, FFInteractiveObject,
			ScriptGlobals, ScriptTimer, StackedEvent, Script) {
	function FFScript() {
		Script.call(this);
	    this.eventstack = null;
	    this.eventTotalCount = 0;
	    this.master = Interactive.getInstance().getMasterScript();
	    this.postScriptStack = null;
	    /** the list of script timers. */
	    this.scriptTimers = [];
	    
        this.eventStackInit();
        this.setMaxTimerScript(100);
        for (var i = this.getMaxTimerScript() - 1; i >= 0; i--) {
            this.scriptTimers.push(new ScriptTimer());
        }
        // init global params
        this.setGlobalVariable("PLAYERCASTING", 0);
        this.setGlobalVariable("COMBATROUND", 0);
        this.setGlobalVariable("SHUT_UP", 0);
	}
	FFScript.prototype = Object.create(Script.prototype);
    FFScript.prototype.clearAdditionalEventStacks = function() {
        for (var i = 0; i < ScriptGlobals.MAX_EVENT_STACK; i++) {
            if (this.postScriptStack[i].exists()) {
                this.postScriptStack[i].setParams(null);
                this.postScriptStack[i].setEventname(null);
                this.postScriptStack[i].setSender(null);
                this.postScriptStack[i].setExist(false);
                this.postScriptStack[i].setIo(null);
                this.postScriptStack[i].setMsg(0);
            }
        }
    }
    FFScript.prototype.clearAdditionalEventStacksForIO = function(io) {
    	try {
    		this.checkInstanceOf(io, BaseInteractiveObject);
    	} catch (err) {
            var s = [];
            s.push("ERROR! FFScript.clearAdditionalEventStacksForIO() - io ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        for (var i = 0; i < ScriptGlobals.MAX_EVENT_STACK; i++) {
            if (this.postScriptStack[i].exists()
                    && io.equals(this.postScriptStack[i].getIo())) {
                this.postScriptStack[i].setParams(null);
                this.postScriptStack[i].setEventname(null);
                this.postScriptStack[i].setSender(null);
                this.postScriptStack[i].setExist(false);
                this.postScriptStack[i].setIo(null);
                this.postScriptStack[i].setMsg(0);
            }
        }
    }
    FFScript.prototype.destroyScriptTimers = function() {
        if (this.scriptTimers != null) {
            for (var i = this.scriptTimers.length - 1; i >= 0; i--) {
                this.scriptTimers[i] = null;
            }
            this.scriptTimers = null;
        }
    }
    FFScript.prototype.eventStackInit = function() {
        this.eventstack = [];
        for (var i = 0; i < ScriptGlobals.MAX_EVENT_STACK; i++) {
            this.eventstack.push(new StackedEvent());
        }
        this.postScriptStack = [];
        for (var i = 0; i < ScriptGlobals.MAX_EVENT_STACK; i++) {
            this.postScriptStack.push(new StackedEvent());
        }
    }
    FFScript.prototype.executeAdditionalStacks = function() {
        this.transferPostScriptStack();
    }
    /**
     * Gets the IO for the master script.
     * @return {@link BaseInteractiveObject}
     */
    FFScript.prototype.getMasterScript = function() {
        return this.master;
    }
    /**
     * Gets a script timer.
     * @param id the timer's id
     * @return {@link ScriptTimer}
     */
    FFScript.prototype.getScriptTimer = function(id) {
    	try {
    		this.checkInteger(id);
    	} catch (err) {
            var s = [];
            s.push("ERROR! FFScript.getScriptTimer() - id ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        return this.scriptTimers[id];
    }
    /**
     * Gets the script timers.
     * @return {@link ScriptTimer}[]
     */
    FFScript.prototype.getScriptTimers = function() {
        return this.scriptTimers;
    }
    /**
     * Gets the stacked event at a specific index.
     * @param index the index
     * @return {@link StackedEvent}
     */
    FFScript.prototype.getStackedEvent = function(index) {
    	try {
    		this.checkInteger(index);
    	} catch (err) {
            var s = [];
            s.push("ERROR! FFScript.getStackedEvent() - index ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        return this.eventstack[index];
    }
    FFScript.prototype.initScriptTimers = function() {
        this.scriptTimers = [];
        for (var i = 0; i < this.getMaxTimerScript(); i++) {
            this.scriptTimers.push(new ScriptTimer());
        }
    }
    FFScript.prototype.postScriptStackClear = function() {
        for (var i = 0; i < ScriptGlobals.MAX_EVENT_STACK; i++) {
            if (this.postScriptStack[i].exists()) {
                this.postScriptStack[i].setParams(null);
                this.postScriptStack[i].setEventname(null);
                this.postScriptStack[i].setSender(null);
                this.postScriptStack[i].setExist(false);
                this.postScriptStack[i].setIo(null);
                this.postScriptStack[i].setMsg(0);
            }
        }
    }
    FFScript.prototype.setScriptTimer = function(index, timer) {
    	try {
    		this.checkInteger(index);
    	} catch (err) {
            var s = [];
            s.push("ERROR! FFScript.setScriptTimer() - index ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkInstanceOfNullsAllowed(timer, ScriptTimer);
    	} catch (err) {
            var s = [];
            s.push("ERROR! FFScript.setScriptTimer() - timer ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	if (index < 0 || index >= this.scriptTimers.length) {
            throw new Error("ERROR! FFScript.setScriptTimer() - index "
            		+ index + " is out of bounds");
    	}
        this.scriptTimers[index] = timer;
    }
    FFScript.prototype.stackSendPostScriptEvent = function(io, msg, params, eventname) {
    	try {
    		this.checkInstanceOf(io, FFInteractiveObject);
    	} catch (err) {
            var s = [];
            s.push("ERROR! FFScript.stackSendPostScriptEvent() - io ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkInteger(msg);
    	} catch (err) {
            var s = [];
            s.push("ERROR! FFScript.stackSendPostScriptEvent() - msg ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkArrayNullsAllowed(params);
    	} catch (err) {
            var s = [];
            s.push("ERROR! FFScript.stackSendPostScriptEvent() - params ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkStringNullsAllowed(eventname);
    	} catch (err) {
            var s = [];
            s.push("ERROR! FFScript.stackSendPostScriptEvent() - eventname ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        for (var i = 0; i < ScriptGlobals.MAX_EVENT_STACK; i++) {
            if (!this.postScriptStack[i].exists()) {
                if (params != null
                        && params.length > 0) {
                    this.postScriptStack[i].setParams(params);
                } else {
                    this.postScriptStack[i].setParams(null);
                }
                if (eventname != null
                        && eventname.length() > 0) {
                    this.postScriptStack[i].setEventname(eventname);
                } else {
                    this.postScriptStack[i].setEventname(null);
                }

                this.postScriptStack[i].setSender(this.getEventSender());
                this.postScriptStack[i].setIo(io);
                this.postScriptStack[i].setMsg(msg);
                this.postScriptStack[i].setExist(true);
                break;
            }
        }
    }
    FFScript.prototype.transferPostScriptStack = function() {
        for (var i = 0; i < ScriptGlobals.MAX_EVENT_STACK; i++) {
            if (this.postScriptStack[i].exists()) {
                this.stackSendIOScriptEvent(
                        this.postScriptStack[i].getIo(),
                        this.postScriptStack[i].getMsg(),
                        this.postScriptStack[i].getParams(),
                        this.postScriptStack[i].getEventname());
            }
        }
    }
    return FFScript;
});
