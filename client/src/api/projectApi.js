import api from "./axios";

export const getAllProjects = (
    search = "",
    page = 1,
    tech = ""
) => {
    return api.get("/projects", {
        params: {
            search,
            page,
            tech,
        },
    });
};