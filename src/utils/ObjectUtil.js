make("ObjectUtil", function() {
	"use strict";

	var ObjectUtil = {};

	ObjectUtil.mixin = function(to, from) {
		for (var property in from) {
			to[property] = from[property];
		}
	};

	ObjectUtil.mixinSpecific = function(to, from, properties) {
		properties.map(function(property) {
			to[property] = from[property];
		});
	};

	ObjectUtil.clone = function(obj) {
		return JSON.parse(JSON.stringify(obj));
	};

	return ObjectUtil;
});