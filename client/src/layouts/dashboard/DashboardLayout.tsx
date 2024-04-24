import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import NotificationContext from "../../store/notification-context";
import Notification from "../../components/common/notification";
import LoaderContext from "../../store/loader-context";
import Header from "../../components/common/Header";
import Sidebar from "../../components/common/Sidebar";

const CircularProgress: React.FC = () => {
  return (
    <div className="relative w-10 h-10">
      <div className="absolute inset-0 border-4 border-blue-500 rounded-full animate-spin" />
    </div>
  );
};

const DashboardLayout: React.FC = () => {
  const NotificationCtx = useContext(NotificationContext);
  const LoaderCtx = useContext(LoaderContext);

  const activeNotification = NotificationCtx.notification;
  const activeLoader = LoaderCtx.loader;

  return (
    <div>
      <Header />
      <div className="flex pt-16 overflow-hidden bg-gray-50">
        <Sidebar />
        <div className="fixed inset-0 z-10 bg-gray-900/50 hidden"></div>
        <div className="relative w-full h-full overflow-y-auto bg-gray-50 lg:ml-64">
          <main>
            <Outlet />
          </main>
        </div>
      </div>

      {activeNotification && (
        <Notification
          title={activeNotification.title}
          status={activeNotification.status}
        />
      )}

      {activeLoader && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <CircularProgress />
        </div>
      )}
    </div>

  )
};

export default DashboardLayout;
