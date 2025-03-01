export class BaseApiService {
        protected baseURL: string;

        constructor(baseURL: string) {
                this.baseURL = baseURL;
        }

        protected async request<T, B extends Record<string, unknown>>(method: string, route: string, body?: FormData | B): Promise<T> {
                try {
                        const response = await fetch(`${this.baseURL}${route}`, {
                                method,
                                body: body ? (body instanceof FormData ? body : JSON.stringify(body)) : undefined,
                                headers: body instanceof FormData ? undefined : { "Content-Type": "application/json" },
                        });

                        if(!response.ok) {
                                const errorData = await response.json();
                                console.log("errorData: ", errorData);
                                throw new Error(errorData);
                        }

                        return response.json();
                } catch (error) {
                        const err = error as Error;
                        console.error("API error: ", err);
                        throw err;
                }
        }
}