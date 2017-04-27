/**
 * 
 */
define(["com/dalonedrow/utils/hashcode"], function(Hashcode) {
    function SpeechParameters(initParams, spName) {
		Hashcode.call(this);
        if (initParams === undefined) {
            var s = [];
            s.push("ERROR! SpeechParameters() - ");
            s.push("initParams must be string or null");
            throw new Error(s.join(""));
        }
        if (initParams !== null
        		&& typeof initParams !== "string") {
            var s = [];
            s.push("ERROR! SpeechParameters() - ");
            s.push("initParams must be string");
            throw new Error(s.join(""));
        }
        if (spName === undefined) {
            var s = [];
            s.push("ERROR! SpeechParameters() - ");
            s.push("spName must be string or null");
            throw new Error(s.join(""));
        }
        if (spName !== null
        		&& typeof spName !== "string") {
            var s = [];
            s.push("ERROR! SpeechParameters() - ");
            s.push("spName must be string");
            throw new Error(s.join(""));
        }
	    var flags = 0;
	    var killAllSpeech = false;
	    var speechName = spName;
        if (initParams !== null
                && initParams.length() > 0) {
	        var split = initParams.split(" ");
	        for (var i = split.length - 1; i >= 0; i--) {
	            if (split[i].equalsIgnoreCase("KILLALL")) {
	                killAllSpeech = true;
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
	    /**
	     * Adds a flag.
	     * @param flag the flag
	     */
	    this.addFlag = function(flag) {
	        if (flag === undefined
	        		|| flag === null
	        		|| isNaN(flag)
		            || parseInt(Number(flag)) !== flag
		            || flag && (flag & (flag - 1)) !== 0) {
	            var s = [];
	            s.push("ERROR! SpeechParameters.addFlag() - ");
	            s.push("flag must be power of 2");
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
	        flags |= flag;
	    }
	    /**
	     * @return the speechName
	     */
	    this.getSpeechName = function() {
	        return speechName;
	    }
	    /**
	     * Determines if the {@link SendParameters} has a specific flag.
	     * @param flag the flag
	     * @return true if the {@link SendParameters} has the flag; false
	     *         otherwise
	     */
	    this.hasFlag = function(flag) {
	        if (flag !== undefined
	        		&& flag !== null
	        		&& !isNaN(flag)
		            && parseInt(Number(flag)) === flag
	        		&& flag && (flag & (flag - 1)) === 0) {
		        return (flags & flag) === flag;
	        } else {
	            var s = [];
	            s.push("ERROR! SpeechParameters.hasFlag() - ");
	            s.push("flag must be power of 2");
	            throw new Error(s.join(""));
	        }
	    }
	    /**
	     * @return the killAllSpeech
	     */
	    this.isKillAllSpeech = function() {
	        return killAllSpeech;
	    }
	    /**
	     * Removes a flag.
	     * @param flag the flag
	     */
	    this.removeFlag = function(flag) {
	        if (flag !== undefined
	        		&& flag !== null
	        		&& !isNaN(flag)
		            && parseInt(Number(flag)) === flag
	        		&& flag && (flag & (flag - 1)) === 0) {
		        flags &= ~flag;
	        } else {
	            var s = [];
	            s.push("ERROR! SpeechParameters.removeFlag() - ");
	            s.push("flag must be power of 2");
	            throw new Error(s.join(""));
	        }
	    }
	    /**
	     * @param flag the killAllSpeech to set
	     */
	    this.setKillAllSpeech = function(val) {
		    if (val !== undefined
		    		&& val !== null
		    		&& typeof val === "boolean") {
		    	killAllSpeech = val;
		    } else {
	            var s = [];
	            s.push("ERROR! SpeechParameters.setKillAllSpeech() - ");
	            s.push("argument must be boolean");
	            throw new Error(s.join(""));
		    }
	    }
	    /**
	     * @param val the value to set
	     */
	    this.setSpeechName = function() {
	        if (val !== undefined) {
	        	if (val === null) {
	        		speechName = val;
	        	} else if (typeof val === "string") {
	        		speechName = val;	        	
	        	} else {
		            var s = [];
		            s.push("ERROR! SpeechParameters.setSpeechName() - ");
		            s.push("argument must be string");
		            throw new Error(s.join(""));
	        	}
	        } else {
	            var s = [];
	            s.push("ERROR! SpeechParameters.setSpeechName() - ");
	            s.push("requires 1 argument");
	            throw new Error(s.join(""));
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
	return SpeechParameters;
});
