"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
var node_fetch_1 = require("node-fetch");
var Client = /** @class */ (function () {
    function Client(Authorization, BaseURL) {
        this.BaseURL = BaseURL || 'https://api.listenbrainz.org/';
        this.Authorization = Authorization;
    }
    Client.prototype.setAuthorization = function (Authorization) {
        this.Authorization = Authorization;
    };
    Client.prototype.getUserListens = function (user, options) {
        return __awaiter(this, void 0, void 0, function () {
            var r, data, payload, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, node_fetch_1.default(this.BaseURL + ("1/user/" + user + "/listens"))];
                    case 1:
                        r = _a.sent();
                        if (!(r.status === 200)) return [3 /*break*/, 3];
                        return [4 /*yield*/, r.json()];
                    case 2:
                        data = _a.sent();
                        payload = {
                            count: data.payload.count,
                            listens: data.payload.listens.map(function (i) {
                                var listen = {
                                    listened_at: i.listened_at,
                                    recording_msid: i.recording_msid,
                                    track_metadata: {
                                        artist_name: i.track_metadata.artist_name,
                                        track_name: i.track_metadata.track_name,
                                        release_name: i.track_metadata.additional_info.release_name,
                                        artist_mbids: i.track_metadata.additional_info.artist_mbids,
                                        artist_msid: i.track_metadata.additional_info.artist_msid,
                                        recording_mbid: i.track_metadata.additional_info.recording_mbid,
                                        release_mbid: i.track_metadata.additional_info.release_mbid,
                                        release_msid: i.track_metadata.additional_info.release_msid,
                                        tags: i.track_metadata.additional_info.tags,
                                    },
                                };
                                return listen.track_metadata;
                            })
                        };
                        response = {
                            RateLimit: {
                                Limit: parseInt(r.headers.get('x-ratelimit-limit')),
                                Remaining: parseInt(r.headers.get('x-ratelimit-remaining')),
                                Reset: parseInt(r.headers.get('x-ratelimit-reset')),
                                ResetIn: parseInt(r.headers.get('x-ratelimit-reset-in')),
                            },
                            Payload: payload
                        };
                        return [2 /*return*/, response];
                    case 3:
                        if (r.status === 429) {
                            throw 'hello';
                        }
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Client.prototype.getLatestImport = function (user, options) {
        return __awaiter(this, void 0, void 0, function () {
            var r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, node_fetch_1.default(this.BaseURL + ("1/latest-import?user_name=" + user))];
                    case 1:
                        r = _a.sent();
                        if (!(r.status === 200)) return [3 /*break*/, 3];
                        return [4 /*yield*/, r.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Client.prototype.submitListen = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var r, _a, _b, _c, _d, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        if (!this.Authorization) return [3 /*break*/, 8];
                        console.log(JSON.stringify(data));
                        return [4 /*yield*/, node_fetch_1.default(this.BaseURL + "1/submit-listens", {
                                method: 'POST',
                                body: JSON.stringify(data),
                                headers: { Authorization: 'Token ' + this.Authorization }
                            })];
                    case 1:
                        r = _g.sent();
                        if (!(r.status === 200)) return [3 /*break*/, 2];
                        return [2 /*return*/, { status: 200 }];
                    case 2:
                        if (!(r.status === 400)) return [3 /*break*/, 4];
                        _b = (_a = JSON).stringify;
                        return [4 /*yield*/, r.json()];
                    case 3: throw _b.apply(_a, [_g.sent()]);
                    case 4:
                        if (!(r.status === 401)) return [3 /*break*/, 6];
                        _d = (_c = JSON).stringify;
                        return [4 /*yield*/, r.json()];
                    case 5: throw _d.apply(_c, [_g.sent()]);
                    case 6:
                        _f = (_e = JSON).stringify;
                        return [4 /*yield*/, r.json()];
                    case 7: throw _f.apply(_e, [_g.sent()]);
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return Client;
}());
var client = new Client('61c463cd-ee23-47fc-a7ee-bf2ff339828b');
client.submitListen({
    "listen_type": "single",
    "payload": [{
            "listened_at": 1504630600,
            "track_metadata": {
                "artist_name": "Lady Gaga",
                "track_name": "ARTPOP",
            }
        }]
});
// client.getUserListens('kxze', {}); 
