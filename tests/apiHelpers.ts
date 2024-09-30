import { APIRequestContext } from "@playwright/test";

export class APIHelper {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }
}