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

	AssetsModel.prototype.getMatching = function(regexp) {
		var all = [];
	    for(var name in this.resources){
		    if(name.match(regexp)){
			    all.push(this.resources[name]);
		    }
	    }
		return all;
	};

	return AssetsModel;
});
