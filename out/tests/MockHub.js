"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const did_auth_jose_1 = require("@decentralized-identity/did-auth-jose");
const node_fetch_1 = require("node-fetch");
/**
 * Mock Hub implementation for testing requests/responses.
 *
 * This class handles the authentication/encryption wrapping and unwrapping, and calls a provided
 * handler function to decide on the actual response.
 */
class MockHub {
    constructor(options) {
        this.authentication = new did_auth_jose_1.Authentication({
            resolver: options.resolver,
            keys: {
                [options.hubPrivateKey.kid]: options.hubPrivateKey
            }
        });
    }
    /**
     * Configures a test handler callback which will be called before the incoming request is
     * validated. Return a Buffer to short-circuit the response; or undefined to continue processing
     * the request normally.
     */
    async setPreAuthHandler(handler) {
        this.preAuthHandler = handler;
    }
    /**
     * Configures a test handler callback which will be called after the incoming request is
     * validated. This callback plays the role of the Hub and decides how to respond.
     */
    async setHandler(handler) {
        this.handler = handler;
    }
    /**
     * Handles an intercepted call to fetch() by processing the request and calling the configured
     * mock callback to handle the response.
     */
    async handleFetch(_, init) {
        if (!init)
            throw new Error('MockHub: The RequestInit fetch parameter was not present.');
        if (!Buffer.isBuffer(init.body))
            throw new Error('MockHub: The request body was not a Buffer.');
        if (this.preAuthHandler) {
            const preAuthResponse = await this.preAuthHandler(init.body);
            if (preAuthResponse)
                return preAuthResponse;
        }
        let verifiedRequest = await this.authentication.getVerifiedRequest(init.body);
        // let isAuthTokenRequest = Buffer.isBuffer(verifiedRequest);
        let handlerParameters;
        if (Buffer.isBuffer(verifiedRequest)) {
            // Auth token request
            handlerParameters = {
                isAuthTokenRequest: true,
                authTokenResponse: new node_fetch_1.Response(verifiedRequest)
            };
        }
        else {
            // Client request
            handlerParameters = {
                isAuthTokenRequest: false,
                clientRequest: verifiedRequest
            };
        }
        if (!this.handler) {
            throw new Error('MockHub: Handler not set.');
        }
        let handlerResponse = await this.handler(handlerParameters);
        if (typeof handlerResponse === 'string') {
            // Returned a real response
            let responseBuffer = await this.authentication.getAuthenticatedResponse(verifiedRequest, handlerResponse);
            return new node_fetch_1.Response(responseBuffer);
        }
        // handlerResponse instanceof Response
        return handlerResponse;
    }
}
exports.default = MockHub;
//# sourceMappingURL=MockHub.js.map