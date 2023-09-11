"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HubWriteResponse_1 = require("../../src/responses/HubWriteResponse");
describe('HubWriteResponse', () => {
    describe('getRevisions()', () => {
        it('should return the object revisions', async () => {
            const resp = new HubWriteResponse_1.default({
                '@context': 'https://schema.identity.foundation/0.1',
                '@type': 'WriteResponse',
                revisions: ['abc', 'def'],
            });
            expect(await resp.getRevisions()).toEqual(['abc', 'def']);
        });
    });
});
//# sourceMappingURL=HubWriteResponse.spec.js.map