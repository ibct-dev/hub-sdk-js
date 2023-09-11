import { IHubObjectQueryOptions } from '@decentralized-identity/hub-common-js';
import HubRequest from './HubRequest';
/**
 * Represents a request to a Hub to query the available objects.
 */
export default class HubObjectQueryRequest extends HubRequest {
    private readonly _isObjectQueryRequest;
    constructor(queryOptions: IHubObjectQueryOptions);
}
