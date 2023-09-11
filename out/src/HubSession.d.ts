import { CryptoSuite, IKeyStore } from '@decentralized-identity/did-auth-jose';
import { IDidResolver } from '@decentralized-identity/did-common-typescript';
import HubWriteRequest from './requests/HubWriteRequest';
import HubWriteResponse from './responses/HubWriteResponse';
import HubObjectQueryRequest from './requests/HubObjectQueryRequest';
import HubObjectQueryResponse from './responses/HubObjectQueryResponse';
import HubCommitQueryRequest from './requests/HubCommitQueryRequest';
import HubCommitQueryResponse from './responses/HubCommitQueryResponse';
/**
 * Options for instantiating a new Hub session.
 */
export interface HubSessionOptions {
    /** The DID of the client, i.e the identity of the user/app using this SDK. */
    clientDid: string;
    /**
     * The private key to use for decrypting/signing when communicating with the Hub. Must be
     * registered in the DID document of the clientDid.
     */
    clientPrivateKeyReference: string;
    /** The DID owning the Hub with which we will be communicating. */
    targetDid: string;
    /** The DID of the Hub, for addressing request envelopes. */
    hubDid: string;
    /** The HTTPS endpoint of the Hub. */
    hubEndpoint: string;
    /** A DID resolver instance to be used during authentication. */
    resolver: IDidResolver;
    /**
     * An array of CryptoSuites to use during authentication (optional). Allows the client to provide
     * a suite which delegates operations to a secure enclave, rather than using a private key
     * available in-memory.
     */
    cryptoSuites?: CryptoSuite[];
    /**
     * Instance of KeyStore than can be used
     * to get and save keys.
     */
    keyStore: IKeyStore;
}
/**
 * Represents a communication session with a particular Hub instance.
 */
export default class HubSession {
    private clientDid;
    private hubDid;
    private hubEndpoint;
    private targetDid;
    private currentAccessToken;
    private authentication;
    constructor(options: HubSessionOptions);
    /**
     * Sends the given request to the Hub instance, and returns the associated response.
     *
     * @param request An instance or subclass of HubRequest to be sent.
     */
    send(request: HubWriteRequest): Promise<HubWriteResponse>;
    send(request: HubObjectQueryRequest): Promise<HubObjectQueryResponse>;
    send(request: HubCommitQueryRequest): Promise<HubCommitQueryResponse>;
    /**
     * Sends a raw (string) request body to the Hub and receives a response.
     *
     * @param message The raw request body to send.
     * @param accessToken The access token to include in the request, if any.
     */
    private makeRequest;
    /**
     * Fetch API wrapper, to allow unit testing.
     *
     * @param url The URL to make a request to.
     * @param init Request initialization details.
     */
    private callFetch;
    /**
     * Returns the current access token for the Hub, requesting one if necessary.
     */
    private getAccessToken;
    /**
     * Requests an updated access token from the Hub.
     */
    private refreshAccessToken;
    /** Mapping of known response types. */
    private static responseTypes;
    /**
     * Transforms a JSON blob returned by the Hub into a subclass of HubResponse, based on the `@type`
     * field of the response.
     *
     * @param response The Hub response to be transformed.
     */
    private static mapResponseToObject;
}
