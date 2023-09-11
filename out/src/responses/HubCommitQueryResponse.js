"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SignedCommit_1 = require("../SignedCommit");
/**
 * Represents the response to a `HubCommitQueryRequest`.
 */
class HubCommitQueryResponse {
    constructor(response) {
        this.response = response;
        if (response['@type'] !== 'CommitQueryResponse') {
            throw new Error('Unexpected response type; expected CommitQueryResponse');
        }
    }
    /**
     * Returns the set of commits returned by the Hub.
     */
    getCommits() {
        return this.response.commits.map((commit) => {
            return new SignedCommit_1.default(commit);
        });
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
exports.default = HubCommitQueryResponse;
//# sourceMappingURL=HubCommitQueryResponse.js.map