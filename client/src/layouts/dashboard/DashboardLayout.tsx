import React, { useContext, useState, ReactNode } from "react";
import { Outlet } from "react-router-dom";
import NotificationContext from "../../store/notification-context";
import Notification from "../../components/common/notification";
import LoaderContext from "../../store/loader-context";

const CircularProgress: React.FC = () => {
  return (
    <div className="relative w-10 h-10">
      <div className="absolute inset-0 border-4 border-blue-500 rounded-full animate-spin" />
    </div>
  );
};

interface StyledRootProps {
  children: ReactNode;
}

const StyledRoot: React.FC<StyledRootProps> = ({ children }) => (
  <div className="flex min-h-screen overflow-hidden">{children}</div>
);

const Main: React.FC<StyledRootProps> = ({ children }) => (
  <main className="flex-grow overflow-auto min-h-screen bg-gray-100 lg:pl-2 lg:pr-2">
    {children}
  </main>
);

const StyledDiv: React.FC<StyledRootProps> = ({ children }) => (
  <div className="bg-white rounded-md p-4 md:p-8">{children}</div>
);

const DashboardLayout: React.FC = () => {
  const [open, setOpen] = useState(true);
  const NotificationCtx = useContext(NotificationContext);
  const LoaderCtx = useContext(LoaderContext);

  const activeNotification = NotificationCtx.notification;
  const activeLoader = LoaderCtx.loader;
  const Open = open;

  return (
    <StyledRoot>
      <Main>
        <StyledDiv>
          <Outlet />
        </StyledDiv>
      </Main>

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
    </StyledRoot>
  );
};

export default DashboardLayout;
