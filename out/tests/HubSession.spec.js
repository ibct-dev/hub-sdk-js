"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hub_common_js_1 = require("@decentralized-identity/hub-common-js");
const HubSession_1 = require("../src/HubSession");
const HubWriteRequest_1 = require("../src/requests/HubWriteRequest");
const HubWriteResponse_1 = require("../src/responses/HubWriteResponse");
const HubCommitQueryResponse_1 = require("../src/responses/HubCommitQueryResponse");
const HubObjectQueryResponse_1 = require("../src/responses/HubObjectQueryResponse");
const HubError_1 = require("../src/HubError");
const SignedCommit_1 = require("../src/SignedCommit");
const RsaPrivateKey_1 = require("@decentralized-identity/did-auth-jose/dist/lib/crypto/rsa/RsaPrivateKey");
const did_auth_jose_1 = require("@decentralized-identity/did-auth-jose");
const MockResolver_1 = require("./MockResolver");
const node_fetch_1 = require("node-fetch");
const MockHub_1 = require("./MockHub");
let clientPrivateKey;
const clientDid = 'did:fake:client.id';
const clientKid = `${clientDid}#key-1`;
let hubPrivateKey;
const hubDid = 'did:fake:hub.id';
const hubKid = `${hubDid}#key-1`;
let mockResolver;
const signedCommit = new SignedCommit_1.default({
    protected: "test",
    payload: "test",
    signature: "test"
});
describe('HubSession', () => {
    beforeEach(async () => {
        mockResolver = new MockResolver_1.default();
        clientPrivateKey = await RsaPrivateKey_1.default.generatePrivateKey(clientKid);
        hubPrivateKey = await RsaPrivateKey_1.default.generatePrivateKey(hubKid);
        mockResolver.setKey(hubDid, hubPrivateKey.getPublicKey());
        mockResolver.setKey(clientDid, clientPrivateKey.getPublicKey());
    });
    describe('send()', () => {
        let session;
        let mockHub;
        beforeEach(async () => {
            mockHub = new MockHub_1.default({
                hubDid,
                hubPrivateKey,
                resolver: mockResolver
            });
            const kid = 'testkey';
            const keyStore = new did_auth_jose_1.KeyStoreMem();
            keyStore.save(kid, clientPrivateKey);
            session = new HubSession_1.default({
                clientDid: 'did:fake:client.id',
                clientPrivateKeyReference: kid,
                targetDid: 'did:fake:target.id',
                hubDid,
                hubEndpoint: 'https://example.com',
                resolver: mockResolver,
                keyStore: keyStore
            });
            // Redirect fetch() calls to mockHub
            spyOn(session, 'callFetch').and.callFake((url, init) => {
                return mockHub.handleFetch(url, init);
            });
        });
        it('should send a valid request', async () => {
            const request = new HubWriteRequest_1.default(signedCommit);
            const mockWriteResponse = JSON.stringify({
                '@context': 'https://schema.identity.foundation/0.1',
                '@type': 'WriteResponse',
                'revisions': ['abc', '123'],
            });
            // Set Hub behavior
            mockHub.setHandler(async (callDetails) => {
                // Expect an auth token request
                if (callDetails.isAuthTokenRequest) {
                    return callDetails.authTokenResponse;
                }
                // Then return real response
                return mockWriteResponse;
            });
            const response = await session.send(request);
            expect(response.getRevisions()).toEqual(['abc', '123']);
        });
        it('should refresh an invalid access token', async () => {
            const request = new HubWriteRequest_1.default(signedCommit);
            session['currentAccessToken'] = 'invalid-access-token';
            const mockWriteResponse = JSON.stringify({
                '@context': 'https://schema.identity.foundation/0.1',
                '@type': 'WriteResponse',
                'revisions': ['abc', '123'],
            });
            let firstRequest = true;
            mockHub.setPreAuthHandler(async (_) => {
                if (firstRequest) {
                    firstRequest = false;
                    return new node_fetch_1.Response(JSON.stringify({
                        '@type': 'ErrorResponse',
                        error_code: hub_common_js_1.HubErrorCode.AuthenticationFailed
                    }), { status: 500 });
                }
                return;
            });
            // Set Hub behavior
            mockHub.setHandler(async (callDetails) => {
                // First (invalid) token request handled with preAuthHandler
                // Expect an auth token request
                if (callDetails.isAuthTokenRequest) {
                    return callDetails.authTokenResponse;
                }
                // Then return real response
                return mockWriteResponse;
            });
            const response = await session.send(request);
            expect(response.getRevisions()).toEqual(['abc', '123']);
        });
        it('should pass through a hub error', async () => {
            const request = new HubWriteRequest_1.default(signedCommit);
            const errorResponse = {
                '@type': 'ErrorResponse',
                error_code: hub_common_js_1.HubErrorCode.TooManyRequests
            };
            // Set Hub behavior
            mockHub.setHandler(async (callDetails) => {
                // Expect an auth token request
                if (callDetails.isAuthTokenRequest) {
                    return callDetails.authTokenResponse;
                }
                // Then return real response
                return new node_fetch_1.Response(JSON.stringify(errorResponse), { status: 500 });
            });
            try {
                console.log('test');
                const response = await session.send(request);
                fail('Not expected to reach this point.');
            }
            catch (e) {
                expect(HubError_1.default.is(e)).toBeTruthy();
                expect(e.getErrorCode()).toEqual(hub_common_js_1.HubErrorCode.TooManyRequests);
            }
        });
        it('should handle invalid json', async () => {
            const request = new HubWriteRequest_1.default(signedCommit);
            // Set Hub behavior
            mockHub.setHandler(async (callDetails) => {
                // Expect an auth token request
                if (callDetails.isAuthTokenRequest) {
                    return callDetails.authTokenResponse;
                }
                // Then return real response
                return "not-json";
            });
            try {
                const response = await session.send(request);
                fail('Not expected to reach this point.');
            }
            catch (e) {
                expect(HubError_1.default.is(e)).toBeTruthy();
                expect(e.getErrorCode()).toEqual(hub_common_js_1.HubErrorCode.ServerError);
            }
        });
    });
    describe('mapResponseToObject()', () => {
        it('should correctly map responses', () => {
            const method = HubSession_1.default['mapResponseToObject'];
            const mapping = {
                CommitQueryResponse: HubCommitQueryResponse_1.default,
                ObjectQueryResponse: HubObjectQueryResponse_1.default,
                WriteResponse: HubWriteResponse_1.default,
            };
            for (const key in mapping) {
                const response = method({
                    '@context': 'https://schema.identity.foundation/0.1',
                    '@type': key,
                });
                expect(response instanceof mapping[key]).toBeTruthy();
            }
        });
        it('should map and throw an error response', () => {
            try {
                HubSession_1.default['mapResponseToObject']({
                    '@context': 'https://schema.identity.foundation/0.1',
                    '@type': 'ErrorResponse',
                    error_code: hub_common_js_1.HubErrorCode.AuthenticationFailed,
                });
                fail('Not expected to reach this point.');
            }
            catch (e) {
                expect(HubError_1.default.is(e)).toBeTruthy();
                expect(e.getErrorCode()).toEqual(hub_common_js_1.HubErrorCode.AuthenticationFailed);
            }
        });
        it('should throw an error for an unknown response type', () => {
            try {
                HubSession_1.default['mapResponseToObject']({
                    '@context': 'https://schema.identity.foundation/0.1',
                    '@type': 'UnsupportedResponse',
                });
                fail('Not expected to reach this point.');
            }
            catch (e) {
                expect(HubError_1.default.is(e)).toBeTruthy();
                expect(e.getErrorCode()).toEqual(hub_common_js_1.HubErrorCode.NotImplemented);
            }
        });
    });
});
//# sourceMappingURL=HubSession.spec.js.map