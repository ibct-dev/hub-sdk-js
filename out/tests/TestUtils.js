"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
/**
 * Returns a clone of the given object with certain fields changed.
 *
 * @param original The original object to clone and modify.
 * @param adjustments An object containing fields to be replaced. Each key of the object is a field
 * to change, in dotted notation (e.g. `field` or `field.prop`). The value is the new value to set
 * for that key.
 */
exports.alter = (original, adjustments) => {
    const clone = _.cloneDeep(original);
    Object.keys(adjustments).forEach((fieldPath) => {
        const newValue = adjustments[fieldPath];
        (newValue !== undefined)
            ? _.set(clone, fieldPath, newValue)
            : _.unset(clone, fieldPath);
    });
    return clone;
};
/**
 * Returns a debug description of the given value.
 */
exports.explain = (value) => {
    if (Array.isArray(value)) {
        let joined = (value).map(item => exports.explain(item)).join(',');
        return `[${joined}]`;
    }
    else if (typeof value === 'string') {
        return `'${value}'`;
    }
    else if (value === null) {
        return 'null';
    }
    else if (value === undefined) {
        return 'undefined';
    }
    else if (typeof value === 'object') {
        return JSON.stringify(value);
    }
    return value.toString();
};
//# sourceMappingURL=TestUtils.js.map