var ponto = 10;
var hits = 0;
var gameScene = new Phaser.Scene('breakout');
var nick='';
var isPaused = false;
var perguntas = [
    {
        'pergunta':'O primeiro passo do desenvolvimento de um projeto é a coleta de requisitos',
        'resposta':'V'
    }
    // {
    //  'pergunta':'Pergunta número 2',
    //  'resposta':'V'
    // },
    // {
    //     'pergunta':'Pergunta número 3',
    //     'resposta':'F'
    // },
    // {
    //     'pergunta':'Pergunta número 4',
    //     'resposta':'V'
    // },
    // {
    //     'pergunta':'Pergunta número 5',
    //     'resposta':'F'
    // },
    // {
    //     'pergunta':'Pergunta número 6',
    //     'resposta':'V'
    // }
]
gameScene.init = function(){

    console.log('init breakout')
    };

    gameScene.initialize = function ()
        {
            Phaser.Scene.call(this, { key: 'breakout' });

            this.bricks;
            this.paddle;
            this.ball;
            this.blaster;
    };

    gameScene.preload = function ()
    {
        this.load.image('player', 'assets/player.png');
        this.load.image('bug', 'assets/bug.png');
        this.load.image('issue', 'assets/issue.png');
        this.load.html('pergunta', 'assets/pergunta.html');
        this.load.audio('blaster', 'assets/blaster.mp3');
    };

    gameScene.create = function (time)
    {
        ponto-=10;
        //  Enable world bounds, but disable the floor
        this.physics.world.setBoundsCollision(true, true, true, false);

        //  Create the bricks in a 10x6 grid
        this.bricks = this.physics.add.staticGroup({
            key: 'bug',
            frameQuantity: 60,
            gridAlign: { width: 10, height: 6, cellWidth: 64, cellHeight: 32, x: 112, y: 100 }
        });
        this.blaster = this.sound.add('blaster');
        this.ball = this.physics.add.image(400, 500, 'issue').setCollideWorldBounds(true).setBounce(1);
        this.ball.setData('onPaddle', true);

        this.paddle = this.physics.add.image(400, 550, 'player').setImmovable();

        //  Our colliders
        this.physics.add.collider(this.ball, this.bricks, this.hitBrick, null, this);
        this.physics.add.collider(this.ball, this.paddle, this.hitPaddle, null, this);

        //  Input events
        this.input.on('pointermove', function (pointer) {

            //  Keep the paddle within the game
            this.paddle.x = Phaser.Math.Clamp(pointer.x, 52, 748);

            if (this.ball.getData('onPaddle'))
            {
                this.ball.x = this.paddle.x;
            }

        }, this);

        this.input.on('pointerup', function (pointer) {

            if (this.ball.getData('onPaddle'))
            {
                this.ball.setVelocity(-75, -300);
                this.ball.setData('onPaddle', false);
            }

        }, this);
        timeText = this.add.text(10, 10);
        contPonto = this.add.text(10, 25);
        timer = this.time.addEvent({delay: 5000000000000000000000000000000000000000000000000000000000000000000000000000000000000,});

        };

    gameScene.hitBrick = function (ball, brick)
    {
        this.blaster.play();
        ponto+=10;
        contPonto.setText('Pontos: ' + ponto);
        brick.disableBody(true, true);
        hits += 1;
        if (hits == 10){
            isPaused = true;
            this.pergunta();
            hits = 0;
        }

        if (this.bricks.countActive() === 0)
        {
            this.resetLevel();
        }
    };

    gameScene.resetBall = function ()
    {
        
        this.ball.setVelocity(0);
        this.ball.setPosition(this.paddle.x, 500);
        this.ball.setData('onPaddle', true);
    };

    gameScene.resetLevel = function ()
    {
        localStorage.setItem('pontuacao', ponto);
        localStorage.setItem('tempoGasto', timer.getElapsedSeconds().toFixed(1));
        this.scene.start('gameover');
    };

    gameScene.hitPaddle = function (ball, paddle)
    {
        var diff = 0;
        if (ball.x < paddle.x)
        {
            //  Ball is on the left-hand side of the paddle
            diff = paddle.x - ball.x;
            ball.setVelocityX(-10 * diff);
        }
        else if (ball.x > paddle.x)
        {
            //  Ball is on the right-hand side of the paddle
            diff = ball.x -paddle.x;
            ball.setVelocityX(10 * diff);
        }
        else
        {
            //  Ball is perfectly in the middle
            //  Add a little random X to stop it bouncing straight up!
            ball.setVelocityX(2 + Math.random() * 8);
        }
    };

    gameScene.pergunta = function ()
    {
        var element = this.add.dom(400, 300).createFromCache('pergunta');
        var paragraph = document.getElementById("pergunta");
        var questao = perguntas[0]
        // var questao = perguntas[Math.floor(Math.random() * 6)]
        console.log(questao)
        var text = document.createTextNode(questao['pergunta']);
        console.log(text)
        paragraph.appendChild(text);
        console.log(paragraph)

        element.addListener('click');
        element.on('click', function (event) {
            if (event.target.name == 'verdadeiro')
            {
                if (questao['resposta'] == 'V'){
                    ponto += 10;
                    contPonto.setText('Pontos: ' + ponto);
                }
            } else {
                if (questao['resposta'] == 'F'){
                    ponto += 10;
                    contPonto.setText('Pontos: ' + ponto);
                }
            }
            element.setVisible(false);
            pontoOld = ponto;
            isPaused = false;
            element.destroy()
        });
    };

    gameScene.update = function ()
    {
        if (this.ball.y > 600)
        {
            ponto -= 5;
            contPonto.setText('Pontos: ' + ponto);
            this.resetBall();
        }
        timeText.setText('Time: ' + timer.getElapsedSeconds().toFixed(1) +' s');

        if (isPaused == true){
            this.physics.pause()
        } else {
            this.physics.resume();
        }
    };


// var config = {
//     type: Phaser.WEBGL,
//     width: 800,
//     height: 600,
//     parent: 'phaser-example',
//     scene: [ Breakout ],
//     physics: {
//         default: 'arcade'
//     },
//     dom: {
//         createContainer: true
//     },
// };

// var game = new Phaser.Game(config);
