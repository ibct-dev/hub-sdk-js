"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hub_common_js_1 = require("@decentralized-identity/hub-common-js");
const did_auth_jose_1 = require("@decentralized-identity/did-auth-jose");
const HubError_1 = require("./HubError");
const HubWriteResponse_1 = require("./responses/HubWriteResponse");
const HubObjectQueryResponse_1 = require("./responses/HubObjectQueryResponse");
const HubCommitQueryResponse_1 = require("./responses/HubCommitQueryResponse");
// tslint:disable-next-line:import-name
const node_fetch_1 = require("node-fetch");
/**
 * Represents a communication session with a particular Hub instance.
 */
class HubSession {
    constructor(options) {
        this.clientDid = options.clientDid;
        this.hubDid = options.hubDid;
        this.hubEndpoint = options.hubEndpoint;
        this.targetDid = options.targetDid;
        // Setup authentication context
        this.authentication = new did_auth_jose_1.Authentication({
            resolver: options.resolver,
            keyStore: options.keyStore,
            keyReferences: [options.clientPrivateKeyReference],
        });
    }
    async send(request) {
        const rawRequestJson = await request.getRequestJson();
        rawRequestJson.iss = this.clientDid;
        rawRequestJson.aud = this.hubDid;
        rawRequestJson.sub = this.targetDid;
        const rawRequestString = JSON.stringify(rawRequestJson);
        const accessToken = await this.getAccessToken();
        let responseString;
        try {
            responseString = await this.makeRequest(rawRequestString, accessToken);
        }
        catch (e) {
            // If the access token has expired, renew access token and retry
            if (HubError_1.default.is(e) && e.getErrorCode() === hub_common_js_1.HubErrorCode.AuthenticationFailed) {
                const newAccessToken = await this.refreshAccessToken();
                responseString = await this.makeRequest(rawRequestString, newAccessToken);
            }
            else {
                throw e;
            }
        }
        let responseObject;
        try {
            responseObject = JSON.parse(responseString);
        }
        catch (e) {
            throw new HubError_1.default({
                error_code: hub_common_js_1.HubErrorCode.ServerError,
                developer_message: `Unexpected error decoding JSON response: ${e.message}`,
                inner_error: e,
            });
        }
        return HubSession.mapResponseToObject(responseObject);
    }
    /**
     * Sends a raw (string) request body to the Hub and receives a response.
     *
     * @param message The raw request body to send.
     * @param accessToken The access token to include in the request, if any.
     */
    async makeRequest(message, accessToken) {
        const requestBuffer = await this.authentication.getAuthenticatedRequest(message, this.hubDid, accessToken);
        const res = await this.callFetch(this.hubEndpoint, {
            method: 'POST',
            body: requestBuffer,
            headers: {
                'Content-Type': 'application/jwt',
                'Content-Length': requestBuffer.length.toString(),
            },
        });
        if (res.status !== 200) {
            const errorResponse = await res.json();
            throw new HubError_1.default(errorResponse);
        }
        const response = await res.buffer();
        const plainResponse = await this.authentication.getVerifiedRequest(response, false);
        if (plainResponse instanceof Buffer) {
            // This should never happen as it means we are trying to return an access token in response
            throw new Error('Internal error during decryption.');
        }
        return plainResponse.request;
    }
    /**
     * Fetch API wrapper, to allow unit testing.
     *
     * @param url The URL to make a request to.
     * @param init Request initialization details.
     */
    async callFetch(url, init) {
        return node_fetch_1.default(url, init);
    }
    /**
     * Returns the current access token for the Hub, requesting one if necessary.
     */
    async getAccessToken() {
        if (this.currentAccessToken) {
            return this.currentAccessToken;
        }
        return this.refreshAccessToken();
    }
    /**
     * Requests an updated access token from the Hub.
     */
    async refreshAccessToken() {
        this.currentAccessToken = await this.makeRequest('');
        return this.currentAccessToken;
    }
    /**
     * Transforms a JSON blob returned by the Hub into a subclass of HubResponse, based on the `@type`
     * field of the response.
     *
     * @param response The Hub response to be transformed.
     */
    static mapResponseToObject(response) {
        const responseTypeString = response['@type'];
        const responseType = HubSession.responseTypes[responseTypeString];
        if (responseType) {
            return new responseType(response);
        }
        if (response['@type'] === 'ErrorResponse') {
            throw new HubError_1.default(response);
        }
        throw new HubError_1.default({
            error_code: hub_common_js_1.HubErrorCode.NotImplemented,
            developer_message: `Unexpected response type ${responseTypeString}`,
        });
    }
}
/** Mapping of known response types. */
HubSession.responseTypes = {
    WriteResponse: HubWriteResponse_1.default,
    ObjectQueryResponse: HubObjectQueryResponse_1.default,
    CommitQueryResponse: HubCommitQueryResponse_1.default,
};
exports.default = HubSession;
//# sourceMappingURL=HubSession.js.map