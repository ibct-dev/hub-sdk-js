"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const did_common_typescript_1 = require("@decentralized-identity/did-common-typescript");
/**
 * Mock implementation of a DidResolver which will return the configured DID documents.
 */
class MockResolver {
    constructor(keys) {
        this.keys = {};
        if (keys) {
            Object.keys(keys).forEach(did => this.keys[did] = keys[did]);
        }
    }
    /**
     * Sets the key for a specific DID.
     */
    setKey(did, key) {
        this.keys[did] = key;
    }
    /**
     * Resolves the given DID.
     */
    async resolve(did) {
        const key = this.keys[did];
        if (!key) {
            throw new Error(`MockResolver has no entry for requested DID: ${did}`);
        }
        return {
            didDocument: new did_common_typescript_1.DidDocument({
                "@context": "https://w3id.org/did/v1",
                id: did,
                publicKey: [{
                        id: key.kid,
                        type: 'RsaVerificationKey2018',
                        controller: did,
                        publicKeyJwk: key
                    }]
            })
        };
    }
}
exports.default = MockResolver;
//# sourceMappingURL=MockResolver.js.map