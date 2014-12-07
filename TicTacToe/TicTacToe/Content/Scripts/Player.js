(function ($, global, constants, undefined) {    
    function Player(name) {
        this.name = name;
    };

    Player.prototype = new global.classes.GameObject();

    global.core.defineClass("Player", Player);
})(this.jQuery, this, this.classes.Constants);	