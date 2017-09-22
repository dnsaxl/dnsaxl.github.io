make("MathUtil", function() {
	"use strict";

	var MathUtil = {};

	MathUtil.clamp = function(value, min, max) {
		return Math.max(min, Math.min(value, max));
	};

	MathUtil.containsPoint = function(x, y, w, h, x1, y1) {
		return x1 >= x && x1 <= x + w && y1 >= y && y1 <= y + h;
	};

	return MathUtil;
});
