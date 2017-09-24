make("AssetsModel", function(ClassUtil, Model, loader) {
	"use strict";

	function AssetsModel() {
		Model.apply(this, arguments);
		this.resources = {};
	}

	ClassUtil.extend(AssetsModel, Model);
	
	AssetsModel.prototype.load = function(onComplete) {
	    loader.load(this.getAssetList(), function() {
			this.resources = loader.resources;
		    onComplete();
	    }.bind(this));

	};

	AssetsModel.prototype.getAssetList = function() {
		return [
			"config.json"
		];
	};

	return AssetsModel;
});
