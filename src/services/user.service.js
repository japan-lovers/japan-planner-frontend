import axios from "axios";

class UserService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  // GET /user/:id
  getUser = (id) => {
    return this.api.get(`/user/${id}`);
  };

  //   PUT /user/:id
  updateUser = (id, requestBody) => {
    return this.api.put(`/user/${id}`, requestBody);
  };
}

// Create one instance (object) of the service
const userService = new UserService();

export default userService;
