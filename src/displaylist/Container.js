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
		while (this.children.length) {
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
		var minx = 0, maxx = 0, miny = 0, maxy = 0;
		for (var i = 0, j = this.children.length; i < j; ++i) {
			var c = this.children[i];
			var rx = c.x - c.anchorX * c.width;
			var ry = c.y - c.anchorY * c.height;
			minx = Math.min(rx, minx);
			miny = Math.min(ry, miny);
			maxx = Math.max(rx + c.width, maxx);
			maxy = Math.max(ry + c.height, maxy);
		}
		this.origWidth = (maxx - minx);
		this.origHeight = (maxy - miny);

	};

	Container.prototype.render = function(renderer) {
		DisplayObject.prototype.render.apply(this, arguments);
		for (var i = 0, j = this.children.length; i < j; ++i) {
			this.children[i].render(renderer);
		}
	};

	return Container;
});
