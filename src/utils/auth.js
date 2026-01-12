export const login = (username, password) => {
  if (username && password) {
    localStorage.setItem("isAuth", "true");
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem("isAuth");
};

export const isAuthenticated = () => {
  return localStorage.getItem("isAuth") === "true";
};
