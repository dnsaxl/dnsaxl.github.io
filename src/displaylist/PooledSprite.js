make("PooledSprite", function(ClassUtil, Sprite, Tween) {
	"use strict";

	PooledSprite.poolInactive = [];
	PooledSprite.poolActive = [];
	PooledSprite.maxPoolLength = 200;

	function PooledSprite() {
		Sprite.apply(this, arguments);
		PooledSprite.poolActive.push(this);
		this.timeouts = [];
	}

	ClassUtil.extend(PooledSprite, Sprite);

	PooledSprite.fromPool = function(url, anchorX, anchorY, scale, positionX, positionY) {
		var inactive = PooledSprite.poolInactive[url];
		var active = PooledSprite.poolActive[url];
		if (!inactive) {
			PooledSprite.poolInactive[url] = inactive = [];
		}
		if (!active) {
			PooledSprite.poolActive[url] = active = [];
		}

		var sprite = (inactive.length > 0) ? inactive.pop() : new PooledSprite(url);
		if (active.indexOf(sprite) < 0) {
			if (active.length < PooledSprite.maxPoolLength) {
				active.push(sprite);
			}
			else {
				console.warn("PooledSprite max number of active instances reached for " + url + ": " + PooledSprite.maxPoolLength);
			}
		}
		sprite.url = url;

		sprite.anchorX = anchorX || 0;
		sprite.anchorY = anchorY || 0;
		if (scale || scale === 0) {
			sprite.setScale(scale);
		}
		sprite.x = positionX || 0;
		sprite.y = positionY || 0;
		
		return sprite

	};

	PooledSprite.returnToPool = function(sprite) {
		if (!sprite) return;
		PooledSprite.resetInstance(sprite);
		var url = sprite.url;

		var inactive = PooledSprite.poolInactive[url];
		var active = PooledSprite.poolActive[url];
		if (!inactive) {
			PooledSprite.poolInactive[url] = inactive = [];
		}
		if (!active) {
			PooledSprite.poolActive[url] = active = [];
		}
		var i = active.indexOf(sprite);
		if (i > -1) {
			active.splice(i, 1);
		}
		if (inactive.indexOf(sprite) < 0) {
			if (inactive.length < PooledSprite.maxPoolLength) {
				inactive.push(sprite);
			}
			else {
				console.warn("PooledSprite max number of inactive instances reached for " + url + ": " + PooledSprite.maxPoolLength + ". Destroying..");
				sprite = null;
			}
		}
	};

	PooledSprite.numInstances = function() {
		return PooledSprite.poolActive.length + PooledSprite.poolInactive.length;
	};

	PooledSprite.resetInstance = function(sprite) {
		if (sprite.parent) {
			sprite.parent.removeChild(sprite);
		}
		sprite.clearTimeouts();
		Tween.killByTarget(sprite);
		sprite.setScale(1);
		sprite.setAnchor(0);
		sprite.x = sprite.y = 0;
		delete sprite.url;
	};

	PooledSprite.killActive = function() {
		var active = PooledSprite.poolActive;
		while (active.length) {
			pool[0].returnToPool();
		}
	};

	PooledSprite.destroyInactive = function() {
		while (PooledSprite.poolInactive.length) {
			PooledSprite.poolInactive.pop().destroy();
		}
	};

	PooledSprite.prototype.returnToPool = function() {
		PooledSprite.returnToPool(this);
	};

	PooledSprite.prototype.clearTimeouts = function() {
		while (this.timeouts.length) {
			clearTimeout(this.timeouts.pop());
		}
	};

	PooledSprite.prototype.setTimeout = function() {
		this.timeouts.push(setTimeout.apply(this, arguments));
	};

	return PooledSprite;
});
