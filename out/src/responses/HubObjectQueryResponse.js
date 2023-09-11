"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents the response to a `HubObjectQueryRequest`.
 */
class HubObjectQueryResponse {
    constructor(json) {
        if (json['@type'] !== 'ObjectQueryResponse') {
            throw new Error('Unexpected response type; expected ObjectQueryResponse');
        }
        this.response = json;
    }
    /**
     * Returns the set of objects returned by the Hub.
     *
     * TODO: Map JSON into useful objects, as done for commits.
     */
    getObjects() {
        return this.response.objects || [];
    }
    /**
     * Indicates whether additional pages of results are available.
     */
    hasSkipToken() {
        return !!this.response.skip_token;
    }
    /**
     * Retrieves a token which can be used to fetch subsequent result pages.
     */
    getSkipToken() {
        return this.response.skip_token;
    }
}
exports.default = HubObjectQueryResponse;
//# sourceMappingURL=HubObjectQueryResponse.js.map