import { PrivateKey, CryptoSuite } from '@decentralized-identity/did-auth-jose';
import ICommitSigner from './ICommitSigner';
import Commit from '../Commit';
import SignedCommit from '../SignedCommit';
interface CommitSignerOptions {
    /** The DID of the identity that will the commit. */
    did: string;
    /** The private key to be used to sign the commit. */
    key: PrivateKey;
    /** The CryptoSuite to be used to for the algorithm to use to sign the commit */
    cryptoSuite?: CryptoSuite;
}
/**
 * Class which can apply a signature to a commit.
 */
export default class CommitSigner implements ICommitSigner {
    private did;
    private key;
    private cryptoSuite;
    constructor(options: CommitSignerOptions);
    /**
     * Signs the given commit.
     *
     * @param commit The commit to sign.
     */
    sign(commit: Commit): Promise<SignedCommit>;
}
export {};
