"use strict";
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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _FhevmDecryptionSignatureStorageKey_contractAddresses, _FhevmDecryptionSignatureStorageKey_userAddress, _FhevmDecryptionSignatureStorageKey_publicKey, _FhevmDecryptionSignatureStorageKey_key, _FhevmDecryptionSignature_publicKey, _FhevmDecryptionSignature_privateKey, _FhevmDecryptionSignature_signature, _FhevmDecryptionSignature_startTimestamp, _FhevmDecryptionSignature_durationDays, _FhevmDecryptionSignature_userAddress, _FhevmDecryptionSignature_contractAddresses, _FhevmDecryptionSignature_eip712;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FhevmDecryptionSignature = void 0;
var ethers_1 = require("ethers");
function _timestampNow() {
    return Math.floor(Date.now() / 1000);
}
var FhevmDecryptionSignatureStorageKey = /** @class */ (function () {
    function FhevmDecryptionSignatureStorageKey(instance, contractAddresses, userAddress, publicKey) {
        _FhevmDecryptionSignatureStorageKey_contractAddresses.set(this, void 0);
        _FhevmDecryptionSignatureStorageKey_userAddress.set(this, void 0);
        _FhevmDecryptionSignatureStorageKey_publicKey.set(this, void 0);
        _FhevmDecryptionSignatureStorageKey_key.set(this, void 0);
        if (!ethers_1.ethers.isAddress(userAddress)) {
            throw new TypeError("Invalid address ".concat(userAddress));
        }
        var sortedContractAddresses = contractAddresses.sort();
        var emptyEIP712 = instance.createEIP712(publicKey !== null && publicKey !== void 0 ? publicKey : ethers_1.ethers.ZeroAddress, sortedContractAddresses, 0, 0);
        try {
            var hash = ethers_1.ethers.TypedDataEncoder.hash(emptyEIP712.domain, { UserDecryptRequestVerification: emptyEIP712.types.UserDecryptRequestVerification }, emptyEIP712.message);
            __classPrivateFieldSet(this, _FhevmDecryptionSignatureStorageKey_contractAddresses, sortedContractAddresses, "f");
            __classPrivateFieldSet(this, _FhevmDecryptionSignatureStorageKey_userAddress, userAddress, "f");
            __classPrivateFieldSet(this, _FhevmDecryptionSignatureStorageKey_key, "".concat(userAddress, ":").concat(hash), "f");
        }
        catch (e) {
            throw e;
        }
    }
    Object.defineProperty(FhevmDecryptionSignatureStorageKey.prototype, "contractAddresses", {
        get: function () {
            return __classPrivateFieldGet(this, _FhevmDecryptionSignatureStorageKey_contractAddresses, "f");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FhevmDecryptionSignatureStorageKey.prototype, "userAddress", {
        get: function () {
            return __classPrivateFieldGet(this, _FhevmDecryptionSignatureStorageKey_userAddress, "f");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FhevmDecryptionSignatureStorageKey.prototype, "publicKey", {
        get: function () {
            return __classPrivateFieldGet(this, _FhevmDecryptionSignatureStorageKey_publicKey, "f");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FhevmDecryptionSignatureStorageKey.prototype, "key", {
        get: function () {
            return __classPrivateFieldGet(this, _FhevmDecryptionSignatureStorageKey_key, "f");
        },
        enumerable: false,
        configurable: true
    });
    return FhevmDecryptionSignatureStorageKey;
}());
_FhevmDecryptionSignatureStorageKey_contractAddresses = new WeakMap(), _FhevmDecryptionSignatureStorageKey_userAddress = new WeakMap(), _FhevmDecryptionSignatureStorageKey_publicKey = new WeakMap(), _FhevmDecryptionSignatureStorageKey_key = new WeakMap();
var FhevmDecryptionSignature = /** @class */ (function () {
    function FhevmDecryptionSignature(parameters) {
        _FhevmDecryptionSignature_publicKey.set(this, void 0);
        _FhevmDecryptionSignature_privateKey.set(this, void 0);
        _FhevmDecryptionSignature_signature.set(this, void 0);
        _FhevmDecryptionSignature_startTimestamp.set(this, void 0);
        _FhevmDecryptionSignature_durationDays.set(this, void 0);
        _FhevmDecryptionSignature_userAddress.set(this, void 0);
        _FhevmDecryptionSignature_contractAddresses.set(this, void 0);
        _FhevmDecryptionSignature_eip712.set(this, void 0);
        if (!FhevmDecryptionSignature.checkIs(parameters)) {
            throw new TypeError("Invalid FhevmDecryptionSignatureType");
        }
        __classPrivateFieldSet(this, _FhevmDecryptionSignature_publicKey, parameters.publicKey, "f");
        __classPrivateFieldSet(this, _FhevmDecryptionSignature_privateKey, parameters.privateKey, "f");
        __classPrivateFieldSet(this, _FhevmDecryptionSignature_signature, parameters.signature, "f");
        __classPrivateFieldSet(this, _FhevmDecryptionSignature_startTimestamp, parameters.startTimestamp, "f");
        __classPrivateFieldSet(this, _FhevmDecryptionSignature_durationDays, parameters.durationDays, "f");
        __classPrivateFieldSet(this, _FhevmDecryptionSignature_userAddress, parameters.userAddress, "f");
        __classPrivateFieldSet(this, _FhevmDecryptionSignature_contractAddresses, parameters.contractAddresses, "f");
        __classPrivateFieldSet(this, _FhevmDecryptionSignature_eip712, parameters.eip712, "f");
    }
    Object.defineProperty(FhevmDecryptionSignature.prototype, "privateKey", {
        get: function () {
            return __classPrivateFieldGet(this, _FhevmDecryptionSignature_privateKey, "f");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FhevmDecryptionSignature.prototype, "publicKey", {
        get: function () {
            return __classPrivateFieldGet(this, _FhevmDecryptionSignature_publicKey, "f");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FhevmDecryptionSignature.prototype, "signature", {
        get: function () {
            return __classPrivateFieldGet(this, _FhevmDecryptionSignature_signature, "f");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FhevmDecryptionSignature.prototype, "contractAddresses", {
        get: function () {
            return __classPrivateFieldGet(this, _FhevmDecryptionSignature_contractAddresses, "f");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FhevmDecryptionSignature.prototype, "startTimestamp", {
        get: function () {
            return __classPrivateFieldGet(this, _FhevmDecryptionSignature_startTimestamp, "f");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FhevmDecryptionSignature.prototype, "durationDays", {
        get: function () {
            return __classPrivateFieldGet(this, _FhevmDecryptionSignature_durationDays, "f");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FhevmDecryptionSignature.prototype, "userAddress", {
        get: function () {
            return __classPrivateFieldGet(this, _FhevmDecryptionSignature_userAddress, "f");
        },
        enumerable: false,
        configurable: true
    });
    FhevmDecryptionSignature.checkIs = function (s) {
        if (!s || typeof s !== "object") {
            return false;
        }
        if (!("publicKey" in s && typeof s.publicKey === "string")) {
            return false;
        }
        if (!("privateKey" in s && typeof s.privateKey === "string")) {
            return false;
        }
        if (!("signature" in s && typeof s.signature === "string")) {
            return false;
        }
        if (!("startTimestamp" in s && typeof s.startTimestamp === "number")) {
            return false;
        }
        if (!("durationDays" in s && typeof s.durationDays === "number")) {
            return false;
        }
        if (!("contractAddresses" in s && Array.isArray(s.contractAddresses))) {
            return false;
        }
        for (var i = 0; i < s.contractAddresses.length; ++i) {
            if (typeof s.contractAddresses[i] !== "string")
                return false;
            if (!s.contractAddresses[i].startsWith("0x"))
                return false;
        }
        if (!("userAddress" in s && typeof s.userAddress === "string" && s.userAddress.startsWith("0x"))) {
            return false;
        }
        if (!("eip712" in s && typeof s.eip712 === "object" && s.eip712 !== null)) {
            return false;
        }
        if (!("domain" in s.eip712 && typeof s.eip712.domain === "object")) {
            return false;
        }
        if (!("primaryType" in s.eip712 && typeof s.eip712.primaryType === "string")) {
            return false;
        }
        if (!("message" in s.eip712)) {
            return false;
        }
        if (!("types" in s.eip712 && typeof s.eip712.types === "object" && s.eip712.types !== null)) {
            return false;
        }
        return true;
    };
    FhevmDecryptionSignature.prototype.toJSON = function () {
        return {
            publicKey: __classPrivateFieldGet(this, _FhevmDecryptionSignature_publicKey, "f"),
            privateKey: __classPrivateFieldGet(this, _FhevmDecryptionSignature_privateKey, "f"),
            signature: __classPrivateFieldGet(this, _FhevmDecryptionSignature_signature, "f"),
            startTimestamp: __classPrivateFieldGet(this, _FhevmDecryptionSignature_startTimestamp, "f"),
            durationDays: __classPrivateFieldGet(this, _FhevmDecryptionSignature_durationDays, "f"),
            userAddress: __classPrivateFieldGet(this, _FhevmDecryptionSignature_userAddress, "f"),
            contractAddresses: __classPrivateFieldGet(this, _FhevmDecryptionSignature_contractAddresses, "f"),
            eip712: __classPrivateFieldGet(this, _FhevmDecryptionSignature_eip712, "f"),
        };
    };
    FhevmDecryptionSignature.fromJSON = function (json) {
        var data = typeof json === "string" ? JSON.parse(json) : json;
        return new FhevmDecryptionSignature(data);
    };
    FhevmDecryptionSignature.prototype.equals = function (s) {
        return s.signature === __classPrivateFieldGet(this, _FhevmDecryptionSignature_signature, "f");
    };
    FhevmDecryptionSignature.prototype.isValid = function () {
        return _timestampNow() < __classPrivateFieldGet(this, _FhevmDecryptionSignature_startTimestamp, "f") + __classPrivateFieldGet(this, _FhevmDecryptionSignature_durationDays, "f") * 24 * 60 * 60;
    };
    FhevmDecryptionSignature.prototype.saveToGenericStringStorage = function (storage, instance, withPublicKey) {
        return __awaiter(this, void 0, void 0, function () {
            var value, storageKey, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        value = JSON.stringify(this);
                        storageKey = new FhevmDecryptionSignatureStorageKey(instance, __classPrivateFieldGet(this, _FhevmDecryptionSignature_contractAddresses, "f"), __classPrivateFieldGet(this, _FhevmDecryptionSignature_userAddress, "f"), withPublicKey ? __classPrivateFieldGet(this, _FhevmDecryptionSignature_publicKey, "f") : undefined);
                        return [4 /*yield*/, storage.setItem(storageKey.key, value)];
                    case 1:
                        _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = _b.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FhevmDecryptionSignature.loadFromGenericStringStorage = function (storage, instance, contractAddresses, userAddress, publicKey) {
        return __awaiter(this, void 0, void 0, function () {
            var storageKey, result, kps, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        storageKey = new FhevmDecryptionSignatureStorageKey(instance, contractAddresses, userAddress, publicKey);
                        return [4 /*yield*/, storage.getItem(storageKey.key)];
                    case 1:
                        result = _b.sent();
                        if (!result) {
                            return [2 /*return*/, null];
                        }
                        try {
                            kps = FhevmDecryptionSignature.fromJSON(result);
                            if (!kps.isValid()) {
                                return [2 /*return*/, null];
                            }
                            return [2 /*return*/, kps];
                        }
                        catch (_c) {
                            return [2 /*return*/, null];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        _a = _b.sent();
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FhevmDecryptionSignature.new = function (instance, contractAddresses, publicKey, privateKey, signer) {
        return __awaiter(this, void 0, void 0, function () {
            var userAddress, startTimestamp, durationDays, eip712, signature, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, signer.getAddress()];
                    case 1:
                        userAddress = (_b.sent());
                        startTimestamp = _timestampNow();
                        durationDays = 365;
                        eip712 = instance.createEIP712(publicKey, contractAddresses, startTimestamp, durationDays);
                        return [4 /*yield*/, signer.signTypedData(eip712.domain, { UserDecryptRequestVerification: eip712.types.UserDecryptRequestVerification }, eip712.message)];
                    case 2:
                        signature = _b.sent();
                        return [2 /*return*/, new FhevmDecryptionSignature({
                                publicKey: publicKey,
                                privateKey: privateKey,
                                contractAddresses: contractAddresses,
                                startTimestamp: startTimestamp,
                                durationDays: durationDays,
                                signature: signature,
                                eip712: eip712,
                                userAddress: userAddress,
                            })];
                    case 3:
                        _a = _b.sent();
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    FhevmDecryptionSignature.loadOrSign = function (instance, contractAddresses, signer, storage, keyPair) {
        return __awaiter(this, void 0, void 0, function () {
            var userAddress, cached, _a, publicKey, privateKey, sig;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, signer.getAddress()];
                    case 1:
                        userAddress = (_b.sent());
                        return [4 /*yield*/, FhevmDecryptionSignature.loadFromGenericStringStorage(storage, instance, contractAddresses, userAddress, keyPair === null || keyPair === void 0 ? void 0 : keyPair.publicKey)];
                    case 2:
                        cached = _b.sent();
                        if (cached) {
                            return [2 /*return*/, cached];
                        }
                        _a = keyPair !== null && keyPair !== void 0 ? keyPair : instance.generateKeypair(), publicKey = _a.publicKey, privateKey = _a.privateKey;
                        return [4 /*yield*/, FhevmDecryptionSignature.new(instance, contractAddresses, publicKey, privateKey, signer)];
                    case 3:
                        sig = _b.sent();
                        if (!sig) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, sig.saveToGenericStringStorage(storage, instance, Boolean(keyPair === null || keyPair === void 0 ? void 0 : keyPair.publicKey))];
                    case 4:
                        _b.sent();
                        return [2 /*return*/, sig];
                }
            });
        });
    };
    return FhevmDecryptionSignature;
}());
exports.FhevmDecryptionSignature = FhevmDecryptionSignature;
_FhevmDecryptionSignature_publicKey = new WeakMap(), _FhevmDecryptionSignature_privateKey = new WeakMap(), _FhevmDecryptionSignature_signature = new WeakMap(), _FhevmDecryptionSignature_startTimestamp = new WeakMap(), _FhevmDecryptionSignature_durationDays = new WeakMap(), _FhevmDecryptionSignature_userAddress = new WeakMap(), _FhevmDecryptionSignature_contractAddresses = new WeakMap(), _FhevmDecryptionSignature_eip712 = new WeakMap();
