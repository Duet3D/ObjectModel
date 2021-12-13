"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeChannel = void 0;
var CodeChannel;
(function (CodeChannel) {
    CodeChannel[CodeChannel["http"] = 0] = "http";
    CodeChannel[CodeChannel["telnet"] = 1] = "telnet";
    CodeChannel[CodeChannel["file"] = 2] = "file";
    CodeChannel[CodeChannel["usb"] = 3] = "usb";
    CodeChannel[CodeChannel["aux"] = 4] = "aux";
    CodeChannel[CodeChannel["trigger"] = 5] = "trigger";
    CodeChannel[CodeChannel["queue"] = 6] = "queue";
    CodeChannel[CodeChannel["lcd"] = 7] = "lcd";
    CodeChannel[CodeChannel["sbc"] = 8] = "sbc";
    CodeChannel[CodeChannel["daemon"] = 9] = "daemon";
    CodeChannel[CodeChannel["aux2"] = 10] = "aux2";
    CodeChannel[CodeChannel["autopause"] = 11] = "autopause";
    CodeChannel[CodeChannel["unknown"] = 12] = "unknown";
})(CodeChannel = exports.CodeChannel || (exports.CodeChannel = {}));
