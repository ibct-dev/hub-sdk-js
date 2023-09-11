"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hub_common_js_1 = require("@decentralized-identity/hub-common-js");
const HubError_1 = require("../src/HubError");
const hubErrorBody = {
    error_code: hub_common_js_1.HubErrorCode.NotFound,
    target: 'example',
};
const hubError = new HubError_1.default(hubErrorBody);
describe('HubError', () => {
    describe('is', () => {
        it('should indicate whether an object is a HubError', async () => {
            expect(HubError_1.default.is(hubError)).toBeTruthy();
            expect(HubError_1.default.is(new Error())).toBeFalsy();
        });
    });
    describe('constructor', () => {
        it('should fix the prototype chain', async () => {
            expect(hubError instanceof HubError_1.default).toBeTruthy();
            expect(hubError instanceof Error).toBeTruthy();
        });
    });
    describe('getErrorCode()', () => {
        it('should return the error code', async () => {
            expect(hubError.getErrorCode()).toEqual(hubErrorBody.error_code);
        });
    });
    describe('getTarget()', () => {
        it('should return the taret', async () => {
            expect(hubError.getTarget()).toEqual(hubErrorBody.target);
        });
    });
    describe('getRawError()', () => {
        it('should return the raw error body', async () => {
            expect(hubError.getRawError()).toEqual(hubErrorBody);
        });
    });
});
//# sourceMappingURL=HubError.spec.js.map