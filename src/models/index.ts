// Import all models to ensure they are registered with Mongoose
// Import User first since Event references it
import User from './User';
import Event from './Event';

// Force registration by accessing the models
const models = {
  User,
  Event
};

// Export models for easy importing
export { User, Event };

// Ensure models are registered
export default models;
