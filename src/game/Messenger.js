make("Messenger", function(EventEmitter, ClassUtil) {
	"use strict";

	function Messenger() {
		EventEmitter.apply(this, arguments);
		this.EVENTS = {
			GAME : {
				FRAME : "game-frame",
				RESIZE : "game-resize"
			}
		};
	}

	ClassUtil.extend(Messenger, EventEmitter);

	return Messenger;
});
