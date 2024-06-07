declare const _default: () => {
    port: number;
    domain: string;
    auth: {
        JWT_secret: string;
    };
    database: {
        mongo: {
            host: string;
            login: string;
            password: string;
            port: number;
            authDataBase: string;
        };
        postgreSQL: {
            host: string;
            login: string;
            password: string;
            port: number;
            authDataBase: string;
        };
    };
};
export default _default;
