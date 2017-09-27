make("assetsModel", function(AssetsModel) {
	return new AssetsModel();
});
make("stage", function(GameStage) {
	return new GameStage();
});
make("gameModel", function(GameModel) {
	return new GameModel();
});

make("layoutModel", function(LayoutModel) {
	return new LayoutModel();
});

make("reelModel", function(ReelModel) {
	return new ReelModel();
});

make("htmlMenuModel", function(HTMLMenuModel) {
	return new HTMLMenuModel();
});

make("view", function(View) {
	return new View();
});

make("layoutController", function(LayoutController) {
	return new LayoutController();
});

make("htmlMenuController", function(HTMLMenuController) {
	return new HTMLMenuController();
});

make("reelController", function(ReelController) {
	return new ReelController();
});

make("gameController", function(GameController) {
	return new GameController();
});

make("msg", function(Messenger) {
	return new Messenger();
});



make("start", function(Game) {
	return new Game();
});
