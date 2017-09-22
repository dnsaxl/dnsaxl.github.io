make("Sprite", function(DisplayObject, ClassUtil, assetsModel, MathUtil) {
	"use strict";

	function Sprite(source) {
		DisplayObject.apply(this, arguments);
		this.resource = assetsModel.resources[source];
		if (!this.resource || !this.resource.data) {
			throw Error("Wrong sprite source", source);
		}
		this.image = this.resource.data;
		this.origWidth = this.image.width;
		this.origHeight = this.image.height;
		this.anchorX = this.anchorY = 0;
		this.bm = ["source-over",
			"source-in",
			"source-out",
			"source-atop",
			"destination-over",
			"destination-in",
			"destination-out",
			"destination-atop"];
	}

	ClassUtil.extend(Sprite, DisplayObject);

	Object.defineProperty(Sprite.prototype, "mask", {
		get: function() {
			return this._mask;
		},
		set: function(value) {
			if (this._mask) {
				this._mask.visible = true;
			}
			this._mask = value;
			if (value) {
				this._mask.visible = false;
			}

		}
	});

	Sprite.prototype.render = function(renderer) {
		DisplayObject.prototype.render.apply(this, arguments);
		if (!this.visible) {
			return;
		}
		var w = this.world;
		renderer.save();
		if (this.mask) {
			if (this.mask instanceof Sprite) {

				renderer.drawImage(this.mask.image, this.mask.world.x, this.mask.world.y, this.mask.world.sx * this.mask.origWidth, this.mask.world.sy * this.mask.origHeight);
			}
			// renderer.beginPath();
			// renderer.moveTo(this.world.x - this.anchorX * this.width + 75, this.world.y - this.anchorY * this.height +50);
			// renderer.lineTo(this.world.x - this.anchorX * this.width + 100, this.world.y - this.anchorY * this.height +75);
			// renderer.lineTo(this.world.x - this.anchorX * this.width + 100, this.world.y - this.anchorY * this.height +25);
			// renderer.closePath();
			// renderer.clip();
		}

		renderer.globalAlpha = w.alpha;
		renderer.globalCompositeOperation = this.bm[3];
		renderer.drawImage(this.image,
			w.x - this.anchorX * this.width,
			w.y - this.anchorY * this.height,
			w.sx * this.origWidth,
			w.sy * this.origHeight
		);
		renderer.globalCompositeOperation = this.bm[0];
		renderer.restore();
	};

	Sprite.prototype.hitTest = function(x, y) {
		var w = this.world;
		return MathUtil.containsPoint(
			w.x - this.anchorX * this.width,
			w.y - this.anchorY * this.height,
			w.sx * this.origWidth,
			w.sy * this.origHeight,
			x,
			y
		);
	};

	Sprite.prototype.setAnchor = function(value) {
		this.anchorX = this.anchorY = value;
	};

	return Sprite;
});
