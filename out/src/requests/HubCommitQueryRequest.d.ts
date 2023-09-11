import { IHubCommitQueryOptions } from '@decentralized-identity/hub-common-js';
import HubRequest from './HubRequest';
/**
 * Represents a request to a Hub for a set of commits.
 */
export default class HubCommitQueryRequest extends HubRequest {
    private readonly _isCommitQueryRequest;
    constructor(queryOptions: IHubCommitQueryOptions);
}
