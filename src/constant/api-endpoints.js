export const API_EVENT = process.env.NODE_ENV !== 'production'
  ? "http://localhost:5000/api/event"
  : "https://event-planner-api.herokuapp.com/api/event";

export const API_USER = process.env.NODE_ENV !== 'production' 
? "http://localhost:5000/api/user" 
: "https://event-planner-api.herokuapp.com/api/user"
