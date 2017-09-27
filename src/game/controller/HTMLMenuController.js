make("HTMLMenuController", function(ClassUtil, msg, Tween, view, htmlMenuModel) {
	"use strict";

	function HTMLMenuController() {
		ClassUtil.bindAll(this);
		this.tweenObject = {x: 0};
		msg.on(msg.EVENTS.GAME.READY, this.onGameReady);
		msg.on(msg.EVENTS.SPIN.BEGIN, this.onSpinBegin);
		msg.on(msg.EVENTS.SPIN.WON, this.onSpinWon);
		msg.on(msg.EVENTS.SPIN.LOST, this.onSpinLost);
		msg.on(msg.EVENTS.SPIN.READY, this.onSpinReady);
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
		htmlMenuModel.selectedValue = view.html.getSelectedValue();
		Tween.killByTarget(view.html.content.style);
		view.html.content.style.opacity = 1;
		this.setText(view.html.topHint, htmlMenuModel.text.spinning.top);
		this.setText(view.html.bottomHint, htmlMenuModel.text.spinning.bottom);
	};

	HTMLMenuController.prototype.setIdle = function() {
		this.setText(view.html.topHint, htmlMenuModel.text.idle.top);
		this.setText(view.html.bottomHint, htmlMenuModel.text.idle.bottom);
		Tween.killByTarget(view.html.content.style);
		Tween.to(view.html.content.style, 0.2, {opacity: 1});
	};

	HTMLMenuController.prototype.onSpinWon = function() {
		Tween.killByTarget(view.html.content.style);
		this.setText(view.html.topHint, htmlMenuModel.text.won.top);
		this.setText(view.html.bottomHint, htmlMenuModel.text.won.bottom);
	};

	HTMLMenuController.prototype.onSpinLost = function() {
		Tween.killByTarget(view.html.content.style);
		view.html.content.style.opacity = 1;
		this.setText(view.html.topHint, htmlMenuModel.text.lost.top);
		this.setText(view.html.bottomHint, htmlMenuModel.text.lost.bottom);
		Tween.to(view.html.content.style, 2, {opacity: 0, delay: 3, onComplete: this.setIdle});
	};

	HTMLMenuController.prototype.onSpinReady = function() {
		view.html.dropdown.disabled = false;
	};

	HTMLMenuController.prototype.setText = function(element, text) {
		element.innerHTML = text.replace(/\{selection\}/, view.html.getSelectedText());
	};

	return HTMLMenuController;
});
