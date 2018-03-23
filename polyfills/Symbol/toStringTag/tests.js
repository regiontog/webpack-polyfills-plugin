/* eslint-env mocha, browser */
/* global proclaim */

var arePropertyDescriptorsSupported = function () {
	var obj = {};
	try {
		Object.defineProperty(obj, 'x', { enumerable: false, value: obj });
        /* eslint-disable no-unused-vars, no-restricted-syntax */
        for (var _ in obj) { return false; }
        /* eslint-enable no-unused-vars, no-restricted-syntax */
		return obj.x === obj;
	} catch (e) { // this is IE 8.
		return false;
	}
};
var supportsDescriptors = Object.defineProperty && arePropertyDescriptorsSupported();

it('has the well known symbol toStringTag as static properties on Symbol', function() {
	proclaim.notEqual(Symbol.toStringTag, undefined);

	if (supportsDescriptors) {
		var toStringTag = Symbol.toStringTag;
		Symbol.toStringTag = "nope";
		proclaim.equal(Symbol.toStringTag, toStringTag);
	}
});
