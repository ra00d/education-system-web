import { useVidoe } from "@/common/context/videoContext";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useStream } from "@/common/stores/video";
export const VideoComponent = ({ stream }: { stream: MediaStream }) => {
	const vidRef = useRef<HTMLVideoElement>(null);
	useEffect(() => {
		if (vidRef.current && stream) vidRef.current.srcObject = stream;
		// vidRef.current
	}, [stream]);
	return (
		<video
			className="h-full w-full object-fill rounded-lg"
			playsInline
			// data-testid="peer-video"
			// style={{ width: "100%" }}
			ref={vidRef}
			autoPlay
			muted={true}
		/>
	);
};
export const VideoPlayer = () => {
	const {
		myStream,
		callUser,
		calling,
		answerCall,
		userStream,
		me,
		stream,
		mediaError,
		setName,
	} = useVidoe();
	const streams = useStream((state) => state.streams);
	const [userToCall, setUserToCall] = useState("");
	const videoRef = useRef<HTMLVideoElement>(null);
	const uservideoRef = useRef<HTMLVideoElement>(null);
	useEffect(() => {
		if (videoRef.current && myStream) videoRef.current.srcObject = myStream;
	}, [myStream]);
	useEffect(() => {
		if (uservideoRef.current && userStream)
			uservideoRef.current.srcObject = userStream;
	}, [userStream]);
	return (
		<div className="h-full">
			<p>{me}</p>
			<p>{mediaError}</p>
			<p>{calling}</p>
			<Input
				value={userToCall}
				onChange={(e) => {
					setUserToCall(e.target.value);
				}}
			/>
			<Input
				onChange={(e) => {
					setName(e.target.value);
				}}
			/>
			<div className="grid md:grid-cols-2 gap-2 h-[500px] md:h-[200px]">
				{stream && (
					<video
						className="h-full overflow-hidden"
						playsInline
						data-testid="peer-video"
						// style={{ width: "100%" }}
						ref={videoRef}
						autoPlay
						muted={true}
					/>
				)}{" "}
				{userStream && (
					<video
						className="border border-red-300 h-full object-contain overflow-hidden"
						// style={{ width: "100%" }}
						ref={uservideoRef}
						playsInline
						autoPlay
						muted={true}
					/>
				)}
				{streams.map((st) => (
					<VideoComponent key={st.id} stream={st} />
				))}
			</div>
			<div>
				<Button
					onClick={() => {
						if (callUser) callUser(userToCall);
						// answerCall();
					}}
				>
					call
				</Button>{" "}
				<Button
					onClick={() => {
						// if (callUser) callUser(userToCall);
						answerCall();
					}}
				>
					answer
				</Button>
			</div>
		</div>
	);
};
