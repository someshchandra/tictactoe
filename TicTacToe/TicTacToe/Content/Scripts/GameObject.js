(function ($, global, constants, undefined) {    
    var log = global.core.log,
        assert = global.core.assert;

    function GameObject(name) {
        this.id = global.core.ObjectIdGenerator.generate(this);
        this.name = name;
    };

    GameObject.prototype.initialize = function (state) {
        log("initialize not defined in this object" + this.constructor.name);
    }

    GameObject.prototype.seekInput = function (state) {
        log("seekInput not defined in this object" + this.constructor.name);
    }

    GameObject.prototype.update = function (state) {
        log("update not defined in this object" + this.constructor.name);
    }

    GameObject.prototype.render = function (state) {
        log("render not defined in this object" + this.constructor.name);
    }

    global.core.defineClass("GameObject", GameObject);

})(this.jQuery, this, this.classes.Constants);