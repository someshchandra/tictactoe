(function ($, global, undefined) {       

    function Constants() { };

    Constants.TileType = {
        Cross: "Cross",
        Dot: "Dot",
        properties: {
            Cross: { code: -1 },
            Dot: { code: 1 }
        }
    };

    Constants.BoardState = {
        Initialized: "Initialized",
        Running: "Running",
        TileCrossWon: "TileCrossWon",
        TileDotWon: "TileDotWon",
        Tie: "Tie"
    };

    global.core.defineClass("Constants", Constants);

})(this.jQuery, this);