make("ReelController", function(ClassUtil, msg, Tween, view, reelModel) {
	"use strict";

	function ReelController() {
		ClassUtil.bindAll(this);
		msg.on(msg.EVENTS.SPIN.BEGIN, this.onSpinBegin);
		this.tween = {y: 0};
		this.lastValues = [0];
	}

	ReelController.prototype.onSpinBegin = function() {
		this.lastValues = [0];
		this.tween.y = 0;
		Tween.to(this.tween, reelModel.accelerationDuration, {
			y: reelModel.accelerationSpeed,
			ease : "inBack",
			onUpdate: this.passDeltaToSymbols,
			onComplete: this.onAccelerateTweenComplete
		});
	};

	ReelController.prototype.onAccelerateTweenComplete = function() {
		this.lastValues.pop(); // onUpdate is called along with onComplete too
		this.speed = this.lastValues.pop() - this.lastValues.pop();
		this.maintainSpinSpeed(reelModel.MIN_SPINNING_TIME);
	};

	ReelController.prototype.maintainSpinSpeed = function(duration) {
		this.tween.y = 0;
		Tween.to(this.tween, duration, {
			y: 100,
			onUpdate: this.onMaintainTweenUpdate,
			onComplete: this.onMaintainTweenComplete
		});
	};

	ReelController.prototype.onMaintainTweenUpdate = function() {
		view.symbolsContainer.movement(this.speed);
	};

	ReelController.prototype.onMaintainTweenComplete = function() {
		console.log("maintain complete");
		this.tween.y = 0;
		this.lastValues = [0];
		Tween.to(this.tween, reelModel.accelerationDuration, {
			y: reelModel.accelerationSpeed,
			ease : "outBack",
			onUpdate: this.passDeltaToSymbols,
			onComplete: this.onDecelerateTweenComplete
		});
	};

	ReelController.prototype.onDecelerateTweenComplete = function() {
	    msg.emit(msg.EVENTS.SPIN.STOP);
	};

	ReelController.prototype.passDeltaToSymbols = function() {
		var delta = this.tween.y - this.lastValues[this.lastValues.length - 1];
		this.lastValues.push(this.tween.y);
		view.symbolsContainer.movement(delta);
	};


	return ReelController;
});
