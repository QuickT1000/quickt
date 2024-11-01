export interface Adapter {
    query(query: string): Promise<any>;

    end(): Promise<void>;
}
