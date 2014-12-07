(function ($, global, constants, undefined) {    
    function TicTacToe() { }
    TicTacToe.prototype = new global.classes.Game();

    TicTacToe.prototype.initialize = function (state) {
        this.lastTime = new Date().getTime();
        this.board = new global.classes.Board();
        this.gameObjects.push(this.board);

        var player1 = new global.classes.Player("Player 1");        
        var player2 = new global.classes.Player("Player 2");

        this.gameObjects.push(player1);
        this.gameObjects.push(player2);

        $.each(this.gameObjects, function (gameObject) {
            this.initialize(state);
        });

        // TODO : call base class from here.
        this.gameInitializationState = state;
    }

    global.core.defineClass("TicTacToe", TicTacToe);

})(this.jQuery, this, this.classes.Constants);