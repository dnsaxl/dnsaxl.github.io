make("AssetsModel", function(ClassUtil, Model, Loader) {
	"use strict";

	function AssetsModel() {
		Model.apply(this, arguments);
		this.property("resources");
		this.property("progress", 0);
		this.loader = this.createLoader();
	}

	ClassUtil.extend(AssetsModel, Model);

	AssetsModel.prototype.createLoader = function() {
		var loader = new Loader();
		loader.baseUrl = this.getAssetsServerURL();
		loader.onComplete = this.onAllFilesLoaded;
		loader.onFileLoaded = this.onSingleFileLoaded;
		return loader;
	};

	AssetsModel.prototype.load = function() {
		this.loader.load(this.getAssetList());
	};

	AssetsModel.prototype.onSingleFileLoaded = function(resource) {
		this.progress = this.loader.progress;
	};

	AssetsModel.prototype.onAllFilesLoaded = function() {
		this.resources = this.loader.resources;
		if (this.onComplete) {
			this.onComplete();
		}
	};

	AssetsModel.prototype.getAssetList = function() {
		return [
			"config.json"
		];
	};

	AssetsModel.prototype.getAssetsServerURL = function() {
		return "./assets/";
	};

	return AssetsModel;
});
