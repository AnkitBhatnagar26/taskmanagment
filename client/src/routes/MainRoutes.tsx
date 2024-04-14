import DashboardLayout from "../layouts/dashboard";
import NewDashboard from "../components/NewDashboard";
import TaskManager from "../components/TaskManager";

const MainRoutes = {
  path: "/dashboard",
  element: <DashboardLayout />,
  children: [
    { path: "", element: <NewDashboard /> },
    { path: "taskManager", element: <TaskManager /> },
  ],
};

export default MainRoutes;
