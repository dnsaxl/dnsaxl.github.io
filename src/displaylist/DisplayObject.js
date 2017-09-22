make("DisplayObject", function(ClassUtil, EventEmitter, MathUtil) {
	"use strict";

	function DisplayObject() {
		EventEmitter.apply(this, arguments);
		ClassUtil.bindAll(this);
		this.x = this.y = 0;
		this.origWidth = this.origHeight = 0;
		this.scaleX = this.scaleY = this.alpha = 1;
		this.anchorX = this.anchorY = 0;
		this.world = {x: 0, y: 0, sx: 1, sy: 1, alpha: 1};
		this.parent = null;
		this.interactive = false;
		this.visible = true;
	}

	ClassUtil.extend(DisplayObject, EventEmitter);

	Object.defineProperty(DisplayObject.prototype, "width", {
		get: function() {
			return this.scaleX * this.origWidth;
		},
		set: function(value) {
			this.scaleX = value / this.origWidth;
		}
	});

	Object.defineProperty(DisplayObject.prototype, "height", {
		get: function() {
			return this.scaleY * this.origHeight;
		},
		set: function(value) {
			this.scaleY = value / this.origHeight;
		}
	});

	DisplayObject.prototype.setScale = function(value) {
		this.scaleX = this.scaleY = value;
	};

	DisplayObject.prototype.setAnchor = function(value) {
		this.anchorX = this.anchorY = value;
	};

	DisplayObject.prototype.update = function(world) {
		var w = this.world;
		w.x = world.x + this.x - this.anchorX * w.sx * this.origWidth;
		w.y = world.y + this.y - this.anchorY * w.sy * this.origHeight;
		w.sx = world.sx * this.scaleX;
		w.sy = world.sy * this.scaleY;
		w.w = w.sx * this.origWidth;
		w.h = w.sy * this.origHeight;
		w.alpha = world.alpha * this.alpha;
	};

	DisplayObject.prototype.render = function(renderer) {

	};

	DisplayObject.prototype.hitTest = function(x, y) {
		var w = this.world;
		return MathUtil.containsPoint(w.x, w.y, w.w, w.h, x, y);
	};

	return DisplayObject;
});
