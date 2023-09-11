"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents an error returned by an Identity Hub.
 */
class HubError extends Error {
    constructor(body) {
        super(`Identity Hub Error: ${body.developer_message || body.error_code || 'Unknown error'}`);
        this.body = body;
        // tslint:disable-next-line:variable-name
        this.__hubError = true;
        // NOTE: Extending 'Error' breaks prototype chain since TypeScript 2.1.
        // The following line restores prototype chain.
        if (Object.setPrototypeOf)
            Object.setPrototypeOf(this, new.target.prototype);
    }
    /**
     * Indicates whether the passed-in object is a HubError instance.
     */
    static is(err) {
        return err.__hubError || false;
    }
    /**
     * Returns the error code given by the Hub.
     */
    getErrorCode() {
        return this.body.error_code;
    }
    /**
     * Returns the error target (e.g. the property which is invalid).
     */
    getTarget() {
        return this.body.target;
    }
    /**
     * Returns the raw error JSON as provided by the Hub.
     */
    getRawError() {
        return this.body;
    }
}
exports.default = HubError;
//# sourceMappingURL=HubError.js.map