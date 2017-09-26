make("BlendModes", function() {
	"use strict";

	 return {
		SOURCE: {
			OVER: "source-over",
			IN: "source-in",
			OUT: "source-out",
			ATOP: "source-atop"
		},
		DESTINATION: {
			OVER: "destination-over",
			IN: "destination-in",
			OUT: "destination-out",
			ATOP: "destination-atop"
		},
		LIGHTER: "lighter",
		COPY: "copy",
		XOR: "xor",
		MULTIPLY: "multiply",
		SCREEN: "screen",
		OVERLAY: "overlay",
		DARKEN: "darken",
		LIGHTEN: "lighten"
	};
});
