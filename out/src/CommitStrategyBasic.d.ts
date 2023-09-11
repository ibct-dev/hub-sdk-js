import SignedCommit from './SignedCommit';
/**
 * Resolves the final state of an object from the constituent set of commits for that object.
 *
 * This class works only with objects using the `basic` commit strategy.
 */
export default class CommitStrategyBasic {
    /**
     * Resolves the current state of an object with the `basic` commit strategy.
     *
     * TODO: This class currently returns only the raw object payload. Once we add an object instance
     * class to the SDK (e.g. `HubObject`), this method will no longer be called directly, and will
     * also need to return the app-readable object metadata.
     *
     * Currently returns `null` if the object was deleted, otherwise returns the most recent payload.
     *
     * @param commits The entire known set of commits for the object.
     */
    resolveObject(commits: SignedCommit[]): Promise<any>;
    /**
     * Compares two commits (which must belong to the same object) in order to evaulate which one is
     * more recent.
     *
     * Follows the conventions of the JavaScript sort() method:
     *  - `-1` indicates that a comes before (i.e. is older than b)
     *  - `1` indicates that a comes after (i.e. is newer than b)
     *
     * @param a The first commit to compare.
     * @param b The second commit to compare.
     */
    protected compareCommits(a: SignedCommit, b: SignedCommit): 1 | -1;
}
