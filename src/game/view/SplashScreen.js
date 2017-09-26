make("SplashScreen", function(Container, ClassUtil, Text, assetsModel) {
	"use strict";

	function SplashScreen() {
		Container.apply(this, arguments);
		this.text = this.addChild(new Text("Loading", this.getTextStyle()));
		this.text.setAnchor(0.5);
		assetsModel.on("progress-changed", this.onAssetsProgress);
	}

	ClassUtil.extend(SplashScreen, Container);
	
	SplashScreen.prototype.getTextStyle = function() {
	    return {
		    font : "50px Arial",
		    fill: "red",
		    align : Text.ALIGN.center
	    }
	};

	SplashScreen.prototype.onAssetsProgress = function(value) {
	    this.text.text = "Loading\n" +  String(Math.round(value * 100)) + "%";
	};

	return SplashScreen;
});
