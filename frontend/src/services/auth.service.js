import api from "./api";
import TokenService from "./token.service";

const register = (username, password, firstName, lastName, image) => {
  const formData = new FormData();
  formData.append("upload", image);
  formData.append("username", username);
  formData.append("password", password);
  formData.append("firstName", firstName);
  formData.append("lastName", lastName);

  return api.post("/auth/signup", formData,{
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const login = (username, password) => {
  return api
    .post("/auth/signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        TokenService.setToken(response.data.accessToken);
      }
      return response.data;
    });
};

const logout = () => {
  TokenService.removeToken();
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("token"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
