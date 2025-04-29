"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.linkstring = linkstring;
function linkstring(num) {
    let ans = "";
    let options = "QWERTYUIOPasdfghjklZXCVBNM1234567890";
    let length = options.length;
    for (let i = 0; i < num; i++) {
        ans += options[Math.floor(Math.random() * length)];
    }
    return ans;
}
