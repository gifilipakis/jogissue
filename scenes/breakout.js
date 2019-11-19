var ponto = 10;
var gameScene = new Phaser.Scene('breakout');
var nick='';

gameScene.init = function(){

    console.log('init breakout')
    };

    gameScene.initialize = function ()
        {
            Phaser.Scene.call(this, { key: 'breakout' });

            this.bricks;
            this.paddle;
            this.ball;
    };

    gameScene.preload = function ()
    {
        this.load.image('player', 'assets/player.png');
        this.load.image('bug', 'assets/bug.png');
        this.load.image('issue', 'assets/issue.png');
    };

    gameScene.create = function ()
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

    };

    gameScene.hitBrick = function (ball, brick)
    {
        ponto+=10;
        contPonto.setText('Pontos: ' + ponto);
        brick.disableBody(true, true);

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
        this.resetBall();

        this.bricks.children.each(function (brick) {

            brick.enableBody(false, 0, 0, true, true);

        });
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

    gameScene.pergunta = function (player, bomb, style) {
        this.physics.pause();

    };

    gameScene.update = function (time)
    {
        if (this.ball.y > 600)
        {
            this.resetBall();
        }

        if (ponto>=100) {
            this.pergunta()
        }

        var timerdisplay = time/1000;
        timeText.setText('Time: ' + timerdisplay.toFixed(1));


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
