make("Resource", function(ClassUtil) {
	"use strict";

	function Resource(baseUrl, meta, onComplete) {
		ClassUtil.bindAll(this);
		this.meta = meta;
		this.onComplete = onComplete || this.selfDestroy;

		this.rawData = null;
		this.data = null;

		this.path = this.getPath(this.meta);
		this.extension = this.getExtension(this.path);
		this.responseType = "text";
		this.url = baseUrl + this.path;
		this.xhr = this.createXHR(this.url);

		this.xhr.send();
	}

	Resource.prototype.getPath = function(meta) {
		if (meta.constructor === String) return meta;
		else if (meta.constructor === Object) return meta.url || meta.file || meta.dir;
	};

	Resource.prototype.getExtension = function(url) {
		return url.replace(/^.*?\.(.*?)($|\?.*)/, "$1").toLowerCase();
	};

	Resource.prototype.createXHR = function(url) {
		var xhr = new XMLHttpRequest();
		xhr.responseType = this.responseType;
		xhr.open('GET', url, true);
		xhr.addEventListener('error', this.onError, false);
		xhr.addEventListener('load', this.onLoad, false);
		return xhr;
	};

	Resource.prototype.onError = function(e) {
		console.warn(e);
		this.exit();
	};

	Resource.prototype.onLoad = function(e) {
		if (this.xhr.status === 200) {
			this.rawData = this.xhr.response;
			this.parse();
		}
		else {
			this.exit();
		}
	};

	Resource.prototype.exit = function() {
		this.xhr.removeEventListener('error', this.onError);
		this.xhr.removeEventListener('load', this.onLoad);
		this.onComplete(this, this.rawData);
	};

	Resource.prototype.selfDestroy = function() {

	};

	Resource.prototype.parse = function() {
		switch (this.extension) {
			case "json" :
				return this.parseJSON();
			case "jpeg" :
			case "jpg" :
			case "png" :
			case "gif" :
				return this.parseImage();
		}
	};

	Resource.prototype.parseJSON = function() {
		this.data = JSON.parse(this.rawData);
		this.exit();
	};

	Resource.prototype.parseImage = function() {
		var img = new Image();
		img.addEventListener('error', this.onImageError, false);
		img.addEventListener('load', this.onImageComplete, false);
		this.data = img;
		img.src = this.url;
	};

	Resource.prototype.onImageError = function() {
		this.imageExit();
	};

	Resource.prototype.onImageComplete = function() {
		this.imageExit();
	};

	Resource.prototype.imageExit = function() {
		this.data.removeEventListener('error', this.onImageError);
		this.data.removeEventListener('load', this.onImageComplete);
		this.exit();
	};

	return Resource;
});