make("GlobalMask", function(Graphics, ClassUtil, BlendModes) {
	"use strict";

	function GlobalMask() {
		Graphics.apply(this, arguments);
		this.beginFill(0);
		this.drawRect(960 / -2, 535 / -2, 960, 535);
		this.blendMode = BlendModes.DESTINATION.ATOP;
	}

	ClassUtil.extend(GlobalMask, Graphics);

	return GlobalMask;
});
