class ApiService {
	private baseURL: string;

	constructor(baseURL: string) {
		this.baseURL = baseURL;
	}

	async post<T, B extends Record<string, unknown>>(route: string, body: FormData | B): Promise<T> {
		try {
			const response = await fetch(`${this.baseURL}${route}`, {
				method: "POST",
				body: body instanceof FormData ? body : JSON.stringify(body),
				headers: body instanceof FormData ? undefined : { "Content-Type": "application/json" },
			});

			if(!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || "Request failed");
			}

			return response.json();
		} catch (error) {
			console.error("API Error: ", error);
			throw error;
		}
	}
}

export const apiService = new ApiService("http://localhost:3642/api");
