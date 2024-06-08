// Set Session Storage Function //
export const handlelocalStorage = (action, key, target) => {
  // Set to localStorage
  if (action === "set") {
    localStorage.setItem("grocery_" + key, JSON.stringify(target));
  }
  // Get from localStorage
  else if (action === "get") {
    return JSON.parse(localStorage.getItem("grocery_" + key));
  }
  // Remove From localStorage
  else if (action === "remove") {
    localStorage.removeItem("grocery_" + key);
  }
};

export const BASE_URL = import.meta.env.VITE_BASE_URL;