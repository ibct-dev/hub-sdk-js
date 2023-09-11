"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base64url_1 = require("base64url");
const crypto = require("crypto");
/**
 * Class representing a signed commit.
 */
class SignedCommit {
    constructor(json) {
        this.json = json;
    }
    /**
     * Returns the signed commit data in the Flattened JWS JSON Serialization.
     */
    toFlattenedJson() {
        return this.json;
    }
    /**
     * Returns the decoded protected headers for this commit. TODO TODO NO REV
     */
    getProtectedHeaders() {
        if (this.json && this.json.protected) {
            return JSON.parse(base64url_1.default.decode(this.json.protected));
        }
        throw new Error('Commit does not have a protected field.');
    }
    /**
     * Returns the decoded payload for this commit.
     */
    getPayload() {
        if (this.json && this.json.payload) {
            const decoded = base64url_1.default.decode(this.json.payload);
            try {
                return JSON.parse(decoded);
            }
            catch (e) {
                // Not JSON, return directly
                return decoded;
            }
        }
        throw new Error('Commit does not have a payload field.');
    }
    /**
     * Retrieves the revision ID for this commit.
     */
    getRevision() {
        // TODO: Verify signature; cache result
        const sha256 = crypto.createHash('sha256');
        sha256.update(`${this.json.protected}.${this.json.payload}`);
        return sha256.digest('hex');
    }
    /**
     * Retrieves the ID of the object to which this commit belongs.
     */
    getObjectId() {
        const headers = this.getProtectedHeaders();
        if (headers.operation === 'create') {
            return this.getRevision();
        }
        return headers.object_id;
    }
}
exports.default = SignedCommit;
//# sourceMappingURL=SignedCommit.js.map