make("SplashScreen", function(Container, ClassUtil, Text, assetsModel, Graphics, Tween) {
	"use strict";

	function SplashScreen() {
		Container.apply(this, arguments);

		this.background = this.createBackground();
		this.label = this.createLabel();

		assetsModel.on("progress-changed", this.onAssetsProgress);
	}

	ClassUtil.extend(SplashScreen, Container);

	SplashScreen.prototype.createBackground = function() {
		var bg = new Graphics();
		bg.beginFill("black");
		bg.drawRect(960 / -2, 535 / -2, 960, 535);
		return this.addChild(bg);
	};

	SplashScreen.prototype.createLabel = function() {
		var text = new Text("Loading", this.getTextStyle());
		text.setAnchor(0.5);
		return this.addChild(text);
	};

	SplashScreen.prototype.getTextStyle = function() {
		return {
			font: "50px Arial",
			fill: "red",
			align: Text.ALIGN.center
		}
	};

	SplashScreen.prototype.onAssetsProgress = function(value) {
		this.label.text = "Loading\n" + String(Math.round(value * 100)) + "%";
	};

	SplashScreen.prototype.show = function() {
		this.alpha = 1;
	};

	SplashScreen.prototype.hide = function() {
		Tween.killByTarget(this);
		Tween.to(this, 1.6, {alpha: 0, onComplete: this.onFadedOut});
	};

	SplashScreen.prototype.onFadedOut = function() {
		this.parent.removeChild(this.splashScreen);
	};

	return SplashScreen;
});
