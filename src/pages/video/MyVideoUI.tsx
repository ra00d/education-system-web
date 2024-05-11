import {
  CallControls,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
} from "@stream-io/video-react-sdk";

export const MyVideoUI = ({ call }: { call: any }) => {
  return (
    <StreamTheme className="text-white">
      <StreamCall call={call}>
        <SpeakerLayout />
        <CallControls />
      </StreamCall>
    </StreamTheme>
  );
};
