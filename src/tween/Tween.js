make("Tween", function(Ease) {
	"use strict";

	function Tween(target, time, props) {
		this.target = target;
		this.duration = time * 1000;
		this.timePassed = 0;
		this.props = props;
		this.parseProperties(props);
		if (!this.delayRemaining) {
			this.parseValues();
		}

		Tween.tweens.push(this);
	}

	Tween.prototype.update = function(property) {
		this.target[property] = this.ease(
			this.timePassed,
			this.startValues[property],
			this.diffValues[property],
			this.duration
		);
	};

	Tween.prototype.destroy = function() {
		this.duration = this.timePassed = this.onComplete = this.onUpdate
			= this.delay = this.delayRemaining = this.repeat = this.ease = this.startValues
			= this.endValues = this.diffValues = this.target = null;
	};

	Tween.prototype.parseProperties = function(props) {
		this.onComplete = props.onComplete;
		this.onCompleteParams = props.onCompleteParams;
		this.onUpdate = props.onUpdate;
		this.onUpdateParams = props.onUpdateParams;
		this.delay = this.delayRemaining = props.delay * 1000;
		this.repeat = props.repeat;
		this.ease = Ease[props.ease] || props.ease || Ease.outQuad;
	};

	Tween.prototype.parseValues = function() {
		var props = this.props;
		this.startValues = {};
		this.endValues = {};
		this.diffValues = {};
		for (var property in props) {
			var startValue = Number(this.target[property]);
			if (!isNaN(startValue)) {
				this.startValues[property] = startValue;
				this.endValues[property] = props[property];
				this.diffValues[property] = props[property] - startValue;
			}
		}
	};

	Tween.tweens = [];
	Tween.time = Date.now();
	Tween.frameTime = 0;

	Tween.to = function(target, time, props) {
		return new Tween(target, time, props);
	};

	Tween.tick = function() {
		var now = Date.now();
		Tween.frameTime = now - Tween.time;
		Tween.time = now;
		Tween.update(Tween.frameTime);
	};

	Tween.update = function(delta) {
		for (var j = Tween.tweens.length; j--;) {
			var tween = Tween.tweens[j];
			if (tween.delayRemaining > 0) {
				tween.delayRemaining -= delta;
				if (tween.delayRemaining < 0) {
					delta = Math.abs(tween.delayRemaining);
					tween.parseValues();

				}
				else {
					continue;
				}
			}
			tween.timePassed += delta;
			var values = tween.startValues;
			if (tween.timePassed >= tween.duration) {
				Tween.tweens.splice(j, 1);
				Tween.finish(tween);
			}
			else {
				for (var property in values) {
					tween.update(property);
				}
				if (tween.onUpdate) {
					tween.onUpdate.apply(null, tween.onUpdateParams);
				}
			}
		}

	};

	Tween.finish = function(tween) {
		for (var p in tween.endValues) {
			tween.target[p] = tween.endValues[p];
		}
		if (tween.onUpdate) {
			tween.onUpdate.apply(null, tween.onUpdateParams);
		}
		if (tween.onComplete) {
			tween.onComplete.apply(null, tween.onCompleteParams);
		}
		tween.destroy();
	};

	Tween.killByTarget = function(target) {
		for (var j = Tween.tweens.length; j--;) {
			var tween = Tween.tweens[j];
			if (tween.target === target) {
				Tween.tweens.splice(j, 1);
				tween.destroy();
			}
		}
	};

	return Tween;
});
