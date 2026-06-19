import { useEffect, useState } from "react";
import { useParams, } from "react-router-dom";
import { getProjectById } from "../../api/projectApi";
import ProjectDetails from "../../components/project/ProjectDetails";

function ProjectDetailsPage() {

    const { id } = useParams();

    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchProject = async () => {

            try {

                const response =
                    await getProjectById(id);

                setProject(response.data);

            } catch (error) {

                setError(
                    error.response?.data?.message ||
                    "Failed to load project"
                );

            } finally {

                setLoading(false);

            }

        };

        fetchProject();

    }, [id]);

    if (loading) {
        return (
            <p className="text-white p-10">
                Loading project...
            </p>
        );
    }

    if (error) {
        return (
            <p className="text-red-400 p-10">
                {error}
            </p>
        );
    }

    return (
        <ProjectDetails project={project} />
    );
}

export default ProjectDetailsPage;