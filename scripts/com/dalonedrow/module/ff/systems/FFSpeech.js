function FFSpeech() {
	Speech.call(this);
	this.ARX_SPEECH_AddSpeech = function(io, mood, speech, voixoff) {
		/*
        if (!Combat.getInstance().isOver()) {
            Combat.getInstance().addMessage(Combat.MESSAGE_WARNING, speech);
        }
        */
        return 0;
    }
}
FFSpeech.prototype = Object.create(Speech.prototype);
