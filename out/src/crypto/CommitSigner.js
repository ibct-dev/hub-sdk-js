"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const did_auth_jose_1 = require("@decentralized-identity/did-auth-jose");
const SignedCommit_1 = require("../SignedCommit");
const objectAssign = require("object-assign");
/**
 * Class which can apply a signature to a commit.
 */
class CommitSigner {
    constructor(options) {
        this.did = options.did;
        this.key = options.key;
        if (!options.cryptoSuite) {
            this.cryptoSuite = new did_auth_jose_1.RsaCryptoSuite();
        }
        else {
            this.cryptoSuite = options.cryptoSuite;
        }
    }
    /**
     * Signs the given commit.
     *
     * @param commit The commit to sign.
     */
    async sign(commit) {
        commit.validate();
        const protectedHeaders = commit.getProtectedHeaders();
        const finalProtectedHeaders = objectAssign({}, protectedHeaders, {
            iss: this.did,
        });
        const jws = new did_auth_jose_1.JwsToken(commit.getPayload(), new did_auth_jose_1.CryptoFactory([this.cryptoSuite]));
        const signed = await jws.sign(this.key, finalProtectedHeaders); // TODO: Need to broaden TypeScript definition of JwsToken.sign().
        const [outputHeaders, outputPayload, outputSignature] = signed.split('.');
        return new SignedCommit_1.default({
            protected: outputHeaders,
            payload: outputPayload,
            header: commit.getUnprotectedHeaders(),
            signature: outputSignature,
        });
    }
}
exports.default = CommitSigner;
//# sourceMappingURL=CommitSigner.js.map