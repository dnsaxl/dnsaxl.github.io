make("HTMLMenuModel", function(Model, ClassUtil) {
	"use strict";

	function HTMLMenuModel() {
		Model.apply(this, arguments);
		this.selectedValue = null;
		this.text = {
			idle: {
				top: "Select winning symbol",
				bottom: "Press the spin button"
			},
			spinning: {
				top: "You have chosen {selection}",
				bottom: "Good Luck!"
			},
			won: {
				top: "You made it!",
				bottom: "It's {selection}!"
			},
			lost: {
				top: "That was close",
				bottom: "Try again"
			}
		}
	}

	ClassUtil.extend(HTMLMenuModel, Model);

	return HTMLMenuModel;
});
