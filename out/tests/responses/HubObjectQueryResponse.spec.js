"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HubObjectQueryResponse_1 = require("../../src/responses/HubObjectQueryResponse");
const objects = [{
        interface: 'Collections',
        context: 'schema.org',
        type: 'MusicPlaylist',
        id: 'abc',
        created_by: 'did:test:example.id',
        created_at: '2019-01-01',
        sub: 'did:test:example.id',
        commit_strategy: 'basic',
    }];
const response = new HubObjectQueryResponse_1.default({
    '@context': 'https://schema.identity.foundation/0.1',
    '@type': 'ObjectQueryResponse',
    objects,
    skip_token: 'abc',
});
describe('HubObjectQueryResponse', () => {
    describe('constructor', () => {
        it('should throw on an invalid response type', async () => {
            try {
                const r = new HubObjectQueryResponse_1.default({
                    '@type': 'WrongType',
                });
                fail('Constructor was expected to throw');
            }
            catch (e) {
                // Expected
            }
        });
    });
    describe('getObjects()', () => {
        it('should return the matching objects', async () => {
            const returnedObjects = await response.getObjects();
            expect(returnedObjects).toEqual(objects);
        });
        it('should return an array even if none was in the response', async () => {
            const response = new HubObjectQueryResponse_1.default({
                '@context': 'https://schema.identity.foundation/0.1',
                '@type': 'ObjectQueryResponse',
                objects: null,
            });
            expect(Array.isArray(response.getObjects())).toEqual(true);
        });
    });
    describe('hasSkipToken()', () => {
        it('should indicate whether a skip token was returned', async () => {
            expect(response.hasSkipToken()).toEqual(true);
        });
    });
    describe('getSkipToken()', () => {
        it('should return the skip token', async () => {
            expect(response.getSkipToken()).toEqual('abc');
        });
    });
});
//# sourceMappingURL=HubObjectQueryResponse.spec.js.map