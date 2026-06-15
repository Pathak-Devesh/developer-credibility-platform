import api from "./axios";

export const getAllDevelopers = (search = "",page=1) => {
    return api.get("/user", {params: {search,page,},});
};