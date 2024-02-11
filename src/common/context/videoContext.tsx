import {
	PropsWithChildren,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";
import Peer from "simple-peer";
import { socket } from "../config/socket";
import { useStream } from "../stores/video";
const vidoeContext = createContext<any>({});
export const VidoeContextProvider = ({ children }: PropsWithChildren) => {
	const [me, setMe] = useState("");
	const [userPeer, setUserPeer] = useState<Peer.Instance>();
	const { addStream } = useStream();
	const [calling, setCalling] = useState("");
	const [stream, setStream] = useState<MediaStream>();
	const [userStream, setUserStream] = useState<MediaStream>();
	const [myStream, setMyStream] = useState<MediaStream>();
	const [name, setName] = useState("");

	const [caller, setCaller] = useState("");
	const [callerSignal, setCallerSignal] = useState();
	const getMe = () => {
		socket.emit("me", {}, (data: any) => {
			setMe(data);
		});
	};
	const callUser = (id: string) => {
		const peer = new Peer({
			initiator: true,
			trickle: false,
			stream: stream,
		});
		peer.on("signal", (data) => {
			socket.emit("call-user", {
				userToCall: id,
				signalData: data,
				from: me,
				name: name,
			});
		});

		peer.on("stream", (stream: MediaStream) => {
			// setUserStream(stream);
			addStream(stream);
			// setMyStream(stream);
		});
		socket.on("call-accepted", (signal) => {
			peer.signal(signal);
			setCalling("");
		});
	};
	const [mediaError, setMediaError] = useState("");
	const answerCall = () => {
		const p = new Peer({
			initiator: false,
			trickle: false,
			stream: stream,
		});
		p.on("error", (err: any) => console.log("error", err));
		p.on("signal", (data) => {
			socket.emit("answer-call", {
				signal: data,
				to: caller,
			});
		});
		p.on("stream", (stream: MediaStream) => {
			// setUserStream(stream);
			addStream(stream);
		});
		if (callerSignal) {
			p.signal(callerSignal);
		}
	};
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		try {
			navigator.mediaDevices
				.getUserMedia({ video: true, audio: true })
				.then((stream: MediaStream) => {
					const peer = new Peer({
						initiator: true,
						trickle: false,
						stream: stream,
					});
					setUserPeer(peer);
					setStream(userPeer?.streams[0]);
					setMyStream(stream);
					socket.emit("user-joined", stream.clone());
				});
		} catch (error: any) {
			setMediaError(error.toString());
			console.error(error);
		}
		socket.on("me", (data) => {
			setMe(data);
		});
		socket.on("call-user", (data) => {
			setCalling(`${data.from} ${data.name} is calling`);
			setCaller(data.from);
			setName(data.name);
			setCallerSignal(data.signal);
		});
	}, []);

	return (
		<vidoeContext.Provider
			value={{
				stream,
				setName,
				me,
				getMe,
				mediaError,
				userStream,
				callUser,
				answerCall,
				myStream,
				calling,
			}}
		>
			{children}
		</vidoeContext.Provider>
	);
};

export const useVidoe = () => useContext(vidoeContext);
