import { QueryClient, QueryClientConfig } from "react-query";

export const clientConfig: QueryClientConfig = {};
const queryClient = new QueryClient(clientConfig);
export default queryClient;
