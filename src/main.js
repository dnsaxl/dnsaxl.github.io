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

//
make("main", function(assetsModel, stage, Sprite, Container, Tween, Background, Button, Text, msg) {
	console.log("load");

	var t = new Text("Hello Denis");

	stage.addChild(t);

	t.x = stage.stageWidth / 2;
	t.y = stage.stageHeight / 2;
	t.setAnchor(0.5);
	t.setScale(2);
	t.text ="0";

	Tween.to(t, 3, {text : 100});

	msg.on(msg.EVENTS.GAME.RESIZE, function() {
		t.x = stage.stageWidth / 2;
		t.y = stage.stageHeight / 2;
	});

	assetsModel.load(function() {
		var s1 = new Sprite("images/SYM1.png");
		var s2 = new Sprite("images/SYM3.png");
		s2.x = 100; s1.x = 50;//s1.width - 150;
		stage.addChild(s1);
		stage.addChild(s2);

		var bg = new Background("images/BG.png");
		bg.setAnchor(0.5);
		//s1.setScale(3);
		s1.interactive = true;
		//s1.on("mousedown", console.log);
		stage.addChild(bg, 0);
		var btn = new Button(
			"images/BTN_Spin.png",
			"images/BTN_Spin_d.png"
		);

		btn.x = btn.y = 400;

		stage.addChild(btn);
	});
});
