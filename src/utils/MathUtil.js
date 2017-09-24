make("MathUtil", function() {
	"use strict";

	var MathUtil = {};

	MathUtil.clamp = function(value, min, max) {
		return Math.max(min, Math.min(value, max));
	};

	MathUtil.containsPoint = function(x, y, w, h, x1, y1) {
		return x1 >= x && x1 <= x + w && y1 >= y && y1 <= y + h;
	};

	MathUtil.getRandomInt = function(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	};

	MathUtil.getRandomFloat = function(min, max) {
		return Math.random() * (max - min) + min;
	};

	MathUtil.getRandomElement = function(array) {
		return array[MathUtil.getRandomInt(0, array.length - 1)];
	};

	return MathUtil;
});
