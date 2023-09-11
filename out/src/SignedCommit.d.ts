import { ICommitProtectedHeaders, IFlattenedJws } from '@decentralized-identity/hub-common-js';
/**
 * Class representing a signed commit.
 */
export default class SignedCommit {
    private json;
    constructor(json: IFlattenedJws);
    /**
     * Returns the signed commit data in the Flattened JWS JSON Serialization.
     */
    toFlattenedJson(): IFlattenedJws;
    /**
     * Returns the decoded protected headers for this commit. TODO TODO NO REV
     */
    getProtectedHeaders(): ICommitProtectedHeaders;
    /**
     * Returns the decoded payload for this commit.
     */
    getPayload(): any;
    /**
     * Retrieves the revision ID for this commit.
     */
    getRevision(): string;
    /**
     * Retrieves the ID of the object to which this commit belongs.
     */
    getObjectId(): string;
}
