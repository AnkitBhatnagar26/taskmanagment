import React, { useContext } from "react";
import NotificationContext from "../../store/notification-context";

interface NotificationProps {
    title: string;
    status: "error" | "info" | "success" | "warning";
}

const Notification: React.FC<NotificationProps> = ({ title, status }) => {
    const notificationCtx = useContext(NotificationContext);

    return (
        <div className="fixed bottom-0 right-0 mb-4 mr-4">
            <div
                className={`p-4 rounded-md shadow-lg ${status === "error"
                    ? "bg-red-500"
                    : status === "info"
                        ? "bg-blue-500"
                        : status === "success"
                            ? "bg-green-500"
                            : "bg-yellow-500"
                    }`}
            >
                <p className="text-white">{title}</p>
                <button
                    className="absolute top-0 right-0 mt-1 mr-1 text-white"
                    onClick={notificationCtx.hideNotification}
                >
                    &times;
                </button>
            </div>
        </div>
    );
};

export default Notification;
