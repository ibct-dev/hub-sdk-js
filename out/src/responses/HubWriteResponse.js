"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents the response to a `HubWriteRequest`.
 */
class HubWriteResponse {
    constructor(response) {
        this.response = response;
    }
    /**
     * Returns the list of known revisions for the object which was created/modified.
     */
    getRevisions() {
        return this.response.revisions;
    }
}
exports.default = HubWriteResponse;
//# sourceMappingURL=HubWriteResponse.js.map