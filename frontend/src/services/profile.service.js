import api from "./api";
import TokenService from "./token.service";

const getProfile = () => {
  return api.get("/profile", {
    headers: {
      Authorization: `Bearer ${TokenService.getToken()}`,
    },
  });
};

const updateProfile = (username, password, firstName, lastName, image) => {
  const formData = new FormData();
  formData.append("upload", image);
  formData.append("username", username);
  formData.append("password", password);
  formData.append("firstName", firstName);
  formData.append("lastName", lastName);

  return api.put("/profile", formData, {
    headers: {
      Authorization: `Bearer ${TokenService.getToken()}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

const UserService = {
  getProfile,
  updateProfile,
};

export default UserService;
