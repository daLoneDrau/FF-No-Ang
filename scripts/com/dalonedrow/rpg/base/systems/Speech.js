function Speech() {
	Hashcode.call(this);
    this.ARX_SPEECH_AddSpeech = function(io, mood, speech, voixoff) {
    	
    }
}
Speech.prototype = Object.create(Hashcode.prototype);
Speech.getInstance = function() {
	return Speech.instance;
}
Speech.setInstance = function(i) {
	if (!(i instanceof Speech)) {
		throw new Error("Instance must be a Speech subclass.")
	}
	Speech.instance = i;
}
