make("HTMLMenu", function() {
	"use strict";

	function HTMLMenu() {
		this.topContainer = document.getElementById("menu");
		this.content = document.getElementById("content");
		this.topHint = document.getElementById("top-hint");
		this.bottomHint = document.getElementById("bottom-hint");
		this.dropdown = document.getElementById("dropdown");
	}

	HTMLMenu.prototype.getSelectedText = function() {
		return this.dropdown.options[this.dropdown.selectedIndex].text;
	};
	
	HTMLMenu.prototype.getSelectedValue = function() {
		return this.dropdown.value;
	};

	return HTMLMenu;
});
