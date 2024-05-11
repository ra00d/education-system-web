import {
  StreamVideo,
  StreamVideoClient,
  User,
} from "@stream-io/video-react-sdk";
import { MyVideoUI } from "./MyVideoUI";

const apiKey = "ay7hkm8c7wu5";
const userId = "teacher_id";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidGVhY2hlcl9pZCJ9.2oyN_0Hx4dicW6nx9cGTEFOdV9KmKXzjIlBBdtaIVI8";
const user: User = { id: userId };

const client = new StreamVideoClient({ apiKey, user, token });
const call = client.call("default", "my-first-call");
call.getOrCreate().then(() => {
  
});
call.join();

export const MyApp = () => {
  return (
    <StreamVideo client={client}>
      <MyVideoUI call={call} />
    </StreamVideo>
  );
};
