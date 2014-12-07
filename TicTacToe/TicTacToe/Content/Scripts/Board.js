(function ($, global, constants, undefined) {

    var Board = function Board() { };    
    Board.prototype = new global.classes.GameObject();
    Board.prototype.currentState = constants.BoardState.Initialized;
    Board.prototype.size = 0;
    Board.prototype.tiles = [];
    Board.prototype.occupiedTiles = 0;
    Board.prototype.rowState = [];
    Board.prototype.columnState = [];
    Board.prototype.diagnolState = [];
    Board.prototype.input = -1;

    var localConstants = {
        boardRenderSurfaceId: "boardRenderSurface"
    };

    // Another comment
    Board.prototype.drawBoard = function (state) {
        var gameRenderSurfaceDiv = $(state.gameRenderSurfaceSelector);
        var gameRenderSurfaceDimension = this.size * 62;
        var boardRenderSurface = $("#" + localConstants.boardRenderSurfaceId);
        var board = this;

        if (!boardRenderSurface ||
            !boardRenderSurface.html()) { // First time render
            boardRenderSurface = document.createElement("div");
            boardRenderSurface.style.height = gameRenderSurfaceDimension + 'px';
            boardRenderSurface.style.width = gameRenderSurfaceDimension + 'px';
            boardRenderSurface.id = localConstants.boardRenderSurfaceId;

            $.each(this.tiles, function (index, value) {
                var cellDiv = document.createElement("div");
                cellDiv.id = "tictactoetile_" + index;
                cellDiv.className = "tictactoetile";
                cellDiv.onclick = function () {
                    if (board.input == -1) {
                        board.input = index;
                    }
                }
                boardRenderSurface.appendChild(cellDiv);
            })
            gameRenderSurfaceDiv.append(boardRenderSurface);
        }
        else { // Incremental update
            $.each(this.tiles, function (index, value) {
                var cellDiv = $("#tictactoetile_" + index);
                if (value === constants.TileType.Dot) {
                    cellDiv.removeClass("tictactoetiledot").addClass("tictactoetiledot");
                } else if (value === constants.TileType.Cross) {
                    cellDiv.removeClass("tictactoetilecross").addClass("tictactoetilecross");                    
                }
            })
        }
    }

    Board.prototype.update = function (state) {
        if (!state) {
            throw "state is not defined";
        }

        if (this.currentTileType &&
		   this.input !== -1) {
            var x = this.input % this.size;
            var y = Math.floor(this.input / this.size);
            var result = this.placeTile(x, y, this.currentTileType);
            this.input = -1;
            if (result) {
                this.currentTileType = this.currentTileType == constants.TileType.Cross ?
                    constants.TileType.Dot :
                    constants.TileType.Cross;
            }
        }
    }

    Board.prototype.render = function (state) {
        this.drawBoard(state.gameInitializationState);
        this.currentStatusDiv.innerText = "Board state: " + this.currentState;
        this.currentTileTypeDiv.innerText = "Current turn: " + this.currentTileType;
    }

    Board.prototype.initialize = function (state) {
        if (!state) {
            throw "state is not defined";
        }
        var maxSize = 5,
            self = this;

        if (!state.size ||
			state.size < 0 ||
			state.size > maxSize) {
            throw "size is not valid" + state.size;
        }

        this.currentTileType = state.currentTileType || constants.TileType.Cross;
        this.size = state.size;
        this.totalTiles = this.size * this.size;
        this.tiles = new Array(this.totalTiles);
        this.occupiedTiles = 0;
        this.rowState = new Array(this.size);
        this.columnState = new Array(this.size);
        this.diagnolState = new Array(2);
        $.each(this.rowState, function (index, value) { self.rowState[index] = 0; });
        $.each(this.columnState, function (index, value) { self.columnState[index] = 0; });
        $.each(this.diagnolState, function (index, value) { self.diagnolState[index] = 0; });

        this.drawBoard(state);

        var gameRenderSurfaceDiv = $(state.gameRenderSurfaceSelector);

        this.currentStatusDiv = document.createElement("div");
        this.currentStatusDiv.innerText = "Board state: " + this.currentState;
        gameRenderSurfaceDiv.append(this.currentStatusDiv);

        this.currentTileTypeDiv = document.createElement("div");
        this.currentTileTypeDiv.innerText = "Current turn: " + this.currentTileType;
        gameRenderSurfaceDiv.append(this.currentTileTypeDiv);
    };

    Board.prototype.placeTile = function (x, y, tileType) {

        var tileValue = constants.TileType.properties[tileType].code;

        if (constants.TileType[tileType] === undefined) {
            throw "Tile type not defined" + type;
        }

        var index = this.getIndex(x, y);
        if (this.tiles[index] !== undefined) {
            return false;
        }

        this.tiles[index] = tileType;
        this.occupiedTiles++;
        this.rowState[x] += tileValue;
        this.columnState[y] += tileValue;

        if (x == y) {
            this.diagnolState[0] += tileValue;
        }

        if (x + y + 1 == this.size) {
            this.diagnolState[1] += tileValue;
        }

        this.updateStatev2(x, y, tileType);

        return true;
    }
    // We can scan each row/column and diagnol to figure out the state
    // We can also keep partial scores every time a tile is placed and use that to update state
    Board.prototype.updateStatev2 = function (x, y, tileType) {
        var result = constants.BoardState.Running;

        if (Math.abs(this.rowState[x]) == this.size ||
		   Math.abs(this.columnState[y]) == this.size ||
		   Math.abs(this.diagnolState[0]) == this.size ||
		   Math.abs(this.diagnolState[1]) == this.size) {
            this.setFinishedState(tileType);
            return;
        }

        if (this.occupiedTiles === this.totalTiles) {
            this.currentState = constants.BoardState.Tie;
        }
        else {
            this.currentState = constants.BoardState.Running;
        }
    }

    Board.prototype.updateState = function (x, y, tileType) {

        var index, finished, scanX, scanY;

        finished = true;
        for (scanX = 0 ; scanX < this.size ; scanX++) {
            index = this.getIndex(scanX, y);
            if (this.tiles[index] !== tileType) {
                finished = false;
                break;
            }
        }

        if (finished) {
            this.setFinishedState(tileType);
            return;
        }

        finished = true;
        for (scanY = 0 ; scanY < this.size ; scanY++) {
            index = this.getIndex(x, scanY);
            if (this.tiles[index] !== tileType) {
                finished = false;
                break;
            }
        }

        if (finished) {
            this.setFinishedState(tileType);
            return;
        }

        finished = true;
        if (x === y) {
            for (scanX = 0, scanY = 0 ; scanX < this.size && scanY < this.size ; scanX++, scanY++) {
                index = this.getIndex(scanX, scanY);
                if (this.tiles[index] !== tileType) {
                    finished = false;
                    break;
                }
            }

            if (finished) {
                this.setFinishedState(tileType);
                return;
            }
        }

        finished = true;
        if (x + y + 1 == this.size) {
            for (scanX = 0, scanY = this.size - 1 ; scanX < this.size && scanY >= 0 ; scanX++, scanY--) {
                index = this.getIndex(scanX, scanY);
                if (this.tiles[index] !== tileType) {
                    finished = false;
                    break;
                }
            }

            if (finished) {
                this.setFinishedState(tileType);
                return;
            }
        }

        if (this.occupiedTiles === this.totalTiles) {
            this.currentState = constants.BoardState.Tie;
        }
        else {
            this.currentState = constants.BoardState.Running;
        }

        return;
    }

    Board.prototype.setFinishedState = function (tileType) {
        if (tileType == constants.TileType.Cross) {
            this.currentState = constants.BoardState.TileCrossWon
        } else {
            this.currentState = constants.BoardState.TileDotWon
        }
    }

    Board.prototype.getIndex = function (x, y) {
        if (x < 0 || y < 0 || x >= this.size || y >= this.size) {
            throw "out of bound" + x + ":" + y;
        }

        var result = y * this.size + x;
        return result;
    }

    global.core.defineClass("Board", Board);

})(this.jQuery, this, this.classes.Constants);	