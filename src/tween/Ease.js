make("Ease", function() {
	"use strict";

	return {
		outQuad: function(t, b, c, d) {
			return -c * (t /= d) * (t - 2) + b;
		},
		inQuad: function(t, b, c, d) {
			return c * (t /= d) * t + b;
		},
		inBack: function(t, b, c, d, s) {
			if (s == undefined) s = 1.5;
			return c * (t /= d) * t * ((s + 1) * t - s) + b;
		},
		outBack: function(t, b, c, d, s) {
			if (s == undefined) s = 1.5;
			return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
		}
	};

});
