make("SpinButton", function(Button, ClassUtil, msg) {
	"use strict";

	function SpinButton() {
		Button.apply(this, ["images/BTN_Spin.png", "images/BTN_Spin_d.png"]);
		this.setAnchor(0.5);
		this.on("mouseover", this.onMouseOver);
		this.on("mouseout", this.onMouseOut);
		this.on("click", this.onClick);
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
