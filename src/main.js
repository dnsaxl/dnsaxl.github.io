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


make("layoutController", function(LayoutController) {
	return new LayoutController();
});


make("reelController", function(ReelController) {
	return new ReelController();
});

make("msg", function(Messenger) {
	return new Messenger();
});

make("view", function(View) {
	return new View();
});

make("start", function(Game) {
	return new Game();
});
