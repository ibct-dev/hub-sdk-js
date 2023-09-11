"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HubCommitQueryResponse_1 = require("../../src/responses/HubCommitQueryResponse");
const flattenedCommitJson = {
    protected: 'test',
    payload: 'test',
    signature: 'test',
};
const response = new HubCommitQueryResponse_1.default({
    '@context': 'https://schema.identity.foundation/0.1',
    '@type': 'CommitQueryResponse',
    commits: [flattenedCommitJson],
    skip_token: 'abc',
});
describe('HubCommitQueryResponse', () => {
    describe('constructor', () => {
        it('should throw on an invalid response type', async () => {
            try {
                const r = new HubCommitQueryResponse_1.default({
                    '@type': 'WrongType',
                });
                fail('Constructor was expected to throw');
            }
            catch (e) {
                // Expected
            }
        });
    });
    describe('getCommits()', () => {
        it('should return the matching commits', async () => {
            const returnedCommits = await response.getCommits();
            expect(returnedCommits.length).toEqual(1);
            expect(returnedCommits[0].toFlattenedJson()).toEqual(flattenedCommitJson);
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
//# sourceMappingURL=HubCommitQueryResponse.spec.js.map