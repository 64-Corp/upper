
'use strict';
var Debugger,
    self;

module.exports = Debugger = function () {
    this.platform = ((typeof(window) !== 'undefined') && window.Array && window.String) ? 'client' : 'server';
    self = this;
};

Debugger.prototype._format = function () {
    var output = '';
    for(var i in arguments) {
        output += (arguments[i].constructor === Object || arguments[i].constructor === Array) ? (JSON.stringify(arguments[i], null, 4) + ' ') : (arguments[i] + ' ');
    }
    return output;
};

Debugger.prototype.log = function () {
    console.log(self._format(arguments));
};

Debugger.prototype.alert = function () {
    // Only alert if window is avaliable
    return (typeof(window) !== 'undefined') && window.alert(self._format(arguments));
};
