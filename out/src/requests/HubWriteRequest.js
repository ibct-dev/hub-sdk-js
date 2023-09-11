"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HubRequest_1 = require("./HubRequest");
/**
 * Represents a request to commit the given Commit object to an Identity Hub.
 */
class HubCommitWriteRequest extends HubRequest_1.default {
    constructor(commit) {
        super('WriteRequest', {
            commit: commit.toFlattenedJson(),
        });
        // Needed for correctly determining type of HubSession#send(), to ensure
        // the different request classes aren't structurally compatible.
        this._isWriteRequest = true;
    }
}
exports.default = HubCommitWriteRequest;
//# sourceMappingURL=HubWriteRequest.js.map