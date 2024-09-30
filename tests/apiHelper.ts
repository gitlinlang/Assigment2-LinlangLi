import { APIRequestContext } from "@playwright/test";

export class APIHelper {
    private baseUrl: string;
    private test_username: string;
    private test_password: string;
    private token: string | null = null;

    constructor(baseUrl: string, username: string, password: string) {
        this.baseUrl = baseUrl;
        this.test_username = username;
        this.test_password = password;
    }

    // Centralized authPayload creation
    private getAuthPayload() {
        return JSON.stringify({
            username: this.test_username,
            token: this.token,
        });
    }

    // Centralize header generation, using authPayload
    private getHeaders() {
        return {
            'x-user-auth': this.getAuthPayload(),  // Use centralized authPayload
            'Content-Type': 'application/json',
        };
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

    async getRooms(request: APIRequestContext) {
        const response = await request.get(`${this.baseUrl}/rooms`, {
            headers: this.getHeaders(),  // Use centralized headers
        });
        return response;

    }

    async getClients(request: APIRequestContext) {
        const response = await request.get(`${this.baseUrl}/clients`, {
            headers: this.getHeaders(),  // Use centralized headers
        });
        return response;

    }
}