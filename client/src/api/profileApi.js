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

export const getSavedDevelopers = () => {
    return api.get("/user/saved");
};

export const removeSavedDeveloper = (developerId) => {
    return api.delete(`/user/saved/${developerId}`);
};

export const saveDeveloper = (developerId) => {
    return api.post(`/user/saved/${developerId}`);
};
