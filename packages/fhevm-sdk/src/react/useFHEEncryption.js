"use client";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFHEEncryption = exports.buildParamsFromAbi = exports.toHex = exports.getEncryptionMethod = void 0;
var react_1 = require("react");
// Map external encrypted integer type to RelayerEncryptedInput builder method
var getEncryptionMethod = function (internalType) {
    switch (internalType) {
        case "externalEbool":
            return "addBool";
        case "externalEuint8":
            return "add8";
        case "externalEuint16":
            return "add16";
        case "externalEuint32":
            return "add32";
        case "externalEuint64":
            return "add64";
        case "externalEuint128":
            return "add128";
        case "externalEuint256":
            return "add256";
        case "externalEaddress":
            return "addAddress";
        default:
            console.warn("Unknown internalType: ".concat(internalType, ", defaulting to add64"));
            return "add64";
    }
};
exports.getEncryptionMethod = getEncryptionMethod;
// Convert Uint8Array or hex-like string to 0x-prefixed hex string
var toHex = function (value) {
    if (typeof value === "string") {
        return (value.startsWith("0x") ? value : "0x".concat(value));
    }
    // value is Uint8Array
    return ("0x" + Buffer.from(value).toString("hex"));
};
exports.toHex = toHex;
// Build contract params from EncryptResult and ABI for a given function
var buildParamsFromAbi = function (enc, abi, functionName) {
    var fn = abi.find(function (item) { return item.type === "function" && item.name === functionName; });
    if (!fn)
        throw new Error("Function ABI not found for ".concat(functionName));
    return fn.inputs.map(function (input, index) {
        var raw = index === 0 ? enc.handles[0] : enc.inputProof;
        switch (input.type) {
            case "bytes32":
            case "bytes":
                return (0, exports.toHex)(raw);
            case "uint256":
                return BigInt(raw);
            case "address":
            case "string":
                return raw;
            case "bool":
                return Boolean(raw);
            default:
                console.warn("Unknown ABI param type ".concat(input.type, "; passing as hex"));
                return (0, exports.toHex)(raw);
        }
    });
};
exports.buildParamsFromAbi = buildParamsFromAbi;
var useFHEEncryption = function (params) {
    var instance = params.instance, ethersSigner = params.ethersSigner, contractAddress = params.contractAddress;
    var canEncrypt = (0, react_1.useMemo)(function () { return Boolean(instance && ethersSigner && contractAddress); }, [instance, ethersSigner, contractAddress]);
    var encryptWith = (0, react_1.useCallback)(function (buildFn) { return __awaiter(void 0, void 0, void 0, function () {
        var userAddress, input, enc;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!instance || !ethersSigner || !contractAddress)
                        return [2 /*return*/, undefined];
                    return [4 /*yield*/, ethersSigner.getAddress()];
                case 1:
                    userAddress = _a.sent();
                    input = instance.createEncryptedInput(contractAddress, userAddress);
                    buildFn(input);
                    return [4 /*yield*/, input.encrypt()];
                case 2:
                    enc = _a.sent();
                    return [2 /*return*/, enc];
            }
        });
    }); }, [instance, ethersSigner, contractAddress]);
    return {
        canEncrypt: canEncrypt,
        encryptWith: encryptWith,
    };
};
exports.useFHEEncryption = useFHEEncryption;
