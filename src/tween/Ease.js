make("Ease", function() {
	"use strict";

	return {
		outQuad: function(t, b, c, d) {
			return -c * (t /= d) * (t - 2) + b;
		},
		inQuad: function(t, b, c, d) {
			return c * (t /= d) * t + b;
		}
	};

});
