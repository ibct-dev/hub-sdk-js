import { IDidResolver, DidDocument } from '@decentralized-identity/did-common-typescript';
import { PublicKey } from '@decentralized-identity/did-auth-jose';
/**
 * Mock implementation of a DidResolver which will return the configured DID documents.
 */
export default class MockResolver implements IDidResolver {
    private keys;
    constructor(keys?: {
        [did: string]: PublicKey;
    });
    /**
     * Sets the key for a specific DID.
     */
    setKey(did: string, key: PublicKey): void;
    /**
     * Resolves the given DID.
     */
    resolve(did: string): Promise<{
        didDocument: DidDocument;
    }>;
}
