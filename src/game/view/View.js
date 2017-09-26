make("View", function(stage, GameBackground, SpinButton, SymbolsContainer, SplashScreen, GlobalMask) {
	"use strict";

	function View() {

	}

	View.prototype.showSplashScreen = function() {
		this.splashScreen = this.splashScreen || new SplashScreen();
		this.splashScreen.show();
		stage.addChild(this.splashScreen);
	};

	View.prototype.hideSplashScreen = function() {
		this.splashScreen.hide();
	};

	View.prototype.init = function() {
		this.background = stage.addChild(new GameBackground(), 0);
		this.symbolsContainer = stage.addChild(new SymbolsContainer(), 1);
		this.spinButton = stage.addChild(new SpinButton(), 2);
		this.globalMask = stage.addChild(new GlobalMask(), 3);
	};

	return View;
});
