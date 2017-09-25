make("ReelController", function(ClassUtil, msg, Tween, reelModel) {
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
		reelModel.isSpinning = true;
		Tween.to(this.tween, reelModel.accelerationDuration, {
			y: reelModel.accelerationDistance,
			ease: "inBack",
			onUpdate: this.passDeltaToSymbols,
			onComplete: this.onAccelerateTweenComplete
		});
	};

	ReelController.prototype.onAccelerateTweenComplete = function() {
		this.lastValues.pop(); // onUpdate is called along with onComplete too
		this.speed = this.lastValues.pop() - this.lastValues.pop();
		this.maintainSpinSpeed(reelModel.MIN_SPINNING_TIME);
		reelModel.log(0);
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
		reelModel.movement(this.speed, 0);
	};

	ReelController.prototype.onMaintainTweenComplete = function() {
		this.tween.y = 0;
		this.lastValues = [0];
		reelModel.findDecelerationDistance(0);
		var distance = reelModel.deccelerationDistance;
		console.log(reelModel.deccelerationDuration, distance);
		Tween.to(this.tween, reelModel.deccelerationDuration, {
			y: reelModel.deccelerationDistance,
			ease: "outBack",
			onUpdate: this.passDeltaToSymbols,
			onUpdateParams: [distance],
			onComplete: this.onDecelerateTweenComplete
		});
	};

	ReelController.prototype.onDecelerateTweenComplete = function() {
		reelModel.log(0);
		reelModel.isSpinning = false;
		msg.emit(msg.EVENTS.SPIN.STOP);
	};

	ReelController.prototype.passDeltaToSymbols = function(targetValue) {
		var delta = this.tween.y - this.lastValues[this.lastValues.length - 1];
		this.lastValues.push(this.tween.y);
		if (targetValue) {
			reelModel.movement(delta, 0, targetValue - this.tween.y);
		}
		else {
			reelModel.movement(delta, 0);
		}
	};

	return ReelController;
});
