export const __esModule: boolean;
export namespace swaggerSpec {
    let openapi: string;
    namespace info {
        let title: string;
        let version: string;
    }
    let servers: {
        url: string;
    }[];
    let paths: {
        "/auth/login": {
            post: {
                summary: string;
                requestBody: {};
                responses: {
                    "200": {
                        description: string;
                    };
                };
            };
        };
        "/blog": {
            get: {
                summary: string;
            };
            post: {
                summary: string;
            };
        };
    };
}
