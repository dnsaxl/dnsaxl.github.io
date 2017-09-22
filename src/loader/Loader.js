make("Loader", function(ClassUtil, Resource) {
	"use strict";

	function Loader(baseUrl) {
		ClassUtil.bindAll(this);
		this.baseUrl = baseUrl;
		this.isLoading = false;
		this.queue = [];
		this.resources = {};
		this.onComplete = null;
	}

	Loader.prototype.load = function(paths, onComplete) {
		if (!this.baseUrl || !paths) {
			throw new Error("Invalid load directive. baseUrl: " + this.baseUrl + ", paths:" + paths);
		}
		this.onComplete = onComplete || this.onComplete;
		if (paths.constructor !== Array) {
			paths = [paths];
		}
		this.queue = paths.concat(this.queue);
		if (!this.isLoading) {
			this.loadNext();
		}
	};

	Loader.prototype.loadNext = function() {
		this.isLoading = this.queue.length > 0;
		if (this.isLoading) {
			var queueMember = this.queue.shift();
			if (queueMember.constructor === Array) {
				return this.load(queueMember);
			}
			var resource = new Resource(this.baseUrl, queueMember, this.onResourceComplete);
			var path = resource.path;
			if (this.resources[path]) {
				throw new Error("Resource " + path + " already loaded");
			}
			this.resources[path] = resource;
		}
		else {
			if (this.onComplete) {
				this.onComplete();
			}
		}
	};

	Loader.prototype.onResourceComplete = function(resource) {
		if (resource.data) {
			this.parseSubLoads(resource.data);
		}
		else {
			console.warn(this.baseUrl + resource.url, "not loaded");
		}
		this.loadNext();
	};

	Loader.prototype.parseSubLoads = function(data) {
		var subloads = data.assets || data.image;
		if (subloads) {
			this.load(subloads);
		}
	};

	return Loader;
});
