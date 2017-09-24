make("SpinButton", function(Button, ClassUtil) {
	"use strict";

	function SpinButton() {
		Button.apply(this, ["images/BTN_Spin.png", "images/BTN_Spin_d.png"]);
		this.setAnchor(0.5);
		this.on("mouseover", this.onMouseOver);
		this.on("mouseout", this.onMouseOut);
	}

	ClassUtil.extend(SpinButton, Button);

	SpinButton.prototype.onMouseOver = function() {
	    this.scaleX += 0.1;
	    this.scaleY += 0.1;
	};

	SpinButton.prototype.onMouseOut = function() {
		this.scaleX -= 0.1;
		this.scaleY -= 0.1;
	};

	SpinButton.prototype.onEnable = function() {
	    Button.prototype.onEnable.apply(this, arguments);
		this.alpha = 1;
	};

	SpinButton.prototype.onDisable = function() {
		Button.prototype.onDisable.apply(this, arguments);
		this.alpha = 0.8;
	};

	return SpinButton;
});
