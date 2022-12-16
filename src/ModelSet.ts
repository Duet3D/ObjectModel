/**
 * Wrapper around a standard set to make sure it serializes to an array
 */
export default class ModelSet<T> extends Set<T> {
    /**
     * Convert this object to JSON
     * @returns JSON object
     */
    toJSON() { return Array.from(this); }
}
