export const getToken = () => localStorage.getItem("token");
export const destroyToken = () => localStorage.removeItem("token");

export const isUserLoggedIn = () => {
  const tokenExistsLocally = !!getToken();
  return tokenExistsLocally;
};
