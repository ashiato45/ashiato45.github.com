(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var polynomial_1 = require("./polynomial");
var Options = /** @class */ (function () {
    function Options(ln, c) {
        this.longname = ln;
        this.cutoff = c;
    }
    return Options;
}());
function variableToString(v, opt) {
    var n = v.name;
    if (opt.longname) {
        n = "(\\texttt{" + n + "})";
    }
    if (v.sub != undefined) {
        return n + "_{" + v.sub + "}";
    }
    else {
        return n;
    }
}
function exponentialToString(e, opt) {
    if (e.sup == 1) {
        return "" + variableToString(e.variable, opt);
    }
    else {
        return variableToString(e.variable, opt) + "^{" + e.sup + "}";
    }
}
function monomialToString(m, opt) {
    return m.map(function (x) { return exponentialToString(x, opt); }).join("");
}
function showFloat(f) {
    var s = f.toString();
    if (s.search("e") == -1) {
        return s;
    }
    else {
        var a = s.split("e");
        return a[0] + "\\times 10^{" + a[1] + "}";
    }
}
function termToString(t, opt) {
    return "(" + showFloat(t.coeff) + ")" + monomialToString(t.monomial, opt);
}
function toTeX(ts, opt) {
    function reduceTerms(ac, v) {
        if (opt.cutoff != null && Math.abs(v.coeff) < Math.pow(10, (opt.cutoff))) {
            return ac;
        }
        if (ac != "") {
            ac = ac.concat("+");
        }
        ac = ac.concat(termToString(v, opt));
        return ac;
    }
    return ts.reduce(reduceTerms, "");
}
function go() {
    var input = document.getElementById("txaInput").value;
    try {
        var cutoff = null;
        if (document.getElementById("chkCutoff").checked) {
            cutoff = parseInt(document.getElementById("txtCutoff").value);
        }
        var opt = new Options(document.getElementById("chkLongName").checked, cutoff);
        var sampleOutput = polynomial_1.parse(input, undefined)[0];
        document.getElementById("txaOutput").value =
            JSON.stringify(sampleOutput);
        var math = MathJax.Hub.getAllJax("divOutput")[0];
        var linebreak = document.getElementById("chkLinebreak").checked;
        MathJax.Hub.Config({
            CommonHTML: { linebreaks: { automatic: linebreak } },
            "HTML-CSS": { linebreaks: { automatic: linebreak } },
            SVG: { linebreaks: { automatic: linebreak } }
        });
        MathJax.Hub.Queue(["Text", math, "hoge"]);
        MathJax.Hub.Queue(["Text", math, toTeX(sampleOutput, opt)]);
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    }
    catch (ex) {
        document.getElementById("txaOutput").value =
            ex.toString();
    }
}
document.getElementById("btnGo").onclick = go;

},{"./polynomial":2}],2:[function(require,module,exports){
// tslint:disable:only-arrow-functions
// tslint:disable:object-literal-shorthand
// tslint:disable:trailing-comma
// tslint:disable:object-literal-sort-keys
// tslint:disable:one-variable-per-declaration
// tslint:disable:max-line-length
// tslint:disable:no-consecutive-blank-lines
// tslint:disable:align
// Generated by PEG.js v. 0.10.0 (ts-pegjs plugin v. 0.1.13 )
//
// https://pegjs.org/   https://github.com/metadevpro/ts-pegjs
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var SyntaxError = /** @class */ (function (_super) {
    __extends(SyntaxError, _super);
    function SyntaxError(message, expected, found, location) {
        var _this = _super.call(this) || this;
        _this.message = message;
        _this.expected = expected;
        _this.found = found;
        _this.location = location;
        _this.name = "SyntaxError";
        if (typeof Error.captureStackTrace === "function") {
            Error.captureStackTrace(_this, SyntaxError);
        }
        return _this;
    }
    SyntaxError.buildMessage = function (expected, found) {
        var DESCRIBE_EXPECTATION_FNS = {
            literal: function (expectation) {
                return "\"" + literalEscape(expectation.text) + "\"";
            },
            "class": function (expectation) {
                var escapedParts = expectation.parts.map(function (part) {
                    return Array.isArray(part)
                        ? classEscape(part[0]) + "-" + classEscape(part[1])
                        : classEscape(part);
                });
                return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
            },
            any: function () {
                return "any character";
            },
            end: function () {
                return "end of input";
            },
            other: function (expectation) {
                return expectation.description;
            }
        };
        function hex(ch) {
            return ch.charCodeAt(0).toString(16).toUpperCase();
        }
        function literalEscape(s) {
            return s
                .replace(/\\/g, "\\\\")
                .replace(/"/g, "\\\"")
                .replace(/\0/g, "\\0")
                .replace(/\t/g, "\\t")
                .replace(/\n/g, "\\n")
                .replace(/\r/g, "\\r")
                .replace(/[\x00-\x0F]/g, function (ch) { return "\\x0" + hex(ch); })
                .replace(/[\x10-\x1F\x7F-\x9F]/g, function (ch) { return "\\x" + hex(ch); });
        }
        function classEscape(s) {
            return s
                .replace(/\\/g, "\\\\")
                .replace(/\]/g, "\\]")
                .replace(/\^/g, "\\^")
                .replace(/-/g, "\\-")
                .replace(/\0/g, "\\0")
                .replace(/\t/g, "\\t")
                .replace(/\n/g, "\\n")
                .replace(/\r/g, "\\r")
                .replace(/[\x00-\x0F]/g, function (ch) { return "\\x0" + hex(ch); })
                .replace(/[\x10-\x1F\x7F-\x9F]/g, function (ch) { return "\\x" + hex(ch); });
        }
        function describeExpectation(expectation) {
            return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
        }
        function describeExpected(expected1) {
            var descriptions = expected1.map(describeExpectation);
            var i;
            var j;
            descriptions.sort();
            if (descriptions.length > 0) {
                for (i = 1, j = 1; i < descriptions.length; i++) {
                    if (descriptions[i - 1] !== descriptions[i]) {
                        descriptions[j] = descriptions[i];
                        j++;
                    }
                }
                descriptions.length = j;
            }
            switch (descriptions.length) {
                case 1:
                    return descriptions[0];
                case 2:
                    return descriptions[0] + " or " + descriptions[1];
                default:
                    return descriptions.slice(0, -1).join(", ")
                        + ", or "
                        + descriptions[descriptions.length - 1];
            }
        }
        function describeFound(found1) {
            return found1 ? "\"" + literalEscape(found1) + "\"" : "end of input";
        }
        return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
    };
    return SyntaxError;
}(Error));
exports.SyntaxError = SyntaxError;
function peg$parse(input, options) {
    options = options !== undefined ? options : {};
    var peg$FAILED = {};
    var peg$startRuleFunctions = { Polynomial: peg$parsePolynomial };
    var peg$startRuleFunction = peg$parsePolynomial;
    var peg$c0 = "*";
    var peg$c1 = peg$literalExpectation("*", false);
    var peg$c2 = function (c, m) {
        return { coeff: c, monomial: m };
    };
    var peg$c3 = function (c) {
        return { coeff: c, monomial: [] };
    };
    var peg$c4 = function (h, t) {
        var temp = [h];
        t.reduce(function (result, element) {
            temp.push(element[1]);
        }, temp);
        return temp;
    };
    var peg$c5 = "^";
    var peg$c6 = peg$literalExpectation("^", false);
    var peg$c7 = function (v, sup) {
        return { variable: v, sup: sup };
    };
    var peg$c8 = function (v) {
        return { variable: v, sup: 1 };
    };
    var peg$c9 = function (n, sub) {
        return { name: n, sub: sub };
    };
    var peg$c10 = function () { return { name: text() }; };
    var peg$c11 = /^[a-z,A-Z]/;
    var peg$c12 = peg$classExpectation([["a", "z"], ",", ["A", "Z"]], false, false);
    var peg$c13 = function () { return text(); };
    var peg$c14 = "+";
    var peg$c15 = peg$literalExpectation("+", false);
    var peg$c16 = "-";
    var peg$c17 = peg$literalExpectation("-", false);
    var peg$c18 = "";
    var peg$c19 = function (sign, n) {
        if (sign === "-") {
            return -n;
        }
        return n;
    };
    var peg$c20 = "e";
    var peg$c21 = peg$literalExpectation("e", false);
    var peg$c22 = "E";
    var peg$c23 = peg$literalExpectation("E", false);
    var peg$c24 = function (n, b) {
        return parseFloat(n + "e" + b);
    };
    var peg$c25 = ".";
    var peg$c26 = peg$literalExpectation(".", false);
    var peg$c27 = function (intp, fracp) { return parseFloat(intp.toString() + "." + fracp.toString()); };
    var peg$c28 = function (signif) { return parseFloat(signif); };
    var peg$c29 = peg$otherExpectation("signedinteger");
    var peg$c30 = /^[0-9]/;
    var peg$c31 = peg$classExpectation([["0", "9"]], false, false);
    var peg$c32 = function (s, n) {
        var num = parseInt(n.join(""), 10);
        if (s === "-") {
            return -num;
        }
        return num;
    };
    var peg$c33 = peg$otherExpectation("integer");
    var peg$c34 = function () { return parseInt(text(), 10); };
    var peg$c35 = peg$otherExpectation("whitespace");
    var peg$c36 = /^[ \t\n\r]/;
    var peg$c37 = peg$classExpectation([" ", "\t", "\n", "\r"], false, false);
    var peg$currPos = 0;
    var peg$savedPos = 0;
    var peg$posDetailsCache = [{ line: 1, column: 1 }];
    var peg$maxFailPos = 0;
    var peg$maxFailExpected = [];
    var peg$silentFails = 0;
    var peg$resultsCache = {};
    var peg$result;
    if ("startRule" in options) {
        if (!(options.startRule in peg$startRuleFunctions)) {
            throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
        }
        peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }
    function text() {
        return input.substring(peg$savedPos, peg$currPos);
    }
    function location() {
        return peg$computeLocation(peg$savedPos, peg$currPos);
    }
    function expected(description, location1) {
        location1 = location1 !== undefined
            ? location1
            : peg$computeLocation(peg$savedPos, peg$currPos);
        throw peg$buildStructuredError([peg$otherExpectation(description)], input.substring(peg$savedPos, peg$currPos), location1);
    }
    function error(message, location1) {
        location1 = location1 !== undefined
            ? location1
            : peg$computeLocation(peg$savedPos, peg$currPos);
        throw peg$buildSimpleError(message, location1);
    }
    function peg$literalExpectation(text1, ignoreCase) {
        return { type: "literal", text: text1, ignoreCase: ignoreCase };
    }
    function peg$classExpectation(parts, inverted, ignoreCase) {
        return { type: "class", parts: parts, inverted: inverted, ignoreCase: ignoreCase };
    }
    function peg$anyExpectation() {
        return { type: "any" };
    }
    function peg$endExpectation() {
        return { type: "end" };
    }
    function peg$otherExpectation(description) {
        return { type: "other", description: description };
    }
    function peg$computePosDetails(pos) {
        var details = peg$posDetailsCache[pos];
        var p;
        if (details) {
            return details;
        }
        else {
            p = pos - 1;
            while (!peg$posDetailsCache[p]) {
                p--;
            }
            details = peg$posDetailsCache[p];
            details = {
                line: details.line,
                column: details.column
            };
            while (p < pos) {
                if (input.charCodeAt(p) === 10) {
                    details.line++;
                    details.column = 1;
                }
                else {
                    details.column++;
                }
                p++;
            }
            peg$posDetailsCache[pos] = details;
            return details;
        }
    }
    function peg$computeLocation(startPos, endPos) {
        var startPosDetails = peg$computePosDetails(startPos);
        var endPosDetails = peg$computePosDetails(endPos);
        return {
            start: {
                offset: startPos,
                line: startPosDetails.line,
                column: startPosDetails.column
            },
            end: {
                offset: endPos,
                line: endPosDetails.line,
                column: endPosDetails.column
            }
        };
    }
    function peg$fail(expected1) {
        if (peg$currPos < peg$maxFailPos) {
            return;
        }
        if (peg$currPos > peg$maxFailPos) {
            peg$maxFailPos = peg$currPos;
            peg$maxFailExpected = [];
        }
        peg$maxFailExpected.push(expected1);
    }
    function peg$buildSimpleError(message, location1) {
        return new SyntaxError(message, "", "", location1);
    }
    function peg$buildStructuredError(expected1, found, location1) {
        return new SyntaxError(SyntaxError.buildMessage(expected1, found), expected1, found, location1);
    }
    function peg$parsePolynomial() {
        var s0, s1, s2;
        var key = peg$currPos * 12 + 0;
        var cached = peg$resultsCache[key];
        if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
        }
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$parseTerm();
        while (s2 !== peg$FAILED) {
            s1.push(s2);
            s2 = peg$parseTerm();
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parse_();
            if (s2 !== peg$FAILED) {
                s1 = [s1, s2];
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        peg$resultsCache[key] = { nextPos: peg$currPos, result: s0 };
        return s0;
    }
    function peg$parseTerm() {
        var s0, s1, s2, s3;
        var key = peg$currPos * 12 + 1;
        var cached = peg$resultsCache[key];
        if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
        }
        s0 = peg$currPos;
        s1 = peg$parseSignedNumber();
        if (s1 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 42) {
                s2 = peg$c0;
                peg$currPos++;
            }
            else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c1);
                }
            }
            if (s2 !== peg$FAILED) {
                s3 = peg$parseMonomial();
                if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c2(s1, s3);
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = peg$parseSignedNumber();
            if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c3(s1);
            }
            s0 = s1;
        }
        peg$resultsCache[key] = { nextPos: peg$currPos, result: s0 };
        return s0;
    }
    function peg$parseMonomial() {
        var s0, s1, s2, s3, s4, s5;
        var key = peg$currPos * 12 + 2;
        var cached = peg$resultsCache[key];
        if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
        }
        s0 = peg$currPos;
        s1 = peg$parseExponential();
        if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 42) {
                s4 = peg$c0;
                peg$currPos++;
            }
            else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c1);
                }
            }
            if (s4 !== peg$FAILED) {
                s5 = peg$parseExponential();
                if (s5 !== peg$FAILED) {
                    s4 = [s4, s5];
                    s3 = s4;
                }
                else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s3;
                s3 = peg$FAILED;
            }
            while (s3 !== peg$FAILED) {
                s2.push(s3);
                s3 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 42) {
                    s4 = peg$c0;
                    peg$currPos++;
                }
                else {
                    s4 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c1);
                    }
                }
                if (s4 !== peg$FAILED) {
                    s5 = peg$parseExponential();
                    if (s5 !== peg$FAILED) {
                        s4 = [s4, s5];
                        s3 = s4;
                    }
                    else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
            }
            if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c4(s1, s2);
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        peg$resultsCache[key] = { nextPos: peg$currPos, result: s0 };
        return s0;
    }
    function peg$parseExponential() {
        var s0, s1, s2, s3;
        var key = peg$currPos * 12 + 3;
        var cached = peg$resultsCache[key];
        if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
        }
        s0 = peg$currPos;
        s1 = peg$parseVariable();
        if (s1 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 94) {
                s2 = peg$c5;
                peg$currPos++;
            }
            else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c6);
                }
            }
            if (s2 !== peg$FAILED) {
                s3 = peg$parseInteger();
                if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c7(s1, s3);
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = peg$parseVariable();
            if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c8(s1);
            }
            s0 = s1;
        }
        peg$resultsCache[key] = { nextPos: peg$currPos, result: s0 };
        return s0;
    }
    function peg$parseVariable() {
        var s0, s1, s2;
        var key = peg$currPos * 12 + 4;
        var cached = peg$resultsCache[key];
        if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
        }
        s0 = peg$currPos;
        s1 = peg$parseVariableMain();
        if (s1 !== peg$FAILED) {
            s2 = peg$parseInteger();
            if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c9(s1, s2);
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = peg$parseVariableMain();
            if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c10();
            }
            s0 = s1;
        }
        peg$resultsCache[key] = { nextPos: peg$currPos, result: s0 };
        return s0;
    }
    function peg$parseVariableMain() {
        var s0, s1, s2;
        var key = peg$currPos * 12 + 5;
        var cached = peg$resultsCache[key];
        if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
        }
        s0 = peg$currPos;
        s1 = [];
        if (peg$c11.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
        }
        else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c12);
            }
        }
        if (s2 !== peg$FAILED) {
            while (s2 !== peg$FAILED) {
                s1.push(s2);
                if (peg$c11.test(input.charAt(peg$currPos))) {
                    s2 = input.charAt(peg$currPos);
                    peg$currPos++;
                }
                else {
                    s2 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c12);
                    }
                }
            }
        }
        else {
            s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c13();
        }
        s0 = s1;
        peg$resultsCache[key] = { nextPos: peg$currPos, result: s0 };
        return s0;
    }
    function peg$parseSignedNumber() {
        var s0, s1, s2, s3;
        var key = peg$currPos * 12 + 6;
        var cached = peg$resultsCache[key];
        if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
        }
        s0 = peg$currPos;
        s1 = peg$parse_();
        if (s1 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 43) {
                s2 = peg$c14;
                peg$currPos++;
            }
            else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c15);
                }
            }
            if (s2 === peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 45) {
                    s2 = peg$c16;
                    peg$currPos++;
                }
                else {
                    s2 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c17);
                    }
                }
                if (s2 === peg$FAILED) {
                    s2 = peg$c18;
                }
            }
            if (s2 !== peg$FAILED) {
                s3 = peg$parseNumberE();
                if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c19(s2, s3);
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        peg$resultsCache[key] = { nextPos: peg$currPos, result: s0 };
        return s0;
    }
    function peg$parseNumberE() {
        var s0, s1, s2, s3;
        var key = peg$currPos * 12 + 7;
        var cached = peg$resultsCache[key];
        if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
        }
        s0 = peg$currPos;
        s1 = peg$parseNumber();
        if (s1 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 101) {
                s2 = peg$c20;
                peg$currPos++;
            }
            else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c21);
                }
            }
            if (s2 === peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 69) {
                    s2 = peg$c22;
                    peg$currPos++;
                }
                else {
                    s2 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c23);
                    }
                }
            }
            if (s2 !== peg$FAILED) {
                s3 = peg$parseSignedInteger();
                if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c24(s1, s3);
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
            s0 = peg$parseNumber();
        }
        peg$resultsCache[key] = { nextPos: peg$currPos, result: s0 };
        return s0;
    }
    function peg$parseNumber() {
        var s0, s1, s2, s3;
        var key = peg$currPos * 12 + 8;
        var cached = peg$resultsCache[key];
        if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
        }
        s0 = peg$currPos;
        s1 = peg$parseInteger();
        if (s1 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 46) {
                s2 = peg$c25;
                peg$currPos++;
            }
            else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c26);
                }
            }
            if (s2 !== peg$FAILED) {
                s3 = peg$parseInteger();
                if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c27(s1, s3);
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = peg$parseInteger();
            if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c28(s1);
            }
            s0 = s1;
        }
        peg$resultsCache[key] = { nextPos: peg$currPos, result: s0 };
        return s0;
    }
    function peg$parseSignedInteger() {
        var s0, s1, s2, s3;
        var key = peg$currPos * 12 + 9;
        var cached = peg$resultsCache[key];
        if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
        }
        peg$silentFails++;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 43) {
            s1 = peg$c14;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c15);
            }
        }
        if (s1 === peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 45) {
                s1 = peg$c16;
                peg$currPos++;
            }
            else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c17);
                }
            }
            if (s1 === peg$FAILED) {
                s1 = peg$c18;
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = [];
            if (peg$c30.test(input.charAt(peg$currPos))) {
                s3 = input.charAt(peg$currPos);
                peg$currPos++;
            }
            else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c31);
                }
            }
            if (s3 !== peg$FAILED) {
                while (s3 !== peg$FAILED) {
                    s2.push(s3);
                    if (peg$c30.test(input.charAt(peg$currPos))) {
                        s3 = input.charAt(peg$currPos);
                        peg$currPos++;
                    }
                    else {
                        s3 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c31);
                        }
                    }
                }
            }
            else {
                s2 = peg$FAILED;
            }
            if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c32(s1, s2);
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c29);
            }
        }
        peg$resultsCache[key] = { nextPos: peg$currPos, result: s0 };
        return s0;
    }
    function peg$parseInteger() {
        var s0, s1, s2;
        var key = peg$currPos * 12 + 10;
        var cached = peg$resultsCache[key];
        if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
        }
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = [];
        if (peg$c30.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
        }
        else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c31);
            }
        }
        if (s2 !== peg$FAILED) {
            while (s2 !== peg$FAILED) {
                s1.push(s2);
                if (peg$c30.test(input.charAt(peg$currPos))) {
                    s2 = input.charAt(peg$currPos);
                    peg$currPos++;
                }
                else {
                    s2 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c31);
                    }
                }
            }
        }
        else {
            s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c34();
        }
        s0 = s1;
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c33);
            }
        }
        peg$resultsCache[key] = { nextPos: peg$currPos, result: s0 };
        return s0;
    }
    function peg$parse_() {
        var s0, s1;
        var key = peg$currPos * 12 + 11;
        var cached = peg$resultsCache[key];
        if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
        }
        peg$silentFails++;
        s0 = [];
        if (peg$c36.test(input.charAt(peg$currPos))) {
            s1 = input.charAt(peg$currPos);
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c37);
            }
        }
        while (s1 !== peg$FAILED) {
            s0.push(s1);
            if (peg$c36.test(input.charAt(peg$currPos))) {
                s1 = input.charAt(peg$currPos);
                peg$currPos++;
            }
            else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c37);
                }
            }
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c35);
            }
        }
        peg$resultsCache[key] = { nextPos: peg$currPos, result: s0 };
        return s0;
    }
    peg$result = peg$startRuleFunction();
    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
        return peg$result;
    }
    else {
        if (peg$result !== peg$FAILED && peg$currPos < input.length) {
            peg$fail(peg$endExpectation());
        }
        throw peg$buildStructuredError(peg$maxFailExpected, peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null, peg$maxFailPos < input.length
            ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
            : peg$computeLocation(peg$maxFailPos, peg$maxFailPos));
    }
}
exports.parse = peg$parse;

},{}]},{},[1]);