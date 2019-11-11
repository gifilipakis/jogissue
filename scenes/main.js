var mainScene = new Phaser.Scene('main');

mainScene.init = function () {
    console.log('iniciando cena  main');
};

mainScene.preload = function () {
    this.load.html('nameform', 'assets/nameForm.html');

};

mainScene.create = function () {
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    var element = this.add.dom(400, 50).createFromCache('nameform');
};

mainScene.update = function () {
    if (this.spacebar.isDown) {
        console.log('spacebar is down')
        this.scene.start('breakout');
    }
};
