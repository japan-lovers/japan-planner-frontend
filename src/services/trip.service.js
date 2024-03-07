import axios from 'axios';

class TripsService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem('authToken');

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  // POST /api/trips
  createTrip = (requestBody) => {
    return this.api.post('/api/trips', requestBody);
  };

  // GET /api/trips
  getAllTrips = () => {
    return this.api.get('/api/trips');
  };

  // GET /api/trips/:id
  getTrip = (id) => {
    return this.api.get(`/api/trips/${id}`);
  };

  // PUT /api/trips/:id
  updateTrip = (id, requestBody) => {
    return this.api.put(`/api/trips/${id}`, requestBody);
  };

  // DELETE /api/trips/:id
  deleteTrip = (id) => {
    return this.api.delete(`/api/trips/${id}`);
  };

  // GET /api/trips/user/:userId
  getUserTrips = (id) => {
    return this.api.get(`/api/trips/user/${id}`);
  };
}

// Create one instance (object) of the service
const tripsService = new TripsService();

export default tripsService;
