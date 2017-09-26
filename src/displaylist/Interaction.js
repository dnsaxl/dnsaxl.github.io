make("Interaction", function(ClassUtil) {
	"use strict";

	function Interaction(stage) {
		ClassUtil.bindAll(this);
		this.stage = stage;
		this.ctOver = null;
		this.lastMouseDown = null;
		this.HANDLERS = {
			touchstart: [],
			touchend: [],
			touchcancel: [],
			touchmove: [],

			mousedown: [],
			mouseup: [],
			mousemove: [],
			click: []
		};
		for (var event in this.HANDLERS) {
			stage.canvas.addEventListener(event, this.onEvent, false);
		}
	}

	Interaction.prototype.onEvent = function(e) {
		var target = this.crawl(this.stage, e, (e.type === "mousemove" || e.type === "touchmove"));
		switch (e.type) {
			case "mousedown" :
			case "touchstart" :
				this.lastMouseDown = target;
				if (target) {
					this.pushToSupportPool(e.type, target);
					target.emit(e.type, e, true);
				}
				break;
			case "mouseup" :
				this.emptySupportPool(e, "mousedown", target);
				break;
			case "touchend" :
			case "touchcancel" :
				this.emptySupportPool(e, "touchstart", target);
				break;
			case "mousemove" :
				var newTarget = this.ctOver !== target;
				if (newTarget) {
					this.emitIfCan(this.ctOver, e, "mouseout", true);
					this.emitIfCan(target, e, "mouseover", true);
				}
				this.emitIfCan(target, e, null, true);
				this.ctOver = target;
				break;
			case "click":
				if (target === this.lastMouseDown) {
					this.emitIfCan(target, e, null, true);
				}
				break;
			default:
				this.emitIfCan(target, e, null, true);
		}
	};

	Interaction.prototype.emitIfCan = function(target, e, forceType, realTarget) {
		if (target && target.interactive && target.hasListener(forceType || e.type)) {
			target.emit(forceType || e.type, e, realTarget);
		}
	};

	Interaction.prototype.pushToSupportPool = function(type, target) {
		if (this.HANDLERS[type].indexOf(target) < 0) {
			this.HANDLERS[type].push(target);
		}
	};

	Interaction.prototype.emptySupportPool = function(e, type, target) {
		while (this.HANDLERS[type].length) {
			var handler = this.HANDLERS[type].pop();
			handler.emit(e.type, e, handler === target);
			this.emitIfCan(target, e, null, handler === target);
		}
	};

	Interaction.prototype.hitTest = function(target, event, omitTypeCheck) {
		if (target && target.interactive && target.visible && (omitTypeCheck || target.hasListener(event.type))) {
			return target.hitTest(event.layerX, event.layerY) ? target : null;
		}
		return null;
	};

	Interaction.prototype.crawl = function(target, event, omitTypeCheck) {
		var tc = target.children;
		if (tc) {
			if (tc.length > 0 && target.interactiveChildren) {
				for (var i = tc.length; i--;) {
					var result = this.crawl(tc[i], event, omitTypeCheck);
					if (result) {
						return result;
					}
				}
			}
		}
		return this.hitTest(target, event, omitTypeCheck);
	};

	return Interaction;
});
