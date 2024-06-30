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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SynthesizedError = void 0;
var TransmutedError_1 = require("./TransmutedError");
/**
 * Class representing a synthesized error, which is an error that is clearly identified and ready to be handled immediately.
 *
 * @extends TransmutedError
 */
var SynthesizedError = /** @class */ (function (_super) {
    __extends(SynthesizedError, _super);
    /**
     * Constructs a new SynthesizedError.
     *
     * @param {TransmutedErrorProps} props - The properties of the synthesized error.
     */
    function SynthesizedError(props) {
        var _this = _super.call(this, props) || this;
        // Set the prototype explicitly.
        Object.setPrototypeOf(_this, SynthesizedError.prototype);
        return _this;
    }
    return SynthesizedError;
}(TransmutedError_1.TransmutedError));
exports.SynthesizedError = SynthesizedError;
//# sourceMappingURL=SynthesizedError.js.map