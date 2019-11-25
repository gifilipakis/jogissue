var mainScene = new Phaser.Scene('main');
var iniciar = null;

mainScene.init = function () {
    console.log('iniciando cena  main');
};

mainScene.preload = function () {
    this.load.html('nameform', 'assets/nameForm.html');
    console.log('function form')

};

mainScene.create = function () {
    // this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    var element = this.add.dom(400, 300).createFromCache('nameform');
    console.log(element);
    // element.setPerspective(800);

    element.addListener('click');
    element.on('click', function (event) {

        if (event.target.name === 'loginButton')
        {
            var inputTempo = this.getChildByName('tempo');
            console.log(inputTempo);

            //  Have they entered anything?
            if (inputTempo.value !== '') //&&  inputTempo.isInteger()
            {
                //  Turn off the click events
                this.removeListener('click');

                //  Tween the login form out
                this.scene.tweens.add({ targets: element.rotate3d, x: 1, w: 90, duration: 3000, ease: 'Power3' });

                this.scene.tweens.add({ targets: element, scaleX: 2, scaleY: 2, y: 700, duration: 3000, ease: 'Power3',
                    onComplete: function ()
                    {
                        element.setVisible(false);
                    }
                });

                iniciar = true;
                var tempoEstimado = this.getChildByName('tempo').value;
                localStorage.setItem('tempoestimado', tempoEstimado);
            }
            else
            {
                //  Flash the prompt
                this.scene.tweens.add({ targets: text, alpha: 0.1, duration: 200, ease: 'Power3', yoyo: true });
            }
        }

    });
};

mainScene.update = function () {
    if (iniciar == true) {
        this.scene.start('breakout');
    }
};
