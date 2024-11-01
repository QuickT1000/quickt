export interface DatabaseOptions {
    user: string;
    password: string;
    database: string;
    host: string;
    port: number;
    connection_timeout: number;
    query_timeout: number;
    idle_timeout: number;
}
