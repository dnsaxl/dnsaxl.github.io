make("ReelController", function(ClassUtil, msg, Tween, view) {
	"use strict";

	function ReelController() {
		ClassUtil.bindAll(this);
		msg.on(msg.EVENTS.SPIN.BEGIN, this.onSpinBegin);
		this.tween = {y: 0};
		this.lastValues = [0];
	}

	ReelController.prototype.onSpinBegin = function() {
		this.lastValues = [0];
		Tween.to(this.tween, 1, {
			y: 100,
			ease : "inQuad",
			onUpdate: this.onAccelerateTweenUpdate,
			onComplete: this.onAccelerateTweenComplete
		});
	};

	ReelController.prototype.onAccelerateTweenUpdate = function() {
		var l = this.lastValues.length;
		var delta = this.tween.y - this.lastValues[l - 1];
		this.lastValues.push(this.tween.y);
		view.symbolsContainer.movement(delta);
	};

	ReelController.prototype.onAccelerateTweenComplete = function() {
		this.lastValues.pop(); // onUpdate is called along with onComplete too
		var speed = this.lastValues.pop() - this.lastValues.pop();
	    console.log("accelerate complete", speed);
	};

	return ReelController;
});
