make("SpinButton", function(Button, ClassUtil, msg) {
	"use strict";

	function SpinButton() {
		Button.apply(this, ["images/BTN_Spin.png", "images/BTN_Spin_d.png"]);
		this.setAnchor(0.5);
		this.on("mouseover", this.onMouseOver);
		this.on("mouseout", this.onMouseOut);
		this.on("click", this.onClick);
		this.zoomed = false;
	}

	ClassUtil.extend(SpinButton, Button);

	SpinButton.prototype.onMouseOver = function() {
		this.scaleX *= 1.1;
		this.scaleY *= 1.1;
		this.zoomed = true;
	};

	SpinButton.prototype.onMouseOut = function() {
		this.scaleX /= 1.1;
		this.scaleY /= 1.1;
		this.zoomed = false;
	};

	SpinButton.prototype.onEnable = function() {
		Button.prototype.onEnable.apply(this, arguments);
		this.alpha = 1;
	};

	SpinButton.prototype.onDisable = function() {
		Button.prototype.onDisable.apply(this, arguments);
		this.alpha = 0.8;
		if (this.zoomed) {
			this.onMouseOut();
		}
	};

	SpinButton.prototype.onClick = function() {
		this.enabled = false;
		msg.emit(msg.EVENTS.SPIN.BEGIN);
		msg.once(msg.EVENTS.SPIN.STOP, this.onSpinStop);
	};

	SpinButton.prototype.onSpinStop = function() {
		this.enabled = true;
	};
	return SpinButton;
});
