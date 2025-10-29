"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _GenericStringInMemoryStorage_store;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericStringInMemoryStorage = void 0;
var GenericStringInMemoryStorage = /** @class */ (function () {
    function GenericStringInMemoryStorage() {
        _GenericStringInMemoryStorage_store.set(this, new Map());
    }
    GenericStringInMemoryStorage.prototype.getItem = function (key) {
        return __classPrivateFieldGet(this, _GenericStringInMemoryStorage_store, "f").has(key) ? __classPrivateFieldGet(this, _GenericStringInMemoryStorage_store, "f").get(key) : null;
    };
    GenericStringInMemoryStorage.prototype.setItem = function (key, value) {
        __classPrivateFieldGet(this, _GenericStringInMemoryStorage_store, "f").set(key, value);
    };
    GenericStringInMemoryStorage.prototype.removeItem = function (key) {
        __classPrivateFieldGet(this, _GenericStringInMemoryStorage_store, "f").delete(key);
    };
    return GenericStringInMemoryStorage;
}());
exports.GenericStringInMemoryStorage = GenericStringInMemoryStorage;
_GenericStringInMemoryStorage_store = new WeakMap();
