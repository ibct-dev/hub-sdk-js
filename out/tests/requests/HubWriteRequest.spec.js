"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HubWriteRequest_1 = require("../../src/requests/HubWriteRequest");
const SignedCommit_1 = require("../../src/SignedCommit");
describe('HubWriteRequest', () => {
    describe('getRequestJson()', () => {
        it('should return a complete request body', async () => {
            const flattenedCommitJson = {
                protected: 'test',
                payload: 'test',
                signature: 'test',
            };
            const req = new HubWriteRequest_1.default(new SignedCommit_1.default(flattenedCommitJson));
            const json = await req.getRequestJson();
            expect(json).toEqual({
                '@context': 'https://schema.identity.foundation/0.1',
                '@type': 'WriteRequest',
                commit: flattenedCommitJson,
            });
        });
    });
});
//# sourceMappingURL=HubWriteRequest.spec.js.map