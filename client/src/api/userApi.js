import api from "./axios";

export const getAllDevelopers = (search = "",page=1) => {
    return api.get("/user", {params: {search,page,},});
};

export const getDeveloperProfile = (id) => {
    return api.get(`/user/${id}`);
};

export const getGithubProfile = (id) => {
    return api.get(`/user/${id}/github`);
};