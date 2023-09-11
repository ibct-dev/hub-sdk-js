/**
 * Returns a clone of the given object with certain fields changed.
 *
 * @param original The original object to clone and modify.
 * @param adjustments An object containing fields to be replaced. Each key of the object is a field
 * to change, in dotted notation (e.g. `field` or `field.prop`). The value is the new value to set
 * for that key.
 */
export declare const alter: (original: any, adjustments: {
    [fieldPath: string]: any;
}) => any;
/**
 * Returns a debug description of the given value.
 */
export declare const explain: (value: any) => string;
