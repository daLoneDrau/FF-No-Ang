/**
 * 
 */
define(["com/dalonedrow/utils/hashcode"], function(Hashcode) {
    function SpeechParameters(initParams, spName) {
		Hashcode.call(this);
    	try {
    		this.checkStringNullsAllowed(initParams);
    	} catch (err) {
            var s = [];
            s.push("ERROR! SpeechParameters() - initParams ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	try {
    		this.checkString(spName);
    	} catch (err) {
            var s = [];
            s.push("ERROR! SpeechParameters() - spName ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
	    this.flags = 0;
	    this.killAllSpeech = false;
	    this.speechName = spName;
        if (initParams !== null
                && initParams.length() > 0) {
	        var split = initParams.split(" ");
	        for (var i = split.length - 1; i >= 0; i--) {
	            if (split[i].equalsIgnoreCase("KILLALL")) {
	            	this.killAllSpeech = true;
	            }
	            if (split[i].equalsIgnoreCase("T")) {
	                this.addFlag(SpeechParameters.NO_TEXT);
	            }
	            if (split[i].equalsIgnoreCase("U")) {
	            	this.addFlag(SpeechParameters.UNBREAKABLE);
	            }
	            if (split[i].equalsIgnoreCase("P")) {
	            	this.addFlag(SpeechParameters.PLAYER);
	            }
	            if (split[i].equalsIgnoreCase("H")) {
	            	this.addFlag(SpeechParameters.HAPPY);
	            }
	            if (split[i].equalsIgnoreCase("A")) {
	            	this.addFlag(SpeechParameters.ANGRY);
	            }
	            if (split[i].equalsIgnoreCase("O")) {
	            	this.addFlag(SpeechParameters.OFF_VOICE);
	            }
	            if (split[i].equalsIgnoreCase("KEEP")) {
	            	this.addFlag(SpeechParameters.KEEP_SPEECH);
	            }
	            if (split[i].equalsIgnoreCase("ZOOM")) {
	            	this.addFlag(SpeechParameters.ZOOM_SPEECH);
	            }
	            if (split[i].equalsIgnoreCase("CCCTALKER_L")) {
	            	this.addFlag(SpeechParameters.SPEECH_CCCTALKER_L);
	            }
	            if (split[i].equalsIgnoreCase("CCCTALKER_R")) {
	            	this.addFlag(SpeechParameters.SPEECH_CCCTALKER_R);
	            }
	            if (split[i].equalsIgnoreCase("CCCLISTENER_L")) {
	            	this.addFlag(SpeechParameters.SPEECH_CCCLISTENER_L);
	            }
	            if (split[i].equalsIgnoreCase("CCCLISTENER_R")) {
	            	this.addFlag(SpeechParameters.SPEECH_CCCLISTENER_R);
	            }
	            if (split[i].equalsIgnoreCase("SIDE_L")) {
	            	this.addFlag(SpeechParameters.SIDE_L);
	            }
	            if (split[i].equalsIgnoreCase("SIDE_R")) {
	            	this.addFlag(SpeechParameters.SIDE_R);
	            }
	        }
        }
    }
    SpeechParameters.prototype = Object.create(Hashcode.prototype);
	SpeechParameters.ANGRY = 16;
	SpeechParameters.HAPPY = 8;
	SpeechParameters.KEEP_SPEECH = 64;
	SpeechParameters.NO_TEXT = 1;
	SpeechParameters.OFF_VOICE = 32;
	SpeechParameters.PLAYER = 4;
	SpeechParameters.SIDE_L = 4096;
	SpeechParameters.SIDE_R = 8192;
	SpeechParameters.SPEECH_CCCLISTENER_L = 1024;
	SpeechParameters.SPEECH_CCCLISTENER_R = 2048;
	SpeechParameters.SPEECH_CCCTALKER_L = 256;
	SpeechParameters.SPEECH_CCCTALKER_R = 512;
	SpeechParameters.UNBREAKABLE = 2;
	SpeechParameters.ZOOM_SPEECH = 128;
    /**
     * Adds a flag.
     * @param flag the flag
     */
	SpeechParameters.prototype.addFlag = function(flag) {
    	try {
    		this.checkPowerOfTwo(flag);
    	} catch (err) {
            var s = [];
            s.push("ERROR! SpeechParameters.addFlag() - flag ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        if (flag === SpeechParameters.ZOOM_SPEECH) {
            this.removeFlag(SpeechParameters.SPEECH_CCCTALKER_L);
            this.removeFlag(SpeechParameters.SPEECH_CCCTALKER_R);
            this.removeFlag(SpeechParameters.SPEECH_CCCLISTENER_L);
            this.removeFlag(SpeechParameters.SPEECH_CCCLISTENER_R);
            this.removeFlag(SpeechParameters.SIDE_L);
            this.removeFlag(SpeechParameters.SIDE_R);
        } else if (flag === SpeechParameters.SPEECH_CCCTALKER_L) {
        	this.removeFlag(SpeechParameters.ZOOM_SPEECH);
        	this.removeFlag(SpeechParameters.SPEECH_CCCTALKER_R);
        	this.removeFlag(SpeechParameters.SPEECH_CCCLISTENER_L);
        	this.removeFlag(SpeechParameters.SPEECH_CCCLISTENER_R);
        	this.removeFlag(SpeechParameters.SIDE_L);
        	this.removeFlag(SpeechParameters.SIDE_R);
        } else if (flag === SpeechParameters.SPEECH_CCCTALKER_R) {
        	this.removeFlag(SpeechParameters.ZOOM_SPEECH);
        	this.removeFlag(SpeechParameters.SPEECH_CCCTALKER_L);
        	this.removeFlag(SpeechParameters.SPEECH_CCCLISTENER_L);
        	this.removeFlag(SpeechParameters.SPEECH_CCCLISTENER_R);
        	this.removeFlag(SpeechParameters.SIDE_L);
        	this.removeFlag(SpeechParameters.SIDE_R);
        } else if (flag === SpeechParameters.SPEECH_CCCLISTENER_L) {
        	this.removeFlag(SpeechParameters.ZOOM_SPEECH);
        	this.removeFlag(SpeechParameters.SPEECH_CCCTALKER_L);
        	this.removeFlag(SpeechParameters.SPEECH_CCCTALKER_R);
        	this.removeFlag(SpeechParameters.SPEECH_CCCLISTENER_R);
        	this.removeFlag(SpeechParameters.SIDE_L);
        	this.removeFlag(SpeechParameters.SIDE_R);
        } else if (flag === SSpeechParameters.PEECH_CCCLISTENER_R) {
        	this.removeFlag(SpeechParameters.ZOOM_SPEECH);
        	this.removeFlag(SpeechParameters.SPEECH_CCCTALKER_L);
        	this.removeFlag(SpeechParameters.SPEECH_CCCTALKER_R);
        	this.removeFlag(SpeechParameters.SPEECH_CCCLISTENER_L);
        	this.removeFlag(SpeechParameters.SIDE_L);
        	this.removeFlag(SpeechParameters.SIDE_R);
        } else if (flag === SpeechParameters.SIDE_L) {
        	this.removeFlag(SpeechParameters.ZOOM_SPEECH);
        	this.removeFlag(SpeechParameters.SPEECH_CCCTALKER_L);
        	this.removeFlag(SpeechParameters.SPEECH_CCCTALKER_R);
        	this.removeFlag(SpeechParameters.SPEECH_CCCLISTENER_L);
        	this.removeFlag(SpeechParameters.SPEECH_CCCLISTENER_R);
        	this.removeFlag(SpeechParameters.SIDE_R);
        } else if (flag === SpeechParameters.SIDE_R) {
        	this.removeFlag(SpeechParameters.ZOOM_SPEECH);
        	this.removeFlag(SpeechParameters.SPEECH_CCCTALKER_L);
        	this.removeFlag(SpeechParameters.SPEECH_CCCTALKER_R);
        	this.removeFlag(SpeechParameters.SPEECH_CCCLISTENER_L);
        	this.removeFlag(SpeechParameters.SPEECH_CCCLISTENER_R);
        	this.removeFlag(SpeechParameters.SIDE_L);
        }
        this.flags |= flag;
    }
    /**
     * @return the speechName
     */
	SpeechParameters.prototype.getSpeechName = function() {
        return this.speechName;
    }
    /**
     * Determines if the {@link SendParameters} has a specific flag.
     * @param flag the flag
     * @return true if the {@link SendParameters} has the flag; false
     *         otherwise
     */
	SpeechParameters.prototype.hasFlag = function(flag) {
    	try {
    		this.checkPowerOfTwo(flag);
    	} catch (err) {
            var s = [];
            s.push("ERROR! SpeechParameters.hasFlag() - flag ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
        return (this.flags & flag) === flag;
    }
    /**
     * @return the killAllSpeech
     */
	SpeechParameters.prototype.isKillAllSpeech = function() {
        return this.killAllSpeech;
    }
    /**
     * Removes a flag.
     * @param flag the flag
     */
	SpeechParameters.prototype.removeFlag = function(flag) {
    	try {
    		this.checkPowerOfTwo(flag);
    	} catch (err) {
            var s = [];
            s.push("ERROR! SpeechParameters.removeFlag() - flag ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	this.flags &= ~flag;
    }
    /**
     * @param flag the killAllSpeech to set
     */
	SpeechParameters.prototype.setIsKillAllSpeech = function(val) {
    	try {
    		this.checkBoolean(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! SpeechParameters.setIsKillAllSpeech() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
    	this.killAllSpeech = val;
    }
    /**
     * @param val the value to set
     */
	SpeechParameters.prototype.setSpeechName = function(val) {
    	try {
    		this.checkStringNullsAllowed(val);
    	} catch (err) {
            var s = [];
            s.push("ERROR! SpeechParameters.setSpeechName() - val ");
            s.push(err.message);
            throw new Error(s.join(""));
    	}
		this.speechName = val;
    }
	return SpeechParameters;
});
