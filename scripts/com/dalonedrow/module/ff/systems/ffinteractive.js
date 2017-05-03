define(["com/dalonedrow/engine/sprite/base/simplevector2",
	"com/dalonedrow/engine/systems/base/interactive",
	"com/dalonedrow/engine/systems/base/projectconstants",
	"com/dalonedrow/module/ff/rpg/ffcharacter",
	"com/dalonedrow/module/ff/rpg/ffinteractiveobject",
	"com/dalonedrow/module/ff/scripts/pc/hero",
	"com/dalonedrow/rpg/base/constants/ioglobals",
	"com/dalonedrow/rpg/base/systems/script"], function(SimpleVector2, Interactive,
			ProjectConstants, FFCharacter, FFInteractiveObject, Hero, IoGlobals, Script) {
	function FFInteractive() {
		Interactive.call(this);
	    /** the next available id. */
	    this.nextId = 0;
	}
	FFInteractive.prototype = Object.create(Interactive.prototype);
	FFInteractive.prototype.addAnimation = function(id, animId) {
    	try {
    		this.checkInteger(id);
    	} catch (err) {
            var s = [];
            s.push("ERROR! FFInteractive.addAnimation() - id ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkInteger(animId);
    	} catch (err) {
            var s = [];
            s.push("ERROR! FFInteractive.addAnimation() - animId ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        // TODO Auto-generated method stub

    }
	FFInteractive.prototype.addItem = function(item, flags) {
    	try {
    		this.checkString(item);
    	} catch (err) {
            var s = [];
            s.push("ERROR! FFInteractive.addItem() - item ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkPowerOfTwo(flags);
    	} catch (err) {
            var s = [];
            s.push("ERROR! FFInteractive.addItem() - flags ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        // TODO Auto-generated method stub
        return null;
    }
	FFInteractive.prototype.ARX_INTERACTIVE_ForceIOLeaveZone = function(io, flags) {
    	try {
    		this.checkInstanceOf(io, FFInteractiveObject);
    	} catch (err) {
            var s = [];
            s.push("ERROR! FFInteractive.ARX_INTERACTIVE_ForceIOLeaveZone() - io ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkPowerOfTwo(flags);
    	} catch (err) {
            var s = [];
            s.push("ERROR! FFInteractive.ARX_INTERACTIVE_ForceIOLeaveZone() - flags ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        // TODO Auto-generated method stub

    }
    /**
     * Gets the IO that occupies a specific position.  No two IOs can occupy
     * the same position.
     * @param pt the {@link SimpleVector2}
     * @return {@link FFInteractiveObject}
     */
	FFInteractive.prototype.getIoAtPosition = function(pt) {
    	try {
    		this.checkInstanceOf(io, SimpleVector2);
    	} catch (err) {
            var s = [];
            s.push("ERROR! FFInteractive.getIoAtPosition() - io ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        var io = null;
        var objs = this.getIOs();
        for (var i = objs.length - 1; i >= 0; i--) {
        	var ioo = objs[i];
            if (ioo != null
                    && ioo.getPosition() != null
                    && ioo.getPosition().equals(pt)) {
                io = ioo;
            }
        }
        objs = null;
        return io;
    }
    /**
     * Gets the master script object.
     * @return {@link FFInteractiveObject}
     */
	FFInteractive.prototype.getMasterScript = function() {
    	var io = this.getNewIO();
        // TODO - set master script
        // io.setScript(new MasterScript());
        // io.addIOFlag(FFIo.IO_16_IMMORTAL);
        return io;
    }
	FFInteractive.prototype.getMaxIORefId = function() {
        return this.nextId;
    }
	FFInteractive.prototype.getNewIO = function() {
        // step 1 - find the next id
    	var id = this.nextId++;
    	var io = null;
        // try {
        io = new FFInteractiveObject(id);
        // } catch (RPGException e) {
        // JOGLErrorHandler.getInstance().fatalError(e);
        // }
        // step 2 - find the next available index in the objs array
        var index = -1, objs = this.getIOs();
        for (var i = objs.length - 1; i >= 0; i--) {
            if (objs[i] === null) {
                index = i;
                break;
            }
        }
        // step 3 - put the new object into the arrays
        if (index < 0) {
            objs.push(io);
        } else {
            objs[index] = io;
        }
        objs = null;
        return io;
    }
    /**
     * Gets an NPC object by its name.
     * @param name the name
     * @return {@link FFInteractiveObject}
     */
	FFInteractive.prototype.getNpcByName = function(name) {
    	try {
    		this.checkString(name);
    	} catch (err) {
            var s = [];
            s.push("ERROR! FFInteractive.getNpcByName() - name ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	var io = null, objs = this.getIOs();
        for (var i = objs.length - 1; i >= 0; i--) {
            if (objs[i] !== null
                    && objs[i].hasIOFlag(IoGlobals.IO_03_NPC)
                    && name.toLowerCase() === objs[i].getNPCData().getName().toLowerCase()) {
                io = objs[i];
                break;
            }
        }
        objs = null;
        return io;
    }
    /**
     * Gets a new Player IO.
     * @return {@link FFInteractiveObject}
     * @throws RPGException
     */
	FFInteractive.prototype.newHero = function() {
	   var io = this.getNewIO();
	   io.addIOFlag(IoGlobals.IO_01_PC);
	   io.setPCData(new FFCharacter());
	   io.getPCData().newHero();
	   ProjectConstants.getInstance().setPlayer(io.getRefId());
	   io.setScript(new Hero(io));
	   Script.getInstance().sendInitScriptEvent(io);
	   return io;
    }
    /**
     * Gets a new Item IO
     * @return {@link FFInteractiveObject}
     * @throws RPGException
     */
	FFInteractive.prototype.newItem = function() {
	   var io = this.getNewIO();
	   io.addIOFlag(IoGlobals.IO_02_ITEM);
       return io;
    }
    /**
     * Gets a new Item IO
     * @return {@link FFInteractiveObject}
     * @throws RPGException
     */
	FFInteractive.prototype.newNPC = function() {
	   var io = this.getNewIO();
       io.addIOFlag(IoGlobals.IO_03_NPC);
       return io;
    }
	return FFInteractive;
});
