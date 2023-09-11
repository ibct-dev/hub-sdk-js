"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents a new (i.e pending, unsigned) commit which will create, update, or delete an object in
 * a user's Identity Hub.
 */
class Commit {
    constructor(fields) {
        this.fields = fields;
    }
    /**
     * Verifies whether the currently set fields constitute a valid commit which can be
     * signed/encrypted and stored in an Identity Hub.
     *
     * Throws an error if the commit is not valid.
     *
     * TODO: Move validation logic to hub-common-js repository to be shared with hub-node-core.
     */
    validate() {
        if (!this.fields.protected) {
            throw new Error("Commit must specify the 'protected' field.");
        }
        const protectedHeaders = this.fields.protected;
        const requiredStrings = ['interface', 'context', 'type', 'committed_at', 'commit_strategy', 'sub'];
        requiredStrings.forEach((field) => {
            if (!protectedHeaders[field] || typeof protectedHeaders[field] !== 'string' || protectedHeaders[field].length === 0) {
                throw new Error(`Commit 'protected.${field}' field must be a non-zero-length string.`);
            }
        });
        if (!this.fields.protected.operation) {
            throw new Error("Commit 'protected.operation' field must be specified.");
        }
        if (['create', 'update', 'delete'].indexOf(this.fields.protected.operation) === -1) {
            throw new Error("Commit 'protected.operation' field must be one of create, update, or delete.");
        }
        if (this.fields.protected.operation === 'create') {
            if (this.fields.protected.object_id !== undefined) {
                throw new Error("Commit 'protected.object_id' field must not be specified when operation is 'create'.");
            }
        }
        else {
            if (!this.fields.protected.object_id) {
                throw new Error(`Commit 'protected.object_id' field must be specified when operation is '${this.fields.protected.operation}'.`);
            }
        }
        if (!this.fields.payload) {
            throw new Error("Commit must specify the 'payload' field.");
        }
        if (['string', 'object'].indexOf(typeof this.fields.payload) === -1) {
            throw new Error(`Commit payload must be string or object, ${typeof this.fields.payload} given.`);
        }
    }
    /**
     * Returns true if the validate() method would pass without error.
     */
    isValid() {
        try {
            this.validate();
            return true;
        }
        catch (err) {
            return false;
        }
    }
    /**
     * Returns the headers which will be signed/encrypted.
     */
    getProtectedHeaders() {
        return this.fields.protected;
    }
    /**
     * Returns the (optional) headers which will not be signed/encrypted.
     */
    getUnprotectedHeaders() {
        return this.fields.header || {};
    }
    /**
     * Returns the application-specific payload for this commit.
     */
    getPayload() {
        return this.fields.payload;
    }
    /**
     * Returns a copy of this commit signed with the given signer.
     *
     * @param signer The signer to use to sign the commit.
     */
    sign(signer) {
        return signer.sign(this);
    }
}
exports.default = Commit;
//# sourceMappingURL=Commit.js.map