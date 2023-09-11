"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HubRequest_1 = require("./HubRequest");
/**
 * Represents a request to a Hub for a set of commits.
 */
class HubCommitQueryRequest extends HubRequest_1.default {
    constructor(queryOptions) {
        super('CommitQueryRequest', {
            query: queryOptions,
        });
        // Needed for correctly determining type of HubSession#send(), to ensure
        // the different request classes aren't structurally compatible.
        this._isCommitQueryRequest = true;
    }
}
exports.default = HubCommitQueryRequest;
//# sourceMappingURL=HubCommitQueryRequest.js.map