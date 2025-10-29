"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelayerSDKLoader = void 0;
exports.isFhevmWindowType = isFhevmWindowType;
var constants_1 = require("./constants");
var RelayerSDKLoader = /** @class */ (function () {
    function RelayerSDKLoader(options) {
        this._trace = options.trace;
    }
    RelayerSDKLoader.prototype.isLoaded = function () {
        if (typeof window === "undefined") {
            throw new Error("RelayerSDKLoader: can only be used in the browser.");
        }
        return isFhevmWindowType(window, this._trace);
    };
    RelayerSDKLoader.prototype.load = function () {
        var _this = this;
        console.log("[RelayerSDKLoader] load...");
        // Ensure this only runs in the browser
        if (typeof window === "undefined") {
            console.log("[RelayerSDKLoader] window === undefined");
            return Promise.reject(new Error("RelayerSDKLoader: can only be used in the browser."));
        }
        if ("relayerSDK" in window) {
            if (!isFhevmRelayerSDKType(window.relayerSDK, this._trace)) {
                console.log("[RelayerSDKLoader] window.relayerSDK === undefined");
                throw new Error("RelayerSDKLoader: Unable to load FHEVM Relayer SDK");
            }
            return Promise.resolve();
        }
        return new Promise(function (resolve, reject) {
            var existingScript = document.querySelector("script[src=\"".concat(constants_1.SDK_CDN_URL, "\"]"));
            if (existingScript) {
                if (!isFhevmWindowType(window, _this._trace)) {
                    reject(new Error("RelayerSDKLoader: window object does not contain a valid relayerSDK object."));
                }
                resolve();
                return;
            }
            var script = document.createElement("script");
            script.src = constants_1.SDK_CDN_URL;
            script.type = "text/javascript";
            script.async = true;
            script.onload = function () {
                if (!isFhevmWindowType(window, _this._trace)) {
                    console.log("[RelayerSDKLoader] script onload FAILED...");
                    reject(new Error("RelayerSDKLoader: Relayer SDK script has been successfully loaded from ".concat(constants_1.SDK_CDN_URL, ", however, the window.relayerSDK object is invalid.")));
                }
                resolve();
            };
            script.onerror = function () {
                console.log("[RelayerSDKLoader] script onerror... ");
                reject(new Error("RelayerSDKLoader: Failed to load Relayer SDK from ".concat(constants_1.SDK_CDN_URL)));
            };
            console.log("[RelayerSDKLoader] add script to DOM...");
            document.head.appendChild(script);
            console.log("[RelayerSDKLoader] script added!");
        });
    };
    return RelayerSDKLoader;
}());
exports.RelayerSDKLoader = RelayerSDKLoader;
function isFhevmRelayerSDKType(o, trace) {
    if (typeof o === "undefined") {
        trace === null || trace === void 0 ? void 0 : trace("RelayerSDKLoader: relayerSDK is undefined");
        return false;
    }
    if (o === null) {
        trace === null || trace === void 0 ? void 0 : trace("RelayerSDKLoader: relayerSDK is null");
        return false;
    }
    if (typeof o !== "object") {
        trace === null || trace === void 0 ? void 0 : trace("RelayerSDKLoader: relayerSDK is not an object");
        return false;
    }
    if (!objHasProperty(o, "initSDK", "function", trace)) {
        trace === null || trace === void 0 ? void 0 : trace("RelayerSDKLoader: relayerSDK.initSDK is invalid");
        return false;
    }
    if (!objHasProperty(o, "createInstance", "function", trace)) {
        trace === null || trace === void 0 ? void 0 : trace("RelayerSDKLoader: relayerSDK.createInstance is invalid");
        return false;
    }
    if (!objHasProperty(o, "SepoliaConfig", "object", trace)) {
        trace === null || trace === void 0 ? void 0 : trace("RelayerSDKLoader: relayerSDK.SepoliaConfig is invalid");
        return false;
    }
    if ("__initialized__" in o) {
        if (o.__initialized__ !== true && o.__initialized__ !== false) {
            trace === null || trace === void 0 ? void 0 : trace("RelayerSDKLoader: relayerSDK.__initialized__ is invalid");
            return false;
        }
    }
    return true;
}
function isFhevmWindowType(win, trace) {
    if (typeof win === "undefined") {
        trace === null || trace === void 0 ? void 0 : trace("RelayerSDKLoader: window object is undefined");
        return false;
    }
    if (win === null) {
        trace === null || trace === void 0 ? void 0 : trace("RelayerSDKLoader: window object is null");
        return false;
    }
    if (typeof win !== "object") {
        trace === null || trace === void 0 ? void 0 : trace("RelayerSDKLoader: window is not an object");
        return false;
    }
    if (!("relayerSDK" in win)) {
        trace === null || trace === void 0 ? void 0 : trace("RelayerSDKLoader: window does not contain 'relayerSDK' property");
        return false;
    }
    return isFhevmRelayerSDKType(win.relayerSDK);
}
function objHasProperty(obj, propertyName, propertyType, trace) {
    if (!obj || typeof obj !== "object") {
        return false;
    }
    if (!(propertyName in obj)) {
        trace === null || trace === void 0 ? void 0 : trace("RelayerSDKLoader: missing ".concat(String(propertyName), "."));
        return false;
    }
    var value = obj[propertyName];
    if (value === null || value === undefined) {
        trace === null || trace === void 0 ? void 0 : trace("RelayerSDKLoader: ".concat(String(propertyName), " is null or undefined."));
        return false;
    }
    if (typeof value !== propertyType) {
        trace === null || trace === void 0 ? void 0 : trace("RelayerSDKLoader: ".concat(String(propertyName), " is not a ").concat(propertyType, "."));
        return false;
    }
    return true;
}
