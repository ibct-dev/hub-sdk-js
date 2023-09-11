/**
 * The base class for all requests to an Identity Hub.
 */
export default class HubRequest {
    private requestType;
    private requestBody;
    constructor(requestType: string, requestBody?: any);
    /**
     * Returns the raw request JSON which will be sent to the Hub.
     */
    getRequestJson(): Promise<any>;
}
