import { useStream } from "@/common/stores/video";
import { PropsWithChildren, useEffect } from "react";

export const StreamingWrapper = (props: PropsWithChildren) => {
	const store = useStream();
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		store.setUp();
		// socket.on("me", (data) => {
		// 	console.log(data);
		//
		// 	// currentUser = data;
		// });
	}, []);

	return <>{props.children}</>;
};
