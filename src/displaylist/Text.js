make("Text", function(DisplayObject, ClassUtil) {
	"use strict";

	function Text(text, style) {
		DisplayObject.apply(this, arguments);
		this.anchorX = this.anchorY = 0;
		this._lines = [];
		this._spacing = 0;
		this._lineHeight = 0;
		this._dirty = false;
		this.style = style || this.getDefaultStyle();
		this.text = text || "";
	}

	ClassUtil.extend(Text, DisplayObject);

	Text.ALIGN = {
		center: 0.5,
		left: 0,
		right: 1
	};

	Text.prototype.setAnchor = function(value) {
		this.anchorX = this.anchorY = value;
	};

	Object.defineProperty(Text.prototype, "text", {
		get: function() {
			return this._text;
		},
		set: function(value) {
			this._text = String(value);
			this.parseText();
		}
	});

	Object.defineProperty(Text.prototype, "style", {
		get: function() {
			return this._style;
		},
		set: function(value) {
			this._style = value;
			this.parseStyle();
		}
	});

	Text.prototype.parseText = function() {
		this._lines = this.text.split(/\n/);
		this._numLines = this._lines.length;
		this._lineHeight = Number(this._style.font.match(/\d+/).pop()) + this._spacing;
		this._dirty = true;
	};

	Text.prototype.parseStyle = function() {
		this._spacing = this.style.lineSpacing || this._spacing;
		this._lineHeight = Number(this._style.font.match(/\d+/).pop()) + this._spacing;
		this._dirty = true;
	};

	Text.prototype.render = function(renderer) {
		renderer.save();
		renderer.textBaseline = "top";
		renderer.font = this.style.font;
		renderer.fillStyle = this.style.fill;
		renderer.scale(this.scaleX, this.scaleY);

		if (this._dirty) {
			this._lineWidths = this.measure(renderer);
			this._dirty = false;
		}

		var bx = (this.world.x - this.anchorX * this.width) / this.scaleX;
		var by = (this.world.y - this.anchorY * this.height) / this.scaleY;
		for (var i = 0, j = this._lines.length; i < j; i++) {
			renderer.fillText(this._lines[i],
				bx + this._lineWidths[i],
				by + this._lineHeight * i
			);
		}
		renderer.restore();
	};

	Text.prototype.measure = function(renderer) {
		var i, j, widths;
		var align = Text.ALIGN[this.style.align] || this.getDefaultStyle().align;
		for (i = 0, j = this._lines.length, widths = []; i < j; i++) {
			widths.push(renderer.measureText(this._lines[i]).width);
		}
		this.origWidth = Math.max.apply(null, widths);
		this.origHeight = this._lineHeight * this._numLines;

		for (i = 0, j = this._lines.length; i < j; i++) {
			widths[i] = (this.origWidth - widths[i]) * align;
		}
		return widths;
	};

	Text.prototype.getDefaultStyle = function() {
		return {
			font: "20px Verdana",
			fill: "red",
			lineSpacing: 0,
			align: Text.ALIGN.center
		}
	};

	return Text;
});
