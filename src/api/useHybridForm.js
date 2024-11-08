"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useHybridForm;
var react_1 = require("react");
function useHybridForm() {
    var form = {};
    var fieldRefs = (0, react_1.useRef)({});
    var register = function (key) { return function (fieldRef) {
        if (fieldRef) {
            fieldRefs.current[key] = fieldRef;
        }
    }; };
    var getFormData = function () {
        var isValid = true;
        Object.entries(fieldRefs.current).forEach(function (_a) {
            var key = _a[0], fieldRef = _a[1];
            if (fieldRef.validate && !fieldRef.validate()) {
                isValid = false;
            }
            else {
                form[key] = fieldRef.getValue();
            }
        });
        return isValid ? form : null;
    };
    var resetForm = function () {
        Object.values(fieldRefs.current).forEach(function (fieldRef) {
            fieldRef.reset();
        });
    };
    return [register, getFormData, resetForm];
}
