(function(root) {
	"use strict";

	var classWrapperDictionary = {};
	var classDefinitions = {};
	var stack = null;

	var getDependencyNames = function(classWrapper) {
		var funStr = classWrapper.toString();
		return funStr.slice(funStr.indexOf('(') + 1, funStr.indexOf(')')).match(/([^\s,]+)/g) || [];
	};

	var isAlreadyInTheStack = function(className) {
		return stack.indexOf(className) !== -1;
	};

	var unwrap = function(className) {
		if (classDefinitions[className]) {
			return classDefinitions[className];
		}
		if (!classWrapperDictionary[className]) {
			throw new Error("Class`" + className + "` does not exist");
		}
		if (isAlreadyInTheStack(className)) {
			throw new Error("Circular dependency (" + className + ")");
		}

		var classWrapper = classWrapperDictionary[className];
		var dependencyNames = getDependencyNames(classWrapper);

		stack.push(className);
		var dependencyValues = dependencyNames.map(function(dependencyName) {
			return unwrap(dependencyName);
		});
		stack.pop();

		var classDefinition = classWrapper.apply(null, dependencyValues);
		classDefinitions[className] = classDefinition;

		return classDefinition;
	};

	var unwrapClassDefinitions = function() {
		for (var className in classWrapperDictionary) {
			stack = [];
			if (classWrapperDictionary.hasOwnProperty(className)) {
				unwrap(className);
			}
		}
	};

	window.addEventListener("load", unwrapClassDefinitions);

	root.make = function(name, value) {
		if (classWrapperDictionary[name]) {
			throw Error("Class `" + name + "` already defined!");
		}
		classWrapperDictionary[name] = value;
	};

})(window);