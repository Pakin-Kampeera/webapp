const getToken = () => {
  return JSON.parse(localStorage.getItem("token"));
};

const setToken = (newToken) => {
  localStorage.setItem("token", JSON.stringify(newToken));
};

const removeToken = () => {
  localStorage.removeItem("token");
};

const TokenService = {
  getToken,
  setToken,
  removeToken,
};

export default TokenService;
