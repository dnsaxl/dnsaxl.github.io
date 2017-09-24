make("ReelModel", function(ClassUtil, Model) {
	"use strict";

	function ReelModel() {
		Model.apply(this, arguments);
	}

	ClassUtil.extend(ReelModel, Model);

	return ReelModel;
});
