make("Interaction", function(ClassUtil) {
	"use strict";

	function Interaction(stage) {
		ClassUtil.bindAll(this);
		this.stage = stage;
		this.HANDLERS = {
			touchstart: [],
			touchend: [],
			touchcancel: [],
			touchmove: [],
			mousedown: [],
			mousemove: [],
			mouseup: [],
			click: []
		};
		for (var event in this.HANDLERS) {
			stage.canvas.addEventListener(event, this.onEvent, false);
		}
	}

	Interaction.prototype.onEvent = function(e) {
		var target = this.crawl(this.stage, e);
		if (target) {
			target.emit(e.type, e)
		}
	};

	Interaction.prototype.hitTest = function(target, event) {
		if (!target || !target.interactive || !target.visible || !target.hasListener(event.type)) {
			return null;
		}
		else {
			return target.hitTest(event.layerX, event.layerY) ? target : null;
		}
	};

	Interaction.prototype.crawl = function(target, event) {
		var tc = target.children;
		if (tc) {
			if (tc.length > 0 && target.interactiveChildren) {
				for (var i = tc.length; i--;) {
					var result = this.crawl(tc[i], event);
					if (result) {
						return result;
					}
				}
			}
		}
		return this.hitTest(target, event);
	};

	return Interaction;
});
