import { useEffect, useReducer, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import NotificationContext from "../store/notification-context";
import LoaderContext from "../store/loader-context";
import { getToken } from "../utils/common";
import { BASE_URL } from "../api/config";

interface FetchOptions extends RequestInit {
    body?: string;
}

interface ApiData {
    data?: Record<string, any>;
    url?: string;
}

interface FunctionCalls {
    [key: string]: () => void;
}

interface FetchControlOptions {
    apiCall?: string;
}

type FetchState = {
    error?: Error;
    data?: any;
    fetchRequest: boolean;
    isLoading: boolean;
};

type FetchAction =
    | { type: "loading"; payload: boolean }
    | { type: "fetched"; payload: any }
    | { type: "error"; payload: Error };
export function useGet(url: string, fetchOptions?: FetchOptions, controlOptions?: FetchControlOptions) {
    return useFetch(url, { ...fetchOptions, method: "GET" }, controlOptions);
}

export function usePost(url: string, fetchOptions?: FetchOptions, controlOptions?: FetchControlOptions) {
    return useFetch(url, { ...fetchOptions, method: "POST" }, controlOptions);
}

export function usePut(url: string, fetchOptions?: FetchOptions, controlOptions?: FetchControlOptions) {
    return useFetch(url, { ...fetchOptions, method: "PUT" }, controlOptions);
}

export function useDelete(url: string, fetchOptions?: FetchOptions, controlOptions?: FetchControlOptions) {
    return useFetch(url, { ...fetchOptions, method: "DELETE" }, controlOptions);
}
function useFetch(url: string, options: FetchOptions, controlOptions: FetchControlOptions = {}) {
    const cache = useRef<Record<string, any>>({});
    const notificationCtx = useContext(NotificationContext);
    const loaderCtx = useContext(LoaderContext);
    const navigate = useNavigate();

    // Used to prevent state update if the component is unmounted
    const cancelRequest = useRef<boolean>(false);

    const initialState: FetchState = {
        error: undefined,
        data: undefined,
        fetchRequest: controlOptions.apiCall === "onload",
        isLoading: controlOptions.apiCall === "onload",
    };

    const fetchReducer = (state: FetchState, action: FetchAction): FetchState => {
        switch (action.type) {
            case "loading":
                return { ...state, isLoading: action.payload };
            case "fetched":
                return { ...state, data: action.payload };
            case "error":
                return { ...state, error: action.payload };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(fetchReducer, initialState);

    const fetchData = async (apiData?: ApiData, functionCalls?: FunctionCalls) => {
        dispatch({ type: "loading", payload: true });
        loaderCtx.showLoader();

        if (apiData) {
            if (apiData.data) {
                options.body = JSON.stringify(apiData.data);
            }
            if (apiData.url) {
                url += apiData.url;
            }
        }

        try {
            const fullUrl = BASE_URL + url;
            const fetchOptions: RequestInit = {
                ...options,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `jwt ${getToken()}`,
                },
            };
            let response;
            try {
                response = await window.fetch(fullUrl, fetchOptions);
            } catch (err: any) {
                const errorMessage = err instanceof Error ? err.message : 'An error occurred';
                notificationCtx.showNotification({
                    title: errorMessage,
                    status: "error",
                });
                dispatch({ type: "error", payload: err });
                return;
            }

            console.log(response, 'responseresponse')
            if (!response.ok) {
                if (response.status === 401) {
                    notificationCtx.showNotification({
                        title: "Unauthorized token",
                        status: "error",
                    });
                    loaderCtx.hideLoader();
                    setTimeout(() => {
                        navigate("/login");
                        // notificationCtx.hideNotification();
                    }, 1000);
                    return;
                } else {
                    notificationCtx.showNotification({
                        title: response.statusText,
                        status: "error",
                    });
                    dispatch({ type: "error", payload: new Error(response.statusText) });
                    loaderCtx.hideLoader();
                    return;
                }
            }


            const data = await response.json();
            cache.current[fullUrl] = data;

            if (cancelRequest.current) return;
            if (data.response && fetchOptions.method !== "GET") {
                notificationCtx.showNotification({
                    title: data.response,
                    status: "success",
                });
                for (let func in functionCalls) {
                    functionCalls[func]();
                }
            }

            dispatch({ type: "fetched", payload: data });
            dispatch({ type: "loading", payload: false });
            loaderCtx.hideLoader();
        } catch (error) {
            if (cancelRequest.current) return;
            notificationCtx.showNotification({
                title: (error as Error).message,
                status: "error",
            });

            dispatch({ type: "error", payload: error as Error });
            loaderCtx.hideLoader();
        }
    };

    useEffect(() => {
        if (!url) return;

        cancelRequest.current = false;

        if (state.fetchRequest) fetchData();

        return () => {
            cancelRequest.current = true;
        };
    }, [url, state.fetchRequest]);

    const refresh = (apiData?: ApiData, functionCalls?: FunctionCalls) => {
        fetchData(apiData, functionCalls);
    };

    return { ...state, refresh };
}

export default useFetch;