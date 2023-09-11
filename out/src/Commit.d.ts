import { ICommitProtectedHeaders, ICommitUnprotectedHeaders } from '@decentralized-identity/hub-common-js';
import ICommitSigner from './crypto/ICommitSigner';
import { SignedCommit } from './index';
/**
 * Fields that can be specified when creating a new commit.
 */
export interface ICommitFields {
    /** Fields to include in the protected (signed) commit header. */
    protected: Partial<ICommitProtectedHeaders>;
    /** Fields to include in the unprotected (unverified) commit header. */
    header?: Partial<ICommitUnprotectedHeaders>;
    /** The application-specific commit payload. */
    payload: object | string;
}
/**
 * Represents a new (i.e pending, unsigned) commit which will create, update, or delete an object in
 * a user's Identity Hub.
 */
export default class Commit {
    private fields;
    constructor(fields: ICommitFields);
    /**
     * Verifies whether the currently set fields constitute a valid commit which can be
     * signed/encrypted and stored in an Identity Hub.
     *
     * Throws an error if the commit is not valid.
     *
     * TODO: Move validation logic to hub-common-js repository to be shared with hub-node-core.
     */
    validate(): void;
    /**
     * Returns true if the validate() method would pass without error.
     */
    isValid(): boolean;
    /**
     * Returns the headers which will be signed/encrypted.
     */
    getProtectedHeaders(): Partial<ICommitProtectedHeaders>;
    /**
     * Returns the (optional) headers which will not be signed/encrypted.
     */
    getUnprotectedHeaders(): {
        [key: string]: any;
    };
    /**
     * Returns the application-specific payload for this commit.
     */
    getPayload(): any;
    /**
     * Returns a copy of this commit signed with the given signer.
     *
     * @param signer The signer to use to sign the commit.
     */
    sign(signer: ICommitSigner): Promise<SignedCommit>;
}
