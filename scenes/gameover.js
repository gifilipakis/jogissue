var gameoverScene = new Phaser.Scene('gameover');

gameoverScene.init = function () {
    console.log('iniciando cena  game over');
};

gameoverScene.preload = function () {

};

gameoverScene.create = function () {
    this.add.text(16, 16, 'Potuação Final:'+ localStorage['pontuacao'], { fontSize: '32px', fill: '#fff' });
    this.add.text(16, 50, 'Tempo estimado:'+ localStorage['tempoEstimado'], { fontSize: '32px', fill: '#fff' });
    this.add.text(16, 430, 'O jogo terminou', { fontSize: '18px', fill: '#fff' });
    this.add.text(16, 450, 'Pressione a barra de espaço para reiniciar', { fontSize: '18px', fill: '#fff' });
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
};

gameoverScene.update = function () {
    if (this.spacebar.isDown) {
        this.scene.start('main');
    }
};