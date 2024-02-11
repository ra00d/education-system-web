import { StreamingWrapper } from "@/components/vidoe/Streaming";
import { MainVideo } from "./components/MainVideo";

export const Room = () => {
	return (
		<StreamingWrapper>
			<div className="max-h-[calc(100vh-8rem)] min-h-[calc(100vh-15rem)] h-[calc(100vh-8rem)]">
				<div className="grid grid-rows-12 gap-5">
					{/* <div className="row-span-1"> */}
					<MainVideo />
					{/* <VideoPlayer /> */}
					{/* </div> */}
					{/* <ParticepantsVideos /> */}
				</div>
			</div>
		</StreamingWrapper>
	);
};
