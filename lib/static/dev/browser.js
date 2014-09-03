    /* Returns new object instance if AMD is used, or assigns it to window.Upper */
    return (function () {
        if (typeof window.define === 'function' && window.define.amd) {
            window.define([], function () {
                return Upper;
            });
        } else {
            if(!window.Upper) {
                window.Upper = function () {
                    return new (Function.prototype.bind.apply(Upper, arguments));
                };
            }
            return Upper;
        }
    })();
