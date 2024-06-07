declare class EnvironmentVariables {
    PORT: number;
    DOMAIN: string;
    MONGO_LOGIN: string;
    MONGO_PASSWORD: string;
    MONGO_HOST: string;
    MONGO_PORT: number;
    MONGO_AUTHDATABASE: string;
    JWT_SECRET: string;
    POSTGRE_PORT: number;
    POSTGRE_USER: string;
    POSTGRE_PASSWORD: string;
    POSTGRE_DB: string;
    POSTGRE_HOST: string;
}
export declare function validate(config: Record<string, unknown>): EnvironmentVariables;
export {};
