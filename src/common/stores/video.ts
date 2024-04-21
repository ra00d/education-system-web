import SimplePeer from "simple-peer";
import { create } from "zustand";
type StreamType = {
  streams: MediaStream[];
  stream: MediaStream | null;
  peer: SimplePeer.Instance | undefined;
  // biome-ignore lint/complexity/noBannedTypes: <explanation>
  peers: { [key: string]: SimplePeer.Instance };
  currentUser: string;
  setUp: () => void;
  addStream: (stream: MediaStream) => void;
  addPeer: (id: string | number, peer: SimplePeer.Instance) => void;
  setDefaultStream: (straem: MediaStream) => void;
  getCurrentStream: () => MediaStream | null;
};
export const useStream = create<StreamType>((set, get) => ({
  streams: [],
  currentUser: "raad",
  stream: null,
  peer: undefined,
  peers: {},
  callUser: (userId: number) => {
    // const peer = get().peer;
    // peer?.on("signal", (data) => {
    // 	socket.emit("call-user", {
    // 		userToCall: userId,
    // 		signalData: data,
    // 		from: get().currentUser,
    // 	});
    // });
    // peer?.on("stream", (stream: MediaStream) => {
    // 	get().addStream(stream);
    // });
    // socket.on("call-accepted", (signal) => {
    // 	peer?.signal(signal);
    // });
    //
    // socket.emit("call-user");
  },
  answerCall: () => {},
  addPeer: (id, peer) => {
    const peers = get().peers;
    peers[id] = peer;
    set((state) => ({ ...state, peers: peers }));
  },
  addStream(stream) {
    const newStreams = get().streams;
    newStreams.push(stream);
    set((state) => ({ ...state, streams: newStreams }));
  },
  setDefaultStream(stream) {
    set((state) => ({ ...state, stream: stream }));
  },
  getCurrentStream() {
    return get().stream;
  },
  setUp: () => {
    let userStream: unknown;
    let currentUser = "";
    const store = get();
    try {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream: MediaStream) => {
          // store.setDefaultStream(stream);
          // socket.on("me", (data) => {
          //   console.log(data);
          //   currentUser = data;
          // });
          // socket.emit("join-class", { roomID: "myroom", userID: currentUser });
          //
          // socket.on("class-users", (users: any[]) => {
          //   // console.log(users);
          //   //
          //   // // biome-ignore lint/complexity/noForEach: <explanation>
          //   // users.forEach((user) => {
          //   //   if (user.id !== currentUser) {
          //   //     const peer = new SimplePeer({
          //   //       initiator: true,
          //   //       trickle: false,
          //   //     });
          //   //
          //   //     peer.on("signal", (data) => {
          //   //       socket.emit("signal", { signalData: data, userId: user.id });
          //   //     });
          //   //
          //   //     peer.on("stream", (stream) => {
          //   //       get().addStream(stream);
          //   //     });
          //   //
          //   //     // peerConnections[user.id] = peer;
          //   //   }
          //   // });
          // });
          // // socket.on("signal", ({ signalData, userId }) => {
          //   if (get().peers[userId]) {
          //     get().peers[userId]?.signal(signalData);
          //   }
          // });
          // store.setDefaultStream(stream);
          // userStream = stream;
          // const peer = new SimplePeer({
          //   initiator: true,
          //   stream,
          // });
          // peer.on("stream", (stream: MediaStream) => {
          //   store.addStream(stream);
          // });
          //
          // return peer;
        });
    } catch (error: any) {
      console.error(error);
      return;
    }
    if (userStream instanceof MediaStream) {
    }
  },
}));
