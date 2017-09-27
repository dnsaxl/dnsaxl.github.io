make("SpinController", function(ClassUtil, msg, gameModel) {
	"use strict";

	function SpinController() {
		ClassUtil.bindAll(this);
		this.reelsToStop = 0;
		msg.on(msg.EVENTS.SPIN.BEGIN, this.onSpinBegin);
		msg.on(msg.EVENTS.REEL.STOP, this.onReelStop);
	}

	SpinController.prototype.onSpinBegin = function() {
		for (var i = 0; i < gameModel.numReels; i++) {
			this.reelsToStop = i;
			setTimeout(this.staggerReels, i * 200, i);
		}
	};

	SpinController.prototype.onReelStop = function() {
		if(--this.reelsToStop < 0){
			msg.emit(msg.EVENTS.SPIN.STOP);
		}
	};

	SpinController.prototype.staggerReels = function(id) {
		msg.emit(msg.EVENTS.REEL.START, id);
	};

	return SpinController;
});
