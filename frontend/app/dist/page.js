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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
exports.__esModule = true;
var react_1 = require("react");
var navbar_1 = require("@/components/navbar");
var footer_1 = require("@/components/footer");
var hero_section_1 = require("@/components/hero-section");
var features_section_1 = require("@/components/features-section");
var stats_section_1 = require("@/components/stats-section");
function Home() {
    var _a = react_1.useState(null), result = _a[0], setResult = _a[1];
    var _b = react_1.useState(false), isLoading = _b[0], setIsLoading = _b[1];
    function handleHealthFormSubmit(formData) {
        return __awaiter(this, void 0, void 0, function () {
            var payload, res, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setIsLoading(true);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, 5, 6]);
                        payload = {
                            Age: Number(formData.age),
                            BMI: Number(formData.bmi),
                            Irregular_Periods: formData.cycleType === "irregular" ? 1 : 0,
                            Unusual_Bleeding: 0,
                            number_of_peak: formData.weightChange ? 3 : 1,
                            Menses_score: (formData.acne ? 1 : 0) +
                                (formData.hairGrowth ? 1 : 0) +
                                (formData.hairThinning ? 1 : 0)
                        };
                        return [4 /*yield*/, fetch("http://localhost:5000/api/predict", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(payload)
                            })];
                    case 2:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()
                            // 3) Show the result returned by the Python script
                        ];
                    case 3:
                        data = _a.sent();
                        // 3) Show the result returned by the Python script
                        if (data.success && data.prediction) {
                            setResult({
                                risk: data.prediction.risk,
                                risk_score: data.prediction.risk_score
                            });
                        }
                        return [3 /*break*/, 6];
                    case 4:
                        error_1 = _a.sent();
                        console.error("Error connecting to backend:", error_1);
                        alert("Make sure your backend is running on port 5000!");
                        return [3 /*break*/, 6];
                    case 5:
                        setIsLoading(false);
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    }
    return (React.createElement("div", { className: "flex min-h-screen flex-col" },
        React.createElement(navbar_1.Navbar, null),
        React.createElement("main", { className: "flex-1" },
            React.createElement(hero_section_1.HeroSection, null),
            React.createElement(stats_section_1.StatsSection, null),
            React.createElement(features_section_1.FeaturesSection, null)),
        React.createElement(footer_1.Footer, null)));
}
exports["default"] = Home;
