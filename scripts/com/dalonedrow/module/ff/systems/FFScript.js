function FFScript() {
	Script.call(this);
    var eventstack;
    var master = Interactive.getInstance().getMasterScript();
    var postScriptStack;
    /** the list of script timers. */
    var scriptTimers = [];
    this.eventStackInit = function() {
        eventstack = [];
        for (var i = 0; i < ScriptGlobals.MAX_EVENT_STACK; i++) {
            eventstack.push(new StackedEvent());
        }
        postScriptStack = [];
        for (var i = 0; i < ScriptGlobals.MAX_EVENT_STACK; i++) {
            postScriptStack.push(new StackedEvent());
        }
    }
    
    this.eventStackInit();
    this.setMaxTimerScript(100);
    for (var i = this.getMaxTimerScript() - 1; i >= 0; i--) {
        scriptTimers.push(new ScriptTimer());
    }
    // init global params
    this.setGlobalVariable("PLAYERCASTING", 0);
    this.setGlobalVariable("COMBATROUND", 0);
    this.setGlobalVariable("SHUT_UP", 0);
    this.clearAdditionalEventStacks = function() {
        for (var i = 0; i < ScriptGlobals.MAX_EVENT_STACK; i++) {
            if (postScriptStack[i].exists()) {
                postScriptStack[i].setParams(null);
                postScriptStack[i].setEventname(null);
                postScriptStack[i].setSender(null);
                postScriptStack[i].setExist(false);
                postScriptStack[i].setIo(null);
                postScriptStack[i].setMsg(0);
            }
        }
    }
    this.clearAdditionalEventStacksForIO = function(io) {
        for (var i = 0; i < ScriptGlobals.MAX_EVENT_STACK; i++) {
            if (postScriptStack[i].exists()
                    && io.equals(postScriptStack[i].getIo())) {
                postScriptStack[i].setParams(null);
                postScriptStack[i].setEventname(null);
                postScriptStack[i].setSender(null);
                postScriptStack[i].setExist(false);
                postScriptStack[i].setIo(null);
                postScriptStack[i].setMsg(0);
            }
        }
    }
    this.destroyScriptTimers = function() {
        if (scriptTimers !== null) {
            for (var i = scriptTimers.length - 1; i >= 0; i--) {
                scriptTimers[i] = null;
            }
            scriptTimers = null;
        }
    }
    this.executeAdditionalStacks = function() {
        transferPostScriptStack();
    }
    /**
     * Gets the IO for the master script.
     * @return {@link BaseInteractiveObject}
     */
    this.getMasterScript = function() {
        return master;
    }
    this.getScriptTimer = function(id) {
        return scriptTimers[id];
    }
    this.getScriptTimers = function() {
        return scriptTimers;
    }
    this.getStackedEvent = function(index) {
        return eventstack[index];
    }
    this.initScriptTimers = function() {
        scriptTimers = [];
        for (var i = 0; i < scriptTimers.length; i++) {
            scriptTimers.push(new FFScriptTimer());
        }
    }
    var postScriptStackClear = function() {
        for (var i = 0; i < ScriptGlobals.MAX_EVENT_STACK; i++) {
            if (postScriptStack[i].exists()) {
                postScriptStack[i].setParams(null);
                postScriptStack[i].setEventname(null);
                postScriptStack[i].setSender(null);
                postScriptStack[i].setExist(false);
                postScriptStack[i].setIo(null);
                postScriptStack[i].setMsg(0);
            }
        }
    }
    this.setScriptTimer = function(index, ftimer) {
        scriptTimers[index] = timer;
    }
    this.stackSendPostScriptEvent = function(io, msg, params, eventname) {
        for (var i = 0; i < ScriptGlobals.MAX_EVENT_STACK; i++) {
            if (!postScriptStack[i].exists()) {
                if (params !== null
                        && params.length > 0) {
                    postScriptStack[i].setParams(params);
                } else {
                    postScriptStack[i].setParams(null);
                }
                if (eventname !== null
                        && eventname.length() > 0) {
                    postScriptStack[i].setEventname(eventname);
                } else {
                    postScriptStack[i].setEventname(null);
                }

                postScriptStack[i].setSender(this.getEventSender());
                postScriptStack[i].setIo(io);
                postScriptStack[i].setMsg(msg);
                postScriptStack[i].setExist(true);
                break;
            }
        }
    }
    var transferPostScriptStack = function() {
        for (var i = 0; i < ScriptGlobals.MAX_EVENT_STACK; i++) {
            if (postScriptStack[i].exists()) {
                this.stackSendIOScriptEvent(
                        postScriptStack[i].getIo(),
                        postScriptStack[i].getMsg(),
                        postScriptStack[i].getParams(),
                        postScriptStack[i].getEventname());
            }
        }
    }
}
FFScript.prototype = Object.create(Script.prototype);
