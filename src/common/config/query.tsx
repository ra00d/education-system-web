import { QueryClient, QueryClientConfig } from "@tanstack/react-query";

export const clientConfig: QueryClientConfig = {
	defaultOptions: {
		queries: {
			staleTime: 0,
			retryOnMount: true,
			refetchOnMount: true,
		},
		mutations: {},
	},
};
const queryClient = new QueryClient(clientConfig);
export default queryClient;
