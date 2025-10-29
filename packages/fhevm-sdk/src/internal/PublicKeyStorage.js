"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicKeyStorageGet = publicKeyStorageGet;
exports.publicKeyStorageSet = publicKeyStorageSet;
var idb_1 = require("idb");
var __dbPromise = undefined;
function _getDB() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (__dbPromise) {
                return [2 /*return*/, __dbPromise];
            }
            if (typeof window === "undefined") {
                return [2 /*return*/, undefined];
            }
            __dbPromise = (0, idb_1.openDB)("fhevm", 1, {
                upgrade: function (db) {
                    if (!db.objectStoreNames.contains("paramsStore")) {
                        db.createObjectStore("paramsStore", { keyPath: "acl" });
                    }
                    if (!db.objectStoreNames.contains("publicKeyStore")) {
                        db.createObjectStore("publicKeyStore", { keyPath: "acl" });
                    }
                },
            });
            return [2 /*return*/, __dbPromise];
        });
    });
}
function assertFhevmStoredPublicKey(value) {
    if (typeof value !== "object") {
        throw new Error("FhevmStoredPublicKey must be an object");
    }
    if (value === null) {
        return;
    }
    if (!("publicKeyId" in value)) {
        throw new Error("FhevmStoredPublicKey.publicKeyId does not exist");
    }
    if (typeof value.publicKeyId !== "string") {
        throw new Error("FhevmStoredPublicKey.publicKeyId must be a string");
    }
    if (!("publicKey" in value)) {
        throw new Error("FhevmStoredPublicKey.publicKey does not exist");
    }
    if (!(value.publicKey instanceof Uint8Array)) {
        throw new Error("FhevmStoredPublicKey.publicKey must be a Uint8Array");
    }
}
function assertFhevmStoredPublicParams(value) {
    if (typeof value !== "object") {
        throw new Error("FhevmStoredPublicParams must be an object");
    }
    if (value === null) {
        return;
    }
    if (!("publicParamsId" in value)) {
        throw new Error("FhevmStoredPublicParams.publicParamsId does not exist");
    }
    if (typeof value.publicParamsId !== "string") {
        throw new Error("FhevmStoredPublicParams.publicParamsId must be a string");
    }
    if (!("publicParams" in value)) {
        throw new Error("FhevmStoredPublicParams.publicParams does not exist");
    }
    if (!(value.publicParams instanceof Uint8Array)) {
        throw new Error("FhevmStoredPublicParams.publicParams must be a Uint8Array");
    }
}
function publicKeyStorageGet(aclAddress) {
    return __awaiter(this, void 0, void 0, function () {
        var db, storedPublicKey, pk, _a, storedPublicParams, pp, _b, publicKeyData, publicKeyId, publicParams, publicKey;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, _getDB()];
                case 1:
                    db = _c.sent();
                    if (!db) {
                        return [2 /*return*/, { publicParams: null }];
                    }
                    storedPublicKey = null;
                    _c.label = 2;
                case 2:
                    _c.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, db.get("publicKeyStore", aclAddress)];
                case 3:
                    pk = _c.sent();
                    if (pk === null || pk === void 0 ? void 0 : pk.value) {
                        assertFhevmStoredPublicKey(pk.value);
                        storedPublicKey = pk.value;
                    }
                    return [3 /*break*/, 5];
                case 4:
                    _a = _c.sent();
                    return [3 /*break*/, 5];
                case 5:
                    storedPublicParams = null;
                    _c.label = 6;
                case 6:
                    _c.trys.push([6, 8, , 9]);
                    return [4 /*yield*/, db.get("paramsStore", aclAddress)];
                case 7:
                    pp = _c.sent();
                    if (pp === null || pp === void 0 ? void 0 : pp.value) {
                        assertFhevmStoredPublicParams(pp.value);
                        storedPublicParams = pp.value;
                    }
                    return [3 /*break*/, 9];
                case 8:
                    _b = _c.sent();
                    return [3 /*break*/, 9];
                case 9:
                    publicKeyData = storedPublicKey === null || storedPublicKey === void 0 ? void 0 : storedPublicKey.publicKey;
                    publicKeyId = storedPublicKey === null || storedPublicKey === void 0 ? void 0 : storedPublicKey.publicKeyId;
                    publicParams = storedPublicParams
                        ? {
                            "2048": storedPublicParams,
                        }
                        : null;
                    publicKey = undefined;
                    if (publicKeyId && publicKeyData) {
                        publicKey = {
                            id: publicKeyId,
                            data: publicKeyData,
                        };
                    }
                    return [2 /*return*/, __assign(__assign({}, (publicKey !== undefined && { publicKey: publicKey })), { publicParams: publicParams })];
            }
        });
    });
}
function publicKeyStorageSet(aclAddress, publicKey, publicParams) {
    return __awaiter(this, void 0, void 0, function () {
        var db;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    assertFhevmStoredPublicKey(publicKey);
                    assertFhevmStoredPublicParams(publicParams);
                    return [4 /*yield*/, _getDB()];
                case 1:
                    db = _a.sent();
                    if (!db) {
                        return [2 /*return*/];
                    }
                    if (!publicKey) return [3 /*break*/, 3];
                    return [4 /*yield*/, db.put("publicKeyStore", { acl: aclAddress, value: publicKey })];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    if (!publicParams) return [3 /*break*/, 5];
                    return [4 /*yield*/, db.put("paramsStore", { acl: aclAddress, value: publicParams })];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    });
}
