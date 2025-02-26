import { BaseApiService } from "./BaseApiService";

class ApiService extends BaseApiService {
	constructor() {
		super("http://localhost:3642/api");
	}

	async post<T, B extends Record<string, unknown>>(route: string, body: FormData | B): Promise<T> {
		return this.request<T, B>("POST", route, body);
	}

	async get<T>(route: string): Promise<T> {
		return this.request<T, never>("GET", route);
	}

	async put<T, B extends Record<string, unknown>>(route: string, body: B): Promise<T> {
		return this.request<T, B>("PUT", route, body);
	}

	async delete<T>(route: string): Promise<T> {
		return this.request<T, never>("DELETE", route);
	}
}

export const apiService = new ApiService();