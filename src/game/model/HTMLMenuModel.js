make("HTMLMenuModel", function(Model, ClassUtil) {
	"use strict";

	function HTMLMenuModel() {
		Model.apply(this, arguments);
		this.text = {
			idle: {
				top: "Select winning symbol",
				bottom: "Press the spin button"
			},

			spinning: {
				top: "You have chosen {selection}",
				bottom: "Good Luck!"
			}
		}
	}

	ClassUtil.extend(HTMLMenuModel, Model);

	return HTMLMenuModel;
});
