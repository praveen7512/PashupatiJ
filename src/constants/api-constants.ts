export enum ApiMethods {
    Post = "POST",
    Get = "GET",
    Delete = "DELETE",
    Put = "PUT"
}

export const API_KEY = import.meta.env.VITE_API_KEY;

export const API_PATHS = {
    BASE_URL: import.meta.env.VITE_BASE_URL,
    POST_CATEGORY: "/api/v1/category/",
    POST_PRODUCTS: "/api/v1/product/"
};
