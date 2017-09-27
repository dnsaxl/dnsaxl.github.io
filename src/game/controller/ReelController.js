make("ReelController", function(ClassUtil, msg, Tween) {
	"use strict";

	function ReelController(model) {
		ClassUtil.bindAll(this);
		this.reelModel = model;
		this.tween = {y: 0};
		this.lastValues = [0];
		msg.on(msg.EVENTS.REEL.START, this.onReelStart);
	}

	ReelController.prototype.onReelStart = function(reelId) {
		if (reelId !==this.reelModel.reelId) {
			return;
		}
		this.lastValues = [0];
		this.tween.y = 0;
		this.reelModel.resetSession();
		Tween.to(this.tween, this.reelModel.accelerationDuration, {
			y: this.reelModel.accelerationDistance,
			ease: this.reelModel.accelerationEasing,
			onUpdate: this.passDeltaToSymbols,
			onComplete: this.onAccelerateTweenComplete
		});
	};

	ReelController.prototype.onAccelerateTweenComplete = function() {
		this.lastValues.pop(); // onUpdate is called along with onComplete too
		this.speed = this.lastValues.pop() - this.lastValues.pop();
		this.maintainSpinSpeed(this.reelModel.MIN_SPINNING_TIME);
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
		this.reelModel.movement(this.speed);
	};

	ReelController.prototype.onMaintainTweenComplete = function() {
		this.tween.y = 0;
		this.lastValues = [0];
		this.reelModel.findDecelerationDistance();
		var distance = this.reelModel.deccelerationDistance;
		Tween.to(this.tween, this.reelModel.deccelerationDuration, {
			y: distance,
			ease: this.reelModel.deccelerationEasing,
			onUpdate: this.passDeltaToSymbols,
			onUpdateParams: [distance],
			onComplete: this.onDecelerateTweenComplete
		});
	};

	ReelController.prototype.onDecelerateTweenComplete = function() {
		msg.emit(msg.EVENTS.REEL.STOP, this.reelModel.reelId);
	};

	ReelController.prototype.passDeltaToSymbols = function(targetValue) {
		var delta = this.tween.y - this.lastValues[this.lastValues.length - 1];
		this.lastValues.push(this.tween.y);
		if (targetValue) {
			this.reelModel.movement(delta, targetValue - this.tween.y);
		}
		else {
			this.reelModel.movement(delta);
		}
	};

	return ReelController;
});
