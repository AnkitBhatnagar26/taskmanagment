import { useContext } from "react";
import { Outlet } from "react-router-dom";
// components
import NotificationContext from "../../store/notification-context";
import Notification from "../../components/common/notification";
import LoaderContext from "../../store/loader-context";
import Loader from "../../components/common/loader";

// ----------------------------------------------------------------------

export default function SimpleLayout() {
  const NotificationCtx = useContext(NotificationContext);
  const activeNotification = NotificationCtx.notification;

  const LoaderCtx = useContext(LoaderContext);
  const activeLoader = LoaderCtx.loader;
  return (
    <>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          status={activeNotification.status}
        />
      )}
      {activeLoader && (
        <Loader />
      )}
      <Outlet />
    </>
  );
}
