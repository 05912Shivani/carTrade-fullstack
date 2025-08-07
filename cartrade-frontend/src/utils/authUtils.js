export const saveUserToLocalStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUserFromLocalStorage = () => {
  const data = localStorage.getItem("user");
  return data ? JSON.parse(data) : null;
};

export const clearUserFromLocalStorage = () => {
  localStorage.removeItem("user");
};

