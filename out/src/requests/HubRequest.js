"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objectAssign = require("object-assign");
/**
 * The base class for all requests to an Identity Hub.
 */
class HubRequest {
    constructor(requestType, requestBody) {
        this.requestType = requestType;
        this.requestBody = requestBody;
    }
    /**
     * Returns the raw request JSON which will be sent to the Hub.
     */
    async getRequestJson() {
        return objectAssign({
            '@context': 'https://schema.identity.foundation/0.1',
            '@type': this.requestType,
        }, this.requestBody);
    }
}
exports.default = HubRequest;
//# sourceMappingURL=HubRequest.js.map