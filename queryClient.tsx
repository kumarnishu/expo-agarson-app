import { QueryClient } from "react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnReconnect: true,
            refetchOnMount: true,
            retry: false,
            staleTime: 200
        }
    }
});