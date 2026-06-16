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

export const deleteProject = (projectId) => {
    return api.delete(`/projects/${projectId}`);
};

export const getProjectById = (projectId) => {
    return api.get(`/projects/${projectId}`);
};

export const updateProject = (projectId, projectData) => {
    return api.put(`/projects/${projectId}`, projectData);
};