(function ($, global, undefined) {    
    if (!global.core) {
        global.core = {};
    }

    if (!global.classes) {
        global.classes = {};
    }

    function _log() {
        console.log.apply(console, arguments);
    }

    function _assert(assertion, description) {
        var result = document.createElement("li");
        result.className = assertion ? "pass" : "fail";
        result.appendChild(document.createTextNode(description));
        document.getElementById("results").appendChild(result);
    }

    function _defineClass(namespace, constructorFunction, instanceProperties) {
        var classPartNames = namespace.split(".");
        var currentName = global.classes;

        for (var i = 0 ; i < classPartNames.length - 1 ; i++) {
            if (!currentName[classPartNames[i]]) {
                currentName[classPartNames[i]] = {};
            }
            currentName = currentName[classPartNames[i]];            
        }

        currentName[classPartNames[classPartNames.length - 1]] = constructorFunction;

        if (!!instanceProperties) {
            $.extend(currentName[classPartNames[classPartNames.length - 1]].prototype, instanceProperties);
        }
    }

    // callback : index, value
    function _foreach(array, functionToExecute) {
        for (var i = 0 ; i < array.length ; i++) {
            functionToExecute.call(array, i, array[i]);
        }
    }

    // Object created this way is considered a singleton since there is no constructor associated with
    // this object and hence only one instance ever exists
    var _ObjectIdGenerator = {
        cache: {},
        generate: function (type) {
            var result
            friendlyTypeName = type.constructor.name;
            if (this.cache[friendlyTypeName] !== undefined) {
                result = this.cache[friendlyTypeName];
                this.cache[friendlyTypeName]++;
            }
            else {
                result = this.cache[friendlyTypeName] = 1;
            }
            return result;
        }
    }

    global.core = {
        assert: _assert,
        defineClass: _defineClass,
        log: _log,
        ObjectIdGenerator: _ObjectIdGenerator
    };    

})(this.jQuery, this);