make("ClassUtil", function() {
	"use strict";

	var ClassUtil = {};

	ClassUtil.extend = function(ChildClass, ParentClass) {
		ChildClass.prototype = Object.create(ParentClass.prototype);
		ChildClass.prototype.constructor = ChildClass;

		for (var i in ParentClass) {
			ChildClass[i] = ParentClass[i];
		}
	};

	ClassUtil.override = function(object, functionName, newFunction) {
		var oldFunction = object[functionName];
		object[functionName] = function() {
			newFunction.apply(this, arguments);
			return oldFunction.apply(this, arguments);
		};
	};

	ClassUtil.bindAll = function(scope) {
		for (var i in scope) {
			if (typeof scope[i] === "function") {
				scope[i] = scope[i].bind(scope);
			}
		}
	};

	return ClassUtil;
});