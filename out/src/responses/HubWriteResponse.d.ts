import { IHubWriteResponse } from '@decentralized-identity/hub-common-js';
/**
 * Represents the response to a `HubWriteRequest`.
 */
export default class HubWriteResponse {
    private response;
    constructor(response: IHubWriteResponse);
    /**
     * Returns the list of known revisions for the object which was created/modified.
     */
    getRevisions(): string[];
}
