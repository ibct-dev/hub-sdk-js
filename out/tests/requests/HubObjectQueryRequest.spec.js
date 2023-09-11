"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HubObjectQueryRequest_1 = require("../../src/requests/HubObjectQueryRequest");
describe('HubObjectQueryRequest', () => {
    describe('getRequestJson()', () => {
        it('should return a complete request body', async () => {
            const req = new HubObjectQueryRequest_1.default({
                object_id: ['1234'],
            });
            const json = await req.getRequestJson();
            expect(json).toEqual({
                '@context': 'https://schema.identity.foundation/0.1',
                '@type': 'ObjectQueryRequest',
                query: {
                    object_id: ['1234'],
                },
            });
        });
    });
});
//# sourceMappingURL=HubObjectQueryRequest.spec.js.map