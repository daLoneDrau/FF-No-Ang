define(function() {
	var Camera = function(renderer) {
        this.renderer = renderer;
        this.x = 0;
        this.y = 0;
        this.gridX = 0;
        this.gridY = 0;
        this.offset = 0.5;
        this.rescale();
	};
    Camera.prototype.rescale = function() {
        var factor = this.renderer.mobile ? 1 : 2;
    
        this.gridW = 15 * factor;
        this.gridH = 7 * factor;
    
        console.debug("---------");
        console.debug("Factor:"+factor);
        console.debug("W:"+this.gridW + " H:" + this.gridH);
    };
	return Camera;
});