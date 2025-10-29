"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.createFhevmInstance = exports.FhevmAbortError = exports.FhevmReactError = void 0;
var ethers_1 = require("ethers");
var RelayerSDKLoader_1 = require("./RelayerSDKLoader");
var PublicKeyStorage_1 = require("./PublicKeyStorage");
var FhevmReactError = /** @class */ (function (_super) {
    __extends(FhevmReactError, _super);
    function FhevmReactError(code, message, options) {
        var _this = _super.call(this, message, options) || this;
        _this.code = code;
        _this.name = "FhevmReactError";
        return _this;
    }
    return FhevmReactError;
}(Error));
exports.FhevmReactError = FhevmReactError;
function throwFhevmError(code, message, cause) {
    throw new FhevmReactError(code, message, cause ? { cause: cause } : undefined);
}
var isFhevmInitialized = function () {
    if (!(0, RelayerSDKLoader_1.isFhevmWindowType)(window, console.log)) {
        return false;
    }
    return window.relayerSDK.__initialized__ === true;
};
var fhevmLoadSDK = function () {
    var loader = new RelayerSDKLoader_1.RelayerSDKLoader({ trace: console.log });
    return loader.load();
};
var fhevmInitSDK = function (options) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(0, RelayerSDKLoader_1.isFhevmWindowType)(window, console.log)) {
                    throw new Error("window.relayerSDK is not available");
                }
                return [4 /*yield*/, window.relayerSDK.initSDK(options)];
            case 1:
                result = _a.sent();
                window.relayerSDK.__initialized__ = result;
                if (!result) {
                    throw new Error("window.relayerSDK.initSDK failed.");
                }
                return [2 /*return*/, true];
        }
    });
}); };
function checkIsAddress(a) {
    if (typeof a !== "string") {
        return false;
    }
    if (!(0, ethers_1.isAddress)(a)) {
        return false;
    }
    return true;
}
var FhevmAbortError = /** @class */ (function (_super) {
    __extends(FhevmAbortError, _super);
    function FhevmAbortError(message) {
        if (message === void 0) { message = "FHEVM operation was cancelled"; }
        var _this = _super.call(this, message) || this;
        _this.name = "FhevmAbortError";
        return _this;
    }
    return FhevmAbortError;
}(Error));
exports.FhevmAbortError = FhevmAbortError;
function getChainId(providerOrUrl) {
    return __awaiter(this, void 0, void 0, function () {
        var provider, _a, chainId;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!(typeof providerOrUrl === "string")) return [3 /*break*/, 2];
                    provider = new ethers_1.JsonRpcProvider(providerOrUrl);
                    _a = Number;
                    return [4 /*yield*/, provider.getNetwork()];
                case 1: return [2 /*return*/, _a.apply(void 0, [(_b.sent()).chainId])];
                case 2: return [4 /*yield*/, providerOrUrl.request({ method: "eth_chainId" })];
                case 3:
                    chainId = _b.sent();
                    return [2 /*return*/, Number.parseInt(chainId, 16)];
            }
        });
    });
}
function getWeb3Client(rpcUrl) {
    return __awaiter(this, void 0, void 0, function () {
        var rpc, version, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    rpc = new ethers_1.JsonRpcProvider(rpcUrl);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, rpc.send("web3_clientVersion", [])];
                case 2:
                    version = _a.sent();
                    return [2 /*return*/, version];
                case 3:
                    e_1 = _a.sent();
                    throwFhevmError("WEB3_CLIENTVERSION_ERROR", "The URL ".concat(rpcUrl, " is not a Web3 node or is not reachable. Please check the endpoint."), e_1);
                    return [3 /*break*/, 5];
                case 4:
                    rpc.destroy();
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function tryFetchFHEVMHardhatNodeRelayerMetadata(rpcUrl) {
    return __awaiter(this, void 0, void 0, function () {
        var version, metadata, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, getWeb3Client(rpcUrl)];
                case 1:
                    version = _b.sent();
                    if (typeof version !== "string" ||
                        !version.toLowerCase().includes("hardhat")) {
                        // Not a Hardhat Node
                        return [2 /*return*/, undefined];
                    }
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, getFHEVMRelayerMetadata(rpcUrl)];
                case 3:
                    metadata = _b.sent();
                    if (!metadata || typeof metadata !== "object") {
                        return [2 /*return*/, undefined];
                    }
                    if (!("ACLAddress" in metadata &&
                        typeof metadata.ACLAddress === "string" &&
                        metadata.ACLAddress.startsWith("0x"))) {
                        return [2 /*return*/, undefined];
                    }
                    if (!("InputVerifierAddress" in metadata &&
                        typeof metadata.InputVerifierAddress === "string" &&
                        metadata.InputVerifierAddress.startsWith("0x"))) {
                        return [2 /*return*/, undefined];
                    }
                    if (!("KMSVerifierAddress" in metadata &&
                        typeof metadata.KMSVerifierAddress === "string" &&
                        metadata.KMSVerifierAddress.startsWith("0x"))) {
                        return [2 /*return*/, undefined];
                    }
                    return [2 /*return*/, metadata];
                case 4:
                    _a = _b.sent();
                    // Not a FHEVM Hardhat Node
                    return [2 /*return*/, undefined];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function getFHEVMRelayerMetadata(rpcUrl) {
    return __awaiter(this, void 0, void 0, function () {
        var rpc, version, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    rpc = new ethers_1.JsonRpcProvider(rpcUrl);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, rpc.send("fhevm_relayer_metadata", [])];
                case 2:
                    version = _a.sent();
                    return [2 /*return*/, version];
                case 3:
                    e_2 = _a.sent();
                    throwFhevmError("FHEVM_RELAYER_METADATA_ERROR", "The URL ".concat(rpcUrl, " is not a FHEVM Hardhat node or is not reachable. Please check the endpoint."), e_2);
                    return [3 /*break*/, 5];
                case 4:
                    rpc.destroy();
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function resolve(providerOrUrl, mockChains) {
    return __awaiter(this, void 0, void 0, function () {
        var chainId, rpcUrl, _mockChains;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getChainId(providerOrUrl)];
                case 1:
                    chainId = _a.sent();
                    rpcUrl = typeof providerOrUrl === "string" ? providerOrUrl : undefined;
                    _mockChains = __assign({ 31337: "http://localhost:8545" }, (mockChains !== null && mockChains !== void 0 ? mockChains : {}));
                    // Help Typescript solver here:
                    if (Object.hasOwn(_mockChains, chainId)) {
                        if (!rpcUrl) {
                            rpcUrl = _mockChains[chainId];
                        }
                        return [2 /*return*/, { isMock: true, chainId: chainId, rpcUrl: rpcUrl }];
                    }
                    return [2 /*return*/, { isMock: false, chainId: chainId, rpcUrl: rpcUrl }];
            }
        });
    });
}
var createFhevmInstance = function (parameters) { return __awaiter(void 0, void 0, void 0, function () {
    var throwIfAborted, notify, signal, onStatusChange, providerOrUrl, mockChains, _a, isMock, rpcUrl, chainId, fhevmRelayerMetadata, fhevmMock, mockInstance, relayerSDK, aclAddress, pub, config, instance;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                throwIfAborted = function () {
                    if (signal.aborted)
                        throw new FhevmAbortError();
                };
                notify = function (status) {
                    if (onStatusChange)
                        onStatusChange(status);
                };
                signal = parameters.signal, onStatusChange = parameters.onStatusChange, providerOrUrl = parameters.provider, mockChains = parameters.mockChains;
                return [4 /*yield*/, resolve(providerOrUrl, mockChains)];
            case 1:
                _a = _b.sent(), isMock = _a.isMock, rpcUrl = _a.rpcUrl, chainId = _a.chainId;
                if (!isMock) return [3 /*break*/, 5];
                return [4 /*yield*/, tryFetchFHEVMHardhatNodeRelayerMetadata(rpcUrl)];
            case 2:
                fhevmRelayerMetadata = _b.sent();
                if (!fhevmRelayerMetadata) return [3 /*break*/, 5];
                // fhevmRelayerMetadata is defined, which means rpcUrl refers to a FHEVM Hardhat Node
                notify("creating");
                return [4 /*yield*/, Promise.resolve().then(function () { return require("./mock/fhevmMock"); })];
            case 3:
                fhevmMock = _b.sent();
                return [4 /*yield*/, fhevmMock.fhevmMockCreateInstance({
                        rpcUrl: rpcUrl,
                        chainId: chainId,
                        metadata: fhevmRelayerMetadata,
                    })];
            case 4:
                mockInstance = _b.sent();
                throwIfAborted();
                return [2 /*return*/, mockInstance];
            case 5:
                throwIfAborted();
                if (!!(0, RelayerSDKLoader_1.isFhevmWindowType)(window, console.log)) return [3 /*break*/, 7];
                notify("sdk-loading");
                // throws an error if failed
                return [4 /*yield*/, fhevmLoadSDK()];
            case 6:
                // throws an error if failed
                _b.sent();
                throwIfAborted();
                notify("sdk-loaded");
                _b.label = 7;
            case 7:
                if (!!isFhevmInitialized()) return [3 /*break*/, 9];
                notify("sdk-initializing");
                // throws an error if failed
                return [4 /*yield*/, fhevmInitSDK()];
            case 8:
                // throws an error if failed
                _b.sent();
                throwIfAborted();
                notify("sdk-initialized");
                _b.label = 9;
            case 9:
                relayerSDK = window.relayerSDK;
                aclAddress = relayerSDK.SepoliaConfig.aclContractAddress;
                if (!checkIsAddress(aclAddress)) {
                    throw new Error("Invalid address: ".concat(aclAddress));
                }
                return [4 /*yield*/, (0, PublicKeyStorage_1.publicKeyStorageGet)(aclAddress)];
            case 10:
                pub = _b.sent();
                throwIfAborted();
                config = __assign(__assign({}, relayerSDK.SepoliaConfig), { network: providerOrUrl, publicKey: pub.publicKey, publicParams: pub.publicParams });
                // notify that state === "creating"
                notify("creating");
                return [4 /*yield*/, relayerSDK.createInstance(config)];
            case 11:
                instance = _b.sent();
                // Save the key even if aborted
                return [4 /*yield*/, (0, PublicKeyStorage_1.publicKeyStorageSet)(aclAddress, instance.getPublicKey(), instance.getPublicParams(2048))];
            case 12:
                // Save the key even if aborted
                _b.sent();
                throwIfAborted();
                return [2 /*return*/, instance];
        }
    });
}); };
exports.createFhevmInstance = createFhevmInstance;
