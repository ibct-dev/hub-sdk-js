import { IHubCommitQueryResponse } from '@decentralized-identity/hub-common-js';
import SignedCommit from '../SignedCommit';
/**
 * Represents the response to a `HubCommitQueryRequest`.
 */
export default class HubCommitQueryResponse {
    private response;
    constructor(response: IHubCommitQueryResponse);
    /**
     * Returns the set of commits returned by the Hub.
     */
    getCommits(): SignedCommit[];
    /**
     * Indicates whether additional pages of results are available.
     */
    hasSkipToken(): boolean;
    /**
     * Retrieves a token which can be used to fetch subsequent result pages.
     */
    getSkipToken(): string | null;
}
