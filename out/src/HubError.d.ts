import { IHubError, HubErrorCode } from '@decentralized-identity/hub-common-js';
/**
 * Represents an error returned by an Identity Hub.
 */
export default class HubError extends Error {
    private body;
    private __hubError;
    /**
     * Indicates whether the passed-in object is a HubError instance.
     */
    static is(err: any): err is HubError;
    constructor(body: IHubError);
    /**
     * Returns the error code given by the Hub.
     */
    getErrorCode(): HubErrorCode;
    /**
     * Returns the error target (e.g. the property which is invalid).
     */
    getTarget(): string | undefined;
    /**
     * Returns the raw error JSON as provided by the Hub.
     */
    getRawError(): IHubError;
}
