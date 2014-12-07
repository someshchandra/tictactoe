(function ($, global, constants, undefined) {
    var log = global.core.log,
        assert = global.core.assert;

    var _TicTacToe = function TicTacToe() { };

    function TestAll() {
        TestTileType();
        TestGame();
        TestBoard();
    }

    function TestTileType() {
        assert(constants.TileType.Cross == "Cross", "constants.TileType.Cross == 'Cross'");
        assert(constants.TileType.Dot == "Dot", "constants.TileType.Dot == 'Dot'");
        assert(constants.TileType.properties[constants.TileType.Cross].code == -1, "constants.TileType.properties[constants.TileType.Cross].code == -1");
        assert(constants.TileType.properties[constants.TileType.Dot].code == 1, "constants.TileType.properties[constants.TileType.Dot].code == 1");

        assert(constants.TileType[constants.TileType.Cross] !== undefined, "TileType[constants.TileType.Cross] !== undefined");
    }

    function TestGame() {
        var testGame = new global.classes.Game();
        var state = { size: 3 };
        testGame.initialize(state);
        testGame.run();
        setTimeout(function () { testGame.stop(); }, 1000);
    }

    function TestBoard() {
        var testBoard = new global.classes.Board();
        var boardState = { size: 3 };
        testBoard.initialize(boardState);

        assert(testBoard.currentState == constants.BoardState.Initialized, "Intialized");
        assert(testBoard.placeTile(0, 0, constants.TileType.Cross), "Successfully placed a tile");
        assert(testBoard.currentState == constants.BoardState.Running, "Game state is now running");
        assert(!testBoard.placeTile(0, 0, constants.TileType.Cross), "Successfully rejected a request to place another tile at the same location");

        // win by row
        testBoard.placeTile(0, 1, constants.TileType.Dot);
        testBoard.placeTile(1, 0, constants.TileType.Cross);
        testBoard.placeTile(0, 2, constants.TileType.Dot);
        testBoard.placeTile(2, 0, constants.TileType.Cross);
        assert(testBoard.currentState == constants.BoardState.TileCrossWon, "TileCrossWon by row :" + testBoard.currentState);

        // win by column
        testBoard = new global.classes.Board();
        testBoard.initialize(boardState);

        assert(testBoard.placeTile(0, 0, constants.TileType.Dot), "Successfully placed a tile");
        assert(!testBoard.placeTile(0, 0, constants.TileType.Cross), "Successfully rejected a request to place another tile at the same location");

        testBoard.placeTile(1, 0, constants.TileType.Cross);
        testBoard.placeTile(0, 1, constants.TileType.Dot);
        testBoard.placeTile(2, 0, constants.TileType.Cross);
        testBoard.placeTile(0, 2, constants.TileType.Dot);
        assert(testBoard.currentState == constants.BoardState.TileDotWon, "TileDotWon by column :" + testBoard.currentState);

        // win by diagnol
        testBoard = new global.classes.Board();
        testBoard.initialize(boardState);

        assert(testBoard.placeTile(0, 0, constants.TileType.Dot), "Successfully placed a tile");
        assert(!testBoard.placeTile(0, 0, constants.TileType.Cross), "Successfully rejected a request to place another tile at the same location");

        testBoard.placeTile(1, 0, constants.TileType.Cross);
        testBoard.placeTile(1, 1, constants.TileType.Dot);
        testBoard.placeTile(2, 0, constants.TileType.Cross);
        testBoard.placeTile(2, 2, constants.TileType.Dot);
        assert(testBoard.currentState == constants.BoardState.TileDotWon, "TileDotWon by diagnol :" + testBoard.currentState);

        // win by other diagnol
        testBoard = new global.classes.Board();
        testBoard.initialize(boardState);

        assert(testBoard.placeTile(0, 0, constants.TileType.Dot), "Successfully placed a tile");
        assert(!testBoard.placeTile(0, 0, constants.TileType.Cross), "Successfully rejected a request to place another tile at the same location");

        testBoard.placeTile(0, 2, constants.TileType.Cross);
        testBoard.placeTile(1, 0, constants.TileType.Dot);
        testBoard.placeTile(1, 1, constants.TileType.Cross);
        testBoard.placeTile(0, 1, constants.TileType.Dot);
        testBoard.placeTile(2, 0, constants.TileType.Cross);
        assert(testBoard.currentState == constants.BoardState.TileCrossWon, "TileCrossWon by other diagnol :" + testBoard.currentState);
    }

    global.core.defineClass("Test.TicTacToe", _TicTacToe,  { TestAll: TestAll });
})(this.jQuery, this, this.classes.Constants);