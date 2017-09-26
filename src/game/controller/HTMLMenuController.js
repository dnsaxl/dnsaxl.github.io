make("HTMLMenuController", function(ClassUtil, msg, Tween, view, htmlMenuModel) {
	"use strict";

	function HTMLMenuController() {
		ClassUtil.bindAll(this);
		this.tweenObject = {x: 0};
		msg.on(msg.EVENTS.GAME.READY, this.onGameReady);
		msg.on(msg.EVENTS.SPIN.BEGIN, this.onSpinBegin);
		msg.on(msg.EVENTS.SPIN.STOP, this.onSpinStop);
	}

	HTMLMenuController.prototype.onGameReady = function() {
		this.tweenObject.x = -view.html.topContainer.clientWidth;
		Tween.to(this.tweenObject, 0.4, {delay: 0.6, x: 0, onUpdate: this.onTweenUpdate});
		view.html.topContainer.style.visibility = "visible";
	};

	HTMLMenuController.prototype.onTweenUpdate = function() {
		view.html.topContainer.style.left = this.tweenObject.x + "px";
	};

	HTMLMenuController.prototype.onSpinBegin = function() {
		view.html.dropdown.disabled = true;
		this.setText(view.html.topHint, htmlMenuModel.text.spinning.top);
		this.setText(view.html.bottomHint, htmlMenuModel.text.spinning.bottom);
	};

	HTMLMenuController.prototype.onSpinStop = function() {
		view.html.dropdown.disabled = false;
		this.setText(view.html.topHint, htmlMenuModel.text.idle.top);
		this.setText(view.html.bottomHint, htmlMenuModel.text.idle.bottom);
	};

	HTMLMenuController.prototype.setText = function(element, text) {
		element.innerHTML = text.replace(/\{selection\}/, view.html.getSelectedText());
	};

	return HTMLMenuController;
});
