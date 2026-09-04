import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api/v1";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Response interceptor to unwrap data
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const errorMsg =
      error.response?.data?.error?.message ||
      error.message ||
      "An unexpected error occurred.";
    return Promise.reject(new Error(errorMsg));
  }
);

export const apiService = {
  // Check backend health
  async checkHealth() {
    try {
      return await apiClient.get("/health");
    } catch {
      return { success: false, status: "offline" };
    }
  },

  // Fetch product list
  async getProducts(params = {}) {
    return await apiClient.get("/products", { params });
  },

  // Fetch single product by slug
  async getProductBySlug(slug) {
    return await apiClient.get(`/products/${slug}`);
  },

  // Fetch active store locations
  async getStores() {
    return await apiClient.get("/stores");
  },

  // Subscribe to newsletter
  async subscribeNewsletter(email) {
    return await apiClient.post("/newsletter/subscribe", { email });
  },

  // Cart operations (authenticated or guest token)
  async getCart() {
    return await apiClient.get("/cart");
  },

  async addToCart(productId, quantity = 1) {
    return await apiClient.post("/cart/items", { productId, quantity });
  },
};
