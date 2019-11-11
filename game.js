(function () {
    var config = {
        width: 800,
        height: 500,
        type: Phaser.AUTO,
        title: 'JogIssue \n',
        backgroundColor: 0x336699,
        input: {
            keyboard: true,
            mouse: true,
            touch: true,
        },
        dom: {
            createContainer: true,
        },
        physics: {
            default: 'arcade',
            arcade: {
                debug: false
            }
        },
        scene: [
            mainScene,
            gameScene,
            // gameStart,
            // gameOver
        ]
    };

    var game = new Phaser.Game(config);
    game.scene.start('main');
})();