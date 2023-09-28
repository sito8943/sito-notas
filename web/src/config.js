const {
  VITE_API_URL,
  // cookies
  VITE_LANGUAGE,
  VITE_BASIC_KEY,
  VITE_ACCEPT_COOKIE,
  VITE_DECLINE_COOKIE,
  VITE_USER,
  VITE_VALIDATION_COOKIE,
  VITE_RECOVERING_COOKIE,
  // COMMUNICATION
  VITE_CRYPTO,
  // MANAGER
  VITE_TASKS,
  VITE_TAGS,
  VITE_EDITED_TASK,
} = import.meta.env;

const config = {
  apiUrl: VITE_API_URL,
  // cookie
  language: VITE_LANGUAGE,
  basicKey: VITE_BASIC_KEY,
  accept: VITE_ACCEPT_COOKIE,
  decline: VITE_DECLINE_COOKIE,
  user: VITE_USER,
  validating: VITE_VALIDATION_COOKIE,
  recovering: VITE_RECOVERING_COOKIE,
  // COMMUNICATION
  crypto: VITE_CRYPTO,
  // MANAGER
  tasks: VITE_TASKS,
  tags: VITE_TAGS,
  editedTask: VITE_EDITED_TASK,
};

export default config;
