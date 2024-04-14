import { useEffect, useReducer, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import NotificationContext from "../store/notification-context";
import LoaderContext from "../store/loader-context";

const BASE_URL = "http://localhost:8080";

const getToken = (): string | null => {
    return sessionStorage.getItem("token");
};

export function useGet<T>(url: string, fetchOptions?: RequestInit) {
    return useFetch<T>(url, { method: "GET", ...(fetchOptions || {}) });
}

export function usePost<T>(url: string) {
    return useFetch<T>(url, { method: "POST", resolve: undefined });
}

export function usePut<T>(url: string) {
    return useFetch<T>(url, { method: "PUT" });
}

export function useDelete<T>(url: string) {
    return useFetch<T>(url, { method: "DELETE" });
}

function useFetch<T>(url: string, options: RequestInit & { resolve?: (data: T) => void }, { apiCall = "" }: { apiCall?: string } = {}) {
    const cache = useRef<Record<string, T | undefined>>({});
    const notificationCtx = useContext(NotificationContext);
    const loaderCtx = useContext(LoaderContext);
    const navigate = useNavigate();

    // Used to prevent state update if the component is unmounted
    const cancelRequest = useRef<boolean>(false);

    interface State {
        error?: Error;
        data?: T;
        fetchRequest: boolean;
        isLoading: boolean;
    }

    const initialState: State = {
        error: undefined,
        data: undefined,
        fetchRequest: apiCall === "onload" ? true : false,
        isLoading: apiCall === "onload" ? true : false,
    };

    // Keep state logic separated
    const fetchReducer = (state: State, action: { type: string; payload?: any }): State => {
        switch (action.type) {
            case "loading":
                return { ...initialState, isLoading: action.payload };
            case "fetched":
                return { ...initialState, data: action.payload };
            case "error":
                return { ...initialState, error: action.payload };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(fetchReducer, initialState);

    const fetchData = async (apiData?: { data?: any; url?: string }, functionCalls?: Record<string, () => void>) => {
        dispatch({ type: "loading", payload: true });
        loaderCtx.showLoader();

        // If a cache exists for this url, return it
        if (cache.current[url]) {
            dispatch({ type: "fetched", payload: cache.current[url] });
            return;
        }

        if (apiData) {
            if (apiData.data) {
                options.body = JSON.stringify(apiData.data);
            }
            if (apiData.url) {
                url += apiData.url;
            }
        }
        try {
            url = BASE_URL + url;
            options = {
                ...options,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `jwt ${getToken()}`,
                },
            };

            let response;
            try {
                response = await window.fetch(url, options);
            } catch (err) {
                const error = err as Error; // Type assertion to cast err as Error
                notificationCtx.showNotification({
                    title: error.message,
                    status: "error",
                });
                dispatch({ type: "error", payload: error });
                return;
            }

            if (!response.ok) {
                if (response.status === 401) {
                    notificationCtx.showNotification({
                        title: "Unauthorized token",
                        status: "error",
                    });
                    setTimeout(() => {
                        navigate("/");
                        notificationCtx.hideNotification();
                    }, 1000);
                    loaderCtx.hideLoader();
                    return;
                } else {
                    notificationCtx.showNotification({
                        title: response.statusText,
                        status: "error",
                    });
                    dispatch({ type: "error", payload: new Error(response.statusText) });
                    return;
                }
            }

            const data = await response.json();
            cache.current[url] = data as T;
            if (cancelRequest.current) return;

            if (typeof data === "object" && data.message && options.method !== "GET") {
                const message = data.message as string;
                notificationCtx.showNotification({
                    title: message,
                    status: "success",
                });
                for (let func in functionCalls || {}) {
                    functionCalls![func]();
                }
            }

            dispatch({ type: "fetched", payload: data });
            dispatch({ type: "loading", payload: false });
            loaderCtx.hideLoader();

            // Resolve the Promise if a resolve function is provided in the options
            if (options.resolve) {
                options.resolve(data as T);
            }
        } catch (error) {
            if (cancelRequest.current) return;
            notificationCtx.showNotification({
                title: error as string,
                status: "error",
            });
            dispatch({ type: "error", payload: error });
            loaderCtx.hideLoader();
        }
    };

    useEffect(() => {
        // Do nothing if the url is not given
        if (!url) return;

        cancelRequest.current = false;

        if (state.fetchRequest) fetchData();

        // Use the cleanup function for avoiding a possibly...
        // ...state update after the component was unmounted
        return () => {
            cancelRequest.current = true;
        };
    }, [url, state.fetchRequest]);

    // const refresh = (apiData?: { data?: any; url?: string }, functionCalls?: Record<string, () => void>) => {
    //     fetchData(apiData, functionCalls);
    // };

    // Add a resolve function to the options parameter
    const refresh = (apiData?: { data?: any; url?: string }, functionCalls?: Record<string, () => void>) => {
        return new Promise<T>((resolve, reject) => {
            options.resolve = resolve;
            // options.reject = reject;
            fetchData(apiData, functionCalls);
        });
    };


    return { ...state, refresh };
}

export default useFetch;
