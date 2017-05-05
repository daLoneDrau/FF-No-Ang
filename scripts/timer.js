/**
 * 
 */
define(["com/dalonedrow/utils/hashcode"], function(Hashcode) {
	function Timer(duration, startTime) {
		Hashcode.call(this);
        this.lastTime = startTime || 0;
        this.duration = duration;
    };
    Timer.prototype = Object.create(Hashcode.prototype);
    Timer.prototype.isOver = function(time) {
        var over = false;
   
        if((time - this.lastTime) > this.duration) {
            over = true;
            this.lastTime = time;
        }
        return over;
    }
	return Timer;
});