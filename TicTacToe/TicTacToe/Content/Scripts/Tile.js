(function ($, global, constants, undefined) {    
    var TileType = {
        Cross: "Cross",
        Dot: "Dot",
        properties: {
            Cross: { code: -1 },
            Dot: { code: 1 }
        }
    }

    function Tile(type) {
        if (TileType[type] === undefined) {
            throw "Tile type not defined" + type;
        }
        this.type = TileType[type];
    };

    Tile.prototype = new global.classes.GameObject();

    global.core.defineClass("Tile", Tile);

})(this.jQuery, this, this.classes.Constants);	