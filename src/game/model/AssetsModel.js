make("AssetsModel", function(loader) {
	"use strict";

	function AssetsModel() {
		this.resources = {};
	}
	
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
