import HubRequest from './HubRequest';
import SignedCommit from '../SignedCommit';
/**
 * Represents a request to commit the given Commit object to an Identity Hub.
 */
export default class HubCommitWriteRequest extends HubRequest {
    private readonly _isWriteRequest;
    constructor(commit: SignedCommit);
}
