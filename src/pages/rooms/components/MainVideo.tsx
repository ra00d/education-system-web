import { useStream } from "@/common/stores/video";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { ShieldClose } from "lucide-react";
import { useEffect, useRef } from "react";
import { ParticepantsVideos } from "./ParticepantsVideos";

export const MainVideo = () => {
	// const { myStream, userStream, stream } = useVidoe();
	const { getCurrentStream, stream } = useStream();
	// const [userToCall, setUserToCall] = useState("");
	const videoRef = useRef<HTMLVideoElement>(null);
	// const uservideoRef = useRef<HTMLVideoElement>(null);
	useEffect(() => {
		if (videoRef?.current && stream) videoRef.current.srcObject = stream;
	}, [stream]);
	// useEffect(() => {}, []);
	return (
		<Card>
			<CardHeader className="m-0 p-0 flex-row gap-x-2 space-y-0">
				<Button className="m-0" variant="ghost">
					test
				</Button>
				<Button className="m-0" variant="ghost">
					test
				</Button>
			</CardHeader>
			<CardContent>
				{" "}
				<div className="grid grid-cols-12 h-full  p-5 gap-5">
					<div className="p-1 col-span-8 h-1/2 ">
						<Card className="m-0">
							<CardContent className="p-2">
								{/* <span className="text-3xl font-semibold">{1}</span> */}
								{getCurrentStream() && (
									<video
										className="h-full w-full object-fill  overflow-hidden  aspect-[16/8] rounded-lg "
										playsInline
										data-testid="peer-video"
										// style={{ width: "100%" }}
										ref={videoRef}
										autoPlay
										muted={true}
									/>
								)}
							</CardContent>
							<CardFooter className=" justify-center m-0 p-0 pb-2">
								<Button>
									<ShieldClose size={24} />
								</Button>
							</CardFooter>
						</Card>
					</div>
					<div className="col-span-4 h-1/2  ">
						<ParticepantsVideos />
					</div>
				</div>
			</CardContent>

			{/* <div className="flex flex-col col-span-4 justify-between h-1/2"> */}
			{/* 	<Button>close</Button> */}
			{/* 	<Button>close</Button> */}
			{/* 	<Button>close</Button> */}
			{/* </div> */}
		</Card>
	);
};
