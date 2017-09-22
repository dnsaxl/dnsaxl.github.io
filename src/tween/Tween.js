make("Tween", function() {
	"use strict";

	function Tween(target, time, props) {
		this.target = target;
		this.duration = time * 1000;
		this.timePassed = 0;
		this.parseProperties(props);
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
			= this.delay = this.repeat = this.ease = this.startValues
			= this.endValues = this.diffValues = this.target = null;
	};

	Tween.prototype.parseProperties = function(props) {
		this.onComplete = props.onComplete;
		this.onUpdate = props.onUpdate;
		this.delay = props.delay;
		this.repeat = props.repeat;
		this.ease = props.ease || Tween.easings.easeOutQuad;
		this.startValues = {};
		this.endValues = {};
		this.diffValues = {};
		for (var property in props) {
			var startValue = this.target[property];
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
					tween.onUpdate(tween.timePassed / tween.duration);
				}
			}
		}

	};

	Tween.finish = function(tween) {
		for (var p in tween.endValues) {
			console.log("tw", p, tween.endValues[p]);
			tween.target[p] = tween.endValues[p];
		}
		if (tween.onUpdate) {
			tween.onUpdate(1);
		}
		if (tween.onComplete) {
			tween.onComplete();
		}
		tween.destroy();
	};

	Tween.easings = {
		easeOutQuad: function(t, b, c, d) {
			return -c * (t /= d) * (t - 2) + b;
		}
	};

	return Tween;
});
