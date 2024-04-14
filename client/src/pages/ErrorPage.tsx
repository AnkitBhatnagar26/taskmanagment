import React, { useEffect, useContext } from "react";
import NotificationContext from "../store/notification-context";

interface ErrorPageProps {
  children: React.ReactNode;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ children }) => {
  const notificationCtx = useContext(NotificationContext);

  useEffect(() => {
    notificationCtx.showNotification({
      title: "Unauthorised access | Token expired.",
      status: "error",
    });
  }, [notificationCtx]);

  return <h1>{children}</h1>;
};

export default ErrorPage;
