"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CommitSigner_1 = require("../../src/crypto/CommitSigner");
const RsaPrivateKey_1 = require("@decentralized-identity/did-auth-jose/dist/lib/crypto/rsa/RsaPrivateKey");
const did_auth_jose_1 = require("@decentralized-identity/did-auth-jose");
const Commit_1 = require("../../src/Commit");
describe('CommitSigner', () => {
    describe('sign()', () => {
        it('should sign a commit using Rsa', async () => {
            const testDid = 'did:example:person.id';
            const testKid = `${testDid}#key-1`;
            const testKey = await RsaPrivateKey_1.default.generatePrivateKey(testKid);
            const protectedHeaders = {
                interface: 'Collections',
                context: 'schema.org',
                type: 'MusicPlaylist',
                operation: 'create',
                committed_at: '2019-01-01',
                commit_strategy: 'basic',
                sub: 'did:example:sub.id',
            };
            const payload = {
                name: "Test"
            };
            const commit = new Commit_1.default({
                protected: protectedHeaders,
                payload
            });
            const signer = new CommitSigner_1.default({
                did: testDid,
                key: testKey
            });
            const signedCommit = await signer.sign(commit);
            expect(signedCommit.getPayload()).toEqual(payload);
            const signedProtectedHeaders = signedCommit.getProtectedHeaders();
            Object.keys(protectedHeaders).forEach((headerKey) => {
                expect(signedProtectedHeaders[headerKey]).toEqual(protectedHeaders[headerKey]);
            });
            expect(signedProtectedHeaders.iss).toEqual(testDid);
            expect(signedProtectedHeaders.kid).toEqual(testKid);
        });
        it('should sign a commit using EC', async () => {
            const testDid = 'did:example:person.id';
            const testKid = `${testDid}#key-1`;
            const testKey = await did_auth_jose_1.EcPrivateKey.generatePrivateKey(testKid);
            const protectedHeaders = {
                interface: 'Collections',
                context: 'schema.org',
                type: 'MusicPlaylist',
                operation: 'create',
                committed_at: '2019-01-01',
                commit_strategy: 'basic',
                sub: 'did:example:sub.id',
            };
            const payload = {
                name: "Test"
            };
            const commit = new Commit_1.default({
                protected: protectedHeaders,
                payload
            });
            const signer = new CommitSigner_1.default({
                did: testDid,
                key: testKey,
                cryptoSuite: new did_auth_jose_1.Secp256k1CryptoSuite()
            });
            const signedCommit = await signer.sign(commit);
            expect(signedCommit.getPayload()).toEqual(payload);
            const signedProtectedHeaders = signedCommit.getProtectedHeaders();
            Object.keys(protectedHeaders).forEach((headerKey) => {
                expect(signedProtectedHeaders[headerKey]).toEqual(protectedHeaders[headerKey]);
            });
            expect(signedProtectedHeaders.iss).toEqual(testDid);
            expect(signedProtectedHeaders.kid).toEqual(testKid);
        });
        it('should throw an error if a commit is not valid', async () => {
            const testDid = 'did:example:person.id';
            const testKid = `${testDid}#key-1`;
            const testKey = await RsaPrivateKey_1.default.generatePrivateKey(testKid);
            const commit = new Commit_1.default({
                protected: {
                    interface: 'Collections',
                    context: 'schema.org',
                    // type: 'MusicPlaylist', // left out intentionally
                    operation: 'create',
                    committed_at: '2019-01-01',
                    commit_strategy: 'basic',
                    sub: 'did:example:sub.id',
                },
                payload: {
                    name: "Test"
                }
            });
            const signer = new CommitSigner_1.default({
                did: testDid,
                key: testKey
            });
            try {
                await signer.sign(commit);
                fail('Not expected to reach this point.');
            }
            catch (err) {
                expect(err.message).toContain("Commit 'protected.type' field must be");
            }
        });
    });
});
//# sourceMappingURL=CommitSigner.spec.js.map