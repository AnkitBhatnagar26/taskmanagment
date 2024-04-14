import React, { createContext, useState, ReactNode } from "react";

interface NotificationData {
    title: string;
    status: "error" | "info" | "success" | "warning";
}

interface NotificationContextType {
    notification: NotificationData | null;
    showNotification: (notificationData: NotificationData) => void;
    hideNotification: () => void;
}

const defaultContext: NotificationContextType = {
    notification: null,
    showNotification: () => { },
    hideNotification: () => { },
};

export const NotificationContext = createContext<NotificationContextType>(defaultContext);

interface NotificationContextProviderProps {
    children: ReactNode;
}

export function NotificationContextProvider(props: NotificationContextProviderProps) {
    const [activeNotification, setActiveNotification] = useState<NotificationData | null>(null);

    function showNotificationHandler(notificationData: NotificationData) {
        setActiveNotification(notificationData);
    }

    function hideNotificationHandler() {
        setActiveNotification(null);
    }

    const contextValue: NotificationContextType = {
        notification: activeNotification,
        showNotification: showNotificationHandler,
        hideNotification: hideNotificationHandler,
    };

    return (
        <NotificationContext.Provider value={contextValue}>
            {props.children}
        </NotificationContext.Provider>
    );
}

export default NotificationContext;
