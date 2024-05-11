import {
  StreamVideo,
  StreamVideoClient,
  User,
} from "@stream-io/video-react-sdk";
import { MyVideoUI } from "./MyVideoUI";

const apiKey = "ay7hkm8c7wu5";
const userId = "student_id_2";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoic3R1ZGVudF9pZF8yIn0.6TRHisQrI10AjpDwJ9B_77-Civr_j1GE2bDAWRkeRnQ";
const user: User = { id: userId, name: "Raad" };

const client = new StreamVideoClient({ apiKey, user, token });
const call = client.call("default", "51e3c018-d427-4486-b85e-0fefd2834a4d");
call.join();

export const JoinVideo = () => {
  return (
    <StreamVideo client={client}>
      <MyVideoUI call={call} />
    </StreamVideo>
  );
};
