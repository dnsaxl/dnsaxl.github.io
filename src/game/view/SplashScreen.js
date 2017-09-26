make("SplashScreen", function(Container, ClassUtil, Text, assetsModel, Graphics) {
	"use strict";

	function SplashScreen() {
		Container.apply(this, arguments);

		var g = new Graphics();
		g.beginFill("black");
		g.drawRect(960 / -2, 535 / -2, 960, 535);
		this.addChild(g);

		this.text = new Text("Loading", this.getTextStyle());
		this.text.setAnchor(0.5);
		this.addChild(this.text);
		assetsModel.on("progress-changed", this.onAssetsProgress);
	}

	ClassUtil.extend(SplashScreen, Container);

	SplashScreen.prototype.getTextStyle = function() {
		return {
			font: "50px Arial",
			fill: "red",
			align: Text.ALIGN.center
		}
	};

	SplashScreen.prototype.onAssetsProgress = function(value) {
		this.text.text = "Loading\n" + String(Math.round(value * 100)) + "%";
	};

	return SplashScreen;
});
