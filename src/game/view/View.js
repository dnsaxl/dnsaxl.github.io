make("View", function(stage, GameBackground, SpinButton, SymbolsContainer, SplashScreen, Tween) {
	"use strict";

	function View() {

	}

	View.prototype.showSplashScreen = function() {
		this.splashScreen = this.splashScreen || new SplashScreen();
		this.splashScreen.alpha = 1;
		stage.addChild(this.splashScreen);
	};

	View.prototype.hideSplashScreen = function() {
		Tween.killByTarget(this.splashScreen);
		Tween.to(this.splashScreen, 1.6, {alpha: 0, onComplete: this.onFadedOut.bind(this)});
	};

	View.prototype.onFadedOut = function() {
		this.splashScreen.parent.removeChild(this.splashScreen);
	};

	View.prototype.init = function() {
		this.background = stage.addChild(new GameBackground(), 0);
		this.symbolsContainer = stage.addChild(new SymbolsContainer(), 1);
		this.spinButton = stage.addChild(new SpinButton(), 2);
	};

	return View;
});
