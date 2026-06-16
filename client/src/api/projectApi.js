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

export const getMyProjects = () => {
    return api.get("/projects/my-projects");
};

export const createProject = (projectData) => {
    return api.post("/projects", projectData);
};