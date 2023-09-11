import { IHubObjectQueryResponse } from '@decentralized-identity/hub-common-js';
/**
 * Represents the response to a `HubObjectQueryRequest`.
 */
export default class HubObjectQueryResponse {
    private response;
    constructor(json: IHubObjectQueryResponse);
    /**
     * Returns the set of objects returned by the Hub.
     *
     * TODO: Map JSON into useful objects, as done for commits.
     */
    getObjects(): import("@decentralized-identity/hub-common-js").IObjectMetadata[];
    /**
     * Indicates whether additional pages of results are available.
     */
    hasSkipToken(): boolean;
    /**
     * Retrieves a token which can be used to fetch subsequent result pages.
     */
    getSkipToken(): string | null;
}
