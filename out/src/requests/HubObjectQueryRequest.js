"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HubRequest_1 = require("./HubRequest");
/**
 * Represents a request to a Hub to query the available objects.
 */
class HubObjectQueryRequest extends HubRequest_1.default {
    constructor(queryOptions) {
        super('ObjectQueryRequest', {
            query: queryOptions,
        });
        // Needed for correctly determining type of HubSession#send(), to ensure
        // the different request classes aren't structurally compatible.
        this._isObjectQueryRequest = true;
    }
}
exports.default = HubObjectQueryRequest;
//# sourceMappingURL=HubObjectQueryRequest.js.map