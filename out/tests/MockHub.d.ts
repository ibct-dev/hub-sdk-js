/// <reference types="node" />
import { PrivateKey, VerifiedRequest } from "@decentralized-identity/did-auth-jose";
import { IDidResolver } from "@decentralized-identity/did-common-typescript";
import { Response, Request } from 'node-fetch';
/** Handler to intercept requests before they are authenticated. */
declare type MockHubPreAuthHandler = (body: Buffer) => Promise<Response | undefined>;
interface MockHubHandlerAuthRequestParameters {
    isAuthTokenRequest: true;
    authTokenResponse: Response;
}
interface MockHubHandlerClientRequestParameters {
    isAuthTokenRequest: false;
    clientRequest: VerifiedRequest;
}
declare type MockHubHandlerParameters = MockHubHandlerAuthRequestParameters | MockHubHandlerClientRequestParameters;
/** Handler to intercept requests after they are authenticated. */
declare type MockHubHandler = (params: MockHubHandlerParameters) => Promise<Response | string>;
interface MockHubOptions {
    hubDid: string;
    hubPrivateKey: PrivateKey;
    resolver: IDidResolver;
}
/**
 * Mock Hub implementation for testing requests/responses.
 *
 * This class handles the authentication/encryption wrapping and unwrapping, and calls a provided
 * handler function to decide on the actual response.
 */
export default class MockHub {
    private authentication;
    private preAuthHandler;
    private handler;
    constructor(options: MockHubOptions);
    /**
     * Configures a test handler callback which will be called before the incoming request is
     * validated. Return a Buffer to short-circuit the response; or undefined to continue processing
     * the request normally.
     */
    setPreAuthHandler(handler: MockHubPreAuthHandler): Promise<void>;
    /**
     * Configures a test handler callback which will be called after the incoming request is
     * validated. This callback plays the role of the Hub and decides how to respond.
     */
    setHandler(handler: MockHubHandler): Promise<void>;
    /**
     * Handles an intercepted call to fetch() by processing the request and calling the configured
     * mock callback to handle the response.
     */
    handleFetch(_: string | Request, init?: RequestInit): Promise<Response>;
}
export {};
