import api from "./axios";

export const getProfile = () => {
  return api.get("/user/profile");
};

export const updateProfile = (profileData) => {
  return api.put("/user/profile", profileData);
};

export const getGithubProfile = (userId) => {
    return api.get(`/user/${userId}/github`);
};