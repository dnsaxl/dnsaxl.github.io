make("Container", function(DisplayObject, ClassUtil, MathUtil) {
	"use strict";

	function Container() {
		DisplayObject.apply(this, arguments);
		this.children = [];
		this.interactiveChildren = true;
	}

	ClassUtil.extend(Container, DisplayObject);

	Container.prototype.addChild = function(child, index) {
		if (child.parent) {
			child.parent.removeChild(child);
		}
		child.parent = this;
		if (isNaN(index)) {
			this.children.push(child);
		}
		else {
			this.children.splice(MathUtil.clamp(index, 0, this.children.length), 0, child);
		}
		this.updateBounds();
		return child;
	};

	Container.prototype.removeChild = function(child) {
		var i = this.children.indexOf(child);
		if (i > -1) {
			this.children.splice(i, 1)[0].parent = null;
			this.updateBounds();
		}
	};

	Container.prototype.removeChildren = function() {
		while(this.children.length){
			this.children.pop().parent = null;
		}
		this.updateBounds();
	};

	Container.prototype.update = function(world) {
		DisplayObject.prototype.update.apply(this, arguments);
		for (var i = 0, j = this.children.length; i < j; ++i) {
			this.children[i].update(this.world);
		}
		this.updateBounds();
	};

	Container.prototype.updateBounds = function() {
		var widths = [0], heights = [0];
		for (var i = 0, j = this.children.length; i < j; ++i) {
			var c = this.children[i];
			widths.push(c.x + c.width);
			heights.push(c.y + c.height);
		}
		this.origWidth = Math.max.apply(null, widths);
		this.origHeight = Math.max.apply(null, heights);
	};

	Container.prototype.render = function(renderer) {
		DisplayObject.prototype.render.apply(this, arguments);
		for (var i = 0, j = this.children.length; i < j; ++i) {
			this.children[i].render(renderer);
		}
	};

	return Container;
});
