make("Button", function(Container, ClassUtil, Sprite) {
	"use strict";

	function Button(idle, down) {
		Container.apply(this, arguments);
		this.interactive = true;
		if(idle.constructor === String){
			this.idle = this.addChild(new Sprite(idle));
		}
		if(down.constructor === String){
			this.down = this.addChild(new Sprite(down));
		}
		console.log(idle.constructor === String, down.constructor === String, this);
		this.on("mousedown,touchstart", this.onDown);
		this.on("mouseup,touchend,touchcancel", this.onUp);
		this.down.visible = false;
	}

	ClassUtil.extend(Button, Container);
	
	Button.prototype.onDown = function() {
	    this.idle.visible = false;
	    this.down.visible = true;
	};

	Button.prototype.onUp = function() {
		this.idle.visible = true;
		this.down.visible = false;
	};

	return Button;
});
