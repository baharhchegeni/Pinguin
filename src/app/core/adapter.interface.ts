export interface adapter<TOut> {
    adapt(i: any): TOut;
}