make("assetsModel", function(AssetsModel) {
	return new AssetsModel();
});
make("stage", function(GameStage) {
	return new GameStage();
});
make("gameModel", function(GameModel) {
	return new GameModel();
});

make("loader", function(Loader, gameModel) {
	return new Loader(gameModel.getAssetsServerURL());
});

make("msg", function(Messenger) {
	return new Messenger();
});

make("start", function(Game) {
	return new Game();
});
