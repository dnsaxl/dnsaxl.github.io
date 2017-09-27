make("GameController", function(ClassUtil, msg, gameModel, spinModel, htmlMenuModel) {
	"use strict";

	function GameController() {
		ClassUtil.bindAll(this);
		msg.on(msg.EVENTS.SPIN.STOP, this.onSpinStop, msg.PRIORITY_HIGHEST);
		msg.on(msg.EVENTS.SPIN.BEGIN, this.onSpinBegin, msg.PRIORITY_HIGHEST);
	}

	GameController.prototype.onSpinBegin = function() {
		gameModel.hasWon = false;
	};

	GameController.prototype.onSpinStop = function() {
		var middleSymbol = spinModel.getSymbolAt(0, 1);
		gameModel.hasWon = htmlMenuModel.selectedValue === middleSymbol.type;
		if (gameModel.hasWon) {
			this.onWinSpin(middleSymbol);
		}
		else {
			this.onLooseSpin();
		}
	};

	GameController.prototype.onWinSpin = function(winningSymbol) {
		winningSymbol.showWin();
		msg.emit(msg.EVENTS.SPIN.WON);
		setTimeout(this.emitSpinReady, gameModel.wonSpinTimeout);
	};

	GameController.prototype.emitSpinReady = function() {
		msg.emit(msg.EVENTS.SPIN.READY);
	};

	GameController.prototype.onLooseSpin = function() {
		msg.emit(msg.EVENTS.SPIN.LOST);
		setTimeout(this.emitSpinReady, gameModel.lostSpinTimeout);
	};

	return GameController;
});
