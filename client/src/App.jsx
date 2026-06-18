import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ProtectedRoute from "./routes/ProtectedRoute";

import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./layouts/DashboardLayout";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import ProfilePage from "./pages/profile/ProfilePage";
import ProjectsPage from "./pages/projects/ProjectsPage";
import DevelopersPage from "./pages/DevelopersPage";
import MyProjectsPage from "./pages/projects/MyProjectsPage";
import CreateProjectPage from "./pages/projects/CreateProjectPage";
import EditProjectPage from "./pages/projects/EditProjectPage";
import ProjectDetailsPage from "./pages/projects/ProjectDetailsPage";
import PublicProfilePage from "./pages/profile/PublicProfilePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "developers",
        element: <DevelopersPage />,
      },
      {
        path: "developers/:id",
        element: <PublicProfilePage />,
      },
      {
        path: "projects",
        element: <ProjectsPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "projects/:id",
        element: <ProjectDetailsPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),

    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "projects",
        element: <MyProjectsPage />,
      },
      {
        path: "projects/new",
        element: <CreateProjectPage />,
      },
      {
        path: "projects/edit/:id",
        element: <EditProjectPage />,
      },
      {
        path: "projects/:id",
        element: <ProjectDetailsPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
    ]
  }
]

);



function App() {
  return <RouterProvider router={router} />;
}

export default App;