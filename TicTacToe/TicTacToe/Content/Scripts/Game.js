(function ($, global, constants, undefined) {
    var log = global.core.log;

    var Game = function Game() {
        this.lastTime = new Date().getTime();
    };

    Game.prototype.gameObjects = [];
    Game.prototype.lastTime;
    Game.prototype.board;

    Game.prototype.initialize = function (state) {
        this.lastTime = new Date().getTime();
        this.gameInitializationState = state;
    }

    Game.prototype.timerId;
    Game.prototype.stop = function () {
        if (this.timerId) {
            log("stopping game");
            clearInterval(this.timer);
        }
    }

    Game.prototype.seekInput = function (state) {
        log("seeking input");
        
    }

    Game.prototype.update = function (state) {
        log("update");
        $.each(this.gameObjects, function (index, value) {
            this.update(state);
        })
    }

    Game.prototype.render = function (state) {
        log("render");
        $.each(this.gameObjects, function (index, value) {
            this.render(state);
        })
    }
    Game.prototype.run = function () {
        var game = this;
        var intervalFunction = function () {
            var timeElapsed = new Date().getTime() - game.lastTime;
            var input = game.seekInput();
            game.update({ timeElapsed: timeElapsed, input: input, gameInitializationState: game.gameInitializationState });
            game.render({ timeElapsed: timeElapsed, input: input, gameInitializationState: game.gameInitializationState });
            game.lastTime = new Date().getTime();
        };
        this.timerId = setInterval(intervalFunction, 1000);
    }

    global.core.defineClass("Game", Game);

})(this.jQuery, this, this.classes.Constants);