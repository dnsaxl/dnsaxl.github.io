make("SpinButton", function(Button, ClassUtil) {
	"use strict";

	function SpinButton() {
		Button.apply(this, ["images/BTN_Spin.png", "images/BTN_Spin_d.png"]);
		this.setAnchor(0.5);
	}

	ClassUtil.extend(SpinButton, Button);

	return SpinButton;
});
