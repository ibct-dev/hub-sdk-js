"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RsaPrivateKey_1 = require("@decentralized-identity/did-auth-jose/dist/lib/crypto/rsa/RsaPrivateKey");
const did_common_typescript_1 = require("@decentralized-identity/did-common-typescript");
const HubSession_1 = require("./HubSession");
const HubWriteRequest_1 = require("./requests/HubWriteRequest");
const CommitSigner_1 = require("./crypto/CommitSigner");
const Commit_1 = require("./Commit");
const HubObjectQueryRequest_1 = require("./requests/HubObjectQueryRequest");
const HubCommitQueryRequest_1 = require("./requests/HubCommitQueryRequest");
const CommitStrategyBasic_1 = require("./CommitStrategyBasic");
const index_1 = require("./index");
// Fill these in with specific values.
const HTTP_RESOLVER = 'HTTP_RESOLVER_ENDPOINT_HERE';
const HUB_ENDPOINT = 'HUB_ENDPOINT_HERE';
const HUB_DID = 'HUB_DID_HERE';
// Fill in the DID to use
const DID = 'did:example:YOUR_DID_HERE';
/**
 * Fill in your full private key, including the `kid` field. The key must:
 * - Be an RSA private key in JWK format
 * - Match one of the public keys registered for your DID
 * - Include a "kid" field with the plain (not fully-qualified) key ID, e.g. "key-1"
 */
const PRIVATE_KEY = { kid: 'key-1' };
async function runExample() {
    try {
        const kid = `${DID}#${PRIVATE_KEY.kid}`;
        const privateKey = RsaPrivateKey_1.default.wrapJwk(kid, PRIVATE_KEY);
        const keyStore = new index_1.KeyStoreMem();
        keyStore.save(kid, privateKey);
        const session = new HubSession_1.default({
            keyStore,
            hubEndpoint: HUB_ENDPOINT,
            hubDid: HUB_DID,
            resolver: new did_common_typescript_1.HttpResolver(HTTP_RESOLVER),
            clientDid: DID,
            clientPrivateKeyReference: kid,
            targetDid: DID,
        });
        //
        // Write a new Commit to the Hub, creating a new object.
        //
        const commit = new Commit_1.default({
            protected: {
                committed_at: (new Date()).toISOString(),
                iss: DID,
                sub: DID,
                interface: 'Collections',
                context: 'http://schema.org',
                type: 'MusicPlaylist',
                operation: 'create',
                commit_strategy: 'basic',
            },
            payload: {
                title: 'My Playlist',
            },
        });
        const signer = new CommitSigner_1.default({
            did: DID,
            key: privateKey,
        });
        const signedCommit = await signer.sign(commit);
        const commitRequest = new HubWriteRequest_1.default(signedCommit);
        const commitResponse = await session.send(commitRequest);
        console.log(commitResponse);
        //
        // Read available objects from the Hub.
        //
        const queryRequest = new HubObjectQueryRequest_1.default({
            interface: 'Collections',
            context: 'http://schema.org',
            type: 'MusicPlaylist',
        });
        const queryResponse = await session.send(queryRequest);
        console.log(queryResponse);
        const objects = queryResponse.getObjects();
        //
        // Read the contents of a single object.
        //
        if (objects.length > 0) {
            const objectMetadata = objects[0];
            if (objectMetadata.commit_strategy !== 'basic') {
                throw new Error('Currently only the basic commit strategy is supported.');
            }
            const commitQueryRequest = new HubCommitQueryRequest_1.default({
                object_id: [objectMetadata.id],
            });
            const commitQueryResponse = await session.send(commitQueryRequest);
            const commits = commitQueryResponse.getCommits();
            const strategy = new CommitStrategyBasic_1.default();
            const objectState = await strategy.resolveObject(commits);
            console.log(objectState);
        }
    }
    catch (e) {
        console.error(e);
    }
}
runExample();
//# sourceMappingURL=example.js.map