/**
 * 
 */
define(["com/dalonedrow/engine/sprite/base/simplevector2",
	"com/dalonedrow/module/ff/rpg/ffscriptable",
	"com/dalonedrow/rpg/base/constants/scriptglobals",
	"com/dalonedrow/rpg/base/flyweights/scriptable",
	"com/dalonedrow/rpg/base/flyweights/speechparameters"],
		function(SimpleVector2, FFScriptable, ScriptGlobals, Scriptable, SpeechParameters) {
	function Hero(io) {
		FFScriptable.call(this, io);
		console.log("new hhhhero")
        this.ffscriptOnInit = FFScriptable.prototype.onInit;
        if (!String.format) {
        	String.format = function(format) {
        		var args = Array.prototype.slice.call(arguments, 1);
        		return format.replace(/{(\d+)}/g, function(match, number) { 
        			return typeof args[number] != 'undefined' ? args[number] : match;
        		});
        	};
        }
	}
	Hero.prototype = Object.create(FFScriptable.prototype);
    /**
     * Gets the value of the local variable "blocked_message".
     * @return {@link String}
     * @if an error occurs
     */
	Hero.prototype.getLocalVarBlockedMessage = function() {
        return this.getLocalStringVariableValue("blocked_message");
    }
    /**
     * Gets the value of the local variable "combat_message".
     * @return {@link String}
     * @if an error occurs
     */
	Hero.prototype.getLocalVarCombatMessage = function() {
        return this.getLocalStringVariableValue("combat_message");
    }
    /**
     * Gets the amount of 'OUCH' damage that occurred.
     * @return {@link float}
     * @if an error occurs
     */
	Hero.prototype.getLocalVarOuch = function() {
        return this.getLocalFloatVariableValue("OUCH");
    }
    /**
     * Gets the amount of 'SUMMONED OUCH' damage that occurred.
     * @return {@link float}
     * @if an error occurs
     */
    Hero.prototype.getLocalVarSummonedOuch = function() {
        return this.getLocalFloatVariableValue("SUMMONED_OUCH");
    }
    /**
     * Gets the value of the 'tmp_int1' variable.
     * @return {@link int}
     */
    Hero.prototype.getLocalVarTmpInt1 = function() {
        return this.getLocalIntVariableValue("tmp_int1");
    }
    /**
     * Gets the value of the local variable "travel_direction".
     * @return {@link String}
     * @if an error occurs
     */
    Hero.prototype.getLocalVarTravelDirection = function() {
        return this.getLocalStringVariableValue("travel_direction");
    }
    /**
     * Initializes all local variables.
     */
	Hero.prototype.initLocalVars = function() {
        this.setLocalVarBlockedMessage("");
        this.setLocalVarCombatMessage("");
        this.setLocalVarTravelDirection("");
        this.setLocalVarTmpInt1(0);
    }
    /**
     * {@inheritDoc}
     */
    Hero.prototype.onInit = function() {
        this.initLocalVars();
        this.getIO().setInitPosition(new SimpleVector2(2, 0));
        return this.ffscriptOnInit();
    }
    /**
     * {@inheritDoc}
     */
    Hero.prototype.onOuch = function() {
    	this.ouchStart();
        return ScriptGlobals.ACCEPT;
    }
    /**
     * Starts the ouch event.
     * @throws PooledException if an error occurs
     */
    Hero.prototype.ouchStart = function() {
        var ouchDmg = this.getLocalVarSummonedOuch() + this.getLocalVarOuch();
        // speak combat message first
        if (this.getLocalVarCombatMessage().length() > 0) {
            Script.getInstance().speak(this.getIO(),
                    new SpeechParameters("", String.format(getLocalVarCombatMessage(), ouchDmg)));
        }
    }
    /**
     * Sets the local variable "blocked_message".
     * @param val the variable value
     */
    Hero.prototype.setLocalVarBlockedMessage = function(val) {
    	try {
    		this.checkString(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Hero.setLocalVarBlockedMessage() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        this.setLocalVariable("blocked_message", val);
    }
    /**
     * Sets the local variable "combat_message".
     * @param val the variable value
     */
    Hero.prototype.setLocalVarCombatMessage = function(val) {
    	try {
    		this.checkString(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Hero.setLocalVarCombatMessage() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        this.setLocalVariable("combat_message", val);
    }
    Hero.prototype.setLocalVarTmpInt1 = function(val) {
    	try {
    		this.checkInteger(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Hero.setLocalVarTmpInt1() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        this.setLocalVariable("tmp_int1", val);
    }
    /**
     * Sets the local variable "travel_direction".
     * @param val the variable value
     */
    Hero.prototype.setLocalVarTravelDirection = function(val) {
    	try {
    		this.checkString(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! Hero.setLocalVarTravelDirection() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        this.setLocalVariable("travel_direction", val);
    }
    /**
     * Checks that there is a traversable path between two rooms. If a path
     * exists but is blocked, then local variable "blocked_message" is set.
     * @param room1 the id of the first room
     * @param room2 the id of the second room
     * @return <tt>true</tt> if a traversable path exists; <tt>false</tt>
     *         otherwise
     *//*
    private boolean checkPath(final int room1, final PhysicalGraphNode node2)
            {
        setLocalVarBlockedMessage("");
        boolean pass = false;
        PhysicalGraphNode node1 =
                FFWorldMap.getInstance().getRoom(room1).getMainNode();
        pass = checkPath(node1, node2);
        node1 = null;
        return pass;
    }*/
    /**
     * Checks that there is a traversable path between two rooms. If a path
     * exists but is blocked, then local variable "blocked_message" is set.
     * @param room1 the id of the first room
     * @param room2 the id of the second room
     * @return <tt>true</tt> if a traversable path exists; <tt>false</tt>
     *         otherwise
     * @if an error occurs
     *//*
    private boolean checkPath(final PhysicalGraphNode node1,
            final PhysicalGraphNode node2)
            {
        setLocalVarBlockedMessage("");
        boolean pass = false;
        if (FFWorldMap.getInstance().hasPath(node1, node2)) {
            FFInteractiveObject[] ios =
                    FFWorldMap.getInstance().getIosAlongPath(node1, node2);
            boolean blocked = false;
            if (ios != null) {
                for (int i = ios.length - 1; i >= 0; i--) {
                    if (ios[i].equals(this.getIO())) {
                        continue;
                    }
                    setLocalVarBlockedMessage(
                            TextProcessor.getInstance().processText(
                                    (FFInteractiveObject) null,
                                    ios[i],
                                    (String) null,
                                    FFWebServiceClient.getInstance().loadText(
                                            "exit_blocked")));
                    blocked = true;
                }
            }
            ios = null;
            if (!blocked) {
                pass = true;
            }
        }
        return pass;
    }*/
    /**
     * Gets the eastern destination when traveling from the source room. If
     * there is no valid destination, 0 is returned.
     * @param source the id of the source room
     * @return {@link PhysicalGraphNode}
     * @if an error occurs
     *//*
    private PhysicalGraphNode getDestinationEast(final int source)
            {
        PhysicalGraphNode destination = null;
        switch (source) {
        case 1:
            destination = FFWorldMap.getInstance().getRoom(12).getMainNode();
            break;
        case 12:
            if (!FFWorldMap.getInstance().getRoom(139).isVisited()) {
                destination =
                        FFWorldMap.getInstance().getRoom(139).getNode(650,
                                1337);
            } else {
                destination =
                        FFWorldMap.getInstance().getRoom(139).getMainNode();
            }
            break;
        case 82:
            destination = FFWorldMap.getInstance().getRoom(43).getMainNode();
            break;
        case 71:
            destination = FFWorldMap.getInstance().getRoom(1).getMainNode();
            break;
        default:
            break;
        }
        return destination;
    }*/
    /**
     * Gets the northern destination when traveling from the source room. If
     * there is no valid destination, 0 is returned.
     * @param source the id of the source room
     * @return {@link PhysicalGraphNode}
     * @if an error occurs
     *//*
    private PhysicalGraphNode getDestinationNorth(final int source)
            {
        PhysicalGraphNode destination = null;
        switch (source) {
        case 71:
            destination = FFWorldMap.getInstance().getRoom(43).getMainNode();
            break;
        default:
            break;
        }
        return destination;
    }*/
    /**
     * Gets the southern destination when traveling from the source room. If
     * there is no valid destination, 0 is returned.
     * @param source the id of the source room
     * @return {@link PhysicalGraphNode}
     * @if an error occurs
     *//*
    private PhysicalGraphNode getDestinationSouth(final int source)
            {
        PhysicalGraphNode destination = null;
        switch (source) {
        case 1:
            setLocalVarBlockedMessage(
                    FFWebServiceClient.getInstance().loadText("1_SOUTH"));
            break;
        case 43:
            destination = FFWorldMap.getInstance().getRoom(71).getMainNode();
            break;
        default:
            break;
        }
        return destination;
    }*/
    /**
     * Gets the eastern destination when traveling from the source room. If
     * there is no valid destination, 0 is returned.
     * @param source the id of the source room
     * @return {@link PhysicalGraphNode}
     * @if an error occurs
     *//*
    private PhysicalGraphNode getDestinationWest(final int source)
            {
        PhysicalGraphNode destination = null;
        switch (source) {
        case 1:
            destination = FFWorldMap.getInstance().getRoom(71).getMainNode();
            break;
        case 12:
            destination = FFWorldMap.getInstance().getRoom(1).getMainNode();
            break;
        case 43:
            destination = FFWorldMap.getInstance().getRoom(82).getMainNode();
            // destroy door_43
            if (((FFInteractive) Interactive.getInstance()).getNpcByName(
                    "DOOR_43") != null) {
                Interactive.getInstance().ARX_INTERACTIVE_DestroyIO(
                        ((FFInteractive) Interactive.getInstance())
                                .getNpcByName(
                                        "DOOR_43"));
                // add western exit to room 43
                FFWorldMap.getInstance().getRoom(source).addCommand(
                        FFCommand.WEST);
                // load orc sentry 2
                FFInteractiveObject io =
                        FFWebServiceClient.getInstance().loadNPC(
                                "ORC_SENTRY_2");
                io.setScriptLoaded(true);
                // load box 1
                io = FFWebServiceClient.getInstance().loadItem("BOX_1");
                io.setScriptLoaded(true);
            }
            break;
        case 139:
            final int x2 = 650, y = 1337;
            if (this.getIO().getPosition().equals(x2, y)) {
                destination =
                        FFWorldMap.getInstance().getRoom(12).getMainNode();
            }
            break;
        default:
            break;
        }
        return destination;
    }*//*
    private void goToRoom(final FFCommand direction, final int source,
            final PhysicalGraphNode destination) {
        // put hero in destination room
        this.getIO().setPosition(destination.getLocation());
        // add action text
        PooledStringBuilder sb =
                StringBuilderPool.getInstance().getStringBuilder();
        try {
            sb.append(source);
            sb.append("_");
            sb.append(direction.toString());
        } catch (PooledException e) {
            throw new RPGException(ErrorMessage.INTERNAL_ERROR, e);
        }
        GameScreen.getInstance().addMessage(
                FFWebServiceClient.getInstance().loadText(sb.toString()));
        sb.returnToPool();
        sb = null;
    }*/
    /**
     * Loads a door by its id.
     * @param id the door's id
     * @if there is an error
     *//*
    private void loadDoor(final int id) {
        PooledStringBuilder sb =
                StringBuilderPool.getInstance().getStringBuilder();
        try {
            sb.append("DOOR_");
            sb.append(id);
        } catch (PooledException e) {
            throw new RPGException(ErrorMessage.INTERNAL_ERROR, e);
        }
        FFWebServiceClient.getInstance().loadNPC(
                sb.toString()).setScriptLoaded(true);
        sb.returnToPool();
        sb = null;
    }*/
    /**
     * Loads a door by its id.
     * @param id the door's id
     * @if there is an error
     *//*
    private void loadDoor(final String name) {
        FFWebServiceClient.getInstance().loadNPC(name).setScriptLoaded(true);
    }*/
    /**
     * On IO Climb.
     * @return {@link int}
     * @if an error occurs
     *//*
    public int onClimb() {
        // get room occupied
        FFRoomNode room = FFWorldMap.getInstance().getPlayerRoom();
        int source = room.getId();
        String msg;
        switch (source) {
        case 139:
            final int x1 = 652, x2 = 650, y = 1337;
            if (this.getIO().getPosition().equals(x1, y)) {
                room.setMainNode(room.getNode(x2, y));
                room.addCommand(FFCommand.WEST);
                room.removeCommand(FFCommand.CLIMB);
                this.getIO().setPosition(new SimpleVector2(x2, y));
                msg = "climb_139_out";
            } else {
                msg = "climb_139_in";
            }
            break;
        default:
            msg = "climb_no_where";
        }
        GameScreen.getInstance().addMessage(
                FFWebServiceClient.getInstance().loadText(msg));
        return ScriptConstants.ACCEPT;
    }*/
    /**
     * On IO entering room 43.
     * @return {@link int}
     * @if an error occurs
     *//*
    @Override
    public int onEnterRoom() {
        int roomId = getLocalVarTmpInt1();
        FFRoomNode room = FFWorldMap.getInstance().getRoom(roomId);
        switch (roomId) {
        case 12:
            if (!room.isVisited()) {
                loadDoor(roomId);
            }
            break;
        case 43:
            if (!room.isVisited()) {
                loadDoor(roomId);
            }
            break;
        case 71:
            if (!room.isVisited()) {
                FFWebServiceClient.getInstance().loadNPC(
                        "ORC_SENTRY").setScriptLoaded(true);
            }
            break;
        case 82:
            // is the orc sentry not dead and awake?
            FFInteractiveObject io = ((FFInteractive)
                    Interactive.getInstance()).getNpcByName("ORC_SENTRY_2");
            if (io != null
                    && !io.getNPCData().IsDeadNPC()
                            && io.getScript().getLocalIntVariableValue(
                                    "sleeping") == 0) {
                // send Hear event to the orc
                Script.getInstance().sendIOScriptEvent(io,
                        ScriptConstants.SM_046_HEAR, null, null);
            }
            io = null;
            break;
        default:
        }
        setLocalVarTmpInt1(0);
        room = null;
        return ScriptConstants.ACCEPT;
    }*/
    /*
    public int onEscape() {
        System.out.println("escape!");
        // combat is by room. if combat is escaped in one room,
        // travel to the escape room
        FFRoomNode room = FFWorldMap.getInstance().getPlayerRoom();
        int roomId = room.getId();
        switch (roomId) {
        case 82:
            // change orc's aggression text
            FFInteractiveObject io = ((FFInteractive)
                    Interactive.getInstance()).getNpcByName("ORC_SENTRY_2");
            io.getScript().setLocalVariable("sp_aggression",
                    FFWebServiceClient.getInstance().loadText(
                            "orc_sentry_2_aggression_3"));
            // remove flag to allow escape
            io.getScript().setLocalVariable("escape_first_round", 0);
            io = null;
            room.setDisplayText(FFWebServiceClient.getInstance().loadText(
                    "82_SECONDARY"));
            goToRoom(FFCommand.EAST, roomId, getDestinationEast(roomId));
            break;
        default:
        }
        room = null;
        return ScriptGlobals.ACCEPT;
    }*/
    /**
     * On IO travelling.
     * @return {@link int}
     * @if an error occurs
     *//*
    public int onTravel() {
        setLocalVarBlockedMessage("");
        // get room occupied
        FFRoomNode room = FFWorldMap.getInstance().getPlayerRoom();
        int source = room.getId();
        PhysicalGraphNode destination = null;
        FFCommand direction = FFCommand.valueOf(getLocalVarTravelDirection());
        switch (direction) {
        case EAST:
            destination = getDestinationEast(source);
            break;
        case SOUTH:
            destination = getDestinationSouth(source);
            break;
        case WEST:
            destination = getDestinationWest(source);
            break;
        case NORTH:
            destination = getDestinationNorth(source);
            break;
        default:
            throw new RPGException(ErrorMessage.INTERNAL_BAD_ARGUMENT,
                    "Cannot run onTravel event for command "
                            + direction.toString());
        }
        if (destination == null) {
            if (getLocalVarBlockedMessage().length() == 0) {
                GameScreen.getInstance().addMessage(
                        FFWebServiceClient.getInstance().loadText(
                                "invalid_exit"));
            } else {
                GameScreen.getInstance().addMessage(
                        getLocalVarBlockedMessage());
            }
        } else {
            // check to see if path is blocked
            if (checkPath(source, destination)) {
                travel(direction, source, destination);
            } else if (getLocalVarBlockedMessage().length() > 0) {
                GameScreen.getInstance()
                        .addMessage(getLocalVarBlockedMessage());
            }
        }
        return ScriptConstants.ACCEPT;
    }*/
    /**
     * Travels in a specific direction.
     * @param direction the direction
     * @param source the source room id
     * @param destination the destination room id
     * @if an error occurs
     *//*
    private void travel(final FFCommand direction, final int source,
            final PhysicalGraphNode destination) {
        // are there any IOs in the room besides the PC?
        FFInteractiveObject[] ios =
                FFWorldMap.getInstance().getIosInRoom(
                        FFWorldMap.getInstance().getPlayerRoom());
        FFInteractiveObject[] npcs = null;
        // get all NPCs
        for (int i = ios.length - 1; i >= 0; i--) {
            if (ios[i].hasIOFlag(IoGlobals.IO_03_NPC)
                    && !ios[i].isInGroup("DOORS")) {
                if (npcs == null) {
                    npcs = new FFInteractiveObject[0];
                }
                npcs = ArrayUtilities.getInstance().extendArray(ios[i], npcs);
            }
        }
        if (npcs != null) {
            // alert NPCs of a sound event
            for (int i = npcs.length - 1; i >= 0; i--) {
                Script.getInstance().sendIOScriptEvent(
                        npcs[i], ScriptConstants.SM_046_HEAR, null, null);
                if (Combat.getInstance().isOver()) {
                    // NPC didn't hear or doesn't care PC is moving.
                    // go to destination
                    goToRoom(direction, source, destination);
                }
            }
        } else {
            goToRoom(direction, source, destination);
        }
    }*/
    return Hero;
});
