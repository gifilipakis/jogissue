var gameoverScene = new Phaser.Scene('gameover');

gameoverScene.init = function () {
    console.log('iniciando cena  game over');
};

gameoverScene.preload = function () {

};

gameoverScene.create = function () {
    this.add.text(16, 16, 'Potuação Final:'+ localStorage['pontuacao'], { fontSize: '32px', fill: '#fff' });
    var tempoGasto = parseFloat(localStorage['tempoGasto']);
    var tempoEstimado = parseFloat(localStorage['tempoestimado']);
    var pontuacao = parseFloat(localStorage['pontuacao']);
    if (tempoGasto >= tempoEstimado*0.75 && tempoGasto <= tempoEstimado*1.25) {
        this.add.text(16, 360, 'Você estimou:'+ tempoEstimado +' s', { fontSize: '18px', fill: '#fff' });
        this.add.text(16, 380, 'Você gastou:'+ tempoGasto +' s', { fontSize: '18px', fill: '#fff' });
        this.add.text(16, 400, 'Você Ganhou !!', { fontSize: '18px', fill: '#fff' });
    } else {
        this.add.text(16, 360, 'Você estimou:'+ tempoEstimado, { fontSize: '18px', fill: '#fff' });
        this.add.text(16, 380, 'Você gastou:'+ tempoGasto, { fontSize: '18px', fill: '#fff' });
        if (tempoGasto >= tempoEstimado*0.75) {
            this.add.text(16, 400, 'Você estimou mais tempo que o necessário !!', { fontSize: '18px', fill: '#fff' });
        } else if (tempoGasto <= tempoEstimado*1.25) {
            this.add.text(16, 400, 'Você estimou menos tempo que o necessário !!', { fontSize: '18px', fill: '#fff' });
        }
        if (pontuacao < 500) {
            this.add.text(16, 420, 'Sua pontuação foi muito baixa !!', { fontSize: '18px', fill: '#fff' });
        }
        this.add.text(16, 440, 'Você Perdeu !!', { fontSize: '18px', fill: '#fff' });
    }

    this.add.text(16, 460, 'O jogo terminou', { fontSize: '18px', fill: '#fff' });
    this.add.text(16, 480, 'Pressione F5 para reiniciar', { fontSize: '18px', fill: '#fff' });
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
};

gameoverScene.update = function () {
};