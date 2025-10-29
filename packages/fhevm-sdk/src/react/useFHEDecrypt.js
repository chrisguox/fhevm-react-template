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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFHEDecrypt = void 0;
var react_1 = require("react");
var FhevmDecryptionSignature_js_1 = require("../FhevmDecryptionSignature.js");
var useFHEDecrypt = function (params) {
    var instance = params.instance, ethersSigner = params.ethersSigner, fhevmDecryptionSignatureStorage = params.fhevmDecryptionSignatureStorage, chainId = params.chainId, requests = params.requests;
    var _a = (0, react_1.useState)(false), isDecrypting = _a[0], setIsDecrypting = _a[1];
    var _b = (0, react_1.useState)(""), message = _b[0], setMessage = _b[1];
    var _c = (0, react_1.useState)({}), results = _c[0], setResults = _c[1];
    var _d = (0, react_1.useState)(null), error = _d[0], setError = _d[1];
    var isDecryptingRef = (0, react_1.useRef)(isDecrypting);
    var lastReqKeyRef = (0, react_1.useRef)("");
    var requestsKey = (0, react_1.useMemo)(function () {
        if (!requests || requests.length === 0)
            return "";
        var sorted = __spreadArray([], requests, true).sort(function (a, b) {
            return (a.handle + a.contractAddress).localeCompare(b.handle + b.contractAddress);
        });
        return JSON.stringify(sorted);
    }, [requests]);
    var canDecrypt = (0, react_1.useMemo)(function () {
        return Boolean(instance && ethersSigner && requests && requests.length > 0 && !isDecrypting);
    }, [instance, ethersSigner, requests, isDecrypting]);
    var decrypt = (0, react_1.useCallback)(function () {
        if (isDecryptingRef.current)
            return;
        if (!instance || !ethersSigner || !requests || requests.length === 0)
            return;
        var thisChainId = chainId;
        var thisSigner = ethersSigner;
        var thisRequests = requests;
        // Capture the current requests key to avoid false "stale" detection on first run
        lastReqKeyRef.current = requestsKey;
        isDecryptingRef.current = true;
        setIsDecrypting(true);
        setMessage("Start decrypt");
        setError(null);
        var run = function () { return __awaiter(void 0, void 0, void 0, function () {
            var isStale, uniqueAddresses, sig, mutableReqs, res, e_1, err, code, msg, e_2, err, code, msg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isStale = function () {
                            return thisChainId !== chainId || thisSigner !== ethersSigner || requestsKey !== lastReqKeyRef.current;
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, 8, 9]);
                        uniqueAddresses = Array.from(new Set(thisRequests.map(function (r) { return r.contractAddress; })));
                        return [4 /*yield*/, FhevmDecryptionSignature_js_1.FhevmDecryptionSignature.loadOrSign(instance, uniqueAddresses, ethersSigner, fhevmDecryptionSignatureStorage)];
                    case 2:
                        sig = _a.sent();
                        if (!sig) {
                            setMessage("Unable to build FHEVM decryption signature");
                            setError("SIGNATURE_ERROR: Failed to create decryption signature");
                            return [2 /*return*/];
                        }
                        if (isStale()) {
                            setMessage("Ignore FHEVM decryption");
                            return [2 /*return*/];
                        }
                        setMessage("Call FHEVM userDecrypt...");
                        mutableReqs = thisRequests.map(function (r) { return ({ handle: r.handle, contractAddress: r.contractAddress }); });
                        res = {};
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, instance.userDecrypt(mutableReqs, sig.privateKey, sig.publicKey, sig.signature, sig.contractAddresses, sig.userAddress, sig.startTimestamp, sig.durationDays)];
                    case 4:
                        res = _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        e_1 = _a.sent();
                        err = e_1;
                        code = err && typeof err === "object" && "name" in err ? err.name : "DECRYPT_ERROR";
                        msg = err && typeof err === "object" && "message" in err ? err.message : "Decryption failed";
                        setError("".concat(code, ": ").concat(msg));
                        setMessage("FHEVM userDecrypt failed");
                        return [2 /*return*/];
                    case 6:
                        setMessage("FHEVM userDecrypt completed!");
                        if (isStale()) {
                            setMessage("Ignore FHEVM decryption");
                            return [2 /*return*/];
                        }
                        setResults(res);
                        return [3 /*break*/, 9];
                    case 7:
                        e_2 = _a.sent();
                        err = e_2;
                        code = err && typeof err === "object" && "name" in err ? err.name : "UNKNOWN_ERROR";
                        msg = err && typeof err === "object" && "message" in err ? err.message : "Unknown error";
                        setError("".concat(code, ": ").concat(msg));
                        setMessage("FHEVM decryption errored");
                        return [3 /*break*/, 9];
                    case 8:
                        isDecryptingRef.current = false;
                        setIsDecrypting(false);
                        lastReqKeyRef.current = requestsKey;
                        return [7 /*endfinally*/];
                    case 9: return [2 /*return*/];
                }
            });
        }); };
        run();
    }, [instance, ethersSigner, fhevmDecryptionSignatureStorage, chainId, requests, requestsKey]);
    return { canDecrypt: canDecrypt, decrypt: decrypt, isDecrypting: isDecrypting, message: message, results: results, error: error, setMessage: setMessage, setError: setError };
};
exports.useFHEDecrypt = useFHEDecrypt;
