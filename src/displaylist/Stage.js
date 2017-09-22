make("Stage", function(ClassUtil, Container, Tween, Interaction) {
	"use strict";

	function Stage() {
		Container.apply(this, arguments);
		this.canvas = this.createCanvas();
		this.context = this.canvas.getContext("2d");
		this.interaction = new Interaction(this);
		this.FPS = 40;
		this.tick();
	}

	ClassUtil.extend(Stage, Container);

	Stage.prototype.createCanvas = function() {
		document.body.style.margin = 0;
		var canvas = document.createElement('canvas');
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		canvas.style.position = "absolute";
		document.body.appendChild(canvas);
		return canvas;
	};

	Stage.prototype.onFrame = function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.update(this.world);
		this.render(this.context);
		this.tick();
	};

	Object.defineProperty(Stage.prototype, "stageWidth", {
		get: function() {
			return this.canvas.width;
		}
	});

	Object.defineProperty(Stage.prototype, "stageHeight", {
		get: function() {
			return this.canvas.height;
		}
	});

	Stage.prototype.tick = function() {
		setTimeout(this.onFrame, 1 / this.FPS * 1000);
	};

	return Stage;
});
