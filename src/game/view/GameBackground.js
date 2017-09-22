make("GameBackground", function(Container, Sprite, ClassUtil) {
	"use strict";

	function GameBackground() {
		Container.apply(this, arguments);
		this.image = this.createImage();
	}

	ClassUtil.extend(GameBackground, Container);

	GameBackground.prototype.createImage = function() {
		var image = new Sprite("images/BG.png");
		image.setAnchor(0.5);
		return this.addChild(image);
	};

	return GameBackground;
});
