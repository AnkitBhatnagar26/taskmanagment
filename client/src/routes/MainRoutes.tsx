import DashboardLayout from "../layouts/dashboard";
import NewDashboard from "../components/NewDashboard";
import TaskManager from "../components/TaskManager";
import Users from "../components/Users";

const MainRoutes = {
  path: "/dashboard",
  element: <DashboardLayout />,
  children: [
    { path: "", element: <NewDashboard /> },
    { path: "taskManager", element: <TaskManager /> },
    { path: "users", element: <Users /> },
  ],
};


export default MainRoutes;
