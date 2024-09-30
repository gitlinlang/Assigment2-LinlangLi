import { APIRequestContext } from "@playwright/test";

export class APIHelper {
    private baseUrl: string;
    private test_username: string;
    private test_password: string;
    private token: string;

    constructor(baseUrl: string, username: string, password: string) {
        this.baseUrl = baseUrl;
        this.test_username = username;
        this.test_password = password;
    }

    async login(request: APIRequestContext) {
        const response = await request.post(`${this.baseUrl}/api/login`, {
            data: {
                username: this.test_username,
                password: this.test_password,
            }
        })
        const responseData = await response.json();
        this.token = responseData.token;

        return response

    }
}