make("Messenger", function(EventEmitter, ClassUtil) {
	"use strict";

	function Messenger() {
		EventEmitter.apply(this, arguments);
		this.PRIORITY_LOWEST = -1000;
		this.PRIORITY_LOW = -100;
		this.PRIORITY_HIGH = 100;
		this.PRIORITY_HIGHEST = 1000;
		this.EVENTS = {
			GAME: {
				FRAME: "game-frame",
				RESIZE: "game-resize",
				READY: "game-ready"
			},
			SPIN: {
				BEGIN: "spin-begin",
				STOP: "spin-stop",
				READY: "spin-ready",
				WON: "spin-won",
				LOST: "spin-lost"
			},
			REEL : {
				START: "reel-start",
				STOP: "reel-stop"
			}
		};
	}

	ClassUtil.extend(Messenger, EventEmitter);

	return Messenger;
});
